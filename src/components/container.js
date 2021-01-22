import { Abstract } from './abstract';

export class Container extends Abstract {

    constructor() {
        super();
    }

    createTemplate() {
        return `<div class="container"></div>`
    }

    get template() {
        return this.createTemplate();
    }
}