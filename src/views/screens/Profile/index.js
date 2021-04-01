import React, { useContext } from 'react';
import {
  SafeAreaView,
  ScrollView, StyleSheet, Text,
  TouchableOpacity, View
} from 'react-native';
import { useSelector } from 'react-redux';
import { ICHelp, ICPrivacy, ICSetting, ICTerms } from '../../../assets';
import { Context } from '../../../context/AuthContext';
import { colors, fonts } from '../../../utils';
import { Button, Gap, TopNavbar } from '../../components';

const Profile = ({ navigation }) => {
  const { signout } = useContext(Context);
  const profileReducer = useSelector(state => state.profileReducer);
  const { userProfile: { name, email, noTelp } } = profileReducer

  return (
    <SafeAreaView style={styles.container}>
      <TopNavbar title="Akun" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
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
        <View style={styles.buttonGroup}>
          <View style={styles.buttonItem}>
            <Button fullWidth title="Anggota Koperasi" onPress={() => navigation.navigate('CoperationMember')} variant="primary" />
          </View>
          <View style={styles.buttonItem}>
            <Button fullWidth title="Akun Koperasi" onPress={() => navigation.navigate('CoperationAccount')} />
          </View>
        </View>
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
            variant="primary"
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
});
