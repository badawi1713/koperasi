import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ICPhoneData } from '../../../../assets';
import { colors, fonts } from '../../../../utils';
import { Gap } from '../../atoms';
const PhoneDataContent = ({ dataConfirmation }) => {
    return (
        <View style={styles.content}>
            <TouchableOpacity
                style={styles.card}
                onPress={dataConfirmation}>
                <View style={styles.icon}>
                    <ICPhoneData width={36} height={36} />
                </View>
                <Gap width={20} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.header}>Data 12 GB</Text>
                    <Gap height={5} />
                    <Text style={styles.text}>12GB Kuota Utama pada Semua Jaringan dan Semua Zona + 2GB Videomax</Text>
                    <Gap height={5} />
                    <Text><Text style={styles.price}>Rp 103.000</Text> <Text style={styles.text}>• Aktif untuk 30 hari</Text></Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.card}
                onPress={dataConfirmation}>
                <View style={styles.icon}>
                    <ICPhoneData width={40} height={40} />
                </View>
                <Gap width={20} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.header}>Data 4.5 GB</Text>
                    <Gap height={5} />
                    <Text style={styles.text}>4.5GB Kuota Utama + 2GB Video</Text>
                    <Gap height={5} />
                    <Text><Text style={styles.price}>Rp 40.000</Text> <Text style={styles.text}>• Aktif untuk 30 hari</Text></Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.card}
                onPress={dataConfirmation}>
                <View style={styles.icon}>
                    <ICPhoneData width={40} height={40} />
                </View>
                <Gap width={20} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.header}>Data 50 GB</Text>
                    <Gap height={5} />
                    <Text style={styles.text}>50GB Kuota Utama pada Semua Jaringan dan Semua Zona + 2GB Videomax</Text>
                    <Gap height={5} />
                    <Text><Text style={styles.price}>Rp 203.500</Text> <Text style={styles.text}>• Aktif untuk 30 hari</Text></Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.card}
                onPress={dataConfirmation}>
                <View style={styles.icon}>
                    <ICPhoneData width={40} height={40} />
                </View>
                <Gap width={20} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.header}>Data 8 GB</Text>
                    <Gap height={5} />
                    <Text style={styles.text}>8GB Kuota Utama + 2GB Vide</Text>
                    <Gap height={5} />
                    <Text><Text style={styles.price}>Rp 87.000</Text> <Text style={styles.text}>• Aktif untuk 30 hari</Text></Text>
                </View>
            </TouchableOpacity>
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
    }
})
