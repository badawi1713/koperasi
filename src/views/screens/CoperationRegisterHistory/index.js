import React, {useEffect} from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList, } from 'react-native';
import { ICFilter, ICSort } from '../../../assets';
import { colors, fonts } from '../../../utils';
import { Gap, TopNavbar, Link } from '../../components';
import { getCoperationRegistrationHistory} from '../../../store/actions';
import {useSelector, useDispatch} from 'react-redux';

const historyData = [
  { transactionName: "Transaksi #1", time: "12:03", date: "14 Mar 2021", transactionAmount: 12000 },
  { transactionName: "Transaksi #2", time: "11:03", date: "15 Mar 2021", transactionAmount: 21000 },
  { transactionName: "Transaksi #3", time: "14:23", date: "15 Mar 2021", transactionAmount: 50000 },
  { transactionName: "Transaksi #4", time: "22:30", date: "15 Mar 2021", transactionAmount: 1200000 },
  { transactionName: "Transaksi #5", time: "12:00", date: "16 Mar 2021", transactionAmount: 27000000 },
  { transactionName: "Transaksi #6", time: "14:10", date: "16 Mar 2021", transactionAmount: 51000 },
  { transactionName: "Transaksi #7", time: "09:00", date: "17 Mar 2021", transactionAmount: 101000 },
  { transactionName: "Transaksi #8", time: "19:10", date: "17 Mar 2021", transactionAmount: 200000 },
  { transactionName: "Transaksi #9", time: "20:23", date: "17 Mar 2021", transactionAmount: 250000 },
]

const HistoryCard = ({ item, navigation }) => {
  return (
      <>
      <View style={styles.transactionCard}>
        <Text style={styles.transactionName}>{item.bayarVia}</Text>
        <Text style={styles.transactionAmount}>{"QRISPAY" === item.bayarVia ? <Link align = "center" title="Scan QR" onPress={() => navigation.navigate('TransactionHistoryDetail')} /> : item.kodeBayar}</Text>
      </View>
      <View style={styles.transactionCard}>
        <Text style={styles.transactionName}>Nominal</Text>
        <Text style={styles.transactionAmount}>{item.totalBayar}</Text>
      </View>
      <View style={styles.transactionCard}>
        <Text style={styles.transactionName}>Bayar Sebelum </Text>
        <Text style={styles.transactionAmount}>{item.bayarSebelum}</Text>
      </View>
      <View style={styles.transactionCard}>
        <Text style={styles.transactionName}>Tanggal Bayar </Text>
        <Text style={styles.transactionAmount}>{item.tanggalBayar}</Text>
      </View>
      <View style={styles.transactionCard}>
        <Link align = "center" title="Cara Pembayaran" onPress={() => navigation.navigate('TransactionHistoryDetail')} />
      </View>
      </>
  )
}

const CoperationRegisterHistory = ({ navigation }) => {
  
  const stateCoperationRegistartePayment = useSelector(state => state.savingCoperationMemberReducer)
  const {paymentRegistration} = stateCoperationRegistartePayment;
  const dispatch = useDispatch();

  useEffect(() => {
    const getHistoryRegistration = () => {
        dispatch(getCoperationRegistrationHistory())
    }
    return getHistoryRegistration()
  }, [dispatch])

  const renderItem = ({ item }) => (
    <View>
      <View style={styles.transactionTime}>
        <Text style={styles.transactionTimeText}>{item.tanggalInquiry}</Text>
        <Text style={item.statusBayar === "Menunggu Pebayaran" ? styles.transactionTimeTextStatusBelum : styles.transactionTimeTextStatusSudah}>{item.statusBayar}</Text>
      </View>
      <HistoryCard item={item} navigation={navigation} />
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <TopNavbar back
        linkBack={() => navigation.goBack()}
        title="Riwayat Pembayaran Pendaftaran"
      />
      <FlatList
        data={paymentRegistration}
        renderItem={renderItem}
        keyExtractor={item => item.transactionName}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.bottomButtonGroup}>
        <TouchableOpacity style={styles.buttonGroup}>
          <ICSort /><Gap width={10} /><Text style={styles.buttonText}>Sort</Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity style={styles.buttonGroup}>
          <ICFilter /><Gap width={10} /><Text style={styles.buttonText}>Filter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CoperationRegisterHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  text: {
    fontSize: 16,
    color: colors.text.header,
    textAlign: 'center',
    fontFamily: fonts.primary[600],
  },
  contentContainer: {
    paddingHorizontal: 18,
    flex: 1,
  },
  content: {
    backgroundColor: 'white',
    flex: 1,
  },
  bottomButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
  },
  buttonGroup: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: fonts.primary[600],
    color: colors.text.secondary
  },
  horizontalLine: {
    width: 1,
    backgroundColor: colors.border,
    height: '70%'
  },
  transactionCard: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 3,
    borderBottomWidth: 0.4,
    borderBottomColor: colors.border
  },
  transactionName: {
    color: colors.text.secondary,
    fontFamily: fonts.primary[600],
    fontSize: 12
  },
  transactionAmount: {
    color: colors.text.primary,
    fontFamily: fonts.primary[700],
    fontSize: 12
  },
  transactionTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: colors.text.grey2,
    position: 'relative'
  },
  transactionTimeText: {
    color: colors.white,
    fontSize: 13,
    fontFamily: fonts.primary[600],
  },
  transactionTimeTextStatusBelum: {
    color: colors.white,
    fontSize: 12,
    fontFamily: fonts.primary[600],
    backgroundColor: '#FFA500',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 8
  },
  transactionTimeTextStatusSudah: {
    color: colors.white,
    fontSize: 12,
    fontFamily: fonts.primary[600],
    backgroundColor: colors.primary,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 8
  },
});
