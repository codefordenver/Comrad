import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';

import logo from './kgnu_logo.png';

import { Link, SubmitBtn } from '../../components/Button';
import { Card, CardBody, CardTitle } from '../../components/Card';
import { Form, FormGroup, Input, Label } from '../../components/Form';

class Home extends Component {

  state = {
    email: '',
    password: ''
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleFormSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    this.props.signin({ email, password }, () => {
      this.props.history.push('/dashboard');
    });
  }

  render() {
    return (
      <div id="home">
        <section className="home__login">
        <Card>
            <img alt="logo" className="img img--home" src={logo} /> 
            <CardBody helpers='text-center'>

              <CardTitle>
                COMRAD - KGNU PLAYLIST LOGIN:
              </CardTitle>
              
              <Form handleFormSubmit={this.handleFormSubmit}>

                <FormGroup>
                  <Input
                    name="email" 
                    onChange={this.handleInputChange} 
                    placeholder="Email"
                    type="text"
                    value={this.state.email}
                  />
                  <Label>Email</Label>
                </FormGroup>

                <FormGroup helpers="mb-3">
                  <Input
                    name="password"
                    onChange={this.handleInputChange} 
                    placeholder="Password"
                    type="password"
                    value={this.state.password}
                  />
                  <Label>Password</Label>
                </FormGroup>

                <SubmitBtn>Sign In</SubmitBtn>

                <Link link="#">
                  Reset Password
                </Link>
              </Form>
            </CardBody>
          </Card>
        </section>
      </div>
    )
  }
}

export default connect(null, actions)(Home);
