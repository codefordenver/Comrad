import React, { Component } from 'react';
import Downshift from 'downshift';
import { connect } from 'react-redux';

import Dropdown, { DropdownItem } from '../../../components/Dropdown';
import Input from '../../../components/Input';

import { userSearch } from '../../../redux/user';

class DropdownDJ extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.userSearch({ filter: 'all' });
  }

  render() {
    const users = this.props.user.docs;
    console.log(users);
    const items = users.map((user, index) => ({
      _id: user._id,
      value: `${user.profile.first_name} ${user.profile.last_name}`,
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
            <label {...getLabelProps()}>Enter a fruit</label>
            <p />
            <input {...getInputProps()} />

            {isOpen ? (
              <div className="dropdown__list active">
                {items
                  .filter(
                    item =>
                      !inputValue ||
                      item.value
                        .toLowerCase()
                        .includes(inputValue.toLowerCase()),
                  )
                  .map((item, index) => (
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
  },
)(DropdownDJ);
