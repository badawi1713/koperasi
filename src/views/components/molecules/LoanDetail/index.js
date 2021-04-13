import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { Gap, TopNavbar } from '../..';
import { ICPayment, IMGNoLoan } from '../../../../assets';
import { getInstallmentPaymentData } from '../../../../store/actions';
import { colors, fonts } from '../../../../utils';

const LoanDetail = ({ showLoanDetailHandler, handleBackButtonClick }) => {

    const dispatch = useDispatch()

    const loanCoperationMemberReducer = useSelector(({ loanCoperationMemberReducer }) => loanCoperationMemberReducer);

    let installmentPaymentData = loanCoperationMemberReducer.installmentPaymentData;

    const { loading } = loanCoperationMemberReducer

    installmentPaymentData && installmentPaymentData.forEach(item => {
        item['isChecked'] = false
    })

    const [checkedPaymentData, setCheckedPaymentData] = useState(installmentPaymentData)
    const [paymentData, setPaymentData] = useState([]);
    const [totalPayment, setTotalPayment] = useState(0);

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

    const checkedPaymentHandler = (item) => {
        const existingData = paymentData.map(item => item.bayarId);
        if (!existingData.includes(item.bayarId)) {
            const newData = [...paymentData, item]
            const updateCheckedData = checkedPaymentData.map(data => data.bayarId === item.bayarId ? { ...data, isChecked: true } : data)
            const totalCost = newData.reduce((value, acc) => {
                return value + acc.nominalAngsuran;
            }, 0)
            newData.sort((a, b) => a.bayarId - b.bayarId);
            setTotalPayment(totalCost)
            setPaymentData(newData)
            setCheckedPaymentData(updateCheckedData)
        } else {
            const removeData = paymentData.filter(data => data.bayarId !== item.bayarId)
            const updateCheckedData = checkedPaymentData.map(data => data.bayarId === item.bayarId ? { ...data, isChecked: false } : data)
            const totalCost = removeData.reduce((value, acc) => {
                return value + acc.nominalAngsuran;
            }, 0)
            removeData.sort((a, b) => a.bayarId - b.bayarId);
            setTotalPayment(totalCost)
            setPaymentData(removeData)
            setCheckedPaymentData(updateCheckedData)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TopNavbar title='Tagihan Pinjaman' back linkBack={showLoanDetailHandler} />
            {loading ? <View style={styles.content}><ActivityIndicator color={colors.background.green1} size='large' /></View> :
                checkedPaymentData.length === 0 ?
                    (<View style={styles.content}><IMGNoLoan /><Gap height={20} /><Text style={styles.textTitle}>Tidak ada pinjaman yang aktif</Text></View>)
                    :
                    <>
                        <ScrollView showsVerticalScrollIndicator={false} style={styles.contentContainer}>
                            <Gap height={20} />
                            {checkedPaymentData.map((item, index) => (
                                <View key={index}>
                                    <TouchableOpacity onPress={() => { checkedPaymentHandler(item) }} style={styles.cardContainer(item.isChecked)}>
                                        <View style={styles.verticalLine} />
                                        <Gap width={20} />
                                        <ICPayment width={40} height={40} />
                                        <Gap width={15} />
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
                                    </TouchableOpacity>
                                    <Gap height={20} />
                                </View>
                            ))}

                        </ScrollView>
                        <View style={styles.paymentBar} >
                            <View>
                                <Text>Total Pembayaran</Text>
                                <Gap height={5} />
                                <Text>Rp {totalPayment}</Text>
                            </View>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.textButton}>Bayar</Text>
                            </TouchableOpacity>
                        </View>
                    </>

            }
        </SafeAreaView>
    )
}

export default LoanDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.grey5
    },
    content: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
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
    cardContainer: (isChecked) => ({
        flexDirection: 'row',
        borderRadius: 6,
        borderWidth: 0.6,
        borderColor: colors.border,
        padding: 18,
        alignItems: 'center',
        backgroundColor: isChecked ? colors.background.grey4 : colors.white
    })

})
