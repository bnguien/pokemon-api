export const LIMIT = 30;
export let currentPage = 1;
export let totalPages = 1;

//Lấy list pokemon
export async function fetchPokemonList(limit = LIMIT, offset = 0) {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Không thể tải danh sách Pokémon");
    const data = await res.json();
    currentPage = Math.ceil(offset / limit) + 1;
    totalPages = Math.ceil(data.count / limit);
    return data.results;
}

//Lấy chi tiết 1 pokemon
export async function fetchPokemonDetails(name) {
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
