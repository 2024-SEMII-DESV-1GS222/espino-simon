import { getPokemon, sanitizeName, renderPokemon } from './pokemon.js';

const htmlElements = {
    form: document.querySelector('.form-buscador'),
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
        const pokemon = await getPokemon(pokemonName);
        // btnLimpiar.style.display = "inline";
        renderPokemon(htmlElements.result, pokemon);
        htmlElements.btnLimpiar.style.visibility = "visible";
    },
    
    clear: () => {
        htmlElements.result.innerHTML = ''; 
        htmlElements.btnLimpiar.style.visibility = "hidden"; 
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