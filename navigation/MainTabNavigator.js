import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const navigationConfig = {
  mode: "card" //transitionのmode
}


//routeの設定
export default createStackNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen
}, navigationConfig);

