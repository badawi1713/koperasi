import React, { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { IMGLogo } from '../../../assets'
import { colors } from '../../../utils'
import { Button, CoperationRegisterConfirmation, CoperationRegisterForm, Gap, TopNavbar } from '../../components'

const CoperationAccount = ({ navigation }) => {
    const [showRegisterForm, setShowRegisterForm] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)

    const registerHandler = () => {
        setIsRegistered(true)
        setShowRegisterForm(false)

    }

    const showRegisterFormHandler = () => {
        setShowRegisterForm(true)
    }

    return (
        <View style={styles.container}>
            <TopNavbar back linkBack={() => navigation.goBack()} title='Akun Koperasi' />
            {
                showRegisterForm ?
                    <CoperationRegisterForm registerHandler={registerHandler} />
                    :
                    isRegistered ? <CoperationRegisterConfirmation /> :
                        <View style={styles.content}>
                            <Image source={IMGLogo} style={styles.logo} />
                            <Gap height={20} />
                            <Button title='Daftar Koperasi' variant='primary' onPress={showRegisterFormHandler} fullWidth />
                        </View>
            }

        </View>
    )
}

export default CoperationAccount

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
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
})