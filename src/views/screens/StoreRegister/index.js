import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView, StyleSheet, Text,
  TouchableOpacity, View
} from 'react-native';
import SelectPicker from 'react-native-form-select-picker';
import { Modal, Portal, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { IMGStoreRegistrationSuccess } from '../../../assets';
import { changeMisc, changeStoreProduct, getCityData, getProvinceData, getSubDistrictData, postStoreRegistration } from '../../../store/actions';
import { colors, fonts } from '../../../utils';
import { Button, Gap, TopNavbar } from '../../components';

const theme = { colors: { primary: colors.background.green1, placeholder: colors.text.grey1, accent: colors.text.grey1 } }

const storeName = /^\S*$/

const StoreRegister = ({ navigation }) => {
  const dispatch = useDispatch();
  const profileReducer = useSelector(state => state.profileReducer);
  const { userProfile: { name } } = profileReducer;

  const [showModal, setShowModal] = useState(false);

  const storeProductReducer = useSelector(state => state.storeProductReducer)
  const { storeProfile, registerLoading, dataProvinsi, dataKota, dataKecamatan } = storeProductReducer;
  const { namaToko, kota, kodePos, provinsi, kecamatan, alamat } = storeProfile;
  const { control, handleSubmit, errors } = useForm();

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

  console.log(errors)

  const postStoreProfileHandler = async () => {
    dispatch(changeStoreProduct({ registerLoading: true }))

    const data = {
      "namaToko": namaToko,
      "provinsi": provinsi,
      "kota": kota,
      "kecamatan": kecamatan,
      "detailAlamat": alamat,
      "kodePos": kodePos
    }

    await dispatch(postStoreRegistration(data))
    await showModalHandler();

  }

  useEffect(() => {
    const getProvinceList = () => {
      dispatch(getProvinceData())
    }

    return getProvinceList()
  }, [])

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
            patt
            rules={{
              required: {
                value: true,
                message: "Nama toko harus diisi"
              }, pattern: { value: storeName, message: "Nama toko tidak boleh ada spasi" }
            }}
            defaultValue=""
          />
          {errors.namaToko && <>
            <Gap height={5} />
            <Text style={styles.errorText}>{errors?.namaToko?.message}</Text>
          </>}
          <Gap height={15} />
          <Controller
            control={control}
            render={({ onChange }) => (
              <SelectPicker
                doneButtonTextStyle={{ color: colors.text.green1, fontFamily: fonts.primary[600] }}
                doneButtonText='Pilih'
                onValueChange={async (e) => { await onChange(e); dispatch(changeStoreProduct({ storeProfile: { ...storeProfile, provinsi: e, kota: "", kecamatan: "" } })); await dispatch(getCityData()) }}
                placeholder='Pilih Provinsi'
                selected={provinsi}
                style={styles.selectInput}
                placeholderStyle={{ color: colors.text.grey1, fontFamily: fonts.primary.normal }}
              >
                {Object.values(dataProvinsi).map((item) => (
                  <SelectPicker.Item key={item.id} label={item.provinsiName} value={item.id} />
                ))}
              </SelectPicker>
            )}
            name="provinsi"
            rules={{ required: true }}
            defaultValue=""
          />

          {errors.provinsi && <>
            <Gap height={5} />
            <Text style={styles.errorText}>Provinsi harus diisi</Text>
          </>}
          <Gap height={15} />
          <Controller
            control={control}
            render={({ onChange }) => (
              <>
                <SelectPicker
                  doneButtonTextStyle={{ color: colors.text.green1, fontFamily: fonts.primary[600] }}
                  doneButtonText='Pilih'
                  onValueChange={async (e) => { await onChange(e); await dispatch(changeStoreProduct({ storeProfile: { ...storeProfile, kota: e, kecamatan: "" } })); await dispatch(getSubDistrictData()) }}
                  placeholder='Pilih Kota atau Kabupaten'
                  selected={kota}
                  disabled={provinsi === ""}
                  style={styles.selectInput}
                  placeholderStyle={{ color: colors.text.grey1, fontFamily: fonts.primary.normal }}
                >
                  {Object.values(dataKota).map((item) => (
                    <SelectPicker.Item key={item.id} label={item.namaKota} value={item.id} />
                  ))}
                </SelectPicker>
              </>
            )}
            name="kota"
            rules={{ required: true }}
            defaultValue=""
          />

          {errors.kota && <>
            <Gap height={5} />
            <Text style={styles.errorText}>Kota atau kabupaten harus diisi</Text>
          </>}
          <Gap height={15} />
          <Controller
            control={control}
            render={({ onChange }) => (
              <SelectPicker
                doneButtonTextStyle={{ color: colors.text.green1, fontFamily: fonts.primary[600] }}
                doneButtonText='Pilih'
                disabled={kota === ""}
                onValueChange={(e) => { onChange(e); dispatch(changeStoreProduct({ storeProfile: { ...storeProfile, kecamatan: e } })); }}
                placeholder='Pilih Kecamatan'
                selected={kecamatan}
                style={styles.selectInput}

                placeholderStyle={{ color: colors.text.grey1, fontFamily: fonts.primary.normal }}
              >
                {Object.values(dataKecamatan).map((item) => (
                  <SelectPicker.Item key={item.id} label={item.namaKecamatan} value={item.id} />
                ))}

              </SelectPicker>
            )}
            name="kecamatan"
            rules={{ required: true }}
            defaultValue=""
          />

          {errors.kecamatan && <>
            <Gap height={5} />
            <Text style={styles.errorText}>Kecamatan harus diisi</Text>
          </>}

          <Gap height={15} />
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                theme={theme}
                mode='outlined'
                placeholderTextColor={colors.text.grey1}
                onBlur={onBlur}
                style={styles.textInput}
                keyboardType='name-phone-pad'
                value={value}
                label='Alamat'
                multiline
                numberOfLines={3}
                onChangeText={(e) => { onChange(e); dispatch(changeStoreProduct({ storeProfile: { ...storeProfile, alamat: e } })); }}
              />
            )}
            name="alamat"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.alamat && <>
            <Gap height={5} />
            <Text style={styles.errorText}>Alamat harus diisi</Text>
          </>}

          <Gap height={15} />
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                theme={theme}
                mode='outlined'
                placeholderTextColor={colors.text.grey1}
                onBlur={onBlur}
                style={styles.textInput}
                keyboardType='number-pad'
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
            <Text style={styles.errorText}>Kode pos harus diisi</Text>
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
  selectInput: {
    flex: 1,
    color: colors.black,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.text.grey1,
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 16,
    width: '100%',
    fontSize: 16,
    fontFamily: fonts.primary[400]
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
