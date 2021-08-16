import React from 'react';
import styled from 'styled-components/native';

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
	margin: 10px 20px;
`;

const TimeSlot = styled.View`
	
`;

const Time = styled.Text`
	width: 200px;
	padding: 10px;
	
	font-size: 20px;
	color: white;
	fontFamily: "Quicksand-Light";
`;

export default function EventPicker({ hourlyData, selectedDate }: EventPickerProps) {
	return (
		<EventPickerWrapper showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
			<TimeSlot>
				{
					hourlyData.map((data, index) => {
						if (new Date(data.dt * 1000).getDate() == selectedDate.getDate()) {
							return (
								<Time key={data.dt}>{(new Date(data.dt * 1000).toLocaleString([], { hour: 'numeric', hour12: true }))}</Time>
							);
						}
					})
				}
			</TimeSlot>
		</EventPickerWrapper>
	)
}