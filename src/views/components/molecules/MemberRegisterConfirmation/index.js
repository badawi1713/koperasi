import React, {useState, useEffect} from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { IMGAccountConfirmation } from '../../../../assets'
import { colors, fonts } from '../../../../utils'
import { Gap, Link, Button } from '../../../components'
import SelectPicker from 'react-native-form-select-picker'; // Import the package
import { getSavingCoperationMemberPaymentMethod, postRegistrationPayment, changeSavingCoperationMember} from '../../../../store/actions'
import {useSelector, useDispatch} from 'react-redux'
import { navigate} from '../../../../helpers/RootNavigation'

// const {paymentMethodData}  = 
const MemberRegisterConfirmation = ({ status }) => {
    const [selected, setSelected] = useState();
    const dispatch = useDispatch()
    const state = useSelector(state => state.savingCoperationMemberReducer)
    const stateProfileKoperasi = useSelector(state => state.profileReducer)
    const {paymentMethodData} = state;
    const {biayaPendaftaran, statusBayarPendaftaran} = stateProfileKoperasi;
    useEffect(() => {
        const getTopUpMethodList = () => {
            dispatch(getSavingCoperationMemberPaymentMethod())
        }
        return getTopUpMethodList()
    }, [dispatch])

    // const PaymentMethodList = ({ item }) => (
    //     <TouchableOpacity onPress={async () => {
            
    //     }} style={styles.paymentItem}>
    //         <Image style={styles.paymentImage} source={item.logo === "--" ? IMGCashOnDelivery : { uri: item.logo }} />
    //         <Gap height={10} />
    //         <Text style={styles.bankName}>{item.namaBank}</Text>
    //     </TouchableOpacity>
    // )

    const changeViaBayarHandler = (e) => {
        dispatch(changeSavingCoperationMember({
            viaPayment: e
        }))
    }
    
    return (
        <View style={styles.content}>
            <View style={styles.contentLogo}>
                <Text style={styles.title}>Status Akun</Text>
                <Gap height={10} />
                <Text style={styles.confirmationStatus}>{status === 2 ? "Mohon Maaf, Akun Anda sedang Dibekukan. Segera Hubungi Layanan Customer Service" : "Menunggu Konfirmasi"}</Text>
                <Gap height={20} />
                <Image source={IMGAccountConfirmation} style={styles.logo} />
                <Gap height={80} />
            </View>
            
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
                <Text style={{fontSize: 14, color: 'black' }}> Bayar Sebesar</Text>
                <Gap width={20} />
                <Text style={{paddingLeft: 10, fontSize: 14, borderWidth: 0.1, width: '50%', height: 37, borderRadius: 1, textAlignVertical:'center', backgroundColor: '#E0E0E0' }}> 
                {biayaPendaftaran}</Text>
            </View>
            <Gap height={10}/>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 14, textAlign: 'left', color: 'black'}}> Pilih Metode Pembayaran</Text>
                <Gap width={15} />
                <View style={{width: '50%', borderWidth: 0.2}}>
                    <SelectPicker 
                        onValueChange={(value) => {
                            setSelected(value)
                            changeViaBayarHandler(value)
                        }}
                        placeholder='Pilih '
                        selected={selected}
                    >
                        
                        {Object.values(paymentMethodData).map((val, index) => (
                            <SelectPicker.Item label={val.namaBank} value={val.idBank} key={index} />
                        ))}

                    </SelectPicker>
                </View>
            </View>
            <Gap height={10}/>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
                <Text style={{fontSize: 14, color: 'black' }}> Status Pembayaran</Text>
                <Gap width={20} />
                <Text style={ statusBayarPendaftaran == 'Belum ada pembayaran' ? styles.statusPendaftaranInvalid : styles.statusPendaftaranValid}> 
                    {statusBayarPendaftaran}
                </Text>
            </View>
            <Gap height={20}/>
            <Button fullWidth title="Bayar Sekarang" onPress={async () => {
                    await dispatch(postRegistrationPayment())
                }} variant="primary" 
            />
            <Gap height={70}/>
            <Link title="Lihat Riwayat Pembayaran" onPress={() => navigate('CoperationRegisterHistory')} />
        </View>
    );
};

export default MemberRegisterConfirmation

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 18,
    },
    contentLogo: {
        flex: 0.9,
        justifyContent: 'center',
        padding: 18,
        alignItems: 'center'
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 16,
        fontFamily: fonts.primary[700]
    },
    confirmationStatus: {
        fontSize: 16,
        fontFamily: fonts.primary[700],
        color: colors.text.danger
    },
    statusPendaftaranInvalid : {
        fontSize: 14, 
        color: 'red', 
        width: '50%', 
        height: 37, 
        borderRadius: 1, 
        textAlignVertical:'center'
    },
    statusPendaftaranValid : {
        fontSize: 14, 
        color: colors.text.green1, 
        width: '50%', 
        height: 37, 
        borderRadius: 1, 
        textAlignVertical:'center'
    }
})