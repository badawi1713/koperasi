import React from 'react';
import { StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { startedCarouselData } from '../../../../assets';
import { colors } from '../../../../utils';
import { StartedSwiperItem } from '../../atoms';

const StartedSwiper = () => (
  <Swiper
    loadMinimal={true}
    showsButtons={false}
    loop={false}
    paginationStyle={{ bottom: 10 }}
    dot={<View style={styles.dotStyle} />}
    activeDotStyle={styles.activeDotStyle}
    style={styles.wrapper}>
    {startedCarouselData.map((item, index) => (
      <StartedSwiperItem item={item} index={index} key={index} />
    ))}
  </Swiper>
);

const styles = StyleSheet.create({
  dotStyle: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 30,
    height: 15,
    borderRadius: 10,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  activeDotStyle: {
    width: 30,
    height: 15,
    borderRadius: 10,
    backgroundColor: colors.primary,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 8,
    marginBottom: 8,
  },
});

export default StartedSwiper;
