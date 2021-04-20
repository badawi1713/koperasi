import React from 'react';
import {
    ScrollView, StyleSheet, Text,
    TextInput,
    TouchableOpacity, View
} from 'react-native';
import { ICAdd } from '../../../../assets';
import { colors, fonts } from '../../../../utils';
import { Button, Gap } from '../../../components';
const CoperationRegisterForm = ({ registerHandler }) => {

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                <Text style={styles.text}>Isi data koperasi kamu!</Text>
                <Gap height={20} />
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nama Toko Koperasi</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Nama Toko Koperasi"
                            keyboardType="name-phone-pad"
                        />
                    </View>
                </View>
                <Gap height={10} />
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Kota/Kecamatan</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Kota atau Kecamatan"
                            keyboardType="name-phone-pad"
                        />
                    </View>
                </View>
                <Gap height={10} />
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Kode Pos</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Nomor Kode Pos"
                            keyboardType='number-pad'
                        />
                    </View>
                </View>
                <Gap height={10} />
                <TouchableOpacity style={styles.uploadContainer}>
                    <ICAdd />
                    <Text style={styles.buttonText}>Upload Akta Pendirian Koperasi</Text>
                </TouchableOpacity>
                <Gap height={10} />
                <TouchableOpacity style={styles.uploadContainer}>
                    <ICAdd />
                    <Text style={styles.buttonText}>Upload KTP Penanggung Jawab</Text>
                </TouchableOpacity>
                <Gap height={20} />
                <Text style={styles.text}>Dengan daftar koperasi berarti kamu menyetujui
                            <Text
                        style={{
                            color: colors.text.danger,
                            fontSize: 14,
                            fontFamily: fonts.primary[700],
                        }}> Syarat dan Ketentuan</Text>
                    <Text style={styles.text}> & </Text>
                    <Text
                        style={{
                            color: colors.text.danger,
                            fontSize: 14,
                            fontFamily: fonts.primary[700],
                        }}>Kebijakan Privasi</Text>
                </Text>

                <Gap height={20} />
                <Button onPress={registerHandler} title="Daftar Koperasi" variant="primary" fullWidth />
            </View>
        </ScrollView>
    );
};

export default CoperationRegisterForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    content: {
        width: '100%',
        padding: 18,
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        color: colors.text.header,
        fontFamily: fonts.primary[600],
        textAlign: 'center'
    },
    inputGroup: {
        width: '100%'
    },
    label: {
        fontSize: 14,
        color: colors.text.header,
        fontFamily: fonts.primary[400],
        marginBottom: 5
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 4,
        paddingHorizontal: 8,
        width: '100%',
    },
    inputAddressContainer: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 4,
        paddingHorizontal: 8,
        minHeight: 80,
    },
    uploadContainer: {
        borderWidth: 1,
        borderColor: colors.text.grey1,
        borderRadius: 4,
        padding: 14,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: colors.text.header,
        fontSize: 14,
        fontFamily: fonts.primary[600],
        marginLeft: 20,
    },
    conditionTermContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
});
