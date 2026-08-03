// import React, {
//   createContext,
//   useState,
//   useEffect,
//   useContext,
//   ReactNode,
//   FC,
// } from 'react';
// import { Platform, Alert, Linking, AppState } from 'react-native';
// import Geolocation from 'react-native-geolocation-service';
// import Geocoder from 'react-native-geocoding';
// import {
//   requestMultiple,
//   check,
//   PERMISSIONS,
//   RESULTS,
//   request,
// } from 'react-native-permissions';

// type LocationType = {
//   deviceLocation?: string | null;
//   latitude: number | null;
//   longitude: number | null;
//   loading: boolean;
//   error: string | null;
//   refreshLocation: () => void;
// };

// const LocationContext = createContext<LocationType>({
//   latitude: null,
//   longitude: null,
//   loading: false,
//   error: null,
//   refreshLocation: () => {},
// });

// type LocationProviderProps = {
//   children: ReactNode;
// };

// // ⚠️ API key ideally ENV se lo
// Geocoder.init('AIzaSyAY03VcJfNTDlSjAr4bf3bfA_7aNDFixWI', {
//   language: 'en',
// });

// const openSettings = () => {
//   Linking.openSettings().catch(() => {
//     Alert.alert('Error', 'Unable to open settings.');
//   });
// };

// const requestLocationPermission = async (): Promise<boolean> => {
//   try {
//     if (Platform.OS === 'ios') {
//       const status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
//       if (status === RESULTS.GRANTED) return true;
//       const res = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
//       return res === RESULTS.GRANTED;
//     }
//     const fine = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
//     const coarse = await check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
//     if (fine === RESULTS.GRANTED || coarse === RESULTS.GRANTED) {
//       return true;
//     }

//     const status = await requestMultiple([
//       PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//       PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
//     ]);

//     const fineRes = status[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];
//     const coarseRes = status[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION];
//     if (fineRes === RESULTS.GRANTED || coarseRes === RESULTS.GRANTED) {
//       return true;
//     }

//     if (fineRes === RESULTS.BLOCKED && coarseRes === RESULTS.BLOCKED) {
//       Alert.alert(
//         'Permission Blocked',
//         'Please enable location permission from settings.',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Open Settings', onPress: openSettings },
//         ]
//       );
//     }

//     return false;
//   } catch (e) {
//     console.log('Permission error:', e);
//     return false;
//   }
// };

// export const LocationProvider: FC<LocationProviderProps> = ({ children }) => {
//   const [latitude, setLatitude] = useState<number | null>(null);
//   const [longitude, setLongitude] = useState<number | null>(null);
//   const [deviceLocation, setDeviceLocation] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const getLocationName = async (lat: number, lon: number) => {
//     try {
//       const res = await Geocoder.from(lat, lon);
//       setDeviceLocation(res.results?.[0]?.formatted_address ?? null);
//     } catch (e) {
//       console.log('Geocoder error:', e);
//     }
//   };

//   const getLocation = async () => {
//     setLoading(true);
//     setError(null);

//     const hasPermission = await requestLocationPermission();
//     if (!hasPermission) {
//       setLoading(false);
//       setError('Location permission not granted');
//       return;
//     }

//     Geolocation.getCurrentPosition(
//       pos => {
//         const { latitude, longitude } = pos.coords;
//         setLatitude(latitude);
//         setLongitude(longitude);
//         setLoading(false);
//         getLocationName(latitude, longitude);
//       },
//       err => {
//         let msg = 'Unable to fetch location';
//         if (err.code === 1) msg = 'Permission denied';
//         else if (err.code === 2) msg = 'GPS disabled';
//         else if (err.code === 3) msg = 'Location request timed out';

//         setError(msg);
//         setLoading(false);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 20000,
//         maximumAge: 5000,
//         forceRequestLocation: true,
//         showLocationDialog: true,
//       }
//     );
//   };

  
//   useEffect(() => {
//     getLocation();
//   }, []);

//   useEffect(() => {
//     const sub = AppState.addEventListener('change', state => {
//       if (state === 'active') {
//         getLocation();
//       }
//     });

//     return () => sub.remove();
//   }, []);

//   return (
//     <LocationContext.Provider
//       value={{
//         latitude,
//         longitude,
//         deviceLocation,
//         loading,
//         error,
//         refreshLocation: getLocation,
//       }}>
//       {children}
//     </LocationContext.Provider>
//   );
// };

// export const useLocation = () => useContext(LocationContext);
