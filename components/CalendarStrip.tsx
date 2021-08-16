import React from 'react';
import CalendarStrip from 'react-native-calendar-strip';

export default function CalendarStripStyled() {
	let currentDate = new Date();

	return (
		<CalendarStrip
			style={{ height: '50px', top: '20px' }}
			calendarHeaderStyle={{ color: '#C9C9C9', fontFamily: "Quicksand-Light" }}
			calendarColor={"#101432"}
			dateNumberStyle={{ color: "#606060", fontFamily: "Quicksand-Light" }}
			dateNameStyle={{ color: "#606060", fontFamily: "Quicksand-Light" }}
			highlightDateNumberStyle={{ color: "#C9C9C9", fontFamily: "Quicksand-Light" }}
			highlightDateNameStyle={{ color: "#C9C9C9", fontFamily: "Quicksand-Light" }}
			iconContainer={{ justifyContent: 'space-between' }}
			useIsoWeekday={false}
			startingDate={currentDate}
			selectedDate={currentDate}
			showMonth={false}
		/>
	);
}