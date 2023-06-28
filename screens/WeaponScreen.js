import { StyleSheet, Text, View,ScrollView,Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect, useRef, useContext } from 'react';
import {getValueFor, save} from '../fetchData'
import React from "react";
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import appColors from '../assets/appColors.js';
import SkinsScreen from './SkinsScreen.js';
import { PageHead } from '../displayComponents.js';
const windowHeight = Dimensions.get('window').height;

const WeaponScreen = ({navigation}) => {
  
    const [uuid, Setuuid] = useState([]);
    useEffect( () => {
    getValueFor("allData").then(res => { 
      
        res = JSON.parse(res);
        res = res.data;
        const tempUuid = [];
        
      for(const element of res) {
          tempUuid.push({name:element.displayName,icon:element.displayIcon});
        }
        
    Setuuid(tempUuid);})
    },[])
    if (uuid.length == 0) { return <View><Text>Loading</Text></View>}
    else {
   
   return (
    <SafeAreaView style = {sty.container}>
    <PageHead headText = "Select A Weapon"/>
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
    //keyExtractor={element => element?.uuid}
  /></SafeAreaView>
    )
    }
}
export default WeaponScreen;
const sty = StyleSheet.create({
    square: {width: "31.5%",height: 100, backgroundColor: appColors.RED, padding: 10, elevation: 10,
       marginRight: 10, borderRadius: 15, alignItems: "center",marginBottom: 1},

    tinyLogo: {resizeMode: "contain", height: "100%", width: "100%", flex:1},
    container: {backgroundColor: appColors.BLACK, flex: 1},
    
  });
  const Tile = props => {
    const navigation = useNavigation();
    let result = <SkinsScreen item = {props.name}/>
    return (
     
    <TouchableOpacity style = {sty.square} onPress={() => {save("currentState",props.name).then(navigation.navigate("Skins")) }}>
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
 