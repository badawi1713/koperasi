import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './helpers/RootNavigation';
import { Provider as AuthProvider } from './context/AuthContext';
import { Provider } from 'react-redux'
import React from 'react';
import Router from './routers';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NavigationContainer ref={navigationRef}>
          <Router />
        </NavigationContainer>
      </AuthProvider>
    </Provider>
  );
};

export default App;
