import React from 'react';
import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { IMGNoData } from '../../../../assets';
import { colors, fonts } from '../../../../utils';
import NumberFormat from 'react-number-format';
import { useDispatch } from 'react-redux';
import { changePulsa, getProductDetail } from '../../../../store/actions';

const PulsaContent = ({ pulsaConfirmation, content = [], phoneNumber, loading }) => {

    const dispatch = useDispatch()
    return (
        <View style={styles.content}>

            {content.length === 0 ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><IMGNoData width={120} height={140} />
                <Text style={styles.textEmpty}>Maaf, produk pulsa tidak tersedia</Text>
            </View> :
                content.map((item, index) => (
                    <TouchableOpacity
                        disabled={loading}
                        onPress={async () => {
                            if (phoneNumber.length < 10) {
                                ToastAndroid.show("Format digit nomor telepon tidak valid.", ToastAndroid.SHORT);
                            } else {
                                await dispatch(changePulsa({ produkId: item.produkId }))
                                await dispatch(getProductDetail())
                                await pulsaConfirmation()
                            }
                        }}
                        style={styles.card}
                        key={index}
                    >
                        <Text style={styles.header}>{item.produkKeterangan}</Text>
                        <NumberFormat value={item.produkHarga || 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} renderText={value =>
                            <Text style={styles.subHeader}>
                                {item.produkNama} • Rp {value}</Text>
                        } />
                    </TouchableOpacity>
                ))

            }

        </View>
    )
}

export default PulsaContent

const styles = StyleSheet.create({
    content: {
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
        height: 120,
        justifyContent: 'space-between',
        marginBottom: 20,
        elevation: 1
    },
    notes: {
        color: colors.white,
        fontSize: 13,
        fontFamily: fonts.primary[600],
    },
    header: {
        color: colors.white,
        fontSize: 14,
        fontFamily: fonts.primary[600],
    },
    subHeader: {
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
