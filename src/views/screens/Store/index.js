import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import {
  BackHandler, Image,
  Platform, SafeAreaView,
  ScrollView, StyleSheet, Text, TextInput,
  TouchableOpacity, View
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ICAdd, IMGGetStarted1, IMGNoData } from '../../../assets';
import { colors, fonts } from '../../../utils';
import { Button, Gap, TopNavbar } from '../../components';


const createFormData = (file, body = {}) => {
  const data = new FormData();

  data.append('ktp', {
    name: file.fileName,
    type: file.type,
    uri: Platform.OS === 'ios' ? file.uri.replace('file://', '') : file.uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

const Store = ({ navigation }) => {
  const haveStore = false;
  const [showAddProductForm, setShowAddProductForm] = useState(false)
  const [ktpError, setKtpError] = useState(false);
  const [ktpErrorMessage, setKtpErrorMessage] = useState("")

  const { control, handleSubmit, errors } = useForm();

  const openGalleryHandler = async () => {
    await launchImageLibrary({ noData: true }, async (response) => {
      if (response.didCancel) {
        setKtpError(true)
        setKtpErrorMessage("Ukuran berkas KTP maksimal 1 MB")

      }
      else {
        setKtpError(false)
        setKtpErrorMessage("")
      }
    })
  }

  const postMemberProfileHandler = async () => {
    console.log("Press")

  };

  const handleBackButtonClick = () => {
    setShowAddProductForm(false)
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

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

  const AddProductForm = () => {
    return <View style={styles.mainContent}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nama Produk</Text>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                placeholderTextColor={colors.text.grey1}

                onBlur={onBlur}
                style={styles.textInput}
                placeholder="Nama Produk"
                keyboardType="name-phone-pad"
                value={value}
                onChangeText={(e) => { onChange(e) }}
              />
            )}
            name="nama"
            rules={{ required: true }}
            defaultValue={""}
          />
        </View>
        {errors.nama && <>
          <Gap height={5} />
          <Text style={styles.errorText}>Nama lengkap harus diisi</Text>
        </>}
      </View>
      <Gap height={10} />
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Kategori</Text>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                placeholderTextColor={colors.text.grey1}

                onBlur={onBlur}
                style={styles.textInput}
                placeholder="Pilih Kategori"
                keyboardType="name-phone-pad"
                value={value}
                onChangeText={(e) => { onChange(e) }}
              />
            )}
            name="kategori"
            rules={{ required: true }}
            defaultValue={""}
          />
        </View>
        {errors.nama && <>
          <Gap height={5} />
          <Text style={styles.errorText}>Kategori harus diisi</Text>
        </>}
      </View>
      <Gap height={10} />
      <View style={[styles.inputGroup, { flexDirection: 'row', justifyContent: 'space-between' }]}>
        <View style={{ width: "50%" }}>
          <Text style={styles.label}>Harga</Text>
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  placeholderTextColor={colors.text.grey1}
                  onBlur={onBlur}
                  style={styles.textInput}
                  value={value}
                  placeholder="Rp 0"
                  keyboardType="name-phone-pad"
                  onChangeText={(e) => { onChange(e) }}
                />
              )}
              name="tempatLahir"
              rules={{ required: true }}
              defaultValue=""
            />
          </View>
          {errors.tempatLahir && <>
            <Gap height={5} />
            <Text style={styles.errorText}>Tempat lahir harus diisi</Text>
          </>}
        </View>
        <View style={{ width: "45%" }}>
          <Text style={styles.label}>Berat</Text>
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  placeholderTextColor={colors.text.grey1}
                  onBlur={onBlur}
                  style={styles.textInput}
                  value={value}
                  placeholder="0 gram"
                  keyboardType="name-phone-pad"
                  onChangeText={(e) => { onChange(e) }}
                />
              )}
              name="tempatLahir"
              rules={{ required: true }}
              defaultValue=""
            />
          </View>
          {errors.tempatLahir && <>
            <Gap height={5} />
            <Text style={styles.errorText}>Tempat lahir harus diisi</Text>
          </>}
        </View>
      </View>
      <Gap height={10} />
      <View style={[styles.inputGroup, { flexDirection: 'row', justifyContent: 'space-between' }]}>
        <View style={{ width: "50%" }}>
          <Text style={styles.label}>Stok Produk</Text>
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  placeholderTextColor={colors.text.grey1}
                  onBlur={onBlur}
                  style={styles.textInput}
                  value={value}
                  placeholder="0"
                  keyboardType="name-phone-pad"
                  onChangeText={(e) => { onChange(e) }}
                />
              )}
              name="tempatLahir"
              rules={{ required: true }}
              defaultValue=""
            />
          </View>
          {errors.tempatLahir && <>
            <Gap height={5} />
            <Text style={styles.errorText}>Tempat lahir harus diisi</Text>
          </>}
        </View>
        <View style={{ width: "45%" }}>
          <Text style={styles.label}>Kondisi Produk</Text>
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  placeholderTextColor={colors.text.grey1}
                  onBlur={onBlur}
                  style={styles.textInput}
                  value={value}
                  placeholder="Pilih Kondisi"
                  keyboardType="name-phone-pad"
                  onChangeText={(e) => { onChange(e) }}
                />
              )}
              name="tempatLahir"
              rules={{ required: true }}
              defaultValue=""
            />
          </View>
          {errors.tempatLahir && <>
            <Gap height={5} />
            <Text style={styles.errorText}>Tempat lahir harus diisi</Text>
          </>}
        </View>
      </View>
      <Gap height={10} />
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Deskripsi</Text>
        <View style={styles.inputAddressContainer}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                placeholderTextColor={colors.text.grey1}
                onBlur={onBlur}
                style={styles.textInput}
                value={value}
                placeholder="Deskripsi Produk"
                keyboardType="name-phone-pad"
                multiline={true}
                onChangeText={(e) => { onChange(e) }}
              />
            )}
            name="deskripsi"
            rules={{ required: true }}
            defaultValue=""
          />

        </View>
        {errors.alamat && <>
          <Gap height={5} />
          <Text style={styles.errorText}>Alamat harus diisi</Text>
        </>}
      </View>
      <Gap height={10} />
      <TouchableOpacity style={styles.uploadContainer(0)} onPress={openGalleryHandler}>
        <ICAdd />
        <Gap width={10} />
        <Text numberOfLines={1} ellipsizeMode='middle' style={styles.buttonText(0)}>Upload Foto Produk</Text>
      </TouchableOpacity>
      {ktpError && <>
        <Gap height={5} />
        <Text style={styles.errorText}>{ktpErrorMessage}</Text>
      </>}

      <Gap height={20} />
      <Button onPress={
        handleSubmit(postMemberProfileHandler)
      } title="Tambah Produk" variant="primary" fullWidth />
    </View>
  }

  const StoreScreen = () => {
    return (
      showAddProductForm ? <AddProductForm /> :
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {haveStore ? <StoreScreen /> : <StoreRegistration />
        }
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
  mainContent: {
    padding: 18,
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
    borderColor: colors.border,
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
