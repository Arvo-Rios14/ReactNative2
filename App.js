import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator1 from "./Navigation/StackNavigation1";

export default function App() {
  return (
    <NavigationContainer>
        <StackNavigator1></StackNavigator1>
    </NavigationContainer>
  );
}


