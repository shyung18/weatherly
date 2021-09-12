import moment from 'moment';
import React, { useEffect, useState } from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import styled from 'styled-components/native';
import { getWeatherData } from '../components/api/weather';
import EventPicker from '../components/EventPicker';
import getImages from '../components/functions/getImages';
import StyledText from '../components/StyledText';
import SummaryView from '../components/SummaryView';
import SunIcon from '../components/SunIcon';
import WeatherIconUnderDate from './WeatherIconUnderDates';

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
		}]
};

type SelectedDateType = {
	selectedDate: Date,
	selectedIndex: number
}

const CurrentIcon = styled.Image`
	width: 80px;
	height: 80px;
`;

const CurrentWeatherWrapper = styled.View`
	width: 100%;
	flex-direction: column;
	align-items: center;
`;

const CurrentTemp = styled(StyledText)`
	font-size: 33px;
	color: #626262;
`;

const CurrentDate = styled(StyledText)`
	font-size: 14px;
	color: #626262;

	padding-bottom: 9px;
`;

const LowHighTemp = styled(StyledText)`
	font-size: 14px;
	color: #626262;
`;

//Change padding top for different screen sizes to match the sunrise and sunset icons
const CurrentWeatherInfoWrapper = styled.View`
	width: 100%;
	position: absolute;

	margin-top: 35px;
`;

export default function CurrentWeatherInfoContainer() {
	const [weatherData, setWeatherData] = useState<WeatherDataType>();
	const [selectedDate, setSelectedDate] = useState<SelectedDateType>({ selectedDate: new Date(), selectedIndex: 0 });

	let isSubscribed = true;

	useEffect(() => {
		getWeatherData().then((weatherData) => {
			if (isSubscribed) setWeatherData(weatherData);
		}).catch((error) => {
			console.log("There was an error getting the data", error);
		})
	}, []);

	let currentDate = new Date();

	return (
		weatherData ?
			<>
				<CurrentWeatherInfoWrapper>
					<CurrentWeatherWrapper>
						<CurrentIcon source={getImages(weatherData.daily[selectedDate.selectedIndex].weather[0].main, weatherData.daily[selectedDate.selectedIndex].weather[0].icon)} />
						{weatherData ?
							<CurrentTemp>{Math.round(weatherData.daily[selectedDate.selectedIndex].temp.day - 273.15)}&deg;C</CurrentTemp> : <CurrentTemp>Loading...</CurrentTemp>
						}
						<CurrentDate>{selectedDate.selectedDate.toDateString()}</CurrentDate>
						<LowHighTemp>{Math.round(weatherData.daily[selectedDate.selectedIndex].temp.min - 273.15)} / {Math.round(weatherData.daily[selectedDate.selectedIndex].temp.max - 273.15)} &deg;C</LowHighTemp>
					</CurrentWeatherWrapper>
					<SunIcon type="sunrise" time={weatherData.daily[selectedDate.selectedIndex].sunrise} />
					<SunIcon type="sunset" time={weatherData.daily[selectedDate.selectedIndex].sunset} />
				</CurrentWeatherInfoWrapper>
				<CalendarStrip
					style={{ height: 50, marginTop: 28, paddingRight: 12, paddingLeft: 12 }}
					calendarHeaderStyle={{ color: '#C9C9C9', fontFamily: "avenir" }}
					calendarColor={"#F4F7FA"}
					dateNumberStyle={{ color: "#7C7C7C", fontFamily: "avenir", fontSize: 19 }}
					dateNameStyle={{ color: "#6F6E6E", fontFamily: "avenir", fontSize: 11 }}
					highlightDateNumberStyle={{ color: "#7C7C7C", fontFamily: "avenir", opacity: 0.3, fontSize: 19 }}
					highlightDateNameStyle={{ color: "#6F6E6E", fontFamily: "avenir", opacity: 0.3, fontSize: 11 }}
					iconContainer={{ justifyContent: 'space-between', marginTop: 28 }}
					useIsoWeekday={false}
					startingDate={currentDate}
					selectedDate={currentDate}
					showMonth={false}
					iconStyle={{ width: 20 }}
					leftSelector={[]}
					rightSelector={[]}
					onDateSelected={(date) => {
						let selectedDate = new Date(moment(date).format());
						let selectedIndex = selectedDate.getDate() - currentDate.getDate() >= 0 ?
							selectedDate.getDate() - currentDate.getDate() : 1

						setSelectedDate({ selectedDate: selectedDate, selectedIndex: selectedIndex });
					}}
				/>
				<WeatherIconUnderDate dailyData={weatherData.daily} />
				<EventPicker hourlyData={weatherData.hourly} selectedDate={selectedDate.selectedDate} />
				<SummaryView dailyData={weatherData.daily} selectedIndex={selectedDate.selectedIndex} />

			</>
			:
			<>
			</>
	);
}