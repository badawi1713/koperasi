import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {IMGUnderConstruction} from '../../../assets';
import {colors, fonts} from '../../../utils';

const EWallet = () => {
  return (
    <View style={styles.container}>
      <IMGUnderConstruction width={350} />
      <Text style={styles.text}>Maaf, halaman belum tersedia</Text>
    </View>
  );
};

export default EWallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    padding: 30,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: colors.text.header,
    textAlign: 'center',
    fontFamily: fonts.primary[600],
  },
});
