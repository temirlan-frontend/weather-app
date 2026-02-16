export const getWeather = async (latitude = 41.2995, longitude = 69.2401) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,weathercode,windspeed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=Asia/Tashkent`

  const res = await fetch(url)
  if (!res.ok) throw new Error('Ошибка при получении данных')
  const data = await res.json()
  return data
}
