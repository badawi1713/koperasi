import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text, TextInput,
  TouchableOpacity, View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ICInvisible, ICVisible } from '../../../assets';
import { changeRegister, postRegister } from '../../../store/actions';
import { colors, fonts } from '../../../utils';
import { Button, Gap, Link, TopNavbar } from '../../components';

const Register = ({ navigation }) => {
  const dispatch = useDispatch()
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePasswordConfirm, setVisiblePasswordConfirm] = useState(false);

  const registerReducer = useSelector(state => state.registerReducer)

  const { loading } = registerReducer

  const visiblePasswordHandler = () => {
    setVisiblePassword(!visiblePassword);
  };

  const visiblePasswordConfirmHandler = () => {
    setVisiblePasswordConfirm(!visiblePasswordConfirm);
  };

  const registerHandler = () => {
    dispatch(postRegister())
  }

  const phoneNumberRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  return (
    <SafeAreaView style={styles.container}>
      <TopNavbar
        variant="link-back"
        title="Masuk"
        linkTo={() => navigation.navigate('Login')}
        linkBack={() => navigation.navigate('GetStarted')}
        mainTitle="Daftar"
      />
      <ScrollView style={styles.content}>
        <Gap height={40} />
        <View style={styles.inputContainer}>
          <TextInput
            returnKeyType="next"
            style={styles.textInput}
            onChangeText={(e) => dispatch(changeRegister({
              fullName: e
            }))}
            placeholder="Nama Lengkap" keyboardType="name-phone-pad" onSubmitEditing={() => phoneNumberRef.current.focus()} />

        </View>
        <Gap height={20} />
        <View style={styles.inputContainer}>
          <TextInput
            onSubmitEditing={() => emailRef.current.focus()}
            ref={phoneNumberRef}
            returnKeyType="next"
            style={styles.textInput}
            onChangeText={(e) => dispatch(changeRegister({
              phoneNumber: e
            }))}
            placeholder="Nomor Ponsel" keyboardType='phone-pad' />
        </View>
        <Gap height={20} />
        <View style={styles.inputContainer}>
          <TextInput
            onSubmitEditing={() => passwordRef.current.focus()}
            ref={emailRef}
            returnKeyType="next"
            style={styles.textInput}
            onChangeText={(e) => dispatch(changeRegister({
              email: e
            }))}
            placeholder="Email" keyboardType="email-address" />
        </View>
        <Gap height={20} />
        <View style={styles.inputContainer}>
          <TextInput
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            ref={passwordRef}
            returnKeyType="next"
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry={visiblePassword ? false : true}
            onChangeText={(e) => dispatch(changeRegister({
              password: e
            }))}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity onPress={visiblePasswordHandler}>
            {visiblePassword ? <ICInvisible /> : <ICVisible />}
          </TouchableOpacity>
        </View>
        <Gap height={20} />
        <View style={styles.inputContainer}>
          <TextInput
            ref={confirmPasswordRef}
            style={styles.textInput}
            placeholder="Ulangi Password"
            secureTextEntry={visiblePasswordConfirm ? false : true}
            onChangeText={(e) => dispatch(changeRegister({
              passwordConfirm: e
            }))}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity onPress={visiblePasswordConfirmHandler}>
            {visiblePasswordConfirm ? <ICInvisible /> : <ICVisible />}
          </TouchableOpacity>
        </View>
        <Gap height={30} />
        <Button
          variant="primary"
          title="Daftar"
          onPress={registerHandler}
          loading={loading}
        />
        <Gap height={20} />
        <Text style={styles.textInfo}>
          Dengan daftar berarti kamu menyetujui
        </Text>
        <Gap height={10} />
        <View style={styles.termsText}>
          <Link align="center" title="Syarat dan Ketentuan" />
          <Text style={styles.textInfo}> & </Text>
          <Link align="center" title="Kebijakan Privasi" />
        </View>
        <Gap height={10} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
  },
  text: {
    color: colors.primary,
    fontSize: 16,
    fontFamily: fonts.primary[700],
  },
  textInfo: {
    textAlign: 'center',
    fontFamily: fonts.primary.normal,
    color: colors.black,
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    height: 150,
    width: 240,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 40,
  },
  button: {
    width: '50%',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    paddingLeft: 8,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    flex: 1
  },
  termsText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
