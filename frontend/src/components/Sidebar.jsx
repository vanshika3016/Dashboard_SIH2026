import { Bell, Camera, LayoutDashboard, Map, Settings, Shield } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navigation = [
  { label: 'Dashboard', to: '/', icon: LayoutDashboard },
  { label: 'Cameras', to: '/cameras', icon: Camera },
  { label: 'Alerts', to: '/alerts', icon: Bell, count: 3 },
  { label: 'Map', to: '/map', icon: Map },
  { label: 'Settings', to: '/settings', icon: Settings },
]

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-white/[0.07] bg-[#0b0f13] lg:block">
      <div className="flex h-full flex-col px-5 py-6">
        <div className="flex items-center gap-3 border-b border-white/[0.07] pb-7">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400 text-[#071014] shadow-[0_0_22px_rgba(34,211,238,0.2)]"><Shield size={22} strokeWidth={2.5} /></div>
          <div><p className="font-display text-xl font-bold tracking-[0.12em] text-white">IBVAP</p><p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">Border Intelligence</p></div>
        </div>
        <p className="mb-3 mt-8 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">Operations</p>
        <nav className="space-y-1">
          {navigation.map(({ label, to, icon: Icon, count }) => <NavLink key={to} to={to} className={({ isActive }) => `group flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition ${isActive ? 'bg-cyan-400/[0.12] text-cyan-300' : 'text-slate-500 hover:bg-white/[0.04] hover:text-slate-200'}`}><Icon size={18} /><span className="flex-1">{label}</span>{count && <span className="rounded bg-red-500/15 px-2 py-0.5 text-[10px] font-bold text-red-400">{count}</span>}</NavLink>)}
        </nav>
        <div className="mt-auto rounded-lg border border-white/[0.07] bg-[#10161b] p-4"><div className="mb-3 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Network status</span><span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_9px_#34d399]" /></div><p className="text-xs text-slate-300">All sectors reporting</p><div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-800"><div className="h-full w-[94%] bg-emerald-400" /></div></div>
      </div>
    </aside>
  )
}