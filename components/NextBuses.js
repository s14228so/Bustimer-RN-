import React, { useContext, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { Provider, Store } from '../store'

const NextBuses = props => {
    const { state, dispatch } = useContext(Store)




    const renderTimer = () => {
        if (state.bus.nextBuses) {
            const { hourStr, minuteStr, secondStr } = state.timer.date
            return (
                <Text style={styles.headerText}>{hourStr}:{minuteStr}:{secondStr}</Text>
            )
        }

    }
    return (
        <View style={styles.wrapper}>
            <Text style={styles.headerText}>NextBuses</Text>
            {renderTimer()}
        </View>
    );
};

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
export default NextBuses;

