import { getPokemon, getEvolutions, sanitizeName, renderPokemon, renderPokemonAbilities } from './pokemon.js';

const htmlElements = {
    form: document.querySelector('.form-buscador'),
    txtBuscador: document.querySelector('.txt-buscador'),
    selectSearchType: document.querySelector('select'),
    btnLimpiar: document.querySelector('.btn-limpiar'),
    result: document.querySelector('.container-resultado')
}

const handlers = {
    submit: async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const pokemonName = formData.get('pokemon-name');
        const sanitizedName = sanitizeName(pokemonName);
        if (!sanitizedName) {
            alert('Por favor, ingrese un nombre válido');
            return;
        };
        htmlElements.result.innerHTML = '';

        if (htmlElements.selectSearchType.selectedIndex === 1) {
            const pokemon = await getPokemon(sanitizedName, 'pokemon');
            const evolutions = await getEvolutions(sanitizedName, pokemon);
            renderPokemon(htmlElements.result, evolutions);

        } else if (htmlElements.selectSearchType.selectedIndex === 2) {
            const pokemon = await getPokemon(sanitizedName, 'ability');
            renderPokemonAbilities(htmlElements.result, pokemon);

        } else {
            alert('Eliga por que método desea buscar!');
            return;
        }

        htmlElements.btnLimpiar.style.visibility = "visible";
        htmlElements.result.style.visibility = "visible";
    },

    clear: () => {
        htmlElements.result.innerHTML = '';
        htmlElements.btnLimpiar.style.visibility = "hidden";
        htmlElements.txtBuscador.value = "";
        htmlElements.selectSearchType.selectedIndex = 0;
        htmlElements.result.style.visibility = "hidden";
    }
}

const bindEvents = () => {
    htmlElements.form.addEventListener('submit', handlers.submit);
    htmlElements.btnLimpiar.addEventListener('click', handlers.clear);
}

const init = () => {
    bindEvents();
}

init();