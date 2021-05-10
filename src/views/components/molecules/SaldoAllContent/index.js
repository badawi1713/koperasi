import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Divider } from 'react-native-paper'
import NumberFormat from 'react-number-format';
import { colors, fonts } from '../../../../utils';
import moment from 'moment'
import { IMGNoData } from '../../../../assets';
import { Gap } from '../../atoms';

const SaldoAllContent = ({ content }) => {
    return (
        <View>
            {content.length === 0 ? <View style={{ alignItems: 'center', justifyContent: 'center' }}><IMGNoData width={120} height={130} />
                <Gap height={10} />
                <Text style={styles.text}>Data Transaksi Tidak Ditemukan</Text>
            </View> : <ScrollView >
                {content.map((item, index) => (
                    <View key={index}>
                        <View style={styles.groupItem}>
                            <View>
                                <Text style={styles.text}>{item.kreditName}</Text>
                                <Text style={styles.transactionText}>{item.jenisTransaksi}</Text>
                                <Text style={styles.dateText}>{moment(item.tanggal).format('DD/MM/YYYY h:mm:ss')}</Text>
                            </View>
                            <View>
                                <NumberFormat value={item.nominal || 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} renderText={value =>
                                    <Text style={styles.text} >{item.type === 'kredit' ? '+' : '-'}Rp{value}</Text>
                                } />
                            </View>
                        </View>
                        <View style={styles.horizontalLine} />
                    </View>
                ))}
            </ScrollView>}
        </View>
    )
}

export default SaldoAllContent

const styles = StyleSheet.create({
    groupItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 18,
        marginVertical: 14
    },
    text: {
        color: colors.text.primary,
        fontFamily: fonts.primary[400],
        fontSize: 12

    },
    transactionText: {
        color: colors.text.green1,
        fontFamily: fonts.primary[600],
        fontSize: 14
    },
    dateText: {
        color: colors.text.grey2,
        fontFamily: fonts.primary[400],
        fontSize: 12
    },
    horizontalLine: {
        borderBottomColor: colors.border,
        borderBottomWidth: 0.6
    }
})
