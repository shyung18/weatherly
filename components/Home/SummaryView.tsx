import React from 'react';
import styled from 'styled-components/native';
import changeTempScale from '../../functions/changeTempScale';
import StyledText from '../StyledText';

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
	tempScale: 'C' | 'F'
}

const Wrapper = styled.View`
	display: flex;
	flex-direction: column;
`;

const HumWindWrapper = styled(Wrapper)`
	display: flex;
	flex-direction: row;

	padding: 16.5px 30px;
`;

const TempContainer = styled.View`
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 25%;
`;

const HumWindContainer = styled(TempContainer)`
	width: 52%;
	flex-direction: row;
`;

const Container = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 25px 30px 16.5px 30px;
`;

const HeaderText = styled(StyledText)`
	font-size: 15px;
	color: #6F6E6E;
`;

const HumWindHeaderText = styled(HeaderText)`
	margin-right: 10px;
`;

const Temp = styled(StyledText)`
	font-size: 17px;
	color: #6F6E6E;
`;

const Humidity = styled(Temp)`
	margin-left: 17px;
`;

const Wind = styled(Temp)``;

const Line = styled.View`
	display: flex;
	margin: auto;
	width: 85%;
	
	border: 1px solid #CDD6DE;
`;

export default function SummaryView({ tempScale, dailyData, selectedIndex }: SummaryViewProps) {
	return (
		<Wrapper>
			<Container>
				<TempContainer>
					<HeaderText>MORNING</HeaderText>
					<Temp>{changeTempScale(tempScale, dailyData[selectedIndex].temp.morn)} &deg;{tempScale}</Temp>
				</TempContainer>
				<TempContainer>
					<HeaderText>DAY</HeaderText>
					<Temp>{changeTempScale(tempScale, dailyData[selectedIndex].temp.day)} &deg;{tempScale}</Temp>
				</TempContainer>
				<TempContainer>
					<HeaderText>EVENING</HeaderText>
					<Temp>{changeTempScale(tempScale, dailyData[selectedIndex].temp.eve)} &deg;{tempScale}</Temp>
				</TempContainer>
				<TempContainer>
					<HeaderText>NIGHT</HeaderText>
					<Temp>{changeTempScale(tempScale, dailyData[selectedIndex].temp.night)} &deg;{tempScale}</Temp>
				</TempContainer>
			</Container>
			<Line />
			<HumWindWrapper>
				<HumWindContainer>
					<HumWindHeaderText>HUMIDITY</HumWindHeaderText>
					<Humidity>{dailyData[selectedIndex].humidity}</Humidity>
				</HumWindContainer>
				<HumWindContainer >
					<HumWindHeaderText>WIND</HumWindHeaderText>
					<Wind>{dailyData[selectedIndex].wind_speed} mph</Wind>
				</HumWindContainer>
			</HumWindWrapper>
		</Wrapper>
	)
}