import React, { useRef, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
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
  const { control, handleSubmit, errors, watch } = useForm();

  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePasswordConfirm, setVisiblePasswordConfirm] = useState(false);

  const registerReducer = useSelector(state => state.registerReducer)

  const { loading, phoneNumber } = registerReducer

  const visiblePasswordHandler = () => {
    setVisiblePassword(!visiblePassword);
  };

  const visiblePasswordConfirmHandler = () => {
    setVisiblePasswordConfirm(!visiblePasswordConfirm);
  };

  const password = watch("password");
  const passwordConfirm = watch("passwordConfirm");

  const registerHandler = async () => {
    if (password !== passwordConfirm) {
      return false
    } else {
      await dispatch(changeRegister({
        loading: true
      }))
      await dispatch(postRegister())
    }
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
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                onBlur={onBlur}
                placeholderTextColor={colors.text.grey1}
                returnKeyType="next"
                style={styles.textInput}
                onChangeText={(e) => { onChange(e); dispatch(changeRegister({ fullName: e })) }}
                value={value}
                placeholder="Nama Lengkap" keyboardType="name-phone-pad" onSubmitEditing={() => phoneNumberRef.current.focus()} />
            )}
            name="fullName"
            rules={{ required: true }}
            defaultValue=""
          />
        </View>
        {errors.fullName && <>
          <Gap height={5} />
          <Text style={styles.errorText}>Nama lengkap harus diisi</Text>
        </>}
        <Gap height={20} />
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                placeholderTextColor={colors.text.grey1}
                onSubmitEditing={() => emailRef.current.focus()}
                onBlur={onBlur}
                ref={phoneNumberRef}
                returnKeyType="next"
                style={styles.textInput}
                onChangeText={(e) => { onChange(e); dispatch(changeRegister({ phoneNumber: e })) }}
                value={value}
                placeholder="Nomor Ponsel" keyboardType='phone-pad' />
            )}
            name="phoneNumber"
            rules={{ required: true }}
            defaultValue=""
          />
        </View>
        {errors.phoneNumber && <>
          <Gap height={5} />
          <Text style={styles.errorText}>Nomor ponsel harus diisi</Text>
        </>}
        <Gap height={20} />
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                placeholderTextColor={colors.text.grey1}
                onSubmitEditing={() => passwordRef.current.focus()}
                ref={emailRef}
                onBlur={onBlur}
                returnKeyType="next"
                style={styles.textInput}
                onChangeText={(e) => { onChange(e); dispatch(changeRegister({ email: e })) }}
                value={value}
                placeholder="Email" keyboardType="email-address" />
            )}
            name="email"
            rules={{ required: true }}
            defaultValue=""
          />
        </View>
        {errors.email && <>
          <Gap height={5} />
          <Text style={styles.errorText}>Email harus diisi</Text>
        </>}
        <Gap height={20} />
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                onSubmitEditing={() => confirmPasswordRef.current.focus()}
                ref={passwordRef}
                returnKeyType="next"
                style={styles.textInput}
                placeholder="Password"
                value={value}
                onBlur={onBlur}
                secureTextEntry={visiblePassword ? false : true}
                onChangeText={(e) => { onChange(e); dispatch(changeRegister({ password: e })) }}
                autoCorrect={false}
                placeholderTextColor={colors.text.grey1}
                autoCapitalize='none'
              />
            )}
            name="password"
            rules={{ required: true, minLength: 6 }}
            defaultValue=""
          />
          <TouchableOpacity onPress={visiblePasswordHandler}>
            {visiblePassword ? <ICInvisible /> : <ICVisible />}
          </TouchableOpacity>
        </View>
        {errors.password?.type === "required" && <>
          <Gap height={5} />
          <Text style={styles.errorText}>Password harus diisi</Text>
        </>}
        {errors.password?.type === "minLength" && <>
          <Gap height={5} />
          <Text style={styles.errorText}>Password minimal 6 karakter</Text>
        </>}
        <Gap height={20} />
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                ref={confirmPasswordRef}
                style={styles.textInput}
                placeholder="Konfirmasi Password"
                value={value}
                onBlur={onBlur}
                secureTextEntry={visiblePasswordConfirm ? false : true}
                onChangeText={(e) => { onChange(e); dispatch(changeRegister({ passwordConfirm: e })) }}
                autoCorrect={false}
                placeholderTextColor={colors.text.grey1}
                autoCapitalize='none'
              />
            )}
            name="passwordConfirm"
            rules={{ required: true }}
            defaultValue=""
          />
          <TouchableOpacity onPress={visiblePasswordConfirmHandler}>
            {visiblePasswordConfirm ? <ICInvisible /> : <ICVisible />}
          </TouchableOpacity>
        </View>
        {
          password !== passwordConfirm && <>
            <Gap height={5} />
            <Text style={styles.errorText}>Konfirmasi password belum sesuai</Text>
          </>
        }
        <Gap height={30} />
        <Button
          variant="primary"
          title="Daftar"
          onPress={handleSubmit(registerHandler)}
          loading={loading}
        />
        <Gap height={20} />
        <Text style={styles.textInfo}>
          Dengan daftar berarti kamu menyetujui
        </Text>
        <Gap height={5} />
        <View style={styles.termsText}>
          <Link align="center" title="Syarat dan Ketentuan" />
          <Text style={styles.textInfo}> & </Text>
          <Link align="center" title="Kebijakan Privasi" />
        </View>
        <Gap height={20} />
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
  errorText: {
    fontFamily: fonts.primary.normal,
    color: colors.text.danger
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
    flex: 1,
    color: colors.text.dark1,
    fontFamily: fonts.primary.normal,
    fontSize: 14
  },
  termsText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
