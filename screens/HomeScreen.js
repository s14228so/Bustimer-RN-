import * as WebBrowser from 'expo-web-browser';
import React, { useState, useRef, useContext, useEffect } from 'react';

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
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
    })();

  }, [state.timer.date])







  const setCountDown = () => {
    let leftTime;
    const date = makeDateObj(new Date())
    if (state.bus.nextBuses && state.bus.nextBuses.length) {
      const bus = state.bus.nextBuses[0];
      let leftMinute, leftSecond;
      leftSecond = 60 - date.second - 1;
      if (parseInt(bus.h) > date.hour) {

        leftMinute = ((bus.h - date.hour) * 60)
          - date.minute
          + bus.m - 1;
      } else {
        console.log("else")
        leftMinute = bus.m - date.minute - 1;
      }

      leftMinute = String(leftMinute).length === 1 ? `0${leftMinute}` : leftMinute
      leftSecond = String(leftSecond).length === 1 ? `0${leftSecond}` : leftSecond
      leftTime = {
        m: leftMinute,
        s: leftSecond
      }
    }
    console.log(leftTime)

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
        <View style={styles.distination}><Text style={styles.textCenter}>{state.bus.fromTo.from === "sho" ? "湘南台" : "SFC"} ⇨ {state.bus.fromTo.from === "sho" ? "SFC" : "湘南台"} </Text></View>
      )
  }


  const setTimer = () => {
    if (state.timer.ms) {
      return (
        <View style={styles.timer}>
          <Text style={styles.textCenter}>{state.timer.ms.m}: {state.timer.ms.s}</Text>
        </View>

      )
    }


  }


  const setBuses = () => {
    return (
      <ScrollView style={styles.scroll}>{state.bus.nextBuses.map((bus, i) => {
        return (
          <View style={styles.busItem} key={i}><Text style={styles.textCenter}>{bus.h}: {bus.m}</Text></View>
        )
      })}</ScrollView>
    )

  }

  return (
    <View style={styles.wrapper}>
      {setBus()}
      {setTimer()}
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
    flexDirection: 'column',
    justifyContent: "space-around",
    flex: 1,
  },
  timer: {
    height: 100,
    lineHeight: 100,
    backgroundColor: "yellow",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'center',
  },
  busItem: {
    marginTop: 10
  },
  scroll: {
    marginTop: 15
  },
  distination: {
    backgroundColor: "grey",
    opacity: 0.6,
    padding: 50,
  }
});
