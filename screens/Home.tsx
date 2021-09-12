import React from 'react';
import styled from 'styled-components/native';
import ArcIcon from '../components/ArcIcon';
import { View } from '../components/Themed';
import CurrentWeatherInfoContainer from '../containers/CurrentWeatherInfoContainer';

const Background = styled(View)`
	width: 100%;
	height: 100%;
	background-color: #F4F7FA;
`;

const TopContainer = styled.View`
	width: 100%;
	flex-direction: row;
	width: 100%;
	height: 200px;
	align-items: center;

	padding-right: 37px;
	padding-left: 37px;

	position: relative;
`;

export default function Home() {

	return (
		<Background>
			<TopContainer>
				<ArcIcon />
			</TopContainer>
			<CurrentWeatherInfoContainer />
		</Background >
	)
}