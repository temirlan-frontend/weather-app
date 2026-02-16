import { Layout } from 'antd'
import AppHeader from './AppHeader'
import { Outlet } from 'react-router-dom'
import AppSider from './AppSider'
import { useState } from 'react'

const AppLayout = () => {
  const [city, setCity] = useState(() => {
    return localStorage.getItem('city') || ''
  })

  const handleSetCity = (newCity) => {
    setCity(newCity)
    localStorage.setItem('city', newCity)
  }

  return (
    <Layout hasSider className="h-screen overflow-hidden">
      <AppSider />

      <Layout>
        <AppHeader setCity={handleSetCity} />

        <Layout.Content
          className="bg-white text-black"
          style={{
            marginTop: 64, // высота Header
            marginLeft: 270, // ширина Sider
            height: 'calc(100vh - 64px)',
            overflow: 'auto',
          }}
        >
          <Outlet context={{ city }} />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
export default AppLayout
