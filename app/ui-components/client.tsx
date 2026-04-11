'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  Check, Copy, Search, ChevronRight, ChevronDown, X,
  Bell, Settings, User, Mail, Lock,
  AlertCircle, CheckCircle, XCircle, Info, MoreHorizontal,
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
   48 New Preview Components
───────────────────────────────────────────── */

/* ── FORMS ── */

function FloatingLabelPreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs space-y-5">
        {['Email address', 'Full name', 'Company'].map((label) => (
          <div key={label} className="group relative">
            <input
              placeholder=" "
              className="peer w-full rounded-xl border border-zinc-300 bg-white px-4 pb-2.5 pt-5 text-sm text-zinc-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
            <label className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-zinc-400 transition-all peer-focus:top-3 peer-focus:-translate-y-0 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:text-blue-600 peer-not-placeholder-shown:top-3 peer-not-placeholder-shown:-translate-y-0 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-zinc-500">
              {label}
            </label>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function OTPInputPreview() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const refs = Array.from({ length: 6 }, () => null) as (HTMLInputElement | null)[];
  const handleChange = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp]; next[i] = val.slice(-1);
    setOtp(next);
    if (val && refs[i + 1]) refs[i + 1]!.focus();
  };
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="space-y-4 text-center">
        <p className="text-sm font-semibold text-zinc-700">Enter verification code</p>
        <div className="flex justify-center gap-2">
          {otp.map((v, i) => (
            <input key={i} type="text" maxLength={1} value={v}
              ref={(el) => { refs[i] = el; }}
              onChange={(e) => handleChange(i, e.target.value)}
              className={`h-11 w-10 rounded-xl border-2 text-center text-lg font-bold outline-none transition ${v ? 'border-blue-600 text-blue-700 bg-blue-50' : 'border-zinc-300 bg-white text-zinc-800'} focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
            />
          ))}
        </div>
        <p className="text-xs text-zinc-400">Sent to ••••••••@email.com</p>
        <button className="text-xs font-semibold text-blue-600 hover:underline">Resend code</button>
      </div>
    </PreviewWrap>
  );
}

function PasswordStrengthPreview() {
  const [pw, setPw] = useState('');
  const checks = [/[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/, /.{8,}/];
  const labels = ['Uppercase', 'Number', 'Special char', '8+ chars'];
  const score = checks.filter((r) => r.test(pw)).length;
  const bars = ['bg-red-500', 'bg-orange-400', 'bg-yellow-400', 'bg-emerald-500'];
  const words = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs space-y-3">
        <div className="relative">
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)}
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            placeholder="Enter password…" />
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i < score ? bars[score - 1] : 'bg-zinc-200'}`} />
          ))}
        </div>
        {score > 0 && <p className={`text-xs font-semibold ${['', 'text-red-500', 'text-orange-400', 'text-yellow-500', 'text-emerald-600'][score]}`}>{words[score]}</p>}
        <div className="grid grid-cols-2 gap-1">
          {labels.map((l, i) => (
            <div key={l} className={`flex items-center gap-1.5 text-[11px] font-medium ${checks[i].test(pw) ? 'text-emerald-600' : 'text-zinc-400'}`}>
              <span>{checks[i].test(pw) ? '✓' : '○'}</span>{l}
            </div>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function NumberStepperPreview() {
  const [counts, setCounts] = useState([1, 0, 3]);
  const labels = ['Adults', 'Children', 'Rooms'];
  return (
    <PreviewWrap>
      <div className="space-y-3 w-full max-w-xs">
        {counts.map((c, i) => (
          <div key={labels[i]} className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-700">{labels[i]}</span>
            <div className="flex items-center gap-0 rounded-xl border border-zinc-200 overflow-hidden shadow-sm">
              <button onClick={() => setCounts((p) => p.map((v, j) => j === i ? Math.max(0, v - 1) : v))}
                className="h-9 w-9 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition font-bold text-lg">−</button>
              <span className="w-8 text-center text-sm font-bold text-zinc-800">{c}</span>
              <button onClick={() => setCounts((p) => p.map((v, j) => j === i ? Math.min(10, v + 1) : v))}
                className="h-9 w-9 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition font-bold text-lg">+</button>
            </div>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function ColorPickerInputPreview() {
  const [color, setColor] = useState('#3b82f6');
  const presets = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6'];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs space-y-3">
        <div className="flex items-center gap-3 rounded-xl border border-zinc-300 bg-white px-3 py-2.5 shadow-sm">
          <div className="relative h-8 w-8 shrink-0 rounded-lg overflow-hidden border border-zinc-200 cursor-pointer shadow-inner" style={{ background: color }}>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
          </div>
          <input value={color} onChange={(e) => setColor(e.target.value)}
            className="flex-1 bg-transparent font-mono text-sm text-zinc-700 outline-none uppercase" maxLength={7} />
          <span className="text-xs text-zinc-400 font-medium">HEX</span>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {presets.map((c) => (
            <button key={c} onClick={() => setColor(c)}
              className={`h-7 w-7 rounded-lg border-2 transition ${color === c ? 'border-zinc-700 scale-110' : 'border-transparent hover:scale-110'}`}
              style={{ background: c }} />
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function PhoneInputPreview() {
  const [code, setCode] = useState('+1');
  const codes = ['+1', '+44', '+91', '+61', '+49', '+33'];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs space-y-3">
        <div className="flex overflow-hidden rounded-xl border border-zinc-300 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition">
          <select value={code} onChange={(e) => setCode(e.target.value)}
            className="shrink-0 appearance-none bg-zinc-100 px-3 text-sm font-medium text-zinc-700 outline-none border-r border-zinc-300 cursor-pointer">
            {codes.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input type="tel" placeholder="(555) 000-0000"
            className="flex-1 bg-white px-4 py-2.5 text-sm text-zinc-800 placeholder-zinc-400 outline-none" />
        </div>
        <p className="text-[11px] text-zinc-400">We'll send a verification code to this number</p>
      </div>
    </PreviewWrap>
  );
}

function DateInputPreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs space-y-3">
        <div className="relative">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-base">📅</span>
          <input type="date" className="w-full rounded-xl border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-700 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" />
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">📅</span>
            <input type="date" placeholder="Start" className="w-full rounded-xl border border-zinc-300 bg-white py-2 pl-8 pr-2 text-xs text-zinc-700 outline-none focus:border-blue-500 transition" />
          </div>
          <span className="flex items-center text-zinc-400 text-sm">→</span>
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">📅</span>
            <input type="date" placeholder="End" className="w-full rounded-xl border border-zinc-300 bg-white py-2 pl-8 pr-2 text-xs text-zinc-700 outline-none focus:border-blue-500 transition" />
          </div>
        </div>
      </div>
    </PreviewWrap>
  );
}

function MultiSelectPreview() {
  const opts = ['Design', 'Development', 'Marketing', 'Analytics', 'Support'];
  const [selected, setSelected] = useState<string[]>(['Design', 'Development']);
  const [open, setOpen] = useState(false);
  const toggle = (o: string) => setSelected((p) => p.includes(o) ? p.filter((x) => x !== o) : [...p, o]);
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="relative w-full max-w-xs">
        <button onClick={() => setOpen((o) => !o)}
          className="flex w-full flex-wrap items-center gap-1.5 rounded-xl border border-zinc-300 bg-white p-2.5 min-h-[2.75rem] text-left shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition">
          {selected.length === 0 && <span className="text-sm text-zinc-400 px-1.5">Select options…</span>}
          {selected.map((s) => (
            <span key={s} className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
              {s} <span onClick={(e) => { e.stopPropagation(); toggle(s); }} className="text-blue-400 hover:text-blue-700 cursor-pointer">×</span>
            </span>
          ))}
          <ChevronDown size={14} className={`ml-auto text-zinc-400 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-zinc-200 bg-white shadow-xl z-20 py-1">
            {opts.map((o) => (
              <button key={o} onClick={() => toggle(o)}
                className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 transition">
                <div className={`h-4 w-4 rounded border-2 flex items-center justify-center transition ${selected.includes(o) ? 'border-blue-600 bg-blue-600' : 'border-zinc-300'}`}>
                  {selected.includes(o) && <Check size={9} className="text-white" strokeWidth={3} />}
                </div>
                {o}
              </button>
            ))}
          </div>
        )}
      </div>
    </PreviewWrap>
  );
}

function CreditCardPreview() {
  const [num, setNum] = useState('');
  const fmt = (v: string) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs space-y-3">
        <div className="rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 p-5 text-white shadow-xl">
          <div className="flex justify-between items-start">
            <div className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">Credit Card</div>
            <div className="text-2xl">💳</div>
          </div>
          <div className="mt-4 font-mono text-lg tracking-widest">{fmt(num) || '•••• •••• •••• ••••'}</div>
          <div className="mt-3 flex justify-between text-[10px] text-zinc-400">
            <div><div className="text-zinc-500 text-[9px] uppercase">Card Holder</div><div className="text-white text-xs font-medium mt-0.5">John Doe</div></div>
            <div className="text-right"><div className="text-zinc-500 text-[9px] uppercase">Expires</div><div className="text-white text-xs font-medium mt-0.5">12/26</div></div>
          </div>
        </div>
        <input value={fmt(num)} onChange={(e) => setNum(e.target.value.replace(/\s/g, ''))}
          placeholder="1234 5678 9012 3456"
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 font-mono text-sm text-zinc-800 placeholder-zinc-400 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" />
        <div className="flex gap-3">
          <input placeholder="MM/YY" maxLength={5} className="flex-1 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" />
          <input placeholder="CVV" maxLength={3} className="w-20 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" />
        </div>
      </div>
    </PreviewWrap>
  );
}

function SwitchGroupPreview() {
  const [vals, setVals] = useState<Record<string, boolean>>({ emails: true, push: false, sms: true, weekly: false });
  const items = [
    { key: 'emails', label: 'Email Notifications', sub: 'Receive updates via email' },
    { key: 'push', label: 'Push Notifications', sub: 'Alerts on your device' },
    { key: 'sms', label: 'SMS Alerts', sub: 'Text message notifications' },
    { key: 'weekly', label: 'Weekly Digest', sub: 'Summary every Monday' },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs divide-y divide-zinc-100 rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
        {items.map((item) => (
          <div key={item.key} className="flex items-center justify-between px-4 py-3.5">
            <div>
              <p className="text-sm font-medium text-zinc-800">{item.label}</p>
              <p className="text-[11px] text-zinc-400 mt-0.5">{item.sub}</p>
            </div>
            <button onClick={() => setVals((p) => ({ ...p, [item.key]: !p[item.key] }))}
              className={`relative h-6 w-11 rounded-full transition-colors shrink-0 ml-4 ${vals[item.key] ? 'bg-blue-600' : 'bg-zinc-300'}`}>
              <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${vals[item.key] ? 'translate-x-5' : ''}`} />
            </button>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

/* ── DISPLAY ── */

function DonutChartPreview() {
  const segments = [
    { label: 'Design', pct: 35, color: '#3b82f6' },
    { label: 'Dev', pct: 45, color: '#10b981' },
    { label: 'Marketing', pct: 20, color: '#f59e0b' },
  ];
  let offset = 0;
  const r = 40; const circ = 2 * Math.PI * r;
  return (
    <PreviewWrap>
      <div className="flex items-center gap-6">
        <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90">
          {segments.map((s) => {
            const dash = (s.pct / 100) * circ;
            const el = (
              <circle key={s.label} cx="50" cy="50" r={r}
                fill="none" stroke={s.color} strokeWidth="12"
                strokeDasharray={`${dash} ${circ - dash}`}
                strokeDashoffset={-offset * circ / 100}
              />
            );
            offset += s.pct; return el;
          })}
        </svg>
        <div className="space-y-2">
          {segments.map((s) => (
            <div key={s.label} className="flex items-center gap-2 text-xs">
              <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: s.color }} />
              <span className="text-zinc-600">{s.label}</span>
              <span className="font-bold text-zinc-800 ml-auto pl-2">{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function BarChartPreview() {
  const data = [
    { label: 'Mon', val: 65 }, { label: 'Tue', val: 78 }, { label: 'Wed', val: 52 },
    { label: 'Thu', val: 91 }, { label: 'Fri', val: 84 }, { label: 'Sat', val: 43 }, { label: 'Sun', val: 29 },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-sm">
        <div className="flex items-end justify-between gap-2 h-28 px-2">
          {data.map((d) => (
            <div key={d.label} className="flex flex-col items-center gap-1 flex-1">
              <span className="text-[9px] font-bold text-zinc-500">{d.val}</span>
              <div className="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-blue-400 transition-all hover:from-blue-700 hover:to-blue-500 cursor-pointer"
                style={{ height: `${(d.val / 100) * 80}px` }} />
            </div>
          ))}
        </div>
        <div className="flex justify-between gap-2 px-2 mt-1">
          {data.map((d) => <span key={d.label} className="flex-1 text-center text-[9px] text-zinc-400">{d.label}</span>)}
        </div>
      </div>
    </PreviewWrap>
  );
}

function TestimonialPreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="space-y-3 w-full max-w-sm">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex gap-0.5 mb-3">{Array(5).fill(0).map((_, i) => <span key={i} className="text-amber-400 text-sm">★</span>)}</div>
          <p className="text-sm text-zinc-600 leading-relaxed italic">&ldquo;This is hands down the best component library I&rsquo;ve used. Saved our team weeks of work and the code quality is exceptional.&rdquo;</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">SM</div>
            <div>
              <p className="text-sm font-semibold text-zinc-800">Sarah Miller</p>
              <p className="text-xs text-zinc-400">CTO at TechCorp</p>
            </div>
          </div>
        </div>
      </div>
    </PreviewWrap>
  );
}

function FeedPostPreview() {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(142);
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold">JD</div>
            <div><p className="text-sm font-semibold text-zinc-800">Jane Doe</p><p className="text-xs text-zinc-400">2 hours ago · 🌍</p></div>
          </div>
          <button className="text-zinc-400 hover:text-zinc-600 transition"><MoreHorizontal size={18}/></button>
        </div>
        <div className="px-4 pb-3">
          <p className="text-sm text-zinc-700 leading-relaxed">Just shipped the new design system! 🎉 Took 3 months but it&apos;s finally live. Check out the docs and let me know what you think!</p>
        </div>
        <div className="h-28 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-4xl">🎨</div>
        <div className="flex items-center gap-4 px-4 py-3 border-t border-zinc-100">
          <button onClick={() => { setLiked((l) => !l); setLikes((n) => n + (liked ? -1 : 1)); }}
            className={`flex items-center gap-1.5 text-xs font-medium transition ${liked ? 'text-red-500' : 'text-zinc-500 hover:text-red-500'}`}>
            <span className="text-base">{liked ? '❤️' : '🤍'}</span>{likes}
          </button>
          <button className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-blue-600 transition"><span className="text-base">💬</span>24</button>
          <button className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-emerald-600 transition"><span className="text-base">↗️</span>Share</button>
        </div>
      </div>
    </PreviewWrap>
  );
}

function CommentPreview() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { name: 'Alex Chen', time: '5m ago', text: 'Great component! Love the clean design.', avatar: 'AC', replies: 2 },
    { name: 'Maria López', time: '12m ago', text: 'How do I customize the colors?', avatar: 'ML', replies: 0 },
  ]);
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-sm space-y-3">
        <div className="flex gap-3">
          <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold">You</div>
          <div className="flex-1 flex gap-2">
            <input value={comment} onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment…"
              className="flex-1 rounded-xl border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" />
            <button onClick={() => { if (comment.trim()) { setComments((p) => [{ name: 'You', time: 'now', text: comment, avatar: 'You', replies: 0 }, ...p]); setComment(''); }}}
              className="rounded-xl bg-blue-600 px-3 text-xs font-semibold text-white hover:bg-blue-700 transition">Post</button>
          </div>
        </div>
        <div className="space-y-3">
          {comments.map((c, i) => (
            <div key={i} className="flex gap-3">
              <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-zinc-400 to-zinc-500 flex items-center justify-center text-white text-[9px] font-bold">{c.avatar}</div>
              <div className="flex-1 rounded-xl bg-white border border-zinc-100 px-3 py-2.5 shadow-sm">
                <div className="flex items-center gap-2"><p className="text-xs font-semibold text-zinc-800">{c.name}</p><p className="text-[10px] text-zinc-400">{c.time}</p></div>
                <p className="mt-0.5 text-xs text-zinc-600">{c.text}</p>
                {c.replies > 0 && <button className="mt-1 text-[11px] font-medium text-blue-600 hover:underline">{c.replies} replies</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function FileCardPreview() {
  const files = [
    { name: 'design-system.fig', size: '24.5 MB', icon: '🎨', color: 'bg-purple-100 text-purple-600' },
    { name: 'report-Q4.pdf', size: '2.1 MB', icon: '📄', color: 'bg-red-100 text-red-600' },
    { name: 'data-export.xlsx', size: '856 KB', icon: '📊', color: 'bg-emerald-100 text-emerald-600' },
    { name: 'assets.zip', size: '128 MB', icon: '📦', color: 'bg-amber-100 text-amber-600' },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
        {files.map((f) => (
          <div key={f.name} className="rounded-xl border border-zinc-200 bg-white p-3 hover:shadow-md transition cursor-pointer group">
            <div className={`h-10 w-10 rounded-xl ${f.color} flex items-center justify-center text-xl mb-2`}>{f.icon}</div>
            <p className="text-xs font-semibold text-zinc-800 truncate group-hover:text-blue-600 transition">{f.name}</p>
            <p className="text-[10px] text-zinc-400 mt-0.5">{f.size}</p>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function ComparisonTablePreview() {
  const features = ['Unlimited projects', 'Custom domain', 'Analytics', 'API access', 'Priority support', 'White label'];
  const plans: Record<string, boolean[]> = {
    Free:  [true, false, false, false, false, false],
    Pro:   [true, true,  true,  true,  false, false],
    Enterprise: [true, true, true, true, true, true],
  };
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-xs text-center">
          <thead>
            <tr>
              <th className="text-left py-2 pr-3 text-zinc-500 font-medium text-[11px]">Feature</th>
              {Object.keys(plans).map((p) => (
                <th key={p} className={`py-2 px-2 font-bold text-[11px] ${p === 'Pro' ? 'text-blue-600' : 'text-zinc-700'}`}>{p}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {features.map((f, i) => (
              <tr key={f} className="hover:bg-zinc-50">
                <td className="py-2 pr-3 text-left text-[11px] text-zinc-600">{f}</td>
                {Object.values(plans).map((vals, j) => (
                  <td key={j} className="py-2 px-2">
                    {vals[i] ? <span className="text-emerald-500 font-bold">✓</span> : <span className="text-zinc-300">–</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PreviewWrap>
  );
}

function TeamCardPreview() {
  const team = [
    { name: 'Alex Chen', role: 'CEO', avatar: 'AC', grad: 'from-blue-400 to-indigo-500' },
    { name: 'Sara Kim', role: 'Design', avatar: 'SK', grad: 'from-rose-400 to-pink-500' },
    { name: 'Tom Lee', role: 'Engineer', avatar: 'TL', grad: 'from-emerald-400 to-teal-500' },
    { name: 'Mia Wang', role: 'Marketing', avatar: 'MW', grad: 'from-amber-400 to-orange-500' },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
        {team.map((m) => (
          <div key={m.name} className="rounded-2xl border border-zinc-200 bg-white p-4 text-center hover:shadow-md transition">
            <div className={`mx-auto h-12 w-12 rounded-full bg-gradient-to-br ${m.grad} flex items-center justify-center text-white font-bold text-sm mb-2`}>{m.avatar}</div>
            <p className="text-xs font-bold text-zinc-800">{m.name}</p>
            <p className="text-[10px] text-zinc-400 mt-0.5">{m.role}</p>
            <div className="mt-2 flex justify-center gap-2">
              {['𝕏', 'in', '✉'].map((icon) => (
                <button key={icon} className="h-6 w-6 rounded-full bg-zinc-100 hover:bg-zinc-200 text-[10px] text-zinc-500 transition flex items-center justify-center">{icon}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function OrderSummaryPreview() {
  const items = [
    { name: 'Pro Plan', qty: 1, price: 29 },
    { name: 'Extra Seat', qty: 3, price: 9 },
    { name: 'Storage Add-on', qty: 1, price: 5 },
  ];
  const subtotal = items.reduce((a, i) => a + i.qty * i.price, 0);
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-zinc-100 px-4 py-3">
          <p className="text-sm font-bold text-zinc-800">Order Summary</p>
        </div>
        <div className="divide-y divide-zinc-50 px-4">
          {items.map((item) => (
            <div key={item.name} className="flex items-center justify-between py-2.5">
              <div><p className="text-xs font-medium text-zinc-800">{item.name}</p><p className="text-[10px] text-zinc-400">×{item.qty}</p></div>
              <p className="text-xs font-semibold text-zinc-700">${(item.qty * item.price).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-zinc-200 px-4 py-3 space-y-1.5">
          <div className="flex justify-between text-xs text-zinc-500"><span>Subtotal</span><span>${subtotal}</span></div>
          <div className="flex justify-between text-xs text-zinc-500"><span>Tax (10%)</span><span>${(subtotal * 0.1).toFixed(2)}</span></div>
          <div className="flex justify-between text-sm font-bold text-zinc-800 pt-1 border-t border-zinc-100"><span>Total</span><span>${(subtotal * 1.1).toFixed(2)}</span></div>
        </div>
        <div className="px-4 pb-4"><button className="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition">Checkout</button></div>
      </div>
    </PreviewWrap>
  );
}

function MetricSparklinePreview() {
  const data = [30, 45, 28, 60, 75, 52, 90, 68, 85, 95];
  const max = Math.max(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - (v / max) * 80}`).join(' ');
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {[
          { label: 'Revenue', val: '$12,845', change: '+18%', up: true, color: '#3b82f6' },
          { label: 'Users', val: '4,291', change: '+6%', up: true, color: '#10b981' },
          { label: 'Bounce Rate', val: '32.4%', change: '-3%', up: false, color: '#ef4444' },
          { label: 'Sessions', val: '9,832', change: '+12%', up: true, color: '#8b5cf6' },
        ].map((m) => (
          <div key={m.label} className="rounded-xl border border-zinc-200 bg-white p-3 shadow-sm">
            <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-wide">{m.label}</p>
            <p className="mt-1 text-lg font-bold text-zinc-800">{m.val}</p>
            <div className="mt-2">
              <svg viewBox="0 0 100 100" className="h-8 w-full" preserveAspectRatio="none">
                <polyline fill="none" stroke={m.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={pts} />
              </svg>
            </div>
            <span className={`text-[10px] font-bold ${m.up ? 'text-emerald-600' : 'text-red-500'}`}>{m.change}</span>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function HeatmapPreview() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeks = 15;
  const vals = Array.from({ length: weeks * 7 }, () => Math.floor(Math.random() * 5));
  const colors = ['bg-zinc-100', 'bg-emerald-200', 'bg-emerald-300', 'bg-emerald-500', 'bg-emerald-700'];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="space-y-1">
        <div className="flex gap-1">
          <div className="w-6" />
          {Array.from({ length: weeks }, (_, i) => (
            <div key={i} className="w-3 text-[8px] text-zinc-300 text-center">{i % 4 === 0 ? `W${i + 1}` : ''}</div>
          ))}
        </div>
        {days.map((day, di) => (
          <div key={day} className="flex items-center gap-1">
            <span className="w-6 text-[9px] text-zinc-400 text-right">{day.slice(0, 2)}</span>
            {Array.from({ length: weeks }, (_, wi) => (
              <div key={wi} className={`h-3 w-3 rounded-sm ${colors[vals[wi * 7 + di]]}`} title={`${vals[wi * 7 + di]} contributions`} />
            ))}
          </div>
        ))}
        <div className="flex items-center gap-1 mt-1 justify-end">
          <span className="text-[9px] text-zinc-400">Less</span>
          {colors.map((c, i) => <div key={i} className={`h-2.5 w-2.5 rounded-sm ${c}`} />)}
          <span className="text-[9px] text-zinc-400">More</span>
        </div>
      </div>
    </PreviewWrap>
  );
}

function QuotePreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="space-y-3 w-full max-w-sm">
        <blockquote className="rounded-2xl border-l-4 border-blue-500 bg-blue-50 px-5 py-4">
          <p className="text-sm text-blue-900 italic leading-relaxed">&ldquo;Design is not just what it looks like and feels like. Design is how it works.&rdquo;</p>
          <footer className="mt-2 text-xs font-semibold text-blue-600">— Steve Jobs</footer>
        </blockquote>
        <blockquote className="rounded-2xl bg-zinc-900 px-5 py-4">
          <p className="text-2xl text-zinc-400 font-serif leading-none mb-2">&ldquo;</p>
          <p className="text-sm text-zinc-300 leading-relaxed">Any sufficiently advanced technology is indistinguishable from magic.</p>
          <footer className="mt-2 text-xs text-zinc-500">— Arthur C. Clarke</footer>
        </blockquote>
      </div>
    </PreviewWrap>
  );
}

function ImageCardPreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="flex gap-3 flex-wrap justify-center">
        <div className="relative w-40 h-28 rounded-2xl overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700" />
          <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/70 via-transparent">
            <p className="text-white text-xs font-bold">Mountain Vista</p>
            <p className="text-white/70 text-[10px]">Photography</p>
          </div>
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <span className="text-white text-2xl">🔍</span>
          </div>
        </div>
        <div className="relative w-40 h-28 rounded-2xl overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-orange-400" />
          <div className="absolute top-2 right-2"><span className="rounded-full bg-white/20 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-white">New</span></div>
          <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/60 via-transparent">
            <p className="text-white text-xs font-bold">Sunset Glow</p>
            <div className="flex items-center gap-1 mt-0.5"><span className="text-amber-300 text-[10px]">★★★★★</span></div>
          </div>
        </div>
      </div>
    </PreviewWrap>
  );
}

/* ── NAVIGATION ── */

function BottomNavPreview() {
  const [active, setActive] = useState('home');
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'search', icon: '🔍', label: 'Search' },
    { id: 'notif', icon: '🔔', label: 'Alerts', badge: 3 },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ];
  return (
    <PreviewWrap bg="bg-zinc-100">
      <div className="w-full max-w-xs overflow-hidden rounded-2xl border border-zinc-200 shadow-lg">
        <div className="h-28 bg-white flex items-center justify-center">
          <p className="text-zinc-400 text-sm">App Content</p>
        </div>
        <nav className="flex bg-white border-t border-zinc-200">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActive(t.id)}
              className={`relative flex flex-1 flex-col items-center py-2.5 gap-0.5 transition ${active === t.id ? 'text-blue-600' : 'text-zinc-400 hover:text-zinc-600'}`}>
              <span className="text-lg leading-none">{t.icon}</span>
              <span className="text-[9px] font-medium">{t.label}</span>
              {t.badge && <span className="absolute top-1.5 right-3 h-3.5 min-w-[14px] rounded-full bg-red-500 text-[8px] font-bold text-white flex items-center justify-center px-0.5">{t.badge}</span>}
              {active === t.id && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-5 rounded-full bg-blue-600" />}
            </button>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

function DrawerPreview() {
  const [open, setOpen] = useState(false);
  return (
    <PreviewWrap>
      <button onClick={() => setOpen(true)} className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-900 transition">Open Drawer</button>
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative ml-auto h-full w-72 bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
              <h3 className="font-semibold text-zinc-800">Side Panel</h3>
              <button onClick={() => setOpen(false)} className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100"><X size={18}/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {['Account settings', 'Billing & plans', 'Team members', 'Integrations', 'API keys', 'Help & docs'].map((item) => (
                <button key={item} className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition">
                  {item}<ChevronRight size={14} className="text-zinc-300"/>
                </button>
              ))}
            </div>
            <div className="border-t border-zinc-100 p-4">
              <button className="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition">Upgrade Plan</button>
            </div>
          </div>
        </div>
      )}
    </PreviewWrap>
  );
}

function CommandPalettePreview() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const cmds = ['Dashboard', 'Analytics', 'Settings', 'Users', 'Reports', 'Billing', 'API Keys', 'Logout'];
  const filtered = cmds.filter((c) => c.toLowerCase().includes(q.toLowerCase()));
  return (
    <PreviewWrap>
      <div>
        <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-500 shadow-sm hover:bg-zinc-50 transition">
          <Search size={14}/> Search commands…<kbd className="ml-2 rounded border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
        </button>
        {open && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" onClick={() => setOpen(false)}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"/>
            <div className="relative w-full max-w-md mx-4 rounded-2xl bg-white shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3 border-b border-zinc-100 px-4 py-3">
                <Search size={16} className="text-zinc-400 shrink-0"/>
                <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search commands…"
                  className="flex-1 text-sm text-zinc-800 outline-none placeholder-zinc-400"/>
                <kbd className="rounded border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">ESC</kbd>
              </div>
              <div className="max-h-60 overflow-y-auto py-2">
                {filtered.length === 0 ? <p className="px-4 py-6 text-center text-sm text-zinc-400">No results found</p> : filtered.map((cmd) => (
                  <button key={cmd} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-blue-50 hover:text-blue-700 transition">
                    <span className="text-zinc-400">→</span>{cmd}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </PreviewWrap>
  );
}

function FABPreview() {
  const [open, setOpen] = useState(false);
  const actions = [{ icon: '✏️', label: 'New post' }, { icon: '📁', label: 'Upload file' }, { icon: '👤', label: 'Add user' }];
  return (
    <PreviewWrap bg="bg-zinc-100">
      <div className="relative h-36 w-full max-w-xs rounded-xl bg-zinc-50 border border-zinc-200">
        <p className="absolute inset-0 flex items-center justify-center text-zinc-400 text-xs">App Background</p>
        <div className="absolute bottom-3 right-3 flex flex-col-reverse items-end gap-2">
          {open && actions.map((a) => (
            <div key={a.label} className="flex items-center gap-2">
              <span className="rounded-lg bg-white shadow-md px-2.5 py-1 text-xs font-medium text-zinc-700">{a.label}</span>
              <button className="h-9 w-9 rounded-full bg-white shadow-md flex items-center justify-center text-base hover:scale-110 transition">{a.icon}</button>
            </div>
          ))}
          <button onClick={() => setOpen((o) => !o)}
            className={`h-12 w-12 rounded-full bg-blue-600 shadow-lg flex items-center justify-center text-white text-xl transition-transform hover:bg-blue-700 ${open ? 'rotate-45' : ''}`}>+</button>
        </div>
      </div>
    </PreviewWrap>
  );
}

function BackToTopPreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="space-y-3 text-center">
        <p className="text-xs text-zinc-500">Scroll-triggered back-to-top button</p>
        <div className="flex gap-3 justify-center">
          <button className="h-10 w-10 rounded-full bg-blue-600 shadow-lg flex items-center justify-center text-white text-lg hover:bg-blue-700 hover:-translate-y-1 transition-all">↑</button>
          <button className="h-10 w-10 rounded-full bg-zinc-800 shadow-lg flex items-center justify-center text-white text-lg hover:bg-zinc-900 hover:-translate-y-1 transition-all">↑</button>
          <button className="flex items-center gap-2 rounded-full bg-white border border-zinc-200 shadow-lg px-4 py-2 text-xs font-semibold text-zinc-700 hover:-translate-y-1 transition-all">↑ Back to top</button>
        </div>
        <p className="text-[10px] text-zinc-400">Fixed bottom-right after scrolling 300px</p>
      </div>
    </PreviewWrap>
  );
}

/* ── FEEDBACK ── */

function CircularProgressPreview() {
  const rings = [
    { pct: 75, color: '#3b82f6', label: 'Storage', val: '75%' },
    { pct: 48, color: '#10b981', label: 'CPU', val: '48%' },
    { pct: 92, color: '#f59e0b', label: 'Memory', val: '92%' },
  ];
  return (
    <PreviewWrap>
      <div className="flex gap-5 flex-wrap justify-center">
        {rings.map((r) => {
          const radius = 30, circ = 2 * Math.PI * radius;
          const dash = (r.pct / 100) * circ;
          return (
            <div key={r.label} className="flex flex-col items-center gap-2">
              <div className="relative">
                <svg width="80" height="80" viewBox="0 0 80 80" className="-rotate-90">
                  <circle cx="40" cy="40" r={radius} fill="none" stroke="#e4e4e7" strokeWidth="8" />
                  <circle cx="40" cy="40" r={radius} fill="none" stroke={r.color} strokeWidth="8"
                    strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-zinc-800">{r.val}</span>
                </div>
              </div>
              <span className="text-xs font-medium text-zinc-500">{r.label}</span>
            </div>
          );
        })}
      </div>
    </PreviewWrap>
  );
}

function StatusBannerPreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-sm space-y-2">
        {[
          { bg: 'bg-blue-600', icon: '📢', text: 'System maintenance on Dec 31 at 2AM UTC.', btn: 'Learn more' },
          { bg: 'bg-emerald-600', icon: '✅', text: 'All systems are operational.', btn: 'Status page' },
          { bg: 'bg-amber-500', icon: '⚠️', text: 'Degraded performance on API v2.', btn: 'View details' },
          { bg: 'bg-red-600', icon: '🚨', text: 'Critical incident in progress. Team notified.', btn: 'Updates' },
        ].map((b) => (
          <div key={b.text} className={`${b.bg} flex items-center gap-3 rounded-xl px-4 py-2.5`}>
            <span className="text-base shrink-0">{b.icon}</span>
            <p className="flex-1 text-xs font-medium text-white">{b.text}</p>
            <button className="shrink-0 rounded-lg bg-white/20 hover:bg-white/30 px-2.5 py-1 text-[10px] font-bold text-white transition">{b.btn}</button>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function ConfirmDialogPreview() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  return (
    <PreviewWrap>
      <div className="space-y-3 text-center">
        {done && <p className="text-xs font-semibold text-emerald-600">✓ Action confirmed!</p>}
        <button onClick={() => { setOpen(true); setDone(false); }} className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition">Delete Account</button>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <div className="relative w-80 mx-4 rounded-2xl bg-white shadow-2xl p-6 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-2xl mb-4">🗑️</div>
              <h3 className="font-bold text-zinc-800">Delete Account?</h3>
              <p className="mt-2 text-xs text-zinc-500 leading-relaxed">This will permanently delete your account and all data. This action cannot be undone.</p>
              <div className="mt-5 flex gap-2">
                <button onClick={() => setOpen(false)} className="flex-1 rounded-xl border border-zinc-200 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition">Cancel</button>
                <button onClick={() => { setOpen(false); setDone(true); }} className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-bold text-white hover:bg-red-600 transition">Yes, delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PreviewWrap>
  );
}

function LoadingOverlayPreview() {
  const [loading, setLoading] = useState(false);
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="relative w-full max-w-xs rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white/90 backdrop-blur-sm rounded-2xl">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-blue-600" />
            <p className="text-sm font-semibold text-zinc-700">Loading data…</p>
          </div>
        )}
        <div className="p-5 space-y-3">
          <div className="h-3 w-3/4 rounded-full bg-zinc-200" /><div className="h-3 w-full rounded-full bg-zinc-200" />
          <div className="h-3 w-5/6 rounded-full bg-zinc-200" /><div className="h-16 rounded-xl bg-zinc-100" />
        </div>
        <div className="border-t border-zinc-100 px-5 py-3">
          <button onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
            className="w-full rounded-xl bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition">
            {loading ? 'Loading…' : 'Trigger Loading'}
          </button>
        </div>
      </div>
    </PreviewWrap>
  );
}

function MultiStepProgressPreview() {
  const [step, setStep] = useState(1);
  const steps = ['Details', 'Payment', 'Review', 'Done'];
  const pct = (step / (steps.length - 1)) * 100;
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-sm space-y-4">
        <div className="relative">
          <div className="h-2 w-full rounded-full bg-zinc-200">
            <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-2 flex justify-between">
            {steps.map((s, i) => (
              <div key={s} className={`flex flex-col items-center gap-1 text-[10px] font-medium ${i <= step ? 'text-blue-600' : 'text-zinc-400'}`}>
                <div className={`-mt-5 h-4 w-4 rounded-full border-2 bg-white ${i <= step ? 'border-blue-600' : 'border-zinc-300'} flex items-center justify-center`}>
                  {i < step && <span className="text-[8px] text-blue-600">✓</span>}
                </div>
                {s}
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="rounded-lg border border-zinc-200 px-4 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-50 disabled:opacity-40 transition flex-1">Back</button>
          <button disabled={step === steps.length - 1} onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
            className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-40 transition flex-1">Next →</button>
        </div>
      </div>
    </PreviewWrap>
  );
}

/* ── OVERLAY ── */

function ContextMenuPreview() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const items = [
    { icon: '✏️', label: 'Edit' }, { icon: '📋', label: 'Copy' }, { icon: '📌', label: 'Pin' },
    null,
    { icon: '🗑️', label: 'Delete', danger: true },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="relative w-full max-w-xs">
        <div onContextMenu={(e) => { e.preventDefault(); setPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }); }}
          onClick={() => setPos(null)}
          className="flex h-24 items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-white text-xs text-zinc-400 cursor-context-menu select-none hover:border-zinc-400 transition">
          Right-click anywhere here
        </div>
        {pos && (
          <div className="absolute rounded-xl border border-zinc-200 bg-white shadow-xl py-1 z-20 w-40"
            style={{ left: pos.x, top: pos.y }}>
            {items.map((item, i) =>
              item === null ? <div key={i} className="my-1 border-t border-zinc-100" /> :
              <button key={item.label} onClick={() => setPos(null)}
                className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm transition ${item.danger ? 'text-red-500 hover:bg-red-50' : 'text-zinc-700 hover:bg-zinc-50'}`}>
                <span>{item.icon}</span>{item.label}
              </button>
            )}
          </div>
        )}
      </div>
    </PreviewWrap>
  );
}

function BottomSheetPreview() {
  const [open, setOpen] = useState(false);
  return (
    <PreviewWrap bg="bg-zinc-100">
      <div>
        <button onClick={() => setOpen(true)} className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-900 transition">Open Sheet</button>
        {open && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <div className="relative w-full max-w-md rounded-t-3xl bg-white shadow-2xl">
              <div className="flex justify-center pt-3 pb-1"><div className="h-1 w-10 rounded-full bg-zinc-200" /></div>
              <div className="px-6 pb-2 pt-3">
                <h3 className="font-bold text-zinc-800">Share this post</h3>
              </div>
              <div className="grid grid-cols-4 gap-3 px-6 py-4">
                {[{ icon: '📘', label: 'Facebook' }, { icon: '𝕏', label: 'Twitter' }, { icon: '📸', label: 'Instagram' }, { icon: '💼', label: 'LinkedIn' },
                  { icon: '📧', label: 'Email' }, { icon: '🔗', label: 'Copy link' }, { icon: '📨', label: 'Message' }, { icon: '⋯', label: 'More' }].map((a) => (
                  <button key={a.label} onClick={() => setOpen(false)}
                    className="flex flex-col items-center gap-1.5 rounded-xl p-2 hover:bg-zinc-50 transition">
                    <span className="text-xl">{a.icon}</span>
                    <span className="text-[10px] text-zinc-500">{a.label}</span>
                  </button>
                ))}
              </div>
              <div className="px-6 pb-6"><button onClick={() => setOpen(false)} className="w-full rounded-xl border border-zinc-200 py-3 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition">Cancel</button></div>
            </div>
          </div>
        )}
      </div>
    </PreviewWrap>
  );
}

function LightboxPreview() {
  const [active, setActive] = useState<number | null>(null);
  const imgs = [
    { grad: 'from-blue-500 to-indigo-600', emoji: '🏔️' },
    { grad: 'from-rose-500 to-pink-600', emoji: '🌸' },
    { grad: 'from-amber-500 to-orange-500', emoji: '🌅' },
    { grad: 'from-emerald-500 to-teal-600', emoji: '🌊' },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="grid grid-cols-4 gap-1.5 w-full max-w-xs">
        {imgs.map((img, i) => (
          <div key={i} onClick={() => setActive(i)}
            className={`aspect-square rounded-xl bg-gradient-to-br ${img.grad} flex items-center justify-center text-xl cursor-zoom-in hover:scale-105 transition`}>{img.emoji}</div>
        ))}
      </div>
      {active !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={() => setActive(null)}>
          <button onClick={(e) => { e.stopPropagation(); setActive((a) => ((a! - 1) + imgs.length) % imgs.length); }} className="absolute left-4 h-12 w-12 rounded-full bg-white/10 text-white text-2xl hover:bg-white/20 transition">‹</button>
          <div className={`h-64 w-64 rounded-3xl bg-gradient-to-br ${imgs[active].grad} flex items-center justify-center text-7xl shadow-2xl`}>{imgs[active].emoji}</div>
          <button onClick={(e) => { e.stopPropagation(); setActive((a) => (a! + 1) % imgs.length); }} className="absolute right-4 h-12 w-12 rounded-full bg-white/10 text-white text-2xl hover:bg-white/20 transition">›</button>
          <button onClick={() => setActive(null)} className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition flex items-center justify-center">✕</button>
          <div className="absolute bottom-4 flex gap-2">
            {imgs.map((_, i) => <button key={i} onClick={(e) => { e.stopPropagation(); setActive(i); }} className={`h-2 rounded-full transition-all ${i === active ? 'w-6 bg-white' : 'w-2 bg-white/40'}`} />)}
          </div>
        </div>
      )}
    </PreviewWrap>
  );
}

function SidePanelPreview() {
  const [open, setOpen] = useState(false);
  return (
    <PreviewWrap>
      <button onClick={() => setOpen(true)} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition">View Details</button>
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative ml-auto h-full w-80 bg-white shadow-2xl flex flex-col overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold mb-2">JD</div>
                  <h3 className="font-bold text-lg">Jane Doe</h3>
                  <p className="text-blue-200 text-xs">Senior Designer · SF</p>
                </div>
                <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white"><X size={18}/></button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {[['Email', 'jane@company.com'], ['Phone', '+1 (555) 234-5678'], ['Department', 'Design'], ['Start Date', 'Jan 15, 2022'], ['Salary', '$120,000/yr']].map(([k, v]) => (
                <div key={k}><p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{k}</p><p className="mt-0.5 text-sm text-zinc-700">{v}</p></div>
              ))}
            </div>
            <div className="border-t border-zinc-100 p-4 flex gap-2">
              <button className="flex-1 rounded-xl border border-zinc-200 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition">Message</button>
              <button className="flex-1 rounded-xl bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition">Edit</button>
            </div>
          </div>
        </div>
      )}
    </PreviewWrap>
  );
}

function CookieBannerPreview() {
  const [open, setOpen] = useState(true);
  const [prefs, setPrefs] = useState(false);
  return (
    <PreviewWrap bg="bg-zinc-100">
      <div className="relative w-full max-w-sm">
        {!open && <button onClick={() => setOpen(true)} className="w-full rounded-xl bg-zinc-800 py-2 text-xs font-semibold text-white hover:bg-zinc-900 transition">Show Cookie Banner</button>}
        {open && !prefs && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🍪</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-zinc-800">We use cookies</p>
                <p className="mt-0.5 text-xs text-zinc-500 leading-relaxed">We use cookies to enhance your experience, analyze site traffic, and serve personalized content.</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={() => setOpen(false)} className="flex-1 rounded-xl bg-blue-600 py-2 text-xs font-bold text-white hover:bg-blue-700 transition">Accept All</button>
              <button onClick={() => setPrefs(true)} className="flex-1 rounded-xl border border-zinc-200 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-50 transition">Manage</button>
              <button onClick={() => setOpen(false)} className="flex-1 rounded-xl border border-zinc-200 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-50 transition">Reject</button>
            </div>
          </div>
        )}
        {open && prefs && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl space-y-3">
            <p className="text-sm font-bold text-zinc-800">Cookie Preferences</p>
            {[{ label: 'Essential', sub: 'Required for the site to work', locked: true },
              { label: 'Analytics', sub: 'Help us improve our product' },
              { label: 'Marketing', sub: 'Personalised ads & content' }].map((c) => (
              <div key={c.label} className="flex items-center justify-between">
                <div><p className="text-xs font-semibold text-zinc-800">{c.label}</p><p className="text-[10px] text-zinc-400">{c.sub}</p></div>
                <div className={`h-5 w-9 rounded-full flex items-center px-0.5 ${c.locked ? 'bg-zinc-300' : 'bg-blue-600'}`}>
                  <div className={`h-4 w-4 rounded-full bg-white shadow transition-transform ${c.locked ? '' : 'translate-x-4'}`}/>
                </div>
              </div>
            ))}
            <button onClick={() => { setPrefs(false); setOpen(false); }} className="w-full rounded-xl bg-blue-600 py-2 text-xs font-bold text-white hover:bg-blue-700 transition">Save Preferences</button>
          </div>
        )}
      </div>
    </PreviewWrap>
  );
}

/* ── LAYOUT ── */

function HeroSectionPreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-zinc-200 shadow-sm">
        <div className="relative bg-gradient-to-br from-zinc-900 via-blue-950 to-indigo-900 px-8 py-10 text-center">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #8b5cf6 0%, transparent 50%)' }}/>
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 px-3 py-1 text-[10px] font-semibold text-blue-300 mb-4">✦ New release v2.0</span>
            <h2 className="text-xl font-black text-white leading-tight">Build faster with<br/><span className="text-blue-400">beautiful UI</span></h2>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">Production-ready components for your next project. No design skills needed.</p>
            <div className="mt-5 flex gap-2 justify-center">
              <button className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 transition">Get started →</button>
              <button className="rounded-xl border border-zinc-700 px-4 py-2 text-xs font-medium text-zinc-300 hover:border-zinc-500 transition">View docs</button>
            </div>
          </div>
        </div>
      </div>
    </PreviewWrap>
  );
}

function FeatureCardsPreview() {
  const features = [
    { icon: '⚡', title: 'Lightning Fast', desc: 'Optimized for speed.', color: 'bg-amber-100 text-amber-600' },
    { icon: '🔒', title: 'Secure', desc: 'Built-in security.', color: 'bg-blue-100 text-blue-600' },
    { icon: '📱', title: 'Responsive', desc: 'Works everywhere.', color: 'bg-purple-100 text-purple-600' },
    { icon: '🎨', title: 'Customizable', desc: 'Fully themeable.', color: 'bg-rose-100 text-rose-600' },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
        {features.map((f) => (
          <div key={f.title} className="rounded-2xl border border-zinc-200 bg-white p-4 hover:shadow-md transition">
            <div className={`h-9 w-9 rounded-xl ${f.color} flex items-center justify-center text-lg mb-3`}>{f.icon}</div>
            <p className="text-xs font-bold text-zinc-800">{f.title}</p>
            <p className="mt-1 text-[10px] text-zinc-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function CTABannerPreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-sm space-y-3">
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-white">Start free today</p>
            <p className="text-xs text-blue-200 mt-0.5">No credit card required.</p>
          </div>
          <button className="shrink-0 rounded-xl bg-white px-3 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 transition whitespace-nowrap">Get Started →</button>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 flex items-center justify-between gap-4 shadow-sm">
          <div>
            <p className="text-sm font-bold text-zinc-800">Upgrade to Pro</p>
            <p className="text-xs text-zinc-400 mt-0.5">Unlock all features.</p>
          </div>
          <button className="shrink-0 rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white hover:bg-blue-700 transition">Upgrade</button>
        </div>
      </div>
    </PreviewWrap>
  );
}

function FooterPreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 shadow-sm">
        <div className="bg-zinc-900 px-5 py-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-6 w-6 rounded-lg bg-blue-500 flex items-center justify-center text-white text-xs font-bold">A</div>
            <span className="text-sm font-bold text-white">AppName</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">Building the future of developer tooling, one component at a time.</p>
          <div className="mt-3 flex gap-2">
            {['𝕏', 'in', 'gh', 'yt'].map((s) => (
              <button key={s} className="h-7 w-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white text-xs transition flex items-center justify-center">{s}</button>
            ))}
          </div>
        </div>
        <div className="bg-zinc-800 px-5 py-3 grid grid-cols-3 gap-3">
          {[['Product', ['Features', 'Pricing', 'Changelog']], ['Company', ['About', 'Blog', 'Careers']], ['Legal', ['Privacy', 'Terms', 'Cookies']]].map(([title, links]) => (
            <div key={title as string}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">{title}</p>
              {(links as string[]).map((l) => <p key={l} className="text-[10px] text-zinc-400 hover:text-zinc-200 cursor-pointer transition mb-1">{l}</p>)}
            </div>
          ))}
        </div>
        <div className="bg-zinc-900 border-t border-zinc-800 px-5 py-2.5">
          <p className="text-[10px] text-zinc-600">© 2024 AppName. All rights reserved.</p>
        </div>
      </div>
    </PreviewWrap>
  );
}

function GridSystemPreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-sm space-y-2">
        {[['1/2', '1/2'], ['1/3', '1/3', '1/3'], ['1/4', '1/4', '1/2'], ['1/4', '3/4'], ['Full']].map((row, i) => (
          <div key={i} className="flex gap-1.5">
            {row.map((col, j) => (
              <div key={j} className="flex-1 rounded-lg border-2 border-dashed border-zinc-300 bg-blue-50 py-2.5 text-center">
                <span className="text-[10px] font-bold text-blue-500">{col}</span>
              </div>
            ))}
          </div>
        ))}
        <p className="text-[10px] text-zinc-400 text-center mt-1">Responsive grid system demo</p>
      </div>
    </PreviewWrap>
  );
}

function BreadcrumbIconsPreview() {
  return (
    <PreviewWrap>
      <div className="space-y-3">
        <nav className="flex items-center gap-1.5 text-sm">
          {[{ icon: '🏠', label: 'Home' }, { icon: '👥', label: 'Users' }, { icon: '✏️', label: 'Edit' }].map((item, i, arr) => (
            <span key={item.label} className="flex items-center gap-1.5">
              <a href="#" className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition ${i === arr.length - 1 ? 'bg-zinc-100 text-zinc-600' : 'text-blue-600 hover:bg-blue-50'}`}>
                <span>{item.icon}</span>{item.label}
              </a>
              {i < arr.length - 1 && <span className="text-zinc-300">/</span>}
            </span>
          ))}
        </nav>
        <nav aria-label="breadcrumb" className="flex items-center rounded-xl border border-zinc-200 bg-white px-4 py-2 shadow-sm text-xs w-fit">
          {['Dashboard', 'Projects', 'Alpha', 'Settings'].map((item, i, arr) => (
            <span key={item} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={12} className="text-zinc-300" />}
              <a href="#" className={i === arr.length - 1 ? 'font-semibold text-zinc-800' : 'text-blue-600 hover:underline'}>{item}</a>
            </span>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   16 New Preview Components
───────────────────────────────────────────── */

function TimelinePreview() {
  const events = [
    { time: '09:00', title: 'Project Kickoff', desc: 'Team aligned on goals.', dot: 'bg-blue-500' },
    { time: '11:30', title: 'Design Review', desc: 'Wireframes approved.', dot: 'bg-purple-500' },
    { time: '14:00', title: 'Dev Sprint Start', desc: 'Tickets assigned.', dot: 'bg-emerald-500' },
    { time: '17:00', title: 'Deployment', desc: 'v1.2 shipped to production.', dot: 'bg-amber-500' },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs">
        {events.map((e, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={`mt-1 h-2.5 w-2.5 rounded-full shrink-0 ${e.dot}`} />
              {i < events.length - 1 && <div className="my-1 w-px flex-1 bg-zinc-200" />}
            </div>
            <div className="pb-3 min-w-0">
              <p className="text-[10px] font-mono text-zinc-400">{e.time}</p>
              <p className="text-sm font-semibold text-zinc-800">{e.title}</p>
              <p className="text-xs text-zinc-500">{e.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function SkeletonPreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-xl border border-zinc-200 bg-white p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-zinc-200 animate-pulse shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-2.5 w-2/3 rounded-full bg-zinc-200 animate-pulse" />
                <div className="h-2 w-1/3 rounded-full bg-zinc-100 animate-pulse" />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="h-2 w-full rounded-full bg-zinc-200 animate-pulse" />
              <div className="h-2 w-5/6 rounded-full bg-zinc-200 animate-pulse" />
              <div className="h-2 w-3/4 rounded-full bg-zinc-100 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function AvatarGroupPreview() {
  const avatars = [
    { initials: 'JD', bg: 'bg-blue-500' },
    { initials: 'KL', bg: 'bg-emerald-500' },
    { initials: 'MP', bg: 'bg-purple-500' },
    { initials: 'SR', bg: 'bg-amber-500' },
    { initials: 'TW', bg: 'bg-rose-500' },
  ];
  return (
    <PreviewWrap>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center">
          {avatars.map((a, i) => (
            <div key={i} className={`flex h-10 w-10 items-center justify-center rounded-full text-[11px] font-bold text-white ring-2 ring-white ${a.bg} ${i > 0 ? '-ml-2.5' : ''}`}>
              {a.initials}
            </div>
          ))}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 text-[11px] font-bold text-zinc-600 ring-2 ring-white -ml-2.5">+8</div>
        </div>
        <p className="text-xs text-zinc-500 font-medium">13 team members</p>
        <div className="flex items-end gap-2">
          {[{ s: 'h-7 w-7 text-[9px]', l: 'sm' }, { s: 'h-10 w-10 text-xs', l: 'md' }, { s: 'h-14 w-14 text-sm', l: 'lg' }].map(({ s, l }) => (
            <div key={l} className={`flex items-center justify-center rounded-full bg-blue-500 font-bold text-white ${s}`}>{l}</div>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function SplitButtonPreview() {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState('Save');
  const opts = ['Save', 'Save & Close', 'Save as Draft', 'Publish'];
  return (
    <PreviewWrap>
      <div className="relative flex">
        <button className="rounded-l-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition border-r border-blue-500">
          {action}
        </button>
        <button onClick={() => setOpen((o) => !o)} className="rounded-r-lg bg-blue-600 px-2.5 py-2 text-sm text-white hover:bg-blue-700 transition">
          <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <div className="absolute top-full right-0 mt-1 w-44 rounded-xl border border-zinc-200 bg-white shadow-xl z-10 py-1">
            {opts.map((o) => (
              <button key={o} onClick={() => { setAction(o); setOpen(false); }} className="w-full px-4 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50 transition">{o}</button>
            ))}
          </div>
        )}
      </div>
    </PreviewWrap>
  );
}

function FileUploadPreview() {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<string | null>(null);
  return (
    <PreviewWrap bg="bg-zinc-50">
      {file ? (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 w-full max-w-xs">
          <CheckCircle size={18} className="text-emerald-500 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-800 truncate">{file}</p>
            <p className="text-xs text-zinc-500">Ready to upload</p>
          </div>
          <button onClick={() => setFile(null)} className="text-zinc-400 hover:text-zinc-600 transition"><X size={14} /></button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) setFile(f.name); }}
          className={`w-full max-w-xs rounded-xl border-2 border-dashed p-6 text-center transition cursor-pointer ${dragging ? 'border-blue-400 bg-blue-50' : 'border-zinc-300 bg-white hover:border-zinc-400'}`}
        >
          <div className="text-2xl mb-2">📁</div>
          <p className="text-sm font-semibold text-zinc-700">Drop files here</p>
          <p className="text-xs text-zinc-400 mt-1">or <button className="text-blue-600 underline" onClick={() => setFile('design-mockup.fig')}>browse files</button></p>
          <p className="text-[10px] text-zinc-400 mt-2">PNG, JPG, PDF, FIG up to 10MB</p>
        </div>
      )}
    </PreviewWrap>
  );
}

function InlineEditPreview() {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('Untitled Project');
  const [temp, setTemp] = useState(value);
  return (
    <PreviewWrap>
      <div className="w-full max-w-xs space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Project Name</p>
        {editing ? (
          <div className="flex items-center gap-2">
            <input
              autoFocus
              value={temp}
              onChange={(e) => setTemp(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { setValue(temp); setEditing(false); } if (e.key === 'Escape') { setTemp(value); setEditing(false); } }}
              className="flex-1 rounded-lg border border-blue-400 bg-white px-3 py-1.5 text-sm text-zinc-800 outline-none ring-2 ring-blue-100"
            />
            <button onClick={() => { setValue(temp); setEditing(false); }} className="rounded-lg bg-blue-600 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-blue-700">✓</button>
            <button onClick={() => { setTemp(value); setEditing(false); }} className="rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-500 hover:bg-zinc-50">✕</button>
          </div>
        ) : (
          <button onClick={() => { setTemp(value); setEditing(true); }} className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold text-zinc-800 hover:bg-zinc-100 transition text-left">
            {value}
            <span className="opacity-0 group-hover:opacity-100 text-zinc-400 text-xs transition ml-auto">✏️ edit</span>
          </button>
        )}
        <p className="text-xs text-zinc-400">Click the field to edit inline</p>
      </div>
    </PreviewWrap>
  );
}

function DataTablePreview() {
  const [sortCol, setSortCol] = useState<'name' | 'role' | 'status'>('name');
  const [sortAsc, setSortAsc] = useState(true);
  const rows = [
    { name: 'Alice Kim', role: 'Designer', status: 'Active' },
    { name: 'Bob Patel', role: 'Engineer', status: 'Idle' },
    { name: 'Carol Wu', role: 'PM', status: 'Active' },
    { name: 'Dan Rose', role: 'Engineer', status: 'Away' },
  ];
  const sorted = [...rows].sort((a, b) => {
    const cmp = a[sortCol].localeCompare(b[sortCol]);
    return sortAsc ? cmp : -cmp;
  });
  const toggle = (col: 'name' | 'role' | 'status') => { if (sortCol === col) setSortAsc((v) => !v); else { setSortCol(col); setSortAsc(true); } };
  const statusColor: Record<string, string> = { Active: 'bg-emerald-100 text-emerald-700', Idle: 'bg-zinc-100 text-zinc-600', Away: 'bg-amber-100 text-amber-700' };
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full overflow-x-auto rounded-xl border border-zinc-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-zinc-100 bg-zinc-50">
            <tr>
              {(['name', 'role', 'status'] as const).map((col) => (
                <th key={col} onClick={() => toggle(col)} className="cursor-pointer select-none px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500 hover:text-zinc-800 transition">
                  {col} {sortCol === col ? (sortAsc ? '↑' : '↓') : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((r, i) => (
              <tr key={i} className="border-b border-zinc-50 hover:bg-zinc-50 transition">
                <td className="px-4 py-2.5 font-medium text-zinc-800">{r.name}</td>
                <td className="px-4 py-2.5 text-zinc-500">{r.role}</td>
                <td className="px-4 py-2.5"><span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${statusColor[r.status]}`}>{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PreviewWrap>
  );
}

function VerticalStepperPreview() {
  const [step, setStep] = useState(1);
  const steps = [
    { n: 1, title: 'Account', desc: 'Enter your email & password' },
    { n: 2, title: 'Profile', desc: 'Add your name and avatar' },
    { n: 3, title: 'Plan', desc: 'Choose a subscription tier' },
    { n: 4, title: 'Done', desc: 'Review and confirm setup' },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs">
        {steps.map((s, i) => (
          <div key={s.n} className="flex gap-3">
            <div className="flex flex-col items-center">
              <button onClick={() => setStep(s.n)} className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition border-2 ${s.n < step ? 'bg-emerald-500 border-emerald-500 text-white' : s.n === step ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-zinc-300 text-zinc-400'}`}>
                {s.n < step ? '✓' : s.n}
              </button>
              {i < steps.length - 1 && <div className={`my-0.5 w-0.5 flex-1 min-h-[20px] transition-colors ${s.n < step ? 'bg-emerald-300' : 'bg-zinc-200'}`} />}
            </div>
            <div className={`pb-4 pt-1 min-w-0 ${s.n === step ? '' : 'opacity-60'}`}>
              <p className="text-sm font-semibold text-zinc-800">{s.title}</p>
              <p className="text-xs text-zinc-500">{s.desc}</p>
            </div>
          </div>
        ))}
        <div className="flex gap-2 mt-2 pl-11">
          <button onClick={() => setStep((v) => Math.max(1, v - 1))} disabled={step === 1} className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 disabled:opacity-40 transition">Back</button>
          <button onClick={() => setStep((v) => Math.min(4, v + 1))} disabled={step === 4} className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-40 transition">Next</button>
        </div>
      </div>
    </PreviewWrap>
  );
}

function KPICardGroupPreview() {
  const stats = [
    { label: 'Revenue', value: '$48.2K', change: '+12.5%', up: true, color: 'text-emerald-600' },
    { label: 'Users', value: '3,841', change: '+8.1%', up: true, color: 'text-blue-600' },
    { label: 'Churn', value: '2.4%', change: '-0.3%', up: false, color: 'text-rose-500' },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="grid grid-cols-3 gap-2 w-full max-w-sm">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-zinc-200 bg-white p-3 text-center shadow-sm">
            <p className="text-[10px] text-zinc-400 font-medium">{s.label}</p>
            <p className="text-lg font-bold text-zinc-900 mt-0.5">{s.value}</p>
            <span className={`text-[10px] font-semibold ${s.up ? 'text-emerald-600' : 'text-rose-500'}`}>{s.change}</span>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function ColorSwatchPreview() {
  const [selected, setSelected] = useState('#3B82F6');
  const palette = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#84CC16'];
  return (
    <PreviewWrap>
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-wrap gap-2 justify-center max-w-[200px]">
          {palette.map((c) => (
            <button key={c} onClick={() => setSelected(c)} style={{ backgroundColor: c }} className={`h-8 w-8 rounded-lg transition hover:scale-110 ${selected === c ? 'ring-2 ring-offset-2 ring-zinc-600 scale-110' : ''}`} />
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5">
          <div className="h-4 w-4 rounded" style={{ backgroundColor: selected }} />
          <code className="text-xs font-mono text-zinc-700">{selected}</code>
        </div>
      </div>
    </PreviewWrap>
  );
}

function ChipTagPreview() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Tailwind', 'Next.js']);
  const [input, setInput] = useState('');
  const remove = (t: string) => setTags((p) => p.filter((x) => x !== t));
  const add = () => { const v = input.trim(); if (v && !tags.includes(v)) { setTags((p) => [...p, v]); setInput(''); } };
  const colors = ['bg-blue-100 text-blue-700', 'bg-purple-100 text-purple-700', 'bg-emerald-100 text-emerald-700', 'bg-amber-100 text-amber-700'];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs space-y-2">
        <div className="flex flex-wrap gap-1.5">
          {tags.map((t, i) => (
            <span key={t} className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors[i % colors.length]}`}>
              {t}
              <button onClick={() => remove(t)} className="opacity-60 hover:opacity-100 transition"><X size={10} /></button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()}
            placeholder="Add tag…" className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
          <button onClick={add} className="rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-zinc-900 transition">Add</button>
        </div>
      </div>
    </PreviewWrap>
  );
}

function ProgressRingPreview() {
  const rings = [{ pct: 75, color: '#3B82F6', label: 'CPU' }, { pct: 48, color: '#10B981', label: 'RAM' }, { pct: 90, color: '#F59E0B', label: 'Disk' }];
  return (
    <PreviewWrap>
      <div className="flex items-center gap-6">
        {rings.map(({ pct, color, label }) => {
          const r = 22, c = 2 * Math.PI * r;
          return (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <svg width="60" height="60" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r={r} fill="none" stroke="#e4e4e7" strokeWidth="5" />
                <circle cx="30" cy="30" r={r} fill="none" stroke={color} strokeWidth="5"
                  strokeDasharray={`${(pct / 100) * c} ${c}`} strokeLinecap="round" transform="rotate(-90 30 30)" />
                <text x="30" y="34" textAnchor="middle" className="text-xs font-bold" fill="#18181b" fontSize="11" fontWeight="700">{pct}%</text>
              </svg>
              <span className="text-[10px] font-semibold text-zinc-500">{label}</span>
            </div>
          );
        })}
      </div>
    </PreviewWrap>
  );
}

function PageHeaderPreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-sm space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
          <nav className="flex items-center gap-1 text-xs text-zinc-400 mb-3">
            <span className="text-blue-600 hover:underline cursor-pointer">Dashboard</span>
            <ChevronRight size={12} />
            <span className="text-blue-600 hover:underline cursor-pointer">Projects</span>
            <ChevronRight size={12} />
            <span className="text-zinc-600 font-medium">Alpha</span>
          </nav>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-zinc-900">Project Alpha</h2>
              <p className="text-xs text-zinc-500 mt-0.5">Last updated 2 hours ago</p>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <button className="rounded-lg border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-50 transition">Share</button>
              <button className="rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-blue-700 transition">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </PreviewWrap>
  );
}

function NotificationCenterPreview() {
  const [notifs, setNotifs] = useState([
    { id: 1, icon: '💬', title: 'New comment', msg: 'Alice left a comment on Alpha.', time: '2m', read: false },
    { id: 2, icon: '✅', title: 'Task completed', msg: 'Design review marked done.', time: '1h', read: false },
    { id: 3, icon: '🚀', title: 'Deploy success', msg: 'v1.3 deployed to production.', time: '3h', read: true },
  ]);
  const unread = notifs.filter((n) => !n.read).length;
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-zinc-800">Notifications</span>
            {unread > 0 && <span className="rounded-full bg-blue-600 px-1.5 py-0.5 text-[9px] font-bold text-white">{unread}</span>}
          </div>
          <button onClick={() => setNotifs((p) => p.map((n) => ({ ...n, read: true })))} className="text-xs text-blue-600 hover:underline">Mark all read</button>
        </div>
        {notifs.map((n) => (
          <div key={n.id} onClick={() => setNotifs((p) => p.map((x) => x.id === n.id ? { ...x, read: true } : x))}
            className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition border-b border-zinc-50 last:border-0 ${n.read ? 'opacity-50' : 'hover:bg-blue-50/40'}`}>
            <span className="text-base mt-0.5">{n.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-zinc-800">{n.title}</p>
              <p className="text-xs text-zinc-500 truncate">{n.msg}</p>
            </div>
            <span className="text-[10px] text-zinc-400 shrink-0">{n.time}</span>
            {!n.read && <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />}
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function MediaPlayerPreview() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [vol, setVol] = useState(70);
  return (
    <PreviewWrap bg="bg-zinc-900">
      <div className="w-full max-w-xs rounded-2xl bg-zinc-800 p-4 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl shrink-0">🎵</div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">Midnight Drive</p>
            <p className="text-xs text-zinc-400">Neon Echoes</p>
          </div>
          <button className="ml-auto text-zinc-400 hover:text-white transition"><Bell size={14} /></button>
        </div>
        <div className="space-y-1 mb-4">
          <div className="relative h-1.5 w-full rounded-full bg-zinc-700 cursor-pointer" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setProgress(Math.round(((e.clientX - r.left) / r.width) * 100)); }}>
            <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between text-[10px] text-zinc-500">
            <span>1:{String(Math.floor(progress * 0.6)).padStart(2, '0')}</span>
            <span>2:47</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 mb-4">
          <button onClick={() => setProgress((v) => Math.max(0, v - 10))} className="text-zinc-400 hover:text-white transition text-lg">⏮</button>
          <button onClick={() => setPlaying((v) => !v)} className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-900 hover:scale-105 transition font-bold text-lg">
            {playing ? '⏸' : '▶'}
          </button>
          <button onClick={() => setProgress((v) => Math.min(100, v + 10))} className="text-zinc-400 hover:text-white transition text-lg">⏭</button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-zinc-500 text-xs">🔈</span>
          <div className="relative flex-1 h-1 rounded-full bg-zinc-700 cursor-pointer" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setVol(Math.round(((e.clientX - r.left) / r.width) * 100)); }}>
            <div className="h-full rounded-full bg-zinc-400" style={{ width: `${vol}%` }} />
          </div>
          <span className="text-zinc-500 text-xs">🔊</span>
        </div>
      </div>
    </PreviewWrap>
  );
}

function PricingTogglePreview() {
  const [annual, setAnnual] = useState(false);
  const plans = [
    { name: 'Starter', monthly: 9, color: 'border-zinc-200', badge: '', features: ['5 projects', '10GB storage', 'Email support'] },
    { name: 'Pro', monthly: 29, color: 'border-blue-500', badge: 'Popular', features: ['Unlimited projects', '100GB storage', 'Priority support'] },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-sm space-y-3">
        <div className="flex items-center justify-center gap-3">
          <span className={`text-xs font-semibold ${!annual ? 'text-zinc-900' : 'text-zinc-400'}`}>Monthly</span>
          <button onClick={() => setAnnual((v) => !v)} className={`relative h-6 w-11 rounded-full transition-colors ${annual ? 'bg-blue-600' : 'bg-zinc-300'}`}>
            <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${annual ? 'translate-x-5' : ''}`} />
          </button>
          <span className={`text-xs font-semibold ${annual ? 'text-zinc-900' : 'text-zinc-400'}`}>Annual <span className="text-emerald-600">-20%</span></span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {plans.map((p) => (
            <div key={p.name} className={`rounded-xl border-2 bg-white p-3 ${p.color}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-zinc-700">{p.name}</span>
                {p.badge && <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-bold text-blue-600">{p.badge}</span>}
              </div>
              <div className="mb-2">
                <span className="text-xl font-bold text-zinc-900">${annual ? Math.floor(p.monthly * 0.8) : p.monthly}</span>
                <span className="text-[10px] text-zinc-400">/mo</span>
              </div>
              <ul className="space-y-0.5">
                {p.features.map((f) => <li key={f} className="text-[10px] text-zinc-500 flex items-center gap-1"><Check size={8} className="text-emerald-500 shrink-0" />{f}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   28 New Preview Components
───────────────────────────────────────────── */

function SegmentedControlPreview() {
  const [period, setPeriod] = useState('Week');
  const [view, setView] = useState('List');
  return (
    <PreviewWrap>
      <div className="flex flex-col items-center gap-4">
        <div className="inline-flex rounded-xl bg-zinc-100 p-1 gap-0.5">
          {['Day', 'Week', 'Month', 'Year'].map((o) => (
            <button key={o} onClick={() => setPeriod(o)}
              className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition ${period === o ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}>
              {o}
            </button>
          ))}
        </div>
        <div className="inline-flex rounded-xl bg-zinc-100 p-1 gap-0.5">
          {['List', 'Grid', 'Map'].map((o) => (
            <button key={o} onClick={() => setView(o)}
              className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition ${view === o ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}>
              {o}
            </button>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function RichTextToolbarPreview() {
  const [active, setActive] = useState<string[]>(['bold']);
  const toggle = (t: string) => setActive(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t]);
  const tools = [
    { id: 'bold', label: 'B', style: 'font-bold' },
    { id: 'italic', label: 'I', style: 'italic' },
    { id: 'underline', label: 'U', style: 'underline' },
    { id: 'strike', label: 'S', style: 'line-through' },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-sm space-y-2">
        <div className="flex items-center gap-1 rounded-xl border border-zinc-200 bg-white px-2 py-1.5 flex-wrap">
          {tools.map(t => (
            <button key={t.id} onClick={() => toggle(t.id)}
              className={`h-7 w-7 rounded-lg text-sm ${t.style} transition ${active.includes(t.id) ? 'bg-blue-600 text-white' : 'text-zinc-600 hover:bg-zinc-100'}`}>
              {t.label}
            </button>
          ))}
          <div className="h-5 w-px bg-zinc-200 mx-1" />
          {[{ id: 'h1', label: 'H1' }, { id: 'h2', label: 'H2' }].map(t => (
            <button key={t.id} onClick={() => toggle(t.id)}
              className={`rounded-lg px-2 py-0.5 text-xs font-bold transition ${active.includes(t.id) ? 'bg-blue-600 text-white' : 'text-zinc-600 hover:bg-zinc-100'}`}>
              {t.label}
            </button>
          ))}
          <div className="h-5 w-px bg-zinc-200 mx-1" />
          {['• List', '1. List', '— Quote'].map(t => (
            <button key={t} className="rounded-lg px-2 py-0.5 text-xs text-zinc-600 hover:bg-zinc-100 transition">{t}</button>
          ))}
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white px-3 py-3 text-sm text-zinc-700 min-h-[60px]">
          <span className={`${active.includes('bold') ? 'font-bold' : ''} ${active.includes('italic') ? 'italic' : ''} ${active.includes('underline') ? 'underline' : ''}`}>
            Start typing your content here…
          </span>
        </div>
      </div>
    </PreviewWrap>
  );
}

function AutocompletePreview() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const options = ['JavaScript', 'TypeScript', 'Python', 'Rust', 'Go', 'Swift', 'Kotlin', 'Dart'];
  const filtered = options.filter(o => o.toLowerCase().includes(query.toLowerCase()));
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="relative w-full max-w-xs">
        <input value={query} onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Search languages…"
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition" />
        {open && filtered.length > 0 && (
          <div className="absolute z-10 mt-1 w-full rounded-xl border border-zinc-200 bg-white shadow-xl overflow-hidden">
            {filtered.slice(0, 5).map(o => (
              <button key={o} onMouseDown={() => { setQuery(o); setOpen(false); }}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-zinc-700 hover:bg-blue-50 hover:text-blue-700 transition text-left">
                <Search size={12} className="text-zinc-400 shrink-0" /> {o}
              </button>
            ))}
          </div>
        )}
      </div>
    </PreviewWrap>
  );
}

function TransferListPreview() {
  const [left, setLeft] = useState(['Analytics', 'Reports', 'Export', 'API']);
  const [right, setRight] = useState(['Dashboard', 'Users']);
  const [selL, setSelL] = useState<string[]>([]);
  const [selR, setSelR] = useState<string[]>([]);
  const moveToRight = () => { setRight(p => [...p, ...selL]); setLeft(p => p.filter(x => !selL.includes(x))); setSelL([]); };
  const moveToLeft = () => { setLeft(p => [...p, ...selR]); setRight(p => p.filter(x => !selR.includes(x))); setSelR([]); };
  const ListBox = ({ items, sel, setSel }: { items: string[]; sel: string[]; setSel: (v: string[]) => void }) => (
    <div className="h-28 w-32 overflow-y-auto rounded-xl border border-zinc-200 bg-white py-1">
      {items.map(i => (
        <div key={i} onClick={() => { const cur = sel; setSel(cur.includes(i) ? cur.filter((x: string) => x !== i) : [...cur, i]); }}
          className={`cursor-pointer px-3 py-1.5 text-xs transition ${sel.includes(i) ? 'bg-blue-600 text-white' : 'text-zinc-700 hover:bg-zinc-50'}`}>
          {i}
        </div>
      ))}
    </div>
  );
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center gap-1">
          <p className="text-[10px] font-semibold text-zinc-400">Available</p>
          <ListBox items={left} sel={selL} setSel={setSelL} />
        </div>
        <div className="flex flex-col gap-1.5">
          <button onClick={moveToRight} disabled={!selL.length} className="rounded-lg border border-zinc-200 bg-white px-2 py-1 text-xs font-bold text-zinc-600 hover:bg-zinc-50 disabled:opacity-30 transition">→</button>
          <button onClick={moveToLeft} disabled={!selR.length} className="rounded-lg border border-zinc-200 bg-white px-2 py-1 text-xs font-bold text-zinc-600 hover:bg-zinc-50 disabled:opacity-30 transition">←</button>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-[10px] font-semibold text-zinc-400">Selected</p>
          <ListBox items={right} sel={selR} setSel={setSelR} />
        </div>
      </div>
    </PreviewWrap>
  );
}

function ActivityFeedPreview() {
  const events = [
    { icon: '🟢', user: 'Alice', action: 'pushed to main', time: '2m ago', color: 'bg-emerald-50 border-emerald-100' },
    { icon: '💬', user: 'Bob', action: 'commented on PR #42', time: '18m ago', color: 'bg-blue-50 border-blue-100' },
    { icon: '🔀', user: 'Carol', action: 'merged feature/auth', time: '1h ago', color: 'bg-purple-50 border-purple-100' },
    { icon: '🐛', user: 'Dan', action: 'opened issue #91', time: '3h ago', color: 'bg-amber-50 border-amber-100' },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs space-y-2">
        {events.map((e, i) => (
          <div key={i} className={`flex items-start gap-3 rounded-xl border px-3 py-2.5 ${e.color}`}>
            <span className="text-base shrink-0">{e.icon}</span>
            <div className="min-w-0">
              <p className="text-xs text-zinc-700"><strong>{e.user}</strong> {e.action}</p>
              <p className="text-[10px] text-zinc-400 mt-0.5">{e.time}</p>
            </div>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function LeaderboardPreview() {
  const rows = [
    { rank: 1, name: 'Alice Kim', score: 9820, medal: '🥇' },
    { rank: 2, name: 'Bob Patel', score: 8750, medal: '🥈' },
    { rank: 3, name: 'Carol Wu', score: 7430, medal: '🥉' },
    { rank: 4, name: 'Dan Rose', score: 6210, medal: '' },
    { rank: 5, name: 'Eve Stone', score: 5980, medal: '' },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs rounded-xl border border-zinc-200 bg-white overflow-hidden">
        {rows.map((r, i) => (
          <div key={r.rank} className={`flex items-center gap-3 px-4 py-2.5 ${i < rows.length - 1 ? 'border-b border-zinc-50' : ''} ${r.rank === 1 ? 'bg-amber-50' : ''}`}>
            <span className="w-5 text-center text-sm">{r.medal || <span className="text-xs font-bold text-zinc-400">{r.rank}</span>}</span>
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-[10px] font-bold text-white">
              {r.name.split(' ').map(w => w[0]).join('')}
            </div>
            <span className="flex-1 text-sm font-medium text-zinc-800">{r.name}</span>
            <span className="text-xs font-bold text-zinc-600">{r.score.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function GaugeMeterPreview() {
  const [val, setVal] = useState(68);
  const angle = (val / 100) * 180 - 90;
  const color = val < 40 ? '#10b981' : val < 70 ? '#f59e0b' : '#ef4444';
  return (
    <PreviewWrap>
      <div className="flex flex-col items-center gap-3">
        <div className="relative flex items-end justify-center" style={{ width: 140, height: 80 }}>
          <svg width="140" height="90" viewBox="0 0 140 90">
            <path d="M15 80 A55 55 0 0 1 125 80" fill="none" stroke="#e4e4e7" strokeWidth="10" strokeLinecap="round" />
            <path d="M15 80 A55 55 0 0 1 125 80" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
              strokeDasharray={`${(val / 100) * 172.8} 172.8`} />
            <line x1="70" y1="80" x2={70 + 45 * Math.cos((angle * Math.PI) / 180)} y2={80 + 45 * Math.sin((angle * Math.PI) / 180)}
              stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="70" cy="80" r="4" fill="#18181b" />
          </svg>
          <div className="absolute bottom-0 text-center">
            <p className="text-2xl font-bold leading-none" style={{ color }}>{val}%</p>
          </div>
        </div>
        <input type="range" min={0} max={100} value={val} onChange={e => setVal(+e.target.value)} className="w-32 accent-blue-600" />
        <div className="flex gap-3 text-[10px] font-semibold">
          <span className="text-emerald-600">● Good</span><span className="text-amber-500">● Warn</span><span className="text-red-500">● Critical</span>
        </div>
      </div>
    </PreviewWrap>
  );
}

function RadarChartPreview() {
  const skills = [
    { label: 'Design', val: 80 }, { label: 'Frontend', val: 92 },
    { label: 'Backend', val: 70 }, { label: 'DevOps', val: 55 },
    { label: 'Testing', val: 75 }, { label: 'Docs', val: 60 },
  ];
  const cx = 70, cy = 70, r = 52;
  const pts = skills.map((s, i) => {
    const a = (i / skills.length) * 2 * Math.PI - Math.PI / 2;
    const rv = (s.val / 100) * r;
    return { x: cx + rv * Math.cos(a), y: cy + rv * Math.sin(a), lx: cx + (r + 14) * Math.cos(a), ly: cy + (r + 14) * Math.sin(a), label: s.label };
  });
  const gridPts = (frac: number) => skills.map((_, i) => {
    const a = (i / skills.length) * 2 * Math.PI - Math.PI / 2;
    return `${cx + frac * r * Math.cos(a)},${cy + frac * r * Math.sin(a)}`;
  }).join(' ');
  return (
    <PreviewWrap bg="bg-zinc-50">
      <svg width="150" height="150" viewBox="0 0 150 150">
        {[0.25, 0.5, 0.75, 1].map(f => <polygon key={f} points={gridPts(f)} fill="none" stroke="#e4e4e7" strokeWidth="1" />)}
        {skills.map((_, i) => {
          const a = (i / skills.length) * 2 * Math.PI - Math.PI / 2;
          return <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(a)} y2={cy + r * Math.sin(a)} stroke="#e4e4e7" strokeWidth="1" />;
        })}
        <polygon points={pts.map(p => `${p.x},${p.y}`).join(' ')} fill="#3b82f620" stroke="#3b82f6" strokeWidth="2" />
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="3" fill="#3b82f6" />
            <text x={p.lx} y={p.ly} textAnchor="middle" dominantBaseline="middle" fill="#71717a" fontSize="7" fontWeight="600">{p.label}</text>
          </g>
        ))}
      </svg>
    </PreviewWrap>
  );
}

function UserCardPreview() {
  const [followed, setFollowed] = useState(false);
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden w-56">
        <div className="h-16 bg-gradient-to-r from-blue-500 to-violet-500" />
        <div className="px-4 pb-4">
          <div className="flex items-end justify-between -mt-7 mb-3">
            <div className="h-14 w-14 rounded-2xl border-4 border-white bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-lg font-bold text-white shadow">AK</div>
            <button onClick={() => setFollowed(f => !f)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${followed ? 'bg-zinc-100 text-zinc-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
              {followed ? 'Following' : 'Follow'}
            </button>
          </div>
          <p className="text-sm font-bold text-zinc-900">Alice Kim</p>
          <p className="text-xs text-zinc-400 mb-2">Senior Product Designer · SF</p>
          <div className="flex gap-4 text-center">
            {[['142', 'Posts'], ['8.4K', 'Followers'], ['320', 'Following']].map(([n, l]) => (
              <div key={l}><p className="text-xs font-bold text-zinc-900">{n}</p><p className="text-[10px] text-zinc-400">{l}</p></div>
            ))}
          </div>
        </div>
      </div>
    </PreviewWrap>
  );
}

function GanttBarPreview() {
  const tasks = [
    { name: 'Research', start: 0, dur: 2, color: 'bg-blue-400' },
    { name: 'Design', start: 1, dur: 3, color: 'bg-purple-400' },
    { name: 'Build', start: 3, dur: 4, color: 'bg-emerald-400' },
    { name: 'Test', start: 6, dur: 2, color: 'bg-amber-400' },
    { name: 'Launch', start: 7, dur: 1, color: 'bg-rose-400' },
  ];
  const total = 8;
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-sm space-y-1.5">
        <div className="flex items-center gap-1 mb-2 pl-16">
          {Array.from({ length: total }, (_, i) => (
            <div key={i} className="flex-1 text-center text-[9px] font-bold text-zinc-400">W{i + 1}</div>
          ))}
        </div>
        {tasks.map(t => (
          <div key={t.name} className="flex items-center gap-2">
            <span className="w-14 shrink-0 text-[11px] font-medium text-zinc-600 text-right">{t.name}</span>
            <div className="flex flex-1 gap-1">
              {Array.from({ length: total }, (_, i) => (
                <div key={i} className={`flex-1 h-6 rounded-sm ${i >= t.start && i < t.start + t.dur ? t.color : 'bg-zinc-100'}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function MegaMenuPreview() {
  const [open, setOpen] = useState(false);
  const cols = [
    { title: 'Products', items: [{ icon: '📊', label: 'Analytics', desc: 'Track metrics' }, { icon: '🚀', label: 'Deploy', desc: 'Ship fast' }, { icon: '🔒', label: 'Security', desc: 'Stay safe' }] },
    { title: 'Solutions', items: [{ icon: '🏢', label: 'Enterprise', desc: 'For large teams' }, { icon: '🌱', label: 'Startup', desc: 'Scale quickly' }, { icon: '🧑‍💻', label: 'Developer', desc: 'API first' }] },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="relative">
        <button onClick={() => setOpen(o => !o)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 transition">
          Products <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <div className="absolute left-0 top-full mt-2 w-80 rounded-2xl border border-zinc-200 bg-white shadow-2xl p-4 z-10">
            <div className="grid grid-cols-2 gap-4">
              {cols.map(col => (
                <div key={col.title}>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">{col.title}</p>
                  <div className="space-y-1">
                    {col.items.map(item => (
                      <button key={item.label} className="flex w-full items-start gap-2.5 rounded-xl p-2 text-left hover:bg-zinc-50 transition">
                        <span className="text-base shrink-0">{item.icon}</span>
                        <div>
                          <p className="text-xs font-semibold text-zinc-800">{item.label}</p>
                          <p className="text-[10px] text-zinc-400">{item.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PreviewWrap>
  );
}

function DockPreview() {
  const [hovered, setHovered] = useState<number | null>(null);
  const apps = ['🌐', '📁', '✉️', '📅', '🎵', '⚙️', '🔍'];
  return (
    <PreviewWrap bg="bg-zinc-900">
      <div className="flex flex-col items-center gap-3">
        <p className="text-xs text-zinc-400">Hover the icons</p>
        <div className="flex items-end gap-1.5 rounded-2xl border border-white/10 bg-white/10 px-3 py-2 backdrop-blur-md">
          {apps.map((app, i) => {
            const dist = hovered !== null ? Math.abs(i - hovered) : 999;
            const scale = dist === 0 ? 'scale-150 -translate-y-3' : dist === 1 ? 'scale-125 -translate-y-1' : 'scale-100';
            return (
              <button key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-xl transition-all duration-150 ${scale}`}>
                {app}
              </button>
            );
          })}
        </div>
      </div>
    </PreviewWrap>
  );
}

function SurveyRatingPreview() {
  const [nps, setNps] = useState<number | null>(8);
  const [satisfaction, setSatisfaction] = useState<number | null>(4);
  const emojis = ['😞', '😕', '😐', '🙂', '😄'];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs space-y-4">
        <div>
          <p className="text-xs font-semibold text-zinc-700 mb-2">How likely are you to recommend us? (NPS)</p>
          <div className="flex gap-0.5 flex-wrap">
            {Array.from({ length: 11 }, (_, i) => (
              <button key={i} onClick={() => setNps(i)}
                className={`h-7 w-7 rounded-lg text-[10px] font-bold transition ${nps === i ? (i >= 9 ? 'bg-emerald-500 text-white' : i >= 7 ? 'bg-amber-400 text-white' : 'bg-red-500 text-white') : 'bg-white border border-zinc-200 text-zinc-600 hover:border-blue-300'}`}>
                {i}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-zinc-700 mb-2">Rate your experience</p>
          <div className="flex gap-2">
            {emojis.map((e, i) => (
              <button key={i} onClick={() => setSatisfaction(i)}
                className={`text-2xl transition-all ${satisfaction === i ? 'scale-125' : 'opacity-40 hover:opacity-70'}`}>{e}</button>
            ))}
          </div>
        </div>
      </div>
    </PreviewWrap>
  );
}

function TypingIndicatorPreview() {
  return (
    <PreviewWrap bg="bg-zinc-100">
      <div className="w-full max-w-xs space-y-3">
        <div className="flex items-end gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">AK</div>
          <div className="rounded-2xl rounded-bl-sm bg-white border border-zinc-200 px-4 py-3 shadow-sm">
            <div className="flex items-center gap-1.5">
              {[0, 150, 300].map(delay => (
                <div key={delay} className="h-2 w-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: `${delay}ms` }} />
              ))}
            </div>
          </div>
        </div>
        <p className="text-[10px] text-zinc-400 ml-10">Alice is typing…</p>
        <div className="flex flex-col gap-2">
          <div className="self-start max-w-[180px] rounded-2xl rounded-tl-sm bg-white border border-zinc-200 px-3 py-2 text-xs text-zinc-700 shadow-sm">Hey! How&apos;s the project going?</div>
          <div className="self-end max-w-[180px] rounded-2xl rounded-tr-sm bg-blue-600 px-3 py-2 text-xs text-white shadow-sm">Almost done! Just finishing tests 🚀</div>
        </div>
      </div>
    </PreviewWrap>
  );
}

function UploadProgressPreview() {
  const [prog, setProg] = useState(72);
  const files = [
    { name: 'design-assets.zip', size: '24 MB', prog, color: 'bg-blue-500' },
    { name: 'report-q4.pdf', size: '2.1 MB', prog: 100, color: 'bg-emerald-500' },
    { name: 'video-intro.mp4', size: '180 MB', prog: 31, color: 'bg-amber-500' },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs space-y-2.5">
        {files.map(f => (
          <div key={f.name} className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5">
            <div className="flex items-center justify-between mb-1.5">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-zinc-800 truncate">{f.name}</p>
                <p className="text-[10px] text-zinc-400">{f.size}</p>
              </div>
              <span className={`ml-2 shrink-0 text-[10px] font-bold ${f.prog === 100 ? 'text-emerald-500' : 'text-zinc-500'}`}>{f.prog}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-zinc-100">
              <div className={`h-full rounded-full transition-all ${f.color}`} style={{ width: `${f.prog}%` }} />
            </div>
          </div>
        ))}
        <button onClick={() => setProg(p => Math.min(100, p + 5))} className="w-full rounded-lg bg-zinc-800 py-1.5 text-xs font-semibold text-white hover:bg-zinc-900 transition">Simulate progress</button>
      </div>
    </PreviewWrap>
  );
}

function PopoverCardPreview() {
  const [open, setOpen] = useState(false);
  return (
    <PreviewWrap>
      <div className="relative">
        <button onClick={() => setOpen(o => !o)}
          className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 transition">
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">AK</div>
          Alice Kim
        </button>
        {open && (
          <div className="absolute left-0 top-full mt-2 w-64 rounded-2xl border border-zinc-200 bg-white shadow-2xl p-4 z-10">
            <div className="flex items-start gap-3 mb-3">
              <div className="h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg font-bold text-white">AK</div>
              <div>
                <p className="font-bold text-zinc-900">Alice Kim</p>
                <p className="text-xs text-zinc-400">Senior Designer · San Francisco</p>
                <div className="mt-1 flex gap-1">
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-600">Design</span>
                  <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-semibold text-purple-600">Figma</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 rounded-xl bg-blue-600 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition">Message</button>
              <button className="flex-1 rounded-xl border border-zinc-200 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition">Profile</button>
            </div>
          </div>
        )}
      </div>
    </PreviewWrap>
  );
}

function GlobalSearchPreview() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const results = [
    { icon: '📄', label: 'Q4 Report.pdf', cat: 'Documents' },
    { icon: '👤', label: 'Alice Kim', cat: 'People' },
    { icon: '🔧', label: 'API Settings', cat: 'Settings' },
    { icon: '📊', label: 'Analytics Dashboard', cat: 'Pages' },
  ].filter(r => !q || r.label.toLowerCase().includes(q.toLowerCase()));
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs">
        <button onClick={() => setOpen(true)}
          className="flex w-full items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-400 shadow-sm hover:border-zinc-400 transition">
          <Search size={14} /> Search everything… <kbd className="ml-auto rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-500">⌘K</kbd>
        </button>
        {open && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4" onClick={() => setOpen(false)}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <div className="relative w-full max-w-md rounded-2xl border border-zinc-200 bg-white shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-3 border-b border-zinc-100 px-4 py-3">
                <Search size={16} className="text-zinc-400 shrink-0" />
                <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search anything…" className="flex-1 text-sm text-zinc-800 outline-none placeholder-zinc-400" />
                <button onClick={() => setOpen(false)}><X size={16} className="text-zinc-400" /></button>
              </div>
              <div className="py-2">
                {results.map(r => (
                  <button key={r.label} className="flex w-full items-center gap-3 px-4 py-2.5 hover:bg-zinc-50 transition text-left">
                    <span className="text-base">{r.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-zinc-800">{r.label}</p>
                      <p className="text-[10px] text-zinc-400">{r.cat}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </PreviewWrap>
  );
}

function MasonryGridPreview() {
  const cards = [
    { h: 'h-20', bg: 'bg-blue-100', label: 'Analytics' },
    { h: 'h-32', bg: 'bg-purple-100', label: 'Design System' },
    { h: 'h-24', bg: 'bg-emerald-100', label: 'API Docs' },
    { h: 'h-16', bg: 'bg-amber-100', label: 'Deploy' },
    { h: 'h-28', bg: 'bg-rose-100', label: 'Monitoring' },
    { h: 'h-20', bg: 'bg-sky-100', label: 'Settings' },
  ];
  const col1 = cards.filter((_, i) => i % 2 === 0);
  const col2 = cards.filter((_, i) => i % 2 === 1);
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="flex gap-2 w-full max-w-xs">
        {[col1, col2].map((col, ci) => (
          <div key={ci} className="flex flex-1 flex-col gap-2">
            {col.map(c => (
              <div key={c.label} className={`rounded-xl border border-zinc-200 ${c.bg} ${c.h} flex items-center justify-center`}>
                <p className="text-xs font-semibold text-zinc-700">{c.label}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function SplitPanePreview() {
  const [split, setSplit] = useState(50);
  return (
    <PreviewWrap bg="bg-zinc-900">
      <div className="w-full max-w-xs rounded-xl overflow-hidden border border-zinc-700 select-none">
        <div className="flex items-center gap-2 border-b border-zinc-700 bg-zinc-800 px-3 py-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span className="ml-2 text-[10px] text-zinc-400">split-view.tsx</span>
        </div>
        <div className="flex h-28 relative">
          <div className="overflow-hidden bg-zinc-950 p-3 text-[10px] font-mono text-zinc-300" style={{ width: `${split}%` }}>
            <span className="text-purple-400">const</span> <span className="text-blue-400">x</span> <span className="text-zinc-400">=</span> <span className="text-amber-300">42</span>
          </div>
          <div className="w-1 cursor-col-resize bg-zinc-700 hover:bg-blue-500 transition shrink-0 flex items-center justify-center">
            <div className="h-6 w-0.5 rounded-full bg-current opacity-60" />
          </div>
          <div className="flex-1 overflow-hidden bg-zinc-900 p-3 text-[10px] text-zinc-400">
            <div className="font-semibold text-zinc-200 mb-1">Output</div>
            <div className="text-emerald-400">→ 42</div>
          </div>
        </div>
        <div className="border-t border-zinc-700 bg-zinc-800 px-3 py-1.5 flex items-center gap-2">
          <input type="range" min={20} max={80} value={split} onChange={e => setSplit(+e.target.value)} className="w-24 accent-blue-500" />
          <span className="text-[10px] text-zinc-400">{split}% / {100 - split}%</span>
        </div>
      </div>
    </PreviewWrap>
  );
}

function StickyTablePreview() {
  const headers = ['Name', 'Role', 'Dept', 'Status', 'Score'];
  const rows = [
    ['Alice Kim', 'Designer', 'Product', 'Active', '98'],
    ['Bob Patel', 'Engineer', 'Eng', 'Active', '94'],
    ['Carol Wu', 'PM', 'Product', 'Away', '87'],
    ['Dan Rose', 'DevOps', 'Infra', 'Idle', '82'],
    ['Eve Stone', 'QA', 'Eng', 'Active', '79'],
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-sm overflow-auto rounded-xl border border-zinc-200 bg-white" style={{ maxHeight: 160 }}>
        <table className="w-full text-xs">
          <thead className="sticky top-0 z-10">
            <tr className="bg-zinc-100 border-b border-zinc-200">
              {headers.map(h => <th key={h} className="px-3 py-2 text-left font-semibold text-zinc-600 whitespace-nowrap">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-zinc-50 hover:bg-zinc-50 transition">
                <td className="sticky left-0 bg-white px-3 py-2 font-medium text-zinc-800 whitespace-nowrap border-r border-zinc-100">{r[0]}</td>
                {r.slice(1).map((c, j) => (
                  <td key={j} className="px-3 py-2 text-zinc-500 whitespace-nowrap">{j === 2 ?
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${c === 'Active' ? 'bg-emerald-100 text-emerald-700' : c === 'Away' ? 'bg-amber-100 text-amber-700' : 'bg-zinc-100 text-zinc-600'}`}>{c}</span> : c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PreviewWrap>
  );
}

function WordCloudPreview() {
  const words = [
    { text: 'TypeScript', size: 'text-xl', color: 'text-blue-600', weight: 'font-bold' },
    { text: 'React', size: 'text-lg', color: 'text-sky-500', weight: 'font-bold' },
    { text: 'Next.js', size: 'text-base', color: 'text-zinc-800', weight: 'font-semibold' },
    { text: 'Tailwind', size: 'text-lg', color: 'text-teal-500', weight: 'font-bold' },
    { text: 'Node', size: 'text-sm', color: 'text-emerald-600', weight: 'font-semibold' },
    { text: 'GraphQL', size: 'text-sm', color: 'text-pink-500', weight: 'font-medium' },
    { text: 'Docker', size: 'text-base', color: 'text-blue-400', weight: 'font-semibold' },
    { text: 'Prisma', size: 'text-sm', color: 'text-purple-500', weight: 'font-medium' },
    { text: 'Rust', size: 'text-xs', color: 'text-amber-600', weight: 'font-medium' },
    { text: 'Go', size: 'text-xs', color: 'text-cyan-500', weight: 'font-semibold' },
    { text: 'AWS', size: 'text-sm', color: 'text-amber-500', weight: 'font-semibold' },
    { text: 'Vercel', size: 'text-xs', color: 'text-zinc-600', weight: 'font-medium' },
  ];
  return (
    <PreviewWrap>
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 max-w-xs">
        {words.map(w => (
          <span key={w.text} className={`${w.size} ${w.color} ${w.weight} hover:opacity-70 transition cursor-default`}>{w.text}</span>
        ))}
      </div>
    </PreviewWrap>
  );
}

function FloatingActionMenuPreview() {
  const [open, setOpen] = useState(false);
  const actions = [
    { icon: '📝', label: 'Note', color: 'bg-blue-500' },
    { icon: '📎', label: 'Attach', color: 'bg-purple-500' },
    { icon: '📷', label: 'Photo', color: 'bg-emerald-500' },
    { icon: '📊', label: 'Chart', color: 'bg-amber-500' },
  ];
  return (
    <PreviewWrap>
      <div className="relative flex flex-col items-center gap-2 py-4">
        <div className={`flex flex-col items-center gap-2 transition-all ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          {actions.map((a, i) => (
            <div key={a.label} className="flex items-center gap-2" style={{ transform: open ? 'translateY(0)' : 'translateY(20px)', transition: `transform .2s ${i * 50}ms` }}>
              <span className="rounded-lg border border-zinc-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-zinc-600 shadow-sm">{a.label}</span>
              <button className={`h-10 w-10 rounded-full text-lg shadow-lg ${a.color} text-white flex items-center justify-center hover:scale-110 transition`}>{a.icon}</button>
            </div>
          ))}
        </div>
        <button onClick={() => setOpen(o => !o)}
          className={`h-12 w-12 rounded-full bg-zinc-900 text-white shadow-xl flex items-center justify-center hover:bg-zinc-800 transition-transform ${open ? 'rotate-45' : ''}`}>
          <span className="text-xl">+</span>
        </button>
      </div>
    </PreviewWrap>
  );
}

function CommandPaletteV2Preview() {
  const [q, setQ] = useState('');
  const cmds = [
    { icon: '🏠', label: 'Go to Dashboard', shortcut: 'G D' },
    { icon: '➕', label: 'New Project', shortcut: '⌘ N' },
    { icon: '🔍', label: 'Search Files', shortcut: '⌘ F' },
    { icon: '⚙️', label: 'Open Settings', shortcut: '⌘ ,' },
    { icon: '📤', label: 'Export Data', shortcut: '⌘ E' },
  ].filter(c => !q || c.label.toLowerCase().includes(q.toLowerCase()));
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs rounded-2xl border border-zinc-200 bg-white shadow-xl overflow-hidden">
        <div className="flex items-center gap-2 border-b border-zinc-100 px-4 py-3">
          <Search size={14} className="text-zinc-400 shrink-0" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Type a command…" className="flex-1 text-sm text-zinc-800 outline-none placeholder-zinc-400" />
          <kbd className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-500">esc</kbd>
        </div>
        <div className="py-1 max-h-40 overflow-y-auto">
          <p className="px-4 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Commands</p>
          {cmds.map(c => (
            <button key={c.label} className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-blue-50 transition group">
              <span className="text-base">{c.icon}</span>
              <span className="flex-1 text-sm text-zinc-700 group-hover:text-blue-700">{c.label}</span>
              <kbd className="rounded bg-zinc-100 px-1.5 py-0.5 text-[9px] font-semibold text-zinc-400">{c.shortcut}</kbd>
            </button>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function TableOfContentsPreview() {
  const [active, setActive] = useState('installation');
  const sections = [
    { id: 'intro', label: 'Introduction', level: 0 },
    { id: 'installation', label: 'Installation', level: 0 },
    { id: 'config', label: 'Configuration', level: 1 },
    { id: 'env', label: 'Environment vars', level: 2 },
    { id: 'usage', label: 'Usage', level: 0 },
    { id: 'api', label: 'API Reference', level: 0 },
    { id: 'deploy', label: 'Deployment', level: 0 },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-[200px]">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400">On this page</p>
        <nav className="space-y-0.5 border-l border-zinc-200">
          {sections.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)}
              className={`block w-full text-left py-1 text-xs transition border-l-2 -ml-px ${
                s.level === 0 ? 'pl-3' : s.level === 1 ? 'pl-6' : 'pl-9'
              } ${active === s.id ? 'border-blue-600 font-semibold text-blue-600' : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300'}`}>
              {s.label}
            </button>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

function InvoicePreview() {
  const items = [
    { desc: 'UI Design', qty: 8, unit: 150, total: 1200 },
    { desc: 'Frontend Dev', qty: 20, unit: 120, total: 2400 },
    { desc: 'API Integration', qty: 5, unit: 180, total: 900 },
  ];
  const subtotal = items.reduce((s, i) => s + i.total, 0);
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
        <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50 px-4 py-3">
          <div><p className="text-sm font-bold text-zinc-900">Invoice #INV-0042</p><p className="text-[10px] text-zinc-400">Due: Jan 31, 2026</p></div>
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-700">Pending</span>
        </div>
        <table className="w-full text-xs">
          <thead><tr className="border-b border-zinc-100 text-zinc-400">
            <th className="px-4 py-2 text-left font-semibold">Description</th>
            <th className="px-2 py-2 text-right font-semibold">Qty</th>
            <th className="px-2 py-2 text-right font-semibold">Rate</th>
            <th className="px-4 py-2 text-right font-semibold">Total</th>
          </tr></thead>
          <tbody>
            {items.map(i => (
              <tr key={i.desc} className="border-b border-zinc-50">
                <td className="px-4 py-2 text-zinc-700">{i.desc}</td>
                <td className="px-2 py-2 text-right text-zinc-500">{i.qty}h</td>
                <td className="px-2 py-2 text-right text-zinc-500">${i.unit}</td>
                <td className="px-4 py-2 text-right font-semibold text-zinc-800">${i.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="border-t border-zinc-200 px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-zinc-500">Subtotal (USD)</span>
          <span className="text-sm font-bold text-zinc-900">${subtotal.toLocaleString()}</span>
        </div>
      </div>
    </PreviewWrap>
  );
}

function ScrollSpyPreview() {
  const [active, setActive] = useState(1);
  const sections = ['Hero', 'Features', 'Pricing', 'FAQ', 'Contact'];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="flex items-start gap-4 w-full max-w-xs">
        <div className="sticky top-0 flex flex-col gap-1 pt-1">
          {sections.map((s, i) => (
            <button key={s} onClick={() => setActive(i)}
              className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs transition ${active === i ? 'bg-blue-600 text-white font-semibold' : 'text-zinc-500 hover:text-zinc-800'}`}>
              <div className={`h-1.5 w-1.5 rounded-full ${active === i ? 'bg-white' : 'bg-zinc-300'}`} />
              {s}
            </button>
          ))}
        </div>
        <div className="flex-1 space-y-2">
          {sections.map((s, i) => (
            <div key={s} onClick={() => setActive(i)} className={`cursor-pointer rounded-xl border p-3 transition ${active === i ? 'border-blue-300 bg-blue-50' : 'border-zinc-200 bg-white hover:border-zinc-300'}`}>
              <p className="text-xs font-semibold text-zinc-700">{s}</p>
              <div className="mt-1 h-1.5 w-full rounded-full bg-zinc-100" />
            </div>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function BannerAnnouncementPreview() {
  const [visible, setVisible] = useState(true);
  const [type, setType] = useState<'info' | 'success' | 'warning' | 'error'>('info');
  const configs = {
    info: { bg: 'bg-blue-600', icon: 'ℹ️', text: 'New version 2.0 is now available!', btn: 'bg-blue-700' },
    success: { bg: 'bg-emerald-600', icon: '✅', text: 'Deployment succeeded in 34s.', btn: 'bg-emerald-700' },
    warning: { bg: 'bg-amber-500', icon: '⚠️', text: 'Scheduled maintenance on Jan 15.', btn: 'bg-amber-600' },
    error: { bg: 'bg-red-600', icon: '🚨', text: 'Service disruption detected.', btn: 'bg-red-700' },
  };
  const c = configs[type];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-sm space-y-3">
        {visible && (
          <div className={`flex items-center gap-3 rounded-xl px-4 py-3 text-white ${c.bg}`}>
            <span className="text-base shrink-0">{c.icon}</span>
            <p className="flex-1 text-xs font-medium">{c.text}</p>
            <button onClick={() => setVisible(false)} className="shrink-0 text-white/70 hover:text-white transition"><X size={14} /></button>
          </div>
        )}
        {!visible && <button onClick={() => setVisible(true)} className="text-xs text-blue-600 hover:underline">Show banner</button>}
        <div className="flex gap-1.5 flex-wrap">
          {(['info', 'success', 'warning', 'error'] as const).map(t => (
            <button key={t} onClick={() => { setType(t); setVisible(true); }}
              className={`rounded-full px-3 py-1 text-[10px] font-semibold capitalize transition ${type === t ? 'bg-zinc-900 text-white' : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'}`}>{t}</button>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function PermissionGatePreview() {
  const [role, setRole] = useState<'admin' | 'editor' | 'viewer'>('admin');
  const perms: Record<string, string[]> = {
    admin: ['View', 'Edit', 'Delete', 'Manage Users', 'Billing'],
    editor: ['View', 'Edit'],
    viewer: ['View'],
  };
  const all = ['View', 'Edit', 'Delete', 'Manage Users', 'Billing'];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs space-y-3">
        <div className="flex gap-1.5">
          {(['admin', 'editor', 'viewer'] as const).map(r => (
            <button key={r} onClick={() => setRole(r)}
              className={`rounded-full px-3 py-1 text-[10px] font-semibold capitalize transition ${role === r ? 'bg-zinc-900 text-white' : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'}`}>{r}</button>
          ))}
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden">
          {all.map(p => {
            const has = perms[role].includes(p);
            return (
              <div key={p} className={`flex items-center justify-between px-4 py-2.5 border-b border-zinc-50 last:border-0 ${!has ? 'opacity-40' : ''}`}>
                <span className="text-sm text-zinc-700">{p}</span>
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${has ? 'bg-emerald-100 text-emerald-600' : 'bg-zinc-100 text-zinc-400'}`}>{has ? '✓' : '✕'}</span>
              </div>
            );
          })}
        </div>
      </div>
    </PreviewWrap>
  );
}

function DragSortPreview() {
  const [items, setItems] = useState(['🎨 Design', '💻 Development', '🧪 Testing', '🚀 Deploy']);
  const [dragging, setDragging] = useState<number | null>(null);
  const [over, setOver] = useState<number | null>(null);
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs space-y-1.5">
        <p className="text-[10px] text-zinc-400 font-medium text-center mb-2">Drag to reorder</p>
        {items.map((item, i) => (
          <div key={item} draggable
            onDragStart={() => setDragging(i)}
            onDragOver={e => { e.preventDefault(); setOver(i); }}
            onDrop={() => {
              if (dragging !== null && dragging !== i) {
                const next = [...items]; const [moved] = next.splice(dragging, 1); next.splice(i, 0, moved);
                setItems(next);
              } setDragging(null); setOver(null);
            }}
            onDragEnd={() => { setDragging(null); setOver(null); }}
            className={`flex items-center gap-3 rounded-xl border bg-white px-4 py-2.5 cursor-grab active:cursor-grabbing transition ${over === i && dragging !== i ? 'border-blue-400 bg-blue-50 scale-[1.02]' : 'border-zinc-200'} ${dragging === i ? 'opacity-40' : ''}`}>
            <span className="text-zinc-300 text-sm">⠿</span>
            <span className="text-sm font-medium text-zinc-700">{item}</span>
            <span className="ml-auto text-[10px] text-zinc-300">#{i + 1}</span>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function CounterAnimatedPreview() {
  const [counts, setCounts] = useState([0, 0, 0]);
  const targets = [12847, 98.6, 4392];
  const labels = ['Total Users', 'Uptime %', 'Deployments'];
  const colors = ['text-blue-600', 'text-emerald-600', 'text-purple-600'];
  const animate = () => {
    setCounts([0, 0, 0]);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCounts(targets.map(t => Math.min(t, Math.round(t * (step / 30)))));
      if (step >= 30) clearInterval(interval);
    }, 33);
  };
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {labels.map((l, i) => (
            <div key={l} className="rounded-xl border border-zinc-200 bg-white p-3 text-center">
              <p className={`text-lg font-black tabular-nums ${colors[i]}`}>
                {i === 1 ? counts[i].toFixed(1) : counts[i].toLocaleString()}{i === 1 ? '%' : ''}
              </p>
              <p className="text-[10px] text-zinc-400 font-medium mt-0.5">{l}</p>
            </div>
          ))}
        </div>
        <button onClick={animate} className="w-full rounded-xl bg-zinc-900 py-2 text-xs font-semibold text-white hover:bg-zinc-800 transition">
          Animate counters
        </button>
      </div>
    </PreviewWrap>
  );
}

function ShortcutBadgePreview() {
  const shortcuts = [
    { action: 'Save', keys: ['⌘', 'S'] },
    { action: 'Find', keys: ['⌘', 'F'] },
    { action: 'Undo', keys: ['⌘', 'Z'] },
    { action: 'Copy', keys: ['⌘', 'C'] },
    { action: 'Paste', keys: ['⌘', 'V'] },
    { action: 'Select All', keys: ['⌘', 'A'] },
    { action: 'Command', keys: ['⌘', 'K'] },
    { action: 'New File', keys: ['⌘', 'N'] },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="grid grid-cols-2 gap-1.5 w-full max-w-xs">
        {shortcuts.map(s => (
          <div key={s.action} className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2">
            <span className="text-xs text-zinc-600 font-medium">{s.action}</span>
            <div className="flex gap-0.5">
              {s.keys.map(k => (
                <kbd key={k} className="rounded-md border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-600 shadow-[0_1px_0_#d4d4d8]">{k}</kbd>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function OAuthButtonsPreview() {
  const [loading, setLoading] = useState<string | null>(null);
  const providers = [
    { name: 'Google', icon: '🔵', bg: 'bg-white', text: 'text-zinc-700', border: 'border-zinc-300' },
    { name: 'GitHub', icon: '⚫', bg: 'bg-zinc-900', text: 'text-white', border: 'border-zinc-900' },
    { name: 'Twitter', icon: '🐦', bg: 'bg-sky-500', text: 'text-white', border: 'border-sky-500' },
    { name: 'Apple', icon: '🍎', bg: 'bg-black', text: 'text-white', border: 'border-black' },
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs space-y-2">
        <p className="text-center text-xs font-semibold text-zinc-500 mb-3">Sign in with</p>
        {providers.map(p => (
          <button key={p.name} onClick={() => { setLoading(p.name); setTimeout(() => setLoading(null), 1500); }}
            className={`flex w-full items-center justify-center gap-2.5 rounded-xl border py-2.5 text-sm font-semibold transition hover:opacity-90 ${p.bg} ${p.text} ${p.border}`}>
            {loading === p.name ? <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" /> : <span>{p.icon}</span>}
            {loading === p.name ? 'Connecting…' : `Continue with ${p.name}`}
          </button>
        ))}
      </div>
    </PreviewWrap>
  );
}

function EmptyStateVariantsPreview() {
  const [variant, setVariant] = useState(0);
  const variants = [
    { icon: '📭', title: 'No messages yet', desc: 'When you receive messages, they\'ll show up here.', btn: 'Compose message', color: 'text-blue-600' },
    { icon: '🔍', title: 'No results found', desc: 'Try adjusting your search or filter criteria.', btn: 'Clear filters', color: 'text-purple-600' },
    { icon: '📂', title: 'Folder is empty', desc: 'Upload files or create a new folder to get started.', btn: 'Upload files', color: 'text-emerald-600' },
  ];
  const v = variants[variant];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-full max-w-xs text-center space-y-3">
        <div className="flex justify-center gap-1.5 mb-1">
          {variants.map((_, i) => (
            <button key={i} onClick={() => setVariant(i)} className={`h-1.5 rounded-full transition-all ${variant === i ? 'w-6 bg-zinc-700' : 'w-1.5 bg-zinc-300'}`} />
          ))}
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white px-6 py-8 shadow-sm">
          <div className="text-4xl mb-3">{v.icon}</div>
          <p className="text-sm font-bold text-zinc-800">{v.title}</p>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{v.desc}</p>
          <button className={`mt-4 rounded-xl border-2 px-4 py-1.5 text-xs font-semibold transition hover:opacity-80 ${v.color} border-current`}>{v.btn}</button>
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

  /* ═══ 48 NEW COMPONENTS ═══ */

  /* ── FORMS ── */
  {
    id: 'floating-label', name: 'Floating Label Input', category: 'Forms & Inputs',
    description: 'Label that floats above on focus — clean, modern form pattern.',
    Preview: FloatingLabelPreview,
    tailwind: `<div class="relative">
  <input placeholder=" " class="peer w-full rounded-xl border border-zinc-300 bg-white px-4 pb-2.5 pt-5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" />
  <label class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-zinc-400 transition-all
    peer-focus:top-3 peer-focus:-translate-y-0 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:text-blue-600
    peer-not-placeholder-shown:top-3 peer-not-placeholder-shown:-translate-y-0 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:font-semibold">
    Email address
  </label>
</div>`,
    css: `.float-wrap { position:relative; }
.float-input { width:100%; padding:.625rem 1rem 0; padding-top:1.25rem; border-radius:.75rem; border:1px solid #d4d4d8; background:#fff; font-size:.875rem; outline:none; transition:border .15s,box-shadow .15s; }
.float-input:focus { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,.15); }
.float-label { position:absolute; left:1rem; top:50%; transform:translateY(-50%); font-size:.875rem; color:#a1a1aa; pointer-events:none; transition:all .15s; }
.float-input:focus ~ .float-label,
.float-input:not(:placeholder-shown) ~ .float-label { top:.75rem; transform:none; font-size:.625rem; font-weight:600; color:#3b82f6; }`,
  },
  {
    id: 'otp-input', name: 'OTP / Verification Code', category: 'Forms & Inputs',
    description: 'Six-box one-time password input with auto-focus and fill highlight.',
    Preview: OTPInputPreview,
    tailwind: `<div class="flex justify-center gap-2">
  <input type="text" maxlength="1" class="h-11 w-10 rounded-xl border-2 border-zinc-300 bg-white text-center text-lg font-bold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" />
  <input type="text" maxlength="1" class="h-11 w-10 rounded-xl border-2 border-blue-600 bg-blue-50 text-center text-lg font-bold text-blue-700 outline-none" />
  <!-- Repeat for 6 boxes -->
</div>`,
    css: `.otp-group { display:flex; gap:.5rem; justify-content:center; }
.otp-box { width:2.5rem; height:2.75rem; border-radius:.75rem; border:2px solid #d4d4d8; background:#fff; text-align:center; font-size:1.125rem; font-weight:700; outline:none; transition:.15s; }
.otp-box:focus { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,.15); }
.otp-box.filled { border-color:#2563eb; background:#eff6ff; color:#1d4ed8; }`,
  },
  {
    id: 'password-strength', name: 'Password Strength', category: 'Forms & Inputs',
    description: 'Password field with animated strength meter and requirement checklist.',
    Preview: PasswordStrengthPreview,
    tailwind: `<div class="space-y-2">
  <input type="password" class="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" placeholder="Enter password…" />
  <!-- Strength bars -->
  <div class="flex gap-1.5">
    <div class="h-1.5 flex-1 rounded-full bg-red-500"></div>
    <div class="h-1.5 flex-1 rounded-full bg-red-500"></div>
    <div class="h-1.5 flex-1 rounded-full bg-zinc-200"></div>
    <div class="h-1.5 flex-1 rounded-full bg-zinc-200"></div>
  </div>
  <p class="text-xs font-semibold text-red-500">Weak</p>
  <!-- Requirements -->
  <div class="grid grid-cols-2 gap-1">
    <div class="flex items-center gap-1.5 text-[11px] text-emerald-600"><span>✓</span>Uppercase</div>
    <div class="flex items-center gap-1.5 text-[11px] text-zinc-400"><span>○</span>Number</div>
  </div>
</div>`,
    css: `.pw-bars { display:flex; gap:.375rem; }
.pw-bar { flex:1; height:.375rem; border-radius:9999px; background:#e4e4e7; transition:background .3s; }
.pw-bar.weak   { background:#ef4444; }
.pw-bar.fair   { background:#f97316; }
.pw-bar.good   { background:#eab308; }
.pw-bar.strong { background:#10b981; }
.pw-reqs { display:grid; grid-template-columns:1fr 1fr; gap:.25rem; margin-top:.5rem; }
.pw-req { display:flex; align-items:center; gap:.375rem; font-size:.6875rem; color:#a1a1aa; }
.pw-req.met { color:#059669; }`,
  },
  {
    id: 'number-stepper', name: 'Number Stepper', category: 'Forms & Inputs',
    description: 'Increment/decrement counter input — great for quantity, booking, and settings.',
    Preview: NumberStepperPreview,
    tailwind: `<div class="flex items-center justify-between">
  <span class="text-sm font-medium text-zinc-700">Adults</span>
  <div class="flex items-center rounded-xl border border-zinc-200 overflow-hidden shadow-sm">
    <button class="h-9 w-9 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 font-bold text-lg transition">−</button>
    <span class="w-8 text-center text-sm font-bold text-zinc-800">1</span>
    <button class="h-9 w-9 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 font-bold text-lg transition">+</button>
  </div>
</div>`,
    css: `.stepper-input { display:flex; align-items:center; border-radius:.75rem; border:1px solid #e4e4e7; overflow:hidden; box-shadow:0 1px 2px rgba(0,0,0,.06); }
.stepper-btn { width:2.25rem; height:2.25rem; display:flex; align-items:center; justify-content:center; background:#fff; border:none; cursor:pointer; font-size:1.125rem; font-weight:700; color:#71717a; transition:background .15s; }
.stepper-btn:hover { background:#fafafa; }
.stepper-val { width:2rem; text-align:center; font-size:.875rem; font-weight:700; color:#18181b; }`,
  },
  {
    id: 'color-picker-input', name: 'Color Picker Input', category: 'Forms & Inputs',
    description: 'Color swatch + HEX input with preset palette swatches.',
    Preview: ColorPickerInputPreview,
    tailwind: `<!-- Color input row -->
<div class="flex items-center gap-3 rounded-xl border border-zinc-300 bg-white px-3 py-2.5 shadow-sm">
  <div class="relative h-8 w-8 rounded-lg overflow-hidden border border-zinc-200 cursor-pointer" style="background:#3b82f6">
    <input type="color" value="#3b82f6" class="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
  </div>
  <input value="#3B82F6" class="flex-1 bg-transparent font-mono text-sm text-zinc-700 outline-none uppercase" maxlength="7" />
  <span class="text-xs text-zinc-400 font-medium">HEX</span>
</div>
<!-- Preset swatches -->
<div class="flex gap-1.5 flex-wrap mt-2">
  <button class="h-7 w-7 rounded-lg border-2 border-transparent hover:scale-110 transition" style="background:#ef4444"></button>
  <button class="h-7 w-7 rounded-lg border-2 border-zinc-700 scale-110" style="background:#3b82f6"></button>
</div>`,
    css: `.color-input-row { display:flex; align-items:center; gap:.75rem; padding:.625rem .75rem; border-radius:.75rem; border:1px solid #d4d4d8; background:#fff; }
.color-swatch { width:2rem; height:2rem; border-radius:.5rem; border:1px solid #e4e4e7; position:relative; overflow:hidden; cursor:pointer; }
.color-swatch input[type=color] { position:absolute; inset:0; opacity:0; cursor:pointer; width:100%; height:100%; }
.color-hex { flex:1; background:transparent; font-family:monospace; font-size:.875rem; color:#3f3f46; outline:none; text-transform:uppercase; }
.color-presets { display:flex; gap:.375rem; flex-wrap:wrap; margin-top:.5rem; }
.color-preset { width:1.75rem; height:1.75rem; border-radius:.5rem; border:2px solid transparent; cursor:pointer; transition:transform .15s,border-color .15s; }
.color-preset:hover,.color-preset.active { transform:scale(1.1); border-color:#27272a; }`,
  },
  {
    id: 'phone-input', name: 'Phone Number Input', category: 'Forms & Inputs',
    description: 'Country code selector + phone number field combined input.',
    Preview: PhoneInputPreview,
    tailwind: `<div class="flex overflow-hidden rounded-xl border border-zinc-300 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition">
  <select class="shrink-0 appearance-none bg-zinc-100 px-3 text-sm font-medium text-zinc-700 outline-none border-r border-zinc-300 cursor-pointer">
    <option>+1</option>
    <option>+44</option>
    <option>+91</option>
  </select>
  <input type="tel" placeholder="(555) 000-0000" class="flex-1 bg-white px-4 py-2.5 text-sm text-zinc-800 placeholder-zinc-400 outline-none" />
</div>`,
    css: `.phone-wrap { display:flex; overflow:hidden; border-radius:.75rem; border:1px solid #d4d4d8; transition:border .15s,box-shadow .15s; }
.phone-wrap:focus-within { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,.15); }
.phone-code { padding:0 .75rem; background:#f4f4f5; border-right:1px solid #d4d4d8; font-size:.875rem; font-weight:500; color:#3f3f46; outline:none; cursor:pointer; }
.phone-number { flex:1; padding:.625rem 1rem; font-size:.875rem; background:#fff; outline:none; }`,
  },
  {
    id: 'date-input', name: 'Date & Date Range', category: 'Forms & Inputs',
    description: 'Single date input and date range picker with icon prefix.',
    Preview: DateInputPreview,
    tailwind: `<!-- Single date -->
<div class="relative">
  <span class="absolute left-3.5 top-1/2 -translate-y-1/2">📅</span>
  <input type="date" class="w-full rounded-xl border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-700 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" />
</div>
<!-- Date range -->
<div class="flex items-center gap-2">
  <div class="relative flex-1">
    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm">📅</span>
    <input type="date" class="w-full rounded-xl border border-zinc-300 bg-white py-2 pl-8 pr-2 text-xs outline-none focus:border-blue-500 transition" />
  </div>
  <span class="text-zinc-400">→</span>
  <div class="relative flex-1">
    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm">📅</span>
    <input type="date" class="w-full rounded-xl border border-zinc-300 bg-white py-2 pl-8 pr-2 text-xs outline-none focus:border-blue-500 transition" />
  </div>
</div>`,
    css: `.date-input { width:100%; padding:.625rem 1rem .625rem 2.5rem; border-radius:.75rem; border:1px solid #d4d4d8; background:#fff; font-size:.875rem; color:#3f3f46; outline:none; }
.date-input:focus { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,.15); }`,
  },
  {
    id: 'multi-select', name: 'Multi-Select', category: 'Forms & Inputs',
    description: 'Dropdown with checkboxes — select multiple options with badge chips.',
    Preview: MultiSelectPreview,
    tailwind: `<!-- Trigger with selected chips -->
<div class="flex flex-wrap items-center gap-1.5 rounded-xl border border-zinc-300 bg-white p-2.5 min-h-[2.75rem] cursor-pointer">
  <span class="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
    Design <span class="cursor-pointer text-blue-400 hover:text-blue-700">×</span>
  </span>
  <svg class="ml-auto h-3.5 w-3.5 text-zinc-400" .../><!-- ChevronDown -->
</div>
<!-- Dropdown -->
<div class="mt-1 rounded-xl border border-zinc-200 bg-white shadow-xl py-1">
  <button class="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50">
    <div class="h-4 w-4 rounded border-2 border-blue-600 bg-blue-600 flex items-center justify-center"><svg .../></div>
    Design
  </button>
</div>`,
    css: `.multi-select { width:100%; }
.ms-trigger { display:flex; flex-wrap:wrap; align-items:center; gap:.375rem; padding:.625rem; border-radius:.75rem; border:1px solid #d4d4d8; background:#fff; cursor:pointer; min-height:2.75rem; }
.ms-chip { display:inline-flex; align-items:center; gap:.25rem; padding:.125rem .5rem; border-radius:9999px; background:#dbeafe; color:#1d4ed8; font-size:.75rem; font-weight:600; }
.ms-menu { border-radius:.75rem; border:1px solid #e4e4e7; background:#fff; box-shadow:0 10px 25px rgba(0,0,0,.1); }
.ms-option { display:flex; align-items:center; gap:.625rem; padding:.5rem 1rem; font-size:.875rem; cursor:pointer; }
.ms-option:hover { background:#fafafa; }`,
  },
  {
    id: 'credit-card', name: 'Credit Card Form', category: 'Forms & Inputs',
    description: 'Animated credit card preview with number, expiry, and CVV fields.',
    Preview: CreditCardPreview,
    tailwind: `<!-- Card preview -->
<div class="rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 p-5 text-white shadow-xl">
  <div class="flex justify-between"><span class="text-[10px] font-bold tracking-widest text-zinc-400">CREDIT CARD</span><span class="text-2xl">💳</span></div>
  <div class="mt-4 font-mono text-lg tracking-widest">•••• •••• •••• ••••</div>
  <div class="mt-3 flex justify-between text-[10px] text-zinc-400">
    <div><div class="uppercase text-[9px]">Card Holder</div><div class="text-white text-xs font-medium mt-0.5">John Doe</div></div>
    <div class="text-right"><div class="uppercase text-[9px]">Expires</div><div class="text-white text-xs font-medium mt-0.5">12/26</div></div>
  </div>
</div>
<!-- Fields -->
<input placeholder="1234 5678 9012 3456" class="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 font-mono text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 mt-3" />
<div class="flex gap-3 mt-3">
  <input placeholder="MM/YY" class="flex-1 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500" />
  <input placeholder="CVV" class="w-20 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500" />
</div>`,
    css: `.cc-preview { border-radius:1rem; padding:1.25rem; background:linear-gradient(135deg,#27272a,#18181b); color:#fff; box-shadow:0 8px 32px rgba(0,0,0,.3); }
.cc-number { font-family:monospace; font-size:1.125rem; letter-spacing:.1em; margin-top:1rem; }
.cc-meta { display:flex; justify-content:space-between; margin-top:.75rem; font-size:.625rem; color:#a1a1aa; }
.cc-meta-val { color:#fff; font-size:.75rem; font-weight:500; margin-top:.125rem; }`,
  },
  {
    id: 'switch-group', name: 'Switch Group', category: 'Forms & Inputs',
    description: 'Grouped notification preference toggles with label and sub-label.',
    Preview: SwitchGroupPreview,
    tailwind: `<div class="divide-y divide-zinc-100 rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
  <div class="flex items-center justify-between px-4 py-3.5">
    <div>
      <p class="text-sm font-medium text-zinc-800">Email Notifications</p>
      <p class="text-[11px] text-zinc-400 mt-0.5">Receive updates via email</p>
    </div>
    <!-- Toggle -->
    <button class="relative h-6 w-11 rounded-full bg-blue-600 shrink-0 ml-4">
      <span class="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow translate-x-5"></span>
    </button>
  </div>
</div>`,
    css: `.switch-group { border-radius:1rem; border:1px solid #e4e4e7; background:#fff; overflow:hidden; }
.switch-row { display:flex; align-items:center; justify-content:space-between; padding:.875rem 1rem; border-bottom:1px solid #f4f4f5; }
.switch-label { font-size:.875rem; font-weight:500; color:#27272a; }
.switch-sub   { font-size:.6875rem; color:#a1a1aa; margin-top:.125rem; }`,
  },

  /* ── DISPLAY ── */
  {
    id: 'donut-chart', name: 'Donut Chart', category: 'Display',
    description: 'CSS + SVG donut chart with legend — no library required.',
    Preview: DonutChartPreview,
    tailwind: `<div class="flex items-center gap-6">
  <svg width="100" height="100" viewBox="0 0 100 100" class="-rotate-90">
    <!-- Track -->
    <circle cx="50" cy="50" r="40" fill="none" stroke="#e4e4e7" stroke-width="12" />
    <!-- Blue segment 35% -->
    <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" stroke-width="12"
      stroke-dasharray="87.96 163.36" stroke-dashoffset="0" />
    <!-- Green segment 45% -->
    <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" stroke-width="12"
      stroke-dasharray="113.1 138.22" stroke-dashoffset="-87.96" />
  </svg>
  <div class="space-y-2">
    <div class="flex items-center gap-2 text-xs"><span class="h-2.5 w-2.5 rounded-full bg-blue-500"></span>Design <span class="font-bold ml-auto">35%</span></div>
    <div class="flex items-center gap-2 text-xs"><span class="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>Dev <span class="font-bold ml-auto">45%</span></div>
  </div>
</div>`,
    css: `.donut-chart { transform:rotate(-90deg); }
.donut-segment { fill:none; stroke-width:12; transition:stroke-dasharray .5s ease; }
.donut-legend { display:flex; flex-direction:column; gap:.5rem; }
.donut-legend-item { display:flex; align-items:center; gap:.5rem; font-size:.75rem; color:#52525b; }
.donut-dot { width:.625rem; height:.625rem; border-radius:9999px; flex-shrink:0; }`,
  },
  {
    id: 'bar-chart', name: 'Bar Chart', category: 'Display',
    description: 'Simple vertical bar chart with value labels — pure CSS, no library.',
    Preview: BarChartPreview,
    tailwind: `<div class="flex items-end justify-between gap-2 h-28">
  <!-- Bar -->
  <div class="flex flex-col items-center gap-1 flex-1">
    <span class="text-[9px] font-bold text-zinc-500">65</span>
    <div class="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition cursor-pointer" style="height:52px"></div>
  </div>
  <!-- Repeat per data point -->
</div>
<div class="flex justify-between mt-1">
  <span class="flex-1 text-center text-[9px] text-zinc-400">Mon</span>
  <!-- Repeat labels -->
</div>`,
    css: `.bar-chart { display:flex; align-items:flex-end; gap:.5rem; height:7rem; }
.bar { flex:1; display:flex; flex-direction:column; align-items:center; gap:.25rem; }
.bar-fill { width:100%; border-radius:.25rem .25rem 0 0; background:linear-gradient(to top,#2563eb,#60a5fa); transition:opacity .15s; }
.bar-fill:hover { opacity:.8; }
.bar-label { font-size:.5625rem; font-weight:700; color:#71717a; }`,
  },
  {
    id: 'testimonial', name: 'Testimonial Card', category: 'Display',
    description: 'Social proof quote card with star rating, avatar, and role.',
    Preview: TestimonialPreview,
    tailwind: `<div class="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
  <div class="flex gap-0.5 mb-3">
    <span class="text-amber-400 text-sm">★</span><!-- ×5 -->
  </div>
  <p class="text-sm text-zinc-600 leading-relaxed italic">
    "This is hands down the best component library I've used. Saved our team weeks of work."
  </p>
  <div class="mt-4 flex items-center gap-3">
    <div class="h-9 w-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">SM</div>
    <div>
      <p class="text-sm font-semibold text-zinc-800">Sarah Miller</p>
      <p class="text-xs text-zinc-400">CTO at TechCorp</p>
    </div>
  </div>
</div>`,
    css: `.testimonial { border-radius:1rem; border:1px solid #e4e4e7; background:#fff; padding:1.25rem; box-shadow:0 1px 3px rgba(0,0,0,.06); }
.testimonial-stars { display:flex; gap:.125rem; margin-bottom:.75rem; color:#fbbf24; font-size:.875rem; }
.testimonial-quote { font-size:.875rem; color:#52525b; font-style:italic; line-height:1.7; }
.testimonial-author { display:flex; align-items:center; gap:.75rem; margin-top:1rem; }
.testimonial-name { font-size:.875rem; font-weight:600; color:#27272a; }
.testimonial-role { font-size:.75rem; color:#a1a1aa; }`,
  },
  {
    id: 'feed-post', name: 'Social Feed Post', category: 'Display',
    description: 'Social media post card with avatar, actions (like, comment, share), and image.',
    Preview: FeedPostPreview,
    tailwind: `<div class="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
  <!-- Header -->
  <div class="flex items-center justify-between p-4">
    <div class="flex items-center gap-3">
      <div class="h-9 w-9 rounded-full bg-rose-400 flex items-center justify-center text-white text-xs font-bold">JD</div>
      <div><p class="text-sm font-semibold text-zinc-800">Jane Doe</p><p class="text-xs text-zinc-400">2 hours ago</p></div>
    </div>
    <button class="text-zinc-400">⋯</button>
  </div>
  <p class="px-4 pb-3 text-sm text-zinc-700 leading-relaxed">Just shipped the new design system! 🎉</p>
  <!-- Image -->
  <div class="h-28 bg-gradient-to-br from-blue-500 to-indigo-600"></div>
  <!-- Actions -->
  <div class="flex items-center gap-4 px-4 py-3 border-t border-zinc-100">
    <button class="flex items-center gap-1.5 text-xs font-medium text-red-500">❤️ 142</button>
    <button class="flex items-center gap-1.5 text-xs font-medium text-zinc-500">💬 24</button>
    <button class="flex items-center gap-1.5 text-xs font-medium text-zinc-500">↗️ Share</button>
  </div>
</div>`,
    css: `.feed-post { border-radius:1rem; border:1px solid #e4e4e7; background:#fff; overflow:hidden; }
.feed-header { display:flex; align-items:center; justify-content:space-between; padding:1rem; }
.feed-meta { display:flex; align-items:center; gap:.75rem; }
.feed-actions { display:flex; align-items:center; gap:1rem; padding:.75rem 1rem; border-top:1px solid #f4f4f5; }
.feed-action { display:flex; align-items:center; gap:.375rem; font-size:.75rem; font-weight:500; background:none; border:none; cursor:pointer; color:#71717a; }`,
  },
  {
    id: 'comment-thread', name: 'Comment Thread', category: 'Display',
    description: 'Nested comment list with input field, reply counts, and live submission.',
    Preview: CommentPreview,
    tailwind: `<!-- Add comment row -->
<div class="flex gap-3">
  <div class="h-8 w-8 shrink-0 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px] font-bold">You</div>
  <div class="flex-1 flex gap-2">
    <input placeholder="Add a comment…" class="flex-1 rounded-xl border border-zinc-300 bg-white px-3 py-2 text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
    <button class="rounded-xl bg-blue-600 px-3 text-xs font-semibold text-white hover:bg-blue-700">Post</button>
  </div>
</div>
<!-- Comment -->
<div class="flex gap-3">
  <div class="h-8 w-8 shrink-0 rounded-full bg-zinc-400 flex items-center justify-center text-white text-[9px] font-bold">AC</div>
  <div class="flex-1 rounded-xl bg-white border border-zinc-100 px-3 py-2.5 shadow-sm">
    <div class="flex items-center gap-2"><p class="text-xs font-semibold text-zinc-800">Alex Chen</p><p class="text-[10px] text-zinc-400">5m ago</p></div>
    <p class="mt-0.5 text-xs text-zinc-600">Great component! Love the clean design.</p>
  </div>
</div>`,
    css: `.comment-box { display:flex; gap:.75rem; }
.comment-avatar { width:2rem; height:2rem; border-radius:9999px; display:flex; align-items:center; justify-content:center; font-size:.625rem; font-weight:700; color:#fff; flex-shrink:0; }
.comment-bubble { flex:1; border-radius:.75rem; border:1px solid #f4f4f5; background:#fff; padding:.625rem .75rem; box-shadow:0 1px 2px rgba(0,0,0,.05); }
.comment-author { font-size:.75rem; font-weight:600; color:#27272a; }
.comment-time   { font-size:.625rem; color:#a1a1aa; }
.comment-text   { font-size:.75rem; color:#52525b; margin-top:.25rem; }`,
  },
  {
    id: 'file-card', name: 'File Cards', category: 'Display',
    description: 'File and document cards with icon, name, size, and hover effect.',
    Preview: FileCardPreview,
    tailwind: `<div class="grid grid-cols-2 gap-2">
  <div class="rounded-xl border border-zinc-200 bg-white p-3 hover:shadow-md transition cursor-pointer group">
    <div class="h-10 w-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl mb-2">🎨</div>
    <p class="text-xs font-semibold text-zinc-800 truncate group-hover:text-blue-600 transition">design-system.fig</p>
    <p class="text-[10px] text-zinc-400 mt-0.5">24.5 MB</p>
  </div>
  <div class="rounded-xl border border-zinc-200 bg-white p-3 hover:shadow-md transition cursor-pointer group">
    <div class="h-10 w-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-xl mb-2">📄</div>
    <p class="text-xs font-semibold text-zinc-800 truncate group-hover:text-blue-600 transition">report-Q4.pdf</p>
    <p class="text-[10px] text-zinc-400 mt-0.5">2.1 MB</p>
  </div>
</div>`,
    css: `.file-card { border-radius:.75rem; border:1px solid #e4e4e7; background:#fff; padding:.75rem; cursor:pointer; transition:box-shadow .2s; }
.file-card:hover { box-shadow:0 4px 16px rgba(0,0,0,.08); }
.file-icon { width:2.5rem; height:2.5rem; border-radius:.75rem; display:flex; align-items:center; justify-content:center; font-size:1.25rem; margin-bottom:.5rem; }
.file-name { font-size:.75rem; font-weight:600; color:#27272a; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.file-size { font-size:.625rem; color:#a1a1aa; margin-top:.125rem; }`,
  },
  {
    id: 'comparison-table', name: 'Comparison Table', category: 'Display',
    description: 'Feature comparison matrix with ✓ / — for free, pro, and enterprise plans.',
    Preview: ComparisonTablePreview,
    tailwind: `<table class="w-full text-xs text-center">
  <thead>
    <tr>
      <th class="text-left py-2 text-zinc-500 font-medium text-[11px]">Feature</th>
      <th class="py-2 font-bold text-[11px] text-zinc-700">Free</th>
      <th class="py-2 font-bold text-[11px] text-blue-600">Pro</th>
      <th class="py-2 font-bold text-[11px] text-zinc-700">Enterprise</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-zinc-100">
    <tr class="hover:bg-zinc-50">
      <td class="py-2 text-left text-[11px] text-zinc-600">Unlimited projects</td>
      <td class="py-2"><span class="text-emerald-500 font-bold">✓</span></td>
      <td class="py-2"><span class="text-emerald-500 font-bold">✓</span></td>
      <td class="py-2"><span class="text-emerald-500 font-bold">✓</span></td>
    </tr>
    <tr class="hover:bg-zinc-50">
      <td class="py-2 text-left text-[11px] text-zinc-600">API access</td>
      <td class="py-2"><span class="text-zinc-300">–</span></td>
      <td class="py-2"><span class="text-emerald-500 font-bold">✓</span></td>
      <td class="py-2"><span class="text-emerald-500 font-bold">✓</span></td>
    </tr>
  </tbody>
</table>`,
    css: `.compare-table { width:100%; border-collapse:collapse; font-size:.75rem; text-align:center; }
.compare-table th { padding:.5rem; font-size:.6875rem; font-weight:600; color:#71717a; }
.compare-table th.featured { color:#2563eb; }
.compare-table td { padding:.5rem; border-bottom:1px solid #f4f4f5; font-size:.6875rem; color:#52525b; }
.compare-table tr:hover td { background:#fafafa; }
.check { color:#059669; font-weight:700; } .dash { color:#d4d4d8; }`,
  },
  {
    id: 'team-card', name: 'Team Card Grid', category: 'Display',
    description: 'Team member cards with gradient avatar, name, role, and social links.',
    Preview: TeamCardPreview,
    tailwind: `<div class="grid grid-cols-2 gap-3">
  <div class="rounded-2xl border border-zinc-200 bg-white p-4 text-center hover:shadow-md transition">
    <div class="mx-auto h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm mb-2">AC</div>
    <p class="text-xs font-bold text-zinc-800">Alex Chen</p>
    <p class="text-[10px] text-zinc-400 mt-0.5">CEO</p>
    <div class="mt-2 flex justify-center gap-2">
      <button class="h-6 w-6 rounded-full bg-zinc-100 hover:bg-zinc-200 text-[10px] text-zinc-500 transition flex items-center justify-center">𝕏</button>
      <button class="h-6 w-6 rounded-full bg-zinc-100 hover:bg-zinc-200 text-[10px] text-zinc-500 transition flex items-center justify-center">in</button>
    </div>
  </div>
</div>`,
    css: `.team-card { border-radius:1rem; border:1px solid #e4e4e7; background:#fff; padding:1rem; text-align:center; transition:box-shadow .2s; }
.team-card:hover { box-shadow:0 4px 16px rgba(0,0,0,.08); }
.team-avatar { margin:0 auto .5rem; width:3rem; height:3rem; border-radius:9999px; display:flex; align-items:center; justify-content:center; font-weight:700; color:#fff; }
.team-name { font-size:.75rem; font-weight:700; color:#18181b; }
.team-role { font-size:.625rem; color:#a1a1aa; margin-top:.125rem; }
.team-socials { display:flex; justify-content:center; gap:.5rem; margin-top:.5rem; }`,
  },
  {
    id: 'order-summary', name: 'Order Summary', category: 'Display',
    description: 'E-commerce order summary with items, subtotal, tax, and checkout button.',
    Preview: OrderSummaryPreview,
    tailwind: `<div class="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
  <div class="border-b border-zinc-100 px-4 py-3"><p class="text-sm font-bold text-zinc-800">Order Summary</p></div>
  <div class="divide-y divide-zinc-50 px-4">
    <div class="flex items-center justify-between py-2.5">
      <div><p class="text-xs font-medium text-zinc-800">Pro Plan</p><p class="text-[10px] text-zinc-400">×1</p></div>
      <p class="text-xs font-semibold text-zinc-700">$29.00</p>
    </div>
  </div>
  <div class="border-t border-zinc-200 px-4 py-3 space-y-1.5">
    <div class="flex justify-between text-xs text-zinc-500"><span>Subtotal</span><span>$43.00</span></div>
    <div class="flex justify-between text-xs text-zinc-500"><span>Tax (10%)</span><span>$4.30</span></div>
    <div class="flex justify-between text-sm font-bold text-zinc-800 pt-1 border-t border-zinc-100"><span>Total</span><span>$47.30</span></div>
  </div>
  <div class="px-4 pb-4"><button class="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition">Checkout</button></div>
</div>`,
    css: `.order-card { border-radius:1rem; border:1px solid #e4e4e7; background:#fff; overflow:hidden; }
.order-header { padding:.75rem 1rem; border-bottom:1px solid #f4f4f5; font-size:.875rem; font-weight:700; color:#27272a; }
.order-item { display:flex; align-items:center; justify-content:space-between; padding:.625rem 1rem; border-bottom:1px solid #fafafa; }
.order-totals { padding:.75rem 1rem; border-top:1px solid #e4e4e7; }
.order-row { display:flex; justify-content:space-between; font-size:.75rem; color:#71717a; margin-bottom:.375rem; }
.order-total { display:flex; justify-content:space-between; font-size:.875rem; font-weight:700; color:#18181b; padding-top:.375rem; border-top:1px solid #f4f4f5; }`,
  },
  {
    id: 'metric-sparkline', name: 'Metric + Sparkline', category: 'Display',
    description: 'KPI card with an inline SVG sparkline trend line — no library needed.',
    Preview: MetricSparklinePreview,
    tailwind: `<div class="rounded-xl border border-zinc-200 bg-white p-3 shadow-sm">
  <p class="text-[10px] font-medium text-zinc-400 uppercase tracking-wide">Revenue</p>
  <p class="mt-1 text-lg font-bold text-zinc-800">$12,845</p>
  <!-- SVG sparkline -->
  <svg viewBox="0 0 100 100" class="h-8 w-full my-2" preserveAspectRatio="none">
    <polyline fill="none" stroke="#3b82f6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
      points="0,70 11,55 22,72 33,40 44,25 55,48 66,10 77,32 88,15 100,5" />
  </svg>
  <span class="text-[10px] font-bold text-emerald-600">+18%</span>
</div>`,
    css: `.metric-card { border-radius:.75rem; border:1px solid #e4e4e7; background:#fff; padding:.75rem; box-shadow:0 1px 3px rgba(0,0,0,.06); }
.metric-label { font-size:.625rem; font-weight:500; color:#a1a1aa; text-transform:uppercase; letter-spacing:.08em; }
.metric-value { font-size:1.125rem; font-weight:700; color:#18181b; margin-top:.25rem; }
.metric-sparkline { display:block; width:100%; height:2rem; margin:.5rem 0; }
.metric-change-up   { font-size:.625rem; font-weight:700; color:#059669; }
.metric-change-down { font-size:.625rem; font-weight:700; color:#dc2626; }`,
  },
  {
    id: 'heatmap', name: 'Activity Heatmap', category: 'Display',
    description: 'GitHub-style contribution heatmap grid with color intensity legend.',
    Preview: HeatmapPreview,
    tailwind: `<!-- Heatmap row (repeat per day) -->
<div class="flex items-center gap-1">
  <span class="w-6 text-[9px] text-zinc-400 text-right">Mon</span>
  <div class="h-3 w-3 rounded-sm bg-zinc-100"></div>
  <div class="h-3 w-3 rounded-sm bg-emerald-200"></div>
  <div class="h-3 w-3 rounded-sm bg-emerald-500"></div>
  <!-- Repeat cells per week -->
</div>
<!-- Legend -->
<div class="flex items-center gap-1 mt-1">
  <span class="text-[9px] text-zinc-400">Less</span>
  <div class="h-2.5 w-2.5 rounded-sm bg-zinc-100"></div>
  <div class="h-2.5 w-2.5 rounded-sm bg-emerald-200"></div>
  <div class="h-2.5 w-2.5 rounded-sm bg-emerald-500"></div>
  <div class="h-2.5 w-2.5 rounded-sm bg-emerald-700"></div>
  <span class="text-[9px] text-zinc-400">More</span>
</div>`,
    css: `.heatmap { display:flex; flex-direction:column; gap:.25rem; }
.heatmap-row { display:flex; align-items:center; gap:.25rem; }
.heatmap-day { width:.75rem; height:.75rem; border-radius:.2rem; }
.heatmap-0 { background:#f4f4f5; } .heatmap-1 { background:#bbf7d0; }
.heatmap-2 { background:#4ade80; } .heatmap-3 { background:#16a34a; } .heatmap-4 { background:#14532d; }`,
  },
  {
    id: 'quote', name: 'Blockquote Styles', category: 'Display',
    description: 'Styled blockquote variants — colored accent, dark, and pull quote.',
    Preview: QuotePreview,
    tailwind: `<!-- Blue accent quote -->
<blockquote class="rounded-2xl border-l-4 border-blue-500 bg-blue-50 px-5 py-4">
  <p class="text-sm text-blue-900 italic leading-relaxed">"Design is not just what it looks like and feels like. Design is how it works."</p>
  <footer class="mt-2 text-xs font-semibold text-blue-600">— Steve Jobs</footer>
</blockquote>
<!-- Dark quote -->
<blockquote class="rounded-2xl bg-zinc-900 px-5 py-4">
  <p class="text-2xl text-zinc-400 font-serif leading-none mb-2">"</p>
  <p class="text-sm text-zinc-300 leading-relaxed">Any sufficiently advanced technology is indistinguishable from magic.</p>
  <footer class="mt-2 text-xs text-zinc-500">— Arthur C. Clarke</footer>
</blockquote>`,
    css: `.blockquote { border-radius:1rem; padding:1rem 1.25rem; }
.blockquote-blue { border-left:4px solid #3b82f6; background:#eff6ff; }
.blockquote-blue p { color:#1e3a8a; font-style:italic; }
.blockquote-dark { background:#18181b; }
.blockquote-dark p { color:#d4d4d8; }
.blockquote footer { font-size:.75rem; font-weight:600; margin-top:.5rem; }`,
  },
  {
    id: 'image-card', name: 'Image Overlay Card', category: 'Display',
    description: 'Image card with gradient overlay, title, badge, and hover zoom effect.',
    Preview: ImageCardPreview,
    tailwind: `<div class="relative w-40 h-28 rounded-2xl overflow-hidden group cursor-pointer">
  <img src="..." alt="" class="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition duration-500" />
  <!-- Or gradient placeholder -->
  <div class="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700"></div>
  <!-- Overlay content -->
  <div class="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/70 via-transparent">
    <p class="text-white text-xs font-bold">Mountain Vista</p>
    <p class="text-white/70 text-[10px]">Photography</p>
  </div>
  <!-- Hover overlay -->
  <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
    <span class="text-white text-2xl">🔍</span>
  </div>
</div>`,
    css: `.img-card { position:relative; border-radius:1rem; overflow:hidden; cursor:pointer; }
.img-card img { width:100%; height:100%; object-fit:cover; transition:transform .5s; }
.img-card:hover img { transform:scale(1.1); }
.img-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,.7) 0%,transparent 60%); display:flex; flex-direction:column; justify-content:flex-end; padding:.75rem; }
.img-title { color:#fff; font-size:.75rem; font-weight:700; }`,
  },

  /* ── NAVIGATION ── */
  {
    id: 'bottom-nav', name: 'Bottom Navigation', category: 'Navigation',
    description: 'Mobile-style tab bar with active indicator, badge, and icons.',
    Preview: BottomNavPreview,
    tailwind: `<nav class="flex bg-white border-t border-zinc-200 safe-area-inset-bottom">
  <!-- Active tab -->
  <button class="relative flex flex-1 flex-col items-center py-2.5 gap-0.5 text-blue-600">
    <span class="text-lg leading-none">🏠</span>
    <span class="text-[9px] font-medium">Home</span>
    <span class="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-5 rounded-full bg-blue-600"></span>
  </button>
  <!-- Inactive tab with badge -->
  <button class="relative flex flex-1 flex-col items-center py-2.5 gap-0.5 text-zinc-400 hover:text-zinc-600">
    <span class="text-lg leading-none">🔔</span>
    <span class="text-[9px] font-medium">Alerts</span>
    <span class="absolute top-1.5 right-3 h-3.5 min-w-[14px] rounded-full bg-red-500 text-[8px] font-bold text-white flex items-center justify-center px-0.5">3</span>
  </button>
</nav>`,
    css: `.bottom-nav { display:flex; background:#fff; border-top:1px solid #e4e4e7; }
.bottom-nav-item { flex:1; display:flex; flex-direction:column; align-items:center; padding:.625rem 0; gap:.125rem; position:relative; cursor:pointer; color:#a1a1aa; transition:color .15s; }
.bottom-nav-item.active { color:#2563eb; }
.bottom-nav-item.active::after { content:''; position:absolute; bottom:0; width:1.25rem; height:2px; border-radius:9999px; background:#2563eb; }`,
  },
  {
    id: 'drawer', name: 'Drawer / Side Panel', category: 'Navigation',
    description: 'Slide-in side drawer with overlay backdrop and content sections.',
    Preview: DrawerPreview,
    tailwind: `<!-- Trigger -->
<button class="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-semibold text-white">Open Drawer</button>

<!-- Drawer -->
<div class="fixed inset-0 z-50 flex">
  <!-- Backdrop -->
  <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
  <!-- Panel -->
  <div class="relative ml-auto h-full w-72 bg-white shadow-2xl flex flex-col">
    <div class="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
      <h3 class="font-semibold text-zinc-800">Side Panel</h3>
      <button class="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100">✕</button>
    </div>
    <div class="flex-1 overflow-y-auto p-5 space-y-1">
      <button class="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50">Account settings <span>›</span></button>
    </div>
    <div class="border-t p-4">
      <button class="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white">Upgrade Plan</button>
    </div>
  </div>
</div>`,
    css: `.drawer-backdrop { position:fixed; inset:0; z-index:50; display:flex; background:rgba(0,0,0,.4); backdrop-filter:blur(4px); }
.drawer { position:relative; margin-left:auto; height:100%; width:18rem; background:#fff; box-shadow:-10px 0 40px rgba(0,0,0,.15); display:flex; flex-direction:column; }
.drawer-header { display:flex; align-items:center; justify-content:space-between; padding:1rem 1.25rem; border-bottom:1px solid #f4f4f5; }
.drawer-body   { flex:1; overflow-y:auto; padding:1.25rem; }
.drawer-footer { padding:1rem 1.25rem; border-top:1px solid #f4f4f5; }`,
  },
  {
    id: 'command-palette', name: 'Command Palette', category: 'Navigation',
    description: 'Spotlight-style ⌘K search modal with filtered command results.',
    Preview: CommandPalettePreview,
    tailwind: `<!-- Trigger -->
<button class="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-500 shadow-sm hover:bg-zinc-50">
  <svg .../> Search commands…<kbd class="ml-2 rounded border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
</button>
<!-- Modal -->
<div class="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/50 backdrop-blur-sm">
  <div class="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden">
    <div class="flex items-center gap-3 border-b border-zinc-100 px-4 py-3">
      <svg .../> <input placeholder="Search commands…" class="flex-1 text-sm outline-none" />
    </div>
    <div class="py-2">
      <button class="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-blue-50 hover:text-blue-700">
        <span class="text-zinc-400">→</span>Dashboard
      </button>
    </div>
  </div>
</div>`,
    css: `.cmd-palette { position:fixed; inset:0; z-index:9999; display:flex; align-items:flex-start; justify-content:center; padding-top:15vh; background:rgba(0,0,0,.5); backdrop-filter:blur(4px); }
.cmd-modal { width:100%; max-width:28rem; border-radius:1rem; background:#fff; box-shadow:0 25px 60px rgba(0,0,0,.2); overflow:hidden; }
.cmd-search { display:flex; align-items:center; gap:.75rem; padding:.75rem 1rem; border-bottom:1px solid #f4f4f5; }
.cmd-input { flex:1; font-size:.875rem; outline:none; color:#27272a; }
.cmd-result { display:flex; align-items:center; gap:.75rem; width:100%; padding:.625rem 1rem; font-size:.875rem; color:#3f3f46; }
.cmd-result:hover { background:#eff6ff; color:#2563eb; }`,
  },
  {
    id: 'fab', name: 'Floating Action Button', category: 'Navigation',
    description: 'FAB with expandable action items — common in mobile and dashboard UIs.',
    Preview: FABPreview,
    tailwind: `<div class="fixed bottom-6 right-6 flex flex-col-reverse items-end gap-3">
  <!-- Action items (shown when open) -->
  <div class="flex items-center gap-2">
    <span class="rounded-lg bg-white shadow-md px-2.5 py-1 text-xs font-medium text-zinc-700">New post</span>
    <button class="h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center text-base hover:scale-110 transition">✏️</button>
  </div>
  <!-- Main FAB -->
  <button class="h-14 w-14 rounded-full bg-blue-600 shadow-lg flex items-center justify-center text-white text-2xl hover:bg-blue-700 transition rotate-45">+</button>
</div>`,
    css: `.fab-container { position:fixed; bottom:1.5rem; right:1.5rem; display:flex; flex-direction:column-reverse; align-items:flex-end; gap:.75rem; }
.fab { width:3.5rem; height:3.5rem; border-radius:9999px; background:#2563eb; color:#fff; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:1.5rem; box-shadow:0 8px 25px rgba(37,99,235,.4); transition:background .15s,transform .2s; }
.fab:hover { background:#1d4ed8; }
.fab.open { transform:rotate(45deg); }
.fab-action { display:flex; align-items:center; gap:.5rem; }
.fab-action-btn { width:2.5rem; height:2.5rem; border-radius:9999px; background:#fff; border:none; cursor:pointer; box-shadow:0 4px 12px rgba(0,0,0,.1); }`,
  },
  {
    id: 'back-to-top', name: 'Back to Top', category: 'Navigation',
    description: 'Scroll-to-top button variants — icon only, with label, and pill style.',
    Preview: BackToTopPreview,
    tailwind: `<!-- Icon only -->
<button onclick="window.scrollTo({top:0,behavior:'smooth'})"
  class="fixed bottom-6 right-6 h-10 w-10 rounded-full bg-blue-600 shadow-lg flex items-center justify-center text-white text-lg hover:bg-blue-700 hover:-translate-y-1 transition-all z-50">↑</button>

<!-- With label -->
<button onclick="window.scrollTo({top:0,behavior:'smooth'})"
  class="fixed bottom-6 right-6 flex items-center gap-2 rounded-full bg-white border border-zinc-200 shadow-lg px-4 py-2 text-xs font-semibold text-zinc-700 hover:-translate-y-1 transition-all z-50">↑ Back to top</button>`,
    css: `.back-to-top { position:fixed; bottom:1.5rem; right:1.5rem; z-index:50; width:2.5rem; height:2.5rem; border-radius:9999px; background:#2563eb; color:#fff; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:1.125rem; box-shadow:0 4px 16px rgba(37,99,235,.3); transition:transform .2s,opacity .2s; }
.back-to-top:hover { transform:translateY(-4px); }
.back-to-top.hidden { opacity:0; pointer-events:none; }`,
  },

  /* ── FEEDBACK ── */
  {
    id: 'circular-progress', name: 'Circular Progress', category: 'Feedback',
    description: 'SVG ring progress indicators for storage, CPU, and memory metrics.',
    Preview: CircularProgressPreview,
    tailwind: `<div class="relative">
  <svg width="80" height="80" viewBox="0 0 80 80" class="-rotate-90">
    <!-- Track -->
    <circle cx="40" cy="40" r="30" fill="none" stroke="#e4e4e7" stroke-width="8" />
    <!-- Progress (75%) -->
    <circle cx="40" cy="40" r="30" fill="none" stroke="#3b82f6" stroke-width="8"
      stroke-dasharray="141.37 188.5" stroke-linecap="round" />
  </svg>
  <div class="absolute inset-0 flex items-center justify-center">
    <span class="text-sm font-bold text-zinc-800">75%</span>
  </div>
</div>`,
    css: `.ring-progress { position:relative; display:inline-block; }
.ring-track { fill:none; stroke:#e4e4e7; }
.ring-bar   { fill:none; stroke-linecap:round; transition:stroke-dasharray .6s ease; }
.ring-label { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-size:.875rem; font-weight:700; color:#18181b; }`,
  },
  {
    id: 'status-banner', name: 'Status Banner', category: 'Feedback',
    description: 'Colored announcement banners for info, success, warning, and critical states.',
    Preview: StatusBannerPreview,
    tailwind: `<!-- Info -->
<div class="bg-blue-600 flex items-center gap-3 rounded-xl px-4 py-2.5">
  <span class="text-base shrink-0">📢</span>
  <p class="flex-1 text-xs font-medium text-white">System maintenance on Dec 31 at 2AM UTC.</p>
  <button class="shrink-0 rounded-lg bg-white/20 hover:bg-white/30 px-2.5 py-1 text-[10px] font-bold text-white transition">Learn more</button>
</div>
<!-- Critical -->
<div class="bg-red-600 flex items-center gap-3 rounded-xl px-4 py-2.5">
  <span class="text-base shrink-0">🚨</span>
  <p class="flex-1 text-xs font-medium text-white">Critical incident in progress. Team notified.</p>
  <button class="shrink-0 rounded-lg bg-white/20 px-2.5 py-1 text-[10px] font-bold text-white">Updates</button>
</div>`,
    css: `.status-banner { display:flex; align-items:center; gap:.75rem; border-radius:.75rem; padding:.625rem 1rem; }
.status-banner p { flex:1; font-size:.75rem; font-weight:500; color:#fff; }
.status-btn { border-radius:.5rem; padding:.25rem .625rem; font-size:.625rem; font-weight:700; color:#fff; background:rgba(255,255,255,.2); border:none; cursor:pointer; }
.status-btn:hover { background:rgba(255,255,255,.3); }`,
  },
  {
    id: 'confirm-dialog', name: 'Confirm Dialog', category: 'Feedback',
    description: 'Destructive action confirmation modal with icon, warning copy, and yes/cancel.',
    Preview: ConfirmDialogPreview,
    tailwind: `<!-- Trigger -->
<button class="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600">Delete Account</button>

<!-- Dialog -->
<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
  <div class="w-80 mx-4 rounded-2xl bg-white shadow-2xl p-6 text-center">
    <div class="mx-auto h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-2xl mb-4">🗑️</div>
    <h3 class="font-bold text-zinc-800">Delete Account?</h3>
    <p class="mt-2 text-xs text-zinc-500 leading-relaxed">This will permanently delete your account and all data.</p>
    <div class="mt-5 flex gap-2">
      <button class="flex-1 rounded-xl border border-zinc-200 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50">Cancel</button>
      <button class="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-bold text-white hover:bg-red-600">Yes, delete</button>
    </div>
  </div>
</div>`,
    css: `.confirm-dialog { width:20rem; margin:1rem; border-radius:1rem; background:#fff; box-shadow:0 25px 50px rgba(0,0,0,.25); padding:1.5rem; text-align:center; }
.confirm-icon { width:3rem; height:3rem; border-radius:9999px; display:flex; align-items:center; justify-content:center; margin:0 auto 1rem; font-size:1.5rem; }
.confirm-icon.danger { background:#fee2e2; }
.confirm-title { font-weight:700; color:#18181b; font-size:.9375rem; }
.confirm-actions { display:flex; gap:.5rem; margin-top:1.25rem; }`,
  },
  {
    id: 'loading-overlay', name: 'Loading Overlay', category: 'Feedback',
    description: 'Full-content loading overlay with spinner and message — press button to try.',
    Preview: LoadingOverlayPreview,
    tailwind: `<div class="relative rounded-2xl border border-zinc-200 bg-white overflow-hidden">
  <!-- Loading overlay (conditionally shown) -->
  <div class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-white/90 backdrop-blur-sm rounded-2xl">
    <div class="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-blue-600"></div>
    <p class="text-sm font-semibold text-zinc-700">Loading data…</p>
  </div>
  <!-- Content behind overlay -->
  <div class="p-5 space-y-3">
    <div class="h-3 w-3/4 rounded-full bg-zinc-200"></div>
    <div class="h-3 w-full rounded-full bg-zinc-200"></div>
  </div>
</div>`,
    css: `.loading-overlay { position:absolute; inset:0; z-index:10; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:.75rem; background:rgba(255,255,255,.9); backdrop-filter:blur(4px); border-radius:inherit; }
.loading-text { font-size:.875rem; font-weight:600; color:#3f3f46; }`,
  },
  {
    id: 'multi-step-progress', name: 'Multi-Step Progress', category: 'Feedback',
    description: 'Horizontal progress bar linked to step dots with prev/next navigation.',
    Preview: MultiStepProgressPreview,
    tailwind: `<div class="space-y-4">
  <!-- Progress bar + dots -->
  <div class="relative">
    <div class="h-2 w-full rounded-full bg-zinc-200">
      <div class="h-2 w-[50%] rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"></div>
    </div>
    <div class="mt-2 flex justify-between">
      <div class="flex flex-col items-center gap-1 text-[10px] font-medium text-blue-600">
        <div class="-mt-5 h-4 w-4 rounded-full border-2 border-blue-600 bg-white flex items-center justify-center"><span class="text-[8px] text-blue-600">✓</span></div>
        Details
      </div>
      <!-- Repeat for each step -->
    </div>
  </div>
  <div class="flex gap-2">
    <button class="rounded-lg border border-zinc-200 px-4 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-50 flex-1">Back</button>
    <button class="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 flex-1">Next →</button>
  </div>
</div>`,
    css: `.msp-track { height:.5rem; border-radius:9999px; background:#e4e4e7; position:relative; }
.msp-fill { height:100%; border-radius:9999px; background:linear-gradient(to right,#3b82f6,#2563eb); transition:width .4s ease; }
.msp-steps { display:flex; justify-content:space-between; margin-top:.5rem; }
.msp-step { display:flex; flex-direction:column; align-items:center; gap:.25rem; font-size:.625rem; font-weight:500; }
.msp-dot { width:1rem; height:1rem; border-radius:9999px; border:2px solid #d4d4d8; background:#fff; margin-top:-.625rem; }
.msp-dot.done { border-color:#2563eb; }
.msp-dot.active { border-color:#2563eb; }`,
  },

  /* ── OVERLAY ── */
  {
    id: 'context-menu', name: 'Context Menu', category: 'Overlay',
    description: 'Right-click context menu with icons, divider, and danger item.',
    Preview: ContextMenuPreview,
    tailwind: `<!-- Right-click zone -->
<div oncontextmenu="..." class="flex h-24 items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-white text-xs text-zinc-400 cursor-context-menu select-none">
  Right-click anywhere here
</div>

<!-- Context menu (shown on right-click) -->
<div class="absolute rounded-xl border border-zinc-200 bg-white shadow-xl py-1 w-40" style="left:80px;top:40px">
  <button class="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50">✏️ Edit</button>
  <button class="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50">📋 Copy</button>
  <div class="my-1 border-t border-zinc-100"></div>
  <button class="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50">🗑️ Delete</button>
</div>`,
    css: `.context-menu { position:absolute; min-width:10rem; background:#fff; border:1px solid #e4e4e7; border-radius:.75rem; box-shadow:0 10px 25px rgba(0,0,0,.12); padding:.25rem 0; z-index:9999; }
.context-item { display:flex; align-items:center; gap:.625rem; width:100%; padding:.5rem .75rem; font-size:.875rem; color:#3f3f46; cursor:pointer; background:none; border:none; }
.context-item:hover { background:#fafafa; }
.context-item.danger { color:#ef4444; }
.context-item.danger:hover { background:#fef2f2; }`,
  },
  {
    id: 'bottom-sheet', name: 'Bottom Sheet', category: 'Overlay',
    description: 'Mobile slide-up sheet with drag handle, share actions, and cancel button.',
    Preview: BottomSheetPreview,
    tailwind: `<!-- Trigger -->
<button class="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-semibold text-white">Open Sheet</button>

<!-- Sheet (slides up from bottom) -->
<div class="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm">
  <div class="w-full max-w-md rounded-t-3xl bg-white shadow-2xl">
    <div class="flex justify-center pt-3 pb-1"><div class="h-1 w-10 rounded-full bg-zinc-200"></div></div>
    <div class="px-6 pb-2 pt-3"><h3 class="font-bold text-zinc-800">Share this post</h3></div>
    <div class="grid grid-cols-4 gap-3 px-6 py-4">
      <button class="flex flex-col items-center gap-1.5 rounded-xl p-2 hover:bg-zinc-50">
        <span class="text-xl">📘</span><span class="text-[10px] text-zinc-500">Facebook</span>
      </button>
    </div>
    <div class="px-6 pb-6">
      <button class="w-full rounded-xl border border-zinc-200 py-3 text-sm font-medium text-zinc-600">Cancel</button>
    </div>
  </div>
</div>`,
    css: `.bottom-sheet { border-radius:1.5rem 1.5rem 0 0; background:#fff; box-shadow:0 -8px 40px rgba(0,0,0,.15); max-height:90vh; overflow-y:auto; }
.sheet-handle { display:flex; justify-content:center; padding:.75rem 0 .25rem; }
.sheet-handle-bar { width:2.5rem; height:.25rem; border-radius:9999px; background:#e4e4e7; }
.sheet-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:.75rem; padding:1rem 1.5rem; }
.sheet-action { display:flex; flex-direction:column; align-items:center; gap:.375rem; border-radius:.75rem; padding:.5rem; cursor:pointer; }`,
  },
  {
    id: 'lightbox', name: 'Image Lightbox', category: 'Overlay',
    description: 'Click any thumbnail to open a fullscreen lightbox with prev/next navigation.',
    Preview: LightboxPreview,
    tailwind: `<!-- Thumbnails grid -->
<div class="grid grid-cols-4 gap-1.5">
  <div onclick="openLightbox(0)" class="aspect-square rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xl cursor-zoom-in hover:scale-105 transition">🏔️</div>
  <!-- Repeat -->
</div>

<!-- Lightbox overlay -->
<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
  <button class="absolute left-4 h-12 w-12 rounded-full bg-white/10 text-white text-2xl hover:bg-white/20">‹</button>
  <div class="h-64 w-64 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-7xl shadow-2xl">🏔️</div>
  <button class="absolute right-4 h-12 w-12 rounded-full bg-white/10 text-white text-2xl hover:bg-white/20">›</button>
  <button class="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 flex items-center justify-center">✕</button>
</div>`,
    css: `.lightbox { position:fixed; inset:0; z-index:9999; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.92); backdrop-filter:blur(8px); }
.lightbox-img { max-width:90vw; max-height:80vh; border-radius:1rem; box-shadow:0 25px 60px rgba(0,0,0,.5); }
.lightbox-nav { position:absolute; top:50%; transform:translateY(-50%); width:3rem; height:3rem; border-radius:9999px; background:rgba(255,255,255,.1); border:none; color:#fff; font-size:1.5rem; cursor:pointer; }
.lightbox-nav.prev { left:1rem; }
.lightbox-nav.next { right:1rem; }`,
  },
  {
    id: 'side-panel', name: 'Detail Side Panel', category: 'Overlay',
    description: 'Flyout detail panel for user profiles, record views, and quick edits.',
    Preview: SidePanelPreview,
    tailwind: `<!-- Trigger -->
<button class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">View Details</button>

<!-- Side panel flyout -->
<div class="fixed inset-0 z-50 flex">
  <div class="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
  <div class="relative ml-auto h-full w-80 bg-white shadow-2xl flex flex-col overflow-hidden">
    <!-- Gradient header -->
    <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-6 text-white">
      <div class="flex items-start justify-between">
        <div>
          <div class="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold mb-2">JD</div>
          <h3 class="font-bold text-lg">Jane Doe</h3>
          <p class="text-blue-200 text-xs">Senior Designer · SF</p>
        </div>
        <button class="text-white/60 hover:text-white">✕</button>
      </div>
    </div>
    <!-- Details -->
    <div class="flex-1 overflow-y-auto p-5 space-y-4">
      <div><p class="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Email</p><p class="mt-0.5 text-sm text-zinc-700">jane@company.com</p></div>
    </div>
    <div class="border-t border-zinc-100 p-4 flex gap-2">
      <button class="flex-1 rounded-xl border border-zinc-200 py-2 text-sm text-zinc-600">Message</button>
      <button class="flex-1 rounded-xl bg-blue-600 py-2 text-sm font-semibold text-white">Edit</button>
    </div>
  </div>
</div>`,
    css: `.side-panel { position:relative; margin-left:auto; height:100%; width:20rem; background:#fff; box-shadow:-10px 0 40px rgba(0,0,0,.15); display:flex; flex-direction:column; overflow:hidden; }
.side-panel-header { padding:1.5rem 1.25rem; }
.side-panel-body   { flex:1; overflow-y:auto; padding:1.25rem; }
.side-panel-footer { padding:1rem 1.25rem; border-top:1px solid #f4f4f5; display:flex; gap:.5rem; }`,
  },
  {
    id: 'cookie-banner', name: 'Cookie Banner', category: 'Overlay',
    description: 'GDPR cookie consent banner with accept, reject, and manage preferences.',
    Preview: CookieBannerPreview,
    tailwind: `<!-- Simple banner -->
<div class="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl z-50">
  <div class="flex items-start gap-3">
    <span class="text-2xl">🍪</span>
    <div class="flex-1">
      <p class="text-sm font-semibold text-zinc-800">We use cookies</p>
      <p class="mt-0.5 text-xs text-zinc-500 leading-relaxed">We use cookies to enhance your experience and analyze site traffic.</p>
    </div>
  </div>
  <div class="mt-3 flex gap-2">
    <button class="flex-1 rounded-xl bg-blue-600 py-2 text-xs font-bold text-white hover:bg-blue-700">Accept All</button>
    <button class="flex-1 rounded-xl border border-zinc-200 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-50">Manage</button>
    <button class="flex-1 rounded-xl border border-zinc-200 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-50">Reject</button>
  </div>
</div>`,
    css: `.cookie-banner { position:fixed; bottom:1rem; right:1rem; max-width:22rem; border-radius:1rem; background:#fff; border:1px solid #e4e4e7; padding:1rem; box-shadow:0 10px 30px rgba(0,0,0,.12); z-index:9999; }
.cookie-actions { display:flex; gap:.5rem; margin-top:.75rem; }
.cookie-btn { flex:1; padding:.5rem; border-radius:.75rem; font-size:.75rem; font-weight:600; cursor:pointer; border:none; transition:.15s; }
.cookie-accept { background:#2563eb; color:#fff; }
.cookie-manage { background:transparent; border:1px solid #e4e4e7; color:#52525b; }`,
  },

  /* ── LAYOUT ── */
  {
    id: 'hero-section', name: 'Hero Section', category: 'Layout',
    description: 'Dark gradient hero with badge, headline, sub-copy, and dual CTA buttons.',
    Preview: HeroSectionPreview,
    tailwind: `<div class="relative bg-gradient-to-br from-zinc-900 via-blue-950 to-indigo-900 px-8 py-16 text-center overflow-hidden">
  <!-- Badge -->
  <span class="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 px-3 py-1 text-[10px] font-semibold text-blue-300 mb-4">✦ New release v2.0</span>
  <!-- Headline -->
  <h1 class="text-3xl font-black text-white leading-tight">Build faster with<br/><span class="text-blue-400">beautiful UI</span></h1>
  <!-- Sub-copy -->
  <p class="mt-3 text-sm text-zinc-400 leading-relaxed max-w-sm mx-auto">Production-ready components for your next project. No design skills needed.</p>
  <!-- CTAs -->
  <div class="mt-6 flex gap-3 justify-center">
    <button class="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-500 transition">Get started →</button>
    <button class="rounded-xl border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-300 hover:border-zinc-500 transition">View docs</button>
  </div>
</div>`,
    css: `.hero { position:relative; overflow:hidden; text-align:center; padding:4rem 2rem; background:linear-gradient(135deg,#18181b,#1e3a8a,#312e81); }
.hero-badge { display:inline-flex; align-items:center; gap:.375rem; border-radius:9999px; padding:.25rem .75rem; font-size:.625rem; font-weight:700; background:rgba(59,130,246,.2); border:1px solid rgba(147,197,253,.3); color:#93c5fd; margin-bottom:1rem; }
.hero-title { font-size:2rem; font-weight:900; color:#fff; line-height:1.15; }
.hero-sub   { margin-top:.75rem; font-size:.875rem; color:#a1a1aa; line-height:1.6; max-width:28rem; margin-left:auto; margin-right:auto; }
.hero-ctas  { display:flex; gap:.75rem; justify-content:center; margin-top:1.5rem; }`,
  },
  {
    id: 'feature-cards', name: 'Feature Cards', category: 'Layout',
    description: 'Icon + title + description feature grid — common on landing pages.',
    Preview: FeatureCardsPreview,
    tailwind: `<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
  <div class="rounded-2xl border border-zinc-200 bg-white p-5 hover:shadow-md transition">
    <div class="h-10 w-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl mb-4">⚡</div>
    <h3 class="text-sm font-bold text-zinc-800">Lightning Fast</h3>
    <p class="mt-1.5 text-xs text-zinc-400 leading-relaxed">Optimized for maximum performance.</p>
  </div>
  <!-- Repeat per feature -->
</div>`,
    css: `.features { display:grid; gap:1rem; }
@media (min-width:640px) { .features { grid-template-columns:repeat(2,1fr); } }
@media (min-width:1024px) { .features { grid-template-columns:repeat(4,1fr); } }
.feature-card { border-radius:1rem; border:1px solid #e4e4e7; background:#fff; padding:1.25rem; transition:box-shadow .2s; }
.feature-card:hover { box-shadow:0 4px 16px rgba(0,0,0,.08); }
.feature-icon { width:2.5rem; height:2.5rem; border-radius:.75rem; display:flex; align-items:center; justify-content:center; font-size:1.25rem; margin-bottom:1rem; }
.feature-title { font-size:.875rem; font-weight:700; color:#18181b; }
.feature-desc  { margin-top:.375rem; font-size:.75rem; color:#a1a1aa; line-height:1.6; }`,
  },
  {
    id: 'cta-banner', name: 'CTA Banner', category: 'Layout',
    description: 'Call-to-action strip variants — gradient, white card, and inline.',
    Preview: CTABannerPreview,
    tailwind: `<!-- Gradient CTA -->
<div class="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-5 flex items-center justify-between gap-4">
  <div>
    <p class="text-sm font-bold text-white">Start free today</p>
    <p class="text-xs text-blue-200 mt-0.5">No credit card required.</p>
  </div>
  <button class="shrink-0 rounded-xl bg-white px-3 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 transition whitespace-nowrap">Get Started →</button>
</div>

<!-- Card CTA -->
<div class="rounded-2xl border border-zinc-200 bg-white p-5 flex items-center justify-between gap-4 shadow-sm">
  <div>
    <p class="text-sm font-bold text-zinc-800">Upgrade to Pro</p>
    <p class="text-xs text-zinc-400 mt-0.5">Unlock all features.</p>
  </div>
  <button class="shrink-0 rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white hover:bg-blue-700 transition">Upgrade</button>
</div>`,
    css: `.cta-banner { display:flex; align-items:center; justify-content:space-between; gap:1rem; border-radius:1rem; padding:1.25rem; }
.cta-gradient { background:linear-gradient(to right,#2563eb,#4f46e5); }
.cta-title { font-size:.875rem; font-weight:700; color:#fff; }
.cta-sub   { font-size:.75rem; color:rgba(255,255,255,.7); margin-top:.125rem; }
.cta-btn   { flex-shrink:0; border-radius:.75rem; padding:.5rem .75rem; font-size:.75rem; font-weight:700; white-space:nowrap; cursor:pointer; transition:.15s; }`,
  },
  {
    id: 'footer', name: 'Footer', category: 'Layout',
    description: 'Dark site footer with logo, tagline, social links, and multi-column link grid.',
    Preview: FooterPreview,
    tailwind: `<footer class="bg-zinc-900">
  <div class="px-5 py-6">
    <div class="flex items-center gap-2 mb-3">
      <div class="h-6 w-6 rounded-lg bg-blue-500 flex items-center justify-center text-white text-xs font-bold">A</div>
      <span class="text-sm font-bold text-white">AppName</span>
    </div>
    <p class="text-xs text-zinc-400 leading-relaxed">Building the future of developer tooling.</p>
    <div class="mt-3 flex gap-2">
      <button class="h-7 w-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white text-xs flex items-center justify-center">𝕏</button>
    </div>
  </div>
  <div class="bg-zinc-800 px-5 py-4 grid grid-cols-3 gap-4">
    <div><p class="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">Product</p>
      <p class="text-[10px] text-zinc-400 hover:text-zinc-200 cursor-pointer mb-1">Features</p></div>
  </div>
  <div class="bg-zinc-900 border-t border-zinc-800 px-5 py-3">
    <p class="text-[10px] text-zinc-600">© 2024 AppName. All rights reserved.</p>
  </div>
</footer>`,
    css: `.footer { background:#18181b; }
.footer-main { padding:1.5rem 1.25rem; }
.footer-brand { display:flex; align-items:center; gap:.5rem; font-size:.875rem; font-weight:700; color:#fff; margin-bottom:.75rem; }
.footer-tagline { font-size:.75rem; color:#71717a; line-height:1.6; }
.footer-socials { display:flex; gap:.5rem; margin-top:.75rem; }
.footer-links { background:#27272a; display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; padding:1rem 1.25rem; }
.footer-link-group-title { font-size:.5625rem; font-weight:700; text-transform:uppercase; letter-spacing:.1em; color:#52525b; margin-bottom:.5rem; }
.footer-link { font-size:.625rem; color:#71717a; cursor:pointer; transition:color .15s; display:block; margin-bottom:.25rem; }
.footer-link:hover { color:#e4e4e7; }
.footer-bottom { background:#18181b; border-top:1px solid #27272a; padding:.625rem 1.25rem; font-size:.625rem; color:#52525b; }`,
  },
  {
    id: 'grid-system', name: 'Grid System', category: 'Layout',
    description: 'Responsive column grid demo — 2-col, 3-col, mixed, and full-width layouts.',
    Preview: GridSystemPreview,
    tailwind: `<!-- 2 equal columns -->
<div class="grid grid-cols-2 gap-4">
  <div class="rounded-lg border-2 border-dashed border-zinc-300 bg-blue-50 py-3 text-center text-xs font-bold text-blue-500">1/2</div>
  <div class="rounded-lg border-2 border-dashed border-zinc-300 bg-blue-50 py-3 text-center text-xs font-bold text-blue-500">1/2</div>
</div>
<!-- Mixed: 1/4 + 3/4 -->
<div class="grid grid-cols-4 gap-4">
  <div class="rounded-lg border-2 border-dashed border-zinc-300 bg-blue-50 py-3 text-center text-xs font-bold text-blue-500">1/4</div>
  <div class="col-span-3 rounded-lg border-2 border-dashed border-zinc-300 bg-blue-50 py-3 text-center text-xs font-bold text-blue-500">3/4</div>
</div>`,
    css: `.grid { display:grid; gap:1rem; }
.grid-2 { grid-template-columns:repeat(2,1fr); }
.grid-3 { grid-template-columns:repeat(3,1fr); }
.grid-4 { grid-template-columns:repeat(4,1fr); }
.col-span-2 { grid-column:span 2; }
.col-span-3 { grid-column:span 3; }
.col-full   { grid-column:1/-1; }
@media (max-width:640px) { .grid-2,.grid-3,.grid-4 { grid-template-columns:1fr; } }`,
  },
  {
    id: 'breadcrumb-icons', name: 'Breadcrumb with Icons', category: 'Navigation',
    description: 'Icon-prefixed breadcrumb and pill-style breadcrumb variants.',
    Preview: BreadcrumbIconsPreview,
    tailwind: `<!-- Icon breadcrumb -->
<nav class="flex items-center gap-1.5 text-sm">
  <a href="/" class="flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 transition">🏠 Home</a>
  <span class="text-zinc-300">/</span>
  <a href="/users" class="flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 transition">👥 Users</a>
  <span class="text-zinc-300">/</span>
  <span class="flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium bg-zinc-100 text-zinc-600">✏️ Edit</span>
</nav>

<!-- Card-style breadcrumb -->
<nav class="flex items-center rounded-xl border border-zinc-200 bg-white px-4 py-2 shadow-sm text-xs w-fit">
  <a href="/" class="text-blue-600 hover:underline">Dashboard</a>
  <svg class="mx-1.5 h-3 w-3 text-zinc-300" .../><!-- ChevronRight -->
  <a href="/projects" class="text-blue-600 hover:underline">Projects</a>
  <svg class="mx-1.5 h-3 w-3 text-zinc-300" .../>
  <span class="font-semibold text-zinc-800">Settings</span>
</nav>`,
    css: `.breadcrumb-icons { display:flex; align-items:center; gap:.375rem; }
.breadcrumb-icon-item { display:flex; align-items:center; gap:.25rem; border-radius:.5rem; padding:.25rem .625rem; font-size:.75rem; font-weight:500; text-decoration:none; transition:background .15s,color .15s; }
.breadcrumb-icon-item.link { color:#2563eb; }
.breadcrumb-icon-item.link:hover { background:#eff6ff; }
.breadcrumb-icon-item.current { background:#f4f4f5; color:#52525b; }
.breadcrumb-sep { color:#d4d4d8; }`,
  },

  // ── 16 new components ──
  {
    id: 'timeline', name: 'Timeline', category: 'Display',
    description: 'Vertical event timeline with colored dots, timestamps, and connector lines.',
    Preview: TimelinePreview,
    tailwind: `<div class="flex flex-col gap-0">
  <!-- Event -->
  <div class="flex gap-3">
    <div class="flex flex-col items-center">
      <div class="mt-1 h-2.5 w-2.5 rounded-full bg-blue-500 shrink-0"></div>
      <div class="my-1 w-px flex-1 bg-zinc-200"></div>
    </div>
    <div class="pb-4">
      <p class="text-[10px] font-mono text-zinc-400">09:00</p>
      <p class="text-sm font-semibold text-zinc-800">Project Kickoff</p>
      <p class="text-xs text-zinc-500">Team aligned on goals.</p>
    </div>
  </div>
  <!-- Repeat for more events -->
</div>`,
    css: `.timeline { display:flex; flex-direction:column; }
.timeline-item { display:flex; gap:.75rem; }
.timeline-dot { width:.625rem; height:.625rem; border-radius:9999px; background:#3b82f6; margin-top:.25rem; flex-shrink:0; }
.timeline-line { width:1px; flex:1; background:#e4e4e7; margin:.25rem 0; }
.timeline-content { padding-bottom:1rem; }
.timeline-time { font-family:monospace; font-size:.625rem; color:#a1a1aa; }
.timeline-title { font-size:.875rem; font-weight:600; color:#18181b; }
.timeline-desc { font-size:.75rem; color:#71717a; }`,
  },
  {
    id: 'skeleton', name: 'Skeleton Loader', category: 'Feedback',
    description: 'Animated placeholder that mimics content layout while data loads.',
    Preview: SkeletonPreview,
    tailwind: `<div class="rounded-xl border border-zinc-200 bg-white p-4 space-y-3 w-72">
  <div class="flex items-center gap-3">
    <div class="h-9 w-9 rounded-full bg-zinc-200 animate-pulse"></div>
    <div class="flex-1 space-y-1.5">
      <div class="h-2.5 w-2/3 rounded-full bg-zinc-200 animate-pulse"></div>
      <div class="h-2 w-1/3 rounded-full bg-zinc-100 animate-pulse"></div>
    </div>
  </div>
  <div class="space-y-1.5">
    <div class="h-2 w-full rounded-full bg-zinc-200 animate-pulse"></div>
    <div class="h-2 w-5/6 rounded-full bg-zinc-200 animate-pulse"></div>
    <div class="h-2 w-3/4 rounded-full bg-zinc-100 animate-pulse"></div>
  </div>
</div>`,
    css: `.skeleton { border-radius:.75rem; border:1px solid #e4e4e7; background:#fff; padding:1rem; }
.skeleton-circle { height:2.25rem; width:2.25rem; border-radius:9999px; background:#e4e4e7; }
.skeleton-line { height:.5rem; border-radius:9999px; background:#e4e4e7; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
.skeleton-line, .skeleton-circle { animation: pulse 2s cubic-bezier(.4,0,.6,1) infinite; }`,
  },
  {
    id: 'avatar-group', name: 'Avatar Group', category: 'Display',
    description: 'Stacked overlapping avatars with overflow count indicator and size variants.',
    Preview: AvatarGroupPreview,
    tailwind: `<div class="flex items-center">
  <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-[11px] font-bold text-white ring-2 ring-white">JD</div>
  <div class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-[11px] font-bold text-white ring-2 ring-white -ml-2.5">KL</div>
  <div class="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 text-[11px] font-bold text-white ring-2 ring-white -ml-2.5">MP</div>
  <div class="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 text-[11px] font-bold text-zinc-600 ring-2 ring-white -ml-2.5">+8</div>
</div>`,
    css: `.avatar-stack { display:flex; align-items:center; }
.avatar { display:flex; align-items:center; justify-content:center; height:2.5rem; width:2.5rem; border-radius:9999px; font-size:.6875rem; font-weight:700; color:#fff; outline:2px solid #fff; }
.avatar:not(:first-child) { margin-left:-.625rem; }
.avatar-overflow { background:#e4e4e7; color:#52525b; }`,
  },
  {
    id: 'split-button', name: 'Split Button', category: 'Navigation',
    description: 'Primary action combined with a dropdown for secondary actions.',
    Preview: SplitButtonPreview,
    tailwind: `<div class="relative flex">
  <button class="rounded-l-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition border-r border-blue-500">
    Save
  </button>
  <button class="rounded-r-lg bg-blue-600 px-2.5 py-2 text-sm text-white hover:bg-blue-700 transition">▼</button>
  <!-- Dropdown (toggled) -->
  <div class="absolute top-full right-0 mt-1 w-44 rounded-xl border border-zinc-200 bg-white shadow-xl z-10 py-1">
    <button class="w-full px-4 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50">Save & Close</button>
    <button class="w-full px-4 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50">Save as Draft</button>
    <button class="w-full px-4 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50">Publish</button>
  </div>
</div>`,
    css: `.split-btn { display:flex; position:relative; }
.split-btn-primary { border-radius:.5rem 0 0 .5rem; background:#2563eb; color:#fff; padding:.5rem 1rem; font-size:.875rem; font-weight:600; border-right:1px solid #1d4ed8; }
.split-btn-chevron { border-radius:0 .5rem .5rem 0; background:#2563eb; color:#fff; padding:.5rem .625rem; }
.split-btn-dropdown { position:absolute; top:100%; right:0; margin-top:.25rem; width:11rem; border-radius:.75rem; border:1px solid #e4e4e7; background:#fff; box-shadow:0 10px 25px rgba(0,0,0,.1); padding:.25rem 0; z-index:10; }`,
  },
  {
    id: 'file-upload', name: 'File Upload Dropzone', category: 'Forms & Inputs',
    description: 'Drag-and-drop upload zone with file name display and clear action.',
    Preview: FileUploadPreview,
    tailwind: `<div class="rounded-xl border-2 border-dashed border-zinc-300 bg-white p-6 text-center hover:border-zinc-400 transition cursor-pointer">
  <div class="text-2xl mb-2">📁</div>
  <p class="text-sm font-semibold text-zinc-700">Drop files here</p>
  <p class="text-xs text-zinc-400 mt-1">or <a class="text-blue-600 underline">browse files</a></p>
  <p class="text-[10px] text-zinc-400 mt-2">PNG, JPG, PDF up to 10MB</p>
</div>`,
    css: `.dropzone { border-radius:.75rem; border:2px dashed #d4d4d8; background:#fff; padding:1.5rem; text-align:center; cursor:pointer; transition:border-color .15s; }
.dropzone:hover, .dropzone.drag-over { border-color:#60a5fa; background:#eff6ff; }
.dropzone-icon { font-size:1.5rem; margin-bottom:.5rem; }
.dropzone-label { font-size:.875rem; font-weight:600; color:#3f3f46; }`,
  },
  {
    id: 'inline-edit', name: 'Inline Edit', category: 'Forms & Inputs',
    description: 'Click-to-edit field with confirm and cancel actions — no separate edit page.',
    Preview: InlineEditPreview,
    tailwind: `<!-- View mode -->
<button class="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold text-zinc-800 hover:bg-zinc-100 transition text-left">
  Untitled Project
  <span class="opacity-0 group-hover:opacity-100 text-zinc-400 text-xs ml-auto transition">✏️ edit</span>
</button>
<!-- Edit mode -->
<div class="flex items-center gap-2">
  <input class="flex-1 rounded-lg border border-blue-400 bg-white px-3 py-1.5 text-sm outline-none ring-2 ring-blue-100" value="Untitled Project" />
  <button class="rounded-lg bg-blue-600 px-2.5 py-1.5 text-xs font-bold text-white">✓</button>
  <button class="rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs text-zinc-500">✕</button>
</div>`,
    css: `.inline-edit-view { display:flex; align-items:center; gap:.5rem; border-radius:.5rem; padding:.375rem .75rem; background:transparent; cursor:pointer; width:100%; text-align:left; }
.inline-edit-view:hover { background:#f4f4f5; }
.inline-edit-hint { opacity:0; font-size:.75rem; color:#a1a1aa; margin-left:auto; transition:opacity .15s; }
.inline-edit-view:hover .inline-edit-hint { opacity:1; }
.inline-edit-input { border-radius:.5rem; border:1px solid #60a5fa; padding:.375rem .75rem; font-size:.875rem; outline:none; box-shadow:0 0 0 2px #bfdbfe; }`,
  },
  {
    id: 'data-table', name: 'Sortable Data Table', category: 'Display',
    description: 'Table with sortable column headers, status badges, and hover row highlight.',
    Preview: DataTablePreview,
    tailwind: `<div class="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
  <table class="w-full text-sm">
    <thead class="border-b border-zinc-100 bg-zinc-50">
      <tr>
        <th class="cursor-pointer px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">Name ↑</th>
        <th class="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">Role</th>
        <th class="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-zinc-50 hover:bg-zinc-50 transition">
        <td class="px-4 py-2.5 font-medium text-zinc-800">Alice Kim</td>
        <td class="px-4 py-2.5 text-zinc-500">Designer</td>
        <td class="px-4 py-2.5"><span class="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">Active</span></td>
      </tr>
    </tbody>
  </table>
</div>`,
    css: `.data-table { border-radius:.75rem; border:1px solid #e4e4e7; overflow:hidden; }
.data-table thead { background:#fafafa; border-bottom:1px solid #f4f4f5; }
.data-table th { padding:.625rem 1rem; font-size:.75rem; font-weight:600; text-transform:uppercase; letter-spacing:.05em; color:#71717a; cursor:pointer; }
.data-table td { padding:.625rem 1rem; font-size:.875rem; border-bottom:1px solid #fafafa; }
.data-table tr:hover td { background:#fafafa; }
.badge-active { background:#dcfce7; color:#15803d; border-radius:9999px; padding:.125rem .625rem; font-size:.625rem; font-weight:600; }`,
  },
  {
    id: 'vertical-stepper', name: 'Vertical Stepper', category: 'Navigation',
    description: 'Multi-step wizard with completed, current, and upcoming states and back/next controls.',
    Preview: VerticalStepperPreview,
    tailwind: `<div class="flex flex-col gap-0">
  <!-- Completed step -->
  <div class="flex gap-3">
    <div class="flex flex-col items-center">
      <div class="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 border-2 border-emerald-500 text-white text-xs font-bold">✓</div>
      <div class="my-0.5 w-0.5 flex-1 min-h-[20px] bg-emerald-300"></div>
    </div>
    <div class="pb-4 pt-1"><p class="text-sm font-semibold text-zinc-800">Account</p><p class="text-xs text-zinc-500">Enter your email & password</p></div>
  </div>
  <!-- Active step -->
  <div class="flex gap-3">
    <div class="flex flex-col items-center">
      <div class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 border-2 border-blue-600 text-white text-xs font-bold">2</div>
      <div class="my-0.5 w-0.5 flex-1 min-h-[20px] bg-zinc-200"></div>
    </div>
    <div class="pb-4 pt-1"><p class="text-sm font-semibold text-zinc-800">Profile</p><p class="text-xs text-zinc-500">Add your name and avatar</p></div>
  </div>
</div>`,
    css: `.v-stepper { display:flex; flex-direction:column; }
.v-step { display:flex; gap:.75rem; }
.v-step-dot { display:flex; height:2rem; width:2rem; align-items:center; justify-content:center; border-radius:9999px; border:2px solid #d4d4d8; font-size:.75rem; font-weight:700; flex-shrink:0; }
.v-step-dot.complete { background:#10b981; border-color:#10b981; color:#fff; }
.v-step-dot.active { background:#2563eb; border-color:#2563eb; color:#fff; }
.v-step-line { width:2px; flex:1; min-height:20px; background:#e4e4e7; margin:.25rem auto; }`,
  },
  {
    id: 'kpi-cards', name: 'KPI Card Group', category: 'Display',
    description: 'Metric summary cards with value, label, and trend indicators.',
    Preview: KPICardGroupPreview,
    tailwind: `<div class="grid grid-cols-3 gap-2">
  <div class="rounded-xl border border-zinc-200 bg-white p-3 text-center shadow-sm">
    <p class="text-[10px] text-zinc-400 font-medium">Revenue</p>
    <p class="text-lg font-bold text-zinc-900 mt-0.5">$48.2K</p>
    <span class="text-[10px] font-semibold text-emerald-600">+12.5%</span>
  </div>
  <div class="rounded-xl border border-zinc-200 bg-white p-3 text-center shadow-sm">
    <p class="text-[10px] text-zinc-400 font-medium">Users</p>
    <p class="text-lg font-bold text-zinc-900 mt-0.5">3,841</p>
    <span class="text-[10px] font-semibold text-emerald-600">+8.1%</span>
  </div>
  <div class="rounded-xl border border-zinc-200 bg-white p-3 text-center shadow-sm">
    <p class="text-[10px] text-zinc-400 font-medium">Churn</p>
    <p class="text-lg font-bold text-zinc-900 mt-0.5">2.4%</p>
    <span class="text-[10px] font-semibold text-rose-500">-0.3%</span>
  </div>
</div>`,
    css: `.kpi-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:.5rem; }
.kpi-card { border-radius:.75rem; border:1px solid #e4e4e7; background:#fff; padding:.75rem; text-align:center; box-shadow:0 1px 2px rgba(0,0,0,.05); }
.kpi-label { font-size:.625rem; color:#a1a1aa; font-weight:500; }
.kpi-value { font-size:1.125rem; font-weight:700; color:#18181b; margin-top:.125rem; }
.kpi-trend-up { font-size:.625rem; font-weight:600; color:#16a34a; }
.kpi-trend-down { font-size:.625rem; font-weight:600; color:#ef4444; }`,
  },
  {
    id: 'color-swatch', name: 'Color Swatch Palette', category: 'Display',
    description: 'Clickable color palette with selection ring and HEX code display.',
    Preview: ColorSwatchPreview,
    tailwind: `<div class="flex flex-wrap gap-2 max-w-[200px]">
  <button style="background:#3B82F6" class="h-8 w-8 rounded-lg ring-2 ring-offset-2 ring-zinc-600 hover:scale-110 transition"></button>
  <button style="background:#8B5CF6" class="h-8 w-8 rounded-lg hover:scale-110 transition"></button>
  <button style="background:#10B981" class="h-8 w-8 rounded-lg hover:scale-110 transition"></button>
  <!-- more colors -->
</div>
<div class="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 mt-2 w-fit">
  <div class="h-4 w-4 rounded" style="background:#3B82F6"></div>
  <code class="text-xs font-mono text-zinc-700">#3B82F6</code>
</div>`,
    css: `.color-swatch { height:2rem; width:2rem; border-radius:.5rem; cursor:pointer; transition:transform .15s; border:none; }
.color-swatch:hover { transform:scale(1.1); }
.color-swatch.selected { outline:2px solid #27272a; outline-offset:2px; transform:scale(1.1); }
.color-hex { display:flex; align-items:center; gap:.5rem; border-radius:.5rem; border:1px solid #e4e4e7; background:#fafafa; padding:.375rem .75rem; }
.color-hex-dot { height:1rem; width:1rem; border-radius:.25rem; }
.color-hex-code { font-family:monospace; font-size:.75rem; color:#3f3f46; }`,
  },
  {
    id: 'chip-tag', name: 'Chip / Tag Input', category: 'Forms & Inputs',
    description: 'Removable pill tags with keyboard-friendly add-on-enter input field.',
    Preview: ChipTagPreview,
    tailwind: `<div class="space-y-2">
  <div class="flex flex-wrap gap-1.5">
    <span class="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
      React <button class="opacity-60 hover:opacity-100">✕</button>
    </span>
    <span class="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-700">
      TypeScript <button class="opacity-60 hover:opacity-100">✕</button>
    </span>
  </div>
  <div class="flex gap-2">
    <input placeholder="Add tag…" class="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs outline-none focus:border-blue-400" />
    <button class="rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-white">Add</button>
  </div>
</div>`,
    css: `.chip { display:inline-flex; align-items:center; gap:.25rem; border-radius:9999px; padding:.125rem .625rem; font-size:.75rem; font-weight:600; }
.chip-remove { opacity:.6; background:none; border:none; cursor:pointer; transition:opacity .15s; }
.chip-remove:hover { opacity:1; }
.chip-input { border-radius:.5rem; border:1px solid #d4d4d8; padding:.375rem .75rem; font-size:.75rem; outline:none; }
.chip-input:focus { border-color:#60a5fa; box-shadow:0 0 0 2px #bfdbfe; }`,
  },
  {
    id: 'progress-ring', name: 'Progress Ring', category: 'Feedback',
    description: 'SVG circular progress indicators with percentage labels and color variants.',
    Preview: ProgressRingPreview,
    tailwind: `<!-- CPU ring (75%) -->
<div class="flex flex-col items-center gap-1.5">
  <svg width="60" height="60" viewBox="0 0 60 60">
    <circle cx="30" cy="30" r="22" fill="none" stroke="#e4e4e7" stroke-width="5"/>
    <circle cx="30" cy="30" r="22" fill="none" stroke="#3B82F6" stroke-width="5"
      stroke-dasharray="103.67 138.23" stroke-linecap="round" transform="rotate(-90 30 30)"/>
    <text x="30" y="34" text-anchor="middle" fill="#18181b" font-size="11" font-weight="700">75%</text>
  </svg>
  <span class="text-[10px] font-semibold text-zinc-500">CPU</span>
</div>`,
    css: `.progress-ring { display:flex; flex-direction:column; align-items:center; gap:.375rem; }
.progress-ring svg circle { transition:stroke-dasharray .4s ease; }
.progress-ring-label { font-size:.625rem; font-weight:600; color:#71717a; }`,
  },
  {
    id: 'page-header', name: 'Page Header', category: 'Layout',
    description: 'Breadcrumb navigation + title + action buttons — standard page header pattern.',
    Preview: PageHeaderPreview,
    tailwind: `<div class="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
  <nav class="flex items-center gap-1 text-xs text-zinc-400 mb-3">
    <a class="text-blue-600 hover:underline">Dashboard</a>
    <span>›</span>
    <a class="text-blue-600 hover:underline">Projects</a>
    <span>›</span>
    <span class="text-zinc-600 font-medium">Alpha</span>
  </nav>
  <div class="flex items-start justify-between gap-2">
    <div>
      <h2 class="text-base font-bold text-zinc-900">Project Alpha</h2>
      <p class="text-xs text-zinc-500 mt-0.5">Last updated 2 hours ago</p>
    </div>
    <div class="flex gap-1.5">
      <button class="rounded-lg border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-50">Share</button>
      <button class="rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white hover:bg-blue-700">Edit</button>
    </div>
  </div>
</div>`,
    css: `.page-header { border-radius:.75rem; border:1px solid #e4e4e7; background:#fff; padding:1rem; box-shadow:0 1px 2px rgba(0,0,0,.05); }
.page-header-breadcrumb { display:flex; align-items:center; gap:.25rem; font-size:.75rem; color:#a1a1aa; margin-bottom:.75rem; }
.page-header-breadcrumb a { color:#2563eb; text-decoration:none; }
.page-header-title { font-size:1rem; font-weight:700; color:#18181b; }
.page-header-subtitle { font-size:.75rem; color:#71717a; margin-top:.125rem; }
.page-header-actions { display:flex; gap:.375rem; }`,
  },
  {
    id: 'notification-center', name: 'Notification Center', category: 'Overlay',
    description: 'Grouped notification list with unread badge, mark-all-read, and click-to-read.',
    Preview: NotificationCenterPreview,
    tailwind: `<div class="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden w-80">
  <div class="flex items-center justify-between px-4 py-3 border-b border-zinc-100">
    <div class="flex items-center gap-2">
      <span class="text-sm font-semibold text-zinc-800">Notifications</span>
      <span class="rounded-full bg-blue-600 px-1.5 py-0.5 text-[9px] font-bold text-white">2</span>
    </div>
    <button class="text-xs text-blue-600 hover:underline">Mark all read</button>
  </div>
  <div class="flex items-start gap-3 px-4 py-3 hover:bg-blue-50/40 cursor-pointer border-b border-zinc-50">
    <span class="text-base mt-0.5">💬</span>
    <div class="flex-1 min-w-0">
      <p class="text-xs font-semibold text-zinc-800">New comment</p>
      <p class="text-xs text-zinc-500 truncate">Alice left a comment on Alpha.</p>
    </div>
    <span class="text-[10px] text-zinc-400">2m</span>
    <div class="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
  </div>
</div>`,
    css: `.notif-panel { border-radius:.75rem; border:1px solid #e4e4e7; background:#fff; box-shadow:0 4px 12px rgba(0,0,0,.08); overflow:hidden; }
.notif-header { display:flex; align-items:center; justify-content:space-between; padding:.75rem 1rem; border-bottom:1px solid #f4f4f5; }
.notif-item { display:flex; align-items:flex-start; gap:.75rem; padding:.75rem 1rem; cursor:pointer; border-bottom:1px solid #fafafa; transition:background .15s; }
.notif-item:hover { background:#eff6ff40; }
.notif-dot { height:.375rem; width:.375rem; border-radius:9999px; background:#2563eb; margin-top:.375rem; flex-shrink:0; }`,
  },
  {
    id: 'media-player', name: 'Media Player', category: 'Display',
    description: 'Audio player UI with album art, progress bar, volume control, and playback buttons.',
    Preview: MediaPlayerPreview,
    tailwind: `<div class="rounded-2xl bg-zinc-800 p-4 shadow-xl w-72">
  <div class="flex items-center gap-3 mb-4">
    <div class="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xl">🎵</div>
    <div><p class="text-sm font-semibold text-white">Midnight Drive</p><p class="text-xs text-zinc-400">Neon Echoes</p></div>
  </div>
  <div class="h-1.5 w-full rounded-full bg-zinc-700 mb-4">
    <div class="h-full w-[35%] rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
  </div>
  <div class="flex items-center justify-center gap-4 mb-4">
    <button class="text-zinc-400 hover:text-white text-lg">⏮</button>
    <button class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-900 font-bold">▶</button>
    <button class="text-zinc-400 hover:text-white text-lg">⏭</button>
  </div>
</div>`,
    css: `.media-player { border-radius:1rem; background:#27272a; padding:1rem; box-shadow:0 20px 40px rgba(0,0,0,.3); }
.media-art { height:3rem; width:3rem; border-radius:.5rem; flex-shrink:0; }
.media-progress { height:.375rem; border-radius:9999px; background:#3f3f46; cursor:pointer; }
.media-progress-fill { height:100%; border-radius:9999px; background:linear-gradient(to right,#a855f7,#3b82f6); }
.media-play-btn { display:flex; height:2.5rem; width:2.5rem; align-items:center; justify-content:center; border-radius:9999px; background:#fff; color:#18181b; font-weight:700; }`,
  },
  {
    id: 'pricing-toggle', name: 'Pricing Toggle', category: 'Display',
    description: 'Monthly / Annual billing toggle with dynamic price update and discount badge.',
    Preview: PricingTogglePreview,
    tailwind: `<div class="space-y-3">
  <div class="flex items-center justify-center gap-3">
    <span class="text-xs font-semibold text-zinc-900">Monthly</span>
    <button class="relative h-6 w-11 rounded-full bg-blue-600">
      <span class="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow translate-x-5"></span>
    </button>
    <span class="text-xs font-semibold text-zinc-400">Annual <span class="text-emerald-600">-20%</span></span>
  </div>
  <div class="grid grid-cols-2 gap-2">
    <div class="rounded-xl border-2 border-zinc-200 bg-white p-3">
      <p class="text-xs font-bold text-zinc-700">Starter</p>
      <p class="text-xl font-bold text-zinc-900 mt-1">$9<span class="text-[10px] text-zinc-400">/mo</span></p>
    </div>
    <div class="rounded-xl border-2 border-blue-500 bg-white p-3">
      <p class="text-xs font-bold text-zinc-700">Pro</p>
      <p class="text-xl font-bold text-zinc-900 mt-1">$29<span class="text-[10px] text-zinc-400">/mo</span></p>
    </div>
  </div>
</div>`,
    css: `.billing-toggle { display:flex; align-items:center; justify-content:center; gap:.75rem; }
.toggle-track { position:relative; height:1.5rem; width:2.75rem; border-radius:9999px; background:#2563eb; cursor:pointer; }
.toggle-thumb { position:absolute; top:.125rem; left:.125rem; height:1.25rem; width:1.25rem; border-radius:9999px; background:#fff; box-shadow:0 1px 3px rgba(0,0,0,.2); transition:transform .2s; }
.toggle-thumb.on { transform:translateX(1.25rem); }
.pricing-card { border-radius:.75rem; border:2px solid #e4e4e7; background:#fff; padding:.75rem; }
.pricing-card.featured { border-color:#2563eb; }`,
  },
  // ── 28 new components ──
  {
    id: 'segmented-control', name: 'Segmented Control', category: 'Navigation',
    description: 'iOS-style pill segment switcher — great for view mode or filter toggles.',
    Preview: SegmentedControlPreview,
    tailwind: `<div class="inline-flex rounded-xl bg-zinc-100 p-1 gap-0.5">
  <button class="rounded-lg bg-white px-4 py-1.5 text-xs font-semibold text-zinc-900 shadow-sm">Day</button>
  <button class="rounded-lg px-4 py-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-700">Week</button>
  <button class="rounded-lg px-4 py-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-700">Month</button>
  <button class="rounded-lg px-4 py-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-700">Year</button>
</div>`,
    css: `.seg-ctrl { display:inline-flex; border-radius:.75rem; background:#f4f4f5; padding:.25rem; gap:.125rem; }
.seg-btn { border-radius:.5rem; padding:.375rem 1rem; font-size:.75rem; font-weight:600; border:none; cursor:pointer; transition:all .15s; color:#71717a; background:transparent; }
.seg-btn.active { background:#fff; color:#18181b; box-shadow:0 1px 3px rgba(0,0,0,.1); }`,
  },
  {
    id: 'rich-text-toolbar', name: 'Rich Text Toolbar', category: 'Forms & Inputs',
    description: 'Formatting toolbar for rich text editors — bold, italic, headings, lists.',
    Preview: RichTextToolbarPreview,
    tailwind: `<div class="flex items-center gap-1 rounded-xl border border-zinc-200 bg-white px-2 py-1.5">
  <button class="h-7 w-7 rounded-lg bg-blue-600 text-white text-sm font-bold">B</button>
  <button class="h-7 w-7 rounded-lg text-zinc-600 text-sm italic hover:bg-zinc-100">I</button>
  <button class="h-7 w-7 rounded-lg text-zinc-600 text-sm underline hover:bg-zinc-100">U</button>
  <div class="h-5 w-px bg-zinc-200 mx-1"></div>
  <button class="rounded-lg px-2 py-0.5 text-xs font-bold text-zinc-600 hover:bg-zinc-100">H1</button>
  <button class="rounded-lg px-2 py-0.5 text-xs font-bold text-zinc-600 hover:bg-zinc-100">H2</button>
  <div class="h-5 w-px bg-zinc-200 mx-1"></div>
  <button class="rounded-lg px-2 py-0.5 text-xs text-zinc-600 hover:bg-zinc-100">• List</button>
  <button class="rounded-lg px-2 py-0.5 text-xs text-zinc-600 hover:bg-zinc-100">— Quote</button>
</div>`,
    css: `.rte-toolbar { display:flex; align-items:center; gap:.25rem; border-radius:.75rem; border:1px solid #e4e4e7; background:#fff; padding:.375rem .5rem; flex-wrap:wrap; }
.rte-btn { height:1.75rem; min-width:1.75rem; border-radius:.5rem; font-size:.875rem; border:none; cursor:pointer; transition:background .15s; color:#52525b; background:transparent; }
.rte-btn:hover { background:#f4f4f5; }
.rte-btn.active { background:#2563eb; color:#fff; }
.rte-sep { width:1px; height:1.25rem; background:#e4e4e7; margin:0 .25rem; }`,
  },
  {
    id: 'autocomplete', name: 'Autocomplete Input', category: 'Forms & Inputs',
    description: 'Search input with live filtered dropdown suggestions.',
    Preview: AutocompletePreview,
    tailwind: `<div class="relative w-64">
  <input placeholder="Search languages…" class="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
  <!-- Dropdown -->
  <div class="absolute z-10 mt-1 w-full rounded-xl border border-zinc-200 bg-white shadow-xl overflow-hidden">
    <button class="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-zinc-700 hover:bg-blue-50 hover:text-blue-700">🔍 JavaScript</button>
    <button class="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-zinc-700 hover:bg-blue-50 hover:text-blue-700">🔍 TypeScript</button>
    <button class="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-zinc-700 hover:bg-blue-50 hover:text-blue-700">🔍 Python</button>
  </div>
</div>`,
    css: `.autocomplete { position:relative; }
.autocomplete-input { width:100%; border-radius:.75rem; border:1px solid #d4d4d8; padding:.625rem 1rem; font-size:.875rem; outline:none; }
.autocomplete-input:focus { border-color:#60a5fa; box-shadow:0 0 0 2px #bfdbfe; }
.autocomplete-dropdown { position:absolute; z-index:10; margin-top:.25rem; width:100%; border-radius:.75rem; border:1px solid #e4e4e7; background:#fff; box-shadow:0 10px 25px rgba(0,0,0,.1); overflow:hidden; }
.autocomplete-item { display:flex; align-items:center; gap:.5rem; width:100%; padding:.625rem 1rem; font-size:.875rem; color:#3f3f46; cursor:pointer; transition:background .15s; }
.autocomplete-item:hover { background:#eff6ff; color:#1d4ed8; }`,
  },
  {
    id: 'transfer-list', name: 'Transfer List', category: 'Forms & Inputs',
    description: 'Move items between two lists — classic dual-list picker pattern.',
    Preview: TransferListPreview,
    tailwind: `<div class="flex items-center gap-2">
  <!-- Left list -->
  <div class="h-28 w-32 overflow-y-auto rounded-xl border border-zinc-200 bg-white py-1">
    <div class="bg-blue-600 text-white px-3 py-1.5 text-xs cursor-pointer">Analytics</div>
    <div class="text-zinc-700 px-3 py-1.5 text-xs hover:bg-zinc-50 cursor-pointer">Reports</div>
  </div>
  <!-- Arrow buttons -->
  <div class="flex flex-col gap-1.5">
    <button class="rounded-lg border border-zinc-200 bg-white px-2 py-1 text-xs font-bold">→</button>
    <button class="rounded-lg border border-zinc-200 bg-white px-2 py-1 text-xs font-bold">←</button>
  </div>
  <!-- Right list -->
  <div class="h-28 w-32 overflow-y-auto rounded-xl border border-zinc-200 bg-white py-1">
    <div class="text-zinc-700 px-3 py-1.5 text-xs hover:bg-zinc-50 cursor-pointer">Dashboard</div>
  </div>
</div>`,
    css: `.transfer-list { display:flex; align-items:center; gap:.5rem; }
.transfer-box { height:7rem; width:8rem; overflow-y:auto; border-radius:.75rem; border:1px solid #e4e4e7; background:#fff; padding:.25rem 0; }
.transfer-item { padding:.375rem .75rem; font-size:.75rem; cursor:pointer; transition:background .15s; color:#3f3f46; }
.transfer-item:hover { background:#fafafa; }
.transfer-item.selected { background:#2563eb; color:#fff; }
.transfer-arrows { display:flex; flex-direction:column; gap:.375rem; }
.transfer-arrow { border-radius:.5rem; border:1px solid #e4e4e7; background:#fff; padding:.25rem .5rem; font-size:.75rem; font-weight:700; cursor:pointer; }`,
  },
  {
    id: 'activity-feed', name: 'Activity Feed', category: 'Display',
    description: 'GitHub-style activity log with icons, user actions, and timestamps.',
    Preview: ActivityFeedPreview,
    tailwind: `<div class="space-y-2">
  <div class="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2.5">
    <span class="text-base">🟢</span>
    <div><p class="text-xs text-zinc-700"><strong>Alice</strong> pushed to main</p><p class="text-[10px] text-zinc-400 mt-0.5">2m ago</p></div>
  </div>
  <div class="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2.5">
    <span class="text-base">💬</span>
    <div><p class="text-xs text-zinc-700"><strong>Bob</strong> commented on PR #42</p><p class="text-[10px] text-zinc-400 mt-0.5">18m ago</p></div>
  </div>
</div>`,
    css: `.activity-feed { display:flex; flex-direction:column; gap:.5rem; }
.activity-item { display:flex; align-items:flex-start; gap:.75rem; border-radius:.75rem; border:1px solid; padding:.625rem .75rem; }
.activity-icon { font-size:1rem; flex-shrink:0; }
.activity-text { font-size:.75rem; color:#3f3f46; }
.activity-text strong { color:#18181b; }
.activity-time { font-size:.625rem; color:#a1a1aa; margin-top:.125rem; }`,
  },
  {
    id: 'leaderboard', name: 'Leaderboard', category: 'Display',
    description: 'Ranked list with medal icons, avatar initials, and score display.',
    Preview: LeaderboardPreview,
    tailwind: `<div class="rounded-xl border border-zinc-200 bg-white overflow-hidden">
  <div class="flex items-center gap-3 border-b border-zinc-50 bg-amber-50 px-4 py-2.5">
    <span class="w-5 text-center">🥇</span>
    <div class="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-[10px] font-bold text-white">AK</div>
    <span class="flex-1 text-sm font-medium text-zinc-800">Alice Kim</span>
    <span class="text-xs font-bold text-zinc-600">9,820</span>
  </div>
  <div class="flex items-center gap-3 border-b border-zinc-50 px-4 py-2.5">
    <span class="w-5 text-center">🥈</span>
    <div class="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-[10px] font-bold text-white">BP</div>
    <span class="flex-1 text-sm font-medium text-zinc-800">Bob Patel</span>
    <span class="text-xs font-bold text-zinc-600">8,750</span>
  </div>
</div>`,
    css: `.leaderboard { border-radius:.75rem; border:1px solid #e4e4e7; overflow:hidden; }
.leaderboard-row { display:flex; align-items:center; gap:.75rem; padding:.625rem 1rem; border-bottom:1px solid #fafafa; }
.leaderboard-row.gold { background:#fffbeb; }
.leaderboard-rank { width:1.25rem; text-align:center; font-size:.875rem; }
.leaderboard-avatar { display:flex; height:1.75rem; width:1.75rem; align-items:center; justify-content:center; border-radius:9999px; font-size:.625rem; font-weight:700; color:#fff; flex-shrink:0; }
.leaderboard-score { font-size:.75rem; font-weight:700; color:#52525b; }`,
  },
  {
    id: 'gauge-meter', name: 'Gauge Meter', category: 'Display',
    description: 'SVG speedometer gauge with dynamic color zones — drag slider to update.',
    Preview: GaugeMeterPreview,
    tailwind: `<!-- Gauge is SVG-based -->
<svg width="140" height="90" viewBox="0 0 140 90">
  <!-- Background arc -->
  <path d="M15 80 A55 55 0 0 1 125 80" fill="none" stroke="#e4e4e7" stroke-width="10" stroke-linecap="round"/>
  <!-- Value arc (68%) -->
  <path d="M15 80 A55 55 0 0 1 125 80" fill="none" stroke="#f59e0b" stroke-width="10" stroke-linecap="round"
    stroke-dasharray="117.5 172.8"/>
  <!-- Needle -->
  <line x1="70" y1="80" x2="107" y2="47" stroke="#18181b" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="70" cy="80" r="4" fill="#18181b"/>
  <text x="70" y="70" text-anchor="middle" fill="#f59e0b" font-size="14" font-weight="700">68%</text>
</svg>`,
    css: `.gauge { display:flex; flex-direction:column; align-items:center; gap:.75rem; }
.gauge svg path { transition:stroke-dasharray .4s ease, stroke .3s ease; }
.gauge-label { font-size:1.25rem; font-weight:900; line-height:1; }
.gauge-legend { display:flex; gap:.75rem; font-size:.625rem; font-weight:600; }`,
  },
  {
    id: 'radar-chart', name: 'Radar / Spider Chart', category: 'Display',
    description: 'SVG spider chart for visualizing multi-axis scores and skill sets.',
    Preview: RadarChartPreview,
    tailwind: `<!-- Radar is SVG-based — use a charting lib in production -->
<svg width="150" height="150" viewBox="0 0 150 150">
  <!-- Grid polygons, axis lines, and data polygon via SVG -->
  <!-- See CSS snippet for structure guidance -->
</svg>`,
    css: `.radar-chart { display:flex; align-items:center; justify-content:center; }
.radar-grid polygon { fill:none; stroke:#e4e4e7; stroke-width:1; }
.radar-data { fill:rgba(59,130,246,.1); stroke:#3b82f6; stroke-width:2; }
.radar-dot { fill:#3b82f6; }
.radar-label { fill:#71717a; font-size:7px; font-weight:600; }`,
  },
  {
    id: 'user-card', name: 'User / Profile Card', category: 'Display',
    description: 'Social-style profile card with cover image, avatar, stats, and follow button.',
    Preview: UserCardPreview,
    tailwind: `<div class="rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden w-56">
  <!-- Cover -->
  <div class="h-16 bg-gradient-to-r from-blue-500 to-violet-500"></div>
  <div class="px-4 pb-4">
    <div class="flex items-end justify-between -mt-7 mb-3">
      <div class="h-14 w-14 rounded-2xl border-4 border-white bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-lg font-bold text-white shadow">AK</div>
      <button class="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700">Follow</button>
    </div>
    <p class="text-sm font-bold text-zinc-900">Alice Kim</p>
    <p class="text-xs text-zinc-400 mb-2">Senior Product Designer · SF</p>
    <div class="flex gap-4 text-center">
      <div><p class="text-xs font-bold text-zinc-900">142</p><p class="text-[10px] text-zinc-400">Posts</p></div>
      <div><p class="text-xs font-bold text-zinc-900">8.4K</p><p class="text-[10px] text-zinc-400">Followers</p></div>
    </div>
  </div>
</div>`,
    css: `.user-card { border-radius:1rem; border:1px solid #e4e4e7; background:#fff; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,.05); }
.user-card-cover { height:4rem; }
.user-card-avatar { height:3.5rem; width:3.5rem; border-radius:.75rem; border:4px solid #fff; box-shadow:0 2px 4px rgba(0,0,0,.1); flex-shrink:0; }
.user-card-body { padding:0 1rem 1rem; }
.user-card-stats { display:flex; gap:1rem; text-align:center; }`,
  },
  {
    id: 'gantt-bar', name: 'Gantt Chart', category: 'Display',
    description: 'Simple sprint Gantt / timeline bar chart for project planning views.',
    Preview: GanttBarPreview,
    tailwind: `<div class="space-y-1.5">
  <!-- Week labels -->
  <div class="flex items-center gap-1 pl-16 mb-2">
    <div class="flex-1 text-center text-[9px] font-bold text-zinc-400">W1</div>
    <!-- ...repeat for W2–W8 -->
  </div>
  <!-- Task row -->
  <div class="flex items-center gap-2">
    <span class="w-14 text-[11px] font-medium text-zinc-600 text-right shrink-0">Research</span>
    <div class="flex flex-1 gap-1">
      <div class="flex-1 h-6 rounded-sm bg-blue-400"></div><!-- W1 filled -->
      <div class="flex-1 h-6 rounded-sm bg-blue-400"></div><!-- W2 filled -->
      <div class="flex-1 h-6 rounded-sm bg-zinc-100"></div><!-- W3 empty -->
    </div>
  </div>
</div>`,
    css: `.gantt { display:flex; flex-direction:column; gap:.375rem; }
.gantt-row { display:flex; align-items:center; gap:.5rem; }
.gantt-label { width:3.5rem; flex-shrink:0; font-size:.6875rem; font-weight:500; color:#52525b; text-align:right; }
.gantt-track { display:flex; flex:1; gap:.25rem; }
.gantt-cell { flex:1; height:1.5rem; border-radius:.125rem; }
.gantt-cell.filled { background:#60a5fa; }
.gantt-cell.empty { background:#f4f4f5; }`,
  },
  {
    id: 'mega-menu', name: 'Mega Menu', category: 'Navigation',
    description: 'Multi-column dropdown menu with icons and descriptions for complex navs.',
    Preview: MegaMenuPreview,
    tailwind: `<div class="relative">
  <button class="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white">
    Products ▾
  </button>
  <!-- Mega dropdown -->
  <div class="absolute left-0 top-full mt-2 w-80 rounded-2xl border border-zinc-200 bg-white shadow-2xl p-4 z-10">
    <div class="grid grid-cols-2 gap-4">
      <div>
        <p class="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Products</p>
        <button class="flex w-full items-start gap-2.5 rounded-xl p-2 hover:bg-zinc-50">
          <span>📊</span>
          <div><p class="text-xs font-semibold text-zinc-800">Analytics</p><p class="text-[10px] text-zinc-400">Track metrics</p></div>
        </button>
      </div>
    </div>
  </div>
</div>`,
    css: `.mega-menu { position:relative; }
.mega-trigger { display:inline-flex; align-items:center; gap:.375rem; border-radius:.75rem; padding:.5rem 1rem; font-size:.875rem; font-weight:600; cursor:pointer; }
.mega-dropdown { position:absolute; top:100%; left:0; margin-top:.5rem; border-radius:1rem; border:1px solid #e4e4e7; background:#fff; box-shadow:0 20px 40px rgba(0,0,0,.12); padding:1rem; z-index:20; }
.mega-section-title { font-size:.625rem; font-weight:700; text-transform:uppercase; letter-spacing:.05em; color:#a1a1aa; margin-bottom:.5rem; }
.mega-item { display:flex; align-items:flex-start; gap:.625rem; border-radius:.75rem; padding:.5rem; cursor:pointer; transition:background .15s; }
.mega-item:hover { background:#fafafa; }`,
  },
  {
    id: 'dock', name: 'macOS Dock', category: 'Navigation',
    description: 'macOS-style icon dock with magnification effect on hover.',
    Preview: DockPreview,
    tailwind: `<div class="flex items-end gap-1.5 rounded-2xl border border-white/10 bg-white/10 px-3 py-2 backdrop-blur-md">
  <button class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-xl hover:scale-150 hover:-translate-y-3 transition-all duration-150">🌐</button>
  <button class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-xl hover:scale-150 hover:-translate-y-3 transition-all duration-150">📁</button>
  <button class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-xl hover:scale-150 hover:-translate-y-3 transition-all duration-150">✉️</button>
  <!-- add more icons -->
</div>`,
    css: `.dock { display:flex; align-items:flex-end; gap:.375rem; border-radius:1rem; border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.1); padding:.5rem .75rem; backdrop-filter:blur(12px); }
.dock-icon { display:flex; height:2.5rem; width:2.5rem; align-items:center; justify-content:center; border-radius:.75rem; background:rgba(255,255,255,.15); font-size:1.25rem; cursor:pointer; transition:transform .15s, translate .15s; }
.dock-icon:hover { transform:scale(1.5) translateY(-.75rem); }`,
  },
  {
    id: 'survey-rating', name: 'Survey / NPS Rating', category: 'Forms & Inputs',
    description: 'NPS 0–10 scale + emoji satisfaction picker for feedback forms.',
    Preview: SurveyRatingPreview,
    tailwind: `<!-- NPS row -->
<div class="flex gap-0.5 flex-wrap">
  <button class="h-7 w-7 rounded-lg text-[10px] font-bold bg-red-500 text-white">0</button>
  <button class="h-7 w-7 rounded-lg text-[10px] font-bold border border-zinc-200 text-zinc-600">1</button>
  <!-- ...0–10 -->
  <button class="h-7 w-7 rounded-lg text-[10px] font-bold bg-emerald-500 text-white">9</button>
</div>
<!-- Emoji row -->
<div class="flex gap-2">
  <button class="text-2xl opacity-40 hover:opacity-100 hover:scale-125 transition-all">😞</button>
  <button class="text-2xl opacity-40 hover:opacity-100 hover:scale-125 transition-all">😕</button>
  <button class="text-2xl scale-125">😐</button>
  <button class="text-2xl opacity-40 hover:opacity-100 hover:scale-125 transition-all">🙂</button>
  <button class="text-2xl opacity-40 hover:opacity-100 hover:scale-125 transition-all">😄</button>
</div>`,
    css: `.nps-row { display:flex; gap:.125rem; flex-wrap:wrap; }
.nps-btn { height:1.75rem; width:1.75rem; border-radius:.5rem; font-size:.625rem; font-weight:700; border:1px solid #e4e4e7; cursor:pointer; transition:all .15s; }
.nps-btn.selected.high { background:#10b981; color:#fff; border-color:#10b981; }
.nps-btn.selected.mid { background:#f59e0b; color:#fff; border-color:#f59e0b; }
.nps-btn.selected.low { background:#ef4444; color:#fff; border-color:#ef4444; }
.emoji-row { display:flex; gap:.5rem; }
.emoji-btn { font-size:1.5rem; opacity:.4; cursor:pointer; transition:all .15s; }
.emoji-btn.active, .emoji-btn:hover { opacity:1; transform:scale(1.25); }`,
  },
  {
    id: 'typing-indicator', name: 'Typing Indicator', category: 'Display',
    description: 'Chat bubbles with animated "..." typing indicator and conversation preview.',
    Preview: TypingIndicatorPreview,
    tailwind: `<!-- Typing bubble -->
<div class="flex items-end gap-2">
  <div class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">AK</div>
  <div class="rounded-2xl rounded-bl-sm bg-white border border-zinc-200 px-4 py-3 shadow-sm">
    <div class="flex items-center gap-1.5">
      <div class="h-2 w-2 rounded-full bg-zinc-400 animate-bounce" style="animation-delay:0ms"></div>
      <div class="h-2 w-2 rounded-full bg-zinc-400 animate-bounce" style="animation-delay:150ms"></div>
      <div class="h-2 w-2 rounded-full bg-zinc-400 animate-bounce" style="animation-delay:300ms"></div>
    </div>
  </div>
</div>`,
    css: `.typing-bubble { display:flex; align-items:flex-end; gap:.5rem; }
.typing-dot { height:.5rem; width:.5rem; border-radius:9999px; background:#a1a1aa; animation:bounce 1s infinite; }
.typing-dot:nth-child(2) { animation-delay:.15s; }
.typing-dot:nth-child(3) { animation-delay:.3s; }
@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
.chat-bubble-in { border-radius:1rem; border-radius-bl:0; background:#fff; border:1px solid #e4e4e7; padding:.5rem .75rem; font-size:.75rem; }
.chat-bubble-out { border-radius:1rem; border-radius-tr:0; background:#2563eb; color:#fff; padding:.5rem .75rem; font-size:.75rem; }`,
  },
  {
    id: 'upload-progress', name: 'Upload Progress', category: 'Feedback',
    description: 'File upload list with per-file progress bars, sizes, and completion states.',
    Preview: UploadProgressPreview,
    tailwind: `<div class="rounded-xl border border-zinc-200 bg-white px-3 py-2.5">
  <div class="flex items-center justify-between mb-1.5">
    <div>
      <p class="text-xs font-semibold text-zinc-800">design-assets.zip</p>
      <p class="text-[10px] text-zinc-400">24 MB</p>
    </div>
    <span class="text-[10px] font-bold text-zinc-500">72%</span>
  </div>
  <div class="h-1.5 w-full rounded-full bg-zinc-100">
    <div class="h-full w-[72%] rounded-full bg-blue-500 transition-all"></div>
  </div>
</div>`,
    css: `.upload-item { border-radius:.75rem; border:1px solid #e4e4e7; background:#fff; padding:.625rem .75rem; }
.upload-meta { display:flex; align-items:center; justify-content:space-between; margin-bottom:.375rem; }
.upload-name { font-size:.75rem; font-weight:600; color:#18181b; }
.upload-size { font-size:.625rem; color:#a1a1aa; }
.upload-pct { font-size:.625rem; font-weight:700; color:#52525b; }
.upload-track { height:.375rem; border-radius:9999px; background:#f4f4f5; overflow:hidden; }
.upload-fill { height:100%; border-radius:9999px; transition:width .3s ease; }`,
  },
  {
    id: 'popover-card', name: 'Popover Card', category: 'Overlay',
    description: 'Rich popover with user bio, role tags, and action buttons on click.',
    Preview: PopoverCardPreview,
    tailwind: `<div class="relative">
  <button class="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50">
    <div class="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">AK</div>
    Alice Kim
  </button>
  <!-- Popover card -->
  <div class="absolute left-0 top-full mt-2 w-64 rounded-2xl border border-zinc-200 bg-white shadow-2xl p-4 z-10">
    <div class="flex items-start gap-3 mb-3">
      <div class="h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg font-bold text-white">AK</div>
      <div>
        <p class="font-bold text-zinc-900">Alice Kim</p>
        <p class="text-xs text-zinc-400">Senior Designer · SF</p>
      </div>
    </div>
    <div class="flex gap-2">
      <button class="flex-1 rounded-xl bg-blue-600 py-1.5 text-xs font-semibold text-white">Message</button>
      <button class="flex-1 rounded-xl border border-zinc-200 py-1.5 text-xs font-semibold text-zinc-700">Profile</button>
    </div>
  </div>
</div>`,
    css: `.popover-card { position:relative; }
.popover-trigger { display:flex; align-items:center; gap:.5rem; border-radius:.75rem; border:1px solid #e4e4e7; background:#fff; padding:.5rem .75rem; font-size:.875rem; font-weight:500; cursor:pointer; }
.popover-content { position:absolute; top:100%; left:0; margin-top:.5rem; width:16rem; border-radius:1rem; border:1px solid #e4e4e7; background:#fff; box-shadow:0 20px 40px rgba(0,0,0,.12); padding:1rem; z-index:30; }`,
  },
  {
    id: 'global-search', name: 'Global Search Modal', category: 'Overlay',
    description: 'Full-screen ⌘K search modal with categorised results and keyboard shortcut.',
    Preview: GlobalSearchPreview,
    tailwind: `<!-- Trigger -->
<button class="flex w-full items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-400 shadow-sm">
  🔍 Search everything…
  <kbd class="ml-auto rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-500">⌘K</kbd>
</button>
<!-- Modal (visible on open) -->
<div class="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/40 backdrop-blur-sm">
  <div class="w-full max-w-md rounded-2xl border border-zinc-200 bg-white shadow-2xl overflow-hidden">
    <div class="flex items-center gap-3 border-b border-zinc-100 px-4 py-3">
      <svg class="w-4 h-4 text-zinc-400" .../>
      <input placeholder="Search anything…" class="flex-1 text-sm outline-none"/>
      <kbd class="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px]">esc</kbd>
    </div>
    <div class="py-2">
      <button class="flex w-full items-center gap-3 px-4 py-2.5 hover:bg-zinc-50">
        <span>📄</span><div><p class="text-sm font-medium text-zinc-800">Q4 Report.pdf</p><p class="text-[10px] text-zinc-400">Documents</p></div>
      </button>
    </div>
  </div>
</div>`,
    css: `.global-search-trigger { display:flex; align-items:center; gap:.5rem; border-radius:.75rem; border:1px solid #d4d4d8; background:#fff; padding:.625rem 1rem; font-size:.875rem; color:#a1a1aa; cursor:pointer; }
.global-search-modal { position:fixed; inset:0; z-index:50; display:flex; align-items:flex-start; justify-content:center; padding-top:5rem; background:rgba(0,0,0,.4); backdrop-filter:blur(4px); }
.global-search-box { width:100%; max-width:28rem; border-radius:1rem; border:1px solid #e4e4e7; background:#fff; box-shadow:0 24px 48px rgba(0,0,0,.18); overflow:hidden; }
.global-search-input { display:flex; align-items:center; gap:.75rem; border-bottom:1px solid #f4f4f5; padding:.75rem 1rem; }`,
  },
  {
    id: 'masonry-grid', name: 'Masonry Grid', category: 'Layout',
    description: 'Pinterest-style variable-height grid layout with two columns.',
    Preview: MasonryGridPreview,
    tailwind: `<div class="flex gap-2">
  <!-- Column 1 -->
  <div class="flex flex-1 flex-col gap-2">
    <div class="rounded-xl border border-zinc-200 bg-blue-100 h-20 flex items-center justify-center">
      <p class="text-xs font-semibold text-zinc-700">Analytics</p>
    </div>
    <div class="rounded-xl border border-zinc-200 bg-emerald-100 h-24 flex items-center justify-center">
      <p class="text-xs font-semibold text-zinc-700">API Docs</p>
    </div>
  </div>
  <!-- Column 2 -->
  <div class="flex flex-1 flex-col gap-2">
    <div class="rounded-xl border border-zinc-200 bg-purple-100 h-32 flex items-center justify-center">
      <p class="text-xs font-semibold text-zinc-700">Design System</p>
    </div>
  </div>
</div>`,
    css: `.masonry { display:flex; gap:.5rem; }
.masonry-col { display:flex; flex:1; flex-direction:column; gap:.5rem; }
.masonry-item { border-radius:.75rem; border:1px solid #e4e4e7; display:flex; align-items:center; justify-content:center; }`,
  },
  {
    id: 'split-pane', name: 'Split Pane Editor', category: 'Layout',
    description: 'Resizable split-view layout — code editor on left, output on right.',
    Preview: SplitPanePreview,
    tailwind: `<div class="rounded-xl overflow-hidden border border-zinc-700 bg-zinc-950">
  <!-- Titlebar -->
  <div class="flex items-center gap-2 bg-zinc-800 px-3 py-1.5 border-b border-zinc-700">
    <div class="h-2.5 w-2.5 rounded-full bg-red-500"></div>
    <div class="h-2.5 w-2.5 rounded-full bg-amber-400"></div>
    <div class="h-2.5 w-2.5 rounded-full bg-emerald-500"></div>
  </div>
  <!-- Panes -->
  <div class="flex h-32">
    <div class="w-1/2 bg-zinc-950 p-3 font-mono text-[10px] text-zinc-300 border-r border-zinc-700">
      <span class="text-purple-400">const</span> x = <span class="text-amber-300">42</span>
    </div>
    <div class="flex-1 bg-zinc-900 p-3 text-[10px] text-zinc-400">
      <p class="text-zinc-200 font-semibold mb-1">Output</p>
      <p class="text-emerald-400">→ 42</p>
    </div>
  </div>
</div>`,
    css: `.split-pane { display:flex; border-radius:.75rem; overflow:hidden; border:1px solid #3f3f46; }
.split-panel { overflow:hidden; padding:.75rem; font-size:.625rem; }
.split-panel.left { background:#09090b; font-family:monospace; color:#d4d4d8; border-right:1px solid #3f3f46; }
.split-panel.right { background:#18181b; color:#a1a1aa; flex:1; }
.split-divider { width:.25rem; background:#3f3f46; cursor:col-resize; transition:background .15s; }
.split-divider:hover { background:#60a5fa; }`,
  },
  {
    id: 'sticky-table', name: 'Sticky Header Table', category: 'Display',
    description: 'Scrollable table with a sticky top header and frozen first column.',
    Preview: StickyTablePreview,
    tailwind: `<div class="overflow-auto rounded-xl border border-zinc-200 bg-white" style="max-height:160px">
  <table class="w-full text-xs">
    <thead class="sticky top-0 z-10">
      <tr class="bg-zinc-100 border-b border-zinc-200">
        <th class="px-3 py-2 text-left font-semibold text-zinc-600">Name</th>
        <th class="px-3 py-2 text-left font-semibold text-zinc-600">Role</th>
        <th class="px-3 py-2 text-left font-semibold text-zinc-600">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-zinc-50 hover:bg-zinc-50">
        <td class="sticky left-0 bg-white px-3 py-2 font-medium text-zinc-800 border-r border-zinc-100">Alice Kim</td>
        <td class="px-3 py-2 text-zinc-500">Designer</td>
        <td class="px-3 py-2"><span class="rounded-full bg-emerald-100 px-2 text-[9px] font-semibold text-emerald-700">Active</span></td>
      </tr>
    </tbody>
  </table>
</div>`,
    css: `.sticky-table { overflow:auto; border-radius:.75rem; border:1px solid #e4e4e7; background:#fff; }
.sticky-table thead { position:sticky; top:0; z-index:10; }
.sticky-table th { background:#f4f4f5; padding:.5rem .75rem; font-size:.75rem; font-weight:600; color:#52525b; border-bottom:1px solid #e4e4e7; }
.sticky-table .frozen-col { position:sticky; left:0; background:#fff; border-right:1px solid #f4f4f5; z-index:5; }
.sticky-table td { padding:.5rem .75rem; font-size:.75rem; border-bottom:1px solid #fafafa; }`,
  },
  {
    id: 'word-cloud', name: 'Word Cloud / Tag Cloud', category: 'Display',
    description: 'Keyword cloud with varying font sizes and colors based on frequency.',
    Preview: WordCloudPreview,
    tailwind: `<div class="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 max-w-xs p-4">
  <span class="text-xl font-bold text-blue-600 cursor-default hover:opacity-70 transition">TypeScript</span>
  <span class="text-lg font-bold text-sky-500 cursor-default hover:opacity-70 transition">React</span>
  <span class="text-base font-semibold text-zinc-800 cursor-default hover:opacity-70 transition">Next.js</span>
  <span class="text-lg font-bold text-teal-500 cursor-default hover:opacity-70 transition">Tailwind</span>
  <span class="text-sm font-semibold text-emerald-600 cursor-default hover:opacity-70 transition">Node</span>
  <span class="text-sm font-medium text-pink-500 cursor-default hover:opacity-70 transition">GraphQL</span>
</div>`,
    css: `.word-cloud { display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:.5rem 1rem; padding:1rem; }
.word-cloud-tag { cursor:default; transition:opacity .15s; }
.word-cloud-tag:hover { opacity:.7; }`,
  },
  {
    id: 'floating-action-menu', name: 'Floating Action Menu', category: 'Navigation',
    description: 'Radial/vertical FAB menu that expands with labelled action buttons.',
    Preview: FloatingActionMenuPreview,
    tailwind: `<div class="relative flex flex-col items-center gap-2">
  <!-- Actions (shown when open) -->
  <div class="flex flex-col items-center gap-2">
    <div class="flex items-center gap-2">
      <span class="rounded-lg bg-white border px-2 py-0.5 text-[10px] font-semibold text-zinc-600 shadow-sm">Note</span>
      <button class="h-10 w-10 rounded-full bg-blue-500 text-white text-lg shadow-lg flex items-center justify-center hover:scale-110 transition">📝</button>
    </div>
  </div>
  <!-- FAB trigger -->
  <button class="h-12 w-12 rounded-full bg-zinc-900 text-white text-xl shadow-xl flex items-center justify-center hover:bg-zinc-800 transition">+</button>
</div>`,
    css: `.fab-menu { position:relative; display:flex; flex-direction:column; align-items:center; }
.fab-trigger { height:3rem; width:3rem; border-radius:9999px; background:#18181b; color:#fff; font-size:1.25rem; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 8px 24px rgba(0,0,0,.25); transition:transform .2s, background .15s; }
.fab-trigger.open { transform:rotate(45deg); }
.fab-actions { display:flex; flex-direction:column; align-items:center; gap:.5rem; }
.fab-action { display:flex; align-items:center; gap:.5rem; }
.fab-action-btn { height:2.5rem; width:2.5rem; border-radius:9999px; color:#fff; display:flex; align-items:center; justify-content:center; font-size:1.125rem; cursor:pointer; box-shadow:0 4px 12px rgba(0,0,0,.2); transition:transform .15s; }`,
  },
  {
    id: 'command-palette-v2', name: 'Command Palette', category: 'Overlay',
    description: 'Spotlight-style command palette with fuzzy search and keyboard shortcuts.',
    Preview: CommandPaletteV2Preview,
    tailwind: `<div class="rounded-2xl border border-zinc-200 bg-white shadow-xl overflow-hidden w-80">
  <div class="flex items-center gap-2 border-b border-zinc-100 px-4 py-3">
    🔍 <input placeholder="Type a command…" class="flex-1 text-sm outline-none placeholder-zinc-400"/>
    <kbd class="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold">esc</kbd>
  </div>
  <div class="py-1">
    <p class="px-4 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Commands</p>
    <button class="flex w-full items-center gap-3 px-4 py-2.5 hover:bg-blue-50 group">
      <span>🏠</span>
      <span class="flex-1 text-sm text-zinc-700 group-hover:text-blue-700">Go to Dashboard</span>
      <kbd class="rounded bg-zinc-100 px-1.5 py-0.5 text-[9px] text-zinc-400">G D</kbd>
    </button>
  </div>
</div>`,
    css: `.cmd-palette { border-radius:1rem; border:1px solid #e4e4e7; background:#fff; box-shadow:0 20px 40px rgba(0,0,0,.14); overflow:hidden; }
.cmd-search { display:flex; align-items:center; gap:.5rem; border-bottom:1px solid #f4f4f5; padding:.75rem 1rem; }
.cmd-input { flex:1; font-size:.875rem; outline:none; color:#18181b; }
.cmd-item { display:flex; align-items:center; gap:.75rem; padding:.625rem 1rem; cursor:pointer; transition:background .1s; }
.cmd-item:hover { background:#eff6ff; }
.cmd-item-label { flex:1; font-size:.875rem; color:#3f3f46; }
.cmd-item:hover .cmd-item-label { color:#1d4ed8; }`,
  },
  {
    id: 'table-of-contents', name: 'Table of Contents', category: 'Navigation',
    description: 'Docs-style sidebar TOC with active section highlight and indent levels.',
    Preview: TableOfContentsPreview,
    tailwind: `<nav class="border-l border-zinc-200">
  <p class="mb-3 pl-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400">On this page</p>
  <a href="#" class="block py-1 pl-3 text-xs font-semibold text-blue-600 border-l-2 border-blue-600 -ml-px">Installation</a>
  <a href="#" class="block py-1 pl-6 text-xs text-zinc-500 hover:text-zinc-800 border-l-2 border-transparent -ml-px">Configuration</a>
  <a href="#" class="block py-1 pl-9 text-xs text-zinc-500 hover:text-zinc-800 border-l-2 border-transparent -ml-px">Environment vars</a>
  <a href="#" class="block py-1 pl-3 text-xs text-zinc-500 hover:text-zinc-800 border-l-2 border-transparent -ml-px">Usage</a>
</nav>`,
    css: `.toc { border-left:1px solid #e4e4e7; }
.toc-title { padding:.25rem .75rem; font-size:.625rem; font-weight:700; text-transform:uppercase; letter-spacing:.05em; color:#a1a1aa; margin-bottom:.5rem; }
.toc-link { display:block; padding:.25rem; font-size:.75rem; border-left:2px solid transparent; margin-left:-1px; color:#71717a; transition:color .15s, border-color .15s; text-decoration:none; }
.toc-link:hover { color:#18181b; border-color:#d4d4d8; }
.toc-link.active { color:#2563eb; border-color:#2563eb; font-weight:600; }
.toc-link.level-1 { padding-left:.75rem; }
.toc-link.level-2 { padding-left:1.5rem; }
.toc-link.level-3 { padding-left:2.25rem; }`,
  },
  {
    id: 'invoice', name: 'Invoice Table', category: 'Display',
    description: 'Line-item invoice with description, quantity, rate, total, and status badge.',
    Preview: InvoicePreview,
    tailwind: `<div class="rounded-xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
  <div class="flex items-center justify-between border-b border-zinc-100 bg-zinc-50 px-4 py-3">
    <div><p class="text-sm font-bold text-zinc-900">Invoice #INV-0042</p><p class="text-[10px] text-zinc-400">Due: Jan 31, 2026</p></div>
    <span class="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-700">Pending</span>
  </div>
  <table class="w-full text-xs">
    <thead><tr class="border-b border-zinc-100 text-zinc-400">
      <th class="px-4 py-2 text-left font-semibold">Description</th>
      <th class="px-2 py-2 text-right font-semibold">Qty</th>
      <th class="px-4 py-2 text-right font-semibold">Total</th>
    </tr></thead>
    <tbody>
      <tr class="border-b border-zinc-50">
        <td class="px-4 py-2 text-zinc-700">UI Design</td>
        <td class="px-2 py-2 text-right text-zinc-500">8h</td>
        <td class="px-4 py-2 text-right font-semibold text-zinc-800">$1,200</td>
      </tr>
    </tbody>
  </table>
  <div class="border-t border-zinc-200 px-4 py-3 flex justify-between">
    <span class="text-xs text-zinc-500">Subtotal (USD)</span>
    <span class="text-sm font-bold text-zinc-900">$4,500</span>
  </div>
</div>`,
    css: `.invoice { border-radius:.75rem; border:1px solid #e4e4e7; background:#fff; overflow:hidden; }
.invoice-header { display:flex; align-items:center; justify-content:space-between; padding:.75rem 1rem; background:#fafafa; border-bottom:1px solid #f4f4f5; }
.invoice-table { width:100%; font-size:.75rem; }
.invoice-table th { padding:.5rem; font-weight:600; color:#a1a1aa; border-bottom:1px solid #f4f4f5; }
.invoice-table td { padding:.5rem 1rem; border-bottom:1px solid #fafafa; }
.invoice-total { display:flex; align-items:center; justify-content:space-between; padding:.75rem 1rem; border-top:1px solid #e4e4e7; }`,
  },
  {
    id: 'scroll-spy', name: 'Scroll Spy Nav', category: 'Navigation',
    description: 'Sidebar navigation that highlights the currently visible section.',
    Preview: ScrollSpyPreview,
    tailwind: `<div class="flex items-start gap-4">
  <!-- Sidebar -->
  <div class="flex flex-col gap-1">
    <button class="flex items-center gap-2 rounded-lg bg-blue-600 px-2.5 py-1.5 text-xs font-semibold text-white">
      <div class="h-1.5 w-1.5 rounded-full bg-white"></div> Hero
    </button>
    <button class="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-zinc-500 hover:text-zinc-800">
      <div class="h-1.5 w-1.5 rounded-full bg-zinc-300"></div> Features
    </button>
    <!-- more sections -->
  </div>
  <!-- Content preview -->
  <div class="flex-1 space-y-2">
    <div class="rounded-xl border border-blue-300 bg-blue-50 p-3"><p class="text-xs font-semibold text-zinc-700">Hero</p></div>
    <div class="rounded-xl border border-zinc-200 bg-white p-3"><p class="text-xs font-semibold text-zinc-700">Features</p></div>
  </div>
</div>`,
    css: `.scroll-spy-nav { display:flex; flex-direction:column; gap:.25rem; position:sticky; top:0; }
.scroll-spy-item { display:flex; align-items:center; gap:.5rem; border-radius:.5rem; padding:.375rem .625rem; font-size:.75rem; cursor:pointer; transition:all .15s; color:#71717a; background:transparent; }
.scroll-spy-item.active { background:#2563eb; color:#fff; font-weight:600; }
.scroll-spy-item.active .scroll-spy-dot { background:#fff; }
.scroll-spy-dot { height:.375rem; width:.375rem; border-radius:9999px; background:#d4d4d8; transition:background .15s; }`,
  },
  {
    id: 'announcement-banner', name: 'Announcement Banner', category: 'Feedback',
    description: 'Full-width dismissible announcement bar with info, success, warning, and error variants.',
    Preview: BannerAnnouncementPreview,
    tailwind: `<div class="flex items-center gap-3 rounded-xl bg-blue-600 px-4 py-3 text-white">
  <span class="text-base shrink-0">ℹ️</span>
  <p class="flex-1 text-xs font-medium">New version 2.0 is now available!</p>
  <button class="shrink-0 text-white/70 hover:text-white transition">✕</button>
</div>
<!-- Variants -->
<div class="flex items-center gap-3 rounded-xl bg-emerald-600 px-4 py-3 text-white">
  <span>✅</span><p class="flex-1 text-xs font-medium">Deployment succeeded.</p><button>✕</button>
</div>
<div class="flex items-center gap-3 rounded-xl bg-amber-500 px-4 py-3 text-white">
  <span>⚠️</span><p class="flex-1 text-xs font-medium">Scheduled maintenance Jan 15.</p><button>✕</button>
</div>`,
    css: `.announcement { display:flex; align-items:center; gap:.75rem; border-radius:.75rem; padding:.75rem 1rem; color:#fff; }
.announcement.info { background:#2563eb; }
.announcement.success { background:#059669; }
.announcement.warning { background:#d97706; }
.announcement.error { background:#dc2626; }
.announcement-text { flex:1; font-size:.75rem; font-weight:500; }
.announcement-close { color:rgba(255,255,255,.7); background:none; border:none; cursor:pointer; transition:color .15s; }
.announcement-close:hover { color:#fff; }`,
  },
  {
    id: 'permission-gate', name: 'Permission / Role Gate', category: 'Display',
    description: 'Role-based access table showing which permissions each role has.',
    Preview: PermissionGatePreview,
    tailwind: `<!-- Role switcher -->
<div class="flex gap-1.5 mb-3">
  <button class="rounded-full bg-zinc-900 px-3 py-1 text-[10px] font-semibold text-white">admin</button>
  <button class="rounded-full border border-zinc-200 px-3 py-1 text-[10px] font-semibold text-zinc-600">editor</button>
  <button class="rounded-full border border-zinc-200 px-3 py-1 text-[10px] font-semibold text-zinc-600">viewer</button>
</div>
<!-- Permission rows -->
<div class="rounded-xl border border-zinc-200 bg-white overflow-hidden">
  <div class="flex items-center justify-between px-4 py-2.5 border-b border-zinc-50">
    <span class="text-sm text-zinc-700">View</span>
    <span class="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[11px] text-emerald-600">✓</span>
  </div>
  <div class="flex items-center justify-between px-4 py-2.5 opacity-40">
    <span class="text-sm text-zinc-700">Delete</span>
    <span class="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-100 text-[11px] text-zinc-400">✕</span>
  </div>
</div>`,
    css: `.perm-table { border-radius:.75rem; border:1px solid #e4e4e7; background:#fff; overflow:hidden; }
.perm-row { display:flex; align-items:center; justify-content:space-between; padding:.625rem 1rem; border-bottom:1px solid #fafafa; transition:opacity .2s; }
.perm-row.denied { opacity:.4; }
.perm-check { display:flex; height:1.25rem; width:1.25rem; align-items:center; justify-content:center; border-radius:9999px; font-size:.6875rem; }
.perm-check.yes { background:#dcfce7; color:#16a34a; }
.perm-check.no { background:#f4f4f5; color:#a1a1aa; }`,
  },
  {
    id: 'drag-sort', name: 'Drag & Drop Sortable', category: 'Forms & Inputs',
    description: 'Reorder list items by dragging — shows a drop target highlight on hover.',
    Preview: DragSortPreview,
    tailwind: `<div class="space-y-1.5">
  <div class="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 cursor-grab">
    <span class="text-zinc-300">⠿</span>
    <span class="text-sm font-medium text-zinc-700">🎨 Design</span>
    <span class="ml-auto text-[10px] text-zinc-300">#1</span>
  </div>
  <div class="flex items-center gap-3 rounded-xl border border-blue-400 bg-blue-50 px-4 py-2.5 cursor-grab scale-[1.02]">
    <span class="text-zinc-300">⠿</span>
    <span class="text-sm font-medium text-zinc-700">💻 Development</span>
    <span class="ml-auto text-[10px] text-zinc-300">#2</span>
  </div>
</div>`,
    css: `.sortable-item { display:flex; align-items:center; gap:.75rem; border-radius:.75rem; border:1px solid #e4e4e7; background:#fff; padding:.625rem 1rem; cursor:grab; transition:all .15s; }
.sortable-item:active { cursor:grabbing; opacity:.6; }
.sortable-item.drag-over { border-color:#60a5fa; background:#eff6ff; transform:scale(1.02); }
.sortable-handle { color:#d4d4d8; font-size:.875rem; }
.sortable-label { font-size:.875rem; font-weight:500; color:#3f3f46; }
.sortable-index { margin-left:auto; font-size:.625rem; color:#d4d4d8; }`,
  },
  {
    id: 'counter-animated', name: 'Animated Counter', category: 'Display',
    description: 'Number count-up animation for KPI and stats sections — click to replay.',
    Preview: CounterAnimatedPreview,
    tailwind: `<div class="grid grid-cols-3 gap-2">
  <div class="rounded-xl border border-zinc-200 bg-white p-3 text-center">
    <p class="text-lg font-black text-blue-600 tabular-nums" id="counter1">12,847</p>
    <p class="text-[10px] text-zinc-400 font-medium mt-0.5">Total Users</p>
  </div>
  <div class="rounded-xl border border-zinc-200 bg-white p-3 text-center">
    <p class="text-lg font-black text-emerald-600 tabular-nums" id="counter2">98.6%</p>
    <p class="text-[10px] text-zinc-400 font-medium mt-0.5">Uptime</p>
  </div>
  <div class="rounded-xl border border-zinc-200 bg-white p-3 text-center">
    <p class="text-lg font-black text-purple-600 tabular-nums" id="counter3">4,392</p>
    <p class="text-[10px] text-zinc-400 font-medium mt-0.5">Deployments</p>
  </div>
</div>`,
    css: `.counter-card { border-radius:.75rem; border:1px solid #e4e4e7; background:#fff; padding:.75rem; text-align:center; }
.counter-value { font-size:1.125rem; font-weight:900; font-variant-numeric:tabular-nums; line-height:1; }
.counter-label { font-size:.625rem; color:#a1a1aa; font-weight:500; margin-top:.25rem; }
@keyframes countUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
.counter-value.animate { animation:countUp .4s ease forwards; }`,
  },
  {
    id: 'shortcut-badge', name: 'Keyboard Shortcut Badges', category: 'Display',
    description: 'Grid of keyboard shortcut reference cards with styled key badges.',
    Preview: ShortcutBadgePreview,
    tailwind: `<div class="grid grid-cols-2 gap-1.5">
  <div class="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2">
    <span class="text-xs text-zinc-600 font-medium">Save</span>
    <div class="flex gap-0.5">
      <kbd class="rounded-md border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-600 shadow-[0_1px_0_#d4d4d8]">⌘</kbd>
      <kbd class="rounded-md border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-600 shadow-[0_1px_0_#d4d4d8]">S</kbd>
    </div>
  </div>
  <!-- repeat for other shortcuts -->
</div>`,
    css: `.shortcut-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:.375rem; }
.shortcut-row { display:flex; align-items:center; justify-content:space-between; border-radius:.5rem; border:1px solid #e4e4e7; background:#fff; padding:.5rem .75rem; }
.shortcut-action { font-size:.75rem; font-weight:500; color:#52525b; }
.shortcut-keys { display:flex; gap:.125rem; }
kbd { border-radius:.375rem; border:1px solid #e4e4e7; background:#f4f4f5; padding:.125rem .375rem; font-size:.625rem; font-weight:600; color:#52525b; box-shadow:0 1px 0 #d4d4d8; font-family:inherit; }`,
  },
  {
    id: 'oauth-buttons', name: 'OAuth / SSO Buttons', category: 'Forms & Inputs',
    description: 'Social login buttons for Google, GitHub, Twitter, Apple — with loading state.',
    Preview: OAuthButtonsPreview,
    tailwind: `<div class="space-y-2">
  <button class="flex w-full items-center justify-center gap-2.5 rounded-xl border border-zinc-300 bg-white py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition">
    🔵 Continue with Google
  </button>
  <button class="flex w-full items-center justify-center gap-2.5 rounded-xl bg-zinc-900 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 transition">
    ⚫ Continue with GitHub
  </button>
  <button class="flex w-full items-center justify-center gap-2.5 rounded-xl bg-sky-500 py-2.5 text-sm font-semibold text-white hover:bg-sky-600 transition">
    🐦 Continue with Twitter
  </button>
  <button class="flex w-full items-center justify-center gap-2.5 rounded-xl bg-black py-2.5 text-sm font-semibold text-white hover:bg-zinc-900 transition">
    🍎 Continue with Apple
  </button>
</div>`,
    css: `.oauth-btn { display:flex; align-items:center; justify-content:center; gap:.625rem; width:100%; border-radius:.75rem; padding:.625rem; font-size:.875rem; font-weight:600; cursor:pointer; transition:opacity .15s; border:none; }
.oauth-btn:hover { opacity:.9; }
.oauth-btn.google { background:#fff; color:#3f3f46; border:1px solid #d4d4d8; }
.oauth-btn.github { background:#18181b; color:#fff; }
.oauth-btn.twitter { background:#0ea5e9; color:#fff; }
.oauth-btn.apple { background:#000; color:#fff; }
.oauth-spinner { height:1rem; width:1rem; border-radius:9999px; border:2px solid currentColor; border-top-color:transparent; animation:spin .7s linear infinite; }`,
  },
  {
    id: 'empty-state-variants', name: 'Empty State Variants', category: 'Feedback',
    description: 'Three empty state variants — no messages, no results, empty folder — with CTAs.',
    Preview: EmptyStateVariantsPreview,
    tailwind: `<div class="rounded-2xl border border-zinc-200 bg-white px-6 py-8 shadow-sm text-center">
  <div class="text-4xl mb-3">📭</div>
  <p class="text-sm font-bold text-zinc-800">No messages yet</p>
  <p class="text-xs text-zinc-400 mt-1 leading-relaxed">When you receive messages, they'll show up here.</p>
  <button class="mt-4 rounded-xl border-2 border-blue-600 px-4 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 transition">
    Compose message
  </button>
</div>`,
    css: `.empty-state { border-radius:1rem; border:1px solid #e4e4e7; background:#fff; padding:2rem 1.5rem; text-align:center; box-shadow:0 1px 3px rgba(0,0,0,.05); }
.empty-state-icon { font-size:2.5rem; margin-bottom:.75rem; }
.empty-state-title { font-size:.875rem; font-weight:700; color:#18181b; }
.empty-state-desc { font-size:.75rem; color:#a1a1aa; margin-top:.25rem; line-height:1.5; }
.empty-state-cta { display:inline-block; margin-top:1rem; border-radius:.75rem; border:2px solid; padding:.375rem 1rem; font-size:.75rem; font-weight:600; cursor:pointer; transition:background .15s; }`,
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
   Category color map
───────────────────────────────────────────── */
const CATEGORY_COLORS: Record<string, string> = {
  'Feedback': 'bg-amber-100 text-amber-700 border-amber-200',
  'Navigation': 'bg-blue-100 text-blue-700 border-blue-200',
  'Forms & Inputs': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Display': 'bg-purple-100 text-purple-700 border-purple-200',
  'Overlay': 'bg-rose-100 text-rose-700 border-rose-200',
  'Layout': 'bg-zinc-100 text-zinc-600 border-zinc-200',
};

/* ─────────────────────────────────────────────
   Component Card
───────────────────────────────────────────── */
function ComponentCard({ comp }: { comp: ComponentDef }) {
  const [tab, setTab] = useState<CodeTab>('tailwind');
  const Preview = comp.Preview;
  const catColor = CATEGORY_COLORS[comp.category] || 'bg-zinc-100 text-zinc-600 border-zinc-200';
  return (
    <div className="group flex flex-col rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-zinc-100">
        <div className="min-w-0">
          <h3 className="font-semibold text-zinc-900 text-sm leading-snug">{comp.name}</h3>
          <p className="mt-1 text-[12px] text-zinc-400 leading-relaxed line-clamp-2">{comp.description}</p>
        </div>
        <span className={`ml-2 shrink-0 inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold whitespace-nowrap ${catColor}`}>
          {comp.category}
        </span>
      </div>

      {/* Preview */}
      <div className="border-b border-zinc-100 bg-[#FAFAFA] min-h-[160px] flex items-center justify-center">
        <Preview />
      </div>

      {/* Code tabs */}
      <div className="flex flex-col flex-1">
        <div className="flex items-center border-b border-zinc-100 bg-zinc-50 px-1 pt-1">
          {(['tailwind', 'css'] as CodeTab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-[11px] font-semibold rounded-t-lg border-b-2 transition ${
                tab === t
                  ? 'border-zinc-900 text-zinc-900 bg-white'
                  : 'border-transparent text-zinc-400 hover:text-zinc-600'
              }`}
            >
              {t === 'tailwind' ? '⚡ Tailwind' : '🎨 Plain CSS'}
            </button>
          ))}
        </div>
        <div className="p-3 flex-1">
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
    <div className="min-h-screen bg-[#F8F9FB]">
      {/* ── Hero ── */}
      <div className="relative overflow-hidden border-b border-zinc-200 bg-white">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-50/70 via-white to-purple-50/50" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:py-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-600">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
            {COMPONENTS.length} Ready-to-Use Components
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            CSS UI{' '}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Components
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] text-zinc-500 leading-relaxed">
            Production-ready components with live previews. Copy Tailwind or plain CSS — no framework lock-in, no signup required.
          </p>

          {/* Stats chips */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {[
              { n: String(COMPONENTS.length) + '+', l: 'Components' },
              { n: '2', l: 'Code formats' },
              { n: '100%', l: 'Free forever' },
              { n: '0', l: 'Dependencies' },
            ].map((s) => (
              <div key={s.l} className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs shadow-sm">
                <span className="font-bold text-zinc-900">{s.n}</span>
                <span className="text-zinc-500">{s.l}</span>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="relative mx-auto mt-7 max-w-md">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search components… (e.g. button, modal, card)"
              className="w-full rounded-2xl border border-zinc-200 bg-white py-3 pl-11 pr-11 text-sm text-zinc-800 placeholder-zinc-400 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition">
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Category filter ── */}
      <div className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-1.5 overflow-x-auto px-4 py-3 sm:px-6">
          {CATEGORIES.map((cat) => {
            const count = cat === 'All' ? COMPONENTS.length : COMPONENTS.filter((c) => c.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`shrink-0 flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition whitespace-nowrap ${
                  activeCat === cat
                    ? 'bg-zinc-900 text-white shadow-sm'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                {cat}
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${activeCat === cat ? 'bg-white/20 text-white' : 'bg-white text-zinc-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
          <div className="ml-auto shrink-0 pl-4 text-xs text-zinc-400 whitespace-nowrap">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-zinc-400">
            <Search size={44} className="mb-4 opacity-20" />
            <p className="text-lg font-semibold text-zinc-600">No components found</p>
            <p className="mt-1 text-sm text-zinc-400">Try a different search or category</p>
            <button
              onClick={() => { setSearch(''); setActiveCat('All'); }}
              className="mt-5 rounded-xl bg-zinc-900 px-5 py-2 text-sm font-semibold text-white hover:bg-zinc-800 transition"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((comp) => (
              <ComponentCard key={comp.id} comp={comp} />
            ))}
          </div>
        )}
      </div>

      {/* ── Footer CTA ── */}
      <div className="border-t border-zinc-200 bg-white py-10 text-center">
        <p className="text-sm font-medium text-zinc-600">All components are <span className="text-zinc-900 font-bold">100% free</span> — copy, paste, and ship.</p>
        <p className="mt-1.5 text-xs text-zinc-400">No account required · No watermarks · Tailwind + plain CSS included</p>
      </div>
    </div>
  );
}
