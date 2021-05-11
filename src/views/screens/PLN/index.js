import React, { useEffect } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ContentLoader from 'react-native-easy-content-loader'
import { Divider } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { IMGNoData, IMGPln } from '../../../assets'
import { changePln, getPlnMenu } from '../../../store/actions'
import { colors, fonts } from '../../../utils'
import { Gap, TopNavbar } from '../../components'

const PLN = ({ navigation }) => {
    const dispatch = useDispatch();

    const plnReducer = useSelector(state => state.plnReducer)
    const { menuPln, loading } = plnReducer

    useEffect(() => {
        const getPlnList = () => {
            dispatch(getPlnMenu())
        }
        return getPlnList()

    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavbar title='Pembayaran PLN' back linkBack={() => navigation.goBack()} />
            <Gap height={18} />
            <View style={{ flex: 1 }}>
                <View style={styles.content}>
                    {loading ? <View >
                        <View style={styles.row} >
                            <ContentLoader containerStyles={{ width: '25%' }} paragraphStyles={{ borderRadius: 6, }} tHeight={60} tWidth={'100%'} pRows={0} active />
                            <ContentLoader containerStyles={{ width: '30%' }} paragraphStyles={{ borderRadius: 6, }} tHeight={10} tWidth={'100%'} pRows={0} active />
                        </View>
                        <Divider />
                        <Gap height={10} />
                        <View style={styles.row} >
                            <ContentLoader containerStyles={{ width: '25%' }} paragraphStyles={{ borderRadius: 6, }} tHeight={60} tWidth={'100%'} pRows={0} active />
                            <ContentLoader containerStyles={{ width: '30%' }} paragraphStyles={{ borderRadius: 6, }} tHeight={10} tWidth={'100%'} pRows={0} active />
                        </View>
                        <Divider />
                    </View> :
                        menuPln.length === 0 ? <View style={{ alignItems: 'center' }}>
                            <IMGNoData width={120} height={130} />
                            <Text style={styles.text}>Maaf layanan sedang tidak tersedia</Text>
                        </View> :
                            menuPln.map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => {
                                    dispatch(changePln({ groupId: item.groupId, groupName: item.groupName }))
                                    navigation.navigate("PLNPayment")
                                }} >
                                    <View style={styles.row}>
                                        <Image source={IMGPln} style={styles.imageLogo} />
                                        <Gap width={20} />
                                        <Text style={styles.text}>{item.groupName}</Text>
                                    </View>
                                    <Gap height={10} />
                                    <Divider />
                                    {index < 1 &&
                                        <Gap height={10} />
                                    }
                                </TouchableOpacity>
                            ))
                    }
                </View>
            </View>

        </SafeAreaView>
    )
}

export default PLN

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
