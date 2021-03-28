import { ToastAndroid } from "react-native";

export const showMessage = (message = "Message") => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
};