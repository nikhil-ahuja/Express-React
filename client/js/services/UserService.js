import request from 'reqwest';
import {USERS} from '../constants';

const BaseService = require('./BaseService');

class UserService extends BaseService {

    registerUser(userData) {
        return BaseService.createPostRequest('/v1', USERS, null, JSON.stringify(userData), "application/json");
    }

    loginUser(userData){
        let relativeUrl = USERS+'/oauth/token';
        return BaseService.createPostRequest('/v1', relativeUrl, null, JSON.stringify(userData), "application/json");
    }
}

export default new UserService();
