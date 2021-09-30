import React from 'react';
import styled from 'styled-components/native';

const ArcContainer = styled.View`
	width: 100%;
	flex-direction: row;
	width: 100%;
	height: 200px;
	align-items: center;

	padding-right: 37px;
	padding-left: 37px;

	position: relative;
`;

const ArcIconStyled = styled.Image`
	width: 100%;
	height: 100%;

	margin-top: 10px;
`;

export default function ArcBackground() {
	return (
		<ArcContainer>
			<ArcIconStyled source={require('../assets/images/arc.png')} />
		</ArcContainer>
	);
}