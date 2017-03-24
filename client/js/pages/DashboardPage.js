import React from 'react';
import CarAction from '../action/CarAction';
import {Table, Column, Cell} from 'fixed-data-table';
import AddCarModal from '../modals/AddCarModal';


export default class DashboardPage extends React.Component {


    constructor() {
        super();
        this.state = {
            cars: [],
            openModal: false
        };
        this.addCar = this.addCar.bind(this);
    }

    componentWillMount(){
        let self = this;
        CarAction.getCars().then(function (cars) {
            self.setState({cars: cars.data})
        }).catch(function (error) {
            console.log(error);
        })
    }

    addCar(){
        this.setState({
            openModal: true
        })
    }

    closeModal(newCar){

        if(newCar){
            this.state.cars.push(newCar);
            this.setState({
                openModal: false,
                cars: this.state.cars
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
                            <h3>Dashboard (Cars)</h3>
                            <hr />
                        </div>
                        <div className="col-xs-6">
                            <button className="btn" onClick={this.addCar}>Add Car</button>
                        </div>
                    </div>
                    <Table
                        rowsCount={this.state.cars.length}
                        rowHeight={60}
                        headerHeight={40}
                        width={1000}
                        height={1000}>

                        <Column
                            header={<Cell>Car Name</Cell>}
                            cell={props => (
                                <Cell {...props}>
                                    {this.state.cars[props.rowIndex].name}
                                </Cell>
                            )}
                            width={150}/>
                        <Column
                            header={<Cell>Car Model</Cell>}
                            cell={props => (
                                <Cell {...props}>
                                    {this.state.cars[props.rowIndex].model}
                                </Cell>
                            )}
                            width={100}/>

                        <Column
                            header={<Cell>Car Color</Cell>}
                            cell={props => (
                                <Cell {...props}>
                                    {this.state.cars[props.rowIndex].color}
                                </Cell>
                            )}
                            width={240}/>


                        </Table>
                    {addModal}

                </div>

        );
    }
}
