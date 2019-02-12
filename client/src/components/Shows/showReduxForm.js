import React from 'react';
import { Field, reduxForm } from 'redux-form';

let ContactForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" component="input" type="text" />
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

ContactForm = reduxForm({ form: 'newShow' })(ContactForm);

export default ContactForm;
