import axios from 'axios'
import { useEffect, useState } from 'react'

export const useWeatherByCity = (city) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!city) return

    const fetchWeather = async () => {
      try {
        setLoading(true)
        setError(null)

        const geoRes = await axios.get(
          'https://geocoding-api.open-meteo.com/v1/search',
          { params: { name: city } },
        )

        if (!geoRes.data.results?.length) {
          setError('Город не найден')
          setData(null)
          return
        }

        const { latitude, longitude } = geoRes.data.results[0]

        const res = await axios.get('https://api.open-meteo.com/v1/forecast', {
          params: {
            latitude,
            longitude,
            current_weather: true,
            hourly: 'temperature_2m,weathercode,precipitation,windspeed_10m',
            daily:
              'temperature_2m_min,temperature_2m_max,weathercode,precipitation_sum',
            forecast_days: 14,
            timezone: 'auto',
          },
        })

        const today = res.data.daily.time[0]

        const todayHourly = res.data.hourly.time
          .map((t, i) => ({ time: t, index: i }))
          .filter(({ time }) => time.startsWith(today))

        setData({
          city,
          current: res.data.current_weather,
          daily: res.data.daily,
          hourlyToday: todayHourly.map(({ index }) => ({
            time: res.data.hourly.time[index],
            temperature: res.data.hourly.temperature_2m[index],
            precipitation: res.data.hourly.precipitation[index],
            wind: res.data.hourly.windspeed_10m[index],
            weathercode: res.data.hourly.weathercode[index],
          })),
          latitude,
          longitude,
        })
      } catch (err) {
        console.error('Ошибка при получении погоды:', err)
        setError('Не удалось получить данные')
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [city])

  return { data, loading, error }
}
