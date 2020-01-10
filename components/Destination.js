import React from "react"
import ChangeButton from "../components/ChangeButton"
import makeDistStr from "../helpers/busFormatter"

import { View, Text } from 'react-native';

const Destination = ({ dest, change }) => {

    return (
        <View style={styles.flex}>
            <Text>{makeDistStr(dest.from)}</Text>
            <ChangeButton change={change} />
            <Text>{makeDistStr(dest.to)}</Text>
        </View>

    )
}


const styles = {
    flex: {
        display: "flex",
        justifyContent: "space-around"
    }
}
export default Destination