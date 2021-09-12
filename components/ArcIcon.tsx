import React from 'react';
import styled from 'styled-components/native';

const ArcIconStyled = styled.Image`
	width: 100%;
	height: 100%;

	margin-top: 10px;
`;

export default function ArcIcon() {
	return (
		<ArcIconStyled source={require('../assets/images/arc.png')} />
	);
}