import * as WebBrowser from 'expo-web-browser';
import React, { useState, useRef, useContext, useEffect } from 'react';
import { NavigationEvents, ThemeColors } from "react-navigation";
import { Button, IconButton, Divider, Colors, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Provider, Store } from '../store'
import makeDateObj from "../helpers/dateFormatter"
export default function HomeScreen() {
  const { state, dispatch } = useContext(Store)
  const [count, setCount] = useState(0)

  const isFirstRef = useRef(true);
  // 前回のステートも覚えておく
  const lastStateRef = useRef();

  useEffect(() => {

    (async function loadData() {
      if (isFirstRef.current) {
        const timeTable = (await import('../api/timeTable.json')).default;
        dispatch({ type: "SET_TIMETABLE", payload: timeTable })
        const holidays = (await import('../api/holidays.json')).default;
        dispatch({ type: "SET_HOLIDAYS", payload: holidays })

        dispatch({ type: "SET_FROM_TO", payload: { from: "sho", to: "sfc" } })
        console.log("first")

        setInterval(() => {
          const date = makeDateObj(new Date())
          dispatch({ type: 'SET_DATE', payload: date })
          setCount(count + 1)
        }, 1000);
        isFirstRef.current = false;
      } else {
        if (state.bus.fromTo.from && state.data.timeTable && state.data.holidays && state.timer.date) {
          setNextBuses()
          setCountDown()
        }
      }
      lastStateRef.current = count;
    }
    )();

  }, [state.timer.date])



  useEffect(() => {
    return () => {
      console.log("バイバーイ")
    };

  }, [])

  const setCountDown = () => {
    let leftTime;
    const date = makeDateObj(new Date())
    if (state.bus.nextBuses.length) {
      const bus = state.bus.nextBuses[0];
      let leftMinute, leftSecond;
      leftSecond = 60 - date.second - 1;
      const hour = parseInt(bus.h)
      const min = parseInt(bus.m)
      if (hour > date.hour) {

        leftMinute = ((hour - date.hour) * 60)
          - date.minute
          + min - 1;
      } else {
        leftMinute = min - date.minute - 1;
      }

      leftMinute = String(leftMinute).length === 1 ? `0${leftMinute}` : leftMinute
      leftSecond = String(leftSecond).length === 1 ? `0${leftSecond}` : leftSecond
      leftTime = {
        m: leftMinute,
        s: leftSecond
      }
    }

    dispatch({ type: "COUNT_DOWN", payload: leftTime })
  }

  const setNextBuses = () => {

    const { hour, minute, monthStr, dayStr, dayOfWeek } = state.timer.date
    const { holidays, timeTable } = state.data

    const { to, from } = state.bus.fromTo


    const isHoliday = (holidays && (monthStr + "-" + dayStr) in holidays) || dayOfWeek === 0;
    const todayData = isHoliday
      ? timeTable[from][to].holiday
      : dayOfWeek === 6
        ? timeTable[from][to].saturday
        : timeTable[from][to].weekday;
    let nextBuses = todayData.filter(time => {
      return (
        (time.h > hour)
        ||
        (
          time.h === hour &&
          time.m > minute
        )
      )
    });

    nextBuses = nextBuses.map(time => {
      time.h = String(time.h).length === 1 ? `0${time.h}` : time.h
      time.m = String(time.m).length === 1 ? `0${time.m}` : time.m
      return time
    })
    dispatch({ type: "SET_BUSES", payload: nextBuses })
  }


  const setBus = () => {
    if (state.bus.fromTo.from)
      return (
        <View style={styles.distination}>
          <Text style={styles.preTitle}>from</Text>
          <View>
            <Text style={styles.distTitle}>{state.bus.fromTo.from === "sho" ? "Shonandai" : "SFC"}
            </Text>
          </View>
          <Text style={styles.preTitle}>to</Text>
          <View style={styles.arrow}>
            <IconButton
              icon="loop"
              color="red"
              size={32}
              onPress={() => {
                dispatch({ type: "SET_FROM_TO", payload: { from: state.bus.fromTo.to, to: state.bus.fromTo.from } });
              }
              }
            />
          </View>
          <View>
            <Text style={styles.distTitle}>
              {state.bus.fromTo.to === "sho" ? "Shonandai" : "SFC"}
            </Text>
          </View>
        </View>
      )
  }


  const setTimer = () => {
    if (state.timer.ms) {
      return (
        <ImageBackground source={require('../assets/images/sfc.png')} style={styles.timer}>
          <Text style={styles.timerText}>00 : {state.timer.ms.m}: {state.timer.ms.s}</Text>
          <Text style={styles.date}>2019/12/19/ 15:00</Text>
        </ImageBackground>
      )
    } else {
      return (
        <ImageBackground source={require('../assets/images/sfc.png')} style={styles.timer}>
          <Text style={styles.date}>本日のバスは終了ました</Text>
        </ImageBackground>
      )
    }

  }


  const setBuses = () => {
    return (
      // <View style={styles.ListWrapper}>
      <ScrollView style={styles.scroll}>{state.bus.nextBuses.map((bus, i) => {
        let buscolor = bus.twin ? "red" : "#FFCC00"
        return (
          <View key={i}>
            <View style={styles.busItem} >
              <View>
                <MaterialCommunityIcons name="bus-side" size={25} color={buscolor} />
              </View>
              <View>
                <Text style={styles.busItemText}> {bus.h}:{bus.m}</Text>
              </View>
              <View>
                <Text style={styles.busTypeText}>{bus.twin ? "ツインライナー" : ""}</Text>
              </View>
              <View>
                <Text style={styles.busTypeText}>{bus.rotary ? "ロータリー発" : ""}</Text>
              </View>
              <View>
                <Text style={styles.busTypeText}>{bus.via ? "笹久保経由" : ""}</Text>
              </View>
              <Divider />
            </View>
            <Divider />
          </View>
        )
      })}</ScrollView>
      // </View>
    )

  }

  return (
    <View style={styles.wrapper}>
      {setTimer()}
      {setBus()}
      <NavigationEvents
        onWillFocus={_ => {
          isFirstRef.current = true;
        }}
        onDidBlur={_ => {
          dispatch({ type: "SET_FROM_TO", payload: { from: "tuji", to: "sfc" } })
        }}
      />
      {setBuses()}
    </View>
  );

}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  textCenter: {
    textAlign: "center"
  },
  wrapper: {
    marginTop: 0,
    flexDirection: 'column',
    justifyContent: "space-around",
    flex: 1,
  },
  backgroundImage: {
    height: 170,
    flex: 1,
  },
  timer: {
    height: 170,
    lineHeight: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 45,
    color: "#fff",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  date: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 20,
    opacity: 0.8,
    color: "#fff",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  ListWrapper: {
    marginTop: 10
  },
  busItem: {
    height: 35,
    marginTop: 10,
    paddingLeft: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  busItemText: {
    marginLeft: 10,
    marginRight: 10,
    lineHeight: 25,
    fontSize: 20,
  },
  busTypeText: {
    lineHeight: 28,
    fontSize: 15,
  },
  textLeft: {
    textAlign: "left"
  },
  scroll: {
    marginTop: 15,
  },
  distination: {
    padding: 8,
    alignItems: 'center',
    height: 170,
    justifyContent: "space-around"
  },
  distTitle: {
    fontSize: 40
  },
  preTitle: {
    fontSize: 15,
  },
  arrow: {
    position: "absolute",
    right: 15,
    top: 60
  }
});
