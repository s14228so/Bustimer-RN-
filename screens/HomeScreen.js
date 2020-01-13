import React, { useState, useEffect } from "react"
import { View, StyleSheet } from 'react-native'
import NextBusList from "../components/NextBusList"
import Destination from "../components/Destination"
import Timer from "../components/Timer"
import makeDate from "../helpers/dateFormatter"
import timeTable from "../static/timeTable.json"


const HomeScreen = () => {

  const [now, setNow] = useState(makeDate(new Date()));
  const [dest, setDest] = useState({ to: "sho", from: "sfc" })
  const [nextBuses, setNextBuses] = useState([])
  const [timer, setTimer] = useState({ leftMinute: 0, leftSecond: 0 })
  const change = () => {
    setDest({ from: dest.to, to: dest.from })
  }


  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(makeDate(new Date()));
    }, 1000);

    if (nextBuses.length) {
      const nextBus = nextBuses[0]

      let leftMinute, leftSecond;
      leftSecond = 60 - now.second - 1;
      const hour = parseInt(nextBus.h)
      const min = parseInt(nextBus.m)
      if (hour > now.hour) {
        leftMinute = ((hour - now.hour) * 60)
          - now.minute
          + min - 1;
      } else {
        leftMinute = min - now.minute - 1;
      }

      if (leftMinute === 0 && leftSecond === 0) {
        setTimer({ leftMinute: 0, leftSecond: 0 })
        setNextBuses(nextBuses.slice(1))
      } else {
        setTimer({ leftMinute, leftSecond })
      }
    }

    return () => { clearInterval(intervalId) };
  }, [now]);





  const fetchBus = () => {
    const todayData = timeTable[dest["from"]][dest["to"]]["weekday"]

    let nextBuses = todayData.filter(time => {
      return (
        (time.h > now.hour)
        ||
        (
          time.h === now.hour &&
          time.m > now.minute
        )
      )
    });

    setNextBuses(nextBuses)
  }

  useEffect(() => {
    fetchBus()

  }, [dest]);



  return (<View>
    <Timer now={now} timer={timer} nextBuses={nextBuses} />
    <Destination dest={dest} change={change} />
    <NextBusList nextBuses={nextBuses} />
  </View>)






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

export default HomeScreen