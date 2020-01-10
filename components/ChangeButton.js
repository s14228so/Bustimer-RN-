import React from "react"
import { View, Text, Button } from 'react-native';


const ChangeButton = ({ change }) => {
    return (
        <Button onClick={change}>click</Button>
    )
}
export default ChangeButton