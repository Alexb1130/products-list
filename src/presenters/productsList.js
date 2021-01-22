import debounce from 'lodash/debounce';
import {
    UpdateType,
    UserAction,
    Param,
    DefaultRequestParams,
    searchFieldDataDefault,
    sortByFieldSelectDataDefault,
    sortByDirectionSelectDataDefault
} from '../const';
import { render, remove, createMessage } from '../utils/render';
import { Container } from '../components/container';
import { ListContainer } from '../components/listContainer';
import { Form } from '../components/form';
import { Input } from '../components/input';
import { Select } from '../components/select';
import { Pagination } from '../components/pagination';
import { Table } from '../components/table';
import { ProductsService } from '../services';

const TIMEOUT = 700;

export class ProductsListPresenter {
    constructor(appContainer, productsModel) {
        this._appContainer = appContainer;
        this._productsModel = productsModel;
        this._container = new Container();
        this._pagination = null;
        this._listContainer = null;
        this._error = null;
        this._params = { ...DefaultRequestParams };
        this._searchFieldData = { ...searchFieldDataDefault }
        this._sortByFieldSelectData = { ...sortByFieldSelectDataDefault };
        this._sortByDirectionSelectData = { ...sortByDirectionSelectDataDefault };

        this._handleViewAction = this._handleViewAction.bind(this);
        this._handleModelEvent = this._handleModelEvent.bind(this);
        this._productsModel.addObserver(this._handleModelEvent);

        this._paginationData = {
            [Param.CURRENT_PAGE]: this._productsModel.data[Param.CURRENT_PAGE],
            [Param.PREV_PAGE]: this._productsModel.data[Param.PREV_PAGE],
            [Param.NEXT_PAGE]: this._productsModel.data[Param.NEXT_PAGE]
        };

        this._debouncedSearch = debounce((evt) => {
            const value = evt.target.value;

            if (value) {
                this._searchFieldData.value = value;
                this._params[Param.SEACRCH] = value;
                this._handleViewAction(UserAction.SEACRCH, UpdateType.MINOR)
            } else {
                this._searchFieldData.value = '';
                delete this._params[Param.SEACRCH];
                this._handleViewAction(UserAction.SEACRCH, UpdateType.MINOR);
            }

        }, TIMEOUT)

        this._searchSortForm = this._createSearchSortForm();
    }

    get products() {
        return this._productsModel.getProducts();
    }

    init() {
        this._listContainer = new ListContainer();
        this._pagination = this._createPagination(this._paginationData);

        render(this._appContainer, this._container.element);
        render(this._container.element, this._searchSortForm.element);
        render(this._container.element, this._listContainer.element);

        this._renderList(this._listContainer.element);

        render(this._container.element, this._pagination.element);
    }

    _handleModelEvent(updateType) {
        switch (updateType) {
            case UpdateType.MINOR:
                setTimeout(() => {
                    this._reinit();
                })
                break;
        }
    }

    async _handleViewAction(actionType, updateType) {
        switch (actionType) {
            case UserAction.CHANGE_FILTER:
                try {
                    const newProducts = await ProductsService.getProducts(this._params)
                    this._productsModel.setProducts(updateType, newProducts)

                } catch (err) {
                    this._renderMessage('Ошибка обработки запроса', 'uk-text-danger');
                }
                break;
            case UserAction.SEACRCH:
                try {

                    if(this._error !== null) {
                        this._error.remove();
                    }

                    const newProducts = await ProductsService.getProducts(this._params)
                    this._productsModel.setProducts(updateType, newProducts);
                } catch (err) {
                    this._renderMessage('Нет результатов', 'uk-text-warning');
                }
                break;
            case UserAction.NEXT_PAGE:
                try {
                    this._paginationData[Param.CURRENT_PAGE] = this._paginationData[Param.CURRENT_PAGE] + 1;
                    this._params[Param.PAGE] = this._paginationData[Param.CURRENT_PAGE];
                    const newProducts = await ProductsService.getProducts(this._params)
                    this._productsModel.setProducts(updateType, newProducts);
                    this._paginationData[Param.PREV_PAGE] = this._productsModel.data[Param.PREV_PAGE];
                    this._paginationData[Param.NEXT_PAGE] = this._productsModel.data[Param.NEXT_PAGE]
                } catch (err) {
                    this._renderMessage('Ошибка обработки запроса', 'uk-text-danger');
                }
                break;
            case UserAction.PREV_PAGE:
                try {
                    this._paginationData[Param.CURRENT_PAGE] = this._paginationData[Param.CURRENT_PAGE] - 1;
                    this._params[Param.PAGE] = this._paginationData[Param.CURRENT_PAGE];
                    const newProducts = await ProductsService.getProducts(this._params);
                    this._productsModel.setProducts(updateType, newProducts);
                    this._paginationData[Param.PREV_PAGE] = this._productsModel.data[Param.PREV_PAGE];
                    this._paginationData[Param.NEXT_PAGE] = this._productsModel.data[Param.NEXT_PAGE]
                } catch (err) {
                    this._renderMessage('Ошибка обработки запроса', 'uk-text-danger');
                }
                break;
        }

    }

    _reinit() {
        if (this._listContainer !== null) {
            remove(this._listContainer);
        }

        if (this._pagination !== null) {
            remove(this._pagination);
        }

        if(this._error !== null) {
            this._error.remove();
        }

        this._listContainer = new ListContainer();
        this._pagination = this._createPagination(this._paginationData);


        render(this._container.element, this._listContainer.element);
        this._renderList(this._listContainer.element);
        render(this._container.element, this._pagination.element);
    }

    _createSearchSortForm() {
        const form = new Form();
        const searchField = new Input(this._searchFieldData);
        const sortByFieldSelect = new Select(this._sortByFieldSelectData);
        const sortByDerectionSelect = new Select(this._sortByDirectionSelectData);

        render(form.element, sortByFieldSelect.element);
        render(form.element, sortByDerectionSelect.element);
        render(form.element, searchField.element);

        form.setSubmitHaandler();

        form.setChangeHaandler((evt) => {

            if (evt.target.name === this._searchFieldData.name) {
                return;
            }

            const formData = new FormData(form.element);

            this._params = {
                [Param.SORT_FIELD]: formData.get(this._sortByFieldSelectData.name),
                [Param.SORT_DIRECTION]: formData.get(this._sortByDirectionSelectData.name),
                [Param.PAGE]: this._paginationData[Param.CURRENT_PAGE]
            }

            if (formData.get(this._searchFieldData.name)) {
                this._params[Param.SEACRCH] = formData.get(this._searchFieldData.name);
            }

            this._handleViewAction(UserAction.CHANGE_FILTER, UpdateType.MINOR)
        });

        searchField.setInputHandler(this._debouncedSearch);

        return form;
    }

    _createPagination(data) {
        const pagination = new Pagination(data);

        pagination.setPrevPageClickHandler((evt) => {
            evt.preventDefault();
            this._handleViewAction(UserAction.PREV_PAGE, UpdateType.MINOR);
        })
        pagination.setNextPageClickHandler((evt) => {
            evt.preventDefault();
            this._handleViewAction(UserAction.NEXT_PAGE, UpdateType.MINOR);
        })

        return pagination;
    }

    _renderList(container) {
        const table = new Table(this.products);
        table.element.childNodes[0].remove();
        render(container, table.element);

    }

    _renderMessage(message, type) {
        if (this._error !== null) {
            this._error.remove()
        }
        remove(this._listContainer);
        this._error = createMessage(message, type);
        render(this._container.element, this._error);
    }
}