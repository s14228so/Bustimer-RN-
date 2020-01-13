import React from "react"
import { View } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';



const ChangeButton = ({ change }) => {
    return (
        // <Text>aa</Text>
        <View>
            <IconButton
                icon="loop"
                color="red"
                size={32}
                onPress={change}
            />
        </View>

    )
}
export default ChangeButton