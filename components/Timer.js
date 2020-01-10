import React, { useEffect } from "react"

import { Text } from 'react-native';


const Timer = ({ now, timer, nextBuses }) => {

    const renderTimer = () => {
        if (nextBuses.length) {
            return (
                <Text> {timer.leftMinute + ":" + ('00' + timer.leftSecond).slice(-2)}</Text>
            )
        } else {
            return <Text>Loading...</Text>
        }
    }

    return (
        renderTimer()
    )
}
export default Timer

const styles = {
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignItems: 'center',
        width: "100%",
        backgroundColor: "grey",
        textAlign: "center",
        color: "#fff",
    },
    headerText: {
        fontSize: 20,
        marginTop: 30,
        color: "#000"
    }

}
export default Timer;

