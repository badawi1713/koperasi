import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { IMGAccountConfirmation } from '../../../../assets'
import { colors, fonts } from '../../../../utils'
import { Gap } from '../../../components'

const MemberRegisterConfirmation = ({ status }) => {
    return (
        <View style={styles.content}>
            <Text style={styles.title}>Status Akun</Text>
            <Gap height={10} />
            <Text style={styles.confirmationStatus}>{status === 2 ? "Mohon Maaf, Akun Anda sedang Dibekukan. Segera Hubungi Layanan Customer Service" : "Menunggu Konfirmasi"}</Text>
            <Gap height={20} />
            <Image source={IMGAccountConfirmation} style={styles.logo} />
        </View>
    );
};

export default MemberRegisterConfirmation

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 18,
        alignItems: 'center'
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 16,
        fontFamily: fonts.primary[700]
    },
    confirmationStatus: {
        fontSize: 16,
        fontFamily: fonts.primary[700],
        color: colors.text.danger
    }
})