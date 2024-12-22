import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecoilRoot, useRecoilValue } from "recoil";
import AccountScreen from "./screens/main/account/AccountScreen";
import { UserAtom } from "./screens/main/atoms/userAtom";
import BookDescription from "./screens/main/home/bookDescription/BookDescription";
import MainScreen from "./screens/main/MainScreen";
import SignInScreen from "./screens/main/signIn/SignInScreen";
import { RootStackParamList } from "./screens/main/types/RootStackParamList";


const Stack = createStackNavigator<RootStackParamList>();

function Navigation() {
  const user = useRecoilValue(UserAtom);
  console.log("MainScreen", user?.name);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
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
                title: 'Book Details',
                headerBackTitle: 'Home'
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App(): React.JSX.Element {
  return (
    <RecoilRoot>
      <SafeAreaProvider style={styles.container}>
        <Navigation />
      </SafeAreaProvider>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
