import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import { libraryGetAll } from '../../actions';

import ReactTable from 'react-table';

import Button from '../../components/Button';
import Card, { CardBody } from '../../components/Card';
import Dropdown, { DropdownItem } from '../../components/Dropdown';
import Form from '../../components/Form';
import Input from '../../components/Input';
import LargeText from '../../components/LargeText';
import TableLibrary from '../../components/TableLibrary';

class LibrarySearchPage extends Component {
  constructor(props) {
    super(props);
    //this.props.libraryGetAll();
    this.state = {
      docs: null,
      totalPages: null,
      nextPageUrl: '/api/library',
      loading: true,
    }
    axios.get('/api/library')
      .then((response) => {        
        this.setState({
          docs: response.data.results,
          totalPages: response.data.totalPages,
          nextPageUrl: response.data.nextPage.url,
          loading: false,
        })
      });
      
    this.fetchData = this.fetchData.bind(this);
  }
  
  fetchData(state, instance) {
    // show the loading overlay
    this.setState({loading: true});
    // fetch your data
    axios.get(this.state.nextPageUrl, {
      page: state.page,
      pageSize: state.pageSize,
      sorted: state.sorted,
      filtered: state.filtered
    })
      .then((res) => {
        // Update react-table
        this.setState({
          docs: res.data.results,
          totalPages: res.data.totalPages,
          nextPageUrl: res.data.nextPage.url,
          loading: false
        })
      })
  }

  render() {
    const { error, q, loading, libraryGetAll, nextPage } = this.props;
    
    const columns = [
      {
        Header: 'ID',
        accessor: '_id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Popularity',
        accessor: 'popularity',
      },
    ];
    
    const nextPageUrl = nextPage != null ? nextPage.url : "";
    
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

            {this.state.docs != null &&
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
            }
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { docs, error, loading, q, nextPage, totalPages } = state.library;
  console.log('map state to props');
  console.log(state);
  return {
    docs,
    error,
    loading,
    q,
    nextPage,
    totalPages,
  };
}

export default connect(
  mapStateToProps,
  { libraryGetAll },
)(LibrarySearchPage);
