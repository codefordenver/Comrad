import React, { Component } from 'react';

import Card, { CardBody } from '../../components/Card';
import { connect } from 'react-redux';
import FormTrackAdd from '../../components/FormTrackAdd';

class TrackAddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name, tracks } = this.props.album.doc;
    // this function calculates the maximum disk number
    let array = [];
    for (var key in tracks) {
      array.push(tracks[key].disk_number);
    }
    var maxDiskNumber = array.reduce(function(a, b) {
      return Math.max(a, b);
    });
    //

    // this calculates the maximum track number
    let array2 = [];
    for (var key in tracks) {
      if (tracks[key].disk_number === maxDiskNumber) {
        array2.push(tracks[key].track_number);
      }
    }

    var maxTrackNumber = array2.reduce(function(a, b) {
      return Math.max(a, b);
    });
    //
    return (
      <div>
        <Card>
          <CardBody>
            <h1>Add Track to Album</h1>
            <h2>Album: {name}</h2>
            <FormTrackAdd
              maxDiskNumber={maxDiskNumber}
              maxTrackNumber={maxTrackNumber}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ album }) {
  return { album };
}

export default connect(mapStateToProps)(TrackAddPage);
