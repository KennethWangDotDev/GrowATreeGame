import { getFPS } from './gameloop.js';

export function capFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getResourceName(str) {
    if (str.endsWith('.current') || str.endsWith('.max')) {
        return str.split('.')[str.split('.').length - 2];
    }
    return str.split('.')[str.split('.').length - 1];
}

export function incrementToSpeed(increment) {
    return (100 / (getFPS() * increment)).toFixed(3);
}

// WIP
export function resourceIsMaxed(resource) {

}
