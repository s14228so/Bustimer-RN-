import * as WebBrowser from 'expo-web-browser';
import React, { useState, useContext, useEffect } from 'react';
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

import { MonoText } from '../components/StyledText';
import Widget from '../components/Widget';
import NextBuses from '../components/NextBuses';
import { plus } from "../actions"
import makeDateObj from "../helpers/dateFormatter"
export default function HomeScreen() {
  const { state, dispatch } = useContext(Store)
  // console.log(state.bus) 6回走って5回目だけ取れてる

  // vuexで置き換えてみたらわかる。storeの値を更新してそのあとにすぐに
  // storeの値を下の行で使おうとしても無理なのは当たり前
  const dataFetch = async () => {
    const timeTable = (await import('../api/timeTable.json')).default;

    dispatch({ type: "SET_TIMETABLE", payload: timeTable })
    const holidays = (await import('../api/holidays.json')).default;
    dispatch({ type: "SET_HOLIDYAS", payload: holidays })


  }
  useEffect(() => {
    // Using an IIFE
    (async function loadData() {
      dispatch({ type: "SET_FROM_TO", payload: { from: "sho", to: "sfc" } })
      await dataFetch()
      timeCount()
    })();
  }, []);


  // stateが書き換わるたび走ってるからバグってる？


  const timeCount = () => {
    const date = makeDateObj(new Date())
    dispatch({ type: 'SET_DATE', payload: date })
    // setLeftBuses()
    // setLeftTime()
    setInterval(() => {
      const mydate = makeDateObj(new Date())
      dispatch({ type: 'SET_DATE', payload: mydate })

      // setLeftBuses()
      // setLeftTime()
    }, 1000)
  }



  const setLeftTime = () => {
    let leftTime;
    if (state.bus.nextBuses && state.bus.nextBuses.length) {
      const bus = state.bus.nextBuses[0];
      let leftMinute, leftSecond;
      leftSecond = 60 - date.second - 1;
      if (bus.h > date.hour) {
        leftMinute = ((bus.h - date.hour) * 60)
          - date.minute
          + bus.m - 1;
      } else {
        leftMinute = bus.m - date.minute - 1;
      }
      leftTime = {
        m: leftMinute,
        s: leftSecond
      }
    } else {
      leftTime = {
        m: 0,
        s: 0
      }
    }

    dispatch({ type: "COUNT_DOWN", payload: leftTime })
  }

  const setLeftBuses = () => {
    // ここで書き換わってる

    const { hour, minute, date, hourStr, minuteStr, secondStr, monthStr, dayStr, dayOfWeek } = state.data.timeTable
    const { holidays, timeTable } = state.data
    console.log(hour)
    const { to, from } = state.bus.fromTo
    console.log(state.bus.fromTo)
    // debugger
    const isHoliday = (holidays && (monthStr + "-" + dayStr) in holidays) || dayOfWeek === 0;
    const todayData = isHoliday
      ? timeTable[from][to].holiday
      : dayOfWeek === 6
        ? timeTable[from][to].saturday
        : timeTable[from][to].weekday;
    // debugger
    const nextBuses = todayData.filter(time => {
      return (
        (time.h > hour)
        ||
        (
          time.h === hour &&
          time.m > minute
        )
      )
    });
    dispatch({ type: "SET_BUSES", payload: nextBuses })
  }
  console.log(state.data)

  if (state.bus.fromTo.from && state.data.timeTable) {
    console.log(state.data)
    setLeftBuses()
  }

  if (state.bus.nextBuses.length) {
    setLeftTime()
  }

  return (

    <View style={styles.container}>
      <Widget />
      <NextBuses />
    </View>
  );
}




HomeScreen.navigationOptions = {
  header: null,
  title: 'Home',
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
