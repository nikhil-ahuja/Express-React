import React from 'react';
import CarAction from '../action/CarAction';
import {Table, Column, Cell} from 'fixed-data-table';


export default class DashboardPage extends React.Component {


    constructor() {
        super();
        this.state = {
            cars: []
        };
    }

    componentWillMount(){
        let self = this;
        CarAction.getCars().then(function (cars) {
            self.setState({cars: cars.data})
        }).catch(function (error) {
            console.log(error);
        })
    }

    render() {
        return (
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h3>Dashboard (Cars)</h3>
                            <hr />
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

                </div>

        );
    }
}
