import * as Calendar from 'expo-calendar';

export default async function getCalendarEvents() {
	const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);

	let calendarIds = new Array<string>();

	calendars.map((calendar) => {
		calendarIds.push(calendar.id)
	})

	let currentDate = new Date();

	var next2days = new Date();
	next2days.setDate(next2days.getDate() + 2);

	let result = await Calendar.getEventsAsync(calendarIds, currentDate, next2days);
	return result;
}