import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { BASE_URL } from '../config';
import createAuthStore from '../store/AuthStore';
import userLocationStore from '../store/UserLocation';
import tw from 'twrnc'


const Header = () => {
  const token = createAuthStore((state) => state.token);
  const setToken = createAuthStore((state) => state.setToken);
  const successLogout = createAuthStore((state) => state.successLogout);
  const clearState = userLocationStore((state) => state.clearState);
  const [error, setError] = React.useState(null);
  const _handleMore = async () => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axios.post(`${BASE_URL}/api/auth/logout`)
    .then((res) => {
      if (res.data.success) {
        setToken(null);
        clearState();
        successLogout();
      }  
    })
    .catch((err) => {
      console.log(err);
      setToken(null);
      clearState();
      successLogout();
      setError(err.response.data.message);
    })

    }catch{
      setToken(null);
      clearState();
      successLogout();
      setError("Something went wrong");
    }
  };

  return (
    <>
      <Appbar.Header style={tw`mt-0`} >
        <Appbar.Content title="10xTrucks"  style={{alignItems:'center'}}/>
        <Appbar.Action icon="logout" onPress={_handleMore} />
      </Appbar.Header>
    </>
  );
};

export default Header;