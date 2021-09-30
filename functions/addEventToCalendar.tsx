import * as Calendar from 'expo-calendar';
import { Alert, Platform } from 'react-native';

async function createCalendar(calendarSource: Calendar.Source) {
	const defaultCalendarSourceId =
		Platform.OS === 'ios'
			? calendarSource.id
			: "";

	const newCalendarID = await Calendar.createCalendarAsync({
		title: 'Weatherly',
		color: 'blue',
		entityType: Calendar.EntityTypes.EVENT,
		sourceId: defaultCalendarSourceId,
		source: null,
		name: 'Weatherly',
		ownerAccount: 'personal',
		accessLevel: Calendar.CalendarAccessLevel.OWNER,
	});

	return newCalendarID;
}

const addToCalendar = async (calendarId: string, title: string, location: string, startDate: Date | undefined, endDate: Date | undefined) => {
	const event = {
		title: title,
		location: location,
		notes: "RANDOM NOTES",
		startDate: startDate,
		endDate: endDate,
		timeZone: "UTC-05:00"
	};

	try {
		const createEventAsyncResNew = await Calendar.createEventAsync(
			calendarId.toString(),
			event
		);
		return createEventAsyncResNew;
	} catch (error) {
		console.log(error);
	}
};

async function getCalendarID() {
	const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
	let defaultCalendars = calendars.filter(each => each.title === 'Weatherly');
	if (!defaultCalendars[0]) {
		defaultCalendars = calendars.filter(each => each.source.name === 'Default');
		return createCalendar(defaultCalendars[0].source);
	}

	return defaultCalendars[0].id;
}

type addEventsToCalendarProps = {
	title: string,
	location: string,
	startDate: Date | undefined,
	endDate: Date | undefined
}

export default async function addEventsToCalendar({ title, location, startDate, endDate }: addEventsToCalendarProps) {
	const calendarId = await getCalendarID();

	try {
		await addToCalendar(calendarId, title, location, startDate, endDate);
	} catch (e) {
		Alert.alert(e.message);
	}
}