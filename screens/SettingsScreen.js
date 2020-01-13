import React, { useContext } from 'react';
import { View } from 'react-native';
import { ToggleButton } from 'react-native-paper';
import { Store } from "../sえtore"


const Setting = () => {
  const { state, dispatch } = useContext(Store)

  return (
    <ToggleButton.Row
      onValueChange={value => dispatch({ type: "SET_DEST", value })}
      value={state.setting}
    >
      <ToggleButton icon="format-align-left" value="sho" />
      <ToggleButton icon="format-align-right" value="tuji" />
    </ToggleButton.Row>
  )

}
export default Setting
