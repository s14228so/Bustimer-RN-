import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { ToggleButton } from 'react-native-paper';
import { Store } from "../store"


const Setting = () => {
  const { state, dispatch } = useContext(Store)

  console.log(state.setting)

  const _storeData = async (value) => {
    try {
      await AsyncStorage.setItem('destination', value);
    } catch (error) {
      // Error saving data
    }
  }

  return (
    <ToggleButton.Row
      onValueChange={value => _storeData(value)}
      value={state.setting}
    >
      <ToggleButton icon="format-align-left" value="sho" />
      <ToggleButton icon="format-align-right" value="tuji" />
    </ToggleButton.Row>
  )

}
export default Setting
