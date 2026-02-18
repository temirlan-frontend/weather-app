import { useOutletContext } from 'react-router-dom'
import { airData } from '../utils/airData'

const AirQuality = () => {
  const { city } = useOutletContext()

  if (!city) return <p className="text-center mt-6">Выберите город</p>

  return (
    <div className="h-full bg-linear-to-br from-indigo-300 via-blue-400 to-sky-500 py-10 px-4">
      <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/30 border border-white/40 rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white drop-shadow">
            🌬️ Качество воздуха
          </h1>
          <p className="text-white/90 mt-2">
            Город: <span className="font-semibold">{city.toUpperCase()}</span>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* PM10 */}
          <div className="bg-white/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">PM10</h2>
            <p className="text-2xl font-bold text-gray-900">
              {airData.pm10} μg/m³
            </p>
          </div>

          <div className="bg-white/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">PM2.5</h2>
            <p className="text-2xl font-bold text-gray-900">
              {airData.pm2_5} μg/m³
            </p>
          </div>

          <div className="bg-white/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">CO₂</h2>
            <p className="text-2xl font-bold text-gray-900">
              {airData.co2} ppm
            </p>
          </div>

          <div
            className={`bg-white/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transition ${airData.color}`}
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Общее качество
            </h2>
            <p className="text-2xl font-bold text-white">{airData.quality}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AirQuality
