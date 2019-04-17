import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userAdd } from '../../redux/user';

class UserAddPage extends Component {
  state = {
    email: '',
    password: 'TempPassword',
    first_name: '',
    last_name: '',
    on_air_name: '',
    role: '',
    status: '',
    can_delete: false,
  };

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleInputBlur = e => {
    // validate.input(e.target);
  };

  handleCheckBox = e => {
    const { name } = e.target;

    this.setState(prevState => ({
      [name]: !prevState[name],
    }));
  };

  handleFormSubmit = e => {
    e.preventDefault();

    // const valid = validate.submit();

    // if (valid) {
    //   this.props.userAdd(this.state, () => {
    //     this.props.history.push('/user');
    //   });
    // }
  };

  render() {
    return (
      <div>Test</div>
      // <Form handleFormSubmit={this.handleFormSubmit}>
      //   <Label text="Email" />
      //   <Input
      //     name="email"
      //     onChange={this.handleInputChange}
      //     onBlur={this.handleInputBlur}
      //     placeholder="Email"
      //     type="text"
      //     value={this.state.email}
      //   />
      //   <Label text="First Name" />
      //   <Input
      //     name="first_name"
      //     onChange={this.handleInputChange}
      //     onBlur={this.handleInputBlur}
      //     placeholder="First Name"
      //     type="text"
      //     value={this.state.first_name}
      //   />
      //   <Label text="Last Name" />
      //   <Input
      //     name="last_name"
      //     onChange={this.handleInputChange}
      //     onBlur={this.handleInputBlur}
      //     placeholder="Last Name"
      //     type="text"
      //     value={this.state.last_name}
      //   />
      //   <Label text="On Air Name" />
      //   <Input
      //     name="on_air_name"
      //     onChange={this.handleInputChange}
      //     onBlur={this.handleInputBlur}
      //     placeholder="On Air Name"
      //     type="text"
      //     value={this.state.on_air_name}
      //   />
      //   <Label text="Role" />
      //   <Select
      //     name="role"
      //     onChange={this.handleInputChange}
      //     selectOptions={roleOptions}
      //     placeholder="Role"
      //     type="text"
      //     value={this.state.role}
      //   />
      //   <Label text="Status" />
      //   <Select
      //     name="status"
      //     onChange={this.handleInputChange}
      //     selectOptions={statusOpions}
      //     placeholder="Status"
      //     type="text"
      //     value={this.state.status}
      //   />
      //   <Label text="Can Delete" />
      //   <Checkbox
      //     name="can_delete"
      //     onClick={this.handleCheckBox}
      //     type="checkbox"
      //     value={this.state.can_delete}
      //   />
      //   <button type="submit">Submit</button>
      //   <Link to="/user">Go Back</Link>
      // </Form>
    );
  }
}

export default connect(
  null,
  { userAdd },
)(UserAddPage);
