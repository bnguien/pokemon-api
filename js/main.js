import { renderPokemons, currentPage, filterPokemonByType, searchPokemonByName } from "./ui.js"

document.getElementById("prev-btn").onclick = () => {
  if (currentPage > 1) renderPokemons(currentPage - 1)
}

document.getElementById("next-btn").onclick = () => {
  import("./ui.js").then(({ currentPage, renderPokemons }) => {
    renderPokemons(currentPage + 1)
  })
}
renderPokemons(1).catch(console.error)
document.getElementById("type-filter").addEventListener("change", filterPokemonByType)
document.getElementById("search-btn").addEventListener("click", searchPokemonByName)
document.getElementById("search-input").addEventListener("keypress", (e) => {
    if(e.key === "Enter") searchPokemonByName()
})
document.getElementById("search-input").addEventListener("blur",(e)=>{
    if(!e.target.value.trim()) filterPokemonByType("all")
})