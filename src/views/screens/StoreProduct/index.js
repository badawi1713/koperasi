import React, { useContext , useEffect} from 'react';
import {
  ActivityIndicator,


  SafeAreaView,
  StyleSheet,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Context } from '../../../context/AuthContext';
import { getListMyProduct } from '../../../store/actions';
import { colors, fonts } from '../../../utils';
import { Gap, Input, ProductList, TopNavbar } from '../../components';



const StoreProduct = ({ navigation }) => {
  const { state } = useContext(Context);
  
  const dispatch = useDispatch()
  
  const storeProductReducer = useSelector(state => state.storeProductReducer)

  const { newProductData, loading, storeStatus, storeData } = storeProductReducer;


  useEffect(() => {
    const getProduct = () => {
        dispatch(getListMyProduct())
    }

    return getProduct()
}, [dispatch])
   

  const SearchBar = () => {
    
    return (
        <>
          <View style={styles.mainContent}>
           <Input variant="search" />
            <Gap height={20} />
            
          </View>
          
          <Gap height={10} />
        </>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <TopNavbar back
        linkBack={() => navigation.goBack()}
        title="Produk Saya"
      />

      {
        loading ? <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator color={colors.background.green1} size='large' />
        </View> :
        <>
          <SearchBar />
          <ProductList />
        </>
      
      }
    </SafeAreaView>
  );
};

export default StoreProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    padding: 18,
    backgroundColor: colors.white
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    flex: 1
  },
  
  row: {
    flexDirection: 'row',
    alignItems: 'center'
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
    color: colors.black
  }
});
