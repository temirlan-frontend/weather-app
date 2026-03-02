import { Route, Routes } from 'react-router-dom'
import AppLayout from '../layout/AppLayout'
import AirQuality from '../pages/AirQuality'
import Allergy from '../pages/Allergy'
import Hourly from '../pages/Hourly'
import Month from '../pages/TwoWeekForecast'
import Radar from '../pages/Radar'
import Today from '../pages/Today'
import WeeklyForecast from '../pages/WeeklyForecast'
import Error from '../pages/Error'

const Router = () => {
  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Today />} />
          <Route path="hourly" element={<Hourly />} />
          <Route path="weekly" element={<WeeklyForecast />} />
          <Route path="twoWeekly" element={<Month />} />
          <Route path="radar" element={<Radar />} />
          <Route path="allergy" element={<Allergy />} />
          <Route path="airQuality" element={<AirQuality />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </>
  )
}

export default Router
