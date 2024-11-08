const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon';

const sanitizeName = (name) => {
    return name
        .trim()
        .toLowerCase()
        .replace(/[^a-z]/g, '');
}

const getPokemon = async (name) => {
    const response = await fetch(`${POKEAPI_URL}/${name}`);
    return response.json();
}

const renderPokemon = (template, pokemon) => {
    const { id, name, sprites, height, weight } = pokemon;
    const html = `
    <div class="pokemon-card">
        <div class="pokemon-card__header">
            <h2>${name} <span>(${id})</span> </h2>
        </div>
        <div class="pokemon-card__content">
            <div>
                <h5>Sprites</h5>
                <img src="${sprites.front_default}" />
                <img src="${sprites.back_default}" />
            </div>
            <div>
                <h5>Weight / Height</h5>
                <p>${weight} / ${height}</p>
            </div>
        </div>
    </div>
  `;
    template.innerHTML += html;
}

export {
    getPokemon,
    sanitizeName,
    renderPokemon
}