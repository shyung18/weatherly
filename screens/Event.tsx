import React from 'react';
import styled from 'styled-components/native';
import EventScreen from '../containers/EventScreen';

const Container = styled.View`
	width: 100%;
	height: 100%;
	
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	padding: 70px 30px;

	background-color: #F4F7FA;
`;


export default function Event() {
	return (
		<Container>
			<EventScreen />
		</Container >
	);
}