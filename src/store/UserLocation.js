import create from "zustand";
import { persist, devtools } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../config";

const LocationStore =(set,get) => ({
  startLocation: null,
  endLocation: null,
  distance: 0,
  price: 0,
  startDescription : null,
  endDescription : null,
  travelTimeInformation : null,
  setStartLocation: (startLocation) => set({ startLocation: startLocation }),
  setEndLocation: (endLocation) => set({ endLocation: endLocation }),
  setDistance: (distance) => set({ distance: distance }),
  setPrice: (price) => {
    set({ price: price });
  },
  setStartDescription: (startDescription) => set({ startDescription: startDescription }),
  setEndDescription: (endDescription) => set({ endDescription: endDescription }),
  setTravelTimeInformation: (travelTimeInformation) => { set({ travelTimeInformation: travelTimeInformation }) },
  clearState: () => {
    set({
      startLocation: null,
      endLocation: null,
      distance: 0,
      price: 0,
      startDescription : null,
      endDescription : null,
      travelTimeInformation : null,
    });
  },
  submitTrip: async () => {
    const token = userLocationStore((state) => state.token);

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;


  const data=  {
      start_location: get().startDescription,
      s_latitude: get().startLocation.lat,
      s_longitude: get().startLocation.lng,
      end_location:get().endDescription,
      d_latitude: get().endLocation.lat,
      d_longitude: get().endLocation.lng,
      distance: get().distance,
      total: get().distance * 1000,
    }

    const response = await axios.post(`${BASE_URL}/api/user/trips/store`,JSON.stringify(data))
    .then((res) => {
      console.log(res);
      if(res.data.success){
        get().clearState();
        return res.data.success;
      }
    })
    .catch(
      (error) => {
        console.log(error);
      }
    )
  },

})

// const userLocationStore = create(
//     persist(LocationStore, {
//         name: "Location",
//         getStorage: () => AsyncStorage,
//     })
// )
const userLocationStore = create(
    LocationStore, {
        name: "LocationUser",
        getStorage: () => AsyncStorage,
    }
)
// const createUserLocationStore = create(userLocationStore);

export default userLocationStore;
