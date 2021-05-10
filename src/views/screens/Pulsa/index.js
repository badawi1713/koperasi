import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler, Dimensions, ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { ScrollView as Scroll } from 'react-native-gesture-handler';
import RBSheet from "react-native-raw-bottom-sheet";
import TextInputMask from 'react-native-text-input-mask';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { ICPhone, ICProtection, ICTime } from '../../../assets';
import { changePulsa, getInitialPulsaDataList, getPulsaDataList, postPulsaPayment } from '../../../store/actions';
import { getSaldoBalance } from '../../../store/actions/home';
import { colors, fonts } from '../../../utils';
import { Button, Gap, Link, PhoneDataContent, PulsaContent, SuccessModal, TopNavbar } from '../../components';

const screenHeight = Math.round(Dimensions.get('window').height);

const Pulsa = ({ navigation }) => {
  const dispatch = useDispatch()
  const [pulsaActive, setPulsaActive] = useState(true);
  const [paketDataActive, setPaketDataActive] = useState(false);

  const pulsaReducer = useSelector(state => state.pulsaReducer)
  const profileReducer = useSelector(state => state.profileReducer);

  const { userProfile: { noTelp } } = profileReducer

  const { loading, nomorTelepon, daftarPulsa, daftarKuota, detailLoading, detailPulsa, showSuccessModal, paymentLoading } = pulsaReducer
  const {
    pelId, productName, productPrice
  } = detailPulsa

  const handleBackButtonClick = () => {
    dispatch(changePulsa({ nomorTelepon: "" }))
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);

  useEffect(() => {

    const getInitialPulsaData = () => {
      dispatch(getInitialPulsaDataList())
      dispatch(changePulsa({ nomorTelepon: noTelp[0] === "0" ? noTelp.substring(1) : noTelp }))
    }

    return getInitialPulsaData()
  }, [dispatch])

  useEffect(() => {
    const getPulsaData = () => {
      dispatch(getPulsaDataList())
    }

    if (nomorTelepon.length === 3) {
      return getPulsaData()
    }
    else {
      return;
    }


  }, [dispatch, nomorTelepon])

  const pulsaTabHandler = () => {
    setPulsaActive(true);
    setPaketDataActive(false);
  };

  const paketDataTabHandler = () => {
    setPaketDataActive(true);
    setPulsaActive(false);
  };

  const PulsaBottomDrawer = () => (
    <View style={{ paddingHorizontal: 18, flex: 1 }}>
      <Gap height={20} />
      <Scroll showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View>
            <Text style={styles.drawerTitle}>Detail Penerima</Text>
            <Gap height={10} />
            <View>
              <Text style={styles.drawerSubtitle}>Nomor Telepon</Text>
              <Gap height={5} />
              <Text style={styles.drawerText}>{pelId}</Text>
            </View>
          </View>
          <Gap height={30} />
          <View>
            <Text style={styles.drawerTitle}>Detail Pembelian</Text>
            <Gap height={10} />
            <View>
              <Text style={styles.drawerSubtitle}>{productName}</Text>
            </View>
          </View>
          <Gap height={30} />
          <View style={styles.paymentContent}>
            <View>
              <Text style={styles.drawerTitle}>Detail Pembayaran</Text>
              <Gap height={10} />
              <View style={styles.totalGroup}>
                <Text style={styles.totalText}>Total</Text>
                <Gap height={5} />
                <NumberFormat value={productPrice || 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} renderText={value =>
                  <Text style={styles.totalText}>Rp {value}</Text>
                } />
              </View>
            </View>
            <Gap height={160} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ICProtection />
              <Gap width={10} />
              <Text style={styles.protectionText}>Semua transaksi pelanggan dijamin aman dan cepat, dengan melanjutkan pembayaran, anda setuju pada{" "}
                <Link variant='text' title='Persyaratan dan Kondisi' />
              </Text>
            </View>
          </View>
          <Gap height={20} />
          <Button variant='primary' disabled={paymentLoading} fullWidth title='Bayar' onPress={async () => {
            await pulsaConfirmationRef.current.close()
            await dispatch(postPulsaPayment())
            await dispatch(getSaldoBalance())

          }} />
          <Gap height={20} />
        </View>
      </Scroll>
    </View>
  );

  const DataBottomDrawer = () => (
    <View style={{ paddingHorizontal: 18, flex: 1 }}>
      <Gap height={40} />
      <Scroll showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View>
            <Text style={styles.drawerTitle}>Detail Penerima</Text>
            <Gap height={10} />
            <View>
              <Text style={styles.drawerSubtitle}>Nomor Telepon</Text>
              <Gap height={5} />
              <Text style={styles.drawerText}>{nomorTelepon || noTelp[0] === "0" ? noTelp.substring(1) : noTelp}</Text>
            </View>
          </View>
          <Gap height={30} />
          <View>
            <Text style={styles.drawerTitle}>Detail Pembelian</Text>
            <Gap height={10} />
            <View>
              <Text style={styles.drawerSubtitle}>Data 12 GB</Text>
              <Gap height={5} />
              <Text style={styles.drawerText}>12 GB Kuota Utama pada Seluruh Jaringan dan Semua Zona + 2 GB Videomax</Text>
              <Gap height={5} />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ICTime />
                <Gap width={10} />
                <Text style={styles.drawerText}>Masa Aktif 30 Hari</Text>
              </View>
            </View>
          </View>
          <Gap height={30} />
          <View style={styles.paymentContent}>
            <View>
              <Text style={styles.drawerTitle}>Detail Pembayaran</Text>
              <Gap height={10} />
              <View style={styles.totalGroup}>
                <Text style={styles.totalText}>Total</Text>
                <Gap height={5} />
                <Text style={styles.totalText}>Rp 16.500</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ICProtection />
              <Gap width={10} />
              <Text style={styles.protectionText}>Semua transaksi pelanggan dijamin aman dan cepat, dengan melanjutkan pembayaran, anda setuju pada{" "}
                <Link variant='text' onPress={() => console.log('press')} title='Persyaratan dan Kondisi' />
              </Text>
            </View>
          </View>
          <Gap height={20} />
          <Button variant='primary' fullWidth title='Bayar' />
          <Gap height={20} />
        </View>
      </Scroll>
    </View>
  );

  const pulsaConfirmationRef = React.useRef(null);
  const dataConfirmationRef = React.useRef(null);

  const pulsaConfirmation = () => {
    pulsaConfirmationRef.current.open()

  }

  const dataConfirmation = () => {
    dataConfirmationRef.current.open()
  }

  return (
    <>
      {showSuccessModal && <SuccessModal showModal={showSuccessModal} title="Transaksi Pembayaran Berhasil" loading={paymentLoading} />}

      <View style={styles.container}>
        <TopNavbar title="Pulsa" back linkBack={() => {
          navigation.goBack()
          handleBackButtonClick()
        }
        } />

        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={20} />

          <View style={styles.phoneInputContent}>
            <View style={styles.phoneNumberGroup}>
              <ICPhone width={24} height={24} />
              <Gap width={15} />
              <View style={styles.phoneNumberField}>
                <Text style={styles.text}>Nomor Telepon</Text>

                <TextInputMask
                  onChangeText={(formatted, extracted) => {
                    dispatch(
                      changePulsa({ nomorTelepon: extracted })
                    )
                  }}
                  placeholderTextColor={colors.text.grey1}
                  defaultValue={noTelp[0] === "0" ? noTelp.substring(1) : noTelp}
                  mask={"+62 [000] [0000] [00000]"}
                  placeholder="contoh: +62 812 3456 7890"
                  keyboardType="phone-pad"
                  style={styles.phoneNumberInput}
                />
              </View>
            </View>
          </View>
          <Gap height={20} />

          <View style={styles.tabContent}>
            <TouchableOpacity
              onPress={pulsaTabHandler}
              style={styles.pulsaTabButton(pulsaActive)}>
              <Text style={styles.pulsaTabTitle(pulsaActive)}>Pulsa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={paketDataTabHandler}
              style={styles.paketDataTabButton(paketDataActive)}>
              <Text style={styles.paketDataTabTitle(paketDataActive)}>
                Paket Data
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.mainContent}>
            <Gap height={20} />
            {/* Pulsa Content */}

            {loading ?
              <ActivityIndicator size='large' color={colors.background.green1} /> :
              pulsaActive ? <PulsaContent loading={detailLoading} phoneNumber={nomorTelepon} content={daftarPulsa} pulsaConfirmation={pulsaConfirmation} /> :
                <PhoneDataContent loading={detailLoading} phoneNumber={nomorTelepon} content={daftarKuota} dataConfirmation={dataConfirmation} />
            }

            {/* Paket Data Content */}
          </View>
        </ScrollView>

        <RBSheet
          height={screenHeight - 80}
          ref={pulsaConfirmationRef}
          openDuration={600}
          closeDuration={500}
          closeOnDragDown={true}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0,0,0,0.6)"
            },
            container: {
              borderTopStartRadius: 10,
              borderTopEndRadius: 10
            },
            draggableIcon: {
              backgroundColor: colors.border,
              borderRadius: 12,
              height: 4,
            }
          }}
        >
          <PulsaBottomDrawer />
        </RBSheet>

        <RBSheet
          height={screenHeight - 80}
          ref={dataConfirmationRef}
          openDuration={600}
          closeDuration={500}
          closeOnDragDown={true}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0,0,0,0.6)"
            },
            container: {
              borderTopStartRadius: 10,
              borderTopEndRadius: 10
            },
            draggableIcon: {
              backgroundColor: colors.border,
              borderRadius: 12,
              height: 4,
            }
          }}
        >
          <DataBottomDrawer />

        </RBSheet>



      </View>


    </>
  );
};

