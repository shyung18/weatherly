import { useNavigation } from '@react-navigation/native';
import * as Calendar from 'expo-calendar';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import changeTempScale from '../components/functions/changeTempScale';
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
	selectedIndex: number,
	eventsData: Calendar.Event[],
	tempScale: 'C' | 'F'
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

	z-index: 5;
`;

const PlusSign = styled(Text)`
	color: #8B8B8B;
	z-index: 1;
`;

const EventSign = styled(PlusSign)`
	padding: 5px;
`;

const HourlyTempText = styled(Text)`
	font-size: 13px;
	line-height: 45px;

	color: #8E8E8E;
`;

const EventSlotWrapper = styled.View`
	display: flex;
	flex-direction: column;

	z-index: 5;
	position: absolute;
	right: 0;
`;

const EventSlot = styled.View`
	z-index: 5;
	position: relative;
	top: 0px;
	border-radius: 8px;
	border: 1px solid grey;
	
	width: 120px;
	background-color: #F1D793;

	height: ${(props: { height: number }) => props.height}px;

	align-items: flex-start;
`;

export default function EventPicker({ tempScale, selectedIndex, eventsData, hourlyData, selectedDate }: EventPickerProps) {
	const navigation = useNavigation();
	const [hasCalendarPermission, setHasCalendarPermission] = useState<boolean>(false);

	useEffect(() => {
		let todayEvents = new Array();

		eventsData.map((event, index) => {
			if (new Date(event.startDate).getDate() == selectedDate.getDate()) {
				todayEvents.push(event);
			}
		});
	})

	const getCountOfTimeSlots = () => {
		let count = 0;
		let timeslots = new Array();

		let eventIndex = selectedIndex;

		while (eventsData[eventIndex] && new Date(eventsData[eventIndex].startDate).getDate() !== selectedDate.getDate()) eventIndex++;

		hourlyData.map((data, index) => {
			let weatherDate = new Date(data.dt * 1000);
			let eventStartDate = null;
			let eventEndDate = null;

			if (eventsData[eventIndex]) {
				eventStartDate = new Date(eventsData[eventIndex].startDate);
				eventEndDate = new Date(eventsData[eventIndex].endDate);
			}

			if (weatherDate.getDate() == selectedDate.getDate()) {
				count++;
				let event = null;

				if (eventStartDate && (weatherDate.getHours() === eventStartDate.getHours() && selectedDate.getDate() == eventStartDate.getDate())) {
					let lengthOfEvent_mins = (new Date(eventsData[eventIndex].endDate).getTime() - eventStartDate.getTime()) / 60000;
					event = (
						<EventSlotWrapper>
							<EventSlot height={lengthOfEvent_mins * 50 / 60}>
								<EventSign>{eventsData[eventIndex].title}</EventSign>
							</EventSlot>
						</EventSlotWrapper>
					);
					eventIndex++;
				}

				timeslots.push(
					<TimeSlot key={data.dt} style={new Date(data.dt * 1000).getHours() === 23 && { paddingBottom: 30 }}>
						<Time>{(new Date(data.dt * 1000).toLocaleString([], { hour: 'numeric', hour12: true }))}</Time>
						<WeatherIcon source={getImages(data.weather[0].main, data.weather[0].icon)} />
						<HourlyTempText>{changeTempScale(tempScale, data.temp)}&deg;{tempScale}</HourlyTempText>
						{event && event}
					</TimeSlot >);
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