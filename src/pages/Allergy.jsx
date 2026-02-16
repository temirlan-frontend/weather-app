const allergens = [
  { name: 'Пыльца берёзы', level: 'Высокий', color: 'bg-red-500' },
  { name: 'Злаковые травы', level: 'Средний', color: 'bg-yellow-400' },
  { name: 'Амброзия', level: 'Низкий', color: 'bg-green-500' },
]

const Allergy = () => {
  return (
    <div className="h-full bg-linear-to-br from-emerald-200 via-green-300 to-teal-400 py-10 px-4">
      <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/30 border border-white/40 rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white drop-shadow">
            🌿 Отслеживание аллергии
          </h1>
          <p className="text-white/90 mt-2">
            Текущий уровень аллергенов в воздухе
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {allergens.map((item) => (
            <div
              key={item.name}
              className="bg-white/80 rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {item.name}
              </h2>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Уровень:</span>

                <span
                  className={`px-3 py-1 text-white text-xs font-semibold rounded-full ${item.color}`}
                >
                  {item.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Allergy
