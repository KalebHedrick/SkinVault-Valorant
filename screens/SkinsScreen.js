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
import { PageHead } from '../displayComponents.js';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const SkinsScreen = props => {
  const isFocused = useIsFocused()
const [weaponName, setWeaponName] = useState("Initial")  //current weapons page state
const [loadedSkins, setLoadedSkins] = useState([]);      //array of all skins
const [reload, hasReloaded] = useState(true);           //state for opening new skin page
const [skinsReady, setSkinsReady] = useState(false);      //state for screen being ready to view
useEffect( () => {
  if (isFocused) {
    setLoadedSkins([])
    getValueFor("currentState").then(res => {setWeaponName(res)
    hasReloaded(!reload); setSkinsReady(false)})

  }
   },[isFocused])
    useEffect( () => {
      let skins_loading = [];
      if (weaponName != "Initial") {
    getValueFor(weaponName.replaceAll('"','')).then(res => {return FetchWeaponbyUUID(res)}).then((res) => {
        res = res.data.skins;
        
      for(const element of res) {
        let skinName = element.displayName;
        let iconPNG = element.displayIcon;
        if (iconPNG == null) {
         iconPNG = element.levels[0].displayIcon
        }
       if(element.contentTierUuid != null)
        {
          checkVaultSkin(element.uuid).then(checkOwned => {
          skins_loading.push({name:element.displayName,icon:iconPNG, SkinUuid:element.uuid, isOwned: checkOwned});
          setLoadedSkins(skins_loading)
          })
        }
        }}).then(setSkinsReady(true))
      }},[reload])
      let headerText = weaponName.replaceAll('"','') + " Skins";
    if (!skinsReady) { return <Loading/>}
    else {
   
   return (
    <SafeAreaView style = {sty.container}>
    <PageHead headText = {headerText}/>
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
    square: {width: "31.5%",height: 100, padding: 10, elevation: 10,
       marginRight: 10, borderRadius: 15, alignItems: "center",marginBottom: 10},

    tinyLogo: {resizeMode: "contain", height: "100%", width: "100%", flex:1},
    container: {backgroundColor: appColors.BLACK, flex: 1},
    
  });
  const Tile = props => {
    const [owned, setOwned] = useState(props.isOwned);
    const firstLoad = useRef(true);
    const [tileColor,setTileColor] = useState(appColors.RED)
  useEffect( () => {
    if (firstLoad.current)
     {
      if (props.isOwned == true) {
        setTileColor(appColors.GREEN);
      }
      else {
        setTileColor(appColors.RED);
      }
      firstLoad.current = false;
    }
    else {
    if (owned) {               //add skin conditional
      setTileColor(appColors.GREEN);
      addVaultSkin(props.SkinUuid);

    }
    else {                     //delete skin conditional
      setTileColor(appColors.RED);
      deleteVaultSkin(props.SkinUuid);
      
    }
  }
},[owned])
    vdata().then(res => console.log(res));
    return (
      
      <TouchableOpacity style = {{width: "31.5%",height: 100, padding: 10, elevation: 10,
      marginRight: 10, borderRadius: 15, alignItems: "center",marginBottom: 10, backgroundColor: tileColor}} onPress={() => {setOwned(!owned)}} >
        <Text style = {{fontFamily: "RobotMain", minWidth: "50%", color: appColors.WHITE, fontSize: (windowHeight+windowWidth)/120}}>{props.name}</Text>
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