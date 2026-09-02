import { Activity, Camera as CameraIcon, Search, Wifi, WifiOff } from 'lucide-react'
import { useMemo, useState } from 'react'
import CameraTile from '../components/CameraTile'

const cameras = [
  { id: 'CAM-01', location: 'BOP Kharpa / North', status: 'online' },
  { id: 'CAM-02', location: 'BOP Kharpa / East', status: 'online' },
  { id: 'CAM-03', location: 'Observation Post 07', status: 'offline' },
  { id: 'CAM-04', location: 'Sector 04 / Perimeter', status: 'online' },
  { id: 'CAM-05', location: 'BOP Ranidanga / Gate', status: 'online' },
  { id: 'CAM-06', location: 'Sector 02 / Checkpoint', status: 'online' },
  { id: 'CAM-07', location: 'BOP Chandan / West', status: 'offline' },
  { id: 'CAM-08', location: 'Observation Post 11', status: 'online' },
  { id: 'CAM-09', location: 'Sector 07 / Floodlight', status: 'online' },
  { id: 'CAM-10', location: 'BOP Kharpa / South', status: 'online' },
  { id: 'CAM-11', location: 'Sector 01 / Perimeter', status: 'offline' },
  { id: 'CAM-12', location: 'BOP Chandan / Main Road', status: 'online' },
]

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Online', value: 'online' },
  { label: 'Offline', value: 'offline' },
]

function StatusBadge({ status }) {
  const isOnline = status === 'online'
  return <span className={`absolute right-4 top-3 z-[1] flex items-center gap-1.5 rounded border px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${isOnline ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300' : 'border-red-400/20 bg-red-400/10 text-red-300'}`}><span className={`h-1.5 w-1.5 rounded-full ${isOnline ? 'bg-emerald-400 shadow-[0_0_7px_#34d399]' : 'bg-red-400'}`} />{isOnline ? 'Online' : 'Offline'}</span>
}

export default function Cameras() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const normalizedQuery = query.trim().toLowerCase()
  const filteredCameras = useMemo(() => cameras.filter((camera) => {
    const matchesQuery = !normalizedQuery || `${camera.id} ${camera.location}`.toLowerCase().includes(normalizedQuery)
    const matchesFilter = filter === 'all' || camera.status === filter
    return matchesQuery && matchesFilter
  }), [filter, normalizedQuery])
  const onlineCount = cameras.filter((camera) => camera.status === 'online').length
  const offlineCount = cameras.length - onlineCount

  return <div>
    <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
      <div>
        <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-400"><span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> Operations / surveillance</p>
        <h1 className="font-display text-4xl font-semibold tracking-wide text-white sm:text-5xl">Camera Network</h1>
        <p className="mt-2 text-sm text-slate-500">Monitor all connected CCTV cameras across border sectors and observation posts.</p>
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-500"><Activity size={15} className="text-emerald-400" /> Live network view</div>
    </div>

    <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
      <div className="border border-white/[0.07] bg-[#0d1217] p-4"><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600">Total cameras</p><p className="mt-2 font-display text-3xl font-semibold text-white">{cameras.length}</p></div>
      <div className="border border-white/[0.07] bg-[#0d1217] p-4"><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600">Online</p><p className="mt-2 flex items-center gap-2 font-display text-3xl font-semibold text-emerald-300"><Wifi size={22} />{onlineCount}</p></div>
      <div className="border border-white/[0.07] bg-[#0d1217] p-4"><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600">Offline</p><p className="mt-2 flex items-center gap-2 font-display text-3xl font-semibold text-red-300"><WifiOff size={22} />{offlineCount}</p></div>
    </div>

    <div className="mb-6 flex flex-col gap-3 rounded border border-white/[0.07] bg-[#0d1217] p-3 sm:flex-row sm:items-center">
      <label className="relative flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by camera ID or location" className="h-10 w-full border border-white/[0.08] bg-[#080c10] pl-10 pr-3 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-cyan-400/50" /></label>
      <div className="flex shrink-0 gap-1 rounded border border-white/[0.07] bg-[#080c10] p-1">{filters.map(({ label, value }) => <button key={value} onClick={() => setFilter(value)} className={`px-3 py-2 text-xs font-semibold transition ${filter === value ? 'bg-cyan-400/15 text-cyan-300' : 'text-slate-500 hover:text-slate-200'}`}>{label}</button>)}</div>
    </div>

    <div className="mb-4 flex items-center justify-between"><div><h2 className="text-sm font-semibold text-white">All camera feeds</h2><p className="mt-1 text-xs text-slate-600">Showing {filteredCameras.length} of {cameras.length} connected endpoints</p></div><span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-600"><CameraIcon size={14} /> CCTV registry</span></div>
    {filteredCameras.length > 0 ? <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">{filteredCameras.map((camera) => <div key={camera.id} className="relative"><StatusBadge status={camera.status} /><CameraTile id={camera.id} location={camera.location} /></div>)}</div> : <div className="border border-dashed border-white/10 py-16 text-center"><CameraIcon className="mx-auto text-slate-700" size={28} /><p className="mt-3 text-sm text-slate-400">No cameras match the current search.</p></div>}
  </div>
}
