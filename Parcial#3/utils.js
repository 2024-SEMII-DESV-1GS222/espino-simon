const capitalize = (name) => {
    return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
}

const loopEvolutions = ({ chain }) => {
    const evolutionNames = [];
    const addEvolutions = (evolution) => {
        evolutionNames.push(evolution.species.name);
        if (evolution.evolves_to) {
            evolution.evolves_to.forEach(nextEvolution => addEvolutions(nextEvolution));
        }
    }
    addEvolutions(chain);

    return evolutionNames;
}

export {
    capitalize,
    loopEvolutions
}