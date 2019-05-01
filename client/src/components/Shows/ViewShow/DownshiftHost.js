import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Downshift from 'downshift';
import { connect } from 'react-redux';
import { change, Field, reduxForm } from 'redux-form';

import { updateShowHost } from '../../../redux/show';
import { hostSearch } from '../../../redux/user';
import Input from '../../Input';

const DOWNSHIFT_NONE = 'none';

export const DropdownItem = props => {
  const { children, to, handleOnClick } = props;

  if (to) {
    return (
      <Link className="dropdown__item" to={to}>
        {children}
      </Link>
    );
  }

  return (
    <div className="dropdown__item" onClick={handleOnClick}>
      {children}
    </div>
  );
};

class DropdownHost extends Component {
  componentDidMount() {
    const { dispatch, host } = this.props;

    dispatch(change('hostSearch', 'host', host));
  }

  inputOnChange = e => {
    const { hostSearch } = this.props;
    const { value } = e.target;

    if (!value) {
      return;
    }

    hostSearch({ filter: 'All', q: value });
  };

  onSelect = selection => {
    const { updateShowHost, dispatch, _id } = this.props;
    const { value } = selection;
    const host_id = selection._id;

    updateShowHost(_id, { 'show_details.host': host_id });
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
        return (
          <DropdownItem key={value._id}>{`${value} ${email}`}</DropdownItem>
        );
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
    hostSearch,
  },
)(DropdownHost);
