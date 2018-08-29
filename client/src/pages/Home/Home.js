import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import logo from './kgnu_logo.png';

import { Link, SubmitBtn } from '../../components/Button';
import { Card, CardBody, CardImg, CardTitle } from '../../components/Card';
import { Form, FormGroup, Input, Label } from '../../components/Form';

class Home extends Component {

  state = {
    username: '',
    password: ''
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div id="home">
        <section className="home__login">
        <Card>
            <img className="img img--home" src={logo} /> 
            <CardBody helpers='text-center'>

              <CardTitle>
                COMRAD - KGNU PLAYLIST LOGIN:
              </CardTitle>
              
              <Form>

                <FormGroup>
                  <Input
                    name="username" 
                    onChange={this.handleInputChange} 
                    placeholder="Username"
                    type="text"
                    value={this.state.username}
                  />
                  <Label>Username</Label>
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
