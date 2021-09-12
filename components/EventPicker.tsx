import { useNavigation } from '@react-navigation/native';
import * as Calendar from 'expo-calendar';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Text } from '../components/Themed';
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
	selectedDate: Date,
};

const EventPickerWrapper = styled.ScrollView`
	background-color: #E7E9EB;	
	margin: 0 15px;
	padding: 15px;
	border-radius: 12px;

	max-height: ${(props: { height: number }) => props.height}px;
`;

const TimeSlot = styled.View`
	display: flex;
	flex-direction: row;
`;

const Time = styled(Text)`
	width: 55px;
	line-height: 49px;
	
	font-size: 18px;
  	text-align: right;

	color: #8E8E8E;
`;

const WeatherIcon = styled.Image`
	width: 45px;
	height: 45px;
`;

const ButtonStyled = styled.TouchableOpacity`
	width: 151px;
	border: none;
	align-items: center;
	justify-content: center;
	margin-left: auto; 
	margin-right: 0;
	background-color: #DFE0E1;
`;

const PlusSign = styled(Text)`
	color: #8B8B8B;
`;

const HourlyTempText = styled(Text)`
	font-size: 13px;
	line-height: 45px;

	color: #8E8E8E;
`;

export default function EventPicker({ hourlyData, selectedDate }: EventPickerProps) {
	const navigation = useNavigation();
	const [hasCalendarPermission, setHasCalendarPermission] = useState<boolean>(false);

	const getCountOfTimeSlots = () => {
		let count = 0;
		let timeslots = new Array();
		// let selectedTimeIsWithin48Hours = selectedDate.getDate() - (new Date()).getDate() >= 0 ?  selectedDate.getDate() - (new Date()).getDate() < 2 : false;

		// console.log(selectedTimeIsWithin48Hours);
		hourlyData.map((data, index) => {

			if (new Date(data.dt * 1000).getDate() == selectedDate.getDate()) {
				count++;

				timeslots.push(
					<TimeSlot key={data.dt} style={new Date(data.dt * 1000).getHours() === 23 && { paddingBottom: 30 }}>
						<Time>{(new Date(data.dt * 1000).toLocaleString([], { hour: 'numeric', hour12: true }))}</Time>
						<WeatherIcon source={getImages(data.weather[0].main, data.weather[0].icon)} />
						<HourlyTempText>{Math.round(data.temp - 273.15)}&deg;C</HourlyTempText>
						<ButtonStyled onPress={() => hasCalendarPermission ? navigation.navigate('Event', { selectedTime: data.dt }) : requestCalendarPermission()}>
							<PlusSign>+</PlusSign>
						</ButtonStyled>
					</TimeSlot >)
			}
		});

		return { count, timeslots };
	}

	const requestCalendarPermission = async () => {
		const { status } = await Calendar.requestCalendarPermissionsAsync();
		if (status === 'granted') {
			setHasCalendarPermission(true);
		}
		else setHasCalendarPermission(false);
	};

	let countAndTimeslots = getCountOfTimeSlots();

	useEffect(() => {
		requestCalendarPermission();
	}, []);


	return (
		<EventPickerWrapper
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			height={countAndTimeslots.count < 6 ? 60 * countAndTimeslots.count : 320}
		>
			{countAndTimeslots.timeslots}
		</EventPickerWrapper>
	)
}