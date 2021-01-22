import { Abstract } from './abstract';

export class Table extends Abstract {

    constructor(data) {
        super();
        this._data = data;
    }

    createTemplate(data) {
        return `<div class="uk-overflow-auto">
                    <table class="uk-table uk-table-small">
                        <thead>
                            <tr>
                                <th class="uk-table-shrink">Фото</th>
                                <th class="uk-table-expand">Название</th>
                                <th class="uk-width-small">Цена</th>
                            </tr>
                        </thead>
                        <tbody>${this.createTableRow(data)}</tbody>
                    </table>
                </div>`
    }

    createTableRow(data) {
        return data.map(item => (`<tr>
            <td><img class="uk-preserve-width" width="50" height="50" src="${item.image}" alt="${item.name}"</td>
            <td class="uk-text-truncate">${item.name}</td>
            <td class="uk-text-truncate">${item.price}</td>
        </tr>`))
    }

    get template() {
        return this.createTemplate(this._data);
    }
}