import axios from "axios";
import * as React from "react";
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { BASE_URL } from "../config";
import tw from "twrnc";
import { Linking, Text, View} from 'react-native'
import { phone } from 'react-native-paper';
import { primary, secondary, textBlack, textWhite } from "../config/color";

const TripDetailsScreen = ({route}) => {
  const { trip} = route.params;
  // console.log(invoice);
  return (
    <Card>
    <Card.Content style={{
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Title>Details</Title>
      <Title>Status: {trip.current_status}</Title>
      <Paragraph>Start: {trip.start_location}</Paragraph>
      <Paragraph>End: {trip.end_location}</Paragraph>
      <Paragraph>Distance: {trip.distance} mile</Paragraph>

      { trip.type == 1 && (
        <>
          <Paragraph>Stackable: {trip.stackable == 1 ? "true" : "false" }</Paragraph>
          <Paragraph>dock_level: {trip.dock_level == 1 ? "true" : "false"}</Paragraph>
          <Paragraph>hazardous: {trip.hazardous == 1 ? "true" : "false" }</Paragraph>
          <Paragraph>fastload: {trip.fastload == 1 ? "true" : "false"}</Paragraph>
          <Paragraph>pieces: {trip.pieces}</Paragraph>
          <Paragraph>dims: {trip.dims}</Paragraph>
          <Paragraph>weight: {trip.total_weight}</Paragraph>
      </>

      )}
      {trip.type == 0 &&
          <Paragraph>Total: $ {trip.total}</Paragraph>
      }
      
    
    </Card.Content>
    {trip.driver && (
    <Card.Content style={{
      alignItems: 'center',
      padding: 10,
    }}>
   
      <Title>Driver Info</Title>
      <Title>Name: {trip?.driver?.first_name} {trip?.driver?.last_name} </Title>
      <Title>Phone: {trip?.driver?.mobile}</Title>

      <View>
      <Button  icon="phone" onPress={()=>{
        Linking.openURL(`tel:${trip?.driver?.mobile}`)

      }}
      mode="contained" 
      
      // color={primary}
      style={{
        fontSize: 12,
        padding: 10,
        backgroundColor: secondary,
      }} >
        Call Driver
      </Button>
      </View>
     
    </Card.Content>
    )}
  </Card>
  );
};

export default TripDetailsScreen;
