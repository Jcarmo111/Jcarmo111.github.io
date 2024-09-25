export function show(element) {
    element.classList.add("shown");
}

export function show_all(elements) {
    elements.map(show);
}

export function hide(element) {
    element.classList.remove("shown");
}

export function hide_all(elements) {
    elements.map(hide);
}

export function animate(element) {
    element.classList.add("animated");
}

export function animate_all(elements) {
    elements.map(animate);
}

export function deanimate(element) {
    element.classList.remove("animated");
}

export function deanimate_all(elements) {
    elements.map(deanimate);
}

export function erase(element) {
    element.classList.add("erased");
}

export function erase_all(elements) {
    elements.map(erase);
}

export function unerase(element) {
    element.classList.remove("erased");
}

export function unerase_all(elements) {
    elements.map(unerase);
}


export function insert_after(node, target) {
    target.parentNode.insertBefore(node, target.nextSibling);
}

