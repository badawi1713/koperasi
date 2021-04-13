import React from 'react';
import { SafeAreaView, StyleSheet, View, StatusBar } from 'react-native';
import { colors, fonts } from '../../../utils';
import { Button, Gap, StartedSwiper, TopNavbar } from '../../components';

const GetStarted = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor='#fff'
        barStyle='dark-content'
        showHideTransition='fade'
      />
      <TopNavbar
        variant="link"
        title="Lewati"
        linkTo={() => navigation.replace('Login')}
      />
      <StartedSwiper />
      <View style={styles.content}>
        <View style={styles.buttonGroup}>
          <View style={styles.button}>
            <Button
              fullWidth
              onPress={() => navigation.replace('Login')}
              title="Masuk"
              variant="primary"
            />
          </View>
          <Gap width={20} />
          <View style={styles.button}>
            <Button
              fullWidth
              title="Daftar"
              onPress={() => navigation.replace('Register')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  content: {
    width: '100%',
  },
  text: {
    color: colors.primary,
    fontSize: 16,
    fontFamily: fonts.primary[700],
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 40,
  },
  button: {
    width: '50%',
  },
});
