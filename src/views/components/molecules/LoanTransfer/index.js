import React, { useEffect, useState } from 'react'
import { BackHandler, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import SelectPicker from 'react-native-form-select-picker'
import { useDispatch, useSelector } from 'react-redux'
import { Gap, TopNavbar } from '../..'
import { navigate } from '../../../../helpers/RootNavigation'
import { changeSavingCoperationMember } from '../../../../store/actions'
import { colors, fonts } from '../../../../utils'
import { Button } from '../../atoms'

const options = [{ "label": "1 Bulan", value: 1 }, { "label": "3 Bulan", value: 3 }, { "label": "6 Bulan", value: 6 }, { "label": "12 Bulan", value: 12 }, { "label": "24 Bulan", value: 24 }];

const LoanTransfer = ({ showLoanTransferHandler, handleBackButtonClick }) => {
    const dispatch = useDispatch()

    const [isWajibError, setIsWajibError] = useState(false)
    const [month, setMonth] = useState(null)


    const savingCoperationMemberReducer = useSelector(state => state.savingCoperationMemberReducer)

    const { simpananWajib, simpananPokok, simpananSukarela } = savingCoperationMemberReducer

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    const savingTransferCondition = simpananWajib > 0 && simpananWajib < 20000 || simpananPokok > 0 && simpananPokok < 20000 || simpananSukarela > 0 && simpananSukarela < 20000 || ((!simpananPokok || simpananPokok === 0) && (!simpananWajib || simpananWajib === 0) && (!simpananSukarela || simpananSukarela === 0))

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
                                        dispatch(changeSavingCoperationMember({ simpananWajib: e }))
                                        if (e > 0 && e < 20000) {
                                            setIsWajibError(true)
                                        } else {
                                            setIsWajibError(false)
                                        }
                                    }}
                                    style={styles.textInput}
                                    placeholder="Minimal Rp 20.000"
                                    keyboardType='number-pad'
                                    placeholderTextColor={colors.text.grey1}

                                />
                            </View>
                            {isWajibError && (
                                <Text style={styles.errorText}>Minimal setoran Rp 20.000</Text>)}
                        </View>
                        <Gap height={20} />

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Lama Angsuran</Text>
                            <SelectPicker
                                doneButtonTextStyle={{ color: colors.text.green1, fontFamily: fonts.primary[600] }}
                                onSelectedStyle={styles.textInput}
                                doneButtonText='Pilih'
                                onValueChange={(value) => {
                                    setMonth(value);
                                }}
                                placeholder='Pilih lama angsuran'
                                style={styles.selectContainer}
                                selected={month}
                                placeholderStyle={{ color: colors.text.grey1, fontFamily: fonts.primary.normal }}
                            >

                                {Object.values(options).map((item) => (
                                    <SelectPicker.Item label={item.label} value={item.value} key={item.label} />
                                ))}

                            </SelectPicker>

                        </View>


                    </View>
                </ScrollView>

                <Button disabled={savingTransferCondition} onPress={() => { navigate('CoperationMemberSavingPaymentMethod') }} rounded={false} fullWidth title='Lanjutkan' variant={savingTransferCondition ? 'disabled' : 'primary'} />
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