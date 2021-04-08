import React, { useEffect } from 'react';
import { BackHandler, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { Gap, TopNavbar } from '../..';
import { ICPayment } from '../../../../assets';
import { getInstallmentPaymentData } from '../../../../store/actions';
import { colors, fonts } from '../../../../utils';
import moment from 'moment'

const LoanDetail = ({ showLoanDetailHandler, handleBackButtonClick }) => {

    const dispatch = useDispatch()

    const loanCoperationMemberReducer = useSelector(({ loanCoperationMemberReducer }) => loanCoperationMemberReducer);

    const { installmentPaymentData } = loanCoperationMemberReducer;

    console.log(installmentPaymentData)

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    useEffect(() => {
        const getInstallmentPayment = () => {
            dispatch(getInstallmentPaymentData())
        }
        return getInstallmentPayment();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <TopNavbar title='Tagihan Pinjaman' back linkBack={showLoanDetailHandler} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.contentContainer}>
                <Gap height={20} />
                {installmentPaymentData && installmentPaymentData.map((item, index) => (
                    <View key={index}>
                        <View style={styles.cardContainer}>
                            <View style={styles.verticalLine} />
                            <Gap width={20} />
                            <ICPayment width={40} height={40} />
                            <Gap width={30} />
                            <View>
                                <Text>Jatuh Tempo</Text>
                                <Gap height={20} />
                                <Text>Angsuran Bulan</Text>
                                <Gap height={5} />
                                <Text>Nominal</Text>
                                <Gap height={5} />
                                <Text>Denda</Text>
                                <Gap height={5} />
                                <Text>Status</Text>
                            </View>
                            <Gap width={20} />
                            <View>
                                <Text>{moment(item.tanggalTenor).format("DD-MM-YYYY")}</Text>
                                <Gap height={20} />
                                <Text>{item.angsuranKe}</Text>
                                <Gap height={5} />
                                <NumberFormat value={item.nominalAngsuran || 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} renderText={value =>
                                    <Text >Rp {value}</Text>
                                } />
                                <Gap height={5} />
                                <NumberFormat value={item.denda || 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} renderText={value =>
                                    <Text >Rp {value}</Text>
                                } />
                                <Gap height={5} />
                                <Text>{item.status}</Text>
                            </View>
                        </View>
                        <Gap height={20} />
                    </View>
                ))}

            </ScrollView>
            <View style={styles.paymentBar} >
                <View>
                    <Text>Total Pembayaran</Text>
                    <Gap height={5} />
                    <Text>Rp 0</Text>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.textButton}>Bayar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default LoanDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.grey5
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: 18,
        justifyContent: 'space-between'
    },
    horizontalLine: {
        width: '100%',
        borderWidth: 0.2,
        borderColor: colors.border
    },
    contentContainer: {
        paddingHorizontal: 18
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    text: {
        fontSize: 14,
        color: colors.black,
        fontFamily: fonts.primary[600],
    },

    textTitle: {
        fontSize: 16,
        color: colors.text.header,
        fontFamily: fonts.primary[600],
    },
    paymentBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        borderTopWidth: 0.6,
        borderTopColor: colors.border,
        padding: 18,
    },

    button: {
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: colors.background.green1,
        fontFamily: fonts.primary[400],
        borderRadius: 6
    },
    textButton: {
        fontSize: 16,
        color: colors.white,
        fontFamily: fonts.primary[600],
    },
    verticalLine: {
        width: 4,
        backgroundColor: colors.background.green1,
        height: '100%'
    },
    cardContainer: {
        flexDirection: 'row',
        borderRadius: 6,
        borderWidth: 0.6,
        borderColor: colors.border,
        padding: 18,
        alignItems: 'center'
    }

})
