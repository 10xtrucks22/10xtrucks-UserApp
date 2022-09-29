import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import tw from "twrnc";
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
import Loading from "./Loading";

import { useFonts } from "expo-font";
import userLocationStore from "../store/UserLocation";
const NavOptions = () => {
  const navigation = useNavigation();
  const stateLocation = userLocationStore((state) => state.startLocation);


  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./../assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <Loading />;
  }


  const DATA = [
    {
      id: "123",
      title: "Get Ride",
      image: require("./../assets/images/ride.png"),
      screen: "GetRide",
    },
  ];
  return (
    <FlatList
      data={DATA}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={true }
      renderItem= {( {item} ) => (
        <TouchableOpacity
        onPress={() => navigation.navigate(item.screen)}
        style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
        disabled={stateLocation == null ? true : false} 
      >
        <View style={tw`${ stateLocation== null ? 'opacity-20' : ''}`}>
          <Image
            source={item.image}
            style={{ width: 120, height: 120, resizeMode: "contain" }}
          />
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 15,
              fontFamily: "Roboto-Medium",
            }}
          >
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
