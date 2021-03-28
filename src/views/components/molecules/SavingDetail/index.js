import React, { useEffect } from 'react'
import { BackHandler, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { Gap, TopNavbar } from '../..'
import { ICSavingTotal, ICTotalBudget } from '../../../../assets'
import { colors, fonts } from '../../../../utils'

const SavingDetail = ({ showSavingDetailHandler, handleBackButtonClick }) => {

    const savingCoperationMemberReducer = useSelector(state => state.savingCoperationMemberReducer)
    const { totalSimpanan, dataSimpananPokok, dataSimpananWajib, dataSimpananSukarela } = savingCoperationMemberReducer;

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <TopNavbar title='Simpanan' back linkBack={showSavingDetailHandler} />
            <Gap height={20} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <View style={styles.row}>
                        <ICSavingTotal width={40} height={40} />
                        <Gap width={10} />
                        <Text style={styles.textTitle}>Simpanan Pokok</Text>
                    </View>
                    <Text style={styles.textTitle}>Rp {dataSimpananPokok}</Text>

                </View>
                <Gap height={20} />
                <View style={styles.section}>
                    <View style={styles.row}>
                        <ICSavingTotal width={40} height={40} />
                        <Gap width={10} />
                        <Text style={styles.textTitle}>Simpanan Wajib</Text>
                    </View>
                    <Text style={styles.textTitle}>Rp {dataSimpananWajib}</Text>

                </View>

                <Gap height={20} />
                <View style={styles.section}>
                    <View style={styles.row}>
                        <ICSavingTotal width={40} height={40} />
                        <Gap width={10} />
                        <Text style={styles.textTitle}>Simpanan Sukarela</Text>
                    </View>
                    <Text style={styles.textTitle}>Rp {dataSimpananSukarela}</Text>

                </View>
                <Gap height={40} />

                <View style={styles.section}>
                    <View style={styles.row}>
                        <ICTotalBudget width={40} height={40} />
                        <Gap width={10} />
                        <Text style={styles.textTitle}>Total Simpanan</Text>
                    </View>
                    <Text style={styles.textTitle}>Rp {totalSimpanan}</Text>

                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default SavingDetail;

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
    row: {
        flexDirection: 'row',
        alignItems: 'center'
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

})
