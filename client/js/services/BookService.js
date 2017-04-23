import request from 'reqwest';
import {BOOKS} from '../constants';

const BaseService = require('./BaseService');

class BookService extends BaseService {

    saveBook(bookData) {
        return BaseService.createPostRequest('/v1', BOOKS, localStorage.getItem("accessToken"), JSON.stringify(bookData), "application/json");
    }

    getBooks(){
        return BaseService.createGetRequest('/v1', BOOKS, localStorage.getItem("accessToken"), null);
    }

    deleteBook(bookId){
        let relativeUrl = BOOKS+'?id='+bookId;
        return BaseService.createDeleteRequest('/v1', relativeUrl,localStorage.getItem("accessToken"), null, null);
    }


}

export default new BookService();
