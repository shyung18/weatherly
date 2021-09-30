import { useNavigation } from '@react-navigation/native';
import { Event } from 'expo-calendar';
import { LocationGeocodedAddress } from 'expo-location';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { getWeatherData } from '../components/api/weather';
import ArcBackground from '../components/Home/ArcBackground';
import CalendarPicker from '../components/Home/CalendarPicker';
import CurrentWeather from '../components/Home/CurrentWeather';
import EventPicker from '../components/Home/EventPicker';
import SummaryView from '../components/Home/SummaryView';
import WeatherIconUnderDate from '../components/Home/WeatherIconUnderDates';
import changeTempScale from '../functions/changeTempScale';
import getCalendarEvents from '../functions/getCalendarEvents';
import getImages from '../functions/getImages';

type WeatherDataType = {
	"lat": number,
	"lon": number,
	"timezone": string,
	"timezone_offset": number,
	"current": {
		"dt": number,
		"sunrise": number,
		"sunset": number,
		"temp": number,
		"feels_like": number,
		"pressure": number,
		"humidity": number,
		"dew_point": number,
		"uvi": number,
		"clouds": number,
		"visibility": number,
		"wind_speed": number,
		"wind_deg": number,
		"weather": [
			{
				"id": number,
				"main": string,
				"description": string,
				"icon": string,
			}
		],
		"rain": {
			"1h": number,
		}
	},
	"minutely": [
		{
			"dt": number,
			"precipitation": number,
		}],
	"hourly": [
		{
			"dt": number,
			"temp": number,
			"feels_like": number,
			"pressure": number,
			"humidity": number,
			"dew_point": number,
			"uvi": number,
			"clouds": number,
			"visibility": number,
			"wind_speed": number,
			"wind_deg": number,
			"wind_gust": number,
			"weather": [
				{
					"id": number,
					"main": string,
					"description": string,
					"icon": string,
				}],
			"pop": number,
		}],
	"daily": [
		{
			"dt": number,
			"sunrise": number,
			"sunset": number,
			"moonrise": number,
			"moonset": number,
			"moon_phase": number,
			"temp": {
				"day": number,
				"min": number,
				"max": number,
				"night": number,
				"eve": number,
				"morn": number,
			},
			"feels_like": {
				"day": number,
				"night": number,
				"eve": number,
				"morn": number,
			},
			"pressure": number,
			"humidity": number,
			"dew_point": number,
			"wind_speed": number,
			"wind_deg": number,
			"weather": [
				{
					"id": number,
					"main": string,
					"description": string,
					"icon": string,
				}
			],
			"clouds": number,
			"pop": number,
			"rain": number,
			"uvi": number,
		}],
	"alerts": [
		{
			"sender_name": string,
			"event": string,
			"start": number,
			"end": number,
			"description": string,
			"tags": [
				string
			]
		}],
	"location": LocationGeocodedAddress[]
};

type SelectedDateType = {
	selectedDate: Date,
	selectedIndex: number
}

export type TempScaleType = "C" | "F";


export default function HomeScreen() {
	const [eventsData, setEventsData] = useState<Event[]>();
	const [weatherData, setWeatherData] = useState<WeatherDataType>();
	const [selectedDate, setSelectedDate] = useState<SelectedDateType>({ selectedDate: new Date(), selectedIndex: 0 });
	const [tempScale, setTempScale] = useState<TempScaleType>("C");

	let isSubscribed = true;

	useEffect(() => {
		getCalendarEvents().then((eventsData) => {
			setEventsData(eventsData);
		});

		getWeatherData().then((weatherData) => {
			if (isSubscribed) setWeatherData(weatherData);
		}).catch((error) => {
			console.log("There was an error getting the data", error);
		})
	}, []);

	let currentDate = new Date();

	const handleOnClick = (date: moment.Moment) => {
		let selectedDate = new Date(moment(date).format());
		let selectedIndex = selectedDate.getDate() - currentDate.getDate() >= 0 ?
			selectedDate.getDate() - currentDate.getDate() : 1

		setSelectedDate({ selectedDate: selectedDate, selectedIndex: selectedIndex });
	};

	const handleTempScaleOnClick = () => {
		setTempScale(tempScale == 'C' ? 'F' : 'C');
	}

	let dayTemp, minTemp, maxTemp;
	if (weatherData) {
		dayTemp = changeTempScale(tempScale, weatherData.daily[selectedDate.selectedIndex].temp.day);
		minTemp = changeTempScale(tempScale, weatherData.daily[selectedDate.selectedIndex].temp.min);
		maxTemp = changeTempScale(tempScale, weatherData.daily[selectedDate.selectedIndex].temp.max);
	}

	const navigation = useNavigation();

	return (
		weatherData ?
			<>
				<ArcBackground />
				<CurrentWeather
					cityName={weatherData.location[0].city}
					currentWeatherImgSource={getImages(weatherData.daily[selectedDate.selectedIndex].weather[0].main, weatherData.daily[selectedDate.selectedIndex].weather[0].icon)}
					tempScale={tempScale}
					currentTemp={dayTemp}
					minTemp={minTemp}
					maxTemp={maxTemp}
					currentDate={selectedDate.selectedDate.toDateString()}
					sunriseTime={weatherData.daily[selectedDate.selectedIndex].sunrise}
					sunsetTime={weatherData.daily[selectedDate.selectedIndex].sunset}
					onTempScaleChange={() => handleTempScaleOnClick()}
				/>
				<CalendarPicker currentDate={selectedDate.selectedDate} onClick={(date: moment.Moment) => handleOnClick(date)} />
				<WeatherIconUnderDate dailyData={weatherData.daily} />
				<EventPicker navigation={navigation} tempScale={tempScale} eventsData={eventsData} hourlyData={weatherData.hourly} selectedDate={selectedDate.selectedDate} selectedIndex={selectedDate.selectedIndex} />
				<SummaryView tempScale={tempScale} dailyData={weatherData.daily} selectedIndex={selectedDate.selectedIndex} />

			</>
			:
			<>
			</>
	);
}