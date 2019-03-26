import React, { Component } from 'react';
import { connect } from 'react-redux';
import { artistFindOne } from '../../redux/artist';

class ViewArtist extends Component {
  componentDidMount() {
    const { artist, artistFindOne, match } = this.props;
    const { _id } = artist.doc;
    const { id } = match.params;

    if (id !== _id) {
      artistFindOne(id);
    }
  }

  render() {
    const { props } = this;
    const { artist } = props;
    const { loading, doc } = artist;
    const { name } = doc;

    return <>{loading ? null : <h1 className="mb-2">{name}</h1>}</>;
  }
}

function mapStateToProps({ artist }) {
  return {
    artist,
  };
}

export default connect(
  mapStateToProps,
  { artistFindOne },
)(ViewArtist);
