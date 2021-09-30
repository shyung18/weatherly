import React from 'react';
import { Keyboard } from 'react-native';
import styled from 'styled-components/native';

interface TextInputProps {
	placeholder: "Title" | "Location" | "Notes",
	onChange?: (newValue: string) => void
}


const Location = styled.TextInput`
	width: 100%;
	padding: 14px 15px;

	border-radius: 6px;

	color: #6F6E6E;
	background-color: #E7E9EB;
`;

const Title = styled(Location)`
	margin-bottom: 7px;
`;

const Notes = styled(Location)`
	height: 150px;
	justify-content: flex-start;
`;

export default function TextInput({
	placeholder,
	onChange
}: TextInputProps) {

	switch (placeholder) {
		case 'Title':
			return <Title placeholder="Title" placeholderTextColor="#6F6E6E" onChangeText={(newTitle) => { onChange(newTitle) }} />
		case 'Location':
			return <Location placeholder="Location" placeholderTextColor="#6F6E6E" onChangeText={(newLocation) => { onChange(newLocation) }} />
		case 'Notes':
			return <Notes
				placeholder="Notes"
				multiline
				placeholderTextColor="#6F6E6E"
				onSubmitEditing={() => Keyboard.dismiss()}
			/>
	}
}