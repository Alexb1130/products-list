import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://www.lenvendo.ru/api/js-test-task/',
    timeout: 10000,
});

export class Api {
    static get client() {
        return instance;
    }
}