import React from 'react'
import { ActivityIndicator, StyleSheet, Text } from 'react-native'
import { Modal, Portal } from 'react-native-paper'
import { Gap } from '..'
import { IMGStoreRegistrationSuccess } from '../../../../assets'
import { colors, fonts } from '../../../../utils'

const SuccessModal = ({ title = "", showModal = false, loading }) => {
    return (
        <Portal>
            <Modal visible={showModal} contentContainerStyle={styles.modalContainer}>
                {loading ? <ActivityIndicator size='large' color={colors.background.green1} /> :
                    <>
                        <IMGStoreRegistrationSuccess width={160} height={180} />
                        <Gap height={10} />
                        <Text style={styles.storeTitle}>{title}</Text>
                    </>}
            </Modal>
        </Portal>
    )
}

export default SuccessModal

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: colors.white,
        justifyContent: 'center',
        padding: 18,
        height: 300,
        margin: 18,
        borderRadius: 6,
        alignItems: 'center',
        zIndex: 999,
        position: 'relative'
    },
    storeTitle: {
        fontSize: 18,
        color: colors.text.dark1,
        fontFamily: fonts.primary[600],
    },

})
