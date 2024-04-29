import React from "react";
import { Text } from "react-native";

const AppText = props=>{
    return (
        <Text
        {...props}
        style={{
            ...props.style,
            fontFamily:"Pretendard-Regular",
            color:"#000000"
        }}>
        {props.children}
        </Text>
    )
}

export default AppText;