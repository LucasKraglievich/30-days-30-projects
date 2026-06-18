// Guardo los datos en memoria para poder filtrar sin volver a llamar a la API
let cryptos = [];

// Llama a CoinGecko — pública, sin API key
// Trae el top 20 por capitalización de mercado, precios en USD
async function obtenerCryptos() {
  try {
    const respuesta = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false'
    );

    if (!respuesta.ok) {
      mostrarMensaje('Error al obtener datos 😕');
      return;
    }

    cryptos = await respuesta.json();
    mostrarMensaje('');
    renderTabla(cryptos);

    // Muestro la hora de actualización
    const ahora = new Date();
    document.getElementById('update-time').textContent =
      'Actualizado a las ' + ahora.toLocaleTimeString('es-AR');

  } catch (error) {
    mostrarMensaje('Error al conectar con la API 😕');
    console.error(error);
  }
}

// Renderiza la tabla con los datos recibidos
function renderTabla(datos) {
  const contenedor = document.getElementById('resultados');

  if (datos.length === 0) {
    contenedor.innerHTML = '<p class="mensaje">No encontré esa cripto 😕</p>';
    return;
  }

  // Armo la tabla fila por fila
  const filasHTML = datos.map(crypto => {
    const cambio    = crypto.price_change_percentage_24h?.toFixed(2) ?? '0.00';
    const esPositivo = parseFloat(cambio) >= 0;
    const signo     = esPositivo ? '+' : '';
    const claseCambio = esPositivo ? 'positivo' : 'negativo';

    // Formateo el precio con separador de miles y hasta 6 decimales para cryptos baratas
    const precio = formatearPrecio(crypto.current_price);

    return `
      <div class="crypto-fila">
        <span class="crypto-rank">#${crypto.market_cap_rank}</span>
        <img class="crypto-logo" src="${crypto.image}" alt="${crypto.name}" />
        <div class="crypto-info">
          <span class="crypto-nombre">${crypto.name}</span>
          <span class="crypto-simbolo">${crypto.symbol}</span>
        </div>
        <div class="crypto-precios">
          <span class="crypto-precio">$${precio}</span>
          <span class="crypto-cambio ${claseCambio}">${signo}${cambio}%</span>
        </div>
      </div>
    `;
  }).join('');

  contenedor.innerHTML = `<div class="crypto-tabla">${filasHTML}</div>`;
}

// Formatea el precio según su magnitud
function formatearPrecio(precio) {
  if (precio >= 1) {
    return precio.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } else {
    return precio.toFixed(6);
  }
}

// Filtra las cryptos en memoria según lo que escribe el usuario
// No hace llamadas a la API — usa los datos ya guardados en la variable cryptos
function filtrar() {
  const query = document.getElementById('input-busqueda').value.trim().toLowerCase();

  if (query === '') {
    renderTabla(cryptos);
    return;
  }

  const filtradas = cryptos.filter(c =>
    c.name.toLowerCase().includes(query) ||
    c.symbol.toLowerCase().includes(query)
  );

  renderTabla(filtradas);
}

function mostrarMensaje(texto) {
  document.getElementById('mensaje').textContent = texto;
}

// Cargo los datos al iniciar
obtenerCryptos();
