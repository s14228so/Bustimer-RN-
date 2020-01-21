import React, { useContext, useState, useEffect } from 'react';
import { AsyncStorage, StyleSheet, Text, View, Subheading, Switch } from 'react-native';
import { ToggleButton, Surface, Divider } from 'react-native-paper';
import { Store } from "../store"


const SettingScreen = () => {
  const { state, dispatch } = useContext(Store)
  // const [dest, setDest] = useState({ from: "sfc", to: "sho" })
  const [isSwitchOn, changeSwitch] = useState(false)

  useEffect(() => {
    try {
      AsyncStorage.getItem('destination').then(value => {
        if (value !== null) {
          const { to } = JSON.parse(value)
          if (to === "sho") {
            changeSwitch(true)
          }
        }
      })
    } catch (error) {
      // Error retrieving data
    }

  }, []);



  const _storeData = async (to) => {
    const newData = JSON.stringify({ to, from: "sfc" })
    try {
      await AsyncStorage.setItem('destination', newData);
      // dispatch({ type: "SET_DEST", payload: { to: value, from: "sfc" } })
    } catch (error) {
      console.log("error:", error)
    }

  }

  return (
    <View style={styles.centerItem}>
      <View></View>
      <View>
        <Text>湘南台</Text>
        <Switch
          value={isSwitchOn}
          onValueChange={() => {
            changeSwitch(!isSwitchOn);
            _storeData(!isSwitchOn ? "sho" : "tuji")
          }
          }
        />
      </View>
      <View>
        <Text>辻堂</Text>
        <Switch
          value={!isSwitchOn}
          onValueChange={() => {
            changeSwitch(!isSwitchOn);
            _storeData(!isSwitchOn ? "sho" : "tuji")
          }} />
      </View>
      <View></View>
    </View>

  )

}

SettingScreen.navigationOptions = {
  title: '設定',
};


const styles = StyleSheet.create({
  wrapper: {
    width: "80%",
    flexDirection: 'row',
    justifyContent: "space-around",
    flex: 1
  },
  centerItem: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
})
export default SettingScreen
