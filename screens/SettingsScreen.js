import React, { useContext, useState, useEffect } from 'react';
import { AsyncStorage, StyleSheet, Text, View, Subheading, Switch } from 'react-native';
import { ToggleButton, Surface, Divider } from 'react-native-paper';
import { Store } from "../store"


const Setting = () => {
  const { state, dispatch } = useContext(Store)
  const [dest, setDest] = useState({ from: "sfc", to: "sho" })

  useEffect(() => {
    try {
      AsyncStorage.getItem('destination').then(value => {
        if (value !== null) {
          const { to } = JSON.parse(value)
          setDest({ ...dest, to })
        }
      })
    } catch (error) {
      // Error retrieving data
    }

  }, []);



  const _storeData = async (value) => {
    setDest({ to: value ? "sho" : "tuji", from: "sfc" })
    const newData = JSON.stringify({ to: value ? "sho" : "tuji", from: "sfc" })
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
        <Switch value={dest.to === "sho"} onValueChange={val => _storeData(val)} />
        <Divider />
        <Text>辻堂</Text>
        <Switch value={dest.to === "tuji"} onValueChange={val => _storeData(val)} />
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
