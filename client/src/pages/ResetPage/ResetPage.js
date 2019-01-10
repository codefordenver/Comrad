import React, { Component } from 'react';
import { connect } from 'react-redux';
import { inputUpdate } from '../../actions';
import qs from '../../utils/queryString';

import Button from '../../components/Button';
import ResetForm from '../../components/ResetForm';
import ResetPasswordForm from '../../components/ResetPasswordForm';

class ResetPage extends Component {
  componentDidMount() {
    const { location, inputUpdate } = this.props;
    const { search } = location;

    if (search) {
      const parameters = qs(search);
      inputUpdate(parameters);
    }
  }

  render() {
    const { search } = this.props.location;

    return (
      <div className="reset-page">
        <div className="reset-page__form">
          {search ? <ResetPasswordForm /> : <ResetForm />}
        </div>
        <Button to="/">Go Back</Button>
      </div>
    );
  }
}

export default connect(
  null,
  { inputUpdate },
)(ResetPage);
