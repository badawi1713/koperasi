import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { colors, fonts } from '../../../../utils';

const Button = ({
  variant = 'default',
  title = 'Button',
  onPress,
  fullWidth = false,
  loading = false,
  disabled = false,
  rounded = true
}) => {
  return (
    <TouchableOpacity
      disabled={loading || disabled}
      onPress={onPress}
      style={styles.container(variant, fullWidth, rounded)}>
      {loading ? <ActivityIndicator size={22} color={"#FFFFFF"} /> : <Text style={styles.title(variant)}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: (variant, fullWidth, rounded) => ({
    width: fullWidth ? '100%' : 'auto',
    borderRadius: rounded ? 6 : 0,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor:
      variant === 'primary'
        ? colors.button.primary.background
        : variant === 'secondary'
          ? colors.button.secondary.background
          : variant === 'disabled'
            ? colors.button.disabled.background
            : colors.button.outlined.borderColor,
    backgroundColor:
      variant === 'primary'
        ? colors.button.primary.background
        : variant === 'secondary'
          ? colors.button.secondary.background
          : variant === 'disabled'
            ? colors.button.disabled.background
            : colors.button.outlined.background,
    paddingVertical: 10,
    paddingHorizontal: 8,
  }),
  title: (variant) => ({
    color:
      variant === 'primary'
        ? colors.button.primary.text
        : variant === 'secondary'
          ? colors.button.secondary.text
          : variant === 'disabled'
            ? colors.button.disabled.text
            : colors.button.outlined.text,
    fontSize: 16,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
  }),
});
