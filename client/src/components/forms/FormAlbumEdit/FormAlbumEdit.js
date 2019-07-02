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
    this.state = {};
  }

  submit = values => {
    const { history, albumActions } = this.props;
    return albumActions.edit(values, albumData => {
      albumActions.clear();
      history.push(`/library/album/${albumData._id}`);
    });
  };

  render() {
    const { props, submit } = this;
    const { handleSubmit } = props;
    console.log('formalbumedit ' + props);

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
          name="album_name"
          autoFocus
          validate={requiredValidate}
        />
        <Field
          component={Input}
          label="Label"
          name="album_label"
          autoFocus
          validate={requiredValidate}
        />
        <Field component={Checkbox} label="Compliation" name="compilation" />
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
