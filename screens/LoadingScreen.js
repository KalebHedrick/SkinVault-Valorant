import React from "react";
import { View, Text, Image } from "react-native";
import appColors from "../assets/appColors";

 
export default function LoadingScreen() {
    return (
        <View style={{backgroundColor: appColors.BLACK, flex:1, alignContent:"center", justifyContent:"space-evenly"}}>
        <Image style = {{width:"80%",height:undefined, aspectRatio:1, alignSelf:"center",  resizeMode:"stretch", justifyContent:"space-evenly"}} source={require("../assets/croppedIcon.png")} />
</View>
       
    );
}