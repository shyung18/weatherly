import * as Calendar from 'expo-calendar';

export default async function getCalendarEvents() {
	const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
	const defaultCalendars = calendars.filter(each => each.source.name === 'Default');

	let calendarIds = [defaultCalendars[0].source.id];

	let currentDate = new Date();

	var next3days = new Date();
	next3days.setDate(next3days.getDate() + 3);

	let result = await Calendar.getEventsAsync(calendarIds, currentDate, next3days);
	return result;
}