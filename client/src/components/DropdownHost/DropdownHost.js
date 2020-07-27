import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import Downshift from 'downshift';
import { connect } from 'react-redux';

import { alertActions } from '../../redux/alert';
import { authActions } from '../../redux/auth';
import { userActions } from '../../redux/user';
import FormHostAdd from '../forms/FormHostAdd';
import FormHostGroupAdd from '../forms/FormHostGroupAdd';
import Input from '../Input';
import Modal from '../Modal';
import { formatHostName } from '../../utils/formatters';

const ADD_NEW_HOST = 'add_new_host';
const NEW_GROUP_OF_HOSTS = 'new_group_of_hosts';
const SHOWS_WITH_NO_HOST = 'shows_with_no_host';

class DropdownHost extends Component {
  constructor(props) {
    super(props);

    const {
      filterByStatus = 'All',
      formatHostName,
      host,
      userActions,
    } = this.props;
    const hostDisplayName = host ? formatHostName(host) : '';

    //run a host search on the existing value so that the host list is populated with information
    if (hostDisplayName.length > 0) {
      userActions.searchHosts({ filter: filterByStatus, q: hostDisplayName });
    }

    this.state = {
      cachedSearches: {},
      currentInputValue: hostDisplayName,
      haveSelectedTextOnClick: false,
      hostSearchTimeout: null,
      hasFocus: false,
      selectedHost: host ? { _id: host.id, value: hostDisplayName } : null,
      showAddHostModal: false,
      showNewGroupOfHostsModal: false,
    };
  }

  componentDidUpdate() {
    const { userState } = this.props;
    const { cachedSearches } = this.state;

    // cache the search query in state so that we can quickly update the search results
    if (
      userState.search != null &&
      userState.search.q != null &&
      !(userState.search.q.toLowerCase() in cachedSearches)
    ) {
      cachedSearches[userState.search.q.toLowerCase()] = userState.docs;
      this.setState({ cachedSearches: cachedSearches });
    }
  }

  //handles input box change
  handleChange = e => {
    const { userActions, filterByStatus = 'All' } = this.props;
    const { cachedSearches, hostSearchTimeout } = this.state;
    const { value } = e.target;

    if (value.length && !(value.toLowerCase() in cachedSearches)) {
      //throttle the hostSearch function so we are not calling it rapidly if users are quickly deleting or typing text
      if (hostSearchTimeout != null) {
        clearTimeout(hostSearchTimeout);
      }
      this.setState({
        hostSearchTimeout: setTimeout(
          () => userActions.searchHosts({ filter: filterByStatus, q: value }),
          150,
        ),
      });
    }

    //update the textbox value
    this.setState({ currentInputValue: value });
  };

