import React, { Component } from 'react';
import Downshift from 'downshift';
import { connect } from 'react-redux';

import Dropdown, { DropdownItem } from '../../../components/Dropdown';
import Input from '../../../components/Input';

import { userSearch, userClear } from '../../../redux/user';

class DropdownDJ extends Component {
  render() {
    const inputOnChange = event => {
      console.log(event.target.value);
      if (!event.target.value) {
        return;
      }
      this.props.userSearch({ filter: 'all', query: event.target.value });
    };

    const users = this.props.user.docs;
    console.log(users);
    const items = users.map((user, index) => ({
      _id: user._id,
      value: `${user.profile.first_name} ${user.profile.last_name} | ${
        user.contact.email
      }`,
    }));
    console.log(items);

    return (
      <Downshift
        onChange={selection => console.log(selection)}
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
            <label {...getLabelProps()}>Select a DJ:</label>
            <p />
            <input {...getInputProps({ onChange: inputOnChange })} />

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
                    <DropdownItem>{item.value}</DropdownItem>
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

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(
  mapStateToProps,
  {
    userSearch,
    userClear,
  },
)(DropdownDJ);
