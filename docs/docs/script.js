fetch("https://wilou99.app.n8n.cloud/webhook/dashboard-crypto")
  .then(response => response.json())
  .then(data => {
    // Mostrar el informe completo en el bloque <pre>
    document.getElementById("informe-mercado").textContent = data.informe;

    // Extraer la hora del informe y mostrarla en <p id="hora">
    const lineas = data.informe.split("\n");
    const hora = lineas.find(linea => linea.startsWith("🕒"));
    if (hora) {
      document.getElementById("hora").textContent = hora;
    }

    // Mostrar cada moneda en su propio <div>
    const bloques = data.informe.split("\n\n").slice(1); // omitir encabezado
    bloques.forEach(bloque => {
      const nombre = bloque.split("\n")[0].replace("⬆️ ", "").toLowerCase();
      const div = document.getElementById(nombre);
      if (div) {
        div.innerHTML = bloque.replace(/\n/g, "<br>");
      }
    });
  })
  .catch(error => {
    console.error("Error al obtener el informe:", error);
    document.getElementById("informe-mercado").textContent = "Error al cargar el informe.";
  });
