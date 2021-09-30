import React from 'react';
import styled from 'styled-components/native';
import HomeScreen from '../containers/HomeScreen';

const Background = styled.View`
	width: 100%;
	height: 100%;
	background-color: #F4F7FA;
`;

export default function Home() {

	return (
		<Background>
			<HomeScreen />
		</Background >
	)
}