import React, { useEffect, useContext } from 'react';
import { Image, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { colors } from '../../../utils';
import { Context as AuthContext } from '../../../context/AuthContext';

const SplashScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      tryLocalSignin();
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor='#fff'
        barStyle='dark-content'
        showHideTransition='fade'
      />
      <Image
        source={require('../../../assets/images/img-logo.jpg')}
        style={styles.logo}
      />
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  logo: {
    width: 320,
    height: 200,
  },
});
