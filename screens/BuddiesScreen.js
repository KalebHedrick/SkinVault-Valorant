import { StyleSheet, Text, View, ScrollView, Button, Image, FlatList, TouchableOpacity, Alert, Modal } from 'react-native';
import { useState, useEffect, useRef, useContext } from 'react';
import { getValueFor, save, FetchAllBuddyData } from '../fetchData'
import React from "react";
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import appColors from '../assets/appColors.js';
import SkinsScreen from './SkinsScreen.js';
import { PageHead } from '../displayComponents.js';
import { LinearGradient } from 'expo-linear-gradient';
import LoadingScreen from './LoadingScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BuddiesScreen = ({ navigation }) => {
  const [card, setCard] = useState([]);
  const [displayCard, setDisplayCard] = useState(false);
  const [visibleCard, setVisibleCard] = useState("");
  const [reload, setReload] = useState(true);
  const [firstReload, isFirstReload] = useState(true);
  useEffect(() => {
    FetchAllBuddyData().then(res => {
      res = res.data;
      const tempcard = [];

      for (const element of res) {
        tempcard.push({ name: element.displayName, icon: element.displayIcon });
      }

      setCard(tempcard);
    });
  }, []);
  useEffect(() => {
    if (!firstReload) {
    setDisplayCard(false)
    }
    else {
        isFirstReload(false);
    }
}, [reload]);

  if (card.length === 0) {
    return <LoadingScreen />;
  } else {
    if (!displayCard) {
        result = <FlatList
        data={card}
        numColumns={3}
        contentContainerStyle={styles.flatListContent}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <Tile name={item.name} icon={item.icon} largeIcon={item.largeIcon} navigation={navigation} onPress={() => {setVisibleCard(item.icon);setDisplayCard(true)}} />
        )}
      />
    }
    else {
        result = <><TouchableOpacity style = {styles.BackButton} onPress={() => setReload(!reload)}>
        <Text style = {styles.optionText}>Go Back</Text>
        </TouchableOpacity>
        <Image style={styles.tinyLogo} source={{ uri: visibleCard }} /></>
    }
    return (
      <SafeAreaView style={styles.container}>
        <PageHead headText="All Buddies" />
        {result}
      </SafeAreaView>
    );
  }
};

export default BuddiesScreen;

const Tile = props => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.square} onPress={props.onPress}>
      <Text style={{ fontFamily: "RobotMain", color: appColors.WHITE, minWidth: "50%", fontSize: (windowHeight + windowWidth) / 120 }}>{props.name}</Text>
      <Image style={styles.tinyLogo} source={{ uri: props.icon }} />
    </TouchableOpacity>
  );
};

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
    backgroundColor: appColors.RED,
  },
  tinyLogo: {
    resizeMode: "contain",
    height: "100%",
    width: "100%",
    flex: 1,
  },
  BackButton: {
    width: (windowHeight + windowWidth) / 7,
    height: (windowHeight + windowWidth) / 12,
    borderWidth: 5,
    alignItems:"center",
    justifyContent:"center",
    alignSelf: "center",
    borderColor: appColors.RED
},
optionText: {
    fontFamily: "RobotMain",
    fontSize: (windowHeight + windowWidth) / 70,
    color: appColors.WHITE,
    textAlign: "center",
    opacity:1,
},
});
