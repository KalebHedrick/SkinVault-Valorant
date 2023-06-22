import { StyleSheet, Text, View,ScrollView,Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import {getValueFor} from '../fetchData.js';
import React from "react";
import { Dimensions, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import appColors from '../assets/appColors.js';
import JsonQuery from 'json-query';
import { FetchWeaponbyUUID } from '../fetchData.js';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
const windowHeight = Dimensions.get('window').height;

const SkinsScreen = props => {
  const isFocused = useIsFocused()
const [weaponName, setWeaponName] = useState("Initial")
const [uuid, Setuuid] = useState([]);

useEffect( () => {
  if (isFocused) {
    getValueFor("currentState").then(res => setWeaponName(res)).then(console.log("confirm"))
  }
   },[isFocused])
    useEffect( () => {
    getValueFor(weaponName.replaceAll('"','')).then(res => {return FetchWeaponbyUUID(res)}).then((res) => {
        
        res = res.data.skins;
     
        
        const tempUuid = [];
        let rowSide = 0;
      for(const element of res) {
        let skinName = element.displayName;
        let iconPNG = element.displayIcon;
        if (iconPNG == null) {
          console.log(skinName);
         iconPNG = element.levels[0].displayIcon
        }
       if(element.contentTierUuid != null)
        {
          tempUuid.push({name:element.displayName,icon:iconPNG});
        }
        }
        
    Setuuid(tempUuid);})
},[weaponName])
    if (uuid.length == 0) { return <View><Text>Loading</Text></View>}
    else {
   
   return (
    <SafeAreaView style = {sty.container}>
    <View style = {{alignItems: "center"}}>
    <Text style= {{fontFamily:"RobotMain", color: appColors.RED, fontSize: 33,
    padding: 15, borderBottomWidth: 5, borderColor: appColors.WHITE}}>{weaponName.replaceAll('"','')} skins</Text>
    </View>
    <FlatList
    data={uuid}
    numColumns={3}
    borderLeftWidth={10}
    borderRightWidth={10}
    borderColor = {appColors.BLACK}
    flex = {0}
    padding = {10}
    ItemSeparatorComponent={() => <View style={{height: 10}} />}
    renderItem={({item}) => <Tile name = {item.name} icon = {item.icon}/>}
    
  /></SafeAreaView>
    )
    }
}
export default SkinsScreen;
const sty = StyleSheet.create({
    square: {width: "31.5%",height: 100, backgroundColor: appColors.RED, padding: 10, elevation: 10,
       marginRight: 10, borderRadius: 15, alignItems: "center",marginBottom: 10},

    tinyLogo: {resizeMode: "contain", height: "100%", width: "100%", flex:1},
    container: {backgroundColor: appColors.BLACK, flex: 1},
    
  });
  const Tile = props => {
    return (
      
      <TouchableOpacity style = {sty.square}>
        <Text style = {{fontFamily: "RobotMain", color: appColors.BLACK}}>{props.name}</Text>
        <Image
        style={sty.tinyLogo}
        source={{
          uri: props.icon,
        }}
      />
      </TouchableOpacity>
      
    )
  }
