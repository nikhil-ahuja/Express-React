import React from 'react';
import DocumentTitle from 'react-document-title';

import { LoginForm } from 'react-stormpath';

export default class LoginPage extends React.Component {

  onFormSubmitSuccess(e, next) {
    // e will contain values about the event.
    console.log('Form submitted succesfully', e.data, e.result);

    // The function next() must be called in order for the form to continue processing.
    next();
  }

  render() {
    return (
      <DocumentTitle title={`Login`}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h3>Login</h3>
              <hr />
            </div>
          </div>
          <LoginForm onSubmitSuccess={this.onFormSubmitSuccess.bind(this)} />
        </div>
      </DocumentTitle>
    );
  }
}
