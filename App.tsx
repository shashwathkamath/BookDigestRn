import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MainScreen from './screens/main/MainScreen'; // Your main tab screen
import AccountScreen from './screens/main/account/AccountScreen'; // The Account/Preferences screen

export type RootStackParamList = {
  Main: undefined; // Main screen has no parameters
  Account: undefined; // Account screen has no parameters
};

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={{
            title: 'My Account',
            headerBackTitle: 'Home'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;