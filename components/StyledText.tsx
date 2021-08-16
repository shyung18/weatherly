import * as React from 'react';
import { Text, TextProps } from './Themed';


export default function StyledText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Quicksand-Light' }]} />;
}
