import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {IMGGetStarted1} from '../../../assets';
import {colors, fonts} from '../../../utils';
import {Button, Gap, TopNavbar} from '../../components';
const Store = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <TopNavbar title="Toko" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <Image source={IMGGetStarted1} style={styles.image} />
          </View>
          <Gap height={30} />
          <Text style={styles.titleText}>Jual Produk Koperasi</Text>
          <Gap height={20} />
          <Text style={styles.subtitleText}>
            Pasarkan produk dan kelola toko koperasi anda sekarang!
          </Text>
          <Gap height={20} />
          <Button
            fullWidth
            title="Buka Toko Koperasi"
            variant="primary"
            onPress={() => navigation.navigate('StoreRegister')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Store;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
  },
  imageContainer: {
    width: 300,
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  titleText: {
    color: colors.black,
    fontFamily: fonts.primary[700],
    fontSize: 20,
    textAlign: 'center',
  },
  subtitleText: {
    color: colors.black,
    fontFamily: fonts.primary.normal,
    textAlign: 'center',
    fontSize: 13,
  },
});
