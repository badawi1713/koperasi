import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { Provider as AuthProvider } from './context/AuthContext';
import { navigationRef } from './helpers/RootNavigation';
import Router from './routers';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <AuthProvider>
          <NavigationContainer ref={navigationRef}>
            <Router />
          </NavigationContainer>
        </AuthProvider>
      </PaperProvider>
    </Provider>
  );
};

export default App;
