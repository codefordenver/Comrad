import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import Downshift from 'downshift';
import { connect } from 'react-redux';

import { libraryActions } from '../../redux/';
import Input from '../Input';

// This is set up to be used with initial values for artists only
// If you want to have an initial value displayed for an album or track, you'll have to modify the code

class DropdownLibrary extends Component {
  constructor(props) {
    super(props);

    const { artist, libraryActions, libraryType } = this.props;

    let selectedLibraryItemDisplayName = '';
    let searching = false;
    let self = this;
    if (libraryType === 'artist') {
      selectedLibraryItemDisplayName = artist ? artist.name : '';
      //run a host search on the existing value so that the host list is populated with information
      if (selectedLibraryItemDisplayName.length > 0) {
        searching = true;

        libraryActions.search(
          libraryType,
          selectedLibraryItemDisplayName,
          null,
          null,
          10,
          true,
          function() {
            if (typeof self.state.showSearchingText === 'number') {
              //it's a timeout
              clearTimeout(self.state.showSearchingText);
            }
            self.setState({ searching: false, showSearchingText: false });
          },
        );
      }
    }

    this.state = {
      cachedSearches: {},
      currentInputValue: selectedLibraryItemDisplayName,
      haveSelectedTextOnClick: false,
      initialValue: libraryType === 'artist' && artist ? artist._id : null,
      hasFocus: false,
      selectedLibraryItem:
        libraryType === 'artist' && artist
          ? { _id: artist._id, name: selectedLibraryItemDisplayName }
          : null,
      searching: searching,
      showSearchingText: searching
        ? setTimeout(function() {
            self.setState({ showSearchingText: true });
          }, 2000)
        : false, //note: there's some duplicated code throughout this related to this timeout, so may want to consolidate when changing
    };
  }

  componentDidUpdate() {
    const { artist, libraryState, libraryType } = this.props;
    const { cachedSearches } = this.state;

    //check to see if the artist property has changed: if so, reset the initial value
    if (libraryType === 'artist') {
      if (artist != null && this.state.initialValue !== artist._id) {
        this.setState({
          currentInputValue: artist.name,
          initialValue: artist._id,
          selectedLibraryItem: artist,
        });
      } else if (artist === null && this.state.initialValue != null) {
        this.setState({
          currentInputValue: '',
          initialValue: null,
          selectedLibraryItem: null,
        });
      }
    }

    // cache the search query in state so that we can quickly update the search results
    if (
      libraryState.docsForDropdown != null &&
      libraryState.searchString != null &&
      !(libraryState.searchString.toLowerCase() in cachedSearches)
    ) {
      cachedSearches[libraryState.searchString.toLowerCase()] =
        libraryState.docsForDropdown;
      this.setState({ cachedSearches: cachedSearches });
    }
  }

  //handles input box change
  handleChange = e => {
    const { libraryActions, libraryType } = this.props;
    const { cachedSearches, librarySearchTimeout } = this.state;
    const { value } = e.target;

    if (value.length && !(value.toLowerCase() in cachedSearches)) {
      //throttle the libraryActions.search function so we are not calling it rapidly if users are quickly deleting or typing text
      if (librarySearchTimeout != null) {
        clearTimeout(librarySearchTimeout);
      }
      let self = this;
      this.setState({
        searching: true,
        librarySearchTimeout: setTimeout(() => {
          self.setState({
            showSearchingText: setTimeout(function() {
              self.setState({ showSearchingText: true });
            }, 2000),
          }); //note: there's some duplicated code throughout this related to this timeout, so may want to consolidate when changing
          libraryActions.search(
            libraryType,
            value,
            null,
            null,
            10,
            true,
            function() {
              if (typeof self.state.showSearchingText === 'number') {
                //it's a timeout
                clearTimeout(self.state.showSearchingText);
              }
              self.setState({ searching: false, showSearchingText: false });
            },
          );
        }, 150),
      });
    }

    //update the textbox value
    this.setState({ currentInputValue: value });
  };

  //on blur from the input box, reset the dropdown to its original value
  handleBlur = e => {
    const { selectedLibraryItem } = this.state;

    this.setState({
      currentInputValue:
        selectedLibraryItem != null ? selectedLibraryItem.name : '',
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
    const { input, onLibraryItemSelect } = this.props;

    if (selection === null) {
      return;
    }

    if (input != null && input.onChange) {
      //redux form onChange handler
      input.onChange(selection._id);
    }

    if (typeof onLibraryItemSelect == 'function') {
      onLibraryItemSelect(selection);
    }

    this.setState(
      {
        currentInputValue: selection != null ? selection.name : '',
        selectedLibraryItem: selection || null,
      },
      function() {
        document.activeElement.blur(); //remove focus from the Host text field
      },
    );
  };

  //function for rendering the options in the host dropdown results
  renderLibraryListItem = item => {
    const { libraryType } = this.props;
    if (libraryType === 'album') {
      return (
        <div key={item._id}>
          {item.name + ' '}
          {item.artist != null ? (
            <>
              by <i>{item.artist.name}</i>
            </>
          ) : (
            ''
          )}
        </div>
      );
    }
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
      renderLibraryListItem,
      props,
      state,
    } = this;
    const {
      cachedSearches,
      currentInputValue,
      hasFocus,
      searching,
      showSearchingText,
    } = state;
    const {
      autoFocus,
      className,
      inputClass = '',
      libraryType,
      meta = {
        active: false,
        dirty: false,
        error: false,
        touched: false,
        submitting: false,
      } /* default values for when component is not used within React Form */,
    } = props;

    // get the documents from the cachedResults property rather than Redux,
    // because Redux might not have the search results of the current input value if there
    // were multiple host search XHR requests that didn't finish in the order they were called
    const docs = cachedSearches[currentInputValue.toLowerCase()] || [];

    const libraryTypeCapitalized =
      libraryType.charAt(0).toUpperCase() + libraryType.substring(1);

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
          selectedLibraryItem,
        }) => (
          <div
            key="library-field"
            className={classnames('library-field', className)}
          >
            <Input
              inputClassName={inputClass}
              label={libraryTypeCapitalized}
              name="libraryItem"
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
              meta={meta}
            />

            {/* Library dropdown */}
            {hasFocus && docs.length > 0 && (
              <div className="dropdown__list dropdown__list--library-list active">
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
                    {renderLibraryListItem(item)}
                  </div>
                ))}
              </div>
            )}
            {hasFocus &&
              docs.length === 0 &&
              !searching &&
              currentInputValue.length > 0 && (
                <div className="dropdown__list dropdown__list--library-list active">
                  <div className="dropdown__item dropdown__item--no-results">
                    No Results
                  </div>
                </div>
              )}
            {hasFocus &&
              searching &&
              showSearchingText === true &&
              currentInputValue.length > 0 && (
                <div className="dropdown__list dropdown__list--library-list active">
                  <div className="dropdown__item dropdown__item--no-results">
                    Searching...
                  </div>
                </div>
              )}
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
)(DropdownLibrary);
