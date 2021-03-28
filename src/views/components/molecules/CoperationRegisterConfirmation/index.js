import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { IMGLogo } from '../../../../assets'
import { colors, fonts } from '../../../../utils'
import { Gap } from '../../../components'
const CoperationRegisterConfirmation = () => {
    return (
        <View style={styles.content}>
            <Text style={styles.title}>Status Koperasi</Text>
            <Gap height={10} />
            <Text style={styles.confirmationStatus}>Menunggu Konfirmasi</Text>
            <Gap height={20} />
            <Image source={IMGLogo} style={styles.logo} />
        </View>
    );
};

export default CoperationRegisterConfirmation

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 18,
        alignItems: 'center'
    },
    logo: {
        width: 320,
        height: 200,
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