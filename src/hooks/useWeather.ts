import axios from "axios";
import type { SearchType } from "../types"
import { number, object, parse, string, type InferOutput } from "valibot";
import { useMemo, useState } from "react";


const WeatherSchemma = object({
  name: string(),
  main: object({
    temp: number(),
    temp_max: number(),
    temp_min: number()
  })
})
const initialWeather = {
  name: '',
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0
  }
}
export type Weather = InferOutput<typeof WeatherSchemma>
export default function useWeather() {
  const [weather, setWeather] = useState<Weather>(initialWeather)
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const fetchWeather = async (search: SearchType) => {
    const appId = import.meta.env.VITE_API_KEY
    setLoading(true)
    setWeather(initialWeather)
    try {
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

      const { data } = await axios(geoUrl)
      if(!data[0]){
         setNotFound(true)
      }
      const { lat, lon } = data[0]

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
      const { data: weatherResult } = await axios(weatherUrl)
      const result = parse(WeatherSchemma, weatherResult)
      if (result) {
        setWeather(result)
      }


    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }

  };

  const hasWeatherData = useMemo(() => weather.name, [weather])

  return { weather, fetchWeather, hasWeatherData, loading, notFound};
}
