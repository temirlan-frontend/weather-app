import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useOutletContext } from 'react-router-dom'
import { useWeatherByCity } from '../hooks/useWeatherByCity'
import L from 'leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const Radar = () => {
  const { city } = useOutletContext()
  const { data, loading, error } = useWeatherByCity(city)

  if (!city) return <p className="text-center mt-6">Выберите город</p>
  if (loading) return <p className="text-center mt-6">Загрузка карты...</p>
  if (error) return <p className="text-center mt-6 text-red-500">{error}</p>
  if (!data?.latitude || !data?.longitude)
    return <p className="text-center mt-6">Координаты города не найдены</p>

  const { latitude, longitude } = data

  return (
    <div className="h-full bg-linear-to-br from-slate-300 via-blue-400 to-indigo-500 py-10 px-4">
      <div className="max-w-6xl mx-auto backdrop-blur-xl bg-white/30 border border-white/40 rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white drop-shadow">
            Радар осадков
          </h1>
          <p className="text-white/90 mt-2">
            Карта осадков вокруг города{' '}
            <span className="font-semibold tracking-widest">
              {city.toUpperCase()}
            </span>
          </p>
        </div>

        <div className="w-full h-100 rounded-3xl overflow-hidden shadow-2xl border border-white/50">
          <MapContainer
            center={[latitude, longitude]}
            zoom={7}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
          >
            {/* Базовая карта */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap"
            />

            {/* Радар осадков */}
            <TileLayer
              url="https://tilecache.rainviewer.com/v2/radar/0/{z}/{x}/{y}/2/1_1.png"
              attribution="&copy; RainViewer"
              opacity={0.6}
            />

            <Marker position={[latitude, longitude]} icon={defaultIcon}>
              <Popup>{city}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  )
}

export default Radar
