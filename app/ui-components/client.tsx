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
const CATEGORIES = ['All', 'Feedback', 'Navigation', 'Forms & Inputs', 'Display', 'Overlay'];

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
