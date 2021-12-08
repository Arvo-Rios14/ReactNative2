import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ClimaSemana from "../Views/ClimaSemana";
import Home from "../Views/Home";
const Stack = createStackNavigator();

export default function StackNavigator1() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={Home}
      />
      <Stack.Screen
        name="ClimaSemana"
        options={({ route }) => ({
          title: route.params.ciudad,
        })}
        component={ClimaSemana}
      />
    </Stack.Navigator>
  );
}
