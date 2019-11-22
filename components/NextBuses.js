import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { Provider, Store } from '../store'

const NextBuses = (props) => {
    const { state, dispatch } = useContext(Store)

    return (
        <View style={styles.wrapper}>
            <Text style={styles.headerText}>NextBuses</Text>
            <Text style={styles.headerText}>{state.timer.count}</Text>

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

