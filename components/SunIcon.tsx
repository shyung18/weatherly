import React from 'react';
import styled from 'styled-components/native';
import StyledText from '../components/StyledText';

interface SunIconProps {
	type: 'sunset' | 'sunrise';
	time?: number;
};

const SunIconWrapper = styled.View`
	position: absolute;
	width: 100%;
	height: 100%;
`;

const SunIconContainer = styled.View`
	width: 164%;
	align-items: center;

	position: relative;
	top: 90px;

	${(props: SunIconProps) =>
		props.type === 'sunrise' && `width: 36%;`};
`;

const SunIconStyled = styled.Image`
	width: 80px;
	height: 45px;
`;

const SunIconTime = styled(StyledText)`
	color: white;
`;

export default function SunIcon({ type, time }: SunIconProps) {
	let convertToDate = time ? new Date(time * 1000) : new Date();
	let hour = convertToDate.getHours() % 12;
	hour = hour ? hour : 12;
	let minutes = convertToDate.getMinutes();
	let styledMinutes = minutes < 10 ? '0' + minutes : minutes + '';

	return (
		<SunIconWrapper>
			<SunIconContainer type={type}>
				<SunIconStyled source={type === 'sunrise' ? require(`../assets/images/sunrise.png`) : require('../assets/images/sunset.png')} />
				<SunIconTime>{hour}:{styledMinutes} {type === 'sunrise' ? 'AM' : 'PM'}</SunIconTime>
			</SunIconContainer>
		</SunIconWrapper>
	);

}