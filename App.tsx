import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MainScreen from './screens/main/MainScreen'; // Your main tab screen
import AccountScreen from './screens/main/account/AccountScreen'; // The Account/Preferences screen
import BookDescription from './screens/main/home/bookDescription/BookDescription';
import { RootStackParamList } from './screens/main/types/RootStackParamList';


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
        <Stack.Screen
          name="BookDescription"
          component={BookDescription}
          options={{
            title: 'Book Details', // You can customize the header title here
            headerBackTitle: 'Home'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;