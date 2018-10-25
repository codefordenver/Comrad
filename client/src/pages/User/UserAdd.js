import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { userAdd } from '../../actions';

import { Form, FormGroup, FormInput, FormLabel, FormSelect } from '../../components/Form'

class UserAdd extends Component {
  state = {
    email: '',
    password: 'TempPassword',
    first_name: '',
    last_name: '',
    on_air_name: '',
    role: '',
    status: '',
    can_delete: true
  }

  handleInputChange = e => {
    const { name, value } = e.target

    this.setState({
      [name]: value
    })
  }

  handleFormSubmit = e => {
    e.preventDefault()

    this.props.userAdd(this.state, () => {
      this.props.history.push('/user');
    });
  }

  render() {
    const roleOptions = ['DJ', 'Admin']
    const statusOpions = ['Active', 'Inactive']

    return (
      <Form handleFormSubmit={this.handleFormSubmit}>
        <FormGroup>
          <FormLabel
            text={"Email"}
          />
          <FormInput
            name="email"
            onChange={this.handleInputChange}
            placeholder="Email"
            type="text"
            value={this.state.email}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel 
            text={"First Name"}
          />
          <FormInput
            name="first_name"
            onChange={this.handleInputChange}
            placeholder="First Name"
            type="text"
            value={this.state.first_name}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel 
            text={"Last Name"}
          />
          <FormInput
            name="last_name"
            onChange={this.handleInputChange}
            placeholder="Last Name"
            type="text"
            value={this.state.last_name}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel 
            text={"On Air Name"}
          />
          <FormInput
            name="on_air_name"
            onChange={this.handleInputChange}
            placeholder="On Air Name"
            type="text"
            value={this.state.on_air_name}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel 
            text={"Role"}
          />
          <FormSelect
            name="role"
            onChange={this.handleInputChange}
            selectOptions={roleOptions}
            placeholder="Role"
            type="text"
            value={this.state.role}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel 
            text={"Status"}
          />
          <FormSelect
            name="status"
            onChange={this.handleInputChange}
            selectOptions={statusOpions}
            placeholder="Status"
            type="text"
            value={this.state.status}
          />
        </FormGroup>
        <button type="submit">Submit</button>
        <Link to="/user">Go Back</Link>
      </Form>
    )
  }
}

export default connect(
  null,
  { userAdd }
)(UserAdd);
