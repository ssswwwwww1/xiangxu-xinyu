import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AssessmentPage from './pages/AssessmentPage'
import JourneyPage from './pages/JourneyPage'
import CheckInPage from './pages/CheckInPage'
import MemoryPage from './pages/MemoryPage'
import DigitalHumanPage from './pages/DigitalHumanPage'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import JourneyList from './pages/admin/JourneyList'
import CheckInList from './pages/admin/CheckInList'
import EmotionAnalysis from './pages/admin/EmotionAnalysis'
import ClientLayout from './components/ClientLayout' // Add this import

function App() {
  return (
    <Router>
      <Routes>
        {/* C端 路由 - 包裹在 ClientLayout 中 */}
        <Route element={<ClientLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/checkin" element={<CheckInPage />} />
          <Route path="/memory" element={<MemoryPage />} />
          <Route path="/digital-human" element={<DigitalHumanPage />} />
        </Route>

        {/* B端 管理后台路由 */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="journeys" element={<JourneyList />} />
          <Route path="checkins" element={<CheckInList />} />
          <Route path="emotions" element={<EmotionAnalysis />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
