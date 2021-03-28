import React, { useEffect, useState } from 'react';
import {
  ScrollView, StyleSheet, Text,
  TouchableOpacity, View, ActivityIndicator
} from 'react-native';
import { ICBackspace } from '../../../assets';
import { colors, fonts } from '../../../utils';
import { Gap, Link, TopNavbar } from '../../components';
import { postOTP, changeRegister } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux'

const formatTime = (time) =>
  `${String(Math.floor(time / 60)).padStart(2, '0')}:${String(
    time % 60,
  ).padStart(2, '0')}`;

const RegisterVerification = ({ navigation }) => {
  const dispatch = useDispatch();

  const register = useSelector(state => state.registerReducer)

  const { phoneNumber, loading, error } = register

  const [time, setTime] = useState(300);
  const [codeText, setCodetext] = useState([]);

  useEffect(() => {
    if (time === 0) {
      setTime(null)
    }

    if (!time) return;

    const timer = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  useEffect(() => {

    const otpVerification = () => {
      const stringOTP = codeText.join()
      const newOTP = stringOTP.replace(/,/g, '')
      dispatch(postOTP(newOTP))
    }

    if (codeText.length !== 4) {
      return;
    } else {
      return otpVerification();
    }
  }, [dispatch, codeText])

  const typeCodeTextHandler = (code) => {
    if (codeText.length >= 4) {
      return false;
    } else {
      setCodetext([...codeText, code]);
    }
  };

  const deleteCodeTextHandler = () => {
    if (codeText.length > 0) {
      setCodetext(codeText.slice(0, -1));
    }
    return false;
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopNavbar title="Verifikasi Pendaftaran" />
        <Gap height={40} />
        <Text style={styles.title}>Masukkan Kode Verifikasi</Text>
        <Gap height={20} />
        <Text style={styles.subtitle}>
          Hello! Kode verifikasi sudah dikirim melalui SMS ke
        </Text>
        <Gap height={10} />
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>
        <Gap height={40} />
        <View style={styles.codeVerificationGroup}>
          <View style={styles.codeVerificationItem}>
            <Text style={styles.codeText}>{codeText[0]}</Text>
          </View>
          <View style={styles.codeVerificationItem}>
            <Text style={styles.codeText}>{codeText[1]}</Text>
          </View>
          <View style={styles.codeVerificationItem}>
            <Text style={styles.codeText}>{codeText[2]}</Text>
          </View>
          <View style={styles.codeVerificationItem}>
            <Text style={styles.codeText}>{codeText[3]}</Text>
          </View>
        </View>
        <Gap height={20} />
        {time === null ? <View>
          <Text style={styles.errorText}>Waktu Verifikasi Habis</Text>
          <Gap height={5} />
          <Link onPress={async () => {
            await dispatch(changeRegister({
              fullName: "",
              phoneNumber: "",
              email: "",
              password: "",
              passwordConfirm: ""
            }))
            await navigation.navigate('Register')
          }} title="Silakan daftar kembali" />
        </View> :
          <Text style={styles.countdownTimer}>{formatTime(time)}</Text>
        }
        <Gap height={20} />
        <View style={styles.numpadContainer}>
          <TouchableOpacity
            style={styles.buttonGroup}
            onPress={() => typeCodeTextHandler(1)}>
            <Text style={styles.buttonItem}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonGroup}
            onPress={() => typeCodeTextHandler(2)}>
            <Text style={styles.buttonItem}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonGroup}
            onPress={() => typeCodeTextHandler(3)}>
            <Text style={styles.buttonItem}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonGroup}
            onPress={() => typeCodeTextHandler(4)}>
            <Text style={styles.buttonItem}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonGroup}
            onPress={() => typeCodeTextHandler(5)}>
            <Text style={styles.buttonItem}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonGroup}
            onPress={() => typeCodeTextHandler(6)}>
            <Text style={styles.buttonItem}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonGroup}
            onPress={() => typeCodeTextHandler(7)}>
            <Text style={styles.buttonItem}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonGroup}
            onPress={() => typeCodeTextHandler(8)}>
            <Text style={styles.buttonItem}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonGroup}
            onPress={() => typeCodeTextHandler(9)}>
            <Text style={styles.buttonItem}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonGroup}
            onPress={() => typeCodeTextHandler(0)}>
            <Text style={styles.buttonItem}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonGroup}
            onPress={deleteCodeTextHandler}>
            <ICBackspace />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  title: {
    fontSize: 20,
    fontFamily: fonts.primary[700],
    textAlign: 'center',
    color: colors.text.header,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: fonts.primary[400],
    textAlign: 'center',
    color: colors.text.header,
    paddingHorizontal: 18,
  },
  phoneNumber: {
    fontSize: 14,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
    color: colors.text.header,
    paddingHorizontal: 18,
  },
  numpadContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 18,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonGroup: {
    width: '33.3%',
    padding: 20,
    alignItems: 'center',
  },
  buttonItem: {
    fontSize: 20,
    fontFamily: fonts.primary[700],
    textAlign: 'center',
    color: colors.text.header,
  },
  countdownTimer: {
    fontFamily: fonts.primary[400],
    textAlign: 'center',
    color: colors.text.header,
    fontSize: 18,
  },
  codeVerificationGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeVerificationItem: {
    width: 30,
    borderBottomWidth: 1,
    borderBottomColor: colors.text.danger,
    marginHorizontal: 6,
    alignItems: 'center',
    paddingBottom: 8,
  },
  codeText: {
    fontFamily: fonts.primary[600],
    textAlign: 'center',
    color: colors.black,
    fontSize: 18,
  },
  errorText: {
    fontFamily: fonts.primary.normal,
    textAlign: 'center',
    color: colors.text.danger,
  }
});
