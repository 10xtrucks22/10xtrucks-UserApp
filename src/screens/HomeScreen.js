import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import Loading from "../components/Loading";

import { Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Avatar, Card, IconButton } from "react-native-paper";
import { primary, secondary, textLight, white } from "../config/color";

export default function HomeScreen({ navigation }) {

  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./../assets/fonts/Roboto-Bold.ttf"),
  });


  if (!fontsLoaded) {
    return <Loading />;
  }

  const width = Dimensions.get('window').width;

  const images = [
    {
      id: 1,
      image: require('./../assets/images/img1.jpg'),

    },
    {
      id: 2,
      image: require('./../assets/images/about.jpg'),
    },
    {
      id: 3,
      image: require('./../assets/images/load.png'),
    },
  ]

  const data = [
    {
      id: "1",
      title: "Book Load",
      subtitle: "Book a trucks to your destination",
      icon: 'truck',
      screen: "NewPackage",
    }, 
    // {
    //   id: "7",
    //   title: "New Packages",
    //   subtitle: "Send your packages to your customers",
    //   icon: 'truck-cargo-container',
    //   screen: "NewPackage",
    // },
    {
      id: "2",
      title: "Load History",
      subtitle: "View all your trips",
      icon: 'truck-check',
      screen: "Packages",
    }, 
    {
      id: "3",
      title: "Invoices",
      subtitle: "View all your invoices",
      icon: 'truck',
      screen: "Invoices",
    },
    // {
    //   id: "5",
    //   title: "Packages",
    //   subtitle: "View all your packages",
    //   icon: 'truck-cargo-container',
    //   screen: "Packages",
    // },
  ];




  return (
    <>
      <StatusBar backgroundColor={secondary} barStyle="light-content" />
      <View style={{ flex: 1 }}>
        <ScrollView style={{backgroundColor:white}}>
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={images}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => {
                    // console.log('current index:', index)
                }}
                
                renderItem={({item, index }) => (
                  <>
                    <View
                        key={index}
                        style={{
                            flex: 1,
                            // borderWidth: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Image
                            source={item.image}
                            style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                        />

                    </View>
                    </>
                )}
            />
        </View>
        
        {data &&
          data.length > 0 &&
          data.map((item, index) => (
            <TouchableOpacity     
             key={index} onPress={() => navigation.navigate(item.screen)}>
                 <Card.Title
                  style={{
                    flex: 1,
                    borderColor: primary,
                    borderWidth: 3,
                    borderRadius: 10,
                    margin: 25,
                    padding: 10,
                    textAlign: "center",

                  }}
                  title={item.title}
                  // subtitle={item.subtitle}
                />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

    </>
  );
}
