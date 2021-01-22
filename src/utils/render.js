export const RenderPosition = {
    AFTERBEGIN: `afterbegin`,
    BEFOREEND: `beforeend`
};

export const render = (container, child, place = RenderPosition.BEFOREEND) => {

    switch (place) {
        case RenderPosition.AFTERBEGIN:
            container.prepend(child);
            break;
        case RenderPosition.BEFOREEND:
            container.append(child);
            break;
    }
};

export const createElement = (template) => {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;

    return newElement.firstChild;
};

export const remove = (component) => {

    if (component === null) {
        return;
    }

    component.element.remove();
    component.removeElement();
};

export const createMessage = (message = 'Error', type) => {
    const el = document.createElement('div');
    el.classList.add(type, 'uk-text-large', 'uk-text-center');
    el.textContent = message;

    return el;
}