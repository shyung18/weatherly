import React from 'react';
import styled from 'styled-components/native';
import ArcIcon from '../components/ArcIcon';
import { View } from '../components/Themed';
import CurrentWeatherInfoContainer from '../containers/CurrentWeatherInfoContainer';

const BlackBackground = styled(View)`
	width: 100%;
	height: 100%;
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
		<BlackBackground >
			<TopContainer>
				<ArcIcon />
			</TopContainer>
			<CurrentWeatherInfoContainer />
		</BlackBackground >
	)
}