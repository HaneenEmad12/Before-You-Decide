import { Routes, Route, Navigate } from 'react-router-dom'
import StepContext from './StepContext'
import StepPriorities from './StepPriorities'
import StepOptions from './StepOptions'
import StepFacts from './StepFacts'
import StepRisks from './StepRisks'
import StepScenarios from './StepScenarios'
import StepClarity from './StepClarity'

export default function JourneyRouter() {
  return (
    <Routes>
      <Route index element={<Navigate to="context" replace />} />
      <Route path="context" element={<StepContext />} />
      <Route path="priorities" element={<StepPriorities />} />
      <Route path="options" element={<StepOptions />} />
      <Route path="facts" element={<StepFacts />} />
      <Route path="risks" element={<StepRisks />} />
      <Route path="scenarios" element={<StepScenarios />} />
      <Route path="clarity" element={<StepClarity />} />
      <Route path="*" element={<Navigate to="context" replace />} />
    </Routes>
  )
}
