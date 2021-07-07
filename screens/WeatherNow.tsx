import React, { useEffect, useState } from 'react';
import getWeatherApi from '../components/api/weather';
import { Text, View } from '../components/Themed';

type WeatherNowStates = {
	weatherData: {
		currently: {
			apparentTemperature: number,
			humidity: number,
			icon: string,
			summary: string,
			temperature: number,
			time: Date
		},
		daily: {
			apparentTemperatureHigh: number,
			apparentTemperatureHighTime: Date,
			apparentTemperatureLow: number,
			apparentTemperatureLowTime: Date,
		}
	},
	isLoading: boolean,
	tempScale: "F" | "C",
	selectedDate: Date,
}

export default function WeatherNow() {
	const [weatherData, setWeatherData] = useState<WeatherNowStates>();

  useEffect(() => {
	  getWeatherApi('F').then((weatherData) => {
		  setWeatherData(weatherData);
	  }).catch((error) => {
		  console.log("There was an error getting the data", error)
	  })
  });

  console.log(weatherData)
	return (
		<View>
			<Text>Hello!</Text>
		</View>
	)
}