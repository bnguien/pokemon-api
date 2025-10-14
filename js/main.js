import { renderPokemons, currentPage } from "./ui.js";

document.getElementById("prev-btn").onclick = () => {
  if (currentPage > 1) renderPokemons(currentPage - 1);
};

document.getElementById("next-btn").onclick = () => {
  import("./ui.js").then(({ currentPage, renderPokemons }) => {
    renderPokemons(currentPage + 1);
  });
};
renderPokemons(1).catch(console.error);