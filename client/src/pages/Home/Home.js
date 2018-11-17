import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import validate from '../../utils/validation';
import logo from '../../images/kgnu_logo.png';

import { Link, SubmitBtn } from '../../components/Button';
import { Card, CardBody, CardImg, CardTitle } from '../../components/Card';
import {
  Form,
  FormGroup,
  FormInput,
  FormInvalid,
  FormLabel
} from '../../components/Form'

const initialState = {
  email: '',
  password: ''
}

class Home extends Component {
  state = initialState

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  handleInputBlur = e => {
    validate.input(e.target);
  }

  handleFormSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const valid = validate.submit();

    if (valid) {
      this.props.loginUser({ email, password }, () => {
        this.props.history.push('/');
      });
    }
  }

  render() {
    const { errorMessage } = this.props.auth

    return (
      <main className="home">
        <section className="home__body">
          <Card>
            <CardImg className={'card__img--home'} src={logo} />
            <CardBody>
              <CardTitle
                text="COMRAD - KGNU PLAYLIST LOGIN:"
                className="text-center"
              />

              {errorMessage ? <div>{errorMessage}</div> : null}

              <Form handleFormSubmit={this.handleFormSubmit}>
                <FormLabel text="Email" />
                <FormGroup>
                  <FormInput
                    name="email"
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputBlur}
                    type="text"
                    value={this.state.email}
                  />
                  <FormInvalid text="Incorrect Email Address" />
                </FormGroup>

                <FormGroup>
                  <FormLabel text="Password" />
                  <FormInput
                    name="password"
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputBlur}
                    type="password"
                    value={this.state.password}
                  />
                  <FormInvalid text="Enter Password" />
                </FormGroup>

                <FormGroup className="text-center">
                  <SubmitBtn>Sign In</SubmitBtn>

                  <Link link="#">Reset Password</Link>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </section>
      </main>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(
  mapStateToProps,
  actions
)(Home)
