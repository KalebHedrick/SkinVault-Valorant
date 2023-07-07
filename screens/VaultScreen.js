import { StyleSheet, Text, View, ScrollView, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect, useContext, useRef } from 'react';
import { addVaultSkin, checkVaultSkin, deleteVaultSkin, getValueFor } from '../fetchData.js';
import React from "react";
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import appColors from '../assets/appColors.js';
import { FetchWeaponbyUUID } from '../fetchData.js';
import { NavigationContainer, useIsFocused, useNavigation } from '@react-navigation/native';
import LoadingScreen from './LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PageHead } from '../displayComponents.js';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const VaultScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [loadedSkins, setLoadedSkins] = useState([]);
  const [reload, hasReloaded] = useState(true);
  const [skinsReady, setSkinsReady] = useState(false);

  useEffect(() => {
    if (isFocused) {
        
      setLoadedSkins([]); //reset loaded skins
        hasReloaded(!reload); //trigger a page reload
        setSkinsReady(false); //reset flatlist render trigger
      };
    }
  ,[isFocused]);
  
  useEffect(() => {
    
    getValueFor("allData").then(res => {
      res = JSON.parse(res);
      res = res.data;
      
        addLoadedSkins = async() => { //nested function to add skins to array
            let skins_loading = [];
      for (const element of res) { //for each weapon of allData
        
          let skins = await getOwnedSkinsArr(element.displayName) //gets all skins for given weapon
          
            skins_loading = await skins_loading.concat(skins); //concat the skins to the total owned skin list
            setLoadedSkins(skins_loading) //set new loaded Skins
          }
        }
    addLoadedSkins().then(setTimeout(() => setSkinsReady(true), 1000)); //render page after a second to give time for images to process
    })
  }, [reload]);

  if (!skinsReady) {
    return <LoadingScreen />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <PageHead headText="Vault Skins" />
        <FlatList
          data={loadedSkins}
          numColumns={3}
          contentContainerStyle={styles.flatListContent}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item }) => <Tile name={item.name} icon={item.icon} navigation={navigation} />}
        />
      </SafeAreaView>
    );
  }
};

export default VaultScreen;



const Tile = props => {
  return (
    <TouchableOpacity
      style={styles.square}>
      <Text style={{ fontFamily: "RobotMain", color: appColors.WHITE, minWidth:"50%", fontSize: (windowHeight + windowWidth) / 120, }}>{props.name}</Text>
      <Image style={styles.tinyLogo} source={{ uri: props.icon }} />
    </TouchableOpacity>
  );
};

export const getOwnedSkinsArr = async(name) => { //returns array of all skins from given weapon
        let skins_loading = [];
        let uuid = await getValueFor(name); //get weapon uuid
        let weaponData = await FetchWeaponbyUUID(uuid); //fetch weapon JSON
        weaponData = weaponData.data.skins; //get array of skins from json
        pushSkin = async() => { //function to push each skin into array if it is owned
       for (const skin of weaponData) {
           let skinObj = await perSkin(skin);
           if (skinObj != false) {
           skins_loading.push(skinObj);
           }
        }
        return skins_loading; //return owned skins
    }
    return await pushSkin();
}
const perSkin = async(skin) => { //returns the skin object of given skin
    let skinName = skin.displayName;
    let iconPNG = skin.displayIcon;
    if (iconPNG === null) {
        iconPNG = skin.levels[0].displayIcon;
      }
      if (skin.contentTierUuid !== null) {
       let checkOwned = await checkVaultSkin(skin.uuid)
        if (checkOwned) {
            return ({ name: skinName, icon: iconPNG});
        }
         
}
return false;
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: appColors.BLACK,
    },
    flatListContent: {
      paddingHorizontal: 10,
      paddingTop: 10,
      paddingBottom: 20,
    },
    square: {
      maxWidth: "31.5%",
      height: 100,
      elevation: 10,
      borderRadius: 15,
      alignItems: "center",
      padding: 10,
      marginRight: 10,
      marginBottom: 2,
      display: "flex",
      flex: 1,
      backgroundColor: appColors.GREEN,
    },
    tinyLogo: {
      resizeMode: "contain",
      height: "100%",
      width: "100%",
      flex: 1,
    },
  });