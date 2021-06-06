import React, { useContext, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView, StyleSheet, Text,
  TouchableOpacity, View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from 'react-redux';
import { ICCartGreen, ICHelp, ICPrivacy, ICSetting, ICShoppingBag, ICTerms, ICTransaction, ICWaiting } from '../../../assets';
import { Context } from '../../../context/AuthContext';
import { checkStoreProfile } from '../../../store/actions';
import { colors, fonts } from '../../../utils';
import { Button, Gap, TopNavbar } from '../../components';

const Profile = ({ navigation }) => {
  const dispatch = useDispatch()
  const { signout } = useContext(Context);
  const profileReducer = useSelector(state => state.profileReducer);
  const storeProductReducer = useSelector(state => state.storeProductReducer)

  const { userProfile: { name, email, noTelp } } = profileReducer
  const { loading, storeData } = storeProductReducer

  useEffect(() => {
    const getStoreData = () => {
      dispatch(checkStoreProfile())
    }

    return getStoreData()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <TopNavbar title="Akun" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection} >
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
            <View>
              <Text style={styles.profileTextName}>{name}</Text>
              <Gap height={5} />
              <Text style={styles.profileText}>{email}</Text>
              <Gap height={5} />
              <Text style={styles.profileText}>{noTelp}</Text>
            </View>
            <TouchableOpacity>
              <ICSetting />
            </TouchableOpacity>
          </View>
          <Gap height={20} />
          <TouchableOpacity style={{ flexDirection: 'row', borderRadius: 6, alignItems: 'center', flex: 1, borderWidth: 0.3 }} onPress={() => navigation.navigate('Toko')} >
            <View style={{ padding: 10, backgroundColor: colors.background.green1, borderTopLeftRadius: 6, borderBottomLeftRadius: 6 }}>
              <Icon name='store-alt' size={18} color={colors.white} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1, padding: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.text}>Toko Saya: </Text>
                <Gap width={2} />
                <Text style={styles.storeText}>
                  {loading ? "Memuat ..." : storeData && storeData.namaToko ? storeData && storeData.namaToko : 'Belum Terdaftar'}
                </Text>
              </View>
              <Icon name='chevron-right' size={18} color={colors.text.grey2} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonGroup}>
          <Button fullWidth title="Anggota Koperasi" onPress={() => navigation.navigate('CoperationMember')} variant="primary" />
          {/* <View style={styles.buttonItem}>
            <Button fullWidth title="Akun Koperasi" onPress={() => navigation.navigate('CoperationAccount')} />
          </View> */}
        </View>
        <View style={styles.miscSection}>
          <Text style={styles.headerText}>Daftar Transaksi</Text>
          <Gap height={20} />
          <View style={styles.transactionGroup}>
            <TouchableOpacity style={styles.transactionItem}>
              <ICCartGreen color={colors.background.green1} />
              <Gap height={10} />
              <Text style={styles.text}>Keranjang</Text>
              <Text style={styles.text}>Belanja</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.transactionItem}>
              <ICWaiting />
              <Gap height={10} />
              <Text style={styles.text}>Menunggu</Text>
              <Text style={styles.text}>Pembayaran</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.transactionItem}>
              <ICTransaction />
              <Gap height={10} />
              <Text style={styles.text}>Transaksi</Text>
              <Text style={styles.text}> Berlangsung</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.transactionItem}>
              <ICShoppingBag />
              <Gap height={10} />
              <Text style={styles.text} >Semua</Text>
              <Text style={styles.text} >Transaksi</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Gap height={20} />
        <View style={styles.miscSection}>
          <View style={styles.miscGroup}>
            <TouchableOpacity style={styles.miscItem}>
              <ICHelp />
              <Gap width={20} />
              <Text style={styles.miscText}>Help</Text>
            </TouchableOpacity>
          </View>
          <Gap height={20} />
          <View style={styles.miscGroup}>
            <TouchableOpacity style={styles.miscItem}>
              <ICTerms />
              <Gap width={20} />
              <Text style={styles.miscText}>Terms of Service</Text>
            </TouchableOpacity>
          </View>
          <Gap height={20} />

          <View style={styles.miscGroup}>
            <TouchableOpacity style={styles.miscItem}>
              <ICPrivacy />
              <Gap width={20} />
              <Text style={styles.miscText}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonGroup}>
          <Button
            onPress={signout}
            title="Keluar"
            fullWidth
            variant="outlined"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    width: '100%',
  },
  profileSection: {
    padding: 18,
    backgroundColor: colors.white,
  },
  profileTextName: {
    color: colors.text.secondary,
    fontFamily: fonts.primary[700],
    fontSize: 16,
  },
  profileText: {
    color: colors.text.secondary,
    fontFamily: fonts.primary.normal,
  },
  buttonGroup: {
    flexDirection: 'row',
    padding: 18,
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  buttonItem: {
    width: '48%',
  },
  miscSection: {
    padding: 18,
    backgroundColor: colors.white,
  },
  miscItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miscText: {
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
  },
  headerText: {
    fontFamily: fonts.primary[600],
    color: colors.black,
    fontSize: 16
  },
  transactionGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionItem: {
    alignItems: 'center'
  },
  text: {
    fontFamily: fonts.primary[400],
    color: colors.black
  },
  storeText: {
    fontFamily: fonts.primary[600],
    color: colors.black
  }
});
