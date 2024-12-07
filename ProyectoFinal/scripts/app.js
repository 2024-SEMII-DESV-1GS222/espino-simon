import { getAuthorizationUrl } from './login.js';
import { APIController } from './apiController.js'
import { sanitizeName } from './utils.js'
import { printResultExplore, printTicket } from './show.js'

const htmlElements = {
    exploreForm: document.querySelector('#explore-form'),
    exploreResult: document.querySelector('#explore-result'),
    btnLogin: document.querySelector('#login'),
    generateForm: document.querySelector('#generate-ticket')
}

const handlers = {
    submit: async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const query = formData.get('query');
        const sanitizedName = sanitizeName(query);
        if (!sanitizedName) {
            alert('Por favor, ingrese un nombre válido');
            return;
        };

        const searchBy = formData.get('search-by');
        const data = await APIController.search(query, searchBy);
        if (!data) {
            alert('No se ha encontrado');
            return;
        }
        htmlElements.exploreResult.innerHTML = '';

        const results = data[`${searchBy}s`].items;

        const output = printResultExplore(results, searchBy);
        htmlElements.exploreResult.innerHTML = output;
    },
    login: () => {
        const authUrl = getAuthorizationUrl();
        window.location.href = authUrl;
    },
    generate: async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const metric = formData.get('metric');
        const time = formData.get('time');
        const length = formData.get('length');
        const data = await APIController.getTops(metric, time, length);
        console.log(data);
        // printTicket();
    }
}

const bindEvents = () => {
    if (htmlElements.exploreForm)
        htmlElements.exploreForm.addEventListener('submit', handlers.submit);
    if (htmlElements.btnLogin)
        htmlElements.btnLogin.addEventListener('click', handlers.login);
    if (htmlElements.generateForm)
        htmlElements.generateForm.addEventListener('submit', handlers.generate);
}

const init = () => {
    bindEvents();
}

init();