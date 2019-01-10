import React from 'react';

const Select = props => {
  const { selectOptions, styleName, ...rest } = props;

  return (
    <select className={`select ${styleName || ''}`} {...rest}>
      <option value="" disabled defaultValue />
      {selectOptions.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      )) || null}
    </select>
  );
};

export default Select;
