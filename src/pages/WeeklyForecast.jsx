import { useOutletContext } from 'react-router-dom'
import { useWeatherByCity } from '../hooks/useWeatherByCity'

const getWeatherIcon = (code) => {
  if (code === 0) return '☀️'
  if (code <= 2) return '🌤️'
  if (code <= 3) return '☁️'
  if (code >= 51 && code <= 67) return '🌧️'
  if (code >= 71 && code <= 77) return '❄️'
  if (code >= 95) return '⛈️'
  return '🌥️'
}

const formatDay = (date, index) => {
  if (index === 0) return 'Сегодня'
  return new Date(date).toLocaleDateString('ru-RU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

const WeeklyForecast = () => {
  const { city } = useOutletContext()
  const { data, loading, error } = useWeatherByCity(city)

  if (!city) return <p className="text-center mt-6">Выберите город</p>
  if (loading) return <p className="text-center mt-6">Загрузка погоды...</p>
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>
  if (!data?.daily?.time) return null

  const { daily } = data

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-200 via-blue-300 to-indigo-400 py-10 px-4">
      <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/30 border border-white/40 rounded-3xl shadow-xl p-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white drop-shadow">
            Прогноз на 7 дней
          </h1>
          <p className="text-xl text-white/90 mt-2 tracking-widest">
            {city.toUpperCase()}
          </p>
        </div>

        <div className="space-y-4">
          {daily.time.slice(0, 7).map((day, index) => {
            const max = daily.temperature_2m_max?.[index]
            const min = daily.temperature_2m_min?.[index]
            const code = daily.weathercode?.[index]
            const rain = daily.precipitation_sum?.[index] ?? 0

            return (
              <div
                key={day}
                className={`flex items-center justify-between
                  rounded-2xl px-6 py-4 transition-all duration-300
                  ${
                    index === 0
                      ? 'bg-white shadow-lg scale-[1.02]'
                      : 'bg-white/70 hover:bg-white hover:shadow-md'
                  }`}
              >
                <div className="w-28 font-semibold text-gray-800">
                  {formatDay(day, index)}
                </div>

                <div className="text-4xl drop-shadow">
                  {getWeatherIcon(code)}
                </div>

                <div className="flex gap-6 text-lg">
                  <span className="text-red-500 font-bold">{max}°</span>
                  <span className="text-blue-500 font-bold">{min}°</span>
                </div>

                <div className="text-sm text-gray-600 font-medium">
                  💧 {rain} мм
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default WeeklyForecast
