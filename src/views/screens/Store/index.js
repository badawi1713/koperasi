import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView, StyleSheet, Text,
  TouchableOpacity, View
} from 'react-native';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { IMGGetStarted1 } from '../../../assets';
import { changeStoreProduct, checkStoreProfile } from '../../../store/actions';
import { colors, fonts } from '../../../utils';
import { AddProductForm, Button, Gap, Link, TopNavbar } from '../../components';

const Store = ({ navigation }) => {
  const dispatch = useDispatch()
  const [showAddProductForm, setShowAddProductForm] = useState(false)

  const storeProductReducer = useSelector(state => state.storeProductReducer)

  const { newProductData, loading, storeStatus, storeData } = storeProductReducer

  useEffect(() => {
    const getStoreStatus = () => {
      dispatch(checkStoreProfile())
    }
    return getStoreStatus()
  }, [])

  const handleBackButtonClick = () => {
    setShowAddProductForm(false)
    dispatch(changeStoreProduct({ newProductData: { ...newProductData, namaProduk: "", kategori: "", harga: "", berat: "", stok: "", kondisi: "", deksripsi: "", gambar: [] } }))

  }

  const StoreRegistration = () => {
    return <View style={styles.content}>
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
  }

  const StoreScreen = () => {
    return (
      showAddProductForm ? <AddProductForm handleBackButtonClick={handleBackButtonClick} /> :
        <>
          <View style={styles.mainContent}>
            <View style={styles.row}>
              <Avatar.Icon size={74} style={{ backgroundColor: colors.background.grey5 }} icon="store" color={colors.text.grey3} />
              <Gap width={14} />
              <View >
                <Text style={styles.storeTitle}>{storeData && storeData.namaToko}</Text>
                <Gap height={5} />
                <View style={styles.row}>
                  <Icon name='star' size={18} color={colors.gold} solid />
                  <Gap width={6} />
                  <Text>• {0} Pengikut</Text>
                </View>
              </View>
            </View>
            <Gap height={20} />
            <View style={styles.row, { justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text>Skor Performa Toko</Text>
              <TouchableOpacity style={styles.row}>
                <Text>85/100</Text>
                <Gap width={5} />
                <Icon size={16} color={colors.text.grey2} name='chevron-right' />
              </TouchableOpacity>
            </View>

            <Gap height={10} />
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 6, borderWidth: 0.6, borderColor: colors.border, }}>
              <Text style={{ fontFamily: fonts.primary[600], fontSize: 16, padding: 16 }}>Regular Merchant</Text>
              <TouchableOpacity style={{ backgroundColor: colors.background.grey5, padding: 16, alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ position: 'absolute', left: '-16%' }}>
                  <Avatar.Icon size={24} style={{ backgroundColor: colors.background.green1 }} icon="crown" color={colors.gold} />
                </View>
                <Text style={{ fontFamily: fonts.primary[600], fontSize: 14, color: colors.text.green1, marginLeft: 10 }}>Upgrade</Text>
              </TouchableOpacity>
            </View>

            <Gap height={16} />

            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
              <Text>Saldo</Text>
              <Text>Rp0</Text>
            </View>
          </View>
          <Gap height={10} />
          <View style={styles.mainContent}>
            <View>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.headerText}>Penjualan</Text>
                <Link title="Lihat Riwayat" />
              </View>
              <Gap height={20} />
              <View style={{ justifyContent: 'space-between', flex: 1, flexDirection: 'row' }}>
                <TouchableOpacity style={styles.sellerButton}>
                  <View style={styles.row}>
                    <Icon name="box-open" size={32} color={colors.background.red1} solid />
                    <Gap width={10} />
                    <View>
                      <Text style={styles.text}>Pesanan</Text>
                      <Text style={styles.text}>Baru</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sellerButton}>
                  <View style={styles.row}>
                    <Icon name="truck-loading" size={32} color={colors.background.red1} solid />
                    <Gap width={10} />
                    <View>
                      <Text style={styles.text}>Siap</Text>
                      <Text style={styles.text}>Dikirim</Text>
                    </View>

                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <Gap height={20} />
            <View>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.headerText}>Produk</Text>
                <Link title="Tambah Produk" onPress={() => setShowAddProductForm(true)} />
              </View>
              <Gap height={20} />
              <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <View>
                  <Text>Daftar Produk</Text>
                  <Text>0 Produk</Text>
                </View>
                <Icon size={16} color={colors.text.grey2} name='chevron-right' />
              </View>
            </View>
          </View>

          <Gap height={10} />

          <View style={styles.mainContent}>
            <View>
              <Text style={styles.headerText}>Kata Pembeli</Text>
            </View>
            <Gap height={20} />
            <TouchableOpacity style={styles.row}>
              <Icon name='star' size={18} color={colors.text.grey2} solid />
              <Gap width={10} />
              <Text>Ulasan</Text>
            </TouchableOpacity>
            <Gap height={16} />
            <TouchableOpacity style={styles.row}>
              <Icon name='comments' size={18} color={colors.text.grey2} solid />
              <Gap width={10} />
              <Text>Diskusi</Text>
            </TouchableOpacity>
            <Gap height={16} />
            <TouchableOpacity style={styles.row}>
              <Icon name='exclamation-triangle' size={18} color={colors.text.grey2} solid />
              <Gap width={10} />
              <Text>Pesanan Dikomplain</Text>
            </TouchableOpacity>
          </View>

          <Gap height={10} />

          <View style={styles.mainContent}>
            <View>
              <Text style={styles.headerText}>Bantuan</Text>
            </View>
            <Gap height={20} />
            <TouchableOpacity style={styles.row}>
              <Icon name='toolbox' size={18} color={colors.text.grey2} solid />
              <Gap width={10} />
              <Text>Pengaturan Toko</Text>
            </TouchableOpacity>
            <Gap height={16} />
            <TouchableOpacity style={styles.row}>
              <Icon name='headset' size={18} color={colors.text.grey2} solid />
              <Gap width={10} />
              <Text>Pusat Bantuan</Text>
            </TouchableOpacity>
          </View>
        </>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopNavbar back={showAddProductForm} linkBack={() => setShowAddProductForm(false)} title={showAddProductForm ? "Tambah Produk" : "Toko"} />

      {
        loading ? <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator color={colors.background.green1} size='large' />
        </View> :
          storeStatus === 1 ? <ScrollView showsVerticalScrollIndicator={false}><StoreScreen />
          </ScrollView>
            : <StoreRegistration />
      }
    </SafeAreaView>
  );
};

