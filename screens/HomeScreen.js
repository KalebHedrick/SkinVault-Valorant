import { StyleSheet, Text, View,ScrollView,Button, Image } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import {getValueFor} from '../fetchData.js';
import React from "react";
const HomeScreen = ({navigation}) => {
    const [uuid, Setuuid] = useState([]);
    useEffect( () => {
    getValueFor("allData").then(res => { 
      
        res = JSON.parse(res);
        res = res.data;
        const tempUuid = [];
      for(const element of res) {
       tempUuid.push( <Tile name = {element.displayName} icon = {element.displayIcon}/>);
      }
    Setuuid(tempUuid);})
    },[])
   return (
    <ScrollView>{uuid}<Button
    title="Navigate to .."
    onPress={() => navigation.navigate("Hom")}
  /></ScrollView>)
   
}
export default HomeScreen;
const sty = StyleSheet.create({
    square: {
      width: 100,
      height: 100,
      backgroundColor: "red",
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
  });
  const Tile = props => {
    return (
      <View style = {sty}>
        <Text>{props.name}</Text>
        <Image
        style={sty.tinyLogo}
        source={{
          uri: props.icon,
        }}
      />
      </View>
    )
  }