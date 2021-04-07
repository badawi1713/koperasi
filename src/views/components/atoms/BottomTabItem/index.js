import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  ICEWalletActive,
  ICEWalletInActive,
  ICHistoryActive,
  ICHistoryInActive,
  ICHomeActive,
  ICHomeInActive,
  ICProfileActive,
  ICProfileInActive,
  ICScanner,
  ICStoreActive,
  ICStoreInActive,
} from '../../../../assets/icons';
import { colors, fonts } from '../../../../utils';
import { useDispatch } from 'react-redux'
import { getSaldoBalance } from '../../../../store/actions/home';


const BottomTabItem = ({ title, active, onPress, onLongPress, indexActive, navigation }) => {
  const dispatch = useDispatch()

  const Icon = () => {
    if (title === 'Home') {
      return active ? <ICHomeActive /> : <ICHomeInActive />;
    }

    if (title === 'Riwayat') {
      return active ? <ICHistoryActive /> : <ICHistoryInActive />;
    }

    if (title === 'E-Wallet') {
      return active ? <ICEWalletActive /> : <ICEWalletInActive />;
    }

    if (title === 'Toko') {
      return active ? <ICStoreActive /> : <ICStoreInActive />;
    }

    if (title === 'Akun') {
      return active ? <ICProfileActive /> : <ICProfileInActive />;
    }

    return <ICHomeInActive />;
  };

  if (indexActive === 0) {
    if (title === 'E-Wallet') {
      return (
        <View
          style={{
            position: 'relative',
            width: 75,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("QRCamera")}
            onLongPress={() => navigation.navigate("QRCamera")}
            style={styles.flotButtonContainer}
            activeOpacity={0.8}>
            <ICScanner wdith={24} height={24} />
            <Text style={styles.buttonText}>Scan QRIS</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => {
          if (title === 'Home') {
            onPress()
            dispatch(getSaldoBalance())
          } else { onPress() }
        }}
        onLongPress={() => {
          if (title === 'Home') {
            onLongPress()
            dispatch(getSaldoBalance())
          } else { onLongPress() }
        }
        }
        style={styles.container}>
        <Icon />
        <Text style={styles.text(active)}>{title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => {
        if (title === 'Home') {
          onPress()
          dispatch(getSaldoBalance())
        } else { onPress() }
      }}
      onLongPress={() => {
        if (title === 'Home') {
          onLongPress()
          dispatch(getSaldoBalance())
        } else { onLongPress() }
      }
      }
      style={styles.container}>
      <Icon />
      <Text style={styles.text(active)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default BottomTabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  flotButtonContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    position: 'absolute',
    top: -70,
    backgroundColor: colors.white,
  },
  buttonText: {
    color: colors.black,
    fontSize: 14,
    fontFamily: fonts.primary[400],
    marginTop: 4,
  },
  text: (active) => ({
    fontSize: 14,
    color: active ? colors.text.menuActive : colors.text.menuInactive,
    fontFamily: active ? fonts.primary[600] : fonts.primary.normal,
    marginTop: 4,
  }),
});
