const search = document.getElementById("search");
const plugins = document.querySelectorAll(".plugin");

search.addEventListener("keyup", () => {

let text = search.value.toLowerCase();

plugins.forEach(plugin => {

let name = plugin.innerText.toLowerCase();

plugin.style.display = name.includes(text)
? "block"
: "none";

});

});
