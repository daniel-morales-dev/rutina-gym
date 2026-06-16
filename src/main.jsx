import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Shell from './shell'
import GymRoutine from './App'
import PlanNutricional from './plan-nutricional'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<GymRoutine />} />
          <Route path="nutricion" element={<PlanNutricional />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
