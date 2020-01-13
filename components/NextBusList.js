import React, { useEffect } from "react"
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, IconButton, Divider, Colors, Surface } from 'react-native-paper';

const NextBusList = ({ nextBuses }) => {

    return (
        <View>
            <Text>  {!nextBuses.length ? "本日のバスは終了しました" : ""}</Text>

            <ScrollView style={styles.scroll}>
                {
                    nextBuses.map((bus, i) => {
                        let buscolor = bus.twin ? "red" : "#FFCC00"
                        return (
                            <View key={i}>
                                <View style={styles.busItem} >
                                    <View>
                                        <MaterialCommunityIcons name="bus-side" size={25} color={buscolor} />
                                    </View>
                                    <View>
                                        <Text style={styles.busItemText}> {String(bus.h).length === 1 ? `0${bus.h}` : bus.h} : {String(bus.m).length === 1 ? `0${bus.m}` : bus.m}</Text>
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
                            //     <View key={i}>
                            //         <Text>{bus.twin ? "ツインライナー" : ""}</Text>
                            //         <Text>  {bus.rotary ? "ロータリー発" : ""}</Text>
                            //         <Text> {bus.via ? "笹久保経由" : ""}</Text>
                            //         <Text> {String(bus.h).length === 1 ? `0${bus.h}` : bus.h} : {String(bus.m).length === 1 ? `0${bus.m}` : bus.m}</Text>
                            //     </View>
                        )
                    })

                }
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
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
})

export default NextBusList;

