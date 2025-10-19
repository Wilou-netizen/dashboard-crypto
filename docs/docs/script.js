const monedas = ["binancecoin", "bitcoin", "ethereum", "ripple", "solana", "tether"];

function actualizarLuces() {
  fetch("https://tu-webhook-n8n-url") // ← reemplaza con tu URL real
    .then(res => res.json())
    .then(data => {
      monedas.forEach(moneda => {
        const estado = data[moneda]; // ej: "comprar"
        const color = {
          "comprar si o si": "green",
          "comprar": "yellow",
          "no hacer nada": "white",
          "vender": "red"
        }[estado] || "gray";
        document.getElementById(moneda).style.backgroundColor = color;
      });
    });
}

actualizarLuces();
setInterval(actualizarLuces, 900000); // cada 15 minutos
