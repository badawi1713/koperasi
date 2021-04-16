import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { BottomTab } from '../views/components';
import {
  CoperationAccount,
  CoperationMember,
  CoperationMemberLoan,
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

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

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
    <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{
          gestureDirection: 'horizontal',
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
      <Stack.Screen

        name="Login"
        component={Login}
        options={{
          gestureDirection: 'horizontal',
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
      <Stack.Screen

        name="Register"
        component={Register}
      />
      <Stack.Screen

        name="RegisterVerification"
        component={RegisterVerification}
      />
      <Stack.Screen

        name="MainApp"
        component={MainApp}
      />
      <Stack.Screen

        name="Pulsa"
        component={Pulsa}
      />
      <Stack.Screen

        name="StoreRegister"
        component={StoreRegister}
      />
      <Stack.Screen

        name="CoperationMember"
        component={CoperationMember}
      />
      <Stack.Screen

        name="CoperationAccount"
        component={CoperationAccount}
      />
      <Stack.Screen options={{ headerShown: false }} name="TopUp" component={TopUp} />
      <Stack.Screen options={{ headerShown: false }} name="TopUpPaymentMethod" component={TopUpPaymentMethod} />
      <Stack.Screen options={{ headerShown: false }} name="TopUpPayment" component={TopUpPayment} />
      <Stack.Screen options={{ headerShown: false }} name="QRCamera" component={QRCamera} />
      <Stack.Screen options={{ headerShown: false }} name="CoperationMemberSaving" component={CoperationMemberSaving} />
      <Stack.Screen

        name="CoperationMemberSavingPayment"
        component={CoperationMemberSavingPayment}
      />
      <Stack.Screen

        name="CoperationMemberSavingPaymentMethod"
        component={CoperationMemberSavingPaymentMethod}
      />
      <Stack.Screen

        name="CoperationMemberLoan"
        component={CoperationMemberLoan}
      />

    </Stack.Navigator>
  );
};

export default Router;
