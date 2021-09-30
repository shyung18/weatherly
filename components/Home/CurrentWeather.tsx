import React from 'react';
import { ImageSourcePropType } from 'react-native';
import styled from 'styled-components/native';
import { TempScaleType } from '../../containers/HomeScreen';
import StyledText from '../StyledText';
import SunIcon from '../SunIcon';

interface CurrentWeatherProps {
	cityName: string,
	currentWeatherImgSource: ImageSourcePropType,
	tempScale: TempScaleType,
	currentTemp: number,
	minTemp: number,
	maxTemp: number,
	currentDate: string,
	sunriseTime: number,
	sunsetTime: number,
	onTempScaleChange: () => void,
}

//Change margin-top for different screen sizes to match the sunrise and sunset icons
const Container = styled.View`
	width: 100%;
	position: absolute;

	margin-top: 50px;
`;

const LocationView = styled.View`
	position: absolute;
	top: -15px;
	min-width: 70px;
	
	padding: 8px 5px;
	margin-left: 15px;
	border-radius: 6px;

	background-color: #CDD6DE;
`;

const TempScaleView = styled.TouchableHighlight`
	position: absolute;
	top: -15px;
	right: 15px;
	min-width: 70px;
	
	padding: 8px 5px;
	border-radius: 6px;

	background-color: #CDD6DE;
`;

const CurrentWeatherIcon = styled.Image`
	width: 80px;
	height: 60px;
`;

const Wrapper = styled.View`
	width: 100%;
	flex-direction: column;
	align-items: center;
`;

const CurrentTemp = styled(StyledText)`
	font-size: 33px;
	color: #626262;
`;

const CurrentDate = styled(StyledText)`
	font-size: 14px;
	color: #626262;

	padding-bottom: 9px;
`;

const LowHighTemp = styled(StyledText)`
	font-size: 14px;
	color: #626262;
`;


const LocationText = styled(StyledText)`
	font-size: 13px;
	color: #6F6E6E;

	align-self:center;
`;

const TempScaleText = styled(LocationText)``;

export default function CurrentWeather({
	cityName, currentWeatherImgSource, tempScale, currentTemp, minTemp, maxTemp, currentDate, sunriseTime, sunsetTime, onTempScaleChange
}: CurrentWeatherProps) {
	return (
		<Container>
			<LocationView>
				<LocationText>
					{cityName}
				</LocationText>
			</LocationView>
			<Wrapper>
				<CurrentWeatherIcon source={currentWeatherImgSource} />
				<CurrentTemp>{currentTemp}&deg;{tempScale}</CurrentTemp>
				<CurrentDate>{currentDate}</CurrentDate>
				<LowHighTemp>{minTemp} / {maxTemp} &deg;{tempScale}</LowHighTemp>
			</Wrapper>
			<SunIcon type="sunrise" time={sunriseTime} />
			<SunIcon type="sunset" time={sunsetTime} />
			<TempScaleView onPress={() => onTempScaleChange()}>
				<TempScaleText>
					C&deg; / F&deg;
				</TempScaleText>
			</TempScaleView>
		</Container>
	)
}