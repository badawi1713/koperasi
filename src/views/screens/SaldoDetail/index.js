import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    BackHandler, ScrollView,
    StyleSheet,
    Text,
    TextInput, TouchableOpacity,
    View
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { ICalendar, ICTotalBudget } from '../../../assets';
import { changeSaldoDetail, getSaldoTransactions } from '../../../store/actions';
import { colors, fonts } from '../../../utils';
import { Button, Gap, SaldoAllContent, SaldoRefundContent, TopNavbar } from '../../components';

const SaldoDetail = ({ navigation }) => {
    const dispatch = useDispatch()
    const [allTransactionActive, setAllTransactionActive] = useState(true);
    const [refundActive, setRefundActive] = useState(false);
    const [showStartDate, setShowStartDate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);

    const saldoDetailReducer = useSelector(state => state.saldoDetailReducer);
    const homeReducer = useSelector(state => state.homeReducer);
    const { saldoBalance } = homeReducer;

    const { startDate, endDate, allTransactionData, loading } = saldoDetailReducer

    const handleBackButtonClick = () => {
        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        dispatch(changeSaldoDetail({
            startDate: moment(firstDay).format("YYYY-MM-DD"),
            endDate: moment(lastDay).format("YYYY-MM-DD"),
        }))
    }

    const showStartDatePicker = () => {
        setShowStartDate(true)
    };

    const showEndDatePicker = () => {
        setShowEndDate(true)
    };

    const hideStartDatePicker = () => {
        setShowStartDate(false)
    };

    const hideEndDatePicker = () => {
        setShowEndDate(false)
    };

    const startDateHandler = async (date) => {
        const selectedDate = await moment(date).format('YYYY-MM-DD')
        await dispatch(changeSaldoDetail({ startDate: selectedDate }))
        await hideStartDatePicker();
        await dispatch(getSaldoTransactions())
    };

    const endDateHandler = async (date) => {
        const selectedDate = await moment(date).format('YYYY-MM-DD')
        await dispatch(changeSaldoDetail({ endDate: selectedDate }))
        await hideEndDatePicker();
        await dispatch(getSaldoTransactions())
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    useEffect(() => {
        const getInitialTransactionData = () => {
            dispatch(getSaldoTransactions())
        }
        return getInitialTransactionData()
    }, [dispatch])

    const pulsaTabHandler = () => {
        setAllTransactionActive(true);
        setRefundActive(false);
    };

    const paketDataTabHandler = () => {
        setRefundActive(true);
        setAllTransactionActive(false);
    };

    return (
        <>
            <DateTimePickerModal
                isVisible={showStartDate}
                mode="date"
                onConfirm={startDateHandler}
                onCancel={hideStartDatePicker}
            />
            <DateTimePickerModal
                isVisible={showEndDate}
                mode="date"
                onConfirm={endDateHandler}
                onCancel={hideEndDatePicker}
            />
            <View style={styles.container}>
                <TopNavbar title="Detail Saldo" back linkBack={() => {
                    navigation.goBack()
                    handleBackButtonClick()
                }
                } />

                <Gap height={20} />

                <View style={styles.topContent}>
                    <View style={styles.phoneNumberGroup}>
                        <ICTotalBudget width={24} height={24} />
                        <Gap width={15} />
                        <View style={styles.phoneNumberField}>
                            <Text style={styles.text}>Total Saldo Aktif</Text>
                            <NumberFormat value={saldoBalance || 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} renderText={value =>
                                <Text style={styles.saldoText} >Rp{value}</Text>
                            } />

                        </View>
                    </View>
                    <Gap height={20} />
                    <Button title='Tarik Saldo' variant='primary' fullWidth />
                </View>
                <Gap height={20} />
                <View style={{ width: '100%', borderBottomColor: colors.border, borderBottomWidth: 1 }} />
                <Gap height={20} />
                <View style={styles.topContent}>
                    <Text style={styles.header}>Riwayat Transaksi</Text>
                    <Gap height={10} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ width: "47%" }}>
                            <Text style={styles.label}>Tanggal Mulai</Text>
                            <TouchableOpacity style={styles.inputContainer} onPress={showStartDatePicker}>
                                <ICalendar />
                                <Gap width={5} />
                                <TextInput
                                    style={styles.textInput}
                                    placeholderTextColor={colors.text.grey1}
                                    editable={false}
                                    placeholder="DD-MM-YYYY"
                                    value={startDate}
                                />
                            </TouchableOpacity>

                        </View>
                        <View style={{ width: "47%" }}>
                            <Text style={styles.label}>Tanggal Akhir</Text>
                            <TouchableOpacity style={styles.inputContainer} onPress={showEndDatePicker}>
                                <ICalendar />
                                <Gap width={5} />
                                <TextInput
                                    style={styles.textInput}
                                    placeholderTextColor={colors.text.grey1}
                                    editable={false}
                                    placeholder="DD-MM-YYYY"
                                    value={endDate}
                                />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
                <Gap height={20} />
                <View style={styles.tabContent}>
                    <TouchableOpacity
                        onPress={pulsaTabHandler}
                        style={styles.pulsaTabButton(allTransactionActive)}>
                        <Text style={styles.pulsaTabTitle(allTransactionActive)}>Semua</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={paketDataTabHandler}
                        style={styles.paketDataTabButton(refundActive)}>
                        <Text style={styles.paketDataTabTitle(refundActive)}>
                            Refund
              </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.mainContent}>
                    {/* Pulsa Content */}

                    {loading ?
                        <View>
                            <Gap height={20} />
                            <ActivityIndicator size='large' color={colors.background.green1} />
                        </View>
                        :

                        allTransactionActive ?
                            <SaldoAllContent content={allTransactionData} />
                            :
                            <SaldoRefundContent content={[]} />
                    }

                    {/* Paket Data Content */}
                </View>

            </View>


        </>
    );
};

