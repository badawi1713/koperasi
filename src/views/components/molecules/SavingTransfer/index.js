import React, { useEffect, useState } from 'react'
import { BackHandler, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Gap, TopNavbar } from '../..'
import { navigate } from '../../../../helpers/RootNavigation'
import { changeSavingCoperationMember } from '../../../../store/actions'
import { colors, fonts } from '../../../../utils'
import { Button } from '../../atoms'

const SavingTransfer = ({ showSavingTransferHandler, handleBackButtonClick }) => {
    const dispatch = useDispatch()

    const [isWajibError, setIsWajibError] = useState(false)
    const [isPokokError, setIsPokokError] = useState(false)
    const [isSukarelaError, setIsSukarelaError] = useState(false)

    const savingCoperationMemberReducer = useSelector(state => state.savingCoperationMemberReducer)

    const { simpananWajib, simpananPokok, simpananSukarela } = savingCoperationMemberReducer

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    const savingTransferCondition = simpananWajib > 0 && simpananWajib < 20000 || simpananPokok > 0 && simpananPokok < 20000 || simpananSukarela > 0 && simpananSukarela < 20000 || ((!simpananPokok && simpananPokok === 0) && (!simpananWajib && simpananWajib === 0) && (!simpananSukarela && simpananSukarela === 0))
    console.log(simpananPokok, simpananSukarela, simpananWajib)
    return (
        <SafeAreaView style={styles.container}>
            <TopNavbar title='Setor Simpanan' back linkBack={showSavingTransferHandler} />
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Gap height={20} />
                    <View style={styles.content}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nominal Simpanan Wajib</Text>
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
                                    value={simpananWajib}
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
                            <Text style={styles.label}>Nominal Simpanan Pokok</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    onChangeText={async (e) => {
                                        dispatch(changeSavingCoperationMember({ simpananPokok: e }))
                                        if (e > 0 && e < 20000) {
                                            setIsPokokError(true)
                                        } else {
                                            setIsPokokError(false)
                                        }
                                    }}
                                    value={simpananPokok}
                                    style={styles.textInput}
                                    placeholder="Minimal Rp 20.000"
                                    keyboardType='number-pad'
                                    placeholderTextColor={colors.text.grey1}
                                />
                            </View>
                            {isPokokError && (
                                <Text style={styles.errorText}>Minimal setoran Rp 20.000</Text>)}
                        </View>
                        <Gap height={20} />

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nominal Simpanan Sukarela</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    value={simpananSukarela}
                                    onChangeText={async (e) => {
                                        dispatch(changeSavingCoperationMember({ simpananSukarela: e }))
                                        if (e > 0 && e < 20000) {
                                            setIsSukarelaError(true)
                                        } else {
                                            setIsSukarelaError(false)
                                        }
                                    }}
                                    style={styles.textInput}
                                    placeholder="Minimal Rp 20.000"
                                    keyboardType='number-pad'
                                    placeholderTextColor={colors.text.grey1}

                                />
                            </View>
                            {isSukarelaError && (
                                <Text style={styles.errorText}>Minimal setoran Rp 20.000</Text>)}
                        </View>
                        <Gap height={20} />

                    </View>
                </ScrollView>

                <Button disabled={savingTransferCondition} onPress={() => { navigate('CoperationMemberSavingPaymentMethod') }} rounded={false} fullWidth title='Lanjutkan' variant={savingTransferCondition ? 'disabled' : 'primary'} />
            </View>
        </SafeAreaView>
    )
}

export default SavingTransfer;

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

})
