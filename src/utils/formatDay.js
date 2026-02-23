export const formatDay = (date, index) => {
  if (index === 0) return 'Сегодня'
  return new Date(date).toLocaleDateString('ru-RU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}