export default SaldoDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    topContent: {
        paddingHorizontal: 18,
    },
    phoneNumberGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#f1f1f1',
    },
    saldoText: {
        color: colors.text.primary,
        fontSize: 14,
        fontFamily: fonts.primary[600]
    },
    phoneNumberInput: {
        padding: 0,
        fontSize: 14,
        fontFamily: fonts.primary[600],
        color: colors.text.dark1
    },
    text: {
        color: colors.text.header,
        fontSize: 14,
        fontFamily: fonts.primary[400]
    },
    tabContent: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingHorizontal: 18,
    },
    pulsaTabButton: (active) => ({
        borderBottomWidth: active ? 2 : 0,
        borderBottomColor: colors.primary,
        paddingHorizontal: 14,
        paddingBottom: 14,
        alignItems: 'center',
    }),
    pulsaTabTitle: (active) => ({
        textAlign: 'center',
        fontSize: 16,
        fontFamily: fonts.primary[700],
        color: active ? colors.black : colors.text.header,
    }),
    paketDataTabButton: (active) => ({
        borderBottomWidth: active ? 2 : 0,
        borderBottomColor: colors.primary,
        paddingHorizontal: 14,
        paddingBottom: 14,
        alignItems: 'center',
    }),
    paketDataTabTitle: (active) => ({
        textAlign: 'center',
        fontSize: 16,
        fontFamily: fonts.primary[700],
        color: active ? colors.black : colors.text.header,
    }),
    mainContent: {
        flex: 1,
        justifyContent: 'center'
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
    totalText: {
        color: colors.text.header,
        fontSize: 16,
        fontFamily: fonts.primary[400]
    },
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
    header: {
        fontFamily: fonts.primary[600],
        fontSize: 16,
        color: colors.text.grey1
    },
    label: {
        fontSize: 13,
        color: colors.text.header,
        fontFamily: fonts.primary[400],
        marginBottom: 5
    },
    textInput: {
        flex: 1,
        color: colors.black
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 4,
        paddingHorizontal: 8,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },


});
