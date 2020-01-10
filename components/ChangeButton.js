import React from "react"
import { View, Text, Button } from 'react-native';


const ChangeButton = ({ change }) => {
    return (
        <IconButton
            icon="loop"
            color="red"
            size={32}
            onPress={change
            }
        />
    )
}
export default ChangeButton