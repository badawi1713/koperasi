import React, { useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ContentLoader from "react-native-easy-content-loader";
import { useDispatch, useSelector } from 'react-redux';
import { IMGCashOnDelivery } from '../../../assets';
import { changeSavingCoperationMember, getSavingCoperationMemberPaymentMethod, postSavingCoperationMemberTransfer } from '../../../store/actions';
import { colors, fonts } from '../../../utils';
import { Gap, TopNavbar } from '../../components';

const CoperationMemberSavingPaymentMethod = ({ navigation }) => {
    const dispatch = useDispatch()

    const savingCoperationMemberReducer = useSelector(state => state.savingCoperationMemberReducer);

    const { loading, paymentMethodData } = savingCoperationMemberReducer

    useEffect(() => {
        const getTopUpMethodList = () => {
            dispatch(getSavingCoperationMemberPaymentMethod())
        }
        return getTopUpMethodList()
    }, [dispatch])

    const PaymentMethodList = ({ item }) => (
        <TouchableOpacity onPress={async () => {
            await dispatch(changeSavingCoperationMember({
                via: item.idBank
            }))
            await dispatch(postSavingCoperationMemberTransfer())
            await navigation.navigate('CoperationMemberSavingPayment')
        }} style={styles.paymentItem}>
            <Image style={styles.paymentImage} source={item.logo === "--" ? IMGCashOnDelivery : { uri: item.logo }} />
            <Gap height={10} />
            <Text style={styles.bankName}>{item.namaBank}</Text>
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            <TopNavbar back linkBack={() => navigation.goBack()} title='Metode Pembayaran' />
            <View style={styles.mainContent}>
                {loading ? <>
                    <Gap height={20} />
                    <ContentLoader active paragraph pRows={0} tWidth={'100%'} />
                    <Gap height={10} />
                    <ContentLoader active paragraph pRows={1} tHeight={60} tWidth={"100%"} pWidth={["30%"]} />
                    <Gap height={10} />
                    <ContentLoader active paragraph pRows={1} tHeight={60} tWidth={"100%"} pWidth={["30%"]} />
                    <Gap height={10} />
                    <ContentLoader active paragraph pRows={1} tHeight={60} tWidth={"100%"} pWidth={["30%"]} />
                    <Gap height={10} />
                    <ContentLoader active paragraph pRows={1} tHeight={60} tWidth={"100%"} pWidth={["30%"]} />
                    <Gap height={10} />
                    <ContentLoader active paragraph pRows={1} tHeight={60} tWidth={"100%"} pWidth={["30%"]} />
                    <Gap height={10} />
                    <ContentLoader active paragraph pRows={1} tHeight={60} tWidth={"100%"} pWidth={["30%"]} />
                </> :
                    <>
                        <Gap height={20} />
                        <Text style={styles.textInfo}>Silakan pilih media pembayaran favorit Anda untuk melanjutkan pembayaran</Text>
                        <Gap height={20} />
                        <FlatList
                            data={paymentMethodData}
                            renderItem={PaymentMethodList}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={item => item.namaBank}

                        />
                    </>
                }
            </View>
        </View>
    )
}

export default CoperationMemberSavingPaymentMethod

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    mainContent: {
        paddingHorizontal: 18,
        flex: 1
    },
    paymentItem: {
        marginBottom: 20,
        alignItems: 'center',
        borderWidth: 0.6,
        borderColor: colors.border,
        paddingVertical: 20,
        borderRadius: 6
    },
    paymentImage: {
        width: '100%',
        height: 60,
        resizeMode: 'contain'
    },
    textInfo: {
        color: colors.text.black,
        fontFamily: fonts.primary[600],
        lineHeight: 20
    },
    bankName: {
        color: colors.text.black,
        fontFamily: fonts.primary[600]
    }
})
