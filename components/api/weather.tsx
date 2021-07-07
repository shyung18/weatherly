type TempScaleType = 'F' | 'C'

export default async function getWeatherApi(tempScale: TempScaleType) {

    const darkskyURL = "https://api.darksky.net/forecast";
    //const ApiKey = "7711c2819f294564cb912e166a5bb983";
    const ApiKey = "bc93403c5c01303ccfdb0fe8ab518409";    
    const latLon = "42.589611,-70.819806";
    //let tempScale;
  let response, responseJson;
  if (tempScale == "F") {
    try {
      response = await fetch(darkskyURL + "/" + ApiKey + "/" + latLon);
      return responseJson = await response.json();
    } catch (error) {
      return error; }
  } else {
    try {
      response = await fetch(darkskyURL + "/" + ApiKey + "/" + latLon + "?units=si");
	    return responseJson = await response.json();
    } catch (error) {
      return error; }
  }
  }