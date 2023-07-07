import { StyleSheet, Text, View, ScrollView, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect, useContext, useRef } from 'react';
import { addVaultSkin, checkVaultSkin, deleteVaultSkin, getValueFor } from '../fetchData.js';
import React from "react";
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import appColors from '../assets/appColors.js';
import { FetchWeaponbyUUID } from '../fetchData.js';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import LoadingScreen from './LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PageHead } from '../displayComponents.js';
import Ionicons from '@expo/vector-icons/Ionicons'
import { ForeignObject } from 'react-native-svg';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const SkinsScreen = props => {
  const isFocused = useIsFocused(); 
  const [weaponName, setWeaponName] = useState("Initial"); //initial weapons use
  const [loadedSkins, setLoadedSkins] = useState([]);
  const [reload, hasReloaded] = useState(true);
  const [skinsReady, setSkinsReady] = useState(false);
  const [offset, setOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentpage, setCurrentPage] = useState(1);
  const listSize = useRef(12)
  useEffect(() => {
    if (isFocused) {
      setLoadedSkins([]);
      getValueFor("currentState").then(res => {
        setWeaponName(res);
        setCurrentPage(1);
        setOffset(0);
        setTotalPages(1);
        hasReloaded(!reload);
        setSkinsReady(false);
      });
    }
  }, [isFocused]);
  useEffect(() => {
      setLoadedSkins([]);
      getValueFor("currentState").then(res => {
        setWeaponName(res);
        hasReloaded(!reload);
        setSkinsReady(false);
      });
  }, [offset]);

  useEffect(() => {
    let skins_loading = [];
    if (weaponName !== "Initial") {
      getValueFor(weaponName.replaceAll('"', '')).then(res => FetchWeaponbyUUID(res)).then(res => {
        res = res.data.skins;
        for (let i = 0; i < res.length; i++) {
          let element = res[i];
          if (typeof(element.contentTierUuid) == 'object') {
            res.splice(i, 1);
          }
        }
       
        setTotalPages(Math.ceil(res.length/listSize.current));
       for(let i = offset; i < offset + listSize.current; i++) {
          
          if (i < res.length) {
            let element = res[i];
          let skinName = element.displayName;
          let iconPNG = element.displayIcon;
          if (iconPNG === null) {
            iconPNG = element.levels[0].displayIcon;
          }
          
          if (element.contentTierUuid !== null) {
            
            checkVaultSkin(element.uuid).then(checkOwned => {
              skins_loading.push({ name: element.displayName, icon: iconPNG, SkinUuid: element.uuid, isOwned: checkOwned });
              setLoadedSkins(skins_loading);
             });
          }}}}
          )
          .then(setTimeout(() => setSkinsReady(true), 200));
    }
  }, [reload]);

  let headerText = weaponName.replaceAll('"', '') + " Skins";

  function NextPage() {
    if (currentpage != totalPages) {
      setOffset(offset+listSize.current);setCurrentPage(currentpage+1)
    }
  }

  function PrevPage() {
    if (currentpage != 1) {
    setOffset(offset-listSize.current);setCurrentPage(currentpage-1)
    }
  }

  const renderItem = ({ item }) => <Tile name={item.name} icon={item.icon} SkinUuid={item.SkinUuid} isOwned={item.isOwned} />
  let skinsList
if (!skinsReady) {
skinsList = <LoadingScreen />;
}
else {
skinsList = 
<FlatList
data={loadedSkins}
numColumns={3}
ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
contentContainerStyle={styles.flatListContent}
renderItem={renderItem}
keyExtractor={(item) => item.SkinUuid}
/>
}
return (
  <SafeAreaView style={styles.container}>
    <PageHead headText={headerText} />
    {skinsList}
    <View style = {{flexDirection: "row", alignContent:"space-around", justifyContent: "space-between"}}>
    <TouchableOpacity onPress={PrevPage}><Ionicons name="arrow-back-outline"  color={appColors.WHITE} size = {(windowHeight+windowWidth)/11} /></TouchableOpacity>
    <Text style = {styles.numText}>{currentpage}/{totalPages}</Text>
    <TouchableOpacity onPress={NextPage}><Ionicons name="arrow-forward-outline"  color={appColors.WHITE} size = {(windowHeight+windowWidth)/11} /></TouchableOpacity>
    </View>
  </SafeAreaView>
);
};

export default SkinsScreen;

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
  tile: {
    width: "31.5%",
    height: 100,
    padding: 10,
    elevation: 10,
    marginRight: 10,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  tileText: {
    fontFamily: "RobotMain_BOLD",
    color: appColors.WHITE,
    fontSize: (windowHeight + windowWidth) / 120,
    minWidth: "50%",
    textAlign: "center",
  },
  tinyLogo: {
    resizeMode: "contain",
    height: "100%",
    width: "100%",
    flex: 1,
  },
  numText: {
    fontFamily: "RobotMain_BOLD",
    color: appColors.WHITE,
    fontSize: (windowHeight + windowWidth) / 40,
    alignSelf:"center"
  },
});

const Tile = props => {
  const [owned, setOwned] = useState(props.isOwned);
  const firstLoad = useRef(true);
  const [tileColor, setTileColor] = useState(owned ? appColors.GREEN : appColors.RED);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
    } else {
      if (owned) {
        setTileColor(appColors.GREEN);
        addVaultSkin(props.SkinUuid);
      } else {
        setTileColor(appColors.RED);
        deleteVaultSkin(props.SkinUuid);
      }
    }
  }, [owned]);

  return (
    <TouchableOpacity
      style={[styles.tile, { backgroundColor: tileColor }]}
      onPress={() => setOwned(!owned)}
    >
      <Text style={styles.tileText}>{props.name}</Text>
      <Image style={styles.tinyLogo} source={{ uri: props.icon }} />
    </TouchableOpacity>
  );
};

async function vdata() {
  return await getValueFor("Vault");
}
