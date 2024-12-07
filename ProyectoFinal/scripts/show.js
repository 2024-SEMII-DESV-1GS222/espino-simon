const createTrackHTML = (item, index) => `
    <div class="card-item">
        <img src="${item.album?.images[0]?.url || 'https://via.placeholder.com/100'}" alt="Track Cover">
        <h4>${index + 1}. ${item.name}</h4>
        <p>${item.artists[0]?.name || 'Artista desconocido'}</p>
    </div>
`;

const createArtistHTML = (item, index) => `
    <div class="card-item">
        <img src="${item.images[0]?.url || 'https://via.placeholder.com/100'}" alt="${item.name}">
        <h4>${index + 1}. ${item.name}</h4>
    </div>
`;

const createAlbumHTML = (item, index) => `
    <div class="card-item">
        <img src="${item.images[0]?.url || 'https://via.placeholder.com/100'}" alt="Album Cover">
        <h4>${index + 1}. ${item.name}</h4>
        <p>${item.artists[0]?.name || 'Artista desconocido'}</p>
    </div>
`;

const printResultExplore = (results, searchBy) => {
    return results
        .map((item, index) => {
            switch (searchBy) {
                case 'track':
                    return createTrackHTML(item, index);
                case 'artist':
                    return createArtistHTML(item, index);
                case 'album':
                    return createAlbumHTML(item, index);
                default:
                    return `<p>No se encontraron resultados para ${searchBy}.</p>`;
            }
        })
        .join('');
};

const printTicket = () => {
    return results
}

export {
    printResultExplore,
    printTicket
}