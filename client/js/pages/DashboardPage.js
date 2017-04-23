import React from 'react';
import BookAction from '../action/BookAction';
import {Table, Column, Cell} from 'fixed-data-table';
import AddCarModal from '../modals/AddBookModal';


export default class DashboardPage extends React.Component {


    constructor() {
        super();
        this.state = {
            books: [],
            openModal: false,
            finalList: []
        };
        this.addBook = this.addBook.bind(this);
        this.searchBook = this.searchBook.bind(this);
    }

    componentWillMount(){
        let self = this;
        BookAction.getBooks().then(function (books) {
            self.setState({books: books.data, finalList:books.data})
        }).catch(function (error) {
            console.log(error);
        })
    }

    deleteBook(bookId){
        let self = this;
        let booksData = this.state.books;
        let indexTobeRemoved;
        BookAction.deleteBook(bookId).then(function (books) {
            booksData.forEach(function(book, index) {
                if(book.id == bookId) {
                    indexTobeRemoved = index;
                }
            });
            booksData.splice(indexTobeRemoved, 1);
            self.setState({books: booksData});
        }).catch(function (error) {
            console.log(error);
        })
    }

    searchBook(event){
        var updatedList = this.state.finalList;
        var searchText = event.target.value.trim().toLowerCase();


        updatedList = updatedList.filter(function (item) {

            let title = (item.title) ? item.title : '';
            let isbn = (item.isbn) ? item.isbn : '';
            let author = (item.author) ? item.author : '';

            return (( title.toLowerCase().search(searchText) !== -1)
            || (isbn.toLowerCase().includes(searchText.toLowerCase()))
            || (author.toLowerCase().includes(searchText.toLowerCase())));

        });

        this.setState({books: updatedList});



    }

    addBook(){
        this.setState({
            openModal: true
        })
    }

    closeModal(newBook){

        if(newBook){
            this.state.books.push(newBook);
            this.setState({
                openModal: false,
                books: this.state.books
            })
        }else{
            this.setState({
                openModal: false
            })
        }

    }

    render() {

        return (
            <div>

                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h3>Registration</h3>
                            <hr />
                        </div>
                    </div>
                    <form className="form-horizontal">

                        <div className="form-group">
                            <label className="control-label col-sm-2" for="email">First Name:</label>
                            <div className="col-sm-6">
                                <input type="text" ref="firstName" className="form-control" id="email" placeholder="Enter First Name" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-2" for="email">Last Name:</label>
                            <div className="col-sm-6">
                                <input type="text" ref="lastName" className="form-control" id="email" placeholder="Enter Last Name" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label col-sm-2" for="email">Email:</label>
                            <div className="col-sm-6">
                                <input type="email" ref="email" className="form-control" id="email" placeholder="Enter email" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2" for="pwd">Password:</label>
                            <div className="col-sm-6">
                                <input type="password" ref="password" className="form-control" id="pwd" placeholder="Enter password" />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button id="loginUser" type="button" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
