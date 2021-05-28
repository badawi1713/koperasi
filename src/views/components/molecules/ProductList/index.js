import React from 'react';
import {
    Image,
    ScrollView, StyleSheet, Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';
import { ICSavings, IMGDefaultUser, ICTotalBudget } from '../../../../assets';
import { colors, fonts } from '../../../../utils';
import { Button, Gap } from '../..';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ProductList = () => {
    const profileReducer = useSelector(state => state.profileReducer)

    const { transactionHistory, userProfile: { name, id }, totalSaving } = profileReducer;

    const dataProduct = [
        {
            "nama" : "produk 1",
            "harga" : 10000,
            "stok" : 2,
            "status" : 1
        },
        {
            "nama" : "produk 2",
            "harga" : 30000,
            "stok" : 2,
            "status" : 0
        },
        {
            "nama" : "produk 3",
            "harga" : 40000,
            "stok" : 9,
            "status" : 1
        },
        {
            "nama" : "produk 4",
            "harga" : 40000,
            "stok" : 9,
            "status" : 1
        },
        {
            "nama" : "produk 5",
            "harga" : 40000,
            "stok" : 9,
            "status" : 1
        }
    ];

    const ProductList = ({ item }) => (
        <View style={{paddingHorizontal: 18, paddingVertical: 12}}>
            <View style={styles.content}>
                <Image source={IMGDefaultUser} style={styles.profileImage} />
                <Gap width={15} />
                <View>
                    <Text style={styles.textTitle}>{item.nama}</Text>
                    <Text style={styles.textTitle}>{item.harga}</Text>
                    <Gap height={12}/>
                    <View style={{flexDirection: 'row', alignItems:'baseline'}}>
                        <Text style={styles.textStatus}>Stok: {item.stok}</Text>
                        <Gap width={30}/>
                        <View style={styles.badge}>
                            <Text style={{fontSize:11, color:colors.black}}>{item.status == 1 ? 'Aktif' : 'Nonaktif'}</Text>
                        </View>
                    </View>
                </View>
                
            </View>
            <Gap height={7}/>
            <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                <TouchableOpacity style={styles.buttonBawah}>
                    <Text style={{color:colors.black, fontSize: 14}}>Ubah Harga </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonBawah}>
                    <Text style={{color:colors.black, fontSize: 14}}>Ubah Stok </Text>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Icon name='ellipsis-v' size={18} color={colors.black} />
                </TouchableOpacity>
                
            </View>
        </View>
        
    )

    return (
        <View style={styles.container}>
            
            <FlatList
                data={dataProduct}
                renderItem={ProductList}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.nama}

            />

        </View>
    );
};

export default ProductList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.grey5,
    },
    content: {
        width: '100%',
        flexDirection: 'row',
    },
    profileImage: {
        width: 70,
        height: 70,
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: colors.border,
    },
    text: {
        fontSize: 14,
        color: colors.black,
        fontFamily: fonts.primary[600],
    },
    textStatus: {
        fontSize: 13,
        color: colors.text.grey1 ,
        fontFamily: fonts.primary[600],
    },
    buttonBawah: {
        alignItems: 'center',
        width: '43%',
        paddingVertical: 2,
        borderColor: colors.black,
        borderWidth: 0.5,
        borderRadius: 8
    },
    textTitle: {
        fontSize: 14,
        color: colors.text.header,
        fontFamily: fonts.primary[600],
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
    },
    badge:{
        backgroundColor: colors.background.grey4,
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 8
    }
});
