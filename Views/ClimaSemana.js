import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Button } from "react-native";
import { SearchBar, Card, ListItem } from "react-native-elements";
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";

const ClimaSemana = ({ route }) => {
  const { lista, ciudad } = route.params;
  const createDate = (dt) => {
    var day = new Date(dt * 1000);
    day = day.toLocaleString("es-mx", { weekday: "long" }).toUpperCase();
    return day;
  };

  return (
    <ScrollView
      contentContainerStyle={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.Container}>
        {lista.map((prop, key) => {
          console.log(prop.temp.day, key);
          return (
            <View key={key} style={styles.card}>
              <Text key={key} style={{ fontSize: 24, color: "white" }}>
                {createDate(prop.dt)} {"\n"}Temperatura actual: {prop.temp.day}{" "}
                °C{"\n"}Temperatura Maxima: {prop.temp.max} °C{"\n"}Temperatura
                Minima: {prop.temp.min} °C
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container: {
    marginTop: Constants.statusBarHeight,
    justifyContent: "Center",
    backgroundColor: "white",
    width: "100%",
    display: "contents",
  },
  card: {
    width: "60%",
    textAlign: "center",
    borderRadius: "25%",
    backgroundColor: "#a8d5e5",
    flex: 1,
    marginBottom: "2%",
  },
});
export default ClimaSemana;
