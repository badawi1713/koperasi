import React from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ICEWalletInActive } from '../../../assets'
import { changeTopUp } from '../../../store/actions/topUp'
import { colors, fonts } from '../../../utils'
import { Button, Gap, TopNavbar } from '../../components'

const TopUp = ({ navigation }) => {
    const dispatch = useDispatch();
    const homeReducer = useSelector(state => state.homeReducer);
    const topUpReducer = useSelector(state => state.topUpReducer);
    const { saldoNominal } = topUpReducer;
    const { saldoBalance } = homeReducer;

    const changeSaldoHandler = (e) => {
        dispatch(changeTopUp({
            saldoNominal: e
        }))

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavbar title='Top Up' back linkBack={() => navigation.goBack()} />
            <View style={styles.section}>
                <ICEWalletInActive />
                <Gap width={15} />
                <View>
                    <Text style={styles.header}>Saldo Wallet</Text>
                    <Gap height={5} />
                    <Text style={styles.text}>Rp {saldoBalance}</Text>
                </View>
            </View>
            <Gap height={18} />
            <View style={{ flex: 1, justifyContent: 'space-between', marginBottom: 32, }}>
                <View style={styles.content}>
                    <Text style={styles.header}>Nominal Top Up</Text>
                    <Gap height={18} />
                    <Text style={styles.label}>Masukkan nominal top up di sini</Text>
                    <TextInput keyboardType='decimal-pad' onChangeText={(e) => changeSaldoHandler(e)} placeholder='Minimal Rp 20.000' style={styles.textInput} />
                </View>
                <View style={{ paddingHorizontal: 18 }}>
                    <Button disabled={saldoNominal < 20000} title='Top Up' variant={saldoNominal < 20000 ? 'disabled' : 'primary'} onPress={() => navigation.navigate('TopUpPaymentMethod')} />
                </View>
            </View>

        </SafeAreaView>
    )
}

export default TopUp

const styles = StyleSheet.create({
    section: {
        flexDirection: 'row',
        margin: 18,
        paddingHorizontal: 10,
        paddingVertical: 18,
        backgroundColor: colors.white,
        alignItems: 'center',
        borderRadius: 6
    },
    header: {
        fontSize: 16,
        fontFamily: fonts.primary[700],
        color: colors.black
    },
    text: {
        fontSize: 14,
        fontFamily: fonts.primary.normal,
        color: colors.black
    },
    label: {
        fontSize: 14,
        fontFamily: fonts.primary.normal,
        color: colors.text.secondary
    },
    content: {
        backgroundColor: colors.white,
        padding: 18,
    },
    textInput: {
        backgroundColor: colors.background.grey4,
        borderRadius: 6,
        paddingHorizontal: 18,
        marginTop: 6
    }
})
