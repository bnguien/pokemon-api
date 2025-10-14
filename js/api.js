const LIMIT = 30;
let currentPage = 1;
let totalPages = 1;

//Lấy list pokemon
async function fetchPokemonList(limit = LIMIT, offset = 0) {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Không thể tải danh sách Pokémon");
    const data = await res.json();
    currentPage = Math.ceil(offset / limit) + 1;
    totalPages = Math.ceil(data.count / limit);
    return data.results;
}

//Lấy chi tiết 1 pokemon
async function fetchPokemonDetails(name) {
    var url = `https://pokeapi.co/api/v2/pokemon/${name}`
    const res = await fetch(url)
    if (!res.ok) throw new Error("Không thể tải chi tiết Pokémon")
    const data = await res.json()
    return {
        name: data.name,
        img: data.sprites.front_default,
        types: data.types.map(t => t.type.name).join(', ')
    };
}
//Render html
async function renderPokemons(page = 1) {
    const container = document.getElementById("pokemon-list");
    container.innerHTML = `<p class="text-center">Đang tải...</p>`;

    const offset = (page - 1) * LIMIT;
    const pokemons = await fetchPokemonList(LIMIT, offset);
    const details = await Promise.all(pokemons.map(p => fetchPokemonDetails(p.name)));

    container.innerHTML = "";
    for (const p of details) {
        const card = document.createElement("div");
        card.className = "card text-center p-2 shadow-sm";
        card.style.width = "12rem";
        card.innerHTML = `
      <img src="${p.img}" class="card-img-top" alt="${p.name}">
      <div class="card-body">
        <h5 class="card-title text-capitalize">${p.name}</h5>
        <p class="card-text mb-0">Type: ${p.types}</p>
      </div>`;
        container.appendChild(card);
    }

    updatePagination(page);
}

function updatePagination(page) {
    currentPage = page;
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const windowSize = 2;
    const start = Math.max(1, currentPage - windowSize);
    const end = Math.min(totalPages, currentPage + windowSize);

    pagination.appendChild(makePageButton(1, 1, currentPage === 1));

    if (start > 2) pagination.appendChild(makeDisabled("..."));

    for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
            pagination.appendChild(makePageButton(i, i, i === currentPage));
        }
    }

    if (end < totalPages - 1) pagination.appendChild(makeDisabled("..."));

    if (totalPages > 1)
        pagination.appendChild(makePageButton(totalPages, totalPages, currentPage === totalPages));

    document.getElementById("prev-btn").disabled = currentPage === 1;
    document.getElementById("next-btn").disabled = currentPage === totalPages;
}

// Nút số trang
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

// Nút “...”
function makeDisabled(text) {
    const li = document.createElement("li");
    li.className = "page-item disabled";
    li.innerHTML = `<span class="page-link">${text}</span>`;
    return li;
}

document.getElementById("prev-btn").onclick = () => {
    if (currentPage > 1) renderPokemons(currentPage - 1);
};
document.getElementById("next-btn").onclick = () => {
    if (currentPage < totalPages) renderPokemons(currentPage + 1);
};

renderPokemons(1).catch(err => console.error(err));
