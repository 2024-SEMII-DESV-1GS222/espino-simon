// const App = (() => {
//     const htmlElements = {
//         btnGenerar: document.querySelector('.btnGenerar'),
//         btnAsc: document.querySelector('.btnAsc'),
//         btnDesc: document.querySelector('.btnDesc'),
//         mainContainer: document.querySelector('.main-container'),
//     }

//     const handlres = {
//         generarNumeroRandom(e) {
//             e.preventDefault();
//             let rnd;
//             let estaRepetido = false;
//             do {
//                 rnd = Math.floor(Math.random() * 99) + 1;
//                 rnd = rnd < 10 ? `0${rnd}` : `${rnd}`;

//                 const boxes = document.querySelectorAll('.box');
//                 estaRepetido = false;

//                 for (const box of boxes) {
//                     if (box.textContent === rnd) {
//                         estaRepetido = true;
//                         break;
//                     }
//                 }
//             } while (estaRepetido);

//             const box = document.createElement('div');
//             box.textContent = rnd;
//             box.classList.add('box');
//             htmlElements.mainContainer.append(box);
//         },
//         ordenarAscendentemente(e) {
//             e.preventDefault();
//             const boxes = document.querySelectorAll('.box');
//             const numbers = Array.from(boxes).map(box => parseInt(box.textContent));
//             numbers.sort((a, b) => a - b);
//             htmlElements.mainContainer.innerHTML = '';
//             numbers.forEach(number => {
//                 const box = document.createElement('div');
//                 box.textContent = number < 10 ? `0${number}` : number;  // Asegurar dos dígitos
//                 box.classList.add('box');
//                 htmlElements.mainContainer.append(box);
//             });
//         },
//         ordenarDescendentemente(e) {
//             e.preventDefault();
//             const boxes = document.querySelectorAll('.box');
//             const numbers = Array.from(boxes).map(box => parseInt(box.textContent));
//             numbers.sort((a, b) => b - a);
//             htmlElements.mainContainer.innerHTML = '';
//             numbers.forEach(number => {
//                 const box = document.createElement('div');
//                 box.textContent = number < 10 ? `0${number}` : number;  // Asegurar dos dígitos
//                 box.classList.add('box');
//                 htmlElements.mainContainer.append(box);
//             });
//         }

//     }

//     const bindEvents = () => {
//         htmlElements.btnGenerar.addEventListener('click', handlres.generarNumeroRandom);
//         htmlElements.btnAsc.addEventListener('click', handlres.ordenarAscendentemente);
//         htmlElements.btnDesc.addEventListener('click', handlres.ordenarDescendentemente);
//     }

//     return {
//         htmlElements,
//         init() {
//             bindEvents();
//         },
//     }
// })();
// App.init();

const Utils = (() => {
    const hayNumeroRepetido = (rnd, boxes) => {
        return Array.from(boxes).some(box => box.textContent === rnd);
    };

    const formatoNumeros = (num) => {
        return num < 10 ? `0${num}` : `${num}`;
    };

    const ordenarAscendentemente = (nums) => {
        return nums.sort((a, b) => a - b);
    };

    const ordenarDescendentemente = (nums) => {
        return nums.sort((a, b) => b - a);
    };

    return {
        hayNumeroRepetido,
        formatoNumeros,
        ordenarAscendentemente,
        ordenarDescendentemente,
    };
})();

const App = (({ hayNumeroRepetido, formatoNumeros, ordenarAscendentemente, ordenarDescendentemente }) => {
    const htmlElements = {
        btnGenerar: document.querySelector('.btnGenerar'),
        btnAsc: document.querySelector('.btnAsc'),
        btnDesc: document.querySelector('.btnDesc'),
        mainContainer: document.querySelector('.main-container'),
    };

    const handlers = {
        generarNumeroRandom(e) {
            e.preventDefault();
            let rnd;
            let estaRepetido;
            const boxes = document.querySelectorAll('.box');

            do {
                rnd = Math.floor(Math.random() * 99) + 1;
                rnd = formatoNumeros(rnd);
                estaRepetido = hayNumeroRepetido(rnd, boxes);
            } while (estaRepetido);

            const box = document.createElement('div');
            box.textContent = rnd;
            box.classList.add('box');
            htmlElements.mainContainer.append(box);
        },

        ordenarAscendentemente(e) {
            e.preventDefault();
            const boxes = document.querySelectorAll('.box');
            const numbers = Array.from(boxes).map(box => parseInt(box.textContent));

            const numerosOrdenados = ordenarAscendentemente(numbers);

            htmlElements.mainContainer.innerHTML = '';
            numerosOrdenados.forEach(number => {
                const box = document.createElement('div');
                box.textContent = formatoNumeros(number);
                box.classList.add('box');
                htmlElements.mainContainer.append(box);
            });
        },

        ordenarDescendentemente(e) {
            e.preventDefault();
            const boxes = document.querySelectorAll('.box');
            const numbers = Array.from(boxes).map(box => parseInt(box.textContent));

            const numerosOrdenados = ordenarDescendentemente(numbers);

            htmlElements.mainContainer.innerHTML = '';
            numerosOrdenados.forEach(number => {
                const box = document.createElement('div');
                box.textContent = formatoNumeros(number);
                box.classList.add('box');
                htmlElements.mainContainer.append(box);
            });
        }
    };

    const bindEvents = () => {
        htmlElements.btnGenerar.addEventListener('click', handlers.generarNumeroRandom);
        htmlElements.btnAsc.addEventListener('click', handlers.ordenarAscendentemente);
        htmlElements.btnDesc.addEventListener('click', handlers.ordenarDescendentemente);
    };

    return {
        htmlElements,
        init() {
            bindEvents();
        },
    };
})(Utils);

App.init();
