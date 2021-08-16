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
	background-color: #151940;	
	margin: 10px 15px;

	max-height: ${(props: { height: number }) => props.height}px;
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
	const getCountOfTimeSlots = () => {
		let count = 0;
		let timeslots = new Array();
		hourlyData.map((data, index) => {
			if (new Date(data.dt * 1000).getDate() == selectedDate.getDate()) {
				count++;
				timeslots.push(
					<TimeSlot key={data.dt}>
						<Time>{(new Date(data.dt * 1000).toLocaleString([], { hour: 'numeric', hour12: true }))}</Time>
						<WeatherIcon source={getImages(data.weather[0].main, data.weather[0].icon)} />
					</TimeSlot>)
			}
		});
		return { count, timeslots };
	}

	let countAndTimeslots = getCountOfTimeSlots();

	return (
		<EventPickerWrapper showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} height={countAndTimeslots.count < 6 ? 50 * countAndTimeslots.count : 300}>
			{countAndTimeslots.timeslots}
		</EventPickerWrapper>
	)
}