import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IMGNoData } from '../../../../assets';
import { colors, fonts } from '../../../../utils';
const PulsaContent = ({ pulsaConfirmation, content = [] }) => {
    return (
        <View style={styles.content}>

            {content.length === 0 ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><IMGNoData width={120} height={140} />
                <Text style={styles.textEmpty}>Maaf, produk pulsa tidak tersedia</Text>
            </View> :
                content.map((item, index) => (
                    <TouchableOpacity
                        onPress={pulsaConfirmation}
                        style={styles.card}
                        key={index}
                    >
                        <Text style={styles.header}>{item.produkNama}</Text>
                        <Text style={styles.subHeader}>{item.produkHarga}</Text>
                    </TouchableOpacity>
                ))

            }

        </View>
    )
}

export default PulsaContent

const styles = StyleSheet.create({
    content: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingHorizontal: 18,
        justifyContent: 'space-between',
    },
    card: {
        paddingHorizontal: 16,
        paddingVertical: 18,
        backgroundColor: colors.primary,
        width: '48%',
        borderRadius: 16,
        height: 100,
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    header: {
        color: colors.white,
        fontSize: 18,
        fontFamily: fonts.primary[700],
    },
    subHeader: {
        color: colors.white,
        fontSize: 16,
        fontFamily: fonts.primary[600],
    },
    textEmpty: {
        color: colors.text.header,
        fontSize: 16,
        fontFamily: fonts.primary[600],
    }

})
