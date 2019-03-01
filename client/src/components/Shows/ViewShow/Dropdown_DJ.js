import React, { Component } from 'react';
import Downshift from 'downshift';

import Dropdown, { DropdownItem } from '../../../components/Dropdown';
import Input from '../../../components/Input';

class DropdownDJ extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const items = [
      { value: 'apple' },
      { value: 'pear' },
      { value: 'orange' },
      { value: 'grape' },
      { value: 'banana' },
    ];

    return (
      <Downshift
        onChange={selection => alert(`You selected ${selection.value}`)}
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
                    item => !inputValue || item.value.includes(inputValue),
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

export default DropdownDJ;
