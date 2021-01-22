import { Abstract } from './abstract';

export class Input extends Abstract {

    constructor(data) {
        super();
        this._data = data;
    }

    createTemplate() {
        return `<div>
                    <input 
                        class="uk-input" 
                        value="${this._data.value}" 
                        name="${this._data.name}" 
                        type="text" 
                        placeholder="${this._data.placeholder}"
                    >
                </div>`
    }

    get template() {
        return this.createTemplate(this._data);
    }

    setInputHandler(handler) {
        this.element.addEventListener('input', handler);
    }
}