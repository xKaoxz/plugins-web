// Elementos
const searchInput = document.getElementById("search");
const pluginsContainer = document.getElementById("plugins");

// Opcional: contenedor para filtros
const categoryFilter = document.getElementById("category-filter"); 

// Cargar plugins
fetch('plugins.json')
  .then(res => res.json())
  .then(plugins => {
    
    // Obtener categorías únicas para filtros
    const allCategories = [...new Set(plugins.flatMap(p => p.categories))];
    if(categoryFilter){
      allCategories.forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = cat;
        btn.addEventListener('click', () => {
          renderPlugins(plugins.filter(p => p.categories.includes(cat)));
        });
        categoryFilter.appendChild(btn);
      });
    }

    // Render inicial
    renderPlugins(plugins);

    // Búsqueda en tiempo real
    searchInput.addEventListener("input", () => {
      const filter = searchInput.value.toLowerCase();
      renderPlugins(plugins.filter(p => p.name.toLowerCase().includes(filter)));
    });

    function renderPlugins(pluginList){
      pluginsContainer.innerHTML = "";
      pluginList.forEach(plugin => {
        const article = document.createElement("article");
        article.classList.add("plugin");

        // Crear botones de versiones
        let versionsHTML = plugin.versions.map(v => 
          `<a href="${v.download}" class="download">${v.platform} ${v.version}</a>`
        ).join(' ');

        article.innerHTML = `
          <img src="${plugin.icon}" alt="Icono ${plugin.name}">
          <h2>${plugin.name}</h2>
          <p>${plugin.description}</p>
          <span class="categories">${plugin.categories.join(", ")}</span>
          <div class="versions">${versionsHTML}</div>
        `;
        pluginsContainer.appendChild(article);
      });
    }
  });
