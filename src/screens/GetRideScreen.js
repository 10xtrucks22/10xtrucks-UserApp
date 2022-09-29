import { useFonts } from "expo-font";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import Loading from "../components/Loading";
import MapView from "react-native-maps";
import Map from "../components/Map";
import NavOptions from "../components/NavOptions";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigateCard from "../components/NavigateCard";
import RideOptionCard from "../components/RideOptionCard";
export default function GetRideScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./../assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <Loading />;
  }
  const Stack = createNativeStackNavigator();

  return (
      <View>
        <View style={tw`h-1/2`}>
          <Map />
        </View>
        <View style={tw`h-1/2`}>
          <Stack.Navigator>
            <Stack.Screen
              name="NavigateCard"
              component={NavigateCard}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="RideOptionCard"
              component={RideOptionCard}
              options={{
                headerShown: false,
              }}
      
            />
          </Stack.Navigator>
        </View>
      </View>
  );
}
