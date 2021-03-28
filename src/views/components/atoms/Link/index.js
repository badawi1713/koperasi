import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fonts } from '../../../../utils';

const Link = ({ title = '', onPress, size, align, variant = '' }) => {
  if (variant === 'text') {
    return (
      <Text onPress={onPress} style={styles.linkText(size, align)}>{title}</Text>
    );
  } else {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.linkText(size, align)}>{title}</Text>
      </TouchableOpacity>
    );
  }
};

export default Link;

const styles = StyleSheet.create({
  linkText: (size, align) => ({
    margin: 0,
    padding: 0,
    color: colors.primary,
    fontSize:
      size === 'big' ? 18 : size === 'medium' ? 16 : size === 'small' ? 12 : 14,
    fontFamily: fonts.primary[700],
    textAlign:
      align === 'center'
        ? 'center'
        : align === 'left'
          ? 'left'
          : align === 'right'
            ? 'right'
            : 'center',
  }),
});
