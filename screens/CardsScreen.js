import { StyleSheet, Text, View, ScrollView, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect, useContext, useRef, useMemo } from 'react';
import { FetchAllCardData, addCardSkin, checkCardSkinAsync, deleteCardSkin, getValueFor } from '../fetchData.js';
import React, {memo} from "react";
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import appColors from '../assets/appColors.js';
import { FetchWeaponbyUUID } from '../fetchData.js';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import LoadingScreen from './LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PageHead } from '../displayComponents.js';
import Ionicons from '@expo/vector-icons/Ionicons'
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const CardsScreen = props => {
  const isFocused = useIsFocused();
  const [loadedCards, setLoadedCards] = useState([]);
  const [reload, hasReloaded] = useState(true);
  const [cardsReady, setCardsReady] = useState(false);
  const [offset, setOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentpage, setCurrentPage] = useState(1);
  const listSize = useRef(12);
  useEffect(() => {                  //effect for navigation opening the page or offset being changed, calling a reload.
    if (isFocused) {
      setLoadedCards([]);
        hasReloaded(!reload);
        setCardsReady(false);
      
    }
  }, [isFocused, offset]);

  useEffect(() => {
    let cards_loading = [];
      FetchAllCardData().then(res => {
        res = res.data;
        setTotalPages(Math.ceil(res.length/listSize.current));
        for(let i = offset; i < offset+(listSize.current); i++) {
          if (i < res.length) {
         let element = res[i];
            checkCardSkinAsync(element.uuid).then(checkOwned => {
              cards_loading.push({ name: element.displayName, icon: element.displayIcon, CardUuid: element.uuid, isOwned: checkOwned });
              setLoadedCards(cards_loading);
            })
          }
        }
      }).then(setTimeout(() => setCardsReady(true), 200));
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

      const renderItem = ({ item }) => <Tile name={item.name} icon={item.icon} CardUuid={item.CardUuid} isOwned={item.isOwned} />
      let cardsList
  if (!cardsReady) {
    cardsList = <LoadingScreen />;
  }
  else {
    cardsList = 
    <FlatList
    data={loadedCards}
    numColumns={3}
    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    contentContainerStyle={styles.flatListContent}
    renderItem={renderItem}
    keyExtractor={(item) => item.CardUuid}
  />
  }
    return (
      <SafeAreaView style={styles.container}>
        <PageHead headText={"All Cards"} />
        {cardsList}
        <View style = {{flexDirection: "row", alignContent:"space-around", justifyContent: "space-between"}}>
        <TouchableOpacity onPress={PrevPage}><Ionicons name="arrow-back-outline"  color={appColors.WHITE} size = {(windowHeight+windowWidth)/11} /></TouchableOpacity>
        <Text style = {styles.numText}>{currentpage}/{totalPages}</Text>
        <TouchableOpacity onPress={NextPage}><Ionicons name="arrow-forward-outline"  color={appColors.WHITE} size = {(windowHeight+windowWidth)/11} /></TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

export default CardsScreen;

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
  numText: {
    fontFamily: "RobotMain_BOLD",
    color: appColors.WHITE,
    fontSize: (windowHeight + windowWidth) / 40,
    alignSelf:"center"
   
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

  useEffect(() => { //add or delete to vault on click
    if (firstLoad.current) {
      firstLoad.current = false;
    } else {
      if (owned) {
        setTileColor(appColors.GREEN);
        addCardSkin(props.CardUuid);
      } else {
        setTileColor(appColors.RED);
        deleteCardSkin(props.CardUuid);
      }
    }
  }, [owned]);

  return (
    <TouchableOpacity
      style={[styles.tile, { backgroundColor: tileColor }]}
      onPress={() => setOwned(!owned)}
    >
      <Text style={styles.tileText}>{props.name}</Text>
      <Image fadeDuration = {0} style={styles.tinyLogo} source={{ uri: props.icon }} />
    </TouchableOpacity>
  );
};

async function vdata() {
  return await getValueFor("Vault");
}
