import * as WebBrowser from 'expo-web-browser';
import React, { useState, useRef, useContext, useEffect } from 'react';
import { NavigationEvents, ThemeColors } from "react-navigation";
import { Button, IconButton, Divider, Colors, Surface } from 'react-native-paper';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Provider, Store } from '../store'
import makeDateObj from "../helpers/dateFormatter"
export default function HomeScreen() {
  const { state, dispatch } = useContext(Store)
  const [isSetData, setData] = useState(0)
  const [count, setCount] = useState(0)
  const dataFetch = async () => {
    const timeTable = (await import('../api/timeTable.json')).default;

    dispatch({ type: "SET_TIMETABLE", payload: timeTable })
    const holidays = (await import('../api/holidays.json')).default;
    dispatch({ type: "SET_HOLIDAYS", payload: holidays })
  }

  const isFirstRef = useRef(true);
  // 前回のステートも覚えておく
  const lastStateRef = useRef();

  useEffect(() => {

    (async function loadData() {
      if (isFirstRef.current) {
        await dataFetch()
        dispatch({ type: "SET_FROM_TO", payload: { from: "sho", to: "sfc" } })

        setInterval(() => {
          const date = makeDateObj(new Date())
          dispatch({ type: 'SET_DATE', payload: date })
          setCount(count + 1)
        }, 1000);
        isFirstRef.current = false;
      } else {
        if (state.data.timeTable && state.data.holidays && state.timer.date) {
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
    if (state.bus.nextBuses && state.bus.nextBuses.length) {
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

    const { hour, minute, date, hourStr, minuteStr, secondStr, monthStr, dayStr, dayOfWeek } = state.timer.date
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
    if ("from" in state.bus.fromTo)
      return (
        <Surface style={styles.distination}>
          <View>
            <Text style={styles.distTitle}>{state.bus.fromTo.from === "sho" ? "湘南台" : "SFC"}
            </Text>
          </View>
          <View style={styles.arrow}>
            <IconButton
              icon="play"
              color={Colors.white}
              size={24}
              onPress={() => dispatch({ type: "SET_FROM_TO", payload: { from: state.bus.fromTo.to, to: state.bus.fromTo.from } })}
            />
          </View>
          <View>
            <Text style={styles.distTitle}>
              {state.bus.fromTo.from === "sho" ? "SFC" : "湘南台"}
            </Text>
          </View>

        </Surface>
      )
  }


  const setTimer = () => {
    if (state.timer.ms) {
      return (
        <View style={styles.timer}>
          <Text style={styles.timerText}>{state.timer.ms.m}: {state.timer.ms.s}</Text>
        </View>

      )
    }


  }


  const setBuses = () => {
    return (
      // <View style={styles.ListWrapper}>
      <ScrollView style={styles.scroll}>{state.bus.nextBuses.map((bus, i) => {
        return (
          <View>
            <View style={styles.busItem} key={i}>
              <View>
                <Text style={styles.busItemText}>{bus.h}:{bus.m}</Text>
              </View>
              <View>
                <Text style={styles.busItemText}>{bus.twin ? "ツインライナー" : ""}</Text>
              </View>
              <View>
                <Text style={styles.busItemText}>{bus.rotary ? "ロータリー発" : ""}</Text>
              </View>
              <View>
                <Text style={styles.busItemText}>{bus.via ? "笹久保経由" : ""}</Text>
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
      {setBus()}
      {setTimer()}
      <View style={styles.busItem}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>次のバス</Text>
      </View>
      <NavigationEvents
        onWillFocus={payload => {
          isFirstRef.current = true;
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
  timerText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30
  },
  wrapper: {
    marginTop: 0,
    flexDirection: 'column',
    justifyContent: "space-around",
    flex: 1,
  },
  timer: {
    height: 100,
    lineHeight: 100,
    marginTop: 10,
    backgroundColor: "grey",
    opacity: 0.7,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ListWrapper: {
    marginTop: 10
  },
  busItemText: {
    marginRight: 10,
    lineHeight: 20
  },
  textLeft: {
    textAlign: "left"
  },
  busItem: {
    height: 20,
    marginTop: 10,
    paddingLeft: 10,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  scroll: {
    marginTop: 15,
  },
  distination: {
    backgroundColor: "#3498db",
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    height: 100,
    flexDirection: "row",
    paddingLeft: 50,
    paddingRight: 50,
    justifyContent: "space-around"
  },
  distTitle: {
    fontSize: 25
  },
});
