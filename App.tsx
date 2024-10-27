// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import MainScreen from './screens/main/MainScreen';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <MainScreen />
    </NavigationContainer>
  );
}

export default App;