import React from 'react';
import styled from 'styled-components/native';
import StyledText from '../StyledText';

interface ButtonProps {
	type: "cancel" | "submit",
	onPress: () => void
}

const ButtonStyled = styled.TouchableOpacity`
	padding: 16px 48px;
	border-radius: 6px;

	background-color: #838697;
`;

const ButtonText = styled(StyledText)`
	font-size: 16px;
`;

export default function Button({ type, onPress }: ButtonProps) {
	return (
		<ButtonStyled onPress={() => onPress()}>
			<ButtonText> {type == 'cancel' ? "Cancel" : "Submit"}</ButtonText>
		</ButtonStyled>
	);
}