import React from "react";
import { View, Text } from "react-native";
 
export function Loading() {
    return (
       <View style = {{alignItems: "center", flex:1, alignSelf:"center", justifyContent: "center"}}><Text>LOADING</Text></View>
    );
}