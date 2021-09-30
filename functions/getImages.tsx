let clearSkyDay = require('../assets/images/weather-icons_clear-day.png');
let clearSkyNight = require('../assets/images/weather-icons_clear-night.png');
let scatteredClouds = require('../assets/images/weather-icons_cloudy.png');
let mist = require('../assets/images/weather-icons_fog.png');
let fewCloudsDay = require('../assets/images/weather-icons_partly-cloudy-day.png');
let fewCloudsNight = require('../assets/images/weather-icons_partly-cloudy-night.png');
let rain = require('../assets/images/weather-icons_rain.png');
let snow = require('../assets/images/weather-icons_snow.png');
let thunderstorm = require('../assets/images/weather-icons_thunderstorm.png');

export default function getImageIcon(main: string, icon: string) {

	switch (main) {
		case 'Thunderstorm':
			return thunderstorm;
		case 'Snow':
			return snow;
		case 'Rain':
			return rain;
		case 'Drizzle':
			return rain;
		case 'Clouds':
			if (icon == '02d') return fewCloudsDay;
			if (icon == '02n') return fewCloudsNight;
			return scatteredClouds;
		case 'Mist':
			return mist;
		case 'Smoke':
			return mist;
		case 'Haze':
			return mist;
		case 'Dust':
			return mist;
		case 'Fog':
			return mist;
		case 'Sand':
			return mist;
		case 'Dust':
			return mist;
		case 'Ash':
			return mist;
		case 'Squall':
			return mist;
		case 'Tornado':
			return mist;
		case 'Clear':
			if (icon == '01d') return clearSkyDay;
			return clearSkyNight;
	}
}
