import React, { useEffect } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import NumberFormat from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { ICLoan, ICDebt } from '../../../assets'
import { changeMisc, getLoanCoperationMemberData } from '../../../store/actions'
import { colors, fonts } from '../../../utils'
import { Button, Gap, SavingDetail, LoanTransfer, TopNavbar } from '../../components'

const CoperationMemberLoan = ({ navigation }) => {
    const dispatch = useDispatch()
    const miscReducer = useSelector(state => state.miscReducer)
    const loanCoperationMemberReducer = useSelector(state => state.loanCoperationMemberReducer)
    const { data, loanHistory } = loanCoperationMemberReducer;
    const { showLoanDetail, showLoanTransfer } = miscReducer

    const handleBackButtonClick = () => {
        dispatch(changeMisc({
            showLoanDetail: false,
            showLoanTransfer: false
        }))
        return true;
    }

    useEffect(() => {
        const getLoanData = () => {
            dispatch(getLoanCoperationMemberData())
        }

        return getLoanData()
    }, [dispatch])

    const showLoanDetailHandler = () => {
        dispatch(changeMisc({
            showLoanDetail: !showLoanDetail,
            showLoanTransfer: false
        }))
    }

    const showLoanTransferHandler = () => {
        dispatch(changeMisc({
            showLoanDetail: false,
            showLoanTransfer: !showLoanTransfer
        }))
    }

    if (showLoanDetail) { return <SavingDetail handleBackButtonClick={handleBackButtonClick} showLoanDetailHandler={showLoanDetailHandler} /> } else if (showLoanTransfer) {
        return <LoanTransfer handleBackButtonClick={handleBackButtonClick} showLoanTransferHandler={showLoanTransferHandler} />
    }
    else {
        return (
            <SafeAreaView style={styles.container}>
                <TopNavbar title='Pinjaman' back linkBack={() => navigation.goBack()} />
                <Gap height={20} />
                <View>
                    <View style={styles.section}>
                        <View style={styles.row}>
                            <ICLoan width={40} height={40} />
                            <Gap width={10} />
                            <View>
                                <Text style={styles.textTitle}>Total Pinjaman</Text>
                                <NumberFormat value={data && data.jumlahTenor || 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} renderText={value =>
                                    <Text style={styles.textTitle}>Rp {value}</Text>

                                } />
                                <Gap height={5} />
                                <TouchableOpacity ><Text style={styles.textButton}>Detail Pinjaman</Text></TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.buttonGroup}>
                            <Button onPress={showLoanTransferHandler} title='Pinjam' variant='primary' />
                        </View>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.text}>Riwayat Pinjaman</Text>
                    </View>

                    {loanHistory.length === 0 ?
                        <>
                            <Gap height={30} />
                            <Text style={[styles.textTitle, { textAlign: 'center' }]}>Tidak Ada Riwayat Pinjaman</Text>
                        </> :
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {loanHistory.map((item, index) => (
                                <View key={index}>
                                    <View style={styles.section}>
                                        <View style={styles.row}>
                                            <ICDebt width={28} height={28} />
                                            <Gap width={10} />
                                            <View style={{ flex: 1, }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                                                    <Text style={styles.text}>Jumlah Pokok Pinjaman</Text>
                                                    <NumberFormat value={item.jumlahPokokPinjam || 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} renderText={value =>
                                                        <Text>Rp {value}</Text>
                                                    } />

                                                </View>
                                                <Gap height={5} />
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                                                    <Text style={styles.text}>Sisa Pokok Pinjaman</Text>
                                                    <NumberFormat value={item.sisaPokokPinjam || 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} renderText={value =>
                                                        <Text>Rp {value}</Text>
                                                    } />

                                                </View>
                                                <Gap height={5} />
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                                                    <Text style={styles.text}>Jatuh Tempo</Text>
                                                    <Text>12-05-2021</Text>

                                                </View>
                                                <Gap height={10} />
                                                <Text style={styles.status}>{item.status}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                            ))}

                            <Gap height={20} />


                        </ScrollView>

                    }

                </View>
            </SafeAreaView>
        )
    }
}

export default CoperationMemberLoan

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
    content: {
        width: '100%',
        padding: 18,
    },
    row: {
        flexDirection: 'row',
    },
    buttonGroup: {
        width: 90
    },
    text: {
        fontSize: 14,
        color: colors.black,
        fontFamily: fonts.primary[600],
    },
    status: {
        fontSize: 14,
        color: colors.black,
        fontFamily: fonts.primary.normal,
        textAlign: 'right'
    },
    textStatus: (status) => ({
        fontSize: 14,
        color: status === "Berhasil" ? colors.text.green1 : colors.text.danger,
        fontFamily: fonts.primary[600],
    }),
    textTitle: {
        fontSize: 16,
        color: colors.text.header,
        fontFamily: fonts.primary[600],
    },
    textSubtitle: {
        fontSize: 14,
        color: colors.text.dark1,
        fontFamily: fonts.primary[600],
        textAlign: 'center'
    },
    textButton: {
        fontSize: 14,
        color: colors.text.green1,
        fontFamily: fonts.primary[600],
    }
})
