import {
  Bell,
  BrainCircuit,
  Check,
  Clock3,
  Cpu,
  Database,
  Gauge,
  MonitorCog,
  Moon,
  Save,
  ScanFace,
  ShieldCheck,
  Siren,
  TimerReset,
  Volume2,
  Wifi,
  UserRound,
  Car,
} from 'lucide-react'
import { useState } from 'react'

const initialSettings = {
  humanDetection: true,
  vehicleDetection: true,
  faceRecognition: true,
  anpr: true,
  intrusionAlerts: true,
  loiteringDetection: true,
  cameraOfflineAlerts: true,
  alertSound: true,
  darkMode: true,
  autoRefresh: true,
}

const detectionSettings = [
  { key: 'humanDetection', label: 'Human detection', icon: UserRound },
  { key: 'vehicleDetection', label: 'Vehicle detection', icon: Car },
  { key: 'faceRecognition', label: 'Face recognition', icon: ScanFace },
  { key: 'anpr', label: 'ANPR / License plate recognition', icon: ShieldCheck },
]

const alertSettings = [
  { key: 'intrusionAlerts', label: 'Intrusion alerts', icon: Siren },
  { key: 'loiteringDetection', label: 'Loitering detection', icon: TimerReset },
  { key: 'cameraOfflineAlerts', label: 'Camera offline alerts', icon: Wifi },
  { key: 'alertSound', label: 'Alert sound', icon: Volume2 },
]

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full border transition ${checked ? 'border-cyan-300/50 bg-cyan-400' : 'border-white/10 bg-slate-800'}`}
    >
      <span className={`absolute top-1 h-4 w-4 rounded-full transition ${checked ? 'left-6 bg-[#071014]' : 'left-1 bg-slate-500'}`} />
    </button>
  )
}

function SettingRow({ setting, checked, onChange }) {
  const Icon = setting.icon
  return (
    <div className="flex items-center gap-3 border-b border-white/[0.06] py-4 last:border-b-0">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-cyan-400/10 bg-cyan-400/[0.06] text-cyan-400">
        <Icon size={16} />
      </div>
      <span className="min-w-0 flex-1 text-sm text-slate-300">{setting.label}</span>
      <span className={`mr-2 text-[10px] font-bold uppercase tracking-wider ${checked ? 'text-emerald-400' : 'text-slate-600'}`}>{checked ? 'On' : 'Off'}</span>
      <Toggle checked={checked} onChange={onChange} label={`Toggle ${setting.label}`} />
    </div>
  )
}

function SectionHeader({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-3 border-b border-white/[0.07] pb-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-cyan-400/15 bg-cyan-400/[0.07] text-cyan-400">
        <Icon size={18} />
      </div>
      <div>
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        <p className="mt-1 text-xs text-slate-600">{description}</p>
      </div>
    </div>
  )
}

export default function Settings() {
  const [settings, setSettings] = useState(initialSettings)
  const [refreshInterval, setRefreshInterval] = useState('5')

  const toggleSetting = (key) => {
    setSettings((current) => ({ ...current, [key]: !current[key] }))
  }

  return (
    <div>
      <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-400"><span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> Administration / control</p>
          <h1 className="font-display text-4xl font-semibold tracking-wide text-white sm:text-5xl">System Settings</h1>
          <p className="mt-2 text-sm text-slate-500">Configure surveillance, detection and system preferences.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500"><MonitorCog size={15} className="text-cyan-400" /> Configuration console</div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <section className="border border-white/[0.07] bg-[#0d1217] p-5">
          <SectionHeader icon={Gauge} title="System Status" description="Current health of core surveillance services." />
          <div className="grid gap-1 pt-2 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
            {[
              { label: 'AI detection engine', value: 'Online', icon: BrainCircuit },
              { label: 'Video processing', value: 'Running', icon: Cpu },
              { label: 'Backend connection', value: 'Connected', icon: Database },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3 border-b border-white/[0.06] py-3 last:border-b-0 sm:border-b-0 xl:border-b 2xl:border-b-0">
                <Icon size={16} className="text-slate-500" />
                <span className="flex-1 text-xs text-slate-400">{label}</span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400"><Check size={13} /> {value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-white/[0.07] bg-[#0d1217] p-5">
          <SectionHeader icon={ShieldCheck} title="Detection Settings" description="Select the events identified by the AI engine." />
          <div className="pt-1">
            {detectionSettings.map((setting) => <SettingRow key={setting.key} setting={setting} checked={settings[setting.key]} onChange={() => toggleSetting(setting.key)} />)}
          </div>
        </section>

        <section className="border border-white/[0.07] bg-[#0d1217] p-5">
          <SectionHeader icon={Bell} title="Alert Settings" description="Control which events reach the operations centre." />
          <div className="pt-1">
            {alertSettings.map((setting) => <SettingRow key={setting.key} setting={setting} checked={settings[setting.key]} onChange={() => toggleSetting(setting.key)} />)}
          </div>
        </section>

        <section className="border border-white/[0.07] bg-[#0d1217] p-5">
          <SectionHeader icon={MonitorCog} title="System Preferences" description="Manage display and dashboard update behaviour." />
          <div className="pt-1">
            <SettingRow setting={{ key: 'darkMode', label: 'Dark mode', icon: Moon }} checked={settings.darkMode} onChange={() => toggleSetting('darkMode')} />
            <SettingRow setting={{ key: 'autoRefresh', label: 'Auto-refresh dashboard', icon: TimerReset }} checked={settings.autoRefresh} onChange={() => toggleSetting('autoRefresh')} />
            <div className="flex items-center gap-3 py-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-cyan-400/10 bg-cyan-400/[0.06] text-cyan-400"><Clock3 size={16} /></div>
              <label htmlFor="refresh-interval" className="flex-1 text-sm text-slate-300">Refresh interval</label>
              <div className="relative">
                <select id="refresh-interval" value={refreshInterval} onChange={(event) => setRefreshInterval(event.target.value)} className="h-9 appearance-none border border-white/[0.1] bg-[#080c10] py-1 pl-3 pr-8 text-sm text-slate-300 outline-none focus:border-cyan-400/50">
                  <option value="5">5 seconds</option>
                  <option value="10">10 seconds</option>
                  <option value="30">30 seconds</option>
                </select>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-white/[0.07] pt-5 sm:flex-row sm:items-center">
        <p className="text-xs text-slate-600">Changes are stored locally in this prototype.</p>
        <button type="button" className="flex items-center gap-2 bg-cyan-400 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#071014] transition hover:bg-cyan-300"><Save size={15} /> Save Changes</button>
      </div>
    </div>
  )
}
