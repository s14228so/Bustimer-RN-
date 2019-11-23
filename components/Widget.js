import React, { useContext } from 'react';
import { Text, View } from 'react-native';

import { Store } from '../store'


const Widget = (props) => {
    const { state, dispatch } = useContext(Store)
    return (
        <View style={styles.wrapper}>
            <Text style={styles.headerText}>{state.timer.ms.m}:  {`${('00' + state.timer.ms.s).slice(-2)}`}</Text>
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
export default Widget;

