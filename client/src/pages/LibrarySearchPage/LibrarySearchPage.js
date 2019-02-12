import React, { Component } from 'react';
import { connect } from 'react-redux';
import { artistAll } from '../../actions';

import Button from '../../components/Button';
import Card, { CardBody } from '../../components/Card';
import Dropdown, { DropdownItem } from '../../components/Dropdown';
import Form from '../../components/Form';
import Input from '../../components/Input';
import LargeText from '../../components/LargeText';
import TableArtist from '../../components/TableArtist';

class LibrarySearchPage extends Component {
  render() {
    const { docs, error, q, loading, artistAll } = this.props;

    return (
      <div className="library-search">
        <Card>
          <CardBody>
            <h1 className="mb-0">Library</h1>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="library-search__header">
              <Form action={artistAll}>
                <Input className="mb-1" label="Search" name="q" icon="search" />
                <Button type="submit">Search</Button>
              </Form>
              <Dropdown type="plus" text="Search">
                <DropdownItem to="user/add">Add</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
              </Dropdown>
            </div>

            <TableArtist docs={docs} loading={loading} />
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { docs, error, loading, q } = state.artist;

  return {
    docs,
    error,
    loading,
    q,
  };
}

export default connect(
  mapStateToProps,
  { artistAll },
)(LibrarySearchPage);
