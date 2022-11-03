import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList,DrawerItem } from "@react-navigation/drawer";

import HomeScreen from "../screens/HomeScreen";

import MapScreen from "../screens/MapScreen";
import InvoiceScreen from "../screens/InvoiceScreen";
import TripsScreen from "../screens/TripsScreen";

import NewPackageScreen from "../screens/NewPackageScreen";
import PackageScreen from "../screens/PackageScreen";
import InvoiceDetailsScreen from "../screens/InvoiceDetailsScreen";
import TripDetailsScreen from "../screens/TripDetailsScreen";
import createAuthStore from "../store/AuthStore";
import userLocationStore from "../store/UserLocation";
import { primary, textWhite } from "../config/color";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();



function Root() {
  
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
    console.log(res)
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
    <Drawer.Navigator 
    
    initialRouteName="Home" drawerContent={props => {
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem label="Logout" onPress={() => _handleMore() } />
        </DrawerContentScrollView>
      )
    }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="New Trip" component={MapScreen} />
      <Drawer.Screen name="Invoices List" component={InvoiceScreen} />
      <Drawer.Screen name="Trips History" component={TripsScreen} />
      <Drawer.Screen name="Load History" component={PackageScreen} />
      
    </Drawer.Navigator>
  );
}




const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={Root}
        options={{
          title: "10xTrucks",
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: textWhite,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: "Get a Ride",
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: textWhite,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Invoices"
        component={InvoiceScreen}
        options={{
          title: "Invoices",
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: textWhite,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
        <Stack.Screen
        name="InvoicesDetails"
        component={InvoiceDetailsScreen}
        options={{
          title: "Invoices Details",
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: textWhite,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

        <Stack.Screen
        name="TripDetails"
        component={TripDetailsScreen}
        options={{
          title: "Details",
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: textWhite,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />


      <Stack.Screen
        name="Trips"
        component={TripsScreen}
        options={{
          title: "Trips",
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: textWhite,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
        name="Packages"
        component={PackageScreen}
        options={{
          title: "Loads",
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: textWhite,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="NewPackage"
        component={NewPackageScreen}
        options={{
          title: "New Loads",
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: textWhite,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
