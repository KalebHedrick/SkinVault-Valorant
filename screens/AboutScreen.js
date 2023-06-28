import { StyleSheet, Text, View,ScrollView,Button, Image, FlatList, TouchableOpacity } from 'react-native';
import React from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import appColors from '../assets/appColors.js';
import { Dimensions } from 'react-native';
import { PageHead } from '../displayComponents.js';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const AboutScreen = () => {
    return (<>
        
        <SafeAreaView id = "Page-Container" style = {sty.container}>
        <PageHead headText="About"/>
        <View id = "Information-Panel" style = {sty.info}><Text style = {sty.text}>
            VaultSkin was created 
        </Text></View>
            
        </SafeAreaView>
    </>)
}
export default AboutScreen;
const sty = StyleSheet.create({
    info: {height: windowHeight/5, width: windowWidth/2.2, alignSelf:"center", backgroundColor: appColors.BLACK, marginTop: 30},
    container: {backgroundColor: appColors.BLACK, flex: 1},
    text: {fontFamily: "RobotMain", fontSize:(windowHeight+windowWidth)/50, color: appColors.WHITE }
  });