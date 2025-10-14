import { LIMIT, totalPages, fetchPokemonList, fetchPokemonDetails } from "./api.js";

export let currentPage = 1;
export function createPokemonCard(pokemon) {
    const card = document.createElement("div");
    card.className = "card text-center p-2 shadow-sm";
    card.style.width = "12rem";
    card.innerHTML = `
    <img src="${pokemon.img}" class="card-img-top" alt="${pokemon.name}">
    <div class="card-body">
      <h5 class="card-title text-capitalize">${pokemon.name}</h5>
      <p class="card-text mb-0">Type: ${pokemon.types}</p>
    </div>
  `;
    return card;
}
export async function renderPokemons(page = 1) {
    const container = document.getElementById("pokemon-list");
    container.innerHTML = `<p class="text-center">Đang tải...</p>`;

    const offset = (page - 1) * LIMIT;
    const pokemons = await fetchPokemonList(LIMIT, offset);
    const details = await Promise.all(pokemons.map(p => fetchPokemonDetails(p.name)));

    container.innerHTML = "";
    details.forEach(p => container.appendChild(createPokemonCard(p)));

    updatePagination(page);
}

function makePageButton(label, page = null, active = false) {
    const li = document.createElement("li");
    li.className = `page-item ${active ? "active" : ""}`;
    const btn = document.createElement("button");
    btn.className = "page-link";
    btn.textContent = label;
    btn.disabled = active;
    btn.onclick = () => renderPokemons(page);
    li.appendChild(btn);
    return li;
}

function makeDisabled(text) {
    const li = document.createElement("li");
    li.className = "page-item disabled";
    li.innerHTML = `<span class="page-link">${text}</span>`;
    return li;
}

export function updatePagination(page) {
    currentPage = page;
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const windowSize = 2;
    const start = Math.max(1, currentPage - windowSize);
    const end = Math.min(totalPages, currentPage + windowSize);

    pagination.appendChild(makePageButton(1, 1, currentPage === 1));
    if (start > 2) pagination.appendChild(makeDisabled("..."));

    for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages)
            pagination.appendChild(makePageButton(i, i, i === currentPage));
    }

    if (end < totalPages - 1) pagination.appendChild(makeDisabled("..."));
    if (totalPages > 1)
        pagination.appendChild(makePageButton(totalPages, totalPages, currentPage === totalPages));

    document.getElementById("prev-btn").disabled = currentPage === 1;
    document.getElementById("next-btn").disabled = currentPage === totalPages;
}