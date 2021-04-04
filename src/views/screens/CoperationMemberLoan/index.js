import React, { useEffect } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import NumberFormat from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { ICLoan, ICSavings } from '../../../assets'
import { changeMisc, getSavingCoperationMemberData } from '../../../store/actions'
import { colors, fonts } from '../../../utils'
import { Button, Gap, SavingDetail, LoanTransfer, TopNavbar } from '../../components'

const CoperationMemberLoan = ({ navigation }) => {
    const dispatch = useDispatch()
    const profileReducer = useSelector(state => state.profileReducer)
    const miscReducer = useSelector(state => state.miscReducer)
    const savingCoperationMemberReducer = useSelector(state => state.savingCoperationMemberReducer)
    const { totalSimpanan } = savingCoperationMemberReducer;
    const { transactionHistory } = profileReducer
    const { showLoanDetail, showLoanTransfer } = miscReducer

    const handleBackButtonClick = () => {
        dispatch(changeMisc({
            showLoanDetail: false,
            showLoanTransfer: false
        }))
        return true;
    }

    useEffect(() => {
        const getSavingData = () => {
            dispatch(getSavingCoperationMemberData())
        }

        return getSavingData()
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
                                <NumberFormat value={totalSimpanan || 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} renderText={value =>
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

                    {transactionHistory.length !== 0 ?
                        <>
                            <Gap height={30} />
                            <Text style={[styles.textTitle, { textAlign: 'center' }]}>Tidak Ada Riwayat Pinjaman</Text>
                        </> :
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {transactionHistory.map((item, index) => (
                                <View key={index}>
                                    <View style={styles.section}>
                                        <View style={styles.row}>
                                            <ICSavings width={28} height={28} />
                                            <Gap width={10} />
                                            <View>
                                                <Text style={styles.text}>Setoran Simpanan Pokok</Text>
                                                <Gap height={5} />
                                                <Text style={styles.text}>
                                                    Rp {item.historyNominal}
                                                </Text>
                                            </View>
                                        </View>
                                        <Text style={styles.textStatus(item.historyStatus)}>
                                            {item.historyStatus}
                                        </Text>
                                    </View>
                                    <Gap height={10} />
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
        alignItems: 'center'
    },
    buttonGroup: {
        width: 90
    },
    text: {
        fontSize: 14,
        color: colors.black,
        fontFamily: fonts.primary[600],
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
