import { Abstract } from './abstract';

export class Select extends Abstract {

    constructor(data) {
        super();
        this._data = data;
    }

    createTemplate() {
        return (`<div>
                <select name="${this._data.name}" class="uk-select">
                    ${this._renderOptions(this._data.options)}
                </select>
            </div>`)
    }

    _renderOptions(options) {
        return options.map(option => `<option value="${option.value}">${option.name}</option>`)
    }

    get template() {
        return this.createTemplate()
    }
}