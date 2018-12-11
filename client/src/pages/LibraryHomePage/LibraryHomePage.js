import React, { Component } from 'react'

import { DropRightBtn } from '../../components/Button'
import { Filter } from '../../components/Filter'
import Search from '../../components/Search'

import LibraryTable from '../../components/Tables/LibraryTable'
import ArtistsTable from '../../components/Tables/ArtistsTable'
import AlbumsTable from '../../components/Tables/AlbumsTable'
import TracksTable from '../../components/Tables/TracksTable'

class LibraryHomePage extends Component {
  state = {
    filter: 'All'
  }

  handleFilterClick = item => {
    this.setState({
      filter: item
    })
  }

  handleDropRightBtnClick = item => {
    switch (item) {
      case 'Track':
        this.props.history.push('/library/add/track')
        break
      case 'Album':
        this.props.history.push('/library/add/album')
        break
      default:
        break
    }
  }

  renderTable() {
    const { filter } = this.state

    switch (filter) {
      case 'All':
        return <LibraryTable />
      case 'Artists':
        return <ArtistsTable />
      case 'Albums':
        return <AlbumsTable />
      case 'Tracks':
        return <TracksTable />
      default:
        break
    }
  }

  render() {
    const filterItems = ['All', 'Artists', 'Albums', 'Tracks']
    const dropRightBtnItems = ['Track', 'Album', 'Other']

    return (
      <div className="library__search">
        <div className="library__header">
          <div className="library__search-input">
            <Search type="library" />
          </div>
          <div className="library__add">
            {/* <DropRightBtn
              dropRightBtnItems={dropRightBtnItems}
              handleDropRightBtnClick={this.handleDropRightBtnClick}
            /> */}
          </div>
          <div className="library__filter">
            <Filter
              filterItems={filterItems}
              handleFilterClick={this.handleFilterClick}
            />
          </div>
          <div className="library__pagination">
            <div>Pagination</div>
          </div>
        </div>
        <div className="library__table">{this.renderTable()}</div>
      </div>
    )
  }
}

export default LibraryHomePage