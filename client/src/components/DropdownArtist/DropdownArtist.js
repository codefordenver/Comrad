import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import Downshift from 'downshift';
import { connect } from 'react-redux';

import { libraryActions } from '../../redux/';
import Input from '../Input';

class DropdownArtist extends Component {
  constructor(props) {
    super(props);

    const { artist, libraryActions } = this.props;
    const artistDisplayName = artist ? artist.name : '';

    //run a host search on the existing value so that the host list is populated with information
    if (artistDisplayName.length > 0) {
      libraryActions.search('artist', artistDisplayName, null, null, 10);
    }

    this.state = {
      cachedSearches: {},
      currentInputValue: artistDisplayName,
      haveSelectedTextOnClick: false,
      artistSearchTimeout: null,
      hasFocus: false,
      selectedArtist: artist
        ? { _id: artist.id, name: artistDisplayName }
        : null,
    };
  }

  componentDidUpdate() {
    const { libraryState } = this.props;
    const { cachedSearches } = this.state;

    // cache the search query in state so that we can quickly update the search results
    if (
      libraryState.docs != null &&
      libraryState.searchString != null &&
      !(libraryState.searchString.toLowerCase() in cachedSearches)
    ) {
      cachedSearches[libraryState.searchString.toLowerCase()] =
        libraryState.docs;
      this.setState({ cachedSearches: cachedSearches });
    }
  }

  //handles input box change
  handleChange = e => {
    const { libraryActions } = this.props;
    const { cachedSearches, librarySearchTimeout } = this.state;
    const { value } = e.target;

    if (value.length && !(value.toLowerCase() in cachedSearches)) {
      //throttle the hostSearch function so we are not calling it rapidly if users are quickly deleting or typing text
      if (librarySearchTimeout != null) {
        clearTimeout(librarySearchTimeout);
      }
      this.setState({
        librarySearchTimeout: setTimeout(
          () => libraryActions.search('artist', value, null, null, 10),
          150,
        ),
      });
    }

    //update the textbox value
    this.setState({ currentInputValue: value });
  };

  //on blur from the input box, reset the dropdown to its original value
  handleBlur = e => {
    const { selectedArtist } = this.state;

    this.setState({
      currentInputValue: selectedArtist != null ? selectedArtist.name : '',
      hasFocus: false,
      haveSelectedTextOnClick: false,
    });
  };

  handleFocus = () => {
    this.setState({ hasFocus: true });
  };

  handleInputClick = e => {
    //select all text when clicking into the field for the first time
    if (!this.state.haveSelectedTextOnClick) {
      e.target.setSelectionRange(0, e.target.value.length);
      this.setState({ haveSelectedTextOnClick: true });
    }
  };

  // process an artist being selected
  onSelect = (selection, stateAndHelpers) => {
    const { input, onArtistSelect } = this.props;

    if (selection === null) {
      return;
    }

    if (input != null && input.onChange) {
      //redux form onChange handler
      input.onChange(selection._id);
    }

    if (typeof onArtistSelect == 'function') {
      onArtistSelect(selection);
    }

    this.setState(
      {
        currentInputValue: selection != null ? selection.name : '',
        selectedArtist: selection || null,
      },
      function() {
        document.activeElement.blur(); //remove focus from the Host text field
      },
    );
  };

  //function for rendering the options in the host dropdown results
  renderArtistListItem = item => {
    return <div key={item._id}>{`${item.name}`}</div>;
  };

  dirtyOverride = currentInputValue => {
    return currentInputValue ? true : false;
  };

  render() {
    const {
      dirtyOverride,
      handleChange,
      handleFocus,
      handleInputClick,
      handleBlur,
      initialValue,
      onSelect,
      renderArtistListItem,
      props,
      state,
    } = this;
    const { cachedSearches, currentInputValue, hasFocus } = state;
    const { autoFocus } = props;

    // get the documents from the cachedResults property rather than Redux,
    // because Redux might not have the search results of the current input value if there
    // were multiple host search XHR requests that didn't finish in the order they were called
    const docs = cachedSearches[currentInputValue.toLowerCase()] || [];

    return (
      <Downshift
        onChange={onSelect}
        initialInputValue={initialValue}
        itemToString={item => (item ? item.name : '')}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
        }) => (
          <div key="artist-field" className="artist-field">
            <Input
              className=""
              label="Artist"
              name="artist"
              type="text"
              {...getInputProps({
                onChange: handleChange,
                onClick: handleInputClick,
                onBlur: handleBlur,
                onFocus: handleFocus,
              })}
              autoFocus={autoFocus}
              dirtyOverride={dirtyOverride(currentInputValue)}
              value={currentInputValue}
            />

            {/* Artist dropdown */}
            {hasFocus && docs.length > 0 ? (
              <div className="dropdown__list dropdown__list--artist-list active">
                {docs.map((item, index) => (
                  <div
                    key={index}
                    {...getItemProps({
                      key: index,
                      className: classnames(
                        'dropdown__item',
                        highlightedIndex === index && 'selected',
                      ),
                      item,
                    })}
                  >
                    {renderArtistListItem(item)}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }
}

function mapStateToProps({ library }) {
  return {
    libraryState: library,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    libraryActions: bindActionCreators({ ...libraryActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DropdownArtist);
