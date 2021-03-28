import React, { useContext, useState, useRef } from 'react';
import { useForm, Controller } from "react-hook-form";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ICInvisible, ICVisible } from '../../../assets';
import { Context } from '../../../context/AuthContext';
import { colors, fonts } from '../../../utils';
import { Button, Gap, Link, TopNavbar } from '../../components';

const Login = ({ navigation }) => {
  const { control, handleSubmit, errors } = useForm();

  const [visiblePassword, setVisiblePassword] = useState(false);

  const { state, signin } = useContext(Context);

  const passwordRef = useRef();

  const visiblePasswordHandler = () => {
    setVisiblePassword(!visiblePassword);
  };

  const onSubmit = async ({ email, password }) => {
    const data = {
      nis: email,
      password,
    };

    await signin(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopNavbar
        variant="link-back"
        title="Daftar"
        linkTo={() => navigation.navigate('Register')}
        linkBack={() => navigation.navigate('GetStarted')}
        mainTitle="Masuk"
      />
      <ScrollView style={styles.content}>
        <Gap height={40} />
        <View style={styles.logoContainer}>
          <ImageBackground
            source={require('../../../assets/images/img-logo.jpg')}
            style={styles.logo}
          />
        </View>
        <Gap height={40} />
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                onBlur={onBlur}
                onSubmitEditing={() => passwordRef.current.focus()}
                returnKeyType="next"
                placeholder="Email atau Nomor Ponsel"
                onChangeText={value => onChange(value)}
                style={styles.textInput}
                keyboardType='email-address'
                value={value}
              />
            )}
            name="email"
            rules={{ required: true }}
            defaultValue=""
          />
        </View>
        {errors.email && <>
          <Gap height={5} />
          <Text style={styles.errorText}>Email atau nomor ponsel harus diisi</Text>
        </>}
        <Gap height={20} />
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                ref={passwordRef}
                style={styles.textInput}
                placeholder="Password"
                value={value}
                onBlur={onBlur}
                secureTextEntry={visiblePassword ? false : true}
                onChangeText={value => onChange(value)}
                autoCorrect={false}
              />
            )}
            name="password"
            rules={{ required: true }}
            defaultValue=""
          />
          <TouchableOpacity onPress={visiblePasswordHandler}>
            {visiblePassword ? <ICInvisible /> : <ICVisible />}
          </TouchableOpacity>
        </View>
        {errors.password && <>
          <Gap height={5} />
          <Text style={styles.errorText}>Password harus diisi</Text>
        </>}
        <Gap height={30} />
        <Button
          loading={state.loading}
          variant="primary"
          title={'Masuk'}
          onPress={handleSubmit(onSubmit)}
        />
        <Gap height={20} />
        <View style={styles.registeredText}>
          <Text style={{ fontFamily: fonts.primary.normal }}>Belum punya akun?</Text>
          <Gap width={5} />
          <Link
            title="Daftar Sekarang"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
        <Gap height={10} />
        <Link align="center" title="Lupa Password?" />
        <Gap height={10} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

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
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    flex: 1
  },

  registeredText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
