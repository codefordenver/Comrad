import React, { Component } from 'react';
import ContactForm from './showReduxForm';

class ContactPage extends Component {
  submit = values => {
    console.log(values);
  };
  render() {
    return <ContactForm onSubmit={this.submit} />;
  }
}

export default ContactPage;
