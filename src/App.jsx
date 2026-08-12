import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DecisionProvider } from './context/DecisionContext'
import { LanguageProvider } from './i18n/LanguageContext'
import Landing from './pages/Landing'
import Setup from './pages/Setup'
import JourneyRouter from './pages/journey/JourneyRouter'
import DecisionMap from './pages/DecisionMap'

export default function App() {
  return (
    <LanguageProvider>
      <DecisionProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/new" element={<Setup />} />
            <Route path="/journey/*" element={<JourneyRouter />} />
            <Route path="/map" element={<DecisionMap />} />
          </Routes>
        </BrowserRouter>
      </DecisionProvider>
    </LanguageProvider>
  )
}
