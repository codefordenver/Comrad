import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/Button';
import Card, { CardBody } from '../../components/Card';
import FormArtistUpdate from '../../components/FormArtistUpdate';
import ViewArtist from '../../components/ViewArtist';

class ArtistViewPage extends Component {
  state = {
    edit: false,
  };

  handleEditClick = () => {
    this.setState(prevState => ({
      edit: !prevState.edit,
    }));
  };

  render() {
    const { handleEditClick, props, state } = this;
    const { edit } = state;

    return (
      <div className="artist-view-page">
        <Card>
          <CardBody>
            {edit ? (
              <FormArtistUpdate {...props}>
                <Button className="mr-1" color="primary" type="submit">
                  Update
                </Button>
                <Button color="danger" onClick={handleEditClick}>
                  Cancel
                </Button>
              </FormArtistUpdate>
            ) : (
              <ViewArtist {...props}>
                <Button type="button" onClick={handleEditClick}>
                  Edit
                </Button>
              </ViewArtist>
            )}
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ artist }) {
  return {
    artist,
  };
}

export default connect(
  mapStateToProps,
  null,
)(ArtistViewPage);
