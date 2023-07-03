import { StyleSheet, Text, View, ScrollView, Button, Image, FlatList, TouchableOpacity, Animated, Easing } from 'react-native';
import { useState, useEffect } from 'react';
import * as React from 'react';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer, DrawerActions, useNavigation, useIsFocused } from '@react-navigation/native';
import { Divider } from 'react-native-paper';
import appColors from './assets/appColors.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const PageHead = ({ headText }) => {
  const [render, reRender] = useState(true);
  const [menu, setMenu] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  let text;
  if (menu) {
    text = "Open Menu";
  } else {
    text = headText;
  }
  useEffect(() => {
    if (isFocused) {
      reRender(!render);
    }
  }, [isFocused]);

  let scaleValue = new Animated.Value(1);
  const textScale = scaleValue.interpolate({
    inputRange: [1, 1.03],
    outputRange: [1, 1.03],
  });
  let scaleStyle = { transform: [{ scale: textScale }] };
  const duration = 1000;
  Animated.loop(
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.03,
        duration: duration,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: duration,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
    ])
  ).start();

  return (
    <View id="page-header" style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        activeOpacity={0.8}
        onPress={() => navigation.openDrawer()}
        onPressIn={() => setMenu(true)}
        onPressOut={() => setMenu(false)}
      >
        <Animated.View style={scaleStyle}>
          <Text style={styles.headerText}>{text}</Text>
        </Animated.View>
      </TouchableOpacity>

      <Divider style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: windowHeight / 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  menuButton: {
    justifyContent: "center",
    alignSelf: "center",
  },
  headerText: {
    fontFamily: "RobotMain_BOLD",
    color: appColors.WHITE,
    fontSize: (windowHeight + windowWidth) / 30,
    position: "relative",
    right: 6,
  },
  divider: {
    width: "100%",
    height: 5,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    borderRadius: 50,
    backgroundColor: appColors.WHITE,
  },
});
