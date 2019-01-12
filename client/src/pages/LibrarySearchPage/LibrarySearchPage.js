import React, { Component } from 'react';
import { connect } from 'react-redux';
// import queryString from '../../utils/queryString';
import { searchLibrary } from '../../actions';

import Button from '../../components/Button';
import Card, { CardBody } from '../../components/Card';
import Form from '../../components/Form';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';

class LibrarySearchPage extends Component {
  render() {
    const options = { limit: 10 };
    return (
      <div className="library-search">
        <div className="library-search__search">
          <Card>
            <CardBody>
              <h1>Library</h1>

              <div className="library-search__search-container">
                <Form
                  styleName="mr-2"
                  action={searchLibrary}
                  options={options}
                  {...this.props}
                />
                <FormGroup>
                  <Input label="Search" name="q" type="text" icon="search" />
                </FormGroup>
                <Button type="submit">Search</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { searchLibrary },
)(LibrarySearchPage);
