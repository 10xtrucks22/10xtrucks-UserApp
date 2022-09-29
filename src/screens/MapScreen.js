import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "twrnc";
import RideOptionsCard from "../components/RideOptionCard";
import UserMapScreen from "./UserMapScreen";

const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  return (
    <View style={tw`flex-1`}>
      
          <Stack.Navigator>
            
            <Stack.Screen
              name="UserMapScreen"
              component={UserMapScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="RideOptions"
              component={RideOptionsCard}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});