export default Store;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    padding: 18,
    backgroundColor: colors.white
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    flex: 1
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
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  storeTitle: {
    color: colors.text.header,
    fontFamily: fonts.primary[700],
    fontSize: 18,
  },
  headerText: {
    color: colors.text.header,
    fontFamily: fonts.primary[700],
    fontSize: 16,
    textTransform: "uppercase"
  },
  text: {
    color: colors.text.header,
    fontFamily: fonts.primary[600],
    fontSize: 13,
  },
  errorText: {
    fontFamily: fonts.primary.normal,
    color: colors.text.danger
  },
  inputGroup: {
    width: '100%'
  },
  label: {
    fontSize: 14,
    color: colors.text.header,
    fontFamily: fonts.primary[400],
    marginBottom: 5
  },
  textInput: {
    flex: 1,
    color: colors.black
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    paddingHorizontal: 8,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputAddressContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    paddingHorizontal: 8,
    minHeight: 80,
  },
  uploadContainer: (ktpData) => ({
    borderWidth: 1,
    borderColor: colors.text.grey1,
    borderRadius: 4,
    padding: 14,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: ktpData ? 'center' : 'space-between'
  }),
  buttonText: (ktpData) => ({
    color: colors.text.header,
    fontSize: 14,
    fontFamily: fonts.primary[600],
    flex: ktpData ? 0 : 1,
  }),
  conditionTermContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  sellerButton: { borderWidth: 0.6, borderColor: colors.border, borderRadius: 6, paddingHorizontal: 10, paddingVertical: 16, width: '48%' }
});
