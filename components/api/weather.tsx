export async function getWeatherData() {
  const ApiKey = "ebe7d40f50661876680f545220465e3b";
  const lat = "37.729591";
  const lon = "127.080259";

  //let tempScale;
  let response, responseJson;

  try {
    response = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclue=minutely' + '&appid=' + ApiKey);
    return responseJson = await response.json();
  } catch (error) {
    return "Error: " + error;
  }
}