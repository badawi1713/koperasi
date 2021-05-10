import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ICDownload, ICScreenshoot, ICShare } from '../../../assets'
import { colors, fonts } from '../../../utils'
import { Gap, TopNavbar } from '../../components'

const TransactionHistoryDetail = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <TopNavbar title='Detail Transaksi' back linkBack={() => navigation.goBack()} />
            <View style={styles.mainContainer}>
                <View style={styles.headerBackground} />
                <View style={styles.cardContainer}>
                    <ScrollView>
                        <Text style={{ textAlign: 'center', fontFamily: fonts.primary[600] }}>Pembelian Pulsa Elektronik</Text>
                        <Gap height={10} />
                        <View style={styles.shortLine} />
                        <Gap height={20} />
                        <View style={styles.row}>
                            <Text style={styles.labelText}>Nomor Transaksi</Text>
                            <Text style={styles.valueText}>2010201011</Text>
                        </View>
                        <Gap height={10} />
                        <View style={styles.row}>
                            <Text style={styles.labelText}>Tanggal</Text>
                            <Text style={styles.valueText}>07 Mei 2021, 17:58</Text>
                        </View>
                        <Gap height={10} />
                        <View style={styles.row}>
                            <Text style={styles.labelText}>Nomor Resi</Text>
                            <Text style={styles.valueText}>20210011</Text>
                        </View>
                        <Gap height={10} />
                        <View style={styles.row}>
                            <Text style={styles.labelText}>Jenis Pulsa</Text>
                            <Text style={styles.valueText}>Telkomsel</Text>
                        </View>
                        <Gap height={10} />
                        <View style={styles.row}>
                            <Text style={styles.labelText}>Nomor Ponsel</Text>
                            <Text style={styles.valueText}>082136526483</Text>
                        </View>
                        <Gap height={10} />
                        <View style={styles.row}>
                            <Text style={styles.labelText}>Harga</Text>
                            <Text style={styles.valueText}>Rp20.000</Text>
                        </View>
                        <Gap height={10} />
                        <View style={styles.row}>
                            <Text style={styles.labelText}>Admin</Text>
                            <Text style={styles.valueText}>Rp1.500</Text>
                        </View>
                        <Gap height={10} />
                        <View style={styles.row}>
                            <Text style={styles.labelText}>Total harga</Text>
                            <Text style={styles.totalText}>Rp21.500</Text>
                        </View>

                    </ScrollView>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <TouchableOpacity><ICShare /></TouchableOpacity>
                        <TouchableOpacity><ICDownload /></TouchableOpacity>
                        <TouchableOpacity><ICScreenshoot /></TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default TransactionHistoryDetail

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    headerBackground: {
        backgroundColor: colors.background.green1, minHeight: '20%'
    },
    cardContainer:
    {
        backgroundColor: colors.white,
        marginHorizontal: 18,
        height: '86%',
        position: 'relative', zIndex: 2, top: "-15%", elevation: 1,
        borderRadius: 6, padding: 20,
        justifyContent: 'space-between'
    },
    shortLine: {
        borderBottomWidth: 4,
        borderBottomColor: colors.border,
        borderRadius: 6,
        width: "14%",
        alignSelf: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    labelText: {
        fontFamily: fonts.primary[400],
        color: colors.text.grey1,
        fontSize: 13
    },
    valueText: {
        fontFamily: fonts.primary[400],
        color: colors.text.dark1,
        fontSize: 13
    },
    totalText: {
        fontFamily: fonts.primary[600],
        color: colors.text.green1
    }

})
