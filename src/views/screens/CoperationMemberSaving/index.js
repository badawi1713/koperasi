import React, { useEffect } from 'react'
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ContentLoader from "react-native-easy-content-loader"
import NumberFormat from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { ICSavings, ICTotalBudget } from '../../../assets'
import { changeMisc, getSavingCoperationMemberData } from '../../../store/actions'
import { colors, fonts } from '../../../utils'
import { Button, Gap, SavingDetail, SavingTransfer, TopNavbar } from '../../components'

const CoperationMemberSaving = ({ navigation }) => {
    const dispatch = useDispatch()
    const profileReducer = useSelector(state => state.profileReducer)
    const miscReducer = useSelector(state => state.miscReducer)
    const savingCoperationMemberReducer = useSelector(state => state.savingCoperationMemberReducer)
    const { totalSimpanan, loading } = savingCoperationMemberReducer;
    const { transactionHistory } = profileReducer
    const { showSavingDetail, showSavingTransfer } = miscReducer

    const handleBackButtonClick = () => {
        dispatch(changeMisc({
            showSavingDetail: false,
            showSavingTransfer: false
        }))
        return true;
    }

    useEffect(() => {
        const getSavingData = () => {
            dispatch(getSavingCoperationMemberData())
        }

        return getSavingData()
    }, [dispatch])

    const showSavingDetailHandler = () => {
        dispatch(changeMisc({
            showSavingDetail: !showSavingDetail,
            showSavingTransfer: false
        }))
    }

    const showSavingTransferHandler = () => {
        dispatch(changeMisc({
            showSavingDetail: false,
            showSavingTransfer: !showSavingTransfer
        }))
    }

    if (showSavingDetail) { return <SavingDetail handleBackButtonClick={handleBackButtonClick} showSavingDetailHandler={showSavingDetailHandler} /> } else if (showSavingTransfer) {
        return <SavingTransfer handleBackButtonClick={handleBackButtonClick} showSavingTransferHandler={showSavingTransferHandler} />
    }
    else {
        return (
            <SafeAreaView style={styles.container}>
                <TopNavbar title='Simpanan' back linkBack={() => navigation.goBack()} />
                <Gap height={20} />
                <View>
                    <View style={styles.section}>
                        <View style={styles.row}>
                            <ICTotalBudget width={40} height={40} />
                            <Gap width={10} />
                            <View>
                                <Text style={styles.textTitle}>Total Simpanan</Text>
                                {loading ?
                                    <ContentLoader paragrah pHeight={12} pRows={1} active title={false} />
                                    :
                                    <NumberFormat value={totalSimpanan || 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} renderText={value =>
                                        <Text style={styles.textTitle}>Rp {value}</Text>

                                    } />
                                }
                                <Gap height={5} />
                                <TouchableOpacity onPress={showSavingDetailHandler}><Text style={styles.textButton}>Detail Simpanan</Text></TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.buttonGroup}>
                            <Button onPress={showSavingTransferHandler} title='Setor' variant='primary' />
                        </View>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.text}>Riwayat Simpanan</Text>
                    </View>

                    {
                        loading ?
                            <ActivityIndicator color={colors.background.green1} size='large' /> :
                            transactionHistory.length === 0 ?
                                <>
                                    <Gap height={30} />
                                    <Text style={[styles.textTitle, { textAlign: 'center' }]}>Tidak Ada Riwayat Simpanan</Text>
                                </> :
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    {transactionHistory.map((item, index) => (
                                        <View key={index}>
                                            <View style={styles.section}>
                                                <View style={styles.row}>
                                                    <ICSavings width={28} height={28} />
                                                    <Gap width={10} />
                                                    <View>
                                                        <Text style={styles.text}>{item.historyTitle || "Setoran"}</Text>
                                                        <Gap height={5} />
                                                        <NumberFormat value={item.historyNominal || 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} renderText={value =>
                                                            <Text style={styles.text}>Rp {value}</Text>

                                                        } />
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

export default CoperationMemberSaving

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
