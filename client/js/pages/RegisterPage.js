import React from 'react';
import DocumentTitle from 'react-document-title';
import UserService from '../services/UserService';
import { browserHistory, Link } from 'react-router';


export default class RegisterPage extends React.Component {

  constructor() {
    super();
    this.state = {

    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(){
    let firstName = this.refs.firstName.value;
    let lastName = this.refs.lastName.value;
    let email = this.refs.email.value;
    let password = this.refs.password.value;

    let postData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };

    UserService.registerUser(postData).then(function (response) {
      browserHistory.push("/login");
    }).catch(function (err) {
      console.log("err: ",err);
    });
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
                <button id="loginUser" type="button" onClick={this.onFormSubmit} className="btn btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
