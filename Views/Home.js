import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Button } from "react-native";
import { SearchBar } from "react-native-elements";
import Constants from "expo-constants";

const Home = ({navigation}) => {
  const [climaSemanal, setClimaSemanal] = useState([]);
  const [ciudad, setCiudad] = useState("");
  const [msj, setMsj] = useState("Realiza una busqueda");
  const [climaHoy, setClima] = useState({ actual: "", minima: "", maxima: "" });
  const key = "5b24986722ac9e8a3b7b15a427ffed7f";
  const buscarCiudad = (texto) => {
      setClimaSemanal([]);
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${texto}&appid=${key}&units=metric&lang=sp`;
    fetch(URL)
      .then((data) => {
        return data.json();
      })
      .then((clima) => {
        if (clima.message) {
          setMsj("No se encontro una ciudad con ese nombre");
          setClima({});
          //MUESTRO ERROR
          //   console.log(clima.message);
        } else {
            const api_url=`https://api.openweathermap.org/data/2.5/onecall?lat=${clima.coord.lat}&lon=${clima.coord.lon}&exclude=current,minutely,hourly&appid=${key}&units=metric`;
            fetch(api_url).then((data)=>{
                return data.json();
            }).then((data)=>{console.log(data.daily);setClimaSemanal(data.daily)})
          setClima({
            actual: clima.main.temp,
            minima: clima.main.temp_min,
            maxima: clima.main.temp_max,
          });
        }
      });
  };

  return (
    <View>
      <SearchBar
        round
        containerStyle={{
          backgroundColor: "transparent",
          borderTopWidth: 0,
          borderBottomWidth: 0,
        }}
        inputStyle={{ backgroundColor: "white" }}
        onChangeText={(texto) => {
          setCiudad(texto);
          buscarCiudad(texto);
        }}
        onClear={() => {
          setCiudad("");
          setMsj("Realiza una busqueda");
        }}
        value={ciudad}
        placeholder="Escribe aqui..."
      />
      {climaHoy.actual ? (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text> Actual: {climaHoy.actual} °C</Text>
          <Text> Minima: {climaHoy.minima} °C</Text>
          <Text> Maxima: {climaHoy.maxima} °C</Text>
          <Button
            onPress={()=>navigation.navigate('ClimaSemana', {
                lista: climaSemanal,
                ciudad:ciudad
              })}
            title="Consultar"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      ) : (
        <Text style={{ alignSelf: "center" }}>{msj}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: "flex-start",
    backgroundColor: "#4c4949",
  },
  images: {
    width: 100,
    height: 150,
    margin: 5,
  },
  texto: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
    margin: 10,
    fontWeight: "bold",
  },
});
export default Home;
