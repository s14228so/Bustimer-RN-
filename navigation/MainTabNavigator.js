import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from "react-navigation-tabs"
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

export const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

const navigationConfig = {
  mode: "card"
}

export default createStackNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen
}, navigationConfig);

