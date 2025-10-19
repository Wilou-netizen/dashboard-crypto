const monedas = ["binancecoin", "bitcoin", "ethereum", "ripple", "solana", "tether"];

function formatearAccion(accion) {
  return {
    "comprar si o si": "🟢 Comprar sí o sí",
    "comprar": "🟡 Comprar",
    "no hacer nada": "⚪️ No hacer nada",
    "vender": "🔴 Vender"
  }[accion] || "❓ Sin datos";
}

function actualizarInforme() {
  fetch("fetch("https://wilou99.app.n8n.cloud/webhook/dashboard-crypto")
    .then(res => res.json())
    .then(data => {
      const ahora = new Date();
      document.getElementById("hora").textContent =
        `🕒 ${ahora.toLocaleDateString()} ${ahora.toLocaleTimeString()}`;

      monedas.forEach(moneda => {
        const info = data[moneda]; // debe contener { cambio, precio, accion }
        const div = document.getElementById(moneda);
        div.innerHTML = `
          <h3>⬆️ ${moneda.toUpperCase()}</h3>
          <p>Cambio: ${info.cambio}%</p>
          <p>Precio: $${info.precio}</p>
          <p class="accion">Acción sugerida: ${formatearAccion(info.accion)}</p>
        `;
      });
    });
}

actualizarInforme();
setInterval(actualizarInforme, 900000); // cada 15 minutos
