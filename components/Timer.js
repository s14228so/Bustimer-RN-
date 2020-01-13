import React, { useEffect } from "react"

import { Text, StyleSheet } from 'react-native';


const Timer = ({ now, timer, nextBuses }) => {

    const renderTimer = () => {
        if (nextBuses.length) {
            return (
                <Text style={styles.timerText}> {timer.leftMinute + ":" + ('00' + timer.leftSecond).slice(-2)}</Text>
            )
        } else {
            return <Text>Loading...</Text>
        }
    }

    return (
        renderTimer()
    )
}

const styles = StyleSheet.create({
    timerText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 45,
        color: "#fff",
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
})
export default Timer;

