import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import Card, { CardBody } from '../../components/Card';
import Loading from '../../components/Loading';
import { connect } from 'react-redux';
import FormTrackEdit from '../../components/forms/FormTrackEdit';

import { libraryActions, alertActions } from '../../redux';

class TrackEditPage extends Component {
  componentWillMount() {
    const { library, libraryActions, match } = this.props;
    const { id } = match.params;

    if (library.doc === null || id !== library.doc._id) {
      libraryActions.findOne(id);
    }
  }

  editTrackCallback = trackData => {
    const { libraryActions, alertActions, history } = this.props;
    libraryActions.clear();
    history.push(`/library/album/${trackData.album._id}`);
    alertActions.show(
      'success',
      'Success',
      "'" + trackData.name + "' has been updated",
    );
  };

  render() {
    const { library } = this.props;
    return (
      <div className="track-edit-page">
        <Card>
          <CardBody>
            <h1>Edit Track</h1>
            {library.loading && <Loading />}
            {library.doc !== null && !library.loading && (
              <FormTrackEdit
                submitCallback={this.editTrackCallback}
                history={this.props.history}
              />
            )}
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ library }) {
  return { library };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators({ ...alertActions }, dispatch),
    libraryActions: bindActionCreators({ ...libraryActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrackEditPage);
