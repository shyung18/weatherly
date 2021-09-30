import React from 'react';
import styled from 'styled-components/native';
import getImages from '../../functions/getIconImages';

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

	return (
		dailyData ?
			<HorizontalWrapper>
				<PlaceHolder />
				<WeatherIcon source={getImages(dailyData[0].weather[0].main, dailyData[0].weather[0].icon)} />
				<WeatherIcon source={getImages(dailyData[1].weather[0].main, dailyData[1].weather[0].icon)} />
				<WeatherIcon source={getImages(dailyData[2].weather[0].main, dailyData[2].weather[0].icon)} />
				<WeatherIcon source={getImages(dailyData[3].weather[0].main, dailyData[3].weather[0].icon)} />
				<WeatherIcon source={getImages(dailyData[4].weather[0].main, dailyData[4].weather[0].icon)} />
				<WeatherIcon source={getImages(dailyData[5].weather[0].main, dailyData[5].weather[0].icon)} />
				<WeatherIcon source={getImages(dailyData[6].weather[0].main, dailyData[6].weather[0].icon)} />
				<PlaceHolder />
			</HorizontalWrapper>
			: <></>
	);
}