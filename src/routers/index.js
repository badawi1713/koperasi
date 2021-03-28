import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { BottomTab } from '../views/components';
import {
  CoperationAccount,
  CoperationMember,
  CoperationMemberSaving, CoperationMemberSavingPayment,
  CoperationMemberSavingPaymentMethod,
  EWallet,
  GetStarted,
  History,
  Home,
  Login,
  Profile,
  Pulsa,
  QRCamera, Register,
  RegisterVerification,
  SplashScreen,
  Store,
  StoreRegister,
  TopUp,

  TopUpPayment, TopUpPaymentMethod
} from '../views/screens';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MainApp = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomTab {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Riwayat" component={History} options={{ tabBarVisible: false }} />
      <Tab.Screen name="E-Wallet" component={EWallet} />
      <Tab.Screen name="Toko" component={Store} />
      <Tab.Screen name="Akun" component={Profile} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        options={{ headerShown: false }}
        name="SplashScreen"
        component={SplashScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="GetStarted"
        component={GetStarted}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Register"
        component={Register}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="RegisterVerification"
        component={RegisterVerification}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="MainApp"
        component={MainApp}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Pulsa"
        component={Pulsa}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="StoreRegister"
        component={StoreRegister}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CoperationMember"
        component={CoperationMember}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CoperationAccount"
        component={CoperationAccount}
      />
      <Stack.Screen options={{ headerShown: false }} name="TopUp" component={TopUp} />
      <Stack.Screen options={{ headerShown: false }} name="TopUpPaymentMethod" component={TopUpPaymentMethod} />
      <Stack.Screen options={{ headerShown: false }} name="TopUpPayment" component={TopUpPayment} />
      <Stack.Screen options={{ headerShown: false }} name="QRCamera" component={QRCamera} />
      <Stack.Screen options={{ headerShown: false }} name="CoperationMemberSaving" component={CoperationMemberSaving} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CoperationMemberSavingPayment"
        component={CoperationMemberSavingPayment}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CoperationMemberSavingPaymentMethod"
        component={CoperationMemberSavingPaymentMethod}
      />

    </Stack.Navigator>
  );
};

export default Router;
