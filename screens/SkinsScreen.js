import { StyleSheet, Text, View, ScrollView, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect, useContext, useRef } from 'react';
import { addVaultSkin, checkVaultSkin, deleteVaultSkin, getValueFor } from '../fetchData.js';
import React from "react";
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

const SkinsScreen = props => {
  const isFocused = useIsFocused();
  const [weaponName, setWeaponName] = useState("Initial");
  const [loadedSkins, setLoadedSkins] = useState([]);
  const [reload, hasReloaded] = useState(true);
  const [skinsReady, setSkinsReady] = useState(false);

  useEffect(() => {
    if (isFocused) {
      setLoadedSkins([]);
      getValueFor("currentState").then(res => {
        setWeaponName(res);
        hasReloaded(!reload);
        setSkinsReady(false);
      });
    }
  }, [isFocused]);

  useEffect(() => {
    let skins_loading = [];
    if (weaponName !== "Initial") {
      getValueFor(weaponName.replaceAll('"', '')).then(res => FetchWeaponbyUUID(res)).then(res => {
        res = res.data.skins;

        for (const element of res) {
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
          }
        }
      }).then(setTimeout(() => setSkinsReady(true), 1000));
    }
  }, [reload]);

  let headerText = weaponName.replaceAll('"', '') + " Skins";

  if (!skinsReady) {
    return <LoadingScreen />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <PageHead headText={headerText} />
        <FlatList
          data={loadedSkins}
          numColumns={3}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          contentContainerStyle={styles.flatListContent}
          renderItem={({ item }) => <Tile name={item.name} icon={item.icon} SkinUuid={item.SkinUuid} isOwned={item.isOwned} />}
        />
      </SafeAreaView>
    );
  }
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
