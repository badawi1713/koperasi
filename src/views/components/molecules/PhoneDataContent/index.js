import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ICPhoneData, IMGNoData } from '../../../../assets';
import { colors, fonts } from '../../../../utils';
import { Gap } from '../../atoms';
const PhoneDataContent = ({ dataConfirmation, content = [] }) => {
    return (
        <View style={styles.content}>

            {content.length === 0 ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><IMGNoData width={120} height={140} />
                <Text style={styles.textEmpty}>Maaf, produk paket data tidak tersedia</Text>
            </View> :
                content.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.card}
                        onPress={dataConfirmation}>
                        <View style={styles.icon}>
                            <ICPhoneData width={36} height={36} />
                        </View>
                        <Gap width={20} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.header}>{item.produkNama}</Text>
                            <Gap height={5} />
                            <Text style={styles.text}>{item.produkKeterangan}</Text>
                            <Gap height={5} />
                            <Text><Text style={styles.price}>{item.produkHarga}</Text> <Text style={styles.text}>• Aktif untuk 30 hari</Text></Text>
                        </View>
                    </TouchableOpacity>
                ))}

        </View>
    )
}

export default PhoneDataContent;

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 18,
        width: '100%'
    },
    card: {
        borderBottomColor: colors.border,
        borderBottomWidth: 1,
        backgroundColor: colors.white,
        flexDirection: 'row',
        paddingBottom: 20,
        paddingHorizontal: 16,
        marginBottom: 20,
        alignItems: 'center'
    },
    icon: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: 6
    },
    header: {
        color: colors.black,
        fontSize: 18,
        fontFamily: fonts.primary[700],
    },
    price: {
        color: colors.black,
        fontSize: 16,
        fontFamily: fonts.primary[600],
    },
    text: {
        color: colors.text.header,
        fontSize: 14,
        fontFamily: fonts.primary[400],
    },
    textEmpty: {
        color: colors.text.header,
        fontSize: 16,
        fontFamily: fonts.primary[600],
    }
})
