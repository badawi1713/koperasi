import React from 'react'
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
import { IMGBanner1, IMGBanner2, IMGBanner3 } from '../../../../assets/images'
import { colors } from '../../../../utils'
import Gap from '../../atoms/Gap'


const HomeSwiper = () => {
    return (
        <Swiper
            style={{ justifyContent: 'center' }}
            height={120}
            showsButtons={false}
            loop={true}
            autoplay
            paginationStyle={{ bottom: 0 }}
            dot={<View style={styles.dotStyle} />}
            activeDotStyle={styles.activeDotStyle}
            style={styles.wrapper}>
            <TouchableOpacity testID="Banner1" style={styles.slide}>
                <View style={styles.item} >
                    <Image source={IMGBanner1} style={{ flex: 1, borderRadius: 4, resizeMode: 'contain' }} />
                </View>
                <Gap height={20} />
            </TouchableOpacity>
            <TouchableOpacity testID="Banner2" style={styles.slide}>
                <View style={styles.item} >
                    <Image source={IMGBanner2} style={{ flex: 1, borderRadius: 4, resizeMode: 'contain' }} />
                </View>
                <Gap height={20} />
            </TouchableOpacity>
            <TouchableOpacity testID="Banner3" style={styles.slide}>
                <View style={styles.item} >
                    <Image source={IMGBanner3} style={{ flex: 1, borderRadius: 4, resizeMode: 'contain' }} />
                </View>
                <Gap height={20} />
            </TouchableOpacity>
        </Swiper>
    )
}


const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
    },
    item: {
        width: '100%',
        height: '80%',
        borderRadius: 4,
        alignItems: 'center'
    },
    dotStyle: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 12,
        height: 12,
        borderRadius: 6,
        marginLeft: 8,
        marginRight: 8,
        marginTop: 24,
        marginBottom: 8,
    },
    activeDotStyle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.primary,
        marginLeft: 8,
        marginRight: 8,
        marginTop: 24,
        marginBottom: 8,
    },
})

export default HomeSwiper;