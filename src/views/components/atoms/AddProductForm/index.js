import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import {
    BackHandler,
    Image, Platform,
    StyleSheet, Text,
    TouchableOpacity, View
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { ICAdd } from '../../../../assets';
import { changeProduct } from '../../../../store/actions';
import { colors, fonts } from '../../../../utils';
import { Button, DialogOptions, Gap } from '../../atoms';

const theme = { colors: { primary: colors.background.green1, placeholder: colors.text.grey1, accent: colors.text.grey1 } }

const createFormData = (file, body = {}) => {
    const data = new FormData();

    data.append('gambar', {
        name: file.fileName,
        type: file.type,
        uri: Platform.OS === 'ios' ? file.uri.replace('file://', '') : file.uri,
    });

    Object.keys(body).forEach((key) => {
        data.append(key, body[key]);
    });

    return data;
};

const AddProductForm = ({ handleBackButtonClick }) => {

    const dispatch = useDispatch()

    const [gambarError, setGambarError] = useState(false);
    const [gambarErrorMessage, setGambarErrorMessage] = useState("")

    const [showCategory, setShowCategory] = useState(false);

    const productReducer = useSelector(state => state.productReducer)

    const { newProductData, loading } = productReducer
    const { namaProduk, kategori, harga, berat, stok, kondisi, deksripsi, gambar } = newProductData

    const { control, handleSubmit, errors, watch } = useForm();

    const conditionCategory = [{ value: "Bekas", label: "Bekas" }, { value: "Baru", label: "Baru" }]


    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);


    const openGalleryHandler = async () => {
        await launchImageLibrary({ noData: true }, async (response) => {
            if (response.didCancel) {
                await dispatch(changeProduct({ newProductData: { ...newProductData, gambar: [] } }))
                setGambarError(true)
                setGambarErrorMessage("Berkas gambar belum dipilih")
            }
            else {
                if (response.fileSize > 1048576) {
                    await dispatch(changeProduct({ newProductData: { ...newProductData, gambar: [] } }))
                    setGambarError(true)
                    setGambarErrorMessage("Ukuran gambar maksimal 1 MB")

                }
                else {
                    const imageData = [...gambar, response]
                    await dispatch(changeProduct({ newProductData: { ...newProductData, gambar: imageData } }))
                    setGambarError(false)
                    setGambarErrorMessage("")
                }
            }
        })
    }

    const removeImageHandler = (index) => {
        const imageData = [...gambar]
        imageData.splice(index, 1)
        dispatch(changeProduct({ newProductData: { ...newProductData, gambar: imageData } }))


    }

    const postProductData = async () => {
        console.log("SUCCESS")
    };

    const hideCategoryModal = () => {
        setShowCategory(false)
    }

    const showCategoryModal = () => {
        setShowCategory(true)
    }

    const changeCategoryHandler = (e) => {
        dispatch(changeProduct({ newProductData: { ...newProductData, kategori: e } }))
    }

    const cancelCategoryHandler = () => {
        setShowCategory(false)
        dispatch(changeProduct({ newProductData: { ...newProductData, kategori: "" } }))
    }

    return (<View style={styles.mainContent}>
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Nama Produk</Text>
            <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                    <TextInput
                        theme={theme}
                        mode='outlined'
                        placeholderTextColor={colors.text.grey1}
                        onBlur={onBlur}
                        style={styles.textInput}
                        placeholder="Nama Produk"
                        keyboardType="name-phone-pad"
                        value={value}
                        onChangeText={(e) => {
                            onChange(e);
                            dispatch(changeProduct({ newProductData: { ...newProductData, namaProduk: e } }));
                        }}
                    />
                )}
                name="namaProduk"
                rules={{ required: true }}
                defaultValue=""
            />
            {errors.namaProduk && <>
                <Gap height={5} />
                <Text style={styles.errorText}>Nama produk harus dipilih</Text>
            </>}
        </View>
        <Gap height={10} />
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Kategori</Text>
            <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                    <TouchableOpacity onPress={showCategoryModal}>
                        <DialogOptions title='Pilih Kategori Produk' options={conditionCategory} visible={showCategory} value={value} onCancel={() => { cancelCategoryHandler(); onChange("") }} onValueChange={(e) => { onChange(e); changeCategoryHandler(e) }} hideDialog={hideCategoryModal} />
                        <TextInput
                            placeholderTextColor={colors.text.grey1}
                            theme={theme}
                            mode='outlined'
                            style={styles.textInput}
                            placeholder="Pilih Kategori"
                            keyboardType="name-phone-pad"
                            value={value}
                            editable={false}
                        />
                    </TouchableOpacity>
                )}
                name="kategori"
                rules={{ required: true }}
                defaultValue={""}
            />
            {errors.kategori && <>
                <Gap height={5} />
                <Text style={styles.errorText}>Kategori harus dipilih</Text>
            </>}
        </View>
        <Gap height={10} />
        <View style={[styles.inputGroup, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <View style={{ width: "48%" }}>
                <Text style={styles.label}>Harga</Text>
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            theme={theme}
                            mode='outlined'
                            placeholderTextColor={colors.text.grey1}
                            onBlur={onBlur}
                            style={styles.textInput}
                            value={value}
                            placeholder="Rp 0"
                            keyboardType='decimal-pad'
                            onChangeText={(e) => { onChange(e); dispatch(changeProduct({ newProductData: { ...newProductData, harga: e } })) }}
                        />
                    )}
                    name="harga"
                    rules={{ required: true }}
                    defaultValue=""
                />
                {errors.harga && <>
                    <Gap height={5} />
                    <Text style={styles.errorText}>Harga harus diisi</Text>
                </>}
            </View>
            <View style={{ width: "48%" }}>
                <Text style={styles.label}>Berat</Text>
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            theme={theme}
                            mode='outlined'
                            placeholderTextColor={colors.text.grey1}
                            onBlur={onBlur}
                            style={styles.textInput}
                            value={value}
                            placeholder="0 gram"
                            keyboardType='decimal-pad'
                            onChangeText={(e) => { onChange(e); dispatch(changeProduct({ newProductData: { ...newProductData, berat: e } })) }}

                        />
                    )}
                    name="berat"
                    rules={{ required: true }}
                    defaultValue=""
                />
                {errors.berat && <>
                    <Gap height={5} />
                    <Text style={styles.errorText}>Berat produk harus diisi</Text>
                </>}
            </View>
        </View>
        <Gap height={10} />
        <View style={[styles.inputGroup, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <View style={{ width: "48%" }}>
                <Text style={styles.label}>Stok Produk</Text>
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            theme={theme}
                            mode='outlined'
                            placeholderTextColor={colors.text.grey1}
                            onBlur={onBlur}
                            style={styles.textInput}
                            value={value}
                            placeholder="0"
                            keyboardType='decimal-pad'
                            onChangeText={(e) => { onChange(e); dispatch(changeProduct({ newProductData: { ...newProductData, stokProduk: e } })) }}

                        />
                    )}
                    name="stokProduk"
                    rules={{ required: true }}
                    defaultValue=""
                />
                {errors.stokProduk && <>
                    <Gap height={5} />
                    <Text style={styles.errorText}>Stok harus diisi</Text>
                </>}
            </View>
            <View style={{ width: "48%" }}>
                <Text style={styles.label}>Kondisi Produk</Text>
                <Controller
                    control={control}
                    render={({ onChange, onBlur, value }) => (
                        <TextInput
                            theme={theme}
                            mode='outlined'
                            placeholderTextColor={colors.text.grey1}
                            onBlur={onBlur}
                            style={styles.textInput}
                            value={value}
                            placeholder="Pilih Kondisi"
                            keyboardType="name-phone-pad"
                            onChangeText={(e) => { onChange(e); dispatch(changeProduct({ newProductData: { ...newProductData, kondisi: e } })) }}
                        />
                    )}
                    name="kondisi"
                    rules={{ required: true }}
                    defaultValue=""
                />
                {errors.kondisi && <>
                    <Gap height={5} />
                    <Text style={styles.errorText}>Kondisi harus dipilih</Text>
                </>}
            </View>
        </View>
        <Gap height={10} />
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Deskripsi</Text>
            <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                    <TextInput
                        theme={theme}
                        mode='outlined'
                        placeholderTextColor={colors.text.grey1}
                        onBlur={onBlur}
                        style={styles.textInput}
                        value={value}
                        placeholder="Deskripsi Produk"
                        keyboardType="name-phone-pad"
                        multiline={true}
                        onChangeText={(e) => { onChange(e) }}
                    />
                )}
                name="deskripsi"
                rules={{ required: true }}
                defaultValue=""
            />
            {errors.deskripsi && <>
                <Gap height={5} />
                <Text style={styles.errorText}>Deskripsi produk harus diisi</Text>
            </>}
        </View>
        <Gap height={20} />
        {gambar.length === 0 ?
            <TouchableOpacity style={styles.uploadContainer} onPress={openGalleryHandler}>
                <ICAdd />
                <Gap width={10} />
                <Text numberOfLines={1} ellipsizeMode='middle' style={styles.buttonText}>Upload Foto Produk</Text>
            </TouchableOpacity> :
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                {gambar.map((item, index) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginTop: index >= 3 ? 20 : 0 }}>
                        <View>
                            <TouchableOpacity onPress={() => removeImageHandler(index)} style={{ position: 'absolute', right: -10, top: -4, zIndex: 1 }}>
                                <Icon name="trash" size={20} color={colors.text.red1} solid />
                            </TouchableOpacity>
                            <Image key={index} style={{
                                width: 100,
                                height: 100,
                                borderRadius: 6, borderColor: colors.border, borderWidth: 0.7,
                            }} source={{ uri: gambar[index].uri }} />
                        </View>
                        <Gap width={14} />
                    </View>
                ))

                }
                {gambar.length < 5 && <TouchableOpacity style={{ backgroundColor: colors.white, alignItems: 'center', width: 100, height: 100, borderRadius: 6, borderColor: colors.border, borderWidth: 0.7, justifyContent: 'center', marginTop: gambar.length === 3 ? 20 : 0 }} onPress={openGalleryHandler}>
                    <ICAdd />
                </TouchableOpacity>}
            </View>
        }
        {
            gambarError && <>
                <Gap height={5} />
                <Text style={styles.errorText}>{gambarErrorMessage}</Text>
            </>
        }

        <Gap height={20} />
        <Button onPress={
            handleSubmit(postProductData)
        } title="Tambah Produk" variant="primary" fullWidth />
    </View >)
}

export default AddProductForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    mainContent: {
        padding: 18,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 18,
        flex: 1
    },
    imageContainer: {
        width: 300,
        height: 200,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    titleText: {
        color: colors.black,
        fontFamily: fonts.primary[700],
        fontSize: 20,
        textAlign: 'center',
    },
    subtitleText: {
        color: colors.black,
        fontFamily: fonts.primary.normal,
        textAlign: 'center',
        fontSize: 13,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    storeTitle: {
        color: colors.text.header,
        fontFamily: fonts.primary[700],
        fontSize: 18,
    },
    headerText: {
        color: colors.text.header,
        fontFamily: fonts.primary[700],
        fontSize: 16,
    },
    text: {
        color: colors.text.header,
        fontFamily: fonts.primary[600],
        fontSize: 13,
    },
    errorText: {
        fontFamily: fonts.primary.normal,
        color: colors.text.danger
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
        color: colors.black,
        backgroundColor: colors.white,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 4,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputAddressContainer: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 4,
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
        justifyContent: 'center'
    },
    buttonText: {
        color: colors.text.header,
        fontSize: 14,
        fontFamily: fonts.primary[600],
        flex: 1,
        justifyContent: 'center'
    },
    conditionTermContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
});
