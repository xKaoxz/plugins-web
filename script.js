const searchInput = document.getElementById("search");
const pluginsContainer = document.getElementById("plugins");

// Cargar plugins desde JSON
fetch('plugins.json')
  .then(res => res.json())
  .then(plugins => {
    plugins.forEach(plugin => {
      const article = document.createElement("article");
      article.classList.add("plugin");
      article.innerHTML = `
        <img src="${plugin.icon}" alt="Icono ${plugin.name}">
        <h2>${plugin.name}</h2>
        <p>${plugin.description}</p>
        <span class="version">Version ${plugin.version}</span>
        <a href="${plugin.download}" class="download">Descargar</a>
      `;
      pluginsContainer.appendChild(article);
    });

    // Agregar funcionalidad de búsqueda
    searchInput.addEventListener("input", () => {
      const filter = searchInput.value.toLowerCase();
      document.querySelectorAll(".plugin").forEach(plugin => {
        const title = plugin.querySelector("h2").textContent.toLowerCase();
        plugin.style.display = title.includes(filter) ? "block" : "none";
      });
    });
  });
