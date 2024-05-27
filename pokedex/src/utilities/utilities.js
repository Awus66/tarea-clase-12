export function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

export function clear(element){
    element.innerHTML = ''; 
}