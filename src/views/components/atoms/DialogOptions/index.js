import React from 'react';
import { Button, Dialog, Portal, RadioButton } from 'react-native-paper';
import { colors, fonts } from '../../../../utils';

const DialogOptions = ({ title = "Judul", options = [], visible, hideDialog, onCancel, onValueChange, value }) => {
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title style={{ fontFamily: fonts.primary[400] }}>{title}</Dialog.Title>
                <Dialog.Content>
                    <RadioButton.Group onValueChange={(e) => onValueChange(e)} value={value}>
                        {options.map((item, index) => (
                            <RadioButton.Item label={item.label} key={index} labelStyle={{ fontFamily: fonts.primary[400] }} value={item.value} color={colors.background.green1} uncheckedColor={colors.background.grey2} />

                        ))}
                    </RadioButton.Group>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button theme={{ colors: { primary: colors.text.grey1 } }} onPress={onCancel}>Batal</Button>
                    <Button theme={{ colors: { primary: colors.text.green1 } }} onPress={hideDialog}>Pilih</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

export default DialogOptions
