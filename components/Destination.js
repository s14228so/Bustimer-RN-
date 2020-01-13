import React from "react"
import ChangeButton from "./ChangeButton"
import makeDistStr from "../helpers/busFormatter"

import { View, Text, StyleSheet } from 'react-native';

const Destination = ({ dest, change }) => {
    return (
        <View style={styles.distination}>
            <Text style={styles.distTitle}>{makeDistStr(dest.from)}</Text>
            <ChangeButton change={change} />
            <Text style={styles.distTitle}>{makeDistStr(dest.to)}</Text>
        </View>
    )
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

export default Destination