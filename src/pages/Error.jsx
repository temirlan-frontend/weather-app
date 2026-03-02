import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-8xl font-bold text-gray-800 mb-4">404</h1>

      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Страница не найдена
      </h2>

      <p className="text-gray-500 text-center mb-6 max-w-md">
        К сожалению, страница, которую вы ищете, не существует или была
        перемещена.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Вернуться на главную
      </Link>
    </div>
  )
}

export default Error
