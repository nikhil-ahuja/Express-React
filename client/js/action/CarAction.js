import CarService from '../services/CarService';

class CarAction {

    getCars(){
        let response = CarService.getCars();
        return response;
    }

    saveCar(carData){
        let accountDetails = CarService.saveCar(carData);
        return accountDetails;
    }
}

export default new CarAction();
