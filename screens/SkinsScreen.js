import { StyleSheet, Text, View,ScrollView,Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect, useContext, useRef } from 'react';
import {addVaultSkin, checkVaultSkin, deleteVaultSkin, getValueFor} from '../fetchData.js';
import React from "react";
import { Dimensions, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import appColors from '../assets/appColors.js';
import JsonQuery from 'json-query';
import { FetchWeaponbyUUID } from '../fetchData.js';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import {Loading} from './LoadingScreen.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowHeight = Dimensions.get('window').height;
let rand = 0;
const SkinsScreen = props => {
  const isFocused = useIsFocused()
const [weaponName, setWeaponName] = useState("Initial")
const [loadedSkins, setLoadedSkins] = useState([]);

useEffect( () => {
  if (isFocused) {
    console.log("hellosdvfsfsfsvsvsd");
    setLoadedSkins([])
    getValueFor("currentState").then(res => setWeaponName(res))
  }
   },[isFocused])
    useEffect( () => {
      const skins_loading = [];
      if (weaponName != "Initial") {
    getValueFor(weaponName.replaceAll('"','')).then(res => {return FetchWeaponbyUUID(res)}).then((res) => {
        res = res.data.skins;
        
      for(const element of res) {
        let skinName = element.displayName;
        let iconPNG = element.displayIcon;
        if (iconPNG == null) {
          console.log(skinName);
         iconPNG = element.levels[0].displayIcon
        }
       if(element.contentTierUuid != null)
        {
          checkVaultSkin(element.uuid).then(checkOwned => {
            console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG")
          skins_loading.push({name:element.displayName,icon:iconPNG, SkinUuid:element.uuid, isOwned: checkOwned});
          })
        }
        }})
        setLoadedSkins(skins_loading)
       
      
        
      
      }},[weaponName])
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
    flex = {1}
    padding = {10}
    ItemSeparatorComponent={() => <View style={{height: 10}} />}
    renderItem={({item}) => <Tile name = {item.name} icon = {item.icon} SkinUuid = {item.SkinUuid} isOwned = {item.isOwned} />}
    
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
    const firstLoad = useRef(true);
    let tileColor = appColors.RED
  useEffect( () => {
    if (firstLoad.current)
     {
      if (props.isOwned == true) {
        tileColor = appColors.GREEN;
      }
      else {
        tileColor = appColors.RED;
      }
      firstLoad.current = false;
    }
    else {
    if (owned) {               //add skin conditional
      tileColor = appColors.GREEN
      addVaultSkin(props.SkinUuid);
      vdata().then(res => console.log(res));

    }
    else {                     //delete skin conditional
      rand++
      tileColor = appColors.RED;
      deleteVaultSkin(props.SkinUuid);
      vdata().then(res => console.log(res));
    }
  }
},[owned])
  sty.square.backgroundColor = tileColor;
    return (
      
      <TouchableOpacity style = {sty.square} onPress={() => {setOwned(!owned)}} >
        <Text style = {{fontFamily: "RobotMain"}}>{props.name}</Text>
        <Image
        style={sty.tinyLogo}
        source={{
          uri: props.icon,
        }}
      />
      </TouchableOpacity>
      
    )
  }
async function vdata() {
  return await getValueFor("Vault");
}