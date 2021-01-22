import { Abstract } from './abstract';

export class Form extends Abstract {

    constructor(data) {
        super();
        this._data = data;
    }

    createTemplate() {
        return (`<form class="form uk-margin-large-top uk-margin-medium-bottom"></form>`)
    }

    get template() {
        return this.createTemplate();
    }

    setSubmitHaandler() {
        this.element.addEventListener('submit', this._preventSubmit)
    }

    setChangeHaandler(handler) {
        this.element.addEventListener('change', handler)
    }

    _preventSubmit(evt) {
        evt.preventDefault();
    }
}