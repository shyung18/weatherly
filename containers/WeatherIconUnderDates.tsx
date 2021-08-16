import React from 'react';
import styled from 'styled-components/native';

interface WeatherIconUnderDatesProps {
	dailyData: Array<
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
		}>
};

const HorizontalWrapper = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const WeatherIcon = styled.Image`
	width: 45px;
	height: 45px;
`;

const PlaceHolder = styled.View`
	width: 17px;
	height: 17px;
`;

export default function WeatherIconUnderDate({ dailyData }: WeatherIconUnderDatesProps) {
	console.log(dailyData);
	return (
		dailyData ?
			<HorizontalWrapper>
				<PlaceHolder />
				<WeatherIcon source={{ uri: 'http://openweathermap.org/img/wn/' + dailyData[0].weather[0].icon + '@2x.png' }} />
				<WeatherIcon source={{ uri: 'http://openweathermap.org/img/wn/' + dailyData[1].weather[0].icon + '@2x.png' }} />
				<WeatherIcon source={{ uri: 'http://openweathermap.org/img/wn/' + dailyData[2].weather[0].icon + '@2x.png' }} />
				<WeatherIcon source={{ uri: 'http://openweathermap.org/img/wn/' + dailyData[3].weather[0].icon + '@2x.png' }} />
				<WeatherIcon source={{ uri: 'http://openweathermap.org/img/wn/' + dailyData[4].weather[0].icon + '@2x.png' }} />
				<WeatherIcon source={{ uri: 'http://openweathermap.org/img/wn/' + dailyData[5].weather[0].icon + '@2x.png' }} />
				<WeatherIcon source={{ uri: 'http://openweathermap.org/img/wn/' + dailyData[6].weather[0].icon + '@2x.png' }} />
				<PlaceHolder />
			</HorizontalWrapper>
			: <></>
	);
}