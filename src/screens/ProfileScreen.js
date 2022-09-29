import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

export default function ProfileScreen({ navigation }) {
  return (
    <View >
        <Text>profile Screen</Text>
        <Button
          title="Go to Login"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
  );
}
