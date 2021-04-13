import React, { useEffect, useState } from 'react'
import { BackHandler, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import SelectPicker from 'react-native-form-select-picker'
import { useDispatch, useSelector } from 'react-redux'
import { Gap, TopNavbar } from '../..'
import { changeLoanCoperationMember, postLoanCalculateTransfer, postLoanSaveTransfer } from '../../../../store/actions'
import { colors, fonts } from '../../../../utils'
import { Button } from '../../atoms'

const options = [{ "label": "1 Bulan", value: 1 }, { "label": "3 Bulan", value: 3 }, { "label": "6 Bulan", value: 6 }, { "label": "12 Bulan", value: 12 }, { "label": "24 Bulan", value: 24 }];

const LoanTransfer = ({ showLoanTransferHandler, handleBackButtonClick }) => {
    const dispatch = useDispatch()

    const [minLoanError, setMinLoanError] = useState(false)
    const [maxLoanError, setMaxLoanError] = useState(false)
    const [minMonthError, setMinMonthError] = useState(false)

    const loanCoperationMemberReducer = useSelector(state => state.loanCoperationMemberReducer)

    const { loanAmount, month } = loanCoperationMemberReducer

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    const loanTransferCondition = loanAmount >= 0 && loanAmount < 1000000 || month === 0

    const loanSubmitHandler = async () => {
        await dispatch(postLoanCalculateTransfer())

        Alert.alert(
            "Konfirmasi Pinjaman",
            `Konfirmasi peminjaman dana sebesar Rp ${loanAmount} dengan angsuran ${month} bulan?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => dispatch(postLoanSaveTransfer()) }
            ]
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <TopNavbar title='Pinjam Dana' back linkBack={showLoanTransferHandler} />
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Gap height={20} />
                    <View style={styles.content}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nominal Pinjaman</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    onChangeText={async (e) => {
                                        dispatch(changeLoanCoperationMember({ loanAmount: e }))
                                        if (e >= 0 && e < 1000000) {
                                            setMinLoanError(true)
                                        } else if (e >= 10000000) {
                                            setMaxLoanError(true)
                                        }
                                        else {
                                            setMinLoanError(false)
                                            setMaxLoanError(false)
                                        }
                                    }}
                                    value={loanAmount.toString()}
                                    style={styles.textInput}
                                    placeholder="Minimal Rp 1.000.000"
                                    keyboardType='number-pad'
                                    placeholderTextColor={colors.text.grey1}

                                />
                            </View>
                            {minLoanError && (
                                <Text style={styles.errorText}>Minimal pinjaman dana Rp 1.000.000</Text>)}
                            {maxLoanError && (
                                <Text style={styles.errorText}>Maksimal pinjaman dana Rp 10.000.000</Text>)}
                        </View>
                        <Gap height={20} />

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Lama Angsuran</Text>
                            <SelectPicker
                                doneButtonTextStyle={{ color: colors.text.green1, fontFamily: fonts.primary[600] }}
                                onSelectedStyle={styles.textInput}
                                doneButtonText='Pilih'
                                onValueChange={(value) => {
                                    dispatch(changeLoanCoperationMember({ month: value }))
                                    if (value === 0) {
                                        setMinMonthError(true)
                                    } else {
                                        setMinMonthError(false)
                                    }
                                }}
                                placeholder='Pilih lama angsuran'
                                style={styles.selectContainer}
                                selected={month}
                                placeholderStyle={{ color: colors.text.grey1, fontFamily: fonts.primary.normal }}
                            >

                                {Object.values(options).map((item, index) => (
                                    <SelectPicker.Item key={index} label={item.label} value={item.value} />
                                ))}

                            </SelectPicker>
                            {minMonthError && (
                                <Text style={styles.errorText}>Minimal lama angsuran 1 bulan</Text>)}

                        </View>


                    </View>
                </ScrollView>

                <Button disabled={loanTransferCondition} onPress={loanSubmitHandler} rounded={false} fullWidth title='Lanjutkan' variant={loanTransferCondition ? 'disabled' : 'primary'} />
            </View>
        </SafeAreaView>
    )
}

export default LoanTransfer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.grey5
    },
    content: {
        width: '100%',
        paddingHorizontal: 18,
    },
    label: {
        fontSize: 14,
        color: colors.text.header,
        fontFamily: fonts.primary[400],
        marginBottom: 5
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 4,
        paddingHorizontal: 8,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white
    },
    selectContainer: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 14,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white
    },
    textInput: {
        flex: 1,
        color: colors.black,
        fontFamily: fonts.primary.normal,
        fontSize: 14
    },
    errorText: {
        fontFamily: fonts.primary.normal,
        color: colors.text.danger
    },

})
