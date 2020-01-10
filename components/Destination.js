import React from "react"
import ChangeButton from "../components/ChangeButton"
import makeDistStr from "../helpers/busFormatter"

import { View, Text } from 'react-native';

const Destination = ({ dest, change }) => {

    return (
        <div style={styles.flex}>
            <span>{makeDistStr(dest.from)}</span>
            <ChangeButton change={change} />
            <span>{makeDistStr(dest.to)}</span>
        </div>

    )
}


const styles = {
    flex: {
        display: "flex",
        justifyContent: "space-around"
    }
}
export default Destination