export default Pulsa;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  phoneInputContent: {
    paddingHorizontal: 18,
  },
  phoneNumberGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
  },
  phoneNumberField: {
    flex: 1,
  },
  phoneNumberInput: {
    padding: 0,
    fontSize: 14,
    fontFamily: fonts.primary[600],
    color: colors.text.dark1
  },
  text: {
    color: colors.text.header,
    fontSize: 14,
  },
  tabContent: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: 18,
  },
  pulsaTabButton: (active) => ({
    borderBottomWidth: active ? 2 : 0,
    borderBottomColor: colors.primary,
    paddingHorizontal: 14,
    paddingBottom: 14,
    alignItems: 'center',
  }),
  pulsaTabTitle: (active) => ({
    textAlign: 'center',
    fontSize: 16,
    fontFamily: fonts.primary[700],
    color: active ? colors.black : colors.text.header,
  }),
  paketDataTabButton: (active) => ({
    borderBottomWidth: active ? 2 : 0,
    borderBottomColor: colors.primary,
    paddingHorizontal: 14,
    paddingBottom: 14,
    alignItems: 'center',
  }),
  paketDataTabTitle: (active) => ({
    textAlign: 'center',
    fontSize: 16,
    fontFamily: fonts.primary[700],
    color: active ? colors.black : colors.text.header,
  }),
  mainContent: {
    flex: 1,
  },
  drawerContainer: {

    backgroundColor: colors.white,
    paddingHorizontal: 18,
    paddingTop: 18,
    height: "100%",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 1,
  },
  drawerLine: {
    width: 40,
    borderBottomWidth: 3,
    borderBottomColor: colors.border,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    alignSelf: 'center'
  },
  confirmationContent: {
    flex: 1
  },
  drawerTitle: {
    color: colors.primary,
    fontSize: 16,
    fontFamily: fonts.primary[700]
  },
  drawerSubtitle: {
    color: colors.black,
    fontSize: 14,
    fontFamily: fonts.primary[600]
  },
  drawerText: {
    color: colors.text.header,
    fontSize: 14,
    fontFamily: fonts.primary[400],
    flexDirection: 'row',
    flexShrink: 1
  },
  totalGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  totalText: {
    color: colors.text.header,
    fontSize: 16,
    fontFamily: fonts.primary[400]
  },
  paymentContent: {
    justifyContent: 'space-between',
    flex: 1,
    minHeight: 170,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  protectionText: {
    color: colors.text.header,
    fontSize: 14,
    fontFamily: fonts.primary[400],
    flexDirection: 'row',
    flexShrink: 1
  }


});
