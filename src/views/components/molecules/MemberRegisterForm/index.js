import moment from 'moment';
import React, { useState } from 'react';
import {
    ScrollView, StyleSheet, Text,
    TextInput,
    TouchableOpacity, View, Platform
} from 'react-native';
import { Controller, useForm } from "react-hook-form";
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from 'react-redux';
import { ICAdd, ICalendar, ICImage } from '../../../../assets';
import { changeProfile, registerMemberProfile } from '../../../../store/actions';
import { colors, fonts } from '../../../../utils';
import { Button, Gap } from '../../../components';

const createFormData = (file, body = {}) => {
    const data = new FormData();

    data.append('ktp', {
        name: file.fileName,
        type: file.type,
        uri: Platform.OS === 'ios' ? file.uri.replace('file://', '') : file.uri,
    });

    Object.keys(body).forEach((key) => {
        data.append(key, body[key]);
    });

    return data;
};

const MemberRegisterForm = () => {
    const dispatch = useDispatch();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [tanggalLahirError, setTanggalLahirError] = useState(false);
    const [ktpError, setKtpError] = useState(false);
    const [ktpErrorMessage, setKtpErrorMessage] = useState("")

    const profileReducer = useSelector(state => state.profileReducer);
    const { memberProfile, registerLoading, userProfile: { name } } = profileReducer;
    const { nama, ktp, noKtp, tempatLahir, tanggalLahir, alamat, } = memberProfile;

    const { control, handleSubmit, errors } = useForm();

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = async (date) => {
        const selectedDate = await moment(date).format('YYYY-MM-DD')
        await dispatch(changeProfile({ memberProfile: { ...memberProfile, tanggalLahir: selectedDate } }))
        await hideDatePicker();
        setTanggalLahirError(false)
    };

    const openGalleryHandler = async () => {
        await launchImageLibrary({ noData: true }, async (response) => {
            if (response.didCancel) {
                await dispatch(changeProfile({ memberProfile: { ...memberProfile, ktp: [] } }))
                setKtpError(true)
                setKtpErrorMessage("Berkas KTP belum dipilih")
            } else {
                if (response.fileSize > 1048576) {
                    await dispatch(changeProfile({ memberProfile: { ...memberProfile, ktp: [] } }))
                    setKtpError(true)
                    setKtpErrorMessage("Ukuran berkas KTP maksimal 1 MB")

                }
                else {
                    await dispatch(changeProfile({ memberProfile: { ...memberProfile, ktp: response } }))
                    setKtpError(false)
                    setKtpErrorMessage("")
                }
            }
        });
    };

    const postMemberProfileHandler = async () => {
        dispatch(changeProfile({ registerLoading: true }))
        if (tanggalLahir === "" && ktp.length === 0) {
            setKtpError(true)
            setKtpErrorMessage("Berkas KTP belum dipilih")
            setTanggalLahirError(true)
            dispatch(changeProfile({ registerLoading: false }))

        } else if (tanggalLahir === "") {
            setTanggalLahirError(true)
            dispatch(changeProfile({ registerLoading: false }))
        } else if (ktp.length === 0) {
            setKtpError(true)
            setKtpErrorMessage("Berkas KTP belum dipilih")
            dispatch(changeProfile({ registerLoading: false }))

        } else {
            dispatch(changeProfile({ registerLoading: false }))
            setKtpError(false)
            setKtpErrorMessage("")
            setTanggalLahirError(false)
            const data = await createFormData(ktp, { nama, noKtp, tempatLahir, tanggalLahir, alamat });
            await dispatch(registerMemberProfile(data))

        }

    };


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <View style={styles.content}>
                <Text numberOfLines={2} style={styles.text}>Hai, {name}</Text>
                <Text style={styles.text}>Isi data diri kamu!</Text>
                <Gap height={20} />
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nama Lengkap</Text>
                    <View style={styles.inputContainer}>
                        <Controller
                            control={control}
                            render={({ onChange, onBlur, value }) => (
                                <TextInput
                                    placeholderTextColor={colors.text.grey1}

                                    onBlur={onBlur}
                                    style={styles.textInput}
                                    placeholder="Nama Lengkap"
                                    keyboardType="name-phone-pad"
                                    value={value}
                                    onChangeText={(e) => { onChange(e); dispatch(changeProfile({ memberProfile: { ...memberProfile, nama: e } })); }}
                                />
                            )}
                            name="nama"
                            rules={{ required: true }}
                            defaultValue={name}
                        />
                    </View>
                    {errors.nama && <>
                        <Gap height={5} />
                        <Text style={styles.errorText}>Nama lengkap harus diisi</Text>
                    </>}
                </View>
                <Gap height={10} />
                <TouchableOpacity style={styles.uploadContainer(ktp.length === 0)} onPress={openGalleryHandler}>
                    {ktp.length === 0 ? <ICAdd /> : <ICImage />}
                    <Gap width={10} />
                    <Text numberOfLines={1} ellipsizeMode='middle' style={styles.buttonText(ktp.length === 0)}>{ktp.length === 0 ? "Upload KTP" : ktp.fileName}</Text>
                </TouchableOpacity>
                {ktpError && <>
                    <Gap height={5} />
                    <Text style={styles.errorText}>{ktpErrorMessage}</Text>
                </>}

                <Gap height={10} />
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nomor Identitas KTP</Text>
                    <View style={styles.inputContainer}>
                        <Controller
                            control={control}
                            render={({ onChange, onBlur, value }) => (
                                <TextInput
                                    placeholderTextColor={colors.text.grey1}

                                    onBlur={onBlur}
                                    style={styles.textInput}
                                    value={value}
                                    placeholder="Nomor KTP"
                                    keyboardType='number-pad'
                                    onChangeText={(e) => {
                                        onChange(e)
                                        dispatch(changeProfile({ memberProfile: { ...memberProfile, noKtp: e } }))
                                    }}
                                />
                            )}
                            name="ktp"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                    </View>
                    {errors.ktp && <>
                        <Gap height={5} />
                        <Text style={styles.errorText}>Nomor KTP harus diisi</Text>
                    </>}
                </View>
                <Gap height={10} />
                <View style={[styles.inputGroup, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                    <View style={{ width: "50%" }}>
                        <Text style={styles.label}>Tempat Lahir</Text>
                        <View style={styles.inputContainer}>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => (
                                    <TextInput
                                        placeholderTextColor={colors.text.grey1}
                                        onBlur={onBlur}
                                        style={styles.textInput}
                                        value={value}
                                        placeholder="Tempat Lahir"
                                        keyboardType="name-phone-pad"
                                        onChangeText={(e) => { onChange(e); dispatch(changeProfile({ memberProfile: { ...memberProfile, tempatLahir: e } })) }}
                                    />
                                )}
                                name="tempatLahir"
                                rules={{ required: true }}
                                defaultValue=""
                            />
                        </View>
                        {errors.tempatLahir && <>
                            <Gap height={5} />
                            <Text style={styles.errorText}>Tempat lahir harus diisi</Text>
                        </>}
                    </View>
                    <View style={{ width: "45%" }}>
                        <Text style={styles.label}>Tanggal Lahir</Text>
                        <TouchableOpacity style={styles.inputContainer} onPress={showDatePicker}>
                            <ICalendar />
                            <Gap width={5} />
                            <TextInput
                                style={styles.textInput}
                                placeholderTextColor={colors.text.grey1}
                                value={tanggalLahir}
                                editable={false}
                                placeholder="DD-MM-YYYY"
                            />
                        </TouchableOpacity>
                        {tanggalLahirError && <>
                            <Gap height={5} />
                            <Text style={styles.errorText}>Tanggal harus diisi</Text>
                        </>}
                    </View>
                </View>
                <Gap height={10} />
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Alamat</Text>
                    <View style={styles.inputAddressContainer}>
                        <Controller
                            control={control}
                            render={({ onChange, onBlur, value }) => (
                                <TextInput
                                    placeholderTextColor={colors.text.grey1}
                                    onBlur={onBlur}
                                    style={styles.textInput}
                                    value={value}
                                    placeholder="Alamat"
                                    keyboardType="name-phone-pad"
                                    multiline={true}
                                    onChangeText={(e) => { onChange(e); dispatch(changeProfile({ memberProfile: { ...memberProfile, alamat: e } })) }}
                                />
                            )}
                            name="alamat"
                            rules={{ required: true }}
                            defaultValue=""
                        />

                    </View>
                    {errors.alamat && <>
                        <Gap height={5} />
                        <Text style={styles.errorText}>Alamat harus diisi</Text>
                    </>}
                </View>
                {/* <Gap height={10} />
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Pilih Koperasi</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Pilih Koperasi"
                        />
                    </View>
                </View> */}
                <Gap height={20} />
                <Text style={styles.text}>Dengan mendaftar sebagai anggotaa koperasi berarti kamu menyetujui
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
                <Button loading={registerLoading} onPress={
                    handleSubmit(postMemberProfileHandler)
                } title="Daftar Anggota Koperasi" variant="primary" fullWidth />
            </View>
        </ScrollView>
    );
};

export default MemberRegisterForm;

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
    inputAddressContainer: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 4,
        paddingHorizontal: 8,
        minHeight: 80,
    },
    uploadContainer: (ktpData) => ({
        borderWidth: 1,
        borderColor: colors.text.grey1,
        borderRadius: 4,
        padding: 14,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: ktpData ? 'center' : 'space-between'
    }),
    buttonText: (ktpData) => ({
        color: colors.text.header,
        fontSize: 14,
        fontFamily: fonts.primary[600],
        flex: ktpData ? 0 : 1,
    }),
    conditionTermContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    errorText: {
        fontFamily: fonts.primary.normal,
        color: colors.text.danger
    },
});
