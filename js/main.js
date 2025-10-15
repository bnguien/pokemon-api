import { renderPokemons, currentPage, filterPokemonByType, searchPokemonByName, createPokemonCardDetail } from "./ui.js"

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
document.getElementById("pokemon-list").addEventListener("click", async (e) => {
  const card = e.target.closest(".card")
  if (!card) return

  const name = card.querySelector(".card-title").textContent.trim()
  const detailCard = await createPokemonCardDetail(name)

  const modal = document.getElementById("pokemon-modal")
  const modalBody = document.getElementById("modal-body")
  modalBody.innerHTML = ""
  modalBody.appendChild(detailCard);
  modal.style.display = "flex"
});
document.getElementById("modal-close").addEventListener("click", () => {
  document.getElementById("pokemon-modal").style.display = "none"
})
document.getElementById("pokemon-modal").addEventListener("click", () => {
  document.getElementById("pokemon-modal").style.display = "none"
})