import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchLibrary } from '../../actions';

// import { DropRightBtn } from '../../components/Button';
import { Filter } from '../../components/Filter';
import Search from '../../components/Search';

import AlbumsTable from '../../components/AlbumsTable';
import ArtistsTable from '../../components/ArtistsTable';
import Button from '../../components/Button';
import Form from '../../components/Form';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import LibraryTable from '../../components/LibraryTable';
import TracksTable from '../../components/TracksTable';

class LibraryHomePage extends Component {
  state = {
    filter: 'All',
    filterItems: ['All', 'Artists', 'Albums', 'Tracks'],
  };

  handleFilterClick = item => {
    this.setState({
      filter: item,
    });
  };

  renderFilter = () => {
    const { handleFilterClick, state } = this;
    const { filter, filterItems } = state;

    return (
      <div className="library__filter">
        {filterItems.map(item => (
          <div
            key={item}
            onClick={() => handleFilterClick(item)}
            className={`library__filter-item ${
              filter === item ? 'active' : ''
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    );
  };

  renderTable = () => {
    const { filter } = this.state;

    switch (filter) {
      case 'All':
        return <LibraryTable />;
      case 'Artists':
        return <ArtistsTable />;
      case 'Albums':
        return <AlbumsTable />;
      case 'Tracks':
        return <TracksTable />;
      default:
        break;
    }
  };

  render() {
    const { handleFilterClick, props, renderFilter, state } = this;
    const { searchLibrary } = props;

    console.log(this.state);

    return (
      <main className="library">
        <section className="library__header">
          <div className="library__search-input">
            <Form action={searchLibrary}>
              <FormGroup>
                <Input label="Search" name="search" type="text" icon="search" />
              </FormGroup>
            </Form>
          </div>
          <div className="library__filter">{renderFilter()}</div>
          <div className="library__pagination">
            <div>Pagination</div>
          </div>
        </section>
        <div className="library__table">{this.renderTable()}</div>
      </main>
    );
  }
}

export default connect(
  null,
  { searchLibrary },
)(LibraryHomePage);
