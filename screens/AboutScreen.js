import { StyleSheet, Text, View,ScrollView,Button, Image, FlatList, TouchableOpacity, Linking } from 'react-native';
import React from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import appColors from '../assets/appColors.js';
import { Dimensions } from 'react-native';
import { PageHead } from '../displayComponents.js';
import Ionicons from '@expo/vector-icons/Ionicons'
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const AboutScreen = () => {
    return (<>
        
        <SafeAreaView id = "Page-Container" style = {sty.container}>
        <PageHead headText="About"/>
        <View id = "Information-Panel" style = {sty.info}>
        <Text style = {sty.text}>
            VaultSkin was created as a tool for easily keeping track of a players owned Valorant skins. The app was developed by 
            Kaleb Hedrick as a personal project.
        </Text></View>
        <TouchableOpacity onPress={() => {
      Linking.openURL("https://github.com/KalebHedrick");
    }} style = {{alignContent: "flex-start", flexDirection: "row"}}>
        <Ionicons name="logo-github" size={102} color= {appColors.WHITE} />
        <Text style = {sty.text2}>https://github.com/KalebHedrick</Text>
        </TouchableOpacity>
        </SafeAreaView>
    </>)
}
export default AboutScreen;
const sty = StyleSheet.create({
    info: {height: windowHeight/5, width: windowWidth, alignSelf:"center", backgroundColor: appColors.BLACK, marginTop: 30},
    container: {backgroundColor: appColors.BLACK, flex: 1},
    text: {fontFamily: "RobotMain", fontSize:(windowHeight+windowWidth)/60, color: appColors.WHITE },
    text2: {fontFamily: "RobotMain", fontSize:(windowHeight+windowWidth)/65, color: "lightblue", padding: 30 }
  });