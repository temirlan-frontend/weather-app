import { Input, Layout } from 'antd'

const { Header } = Layout

const AppHeader = ({ setCity }) => {
  return (
    <Header
      className="fixed top-0 left-67.5 w-[calc(100%-270px)]
                 h-18 z-100 bg-white! p-3 flex items-center justify-center
                 border-b border-gray-300
                "
    >
      <Input.Search
        placeholder="Введите город"
        className="max-w-104"
        size="large"
        onSearch={(value) => {
          if (value) setCity(value)
        }}
      />
    </Header>
  )
}

export default AppHeader
