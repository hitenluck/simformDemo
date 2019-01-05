import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { colors } from '@themes';
const styles = StyleSheet.create({
  buttonDefaultStyle: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginTop: 16,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 8,
    borderColor: colors.appColor,
  },
  buttonDefaultTextStyle: {
    fontSize: 16,
    color: 'white',
    fontWeight: '800',
  },
});

const Button = (props) => {
  const {
    buttonStyle,
    onPress,
  } = props;
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} activeOpacity={0.8}>
      {props.children}
    </TouchableOpacity>
  );
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  buttonStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.shape({}),
  ]),
};

Button.defaultProps = {
  buttonStyle: styles.buttonDefaultStyle,
};
export default Button;
