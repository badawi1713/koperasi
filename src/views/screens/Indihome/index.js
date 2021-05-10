import React, { useEffect, useRef } from 'react'
import { BackHandler, Dimensions, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import { ScrollView as Scroll } from 'react-native-gesture-handler'
import RBSheet from "react-native-raw-bottom-sheet"
import NumberFormat from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { ICProtection } from '../../../assets'
import { changeIndihome, getIndihomeBill, postIndhomePayment } from '../../../store/actions'
import { getSaldoBalance } from '../../../store/actions/home'
import { colors, fonts } from '../../../utils'
import { Button, Gap, TopNavbar, Link, SuccessModal } from '../../components'

const screenHeight = Math.round(Dimensions.get('window').height);

const Indihome = ({ navigation }) => {
    const dispatch = useDispatch();
    const indihomeReducer = useSelector(state => state.indihomeReducer);
    const { customerId, loading, detailProduk, paymentLoading, showModal } = indihomeReducer

    const {
        inquiryId,
        pelId,
        saldo,
        productName,
        productPrice
    } = detailProduk

    const indihomeConfirmationRef = useRef(null);

    const handleBackButtonClick = () => {
        dispatch(changeIndihome({ customerId: "" }))
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    const BillConfirmation = () => (
        <View style={{ paddingHorizontal: 18, flex: 1 }}>
            <Gap height={20} />
            <Scroll showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.drawerTitle}>Detail Penerima</Text>
                        <Gap height={10} />
                        <View>
                            <Text style={styles.drawerSubtitle}>Nomor Pelanggan</Text>
                            <Gap height={5} />
                            <Text style={styles.drawerText}>{pelId}</Text>
                        </View>
                    </View>
                    <Gap height={30} />
                    <View>
                        <Text style={styles.drawerTitle}>Detail Pembelian</Text>
                        <Gap height={10} />
                        <View>
                            <Text style={styles.drawerSubtitle}>{productName}</Text>
                        </View>
                    </View>
                    <Gap height={30} />
                    <View style={styles.paymentContent}>
                        <View>
                            <Text style={styles.drawerTitle}>Detail Pembayaran</Text>
                            <Gap height={10} />
                            <View style={styles.totalGroup}>
                                <Text style={styles.totalText}>Saldo</Text>
                                <NumberFormat value={saldo || 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} renderText={value =>
                                    <Text style={styles.saldoText}>Rp {value}</Text>
                                } />
                            </View>
                            <Gap height={5} />
                            <View style={styles.totalGroup}>
                                <Text style={styles.totalText}>Total</Text>
                                <NumberFormat value={productPrice || 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} renderText={value =>
                                    <Text style={styles.totalText(saldo > productPrice)}>Rp {value}</Text>
                                } />
                            </View>
                        </View>
                        <Gap height={160} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <ICProtection />
                            <Gap width={10} />
                            <Text style={styles.protectionText}>Semua transaksi pelanggan dijamin aman dan cepat, dengan melanjutkan pembayaran, anda setuju pada{" "}
                                <Link variant='text' title='Persyaratan dan Kondisi' />
                            </Text>
                        </View>
                    </View>
                    <Gap height={20} />
                    <Button variant={saldo < productPrice || paymentLoading ? 'disabled' : 'primary'} loading={paymentLoading} disabled={paymentLoading || saldo < productPrice} fullWidth title='Bayar' onPress={async () => {
                        await dispatch(changeIndihome({ customerId: "" }))
                        await indihomeConfirmationRef.current.close()
                        await dispatch(postIndhomePayment())
                        await dispatch(getSaldoBalance())
                    }} />
                </View>
            </Scroll>
        </View>
    );

    const indihomeBillConfirmation = async () => {
        await dispatch(getIndihomeBill())
        await indihomeConfirmationRef.current.open()
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavbar title='Indihome' back linkBack={() => {
                navigation.goBack()
                handleBackButtonClick()
            }} />
            {showModal && <SuccessModal showModal={showModal} title="Transaksi Pembayaran Berhasil" loading={paymentLoading} />}

            <Gap height={18} />
            <View style={{ flex: 1, justifyContent: 'space-between', marginBottom: 32, }}>
                <View style={styles.content}>
                    <Text style={styles.header}>Customer ID <Text style={{ color: colors.text.danger }}>*</Text></Text>
                    <Gap height={10} />
                    <TextInput value={customerId} keyboardType='decimal-pad' onChangeText={(e) => dispatch(changeIndihome({ customerId: e }))} placeholder='Masukkan Customer ID anda' placeholderTextColor={colors.text.grey1} style={styles.textInput} />
                </View>
                <View style={{ paddingHorizontal: 18 }}>
                    <Button disabled={customerId === "" || loading} title='Selanjutnya' loading={loading} variant={customerId === "" ? 'disabled' : 'primary'} onPress={indihomeBillConfirmation} />
                </View>
            </View>
            <RBSheet
                height={screenHeight - 80}
                ref={indihomeConfirmationRef}
                openDuration={600}
                closeDuration={500}
                closeOnDragDown={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: "rgba(0,0,0,0.6)"
                    },
                    container: {
                        borderTopStartRadius: 10,
                        borderTopEndRadius: 10
                    },
                    draggableIcon: {
                        backgroundColor: colors.border,
                        borderRadius: 12,
                        height: 4,
                    }
                }}
            >
                <BillConfirmation />
            </RBSheet>

        </SafeAreaView>
    )
}

export default Indihome

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
    header: {
        fontSize: 16,
        fontFamily: fonts.primary[700],
        color: colors.black
    },
    text: {
        fontSize: 14,
        fontFamily: fonts.primary.normal,
        color: colors.black
    },
    label: {
        fontSize: 14,
        fontFamily: fonts.primary.normal,
        color: colors.text.secondary
    },
    content: {
        backgroundColor: colors.white,
        padding: 18,
    },
    textInput: {
        backgroundColor: colors.background.grey5,
        borderRadius: 6,
        paddingHorizontal: 18,
        marginTop: 6,
        fontFamily: fonts.primary.normal,
        color: colors.black
    },
    drawerContainer: {

        backgroundColor: colors.white,
        paddingHorizontal: 18,
        paddingTop: 18,
        height: "100%",
        borderTopWidth: 1,
        borderTopColor: colors.border,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 1,
    },
    drawerLine: {
        width: 40,
        borderBottomWidth: 3,
        borderBottomColor: colors.border,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        alignSelf: 'center'
    },
    confirmationContent: {
        flex: 1
    },
    drawerTitle: {
        color: colors.primary,
        fontSize: 16,
        fontFamily: fonts.primary[700]
    },
    drawerSubtitle: {
        color: colors.black,
        fontSize: 14,
        fontFamily: fonts.primary[600]
    },
    drawerText: {
        color: colors.text.header,
        fontSize: 14,
        fontFamily: fonts.primary[400],
        flexDirection: 'row',
        flexShrink: 1
    },
    totalGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    saldoText: {
        color: colors.text.header,
        fontSize: 16,
        fontFamily: fonts.primary[400]
    },
    totalText: (canPay) => ({
        color: canPay ? colors.text.green1 : colors.text.red1,
        fontSize: 16,
        fontFamily: fonts.primary[400]
    }),
    paymentContent: {
        justifyContent: 'space-between',
        flex: 1,
        minHeight: 170,
        borderBottomColor: colors.border,
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    protectionText: {
        color: colors.text.header,
        fontSize: 14,
        fontFamily: fonts.primary[400],
        flexDirection: 'row',
        flexShrink: 1
    }
})
