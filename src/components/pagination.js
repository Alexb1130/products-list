import { Abstract } from './abstract';
import { Param } from '../const';

export class Pagination extends Abstract {
    constructor(data) {
        super();
        this._data = data;
    }

    createTemplate(data = {}) {
        return `<ul class="uk-pagination uk-flex-center uk-margin-medium-top" uk-margin>
                    <li><a href="#" class="prev-page-link ${!data[Param.PREV_PAGE] ? 'uk-disabled' : ''}"><span uk-pagination-previous><</span></a></li>
                    <li class="uk-active"><span>${data[Param.CURRENT_PAGE]}</span></li>
                    <li><a href="#" class="next-page-link ${!data[Param.NEXT_PAGE] ? 'uk-disabled' : ''}"><span uk-pagination-next>></span></a></li>
                </ul>
        `
    }

    get template() {
        return this.createTemplate(this._data);
    }

    setPrevPageClickHandler(handler) {
        this.element.querySelector('.prev-page-link').addEventListener('click', handler);
    }

    setNextPageClickHandler(handler) {
        this.element.querySelector('.next-page-link').addEventListener('click', handler);
    }
}