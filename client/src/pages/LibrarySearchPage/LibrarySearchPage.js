import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { libraryGetAll } from '../../actions';

import ReactTable from 'react-table';

import Button from '../../components/Button';
import Card, { CardBody } from '../../components/Card';
import Dropdown, { DropdownItem } from '../../components/Dropdown';
import Form from '../../components/Form';
import Input from '../../components/Input';

class LibrarySearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      docs: [],
      totalPages: null,
      pageUrls: ['/api/library'],
      loading: true,
      loadingError: false,
      sort: {
        id: null,
        desc: null,
      },
    };

    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(state, instance) {
    this.setState({ loading: true }); //show loading overlay
    let url = this.state.pageUrls[state.page];
    if (
      state.sorted.length > 0 &&
      (state.sorted[0].id !== this.state.sort.id ||
        state.sorted[0].desc !== this.state.sort.desc)
    ) {
      url =
        '/api/library?sortBy=' +
        state.sorted[0].id +
        '&sortDescending=' +
        (state.sorted[0].desc ? '1' : '0');
      this.setState({
        pageUrls: [url], //reset page URLs, we will have to rebuild this list for each page with the new results since the sort order has changed
        sort: {
          id: state.sorted[0].id,
          desc: state.sorted[0].desc,
        },
      });
    }
    axios
      .get(url)
      .then(response => {
        let pageUrls = this.state.pageUrls;
        pageUrls.push(response.data.nextPage.url);
        this.setState({
          docs: response.data.results,
          totalPages: response.data.totalPages,
          pageUrls: pageUrls,
          loading: false,
          loadingError: false,
        });
      })
      .catch(response => {
        console.error(response);
        this.setState({
          loadingError: true,
        });
      });
  }

  render() {
    const { error, libraryGetAll } = this.props;

    const columns = [
      {
        Header: 'Type',
        accessor: 'type',
        Cell: row => {
          return row.value.charAt(0).toUpperCase() + row.value.slice(1); //capitalize the first letter
        },
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Updated At',
        accessor: 'updated_at',
        Cell: row => {
          let dateObj = new Date(row.value);
          return (
            dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString()
          );
        },
      },
    ];

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
              <Form action={libraryGetAll}>
                <Input className="mb-1" label="Search" name="q" icon="search" />
                <Button type="submit">Search</Button>
              </Form>
              <Dropdown type="plus" text="Search">
                <DropdownItem to="user/add">Add</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
              </Dropdown>
            </div>

            {!this.state.loadingError && (
              <ReactTable
                className="-highlight"
                columns={columns}
                data={this.state.docs}
                pages={this.state.totalPages}
                loading={this.state.loading}
                manual
                noDataText="No Data Found"
                showPageSizeOptions={false}
                onFetchData={this.fetchData}
              />
            )}
            {this.state.loadingError && (
              <div>An error occurred loading data. Please try again.</div>
            )}
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { error } = state.library;
  console.log('map state to props');
  console.log(state);
  return {
    error
  };
}

export default connect(
  mapStateToProps,
  { libraryGetAll },
)(LibrarySearchPage);
