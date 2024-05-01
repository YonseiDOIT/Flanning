import React from "react";
import { Text } from "react-native";

const BoldText = props=>{
    return (
        <Text
        {...props}
        style={{
            ...props.style,
            fontFamily:"Pretendard-SemiBold",
            color:"#000000",
            fontSize:25
        }}>
        {props.children}
        </Text>
    )
}

export default BoldText;