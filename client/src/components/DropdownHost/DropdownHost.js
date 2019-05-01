import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Downshift from 'downshift';
import { connect } from 'react-redux';
import { change, Field, reduxForm } from 'redux-form';

import { hostSearch } from '../../redux/user';
import Input from '../Input';

const ADD_NEW_HOST = 'add_new_host';

export const HostListItem = props => {
  const { children, handleOnClick } = props;

  return (
    <div className="dropdown__item" onClick={handleOnClick}>
      {children}
    </div>
  );
};

class DropdownHost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasFocus: false,
    };
  }

  componentDidMount() {
    const { dispatch, host } = this.props;

    dispatch(change('hostSearch', 'host', host));
  }

  handleChange = e => {
    const { hostSearch, filterByStatus = 'All' } = this.props;
    const { value } = e.target;

    if (!value) {
      return;
    }

    hostSearch({ filter: filterByStatus, q: value });
  };

  handleFocus = () => {
    this.setState({ hasFocus: true });
  };

  handleBlur = () => {
    const { dispatch, host } = this.props;
    this.setState({ hasFocus: false });
    dispatch(change('hostSearch', 'host', host));
  };

  onSelect = selection => {
    const { onHostSelect, dispatch } = this.props;
    const { value } = selection;

    if (typeof onHostSelect == 'function') {
      onHostSelect(selection);
    }
    dispatch(change('hostSearch', 'host', value));
  };

  renderHostListItem = (item, loading) => {
    const { email, value } = item;

    if (item !== ADD_NEW_HOST) {
      return <HostListItem key={value._id}>{`${value}`}</HostListItem>;
    }
    //Add a new user component or redirect here
    return (
      <HostListItem key={value}>{`ADD NEW USER COMPOMENT HERE`}</HostListItem>
    );
    //Can return loading indictor here
  };

  dirtyOverride = host => {
    return host ? true : false;
  };

  render() {
    const {
      dirtyOverride,
      handleChange,
      handleFocus,
      handleBlur,
      initialValue,
      onSelect,
      props,
      renderHostListItem,
      state,
    } = this;
    const { host, user } = props;
    const { hasFocus } = state;
    const { docs, loading } = user;

    let items = docs.map(user => {
      const { _id, profile, station = { on_air_name: null } } = user;
      const { first_name, last_name } = profile;
      const { on_air_name } = station;

      return {
        _id,
        value:
          on_air_name != null && on_air_name.length > 0
            ? on_air_name
            : `${first_name} ${last_name}`,
      };
    });

    if (items.length > 0) {
      //by default, display an option for the current user
    }

    items.push(ADD_NEW_HOST);

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
          <div>
            <Field
              className="mb-1"
              component={Input}
              label="Host"
              name="host"
              type="text"
              {...getInputProps({
                onChange: handleChange,
                onBlur: handleBlur,
                onFocus: handleFocus,
              })}
              dirtyOverride={dirtyOverride(host)}
            />

            {hasFocus ? (
              <div className="dropdown__list active">
                {items.map((item, index) => (
                  <div
                    {...getItemProps({
                      key: item.value,
                      index,
                      item,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? 'lightgray' : 'white',
                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                      },
                    })}
                  >
                    {renderHostListItem(item, loading)}
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

DropdownHost = reduxForm({
  form: 'hostSearch',
})(DropdownHost);

function mapStateToProps({ user }) {
  return {
    user,
  };
}

export default connect(
  mapStateToProps,
  {
    hostSearch,
  },
)(DropdownHost);
