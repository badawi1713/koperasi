import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  ICBackArrow,
  ICCart,
  ICEmail,
  ICNotification,
} from '../../../../assets/icons';
import { colors, fonts } from '../../../../utils';
import { Gap, Link } from '../../atoms';

const TopNavbar = ({
  variant = '',
  title = 'Navbar Title',
  linkTo,
  mainTitle = 'Main Title',
  linkBack,
  back = false,
}) => {
  if (variant === 'link') {
    return (
      <View style={styles.container(variant)}>
        <Link title={title} onPress={linkTo} size="big" />
      </View>
    );
  } else if (variant === 'link-back') {
    return (
      <View style={styles.container(variant)}>
        <View style={styles.navbarBackGroup}>
          <TouchableOpacity onPress={linkBack}>
            <ICBackArrow />
          </TouchableOpacity>
          <Gap width={10} />
          <Text style={styles.titleText(variant)}>{mainTitle}</Text>
        </View>
        <Link title={title} onPress={linkTo} size="big" />
      </View>
    );
  } else if (variant === 'link-home') {
    return (
      <View style={styles.container(variant)}>
        <Text style={styles.titleText(variant)}>{title}</Text>
        <View style={styles.iconList}>
          <TouchableOpacity>
            <ICCart />
          </TouchableOpacity>
          <Gap width={20} />
          <TouchableOpacity>
            <ICEmail />
          </TouchableOpacity>
          <Gap width={20} />
          <TouchableOpacity>
            <ICNotification />
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container(variant)}>
        {back ? (
          <>
            <TouchableOpacity onPress={linkBack}>
              <ICBackArrow />
            </TouchableOpacity>
            <Gap width={10} />
            <Text style={styles.titleText(variant)}>{title}</Text>
          </>
        ) : (
          <Text style={styles.titleText(variant)}>{title}</Text>
        )}
      </View>
    );
  }
};

export default TopNavbar;

const styles = StyleSheet.create({
  container: (variant) => ({
    backgroundColor: colors.white,
    width: '100%',
    height: 70,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      variant === 'link-home' || variant === 'link-back'
        ? 'space-between'
        : variant === 'link'
          ? 'flex-end'
          : 'flex-start',
    elevation: variant === 'link-home' || variant === '' ? 1 : 0
  }),
  titleText: (variant) => ({
    color: variant === 'link-home' ? colors.primary : colors.text.header,
    fontSize: variant === 'link-home' ? 24 : 18,
    fontFamily: fonts.primary[700],
  }),
  iconList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navbarBackGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
