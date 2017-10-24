export function capFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getResourceName(str) {
    if (str.endsWith('.current') || str.endsWith('.max')) {
        return str.split('.')[str.split('.').length - 2];
    }
    return str.split('.')[str.split('.').length - 1];
}
