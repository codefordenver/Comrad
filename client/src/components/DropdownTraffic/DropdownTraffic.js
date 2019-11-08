import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import Downshift from 'downshift';
import moment from 'moment';
import { connect } from 'react-redux';

import { trafficActions } from '../../redux/';
import Input from '../Input';

// This is set up to be used with initial values for artists only
// If you want to have an initial value displayed for an album or track, you'll have to modify the code

class DropdownTraffic extends Component {
  constructor(props) {
    super(props);

    const { traffic, trafficActions } = this.props;

    let selectedTrafficDisplayName = traffic.doc
      ? traffic.doc.traffic_details.title
      : '';

    //run a search on the existing value so that the list is populated with information
    if (selectedTrafficDisplayName.length > 0) {
      trafficActions.search(selectedTrafficDisplayName);
    }

    this.state = {
      cachedSearches: {},
      currentInputValue: selectedTrafficDisplayName,
      haveSelectedTextOnClick: false,
      initialValue: traffic.doc ? traffic.doc._id : null,
      hasFocus: false,
      selectedTrafficItem: traffic.doc
        ? { _id: traffic.doc._id, name: selectedTrafficDisplayName }
        : null,
    };
  }

  componentDidUpdate() {
    const { traffic } = this.props;
    const { cachedSearches } = this.state;

    //check to see if the traffic doc has changed: if so, reset the initial value
    if (traffic.doc != null && this.state.initialValue !== traffic._id) {
      this.setState({
        currentInputValue: traffic.doc.traffic_details.title,
        initialValue: traffic.doc._id,
        selectedTrafficItem: {
          _id: traffic.doc._id,
          name: traffic.doc.traffic_details.title,
        },
      });
    } else if (traffic.doc === null && this.state.initialValue != null) {
      this.setState({
        currentInputValue: '',
        initialValue: null,
        selectedTrafficItem: null,
      });
    }

    // cache the search query in state so that we can quickly update the search results
    if (
      traffic.docsForDropdown != null &&
      traffic.searchString != null &&
      !(traffic.searchString.toLowerCase() in cachedSearches)
    ) {
      cachedSearches[traffic.searchString.toLowerCase()] =
        traffic.docsForDropdown;
      this.setState({ cachedSearches: cachedSearches });
    }
  }

  //handles input box change
  handleChange = e => {
    const { trafficActions } = this.props;
    const { cachedSearches, trafficSearchTimeout } = this.state;
    const { value } = e.target;

    if (value.length && !(value.toLowerCase() in cachedSearches)) {
      //throttle the libraryActions.search function so we are not calling it rapidly if users are quickly deleting or typing text
      if (trafficSearchTimeout != null) {
        clearTimeout(trafficSearchTimeout);
      }
      this.setState({
        trafficSearchTimeout: setTimeout(
          () => trafficActions.search(value),
          150,
        ),
      });
    }

    //update the textbox value
    this.setState({ currentInputValue: value });
  };

  //on blur from the input box, reset the dropdown to its original value
  handleBlur = e => {
    const { selectedTrafficItem } = this.state;

    this.setState({
      currentInputValue:
        selectedTrafficItem != null
          ? selectedTrafficItem.traffic_details.title
          : '',
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
    const { input, onTrafficSelect } = this.props;

    if (selection === null) {
      return;
    }

    if (input != null && input.onChange) {
      //redux form onChange handler
      input.onChange(selection._id);
    }

    if (typeof onTrafficSelect == 'function') {
      onTrafficSelect(selection);
    }

    this.setState(
      {
        currentInputValue:
          selection != null ? selection.traffic_details.title : '',
        selectedTrafficItem: selection || null,
      },
      function() {
        document.activeElement.blur(); //remove focus from the Host text field
      },
    );
  };

  //function for rendering the options in the host dropdown results
  renderTrafficListItem = item => {
    let startTime = moment(item.start_time_utc);
    let startTimeFormatted = startTime.format('M/D/YY');
    return (
      <div key={item._id}>
        {item.traffic_details.title} <i>Starts {startTimeFormatted}</i>
      </div>
    );
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
      renderTrafficListItem,
      props,
      state,
    } = this;
    const { cachedSearches, currentInputValue, hasFocus } = state;
    const { autoFocus, className } = props;

    // get the documents from the cachedResults property rather than Redux,
    // because Redux might not have the search results of the current input value if there
    // were multiple host search XHR requests that didn't finish in the order they were called
    const docs = cachedSearches[currentInputValue.toLowerCase()] || [];

    return (
      <Downshift
        onChange={onSelect}
        initialInputValue={initialValue}
        itemToString={item => (item ? item.traffic_details.title : '')}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedTrafficItem,
        }) => (
          <div
            key="traffic-field"
            className={classnames('traffic-field', className)}
          >
            <Input
              className=""
              label="Traffic"
              name="trafficItem"
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

            {/* traffic dropdown */}
            {hasFocus && docs.length > 0 ? (
              <div className="dropdown__list dropdown__list--traffic-list active">
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
                    {renderTrafficListItem(item)}
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
)(DropdownTraffic);
