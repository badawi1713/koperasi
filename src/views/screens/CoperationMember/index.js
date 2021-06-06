import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Image, StyleSheet, View, Text } from 'react-native'
import { IMGBlockedAccount, IMGLogo } from '../../../assets'
import { colors } from '../../../utils'
import { Button, Gap, MemberRegisterConfirmation, MemberRegisterForm, TopNavbar, MemberProfile } from '../../components'
import { getProfile } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';

const CoperationMember = ({ navigation }) => {
    const [showRegisterForm, setShowRegisterForm] = useState(false)

    const dispatch = useDispatch()
    useEffect(() => {
        const getProfileData = () => {
            dispatch(getProfile())
        }

        return getProfileData()
    }, [dispatch])

    const profileReducer = useSelector(state => state.profileReducer)

    const { memberStatus, loading, } = profileReducer;

    const showRegisterFormHandler = () => {
        setShowRegisterForm(true)
    }

    const registerHandler = () => {
        navigation.navigate('CoperationMember');
        setShowRegisterForm(false);
    }

    return (
        <View style={styles.container}>
            <TopNavbar back linkBack={() => navigation.goBack()} title='Anggota Koperasi' />
            {
                loading ? <View style={styles.content}>
                    <ActivityIndicator color={colors.background.green1} size='large' />
                </View> : memberStatus === 2 ?
                    <View style={styles.content}>
                        <IMGBlockedAccount width={320} />
                        <Gap height={20} /><Text>Maaf, akun anggota anda sedang diblokir</Text>
                    </View>
                    :
                    memberStatus === 1 ?
                        <MemberProfile />
                        :
                        showRegisterForm ?
                            <MemberRegisterForm registerHandler={registerHandler} />
                            : memberStatus === 0 ?
                                <MemberRegisterConfirmation status={memberStatus} />
                                :
                                <View style={styles.content}>
                                    <Image source={IMGLogo} style={styles.logo} />
                                    <Gap height={20} />
                                    <Button title='Daftar Anggota Koperasi' variant='primary' onPress={showRegisterFormHandler} fullWidth />
                                </View>
            }
        </View>
    )
}

export default CoperationMember

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