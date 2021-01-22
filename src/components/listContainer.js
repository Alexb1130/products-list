import { Abstract } from './abstract';

export class ListContainer extends Abstract {

    constructor() {
        super();
    }

    createTemplate() {
        return `<div class="list-container"></div>`
    }

    get template() {
        return this.createTemplate();
    }
}