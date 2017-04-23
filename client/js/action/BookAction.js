import BookService from '../services/BookService';

class BookAction {

    getBooks(){
        let response = BookService.getBooks();
        return response;
    }

    saveBook(bookData){
        let accountDetails = BookService.saveBook(bookData);
        return accountDetails;
    }

    deleteBook(bookId){
        let accountDetails = BookService.deleteBook(bookId);
        return accountDetails;
    }
}

export default new BookAction();
