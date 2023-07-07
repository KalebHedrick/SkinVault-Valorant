import { StyleSheet, Text, View, ScrollView, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect, useContext, useRef, useMemo } from 'react';
import { FetchAllBuddyData, addBuddySkin, checkBuddySkinAsync, deleteBuddySkin, getValueFor } from '../fetchData.js';
import React, {memo} from "react";
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import appColors from '../assets/appColors.js';
import { FetchWeaponbyUUID } from '../fetchData.js';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import LoadingScreen from './LoadingScreen.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PageHead } from '../displayComponents.js';
import Ionicons from '@expo/vector-icons/Ionicons'
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const BuddysScreen = props => {
  const isFocused = useIsFocused();
  const [loadedBuddys, setLoadedBuddys] = useState([]); //array of buddy objects
  const [reload, hasReloaded] = useState(true); //reload page state
  const [buddysReady, setBuddysReady] = useState(false); //buddys have been loaded into array
  const [offset, setOffset] = useState(0); //tile offset to only render specific tiles from array
  const [totalPages, setTotalPages] = useState(1); //state for total pages
  const [currentpage, setCurrentPage] = useState(1); //current page number
  const listSize = useRef(12);
  useEffect(() => {                  //effect for navigation opening the page or offset being changed, calling a reload.
    if (isFocused) {
      setLoadedBuddys([]);
        hasReloaded(!reload);
        setBuddysReady(false);
    }
  }, [isFocused, offset]);

  useEffect(() => {
    let buddys_loading = [];
      FetchAllBuddyData().then(res => {
        res = res.data;
        setTotalPages(Math.ceil(res.length/listSize.current));
        for(let i = offset; i < offset+(listSize.current); i++) {
          if (i < res.length) {
         let element = res[i];
            checkBuddySkinAsync(element.uuid).then(checkOwned => {
              buddys_loading.push({ name: element.displayName, icon: element.displayIcon, BuddyUuid: element.uuid, isOwned: checkOwned });
              setLoadedBuddys(buddys_loading);
            })
          }
        }
      }).then(setTimeout(() => setBuddysReady(true), 200));
      }, [reload]);

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

      const renderItem = ({ item }) => <Tile name={item.name} icon={item.icon} BuddyUuid={item.BuddyUuid} isOwned={item.isOwned} />
      let buddysList
  if (!buddysReady) {
    buddysList = <LoadingScreen />;
  }
  else {
    buddysList = 
    <FlatList
    data={loadedBuddys}
    numColumns={3}
    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    contentContainerStyle={styles.flatListContent}
    renderItem={renderItem}
    keyExtractor={(item) => item.BuddyUuid}
  />
  }
    return (
      <SafeAreaView style={styles.container}>
        <PageHead headText={"All Buddies"} />
        {buddysList}
        <View style = {{flexDirection: "row", alignContent:"space-around", justifyContent: "space-between"}}>
        <TouchableOpacity onPress={PrevPage}><Ionicons name="arrow-back-outline"  color={appColors.WHITE} size = {(windowHeight+windowWidth)/11} /></TouchableOpacity>
        <Text style = {styles.numText}>{currentpage}/{totalPages}</Text>
        <TouchableOpacity onPress={NextPage}><Ionicons name="arrow-forward-outline"  color={appColors.WHITE} size = {(windowHeight+windowWidth)/11} /></TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

export default BuddysScreen;

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
    fontFamily: "RobotMain",
    color: appColors.WHITE,
    fontSize: (windowHeight + windowWidth) / 120,
    minWidth: "50%",
    textAlign: "center",
  },
  numText: {
    fontFamily: "RobotMain",
    color: appColors.WHITE,
    fontSize: (windowHeight + windowWidth) / 60,
    textAlign: "auto"
  },
  tinyLogo: {
    resizeMode: "contain",
    height: "100%",
    width: "100%",
    flex: 1,
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
        addBuddySkin(props.BuddyUuid);
      } else {
        setTileColor(appColors.RED);
        deleteBuddySkin(props.BuddyUuid);
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
