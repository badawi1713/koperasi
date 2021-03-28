import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../../../../utils';
const PulsaContent = ({ pulsaConfirmation }) => {
    return (
        <View style={styles.content}>
            <TouchableOpacity
                style={styles.card}
                onPress={pulsaConfirmation}>
                <Text style={styles.header}>15rb</Text>
                <Text style={styles.subHeader}>Rp 16.500</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
                <Text style={styles.header}>20rb</Text>
                <Text style={styles.subHeader}>Rp 21.500</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
                <Text style={styles.header}>25rb</Text>
                <Text style={styles.subHeader}>Rp 26.500</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
                <Text style={styles.header}>30rb</Text>
                <Text style={styles.subHeader}>Rp 31.500</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
                <Text style={styles.header}>40rb</Text>
                <Text style={styles.subHeader}>Rp 41.500</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
                <Text style={styles.header}>50rb</Text>
                <Text style={styles.subHeader}>Rp 51.500</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
                <Text style={styles.header}>75rb</Text>
                <Text style={styles.subHeader}>Rp 76.500</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
                <Text style={styles.header}>100rb</Text>
                <Text style={styles.subHeader}>Rp 102.500</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
                <Text style={styles.header}>150rb</Text>
                <Text style={styles.subHeader}>Rp 152.500</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
                <Text style={styles.header}>200rb</Text>
                <Text style={styles.subHeader}>Rp 202.500</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
                <Text style={styles.header}>300rb</Text>
                <Text style={styles.subHeader}>Rp 302.500</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
                <Text style={styles.header}>500rb</Text>
                <Text style={styles.subHeader}>Rp 502.500</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
                <Text style={styles.header}>1jt</Text>
                <Text style={styles.subHeader}>Rp 997.500</Text>
            </TouchableOpacity>
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
})
