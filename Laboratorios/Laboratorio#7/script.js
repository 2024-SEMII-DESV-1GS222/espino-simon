// const App = (() => {
//     const htmlElements = {
//         nombre: document.querySelector('.class'),
//         color: document.querySelector('#color'),
//         btnAgregar: document.querySelector('.add')
//     }

//     const handlers = {
//         agregarCandidato(e) {
//             e.preventDefault();
            
//         }
//     }

//     const bindEvents = () => {
//         btnAgregar.htmlElements.addEventListener('onclick', handlers.agregarCandidato);
//     }

//     return {
//         init() {
//             bindEvents();
//         }
//     }
// })();

// App.init();

const App = (() => {
    let candidatos = [];

    const htmlElements = {
        nombre: document.querySelector('.nombre'),
        color: document.querySelector('#color'),
        btnAgregar: document.querySelector('.add'),
        tablaCandidatos: document.querySelector('.main-lectura'),
        grafico: document.querySelector('.main-grafica')
    };

    const handlers = {
        agregarCandidato(e) {
            e.preventDefault();

            const nombre = htmlElements.nombre.value;
            const colorSeleccionado = htmlElements.color.value;
            const color = colorSeleccionado === 'color' ? getRandomColor() : colorSeleccionado;

            if (nombre) {
                candidatos.push({ nombre, puntos: 0, color });
                handlers.actualizarTabla();
                handlers.actualizarGrafico();
            }
        },

        votar(index) {
            candidatos[index].puntos++;
            handlers.actualizarTabla();
            handlers.actualizarGrafico();
        },

        eliminarCandidato(index) {
            candidatos.splice(index, 1);
            handlers.actualizarTabla();
            handlers.actualizarGrafico();
        },

        actualizarTabla() {
            htmlElements.tablaCandidatos.innerHTML = '';
            const table = document.createElement('table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Puntos</th>
                        <th>Color</th>
                        <th>Votar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    ${candidatos.map((candidato, index) => `
                        <tr>
                            <td>${candidato.nombre}</td>
                            <td>${candidato.puntos}</td>
                            <td style="background-color:${candidato.color}; color:#fff">${candidato.color}</td>
                            <td><button onclick="App.votar(${index})">Votar</button></td>
                            <td><button onclick="App.eliminarCandidato(${index})">Eliminar</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            `;

            htmlElements.tablaCandidatos.appendChild(table);
        },

        actualizarGrafico() {
            htmlElements.grafico.innerHTML = '';

            const canvas = document.createElement('canvas');
            canvas.width = 500;
            canvas.height = 400;
            htmlElements.grafico.appendChild(canvas);

            const ctx = canvas.getContext('2d');

            const totalPuntos = candidatos.reduce((acc, c) => acc + c.puntos, 0);
            const anchoBarra = canvas.width / (candidatos.length || 1);

            ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

            candidatos.forEach((candidato, index) => {
                const altura = (candidato.puntos / totalPuntos) * canvas.height || 0; // Altura proporcional
                ctx.fillStyle = candidato.color;
                ctx.fillRect(index * anchoBarra, canvas.height - altura, anchoBarra - 10, altura); // Dibujar barra

                // Etiquetas
                ctx.fillStyle = '#000';
                ctx.fillText(candidato.nombre, index * anchoBarra + 10, canvas.height - altura - 10);
                ctx.fillText(`${Math.round((candidato.puntos / totalPuntos) * 100)}%`, index * anchoBarra + 10, canvas.height - altura - 30);
            });
        }
    };

    // Enlazar eventos
    const bindEvents = () => {
        htmlElements.btnAgregar.addEventListener('click', handlers.agregarCandidato);
    };

    return {
        init() {
            bindEvents();
        },
        votar(index) {
            handlers.votar(index);
        },
        eliminarCandidato(index) {
            handlers.eliminarCandidato(index);
        }
    };
})();

App.init();