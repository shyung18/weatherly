import React from 'react';
import styled from 'styled-components/native';
import StyledText from '../StyledText';

interface HeaderProps {
	selectedDate: string
}

const HeaderContainer = styled.View`
	width: 100%;

	display: flex;
	flex-direction: row;
	justify-content: space-between;

	margin-bottom: 30px;
`;

const NewEventText = styled(StyledText)`
	font-size: 15px;
	color: #888A99;
`;

const SelectedDateText = styled(StyledText)`
	font-size: 15px;
	color: #888A99;
`;

export default function Header({ selectedDate }: HeaderProps) {
	return (
		<HeaderContainer>
			<NewEventText>NEW EVENT</NewEventText>
			<SelectedDateText>{selectedDate}</SelectedDateText>
		</HeaderContainer>
	)
}