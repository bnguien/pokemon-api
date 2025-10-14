//Lấy list pokemon
async function fetchAllPokemonNames(limit) {
    var url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
    const res = await fetch(url)
    if (!res.ok) throw new Error("Không thể tải danh sách Pokémon");
    const data = await res.json()
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
async function renderPokemons() {
    const container = document.getElementById("pokemon-list");
    const pokemons = await fetchAllPokemonNames(30);

    for (const pokemon of pokemons) {
        const detail = await fetchPokemonDetails(pokemon.name)

        const card = document.createElement("div");
        card.className = "card text-center p-2 shadow-sm";
        card.style.width = "12rem";

        card.innerHTML = `
            <img src="${detail.img}" class="card-img-top" alt="${detail.name}">
            <div class="card-body">
                <h5 class="card-title text-capitalize">${detail.name}</h5>
                <p class="card-text">Type: ${detail.types}</p>
            </div>
        `
        container.appendChild(card);
    }
}
renderPokemons().catch(err => console.error(err));
