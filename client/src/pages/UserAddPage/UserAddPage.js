import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { userAdd } from '../../actions'
import validate from '../../utils/validation'

import {
  Form,
  FormCheckBox,
  FormGroup,
  FormInput,
  FormInvalid,
  FormLabel,
  FormSelect
} from '../../components/Form'

class UserAddPage extends Component {
  state = {
    email: '',
    password: 'TempPassword',
    first_name: '',
    last_name: '',
    on_air_name: '',
    role: '',
    status: '',
    can_delete: false
  }

  handleInputChange = e => {
    const { name, value } = e.target

    this.setState({
      [name]: value
    })
  }

  handleInputBlur = e => {
    validate.input(e.target)
  }

  handleCheckBox = e => {
    const { name } = e.target

    this.setState(prevState => ({
      [name]: !prevState[name]
    }))
  }

  handleFormSubmit = e => {
    e.preventDefault()

    const valid = validate.submit()

    if (valid) {
      this.props.userAdd(this.state, () => {
        this.props.history.push('/user')
      })
    }
  }

  render() {
    const roleOptions = ['DJ', 'Admin']
    const statusOpions = ['Active', 'Inactive']

    return (
      <Form handleFormSubmit={this.handleFormSubmit}>
        <FormGroup>
          <FormLabel text="Email" />
          <FormInput
            name="email"
            onChange={this.handleInputChange}
            onBlur={this.handleInputBlur}
            placeholder="Email"
            type="text"
            value={this.state.email}
          />
          <FormInvalid text="Invalid Email Formant" />
        </FormGroup>

        <FormGroup>
          <FormLabel text="First Name" />
          <FormInput
            name="first_name"
            onChange={this.handleInputChange}
            onBlur={this.handleInputBlur}
            placeholder="First Name"
            type="text"
            value={this.state.first_name}
          />
          <FormInvalid text="Minimum 3 Characters" />
        </FormGroup>

        <FormGroup>
          <FormLabel text="Last Name" />
          <FormInput
            name="last_name"
            onChange={this.handleInputChange}
            onBlur={this.handleInputBlur}
            placeholder="Last Name"
            type="text"
            value={this.state.last_name}
          />
          <FormInvalid text="Minimum 3 Characters" />
        </FormGroup>

        <FormGroup>
          <FormLabel text="On Air Name" />
          <FormInput
            name="on_air_name"
            onChange={this.handleInputChange}
            onBlur={this.handleInputBlur}
            placeholder="On Air Name"
            type="text"
            value={this.state.on_air_name}
          />
          <FormInvalid text="Minimum 3 Characters" />
        </FormGroup>

        <FormGroup>
          <FormLabel text="Role" />
          <FormSelect
            name="role"
            onChange={this.handleInputChange}
            selectOptions={roleOptions}
            placeholder="Role"
            type="text"
            value={this.state.role}
          />
          <FormInvalid text="Select a Role" />
        </FormGroup>

        <FormGroup>
          <FormLabel text="Status" />
          <FormSelect
            name="status"
            onChange={this.handleInputChange}
            selectOptions={statusOpions}
            placeholder="Status"
            type="text"
            value={this.state.status}
          />
          <FormInvalid text="Select a Status" />
        </FormGroup>

        <FormGroup>
          <FormLabel text="Can Delete" />
          <FormCheckBox
            name="can_delete"
            onClick={this.handleCheckBox}
            type="checkbox"
            value={this.state.can_delete}
          />
        </FormGroup>

        <FormGroup>
          <button type="submit">Submit</button>
          <Link to="/user">Go Back</Link>
        </FormGroup>
      </Form>
    )
  }
}

export default connect(
  null,
  { userAdd }
)(UserAddPage)
