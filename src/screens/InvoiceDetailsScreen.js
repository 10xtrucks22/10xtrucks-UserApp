import axios from "axios";
import * as React from "react";
import { Card, Title, Paragraph, Button, Avatar } from 'react-native-paper';
import { BASE_URL } from "../config";
import tw from "twrnc";
import { primary } from "../config/color";

const InvoiceDetailsScreen = ({route}) => {
  const { invoice} = route.params;
  // console.log(invoice);
  return (
    
    <Card>
      <StatusBar backgroundColor={primary} barStyle="light-content" />
    <Card.Content style={{
      alignItems: 'center',
    }}>
      <Title>Invoice </Title>
      <Paragraph>Start Location: {invoice.trip?.start_location}</Paragraph>
      <Paragraph>End Location: {invoice.trip?.end_location}</Paragraph>
      <Paragraph>Driver Name: {invoice?.driver?.first_name} {invoice?.driver?.last_name} </Paragraph>
      <Paragraph>Driver Mobile: {invoice.driver?.mobile}</Paragraph>
      <Paragraph>Distance: {invoice.distance}</Paragraph>
      <Paragraph>Date: {invoice.created_at}</Paragraph>
      <Paragraph>Amount: {invoice.total}</Paragraph>
      <Paragraph>Status: {invoice.status}</Paragraph>
      
    </Card.Content>
  </Card>
  );
};

export default InvoiceDetailsScreen;
