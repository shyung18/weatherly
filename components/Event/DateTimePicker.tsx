import DateTimePickerComponent, { Event } from '@react-native-community/datetimepicker';
import React from 'react';
import styled from 'styled-components/native';
import StyledText from '../StyledText';

interface DateTimePickerProps {
	type: "start" | "end",
	date: Date,
	onChange: (event: Event, newDate: Date) => void;
}

const DateTimePickerContainer = styled.View`
	width: 100%;
	
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 18px 19px;

	border: 0.5px #707070;
	border-radius: 6px;

	margin-bottom: 10px;
`;

const StartText = styled(StyledText)`
	font-size: 15px;
	align-self: center;

	color: #6F6E6E;
`;

export default function DateTimePicker({
	type,
	date,
	onChange
}: DateTimePickerProps) {
	return (
		<DateTimePickerContainer>
			<StartText>{type == "start" ? "Starts" : "Ends"}</StartText>
			<DateTimePickerComponent
				display="spinner"
				value={date}
				mode="time"
				textColor="#6F6E6E"
				style={{ width: 200, height: 50, backgroundColor: "#F4F7FA" }}
				onChange={(event, newDate) => onChange(event, newDate)}
			/>
		</DateTimePickerContainer>
	)
}