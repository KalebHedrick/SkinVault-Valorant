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
import {Loading} from './LoadingScreen.js';
const windowHeight = Dimensions.get('window').height;

const SkinsScreen = props => {
  const isFocused = useIsFocused()
const [weaponName, setWeaponName] = useState("Initial")
const [loadedSkins, setLoadedSkins] = useState([]);

useEffect( () => {
  if (isFocused) {
    setLoadedSkins([])
    getValueFor("currentState").then(res => setWeaponName(res))
  }
   },[isFocused])
    useEffect( () => {
      if (weaponName != "Initial") {
    getValueFor(weaponName.replaceAll('"','')).then(res => {return FetchWeaponbyUUID(res)}).then((res) => {
        res = res.data.skins;
        const skins_loading = [];
      for(const element of res) {
        let skinName = element.displayName;
        let iconPNG = element.displayIcon;
        if (iconPNG == null) {
          console.log(skinName);
         iconPNG = element.levels[0].displayIcon
        }
       if(element.contentTierUuid != null)
        {
          skins_loading.push({name:element.displayName,icon:iconPNG, SkinUuid:element.uuid});
        }
        }
        
        setLoadedSkins(skins_loading)
      }
      )}},[weaponName])
    if (loadedSkins.length == 0) { return <Loading/>}
    else {
   
   return (
    <SafeAreaView style = {sty.container}>
    <View style = {{alignItems: "center"}}>
    <Text style= {{fontFamily:"RobotMain", color: appColors.RED, fontSize: 33,
    padding: 15, borderBottomWidth: 5, borderColor: appColors.WHITE}}>{weaponName.replaceAll('"','')} Skins</Text>
    </View>
    <FlatList
    data={loadedSkins}
    numColumns={3}
    borderLeftWidth={10}
    borderRightWidth={10}
    borderColor = {appColors.BLACK}
    flex = {0}
    padding = {10}
    ItemSeparatorComponent={() => <View style={{height: 10}} />}
    renderItem={({item}) => <Tile name = {item.name} icon = {item.icon} SkinUuid = {item.SkinUuid} />}
    
  /></SafeAreaView>
    )
    }
}
export default SkinsScreen;
const sty = StyleSheet.create({
    square: {width: "31.5%",height: 100, padding: 10, elevation: 10, backgroundColor: appColors.RED,
       marginRight: 10, borderRadius: 15, alignItems: "center",marginBottom: 10},

    tinyLogo: {resizeMode: "contain", height: "100%", width: "100%", flex:1},
    container: {backgroundColor: appColors.BLACK, flex: 1},
    
  });
  const Tile = props => {
    const [owned, setOwned] = useState(false);
    let tileColor = appColors.RED;
    if (owned) { 
      tileColor = "green";
    }
    sty.square.backgroundColor = tileColor;
    return (
      
      <TouchableOpacity style = {sty.square} onPress={() => {setOwned(!owned);  }} >
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
