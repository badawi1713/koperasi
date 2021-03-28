import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Gap} from '..';
import {colors, fonts} from '../../../../utils';

const StartedSwiperItem = ({item, index}) => {
  return (
    <View testID={item.title} style={styles.slide} key={index}>
      <Image
        source={item.img}
        style={{width: '70%', height: '60%', resizeMode: 'contain'}}
      />
      <Text style={styles.text}>{item.title}</Text>
      <Gap height={20} />
      <Text style={styles.textDesc}>{item.body}</Text>
    </View>
  );
};

export default StartedSwiperItem;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: colors.black,
    fontSize: 20,
    fontFamily: fonts.primary[700],
    textAlign: 'center',
  },
  textDesc: {
    color: colors.text.header,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: fonts.primary.normal,
    width: '70%',
  },
});
