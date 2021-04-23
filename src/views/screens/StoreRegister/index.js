import React, { useState } from 'react';
import {
  Platform, ScrollView, StyleSheet, Text,
  TouchableOpacity, View
} from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { ICAdd, ICImage, IMGStoreRegistrationSuccess } from '../../../assets';
import { colors, fonts } from '../../../utils';
import { Button, Gap, TopNavbar } from '../../components';
import { useDispatch, useSelector } from 'react-redux'
import { changeMisc, changeStoreProduct } from '../../../store/actions';
import { launchImageLibrary } from 'react-native-image-picker';
import { Controller, useForm } from "react-hook-form";

const theme = { colors: { primary: colors.background.green1, placeholder: colors.text.grey1, accent: colors.text.grey1 } }

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

const StoreRegister = ({ navigation }) => {
  const dispatch = useDispatch();
  const profileReducer = useSelector(state => state.profileReducer);
  const { userProfile: { name } } = profileReducer;

  const [showModal, setShowModal] = useState(false);
  const [ktpError, setKtpError] = useState(false);
  const [ktpErrorMessage, setKtpErrorMessage] = useState("")

  const storeProductReducer = useSelector(state => state.storeProductReducer)
  const { storeProfile, registerLoading } = storeProductReducer;
  const { namaToko, kota, kodePos, ktp } = storeProfile;
  const { control, handleSubmit, errors } = useForm();

  const openGalleryHandler = async () => {
    await launchImageLibrary({ noData: true }, async (response) => {
      if (response.didCancel) {
        await dispatch(changeStoreProduct({ storeProfile: { ...storeProfile, ktp: [] } }))
        setKtpError(true)
        setKtpErrorMessage("Berkas KTP belum dipilih")
      } else {
        if (response.fileSize > 1048576) {
          await dispatch(changeStoreProduct({ storeProfile: { ...storeProfile, ktp: [] } }))
          setKtpError(true)
          setKtpErrorMessage("Ukuran berkas KTP maksimal 1 MB")

        }
        else {
          await dispatch(changeStoreProduct({ storeProfile: { ...storeProfile, ktp: response } }))
          setKtpError(false)
          setKtpErrorMessage("")
        }
      }
    });
  };

  const showModalHandler = async () => {

    await setShowModal(true)
    await setTimeout(() => {
      setShowModal(false)
      navigation.navigate('Toko')
      dispatch(changeMisc({
        showStoreDetail: true
      }))
    }, 2000)
  }


  const postStoreProfileHandler = async () => {
    dispatch(changeStoreProduct({ registerLoading: true }))

    if (ktp.length === 0) {
      setKtpError(true)
      setKtpErrorMessage("Berkas KTP belum dipilih")
      dispatch(changeStoreProduct({ registerLoading: false }))

    } else {
      const data = await createFormData(ktp, { namaToko, kota, kodePos });
      setKtpError(false)
      setKtpErrorMessage("")
      await showModalHandler();
      dispatch(changeStoreProduct({ registerLoading: false }))

    }
  }

  return (
    <View style={styles.container}>
      <TopNavbar
        back
        linkBack={() => navigation.goBack()}
        title="Daftar Toko"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text numberOfLines={2} style={styles.text}>Hai, {name}</Text>
          <Text style={styles.text}>Isi data toko koperasi kamu!</Text>
          <Gap height={20} />
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                theme={theme}
                mode='outlined'
                placeholderTextColor={colors.text.grey1}
                onBlur={onBlur}
                style={styles.textInput}
                keyboardType="name-phone-pad"
                value={value}
                label='Nama Toko'
                onChangeText={(e) => { onChange(e); dispatch(changeStoreProduct({ storeProfile: { ...storeProfile, namaToko: e } })); }}
              />
            )}
            name="namaToko"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.namaToko && <>
            <Gap height={5} />
            <Text style={styles.errorText}>Nama toko harus diisi</Text>
          </>}
          <Gap height={10} />
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                theme={theme}
                mode='outlined'
                placeholderTextColor={colors.text.grey1}
                onBlur={onBlur}
                label='Kota atau Kecamatan'
                style={styles.textInput}
                keyboardType="name-phone-pad"
                value={value}
                onChangeText={(e) => { onChange(e); dispatch(changeStoreProduct({ storeProfile: { ...storeProfile, kota: e } })); }}
              />
            )}
            name="kota"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.kota && <>
            <Gap height={5} />
            <Text style={styles.errorText}>Kota atau kecamatan harus diisi</Text>
          </>}
          <Gap height={10} />
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                theme={theme}
                mode='outlined'
                placeholderTextColor={colors.text.grey1}
                onBlur={onBlur}
                style={styles.textInput}
                keyboardType='decimal-pad'
                value={value}
                label='Kode Pos'
                onChangeText={(e) => { onChange(e); dispatch(changeStoreProduct({ storeProfile: { ...storeProfile, kodePos: e } })); }}
              />
            )}
            name="kodePos"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.kodePos && <>
            <Gap height={5} />
            <Text style={styles.errorText}>Kode Pos harus diisi</Text>
          </>}
          <Gap height={16} />

          <TouchableOpacity style={styles.uploadContainer(ktp.length === 0)} onPress={openGalleryHandler}>
            {ktp.length === 0 ? <ICAdd /> : <ICImage />}
            <Gap width={10} />
            <Text numberOfLines={1} ellipsizeMode='middle' style={styles.buttonText(ktp.length === 0)}>{ktp.length === 0 ? "Upload KTP" : ktp.fileName}</Text>
          </TouchableOpacity>
          {ktpError && <>
            <Gap height={5} />
            <Text style={styles.errorText}>{ktpErrorMessage}</Text>
          </>}
          <Gap height={20} />
          <View style={styles.conditionTermContainer}>
            <Text style={styles.text}>Dengan membuka toko koperasi</Text>
            <View style={styles.conditionTermContainer}>
              <Text style={styles.text}>berarti kamu menyetujui </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    color: colors.text.danger,
                    fontSize: 14,
                    fontFamily: fonts.primary[700],
                  }}>
                  Syarat dan Ketentuan
                </Text>
              </TouchableOpacity>
              <Text style={styles.text}> & </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    color: colors.text.danger,
                    fontSize: 14,
                    fontFamily: fonts.primary[700],
                  }}>
                  Kebijakan Privasi
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Gap height={20} />
          <Button disabled={registerLoading} loading={registerLoading} title="Buka Toko Koperasi" onPress={handleSubmit(postStoreProfileHandler)} variant="primary" fullWidth />
        </View>
      </ScrollView>
      <Portal>
        <Modal visible={showModal} contentContainerStyle={styles.modalContainer}>
          <IMGStoreRegistrationSuccess width={160} height={180} />
          <Text style={styles.text}>Selamat Kamu Berhasil Membuka</Text>
          <Text style={styles.text}>Toko Koperasi</Text>
          <Gap height={10} />
          <Text style={styles.storeTitle}>{namaToko}</Text>
        </Modal>
      </Portal>
    </View>
  );
};

export default StoreRegister;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    width: '100%',
    padding: 18,
  },
  text: {
    fontSize: 14,
    color: colors.text.header,
    fontFamily: fonts.primary[600],
    textAlign: 'center'
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    width: '100%',
  },
  conditionTermContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    padding: 18,
    height: 300,
    margin: 18,
    borderRadius: 6,
    alignItems: 'center'
  },
  storeTitle: {
    fontSize: 18,
    color: colors.text.dark1,
    fontFamily: fonts.primary[600],
  },
  textInput: {
    flex: 1,
    color: colors.black,
    backgroundColor: colors.white,
  },
  uploadContainer: (data) => ({
    borderWidth: 1,
    borderColor: colors.text.grey1,
    borderRadius: 4,
    padding: 14,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: data ? 'center' : 'space-between'
  }),
  buttonText: (data) => ({
    color: colors.text.header,
    fontSize: 14,
    fontFamily: fonts.primary[600],
    flex: data ? 0 : 1,
  }),
  errorText: {
    fontFamily: fonts.primary.normal,
    color: colors.text.danger,
  },
});
