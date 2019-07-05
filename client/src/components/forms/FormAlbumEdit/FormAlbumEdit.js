import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { requiredValidate } from '../../../utils/validation';
import { albumActions } from '../../../redux';
import Button from '../../Button';
import Input from '../../Input';
import { bindActionCreators } from 'redux';
import Checkbox from '../../Checkbox';

class FormAlbumEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compilation: '',
    };
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  componentDidMount() {
    this.setState({
      compilation: this.props.initialValues.compilation,
    });
  }

  handleCheckbox() {
    this.setState({
      compilation: !this.state.compilation,
    });
  }

  submit = values => {
    const { history, albumActions } = this.props;
    console.log(this.state, values);
    return albumActions.edit(values, albumData => {
      albumActions.clear();
      history.push(`/library/album/${albumData._id}`);
    });
  };

  render() {
    const { props, submit } = this;
    const { handleSubmit } = props;

    return (
      <form
        className="form-album-edit"
        onSubmit={handleSubmit(data => {
          submit({
            ...data,
          });
        })}
      >
        <Field
          component={Input}
          label="Name"
          name="name"
          autoFocus
          validate={requiredValidate}
        />
        <Field
          component={Input}
          label="Label"
          name="label"
          autoFocus
          validate={requiredValidate}
        />
        <Field
          component={Checkbox}
          label="Compilation"
          name="compilation"
          onClick={this.handleCheckbox}
          checked={this.state.compilation}
          value={this.state.compilation}
        />
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  const { name, label, compilation, _id } = state.album.doc;
  return {
    initialValues: {
      name: name,
      label: label,
      compilation: compilation,
      id: _id,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    albumActions: bindActionCreators({ ...albumActions }, dispatch),
  };
}

const ReduxFormAlbumEdit = reduxForm({
  form: 'albumEdit',
})(FormAlbumEdit);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxFormAlbumEdit);
