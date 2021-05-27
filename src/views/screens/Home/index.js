import React, { useContext, useEffect, useState } from 'react';
import {
  Image,
  RefreshControl, SafeAreaView,
  ScrollView,
  StatusBar, StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import ContentLoader from "react-native-easy-content-loader";
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { IMGAll, productList } from '../../../assets';
import { ICTopUp, ICTransfer, ICWithdraw } from '../../../assets/icons';
import { Context } from '../../../context/AuthContext';
import { changeProfile } from '../../../store/actions';
import { getHomeContent, getSaldoBalance } from '../../../store/actions/home';
import { colors, fonts } from '../../../utils';
import { Gap, HomeSwiper, Input, TopNavbar } from '../../components';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Home = ({ navigation }) => {
  const { state } = useContext(Context);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const homeReducer = useSelector(state => state.homeReducer);
  const userProfile = state.userProfile;
  const { saldoBalance, loading, category } = homeReducer;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getSaldoBalance());
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    const getHomeData = () => {
      dispatch(getHomeContent())
      dispatch(getSaldoBalance())
    }

    return getHomeData()
  }, [dispatch])

  useEffect(() => {
    const getProfileData = () => {
      dispatch(changeProfile({ userProfile }))
    }

    return getProfileData()
  }, [dispatch])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        animated={true}
        backgroundColor='#fff'
        barStyle='dark-content'
        showHideTransition='fade'
      />
      <TopNavbar title="KSP CN" variant="link-home" />
      <ScrollView showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={styles.header}>
          <Gap height={10} />
          <Input variant="search" />
          <Gap height={20} />
          <View style={styles.transactionInfo}>
            <TouchableOpacity onPress={() => navigation.navigate("SaldoDetail")} style={styles.walletInfo}>
              <Text style={styles.rupiahtext}>Saldo Sukarela</Text>
              <View style={styles.saldoInfo}>
                <Text style={styles.rupiahtext}>Rp</Text>
                {loading ?
                  <View>
                    <Gap width={40} height={5} />
                    <ContentLoader paragraph={false} tWidth={100} active tHeight={10} />
                  </View> :
                  <NumberFormat value={saldoBalance || 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} renderText={value =>
                    <Text style={styles.moneyText}>{value}</Text>
                  } />

                }
              </View>
            </TouchableOpacity>
            <View style={styles.transactionGroup}>
              <TouchableOpacity onPress={() => navigation.navigate('TopUp')} style={styles.transactionButton}>
                <ICTopUp />
                <Text style={styles.transactionIconText}>Top Up</Text>
              </TouchableOpacity>
              <Gap width={10} />
              <TouchableOpacity style={styles.transactionButton}>
                <ICTransfer />
                <Text style={styles.transactionIconText}>Transfer</Text>
              </TouchableOpacity>
              <Gap width={10} />
              <TouchableOpacity style={styles.transactionButton}>
                <ICWithdraw width={20} height={20} />
                <Text style={styles.transactionIconText}>Tarik Dana</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.mainContent}>
          <Gap height={20} />
          {loading ?
            <View>
              <ContentLoader titleStyles={{ alignSelf: 'center' }} tWidth={"90%"} paragraph={false} tHeight={88} active />
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <ContentLoader containerStyles={{ width: 10, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} paragraphStyles={{ borderRadius: 6, alignSelf: 'center', flexDirection: 'row' }} title={false} pRows={1} pWidth={12} pHeight={12} active />
                <ContentLoader containerStyles={{ width: 10, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} paragraphStyles={{ borderRadius: 6, alignSelf: 'center', flexDirection: 'row' }} title={false} pRows={1} pWidth={12} pHeight={12} active />
                <ContentLoader containerStyles={{ width: 10, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} paragraphStyles={{ borderRadius: 6, alignSelf: 'center', flexDirection: 'row' }} title={false} pRows={1} pWidth={12} pHeight={12} active />
              </View>
            </View>
            :
            <HomeSwiper />

          }
          <Gap height={20} />
          <Text style={styles.textSection}>PPOB : </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Gap width={18} />
            {
              loading ? <View style={{ flexDirection: 'row' }}>
                <ContentLoader containerStyles={{ width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} paragraphStyles={{ borderRadius: 6, }} tHeight={80} tWidth={80} pRows={1} active />
                <ContentLoader containerStyles={{ width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} paragraphStyles={{ borderRadius: 6, }} tHeight={80} tWidth={80} pRows={1} active />
                <ContentLoader containerStyles={{ width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} paragraphStyles={{ borderRadius: 6, }} tHeight={80} tWidth={80} pRows={1} active />
                <ContentLoader containerStyles={{ width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} paragraphStyles={{ borderRadius: 6, }} tHeight={80} tWidth={80} pRows={1} active />
                <ContentLoader containerStyles={{ width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} paragraphStyles={{ borderRadius: 6, }} tHeight={80} tWidth={80} pRows={1} active />
                <ContentLoader containerStyles={{ width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} paragraphStyles={{ borderRadius: 6, }} tHeight={80} tWidth={80} pRows={1} active />
                <ContentLoader containerStyles={{ width: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} paragraphStyles={{ borderRadius: 6, }} tHeight={80} tWidth={80} pRows={1} active />
              </View> :
                <>
                  <TouchableOpacity activeOpacity={1} style={styles.ppobGroup}>
                    <View style={styles.ppobItem}>
                      <Image source={IMGAll} style={styles.ppobImage} />
                    </View>
                    <Text style={styles.ppobTitle}>Semua</Text>
                  </TouchableOpacity>
                  {category && category.map((item,) => (
                    <TouchableOpacity
                      activeOpacity={1}
                      key={item.categoryId}
                      style={styles.ppobGroup}
                      onPress={() => { item.categoryId === "PLS1" ? navigation.navigate('Pulsa') : item.categoryId === "TELKOM" ? navigation.navigate('Indihome') : item.categoryId === "PLN" ? navigation.navigate('PLN') : item.categoryId === "PDAM" ? navigation.navigate('PDAM') : navigation.navigate('CoperationMember') }}>
                      <View style={styles.ppobItem}>
                        <Image source={{ uri: item.categoryImage }} style={styles.ppobImage} />
                      </View>
                      <Text style={styles.ppobTitle}>{item.categoryName === "PULSA PRABAYAR" ? "Pulsa" : item.categoryName}</Text>
                    </TouchableOpacity>
                  ))
                  }
                </>

            }
          </ScrollView>
          <Gap height={20} />
          <Text style={styles.textSection}>Kategori Produk (RK) : </Text>
          {loading ?
            <View style={styles.productGroup}>
              <ContentLoader containerStyles={{ width: '30%', marginBottom: 20 }} paragraphStyles={{ borderRadius: 6, }} tHeight={100} tWidth={'100%'} pRows={1} active />
              <ContentLoader containerStyles={{ width: '30%', marginBottom: 20 }} paragraphStyles={{ borderRadius: 6, }} tHeight={100} tWidth={'100%'} pRows={1} active />
              <ContentLoader containerStyles={{ width: '30%', marginBottom: 20 }} paragraphStyles={{ borderRadius: 6, }} tHeight={100} tWidth={'100%'} pRows={1} active />
            </View>
            :
            <View style={styles.productGroup}>
              {productList.map((item, index) => (
                <TouchableOpacity style={styles.productItem} key={index}>
                  <View style={styles.productImageContainer}>
                    <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
                  </View>
                  <Text numberOfLines={1} style={styles.productTitle}>
                    {item.name}
                  </Text>
                  <NumberFormat value={item.price || 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} renderText={value =>
                    <Text style={styles.productPrice}>Rp {value}</Text>
                  } />
                </TouchableOpacity>
              ))}

            </View>
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: 18,
    paddingBottom: 18,
  },
  transactionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  saldoInfo: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  rupiahtext: {
    fontSize: 14,
    color: colors.text.header,
    fontFamily: fonts.primary[600],
  },
  moneyText: {
    fontSize: 18,
    color: colors.text.header,
    fontFamily: fonts.primary[600],
  },
  transactionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionButton: {
    alignItems: 'center',
  },
  transactionIconText: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: fonts.primary[600],
    color: colors.text.header,
  },
  mainContent: {
    backgroundColor: '#eee',
    flex: 1,
    paddingBottom: 30,
  },
  textSection: {
    color: colors.text.header,
    fontSize: 16,
    fontFamily: fonts.primary[600],
    marginLeft: 18,
    marginBottom: 10,
  },
  ppobGroup: {
    alignItems: 'center',
    marginRight: 18,
  },
  ppobItem: {
    backgroundColor: colors.white,
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
    alignItems: 'center',
    elevation: 1,
  },
  ppobTitle: {
    fontSize: 14,
    fontFamily: fonts.primary[700],
    color: colors.text.header,

  },
  ppobImage: {
    width: 46,
    height: 46,
    resizeMode: 'cover',
  },
  productGroup: {
    paddingHorizontal: 18,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 1
  },
  productImageContainer: {
    height: 120,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginBottom: 10,
  },
  productImage: {
    borderRadius: 6,
    width: "100%",
    height: "100%",
    resizeMode: 'cover',
  },
  productTitle: {
    textAlign: 'center',
    marginBottom: 6,
    fontFamily: fonts.primary.normal,
    fontSize: 14,
  },
  productPrice: {
    textAlign: 'center',
    fontFamily: fonts.primary.normal,
    fontSize: 14,
    color: colors.text.danger,
  },
});
