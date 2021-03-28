import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, ToastAndroid, TouchableOpacity, View } from "react-native";
import BarcodeMask from 'react-native-barcode-mask';
import { RNCamera } from 'react-native-camera';
import { ICBackArrow, ICFlashOff, ICFlashOn, ICImage } from "../../../assets/icons";
import { colors } from "../../../utils";
import { Gap } from "../../components/atoms";

const QRCamera = ({ navigation }) => {

    const [torchMode, setTorchMode] = useState(false);

    const torchModeHandler = () => {
        setTorchMode(!torchMode)
    }

    const onBarCodeRead = () => {
        ToastAndroid.show("Scan Kode QR Berhasil", ToastAndroid.SHORT);
    }

    return (
        <KeyboardAvoidingView style={styles.root}>
            <RNCamera
                onBarCodeRead={onBarCodeRead}
                style={styles.camera}
                flashMode={torchMode ? "torch" : "off"}
                captureAudio={false}
                type='back'
            >
                <BarcodeMask
                    width={250} height={250} outerMaskOpacity={0.6}
                />
                <View style={styles.buttonGroup}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}><ICBackArrow width={18} height={18} /></TouchableOpacity>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity style={styles.button}><ICImage width={18} height={18} /></TouchableOpacity>
                        <Gap width={10} />
                        <TouchableOpacity onPress={torchModeHandler} style={styles.button}>{torchMode ?
                            <ICFlashOn width={18} height={18} /> : <ICFlashOff width={18} height={18} />
                        }</TouchableOpacity>
                    </View>

                </View>
            </RNCamera>
        </KeyboardAvoidingView>

    )

}

export default QRCamera;


const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        padding: 10,
        backgroundColor: colors.white,
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18
    },
    camera: {
        flex: 1,
        padding: 18
    },
})