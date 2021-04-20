import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView, StyleSheet, Text,
  TouchableOpacity, View
} from 'react-native';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';
import { IMGGetStarted1, IMGNoData } from '../../../assets';
import { colors, fonts } from '../../../utils';
import { AddProductForm, Button, Gap, TopNavbar } from '../../components';
import { changeStoreProduct } from '../../../store/actions';

const Store = ({ navigation }) => {
  const dispatch = useDispatch()
  const [showAddProductForm, setShowAddProductForm] = useState(false)

  const miscReducer = useSelector(state => state.miscReducer)
  const storeProductReducer = useSelector(state => state.storeProductReducer)

  const { newProductData, registerLoading } = storeProductReducer


  const { showStoreDetail } = miscReducer

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
        <View style={styles.mainContent}>
          <View style={styles.row}>
            <Avatar.Icon size={64} style={{ backgroundColor: colors.background.grey4 }} icon="store" />
            <Gap width={10} />
            <View >
              <Text style={styles.storeTitle}>Koperasi Charisma</Text>
              <Gap height={5} />
              <View style={styles.row}>
                <Icon name="star" size={14} color="#FFD700" solid />
                <Icon name="star" size={14} color="#FFD700" solid />
                <Icon name="star" size={14} color="#FFD700" solid />
                <Icon name="star" size={14} color="#FFD700" solid />
                <Icon name="star" size={14} color="#FFD700" solid />
              </View>
            </View>
          </View>
          <Gap height={30} />
          <View>
            <Text style={styles.headerText}>Penjualan Produk</Text>
            <Gap height={20} />
            <View style={styles.row, { justifyContent: 'space-between', flex: 1, flexDirection: 'row' }}>
              <TouchableOpacity style={{ alignItems: 'center' }}>
                <Icon name="box-open" size={32} color={colors.background.red1} solid />
                <Gap height={5} />
                <Text style={styles.text}>Pesanan</Text>
                <Text style={styles.text}>Baru</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: 'center' }}>
                <Icon name="truck-loading" size={32} color={colors.background.red1} solid />
                <Gap height={5} />
                <Text style={styles.text}>Siap</Text>
                <Text style={styles.text}>Dikirim</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: 'center' }}>
                <Icon name="truck" size={32} color={colors.background.red1} solid />
                <Gap height={5} />
                <Text style={styles.text}>Sedang</Text>
                <Text style={styles.text}>Dikirim</Text>

              </TouchableOpacity>
              <TouchableOpacity style={{ alignItems: 'center' }}>
                <Icon name="clipboard-check" size={32} color={colors.background.red1} solid />
                <Gap height={5} />
                <Text style={styles.text}>Sampai</Text>
                <Text style={styles.text}>Tujuan</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Gap height={30} />
          <Button onPress={() => setShowAddProductForm(true)} fullWidth variant='primary' title='Tambah Produk' />
          <Gap height={30} />
          <View>
            <Text style={styles.headerText}>Produk</Text>
            <Gap height={20} />
            <View style={{ alignItems: 'center' }}>
              <IMGNoData width={120} height={140} />
              <Text style={styles.text}>Belum Ada Produk</Text>

            </View>
          </View>
        </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopNavbar back={showAddProductForm} linkBack={() => setShowAddProductForm(false)} title={showAddProductForm ? "Tambah Produk" : "Toko"} />

      {showStoreDetail ? <ScrollView showsVerticalScrollIndicator={false}><StoreScreen />
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
    backgroundColor: colors.white,
  },
  mainContent: {
    padding: 18,
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
});
