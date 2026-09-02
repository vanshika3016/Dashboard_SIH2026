import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Cameras from './pages/Cameras'

function ComingSoon({ title }) {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6 text-center">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">IBVAP module</p>
        <h1 className="text-3xl font-semibold text-white">{title}</h1>
        <p className="mt-3 text-sm text-slate-500">This operational view is being configured.</p>
      </div>
    </section>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#070a0d] text-slate-100">
        <Sidebar />
        <div className="lg:pl-64">
          <Navbar />
          <main className="mx-auto max-w-[1600px] px-4 pb-10 pt-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/cameras" element={<Cameras />} />
              <Route path="/alerts" element={<ComingSoon title="Alert Command" />} />
              <Route path="/map" element={<ComingSoon title="Border Map" />} />
              <Route path="/settings" element={<ComingSoon title="System Settings" />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;