import React, { useEffect } from 'react'
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Divider } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { IMGPln } from '../../../assets'
import { getPlnMenu } from '../../../store/actions'
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
        return () => {
            getPlnList()
        }
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavbar title='Pembayaran PLN' back linkBack={() => navigation.goBack()} />
            <Gap height={18} />
            <View style={{ flex: 1 }}>
                <View style={styles.content}>
                    {loading ? <View>
                        <ActivityIndicator size={'large'} color={colors.background.green1} />
                    </View> :
                        menuPln.map((item, index) => (
                            <TouchableOpacity key={index} >
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
