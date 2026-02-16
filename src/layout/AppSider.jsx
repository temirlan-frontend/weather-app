import { Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SiderItems } from './SiderItems'

const AppSider = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Sider
      width={270}
      style={{
        height: '100vh',
        position: 'fixed',
        left: 0,
        background: '#fff',
        borderRight: '1px solid #e5e7eb',
      }}
    >
      <div className="w-12.5 bg-blue-900 text-white pt-3  pb-0.75 pl-0.5 mt-3 ml-3">
        <Link
          to="/"
          className="block text-white! leading-none text-[11px] font-medium no-underline"
        >
          The Weather Channel
        </Link>
      </div>
      <Menu
        theme="light"
        mode="inline"
        items={SiderItems}
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
        className="flex flex-col text-[14px] font-bold gap-2 h-screen"
      />
    </Sider>
  )
}

export default AppSider
