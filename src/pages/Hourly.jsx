import { useOutletContext } from 'react-router-dom'
import { useWeatherByCity } from '../hooks/useWeatherByCity'

const getIcon = (precipitation) => {
  if (precipitation > 2) return '🌧️'
  if (precipitation > 0) return '🌦️'
  return '☀️'
}

const Hourly = () => {
  const { city } = useOutletContext()
  const { data, loading, error } = useWeatherByCity(city)

  if (!city) return <p className="text-center mt-4">Выберите город</p>
  if (loading) return <p className="text-center mt-4">Загрузка погоды...</p>
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>
  if (!data) return null

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Заголовок */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Почасовой прогноз</h1>
        <p className="text-2xl font-semibold text-indigo-600 mt-1">
          {data.city.toUpperCase()}
        </p>
      </div>

      {/* Кратко сегодня */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-indigo-50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500">Сейчас</p>
          <p className="text-2xl font-bold">{data.current.temperature}°</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500">Макс</p>
          <p className="text-2xl font-bold">
            {data.daily.temperature_2m_max[0]}°
          </p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500">Мин</p>
          <p className="text-2xl font-bold">
            {data.daily.temperature_2m_min[0]}°
          </p>
        </div>
      </div>

      {/* Почасовые карточки */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {data.hourlyToday.map((hour) => (
          <div
            key={hour.time}
            className="relative bg-linear-to-b from-indigo-500 to-purple-600
                       text-white rounded-2xl p-4 text-center shadow-md
                       transition transform hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="text-sm opacity-80">
              {hour.time.split('T')[1].slice(0, 5)}
            </p>

            <div className="text-3xl my-2">{getIcon(hour.precipitation)}</div>

            <p className="text-2xl font-bold">{hour.temperature}°</p>

            <div className="mt-3 text-xs opacity-80 space-y-1">
              <p>💧 {hour.precipitation} мм</p>
              <p>🌬 {hour.wind} км/ч</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hourly
