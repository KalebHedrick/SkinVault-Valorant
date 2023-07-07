import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import appColors from '../assets/appColors.js';
import { Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import { PageHead } from '../displayComponents.js';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const TutorialScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
   
  const goBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goForward = () => {
    if (currentPage < images.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  const images = [
  require(`../assets/tutorialPics/tutorial1.gif`),
  require(`../assets/tutorialPics/tutorial2.gif`),
  require(`../assets/tutorialPics/tutorial3.gif`),
  require(`../assets/tutorialPics/tutorial4.gif`)
]
  const Tutorialtext = [
    "Swipe right or tap the text at the top of the screen to open the navigation",
    "Add skins, cards, and buddies to your vault",
    "View, Collect, and Track all of your Vault skins",
    "Generate a random skin or toggle the button to generate a random skin inside your vault",
]
  return (
    <View style={styles.container}>
    <PageHead headText={"Tutorial"}/>
      <Image source={images[currentPage-1]} style={styles.image} resizeMode="contain" />
      <View style = {styles.textContainer}>
      <Text adjustsFontSizeToFit={true} style = {styles.tutorialText}>{Tutorialtext[currentPage-1]}</Text>
      </View>
      <View style={styles.buttonContainer}>
        
        <TouchableOpacity onPress={goBack} >
        <Ionicons name="arrow-back-outline"  color={appColors.WHITE} size = {(windowHeight+windowWidth)/11} />
        </TouchableOpacity>
    <Text style = {styles.pageText}>{currentPage}/{Tutorialtext.length}</Text>
        <TouchableOpacity onPress={goForward} >
        <Ionicons name="arrow-forward-outline"  color={appColors.WHITE} size = {(windowHeight+windowWidth)/11} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:"space-between",
    backgroundColor: appColors.BLACK
  },
  image: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
    marginTop:windowHeight/50,
    borderColor: appColors.RED,
    borderWidth:5
  },
  buttonContainer: {
    width:"100%",
    
    flexDirection: 'row',
    justifyContent: "space-between",
  
    
    alignSelf:"baseline"
  },
  button: {
    height: windowHeight/9,
    width: windowWidth/5,
    
    backgroundColor: appColors.RED,
    borderRadius: 5,
    justifyContent:"center",
    borderColor:appColors.WHITE,
    borderWidth:5
  },
  textContainer: {
    height:"10%",
    width:"80%",
    
  },
  pageText: {
    color: appColors.WHITE,
    textAlign:"center",
    alignSelf:"center",
    fontSize: (windowHeight+windowWidth)/30
  },
  tutorialText: {
    color: appColors.WHITE,
    fontFamily: "RobotMain",
    alignSelf:"center",
    textAlign:"center",
    fontSize:1000
  }
});

export default TutorialScreen;
