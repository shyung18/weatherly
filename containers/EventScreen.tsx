import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import Button from '../components/Event/Button';
import DateTimePicker from '../components/Event/DateTimePicker';
import Header from '../components/Event/Header';
import TextInput from '../components/Event/TextInput';
import addEventsToCalendar from '../functions/addEventToCalendar';

type HomeScreenRouteParams = {
	seleectedTime: number
}

const Container = styled.View`
	display: flex;
	flex-direction: column;
`;

const TitleContainer = styled.View`
	width: 100%;
	height: 100px;

	display: flex;
	flex-direction: column;
	margin-bottom: 30px;
`;

const ButtonContainer = styled.View`
	width: 100%;

	display: flex;
	flex-direction: row;
	justify-content: space-between;

	align-self: flex-end;
`;

export default function EventScreen() {
	const route = useRoute<RouteProp<Record<string, HomeScreenRouteParams>, string>>();
	const selectedDate = new Date(Object.values(route.params)[0] * 1000);
	const defaultEndDate = new Date(selectedDate.getTime() + 30 * 60000);

	const [userInput, setUserInput] =
		useState<{ title: string, location: string, startDate: Date | undefined, endDate: Date | undefined }>(
			{
				title: "",
				location: "",
				startDate: selectedDate,
				endDate: defaultEndDate
			});


	const navigation = useNavigation();
	const onSubmit = () => {
		if (userInput.startDate && userInput.endDate && userInput.startDate < userInput.endDate) {
			addEventsToCalendar(userInput);
		}
		navigation.navigate('Root');
	}

	return (
		<>
			<KeyboardAwareScrollView>
				<Container>
					<Header selectedDate={selectedDate.toDateString()} />
					<TitleContainer>
						<TextInput placeholder="Title" onChange={(newTitle) => {
							setUserInput({ ...userInput, title: newTitle })
						}} />
						<TextInput placeholder="Location" onChange={(newTitle) => {
							setUserInput({ ...userInput, location: newTitle })
						}} />
					</TitleContainer>
					<DateTimePicker
						type="start"
						date={userInput.startDate ? userInput.startDate : selectedDate}
						onChange={(event, newDate) => {
							setUserInput({ ...userInput, startDate: newDate })
						}}
					/>
					<DateTimePicker
						type="end"
						date={userInput.endDate ? userInput.endDate : defaultEndDate}
						onChange={(event, newDate) => {
							setUserInput({ ...userInput, endDate: newDate })
						}}
					/>
					<TextInput placeholder="Notes" />
				</Container>
			</KeyboardAwareScrollView>
			<ButtonContainer>
				<Button type="cancel" onPress={() => navigation.navigate('Root')} />
				<Button type="submit" onPress={() => onSubmit()} />
			</ButtonContainer>
		</>
	)
}