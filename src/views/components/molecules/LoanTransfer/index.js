import React, { useEffect, useState } from 'react'
import { BackHandler, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Gap, TopNavbar } from '../..'
import { navigate } from '../../../../helpers/RootNavigation'
import { changeSavingCoperationMember } from '../../../../store/actions'
import { colors, fonts } from '../../../../utils'
import { Button } from '../../atoms'
import { Picker } from '@react-native-picker/picker';

const LoanTransfer = ({ showSavingTransferHandler, handleBackButtonClick }) => {
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
            <TopNavbar title='Pinjam Dana' back linkBack={showSavingTransferHandler} />
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
                            <Picker
                                itemStyle={{ color: 'red' }}
                                style={styles.inputContainer}
                                selectedValue={month}
                                onValueChange={(itemValue, itemIndex) =>
                                    setMonth(itemValue)
                                }>
                                <Picker.Item label="1" value={1} />
                                <Picker.Item label="3" value={3} />
                                <Picker.Item label="6" value={6} />
                                <Picker.Item label="12" value={12} />
                                <Picker.Item label="24" value={24} />
                            </Picker>
                        </View>
                        <Gap height={20} />

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
    textInput: {
        flex: 1,
        color: colors.black,
        fontFamily: fonts.primary.normal
    },
    errorText: {
        fontFamily: fonts.primary.normal,
        color: colors.text.danger
    },
    inputAndroid: {
        fontSize: 14,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },

})
