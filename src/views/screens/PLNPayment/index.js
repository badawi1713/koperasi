import React, { useEffect, useRef } from 'react'
import { ActivityIndicator, BackHandler, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { ScrollView as Scroll } from 'react-native-gesture-handler'
import RBSheet from "react-native-raw-bottom-sheet"
import NumberFormat from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { ICProtection, IMGNoData } from '../../../assets'
import { changePln, getPlnBill, getPlnProducts, postPlnPayment } from '../../../store/actions'
import { getSaldoBalance } from '../../../store/actions/home'
import { colors, fonts } from '../../../utils'
import { Button, Gap, Link, SuccessModal, TopNavbar } from '../../components'

const screenHeight = Math.round(Dimensions.get('window').height);

const PLNPayment = ({ navigation }) => {
    const dispatch = useDispatch();
    const plnReducer = useSelector(state => state.plnReducer);
    const { customerId, loading, detailProduk, paymentLoading, showModal, groupName, products } = plnReducer

    const {
        pelId,
        saldo,
        productName,
        productPrice
    } = detailProduk

    const plnConfirmationRef = useRef(null);

    const handleBackButtonClick = () => {
        dispatch(changePln({ groupId: "", groupName: "" }))
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    useEffect(() => {
        return dispatch(getPlnProducts())
    }, [])

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
                        await plnConfirmationRef.current.close()
                        await dispatch(postPlnPayment())
                        await dispatch(getSaldoBalance())
                    }} />
                </View>
            </Scroll>
        </View>
    );

    const payConfirmation = async () => {
        // await dispatch(getIndihomeBill())
        await plnConfirmationRef.current.open()
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavbar title={groupName} back linkBack={() => {
                navigation.goBack()
                handleBackButtonClick()
            }} />
            {showModal && <SuccessModal showModal={showModal} title="Transaksi Pembayaran Berhasil" loading={paymentLoading} />}

            <Gap height={18} />
            <View style={{ flex: 1, justifyContent: 'space-between', marginBottom: 32, }}>
                <View style={styles.content}>
                    <Text style={styles.header}>Customer ID <Text style={{ color: colors.text.danger }}>*</Text></Text>
                    <Gap height={10} />
                    <TextInput value={customerId} keyboardType='decimal-pad' onChangeText={(e) => dispatch(changePln({ customerId: e }))} placeholder='Masukkan Customer ID anda' placeholderTextColor={colors.text.grey1} style={styles.textInput} />
                </View>
                {groupName !== "PLN TAGIHAN" ? (
                    loading ? <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <ActivityIndicator size='large' color={colors.background.green1} />
                    </View> :
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Gap height={20} />
                            <View style={styles.productContent}>

                                {products.length === 0 ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><IMGNoData width={120} height={130} />
                                    <Text style={styles.textEmpty}>Maaf, produk tidak tersedia</Text>
                                </View> :
                                    products.map((item, index) => (
                                        <TouchableOpacity
                                            disabled={loading}
                                            onPress={async () => {
                                                if (customerId.length < 10) {
                                                    ToastAndroid.show("Nomor pelanggan tidak valid.", ToastAndroid.SHORT);
                                                } else {
                                                    await dispatch(changePln({ productId: item.produkId }))
                                                    await dispatch(getPlnBill())
                                                    await payConfirmation()
                                                }
                                            }}
                                            style={styles.card}
                                            key={index}
                                        >
                                            <Text style={styles.productTitle}>{item.produkNama}</Text>
                                            <NumberFormat value={item.produkHarga || 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} renderText={value =>
                                                <Text style={styles.productPrice}>
                                                    Rp {value}</Text>
                                            } />
                                        </TouchableOpacity>
                                    ))

                                }

                            </View>
                        </ScrollView>
                )

                    :
                    <View style={{ paddingHorizontal: 18 }}>
                        <Button disabled={customerId === "" || loading} title='Selanjutnya' loading={loading} variant={customerId === "" ? 'disabled' : 'primary'}
                            onPress={async () => {
                                if (customerId.length < 10) {
                                    ToastAndroid.show("Nomor pelanggan tidak valid.", ToastAndroid.SHORT);
                                } else {
                                    await dispatch(changePln({ productId: item.produkId }))
                                    await dispatch(getPlnBill())
                                    await payConfirmation()
                                }
                            }}
                        />
                    </View>
                }
            </View>
            <RBSheet
                height={screenHeight - 80}
                ref={plnConfirmationRef}
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

export default PLNPayment

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
    },
    productContent: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingHorizontal: 18,
        justifyContent: 'space-between',
    },
    card: {
        paddingHorizontal: 16,
        paddingVertical: 18,
        backgroundColor: colors.primary,
        width: '48%',
        borderRadius: 6,
        height: 100,
        justifyContent: 'space-between',
        marginBottom: 20,
        elevation: 1
    },
    notes: {
        color: colors.white,
        fontSize: 13,
        fontFamily: fonts.primary[600],
    },
    productTitle: {
        color: colors.white,
        fontSize: 13,
        fontFamily: fonts.primary[400],
    },
    productPrice: {
        color: colors.white,
        fontSize: 16,
        fontFamily: fonts.primary[600],
    },
    textEmpty: {
        color: colors.text.header,
        fontSize: 16,
        fontFamily: fonts.primary[600],
    }
})
