import { useOutletContext } from 'react-router-dom'
import { useWeatherByCity } from '../hooks/useWeatherByCity'
import { getWeatherIcon } from '../utils/getWeatherIcon'

const Today = () => {
  const { city } = useOutletContext()
  const { data, loading, error } = useWeatherByCity(city)

  if (!city) return <p className="text-center mt-6">Выберите город</p>
  if (loading) return <p className="text-center mt-6">Загрузка погоды...</p>
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>
  if (!data) return null

  const { current, daily, hourlyToday } = data

  return (
    <div className="max-w-4xl mx-auto mt-6 space-y-6">
      <div
        className="relative bg-linear-to-r from-indigo-600 via-purple-700 to-pink-600
                      rounded-2xl p-6 text-white flex items-center justify-between shadow-lg"
      >
        <div>
          <h1 className="text-2xl font-bold">{city.toUpperCase()}</h1>
          <p className="mt-1 text-lg">{current.weathercodeDescription}</p>
          <p className="mt-2 text-6xl font-extrabold">{current.temperature}°</p>
          <p className="mt-1 text-sm">
            День {daily.temperature_2m_max[0]}° • Ночь{' '}
            {daily.temperature_2m_min[0]}°
          </p>
        </div>
        <div className="text-8xl animate-pulse">
          {getWeatherIcon(current.weathercode)}
        </div>
        <div className="absolute inset-0 opacity-20">
          <svg
            className="w-full h-full"
            viewBox="0 0 200 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="cloudGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect width="200" height="100" fill="url(#cloudGradient)" />
          </svg>
        </div>
      </div>

      <div className="bg-white border rounded-2xl p-4 shadow-sm">
        <h2 className="font-semibold mb-3 text-gray-700">Дождь сегодня</h2>
        <div className="relative flex items-end space-x-1 h-36 bg-gray-50 rounded-xl p-2">
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              className="absolute left-0 right-0 h-px bg-gray-200"
              style={{ bottom: `${idx * 20}%` }}
            ></div>
          ))}

          {hourlyToday.map((h, i) => (
            <div
              key={i}
              className="w-3 rounded-t-xl shadow-md transform transition-all duration-500 hover:scale-y-110"
              style={{
                height: `${h.precipitation * 6}px`,
                background: `linear-gradient(to top, #3b82f6, #93c5fd)`,
              }}
              title={`${h.time.split('T')[1].slice(0, 5)} - ${h.precipitation} мм`}
            ></div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          {hourlyToday.map((h, i) => (
            <span key={i}>{h.time.split('T')[1].slice(0, 2)}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Today
