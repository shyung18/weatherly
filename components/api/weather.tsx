import * as Location from 'expo-location';
import { LocationGeocodedAddress } from 'expo-location';

export async function getWeatherData() {
  const ApiKey = "ebe7d40f50661876680f545220465e3b";

  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.log(status);
    return;
  }

  let location = await Location.getCurrentPositionAsync({});

  const lat = location.coords.latitude;
  const lon = location.coords.longitude;

  const currentAddress: LocationGeocodedAddress[] = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lon });
  let response, responseJson;

  try {
    response = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclue=minutely' + '&appid=' + ApiKey);
    responseJson = await response.json();
    responseJson.location = currentAddress;
    return responseJson;

  } catch (error) {
    return "Error: " + error;
  }
}