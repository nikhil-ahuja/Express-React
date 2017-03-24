import React from 'react';
import { Button, ReactBootstrap, Modal, Form, FormGroup, ControlLabel, FormControl, FieldGroup, Tabs, Tab,Row,Col,Nav,NavItem } from 'react-bootstrap';
import CarAction from '../action/CarAction';

export default class AddCarModal extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedApplicationToken: '',
            errorField: '',
            errorMessage: ''
        };

        this.addCar = this.addCar.bind(this);
    }

    addCar(){

        let self = this;
        let name = this.refs.name.value;
        let color = this.refs.color.value;
        let model = this.refs.model.value;

        let postData = {
            "name": name,
            "color": color,
            "model": model
        };

        CarAction.saveCar(postData).then(function (response) {
            self.props.closeModal(postData);
        }).catch(function (error) {
            console.log(error);
        })

    }



    closeModal(){

        this.props.closeModal();
    }

    render() {

        return (
            <div className="modal-container text-center">
                <Modal show={this.props.showModal} onHide={this.closeModal.bind(this)} container={this} bsSize="md" aria-labelledby="contained-modal-title-md" className="edit-modal">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Add Car</Modal.Title>
                    </Modal.Header>
                    <Modal.Body bsClass="text-left modal-left-content-mod add-ltem-mod" id="add-ltem">
                        <div className="container-fluid">
                            <form onSubmit="" className="form-block line-form-mod">

                                <div className="form-group">
                                    <label htmlFor="IMEI" className="hidden">Name</label>
                                    <input type="text" className="form-control" ref="name" name="name" placeholder="Enter car name" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="ICCID" className="hidden">Color</label>
                                    <input type="text" className="form-control" ref="color" name="color" placeholder="Enter car color" required />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="ICCID" className="hidden">Model</label>
                                    <input type="text" className="form-control" ref="model" name="model" placeholder="Enter car model" required />
                                </div>

                            </form>

                        </div>

                    </Modal.Body>

                    <Modal.Footer bsStyle="text-center">
                        <Button bsStyle="primary" onClick={this.addCar}>Add</Button>
                    </Modal.Footer>
                </Modal>
                <div className="loader hidden" id="restart-gateway-loader">
                    <div className="first-l">
                        <div className="second-l">
                        </div>
                        <div className="third-l">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
