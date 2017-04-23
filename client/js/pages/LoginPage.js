import React from 'react';
import { browserHistory, Link } from 'react-router';
import UserService from '../services/UserService';

export default class LoginPage extends React.Component {

  constructor() {
    super();
    this.state = {

    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(){

    let email = this.refs.email.value;
    let password = this.refs.password.value;

    let postData = {

      email: email,
      password: password
    };

    UserService.loginUser(postData).then(function (response) {
      localStorage.setItem("accessToken",response.data.token);
      browserHistory.push("/dashboard");
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
              <h3>Login</h3>
              <hr />
            </div>
          </div>
          <form className="form-horizontal">

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
                <button type="button" onClick={this.onFormSubmit} className="btn btn-default">Submit</button>
              </div>
            </div>
          </form>

        </div>
     </div>
    );
  }
}
