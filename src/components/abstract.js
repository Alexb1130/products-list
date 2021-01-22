import { createElement } from '../utils/render';

export class Abstract {
    constructor() {
        if (new.target === Abstract) {
            throw new Error(`Can't instantiate Abstract, only concrete one.`);
        }

        this._element = null;
        this._callback = {};
    }

    get template() {
        throw new Error(`the template is not passed`);
    }

    get element() {
        if (!this._element) {
            this._element = createElement(this.template);
        }

        return this._element;
    }

    removeElement() {
        this._element = null;
    }
}