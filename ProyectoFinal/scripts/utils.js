const capitalize = (name) => {
    return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
}

const sanitizeName = (name) => {
    return name
        .trim()
        .toLowerCase();
}

export {
    capitalize,
    sanitizeName
}