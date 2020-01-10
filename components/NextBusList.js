import React, { useEffect } from "react"
import { View, Text } from 'react-native';


const NextBusList = ({ nextBuses }) => {

    return (
        <View>
            <Text>次のバス</Text>
            <Text>  {!nextBuses.length ? "本日のバスは終了しました" : ""}</Text>

            <View style={styles.list}>
                {
                    nextBuses.map((bus, i) => {
                        return (
                            <View key={i}>
                                <Text>{bus.twin ? "ツインライナー" : ""}</Text>
                                <Text>  {bus.rotary ? "ロータリー発" : ""}</Text>
                                <Text> {bus.via ? "笹久保経由" : ""}</Text>
                                <Text> {String(bus.h).length === 1 ? `0${bus.h}` : bus.h} : {String(bus.m).length === 1 ? `0${bus.m}` : bus.m}</Text>
                            </View>
                        )
                    })

                }
            </View>
        </View>
    )
}



const styles = {
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignItems: 'center',
        width: "100%",
        backgroundColor: "#a2b9bc",
        textAlign: "center",
        color: "#fff",
    },
    headerText: {
        fontSize: 20,
        marginTop: 30,
        color: "#000"
    }

}
export default NextBusList;

