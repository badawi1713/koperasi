import React from 'react';
import {
    Image,
    ScrollView, StyleSheet, Text,
    View
} from 'react-native';
import { useSelector } from 'react-redux';
import { ICSavings, IMGDefaultUser, ICTotalBudget } from '../../../../assets';
import { colors, fonts } from '../../../../utils';
import { Button, Gap } from '../../../components';
import * as Navigation from '../../../../helpers/RootNavigation'
import NumberFormat from 'react-number-format';

const MemberProfile = () => {
    const profileReducer = useSelector(state => state.profileReducer)

    const { transactionHistory, userProfile: { name, id }, totalSaving } = profileReducer;

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image source={IMGDefaultUser} style={styles.profileImage} />
                <Gap height={10} />
                <Text style={styles.textTitle}>{name}</Text>
                <Gap height={5} />
                <Text style={styles.textSubtitle}>Koperasi Charisma</Text>
                <Text style={styles.textSubtitle}>Nomor Anggota {id}</Text>
                <Gap height={20} />

                <View style={styles.buttonGroup}>
                    <View style={styles.buttonItem}>
                        <Button onPress={() => Navigation.navigate('CoperationMemberSaving')} fullWidth title='Simpanan' variant='primary' />
                    </View>
                    <View style={styles.buttonItem}>
                        <Button onPress={() => Navigation.navigate('CoperationMemberLoan')} fullWidth title='Pinjaman' />
                    </View>
                </View>
            </View>
            <Gap height={20} />
            <View style={styles.section}>
                <View style={styles.row}>
                    <ICTotalBudget width={28} height={28} />
                    <Gap width={10} />
                    <Text style={styles.text}>Total Simpanan</Text>
                </View>
                <NumberFormat value={totalSaving || 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} renderText={value =>
                    <Text style={styles.text}>Rp {value}</Text>

                } />
            </View>

            <Gap height={20} />
            <View style={styles.content}>
                <Text style={styles.text}>Riwayat Transaksi</Text>
            </View>

            {transactionHistory.length === 0 ?
                <>
                    <Gap height={30} />
                    <Text style={styles.textTitle}>Tidak Ada Riwayat Transaksi</Text>
                </> :
                <ScrollView showsVerticalScrollIndicator={false}>
                    {transactionHistory.map((item, index) => (
                        <View key={index}>
                            <View style={styles.section}>
                                <View style={styles.row}>
                                    <ICSavings width={28} height={28} />
                                    <Gap width={10} />
                                    <View>
                                        <Text style={styles.text}>{item.historyTitle || "Setoran"}</Text>
                                        <Gap height={5} />
                                        <NumberFormat value={item.historyNominal || 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} renderText={value =>
                                            <Text style={styles.text}>Rp {value}</Text>

                                        } />
                                    </View>
                                </View>
                                <Text style={styles.textStatus(item.historyStatus)}>
                                    {item.historyStatus}
                                </Text>
                            </View>
                            <Gap height={10} />
                        </View>

                    ))}

                    <Gap height={20} />


                </ScrollView>

            }
        </View>
    );
};

export default MemberProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.grey5,
    },
    content: {
        width: '100%',
        padding: 18,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: colors.border,
        alignSelf: 'center'
    },
    text: {
        fontSize: 14,
        color: colors.black,
        fontFamily: fonts.primary[600],
    },
    textStatus: (status) => ({
        fontSize: 14,
        color: status === "Berhasil" ? colors.text.green1 : colors.text.danger,
        fontFamily: fonts.primary[600],
    }),
    textTitle: {
        fontSize: 16,
        color: colors.text.header,
        fontFamily: fonts.primary[600],
        textAlign: 'center'
    },
    textSubtitle: {
        fontSize: 14,
        color: colors.text.dark1,
        fontFamily: fonts.primary[600],
        textAlign: 'center'
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonItem: {
        width: '48%'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 18,
        backgroundColor: colors.white
    }
});