  //on blur from the input box, reset the dropdown to its original value
  handleBlur = e => {
    const { selectedHost, showAddHostModal } = this.state;

    if (showAddHostModal) {
      return;
    }

    this.setState({
      currentInputValue: selectedHost != null ? selectedHost.value : '',
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

  // close the Add Host modal
  handleFormHostAddCancel = () => {
    this.setState({ showAddHostModal: false });
  };

  // callback for submitting the Add Host modal
  handleFormHostAddSubmit = user => {
    this.setState({ showAddHostModal: false });
    this.onSelect({
      _id: user._id,
      value: this.props.formatHostName(user),
    });
  };

  // close the Add Host modal
  handleFormNewGroupOfHostsCancel = () => {
    const { alertActions } = this.props;
    this.setState({ showNewGroupOfHostsModal: false });
    alertActions.hide();
  };

  // callback for submitting the Add Host modal
  handleFormNewGroupOfHostsSubmit = hostGroup => {
    const { alertActions } = this.props;
    this.setState({ showNewGroupOfHostsModal: false });
    this.onSelect({
      _id: hostGroup._id,
      type: 'HostGroup',
      value: this.props.formatHostName(hostGroup),
    });
    alertActions.hide();
  };

  // process a host being selected
  onSelect = (selection, stateAndHelpers) => {
    const { alertActions, input, onHostSelect } = this.props;

    if (selection === null) {
      return;
    }

    if (selection === NEW_GROUP_OF_HOSTS) {
      this.setState({
        showNewGroupOfHostsModal: true,
      });
      alertActions.changeDisplayLocation('modal');
      return;
    }

    if (selection === ADD_NEW_HOST) {
      this.setState({
        showAddHostModal: true,
      });
      stateAndHelpers.clearSelection(); // clear the Downshift selection so that we can click the "add new host" button again
      return;
    }

    //if "No Host" was selected, give the selection a display text of an empty string
    if (selection._id == null) {
      selection.value = '';
    }

    if (input != null && input.onChange) {
      //redux form onChange handler
      input.onChange(selection._id);
    }

    if (typeof onHostSelect == 'function') {
      onHostSelect(selection);
    }

    this.setState(
      {
        currentInputValue: selection != null ? selection.value : '',
        selectedHost: selection || null,
      },
      function() {
        document.activeElement.blur(); //remove focus from the Host text field
      },
    );
  };

  //function for rendering the options in the host dropdown results
  renderHostListItem = (item, loading) => {
    if (item === ADD_NEW_HOST) {
      //Add new user component
      return <div key={item}>Add New Host</div>;
    } else if (item === NEW_GROUP_OF_HOSTS) {
      return <div key={item}>Add New Group of Hosts</div>;
    }

    return <div key={item._id}>{`${item.value}`}</div>;
  };

  dirtyOverride = currentInputValue => {
    return currentInputValue ? true : false;
  };

  render() {
    const {
      dirtyOverride,
      handleChange,
      handleFocus,
      handleFormHostAddCancel,
      handleFormHostAddSubmit,
      handleFormNewGroupOfHostsCancel,
      handleFormNewGroupOfHostsSubmit,
      handleInputClick,
      handleBlur,
      initialValue,
      onSelect,
      props,
      renderHostListItem,
      state,
    } = this;
    const {
      authState,
      hostFieldClass = 'mb-1-5',
      formatHostName,
      showAddNewHostOption = true,
      showNewGroupOfHostsOption = true,
      showsWithNoHostOption = false,
      userState,
    } = props;
    const {
      cachedSearches,
      currentInputValue,
      hasFocus,
      showAddHostModal,
      showNewGroupOfHostsModal,
    } = state;

    // get the documents from the cachedResults property rather than Redux,
    // because Redux might not have the search results of the current input value if there
    // were multiple host search XHR requests that didn't finish in the order they were called
    const docs = cachedSearches[currentInputValue.toLowerCase()] || [];

    let items = docs.map(user => {
      const { _id } = user;

      return {
        _id,
        value: formatHostName(user),
      };
    });

    if (items.length === 0) {
      items.push({
        _id: authState.doc._id,
        value: formatHostName(authState.doc) + ' (Me)',
      });
    }

    if (showsWithNoHostOption) {
      items.push({ _id: SHOWS_WITH_NO_HOST, value: showsWithNoHostOption });
    }

    items.push({ _id: null, value: 'Clear' });

    if (showAddNewHostOption && authState.doc.roles.indexOf('Admin') !== -1) {
      items.push(ADD_NEW_HOST);
    }

    if (
      showNewGroupOfHostsOption &&
      (authState.doc.roles.indexOf('Admin') !== -1 ||
        authState.doc.roles.indexOf('Show Captain') !== -1 ||
        authState.doc.roles.indexOf('Full Access') !== -1)
    ) {
      items.push(NEW_GROUP_OF_HOSTS);
    }

    return (
      <Downshift
        onChange={onSelect}
        initialInputValue={initialValue}
        itemToString={item => (item ? item.value : '')}
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
          <div
            key="host-field"
            className={classnames('host-field', hostFieldClass)}
          >
            <Input
              className=""
              label="Host"
              name="host"
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

            {/* Host dropdown */}
            {hasFocus && !showAddHostModal ? (
              <div className="dropdown__list dropdown__list--host-list active">
                {items.map((item, index) => (
                  <div
                    key={index}
                    {...getItemProps({
                      key: index,
                      className: classnames(
                        'dropdown__item',
                        highlightedIndex === index && 'selected',
                        (item === ADD_NEW_HOST ||
                          item._id === null ||
                          item === NEW_GROUP_OF_HOSTS) &&
                          'dropdown__item--grey',
                      ),
                      item,
                    })}
                  >
                    {renderHostListItem(item, userState.loading)}
                  </div>
                ))}
              </div>
            ) : null}

            {/* Add Host modal */}
            {showAddHostModal ? (
              <Modal isOpen={true}>
                <div className="host-field__add-modal">
                  <h3>Add New Host</h3>
                  <FormHostAdd
                    cancelCallback={handleFormHostAddCancel}
                    submitCallback={handleFormHostAddSubmit}
                  />
                </div>
              </Modal>
            ) : null}

            {/* Add Host Group modal */}
            {showNewGroupOfHostsModal ? (
              <Modal isOpen={true}>
                <div className="host-group__add-modal">
                  <h3>Add New Group of Hosts</h3>
                  <FormHostGroupAdd
                    cancelCallback={handleFormNewGroupOfHostsCancel}
                    submitCallback={handleFormNewGroupOfHostsSubmit}
                  />
                </div>
              </Modal>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }
}

function mapStateToProps({ auth, user }) {
  return {
    authState: auth,
    userState: user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators({ ...alertActions }, dispatch),
    authActions: bindActionCreators({ ...authActions }, dispatch),
    formatHostName: formatHostName,
    userActions: bindActionCreators({ ...userActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DropdownHost);

export { SHOWS_WITH_NO_HOST };
