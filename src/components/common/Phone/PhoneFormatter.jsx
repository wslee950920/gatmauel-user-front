import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

const NumberFormatter=({ inputRef, onChange, name, ...other })=>{
    return (
        <NumberFormat
          {...other}
          name={name}
          getInputRef={inputRef}
          onValueChange={(values) => {
            onChange({
              target: {
                name,
                value: values.value,
              },
            });
          }}
          isNumericString
          format='###-####-####'
        />
      );
}

NumberFormatter.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default React.memo(NumberFormatter);