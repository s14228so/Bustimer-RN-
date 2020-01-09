import React, { useContext } from 'react';
import { Text, View } from 'react-native';

import { Store } from '../store'


const FirstApp = () => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.headerText}>
                Bustimer
            </Text>
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
        textAlign: "center",
        fontSize: 30,
        color: "blue"
    }

}
export default FirstApp;

