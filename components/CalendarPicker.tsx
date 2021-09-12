import moment from 'moment';
import React from 'react';
import CalendarStrip from 'react-native-calendar-strip';

interface ToggleProps {
	currentDate: Date,
	onClick: (event: moment.Moment) => void
}

export default function CalendarPicker({ currentDate, onClick }: ToggleProps) {
	return (
		<CalendarStrip
			style={{ height: 50, marginTop: 28, paddingRight: 12, paddingLeft: 12 }}
			calendarHeaderStyle={{ color: '#C9C9C9', fontFamily: "avenir" }}
			calendarColor={"#F4F7FA"}
			dateNumberStyle={{ color: "#7C7C7C", fontFamily: "avenir", fontSize: 19 }}
			dateNameStyle={{ color: "#6F6E6E", fontFamily: "avenir", fontSize: 11 }}
			highlightDateNumberStyle={{ color: "#7C7C7C", fontFamily: "avenir", opacity: 0.3, fontSize: 19 }}
			highlightDateNameStyle={{ color: "#6F6E6E", fontFamily: "avenir", opacity: 0.3, fontSize: 11 }}
			iconContainer={{ justifyContent: 'space-between', marginTop: 28 }}
			useIsoWeekday={false}
			startingDate={currentDate}
			selectedDate={currentDate}
			showMonth={false}
			iconStyle={{ width: 20 }}
			leftSelector={[]}
			rightSelector={[]}
			onDateSelected={(e) => onClick(e)}
		/>
	);
}