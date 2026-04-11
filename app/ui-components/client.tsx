'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  Check, Copy, Search, ChevronRight, ChevronDown, X,
  Bell, Settings, User, Mail, Lock,
  AlertCircle, CheckCircle, XCircle, Info,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface ComponentDef {
  id: string;
  name: string;
  category: string;
  description: string;
  Preview: React.ComponentType;
  tailwind: string;
  css: string;
}

type CodeTab = 'tailwind' | 'css';

/* ─────────────────────────────────────────────
   Shared Preview Wrapper
───────────────────────────────────────────── */
function PreviewWrap({ children, bg = 'bg-white' }: { children: React.ReactNode; bg?: string }) {
  return (
    <div className={`flex min-h-[130px] flex-wrap items-center justify-center gap-3 rounded-xl p-6 ${bg}`}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Stateful Preview Components (must be uppercase)
───────────────────────────────────────────── */

function TabsPreview() {
  const [active, setActive] = useState('Overview');
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-sm">
        <div className="flex border-b border-zinc-200">
          {['Overview', 'Analytics', 'Reports', 'Settings'].map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition -mb-px ${
                active === t
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-zinc-500 hover:text-zinc-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-white p-4 text-sm text-zinc-500 border border-zinc-200">
          Content for <strong className="text-zinc-700">{active}</strong> tab.
        </div>
      </div>
    </PreviewWrap>
  );
}

function TogglePreview() {
  const [states, setStates] = useState([true, false, true]);
  const toggle = (i: number) => setStates((prev) => prev.map((v, j) => (j === i ? !v : v)));
  const configs = [
    { label: 'Notifications', color: 'bg-blue-500' },
    { label: 'Dark Mode', color: 'bg-purple-500' },
    { label: 'Auto-save', color: 'bg-emerald-500' },
  ];
  return (
    <PreviewWrap>
      <div className="space-y-3">
        {configs.map(({ label, color }, i) => (
          <label key={label} className="flex items-center justify-between gap-8 cursor-pointer">
            <span className="text-sm font-medium text-zinc-700">{label}</span>
            <button
              onClick={() => toggle(i)}
              className={`relative h-6 w-11 rounded-full transition-colors ${states[i] ? color : 'bg-zinc-300'}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  states[i] ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </label>
        ))}
      </div>
    </PreviewWrap>
  );
}

function CheckboxPreview() {
  const [checked, setChecked] = useState<Record<string, boolean>>({ a: true, b: false, c: true });
  const [radio, setRadio] = useState('m');
  return (
    <PreviewWrap>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          {[['a', 'Design'], ['b', 'Development'], ['c', 'Marketing']] as [string, string][]}
          {([['a', 'Design'], ['b', 'Development'], ['c', 'Marketing']] as [string, string][]).map(([k, label]) => (
            <label key={k} className="flex items-center gap-2.5 cursor-pointer">
              <div
                onClick={() => setChecked((p) => ({ ...p, [k]: !p[k] }))}
                className={`h-5 w-5 rounded-md border-2 flex items-center justify-center transition ${
                  checked[k] ? 'bg-blue-600 border-blue-600' : 'border-zinc-300 bg-white'
                }`}
              >
                {checked[k] && <Check size={11} className="text-white" strokeWidth={3} />}
              </div>
              <span className="text-sm text-zinc-700">{label}</span>
            </label>
          ))}
        </div>
        <div className="space-y-2">
          {([['m', 'Monthly'], ['y', 'Yearly'], ['l', 'Lifetime']] as [string, string][]).map(([k, label]) => (
            <label key={k} className="flex items-center gap-2.5 cursor-pointer" onClick={() => setRadio(k)}>
              <div
                className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition ${
                  radio === k ? 'border-blue-600' : 'border-zinc-300'
                }`}
              >
                {radio === k && <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />}
              </div>
              <span className="text-sm text-zinc-700">{label}</span>
            </label>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function ModalPreview() {
  const [open, setOpen] = useState(false);
  return (
    <PreviewWrap>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
      >
        Open Modal
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
              <h3 className="font-semibold text-zinc-800">Confirm Action</h3>
              <button onClick={() => setOpen(false)} className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 transition">
                <X size={18} />
              </button>
            </div>
            <div className="px-6 py-4 text-sm text-zinc-600 leading-relaxed">
              Are you sure you want to delete this item? This action cannot be undone.
            </div>
            <div className="flex justify-end gap-2 border-t border-zinc-100 px-6 py-4">
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </PreviewWrap>
  );
}

function DropdownPreview() {
  const [open, setOpen] = useState(false);
  return (
    <PreviewWrap>
      <div className="relative">
        <button
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 transition"
        >
          Options
          <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-48 rounded-xl border border-zinc-200 bg-white shadow-xl py-1 z-10">
            {[
              { icon: <User size={14} />, label: 'Profile' },
              { icon: <Settings size={14} />, label: 'Settings' },
              { icon: <Bell size={14} />, label: 'Notifications' },
            ].map((item) => (
              <button
                key={item.label}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition"
              >
                <span className="text-zinc-400">{item.icon}</span>
                {item.label}
              </button>
            ))}
            <div className="my-1 border-t border-zinc-100" />
            <button className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition">
              <X size={14} /> Sign out
            </button>
          </div>
        )}
      </div>
    </PreviewWrap>
  );
}

function AccordionPreview() {
  const [open, setOpen] = useState<number | null>(0);
  const items = [
    { q: 'What is included in the free plan?', a: 'Up to 5 projects, 2 GB storage, and basic support.' },
    { q: 'Can I upgrade or downgrade anytime?', a: 'Yes — changes take effect immediately with prorated billing.' },
    { q: 'Is there a long-term contract?', a: 'No contracts. All plans are month-to-month.' },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-sm space-y-2">
        {items.map((item, i) => (
          <div key={i} className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-medium text-zinc-800 hover:bg-zinc-50 transition"
            >
              {item.q}
              <ChevronDown
                size={16}
                className={`shrink-0 text-zinc-400 transition-transform ${open === i ? 'rotate-180' : ''}`}
              />
            </button>
            {open === i && (
              <div className="border-t border-zinc-100 px-4 py-3.5 text-sm text-zinc-500 leading-relaxed">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function ToastPreview() {
  const [toasts, setToasts] = useState([
    { id: 1, type: 'success', title: 'Saved!', msg: 'Your changes have been saved.' },
    { id: 2, type: 'error', title: 'Error', msg: 'Something went wrong. Try again.' },
  ]);
  return (
    <PreviewWrap bg="bg-zinc-100">
      <div className="w-full max-w-xs space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-start gap-3 rounded-xl border p-4 shadow-lg bg-white ${
              t.type === 'success' ? 'border-emerald-200' : 'border-red-200'
            }`}
          >
            <span className="mt-0.5 text-lg">{t.type === 'success' ? '✅' : '❌'}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-zinc-800">{t.title}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{t.msg}</p>
            </div>
            <button
              onClick={() => setToasts((p) => p.filter((x) => x.id !== t.id))}
              className="text-zinc-300 hover:text-zinc-500 transition shrink-0"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            setToasts((p) => [
              ...p,
              { id: Date.now(), type: 'success', title: 'New Toast', msg: 'This is a new notification!' },
            ])
          }
          className="w-full rounded-lg bg-zinc-800 py-2 text-xs font-semibold text-white hover:bg-zinc-900 transition"
        >
          Add Toast
        </button>
      </div>
    </PreviewWrap>
  );
}

function StepperPreview() {
  const [step, setStep] = useState(1);
  const steps = ['Account', 'Personal', 'Payment', 'Review'];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  onClick={() => setStep(i)}
                  className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 text-sm font-bold transition ${
                    i < step
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : i === step
                      ? 'border-blue-600 bg-white text-blue-600'
                      : 'border-zinc-300 bg-white text-zinc-400'
                  }`}
                >
                  {i < step ? <Check size={14} strokeWidth={3} /> : i + 1}
                </div>
                <span
                  className={`mt-1.5 text-xs font-medium ${
                    i === step ? 'text-blue-600' : i < step ? 'text-zinc-500' : 'text-zinc-400'
                  }`}
                >
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`mx-2 h-0.5 flex-1 transition-colors ${i < step ? 'bg-blue-600' : 'bg-zinc-200'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between">
          <button
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50 disabled:opacity-40 transition"
          >
            Back
          </button>
          <button
            disabled={step === steps.length - 1}
            onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-40 transition"
          >
            Next
          </button>
        </div>
      </div>
    </PreviewWrap>
  );
}

function SearchPreview() {
  const [val, setVal] = useState('');
  return (
    <PreviewWrap>
      <div className="w-full max-w-xs space-y-3">
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="w-full rounded-xl border border-zinc-300 bg-white py-2.5 pl-10 pr-10 text-sm text-zinc-800 placeholder-zinc-400 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            placeholder="Search anything..."
          />
          {val && (
            <button
              onClick={() => setVal('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
            >
              <X size={15} />
            </button>
          )}
        </div>
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            className="w-full rounded-full border border-zinc-300 bg-zinc-50 py-2.5 pl-10 pr-16 text-sm text-zinc-800 placeholder-zinc-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            placeholder="Quick search..."
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-zinc-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-zinc-400 shadow-sm">
            ⌘K
          </kbd>
        </div>
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Static (hook-free) Preview Components
───────────────────────────────────────────── */

function ButtonsPreview() {
  return (
    <PreviewWrap>
      <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">Primary</button>
      <button className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-900">Secondary</button>
      <button className="rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50">Outline</button>
      <button className="rounded-lg px-4 py-2 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-100">Ghost</button>
      <button className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600">Danger</button>
      <button className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600">Success</button>
    </PreviewWrap>
  );
}

function ButtonSizesPreview() {
  const sizes = [
    { s: 'XS', cls: 'px-2.5 py-1 text-xs' },
    { s: 'SM', cls: 'px-3 py-1.5 text-sm' },
    { s: 'MD', cls: 'px-4 py-2 text-sm' },
    { s: 'LG', cls: 'px-5 py-2.5 text-base' },
    { s: 'XL', cls: 'px-6 py-3 text-lg' },
  ];
  return (
    <PreviewWrap>
      {sizes.map(({ s, cls }) => (
        <button key={s} className={`rounded-lg bg-blue-600 font-semibold text-white transition hover:bg-blue-700 ${cls}`}>{s}</button>
      ))}
    </PreviewWrap>
  );
}

function AlertsPreview() {
  const alerts = [
    { bg: 'bg-green-50 border-green-200 text-green-800', icon: <CheckCircle size={16} />, label: 'Success', msg: 'Action completed successfully.' },
    { bg: 'bg-yellow-50 border-yellow-200 text-yellow-800', icon: <AlertCircle size={16} />, label: 'Warning', msg: 'Review before proceeding.' },
    { bg: 'bg-red-50 border-red-200 text-red-800', icon: <XCircle size={16} />, label: 'Error', msg: 'Something went wrong.' },
    { bg: 'bg-blue-50 border-blue-200 text-blue-800', icon: <Info size={16} />, label: 'Info', msg: 'Here is some information.' },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-md space-y-2">
        {alerts.map((a) => (
          <div key={a.label} className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${a.bg}`}>
            <span className="mt-0.5 shrink-0">{a.icon}</span>
            <div><span className="font-semibold">{a.label}: </span>{a.msg}</div>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function BadgesPreview() {
  const badges = [
    { cls: 'bg-blue-100 text-blue-700', label: 'New' },
    { cls: 'bg-emerald-100 text-emerald-700', label: 'Active' },
    { cls: 'bg-yellow-100 text-yellow-700', label: 'Pending' },
    { cls: 'bg-red-100 text-red-700', label: 'Rejected' },
    { cls: 'bg-purple-100 text-purple-700', label: 'Beta' },
    { cls: 'bg-zinc-100 text-zinc-600', label: 'Default' },
  ];
  return (
    <PreviewWrap>
      {badges.map(({ cls, label }) => (
        <span key={label} className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls}`}>{label}</span>
      ))}
      <span className="inline-flex items-center rounded-full border border-blue-300 px-2.5 py-0.5 text-xs font-semibold text-blue-600">Outline</span>
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-0.5 text-xs font-semibold text-white">
        <span className="h-1.5 w-1.5 rounded-full bg-white" /> Live
      </span>
    </PreviewWrap>
  );
}

function AvatarsPreview() {
  const gradients = ['from-pink-400 to-rose-500', 'from-blue-400 to-indigo-500', 'from-amber-400 to-orange-500', 'from-teal-400 to-emerald-500'];
  return (
    <PreviewWrap>
      {[8, 10, 12, 14].map((s) => (
        <div key={s} className={`h-${s} w-${s} rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm`}>JD</div>
      ))}
      <div className="relative">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm">AB</div>
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
      </div>
      <div className="flex -space-x-2">
        {gradients.map((g, i) => (
          <div key={i} className={`h-9 w-9 rounded-full bg-gradient-to-br ${g} ring-2 ring-white flex items-center justify-center text-white text-xs font-bold`}>{String.fromCharCode(65 + i)}</div>
        ))}
        <div className="h-9 w-9 rounded-full bg-zinc-200 ring-2 ring-white flex items-center justify-center text-zinc-600 text-xs font-bold">+4</div>
      </div>
    </PreviewWrap>
  );
}

function CardPreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-64 rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl">🚀</div>
        <div className="p-4">
          <h3 className="font-semibold text-zinc-800 text-sm">Getting Started</h3>
          <p className="mt-1 text-xs text-zinc-500 leading-relaxed">Build beautiful interfaces with our component library.</p>
          <button className="mt-3 w-full rounded-lg bg-blue-600 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition">Learn More</button>
        </div>
      </div>
    </PreviewWrap>
  );
}

function StatCardPreview() {
  const stats = [
    { label: 'Total Revenue', value: '$48,295', change: '+12.5%', up: true },
    { label: 'Active Users', value: '3,842', change: '-2.1%', up: false },
    { label: 'Orders', value: '1,293', change: '+8.3%', up: true },
    { label: 'Conversion', value: '3.24%', change: '+0.4%', up: true },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
            <p className="text-xs text-zinc-500 font-medium">{s.label}</p>
            <p className="mt-1 text-xl font-bold text-zinc-800">{s.value}</p>
            <span className={`mt-1 inline-flex items-center text-xs font-semibold ${s.up ? 'text-emerald-600' : 'text-red-500'}`}>
              {s.up ? '↑' : '↓'} {s.change}
            </span>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function BreadcrumbPreview() {
  return (
    <PreviewWrap>
      <nav className="flex items-center gap-1.5 text-sm">
        {['Dashboard', 'Settings', 'Profile'].map((item, i, arr) => (
          <span key={item} className="flex items-center gap-1.5">
            {i < arr.length - 1 ? (
              <>
                <a href="#" className="text-blue-600 hover:underline font-medium">{item}</a>
                <ChevronRight size={14} className="text-zinc-400" />
              </>
            ) : (
              <span className="text-zinc-500 font-medium">{item}</span>
            )}
          </span>
        ))}
      </nav>
    </PreviewWrap>
  );
}

function PaginationPreview() {
  return (
    <PreviewWrap>
      <nav className="flex items-center gap-1">
        {['←', '1', '2', '3', '...', '8', '→'].map((p, i) => (
          <button
            key={i}
            className={`h-9 min-w-[2.25rem] px-3 rounded-lg text-sm font-medium transition ${
              p === '3' ? 'bg-blue-600 text-white shadow-sm' : 'text-zinc-600 hover:bg-zinc-100'
            }`}
          >
            {p}
          </button>
        ))}
      </nav>
    </PreviewWrap>
  );
}

function ProgressPreview() {
  const bars = [
    { label: 'Uploading...', pct: 72, color: 'bg-blue-500' },
    { label: 'Success', pct: 100, color: 'bg-emerald-500' },
    { label: 'Warning', pct: 48, color: 'bg-yellow-400' },
    { label: 'Error', pct: 30, color: 'bg-red-500' },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-sm space-y-4">
        {bars.map((p) => (
          <div key={p.label}>
            <div className="flex justify-between text-xs font-medium text-zinc-600 mb-1">
              <span>{p.label}</span><span>{p.pct}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-zinc-200">
              <div className={`h-2 rounded-full transition-all ${p.color}`} style={{ width: `${p.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function SpinnerPreview() {
  return (
    <PreviewWrap>
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-blue-600" />
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-emerald-500" />
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-rose-500" />
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </PreviewWrap>
  );
}

function SkeletonPreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs rounded-2xl border border-zinc-200 bg-white p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-zinc-200 animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-24 rounded-full bg-zinc-200 animate-pulse" />
            <div className="h-2.5 w-16 rounded-full bg-zinc-200 animate-pulse" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-2.5 w-full rounded-full bg-zinc-200 animate-pulse" />
          <div className="h-2.5 w-5/6 rounded-full bg-zinc-200 animate-pulse" />
          <div className="h-2.5 w-4/6 rounded-full bg-zinc-200 animate-pulse" />
        </div>
        <div className="h-24 rounded-xl bg-zinc-200 animate-pulse" />
      </div>
    </PreviewWrap>
  );
}

function InputPreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs space-y-3">
        <input className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-800 placeholder-zinc-400 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" placeholder="Default input" />
        <div className="relative">
          <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input className="w-full rounded-xl border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-800 placeholder-zinc-400 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" placeholder="Email address" />
        </div>
        <div>
          <input className="w-full rounded-xl border border-red-400 bg-white px-4 py-2.5 text-sm text-zinc-800 placeholder-zinc-400 shadow-sm outline-none" placeholder="Error state" />
          <p className="mt-1 text-xs text-red-500">This field is required.</p>
        </div>
      </div>
    </PreviewWrap>
  );
}

function SelectPreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs">
        <div className="relative">
          <select className="w-full appearance-none rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-700 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition pr-10">
            <option value="">Select a country</option>
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Canada</option>
            <option>Australia</option>
          </select>
          <ChevronDown size={15} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
        </div>
      </div>
    </PreviewWrap>
  );
}

function TablePreview() {
  const rows = [
    { name: 'Alice Martin', role: 'Designer', status: 'Active' },
    { name: 'Bob Chen', role: 'Engineer', status: 'Away' },
    { name: 'Carol Davis', role: 'Manager', status: 'Inactive' },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              {['Name', 'Role', 'Status', 'Action'].map((h) => (
                <th key={h} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {rows.map((r) => (
              <tr key={r.name} className="hover:bg-zinc-50 transition">
                <td className="px-4 py-3 font-medium text-zinc-800">{r.name}</td>
                <td className="px-4 py-3 text-zinc-500">{r.role}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                    r.status === 'Active' ? 'bg-green-100 text-green-700' : r.status === 'Away' ? 'bg-yellow-100 text-yellow-700' : 'bg-zinc-100 text-zinc-500'
                  }`}>{r.status}</span>
                </td>
                <td className="px-4 py-3"><button className="text-xs font-medium text-blue-600 hover:underline">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PreviewWrap>
  );
}

function TooltipPreview() {
  return (
    <PreviewWrap>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {[
          { dir: 'Top', pos: 'bottom-full left-1/2 -translate-x-1/2 mb-2' },
          { dir: 'Bottom', pos: 'top-full left-1/2 -translate-x-1/2 mt-2' },
          { dir: 'Left', pos: 'right-full top-1/2 -translate-y-1/2 mr-2' },
          { dir: 'Right', pos: 'left-full top-1/2 -translate-y-1/2 ml-2' },
        ].map((t) => (
          <div key={t.dir} className="group relative inline-block">
            <button className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50">
              {t.dir}
            </button>
            <div className={`pointer-events-none absolute z-10 whitespace-nowrap rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 ${t.pos}`}>
              Tooltip on {t.dir}
            </div>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function TimelinePreview() {
  const items = [
    { icon: '🚀', title: 'Project Launched', time: '2 hours ago', desc: 'Initial version deployed to production.', color: 'bg-blue-500' },
    { icon: '✅', title: 'PR Merged', time: '5 hours ago', desc: 'Feature branch merged into main.', color: 'bg-emerald-500' },
    { icon: '💬', title: 'Review Requested', time: '1 day ago', desc: 'Code review requested from team.', color: 'bg-purple-500' },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs">
        {items.map((item, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${item.color} text-base shadow`}>{item.icon}</div>
              {i < items.length - 1 && <div className="w-px flex-1 bg-zinc-200 my-1" />}
            </div>
            <div className="pb-6 pt-1">
              <p className="text-sm font-semibold text-zinc-800">{item.title}</p>
              <p className="text-xs text-zinc-400 mt-0.5">{item.time}</p>
              <p className="mt-1 text-xs text-zinc-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function NotificationBellPreview() {
  return (
    <PreviewWrap>
      <div className="flex gap-6 items-center">
        <div className="relative">
          <button className="rounded-xl border border-zinc-200 bg-white p-2.5 shadow-sm hover:bg-zinc-50 transition"><Bell size={18} className="text-zinc-600" /></button>
          <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-red-500 ring-2 ring-white" />
        </div>
        <div className="relative">
          <button className="rounded-xl border border-zinc-200 bg-white p-2.5 shadow-sm hover:bg-zinc-50 transition"><Bell size={18} className="text-zinc-600" /></button>
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">9</span>
        </div>
        <div className="relative">
          <button className="rounded-xl border border-zinc-200 bg-white p-2.5 shadow-sm hover:bg-zinc-50 transition"><Bell size={18} className="text-zinc-600" /></button>
          <span className="absolute -right-2 -top-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white ring-2 ring-white">99+</span>
        </div>
      </div>
    </PreviewWrap>
  );
}

function ListGroupPreview() {
  const items = [
    { icon: <User size={16} />, label: 'Profile', sub: 'Manage your account', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: <Bell size={16} />, label: 'Notifications', sub: 'Push and email settings', color: 'text-purple-500', bg: 'bg-purple-50' },
    { icon: <Lock size={16} />, label: 'Security', sub: 'Password and 2FA', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { icon: <Settings size={16} />, label: 'Preferences', sub: 'Theme, language, timezone', color: 'text-amber-500', bg: 'bg-amber-50' },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs divide-y divide-zinc-100 rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        {items.map((item) => (
          <button key={item.label} className="flex w-full items-center gap-3 px-4 py-3.5 hover:bg-zinc-50 transition text-left">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color}`}>{item.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-800">{item.label}</p>
              <p className="text-xs text-zinc-400 truncate">{item.sub}</p>
            </div>
            <ChevronRight size={15} className="shrink-0 text-zinc-300" />
          </button>
        ))}
      </div>
    </PreviewWrap>
  );
}

function InputGroupPreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs space-y-3">
        <div className="flex overflow-hidden rounded-xl border border-zinc-300 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition">
          <span className="flex items-center bg-zinc-100 px-3 text-sm text-zinc-500 border-r border-zinc-300 font-medium">https://</span>
          <input className="flex-1 bg-white px-3 py-2.5 text-sm text-zinc-800 outline-none placeholder-zinc-400" placeholder="example.com" />
        </div>
        <div className="flex overflow-hidden rounded-xl border border-zinc-300 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition">
          <span className="flex items-center bg-zinc-100 px-3 text-sm text-zinc-500 border-r border-zinc-300 font-medium">$</span>
          <input type="number" className="flex-1 bg-white px-3 py-2.5 text-sm text-zinc-800 outline-none" placeholder="0.00" />
          <span className="flex items-center bg-zinc-100 px-3 text-sm text-zinc-500 border-l border-zinc-300">USD</span>
        </div>
      </div>
    </PreviewWrap>
  );
}

function ProfileCardPreview() {
  return (
    <PreviewWrap bg="bg-zinc-100">
      <div className="w-56 rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="h-20 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500" />
        <div className="px-4 pb-4">
          <div className="relative -mt-8 mb-3">
            <div className="h-14 w-14 rounded-full border-2 border-white bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xl font-bold text-white shadow-md">JD</div>
          </div>
          <h3 className="text-sm font-bold text-zinc-800">Jane Doe</h3>
          <p className="text-xs text-zinc-500">Senior Product Designer</p>
          <div className="mt-3 flex gap-4 text-center">
            {[['142', 'Posts'], ['8.2K', 'Followers'], ['234', 'Following']].map(([n, l]) => (
              <div key={l}><p className="text-sm font-bold text-zinc-800">{n}</p><p className="text-[10px] text-zinc-400">{l}</p></div>
            ))}
          </div>
          <button className="mt-3 w-full rounded-lg bg-blue-600 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition">Follow</button>
        </div>
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Additional Stateful Preview Components
───────────────────────────────────────────── */

function CarouselPreview() {
  const [idx, setIdx] = useState(0);
  const slides = [
    { bg: 'from-blue-500 to-indigo-600', emoji: '🚀', title: 'Launch Faster' },
    { bg: 'from-emerald-500 to-teal-600', emoji: '⚡', title: 'Build Smarter' },
    { bg: 'from-rose-500 to-pink-600', emoji: '🎨', title: 'Design Better' },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="relative w-full max-w-xs overflow-hidden rounded-2xl">
        <div className={`flex h-36 items-center justify-center bg-gradient-to-br ${slides[idx].bg} text-white transition-all`}>
          <div className="text-center">
            <div className="text-4xl">{slides[idx].emoji}</div>
            <p className="mt-2 font-bold text-lg">{slides[idx].title}</p>
          </div>
        </div>
        <button onClick={() => setIdx((i) => (i - 1 + slides.length) % slides.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow text-zinc-700 hover:bg-white transition text-sm">‹</button>
        <button onClick={() => setIdx((i) => (i + 1) % slides.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow text-zinc-700 hover:bg-white transition text-sm">›</button>
        <div className="flex justify-center gap-1.5 py-3 bg-white">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={`h-2 rounded-full transition-all ${i === idx ? 'w-6 bg-blue-600' : 'w-2 bg-zinc-300'}`} />
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function RangeSliderPreview() {
  const [val1, setVal1] = useState(60);
  const [val2, setVal2] = useState(35);
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs space-y-5">
        {[{ label: 'Volume', val: val1, set: setVal1, color: 'accent-blue-600' },
          { label: 'Brightness', val: val2, set: setVal2, color: 'accent-emerald-500' }].map(({ label, val, set, color }) => (
          <div key={label}>
            <div className="flex justify-between text-xs font-medium text-zinc-600 mb-2">
              <span>{label}</span><span className="font-bold text-zinc-800">{val}%</span>
            </div>
            <div className="relative h-2 rounded-full bg-zinc-200">
              <div className="absolute inset-y-0 left-0 rounded-full bg-blue-600 transition-all" style={{ width: `${val}%`, background: color.includes('emerald') ? '#10b981' : '#2563eb' }} />
              <input type="range" min={0} max={100} value={val}
                onChange={e => set(Number(e.target.value))}
                className={`absolute inset-0 h-full w-full cursor-pointer opacity-0`} />
            </div>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function StarRatingPreview() {
  const [rating, setRating] = useState(3);
  const [hover, setHover] = useState(0);
  return (
    <PreviewWrap>
      <div className="space-y-4 text-center">
        <div className="flex gap-1 justify-center">
          {[1,2,3,4,5].map(i => (
            <button key={i}
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(0)}
              onClick={() => setRating(i)}
              className={`text-3xl transition-transform hover:scale-110 ${i <= (hover || rating) ? 'text-amber-400' : 'text-zinc-200'}`}>★</button>
          ))}
        </div>
        <p className="text-sm text-zinc-500">{['','Terrible','Poor','Average','Good','Excellent'][hover || rating]} ({rating}/5)</p>
        <div className="flex gap-2 justify-center">
          {[{ stars: 5, pct: 68 }, { stars: 4, pct: 20 }, { stars: 3, pct: 8 }, { stars: 2, pct: 3 }, { stars: 1, pct: 1 }].map(r => (
            <div key={r.stars} className="flex items-center gap-1.5 text-xs text-zinc-500">
              <span>{r.stars}★</span>
              <div className="h-1.5 w-16 rounded-full bg-zinc-200"><div className="h-1.5 rounded-full bg-amber-400" style={{ width:`${r.pct}%` }}/></div>
              <span>{r.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function TagInputPreview() {
  const [tags, setTags] = useState(['React', 'TypeScript']);
  const [input, setInput] = useState('');
  const add = () => { const t = input.trim(); if (t && !tags.includes(t)) setTags(p => [...p, t]); setInput(''); };
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs">
        <div className="flex flex-wrap gap-2 rounded-xl border border-zinc-300 bg-white p-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition min-h-[3rem]">
          {tags.map(tag => (
            <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
              {tag}
              <button onClick={() => setTags(p => p.filter(t => t !== tag))} className="text-blue-400 hover:text-blue-700">×</button>
            </span>
          ))}
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(); }}}
            className="flex-1 min-w-[80px] text-sm outline-none text-zinc-700 placeholder-zinc-400"
            placeholder="Add tag…" />
        </div>
        <p className="mt-1.5 text-[10px] text-zinc-400">Press Enter or comma to add a tag</p>
      </div>
    </PreviewWrap>
  );
}

function ChatPreview() {
  const messages = [
    { me: false, text: "Hey! How's the project going?", time: '10:21 AM' },
    { me: true, text: 'Going great! Just pushed the latest build 🚀', time: '10:22 AM' },
    { me: false, text: 'Awesome! Let me review the PR.', time: '10:23 AM' },
    { me: true, text: 'Sure, link is in Slack 👍', time: '10:24 AM' },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 border-b border-zinc-100 px-4 py-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">AJ</div>
          <div><p className="text-sm font-semibold text-zinc-800">Alex Johnson</p><p className="text-[10px] text-emerald-500 font-medium">● Online</p></div>
        </div>
        <div className="space-y-3 p-4 max-h-48 overflow-y-auto">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.me ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-xs ${m.me ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-zinc-100 text-zinc-800 rounded-bl-sm'}`}>
                <p>{m.text}</p>
                <p className={`mt-1 text-[10px] ${m.me ? 'text-blue-200' : 'text-zinc-400'} text-right`}>{m.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 border-t border-zinc-100 px-3 py-2.5">
          <input className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs text-zinc-700 outline-none focus:border-blue-400 transition" placeholder="Type a message…"/>
          <button className="rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition">Send</button>
        </div>
      </div>
    </PreviewWrap>
  );
}

function KanbanPreview() {
  const columns = [
    { title: 'To Do', color: 'bg-zinc-100 text-zinc-600', cards: ['Design mockups', 'Write tests'] },
    { title: 'In Progress', color: 'bg-blue-100 text-blue-700', cards: ['Build API', 'Auth flow'] },
    { title: 'Done', color: 'bg-emerald-100 text-emerald-700', cards: ['Setup repo', 'CI/CD'] },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="flex gap-3 w-full overflow-x-auto pb-1">
        {columns.map(col => (
          <div key={col.title} className="flex-1 min-w-[130px] rounded-xl border border-zinc-200 bg-white p-3">
            <div className="flex items-center justify-between mb-3">
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${col.color}`}>{col.title}</span>
              <span className="text-[10px] text-zinc-400">{col.cards.length}</span>
            </div>
            <div className="space-y-2">
              {col.cards.map(card => (
                <div key={card} className="rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2 text-xs text-zinc-700 font-medium shadow-sm cursor-grab hover:shadow transition">{card}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function PopoverPreview() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <PreviewWrap>
      <div className="flex gap-4 items-center">
        {[{ id:'info', label:'Info', content:'A tooltip with rich content, links, and actions.', icon:'ℹ️' },
          { id:'user', label:'Profile', content:'John Doe · Senior Engineer · San Francisco', icon:'👤' }].map(p => (
          <div key={p.id} className="relative">
            <button onClick={() => setOpen(open === p.id ? null : p.id)}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 transition">
              {p.label}
            </button>
            {open === p.id && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 w-56 rounded-xl border border-zinc-200 bg-white p-3 shadow-xl">
                <div className="flex items-start gap-2">
                  <span className="text-lg">{p.icon}</span>
                  <p className="text-xs text-zinc-600 leading-relaxed">{p.content}</p>
                </div>
                <div className="mt-2 flex gap-2">
                  <button className="rounded-lg bg-blue-600 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-blue-700 transition">Action</button>
                  <button onClick={() => setOpen(null)} className="rounded-lg border border-zinc-200 px-2.5 py-1 text-[11px] font-medium text-zinc-600 hover:bg-zinc-50 transition">Close</button>
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 h-0 w-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-zinc-200" />
              </div>
            )}
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function NotificationPanelPreview() {
  const [open, setOpen] = useState(false);
  const notifs = [
    { avatar: '🚀', title: 'New deployment', msg: 'v2.4.1 deployed to production', time: '2m ago', unread: true },
    { avatar: '💬', title: 'New comment', msg: 'Alex left a comment on PR #42', time: '15m ago', unread: true },
    { avatar: '✅', title: 'Task completed', msg: 'Auth flow marked as done', time: '1h ago', unread: false },
  ];
  return (
    <PreviewWrap>
      <div className="relative">
        <button onClick={() => setOpen(o => !o)}
          className="relative rounded-xl border border-zinc-200 bg-white p-2.5 shadow-sm hover:bg-zinc-50 transition">
          <Bell size={18} className="text-zinc-600" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-white">2</span>
        </button>
        {open && (
          <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-zinc-200 bg-white shadow-xl z-20 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100">
              <p className="text-sm font-semibold text-zinc-800">Notifications</p>
              <button className="text-[11px] font-medium text-blue-600 hover:underline">Mark all read</button>
            </div>
            <div className="divide-y divide-zinc-50">
              {notifs.map((n, i) => (
                <div key={i} className={`flex items-start gap-3 px-4 py-3 hover:bg-zinc-50 transition ${n.unread ? 'bg-blue-50/30' : ''}`}>
                  <span className="text-xl mt-0.5">{n.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-zinc-800">{n.title}</p>
                    <p className="text-[11px] text-zinc-500 truncate">{n.msg}</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">{n.time}</p>
                  </div>
                  {n.unread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />}
                </div>
              ))}
            </div>
            <div className="border-t border-zinc-100 px-4 py-2.5 text-center">
              <button className="text-xs font-medium text-blue-600 hover:underline">View all notifications</button>
            </div>
          </div>
        )}
      </div>
    </PreviewWrap>
  );
}

/* ── Additional Static Preview Components ── */

function ButtonGroupPreview() {
  return (
    <PreviewWrap>
      <div className="space-y-3">
        <div className="inline-flex rounded-xl overflow-hidden border border-zinc-200 shadow-sm">
          {['Left', 'Center', 'Right'].map((b, i) => (
            <button key={b} className={`px-4 py-2 text-sm font-medium transition ${i === 1 ? 'bg-blue-600 text-white' : 'bg-white text-zinc-700 hover:bg-zinc-50'} ${i > 0 ? 'border-l border-zinc-200' : ''}`}>{b}</button>
          ))}
        </div>
        <div className="inline-flex rounded-xl overflow-hidden border border-zinc-200 shadow-sm">
          {['Day', 'Week', 'Month', 'Year'].map((b, i) => (
            <button key={b} className={`px-3 py-1.5 text-xs font-semibold transition ${i === 2 ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-600 hover:bg-zinc-50'} ${i > 0 ? 'border-l border-zinc-200' : ''}`}>{b}</button>
          ))}
        </div>
        <div className="flex gap-px rounded-xl overflow-hidden">
          {['Copy', 'Cut', 'Paste'].map((b, i) => (
            <button key={b} className={`flex-1 px-3 py-2 text-xs font-medium bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition ${i===0?'rounded-l-xl':''} ${i===2?'rounded-r-xl':''}`}>{b}</button>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function RibbonPreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="flex gap-4 flex-wrap justify-center">
        {[
          { ribbon: 'Popular', rc: 'bg-blue-600', lc: 'from-blue-500 to-indigo-600', emoji: '⭐' },
          { ribbon: 'Sale', rc: 'bg-red-500', lc: 'from-rose-500 to-pink-600', emoji: '🎉' },
          { ribbon: 'New', rc: 'bg-emerald-500', lc: 'from-emerald-500 to-teal-600', emoji: '✨' },
        ].map(c => (
          <div key={c.ribbon} className="relative w-36 rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
            <div className="absolute top-3 -right-7 w-32 rotate-45 text-center py-1 text-[10px] font-bold text-white shadow" style={{ background: c.rc.replace('bg-','').includes('-') ? undefined : undefined }} >
              <span className={`absolute inset-0 ${c.rc} rotate-0`} />
              <span className="relative">{c.ribbon}</span>
            </div>
            <div className={`h-20 bg-gradient-to-br ${c.lc} flex items-center justify-center text-3xl`}>{c.emoji}</div>
            <div className="p-3">
              <p className="text-xs font-semibold text-zinc-800">Premium Card</p>
              <p className="text-[10px] text-zinc-400 mt-0.5">Special offer</p>
            </div>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function FileUploadPreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs space-y-3">
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-300 bg-white p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition cursor-pointer">
          <div className="text-2xl">📂</div>
          <p className="text-sm font-medium text-zinc-700">Drop files here</p>
          <p className="text-xs text-zinc-400">or <span className="text-blue-600 font-medium">browse files</span></p>
          <p className="text-[10px] text-zinc-400">PNG, JPG, PDF up to 10MB</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-3 flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 text-sm">📄</div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-zinc-800 truncate">design-specs.pdf</p>
            <div className="mt-1 h-1.5 w-full rounded-full bg-zinc-100"><div className="h-1.5 w-3/4 rounded-full bg-blue-500 transition-all"/></div>
            <p className="mt-0.5 text-[10px] text-zinc-400">75% · 2.4 MB</p>
          </div>
          <button className="text-zinc-300 hover:text-zinc-500 text-sm">×</button>
        </div>
      </div>
    </PreviewWrap>
  );
}

function TextareaPreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs space-y-3">
        <textarea rows={3} className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-800 placeholder-zinc-400 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none" placeholder="Write your message here…" />
        <div className="relative">
          <textarea rows={3} className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 pb-8 text-sm text-zinc-800 placeholder-zinc-400 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none" placeholder="With character counter…" maxLength={200}/>
          <span className="absolute bottom-2.5 right-3 text-[10px] text-zinc-400">0 / 200</span>
        </div>
      </div>
    </PreviewWrap>
  );
}

function PricingCardPreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="flex gap-3 flex-wrap justify-center">
        {[
          { name:'Starter', price:'$0', desc:'For individuals', features:['5 projects','2GB storage','Email support'], btn:'Get Started', variant:'outline' },
          { name:'Pro', price:'$29', desc:'For teams', features:['Unlimited projects','50GB storage','Priority support','Analytics'], btn:'Start Free Trial', variant:'solid' },
        ].map(p => (
          <div key={p.name} className={`w-44 rounded-2xl p-5 ${p.variant==='solid'?'bg-blue-600 text-white border-blue-600':'bg-white border-zinc-200'} border shadow-sm`}>
            <p className={`text-xs font-bold uppercase tracking-widest ${p.variant==='solid'?'text-blue-200':'text-blue-600'}`}>{p.name}</p>
            <p className={`mt-1 text-3xl font-bold ${p.variant==='solid'?'text-white':'text-zinc-800'}`}>{p.price}<span className="text-sm font-normal opacity-70">/mo</span></p>
            <p className={`mt-0.5 text-[10px] ${p.variant==='solid'?'text-blue-200':'text-zinc-400'}`}>{p.desc}</p>
            <ul className="mt-4 space-y-1.5">
              {p.features.map(f => (
                <li key={f} className={`flex items-center gap-1.5 text-[11px] ${p.variant==='solid'?'text-white':'text-zinc-600'}`}>
                  <span className={`text-xs ${p.variant==='solid'?'text-blue-200':'text-emerald-500'}`}>✓</span>{f}
                </li>
              ))}
            </ul>
            <button className={`mt-4 w-full rounded-lg py-2 text-xs font-semibold transition ${p.variant==='solid'?'bg-white text-blue-600 hover:bg-blue-50':'bg-blue-600 text-white hover:bg-blue-700'}`}>{p.btn}</button>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function NavbarPreview() {
  return (
    <PreviewWrap bg="bg-zinc-100">
      <div className="w-full rounded-xl overflow-hidden border border-zinc-200 shadow-sm">
        <nav className="flex items-center justify-between bg-white px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">A</div>
            <span className="font-bold text-zinc-800 text-sm">AppName</span>
          </div>
          <div className="hidden sm:flex items-center gap-5 text-sm">
            {['Dashboard','Analytics','Reports'].map((item, i) => (
              <a key={item} href="#" className={`font-medium transition ${i===0?'text-blue-600':'text-zinc-500 hover:text-zinc-800'}`}>{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-xl border border-zinc-200 p-1.5 text-zinc-500 hover:bg-zinc-50 transition"><Bell size={16}/></button>
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-[10px] font-bold">JD</div>
          </div>
        </nav>
      </div>
    </PreviewWrap>
  );
}

function SidebarPreview() {
  const items = [
    { icon: '📊', label: 'Dashboard', active: true },
    { icon: '👥', label: 'Users', active: false },
    { icon: '📁', label: 'Projects', active: false },
    { icon: '💬', label: 'Messages', badge: '5', active: false },
    { icon: '⚙️', label: 'Settings', active: false },
  ];
  return (
    <PreviewWrap bg="bg-zinc-100">
      <div className="flex h-64 w-full max-w-xs overflow-hidden rounded-2xl border border-zinc-200 shadow-sm">
        <div className="w-48 bg-zinc-900 flex flex-col">
          <div className="flex items-center gap-2 px-4 py-4 border-b border-zinc-800">
            <div className="h-6 w-6 rounded-md bg-blue-500 flex items-center justify-center text-white text-xs font-bold">A</div>
            <span className="text-xs font-bold text-white">Admin Panel</span>
          </div>
          <nav className="flex-1 py-3 space-y-0.5 px-2">
            {items.map(item => (
              <a key={item.label} href="#"
                className={`flex items-center justify-between gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition ${item.active ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'}`}>
                <span className="flex items-center gap-2"><span>{item.icon}</span>{item.label}</span>
                {item.badge && <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[9px] font-bold text-white">{item.badge}</span>}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex-1 bg-zinc-50 p-4">
          <p className="text-xs font-bold text-zinc-800">Dashboard</p>
          <p className="text-[11px] text-zinc-400 mt-1">Welcome back!</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {['Users','Revenue','Orders','Tasks'].map(s => (
              <div key={s} className="rounded-lg border border-zinc-200 bg-white p-2 text-center">
                <p className="text-xs font-bold text-zinc-800">—</p>
                <p className="text-[9px] text-zinc-400">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewWrap>
  );
}

function DividerPreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs space-y-4">
        <div className="h-px bg-zinc-200 w-full"/>
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-zinc-200"/>
          <span className="text-xs font-medium text-zinc-400">OR</span>
          <div className="h-px flex-1 bg-zinc-200"/>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-zinc-200"/>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-0.5 text-[11px] font-medium text-zinc-500 shadow-sm">✦ Section Title</span>
          <div className="h-px flex-1 bg-zinc-200"/>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-zinc-300"/>
          <span className="text-xs font-semibold text-zinc-500">CONTINUE WITH</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-zinc-300"/>
        </div>
        <div className="border-l-4 border-blue-500 pl-3">
          <p className="text-xs font-semibold text-zinc-800">Vertical Divider</p>
          <p className="text-[11px] text-zinc-400">Used for callouts and quotes</p>
        </div>
      </div>
    </PreviewWrap>
  );
}

function CodeSnippetPreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-sm overflow-hidden rounded-xl border border-zinc-700 shadow-lg">
        <div className="flex items-center justify-between bg-zinc-800 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500"/>
              <span className="h-3 w-3 rounded-full bg-yellow-400"/>
              <span className="h-3 w-3 rounded-full bg-emerald-500"/>
            </div>
            <span className="ml-2 text-[11px] text-zinc-400 font-mono">index.tsx</span>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono">TypeScript</span>
        </div>
        <div className="bg-zinc-950 px-4 py-4 font-mono text-[11.5px] leading-6">
          <div><span className="text-purple-400">import</span><span className="text-zinc-300"> {'{ useState }'} </span><span className="text-purple-400">from</span><span className="text-emerald-400"> 'react'</span></div>
          <div className="mt-1"><span className="text-blue-400">function</span><span className="text-yellow-300"> Counter</span><span className="text-zinc-300">() {'{'}</span></div>
          <div className="pl-4"><span className="text-purple-400">const</span><span className="text-zinc-300"> [count, setCount] = </span><span className="text-yellow-300">useState</span><span className="text-zinc-300">(0)</span></div>
          <div className="pl-4 mt-1"><span className="text-purple-400">return</span><span className="text-zinc-300"> {'<'}</span><span className="text-red-400">button</span><span className="text-zinc-300">{' onClick={() => setCount(c+1)}>'}</span><span className="text-zinc-400">{'{'}</span><span className="text-zinc-300">count</span><span className="text-zinc-400">{'}'}</span><span className="text-zinc-300">{'</'}</span><span className="text-red-400">button</span><span className="text-zinc-300">{'>'}</span></div>
          <div><span className="text-zinc-300">{'}'}</span></div>
        </div>
      </div>
    </PreviewWrap>
  );
}

function ImageGalleryPreview() {
  const colors = [
    'from-blue-400 to-indigo-500', 'from-rose-400 to-pink-500',
    'from-amber-400 to-orange-500', 'from-emerald-400 to-teal-500',
    'from-purple-400 to-violet-500', 'from-cyan-400 to-blue-500',
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs">
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          {colors.map((g, i) => (
            <div key={i} className={`aspect-square rounded-lg bg-gradient-to-br ${g} flex items-center justify-center text-white/60 text-xl hover:scale-105 transition cursor-pointer shadow-sm`}>🖼</div>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-1">
          {colors.slice(0,5).map((g, i) => (
            <div key={i} className={`aspect-square rounded-md bg-gradient-to-br ${g} hover:scale-105 transition cursor-pointer`}/>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function VideoCardPreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="relative h-36 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center cursor-pointer group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50"/>
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 group-hover:bg-white/30 transition">
            <span className="text-white text-xl ml-0.5">▶</span>
          </div>
          <div className="absolute bottom-2 right-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-mono text-white">4:32</div>
        </div>
        <div className="p-3.5">
          <p className="text-sm font-semibold text-zinc-800 leading-snug">Getting Started with Tailwind CSS</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-[9px] font-bold">T</div>
            <span className="text-xs text-zinc-500">TailAdmin · 12K views</span>
          </div>
        </div>
      </div>
    </PreviewWrap>
  );
}

function EmptyStatePreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="flex flex-col items-center justify-center py-4 text-center max-w-xs">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 text-4xl mb-4">📭</div>
        <h3 className="text-sm font-bold text-zinc-800">No results found</h3>
        <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed max-w-[180px]">We couldn't find what you're looking for. Try adjusting your search or filters.</p>
        <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition">Clear Filters</button>
      </div>
    </PreviewWrap>
  );
}

function LinkStylesPreview() {
  return (
    <PreviewWrap>
      <div className="space-y-3 w-full max-w-xs">
        <div className="flex flex-wrap gap-3 items-center">
          <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition">Default link</a>
          <a href="#" className="text-sm text-zinc-600 hover:text-zinc-900 font-medium underline underline-offset-2 decoration-zinc-300 hover:decoration-zinc-600 transition">Underline style</a>
          <a href="#" className="text-sm font-medium text-zinc-700 hover:text-blue-600 transition border-b-2 border-transparent hover:border-blue-600">Border bottom</a>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href="#" className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition">Filled link →</a>
          <a href="#" className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition">↗ External</a>
          <a href="#" className="text-xs font-medium text-zinc-400 hover:text-zinc-700 transition">Muted link</a>
        </div>
        <div className="flex flex-wrap gap-2">
          {['#React', '#TypeScript', '#NextJS', '#TailwindCSS'].map(tag => (
            <a key={tag} href="#" className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline transition">{tag}</a>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function FaqPreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-sm space-y-3">
        <div className="text-center mb-2">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">FAQ</span>
          <h3 className="mt-1 text-sm font-bold text-zinc-800">Frequently Asked</h3>
        </div>
        {[
          { q: 'Is it free to use?', a: 'Yes! The core library is completely free and open-source.' },
          { q: 'Do I need a backend?', a: 'No backend required — all processing is client-side in the browser.' },
          { q: 'Can I customize themes?', a: 'Absolutely. Every color, size, and style is fully customizable via CSS variables.' },
        ].map((item, i) => (
          <div key={i} className="rounded-xl border border-zinc-200 bg-white p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-600 mt-0.5">Q</span>
              <div>
                <p className="text-xs font-semibold text-zinc-800">{item.q}</p>
                <p className="mt-1 text-[11px] text-zinc-500 leading-relaxed">{item.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Component Registry
───────────────────────────────────────────── */
const COMPONENTS: ComponentDef[] = [
  {
    id: 'buttons-primary', name: 'Buttons', category: 'Forms & Inputs',
    description: 'Primary, secondary, outline, ghost, and destructive button variants.',
    Preview: ButtonsPreview,
    tailwind: `<button class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Primary</button>
<button class="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-900">Secondary</button>
<button class="rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50">Outline</button>
<button class="rounded-lg px-4 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-100">Ghost</button>
<button class="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600">Danger</button>`,
    css: `.btn { display:inline-flex; align-items:center; padding:.5rem 1rem; font-size:.875rem; font-weight:600; border-radius:.5rem; border:none; cursor:pointer; transition:background .15s; }
.btn-primary  { background:#2563eb; color:#fff; } .btn-primary:hover  { background:#1d4ed8; }
.btn-outline  { background:transparent; color:#2563eb; border:1.5px solid #2563eb; } .btn-outline:hover { background:#eff6ff; }
.btn-ghost    { background:transparent; color:#52525b; } .btn-ghost:hover { background:#f4f4f5; }
.btn-danger   { background:#ef4444; color:#fff; } .btn-danger:hover { background:#dc2626; }`,
  },
  {
    id: 'button-sizes', name: 'Button Sizes', category: 'Forms & Inputs',
    description: 'XS through XL button sizes for every context.',
    Preview: ButtonSizesPreview,
    tailwind: `<button class="rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white">XS</button>
<button class="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white">SM</button>
<button class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">MD</button>
<button class="rounded-lg bg-blue-600 px-5 py-2.5 text-base font-semibold text-white">LG</button>
<button class="rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white">XL</button>`,
    css: `.btn-xs { padding:.25rem .625rem; font-size:.75rem; }
.btn-sm { padding:.375rem .75rem; font-size:.875rem; }
.btn-md { padding:.5rem 1rem; font-size:.875rem; }
.btn-lg { padding:.625rem 1.25rem; font-size:1rem; }
.btn-xl { padding:.75rem 1.5rem; font-size:1.125rem; }`,
  },
  {
    id: 'alerts', name: 'Alerts', category: 'Feedback',
    description: 'Success, warning, error, and info alert banners with icon.',
    Preview: AlertsPreview,
    tailwind: `<div class="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
  <svg .../> <div><span class="font-semibold">Success: </span>Action completed.</div>
</div>
<div class="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
  <svg .../> <div><span class="font-semibold">Error: </span>Something went wrong.</div>
</div>`,
    css: `.alert { display:flex; align-items:flex-start; gap:.75rem; padding:.75rem 1rem; border-radius:.75rem; border-width:1px; font-size:.875rem; }
.alert-success { background:#f0fdf4; border-color:#bbf7d0; color:#166534; }
.alert-warning { background:#fefce8; border-color:#fde68a; color:#854d0e; }
.alert-error   { background:#fef2f2; border-color:#fecaca; color:#991b1b; }
.alert-info    { background:#eff6ff; border-color:#bfdbfe; color:#1e40af; }`,
  },
  {
    id: 'badges', name: 'Badges & Tags', category: 'Feedback',
    description: 'Soft, outline, and live-dot badge variants in multiple colors.',
    Preview: BadgesPreview,
    tailwind: `<span class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">New</span>
<span class="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">Active</span>
<span class="inline-flex items-center rounded-full border border-blue-300 px-2.5 py-0.5 text-xs font-semibold text-blue-600">Outline</span>
<span class="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-0.5 text-xs font-semibold text-white">
  <span class="h-1.5 w-1.5 rounded-full bg-white"></span> Live
</span>`,
    css: `.badge { display:inline-flex; align-items:center; gap:.25rem; padding:.125rem .625rem; border-radius:9999px; font-size:.75rem; font-weight:600; }
.badge-blue   { background:#dbeafe; color:#1d4ed8; }
.badge-green  { background:#d1fae5; color:#065f46; }
.badge-yellow { background:#fef9c3; color:#854d0e; }
.badge-red    { background:#fee2e2; color:#991b1b; }
.badge-outline { background:transparent; border:1.5px solid currentColor; }`,
  },
  {
    id: 'avatars', name: 'Avatars', category: 'Display',
    description: 'Initials avatars in multiple sizes, status dot, and stacked group.',
    Preview: AvatarsPreview,
    tailwind: `<!-- Initials avatar -->
<div class="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">JD</div>
<!-- With online status -->
<div class="relative">
  <div class="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">AB</div>
  <span class="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white"></span>
</div>
<!-- Avatar group -->
<div class="flex -space-x-2">
  <img class="h-9 w-9 rounded-full ring-2 ring-white" src="..." />
  <div class="h-9 w-9 rounded-full bg-zinc-200 ring-2 ring-white flex items-center justify-center text-xs font-bold">+4</div>
</div>`,
    css: `.avatar { display:flex; align-items:center; justify-content:center; border-radius:9999px; font-weight:700; color:#fff; }
.avatar-sm { width:2rem; height:2rem; font-size:.75rem; }
.avatar-md { width:2.5rem; height:2.5rem; font-size:.875rem; }
.avatar-lg { width:3rem; height:3rem; font-size:1rem; }
.avatar-group .avatar { margin-left:-.5rem; box-shadow:0 0 0 2px #fff; }
.avatar-status { position:absolute; bottom:0; right:0; width:.75rem; height:.75rem; border-radius:9999px; background:#22c55e; box-shadow:0 0 0 2px #fff; }`,
  },
  {
    id: 'card', name: 'Cards', category: 'Display',
    description: 'Image card with cover, body text, and action button.',
    Preview: CardPreview,
    tailwind: `<div class="w-64 rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
  <div class="h-32 bg-gradient-to-br from-blue-500 to-indigo-600"></div>
  <div class="p-4">
    <h3 class="font-semibold text-zinc-800 text-sm">Card Title</h3>
    <p class="mt-1 text-xs text-zinc-500 leading-relaxed">Card description goes here.</p>
    <button class="mt-3 w-full rounded-lg bg-blue-600 py-1.5 text-xs font-semibold text-white hover:bg-blue-700">Action</button>
  </div>
</div>`,
    css: `.card { border-radius:1rem; border:1px solid #e4e4e7; background:#fff; box-shadow:0 1px 3px rgba(0,0,0,.06); overflow:hidden; }
.card-cover { width:100%; height:8rem; object-fit:cover; }
.card-body  { padding:1rem; }
.card-title { font-size:.875rem; font-weight:600; color:#27272a; }
.card-text  { margin-top:.25rem; font-size:.75rem; color:#71717a; line-height:1.5; }`,
  },
  {
    id: 'stat-card', name: 'Stat Card', category: 'Display',
    description: 'KPI metric cards with trend indicators — common in dashboards.',
    Preview: StatCardPreview,
    tailwind: `<div class="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
  <p class="text-xs font-medium text-zinc-500">Total Revenue</p>
  <p class="mt-1 text-2xl font-bold text-zinc-800">$48,295</p>
  <span class="mt-1 inline-flex items-center text-xs font-semibold text-emerald-600">↑ +12.5%</span>
</div>`,
    css: `.stat-card { padding:1rem; border-radius:.75rem; border:1px solid #e4e4e7; background:#fff; box-shadow:0 1px 3px rgba(0,0,0,.06); }
.stat-label { font-size:.75rem; font-weight:500; color:#71717a; }
.stat-value { font-size:1.5rem; font-weight:700; color:#18181b; margin-top:.25rem; }
.stat-up   { color:#059669; font-size:.75rem; font-weight:600; }
.stat-down { color:#dc2626; font-size:.75rem; font-weight:600; }`,
  },
  {
    id: 'breadcrumb', name: 'Breadcrumb', category: 'Navigation',
    description: 'Navigation breadcrumb trail with separator and current page.',
    Preview: BreadcrumbPreview,
    tailwind: `<nav class="flex items-center gap-1.5 text-sm">
  <a href="/" class="font-medium text-blue-600 hover:underline">Dashboard</a>
  <svg class="h-3.5 w-3.5 text-zinc-400" .../>
  <a href="/settings" class="font-medium text-blue-600 hover:underline">Settings</a>
  <svg class="h-3.5 w-3.5 text-zinc-400" .../>
  <span class="font-medium text-zinc-500">Profile</span>
</nav>`,
    css: `.breadcrumb { display:flex; align-items:center; gap:.375rem; font-size:.875rem; }
.breadcrumb a { font-weight:500; color:#2563eb; text-decoration:none; }
.breadcrumb a:hover { text-decoration:underline; }
.breadcrumb-sep { color:#a1a1aa; }
.breadcrumb-current { color:#71717a; font-weight:500; }`,
  },
  {
    id: 'tabs', name: 'Tabs', category: 'Navigation',
    description: 'Underline-style tab navigation with active state.',
    Preview: TabsPreview,
    tailwind: `<div class="flex border-b border-zinc-200">
  <button class="px-4 py-2 text-sm font-medium border-b-2 border-blue-600 text-blue-600 -mb-px">Overview</button>
  <button class="px-4 py-2 text-sm font-medium border-b-2 border-transparent text-zinc-500 hover:text-zinc-700">Analytics</button>
  <button class="px-4 py-2 text-sm font-medium border-b-2 border-transparent text-zinc-500 hover:text-zinc-700">Reports</button>
</div>`,
    css: `.tabs { display:flex; border-bottom:1px solid #e4e4e7; }
.tab { padding:.5rem 1rem; font-size:.875rem; font-weight:500; border-bottom:2px solid transparent; margin-bottom:-1px; cursor:pointer; color:#71717a; background:none; border-top:none; border-left:none; border-right:none; }
.tab.active { border-bottom-color:#2563eb; color:#2563eb; }
.tab:hover:not(.active) { color:#27272a; }`,
  },
  {
    id: 'pagination', name: 'Pagination', category: 'Navigation',
    description: 'Page navigation with prev/next, active page, and ellipsis.',
    Preview: PaginationPreview,
    tailwind: `<nav class="flex items-center gap-1">
  <button class="h-9 w-9 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-100">←</button>
  <button class="h-9 px-3 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-100">1</button>
  <button class="h-9 px-3 rounded-lg bg-blue-600 text-sm font-medium text-white shadow-sm">2</button>
  <button class="h-9 px-3 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-100">3</button>
  <span class="px-1 text-zinc-400">...</span>
  <button class="h-9 w-9 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-100">→</button>
</nav>`,
    css: `.pagination { display:flex; align-items:center; gap:.25rem; }
.page-btn { min-width:2.25rem; height:2.25rem; padding:0 .75rem; border-radius:.5rem; font-size:.875rem; font-weight:500; cursor:pointer; border:none; background:transparent; color:#52525b; transition:background .15s; }
.page-btn:hover { background:#f4f4f5; }
.page-btn.active { background:#2563eb; color:#fff; box-shadow:0 1px 2px rgba(0,0,0,.1); }`,
  },
  {
    id: 'progress', name: 'Progress Bars', category: 'Feedback',
    description: 'Linear progress bars in multiple color states.',
    Preview: ProgressPreview,
    tailwind: `<div>
  <div class="mb-1 flex justify-between text-xs font-medium text-zinc-600">
    <span>Uploading...</span><span>72%</span>
  </div>
  <div class="h-2 w-full rounded-full bg-zinc-200">
    <div class="h-2 w-[72%] rounded-full bg-blue-500 transition-all"></div>
  </div>
</div>`,
    css: `.progress-track { height:.5rem; border-radius:9999px; background:#e4e4e7; overflow:hidden; }
.progress-bar   { height:100%; border-radius:9999px; transition:width .4s ease; }
.progress-blue   { background:#3b82f6; }
.progress-green  { background:#10b981; }
.progress-yellow { background:#facc15; }
.progress-red    { background:#ef4444; }`,
  },
  {
    id: 'spinner', name: 'Spinners', category: 'Feedback',
    description: 'Border spinner and bouncing dots in multiple colors.',
    Preview: SpinnerPreview,
    tailwind: `<!-- Border spinner -->
<div class="h-8 w-8 animate-spin rounded-full border-4 border-zinc-200 border-t-blue-600"></div>
<!-- Dot bounce -->
<div class="flex gap-1.5">
  <div class="h-2.5 w-2.5 rounded-full bg-blue-500 animate-bounce" style="animation-delay:0s"></div>
  <div class="h-2.5 w-2.5 rounded-full bg-blue-500 animate-bounce" style="animation-delay:.15s"></div>
  <div class="h-2.5 w-2.5 rounded-full bg-blue-500 animate-bounce" style="animation-delay:.3s"></div>
</div>`,
    css: `@keyframes spin { to { transform:rotate(360deg); } }
.spinner { width:2rem; height:2rem; border-radius:9999px; border:3px solid #e4e4e7; border-top-color:#2563eb; animation:spin .7s linear infinite; }
@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-.5rem)} }
.dot-loader { display:flex; gap:.375rem; }
.dot-loader span { width:.625rem; height:.625rem; border-radius:9999px; background:#3b82f6; animation:bounce .6s ease-in-out infinite; }
.dot-loader span:nth-child(2) { animation-delay:.15s; }
.dot-loader span:nth-child(3) { animation-delay:.3s; }`,
  },
  {
    id: 'skeleton', name: 'Skeleton Loader', category: 'Feedback',
    description: 'Content placeholder shimmer animations for cards and lists.',
    Preview: SkeletonPreview,
    tailwind: `<div class="rounded-2xl border border-zinc-200 bg-white p-4 space-y-3">
  <div class="flex items-center gap-3">
    <div class="h-10 w-10 rounded-full bg-zinc-200 animate-pulse"></div>
    <div class="flex-1 space-y-2">
      <div class="h-3 w-24 rounded-full bg-zinc-200 animate-pulse"></div>
      <div class="h-2.5 w-16 rounded-full bg-zinc-200 animate-pulse"></div>
    </div>
  </div>
  <div class="h-24 rounded-xl bg-zinc-200 animate-pulse"></div>
</div>`,
    css: `@keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
.skeleton { background:linear-gradient(90deg,#f4f4f5 25%,#e4e4e7 50%,#f4f4f5 75%); background-size:200% 100%; animation:shimmer 1.4s ease-in-out infinite; border-radius:.375rem; }
.skeleton-circle { border-radius:9999px; }
.skeleton-text { height:.625rem; }`,
  },
  {
    id: 'input', name: 'Text Input', category: 'Forms & Inputs',
    description: 'Default, icon-prefixed, and error-state input fields.',
    Preview: InputPreview,
    tailwind: `<input class="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm placeholder-zinc-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" placeholder="Enter text..." />
<div class="relative">
  <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" .../>
  <input class="w-full rounded-xl border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="Email" />
</div>`,
    css: `.input { width:100%; padding:.625rem 1rem; border-radius:.75rem; border:1px solid #d4d4d8; background:#fff; font-size:.875rem; color:#27272a; outline:none; transition:border .15s,box-shadow .15s; }
.input::placeholder { color:#a1a1aa; }
.input:focus { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,.15); }
.input-error { border-color:#f87171; }
.input-error:focus { border-color:#ef4444; box-shadow:0 0 0 3px rgba(239,68,68,.15); }`,
  },
  {
    id: 'select', name: 'Select Dropdown', category: 'Forms & Inputs',
    description: 'Native select with custom chevron icon styling.',
    Preview: SelectPreview,
    tailwind: `<div class="relative">
  <select class="w-full appearance-none rounded-xl border border-zinc-300 bg-white px-4 py-2.5 pr-10 text-sm text-zinc-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition">
    <option value="">Select a country</option>
    <option>United States</option>
    <option>United Kingdom</option>
  </select>
  <svg class="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" .../>
</div>`,
    css: `.select-wrap { position:relative; }
.select { width:100%; padding:.625rem 2.5rem .625rem 1rem; border-radius:.75rem; border:1px solid #d4d4d8; background:#fff; font-size:.875rem; color:#3f3f46; appearance:none; outline:none; cursor:pointer; transition:border .15s,box-shadow .15s; }
.select:focus { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,.15); }
.select-icon { position:absolute; right:.875rem; top:50%; transform:translateY(-50%); pointer-events:none; color:#a1a1aa; }`,
  },
  {
    id: 'toggle', name: 'Toggle Switch', category: 'Forms & Inputs',
    description: 'On/off toggle with label and color variants.',
    Preview: TogglePreview,
    tailwind: `<label class="flex items-center gap-3 cursor-pointer">
  <span class="text-sm font-medium text-zinc-700">Notifications</span>
  <div class="relative">
    <input type="checkbox" class="sr-only peer" />
    <div class="h-6 w-11 rounded-full bg-zinc-300 peer-checked:bg-blue-500 transition-colors"></div>
    <div class="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5"></div>
  </div>
</label>`,
    css: `.toggle { position:relative; display:inline-block; width:2.75rem; height:1.5rem; }
.toggle input { opacity:0; width:0; height:0; }
.toggle-slider { position:absolute; inset:0; cursor:pointer; border-radius:9999px; background:#d4d4d8; transition:.3s; }
.toggle-slider::before { content:''; position:absolute; width:1.25rem; height:1.25rem; border-radius:9999px; left:.125rem; top:.125rem; background:#fff; box-shadow:0 1px 3px rgba(0,0,0,.2); transition:.3s; }
.toggle input:checked + .toggle-slider { background:#3b82f6; }
.toggle input:checked + .toggle-slider::before { transform:translateX(1.25rem); }`,
  },
  {
    id: 'checkbox', name: 'Checkbox & Radio', category: 'Forms & Inputs',
    description: 'Custom checkbox groups and radio button groups.',
    Preview: CheckboxPreview,
    tailwind: `<label class="flex items-center gap-2.5 cursor-pointer">
  <input type="checkbox" class="h-5 w-5 rounded-md border-zinc-300 text-blue-600 accent-blue-600 cursor-pointer" />
  <span class="text-sm text-zinc-700">Design</span>
</label>
<label class="flex items-center gap-2.5 cursor-pointer">
  <input type="radio" name="plan" class="h-5 w-5 accent-blue-600 cursor-pointer" />
  <span class="text-sm text-zinc-700">Monthly</span>
</label>`,
    css: `.checkbox-label { display:flex; align-items:center; gap:.625rem; cursor:pointer; }
.checkbox-box { width:1.25rem; height:1.25rem; border-radius:.375rem; border:2px solid #d4d4d8; background:#fff; display:flex; align-items:center; justify-content:center; transition:.15s; }
.checkbox-box.checked { background:#2563eb; border-color:#2563eb; }
.radio-circle { width:1.25rem; height:1.25rem; border-radius:9999px; border:2px solid #d4d4d8; display:flex; align-items:center; justify-content:center; }
.radio-circle.checked { border-color:#2563eb; }
.radio-dot { width:.625rem; height:.625rem; border-radius:9999px; background:#2563eb; }`,
  },
  {
    id: 'table', name: 'Data Table', category: 'Display',
    description: 'Striped data table with status badges and action buttons.',
    Preview: TablePreview,
    tailwind: `<div class="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
  <table class="w-full text-left text-sm">
    <thead class="bg-zinc-50 border-b border-zinc-200">
      <tr>
        <th class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">Name</th>
        <th class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">Status</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-zinc-100">
      <tr class="hover:bg-zinc-50">
        <td class="px-4 py-3 font-medium text-zinc-800">Alice Martin</td>
        <td class="px-4 py-3"><span class="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">Active</span></td>
      </tr>
    </tbody>
  </table>
</div>`,
    css: `.table { width:100%; border-collapse:collapse; font-size:.875rem; }
.table th { padding:.75rem 1rem; font-size:.75rem; font-weight:600; text-transform:uppercase; letter-spacing:.05em; color:#71717a; background:#fafafa; }
.table td { padding:.75rem 1rem; color:#3f3f46; }
.table tr { border-bottom:1px solid #f4f4f5; }
.table tr:hover { background:#fafafa; }
.table-wrapper { border-radius:.75rem; border:1px solid #e4e4e7; overflow:hidden; }`,
  },
  {
    id: 'modal', name: 'Modal Dialog', category: 'Overlay',
    description: 'Centered modal with backdrop, header, body, and footer actions.',
    Preview: ModalPreview,
    tailwind: `<div class="fixed inset-0 z-50 flex items-center justify-center">
  <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
  <div class="relative w-full max-w-md rounded-2xl bg-white shadow-2xl mx-4">
    <div class="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
      <h3 class="font-semibold text-zinc-800">Confirm Action</h3>
      <button class="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100">✕</button>
    </div>
    <div class="px-6 py-4 text-sm text-zinc-600">Modal body content here...</div>
    <div class="flex justify-end gap-2 border-t border-zinc-100 px-6 py-4">
      <button class="rounded-lg border border-zinc-200 px-4 py-2 text-sm">Cancel</button>
      <button class="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white">Delete</button>
    </div>
  </div>
</div>`,
    css: `.modal-backdrop { position:fixed; inset:0; z-index:50; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.4); backdrop-filter:blur(4px); }
.modal { position:relative; width:100%; max-width:28rem; margin:1rem; border-radius:1rem; background:#fff; box-shadow:0 25px 50px rgba(0,0,0,.25); }
.modal-header { display:flex; align-items:center; justify-content:space-between; padding:1rem 1.5rem; border-bottom:1px solid #f4f4f5; }
.modal-body   { padding:1rem 1.5rem; font-size:.875rem; color:#52525b; }
.modal-footer { display:flex; justify-content:flex-end; gap:.5rem; padding:1rem 1.5rem; border-top:1px solid #f4f4f5; }`,
  },
  {
    id: 'dropdown', name: 'Dropdown Menu', category: 'Overlay',
    description: 'Popover menu with icons, dividers, and keyboard-accessible items.',
    Preview: DropdownPreview,
    tailwind: `<div class="relative">
  <button class="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-zinc-50">
    Options <svg .../> <!-- ChevronDown -->
  </button>
  <div class="absolute right-0 mt-2 w-48 rounded-xl border border-zinc-200 bg-white shadow-xl py-1">
    <button class="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50">Profile</button>
    <div class="my-1 border-t border-zinc-100"></div>
    <button class="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50">Sign out</button>
  </div>
</div>`,
    css: `.dropdown { position:relative; display:inline-block; }
.dropdown-menu { position:absolute; right:0; top:calc(100% + .5rem); min-width:12rem; background:#fff; border:1px solid #e4e4e7; border-radius:.75rem; box-shadow:0 10px 25px rgba(0,0,0,.1); padding:.25rem 0; z-index:50; }
.dropdown-item { display:flex; align-items:center; gap:.625rem; width:100%; padding:.625rem 1rem; font-size:.875rem; color:#3f3f46; cursor:pointer; background:none; border:none; }
.dropdown-item:hover { background:#fafafa; }
.dropdown-divider { height:1px; background:#f4f4f5; margin:.25rem 0; }`,
  },
  {
    id: 'tooltip', name: 'Tooltip', category: 'Overlay',
    description: 'Hover tooltips in 4 directions with smooth fade.',
    Preview: TooltipPreview,
    tailwind: `<!-- Tooltip top -->
<div class="group relative inline-block">
  <button class="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm">Hover me</button>
  <div class="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
    Tooltip text
  </div>
</div>`,
    css: `.tooltip-wrap { position:relative; display:inline-block; }
.tooltip { position:absolute; z-index:50; padding:.375rem .75rem; border-radius:.5rem; background:#27272a; color:#fff; font-size:.75rem; font-weight:500; white-space:nowrap; opacity:0; pointer-events:none; transition:opacity .15s; }
.tooltip-top    { bottom:100%; left:50%; transform:translateX(-50%); margin-bottom:.5rem; }
.tooltip-bottom { top:100%;    left:50%; transform:translateX(-50%); margin-top:.5rem; }
.tooltip-wrap:hover .tooltip { opacity:1; }`,
  },
  {
    id: 'accordion', name: 'Accordion', category: 'Display',
    description: 'Collapsible accordion with smooth toggle animation.',
    Preview: AccordionPreview,
    tailwind: `<div class="space-y-2">
  <div class="rounded-xl border border-zinc-200 bg-white overflow-hidden">
    <button class="flex w-full items-center justify-between px-4 py-3.5 text-sm font-medium text-zinc-800 hover:bg-zinc-50">
      What is included?
      <svg class="h-4 w-4 text-zinc-400 transition-transform" .../>
    </button>
    <div class="border-t border-zinc-100 px-4 py-3.5 text-sm text-zinc-500">
      Answer content goes here.
    </div>
  </div>
</div>`,
    css: `.accordion-item { border-radius:.75rem; border:1px solid #e4e4e7; background:#fff; overflow:hidden; }
.accordion-trigger { display:flex; align-items:center; justify-content:space-between; width:100%; padding:.875rem 1rem; font-size:.875rem; font-weight:500; color:#27272a; cursor:pointer; background:none; border:none; text-align:left; }
.accordion-trigger:hover { background:#fafafa; }
.accordion-content { border-top:1px solid #f4f4f5; padding:.875rem 1rem; font-size:.875rem; color:#71717a; }
.accordion-icon { transition:transform .2s; }
.accordion-item.open .accordion-icon { transform:rotate(180deg); }`,
  },
  {
    id: 'timeline', name: 'Timeline', category: 'Display',
    description: 'Vertical timeline for activity feeds, history logs, and steps.',
    Preview: TimelinePreview,
    tailwind: `<div class="flex gap-4">
  <div class="flex flex-col items-center">
    <div class="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-white shadow">🚀</div>
    <div class="w-px flex-1 bg-zinc-200 my-1"></div>
  </div>
  <div class="pb-6 pt-1">
    <p class="text-sm font-semibold text-zinc-800">Project Launched</p>
    <p class="text-xs text-zinc-400 mt-0.5">2 hours ago</p>
    <p class="mt-1 text-xs text-zinc-500">Initial version deployed.</p>
  </div>
</div>`,
    css: `.timeline-item { display:flex; gap:1rem; }
.timeline-icon { width:2.25rem; height:2.25rem; border-radius:9999px; display:flex; align-items:center; justify-content:center; font-size:1rem; flex-shrink:0; }
.timeline-line { flex:1; width:1px; background:#e4e4e7; margin:.25rem 0; }
.timeline-body { padding-bottom:1.5rem; padding-top:.25rem; }
.timeline-title { font-size:.875rem; font-weight:600; color:#27272a; }
.timeline-time  { font-size:.75rem; color:#a1a1aa; margin-top:.125rem; }`,
  },
  {
    id: 'toast', name: 'Toast Notification', category: 'Feedback',
    description: 'Stacked toast messages with icon, title, and dismiss button.',
    Preview: ToastPreview,
    tailwind: `<div class="fixed bottom-4 right-4 z-50 space-y-2 w-72">
  <div class="flex items-start gap-3 rounded-xl border border-emerald-200 bg-white p-4 shadow-lg">
    <span class="mt-0.5 text-lg">✅</span>
    <div class="flex-1">
      <p class="text-sm font-semibold text-zinc-800">Saved!</p>
      <p class="text-xs text-zinc-500 mt-0.5">Your changes have been saved.</p>
    </div>
    <button class="text-zinc-300 hover:text-zinc-500">✕</button>
  </div>
</div>`,
    css: `.toast-container { position:fixed; bottom:1rem; right:1rem; z-index:9999; display:flex; flex-direction:column; gap:.5rem; width:18rem; }
.toast { display:flex; align-items:flex-start; gap:.75rem; padding:1rem; border-radius:.75rem; background:#fff; border:1px solid #e4e4e7; box-shadow:0 10px 25px rgba(0,0,0,.1); }
.toast-success { border-color:#a7f3d0; }
.toast-error   { border-color:#fecaca; }
.toast-title { font-size:.875rem; font-weight:600; color:#18181b; }
.toast-msg   { font-size:.75rem; color:#71717a; margin-top:.125rem; }`,
  },
  {
    id: 'stepper', name: 'Stepper', category: 'Navigation',
    description: 'Multi-step progress indicator with completed, active, and pending states.',
    Preview: StepperPreview,
    tailwind: `<div class="flex items-center">
  <div class="flex flex-col items-center">
    <div class="flex h-9 w-9 items-center justify-center rounded-full border-2 border-blue-600 bg-blue-600 text-white font-bold">✓</div>
    <span class="mt-1.5 text-xs font-medium text-zinc-500">Account</span>
  </div>
  <div class="mx-2 h-0.5 flex-1 bg-blue-600"></div>
  <div class="flex flex-col items-center">
    <div class="flex h-9 w-9 items-center justify-center rounded-full border-2 border-blue-600 bg-white text-blue-600 font-bold">2</div>
    <span class="mt-1.5 text-xs font-medium text-blue-600">Personal</span>
  </div>
  <div class="mx-2 h-0.5 flex-1 bg-zinc-200"></div>
  <div class="flex flex-col items-center">
    <div class="flex h-9 w-9 items-center justify-center rounded-full border-2 border-zinc-300 bg-white text-zinc-400 font-bold">3</div>
    <span class="mt-1.5 text-xs font-medium text-zinc-400">Payment</span>
  </div>
</div>`,
    css: `.stepper { display:flex; align-items:center; }
.step { display:flex; flex-direction:column; align-items:center; }
.step-circle { width:2.25rem; height:2.25rem; border-radius:9999px; border:2px solid #d4d4d8; background:#fff; display:flex; align-items:center; justify-content:center; font-size:.875rem; font-weight:700; color:#a1a1aa; }
.step-circle.done   { border-color:#2563eb; background:#2563eb; color:#fff; }
.step-circle.active { border-color:#2563eb; color:#2563eb; }
.step-connector      { flex:1; height:2px; background:#e4e4e7; margin:0 .5rem; }
.step-connector.done { background:#2563eb; }
.step-label { margin-top:.375rem; font-size:.75rem; font-weight:500; color:#a1a1aa; }
.step.active .step-label { color:#2563eb; }`,
  },
  {
    id: 'search', name: 'Search Bar', category: 'Forms & Inputs',
    description: 'Rounded search with icon prefix, clear button, and keyboard shortcut.',
    Preview: SearchPreview,
    tailwind: `<div class="relative">
  <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" .../>
  <input class="w-full rounded-xl border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm placeholder-zinc-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" placeholder="Search..." />
</div>
<!-- Pill search with ⌘K hint -->
<div class="relative">
  <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" .../>
  <input class="w-full rounded-full border border-zinc-300 bg-zinc-50 py-2.5 pl-10 pr-16 text-sm outline-none" placeholder="Quick search..." />
  <kbd class="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-zinc-200 bg-white px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">⌘K</kbd>
</div>`,
    css: `.search-wrap { position:relative; }
.search-input { width:100%; padding:.625rem 1rem .625rem 2.5rem; border-radius:.75rem; border:1px solid #d4d4d8; background:#fff; font-size:.875rem; outline:none; transition:border .15s,box-shadow .15s; }
.search-input:focus { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,.15); }
.search-icon { position:absolute; left:.875rem; top:50%; transform:translateY(-50%); color:#a1a1aa; }
.search-kbd { position:absolute; right:.75rem; top:50%; transform:translateY(-50%); padding:.125rem .375rem; border-radius:.375rem; border:1px solid #e4e4e7; font-size:.625rem; font-family:monospace; color:#a1a1aa; }`,
  },
  {
    id: 'notification-bell', name: 'Notification Bell', category: 'Display',
    description: 'Icon button with dot or count badge — common in nav bars.',
    Preview: NotificationBellPreview,
    tailwind: `<!-- Dot badge -->
<div class="relative">
  <button class="rounded-xl border border-zinc-200 bg-white p-2.5 hover:bg-zinc-50"><svg .../><!-- Bell --></button>
  <span class="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-red-500 ring-2 ring-white"></span>
</div>
<!-- Count badge -->
<div class="relative">
  <button class="rounded-xl border border-zinc-200 bg-white p-2.5 hover:bg-zinc-50"><svg .../></button>
  <span class="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">9</span>
</div>`,
    css: `.icon-btn { position:relative; display:inline-flex; }
.notification-dot { position:absolute; top:-3px; right:-3px; width:.875rem; height:.875rem; border-radius:9999px; background:#ef4444; box-shadow:0 0 0 2px #fff; }
.notification-count { position:absolute; top:-6px; right:-6px; min-width:1.25rem; height:1.25rem; border-radius:9999px; background:#ef4444; color:#fff; font-size:.625rem; font-weight:700; display:flex; align-items:center; justify-content:center; padding:0 .25rem; box-shadow:0 0 0 2px #fff; }`,
  },
  {
    id: 'list-group', name: 'List Group', category: 'Display',
    description: 'Clickable list items with icon, label, sub-label, and chevron.',
    Preview: ListGroupPreview,
    tailwind: `<div class="divide-y divide-zinc-100 rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
  <button class="flex w-full items-center gap-3 px-4 py-3.5 hover:bg-zinc-50 transition text-left">
    <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
      <svg .../>
    </div>
    <div class="flex-1">
      <p class="text-sm font-medium text-zinc-800">Profile</p>
      <p class="text-xs text-zinc-400">Manage your account</p>
    </div>
    <svg class="h-4 w-4 text-zinc-300" .../><!-- ChevronRight -->
  </button>
</div>`,
    css: `.list-group { border-radius:1rem; border:1px solid #e4e4e7; background:#fff; overflow:hidden; }
.list-item { display:flex; align-items:center; gap:.75rem; padding:.875rem 1rem; border:none; background:none; width:100%; cursor:pointer; text-align:left; transition:background .15s; }
.list-item:hover { background:#fafafa; }
.list-item + .list-item { border-top:1px solid #f4f4f5; }
.list-icon { width:2.25rem; height:2.25rem; border-radius:.75rem; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.list-label { font-size:.875rem; font-weight:500; color:#27272a; }
.list-sub   { font-size:.75rem; color:#a1a1aa; }`,
  },
  {
    id: 'input-group', name: 'Input Group', category: 'Forms & Inputs',
    description: 'Input with prefix/suffix addons — great for URLs, currencies.',
    Preview: InputGroupPreview,
    tailwind: `<!-- URL group -->
<div class="flex overflow-hidden rounded-xl border border-zinc-300 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
  <span class="flex items-center bg-zinc-100 px-3 text-sm text-zinc-500 border-r border-zinc-300 font-medium">https://</span>
  <input class="flex-1 bg-white px-3 py-2.5 text-sm outline-none" placeholder="example.com" />
</div>
<!-- Currency group -->
<div class="flex overflow-hidden rounded-xl border border-zinc-300 shadow-sm">
  <span class="flex items-center bg-zinc-100 px-3 text-sm text-zinc-500 border-r border-zinc-300">$</span>
  <input type="number" class="flex-1 bg-white px-3 py-2.5 text-sm outline-none" placeholder="0.00" />
  <span class="flex items-center bg-zinc-100 px-3 text-sm text-zinc-500 border-l border-zinc-300">USD</span>
</div>`,
    css: `.input-group { display:flex; overflow:hidden; border-radius:.75rem; border:1px solid #d4d4d8; background:#fff; transition:border .15s,box-shadow .15s; }
.input-group:focus-within { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,.15); }
.input-addon { display:flex; align-items:center; padding:0 .75rem; background:#f4f4f5; border-right:1px solid #d4d4d8; font-size:.875rem; color:#71717a; font-weight:500; }
.input-addon-right { border-right:none; border-left:1px solid #d4d4d8; }
.input-group input { flex:1; padding:.625rem .75rem; font-size:.875rem; outline:none; background:#fff; }`,
  },
  {
    id: 'button-group', name: 'Button Group', category: 'Forms & Inputs',
    description: 'Horizontally joined button groups for toggle, filter, and segmented controls.',
    Preview: ButtonGroupPreview,
    tailwind: `<!-- Segmented control -->
<div class="inline-flex rounded-xl overflow-hidden border border-zinc-200 shadow-sm">
  <button class="px-4 py-2 text-sm font-medium bg-white text-zinc-700 hover:bg-zinc-50">Left</button>
  <button class="px-4 py-2 text-sm font-medium bg-blue-600 text-white border-l border-zinc-200">Center</button>
  <button class="px-4 py-2 text-sm font-medium bg-white text-zinc-700 hover:bg-zinc-50 border-l border-zinc-200">Right</button>
</div>

<!-- Period selector -->
<div class="inline-flex rounded-xl overflow-hidden border border-zinc-200 shadow-sm">
  <button class="px-3 py-1.5 text-xs font-semibold bg-white text-zinc-600 hover:bg-zinc-50">Day</button>
  <button class="px-3 py-1.5 text-xs font-semibold bg-white text-zinc-600 border-l border-zinc-200">Week</button>
  <button class="px-3 py-1.5 text-xs font-semibold bg-zinc-800 text-white border-l border-zinc-200">Month</button>
  <button class="px-3 py-1.5 text-xs font-semibold bg-white text-zinc-600 border-l border-zinc-200">Year</button>
</div>`,
    css: `.btn-group { display:inline-flex; border-radius:.75rem; overflow:hidden; border:1px solid #e4e4e7; box-shadow:0 1px 2px rgba(0,0,0,.06); }
.btn-group button { padding:.5rem 1rem; font-size:.875rem; font-weight:500; background:#fff; color:#3f3f46; border:none; border-left:1px solid #e4e4e7; cursor:pointer; transition:background .15s; }
.btn-group button:first-child { border-left:none; }
.btn-group button:hover { background:#fafafa; }
.btn-group button.active { background:#2563eb; color:#fff; }`,
  },
  {
    id: 'carousel', name: 'Carousel / Slider', category: 'Display',
    description: 'Image/content slider with prev/next arrows, dot indicators, and auto-play support.',
    Preview: CarouselPreview,
    tailwind: `<div class="relative overflow-hidden rounded-2xl">
  <!-- Slide -->
  <div class="flex h-48 items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
    <p class="font-bold text-2xl">Slide 1</p>
  </div>
  <!-- Arrows -->
  <button class="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow">‹</button>
  <button class="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow">›</button>
  <!-- Dots -->
  <div class="flex justify-center gap-1.5 py-3 bg-white">
    <button class="h-2 w-6 rounded-full bg-blue-600"></button>
    <button class="h-2 w-2 rounded-full bg-zinc-300"></button>
    <button class="h-2 w-2 rounded-full bg-zinc-300"></button>
  </div>
</div>`,
    css: `.carousel { position:relative; overflow:hidden; border-radius:1rem; }
.carousel-slide { display:flex; align-items:center; justify-content:center; }
.carousel-btn { position:absolute; top:50%; transform:translateY(-50%); width:2rem; height:2rem; border-radius:9999px; background:rgba(255,255,255,.8); backdrop-filter:blur(4px); border:none; cursor:pointer; box-shadow:0 2px 8px rgba(0,0,0,.1); }
.carousel-btn.prev { left:.5rem; }
.carousel-btn.next { right:.5rem; }
.carousel-dots { display:flex; justify-content:center; gap:.375rem; padding:.75rem; background:#fff; }
.carousel-dot { height:.5rem; border-radius:9999px; background:#d4d4d8; border:none; cursor:pointer; transition:width .3s,background .3s; width:.5rem; }
.carousel-dot.active { width:1.5rem; background:#2563eb; }`,
  },
  {
    id: 'ribbon', name: 'Ribbon / Badge Cards', category: 'Display',
    description: 'Corner ribbon labels on cards — popular for highlighting featured or sale items.',
    Preview: RibbonPreview,
    tailwind: `<div class="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
  <!-- Corner ribbon -->
  <div class="absolute right-0 top-0 h-16 w-16">
    <div class="absolute right-[-1.5rem] top-[1rem] w-[5rem] rotate-45 bg-blue-600 py-1 text-center text-[10px] font-bold text-white shadow-sm">
      Popular
    </div>
  </div>
  <!-- Card content -->
  <div class="h-24 bg-gradient-to-br from-blue-500 to-indigo-600"></div>
  <div class="p-3">
    <p class="text-xs font-semibold text-zinc-800">Premium Card</p>
  </div>
</div>`,
    css: `.ribbon-card { position:relative; overflow:hidden; border-radius:1rem; border:1px solid #e4e4e7; background:#fff; }
.ribbon-corner { position:absolute; top:0; right:0; width:4rem; height:4rem; }
.ribbon-label { position:absolute; right:-1.5rem; top:1rem; width:5rem; transform:rotate(45deg); background:#2563eb; color:#fff; font-size:.625rem; font-weight:700; text-align:center; padding:.25rem 0; box-shadow:0 2px 4px rgba(0,0,0,.15); }
.ribbon-red   { background:#ef4444; }
.ribbon-green { background:#10b981; }`,
  },
  {
    id: 'popover', name: 'Popover', category: 'Overlay',
    description: 'Click-triggered popover with rich content, action buttons, and close arrow.',
    Preview: PopoverPreview,
    tailwind: `<div class="relative inline-block">
  <button class="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50">Info</button>

  <!-- Popover -->
  <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 w-56 rounded-xl border border-zinc-200 bg-white p-3 shadow-xl">
    <div class="flex items-start gap-2">
      <span class="text-lg">ℹ️</span>
      <p class="text-xs text-zinc-600 leading-relaxed">Rich content with actions and links.</p>
    </div>
    <div class="mt-2 flex gap-2">
      <button class="rounded-lg bg-blue-600 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-blue-700">Action</button>
      <button class="rounded-lg border border-zinc-200 px-2.5 py-1 text-[11px] text-zinc-600">Close</button>
    </div>
    <!-- Arrow -->
    <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-200"></div>
  </div>
</div>`,
    css: `.popover { position:relative; display:inline-block; }
.popover-panel { position:absolute; bottom:calc(100% + .5rem); left:50%; transform:translateX(-50%); width:14rem; background:#fff; border:1px solid #e4e4e7; border-radius:.75rem; padding:.75rem; box-shadow:0 10px 25px rgba(0,0,0,.1); z-index:50; }
.popover-arrow { position:absolute; top:100%; left:50%; transform:translateX(-50%); width:0; height:0; border:4px solid transparent; border-top-color:#e4e4e7; }`,
  },
  {
    id: 'range-slider', name: 'Range Slider', category: 'Forms & Inputs',
    description: 'Custom styled range input with live value display and color variants.',
    Preview: RangeSliderPreview,
    tailwind: `<div>
  <div class="mb-2 flex justify-between text-xs font-medium text-zinc-600">
    <span>Volume</span><span class="font-bold text-zinc-800">60%</span>
  </div>
  <!-- Track -->
  <div class="relative h-2 rounded-full bg-zinc-200">
    <div class="absolute inset-y-0 left-0 w-[60%] rounded-full bg-blue-600"></div>
    <input type="range" min="0" max="100" value="60"
      class="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
  </div>
</div>`,
    css: `.range-wrap { position:relative; }
.range-track { height:.5rem; border-radius:9999px; background:#e4e4e7; position:relative; }
.range-fill  { position:absolute; inset-y:0; left:0; border-radius:9999px; background:#2563eb; }
.range-input { position:absolute; inset:0; width:100%; height:100%; opacity:0; cursor:pointer; }
input[type=range]::-webkit-slider-thumb { width:1.125rem; height:1.125rem; border-radius:9999px; background:#2563eb; border:2px solid #fff; box-shadow:0 0 0 2px #2563eb; }`,
  },
  {
    id: 'star-rating', name: 'Star Rating', category: 'Forms & Inputs',
    description: 'Interactive star rating with hover state, label, and rating breakdown bar.',
    Preview: StarRatingPreview,
    tailwind: `<!-- Interactive stars -->
<div class="flex gap-1">
  <button class="text-3xl text-amber-400 hover:scale-110 transition">★</button>
  <button class="text-3xl text-amber-400 hover:scale-110 transition">★</button>
  <button class="text-3xl text-amber-400 hover:scale-110 transition">★</button>
  <button class="text-3xl text-zinc-200 hover:scale-110 transition">★</button>
  <button class="text-3xl text-zinc-200 hover:scale-110 transition">★</button>
</div>
<!-- Rating bar -->
<div class="flex items-center gap-1.5 text-xs text-zinc-500">
  <span>5★</span>
  <div class="h-1.5 w-24 rounded-full bg-zinc-200">
    <div class="h-1.5 w-[68%] rounded-full bg-amber-400"></div>
  </div>
  <span>68%</span>
</div>`,
    css: `.star-rating { display:flex; gap:.25rem; }
.star-btn { font-size:1.75rem; background:none; border:none; cursor:pointer; transition:transform .1s; color:#e4e4e7; }
.star-btn.filled { color:#fbbf24; }
.star-btn:hover { transform:scale(1.1); }
.rating-bar { display:flex; align-items:center; gap:.375rem; font-size:.75rem; color:#71717a; }
.rating-bar-track { height:.375rem; border-radius:9999px; background:#e4e4e7; }
.rating-bar-fill  { height:100%; border-radius:9999px; background:#fbbf24; }`,
  },
  {
    id: 'tag-input', name: 'Tag Input', category: 'Forms & Inputs',
    description: 'Multi-tag input with Enter/comma to add, click to remove badges.',
    Preview: TagInputPreview,
    tailwind: `<!-- Tag input container -->
<div class="flex flex-wrap gap-2 rounded-xl border border-zinc-300 bg-white p-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition min-h-[3rem]">
  <!-- Tag badge -->
  <span class="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
    React
    <button class="text-blue-400 hover:text-blue-700 leading-none">×</button>
  </span>
  <!-- Input -->
  <input class="flex-1 min-w-[80px] text-sm outline-none text-zinc-700 placeholder-zinc-400" placeholder="Add tag…" />
</div>
<p class="mt-1 text-[10px] text-zinc-400">Press Enter or comma to add a tag</p>`,
    css: `.tag-input { display:flex; flex-wrap:wrap; gap:.5rem; padding:.75rem; border-radius:.75rem; border:1px solid #d4d4d8; background:#fff; min-height:3rem; transition:border .15s,box-shadow .15s; }
.tag-input:focus-within { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,.15); }
.tag-badge { display:inline-flex; align-items:center; gap:.25rem; padding:.125rem .625rem; border-radius:9999px; background:#dbeafe; color:#1d4ed8; font-size:.75rem; font-weight:600; }
.tag-remove { background:none; border:none; cursor:pointer; color:#60a5fa; font-size:1rem; line-height:1; }
.tag-input input { flex:1; min-width:5rem; border:none; outline:none; font-size:.875rem; color:#27272a; background:transparent; }`,
  },
  {
    id: 'file-upload', name: 'File Upload', category: 'Forms & Inputs',
    description: 'Drag-and-drop upload zone with file progress indicator.',
    Preview: FileUploadPreview,
    tailwind: `<!-- Drop zone -->
<div class="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-300 bg-white p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition cursor-pointer">
  <span class="text-2xl">📂</span>
  <p class="text-sm font-medium text-zinc-700">Drop files here</p>
  <p class="text-xs text-zinc-400">or <span class="text-blue-600 font-medium">browse files</span></p>
  <p class="text-[10px] text-zinc-400">PNG, JPG, PDF up to 10MB</p>
</div>

<!-- File progress row -->
<div class="rounded-xl border border-zinc-200 bg-white p-3 flex items-center gap-3">
  <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">📄</div>
  <div class="flex-1">
    <p class="text-xs font-medium text-zinc-800">design-specs.pdf</p>
    <div class="mt-1 h-1.5 rounded-full bg-zinc-100">
      <div class="h-1.5 w-3/4 rounded-full bg-blue-500"></div>
    </div>
    <p class="mt-0.5 text-[10px] text-zinc-400">75% · 2.4 MB</p>
  </div>
  <button class="text-zinc-300 hover:text-zinc-500">×</button>
</div>`,
    css: `.dropzone { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:.5rem; padding:1.5rem; border-radius:.75rem; border:2px dashed #d4d4d8; background:#fff; text-align:center; cursor:pointer; transition:border-color .15s,background .15s; }
.dropzone:hover,.dropzone.drag-over { border-color:#3b82f6; background:#eff6ff; }
.file-row { display:flex; align-items:center; gap:.75rem; padding:.75rem; border-radius:.75rem; border:1px solid #e4e4e7; background:#fff; }
.file-icon { width:2.25rem; height:2.25rem; border-radius:.5rem; display:flex; align-items:center; justify-content:center; background:#eff6ff; color:#2563eb; flex-shrink:0; }`,
  },
  {
    id: 'textarea', name: 'Textarea', category: 'Forms & Inputs',
    description: 'Styled multiline textarea with character counter variant.',
    Preview: TextareaPreview,
    tailwind: `<!-- Basic textarea -->
<textarea rows="3" class="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm placeholder-zinc-400 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none" placeholder="Write your message…"></textarea>

<!-- With character counter -->
<div class="relative">
  <textarea rows="3" maxlength="200" class="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 pb-8 text-sm placeholder-zinc-400 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition resize-none" placeholder="Max 200 chars…"></textarea>
  <span class="absolute bottom-2.5 right-3 text-[10px] text-zinc-400">0 / 200</span>
</div>`,
    css: `.textarea { width:100%; padding:.75rem 1rem; border-radius:.75rem; border:1px solid #d4d4d8; background:#fff; font-size:.875rem; color:#27272a; outline:none; resize:none; transition:border .15s,box-shadow .15s; font-family:inherit; line-height:1.6; }
.textarea::placeholder { color:#a1a1aa; }
.textarea:focus { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,.15); }
.textarea-wrap { position:relative; }
.textarea-counter { position:absolute; bottom:.625rem; right:.75rem; font-size:.625rem; color:#a1a1aa; }`,
  },
  {
    id: 'kanban', name: 'Kanban Board', category: 'Display',
    description: 'Three-column task board with status labels and draggable card layout.',
    Preview: KanbanPreview,
    tailwind: `<div class="flex gap-3">
  <!-- Column -->
  <div class="flex-1 rounded-xl border border-zinc-200 bg-white p-3">
    <div class="flex items-center justify-between mb-3">
      <span class="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-600">To Do</span>
      <span class="text-[10px] text-zinc-400">2</span>
    </div>
    <!-- Card -->
    <div class="rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2 text-xs text-zinc-700 font-medium shadow-sm cursor-grab hover:shadow transition">Design mockups</div>
  </div>
  <!-- In Progress Column -->
  <div class="flex-1 rounded-xl border border-blue-100 bg-white p-3">
    <span class="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">In Progress</span>
  </div>
  <!-- Done Column -->
  <div class="flex-1 rounded-xl border border-emerald-100 bg-white p-3">
    <span class="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Done</span>
  </div>
</div>`,
    css: `.kanban { display:flex; gap:.75rem; overflow-x:auto; }
.kanban-col { flex:1; min-width:10rem; border-radius:.75rem; border:1px solid #e4e4e7; background:#fff; padding:.75rem; }
.kanban-col-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:.75rem; }
.kanban-card { border-radius:.5rem; border:1px solid #f4f4f5; background:#fafafa; padding:.5rem .75rem; font-size:.75rem; font-weight:500; color:#3f3f46; box-shadow:0 1px 2px rgba(0,0,0,.05); cursor:grab; transition:box-shadow .15s; }
.kanban-card:hover { box-shadow:0 4px 12px rgba(0,0,0,.08); }`,
  },
  {
    id: 'chat', name: 'Chat Bubbles', category: 'Display',
    description: 'Message UI with sent/received bubbles, timestamps, and online status.',
    Preview: ChatPreview,
    tailwind: `<!-- Chat container -->
<div class="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
  <!-- Header -->
  <div class="flex items-center gap-3 border-b border-zinc-100 px-4 py-3">
    <div class="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">AJ</div>
    <div><p class="text-sm font-semibold text-zinc-800">Alex Johnson</p><p class="text-[10px] text-emerald-500 font-medium">● Online</p></div>
  </div>
  <!-- Messages -->
  <div class="space-y-3 p-4">
    <!-- Received -->
    <div class="flex justify-start">
      <div class="max-w-[75%] rounded-2xl rounded-bl-sm bg-zinc-100 px-3.5 py-2 text-xs text-zinc-800">Hey! How's it going?</div>
    </div>
    <!-- Sent -->
    <div class="flex justify-end">
      <div class="max-w-[75%] rounded-2xl rounded-br-sm bg-blue-600 px-3.5 py-2 text-xs text-white">Going great! 🚀</div>
    </div>
  </div>
  <!-- Input -->
  <div class="flex items-center gap-2 border-t border-zinc-100 px-3 py-2.5">
    <input class="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs outline-none" placeholder="Type a message…" />
    <button class="rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700">Send</button>
  </div>
</div>`,
    css: `.chat { border-radius:1rem; border:1px solid #e4e4e7; background:#fff; overflow:hidden; }
.chat-header { display:flex; align-items:center; gap:.75rem; padding:.75rem 1rem; border-bottom:1px solid #f4f4f5; }
.chat-body { display:flex; flex-direction:column; gap:.75rem; padding:1rem; }
.bubble { max-width:75%; border-radius:1rem; padding:.5rem .875rem; font-size:.75rem; }
.bubble-sent     { background:#2563eb; color:#fff; border-bottom-right-radius:.25rem; align-self:flex-end; }
.bubble-received { background:#f4f4f5; color:#27272a; border-bottom-left-radius:.25rem; align-self:flex-start; }
.chat-input { display:flex; gap:.5rem; padding:.625rem .75rem; border-top:1px solid #f4f4f5; }`,
  },
  {
    id: 'pricing', name: 'Pricing Card', category: 'Display',
    description: 'Pricing comparison cards with features list and highlighted popular plan.',
    Preview: PricingCardPreview,
    tailwind: `<!-- Free plan -->
<div class="w-44 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
  <p class="text-xs font-bold uppercase tracking-widest text-blue-600">Starter</p>
  <p class="mt-1 text-3xl font-bold text-zinc-800">$0<span class="text-sm font-normal text-zinc-400">/mo</span></p>
  <ul class="mt-4 space-y-1.5">
    <li class="flex items-center gap-1.5 text-[11px] text-zinc-600"><span class="text-emerald-500">✓</span>5 projects</li>
    <li class="flex items-center gap-1.5 text-[11px] text-zinc-600"><span class="text-emerald-500">✓</span>2GB storage</li>
  </ul>
  <button class="mt-4 w-full rounded-lg bg-blue-600 py-2 text-xs font-semibold text-white hover:bg-blue-700">Get Started</button>
</div>

<!-- Pro plan (highlighted) -->
<div class="w-44 rounded-2xl border border-blue-600 bg-blue-600 p-5 shadow-sm">
  <p class="text-xs font-bold uppercase tracking-widest text-blue-200">Pro</p>
  <p class="mt-1 text-3xl font-bold text-white">$29<span class="text-sm font-normal opacity-70">/mo</span></p>
  <button class="mt-4 w-full rounded-lg bg-white py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50">Start Free Trial</button>
</div>`,
    css: `.pricing-card { border-radius:1rem; border:1px solid #e4e4e7; background:#fff; padding:1.25rem; box-shadow:0 1px 3px rgba(0,0,0,.06); }
.pricing-card.featured { background:#2563eb; border-color:#2563eb; color:#fff; }
.pricing-tier  { font-size:.75rem; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:#2563eb; }
.pricing-price { font-size:2rem; font-weight:700; color:#18181b; margin-top:.25rem; }
.pricing-features { list-style:none; padding:0; margin-top:1rem; display:flex; flex-direction:column; gap:.375rem; }
.pricing-feature { display:flex; align-items:center; gap:.375rem; font-size:.6875rem; color:#52525b; }`,
  },
  {
    id: 'navbar', name: 'Navbar', category: 'Navigation',
    description: 'Responsive top navigation with logo, links, notification bell, and avatar.',
    Preview: NavbarPreview,
    tailwind: `<nav class="flex items-center justify-between bg-white border-b border-zinc-200 px-4 py-3 shadow-sm">
  <!-- Logo -->
  <div class="flex items-center gap-2">
    <div class="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">A</div>
    <span class="font-bold text-zinc-800 text-sm">AppName</span>
  </div>
  <!-- Links -->
  <div class="hidden sm:flex items-center gap-5 text-sm">
    <a href="#" class="font-medium text-blue-600">Dashboard</a>
    <a href="#" class="font-medium text-zinc-500 hover:text-zinc-800">Analytics</a>
    <a href="#" class="font-medium text-zinc-500 hover:text-zinc-800">Reports</a>
  </div>
  <!-- Right side -->
  <div class="flex items-center gap-2">
    <button class="rounded-xl border border-zinc-200 p-1.5 text-zinc-500 hover:bg-zinc-50"><svg .../></button>
    <div class="h-7 w-7 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-[10px] font-bold">JD</div>
  </div>
</nav>`,
    css: `.navbar { display:flex; align-items:center; justify-content:space-between; padding:.75rem 1rem; background:#fff; border-bottom:1px solid #e4e4e7; box-shadow:0 1px 3px rgba(0,0,0,.06); }
.navbar-logo { display:flex; align-items:center; gap:.5rem; font-weight:700; font-size:.875rem; color:#18181b; }
.navbar-links { display:flex; align-items:center; gap:1.25rem; }
.navbar-link { font-size:.875rem; font-weight:500; color:#71717a; text-decoration:none; transition:color .15s; }
.navbar-link:hover,.navbar-link.active { color:#2563eb; }
.navbar-right { display:flex; align-items:center; gap:.5rem; }`,
  },
  {
    id: 'sidebar', name: 'Sidebar', category: 'Navigation',
    description: 'Dark sidebar navigation with active state, icon, label, and badge count.',
    Preview: SidebarPreview,
    tailwind: `<aside class="w-48 bg-zinc-900 flex flex-col min-h-screen">
  <!-- Brand -->
  <div class="flex items-center gap-2 px-4 py-4 border-b border-zinc-800">
    <div class="h-6 w-6 rounded-md bg-blue-500 flex items-center justify-center text-white text-xs font-bold">A</div>
    <span class="text-xs font-bold text-white">Admin Panel</span>
  </div>
  <!-- Nav -->
  <nav class="flex-1 py-3 space-y-0.5 px-2">
    <!-- Active item -->
    <a href="#" class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium bg-blue-600 text-white">📊 Dashboard</a>
    <!-- Inactive item -->
    <a href="#" class="flex items-center justify-between gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100">
      <span class="flex items-center gap-2">💬 Messages</span>
      <span class="rounded-full bg-red-500 px-1.5 py-0.5 text-[9px] font-bold text-white">5</span>
    </a>
  </nav>
</aside>`,
    css: `.sidebar { width:12rem; background:#18181b; display:flex; flex-direction:column; min-height:100vh; }
.sidebar-brand { display:flex; align-items:center; gap:.5rem; padding:1rem; border-bottom:1px solid #27272a; font-size:.75rem; font-weight:700; color:#fff; }
.sidebar-nav { flex:1; padding:.75rem .5rem; display:flex; flex-direction:column; gap:.125rem; }
.sidebar-item { display:flex; align-items:center; justify-content:space-between; gap:.625rem; padding:.5rem .75rem; border-radius:.5rem; font-size:.75rem; font-weight:500; color:#a1a1aa; text-decoration:none; transition:background .15s,color .15s; }
.sidebar-item:hover { background:#27272a; color:#e4e4e7; }
.sidebar-item.active { background:#2563eb; color:#fff; }`,
  },
  {
    id: 'divider', name: 'Divider', category: 'Layout',
    description: 'Horizontal dividers in plain, OR text, label badge, and gradient styles.',
    Preview: DividerPreview,
    tailwind: `<!-- Plain -->
<div class="h-px bg-zinc-200 w-full"></div>

<!-- OR divider -->
<div class="flex items-center gap-3">
  <div class="h-px flex-1 bg-zinc-200"></div>
  <span class="text-xs font-medium text-zinc-400">OR</span>
  <div class="h-px flex-1 bg-zinc-200"></div>
</div>

<!-- Label badge divider -->
<div class="flex items-center gap-3">
  <div class="h-px flex-1 bg-zinc-200"></div>
  <span class="rounded-full border border-zinc-200 bg-white px-3 py-0.5 text-[11px] font-medium text-zinc-500 shadow-sm">✦ Section</span>
  <div class="h-px flex-1 bg-zinc-200"></div>
</div>

<!-- Left accent border -->
<div class="border-l-4 border-blue-500 pl-3">
  <p class="text-xs font-semibold text-zinc-800">Callout Title</p>
  <p class="text-[11px] text-zinc-400">Important note or quote content.</p>
</div>`,
    css: `.divider { height:1px; background:#e4e4e7; width:100%; }
.divider-text { display:flex; align-items:center; gap:.75rem; }
.divider-text::before,.divider-text::after { content:''; flex:1; height:1px; background:#e4e4e7; }
.divider-label { font-size:.75rem; font-weight:500; color:#a1a1aa; white-space:nowrap; }
.divider-callout { border-left:4px solid #2563eb; padding-left:.75rem; }`,
  },
  {
    id: 'code-snippet', name: 'Code Snippet', category: 'Display',
    description: 'Syntax-highlighted code block with macOS chrome, filename, and language badge.',
    Preview: CodeSnippetPreview,
    tailwind: `<div class="overflow-hidden rounded-xl border border-zinc-700 shadow-lg">
  <!-- Chrome bar -->
  <div class="flex items-center justify-between bg-zinc-800 px-4 py-2.5">
    <div class="flex items-center gap-2">
      <div class="flex gap-1.5">
        <span class="h-3 w-3 rounded-full bg-red-500"></span>
        <span class="h-3 w-3 rounded-full bg-yellow-400"></span>
        <span class="h-3 w-3 rounded-full bg-emerald-500"></span>
      </div>
      <span class="ml-2 text-[11px] text-zinc-400 font-mono">index.tsx</span>
    </div>
    <span class="text-[10px] text-zinc-500 font-mono">TypeScript</span>
  </div>
  <!-- Code body -->
  <pre class="bg-zinc-950 px-4 py-4 font-mono text-[11.5px] leading-6 text-zinc-300 overflow-x-auto"><code>
<span class="text-purple-400">import</span> <span class="text-zinc-300">{ useState }</span> <span class="text-purple-400">from</span> <span class="text-emerald-400">'react'</span>
  </code></pre>
</div>`,
    css: `.code-block { border-radius:.75rem; border:1px solid #3f3f46; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,.2); }
.code-chrome { display:flex; align-items:center; justify-content:space-between; padding:.625rem 1rem; background:#27272a; }
.code-dots { display:flex; gap:.375rem; }
.code-dot { width:.75rem; height:.75rem; border-radius:9999px; }
.code-body { background:#09090b; padding:1rem; font-family:monospace; font-size:.7rem; line-height:1.7; color:#d4d4d8; overflow-x:auto; }
.token-keyword { color:#c084fc; } .token-string { color:#4ade80; } .token-function { color:#fde047; } .token-tag { color:#f87171; }`,
  },
  {
    id: 'image-gallery', name: 'Image Gallery', category: 'Display',
    description: 'Responsive grid image gallery with thumbnail strip for lightbox-style layouts.',
    Preview: ImageGalleryPreview,
    tailwind: `<!-- 3-column grid -->
<div class="grid grid-cols-3 gap-1.5">
  <div class="aspect-square rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 hover:scale-105 transition cursor-pointer"></div>
  <div class="aspect-square rounded-lg bg-gradient-to-br from-rose-400 to-pink-500 hover:scale-105 transition cursor-pointer"></div>
  <div class="aspect-square rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 hover:scale-105 transition cursor-pointer"></div>
  <div class="aspect-square rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 hover:scale-105 transition cursor-pointer"></div>
  <div class="aspect-square rounded-lg bg-gradient-to-br from-purple-400 to-violet-500 hover:scale-105 transition cursor-pointer"></div>
  <div class="aspect-square rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 hover:scale-105 transition cursor-pointer"></div>
</div>`,
    css: `.gallery { display:grid; gap:.375rem; }
.gallery-3col { grid-template-columns:repeat(3,1fr); }
.gallery-4col { grid-template-columns:repeat(4,1fr); }
.gallery-item { aspect-ratio:1; border-radius:.5rem; overflow:hidden; cursor:pointer; transition:transform .2s; }
.gallery-item:hover { transform:scale(1.05); }
.gallery-item img { width:100%; height:100%; object-fit:cover; }`,
  },
  {
    id: 'video-card', name: 'Video Card', category: 'Display',
    description: 'Video thumbnail card with play button overlay, duration badge, and meta info.',
    Preview: VideoCardPreview,
    tailwind: `<div class="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
  <!-- Thumbnail with play -->
  <div class="relative h-36 bg-zinc-900 flex items-center justify-center cursor-pointer group">
    <img src="thumbnail.jpg" alt="" class="absolute inset-0 h-full w-full object-cover opacity-80" />
    <!-- Play button -->
    <div class="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 group-hover:bg-white/30 transition">
      <span class="text-white text-xl ml-0.5">▶</span>
    </div>
    <!-- Duration -->
    <div class="absolute bottom-2 right-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-mono text-white">4:32</div>
  </div>
  <!-- Meta -->
  <div class="p-3.5">
    <p class="text-sm font-semibold text-zinc-800">Getting Started with Tailwind CSS</p>
    <div class="mt-2 flex items-center gap-2">
      <div class="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-[9px] font-bold">T</div>
      <span class="text-xs text-zinc-500">TailAdmin · 12K views</span>
    </div>
  </div>
</div>`,
    css: `.video-card { border-radius:1rem; border:1px solid #e4e4e7; background:#fff; overflow:hidden; }
.video-thumb { position:relative; overflow:hidden; cursor:pointer; }
.video-thumb img { width:100%; height:100%; object-fit:cover; transition:transform .3s; }
.video-thumb:hover img { transform:scale(1.03); }
.play-btn { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; }
.play-circle { width:3rem; height:3rem; border-radius:9999px; background:rgba(255,255,255,.2); backdrop-filter:blur(4px); border:1px solid rgba(255,255,255,.3); display:flex; align-items:center; justify-content:center; }
.video-duration { position:absolute; bottom:.5rem; right:.5rem; background:rgba(0,0,0,.6); color:#fff; font-size:.625rem; font-family:monospace; padding:.125rem .375rem; border-radius:.375rem; }`,
  },
  {
    id: 'empty-state', name: 'Empty State', category: 'Display',
    description: 'Friendly empty state UI with icon, heading, description, and CTA button.',
    Preview: EmptyStatePreview,
    tailwind: `<div class="flex flex-col items-center justify-center py-12 text-center">
  <!-- Icon / illustration -->
  <div class="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 text-4xl mb-4">📭</div>
  <h3 class="text-sm font-bold text-zinc-800">No results found</h3>
  <p class="mt-1.5 text-xs text-zinc-400 leading-relaxed max-w-[200px]">
    We couldn't find what you're looking for. Try adjusting your search or filters.
  </p>
  <button class="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition">
    Clear Filters
  </button>
</div>`,
    css: `.empty-state { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:3rem 1rem; text-align:center; }
.empty-icon { width:5rem; height:5rem; border-radius:9999px; background:#f4f4f5; display:flex; align-items:center; justify-content:center; font-size:2.5rem; margin-bottom:1rem; }
.empty-title { font-size:.875rem; font-weight:700; color:#18181b; }
.empty-desc  { margin-top:.375rem; font-size:.75rem; color:#a1a1aa; line-height:1.6; max-width:14rem; }`,
  },
  {
    id: 'link-styles', name: 'Link Styles', category: 'Display',
    description: 'Styled anchor variants — underline, filled, border-bottom, muted, and hashtag.',
    Preview: LinkStylesPreview,
    tailwind: `<!-- Default blue link -->
<a href="#" class="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition">Default link</a>

<!-- Underline offset -->
<a href="#" class="text-sm font-medium text-zinc-600 underline underline-offset-2 decoration-zinc-300 hover:decoration-zinc-600 transition">Underline style</a>

<!-- Border bottom -->
<a href="#" class="text-sm font-medium text-zinc-700 border-b-2 border-transparent hover:border-blue-600 hover:text-blue-600 transition">Border bottom</a>

<!-- Filled pill -->
<a href="#" class="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition">Filled link →</a>

<!-- Hashtag / topic links -->
<a href="#" class="text-xs font-medium text-blue-600 hover:underline">#React</a>`,
    css: `.link          { color:#2563eb; font-weight:500; text-decoration:none; transition:color .15s; }
.link:hover    { text-decoration:underline; color:#1d4ed8; }
.link-muted    { color:#a1a1aa; }
.link-muted:hover { color:#27272a; }
.link-filled   { display:inline-flex; align-items:center; gap:.25rem; padding:.375rem .75rem; border-radius:.5rem; background:#eff6ff; color:#1d4ed8; font-size:.75rem; font-weight:600; text-decoration:none; }
.link-filled:hover { background:#dbeafe; }
.link-border   { border-bottom:2px solid transparent; transition:border-color .15s,color .15s; }
.link-border:hover { border-bottom-color:#2563eb; color:#2563eb; }`,
  },
  {
    id: 'notification-panel', name: 'Notification Panel', category: 'Display',
    description: 'Dropdown notification feed with unread dot, mark-all-read, and view-all link.',
    Preview: NotificationPanelPreview,
    tailwind: `<div class="relative">
  <!-- Bell trigger with badge -->
  <button class="relative rounded-xl border border-zinc-200 bg-white p-2.5 hover:bg-zinc-50">
    <svg .../><!-- Bell -->
    <span class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-white">2</span>
  </button>

  <!-- Panel -->
  <div class="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-zinc-200 bg-white shadow-xl overflow-hidden">
    <div class="flex items-center justify-between px-4 py-3 border-b border-zinc-100">
      <p class="text-sm font-semibold text-zinc-800">Notifications</p>
      <button class="text-[11px] font-medium text-blue-600 hover:underline">Mark all read</button>
    </div>
    <!-- Notification item -->
    <div class="flex items-start gap-3 px-4 py-3 bg-blue-50/30 hover:bg-zinc-50 transition">
      <span class="text-xl">🚀</span>
      <div class="flex-1">
        <p class="text-xs font-semibold text-zinc-800">New deployment</p>
        <p class="text-[11px] text-zinc-500">v2.4.1 deployed to production</p>
        <p class="text-[10px] text-zinc-400 mt-0.5">2m ago</p>
      </div>
      <span class="mt-1.5 h-2 w-2 rounded-full bg-blue-500"></span>
    </div>
    <div class="border-t border-zinc-100 px-4 py-2.5 text-center">
      <button class="text-xs font-medium text-blue-600 hover:underline">View all notifications</button>
    </div>
  </div>
</div>`,
    css: `.notif-panel { position:absolute; right:0; top:calc(100% + .5rem); width:18rem; border-radius:1rem; border:1px solid #e4e4e7; background:#fff; box-shadow:0 10px 30px rgba(0,0,0,.1); overflow:hidden; z-index:50; }
.notif-header { display:flex; align-items:center; justify-content:space-between; padding:.75rem 1rem; border-bottom:1px solid #f4f4f5; }
.notif-item { display:flex; align-items:flex-start; gap:.75rem; padding:.75rem 1rem; transition:background .15s; }
.notif-item:hover { background:#fafafa; }
.notif-item.unread { background:#eff6ff40; }
.notif-dot { width:.5rem; height:.5rem; border-radius:9999px; background:#3b82f6; flex-shrink:0; margin-top:.375rem; }`,
  },
  {
    id: 'faq', name: 'FAQ Section', category: 'Display',
    description: 'FAQ list with question/answer cards and section header — great for landing pages.',
    Preview: FaqPreview,
    tailwind: `<div class="space-y-3">
  <!-- Header -->
  <div class="text-center mb-4">
    <span class="text-xs font-bold uppercase tracking-widest text-blue-600">FAQ</span>
    <h3 class="mt-1 text-sm font-bold text-zinc-800">Frequently Asked</h3>
  </div>
  <!-- FAQ item -->
  <div class="rounded-xl border border-zinc-200 bg-white p-4">
    <div class="flex items-start gap-3">
      <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-600">Q</span>
      <div>
        <p class="text-xs font-semibold text-zinc-800">Is it free to use?</p>
        <p class="mt-1 text-[11px] text-zinc-500 leading-relaxed">Yes! The core library is completely free and open-source.</p>
      </div>
    </div>
  </div>
</div>`,
    css: `.faq-section { }
.faq-header { text-align:center; margin-bottom:1rem; }
.faq-item { border-radius:.75rem; border:1px solid #e4e4e7; background:#fff; padding:1rem; margin-bottom:.75rem; }
.faq-q { display:flex; align-items:flex-start; gap:.75rem; }
.faq-badge { width:1.25rem; height:1.25rem; border-radius:9999px; background:#dbeafe; color:#1d4ed8; font-size:.625rem; font-weight:700; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:.125rem; }
.faq-question { font-size:.75rem; font-weight:600; color:#18181b; }
.faq-answer   { margin-top:.25rem; font-size:.6875rem; color:#71717a; line-height:1.6; }`,
  },
  {
    id: 'profile-card', name: 'Profile Card', category: 'Display',
    description: 'User profile with cover, avatar overlay, bio, stats, and follow button.',
    Preview: ProfileCardPreview,
    tailwind: `<div class="w-56 rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
  <div class="h-20 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500"></div>
  <div class="px-4 pb-4">
    <div class="relative -mt-8 mb-3">
      <img class="h-14 w-14 rounded-full border-2 border-white shadow-md" src="avatar.jpg" alt="" />
    </div>
    <h3 class="text-sm font-bold text-zinc-800">Jane Doe</h3>
    <p class="text-xs text-zinc-500">Senior Product Designer</p>
    <div class="mt-3 flex gap-4 text-center">
      <div><p class="text-sm font-bold text-zinc-800">142</p><p class="text-[10px] text-zinc-400">Posts</p></div>
      <div><p class="text-sm font-bold text-zinc-800">8.2K</p><p class="text-[10px] text-zinc-400">Followers</p></div>
    </div>
    <button class="mt-3 w-full rounded-lg bg-blue-600 py-1.5 text-xs font-semibold text-white hover:bg-blue-700">Follow</button>
  </div>
</div>`,
    css: `.profile-card { border-radius:1rem; border:1px solid #e4e4e7; background:#fff; overflow:hidden; }
.profile-cover { height:5rem; background:linear-gradient(135deg,#3b82f6,#8b5cf6); }
.profile-body  { padding:0 1rem 1rem; }
.profile-avatar { width:3.5rem; height:3.5rem; border-radius:9999px; border:3px solid #fff; margin-top:-1.75rem; margin-bottom:.75rem; box-shadow:0 2px 8px rgba(0,0,0,.12); }
.profile-name  { font-size:.875rem; font-weight:700; color:#18181b; }
.profile-role  { font-size:.75rem; color:#71717a; }`,
  },
];

/* ─────────────────────────────────────────────
   Code Block
───────────────────────────────────────────── */
function CodeBlock({ code, id, tab }: { code: string; id: string; tab: CodeTab }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }, [code]);
  // suppress unused-var warning for id
  void id;
  return (
    <div className="relative">
      <pre className="overflow-x-auto rounded-xl bg-zinc-950 p-4 text-[11.5px] leading-[1.7] text-zinc-300">
        <code>{code}</code>
      </pre>
      <button
        onClick={copy}
        className="absolute right-3 top-3 flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 px-2.5 py-1.5 text-[11px] font-medium text-zinc-400 transition hover:bg-zinc-700 hover:text-zinc-200"
      >
        {copied ? (
          <><Check size={11} className="text-emerald-400" /><span className="text-emerald-400">Copied!</span></>
        ) : (
          <><Copy size={11} /> Copy</>
        )}
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Component Card
───────────────────────────────────────────── */
function ComponentCard({ comp }: { comp: ComponentDef }) {
  const [tab, setTab] = useState<CodeTab>('tailwind');
  const Preview = comp.Preview;
  return (
    <div className="flex flex-col rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-start justify-between border-b border-zinc-100 px-5 py-4">
        <div>
          <h3 className="font-semibold text-zinc-800 text-[15px]">{comp.name}</h3>
          <p className="mt-0.5 text-xs text-zinc-500 leading-relaxed max-w-sm">{comp.description}</p>
        </div>
        <span className="ml-3 shrink-0 inline-flex rounded-full bg-zinc-100 px-2.5 py-0.5 text-[10px] font-semibold text-zinc-500">{comp.category}</span>
      </div>
      <div className="border-b border-zinc-100">
        <Preview />
      </div>
      <div>
        <div className="flex border-b border-zinc-100">
          {(['tailwind', 'css'] as CodeTab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-xs font-semibold border-b-2 -mb-px transition ${
                tab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-zinc-400 hover:text-zinc-600'
              }`}
            >
              {t === 'tailwind' ? 'Tailwind' : 'Plain CSS'}
            </button>
          ))}
        </div>
        <div className="p-3">
          <CodeBlock code={tab === 'tailwind' ? comp.tailwind : comp.css} id={comp.id} tab={tab} />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Categories
───────────────────────────────────────────── */
const CATEGORIES = ['All', 'Feedback', 'Navigation', 'Forms & Inputs', 'Display', 'Overlay', 'Layout'];

/* ─────────────────────────────────────────────
   Main Export
───────────────────────────────────────────── */
export default function UIComponentsClient() {
  const [activeCat, setActiveCat] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return COMPONENTS.filter((c) => {
      const matchCat = activeCat === 'All' || c.category === activeCat;
      const matchSearch = !q || c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [activeCat, search]);

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Hero */}
      <div className="border-b border-zinc-200 bg-white px-4 py-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 mb-4">
          ✦ {COMPONENTS.length} Components
        </div>
        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight sm:text-4xl">CSS UI Components</h1>
        <p className="mx-auto mt-3 max-w-xl text-zinc-500 text-sm leading-relaxed">
          Production-ready components with live previews. Copy Tailwind or plain CSS — no framework lock-in.
        </p>
        <div className="relative mx-auto mt-6 max-w-sm">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search components…"
            className="w-full rounded-xl border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-800 placeholder-zinc-400 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Category filter */}
      <div className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 backdrop-blur-md px-4 py-3">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                activeCat === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white border border-zinc-200 text-zinc-600 hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              {cat}
              {cat !== 'All' && (
                <span className="ml-1.5 text-[10px] opacity-70">{COMPONENTS.filter((c) => c.category === cat).length}</span>
              )}
            </button>
          ))}
          <span className="ml-auto shrink-0 text-xs text-zinc-400">{filtered.length} component{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-zinc-400">
            <Search size={40} className="mb-4 opacity-30" />
            <p className="text-lg font-medium">No components found</p>
            <p className="text-sm mt-1">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
            {filtered.map((comp) => (
              <ComponentCard key={comp.id} comp={comp} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
