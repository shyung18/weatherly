import React from 'react';
import styled from 'styled-components/native';
import getImages from './functions/getImages';

interface EventPickerProps {
	hourlyData: Array<
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
		}>,
	selectedDate: Date
};

const EventPickerWrapper = styled.ScrollView`
	height: 100%;

	background-color: #151940;	
	margin: 10px 15px;
`;

const TimeSlot = styled.View`
	display: flex;
	flex-direction: row;
`;

const Time = styled.Text`
	width: 70px;
	padding: 10px;
	
	font-size: 15px;
	color: white;
	fontFamily: "Quicksand-Light";

  	text-align: right;
`;

const WeatherIcon = styled.Image`
	width: 45px;
	height: 45px;
`;

export default function EventPicker({ hourlyData, selectedDate }: EventPickerProps) {
	return (
		<EventPickerWrapper showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
			{
				hourlyData.map((data, index) => {
					if (new Date(data.dt * 1000).getDate() == selectedDate.getDate()) {
						return (

							<TimeSlot key={data.dt}>
								<Time>{(new Date(data.dt * 1000).toLocaleString([], { hour: 'numeric', hour12: true }))}</Time>
								<WeatherIcon source={getImages(data.weather[0].main, data.weather[0].icon)} />
							</TimeSlot>
						);
					}
				})
			}
		</EventPickerWrapper>
	)
}