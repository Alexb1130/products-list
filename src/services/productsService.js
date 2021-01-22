import {Api} from '../api';

export class ProductsService {
    static async getProducts(params = {}) {
        let data = {};
        
        try {
            data = (await Api.client.get('/', {params})).data;
        } catch (err) {
            data = {};
            throw err;
        }

        return data;
    }    
}