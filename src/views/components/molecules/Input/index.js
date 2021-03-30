import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { ICSearch } from '../../../../assets/icons';
import { colors, fonts } from '../../../../utils';
import { Gap } from '../../atoms';

const Input = ({ variant = 'text' }) => {
  if (variant === 'text') {
    return <View></View>;
  } else if (variant === 'search') {
    return (
      <View style={styles.container}>
        <ICSearch />
        <Gap width={5} />
        <TextInput placeholder="Search ..." style={styles.textInput} placeholderTextColor={colors.text.grey1} />
      </View>
    );
  } else {
    return <View></View>;
  }
};

export default Input;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: colors.white,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    fontFamily: fonts.primary.normal,
    color: colors.black
  },
});
