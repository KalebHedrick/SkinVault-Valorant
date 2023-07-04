import { StyleSheet, Text, View, ScrollView, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect, useContext, useRef, useMemo } from 'react';
import { FetchAllCardData, addCardSkin, checkCardSkin, deleteCardSkin, getValueFor } from '../fetchData.js';
import React, {memo} from "react";
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import appColors from '../assets/appColors.js';
import JsonQuery from 'json-query';
import { FetchWeaponbyUUID } from '../fetchData.js';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import LoadingScreen from './LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PageHead } from '../displayComponents.js';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const CardsScreen = props => {
  const isFocused = useIsFocused();
  const [loadedCards, setLoadedCards] = useState([]);
  const [reload, hasReloaded] = useState(true);
  const [cardsReady, setCardsReady] = useState(false);

  useEffect(() => {
    if (isFocused) {
      setLoadedCards([]);
        hasReloaded(!reload);
        setCardsReady(false);
      
    }
  }, [isFocused]);

  useEffect(() => {
    let cards_loading = [];
      FetchAllCardData().then(res => {
        res = res.data;

        for (const element of res) {
            checkCardSkin(element.uuid).then(checkOwned => {
              cards_loading.push({ name: element.displayName, icon: element.displayIcon, CardUuid: element.uuid, isOwned: checkOwned });
              setLoadedCards(cards_loading);
            });
        }
      }).then(setTimeout(() => setCardsReady(true), 1000));
      }, [reload]);
      const renderItem = ({ item }) => <Tile name={item.name} icon={item.icon} CardUuid={item.CardUuid} isOwned={item.isOwned} />
  if (!cardsReady) {
    return <LoadingScreen />;
  }
   else {
    return (
      <SafeAreaView style={styles.container}>
        <PageHead headText={"All Cards"} />
        <FlatList
          data={loadedCards}
          numColumns={3}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          contentContainerStyle={styles.flatListContent}
          renderItem={renderItem}
          windowSize={2}
          
        />
      </SafeAreaView>
    );
  }
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
    fontFamily: "RobotMain",
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
      <Image style={styles.tinyLogo} source={{ uri: props.icon }} />
    </TouchableOpacity>
  );
};

async function vdata() {
  return await getValueFor("Vault");
}
