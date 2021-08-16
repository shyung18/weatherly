import React from 'react';
import styled from 'styled-components/native';

type SummaryViewProps = {
	dailyData: Array<
		{
			"dt": number,
			"sunrise": number,
			"sunset": number,
			"moonrise": number,
			"moonset": number,
			"moon_phase": number,
			"temp": {
				"day": number,
				"min": number,
				"max": number,
				"night": number,
				"eve": number,
				"morn": number,
			},
			"feels_like": {
				"day": number,
				"night": number,
				"eve": number,
				"morn": number,
			},
			"pressure": number,
			"humidity": number,
			"dew_point": number,
			"wind_speed": number,
			"wind_deg": number,
			"weather": [
				{
					"id": number,
					"main": string,
					"description": string,
					"icon": string,
				}
			],
			"clouds": number,
			"pop": number,
			"rain": number,
			"uvi": number,
		}>,
	selectedIndex: number,
}

const Container = styled.View`
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 25%;
`;

const Wrapper = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 0px 30px;
`;

const HeaderText = styled.Text`
	font-size: 15px;
	color: white;
`;

const Temp = styled.Text`
	font-size: 20px;
	color: white;
`;

export default function SummaryView({ dailyData, selectedIndex }: SummaryViewProps) {
	return (
		<>
			<Wrapper>
				<Container>
					<Temp>{Math.round(dailyData[selectedIndex].temp.morn - 273.15)}</Temp>
					<HeaderText>MORNING</HeaderText>
				</Container>
				<Container>
					<Temp>{Math.round(dailyData[selectedIndex].temp.eve - 273.15)}</Temp>
					<HeaderText>EVENING</HeaderText>
				</Container>
				<Container>
					<Temp>{Math.round(dailyData[selectedIndex].temp.night - 273.15)}</Temp>
					<HeaderText>NIGHT</HeaderText>
				</Container>
			</Wrapper>
		</>
	)
}