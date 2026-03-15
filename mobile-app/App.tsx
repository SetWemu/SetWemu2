import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import the screens for THIS PR
import SplashScreen from './src/screens/SplashScreen';
import OnBoardingScreen from './src/screens/OnBoardingScreen';

// Note: We leave these commented out because they are in other PRs
// import LoginScreen from './src/screens/LoginScreen';
// import CreateAccountScreen from './src/screens/CreateAccountScreen';

const Stack = createStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Splash" 
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
          
          {/* We don't add Login/Stories here yet to keep the PR "Clean" 
            and focused only on Onboarding 
          */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;