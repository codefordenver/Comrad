import React, { Component } from 'react';
import Downshift from 'downshift';
import { connect } from 'react-redux';

import { DropdownItem } from '../../Dropdown';
import Input from '../../Input';

import { updateShowHost } from '../../../redux/show';
import { userSearch, userClear } from '../../../redux/user';

import { Field, reduxForm, formValueSelector } from 'redux-form';
import { change } from 'redux-form';

class DropdownHost extends Component {
  componentDidMount() {
    const { dispatch, host } = this.props;
    dispatch(change('hostSearch', 'host', host));
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
      const { userSearch } = this.props;
      if (!event.target.value) {
        return;
      }
      userSearch({ filter: 'all', query: event.target.value });
    };

    const onSelect = selection => {
      const { updateShowHost, dispatch, _id } = this.props;
      updateShowHost(_id, selection._id);
      dispatch(change('hostSearch', 'host', selection.value));
    };

    const handleBlur = props => {
      const { dispatch, host } = this.props;
      dispatch(change('hostSearch', 'host', host));
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
                onBlur: handleBlur,
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
