import React from 'react';
import {
  ScrollView, StyleSheet, Text,


  TextInput,
  TouchableOpacity, View
} from 'react-native';
import { useSelector } from 'react-redux';
import { ICAdd } from '../../../assets';
import { colors, fonts } from '../../../utils';
import { Button, Gap, TopNavbar } from '../../components';

const StoreRegister = ({ navigation }) => {
  const profileReducer = useSelector(state => state.profileReducer);
  const { userProfile: { name } } = profileReducer;
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
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Nama Toko Koperasi"
              keyboardType="name-phone-pad"
            />
          </View>
          <Gap height={10} />
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Kota atau Kecamatan"
              keyboardType="name-phone-pad"
            />
          </View>
          <Gap height={10} />
          <View style={styles.inputContainer}>
            <TextInput placeholder="Kode Pos" keyboardType="number-pad" />
          </View>
          <Gap height={10} />
          <TouchableOpacity style={styles.uploadContainer}>
            <ICAdd />
            <Text style={styles.buttonText}>
              Upload Akta Pendirian Koperasi
            </Text>
          </TouchableOpacity>
          <Gap height={10} />
          <TouchableOpacity style={styles.uploadContainer}>
            <ICAdd />
            <Text style={styles.buttonText}>Upload KTP Penanggung Jawab</Text>
          </TouchableOpacity>
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
          <Button title="Buka Toko Koperasi" variant="primary" fullWidth />
        </View>
      </ScrollView>
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
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: colors.text.header,
    fontFamily: fonts.primary[600],
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    paddingHorizontal: 8,
    width: '100%',
  },
  uploadContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    padding: 14,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.text.header,
    fontSize: 14,
    fontFamily: fonts.primary[600],
    marginLeft: 20,
  },
  conditionTermContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
