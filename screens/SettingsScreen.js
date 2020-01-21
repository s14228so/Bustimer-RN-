import React, { useState, useEffect } from 'react';
import { AsyncStorage, StyleSheet, Text, View, Switch } from 'react-native';

const SettingScreen = () => {
  const [isSwitchOn, changeSwitch] = useState(false)

  useEffect(() => {
    try {
      AsyncStorage.getItem('destination').then(value => {
        //AsyncStorageにユーザーのデフォルト設定を取得しに行く
        if (value !== null) {
          const { to } = JSON.parse(value)
          if (to === "sho") {
            changeSwitch(true)
            //stateのスウィッチを入れ替える
          }
        }
      })
    } catch (error) {
      console.log(error)
    }
  }, []);



  const _storeData = async (to) => {
    const newData = JSON.stringify({ to, from: "sfc" })
    try {
      await AsyncStorage.setItem('destination', newData);
      //AsyncStorageにユーザーのデフォルト設定を更新しに行く
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
