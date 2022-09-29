import {View, ActivityIndicator} from 'react-native';
import React from 'react'

const Loading = () => {
  return (
    <View
    style={{
      flex: 1,
      justifyContent: 'center',
    }}>
    <ActivityIndicator color={'#000'} animating={true} size="small"/>
  </View>
  )
}

export default Loading
