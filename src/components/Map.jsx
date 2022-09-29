import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, View, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";

import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAP_API_KEY } from "../config";

import userLocationStore from "../store/UserLocation";

import * as Location from "expo-location";
import axios from "axios";

const Map = () => {
  const origin = userLocationStore((state) => state.startLocation);
  const destination = userLocationStore((state) => state.endLocation);
  const startDescription = userLocationStore((state) => state.startDescription);
  const endDescription = userLocationStore((state) => state.endDescription);
  const setOrigin = userLocationStore((state) => state.setStartLocation);
  const setDestination = userLocationStore((state) => state.setEndLocation);
  const setTravelTimeInformation = userLocationStore(
    (state) => state.setTravelTimeInformation
  );

  const [loading,setLoading] = useState(true);
  const setDistance = userLocationStore((state) => state.setDistance);
  const setPrice = userLocationStore((state) => state.setPrice);

  const mapRef = useRef();
  const [initialLocation, setInitialLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const [currentLocation, setCurrentLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [destinationLocation, setDestinationLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const [errorMsg, setErrorMsg] = useState(null);

  
  const fetchLocation = async () => {
    setLoading(true);
    if (origin && destination) {
      setCurrentLocation({
        latitude: origin.lat,
        longitude: origin.lng,
      });

      setDestinationLocation({
        latitude: destination.lat,
        longitude: destination.lng,
      });
    }

    const { status } = await Location.requestForegroundPermissionsAsync();


    const deviceLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    setInitialLocation({
      latitude: deviceLocation.coords.latitude,
      longitude: deviceLocation.coords.longitude,
    });
    setLoading(false);
  };
  
  React.useEffect(() => {
    fetchLocation();
  }, [])

  

  useEffect(() => {
    if (origin && destination && mapRef.current?.fitToElements ){
      mapRef.current.fitToElements(["origin, destination"], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      });
    }
  }, [origin, destination]);
  useEffect(() => {
    if (!origin || !destination) return;
      if (origin && destination && mapRef.current?.fitToElement) {
        mapRef.current.fitToElements(["origin, destination"], {
          edgePadding: { top: 50, right: 60, bottom: 50, left: 60 },
        });
      }
  }, []);
  useEffect(() => {
    if (!origin || !destination) return;
    const getTravelTime = async () => {
      try {
        await axios
          .get(
            `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${startDescription}&destinations=${endDescription}&key=${GOOGLE_MAP_API_KEY}`
          )
          .then((res) => {
            if (res.data) {
              if (res.data.rows[0].elements[0].status === "OK") {
                let value = res.data.rows[0].elements[0].distance.value;
                let data = value/1609 * 1;
                setDistance(value/1609);
                setPrice(data);
                setTravelTimeInformation(res.data.rows[0].elements[0]);
                console.log(res.data.rows[0].elements[0])
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch {
        console.log("error");
      }
    };
    getTravelTime();
  }, [origin, destination, GOOGLE_MAP_API_KEY]);

  // console.log(mapRef);

  return (
    <View  style={tw`flex-1`}>
      {loading ? (<View>
        <Text>Loading...</Text>
        <Text>{errorMsg}</Text>
      </View>
      ) : (
      <MapView
        ref={mapRef}
        style={tw`flex-1`}
        mapType="mutedStandard"
        initialRegion={{
          latitude: !origin ? initialLocation?.latitude : origin?.lat,
          longitude: !origin ? initialLocation?.longitude : origin?.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {origin && destination && (
          <MapViewDirections
            origin={{
              latitude: origin.lat,
              longitude: origin.lng,
            }}
            destination={{
              latitude: destination.lat,
              longitude: destination.lng,
            }}
            apikey={GOOGLE_MAP_API_KEY}
            strokeWidth={3}
            strokeColor="black"
          />
        )}
        {origin && (
          <Marker
            coordinate={{
              latitude: origin?.lat,
              longitude: origin?.lng,
            }}
            title="Origin"
            description={startDescription}
            identifier={"origin"}
          >
            <View>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: "contain",
                }}
                source={require("../img/o-m.png")}
              />
            </View>
          </Marker>
        )}
        {destination && (
          <Marker
            coordinate={{
              latitude: destination.lat,
              longitude: destination.lng,
            }}
            title="Destination"
            description={endDescription}
            identifier={"destination"}
          >
            <View>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: "contain",
                }}
                source={require("../img/d-m.png")}
              />
            </View>
          </Marker>
        )}
      </MapView>
      )}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({});
