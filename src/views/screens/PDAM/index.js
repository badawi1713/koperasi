import React, { useEffect } from 'react'
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Divider } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { IMGPdam } from '../../../assets'
import { getPdamMenu } from '../../../store/actions'
import { colors, fonts } from '../../../utils'
import { Gap, TopNavbar } from '../../components'

const PDAM = ({ navigation }) => {
    const dispatch = useDispatch();

    const pdamReducer = useSelector(state => state.pdamReducer)
    const { menuPdam, loading } = pdamReducer

    useEffect(() => {
        const getPdamList = () => {
            dispatch(getPdamMenu())
        }
        return () => {
            getPdamList()
        }
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavbar title='Pembayaran PDAM' back linkBack={() => navigation.goBack()} />
            <Gap height={18} />
            <View style={{ flex: 1 }}>
                <View style={styles.content}>
                    {loading ? <View>
                        <ActivityIndicator size={'large'} color={colors.background.green1} />
                    </View> :
                        menuPdam.map((item, index) => (
                            <TouchableOpacity key={index} >
                                <View style={styles.row}>
                                    <Image source={IMGPdam} style={styles.imageLogo} />
                                    <Gap width={20} />
                                    <Text style={styles.text}>{item.groupName}</Text>
                                </View>
                                <Gap height={10} />
                                <Divider />
                                <Gap height={10} />
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>

        </SafeAreaView>
    )
}

export default PDAM

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
    imageLogo: {
        width: 50,
        height: 50,
        resizeMode: 'cover'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        fontFamily: fonts.primary[600],
        color: colors.black
    },
    content: {
        backgroundColor: colors.white,
        padding: 18,
    },
    cardGroup: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingHorizontal: 18,
        justifyContent: 'space-between',
    },
})
