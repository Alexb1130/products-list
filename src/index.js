import { ProductsListPresenter } from './presenters';
import { ProductsModel } from './models';
import { ProductsService } from './services';
import { remove, render, createMessage } from './utils/render';


const appInit = async () => {
    const appContainer = document.querySelector('.main');
    let errorElem = null;

    try {

        if(errorElem !== null) {
            errorElem.remove();
        }

        const productsData = await ProductsService.getProducts();
        const productsModel = new ProductsModel(productsData);
        const productsListPresenter = new ProductsListPresenter(appContainer, productsModel);

        productsListPresenter.init()
    } catch (err) {
        errorElem = createMessage('Ошибка обработки запроса', 'uk-text-danger');
        render(appContainer, errorElem);
    }
}

appInit();