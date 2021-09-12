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
	padding: 10px;
	border: 1px grey;
	color: grey;
`;

const CancelAndSubmitButtonStyle = `
	padding: 20px 40px;
	background-color: white;
`;

const Container = styled.View`
	width: 100%;
	height: 100%;
	
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	padding: 70px 30px;
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
	padding: 0 10px;

	border: 1px grey;
`;

const ButtonContainer = styled.View`
	width: 100%;

	display: flex;
	flex-direction: row;
	justify-content: space-between;

	align-self: flex-end;
`;

const NotesContainer = styled.View`
	border: 1px grey;
`;

const NotesText = styled.TextInput`
	height: 150px;
	justify-content: flex-start;
	padding: 10px;
	color: white;
`;

const NewEventText = styled(Text)`
	font-size: 24px;
`;

const SelectedDateText = styled(Text)`
	font-size: 24px;
`;

const StartText = styled(Text)`
	font-size: 16px;
	align-self: center;
`;

const CancelAndSubmitText = styled(Text)`
	font-size: 16px;
`;

const Title = styled.TextInput`
	${TextInputStyle}
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
						<Title placeholder="Title" onChangeText={(newTitle) => {
							setUserInput({ ...userInput, title: newTitle })
						}} />
						<Location placeholder="Location" onChangeText={(newLocation) => {
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
				<NotesContainer>
					<NotesText
						placeholder="Notes"
						multiline
						placeholderTextColor="grey"
						onSubmitEditing={() => Keyboard.dismiss()}
					/>
				</NotesContainer>
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