import { StyleSheet, Text, View, ScrollView, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect, useRef, useContext } from 'react';
import { getValueFor, save } from '../fetchData'
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

const windowHeight = Dimensions.get('window').height;

const WeaponScreen = ({ navigation }) => {
  const [uuid, setUuid] = useState([]);

  useEffect(() => {
    getValueFor("allData").then(res => {
      res = JSON.parse(res);
      res = res.data;
      const tempUuid = [];

      for (const element of res) {
        tempUuid.push({ name: element.displayName, icon: element.displayIcon });
      }

      setUuid(tempUuid);
    });
  }, []);

  if (uuid.length === 0) {
    return <LoadingScreen />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <PageHead headText="Select A Weapon" />
        <FlatList
          data={uuid}
          numColumns={3}
          contentContainerStyle={styles.flatListContent}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item }) => <Tile name={item.name} icon={item.icon} navigation={navigation} />}
        />
      </SafeAreaView>
    );
  }
};

export default WeaponScreen;

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
});

const Tile = props => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.square}
      onPress={() => {
        save("currentState", props.name).then(() => {
          navigation.navigate("Skins");
        });
      }}
    >
      <Text style={{ fontFamily: "RobotMain_BOLD", color: appColors.WHITE }}>{props.name}</Text>
      <Image fadeDuration = {0} style={styles.tinyLogo} source={{ uri: props.icon }} />
    </TouchableOpacity>
  );
};
