export const SiderItems = [
  {
    key: '/',
    icon: <i className="ri-sun-cloudy-fill text-[30px]"></i>,
    label: 'Сегодня',
  },
  {
    key: '/hourly',
    icon: <i className="ri-time-fill text-[20px]"></i>,
    label: 'Ежечасно',
  },
  {
    key: '/weekly',
    icon: <i className="ri-calendar-line text-[20px]"></i>,
    label: 'На неделю',
  },
  {
    key: '/twoWeekly',
    icon: <i className="ri-calendar-2-line text-[20px]"></i>,
    label: 'На 14 дней',
  },
  {
    key: '/radar',
    icon: <i className="ri-scan-2-line text-[20px]"></i>,
    label: 'Радар',
  },
  {
    key: '/allergy',
    icon: <i className="ri-plant-line text-[20px]"></i>,
    label: (
      <span>
        <span className="block leading-4">Средство отслеживания</span>
        <span className="block leading-4">аллергии</span>
      </span>
    ),
  },
  {
    key: '/airQuality',
    icon: <i className="ri-user-voice-line text-[20px]"></i>,
    label: 'Индекс качества воздуха',
  },
]
