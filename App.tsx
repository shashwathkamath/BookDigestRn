import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';
import { RootStackParamList } from './screens/main/types/RootStackParamList';
import SignInScreen from './screens/signInScreen/signInScreen';


const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <RecoilRoot>
      <SafeAreaView style={styles.container}>
        <SignInScreen />
      </SafeAreaView>
    </RecoilRoot>


    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen
    //       name="Main"
    //       component={MainScreen}
    //       options={{ headerShown: false }}
    //     />
    //     <Stack.Screen
    //       name="Account"
    //       component={AccountScreen}
    //       options={{
    //         title: 'My Account',
    //         headerBackTitle: 'Home'
    //       }}
    //     />
    //     <Stack.Screen
    //       name="BookDescription"
    //       component={BookDescription}
    //       options={{
    //         title: 'Book Details', // You can customize the header title here
    //         headerBackTitle: 'Home'
    //       }}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Make SafeAreaView take the full screen
  },
});

export default App;