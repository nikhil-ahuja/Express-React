import request from 'reqwest';
import {CARS} from '../constants';

const BaseService = require('./BaseService');

class CarService extends BaseService {

    saveCar(carData) {
        return BaseService.createPostRequest('/v1', CARS, null, JSON.stringify(carData), "application/json");
    }

    getCars(){
        return BaseService.createGetRequest('/v1', CARS, null, null);
    }

}

export default new CarService();
