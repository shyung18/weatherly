export default function changeTempScale(tempScale: string, temperature: number) {
	return tempScale == 'C' ? Math.round(temperature - 273.15) : Math.round((temperature - 273.15) * 9 / 5 + 32);
}