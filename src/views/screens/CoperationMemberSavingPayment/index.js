import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { ICCopy, IMGAccountConfirmation } from '../../../assets'
import { colors, fonts } from '../../../utils'
import { Gap, TopNavbar } from '../../components'
import { changeSavingCoperationMember, getSavingCoperationMemberPaymentMethod, postSavingCoperationMemberTransfer } from '../../../store/actions';

const formatHour = (time) =>
    `${String(Math.floor(time / 3600)).padStart(2, '0')}`;

const formatMinute = (time) =>
    `${String(Math.floor((time % 3600) / 60)).padStart(2, '0')}`;

const formatSecond = (time) =>
    `${String(
        time % 60,
    ).padStart(2, '0')}`;

const CoperationMemberSavingPayment = ({ navigation }) => {

    const savingCoperationMemberReducer = useSelector(state => state.savingCoperationMemberReducer);
    const { simpananWajib, simpananPokok, simpananSukarela } = savingCoperationMemberReducer;

    const [time, setTime] = useState(7200);

    useEffect(() => {
        if (time === 0) {
            setTime(null)
        }

        if (!time) return;

        const timer = setInterval(() => {
            setTime(time - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [time]);

    return (
        <SafeAreaView style={styles.container}>
            <TopNavbar title="Pembayaran" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.mainContent}>
                    <Gap height={20} />
                    <View style={styles.card}>
                        <Text style={styles.text}>Total Pembayaran</Text>
                        <Gap height={20} />
                        <View style={styles.cardContent}>
                            <View style={styles.priceBox}>
                                <Text style={styles.priceText}>Rp {simpananPokok + simpananSukarela + simpananWajib}</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.detailText}>Detail</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Gap height={30} />
                    <View style={styles.merchantContainer}>
                        <Image source={IMGAccountConfirmation} style={styles.imageContainer} />
                        <Gap height={5} />
                        <Text style={styles.text}>Mohon transfer ke tujuan nomor rekening</Text>
                        <Text style={styles.text}>dengan atas nama berikut</Text>
                        <Gap height={10} />
                        <Text style={styles.text}>
                            Nama Akun
                    </Text>
                    </View>
                    <Gap height={30} />
                    <View style={styles.card}>
                        <Text style={styles.accountNumber}>89836554376538192</Text>
                        <Gap height={20} />
                        <View style={styles.cardContent}>
                            <TouchableOpacity style={styles.guideBox}>
                                <Text style={styles.guideText}>Panduan Transfer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cardContent}>
                                <Text style={styles.text}>Salin </Text>
                                <Gap width={5} />
                                <ICCopy />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Gap height={30} />
                    <Text style={styles.text}>Batas Waktu Pembayaran</Text>
                    <Gap height={10} />
                    <View style={styles.card}>
                        <View style={styles.timeCardContent}>
                            <View style={styles.timeBox}>
                                <Text style={styles.timeText}>{formatHour(time)}</Text>
                                <Text style={styles.timeText}>Jam</Text>
                            </View>
                            <Text style={styles.timeText}>:</Text>
                            <View style={styles.timeBox}>
                                <Text style={styles.timeText}>{formatMinute(time)}</Text>
                                <Text style={styles.timeText}>Menit</Text>
                            </View>
                            <Text style={styles.timeText}>:</Text>
                            <View style={styles.timeBox}>
                                <Text style={styles.timeText}>{formatSecond(time)}</Text>
                                <Text style={styles.timeText}>Detik</Text>
                            </View>
                        </View>
                    </View>
                    <Gap height={30} />
                    <TouchableOpacity style={styles.cancelBox}>
                        <Text style={styles.cancelText}>Batalkan Pembayaran</Text>
                    </TouchableOpacity>
                    <Gap height={20} />
                </View>
            </ScrollView>
            <TouchableOpacity onPress={() => navigation.navigate('MainApp')} style={styles.okButton}>
                <Text style={styles.okText}>OK</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default CoperationMemberSavingPayment;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    mainContent: {
        flex: 1,
        paddingHorizontal: 18
    },
    merchantContainer: {
        alignItems: 'center'
    },
    imageContainer: {
        width: 80,
        height: 100,
        resizeMode: 'contain'
    },
    card: {
        borderWidth: 0.6,
        borderColor: colors.border,
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    priceBox: {
        backgroundColor: colors.background.red1,
        padding: 8,
        borderRadius: 6,
    },
    priceText: {
        color: colors.white,
        fontFamily: fonts.primary[600]
    },
    detailText: {
        color: colors.text.danger,
        fontFamily: fonts.primary[600]
    },
    accountNumber: {
        color: colors.text.grey1,
        fontFamily: fonts.primary[600],
        textAlign: 'center',
        fontSize: 18
    },
    guideBox: {
        backgroundColor: colors.white,
        borderColor: colors.text.grey1,
        borderWidth: 1,
        padding: 8,
        borderRadius: 6,
        alignItems: 'center'
    },
    guideText: {
        color: colors.text.grey1,
        fontFamily: fonts.primary[600]
    },
    text: {
        color: colors.text.grey1,
        fontFamily: fonts.primary[600]
    },
    timeCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    timeBox: {
        alignItems: 'center'
    },
    timeText: {
        color: colors.text.grey1,
        fontFamily: fonts.primary[600],
        textAlign: 'center',
        fontSize: 18
    },
    cancelBox: {
        backgroundColor: colors.white,
        borderColor: colors.text.danger,
        borderWidth: 1,
        padding: 8,
        borderRadius: 6,
        alignItems: 'center'
    },
    cancelText: {
        color: colors.text.danger,
        fontFamily: fonts.primary[600]
    },
    okButton: {
        backgroundColor: colors.button.primary.background,
        padding: 18,
        alignItems: 'center'
    },
    okText: {
        color: colors.white,
        fontFamily: fonts.primary[600]
    }
})
