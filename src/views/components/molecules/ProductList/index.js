import React from 'react';
import { ScrollView as Scroll } from 'react-native-gesture-handler';
import NumberFormat from 'react-number-format';
import {
    FlatList, Image,
    StyleSheet, Text, Dimensions,
    TouchableOpacity, View, TextInput 
} from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import { IMGDefaultUser } from '../../../../assets';
import { colors, fonts } from '../../../../utils';
import { Button} from '../../../components';
import { Gap } from '../../atoms';

const ProductList = () => {

    const theme = { colors: { primary: colors.background.green1, placeholder: colors.text.grey1, accent: colors.text.grey1 } }
    const screenHeight = Math.round(Dimensions.get('window').height);
    const storeProductReducer = useSelector(state => state.storeProductReducer)
    const productReducer = useSelector(state => state.productReducer)
    const {productList} = storeProductReducer;
    
    const updateHargaRef = React.useRef(null);
    const updateStokRef = React.useRef(null);

    const updateHargaConfirm = () => {
        updateHargaRef.current.open()
    }

    const updateStokConfirm = () => {
        updateStokRef.current.open()
    }

    const UbahHargaDrawer = (harga) => (
        <View style={{ paddingHorizontal: 18, flex: 1 }}>
          <Gap height={20} />
          <Scroll showsVerticalScrollIndicator={false}>
            <View >
              <View>
                
                <View>
                  <Text style={{fontSize: 18,  fontWeight: 'bold'}}>Atur Harga</Text>
                  <Gap height={10} />
                  <TextInput
                            mode='outlined'
                            placeholderTextColor={colors.text.grey1}
                            style = {styles.textInput}
                            value={100}
                            placeholder="Rp 0"
                            keyboardType='decimal-pad'
                        />
                </View>
              </View>
              
              <Gap height={20} />
              <Button variant='primary' 
            //   disabled={paymentLoading} 
              fullWidth title='Ubah' onPress={async () => {
                await updateHargaRef.current.close()
                // await dispatch(postPulsaPayment())
                // await dispatch(getSaldoBalance())
    
              }} />
              <Gap height={20} />
            </View>
          </Scroll>
        </View>
      );

      const UbahStokDrawer = () => (
        <View style={{ paddingHorizontal: 18, flex: 1 }}>
          <Gap height={20} />
          <Scroll showsVerticalScrollIndicator={false}>
            <View >
              <View>
                
                <View>
                  <Text style={{fontSize: 18,  fontWeight: 'bold', paddingLeft: 10}}>Atur Stok</Text>
                  <Gap height={10} />
                  <TextInput
                            theme={theme}
                            // mode='outlined'
                            // placeholderTextColor={colors.text.grey1}
                            style = {{borderBottomWidth : 1.0}}
                            value={100}
                            placeholder="Rp 0"
                            keyboardType='decimal-pad'
                            // onChangeText={(e) => { onChange(e); dispatch(changeProduct({ newProductData: { ...newProductData, harga: e } })) }}
                        />
                </View>
              </View>
              
              <Gap height={20} />
              <Button variant='primary' 
            //   disabled={paymentLoading} 
              fullWidth title='Ubah' onPress={async () => {
                await updateStokRef.current.close()
                // await dispatch(postPulsaPayment())
                // await dispatch(getSaldoBalance())
    
              }} />
              <Gap height={20} />
            </View>
          </Scroll>
        </View>
      );

    const List = ({ item }) => (
        <View style={{paddingHorizontal: 18, paddingVertical: 12}}>
            <View style={styles.content}>
                {/* <Image source={IMGDefaultUser} style={styles.profileImage} /> */}
                <Image source={{ uri: item.image + '?time=' + new Date() }} style={styles.profileImage} />
                <Gap width={15} />
                <View>
                    <Text style={styles.textTitle}>{item.nama}</Text>
                    <NumberFormat prefix={'Rp. '} value={item.harga || 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} renderText={value =>
                      <Text style={styles.textTitle}>{value}</Text>
                    } />
                    
                    <Gap height={12}/>
                    <View style={{flexDirection: 'row', alignItems:'baseline'}}>
                        <Text style={styles.textStatus}>Stok: {item.stok}</Text>
                        <Gap width={30}/>
                        <View style={styles.badge}>
                            <Text style={{fontSize:11, color:colors.black}}>{item.isActive == 1 ? 'Aktif' : 'Nonaktif'}</Text>
                        </View>
                    </View>
                </View>
                
            </View>
            <Gap height={7}/>
            <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                <TouchableOpacity style={styles.buttonBawah} onPress={async () => { await updateHargaConfirm() }} >
                    <Text style={{color:colors.black, fontSize: 14}}>Ubah Harga </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonBawah} onPress={() => updateStokConfirm()}>
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
                data={productList}
                renderItem={List}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.nama}
            />

        <RBSheet
          height={screenHeight - 500}
          ref={updateHargaRef}
          openDuration={600}
          closeDuration={500}
          closeOnDragDown={true}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0,0,0,0.6)"
            },
            container: {
              borderTopStartRadius: 10,
              borderTopEndRadius: 10
            },
            draggableIcon: {
              backgroundColor: colors.border,
              borderRadius: 12,
              height: 4,
            }
          }}
          >
          <UbahHargaDrawer />
        </RBSheet>

        <RBSheet
          height={screenHeight - 500}
          ref={updateStokRef}
          openDuration={600}
          closeDuration={500}
          closeOnDragDown={true}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0,0,0,0.6)"
            },
            container: {
              borderTopStartRadius: 10,
              borderTopEndRadius: 10
            },
            draggableIcon: {
              backgroundColor: colors.border,
              borderRadius: 12,
              height: 4,
            }
          }}
          >
          <UbahStokDrawer />
        </RBSheet>

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
        resizeMode: 'stretch',
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
    
    badge:{
        backgroundColor: colors.background.grey4,
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 8
    },
    textInput: {
        paddingLeft: 8,
        flex: 1,
        color: colors.text.dark1,
        fontFamily: fonts.primary.normal,
        fontSize: 15
      },
});
