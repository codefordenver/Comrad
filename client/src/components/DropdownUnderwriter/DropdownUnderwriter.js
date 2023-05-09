import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import Downshift from 'downshift';
import { connect } from 'react-redux';

import Input from '../Input';

import { trafficActions } from '../../redux/traffic';

class DropdownUnderwriter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cachedSearches: {},
      currentInputValue: '',
      haveSelectedTextOnClick: false,
      underwriterSearchTimeout: null,
      hasFocus: false,
      selectedUnderwriter: null,
    };
  }

  componentDidUpdate() {
    const { traffic } = this.props;
    const { cachedSearches } = this.state;

    // cache the search query in state so that we can quickly update the search results
    if (
      traffic.underwriterSearchDocs != null &&
      traffic.underwriterSearchString != null &&
      !(traffic.underwriterSearchString.toLowerCase() in cachedSearches)
    ) {
      cachedSearches[traffic.underwriterSearchString.toLowerCase()] =
        traffic.underwriterSearchDocs;
      this.setState({ cachedSearches: cachedSearches });
    }
  }

  //handles input box change
  handleChange = e => {
    const { trafficActions } = this.props;
    const { cachedSearches, underwriterSearchTimeout } = this.state;
    const { value } = e.target;

    if (value.length && !(value.toLowerCase() in cachedSearches)) {
      //throttle the hostSearch function so we are not calling it rapidly if users are quickly deleting or typing text
      if (underwriterSearchTimeout != null) {
        clearTimeout(underwriterSearchTimeout);
      }
      this.setState({
        underwriterSearchTimeout: setTimeout(
          () => trafficActions.searchUnderwriters(value),
          150,
        ),
      });
    }

    //update the textbox value
    this.setState({ currentInputValue: value });
  };

  //on blur from the input box, reset the dropdown to its original value
  handleBlur = e => {
    const { selectedUnderwriter } = this.state;

    this.setState({
      currentInputValue: selectedUnderwriter != null ? selectedUnderwriter : '',
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

  // process an underwriter being selected
  onSelect = (selection, stateAndHelpers) => {
    const { input, onUnderwriterSelect } = this.props;

    if (selection === 'Clear') {
      this.setState({
        currentInputValue: '',
        selectedUnderwriter: null,
      },
      function() {
        document.activeElement.blur(); //remove focus from the Underwriter text field
      });
      return;
    }

    if (input != null && input.onChange) {
      //redux form onChange handler
      input.onChange(selection);
    }

    if (typeof onUnderwriterSelect == 'function') {
      onUnderwriterSelect(selection);
    }

    this.setState(
      {
        currentInputValue:
          selection != null && selection !== 'Clear' ? selection : '',
        selectedUnderwriter:
          selection != null && selection !== 'Clear' ? selection : null,
      },
      function() {
        document.activeElement.blur(); //remove focus from the Underwriter text field
      },
    );
  };

  //function for rendering the options in the host dropdown results
  renderUnderwriterListItem = item => {
    return <div key={item}>{`${item}`}</div>;
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
      renderUnderwriterListItem,
      state,
    } = this;
    const { cachedSearches, currentInputValue, hasFocus } = state;

    // get the documents from the cachedResults property rather than Redux,
    // because Redux might not have the search results of the current input value if there
    // were multiple host search XHR requests that didn't finish in the order they were called
    const items = cachedSearches[currentInputValue.toLowerCase()] || [];

    if (items.indexOf('Clear') === -1) {
      items.push('Clear');
    }

    return (
      <Downshift
        onChange={onSelect}
        initialInputValue={initialValue}
        itemToString={item => (item ? item : '')}
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
          <div key="underwriter-field" className="mb-1-5 underwriter-field">
            <Input
              className=""
              label="Underwriter"
              name="underwriter"
              type="text"
              {...getInputProps({
                onChange: handleChange,
                onClick: handleInputClick,
                onBlur: handleBlur,
                onFocus: handleFocus,
              })}
              dirtyOverride={dirtyOverride(currentInputValue)}
              value={currentInputValue}
            />

            {/* Underwriter dropdown */}
            {hasFocus ? (
              <div className="dropdown__list dropdown__list--underwriter-list active">
                {items.map((item, index) => (
                  <div
                    key={index}
                    {...getItemProps({
                      key: index,
                      className: classnames(
                        'dropdown__item',
                        highlightedIndex === index && 'selected',
                        item === 'Clear' && 'dropdown__item--grey',
                      ),
                      item,
                    })}
                  >
                    {renderUnderwriterListItem(item)}
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

function mapStateToProps({ traffic }) {
  return {
    traffic,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    trafficActions: bindActionCreators({ ...trafficActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DropdownUnderwriter);
