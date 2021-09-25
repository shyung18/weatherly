// import DateTimePicker from '@react-native-community/datetimepicker';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import addEventsToCalendar from '../components/functions/addEventToCalendar';
import { Text } from '../components/Themed';
import { RootStackParamList } from '../types';

type EventScreenRouteProp = RouteProp<RootStackParamList, 'Event'>;

type HomeScreenRouteParams = {
	seleectedTime: number,
}

const TextInputStyle = `
	width: 100%;
	padding: 14px 15px;
	
	border-radius: 6px;

	color: #6F6E6E;
	background-color: #E7E9EB;
`;

const CancelAndSubmitButtonStyle = `
	padding: 16px 48px;
	border-radius: 6px;
	
	background-color: #838697;
`;

const Container = styled.View`
	width: 100%;
	height: 100%;
	
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	padding: 70px 30px;

	background-color: #F4F7FA;
`;

const EventChooserContainer = styled.View`
	display: flex;
	flex-direction: column;
`;

const HeaderContainer = styled.View`
	width: 100%;

	display: flex;
	flex-direction: row;
	justify-content: space-between;

	margin-bottom: 30px;
`;

const TitleContainer = styled.View`
	width: 100%;
	height: 100px;

	display: flex;
	flex-direction: column;
	margin-bottom: 30px;
`;

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

const ButtonContainer = styled.View`
	width: 100%;

	display: flex;
	flex-direction: row;
	justify-content: space-between;

	align-self: flex-end;
`;

const NotesText = styled.TextInput`
	${TextInputStyle}
	height: 150px;
	justify-content: flex-start;
`;

const NewEventText = styled(Text)`
	font-size: 15px;
	color: #888A99;
`;

const SelectedDateText = styled(Text)`
	font-size: 15px;
	color: #888A99;
`;

const StartText = styled(Text)`
	font-size: 12px;
	align-self: center;

	color: #6F6E6E;
`;

const CancelAndSubmitText = styled(Text)`
	font-size: 16px;
`;

const Title = styled.TextInput`
	${TextInputStyle}

	margin-bottom: 7px;
`;

const Location = styled.TextInput`
	${TextInputStyle}
`;

const CancelButton = styled.TouchableOpacity`
	${CancelAndSubmitButtonStyle}
`;

const SubmitButton = styled.TouchableOpacity`
	${CancelAndSubmitButtonStyle}
`;

export default function EventScreen({ }: EventScreenRouteProp) {
	const route = useRoute<RouteProp<Record<string, HomeScreenRouteParams>, string>>();
	const selectedTimeDt = Object.values(route.params)[0];
	const selectedStartDate = new Date(selectedTimeDt * 1000);
	const startingEndDate = new Date(selectedStartDate.getTime() + 30 * 60000);

	const [userInput, setUserInput] =
		useState<{ title: string, location: string, startDate: Date | undefined, endDate: Date | undefined }>(
			{
				title: "",
				location: "",
				startDate: selectedStartDate,
				endDate: startingEndDate
			});

	const navigation = useNavigation();

	const onSubmit = () => {
		if (userInput.startDate && userInput.endDate && userInput.startDate < userInput.endDate) {
			addEventsToCalendar(userInput);
		}
		navigation.navigate('Root');
	}

	return (

		<Container>
			<KeyboardAwareScrollView>
				<EventChooserContainer>
					<HeaderContainer>
						<NewEventText>NEW EVENT</NewEventText>
						<SelectedDateText>{selectedStartDate.toLocaleDateString()}</SelectedDateText>
					</HeaderContainer>
					<TitleContainer>
						<Title placeholder="Title" placeholderTextColor="#6F6E6E" onChangeText={(newTitle) => {
							setUserInput({ ...userInput, title: newTitle })
						}} />
						<Location placeholder="Location" placeholderTextColor="#6F6E6E" onChangeText={(newLocation) => {
							setUserInput({ ...userInput, location: newLocation })
						}} />
					</TitleContainer>
					<DateTimePickerContainer>
						<StartText>Starts</StartText>
						{/* <DateTimePicker
							display="spinner"
							value={userInput.startDate ? userInput.startDate : selectedStartDate}
							mode="time"
							style={{ width: 200, height: 100 }}
							onChange={(event, newDate) => {
								setUserInput({ ...userInput, startDate: newDate })
							}}
						/> */}
					</DateTimePickerContainer>
					<DateTimePickerContainer>
						<StartText>Ends</StartText>
						{/* <DateTimePicker
							display="spinner"
							value={userInput.endDate ? userInput.endDate : startingEndDate}
							mode="time"
							style={{ width: 200, height: 100 }}
							onChange={(event, newDate) => {
								setUserInput({ ...userInput, endDate: newDate })
							}}
						/> */}
					</DateTimePickerContainer>
				</EventChooserContainer>
				<NotesText
					placeholder="Notes"
					multiline
					placeholderTextColor="#6F6E6E"
					onSubmitEditing={() => Keyboard.dismiss()}
				/>
			</KeyboardAwareScrollView>
			<ButtonContainer>
				<CancelButton>
					<CancelAndSubmitText onPress={() => navigation.navigate('Root')}>Cancel</CancelAndSubmitText>
				</CancelButton>
				<SubmitButton onPress={() => onSubmit()}>
					<CancelAndSubmitText>Submit</CancelAndSubmitText>
				</SubmitButton>
			</ButtonContainer>
		</Container >

	);
}