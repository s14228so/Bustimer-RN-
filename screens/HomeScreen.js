import React, { useState, useEffect } from "react"
import { View, Text } from 'react-native'
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



  return (<View style={styles.container}>
    <Timer now={now} timer={timer} nextBuses={nextBuses} />
    <Destination dest={dest} change={change} />
    <NextBusList nextBuses={nextBuses} />
  </View>)






}


const styles = {
  container: {
    width: "80%",
    textAlign: "center"
  }
}

export default HomeScreen