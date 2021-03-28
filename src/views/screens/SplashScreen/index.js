import React, { useEffect, useContext } from 'react';
import { Image, SafeAreaView, StyleSheet } from 'react-native';
import { colors } from '../../../utils';
import { Context as AuthContext } from '../../../context/AuthContext';

const SplashScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      // navigation.replace('GetStarted');
      tryLocalSignin();
    }, 3000);
  }, []);
  // useEffect dengan array kosong berfungsi supaya useEffect hanya te-render sekali.
  return (
    <SafeAreaView style={styles.container}>
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
