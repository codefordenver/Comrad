import React, { Component } from 'react';
import Downshift from 'downshift';
import { connect } from 'react-redux';
import { change, Field, reduxForm } from 'redux-form';

import { updateShowHost } from '../../../redux/show';
import { userSearch, userClear } from '../../../redux/user';

import { DropdownItem } from '../../Dropdown';
import Input from '../../Input';

const DOWNSHIFT_NONE = 'none';

class DropdownHost extends Component {
  componentDidMount() {
    const { dispatch, host } = this.props;

    dispatch(change('hostSearch', 'host', host));
  }

  inputOnChange = e => {
    const { userSearch } = this.props;
    const { value } = e.target;

    if (!value) {
      return;
    }

    userSearch({ filter: 'all', query: value });
  };

  onSelect = selection => {
    const { updateShowHost, dispatch, _id } = this.props;
    const { value } = selection;

    updateShowHost(_id, selection._id);
    dispatch(change('hostSearch', 'host', value));
  };

  handleBlur = () => {
    const { dispatch, host } = this.props;

    dispatch(change('hostSearch', 'host', host));
  };

  renderDropdown = (item, loading) => {
    const { email, value } = item;

    if (!loading) {
      if (value !== DOWNSHIFT_NONE) {
        return <DropdownItem key={value}>{`${value} ${email}`}</DropdownItem>;
      }
      //Add a new user component or redirect here
      return (
        <DropdownItem key={value}>{`ADD NEW USER COMPOMENT HERE`}</DropdownItem>
      );
    }
    //Can return loading indictor here
  };

  dirtyOverride = host => {
    return host ? true : false;
  };

  render() {
    const {
      dirtyOverride,
      handleBlur,
      initialValue,
      inputOnChange,
      onSelect,
      props,
      renderDropdown,
    } = this;
    const { host, user } = props;
    const { docs, loading } = user;

    let items = docs.map(user => {
      const { contact, _id, profile } = user;
      const { email } = contact;
      const { first_name, last_name } = profile;

      return {
        _id,
        value: `${first_name} ${last_name}`,
        email: `| ${email}`,
      };
    });

    if (items.length === 0) {
      items = [{ value: DOWNSHIFT_NONE }];
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
                    {renderDropdown(item, loading)}
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
    updateShowHost,
    userSearch,
    userClear,
  },
)(DropdownHost);
