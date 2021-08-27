import * as Calendar from 'expo-calendar';
import React, { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
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

const ButtonStyled = styled.TouchableOpacity`
	width: 190px;
	border: 0.5px white;
	align-items: center;
	justify-content: center;
	margin-left: auto; 
	margin-right: 0;
`;

const PlusSign = styled.Text`
	color: white;
`;

async function getDefaultCalendarSource() {
	const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
	const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
	return defaultCalendars[0].source;
}

const createNewCalendar = async () => {
	const defaultCalendarSource =
		Platform.OS === 'ios'
			? await getDefaultCalendarSource()
			: { isLocalAccount: true, name: 'Expo Calendar', id: undefined, type: "" };
	const newCalendarID = await Calendar.createCalendarAsync({
		title: 'Expo Calendar',
		color: 'blue',
		entityType: Calendar.EntityTypes.EVENT,
		sourceId: defaultCalendarSource.id,
		source: defaultCalendarSource,
		name: 'internalCalendarName',
		ownerAccount: 'personal',
		accessLevel: Calendar.CalendarAccessLevel.OWNER,
	});

	return newCalendarID;
};

const synchronizeCalendar = async () => {
	const calendarId = await createNewCalendar();
	try {
		await addEventsToCalendar(calendarId);
	} catch (e) {
		Alert.alert(e.message);
	}
};

const addEventsToCalendar = async (calendarId: string) => {
	const currentDate = new Date();
	const event = {
		title: "EXAMPLE",
		notes: "RANDOM NOTES",
		startDate: currentDate,
		endDate: new Date(currentDate.getTime() + 5 * 60000),
		timeZone: "UTC-05:00"
	};

	try {
		const createEventAsyncResNew = await Calendar.createEventAsync(
			calendarId.toString(),
			event
		);
		console.log(createEventAsyncResNew);
		return createEventAsyncResNew;
	} catch (error) {
		console.log(error);
	}
};
export default function EventPicker({ hourlyData, selectedDate }: EventPickerProps) {
	const [calendarPermission, setCalendarPermission] = useState<boolean>(false);

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
						<ButtonStyled onPress={() => calendarPermission && synchronizeCalendar()}>
							<PlusSign>+</PlusSign>
						</ButtonStyled>
					</TimeSlot>)
			}
		});
		return { count, timeslots };
	}

	let countAndTimeslots = getCountOfTimeSlots();

	useEffect(() => {
		(async () => {
			const { status } = await Calendar.requestCalendarPermissionsAsync();
			if (status === 'granted') {
				setCalendarPermission(true);
			}
			else setCalendarPermission(false);
		})();
	}, []);


	return (
		<EventPickerWrapper
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			height={countAndTimeslots.count < 6 ? 50 * countAndTimeslots.count : 300}
		>
			{countAndTimeslots.timeslots}
		</EventPickerWrapper>
	)
}