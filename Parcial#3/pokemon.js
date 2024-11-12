import { capitalize, loopEvolutions } from "./utils.js";

const POKEAPI_URL = 'https://pokeapi.co/api/v2';

const sanitizeName = (name) => {
    return name
        .trim()
        .toLowerCase()
        .replace(/[^a-z\-]/g, '');
}

const getPokemon = async (name, route) => {
    const response = await fetch(`${POKEAPI_URL}/${route}/${name}`);
    return response.json();
}

const getEvolutions = async (name, dataPokemon) => {
    const responseSpecies = await fetch(`${POKEAPI_URL}/pokemon-species/${name}`);
    const dataSpecies = await responseSpecies.json();
    const responseEvolution = await fetch(`${dataSpecies.evolution_chain.url}`);
    const dataEvolution = await responseEvolution.json();
    return {
        ...dataPokemon,
        evolutions: loopEvolutions(dataEvolution)
    }
}

const renderPokemon = (template, pokemon) => {
    const { id, name, sprites, height, weight, abilities, evolutions } = pokemon;
    const html = `
    <div class="pokemon-card">
        <div class="pokemon-card__header">
            <h2>${capitalize(name)} <span>(${id})</span> </h2>
        </div>
        <div class="pokemon-card__content">
            <div>
                <h5>Sprites</h5>
                <img src="${sprites.front_default || 'https://img.icons8.com/?size=48&id=eQoYCq7PgMch&format=png'}" />
                <img src="${sprites.back_default || 'https://img.icons8.com/?size=48&id=eQoYCq7PgMch&format=png'}" />
            </div>
            <div>
                <h5>Weight / Height</h5>
                <p>${weight} / ${height}</p>
            </div>
            <div>
                <h5>Evolution chain</h5>
                <ul>
                    ${evolutions.map(evolution => `<li>${capitalize(evolution)}</li>`).join('')}
                </ul>
            </div>
            <div>
                <h5>Abilities</h5>
                <ul>${getAbilities(abilities)}</ul>
            </div>
        </div>
    </div>
  `;
    template.innerHTML += html;
}

const renderPokemonAbilities = (template, data) => {
    const { name, pokemon } = data;
    const html = `
    <div class="pokemon-card">
        <div class="pokemon-card__header">
            <h2>${capitalize(name)}</h2>
        </div>
        <div class="pokemon-card__content">
            <div>
                <h5>Who can learn it?</h5>
                <ul>
                    ${pokemon.map(index => `<li>${capitalize(index.pokemon.name)}</li>`).join('')}
                </ul>
            </div>
        </div>
    </div>
  `;
    template.innerHTML += html;
}

const getAbilities = (abilities) => {
    return abilities.map(ability => `<li>${capitalize(ability.ability.name)}</li>`).join('');
}

export {
    getPokemon,
    sanitizeName,
    renderPokemon,
    getEvolutions,
    renderPokemonAbilities
}