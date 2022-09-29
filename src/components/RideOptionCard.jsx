import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import tw from "twrnc";
import userLocationStore from "../store/UserLocation";
import Map from "./Map";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import "intl";
import "intl/locale-data/jsonp/en";
import axios from "axios";
import { BASE_URL } from "../config";
import { Button } from "react-native-paper";
import createAuthStore from "../store/AuthStore";
const data = [
  {
    id: "10XTrucks",
    title: "10XTrucks",
  },
];

const SURGE_CHARGE_RATE = 1000;
const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState("10XTrucks");
  const distance = userLocationStore((state) => state.distance);
  const travelTimeInformation = userLocationStore(
    (state) => state.travelTimeInformation
  );
  const startLocation = userLocationStore((state) => state.startLocation);
  const endLocation = userLocationStore((state) => state.endLocation);
  const startDescription = userLocationStore((state) => state.startDescription);
  const endDescription = userLocationStore((state) => state.endDescription);
  const price = userLocationStore((state) => state.price);
  const token = createAuthStore((state) => state.token);
  const clearState = userLocationStore((state) => state.clearState);

  const handleSubmit = async () => {

    try {
      // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const url = `${BASE_URL}/api/user/trips`
      // console.log(url)
      const header = {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        
      };
      const data = new FormData();
      data.append("start_location", startDescription);
      data.append("s_latitude", startLocation.lat);
      data.append("s_longitude", startLocation.lng);
      data.append("end_location", endDescription);
      data.append("d_latitude", endLocation.lat);
      data.append("d_longitude", endLocation.lng);
      data.append("distance", distance);
      data.append("total", price);



      const response = await  axios({
        method: 'post',
        url: url,
        data: data,
        headers: header,
      });

      if(response.data.success === true) {
        // console.log(response.data.data)
        clearState();
        navigation.navigate("Home");
      }


      // const response = await axios.post(url, data, header)
      
        // console.log(response);
    } catch (error) {
      console.log(error);
    }
   
  };

  // console.log(token)

  return (
    <View style={tw`h-full`}>
      <View style={tw`h-3/5`}>
        <TouchableOpacity
          onPress={() => navigation.navigate("UserMapScreen")}
          style={[
            tw`absolute top-10 left-8 z-10 rounded-full bg-white w-14 h-14 shadow-lg`,
            styles.backButtonContainer,
          ]}
        >
          <MaterialCommunityIcons name="chevron-left" size={35} color="black" />
        </TouchableOpacity>
        <Map />
      </View>
      <SafeAreaView style={tw`h-2/5 bg-white`}>
        <View style={tw`p-5`}>
          <Text style={styles.title}>
            Details
          </Text>
        </View>

        <View style={tw`flex-row items-center p-5`}>

          <View>
            <Text style={tw`text-xs`}>
              {startDescription} - {endDescription}

            </Text>
            <Text>
              Time: {travelTimeInformation?.duration?.text}
            </Text>
            <Text>
              Distance : {travelTimeInformation?.distance?.text}
            </Text>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                // currencyDisplay: "",
              }).format(price)}
            </Text>
          </View>
        </View>

        
        

        <View>
          <TouchableOpacity
            onPress={handleSubmit}
            style={tw`h-16 bg-black py-3 m-3 justify-center`}
          >
            <Text style={tw`text-center text-white text-xl`}>
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    textAlign: "center",
  },
  backButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
