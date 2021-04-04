import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList, } from 'react-native';
import { ICFilter, ICSort } from '../../../assets';
import { colors, fonts } from '../../../utils';
import { Gap, TopNavbar } from '../../components';

const historyData = [
  { transactionName: "Transaksi #1", time: "12:03", date: "14 Mar 2021" },
  { transactionName: "Transaksi #2", time: "11:03", date: "15 Mar 2021" },
  { transactionName: "Transaksi #3", time: "14:23", date: "15 Mar 2021" },
  { transactionName: "Transaksi #4", time: "22:30", date: "15 Mar 2021" },
  { transactionName: "Transaksi #5", time: "12:00", date: "16 Mar 2021" },
  { transactionName: "Transaksi #6", time: "14:10", date: "16 Mar 2021" },
  { transactionName: "Transaksi #7", time: "09:00", date: "17 Mar 2021" },
  { transactionName: "Transaksi #8", time: "19:10", date: "17 Mar 2021" },
  { transactionName: "Transaksi #9", time: "20:23", date: "17 Mar 2021" },
]

const HistoryCard = ({ item }) => {

  return (
    <TouchableOpacity style={styles.transactionCard}>
      <Text style={styles.transactionName}>{item.transactionName}</Text>
      <Text style={styles.transactionAmount}>-Rp 20.000</Text>
    </TouchableOpacity>
  )
}

const History = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View>
      <View style={styles.transactionTime}>
        <Text style={styles.transactionTimeText}>{item.date} • {item.time}</Text>
      </View>
      <HistoryCard item={item} />
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <TopNavbar back
        linkBack={() => navigation.goBack()}
        title="Riwayat Transaksi"
      />
      <FlatList
        data={historyData}
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

export default History;

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
    padding: 16,
    borderBottomWidth: 0.4,
    borderBottomColor: colors.border
  },
  transactionName: {
    color: colors.text.secondary,
    fontFamily: fonts.primary[600],
    fontSize: 16
  },
  transactionAmount: {
    color: colors.text.primary,
    fontFamily: fonts.primary[700],
    fontSize: 14
  },
  transactionTime: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: colors.button.primary.background,
    position: 'relative'
  },
  transactionTimeText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: fonts.primary[600],
  }
});
