import { useOutletContext } from 'react-router-dom'
import { useWeatherByCity } from '../hooks/useWeatherByCity'
import { formatDay } from '../utils/formatDay'
import { weatherIcon } from '../utils/weatherIcon'

const TwoWeekForecast = () => {
  const { city } = useOutletContext()
  const { data, loading, error } = useWeatherByCity(city)

  if (!city) return <p className="text-center mt-6">Выберите город</p>
  if (loading) return <p className="text-center mt-6">Загрузка погоды...</p>
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>
  if (!data?.daily?.time) return null

  const { daily } = data

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-300 via-blue-400 to-sky-500 py-10 px-4">
      <div className="max-w-6xl mx-auto backdrop-blur-xl bg-white/30 border border-white/40 rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white drop-shadow">
            Прогноз на 14 дней
          </h1>
          <p className="text-xl text-white/90 mt-2 tracking-widest">
            {city.toUpperCase()}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {daily.time.slice(0, 14).map((day, index) => {
            const max = daily.temperature_2m_max?.[index]
            const min = daily.temperature_2m_min?.[index]
            const code = daily.weathercode?.[index]
            const rain = daily.precipitation_sum?.[index] ?? 0

            return (
              <div
                key={day}
                className={`rounded-2xl p-5 text-center transition-all duration-300
                ${
                  index === 0
                    ? 'bg-white shadow-xl scale-105'
                    : 'bg-white/70 hover:bg-white hover:shadow-lg'
                }`}
              >
                <p className="text-sm text-gray-600 mb-2 font-medium">
                  {formatDay(day, index)}
                </p>

                <div className="text-4xl my-3 drop-shadow">
                  {weatherIcon(code)}
                </div>

                <p className="text-xl font-bold text-gray-800">{max}°</p>

                <p className="text-sm text-gray-500">{min}° min</p>

                <p className="text-xs text-gray-500 mt-2">💧 {rain} мм</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TwoWeekForecast
