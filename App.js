import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View, SafeAreaView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Provider, Store } from './store'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Header from './components/layouts/Header';

import AppNavigator from './navigation/AppNavigator';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [defaultDest, setDefault] = useState("sho")

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',
    },
  };

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <Provider>
        <PaperProvider theme={theme}>
          {/* <SafeAreaView style={styles.header}>
        </SafeAreaView> */}
          <View style={styles.container}>
            {/* <Header /> */}
            <View style={styles.container2}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <AppNavigator defaultDest={defaultDest} />
            </View>
          </View>
        </PaperProvider>
      </Provider>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3498db"
  },
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto"
  }
});
