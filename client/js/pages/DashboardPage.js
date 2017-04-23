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
        let addModal = <AddCarModal showModal={this.state.openModal} closeModal={this.closeModal.bind(this)} />;
        return (
                <div className="container">
                    <div className="row">
                        <div className="col-xs-6">
                            <h3>Dashboard (Books)</h3>
                            <hr />
                        </div>
                        <div className="col-xs-6">
                            <button className="btn" onClick={this.addBook}>Add Book</button>
                        </div>
                    </div>
                    <div className="col-sm-5 col-md-4">
                        <div className="search-box">
                            <span className="icon-search"/>
                            <input className="form-control" ref="searchText" placeholder="Search Book" type="text"
                                   onChange={this.searchBook}/>
                        </div>
                    </div>
                    <Table
                        rowsCount={this.state.books.length}
                        rowHeight={60}
                        headerHeight={40}
                        width={700}
                        height={1000}>

                        <Column
                            header={<Cell>Title</Cell>}
                            cell={props => (
                                <Cell {...props}>
                                    {this.state.books[props.rowIndex].title}
                                </Cell>
                            )}
                            width={150}/>
                        <Column
                            header={<Cell>Author</Cell>}
                            cell={props => (
                                <Cell {...props}>
                                    {this.state.books[props.rowIndex].author}
                                </Cell>
                            )}
                            width={100}/>

                        <Column
                            header={<Cell>ISBN</Cell>}
                            cell={props => (
                                <Cell {...props}>
                                    {this.state.books[props.rowIndex].isbn}
                                </Cell>
                            )}
                            width={240}/>

                        <Column
                            header={<Cell>Action</Cell>}
                            cell={props => (
                                <Cell {...props}>
                                   <span onClick={this.deleteBook.bind(this, this.state.books[props.rowIndex].id)}>Delete</span>
                                </Cell>
                            )}
                            width={100}/>

                        </Table>
                    {addModal}

                </div>

        );
    }
}
