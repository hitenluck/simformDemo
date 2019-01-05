import React from 'react';
import {
  TextInput,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
const styles = StyleSheet.create({
  inputStyleDefault: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 4,
    height: 48,
    marginTop: 16,
    marginLeft: 8,
    marginRight: 8,
  },
  buttonDefaultTextStyle: {

  },
});

const InputField = (props) => {
  const {
    text,
    placeHolder,
    inputStyle,
    defaultValue,
    onChange,
    multiline,
    secureTextEntry

  } = props;
  return (
    <TextInput
      placeholder={placeHolder}
      style={inputStyle}
      onChangeText ={onChange}
      placeholderTextColor="gray"
      secureTextEntry={secureTextEntry}
    />
  );
};

InputField.propTypes = {
  onChange: PropTypes.func.isRequired,
  inputStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.shape({}),
  ]),
};

InputField.defaultProps = {
  inputStyle: styles.inputStyleDefault,
  secureTextEntry:false
};
export default InputField;
