import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';


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
  const images = [require(`../assets/tutorialPics/tutorial1.jpg`),
  require(`../assets/tutorialPics/tutorial2.png`),require(`../assets/tutorialPics/tutorial3.png`)]

  return (
    <View style={styles.container}>
      <Image source={images[currentPage]} style={styles.image} resizeMode="contain" />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={goBack} style={styles.button}>
          <Text style={styles.buttonText}>{`< Back (${currentPage}/${images.length})`}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goForward} style={styles.button}>
          <Text style={styles.buttonText}>{`Forward (${currentPage}/${images.length}) >`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '80%',
    height: '60%',
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TutorialScreen;
