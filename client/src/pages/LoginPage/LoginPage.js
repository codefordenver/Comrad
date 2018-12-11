import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import validate from '../../utils/validation';
import logo from '../../images/kgnu_logo.png';

import Button from '../../components/Button'

import Card from '../../components/Card'
import CardBody from '../../components/CardBody'
import CardImg from '../../components/CardImg'
import CardTitle from '../../components/CardTitle'
import Form from '../../components/Form'
import FormGroup from '../../components/FormGroup'
import Input from '../../components/Input'
import Label from '../../components/Label'

const initialState = {
  email: '',
  password: ''
};

class LoginPage extends Component {
  state = initialState

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

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
  };

  render() {
    const { errorMessage } = this.props.auth;

    return (
      <main className="home">
        <section className="home__body">
          <Card>
            <CardImg className={'card__img--home'} imgSrc={logo} />
            <CardBody>
              <CardTitle
                text="COMRAD - KGNU PLAYLIST LOGIN:"
                className="text-center"
              />

              {errorMessage ? <div>{errorMessage}</div> : null}

              <Form onSubmit={this.handleFormSubmit}>
                <Label>Email</Label>
                <FormGroup>
                  <Input
                    name="email"
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputBlur}
                    type="text"
                    value={this.state.email}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    name="password"
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputBlur}
                    type="password"
                    value={this.state.password}
                  />
                </FormGroup>

                <FormGroup className="text-center">
                  <Button type="primary">Sign In</Button>

                  <Button type="primary">Reset Password</Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </section>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  actions
)(LoginPage)
