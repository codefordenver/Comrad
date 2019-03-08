import React, { Component } from 'react';
import Downshift from 'downshift';
import { connect } from 'react-redux';

import Dropdown, { DropdownItem } from '../../Dropdown';
import Input from '../../Input';

import { updateShowHost } from '../../../redux/show';
import { userSearch, userClear } from '../../../redux/user';

import { Field, reduxForm } from 'redux-form';
import { change } from 'redux-form';

class DropdownHost extends Component {
  render() {
    const NONE = 'none';
    const users = this.props.user.docs;
    const users_loading = this.props.user.loading;
    const { host } = this.props;

    const inputOnChange = event => {
      if (!event.target.value) {
        return;
      }
      this.props.userSearch({ filter: 'all', query: event.target.value });
    };

    const onSelect = selection => {
      const show_id = this.props.show._id;
      this.props.updateShowHost(show_id, selection._id);
      this.props.dispatch(change('hostSearch', 'host', selection.value));
    };

    const renderDropdown = (item, loading) => {
      if (!loading) {
        if (item.value !== NONE) {
          return (
            <DropdownItem key={item.value}>
              {`${item.value} ${item.email}`}
            </DropdownItem>
          );
        }
        //Add a new user component or redirect here
        return (
          <DropdownItem key={item.value}>
            {`ADD NEW USER COMPOMENT HERE`}
          </DropdownItem>
        );
      }
      //Can return loading indictor here
    };

    const dirtyOverride = host => {
      if (host) {
        return true;
      }
      return false;
    };

    let items = users.map((user, index) => ({
      _id: user._id,
      value: `${user.profile.first_name} ${user.profile.last_name}`,
      email: `| ${user.contact.email}`,
    }));

    if (items.length === 0) {
      items = [{ value: NONE }];
    }

    return (
      <Downshift
        onChange={onSelect}
        initialInputValue={this.props.initialValue}
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
            {/*<label {...getLabelProps()}>Select a DJ:</label>*/}

            <Field
              className="mb-1"
              component={Input}
              label="Host"
              name="host"
              type="text"
              {...getInputProps({
                onChange: inputOnChange,
              })}
              dirtyOverride={dirtyOverride(host)}
            />

            {isOpen && inputValue ? (
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
                    {renderDropdown(item, users_loading)}
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

function setHost(host) {
  if (host) {
    let firstname,
      lastname = '';
    firstname = host.profile.first_name || '';
    lastname = host.profile.last_name || '';
    return `${firstname} ${lastname}`;
  }
  return;
}

function mapStateToProps(state) {
  const shows = state.show.data;
  const _id = state.modal.data._id;
  const { host } = shows[_id].show_details;

  return {
    user: state.user,
    show: state.modal.data,
    host: setHost(host),
    initialValues: {
      host: setHost(host),
    },
  };
}

export default connect(
  mapStateToProps,
  {
    updateShowHost,
    userSearch,
    userClear,
  },
)(DropdownHost);
