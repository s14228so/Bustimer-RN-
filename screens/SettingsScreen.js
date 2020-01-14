import React, { useContext, useState, useEffect } from 'react';
import { AsyncStorage, StyleSheet, Text, View, Subheading, Switch } from 'react-native';
import { ToggleButton, Surface, Divider } from 'react-native-paper';
import { Store } from "../store"


const Setting = () => {
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
    console.log({ to })
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
      <View>
        <Text>湘南台</Text>
        {/* <Switch value={dest.to === "sho"} onValueChange={val => _storeData(val)} /> */}
        <Switch
          value={isSwitchOn}
          onValueChange={() => {
            changeSwitch(!isSwitchOn);
            _storeData(!isSwitchOn ? "sho" : "tuji")
          }
          }
        />
        <Divider />
        <Text>辻堂</Text>
        <Switch
          value={!isSwitchOn}
          onValueChange={() => {
            changeSwitch(!isSwitchOn);
            _storeData(!isSwitchOn ? "sho" : "tuji")
          }
          }
        />
        {/* <Switch value={dest.to === "tuji"} onValueChange={val => _storeData(val)} /> */}
      </View>

      {/* <ToggleButton.Row
        onValueChange={value => _storeData(value)}
        value={dest.to}
      >
        <Text>湘南台</Text>
        <ToggleButton icon="format-align-left" value="sho" />
        <Text>辻堂</Text>
        <ToggleButton icon="format-align-right" value="tuji" />
      </ToggleButton.Row> */}
    </View>

  )

}



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
    justifyContent: 'center',
    alignItems: 'center',
  }
})
export default Setting
