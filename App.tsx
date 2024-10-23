
import React from 'react';
import {
  SafeAreaView
} from 'react-native';
import SignInScreen from './screens/signInScreen/signInScreen';

function App(): React.JSX.Element {
  return (
    <SafeAreaView >
      <SignInScreen />
    </SafeAreaView>
  );
}



export default App;
