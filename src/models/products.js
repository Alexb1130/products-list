import {Observer} from '../utils/observer';

export class ProductsModel extends Observer {
    constructor(data = {}) {
        super();
        this.data = data;
    }

    getProducts() {
        return this.data.products;
    }

    setProducts(updateType, products) {
        this.data = products;

        this._notify(updateType);
    }
}