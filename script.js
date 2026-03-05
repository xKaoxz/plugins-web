// Navegación landing
function goToSection(id){
  const section = document.getElementById(id);
  if(section){
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Elementos
const landingSearch = document.getElementById("landing-search");
const searchInput = document.getElementById("search");
const pluginsContainer = document.getElementById("plugins");
const categoryFilter = document.getElementById("category-filter");

// Cargar plugins desde JSON
fetch('plugins.json')
  .then(res => res.json())
  .then(plugins => {

    // Generar filtros de categorías
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

    // Búsqueda desde landing
    landingSearch?.addEventListener("keypress", function(e){
      if(e.key === "Enter"){
        const query = landingSearch.value.toLowerCase();
        document.getElementById("plugins-section").scrollIntoView({ behavior: "smooth" });
        renderPlugins(plugins.filter(p => p.name.toLowerCase().includes(query)));
      }
    });

    // Render plugins dinámico
    function renderPlugins(pluginList){
      pluginsContainer.innerHTML = "";
      pluginList.forEach(plugin => {
        const article = document.createElement("article");
        article.classList.add("plugin");

        // Versiones por plataforma
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
