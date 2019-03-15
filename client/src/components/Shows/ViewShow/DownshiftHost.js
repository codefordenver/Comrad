import React, { Component } from 'react';
import Downshift from 'downshift';
import { connect } from 'react-redux';

import Dropdown, { DropdownItem } from '../../Dropdown';
import Input from '../../Input';

import { updateShowHost } from '../../../redux/show';
import { userSearch, userClear } from '../../../redux/user';

import { Field, reduxForm, formValueSelector } from 'redux-form';
import { change } from 'redux-form';

class DropdownHost extends Component {
  componentDidMount() {
    this.props.dispatch(change('hostSearch', 'host', this.props.host));
  }

  componentWillUnmount() {
    console.log('Downshift Host Unmounting');
  }

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
      const show_id = this.props._id;
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

function mapStateToProps(state) {
  return {
    user: state.user,
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
