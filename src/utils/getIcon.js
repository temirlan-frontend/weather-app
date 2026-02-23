export const getIcon = (precipitation) => {
  if (precipitation > 2) return '🌧️'
  if (precipitation > 0) return '🌦️'
  return '☀️'
}
