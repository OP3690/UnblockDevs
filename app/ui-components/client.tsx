'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  Check, Copy, Search, ChevronRight, ChevronDown, X,
  Bell, Settings, User, Mail, Lock,
  AlertCircle, CheckCircle, XCircle, Info, MoreHorizontal,
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

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
    <div className={`flex min-h-[220px] w-full flex-wrap items-center justify-center gap-3 p-8 ${bg}`}>
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
      <div className="w-full overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
        <table className="w-full min-w-[340px] text-left text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              {['Name', 'Role', 'Status', 'Action'].map((h) => (
                <th key={h} className="px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-zinc-500 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {rows.map((r) => (
              <tr key={r.name} className="hover:bg-zinc-50 transition">
                <td className="px-3 py-2.5 font-medium text-zinc-800 whitespace-nowrap">{r.name}</td>
                <td className="px-3 py-2.5 text-zinc-500 whitespace-nowrap">{r.role}</td>
                <td className="px-3 py-2.5">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                    r.status === 'Active' ? 'bg-green-100 text-green-700' : r.status === 'Away' ? 'bg-yellow-100 text-yellow-700' : 'bg-zinc-100 text-zinc-500'
                  }`}>{r.status}</span>
                </td>
                <td className="px-3 py-2.5"><button className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition whitespace-nowrap">Edit</button></td>
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
   AI Assistant Sidebars (9)
───────────────────────────────────────────── */
function AiSidebarMainPreview() {
  const [active, setActive] = useState('Text Generator');
  const items = [
    { icon: '✍️', label: 'Text Generator', badge: 'GPT-4' },
    { icon: '🎨', label: 'Image Generator', badge: 'DALL·E' },
    { icon: '💻', label: 'Code Generator', badge: 'Claude' },
    { icon: '🎬', label: 'Video Generator', badge: 'New' },
    { icon: '🎵', label: 'Audio Generator' },
    { icon: '📝', label: 'Summarizer' },
    { icon: '🌍', label: 'Translator' },
  ];
  return (
    <PreviewWrap bg="bg-slate-950">
      <div className="flex h-[300px] w-[210px] flex-col rounded-2xl bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl border border-slate-700 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3.5 border-b border-slate-700">
          <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-sm">✦</div>
          <span className="text-sm font-bold text-white">AI Studio</span>
        </div>
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
          {items.map(({ icon, label, badge }) => (
            <button key={label} onClick={() => setActive(label)}
              className={`w-full flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-medium transition-all ${active === label ? 'bg-violet-600/80 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}>
              <span>{icon}</span><span className="flex-1 text-left">{label}</span>
              {badge && <span className={`rounded-md px-1.5 py-0.5 text-[9px] font-bold ${badge === 'New' ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300'}`}>{badge}</span>}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2 px-3 py-3 border-t border-slate-700">
          <div className="h-6 w-6 rounded-full bg-violet-500 flex items-center justify-center text-[10px] font-bold text-white">U</div>
          <div className="flex-1 min-w-0"><p className="text-[10px] font-semibold text-white">Pro Plan</p><p className="text-[9px] text-slate-400">850 credits left</p></div>
        </div>
      </div>
    </PreviewWrap>
  );
}

function AiSidebarTextPreview() {
  const [active, setActive] = useState('Blog Post');
  const [model, setModel] = useState('GPT-4o');
  const templates = ['Blog Post', 'Email Draft', 'LinkedIn Post', 'Product Desc.', 'Tweet Thread', 'Press Release'];
  const recents = ['Explain quantum computing', 'Write a cold email for...', 'Summarize this article'];
  return (
    <PreviewWrap bg="bg-slate-950">
      <div className="flex h-[300px] w-[220px] flex-col rounded-2xl bg-slate-900 shadow-2xl border border-slate-700 overflow-hidden">
        <div className="px-3 py-3 border-b border-slate-700">
          <p className="text-xs font-bold text-white mb-2">✍️ Text Generator</p>
          <select value={model} onChange={e => setModel(e.target.value)}
            className="w-full rounded-lg bg-slate-800 border border-slate-600 text-[11px] text-slate-300 px-2 py-1.5 focus:outline-none">
            {['GPT-4o', 'Claude 3.5', 'Gemini Pro'].map(m => <option key={m}>{m}</option>)}
          </select>
        </div>
        <div className="px-2 py-2 space-y-0.5 border-b border-slate-700">
          <p className="px-2.5 text-[9px] font-bold text-slate-500 mb-1">TEMPLATES</p>
          {templates.map(t => (
            <button key={t} onClick={() => setActive(t)}
              className={`w-full text-left rounded-lg px-2.5 py-1.5 text-xs transition-all ${active === t ? 'bg-violet-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>{t}</button>
          ))}
        </div>
        <div className="px-2 py-2 flex-1 overflow-auto">
          <p className="px-2.5 text-[9px] font-bold text-slate-500 mb-1">RECENT</p>
          {recents.map(r => <p key={r} className="px-2.5 py-1 text-[10px] text-slate-500 hover:text-slate-300 truncate cursor-pointer">{r}</p>)}
        </div>
      </div>
    </PreviewWrap>
  );
}

function AiSidebarImagePreview() {
  const [style, setStyle] = useState('Photorealistic');
  const [ratio, setRatio] = useState('1:1');
  const styles = ['Photorealistic', 'Illustration', 'Anime', 'Oil Painting', 'Pixel Art', '3D Render'];
  const ratios = ['1:1', '16:9', '4:3', '9:16'];
  return (
    <PreviewWrap bg="bg-slate-950">
      <div className="flex h-[300px] w-[220px] flex-col rounded-2xl bg-slate-900 shadow-2xl border border-slate-700 overflow-hidden">
        <div className="px-3 py-3 border-b border-slate-700"><p className="text-xs font-bold text-white">🎨 Image Generator</p></div>
        <div className="flex-1 px-3 py-2 overflow-auto space-y-3">
          <div>
            <p className="text-[9px] font-bold text-slate-400 mb-1.5 tracking-widest">STYLE</p>
            <div className="space-y-0.5">
              {styles.map(s => (
                <button key={s} onClick={() => setStyle(s)}
                  className={`w-full text-left rounded-lg px-2.5 py-1.5 text-xs transition-all ${style === s ? 'bg-pink-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-400 mb-1.5 tracking-widest">ASPECT RATIO</p>
            <div className="grid grid-cols-4 gap-1">
              {ratios.map(r => (
                <button key={r} onClick={() => setRatio(r)}
                  className={`rounded-lg py-1.5 text-[10px] font-bold transition-all ${ratio === r ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>{r}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-400 mb-1 tracking-widest">QUALITY</p>
            <div className="grid grid-cols-3 gap-1">
              {['Draft', 'Standard', 'HD'].map(q => (
                <button key={q} className="rounded-lg bg-slate-800 py-1.5 text-[10px] font-bold text-slate-400 hover:bg-slate-700">{q}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PreviewWrap>
  );
}

function AiSidebarCodePreview() {
  const [lang, setLang] = useState('TypeScript');
  const [active, setActive] = useState('Generate');
  const langs = ['TypeScript', 'Python', 'Go', 'Rust', 'Java', 'SQL', 'Bash'];
  const actions = ['Generate', 'Refactor', 'Explain', 'Debug', 'Add Tests', 'Document'];
  return (
    <PreviewWrap bg="bg-slate-950">
      <div className="flex h-[300px] w-[220px] flex-col rounded-2xl bg-slate-900 shadow-2xl border border-slate-700 overflow-hidden">
        <div className="px-3 py-3 border-b border-slate-700"><p className="text-xs font-bold text-white">💻 Code Generator</p></div>
        <div className="flex-1 px-3 py-2 overflow-auto space-y-3">
          <div>
            <p className="text-[9px] font-bold text-slate-400 mb-1.5 tracking-widest">LANGUAGE</p>
            <div className="flex flex-wrap gap-1">
              {langs.map(l => (
                <button key={l} onClick={() => setLang(l)}
                  className={`rounded-md px-2 py-1 text-[10px] font-semibold transition-all ${lang === l ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>{l}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-400 mb-1.5 tracking-widest">ACTION</p>
            <div className="space-y-0.5">
              {actions.map(a => (
                <button key={a} onClick={() => setActive(a)}
                  className={`w-full text-left rounded-lg px-2.5 py-1.5 text-xs transition-all ${active === a ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>{a}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PreviewWrap>
  );
}

function AiSidebarVideoPreview() {
  const [duration, setDuration] = useState('15s');
  const [active, setActive] = useState('Text to Video');
  const modes = ['Text to Video', 'Image to Video', 'Video to Video', 'Storyboard'];
  const durations = ['5s', '10s', '15s', '30s', '60s'];
  return (
    <PreviewWrap bg="bg-slate-950">
      <div className="flex h-[300px] w-[220px] flex-col rounded-2xl bg-slate-900 shadow-2xl border border-slate-700 overflow-hidden">
        <div className="px-3 py-3 border-b border-slate-700 flex items-center justify-between">
          <p className="text-xs font-bold text-white">🎬 Video Generator</p>
          <span className="rounded-md bg-emerald-500 px-2 py-0.5 text-[9px] font-bold text-white">New</span>
        </div>
        <div className="flex-1 px-3 py-2 overflow-auto space-y-3">
          <div>
            <p className="text-[9px] font-bold text-slate-400 mb-1.5 tracking-widest">MODE</p>
            <div className="space-y-0.5">
              {modes.map(m => (
                <button key={m} onClick={() => setActive(m)}
                  className={`w-full text-left rounded-lg px-2.5 py-1.5 text-xs transition-all ${active === m ? 'bg-rose-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>{m}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-400 mb-1.5 tracking-widest">DURATION</p>
            <div className="flex flex-wrap gap-1">
              {durations.map(d => (
                <button key={d} onClick={() => setDuration(d)}
                  className={`rounded-md px-2.5 py-1 text-[10px] font-bold transition-all ${duration === d ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>{d}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[9px] font-bold text-slate-400 mb-1 tracking-widest">QUALITY</p>
            <div className="grid grid-cols-3 gap-1">
              {['480p', '720p', '1080p'].map(q => (
                <button key={q} className="rounded-lg bg-slate-800 py-1.5 text-[10px] font-bold text-slate-400 hover:bg-slate-700">{q}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PreviewWrap>
  );
}

function AiSidebarHistoryPreview() {
  const [active, setActive] = useState(0);
  const history = [
    { type: '✍️', prompt: 'Write a product launch email for...', time: '2m ago', tag: 'Text' },
    { type: '🎨', prompt: 'Futuristic city at night, neon lights...', time: '14m ago', tag: 'Image' },
    { type: '💻', prompt: 'Create a React hook for debounce...', time: '1h ago', tag: 'Code' },
    { type: '✍️', prompt: 'Summarize this article about AI...', time: '3h ago', tag: 'Text' },
    { type: '🌍', prompt: 'Translate to Spanish: "Hello world"', time: 'Yesterday', tag: 'Translate' },
  ];
  return (
    <PreviewWrap bg="bg-slate-950">
      <div className="flex h-[300px] w-[240px] flex-col rounded-2xl bg-slate-900 shadow-2xl border border-slate-700 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-3 border-b border-slate-700">
          <p className="text-xs font-bold text-white">🕐 History</p>
          <button className="text-[10px] text-slate-400 hover:text-slate-200">Clear all</button>
        </div>
        <div className="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
          {history.map(({ type, prompt, time, tag }, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`w-full rounded-xl px-2.5 py-2 text-left transition-all ${active === i ? 'bg-slate-700' : 'hover:bg-slate-800'}`}>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm">{type}</span>
                <span className="flex-1 text-[11px] font-semibold text-slate-200 truncate">{prompt}</span>
              </div>
              <div className="flex items-center gap-2 pl-6">
                <span className="rounded-md bg-slate-700 px-1.5 py-0.5 text-[9px] font-bold text-slate-400">{tag}</span>
                <span className="text-[9px] text-slate-500">{time}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function AiSidebarModelsPreview() {
  const [selected, setSelected] = useState('GPT-4o');
  const models = [
    { name: 'GPT-4o', provider: 'OpenAI', speed: '⚡⚡⚡', quality: '★★★★★', badge: 'Best' },
    { name: 'Claude 3.5', provider: 'Anthropic', speed: '⚡⚡⚡', quality: '★★★★★', badge: '' },
    { name: 'Gemini Pro', provider: 'Google', speed: '⚡⚡', quality: '★★★★', badge: '' },
    { name: 'Llama 3', provider: 'Meta', speed: '⚡⚡⚡⚡', quality: '★★★', badge: 'Free' },
    { name: 'Mistral', provider: 'Mistral AI', speed: '⚡⚡⚡⚡', quality: '★★★★', badge: '' },
  ];
  return (
    <PreviewWrap bg="bg-slate-950">
      <div className="flex h-[300px] w-[250px] flex-col rounded-2xl bg-slate-900 shadow-2xl border border-slate-700 overflow-hidden">
        <div className="px-3 py-3 border-b border-slate-700"><p className="text-xs font-bold text-white">🤖 Select Model</p></div>
        <div className="flex-1 px-2 py-2 space-y-1 overflow-auto">
          {models.map(({ name, provider, speed, quality, badge }) => (
            <button key={name} onClick={() => setSelected(name)}
              className={`w-full rounded-xl px-3 py-2 text-left transition-all border ${selected === name ? 'border-violet-500 bg-violet-600/20' : 'border-transparent hover:bg-slate-800'}`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold ${selected === name ? 'text-violet-300' : 'text-slate-200'}`}>{name}</span>
                {badge && <span className={`rounded-md px-1.5 py-0.5 text-[9px] font-bold ${badge === 'Free' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-violet-500/30 text-violet-300'}`}>{badge}</span>}
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-[9px] text-slate-500">{provider}</span>
                <span className="text-[9px] text-slate-500">Speed: {speed}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function AiSidebarPromptsPreview() {
  const [active, setActive] = useState('Marketing');
  const [fav, setFav] = useState(new Set([0, 2]));
  const cats = ['All', 'Marketing', 'Dev', 'Writing', 'SEO'];
  const prompts = [
    { title: 'Product launch email', uses: 142, fav: true },
    { title: 'Bug report template', uses: 98, fav: false },
    { title: 'SEO meta description', uses: 204, fav: true },
    { title: 'LinkedIn headline', uses: 67, fav: false },
  ];
  return (
    <PreviewWrap bg="bg-slate-950">
      <div className="flex h-[300px] w-[240px] flex-col rounded-2xl bg-slate-900 shadow-2xl border border-slate-700 overflow-hidden">
        <div className="px-3 py-3 border-b border-slate-700"><p className="text-xs font-bold text-white">📝 Saved Prompts</p></div>
        <div className="flex gap-1 px-2 py-2 border-b border-slate-700 overflow-x-auto">
          {cats.map(c => (
            <button key={c} onClick={() => setActive(c)}
              className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-semibold transition-all ${active === c ? 'bg-violet-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>{c}</button>
          ))}
        </div>
        <div className="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
          {prompts.map(({ title, uses }, i) => (
            <div key={title} className="flex items-center gap-2 rounded-xl px-2.5 py-2 hover:bg-slate-800 transition">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-200 truncate">{title}</p>
                <p className="text-[9px] text-slate-500">{uses} uses</p>
              </div>
              <button onClick={() => setFav(s => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; })}
                className={`text-sm transition-all ${fav.has(i) ? 'text-yellow-400' : 'text-slate-600 hover:text-slate-400'}`}>★</button>
            </div>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function AiSidebarSettingsPreview() {
  const [streaming, setStreaming] = useState(true);
  const [memory, setMemory] = useState(true);
  const [temp, setTemp] = useState(0.7);
  const sections = [
    { title: 'API & KEYS', items: ['API Keys', 'Usage & Billing', 'Rate Limits'] },
    { title: 'PREFERENCES', items: ['Default Model', 'Language', 'Timezone'] },
  ];
  return (
    <PreviewWrap bg="bg-slate-950">
      <div className="flex h-[300px] w-[240px] flex-col rounded-2xl bg-slate-900 shadow-2xl border border-slate-700 overflow-hidden">
        <div className="px-3 py-3 border-b border-slate-700"><p className="text-xs font-bold text-white">⚙️ AI Settings</p></div>
        <div className="flex-1 px-3 py-2 overflow-auto space-y-3">
          <div className="flex items-center justify-between">
            <div><p className="text-xs font-semibold text-slate-200">Streaming</p><p className="text-[9px] text-slate-500">Real-time token output</p></div>
            <button onClick={() => setStreaming(v => !v)} className={`relative h-5 w-9 rounded-full transition-colors ${streaming ? 'bg-violet-600' : 'bg-slate-700'}`}>
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${streaming ? 'left-4' : 'left-0.5'}`} />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div><p className="text-xs font-semibold text-slate-200">Memory</p><p className="text-[9px] text-slate-500">Remember past chats</p></div>
            <button onClick={() => setMemory(v => !v)} className={`relative h-5 w-9 rounded-full transition-colors ${memory ? 'bg-violet-600' : 'bg-slate-700'}`}>
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${memory ? 'left-4' : 'left-0.5'}`} />
            </button>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1"><p className="text-xs font-semibold text-slate-200">Temperature</p><span className="text-xs font-bold text-violet-400">{temp}</span></div>
            <input type="range" min="0" max="1" step="0.1" value={temp} onChange={e => setTemp(+e.target.value)} className="w-full accent-violet-500" />
            <div className="flex justify-between text-[9px] text-slate-500 mt-0.5"><span>Precise</span><span>Creative</span></div>
          </div>
          {sections.map(({ title, items }) => (
            <div key={title}>
              <p className="text-[9px] font-bold text-slate-500 mb-1 tracking-widest">{title}</p>
              {items.map(item => <p key={item} className="py-1 text-xs text-slate-400 hover:text-slate-200 cursor-pointer">{item}</p>)}
            </div>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   E-Commerce Sidebars (12)
───────────────────────────────────────────── */
function Ecom2SidebarMainPreview() {
  const [active, setActive] = useState('Dashboard');
  const groups = [
    { title: 'STORE', items: [{ icon: '⊞', label: 'Dashboard' }, { icon: '📦', label: 'Products', badge: '248' }, { icon: '🛒', label: 'Orders', badge: '12' }] },
    { title: 'FINANCES', items: [{ icon: '💳', label: 'Billing' }, { icon: '🧾', label: 'Invoices' }, { icon: '💸', label: 'Transactions' }] },
    { title: 'CUSTOMERS', items: [{ icon: '👥', label: 'Customers' }, { icon: '⭐', label: 'Reviews' }] },
    { title: 'SETTINGS', items: [{ icon: '⚙️', label: 'Settings' }, { icon: '🚀', label: 'Integrations' }] },
  ];
  return (
    <PreviewWrap bg="bg-orange-50">
      <div className="flex h-[320px] w-[200px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3.5 border-b border-zinc-100">
          <div className="h-7 w-7 rounded-xl bg-orange-500 flex items-center justify-center text-white text-xs font-bold">🛍</div>
          <span className="text-sm font-bold text-zinc-800">ShopFlow</span>
        </div>
        <nav className="flex-1 px-2 py-1.5 overflow-auto space-y-2">
          {groups.map(({ title, items }) => (
            <div key={title}>
              <p className="px-2.5 mb-0.5 text-[9px] font-bold tracking-widest text-zinc-400">{title}</p>
              {items.map(({ icon, label, badge }) => (
                <button key={label} onClick={() => setActive(label)}
                  className={`w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${active === label ? 'bg-orange-50 text-orange-700' : 'text-zinc-500 hover:bg-zinc-50'}`}>
                  <span>{icon}</span><span className="flex-1 text-left">{label}</span>
                  {badge && <span className="rounded-full bg-orange-100 px-1.5 py-0.5 text-[9px] font-bold text-orange-600">{badge}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

function Ecom2SidebarProductsPreview() {
  const [active, setActive] = useState('All');
  const [sort, setSort] = useState('Newest');
  const cats = [{ l: 'All', n: 248 }, { l: 'Active', n: 189 }, { l: 'Draft', n: 42 }, { l: 'Archived', n: 17 }, { l: 'Out of Stock', n: 6 }];
  return (
    <PreviewWrap bg="bg-amber-50">
      <div className="flex h-[300px] w-[220px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-3 border-b border-zinc-100">
          <div className="flex items-center gap-1.5 flex-1 rounded-lg bg-zinc-100 px-2.5 py-1.5"><span className="text-xs text-zinc-400">🔍</span><span className="text-xs text-zinc-400">Search products...</span></div>
          <button className="rounded-lg bg-orange-500 px-2.5 py-1.5 text-[10px] font-bold text-white">+ Add</button>
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-100">
          <p className="text-[10px] font-semibold text-zinc-600">Status filter</p>
          <select value={sort} onChange={e => setSort(e.target.value)} className="text-[10px] text-zinc-500 bg-transparent border-none focus:outline-none">
            {['Newest', 'Price ↑', 'Price ↓', 'Stock'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <nav className="flex-1 px-2 py-1.5 space-y-0.5 overflow-auto">
          {cats.map(({ l, n }) => (
            <button key={l} onClick={() => setActive(l)}
              className={`w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium transition-all ${active === l ? 'bg-orange-50 text-orange-700' : 'text-zinc-500 hover:bg-zinc-50'}`}>
              <span>{l}</span><span className={`text-[10px] ${active === l ? 'text-orange-400' : 'text-zinc-400'}`}>{n}</span>
            </button>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

function Ecom2SidebarAddProductPreview() {
  const [step, setStep] = useState(2);
  const steps = [
    { n: 1, title: 'Basic Info', desc: 'Name, SKU, category' },
    { n: 2, title: 'Pricing', desc: 'Price, compare, tax' },
    { n: 3, title: 'Inventory', desc: 'Stock, variants' },
    { n: 4, title: 'Images', desc: 'Upload photos' },
    { n: 5, title: 'SEO', desc: 'Meta title, slug' },
    { n: 6, title: 'Publish', desc: 'Review & go live' },
  ];
  return (
    <PreviewWrap bg="bg-orange-50">
      <div className="flex h-[300px] w-[220px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-100"><p className="text-xs font-bold text-zinc-800">📦 Add Product</p><p className="text-[9px] text-zinc-400 mt-0.5">Step {step} of 6</p></div>
        <div className="h-1 bg-zinc-100"><div className="h-1 bg-orange-500 transition-all" style={{ width: `${(step/6)*100}%` }} /></div>
        <nav className="flex-1 px-3 py-2 overflow-auto">
          {steps.map((s, i) => (
            <button key={s.n} onClick={() => setStep(s.n)}
              className={`w-full flex items-center gap-3 rounded-lg px-2 py-2 text-left transition-all ${step === s.n ? 'bg-orange-50' : 'hover:bg-zinc-50'}`}>
              <div className={`h-6 w-6 shrink-0 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${s.n < step ? 'bg-orange-500 border-orange-500 text-white' : s.n === step ? 'border-orange-500 text-orange-600' : 'border-zinc-200 text-zinc-400'}`}>
                {s.n < step ? '✓' : s.n}
              </div>
              <div className="min-w-0">
                <p className={`text-xs font-semibold ${step === s.n ? 'text-orange-700' : s.n < step ? 'text-zinc-600' : 'text-zinc-400'}`}>{s.title}</p>
                <p className="text-[9px] text-zinc-400 truncate">{s.desc}</p>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

function Ecom2SidebarBillingPreview() {
  const [active, setActive] = useState('Overview');
  const items = ['Overview', 'Current Plan', 'Payment Methods', 'Billing History', 'Invoices', 'Usage'];
  const plan = { name: 'Pro', price: '$49/mo', next: 'May 15, 2026', used: 68 };
  return (
    <PreviewWrap bg="bg-green-50">
      <div className="flex h-[300px] w-[220px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-100"><p className="text-xs font-bold text-zinc-800">💳 Billing</p></div>
        <div className="px-3 py-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 mx-2 mt-2 rounded-xl">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-emerald-100">CURRENT PLAN</p>
            <span className="rounded-md bg-white/20 px-1.5 py-0.5 text-[9px] font-bold text-white">{plan.name}</span>
          </div>
          <p className="text-lg font-bold text-white mt-0.5">{plan.price}</p>
          <p className="text-[9px] text-emerald-100">Renews {plan.next}</p>
          <div className="mt-1.5 h-1 rounded-full bg-white/20"><div className="h-1 rounded-full bg-white" style={{ width: `${plan.used}%` }} /></div>
          <p className="text-[9px] text-emerald-100 mt-0.5">{plan.used}% of quota used</p>
        </div>
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
          {items.map(item => (
            <button key={item} onClick={() => setActive(item)}
              className={`w-full text-left rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${active === item ? 'bg-emerald-50 text-emerald-700' : 'text-zinc-500 hover:bg-zinc-50'}`}>{item}</button>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

function Ecom2SidebarInvoicesPreview() {
  const [active, setActive] = useState('All');
  const filters = [{ l: 'All', n: 47, dot: 'bg-zinc-400' }, { l: 'Paid', n: 38, dot: 'bg-emerald-500' }, { l: 'Pending', n: 6, dot: 'bg-amber-400' }, { l: 'Overdue', n: 3, dot: 'bg-red-500' }];
  const recent = [
    { id: 'INV-2024', client: 'Acme Corp', amount: '$1,200', status: 'Paid', statusColor: 'text-emerald-600' },
    { id: 'INV-2023', client: 'Beta LLC', amount: '$840', status: 'Pending', statusColor: 'text-amber-600' },
    { id: 'INV-2022', client: 'Gamma Inc', amount: '$2,400', status: 'Paid', statusColor: 'text-emerald-600' },
  ];
  return (
    <PreviewWrap bg="bg-blue-50">
      <div className="flex h-[300px] w-[230px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100">
          <p className="text-xs font-bold text-zinc-800">🧾 Invoices</p>
          <button className="rounded-lg bg-blue-600 px-2 py-1 text-[10px] font-bold text-white">+ New</button>
        </div>
        <div className="flex gap-1 px-2 py-2 border-b border-zinc-100">
          {filters.map(({ l, n, dot }) => (
            <button key={l} onClick={() => setActive(l)}
              className={`flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-semibold transition-all ${active === l ? 'bg-blue-50 text-blue-700' : 'text-zinc-500 hover:bg-zinc-50'}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />{l} <span className="text-zinc-400">({n})</span>
            </button>
          ))}
        </div>
        <div className="flex-1 px-2 py-1.5 overflow-auto space-y-0.5">
          {recent.map(({ id, client, amount, status, statusColor }) => (
            <div key={id} className="flex items-center gap-2 rounded-lg px-2.5 py-2 hover:bg-zinc-50 transition">
              <div className="flex-1 min-w-0"><p className="text-xs font-semibold text-zinc-800">{id}</p><p className="text-[9px] text-zinc-500">{client}</p></div>
              <div className="text-right"><p className="text-xs font-bold text-zinc-800">{amount}</p><p className={`text-[9px] font-semibold ${statusColor}`}>{status}</p></div>
            </div>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function Ecom2SidebarSingleInvoicePreview() {
  return (
    <PreviewWrap bg="bg-slate-50">
      <div className="flex h-[300px] w-[240px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100">
          <div><p className="text-xs font-bold text-zinc-800">INV-2024-001</p><p className="text-[9px] text-zinc-400">Apr 1 – Apr 30, 2026</p></div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Paid</span>
        </div>
        <div className="flex-1 px-4 py-3 overflow-auto space-y-2">
          <div className="flex items-center justify-between py-1 border-b border-zinc-100"><p className="text-xs text-zinc-500">Client</p><p className="text-xs font-semibold text-zinc-800">Acme Corp</p></div>
          <div className="flex items-center justify-between py-1 border-b border-zinc-100"><p className="text-xs text-zinc-500">Issued</p><p className="text-xs font-semibold text-zinc-800">Apr 1, 2026</p></div>
          <div className="flex items-center justify-between py-1 border-b border-zinc-100"><p className="text-xs text-zinc-500">Due</p><p className="text-xs font-semibold text-zinc-800">Apr 30, 2026</p></div>
          <div className="rounded-xl bg-zinc-50 px-3 py-2.5 space-y-1">
            {[['Consulting (10h)', '$800'], ['Design work', '$400'], ['Tax (10%)', '$120']].map(([item, val]) => (
              <div key={item} className="flex items-center justify-between"><p className="text-[11px] text-zinc-600">{item}</p><p className="text-[11px] font-semibold text-zinc-800">{val}</p></div>
            ))}
          </div>
          <div className="flex items-center justify-between rounded-xl bg-blue-600 px-3 py-2.5">
            <p className="text-xs font-bold text-white">Total</p>
            <p className="text-sm font-bold text-white">$1,320</p>
          </div>
        </div>
      </div>
    </PreviewWrap>
  );
}

function Ecom2SidebarCreateInvoicePreview() {
  const [step, setStep] = useState(1);
  const steps = [
    { n: 1, label: 'Client Details' },
    { n: 2, label: 'Line Items' },
    { n: 3, label: 'Tax & Discount' },
    { n: 4, label: 'Payment Terms' },
    { n: 5, label: 'Preview & Send' },
  ];
  return (
    <PreviewWrap bg="bg-blue-50">
      <div className="flex h-[300px] w-[220px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-100">
          <p className="text-xs font-bold text-zinc-800">🧾 Create Invoice</p>
          <div className="mt-2 h-1.5 rounded-full bg-zinc-100"><div className="h-1.5 rounded-full bg-blue-600 transition-all" style={{ width: `${(step/5)*100}%` }} /></div>
          <p className="text-[9px] text-zinc-400 mt-1">Step {step} of 5</p>
        </div>
        <nav className="flex-1 px-3 py-2 overflow-auto space-y-1">
          {steps.map(s => (
            <button key={s.n} onClick={() => setStep(s.n)}
              className={`w-full flex items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-all ${step === s.n ? 'bg-blue-50' : 'hover:bg-zinc-50'}`}>
              <div className={`h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${s.n < step ? 'bg-blue-600 border-blue-600 text-white' : s.n === step ? 'border-blue-600 text-blue-600' : 'border-zinc-200 text-zinc-400'}`}>
                {s.n < step ? '✓' : s.n}
              </div>
              <span className={`text-xs font-semibold ${step === s.n ? 'text-blue-700' : s.n < step ? 'text-zinc-600' : 'text-zinc-400'}`}>{s.label}</span>
            </button>
          ))}
        </nav>
        <div className="px-3 py-3 border-t border-zinc-100 flex gap-2">
          <button onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1} className="flex-1 rounded-lg border border-zinc-200 py-1.5 text-xs font-semibold text-zinc-600 disabled:opacity-40">Back</button>
          <button onClick={() => setStep(s => Math.min(5, s + 1))} disabled={step === 5} className="flex-1 rounded-lg bg-blue-600 py-1.5 text-xs font-semibold text-white disabled:opacity-40">Next</button>
        </div>
      </div>
    </PreviewWrap>
  );
}

function Ecom2SidebarTransactionsPreview() {
  const [active, setActive] = useState('All');
  const filters = ['All', 'Income', 'Expense', 'Refund'];
  const txns = [
    { label: 'Order #4821', amount: '+$248', type: 'income', time: '2h ago' },
    { label: 'Stripe Fee', amount: '-$7.20', type: 'expense', time: '2h ago' },
    { label: 'Refund #4790', amount: '-$49', type: 'refund', time: '5h ago' },
    { label: 'Order #4820', amount: '+$129', type: 'income', time: '1d ago' },
  ];
  const colorMap: Record<string, string> = { income: 'text-emerald-600', expense: 'text-red-500', refund: 'text-amber-600' };
  return (
    <PreviewWrap bg="bg-teal-50">
      <div className="flex h-[300px] w-[230px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100">
          <p className="text-xs font-bold text-zinc-800">💸 Transactions</p>
          <span className="text-[10px] text-zinc-400">This month</span>
        </div>
        <div className="flex gap-1 px-2 py-2 border-b border-zinc-100">
          {filters.map(f => (
            <button key={f} onClick={() => setActive(f)}
              className={`flex-1 rounded-lg py-1 text-[10px] font-semibold transition-all ${active === f ? 'bg-teal-600 text-white' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}>{f}</button>
          ))}
        </div>
        <div className="flex-1 px-2 py-1.5 overflow-auto space-y-0.5">
          {txns.map(({ label, amount, type, time }) => (
            <div key={label} className="flex items-center gap-2 rounded-lg px-2.5 py-2 hover:bg-zinc-50 transition">
              <div className={`h-6 w-6 rounded-lg flex items-center justify-center text-xs shrink-0 ${type === 'income' ? 'bg-emerald-100' : type === 'expense' ? 'bg-red-100' : 'bg-amber-100'}`}>
                {type === 'income' ? '↑' : '↓'}
              </div>
              <div className="flex-1 min-w-0"><p className="text-xs font-medium text-zinc-800 truncate">{label}</p><p className="text-[9px] text-zinc-400">{time}</p></div>
              <span className={`text-xs font-bold ${colorMap[type]}`}>{amount}</span>
            </div>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function Ecom2SidebarSingleTxnPreview() {
  return (
    <PreviewWrap bg="bg-emerald-50">
      <div className="flex h-[300px] w-[230px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100">
          <p className="text-xs font-bold text-zinc-800">Transaction Detail</p>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Success</span>
        </div>
        <div className="flex-1 px-4 py-3 overflow-auto space-y-2">
          <div className="text-center py-3">
            <p className="text-2xl font-bold text-zinc-900">+$248.00</p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Apr 11, 2026 · 2:34 PM</p>
          </div>
          {[['Order ID', '#ORD-4821'], ['Customer', 'John Smith'], ['Payment', 'Visa •••• 4242'], ['Net Amount', '$240.80'], ['Fee', '$7.20 (2.9% + 30¢)'], ['Status', 'Settled']].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between py-1 border-b border-zinc-50">
              <p className="text-[10px] text-zinc-500">{k}</p>
              <p className="text-[10px] font-semibold text-zinc-800">{v}</p>
            </div>
          ))}
          <button className="w-full mt-2 rounded-xl border border-zinc-200 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 transition">Issue Refund</button>
        </div>
      </div>
    </PreviewWrap>
  );
}

function Ecom2SidebarOrdersPreview() {
  const [active, setActive] = useState('Pending');
  const statuses = [{ l: 'All Orders', n: 142, dot: 'bg-zinc-300' }, { l: 'Pending', n: 12, dot: 'bg-amber-400' }, { l: 'Processing', n: 8, dot: 'bg-blue-400' }, { l: 'Shipped', n: 58, dot: 'bg-indigo-400' }, { l: 'Delivered', n: 54, dot: 'bg-emerald-400' }, { l: 'Returned', n: 10, dot: 'bg-red-400' }];
  return (
    <PreviewWrap bg="bg-indigo-50">
      <div className="flex h-[300px] w-[220px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100">
          <p className="text-xs font-bold text-zinc-800">🛒 Orders</p>
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">12 pending</span>
        </div>
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
          {statuses.map(({ l, n, dot }) => (
            <button key={l} onClick={() => setActive(l)}
              className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs transition-all ${active === l ? 'bg-indigo-50 text-indigo-700' : 'text-zinc-600 hover:bg-zinc-50'}`}>
              <span className={`h-2 w-2 rounded-full ${dot}`} /><span className="flex-1 font-medium text-left">{l}</span>
              <span className="text-[10px] text-zinc-400">{n}</span>
            </button>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

function Ecom2SidebarCustomersPreview() {
  const [active, setActive] = useState('All');
  const segs = [{ l: 'All', n: 1248 }, { l: 'VIP', n: 84 }, { l: 'Repeat', n: 392 }, { l: 'At-risk', n: 47 }, { l: 'New', n: 128 }];
  const recent = [{ name: 'Alice Wang', spent: '$4,820', tag: 'VIP' }, { name: 'Bob Torres', spent: '$240', tag: 'New' }, { name: 'Carol Kim', spent: '$1,200', tag: 'Repeat' }];
  return (
    <PreviewWrap bg="bg-rose-50">
      <div className="flex h-[300px] w-[220px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="px-3 py-3 border-b border-zinc-100"><div className="flex items-center gap-1.5 rounded-lg bg-zinc-100 px-2.5 py-1.5 mb-2"><span className="text-xs text-zinc-400">🔍</span><span className="text-xs text-zinc-400">Search customers...</span></div>
          <div className="flex flex-wrap gap-1">
            {segs.map(({ l, n }) => (
              <button key={l} onClick={() => setActive(l)}
                className={`rounded-md px-2 py-0.5 text-[10px] font-semibold transition-all ${active === l ? 'bg-rose-600 text-white' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}>{l} ({n})</button>
            ))}
          </div>
        </div>
        <div className="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
          {recent.map(({ name, spent, tag }) => (
            <div key={name} className="flex items-center gap-2 rounded-lg px-2.5 py-2 hover:bg-zinc-50 transition">
              <div className="h-7 w-7 rounded-full bg-rose-100 flex items-center justify-center text-[10px] font-bold text-rose-600 shrink-0">{name[0]}</div>
              <div className="flex-1 min-w-0"><p className="text-xs font-semibold text-zinc-800 truncate">{name}</p><p className="text-[9px] text-zinc-500">{spent} lifetime</p></div>
              <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[9px] font-bold text-zinc-500">{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function Ecom2SidebarAnalyticsPreview() {
  const [period, setPeriod] = useState('7D');
  const stats = [{ label: 'Revenue', val: '$12.4K', ch: '+18%', up: true }, { label: 'Orders', val: '284', ch: '+9%', up: true }, { label: 'Avg Order', val: '$43.7', ch: '-2%', up: false }, { label: 'Conv Rate', val: '3.2%', ch: '+0.4%', up: true }];
  return (
    <PreviewWrap bg="bg-violet-50">
      <div className="flex h-[300px] w-[230px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-3 border-b border-zinc-100">
          <p className="text-xs font-bold text-zinc-800">📊 Store Analytics</p>
          <div className="flex gap-1">
            {['7D', '30D', '90D'].map(p => (
              <button key={p} onClick={() => setPeriod(p)} className={`rounded-md px-2 py-0.5 text-[10px] font-bold transition-all ${period === p ? 'bg-violet-600 text-white' : 'bg-zinc-100 text-zinc-500'}`}>{p}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 p-3">
          {stats.map(({ label, val, ch, up }) => (
            <div key={label} className="rounded-xl bg-zinc-50 p-2.5">
              <p className="text-[9px] text-zinc-500 font-medium">{label}</p>
              <p className="text-sm font-bold text-zinc-900 mt-0.5">{val}</p>
              <p className={`text-[9px] font-bold ${up ? 'text-emerald-600' : 'text-red-500'}`}>{ch}</p>
            </div>
          ))}
        </div>
        <div className="px-3 pb-3 flex-1 flex flex-col justify-end gap-1">
          {[['Top Product', 'Wireless Headphones'], ['Top Region', 'California']].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between rounded-lg bg-zinc-50 px-2.5 py-1.5">
              <p className="text-[10px] text-zinc-500">{k}</p><p className="text-[10px] font-semibold text-zinc-800">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Calendar Sidebars (9)
───────────────────────────────────────────── */
function CalSidebarMainPreview() {
  const [selDay, setSelDay] = useState(11);
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const nums = [null, null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  const events = [{ time: '9:00', title: 'Team standup', color: 'bg-blue-500' }, { time: '11:30', title: 'Design review', color: 'bg-violet-500' }, { time: '14:00', title: '1:1 with manager', color: 'bg-emerald-500' }];
  return (
    <PreviewWrap bg="bg-blue-50">
      <div className="flex h-[320px] w-[220px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-zinc-100">
          <span className="text-xs font-bold text-zinc-800">April 2026</span>
          <div className="flex gap-1"><button className="text-zinc-400 hover:text-zinc-700 px-1">‹</button><button className="text-zinc-400 hover:text-zinc-700 px-1">›</button></div>
        </div>
        <div className="px-2 py-2">
          <div className="grid grid-cols-7 mb-1">
            {days.map((d, i) => <span key={i} className="text-center text-[9px] font-bold text-zinc-400">{d}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-y-0.5">
            {nums.map((n, i) => n ? (
              <button key={i} onClick={() => setSelDay(n)}
                className={`h-6 w-6 mx-auto flex items-center justify-center rounded-full text-[10px] font-medium transition-all ${n === selDay ? 'bg-blue-600 text-white' : n === 11 ? 'ring-1 ring-blue-400 text-blue-600' : 'text-zinc-600 hover:bg-zinc-100'}`}>{n}</button>
            ) : <div key={i} />)}
          </div>
        </div>
        <div className="flex-1 px-2 pb-2 overflow-auto space-y-1 border-t border-zinc-100 pt-2">
          <p className="px-1 text-[9px] font-bold text-zinc-400 mb-1">TODAY</p>
          {events.map(({ time, title, color }) => (
            <div key={title} className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-zinc-50">
              <span className={`h-2 w-2 rounded-full ${color} shrink-0`} />
              <span className="text-[9px] font-bold text-zinc-400 w-7 shrink-0">{time}</span>
              <span className="text-[10px] font-medium text-zinc-700 truncate">{title}</span>
            </div>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function CalSidebarMiniCalPreview() {
  const [sel, setSel] = useState(11);
  const [month, setMonth] = useState(3);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const firstDay = new Date(2026, month, 1).getDay();
  const total = daysInMonth[month];
  const hasDot = new Set([4, 9, 11, 17, 22, 28]);
  return (
    <PreviewWrap bg="bg-indigo-50">
      <div className="flex h-[300px] w-[210px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-zinc-100">
          <button onClick={() => setMonth(m => Math.max(0, m - 1))} className="text-zinc-400 hover:text-zinc-700 px-1 text-sm">‹</button>
          <span className="text-xs font-bold text-zinc-800">{months[month]} 2026</span>
          <button onClick={() => setMonth(m => Math.min(11, m + 1))} className="text-zinc-400 hover:text-zinc-700 px-1 text-sm">›</button>
        </div>
        <div className="px-3 py-2">
          <div className="grid grid-cols-7 mb-1.5">{days.map((d, i) => <span key={i} className="text-center text-[9px] font-bold text-zinc-400">{d}</span>)}</div>
          <div className="grid grid-cols-7 gap-y-1">
            {Array(firstDay).fill(null).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: total }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setSel(n)}
                className={`relative flex h-6 w-6 mx-auto flex-col items-center justify-center rounded-full text-[10px] font-medium transition-all ${n === sel ? 'bg-indigo-600 text-white' : 'text-zinc-600 hover:bg-indigo-50'}`}>
                {n}
                {hasDot.has(n) && <span className={`absolute bottom-0.5 h-1 w-1 rounded-full ${n === sel ? 'bg-white' : 'bg-indigo-400'}`} />}
              </button>
            ))}
          </div>
        </div>
        <div className="px-3 py-2 border-t border-zinc-100 flex-1 overflow-auto">
          <p className="text-[9px] font-bold text-zinc-400 mb-1">Selected: Apr {sel}, 2026</p>
          <div className="space-y-1">
            {[{ t: 'Sprint review', c: 'bg-indigo-500' }, { t: 'Client call', c: 'bg-rose-400' }].map(({ t, c }) => (
              <div key={t} className="flex items-center gap-1.5"><span className={`h-1.5 w-1.5 rounded-full ${c}`} /><span className="text-[10px] text-zinc-600">{t}</span></div>
            ))}
          </div>
        </div>
      </div>
    </PreviewWrap>
  );
}

function CalSidebarEventsPreview() {
  const [active, setActive] = useState(0);
  const upcoming = [
    { day: 'Today', time: '9:00 AM', title: 'Team standup', loc: 'Zoom', color: 'bg-blue-500', people: 8 },
    { day: 'Today', time: '2:00 PM', title: 'Design review', loc: 'Conf Room A', color: 'bg-violet-500', people: 4 },
    { day: 'Tomorrow', time: '10:30 AM', title: 'Board meeting', loc: 'HQ Floor 3', color: 'bg-rose-500', people: 12 },
    { day: 'Apr 14', time: '1:00 PM', title: 'Product demo', loc: 'Google Meet', color: 'bg-emerald-500', people: 6 },
  ];
  return (
    <PreviewWrap bg="bg-sky-50">
      <div className="flex h-[300px] w-[240px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100">
          <p className="text-xs font-bold text-zinc-800">📅 Upcoming Events</p>
          <button className="rounded-lg bg-blue-600 px-2 py-1 text-[10px] font-bold text-white">+ Add</button>
        </div>
        <div className="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
          {upcoming.map(({ day, time, title, loc, color, people }, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`w-full flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-all ${active === i ? 'bg-blue-50' : 'hover:bg-zinc-50'}`}>
              <span className={`h-8 w-1 rounded-full shrink-0 ${color}`} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-zinc-800 truncate">{title}</p>
                <p className="text-[9px] text-zinc-500">{day} · {time} · {loc}</p>
              </div>
              <span className="text-[9px] text-zinc-400 shrink-0">{people}👥</span>
            </button>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function CalSidebarCategoriesPreview() {
  const [enabled, setEnabled] = useState(new Set(['Work', 'Personal', 'Birthdays']));
  const cals = [
    { label: 'Work', color: 'bg-blue-500', count: 14 },
    { label: 'Personal', color: 'bg-emerald-500', count: 7 },
    { label: 'Family', color: 'bg-rose-500', count: 3 },
    { label: 'Birthdays', color: 'bg-amber-400', count: 5 },
    { label: 'Holidays', color: 'bg-violet-500', count: 8 },
    { label: 'Sport', color: 'bg-teal-500', count: 6 },
  ];
  const toggle = (l: string) => setEnabled(s => { const n = new Set(s); n.has(l) ? n.delete(l) : n.add(l); return n; });
  return (
    <PreviewWrap bg="bg-violet-50">
      <div className="flex h-[300px] w-[210px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-100"><p className="text-xs font-bold text-zinc-800">🗂️ Calendars</p></div>
        <div className="flex-1 px-3 py-2 space-y-0.5 overflow-auto">
          <p className="text-[9px] font-bold text-zinc-400 mb-1 tracking-widest">MY CALENDARS</p>
          {cals.map(({ label, color, count }) => (
            <div key={label} className="flex items-center gap-2.5 rounded-lg px-1 py-1.5 hover:bg-zinc-50 transition cursor-pointer" onClick={() => toggle(label)}>
              <span className={`h-3.5 w-3.5 rounded-sm shrink-0 ${enabled.has(label) ? color : 'bg-zinc-200'} transition-colors`} />
              <span className={`flex-1 text-xs font-medium ${enabled.has(label) ? 'text-zinc-700' : 'text-zinc-400'}`}>{label}</span>
              <span className="text-[9px] text-zinc-400">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function CalSidebarSchedulePreview() {
  const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  const events = [
    { start: 9, span: 1, title: 'Standup', color: 'bg-blue-500' },
    { start: 11, span: 1.5, title: 'Design Review', color: 'bg-violet-500' },
    { start: 14, span: 1, title: '1:1 Manager', color: 'bg-emerald-500' },
  ];
  const fmt = (h: number) => `${h > 12 ? h - 12 : h}${h >= 12 ? 'pm' : 'am'}`;
  return (
    <PreviewWrap bg="bg-cyan-50">
      <div className="flex h-[300px] w-[220px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100">
          <p className="text-xs font-bold text-zinc-800">🗓️ Today — Apr 11</p>
          <span className="rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">3 events</span>
        </div>
        <div className="flex-1 overflow-auto px-2 py-2">
          <div className="relative">
            {hours.map(h => (
              <div key={h} className="flex items-start gap-2 mb-2">
                <span className="text-[9px] text-zinc-400 w-8 shrink-0 pt-0.5">{fmt(h)}</span>
                <div className="flex-1 border-t border-zinc-100 min-h-[20px] relative">
                  {events.filter(e => e.start === h).map(({ title, color, span }) => (
                    <div key={title} className={`rounded-md px-2 py-1 text-[10px] font-semibold text-white ${color}`} style={{ height: `${span * 24}px` }}>{title}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewWrap>
  );
}

function CalSidebarInvitesPreview() {
  const [resp, setResp] = useState<Record<string, string>>({});
  const invites = [
    { title: 'Q2 Planning', who: 'Sarah M.', time: 'Apr 14, 10am', color: 'bg-violet-500' },
    { title: 'Product Launch', who: 'Team Lead', time: 'Apr 18, 2pm', color: 'bg-rose-500' },
    { title: 'Team Lunch', who: 'HR Team', time: 'Apr 22, 12pm', color: 'bg-amber-400' },
  ];
  return (
    <PreviewWrap bg="bg-rose-50">
      <div className="flex h-[300px] w-[250px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100">
          <p className="text-xs font-bold text-zinc-800">📨 Invites</p>
          <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-700">{invites.length} pending</span>
        </div>
        <div className="flex-1 px-2 py-2 space-y-1 overflow-auto">
          {invites.map(({ title, who, time, color }) => (
            <div key={title} className="rounded-xl border border-zinc-100 p-2.5">
              <div className="flex items-start gap-2 mb-2">
                <span className={`h-2 w-2 rounded-full mt-1 shrink-0 ${color}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-zinc-800">{title}</p>
                  <p className="text-[9px] text-zinc-500">{who} · {time}</p>
                </div>
              </div>
              <div className="flex gap-1.5">
                {resp[title] ? (
                  <span className={`rounded-md px-2 py-1 text-[10px] font-bold ${resp[title] === 'yes' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>{resp[title] === 'yes' ? '✓ Accepted' : '✗ Declined'}</span>
                ) : (
                  <>
                    <button onClick={() => setResp(p => ({ ...p, [title]: 'yes' }))} className="flex-1 rounded-md bg-emerald-500 py-1 text-[10px] font-bold text-white">Accept</button>
                    <button onClick={() => setResp(p => ({ ...p, [title]: 'no' }))} className="flex-1 rounded-md border border-zinc-200 py-1 text-[10px] font-bold text-zinc-600">Decline</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function CalSidebarRemindersPreview() {
  const [done, setDone] = useState(new Set<number>());
  const reminders = [
    { time: 'In 15 min', title: 'Team standup', priority: 'high' },
    { time: 'In 2h', title: 'Submit weekly report', priority: 'medium' },
    { time: 'Today 5pm', title: 'Review PRs', priority: 'low' },
    { time: 'Tomorrow', title: 'Monthly 1:1s', priority: 'medium' },
    { time: 'Apr 15', title: 'Quarterly goals review', priority: 'high' },
  ];
  const p = { high: 'text-red-500', medium: 'text-amber-500', low: 'text-zinc-400' };
  return (
    <PreviewWrap bg="bg-amber-50">
      <div className="flex h-[300px] w-[240px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100">
          <p className="text-xs font-bold text-zinc-800">🔔 Reminders</p>
          <button className="rounded-lg bg-amber-500 px-2 py-1 text-[10px] font-bold text-white">+ Add</button>
        </div>
        <div className="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
          {reminders.map(({ time, title, priority }, i) => (
            <div key={i} className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 transition-all ${done.has(i) ? 'opacity-40' : 'hover:bg-zinc-50'}`}>
              <button onClick={() => setDone(s => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; })}
                className={`h-4 w-4 shrink-0 rounded-full border-2 flex items-center justify-center transition-all ${done.has(i) ? 'bg-emerald-500 border-emerald-500' : 'border-zinc-300'}`}>
                {done.has(i) && <span className="text-white text-[8px]">✓</span>}
              </button>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-medium text-zinc-700 ${done.has(i) ? 'line-through' : ''} truncate`}>{title}</p>
                <p className={`text-[9px] font-semibold ${p[priority as keyof typeof p]}`}>{time} · {priority}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function CalSidebarSearchPreview() {
  const [query, setQuery] = useState('');
  const [view, setView] = useState('Month');
  const views = ['Day', 'Week', 'Month', 'Year'];
  const results = [
    { title: 'Team standup', date: 'Daily 9am', color: 'bg-blue-500' },
    { title: 'Board meeting', date: 'Apr 18, 10am', color: 'bg-rose-500' },
    { title: 'Product review', date: 'Apr 25, 2pm', color: 'bg-violet-500' },
  ];
  return (
    <PreviewWrap bg="bg-emerald-50">
      <div className="flex h-[300px] w-[230px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="px-3 py-3 border-b border-zinc-100 space-y-2">
          <div className="flex items-center gap-1.5 rounded-xl border border-zinc-200 px-2.5 py-2">
            <span className="text-zinc-400 text-xs">🔍</span>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search events..." className="flex-1 text-xs text-zinc-700 bg-transparent focus:outline-none placeholder:text-zinc-400" />
          </div>
          <div className="flex gap-1">
            {views.map(v => (
              <button key={v} onClick={() => setView(v)}
                className={`flex-1 rounded-lg py-1 text-[10px] font-bold transition-all ${view === v ? 'bg-emerald-600 text-white' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}>{v}</button>
            ))}
          </div>
        </div>
        <div className="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
          <p className="px-1 text-[9px] font-bold text-zinc-400 mb-1">UPCOMING</p>
          {results.map(({ title, date, color }) => (
            <div key={title} className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 hover:bg-zinc-50 transition">
              <span className={`h-2 w-2 rounded-full ${color} shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-zinc-800 truncate">{title}</p>
                <p className="text-[9px] text-zinc-500">{date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}


/* ─────────────────────────────────────────────
   Charts (18)
───────────────────────────────────────────── */
function LineChartPreview() {
  const data = [40, 65, 50, 80, 72, 90, 85, 110, 95, 120, 108, 130];
  const max = Math.max(...data), min = Math.min(...data);
  const w = 280, h = 120, pad = 10;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = pad + ((max - v) / (max - min)) * (h - pad * 2);
    return `${x},${y}`;
  }).join(' ');
  const areaPoints = `${pad},${h - pad} ${pts} ${w - pad},${h - pad}`;
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-zinc-100 shadow-sm p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Revenue</p>
            <p className="text-2xl font-bold text-zinc-900">$12,430</p>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">+8.2%</span>
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
          <defs>
            <linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={areaPoints} fill="url(#lg1)" />
          <polyline points={pts} fill="none" stroke="#6366f1" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          {data.map((v, i) => {
            const x = pad + (i / (data.length - 1)) * (w - pad * 2);
            const y = pad + ((max - v) / (max - min)) * (h - pad * 2);
            return i === data.length - 1 ? <circle key={i} cx={x} cy={y} r={3} fill="#6366f1" stroke="white" strokeWidth={1.5} /> : null;
          })}
        </svg>
        <div className="flex justify-between mt-1 text-[10px] text-zinc-400">
          {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => <span key={m}>{m}</span>)}
        </div>
      </div>
    </PreviewWrap>
  );
}

function BarChartV2Preview() {
  const data = [65, 82, 55, 93, 71, 88, 60, 95];
  const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun','Mon'];
  const max = Math.max(...data);
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-zinc-100 shadow-sm p-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Monthly Sales</p>
            <p className="text-2xl font-bold text-zinc-900">8,246</p>
          </div>
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">+12%</span>
        </div>
        <div className="flex items-end gap-2 h-28">
          {data.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-lg bg-blue-500 transition-all hover:bg-blue-600"
                style={{ height: `${(v / max) * 100}%` }}
              />
              <span className="text-[9px] text-zinc-400">{labels[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function HorizontalBarPreview() {
  const categories = [
    { label: 'Electronics', value: 82, color: 'bg-indigo-500' },
    { label: 'Clothing', value: 65, color: 'bg-blue-400' },
    { label: 'Home & Garden', value: 48, color: 'bg-cyan-400' },
    { label: 'Sports', value: 38, color: 'bg-teal-400' },
    { label: 'Books', value: 27, color: 'bg-emerald-400' },
  ];
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-zinc-100 shadow-sm p-4">
        <p className="text-sm font-bold text-zinc-800 mb-4">Category Breakdown</p>
        <div className="space-y-3">
          {categories.map(({ label, value, color }) => (
            <div key={label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-zinc-700">{label}</span>
                <span className="text-zinc-500">{value}%</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-zinc-100">
                <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function AreaChartPreview() {
  const d1 = [20,45,30,65,50,80,70,90,75,100];
  const d2 = [10,25,20,40,35,55,45,65,55,75];
  const w = 280, h = 110, pad = 8;
  const toPath = (d: number[]) => d.map((v, i) => {
    const x = pad + (i / (d.length-1)) * (w - pad*2);
    const y = pad + ((100 - v) / 100) * (h - pad*2);
    return `${x},${y}`;
  }).join(' ');
  const pts1 = toPath(d1), pts2 = toPath(d2);
  const area1 = `${pad},${h-pad} ${pts1} ${w-pad},${h-pad}`;
  const area2 = `${pad},${h-pad} ${pts2} ${w-pad},${h-pad}`;
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-zinc-100 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-zinc-800">Traffic Overview</p>
          <div className="flex gap-3 text-[10px]">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-violet-500 inline-block"/><span className="text-zinc-500">Users</span></span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400 inline-block"/><span className="text-zinc-500">Sessions</span></span>
          </div>
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
          <defs>
            <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="ag2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <polygon points={area1} fill="url(#ag1)"/>
          <polygon points={area2} fill="url(#ag2)"/>
          <polyline points={pts1} fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinejoin="round"/>
          <polyline points={pts2} fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      </div>
    </PreviewWrap>
  );
}

function MultiLineChartPreview() {
  const s1 = [30,42,38,55,48,62,58,74,68,82];
  const s2 = [20,28,25,35,30,42,38,50,45,58];
  const w = 280, h = 110, pad = 8;
  const toP = (d: number[]) => d.map((v,i) => `${pad+(i/(d.length-1))*(w-pad*2)},${pad+((85-v)/85)*(h-pad*2)}`).join(' ');
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-zinc-100 shadow-sm p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-bold text-zinc-800">Performance</p>
          <div className="flex gap-3 text-[10px]">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500 inline-block"/>Product A</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-400 inline-block"/>Product B</span>
          </div>
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
          <polyline points={toP(s1)} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
          <polyline points={toP(s2)} fill="none" stroke="#fb7185" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" strokeDasharray="4 2"/>
        </svg>
      </div>
    </PreviewWrap>
  );
}

function PieChartPreview() {
  const segments = [
    { label: 'Direct', value: 35, color: '#6366f1' },
    { label: 'Organic', value: 28, color: '#22d3ee' },
    { label: 'Referral', value: 22, color: '#f59e0b' },
    { label: 'Social', value: 15, color: '#fb7185' },
  ];
  let cumulative = 0;
  const cx = 60, cy = 60, r = 50;
  const slices = segments.map(seg => {
    const startAngle = cumulative * 3.6 - 90;
    cumulative += seg.value;
    const endAngle = cumulative * 3.6 - 90;
    const s = (a: number) => [cx + r * Math.cos(a * Math.PI/180), cy + r * Math.sin(a * Math.PI/180)];
    const [sx, sy] = s(startAngle), [ex, ey] = s(endAngle);
    const large = seg.value > 50 ? 1 : 0;
    return { ...seg, d: `M ${cx} ${cy} L ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey} Z` };
  });
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-zinc-100 shadow-sm p-4">
        <p className="text-sm font-bold text-zinc-800 mb-3">Traffic Sources</p>
        <div className="flex items-center gap-6">
          <svg viewBox="0 0 120 120" className="w-28 shrink-0">
            {slices.map(s => <path key={s.label} d={s.d} fill={s.color}/>)}
            <circle cx={cx} cy={cy} r={22} fill="white"/>
            <text x={cx} y={cy+4} textAnchor="middle" fontSize={10} fontWeight="bold" fill="#18181b">100%</text>
          </svg>
          <div className="space-y-1.5">
            {segments.map(s => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{background:s.color}}/>
                <span className="text-xs text-zinc-600">{s.label}</span>
                <span className="ml-auto text-xs font-bold text-zinc-800">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewWrap>
  );
}

function DonutChartV2Preview() {
  const data = [
    { label: 'Used', value: 68, color: '#6366f1' },
    { label: 'Available', value: 22, color: '#22d3ee' },
    { label: 'Reserved', value: 10, color: '#f59e0b' },
  ];
  const r = 40, circ = 2 * Math.PI * r;
  let offset = 0;
  const arcs = data.map(d => {
    const dash = (d.value / 100) * circ;
    const gap = circ - dash;
    const arc = { ...d, dash, gap, offset };
    offset += dash;
    return arc;
  });
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-zinc-100 shadow-sm p-4">
        <p className="text-sm font-bold text-zinc-800 mb-3">Storage Usage</p>
        <div className="flex items-center gap-6">
          <svg viewBox="0 0 100 100" className="w-28 shrink-0">
            <circle cx="50" cy="50" r={r} fill="none" stroke="#f4f4f5" strokeWidth="14"/>
            {arcs.map((a, i) => (
              <circle key={i} cx="50" cy="50" r={r} fill="none" stroke={a.color} strokeWidth="14"
                strokeDasharray={`${a.dash} ${a.gap}`} strokeDashoffset={-a.offset} transform="rotate(-90 50 50)"/>
            ))}
            <text x="50" y="46" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#18181b">68%</text>
            <text x="50" y="57" textAnchor="middle" fontSize="7" fill="#71717a">Used</text>
          </svg>
          <div className="space-y-2">
            {data.map(d => (
              <div key={d.label} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{background:d.color}}/>
                <span className="text-xs text-zinc-600">{d.label}</span>
                <span className="ml-2 text-xs font-bold text-zinc-800">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewWrap>
  );
}

function StackedBarPreview() {
  const months = ['Jan','Feb','Mar','Apr','May','Jun'];
  const data = [
    [30,25,20,35,28,32],
    [20,30,25,22,35,28],
    [15,18,22,20,18,25],
  ];
  const colors = ['bg-indigo-500','bg-blue-400','bg-cyan-300'];
  const totals = months.map((_,i) => data.reduce((s,d) => s + d[i], 0));
  const maxT = Math.max(...totals);
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-zinc-100 shadow-sm p-4">
        <p className="text-sm font-bold text-zinc-800 mb-4">Quarterly Revenue</p>
        <div className="flex items-end gap-2 h-28">
          {months.map((m, i) => (
            <div key={m} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex flex-col-reverse rounded-t overflow-hidden" style={{height:`${(totals[i]/maxT)*100}%`}}>
                {data.map((d, di) => (
                  <div key={di} className={colors[di]} style={{height:`${(d[i]/totals[i])*100}%`}}/>
                ))}
              </div>
              <span className="text-[9px] text-zinc-400">{m}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-3">
          {['Product A','Product B','Product C'].map((l,i) => (
            <span key={l} className="flex items-center gap-1 text-[10px] text-zinc-500">
              <span className={`w-2 h-2 rounded-sm ${colors[i]}`}/>{l}
            </span>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function SparklinesPreview() {
  const rows = [
    { label: 'Revenue', value: '$24.5K', change: '+12%', color: '#6366f1', data: [40,55,45,65,55,75,70,85] },
    { label: 'Users', value: '8,320', change: '+5%', color: '#22d3ee', data: [60,45,55,50,65,60,70,68] },
    { label: 'Churn', value: '2.4%', change: '-0.8%', color: '#fb7185', data: [35,40,38,45,35,32,30,28] },
  ];
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-zinc-100 shadow-sm p-4 space-y-3">
        <p className="text-sm font-bold text-zinc-800">Key Metrics</p>
        {rows.map(row => {
          const w=80,h=30,pad=2,max=Math.max(...row.data),min=Math.min(...row.data);
          const pts = row.data.map((v,i)=>`${pad+(i/(row.data.length-1))*(w-pad*2)},${pad+((max-v)/(max-min))*(h-pad*2)}`).join(' ');
          return (
            <div key={row.label} className="flex items-center gap-3">
              <div className="w-24">
                <p className="text-xs font-semibold text-zinc-700">{row.label}</p>
                <p className="text-base font-bold text-zinc-900">{row.value}</p>
              </div>
              <svg viewBox={`0 0 ${w} ${h}`} className="flex-1 h-8">
                <polyline points={pts} fill="none" stroke={row.color} strokeWidth="2" strokeLinejoin="round"/>
              </svg>
              <span className={`text-xs font-bold ${row.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-500'}`}>{row.change}</span>
            </div>
          );
        })}
      </div>
    </PreviewWrap>
  );
}

function CandlestickPreview() {
  const candles = [
    {o:60,h:75,l:55,c:70},{o:70,h:80,l:65,c:65},{o:65,h:72,l:58,c:68},
    {o:68,h:82,l:62,c:80},{o:80,h:88,l:74,c:76},{o:76,h:84,l:70,c:82},
    {o:82,h:90,l:78,c:85},{o:85,h:95,l:80,c:90},
  ];
  const w=280,h=120,pad=10;
  const allH=candles.map(c=>c.h),allL=candles.map(c=>c.l);
  const max=Math.max(...allH),min=Math.min(...allL);
  const scale=(v:number)=>pad+((max-v)/(max-min))*(h-pad*2);
  const barW=22,gap=10;
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-zinc-100 shadow-sm p-4">
        <div className="flex justify-between items-start mb-2">
          <p className="text-sm font-bold text-zinc-800">BTC/USD</p>
          <span className="text-xs font-bold text-emerald-600">$90,420 ↑</span>
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
          {candles.map((c,i)=>{
            const x=pad+i*(barW+gap)+barW/2;
            const bull=c.c>=c.o;
            const top=Math.min(c.o,c.c),bot=Math.max(c.o,c.c);
            return (
              <g key={i}>
                <line x1={x} y1={scale(c.h)} x2={x} y2={scale(c.l)} stroke={bull?'#22c55e':'#ef4444'} strokeWidth={1.5}/>
                <rect x={x-barW/2} y={scale(top)} width={barW} height={Math.max(1,scale(bot)-scale(top))} fill={bull?'#22c55e':'#ef4444'} rx={2}/>
              </g>
            );
          })}
        </svg>
      </div>
    </PreviewWrap>
  );
}

function StockAreaPreview() {
  const prices=[100,108,104,115,110,122,118,130,125,135];
  const vols=[45,60,35,75,50,80,55,90,65,70];
  const w=280,h=100,vH=30,pad=8;
  const maxP=Math.max(...prices),minP=Math.min(...prices),maxV=Math.max(...vols);
  const pPts=prices.map((v,i)=>`${pad+(i/(prices.length-1))*(w-pad*2)},${pad+((maxP-v)/(maxP-minP))*(h-pad*2)}`).join(' ');
  const areaP=`${pad},${h-pad} ${pPts} ${w-pad},${h-pad}`;
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-zinc-100 shadow-sm p-4">
        <div className="flex justify-between items-start mb-1">
          <div>
            <p className="text-xs text-zinc-500">AAPL</p>
            <p className="text-xl font-bold text-zinc-900">$185.40</p>
          </div>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">+2.1%</span>
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
          <defs>
            <linearGradient id="sg1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <polygon points={areaP} fill="url(#sg1)"/>
          <polyline points={pPts} fill="none" stroke="#6366f1" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
        <div className="flex items-end gap-1 mt-1" style={{height:`${vH}px`}}>
          {vols.map((v,i)=>(
            <div key={i} className="flex-1 bg-zinc-200 rounded-t" style={{height:`${(v/maxV)*100}%`}}/>
          ))}
        </div>
        <p className="text-[9px] text-zinc-400 mt-1">Volume</p>
      </div>
    </PreviewWrap>
  );
}

function CurrencyRatesPreview() {
  const pairs=[
    {from:'EUR',to:'USD',rate:'1.0842',change:'+0.12%',up:true},
    {from:'GBP',to:'USD',rate:'1.2631',change:'+0.08%',up:true},
    {from:'USD',to:'JPY',rate:'151.24',change:'-0.35%',up:false},
    {from:'USD',to:'CAD',rate:'1.3621',change:'-0.05%',up:false},
    {from:'AUD',to:'USD',rate:'0.6548',change:'+0.22%',up:true},
  ];
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-zinc-100 shadow-sm p-4">
        <p className="text-sm font-bold text-zinc-800 mb-3">FX Rates</p>
        <div className="divide-y divide-zinc-100">
          {pairs.map(p=>(
            <div key={`${p.from}${p.to}`} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold bg-zinc-100 rounded px-1.5 py-0.5 text-zinc-600">{p.from}</span>
                <span className="text-zinc-300 text-xs">→</span>
                <span className="text-[10px] font-bold bg-zinc-100 rounded px-1.5 py-0.5 text-zinc-600">{p.to}</span>
              </div>
              <span className="text-sm font-bold text-zinc-900">{p.rate}</span>
              <span className={`text-xs font-semibold ${p.up?'text-emerald-600':'text-rose-500'}`}>{p.change}</span>
            </div>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function GaugeChartPreview() {
  const value=72;
  const r=50,cx=70,cy=70;
  const startAngle=-210,endAngle=30;
  const totalAngle=endAngle-startAngle;
  const valueAngle=startAngle+(value/100)*totalAngle;
  const toXY=(angle:number,rad:number)=>[
    cx+rad*Math.cos(angle*Math.PI/180),
    cy+rad*Math.sin(angle*Math.PI/180)
  ];
  const [sx,sy]=toXY(startAngle,r),[ex,ey]=toXY(endAngle,r);
  const [vx,vy]=toXY(valueAngle,r);
  const [nx,ny]=toXY(valueAngle,38);
  const arcPath=`M ${sx} ${sy} A ${r} ${r} 0 1 1 ${ex} ${ey}`;
  const fillPath=`M ${sx} ${sy} A ${r} ${r} 0 ${value>50?1:0} 1 ${vx} ${vy}`;
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-xs bg-white rounded-2xl border border-zinc-100 shadow-sm p-4 mx-auto">
        <p className="text-sm font-bold text-zinc-800 mb-2 text-center">CPU Usage</p>
        <svg viewBox="0 0 140 100" className="w-full max-w-[200px] mx-auto block">
          <path d={arcPath} fill="none" stroke="#f4f4f5" strokeWidth="12" strokeLinecap="round"/>
          <path d={fillPath} fill="none" stroke="#6366f1" strokeWidth="12" strokeLinecap="round"/>
          <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#18181b" strokeWidth={2} strokeLinecap="round"/>
          <circle cx={cx} cy={cy} r={4} fill="#18181b"/>
          <text x={cx} y={cy+18} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#18181b">{value}%</text>
        </svg>
        <div className="flex justify-between text-[10px] text-zinc-400 mt-1 px-4">
          <span>0%</span><span>50%</span><span>100%</span>
        </div>
      </div>
    </PreviewWrap>
  );
}

function HeatmapV2Preview() {
  const cols=12,rows=7;
  const days=['S','M','T','W','T','F','S'];
  const intensity=(i:number,j:number)=>{
    const seed=(i*cols+j)*2654435761;
    return (seed>>>28)%5;
  };
  const colors=['bg-zinc-100','bg-emerald-200','bg-emerald-300','bg-emerald-500','bg-emerald-700'];
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-zinc-100 shadow-sm p-4">
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm font-bold text-zinc-800">Activity Heatmap</p>
          <span className="text-xs text-zinc-500">248 contributions</span>
        </div>
        <div className="flex gap-1">
          <div className="flex flex-col gap-1 mr-1">
            {days.map(d=><span key={d} className="text-[9px] text-zinc-400 h-3 flex items-center">{d}</span>)}
          </div>
          {Array.from({length:cols}).map((_,j)=>(
            <div key={j} className="flex flex-col gap-1">
              {Array.from({length:rows}).map((_,i)=>(
                <div key={i} className={`w-3 h-3 rounded-[2px] ${colors[intensity(i,j)]}`}/>
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1 mt-2 justify-end">
          <span className="text-[9px] text-zinc-400">Less</span>
          {colors.map((c,i)=><div key={i} className={`w-3 h-3 rounded-[2px] ${c}`}/>)}
          <span className="text-[9px] text-zinc-400">More</span>
        </div>
      </div>
    </PreviewWrap>
  );
}

function FunnelChartPreview() {
  const stages=[
    {label:'Visitors',value:10000,pct:100,color:'bg-indigo-500'},
    {label:'Leads',value:4200,pct:42,color:'bg-blue-500'},
    {label:'Qualified',value:1800,pct:18,color:'bg-cyan-500'},
    {label:'Closed',value:620,pct:6.2,color:'bg-emerald-500'},
  ];
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-zinc-100 shadow-sm p-4">
        <p className="text-sm font-bold text-zinc-800 mb-4">Sales Funnel</p>
        <div className="space-y-1.5">
          {stages.map((s,i)=>(
            <div key={s.label} className="flex items-center gap-3">
              <span className="text-xs text-zinc-500 w-20 text-right">{s.label}</span>
              <div className="flex-1 flex justify-center">
                <div className={`${s.color} rounded h-7 flex items-center justify-center`} style={{width:`${s.pct}%`}}>
                  <span className="text-[10px] font-bold text-white">{s.value.toLocaleString()}</span>
                </div>
              </div>
              <span className="text-[10px] text-zinc-400 w-10">{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function RadialBarPreview() {
  const metrics=[
    {label:'CPU',value:72,color:'#6366f1',r:42},
    {label:'RAM',value:55,color:'#22d3ee',r:32},
    {label:'Disk',value:38,color:'#f59e0b',r:22},
    {label:'Net',value:81,color:'#fb7185',r:12},
  ];
  const cx=55,cy=55;
  const circ=(r:number)=>2*Math.PI*r;
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-zinc-100 shadow-sm p-4">
        <p className="text-sm font-bold text-zinc-800 mb-3">System Metrics</p>
        <div className="flex items-center gap-6">
          <svg viewBox="0 0 110 110" className="w-32 shrink-0">
            {metrics.map(m=>{
              const c=circ(m.r);
              const dash=(m.value/100)*c;
              return (
                <g key={m.label}>
                  <circle cx={cx} cy={cy} r={m.r} fill="none" stroke="#f4f4f5" strokeWidth={7}/>
                  <circle cx={cx} cy={cy} r={m.r} fill="none" stroke={m.color} strokeWidth={7}
                    strokeDasharray={`${dash} ${c-dash}`} strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`}/>
                </g>
              );
            })}
          </svg>
          <div className="space-y-2">
            {metrics.map(m=>(
              <div key={m.label} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{background:m.color}}/>
                <span className="text-xs text-zinc-600 w-8">{m.label}</span>
                <span className="text-xs font-bold text-zinc-800">{m.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewWrap>
  );
}

function BubbleChartPreview() {
  const bubbles=[
    {x:30,y:60,r:18,color:'#6366f1',label:'A'},
    {x:55,y:35,r:24,color:'#22d3ee',label:'B'},
    {x:75,y:65,r:14,color:'#f59e0b',label:'C'},
    {x:45,y:75,r:10,color:'#fb7185',label:'D'},
    {x:65,y:20,r:8,color:'#10b981',label:'E'},
    {x:20,y:30,r:16,color:'#8b5cf6',label:'F'},
  ];
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-zinc-100 shadow-sm p-4">
        <p className="text-sm font-bold text-zinc-800 mb-2">Market Share</p>
        <svg viewBox="0 0 100 100" className="w-full h-40 border border-zinc-100 rounded-xl">
          {bubbles.map(b=>(
            <g key={b.label}>
              <circle cx={b.x} cy={b.y} r={b.r} fill={b.color} fillOpacity={0.8}/>
              <text x={b.x} y={b.y+4} textAnchor="middle" fontSize={7} fill="white" fontWeight="bold">{b.label}</text>
            </g>
          ))}
        </svg>
      </div>
    </PreviewWrap>
  );
}

function HistogramPreview() {
  const bars=[2,5,11,18,27,32,24,18,11,6,3,1];
  const max=Math.max(...bars);
  const w=280,h=100,pad=10;
  const barW=(w-pad*2)/bars.length;
  const pts=bars.map((v,i)=>{
    const x=pad+i*barW+barW/2;
    const y=pad+((max-v)/max)*(h-pad*2);
    return `${x},${y}`;
  }).join(' ');
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-zinc-100 shadow-sm p-4">
        <p className="text-sm font-bold text-zinc-800 mb-3">Distribution</p>
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
          {bars.map((v,i)=>{
            const x=pad+i*barW;
            const barH=((v/max)*(h-pad*2));
            const y=h-pad-barH;
            return <rect key={i} x={x+1} y={y} width={barW-2} height={barH} fill="#6366f1" fillOpacity={0.7} rx={2}/>;
          })}
          <polyline points={pts} fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Tables (9)
───────────────────────────────────────────── */
function BasicTableV2Preview() {
  const rows=[
    {name:'Alice Johnson',email:'alice@acme.com',role:'Admin',status:'Active'},
    {name:'Bob Smith',email:'bob@acme.com',role:'Editor',status:'Active'},
    {name:'Carol White',email:'carol@acme.com',role:'Viewer',status:'Inactive'},
  ];
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-xl bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-100">
            <tr>{['Name','Email','Role','Status'].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-bold text-zinc-500 uppercase tracking-wide">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {rows.map(r=>(
              <tr key={r.email} className="hover:bg-zinc-50 transition">
                <td className="px-4 py-3 font-medium text-zinc-800">{r.name}</td>
                <td className="px-4 py-3 text-zinc-500">{r.email}</td>
                <td className="px-4 py-3 text-zinc-600">{r.role}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${r.status==='Active'?'bg-emerald-100 text-emerald-700':'bg-zinc-100 text-zinc-500'}`}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PreviewWrap>
  );
}

function StripedTablePreview() {
  const rows=[
    {name:'Alex Turner',dept:'Engineering',salary:'$120k'},
    {name:'Jamie Lee',dept:'Design',salary:'$95k'},
    {name:'Morgan Yu',dept:'Marketing',salary:'$88k'},
    {name:'Riley Chen',dept:'Sales',salary:'$105k'},
    {name:'Sam Davis',dept:'Operations',salary:'$92k'},
  ];
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-xl bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-indigo-600 text-white">
            <tr>{['Name','Department','Salary'].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={r.name} className={i%2===0?'bg-white':'bg-indigo-50/40'}>
                <td className="px-4 py-2.5 font-medium text-zinc-800">{r.name}</td>
                <td className="px-4 py-2.5 text-zinc-500">{r.dept}</td>
                <td className="px-4 py-2.5 text-zinc-700 font-semibold">{r.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PreviewWrap>
  );
}

function BorderedTablePreview() {
  const rows=[
    {q:'Q1',rev:'$42,000',costs:'$28,000',profit:'$14,000'},
    {q:'Q2',rev:'$55,000',costs:'$32,000',profit:'$23,000'},
    {q:'Q3',rev:'$48,000',costs:'$30,000',profit:'$18,000'},
  ];
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-xl bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>{['Quarter','Revenue','Costs','Profit'].map(h=><th key={h} className="border border-zinc-200 px-4 py-2 text-left text-xs font-bold text-zinc-600 bg-zinc-50">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map(r=>(
              <tr key={r.q}>
                <td className="border border-zinc-200 px-4 py-2.5 font-semibold text-zinc-700">{r.q}</td>
                <td className="border border-zinc-200 px-4 py-2.5 text-zinc-600">{r.rev}</td>
                <td className="border border-zinc-200 px-4 py-2.5 text-zinc-600">{r.costs}</td>
                <td className="border border-zinc-200 px-4 py-2.5 text-emerald-700 font-semibold">{r.profit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PreviewWrap>
  );
}

function CompactTablePreview() {
  const rows=[
    {id:'#1042',item:'MacBook Pro',cat:'Electronics',qty:2,total:'$5,198'},
    {id:'#1043',item:'AirPods Pro',cat:'Audio',qty:5,total:'$1,245'},
    {id:'#1044',item:'iPad Air',cat:'Tablet',qty:1,total:'$749'},
    {id:'#1045',item:'Magic Mouse',cat:'Peripherals',qty:3,total:'$237'},
    {id:'#1046',item:'USB-C Hub',cat:'Accessories',qty:8,total:'$320'},
    {id:'#1047',item:'iPhone 15',cat:'Mobile',qty:2,total:'$1,998'},
  ];
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-xl bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-zinc-50 border-b border-zinc-100">
            <tr>{['Order','Item','Category','Qty','Total'].map(h=><th key={h} className="px-3 py-2 text-left font-bold text-zinc-500 uppercase tracking-wide">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {rows.map(r=>(
              <tr key={r.id} className="hover:bg-zinc-50">
                <td className="px-3 py-1.5 font-mono text-indigo-600">{r.id}</td>
                <td className="px-3 py-1.5 font-medium text-zinc-800">{r.item}</td>
                <td className="px-3 py-1.5 text-zinc-500">{r.cat}</td>
                <td className="px-3 py-1.5 text-zinc-600">{r.qty}</td>
                <td className="px-3 py-1.5 font-semibold text-zinc-800">{r.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PreviewWrap>
  );
}

function DataTablePaginatedPreview() {
  const [page, setPage] = useState(1);
  const [sortCol, setSortCol] = useState('name');
  const [sortAsc, setSortAsc] = useState(true);
  const allRows=[
    {name:'Alice A',role:'Admin',date:'2024-01-15'},
    {name:'Bob B',role:'Editor',date:'2024-02-20'},
    {name:'Carol C',role:'Viewer',date:'2024-03-10'},
    {name:'Dave D',role:'Admin',date:'2024-04-05'},
    {name:'Eve E',role:'Editor',date:'2024-05-12'},
    {name:'Frank F',role:'Viewer',date:'2024-06-18'},
  ];
  const perPage=3;
  const sorted=[...allRows].sort((a,b)=>{
    const av=a[sortCol as keyof typeof a],bv=b[sortCol as keyof typeof b];
    return sortAsc?av.localeCompare(bv):bv.localeCompare(av);
  });
  const rows=sorted.slice((page-1)*perPage,page*perPage);
  const pages=Math.ceil(allRows.length/perPage);
  const toggleSort=(col:string)=>{if(sortCol===col)setSortAsc(v=>!v);else{setSortCol(col);setSortAsc(true);}};
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-xl bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-100">
            <tr>
              {[{k:'name',l:'Name'},{k:'role',l:'Role'},{k:'date',l:'Date'}].map(({k,l})=>(
                <th key={k} className="px-4 py-3 text-left text-xs font-bold text-zinc-500 uppercase tracking-wide cursor-pointer hover:text-zinc-800" onClick={()=>toggleSort(k)}>
                  {l} {sortCol===k?(sortAsc?'↑':'↓'):''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {rows.map(r=>(
              <tr key={r.name} className="hover:bg-zinc-50">
                <td className="px-4 py-3 font-medium text-zinc-800">{r.name}</td>
                <td className="px-4 py-3 text-zinc-500">{r.role}</td>
                <td className="px-4 py-3 text-zinc-500">{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-100 bg-zinc-50">
          <span className="text-xs text-zinc-500">Page {page} of {pages}</span>
          <div className="flex gap-1">
            <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} className="px-2.5 py-1 text-xs rounded border border-zinc-200 hover:bg-zinc-100 disabled:opacity-40">Prev</button>
            <button onClick={()=>setPage(p=>Math.min(pages,p+1))} disabled={page===pages} className="px-2.5 py-1 text-xs rounded border border-zinc-200 hover:bg-zinc-100 disabled:opacity-40">Next</button>
          </div>
        </div>
      </div>
    </PreviewWrap>
  );
}

function ActionTablePreview() {
  const [rows, setRows] = useState([
    {id:1,name:'Project Alpha',owner:'Alice',status:'Active'},
    {id:2,name:'Project Beta',owner:'Bob',status:'Paused'},
    {id:3,name:'Project Gamma',owner:'Carol',status:'Active'},
  ]);
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-xl bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-100">
            <tr>{['Name','Owner','Status','Actions'].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-bold text-zinc-500 uppercase tracking-wide">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {rows.map(r=>(
              <tr key={r.id} className="hover:bg-zinc-50">
                <td className="px-4 py-3 font-medium text-zinc-800">{r.name}</td>
                <td className="px-4 py-3 text-zinc-500">{r.owner}</td>
                <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${r.status==='Active'?'bg-emerald-100 text-emerald-700':'bg-amber-100 text-amber-700'}`}>{r.status}</span></td>
                <td className="px-4 py-3">
                  <div className="flex gap-1.5">
                    <button className="rounded px-2 py-1 text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100">Edit</button>
                    <button onClick={()=>setRows(rs=>rs.filter(x=>x.id!==r.id))} className="rounded px-2 py-1 text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PreviewWrap>
  );
}

function StatusTablePreview() {
  const rows=[
    {name:'Sarah K',avatar:'SK',status:'Online',task:'UI Review',progress:85},
    {name:'Mark L',avatar:'ML',status:'Away',task:'Backend API',progress:42},
    {name:'Nina P',avatar:'NP',status:'Busy',task:'Data Pipeline',progress:67},
    {name:'Tom R',avatar:'TR',status:'Offline',task:'Testing',progress:20},
  ];
  const statusColor:Record<string,string>={Online:'bg-emerald-500',Away:'bg-amber-400',Busy:'bg-rose-500',Offline:'bg-zinc-300'};
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-xl bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-100">
            <tr>{['Member','Status','Task','Progress'].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-bold text-zinc-500 uppercase tracking-wide">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {rows.map(r=>(
              <tr key={r.name} className="hover:bg-zinc-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">{r.avatar}</div>
                    <span className="font-medium text-zinc-800">{r.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1.5 text-xs"><span className={`w-2 h-2 rounded-full ${statusColor[r.status]}`}/>{r.status}</span>
                </td>
                <td className="px-4 py-3 text-zinc-500 text-xs">{r.task}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-zinc-100 rounded-full"><div className="h-full bg-indigo-500 rounded-full" style={{width:`${r.progress}%`}}/></div>
                    <span className="text-xs text-zinc-500">{r.progress}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PreviewWrap>
  );
}

function CheckboxTablePreview() {
  const allRows=[
    {id:1,name:'Homepage Redesign',due:'Apr 20',priority:'High'},
    {id:2,name:'API Integration',due:'Apr 25',priority:'Medium'},
    {id:3,name:'Mobile App',due:'May 1',priority:'High'},
    {id:4,name:'Analytics Dashboard',due:'May 10',priority:'Low'},
  ];
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const toggle=(id:number)=>setSelected(s=>{const n=new Set(s);n.has(id)?n.delete(id):n.add(id);return n;});
  const allSel=selected.size===allRows.length;
  const toggleAll=()=>setSelected(allSel?new Set():new Set(allRows.map(r=>r.id)));
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-xl bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        {selected.size>0&&<div className="px-4 py-2 bg-indigo-50 border-b border-indigo-100 text-xs font-semibold text-indigo-700">{selected.size} selected</div>}
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-100">
            <tr>
              <th className="px-4 py-3 w-10"><input type="checkbox" checked={allSel} onChange={toggleAll} className="rounded"/></th>
              {['Task','Due','Priority'].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-bold text-zinc-500 uppercase tracking-wide">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {allRows.map(r=>(
              <tr key={r.id} className={`hover:bg-zinc-50 ${selected.has(r.id)?'bg-indigo-50/40':''}`}>
                <td className="px-4 py-3"><input type="checkbox" checked={selected.has(r.id)} onChange={()=>toggle(r.id)} className="rounded"/></td>
                <td className="px-4 py-3 font-medium text-zinc-800">{r.name}</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">{r.due}</td>
                <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${r.priority==='High'?'bg-rose-100 text-rose-700':r.priority==='Medium'?'bg-amber-100 text-amber-700':'bg-zinc-100 text-zinc-500'}`}>{r.priority}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PreviewWrap>
  );
}

function ExpandableTablePreview() {
  const rows=[
    {id:1,name:'Order #1042',amount:'$1,250',items:['MacBook Pro x1','USB-C Hub x2']},
    {id:2,name:'Order #1043',amount:'$380',items:['AirPods Pro x1','Case x1']},
    {id:3,name:'Order #1044',amount:'$2,100',items:['iPad Air x2','Apple Pencil x1']},
  ];
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const toggle=(id:number)=>setExpanded(s=>{const n=new Set(s);n.has(id)?n.delete(id):n.add(id);return n;});
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-xl bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-100">
            <tr>
              <th className="px-4 py-3 w-8"/>
              {['Order','Amount'].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-bold text-zinc-500 uppercase tracking-wide">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map(r=>(
              <>
                <tr key={r.id} className="hover:bg-zinc-50 border-b border-zinc-100 cursor-pointer" onClick={()=>toggle(r.id)}>
                  <td className="px-4 py-3 text-zinc-400">{expanded.has(r.id)?<ChevronDown size={14}/>:<ChevronRight size={14}/>}</td>
                  <td className="px-4 py-3 font-medium text-zinc-800">{r.name}</td>
                  <td className="px-4 py-3 text-zinc-700 font-semibold">{r.amount}</td>
                </tr>
                {expanded.has(r.id)&&(
                  <tr key={`${r.id}-exp`} className="bg-zinc-50 border-b border-zinc-100">
                    <td/>
                    <td colSpan={2} className="px-4 py-3">
                      <ul className="space-y-1">
                        {r.items.map(item=><li key={item} className="text-xs text-zinc-500 flex items-center gap-1"><Check size={10} className="text-emerald-500"/>{item}</li>)}
                      </ul>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </PreviewWrap>
  );
}


/* ─────────────────────────────────────────────
   Alerts (3)
───────────────────────────────────────────── */
function AlertSuccessPreview() {
  const [visible, setVisible] = useState(true);
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-md space-y-3">
        {visible?(
          <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <CheckCircle size={16} className="text-emerald-600 mt-0.5 shrink-0"/>
            <div className="flex-1">
              <p className="text-sm font-semibold text-emerald-800">Successfully saved!</p>
              <p className="text-xs text-emerald-700 mt-0.5">Your changes have been saved and are now live.</p>
            </div>
            <button onClick={()=>setVisible(false)} className="text-emerald-400 hover:text-emerald-600"><X size={14}/></button>
          </div>
        ):(
          <button onClick={()=>setVisible(true)} className="text-xs text-zinc-500 underline">Show alert</button>
        )}
      </div>
    </PreviewWrap>
  );
}

function AlertVariantsPreview() {
  const alerts=[
    {type:'success',icon:<CheckCircle size={15}/>,title:'Success',msg:'Operation completed.',cls:'border-emerald-200 bg-emerald-50 text-emerald-800'},
    {type:'warning',icon:<AlertCircle size={15}/>,title:'Warning',msg:'Review before proceeding.',cls:'border-amber-200 bg-amber-50 text-amber-800'},
    {type:'error',icon:<XCircle size={15}/>,title:'Error',msg:'Something went wrong.',cls:'border-red-200 bg-red-50 text-red-800'},
    {type:'info',icon:<Info size={15}/>,title:'Info',msg:'Here is some information.',cls:'border-blue-200 bg-blue-50 text-blue-800'},
  ];
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-md space-y-2">
        {alerts.map(a=>(
          <div key={a.type} className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${a.cls}`}>
            <span className="mt-0.5 shrink-0">{a.icon}</span>
            <div>
              <p className="text-sm font-semibold">{a.title}</p>
              <p className="text-xs mt-0.5 opacity-80">{a.msg}</p>
            </div>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function AlertBannerPreview() {
  const [show, setShow] = useState(true);
  return (
    <PreviewWrap bg="bg-zinc-100">
      <div className="w-full max-w-xl space-y-3">
        {show&&(
          <div className="flex items-center gap-3 rounded-xl bg-indigo-600 px-4 py-3 text-white">
            <Bell size={15} className="shrink-0"/>
            <p className="flex-1 text-sm font-medium">New version available! Update to get the latest features.</p>
            <button className="shrink-0 rounded-lg bg-white/20 px-3 py-1 text-xs font-bold hover:bg-white/30">Update</button>
            <button onClick={()=>setShow(false)} className="text-white/60 hover:text-white"><X size={14}/></button>
          </div>
        )}
        {!show&&<button onClick={()=>setShow(true)} className="text-xs text-zinc-500 underline">Show banner</button>}
        <div className="rounded-xl bg-white p-4 text-xs text-zinc-500">Page content below banner</div>
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Avatars (3)
───────────────────────────────────────────── */
function AvatarBasicPreview() {
  const sizes=[
    {cls:'w-6 h-6 text-[9px]',label:'XS'},
    {cls:'w-8 h-8 text-[10px]',label:'SM'},
    {cls:'w-10 h-10 text-xs',label:'MD'},
    {cls:'w-14 h-14 text-base',label:'LG'},
  ];
  return (
    <PreviewWrap bg="bg-white">
      <div className="flex items-end gap-5 flex-wrap">
        {sizes.map(s=>(
          <div key={s.label} className="flex flex-col items-center gap-1.5">
            <div className={`${s.cls} rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600`}>AJ</div>
            <span className="text-[10px] text-zinc-400">{s.label}</span>
          </div>
        ))}
        <div className="w-px h-10 bg-zinc-200 mx-2"/>
        {sizes.map(s=>(
          <div key={`img-${s.label}`} className="flex flex-col items-center gap-1.5">
            <div className={`${s.cls} rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center`}>
              <User size={parseInt(s.cls.match(/w-(\d+)/)?.[1]??'8')*2} className="text-white opacity-80"/>
            </div>
            <span className="text-[10px] text-zinc-400">{s.label}</span>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function AvatarGroupV2Preview() {
  const colors=['bg-indigo-400','bg-blue-400','bg-cyan-400','bg-teal-400','bg-emerald-400'];
  const initials=['AJ','BK','CM','DP','EL'];
  return (
    <PreviewWrap bg="bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="flex -space-x-3">
          {colors.map((c,i)=>(
            <div key={i} className={`w-10 h-10 rounded-full ${c} border-2 border-white flex items-center justify-center text-xs font-bold text-white`}>{initials[i]}</div>
          ))}
          <div className="w-10 h-10 rounded-full bg-zinc-100 border-2 border-white flex items-center justify-center text-xs font-bold text-zinc-600">+8</div>
        </div>
        <p className="text-xs text-zinc-500">13 team members</p>
      </div>
    </PreviewWrap>
  );
}

function AvatarStatusPreview() {
  const members=[
    {init:'AJ',color:'bg-indigo-400',status:'Online',dot:'bg-emerald-500'},
    {init:'BK',color:'bg-blue-400',status:'Away',dot:'bg-amber-400'},
    {init:'CM',color:'bg-cyan-500',status:'Busy',dot:'bg-red-500'},
    {init:'DP',color:'bg-teal-400',status:'Offline',dot:'bg-zinc-300'},
  ];
  return (
    <PreviewWrap bg="bg-white">
      <div className="flex gap-6 flex-wrap">
        {members.map(m=>(
          <div key={m.init} className="flex flex-col items-center gap-1.5">
            <div className="relative">
              <div className={`w-11 h-11 rounded-full ${m.color} flex items-center justify-center text-sm font-bold text-white`}>{m.init}</div>
              <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${m.dot} border-2 border-white`}/>
            </div>
            <span className="text-[10px] text-zinc-500">{m.status}</span>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Badge (3)
───────────────────────────────────────────── */
function BadgeBasicPreview() {
  const badges=[
    {label:'New',cls:'bg-blue-100 text-blue-700'},
    {label:'Active',cls:'bg-emerald-100 text-emerald-700'},
    {label:'Pending',cls:'bg-amber-100 text-amber-700'},
    {label:'Danger',cls:'bg-red-100 text-red-700'},
    {label:'Paused',cls:'bg-zinc-100 text-zinc-600'},
    {label:'Pro',cls:'bg-violet-100 text-violet-700'},
  ];
  return (
    <PreviewWrap bg="bg-white">
      <div className="flex flex-wrap gap-2">
        {badges.map(b=>(
          <span key={b.label} className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${b.cls}`}>{b.label}</span>
        ))}
      </div>
    </PreviewWrap>
  );
}

function BadgeDotPreview() {
  const items=[
    {icon:<Bell size={18}/>,count:5,color:'bg-red-500'},
    {icon:<Mail size={18}/>,count:12,color:'bg-indigo-500'},
    {icon:<Settings size={18}/>,count:1,color:'bg-amber-500'},
    {icon:<User size={18}/>,count:3,color:'bg-emerald-500'},
  ];
  return (
    <PreviewWrap bg="bg-white">
      <div className="flex gap-6">
        {items.map((item,i)=>(
          <div key={i} className="relative">
            <button className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-zinc-200">
              {item.icon}
            </button>
            <span className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] ${item.color} text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1`}>{item.count}</span>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function BadgeOutlinedPreview() {
  const badges=[
    {label:'Draft',cls:'border-zinc-300 text-zinc-600'},
    {label:'Review',cls:'border-amber-400 text-amber-700'},
    {label:'Approved',cls:'border-emerald-400 text-emerald-700'},
    {label:'Rejected',cls:'border-red-400 text-red-700'},
    {label:'Premium',cls:'border-violet-400 text-violet-700'},
    {label:'Beta',cls:'border-blue-400 text-blue-700'},
  ];
  return (
    <PreviewWrap bg="bg-white">
      <div className="flex flex-wrap gap-2">
        {badges.map(b=>(
          <span key={b.label} className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold bg-transparent ${b.cls}`}>{b.label}</span>
        ))}
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Breadcrumb (3)
───────────────────────────────────────────── */
function BreadcrumbBasicPreview() {
  const crumbs=['Home','Products','Electronics','MacBook Pro'];
  return (
    <PreviewWrap bg="bg-white">
      <div className="space-y-4 w-full max-w-md">
        <nav className="flex items-center gap-1 text-sm">
          {crumbs.map((c,i)=>(
            <span key={c} className="flex items-center gap-1">
              {i>0&&<ChevronRight size={14} className="text-zinc-300"/>}
              <span className={i===crumbs.length-1?'font-semibold text-zinc-800':'text-zinc-400 hover:text-zinc-600 cursor-pointer'}>{c}</span>
            </span>
          ))}
        </nav>
        <nav className="flex items-center gap-1 text-sm">
          {['Dashboard','Analytics','Reports'].map((c,i)=>(
            <span key={c} className="flex items-center gap-1">
              {i>0&&<span className="text-zinc-300">/</span>}
              <span className={i===2?'font-semibold text-indigo-600':'text-zinc-400 hover:text-zinc-600 cursor-pointer'}>{c}</span>
            </span>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

function BreadcrumbIconPreview() {
  const crumbs=[{label:'Home',icon:'🏠'},{label:'Documents',icon:'📁'},{label:'Projects',icon:'📂'},{label:'Report.pdf',icon:'📄'}];
  return (
    <PreviewWrap bg="bg-white">
      <nav className="flex items-center gap-1 text-sm">
        {crumbs.map((c,i)=>(
          <span key={c.label} className="flex items-center gap-1">
            {i>0&&<ChevronRight size={13} className="text-zinc-300"/>}
            <span className={`flex items-center gap-1 ${i===crumbs.length-1?'font-semibold text-zinc-800':'text-zinc-400 hover:text-zinc-600 cursor-pointer'}`}>
              <span>{c.icon}</span>
              <span>{c.label}</span>
            </span>
          </span>
        ))}
      </nav>
    </PreviewWrap>
  );
}

function BreadcrumbPillsPreview() {
  const crumbs=['Home','Settings','Account','Security'];
  return (
    <PreviewWrap bg="bg-white">
      <nav className="flex items-center gap-1.5 flex-wrap">
        {crumbs.map((c,i)=>(
          <span key={c} className="flex items-center gap-1.5">
            {i>0&&<ChevronRight size={12} className="text-zinc-300"/>}
            <span className={`rounded-full px-3 py-1 text-xs font-semibold cursor-pointer ${i===crumbs.length-1?'bg-indigo-600 text-white':'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}>{c}</span>
          </span>
        ))}
      </nav>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Button Variants (3)
───────────────────────────────────────────── */
function ButtonsGhostPreview() {
  return (
    <PreviewWrap bg="bg-white">
      <div className="flex flex-wrap gap-2">
        {[
          {label:'Default',cls:'border-zinc-300 text-zinc-700 hover:bg-zinc-50'},
          {label:'Primary',cls:'border-indigo-400 text-indigo-700 hover:bg-indigo-50'},
          {label:'Success',cls:'border-emerald-400 text-emerald-700 hover:bg-emerald-50'},
          {label:'Warning',cls:'border-amber-400 text-amber-700 hover:bg-amber-50'},
          {label:'Danger',cls:'border-red-400 text-red-700 hover:bg-red-50'},
        ].map(b=>(
          <button key={b.label} className={`rounded-lg border px-4 py-2 text-sm font-semibold bg-transparent transition ${b.cls}`}>{b.label}</button>
        ))}
      </div>
    </PreviewWrap>
  );
}

function ButtonsIconPreview() {
  return (
    <PreviewWrap bg="bg-white">
      <div className="space-y-3">
        <div className="flex gap-2">
          {[Bell,Settings,User,Mail,Search].map((Icon,i)=>(
            <button key={i} className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-indigo-100 hover:text-indigo-600 transition">
              <Icon size={17}/>
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            {Icon:Bell,label:'Notify',cls:'bg-indigo-600 text-white hover:bg-indigo-700'},
            {Icon:Settings,label:'Settings',cls:'bg-zinc-800 text-white hover:bg-zinc-900'},
            {Icon:Mail,label:'Message',cls:'bg-emerald-600 text-white hover:bg-emerald-700'},
          ].map(({Icon,label,cls})=>(
            <button key={label} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${cls}`}>
              <Icon size={15}/>{label}
            </button>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function ButtonsGradientPreview() {
  return (
    <PreviewWrap bg="bg-white">
      <div className="flex flex-wrap gap-3">
        <button className="rounded-lg px-5 py-2.5 text-sm font-bold text-white shadow-md hover:opacity-90 transition" style={{background:'linear-gradient(135deg,#6366f1,#8b5cf6)'}}>Violet Gradient</button>
        <button className="rounded-lg px-5 py-2.5 text-sm font-bold text-white shadow-md hover:opacity-90 transition" style={{background:'linear-gradient(135deg,#06b6d4,#3b82f6)'}}>Ocean Gradient</button>
        <button className="rounded-lg px-5 py-2.5 text-sm font-bold text-white shadow-md hover:opacity-90 transition" style={{background:'linear-gradient(135deg,#10b981,#06b6d4)'}}>Emerald Gradient</button>
        <button className="rounded-lg px-5 py-2.5 text-sm font-bold text-white shadow-md hover:opacity-90 transition" style={{background:'linear-gradient(135deg,#f59e0b,#ef4444)'}}>Sunset Gradient</button>
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Button Groups (3)
───────────────────────────────────────────── */
function BtnGroupBasicPreview() {
  return (
    <PreviewWrap bg="bg-white">
      <div className="space-y-3">
        <div className="inline-flex rounded-lg border border-zinc-200 overflow-hidden">
          {['Left','Center','Right'].map((l,i)=>(
            <button key={l} className={`px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 transition ${i>0?'border-l border-zinc-200':''}`}>{l}</button>
          ))}
        </div>
        <div className="inline-flex rounded-lg border border-indigo-200 overflow-hidden">
          {['Day','Week','Month','Year'].map((l,i)=>(
            <button key={l} className={`px-3 py-1.5 text-xs font-bold text-indigo-700 hover:bg-indigo-50 transition ${i>0?'border-l border-indigo-200':''}`}>{l}</button>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

function BtnGroupRadioPreview() {
  const [active, setActive] = useState('Grid');
  const opts=['List','Grid','Cards','Table'];
  return (
    <PreviewWrap bg="bg-white">
      <div className="inline-flex p-1 rounded-xl bg-zinc-100 gap-0.5">
        {opts.map(o=>(
          <button key={o} onClick={()=>setActive(o)}
            className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${active===o?'bg-white shadow text-zinc-900':'text-zinc-500 hover:text-zinc-700'}`}>
            {o}
          </button>
        ))}
      </div>
    </PreviewWrap>
  );
}

function BtnGroupIconPreview() {
  const [active, setActive] = useState<string[]>([]);
  const tools=[
    {id:'bold',icon:'B',style:'font-bold'},
    {id:'italic',icon:'I',style:'italic'},
    {id:'underline',icon:'U',style:'underline'},
  ];
  const toggle=(id:string)=>setActive(a=>a.includes(id)?a.filter(x=>x!==id):[...a,id]);
  return (
    <PreviewWrap bg="bg-white">
      <div className="space-y-3">
        <div className="inline-flex rounded-lg border border-zinc-200 overflow-hidden">
          {tools.map((t,i)=>(
            <button key={t.id} onClick={()=>toggle(t.id)}
              className={`px-4 py-2 text-sm transition ${active.includes(t.id)?'bg-zinc-800 text-white':'text-zinc-700 hover:bg-zinc-100'} ${i>0?'border-l border-zinc-200':''} ${t.style}`}>
              {t.icon}
            </button>
          ))}
        </div>
        <div className="inline-flex rounded-lg border border-zinc-200 overflow-hidden">
          {[Bell,Settings,User,Search].map((Icon,i)=>(
            <button key={i} className={`w-9 h-9 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 transition ${i>0?'border-l border-zinc-200':''}`}>
              <Icon size={15}/>
            </button>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Cards (3)
───────────────────────────────────────────── */
function CardProfilePreview() {
  const [following, setFollowing] = useState(false);
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-56 bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="h-16 bg-gradient-to-r from-indigo-500 to-violet-500"/>
        <div className="px-4 pb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 border-4 border-white -mt-7 flex items-center justify-center text-white font-bold text-lg">AJ</div>
          <p className="mt-2 font-bold text-zinc-900">Alice Johnson</p>
          <p className="text-xs text-zinc-500 mt-0.5">Senior Designer at Acme Inc.</p>
          <div className="flex gap-4 mt-3 text-center">
            <div><p className="text-sm font-bold text-zinc-800">142</p><p className="text-[10px] text-zinc-400">Posts</p></div>
            <div><p className="text-sm font-bold text-zinc-800">8.2K</p><p className="text-[10px] text-zinc-400">Followers</p></div>
            <div><p className="text-sm font-bold text-zinc-800">312</p><p className="text-[10px] text-zinc-400">Following</p></div>
          </div>
          <button onClick={()=>setFollowing(f=>!f)}
            className={`mt-3 w-full rounded-lg py-2 text-xs font-bold transition ${following?'bg-zinc-100 text-zinc-700':'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
            {following?'Following':'Follow'}
          </button>
        </div>
      </div>
    </PreviewWrap>
  );
}

function CardStatPreview() {
  const stats=[
    {label:'Total Revenue',value:'$84,200',change:'+12.5%',up:true,icon:'💰'},
    {label:'Active Users',value:'24,816',change:'+8.1%',up:true,icon:'👥'},
    {label:'Churn Rate',value:'2.4%',change:'-0.6%',up:false,icon:'📉'},
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="flex gap-3 flex-wrap">
        {stats.map(s=>(
          <div key={s.label} className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-4 min-w-[140px]">
            <p className="text-lg mb-1">{s.icon}</p>
            <p className="text-xl font-bold text-zinc-900">{s.value}</p>
            <p className="text-xs text-zinc-500 mt-0.5">{s.label}</p>
            <span className={`text-xs font-semibold ${s.up?'text-emerald-600':'text-rose-500'}`}>{s.change}</span>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function CardPricingPreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="w-56 bg-white rounded-2xl border-2 border-indigo-500 shadow-lg p-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide">Pro Plan</p>
            <p className="text-3xl font-bold text-zinc-900 mt-1">$49<span className="text-base font-normal text-zinc-400">/mo</span></p>
          </div>
          <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700">Popular</span>
        </div>
        <div className="mt-4 space-y-2">
          {['Unlimited projects','Priority support','Advanced analytics','Custom domains','Team collaboration'].map(f=>(
            <div key={f} className="flex items-center gap-2">
              <Check size={13} className="text-emerald-500 shrink-0"/>
              <span className="text-xs text-zinc-600">{f}</span>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full rounded-xl py-2.5 text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition">Get Started</button>
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Carousel (3)
───────────────────────────────────────────── */
function CarouselBasicPreview() {
  const slides=[
    {bg:'bg-indigo-500',label:'Slide 1',sub:'Welcome to our platform'},
    {bg:'bg-cyan-500',label:'Slide 2',sub:'Explore our features'},
    {bg:'bg-violet-500',label:'Slide 3',sub:'Get started today'},
  ];
  const [idx, setIdx] = useState(0);
  const prev=()=>setIdx(i=>(i-1+slides.length)%slides.length);
  const next=()=>setIdx(i=>(i+1)%slides.length);
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-sm relative overflow-hidden rounded-2xl">
        <div className={`${slides[idx].bg} h-36 flex flex-col items-center justify-center text-white transition-all`}>
          <p className="text-xl font-bold">{slides[idx].label}</p>
          <p className="text-sm opacity-80 mt-1">{slides[idx].sub}</p>
        </div>
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow hover:bg-white"><ChevronRight size={16} className="rotate-180"/></button>
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow hover:bg-white"><ChevronRight size={16}/></button>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {slides.map((_,i)=><span key={i} className={`w-2 h-2 rounded-full transition-all ${i===idx?'bg-white':'bg-white/40'}`}/>)}
        </div>
      </div>
    </PreviewWrap>
  );
}

function CarouselCardPreview() {
  const [center, setCenter] = useState(1);
  const cards=[
    {name:'Sarah K',role:'Designer',quote:'Amazing product! Saved us hours.'},
    {name:'Mark L',role:'Developer',quote:'Best tool in our workflow.'},
    {name:'Nina P',role:'Manager',quote:'Highly recommend to every team.'},
  ];
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="flex gap-3 items-center">
        <button onClick={()=>setCenter(c=>(c-1+cards.length)%cards.length)} className="w-7 h-7 rounded-full bg-white border border-zinc-200 flex items-center justify-center shadow hover:bg-zinc-100"><ChevronRight size={14} className="rotate-180"/></button>
        <div className="flex gap-2 overflow-hidden">
          {cards.map((c,i)=>(
            <div key={c.name} className={`flex-shrink-0 w-48 bg-white rounded-2xl border p-4 shadow-sm transition-all ${i===center?'border-indigo-300 shadow-indigo-100 scale-105':'border-zinc-100 opacity-70 scale-95'}`}>
              <p className="text-xs text-zinc-600 italic">"{c.quote}"</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">{c.name[0]}</div>
                <div>
                  <p className="text-xs font-bold text-zinc-800">{c.name}</p>
                  <p className="text-[10px] text-zinc-400">{c.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={()=>setCenter(c=>(c+1)%cards.length)} className="w-7 h-7 rounded-full bg-white border border-zinc-200 flex items-center justify-center shadow hover:bg-zinc-100"><ChevronRight size={14}/></button>
      </div>
    </PreviewWrap>
  );
}

function CarouselImagePreview() {
  const [idx, setIdx] = useState(0);
  const images=[
    {color:'bg-gradient-to-br from-indigo-400 to-violet-500',label:'Mountain View'},
    {color:'bg-gradient-to-br from-cyan-400 to-blue-500',label:'Ocean Sunset'},
    {color:'bg-gradient-to-br from-amber-400 to-orange-500',label:'City Lights'},
    {color:'bg-gradient-to-br from-emerald-400 to-teal-500',label:'Forest Path'},
  ];
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-sm">
        <div className={`${images[idx].color} h-32 rounded-2xl flex items-end p-3 mb-3`}>
          <span className="text-white font-bold text-sm bg-black/30 rounded-lg px-2 py-1">{images[idx].label}</span>
        </div>
        <div className="flex gap-2">
          {images.map((img,i)=>(
            <button key={i} onClick={()=>setIdx(i)}
              className={`flex-1 h-12 rounded-lg ${img.color} transition-all ${i===idx?'ring-2 ring-offset-1 ring-indigo-500':'opacity-60 hover:opacity-80'}`}/>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Dropdowns (3)
───────────────────────────────────────────── */
function DropdownBasicPreview() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('Select option');
  const items=['Profile','Settings','Billing','Help Center','Sign Out'];
  return (
    <PreviewWrap bg="bg-white">
      <div className="relative w-48">
        <button onClick={()=>setOpen(o=>!o)}
          className="w-full flex items-center justify-between rounded-xl border border-zinc-200 px-4 py-2.5 text-sm text-zinc-700 bg-white hover:border-zinc-300 shadow-sm">
          <span>{selected}</span>
          <ChevronDown size={15} className={`text-zinc-400 transition-transform ${open?'rotate-180':''}`}/>
        </button>
        {open&&(
          <div className="absolute top-full mt-1.5 w-full rounded-xl border border-zinc-100 bg-white shadow-lg z-10 overflow-hidden">
            {items.map(item=>(
              <button key={item} onClick={()=>{setSelected(item);setOpen(false);}}
                className={`w-full px-4 py-2.5 text-left text-sm hover:bg-zinc-50 transition ${item==='Sign Out'?'text-red-600 border-t border-zinc-100':'text-zinc-700'}`}>
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </PreviewWrap>
  );
}

function DropdownSearchPreview() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('');
  const options=['React','Vue','Angular','Svelte','Next.js','Nuxt','Remix','Astro'];
  const filtered=options.filter(o=>o.toLowerCase().includes(query.toLowerCase()));
  return (
    <PreviewWrap bg="bg-white">
      <div className="relative w-52">
        <button onClick={()=>setOpen(o=>!o)}
          className="w-full flex items-center justify-between rounded-xl border border-zinc-200 px-4 py-2.5 text-sm text-zinc-700 bg-white hover:border-zinc-300 shadow-sm">
          <span className={selected?'text-zinc-800':'text-zinc-400'}>{selected||'Choose framework'}</span>
          <ChevronDown size={15} className={`text-zinc-400 transition-transform ${open?'rotate-180':''}`}/>
        </button>
        {open&&(
          <div className="absolute top-full mt-1.5 w-full rounded-xl border border-zinc-100 bg-white shadow-lg z-10 overflow-hidden">
            <div className="p-2 border-b border-zinc-100">
              <div className="flex items-center gap-2 rounded-lg bg-zinc-50 px-3 py-1.5">
                <Search size={13} className="text-zinc-400"/>
                <input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search..." className="flex-1 text-sm bg-transparent focus:outline-none text-zinc-700 placeholder:text-zinc-400"/>
              </div>
            </div>
            <div className="max-h-40 overflow-y-auto">
              {filtered.map(o=>(
                <button key={o} onClick={()=>{setSelected(o);setOpen(false);setQuery('');}}
                  className={`w-full px-4 py-2 text-left text-sm transition ${selected===o?'bg-indigo-50 text-indigo-700':'text-zinc-700 hover:bg-zinc-50'}`}>
                  {o}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </PreviewWrap>
  );
}

function DropdownMultiPreview() {
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState<string[]>([]);
  const opts=['Design','Engineering','Marketing','Sales','Support','Finance'];
  const toggle=(o:string)=>setSel(s=>s.includes(o)?s.filter(x=>x!==o):[...s,o]);
  return (
    <PreviewWrap bg="bg-white">
      <div className="relative w-56">
        <button onClick={()=>setOpen(o=>!o)}
          className="w-full flex items-center justify-between rounded-xl border border-zinc-200 px-4 py-2.5 text-sm bg-white hover:border-zinc-300 shadow-sm">
          <span className="text-zinc-700">{sel.length?`${sel.length} selected`:'Select teams'}</span>
          <ChevronDown size={15} className={`text-zinc-400 transition-transform ${open?'rotate-180':''}`}/>
        </button>
        {open&&(
          <div className="absolute top-full mt-1.5 w-full rounded-xl border border-zinc-100 bg-white shadow-lg z-10 overflow-hidden">
            {opts.map(o=>(
              <label key={o} className="flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-50 cursor-pointer">
                <input type="checkbox" checked={sel.includes(o)} onChange={()=>toggle(o)} className="rounded text-indigo-600"/>
                <span className="text-sm text-zinc-700">{o}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Images (3)
───────────────────────────────────────────── */
function ImageGridPreview() {
  const imgs=[
    {color:'bg-gradient-to-br from-indigo-400 to-violet-500',h:'h-20'},
    {color:'bg-gradient-to-br from-cyan-400 to-blue-500',h:'h-32'},
    {color:'bg-gradient-to-br from-amber-400 to-orange-500',h:'h-20'},
    {color:'bg-gradient-to-br from-emerald-400 to-teal-500',h:'h-24'},
    {color:'bg-gradient-to-br from-rose-400 to-pink-500',h:'h-28'},
    {color:'bg-gradient-to-br from-violet-400 to-indigo-500',h:'h-20'},
  ];
  return (
    <PreviewWrap bg="bg-white">
      <div className="columns-3 gap-2 w-full max-w-sm">
        {imgs.map((img,i)=>(
          <div key={i} className={`${img.color} ${img.h} rounded-xl mb-2 hover:opacity-90 cursor-pointer transition-opacity`}/>
        ))}
      </div>
    </PreviewWrap>
  );
}

function ImageCaptionPreview() {
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-zinc-100 shadow-sm">
        <div className="relative">
          <div className="h-40 bg-gradient-to-br from-indigo-400 via-violet-500 to-purple-600"/>
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="text-white font-bold text-sm">Northern Lights, Iceland</p>
            <p className="text-white/70 text-xs mt-0.5">Aurora Borealis over Reykjavik · Feb 2024</p>
          </div>
        </div>
        <div className="px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-zinc-500">Photo by @aurora_lens</span>
          <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">View full</button>
        </div>
      </div>
    </PreviewWrap>
  );
}

function ImageGalleryV2Preview() {
  const [expanded, setExpanded] = useState<number|null>(null);
  const imgs=[
    'bg-gradient-to-br from-indigo-400 to-violet-500',
    'bg-gradient-to-br from-cyan-400 to-blue-500',
    'bg-gradient-to-br from-amber-400 to-rose-500',
    'bg-gradient-to-br from-emerald-400 to-teal-500',
  ];
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-sm">
        <div className="grid grid-cols-2 gap-2">
          {imgs.map((img,i)=>(
            <div key={i} onClick={()=>setExpanded(i)} className={`${img} h-20 rounded-xl cursor-pointer hover:opacity-90 transition-opacity`}/>
          ))}
        </div>
        {expanded!==null&&(
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={()=>setExpanded(null)}>
            <div className={`${imgs[expanded]} w-72 h-48 rounded-2xl`}/>
          </div>
        )}
      </div>
    </PreviewWrap>
  );
}


/* ─────────────────────────────────────────────
   Links (3)
───────────────────────────────────────────── */
function LinksBasicPreview() {
  return (
    <PreviewWrap bg="bg-white">
      <div className="space-y-3 w-full max-w-xs">
        <div className="flex flex-col gap-2">
          <a href="#" className="text-sm text-blue-600 underline underline-offset-2 hover:text-blue-800">Underline link</a>
          <a href="#" className="text-sm text-indigo-600 decoration-dashed underline underline-offset-2 hover:text-indigo-800">Dashed underline</a>
          <a href="#" className="text-sm font-semibold text-emerald-600 hover:text-emerald-800 no-underline">Colored link</a>
          <a href="#" className="text-sm text-zinc-700 hover:text-zinc-900 flex items-center gap-1">
            External link <span className="text-xs">↗</span>
          </a>
        </div>
      </div>
    </PreviewWrap>
  );
}

function LinksNavPreview() {
  const [active, setActive] = useState('Home');
  const links=['Home','About','Services','Portfolio','Contact'];
  return (
    <PreviewWrap bg="bg-white">
      <nav className="flex gap-1 p-1 rounded-xl bg-zinc-50 border border-zinc-200">
        {links.map(l=>(
          <button key={l} onClick={()=>setActive(l)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${active===l?'bg-white text-zinc-900 shadow-sm':'text-zinc-500 hover:text-zinc-700'}`}>
            {l}
          </button>
        ))}
      </nav>
    </PreviewWrap>
  );
}

function LinksCTAPreview() {
  return (
    <PreviewWrap bg="bg-white">
      <div className="space-y-3 w-full max-w-xs">
        <a href="#" className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 group">
          Learn more <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform"/>
        </a>
        <a href="#" className="flex items-center gap-2 text-sm font-semibold text-zinc-700 hover:text-zinc-900 group">
          <Mail size={15}/> Send email
        </a>
        <div className="rounded-xl border border-zinc-100 p-3 hover:border-indigo-200 hover:bg-indigo-50/30 cursor-pointer transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-800 group-hover:text-indigo-700">Read the docs →</p>
              <p className="text-xs text-zinc-500 mt-0.5">Full API reference and guides</p>
            </div>
            <ChevronRight size={16} className="text-zinc-300 group-hover:text-indigo-400"/>
          </div>
        </div>
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   List (3)
───────────────────────────────────────────── */
function ListBasicPreview() {
  return (
    <PreviewWrap bg="bg-white">
      <div className="flex gap-8 w-full max-w-md">
        <div>
          <p className="text-xs font-bold text-zinc-500 uppercase mb-2">Unordered</p>
          <ul className="space-y-1.5 text-sm text-zinc-700">
            {['Design system','Component library','Documentation','Testing suite'].map(i=>(
              <li key={i} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-zinc-400 shrink-0"/>{i}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold text-zinc-500 uppercase mb-2">Ordered</p>
          <ol className="space-y-1.5 text-sm text-zinc-700">
            {['Research','Design','Develop','Deploy'].map((i,n)=>(
              <li key={i} className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold flex items-center justify-center shrink-0">{n+1}</span>{i}</li>
            ))}
          </ol>
        </div>
      </div>
    </PreviewWrap>
  );
}

function ListIconPreview() {
  const items=[
    {icon:<Check size={13} className="text-emerald-600"/>,text:'Unlimited projects',sub:'No cap on project count'},
    {icon:<Check size={13} className="text-emerald-600"/>,text:'Priority support',sub:'24/7 dedicated help'},
    {icon:<Check size={13} className="text-emerald-600"/>,text:'Advanced analytics',sub:'Deep insights & reports'},
    {icon:<X size={13} className="text-zinc-300"/>,text:'Custom domains',sub:'Available on Enterprise'},
  ];
  return (
    <PreviewWrap bg="bg-white">
      <ul className="space-y-3 w-full max-w-xs">
        {items.map(item=>(
          <li key={item.text} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center shrink-0 mt-0.5">{item.icon}</div>
            <div>
              <p className="text-sm font-medium text-zinc-800">{item.text}</p>
              <p className="text-xs text-zinc-400">{item.sub}</p>
            </div>
          </li>
        ))}
      </ul>
    </PreviewWrap>
  );
}

function ListGroupV2Preview() {
  const items=[
    {label:'Design Team',sub:'8 members',badge:'Active',badgeCls:'bg-emerald-100 text-emerald-700'},
    {label:'Engineering',sub:'24 members',badge:'Active',badgeCls:'bg-emerald-100 text-emerald-700'},
    {label:'Marketing',sub:'6 members',badge:'Paused',badgeCls:'bg-amber-100 text-amber-700'},
    {label:'Operations',sub:'12 members',badge:'Active',badgeCls:'bg-emerald-100 text-emerald-700'},
  ];
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-xs border border-zinc-200 rounded-xl overflow-hidden divide-y divide-zinc-100">
        {items.map(item=>(
          <div key={item.label} className="flex items-center justify-between px-4 py-3 hover:bg-zinc-50 transition">
            <div>
              <p className="text-sm font-semibold text-zinc-800">{item.label}</p>
              <p className="text-xs text-zinc-400">{item.sub}</p>
            </div>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${item.badgeCls}`}>{item.badge}</span>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Modals (3)
───────────────────────────────────────────── */
function ModalConfirmPreview() {
  const [open, setOpen] = useState(false);
  return (
    <PreviewWrap bg="bg-zinc-100">
      <div className="relative w-full max-w-sm h-40 flex items-center justify-center">
        <button onClick={()=>setOpen(true)} className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-700 transition">Delete Item</button>
        {open&&(
          <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-5 w-64">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center"><XCircle size={18} className="text-red-600"/></div>
                <div>
                  <p className="text-sm font-bold text-zinc-900">Delete item?</p>
                  <p className="text-xs text-zinc-500">This cannot be undone.</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={()=>setOpen(false)} className="flex-1 rounded-lg border border-zinc-200 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50">Cancel</button>
                <button onClick={()=>setOpen(false)} className="flex-1 rounded-lg bg-red-600 py-2 text-sm font-bold text-white hover:bg-red-700">Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PreviewWrap>
  );
}

function ModalDrawerPreview() {
  const [open, setOpen] = useState(false);
  return (
    <PreviewWrap bg="bg-zinc-100">
      <div className="relative w-full max-w-sm h-48 overflow-hidden rounded-2xl bg-zinc-200 flex items-center justify-center">
        <button onClick={()=>setOpen(true)} className="rounded-xl bg-zinc-800 px-5 py-2.5 text-sm font-bold text-white hover:bg-zinc-900">Open Drawer</button>
        <div className={`absolute top-0 right-0 h-full w-52 bg-white shadow-2xl border-l border-zinc-100 transform transition-transform duration-300 ${open?'translate-x-0':'translate-x-full'}`}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100">
            <p className="font-bold text-zinc-800 text-sm">Settings</p>
            <button onClick={()=>setOpen(false)} className="text-zinc-400 hover:text-zinc-600"><X size={16}/></button>
          </div>
          <div className="p-4 space-y-3">
            {['Profile','Notifications','Security','Billing'].map(item=>(
              <div key={item} className="flex items-center gap-2 text-sm text-zinc-700 hover:text-indigo-600 cursor-pointer">
                <ChevronRight size={13} className="text-zinc-300"/>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewWrap>
  );
}

function ModalFormPreview() {
  const [open, setOpen] = useState(false);
  return (
    <PreviewWrap bg="bg-zinc-100">
      <div className="relative w-full max-w-sm h-52 flex items-center justify-center rounded-2xl bg-zinc-200">
        <button onClick={()=>setOpen(true)} className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-700">Open Form</button>
        {open&&(
          <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-5 w-72">
              <div className="flex items-center justify-between mb-4">
                <p className="font-bold text-zinc-900 text-sm">Create project</p>
                <button onClick={()=>setOpen(false)} className="text-zinc-400 hover:text-zinc-600"><X size={15}/></button>
              </div>
              <div className="space-y-3">
                <input className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-indigo-400" placeholder="Project name"/>
                <textarea className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm focus:outline-none focus:border-indigo-400 h-16 resize-none" placeholder="Description"/>
                <button onClick={()=>setOpen(false)} className="w-full rounded-lg bg-indigo-600 py-2 text-sm font-bold text-white hover:bg-indigo-700">Create</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Notifications (3)
───────────────────────────────────────────── */
function NotificationToastPreview() {
  const [toasts, setToasts] = useState([
    {id:1,type:'success',msg:'Changes saved successfully!',icon:<CheckCircle size={15} className="text-emerald-500"/>},
    {id:2,type:'error',msg:'Failed to upload file.',icon:<XCircle size={15} className="text-red-500"/>},
    {id:3,type:'info',msg:'New message from Alice.',icon:<Info size={15} className="text-blue-500"/>},
  ]);
  const dismiss=(id:number)=>setToasts(t=>t.filter(x=>x.id!==id));
  return (
    <PreviewWrap bg="bg-zinc-100">
      <div className="space-y-2 w-full max-w-xs">
        {toasts.map(t=>(
          <div key={t.id} className="flex items-center gap-3 rounded-xl bg-white shadow-lg border border-zinc-100 px-4 py-3">
            {t.icon}
            <p className="flex-1 text-sm text-zinc-700">{t.msg}</p>
            <button onClick={()=>dismiss(t.id)} className="text-zinc-300 hover:text-zinc-500"><X size={13}/></button>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function NotificationBannerPreview() {
  const [idx, setIdx] = useState(0);
  const banners=[
    {bg:'bg-indigo-600',msg:'🎉 New features released! See what\'s new →'},
    {bg:'bg-amber-500',msg:'⚠️ Scheduled maintenance on Sunday at 3AM UTC.'},
    {bg:'bg-emerald-600',msg:'✅ Your account has been verified successfully.'},
  ];
  return (
    <PreviewWrap bg="bg-zinc-100">
      <div className="w-full max-w-sm space-y-2">
        {banners.map((b,i)=>(
          <div key={i} className={`${b.bg} rounded-xl px-4 py-2.5 flex items-center justify-between`}>
            <p className="text-xs text-white font-medium">{b.msg}</p>
            <button className="ml-3 text-white/60 hover:text-white text-xs"><X size={12}/></button>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function NotificationFeedPreview() {
  const items=[
    {init:'AJ',color:'bg-indigo-500',msg:'Alice commented on your post',time:'2m ago',unread:true},
    {init:'BK',color:'bg-blue-500',msg:'Bob sent you a friend request',time:'15m ago',unread:true},
    {init:'CM',color:'bg-cyan-500',msg:'Carol liked your photo',time:'1h ago',unread:false},
    {init:'DP',color:'bg-teal-500',msg:'Dave mentioned you in a note',time:'3h ago',unread:false},
  ];
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-xs border border-zinc-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between">
          <p className="text-sm font-bold text-zinc-800">Notifications</p>
          <span className="text-xs font-bold bg-indigo-100 text-indigo-700 rounded-full px-2 py-0.5">2 new</span>
        </div>
        <div className="divide-y divide-zinc-50">
          {items.map((item,i)=>(
            <div key={i} className={`flex items-start gap-3 px-4 py-3 ${item.unread?'bg-indigo-50/40':''}`}>
              <div className={`w-8 h-8 rounded-full ${item.color} text-white flex items-center justify-center text-xs font-bold shrink-0`}>{item.init}</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-zinc-700">{item.msg}</p>
                <p className="text-[10px] text-zinc-400 mt-0.5">{item.time}</p>
              </div>
              {item.unread&&<span className="w-2 h-2 rounded-full bg-indigo-500 mt-1 shrink-0"/>}
            </div>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Pagination (3)
───────────────────────────────────────────── */
function PaginationBasicPreview() {
  const [page, setPage] = useState(3);
  const total=7;
  const pages=Array.from({length:total},(_,i)=>i+1);
  return (
    <PreviewWrap bg="bg-white">
      <div className="flex items-center gap-1">
        <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}
          className="px-3 py-1.5 text-sm rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 disabled:opacity-40">Prev</button>
        {pages.map(p=>(
          <button key={p} onClick={()=>setPage(p)}
            className={`w-9 h-9 rounded-lg text-sm font-semibold transition ${p===page?'bg-indigo-600 text-white':'border border-zinc-200 text-zinc-600 hover:bg-zinc-50'}`}>{p}</button>
        ))}
        <button onClick={()=>setPage(p=>Math.min(total,p+1))} disabled={page===total}
          className="px-3 py-1.5 text-sm rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 disabled:opacity-40">Next</button>
      </div>
    </PreviewWrap>
  );
}

function PaginationSimplePreview() {
  const [page, setPage] = useState(1);
  const total=12;
  return (
    <PreviewWrap bg="bg-white">
      <div className="flex items-center gap-4">
        <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}
          className="flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-xl border border-zinc-200 text-zinc-700 hover:bg-zinc-50 disabled:opacity-40">
          <ChevronRight size={15} className="rotate-180"/>Prev
        </button>
        <span className="text-sm text-zinc-500">Page <span className="font-bold text-zinc-800">{page}</span> of {total}</span>
        <button onClick={()=>setPage(p=>Math.min(total,p+1))} disabled={page===total}
          className="flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-xl border border-zinc-200 text-zinc-700 hover:bg-zinc-50 disabled:opacity-40">
          Next<ChevronRight size={15}/>
        </button>
      </div>
    </PreviewWrap>
  );
}

function PaginationDotsPreview() {
  const [page, setPage] = useState(0);
  const total=6;
  return (
    <PreviewWrap bg="bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-full max-w-xs h-20 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold">
          Slide {page+1}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={()=>setPage(p=>(p-1+total)%total)} className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200"><ChevronRight size={12} className="rotate-180"/></button>
          {Array.from({length:total}).map((_,i)=>(
            <button key={i} onClick={()=>setPage(i)}
              className={`rounded-full transition-all ${i===page?'w-6 h-2.5 bg-indigo-600':'w-2.5 h-2.5 bg-zinc-200 hover:bg-zinc-300'}`}/>
          ))}
          <button onClick={()=>setPage(p=>(p+1)%total)} className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200"><ChevronRight size={12}/></button>
        </div>
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Popovers (3)
───────────────────────────────────────────── */
function PopoverBasicPreview() {
  const [open, setOpen] = useState(false);
  return (
    <PreviewWrap bg="bg-white">
      <div className="relative inline-block">
        <button onClick={()=>setOpen(o=>!o)}
          className="rounded-xl bg-zinc-800 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-900">
          Info
        </button>
        {open&&(
          <div className="absolute left-full ml-2 top-0 w-52 bg-white rounded-xl border border-zinc-100 shadow-lg p-3 z-10">
            <div className="flex items-start gap-2">
              <Info size={14} className="text-blue-500 mt-0.5 shrink-0"/>
              <div>
                <p className="text-xs font-bold text-zinc-800 mb-1">What is this?</p>
                <p className="text-xs text-zinc-500">This is a basic popover with info content that appears on click.</p>
              </div>
            </div>
            <button onClick={()=>setOpen(false)} className="absolute top-2 right-2 text-zinc-300 hover:text-zinc-500"><X size={12}/></button>
          </div>
        )}
      </div>
    </PreviewWrap>
  );
}

function PopoverRichPreview() {
  const [open, setOpen] = useState(false);
  return (
    <PreviewWrap bg="bg-white">
      <div className="relative inline-block">
        <button onClick={()=>setOpen(o=>!o)} className="flex items-center gap-2 rounded-xl border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-50">
          <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">AJ</div>
          <span className="font-medium text-zinc-700">Alice Johnson</span>
          <ChevronDown size={13} className="text-zinc-400"/>
        </button>
        {open&&(
          <div className="absolute top-full mt-2 left-0 w-64 bg-white rounded-2xl border border-zinc-100 shadow-xl p-4 z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold">AJ</div>
              <div>
                <p className="font-bold text-zinc-900">Alice Johnson</p>
                <p className="text-xs text-zinc-500">alice@acme.com</p>
                <p className="text-xs text-emerald-600 font-semibold">● Online</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 rounded-lg bg-indigo-600 py-1.5 text-xs font-bold text-white hover:bg-indigo-700">Message</button>
              <button className="flex-1 rounded-lg border border-zinc-200 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50" onClick={()=>setOpen(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </PreviewWrap>
  );
}

function PopoverMenuPreview() {
  const [open, setOpen] = useState(false);
  const items=[
    {label:'Copy',icon:<Copy size={13}/>},
    {label:'Search',icon:<Search size={13}/>},
    {label:'Settings',icon:<Settings size={13}/>},
    {label:'Delete',icon:<X size={13}/>,danger:true},
  ];
  return (
    <PreviewWrap bg="bg-white">
      <div className="relative inline-block">
        <button onClick={()=>setOpen(o=>!o)}
          className="rounded-xl bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-200 flex items-center gap-2">
          <MoreHorizontal size={16}/>Options
        </button>
        {open&&(
          <div className="absolute top-full mt-1.5 left-0 w-44 bg-white rounded-xl border border-zinc-100 shadow-lg overflow-hidden z-10">
            {items.map((item,i)=>(
              <button key={item.label} onClick={()=>setOpen(false)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-zinc-50 transition ${item.danger?'text-red-600':' text-zinc-700'} ${i>0&&items[i-1].danger===undefined&&item.danger?'border-t border-zinc-100':''}`}>
                {item.icon}{item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Progress Bars (3)
───────────────────────────────────────────── */
function ProgressBasicPreview() {
  const bars=[
    {label:'Default',value:72,cls:'bg-indigo-500'},
    {label:'Success',value:88,cls:'bg-emerald-500'},
    {label:'Warning',value:45,cls:'bg-amber-500'},
    {label:'Danger',value:25,cls:'bg-red-500'},
  ];
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-xs space-y-3">
        {bars.map(b=>(
          <div key={b.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-zinc-700">{b.label}</span>
              <span className="text-zinc-500">{b.value}%</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-zinc-100">
              <div className={`h-full rounded-full ${b.cls} transition-all`} style={{width:`${b.value}%`}}/>
            </div>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function ProgressMultiPreview() {
  const steps=['Research','Design','Develop','Review','Launch'];
  const [current, setCurrent] = useState(2);
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-sm">
        <div className="flex items-center mb-4">
          {steps.map((s,i)=>(
            <div key={s} className="flex-1 flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${i<current?'bg-indigo-600 border-indigo-600 text-white':i===current?'border-indigo-600 text-indigo-600 bg-white':'border-zinc-200 text-zinc-400'}`}>
                  {i<current?<Check size={12}/>:i+1}
                </div>
                <span className="text-[9px] text-zinc-500 mt-1 whitespace-nowrap">{s}</span>
              </div>
              {i<steps.length-1&&<div className={`flex-1 h-0.5 mx-1 -mt-4 ${i<current?'bg-indigo-600':'bg-zinc-200'}`}/>}
            </div>
          ))}
        </div>
        <div className="flex gap-2 justify-center">
          <button onClick={()=>setCurrent(c=>Math.max(0,c-1))} className="px-3 py-1.5 text-xs rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50">Back</button>
          <button onClick={()=>setCurrent(c=>Math.min(steps.length,c+1))} className="px-3 py-1.5 text-xs rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Next</button>
        </div>
      </div>
    </PreviewWrap>
  );
}

function ProgressCircularPreview() {
  const rings=[
    {label:'CPU',value:72,color:'#6366f1',r:28},
    {label:'RAM',value:55,color:'#22d3ee',r:28},
    {label:'Disk',value:38,color:'#f59e0b',r:28},
  ];
  return (
    <PreviewWrap bg="bg-white">
      <div className="flex gap-6">
        {rings.map(ring=>{
          const circ=2*Math.PI*ring.r;
          const dash=(ring.value/100)*circ;
          return (
            <div key={ring.label} className="flex flex-col items-center gap-1">
              <svg width="72" height="72" viewBox="0 0 72 72">
                <circle cx="36" cy="36" r={ring.r} fill="none" stroke="#f4f4f5" strokeWidth="8"/>
                <circle cx="36" cy="36" r={ring.r} fill="none" stroke={ring.color} strokeWidth="8"
                  strokeDasharray={`${dash} ${circ-dash}`} strokeLinecap="round" transform="rotate(-90 36 36)"/>
                <text x="36" y="40" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#18181b">{ring.value}%</text>
              </svg>
              <span className="text-xs text-zinc-500">{ring.label}</span>
            </div>
          );
        })}
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Ribbons (3)
───────────────────────────────────────────── */
function RibbonCornerPreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="flex gap-4">
        {[
          {label:'NEW',cls:'bg-indigo-600',label2:'Pro Card'},
          {label:'SALE',cls:'bg-red-500',label2:'Starter Card'},
          {label:'HOT',cls:'bg-amber-500',label2:'Business Card'},
        ].map(card=>(
          <div key={card.label2} className="relative w-32 h-28 bg-white rounded-xl border border-zinc-100 shadow-sm overflow-hidden flex items-center justify-center">
            <div className="absolute top-0 right-0 overflow-hidden w-20 h-20">
              <div className={`${card.cls} text-white text-[9px] font-bold text-center py-0.5 transform rotate-45 translate-x-4 translate-y-3 w-20`}>{card.label}</div>
            </div>
            <span className="text-xs font-semibold text-zinc-700">{card.label2}</span>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function RibbonBannerPreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="space-y-3 w-full max-w-xs">
        {[
          {text:'🎉 Limited Time Offer',cls:'bg-indigo-600'},
          {text:'⚡ Flash Sale — 50% Off',cls:'bg-red-500'},
          {text:'✨ New Release',cls:'bg-emerald-600'},
        ].map(r=>(
          <div key={r.text} className="bg-white rounded-xl border border-zinc-100 shadow-sm overflow-hidden">
            <div className={`${r.cls} px-4 py-1.5 text-xs font-bold text-white text-center`}>{r.text}</div>
            <div className="px-4 py-3 text-xs text-zinc-500">Card content goes here</div>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function RibbonBadgePreview() {
  return (
    <PreviewWrap bg="bg-zinc-50">
      <div className="flex gap-4 flex-wrap">
        {[
          {label:'Featured',cls:'bg-indigo-600',shadow:'shadow-indigo-200'},
          {label:'Popular',cls:'bg-rose-500',shadow:'shadow-rose-200'},
          {label:'New',cls:'bg-emerald-600',shadow:'shadow-emerald-200'},
        ].map(r=>(
          <div key={r.label} className="relative">
            <div className="w-28 h-20 bg-white rounded-xl border border-zinc-100 shadow-sm flex items-center justify-center text-xs text-zinc-500">Card</div>
            <div className={`absolute -left-1 top-3 ${r.cls} text-white text-[10px] font-bold px-3 py-0.5 rounded-r-full shadow ${r.shadow}`}>
              {r.label}
              <div className={`absolute left-0 -bottom-1 border-l-[4px] border-l-transparent border-r-0 border-t-[4px] ${r.cls} opacity-60`}
                style={{borderTopColor:'inherit',width:0,height:0,borderStyle:'solid'}}/>
            </div>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Spinners (3)
───────────────────────────────────────────── */
function SpinnerBasicPreview() {
  return (
    <PreviewWrap bg="bg-white">
      <div className="flex gap-8 items-center flex-wrap">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full border-4 border-zinc-200 border-t-indigo-600 animate-spin"/>
          <span className="text-[10px] text-zinc-400">Border</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-1">
            {[0,1,2].map(i=>(
              <div key={i} className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{animationDelay:`${i*0.15}s`}}/>
            ))}
          </div>
          <span className="text-[10px] text-zinc-400">Dots</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600 animate-ping opacity-50"/>
          <span className="text-[10px] text-zinc-400">Pulse</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-1 items-end">
            {[0,1,2,3].map(i=>(
              <div key={i} className="w-1.5 bg-indigo-600 rounded-full animate-bounce" style={{height:`${8+i*4}px`,animationDelay:`${i*0.1}s`}}/>
            ))}
          </div>
          <span className="text-[10px] text-zinc-400">Wave</span>
        </div>
      </div>
    </PreviewWrap>
  );
}

function SpinnerLabeledPreview() {
  return (
    <PreviewWrap bg="bg-white">
      <div className="space-y-4 w-full max-w-xs">
        {[
          {size:'w-4 h-4',text:'Loading...','textSize':'text-sm'},
          {size:'w-6 h-6',text:'Processing','textSize':'text-base'},
          {size:'w-8 h-8',text:'Please wait...','textSize':'text-lg'},
        ].map((s,i)=>(
          <div key={i} className="flex items-center gap-3">
            <div className={`${s.size} rounded-full border-4 border-zinc-200 border-t-indigo-600 animate-spin shrink-0`}/>
            <span className={`${s.textSize} font-medium text-zinc-600`}>{s.text}</span>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function SpinnerOverlayPreview() {
  const [loading, setLoading] = useState(false);
  return (
    <PreviewWrap bg="bg-zinc-100">
      <div className="relative w-64 h-36 bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="p-4">
          <p className="text-sm font-bold text-zinc-800">Dashboard</p>
          <p className="text-xs text-zinc-500 mt-1">Content loaded below</p>
        </div>
        {loading&&(
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-2xl">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full border-4 border-zinc-200 border-t-indigo-600 animate-spin"/>
              <span className="text-xs text-zinc-500">Loading...</span>
            </div>
          </div>
        )}
        <div className="absolute bottom-3 right-3">
          <button onClick={()=>{setLoading(true);setTimeout(()=>setLoading(false),2000);}}
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-700">
            {loading?'Loading...':'Load Data'}
          </button>
        </div>
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Tabs (3)
───────────────────────────────────────────── */
function TabsPillPreview() {
  const [tab, setTab] = useState('overview');
  const tabs=[{id:'overview',label:'Overview'},{id:'analytics',label:'Analytics'},{id:'reports',label:'Reports'},{id:'settings',label:'Settings'}];
  const content:Record<string,string>={overview:'Overview content',analytics:'Analytics & charts',reports:'Monthly reports',settings:'Account settings'};
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-sm">
        <div className="flex gap-1 p-1 bg-zinc-100 rounded-xl mb-4">
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${tab===t.id?'bg-white text-zinc-900 shadow':'text-zinc-500 hover:text-zinc-700'}`}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="rounded-xl bg-zinc-50 border border-zinc-100 p-4 text-sm text-zinc-600">{content[tab]}</div>
      </div>
    </PreviewWrap>
  );
}

function TabsVerticalPreview() {
  const [tab, setTab] = useState('profile');
  const tabs=[{id:'profile',label:'Profile',icon:'👤'},{id:'security',label:'Security',icon:'🔒'},{id:'billing',label:'Billing',icon:'💳'},{id:'notifs',label:'Notifications',icon:'🔔'}];
  const content:Record<string,string>={profile:'Manage your profile info',security:'Update password & 2FA',billing:'Manage plans & invoices',notifs:'Configure alert preferences'};
  return (
    <PreviewWrap bg="bg-white">
      <div className="flex gap-3 w-full max-w-sm h-40">
        <div className="flex flex-col gap-0.5 w-32">
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-left transition-all ${tab===t.id?'bg-indigo-50 text-indigo-700 font-semibold':'text-zinc-500 hover:bg-zinc-50'}`}>
              <span>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>
        <div className="flex-1 rounded-xl bg-zinc-50 border border-zinc-100 p-3 text-xs text-zinc-600">{content[tab]}</div>
      </div>
    </PreviewWrap>
  );
}

function TabsIconPreview() {
  const [tab, setTab] = useState('mail');
  const tabs=[
    {id:'mail',icon:<Mail size={16}/>,label:'Mail'},
    {id:'bell',icon:<Bell size={16}/>,label:'Alerts'},
    {id:'user',icon:<User size={16}/>,label:'Profile'},
    {id:'settings',icon:<Settings size={16}/>,label:'Settings'},
  ];
  return (
    <PreviewWrap bg="bg-white">
      <div className="w-full max-w-sm">
        <div className="flex border-b border-zinc-200 mb-4">
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-semibold transition-all border-b-2 ${tab===t.id?'border-indigo-600 text-indigo-600':'border-transparent text-zinc-400 hover:text-zinc-600'}`}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>
        <div className="text-sm text-zinc-600 px-1">{tabs.find(t=>t.id===tab)?.label} content</div>
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Tooltips (3)
───────────────────────────────────────────── */
function TooltipBasicPreview() {
  const tips=[
    {label:'Top',pos:'bottom-full mb-2 left-1/2 -translate-x-1/2',cls:'bg-zinc-800 text-white'},
    {label:'Right',pos:'left-full ml-2 top-1/2 -translate-y-1/2',cls:'bg-indigo-600 text-white'},
    {label:'Bottom',pos:'top-full mt-2 left-1/2 -translate-x-1/2',cls:'bg-emerald-600 text-white'},
    {label:'Left',pos:'right-full mr-2 top-1/2 -translate-y-1/2',cls:'bg-rose-500 text-white'},
  ];
  return (
    <PreviewWrap bg="bg-white">
      <div className="grid grid-cols-2 gap-6 p-4">
        {tips.map(t=>(
          <div key={t.label} className="relative flex items-center justify-center group">
            <button className="rounded-lg border border-zinc-200 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50">{t.label}</button>
            <div className={`absolute ${t.pos} ${t.cls} text-xs font-semibold rounded-lg px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10`}>
              Tooltip {t.label}
            </div>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function TooltipRichPreview() {
  const [show, setShow] = useState(false);
  return (
    <PreviewWrap bg="bg-white">
      <div className="relative inline-block" onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}>
        <button className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 flex items-center gap-2">
          <Info size={15}/>Learn more
        </button>
        {show&&(
          <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-56 bg-white rounded-xl border border-zinc-100 shadow-xl p-3 z-20">
            <p className="text-xs font-bold text-zinc-900 mb-1">Rich Tooltip</p>
            <p className="text-xs text-zinc-500 mb-2">Tooltips can include titles, descriptions, and even links for rich content.</p>
            <a href="#" className="text-xs font-semibold text-indigo-600 hover:underline">Read documentation →</a>
          </div>
        )}
      </div>
    </PreviewWrap>
  );
}

function TooltipDarkPreview() {
  return (
    <PreviewWrap bg="bg-white">
      <div className="flex gap-8 flex-wrap justify-center p-4">
        {[
          {label:'Copy',icon:<Copy size={15}/>,tip:'Copy to clipboard'},
          {label:'Settings',icon:<Settings size={15}/>,tip:'Manage settings'},
          {label:'Delete',icon:<X size={15}/>,tip:'Remove item'},
        ].map(item=>(
          <div key={item.label} className="relative group flex flex-col items-center">
            <button className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-zinc-200 transition">
              {item.icon}
            </button>
            <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] font-semibold rounded-lg px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
              {item.tip}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-zinc-900 rotate-45"/>
            </div>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Videos (3)
───────────────────────────────────────────── */
function VideoPlayerPreview() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [muted, setMuted] = useState(false);
  return (
    <PreviewWrap bg="bg-zinc-900">
      <div className="w-full max-w-sm bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-700">
        <div className="h-32 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMWUxZTJlIi8+PC9zdmc+')] opacity-30"/>
          <button onClick={()=>setPlaying(p=>!p)}
            className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition shadow-lg z-10">
            {playing?(
              <svg viewBox="0 0 16 16" width="18" fill="#18181b"><rect x="3" y="2" width="4" height="12" rx="1"/><rect x="9" y="2" width="4" height="12" rx="1"/></svg>
            ):(
              <svg viewBox="0 0 16 16" width="18" fill="#18181b"><polygon points="3,1 15,8 3,15"/></svg>
            )}
          </button>
        </div>
        <div className="px-3 py-2.5 bg-zinc-800">
          <div className="flex items-center gap-2 mb-2">
            <button onClick={()=>setPlaying(p=>!p)} className="text-white hover:text-zinc-300">
              {playing?<svg viewBox="0 0 16 16" width="14" fill="currentColor"><rect x="2" y="1" width="4" height="14" rx="1"/><rect x="10" y="1" width="4" height="14" rx="1"/></svg>
              :<svg viewBox="0 0 16 16" width="14" fill="currentColor"><polygon points="2,0 14,8 2,16"/></svg>}
            </button>
            <div className="flex-1 h-1 bg-zinc-600 rounded-full cursor-pointer" onClick={(e)=>{
              const r=e.currentTarget.getBoundingClientRect();
              setProgress(Math.round(((e.clientX-r.left)/r.width)*100));
            }}>
              <div className="h-full bg-indigo-500 rounded-full" style={{width:`${progress}%`}}/>
            </div>
            <span className="text-[10px] text-zinc-400 whitespace-nowrap">1:24 / 4:02</span>
            <button onClick={()=>setMuted(m=>!m)} className="text-zinc-400 hover:text-white text-[10px]">{muted?'🔇':'🔊'}</button>
          </div>
        </div>
      </div>
    </PreviewWrap>
  );
}

function VideoCardV2Preview() {
  const cards=[
    {title:'Getting Started with React Hooks',views:'24K views',duration:'12:34',author:'DevTube',color:'bg-gradient-to-br from-indigo-500 to-violet-600'},
    {title:'Build a Full-Stack App in 1 Hour',views:'84K views',duration:'58:21',author:'CodeWorld',color:'bg-gradient-to-br from-cyan-500 to-blue-600'},
  ];
  return (
    <PreviewWrap bg="bg-white">
      <div className="flex gap-3 w-full max-w-md">
        {cards.map(card=>(
          <div key={card.title} className="flex-1 bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden hover:shadow-md transition">
            <div className={`${card.color} h-20 relative flex items-end p-2`}>
              <span className="bg-black/70 text-white text-[10px] font-bold rounded px-1.5 py-0.5 ml-auto">{card.duration}</span>
            </div>
            <div className="p-3">
              <p className="text-xs font-bold text-zinc-800 leading-tight">{card.title}</p>
              <p className="text-[10px] text-zinc-500 mt-1">{card.author} · {card.views}</p>
            </div>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

function VideoGridPreview() {
  const videos=[
    {color:'bg-gradient-to-br from-indigo-500 to-violet-600',dur:'5:24',title:'React Tips'},
    {color:'bg-gradient-to-br from-cyan-500 to-blue-600',dur:'12:08',title:'CSS Grid'},
    {color:'bg-gradient-to-br from-amber-500 to-orange-600',dur:'8:42',title:'JS Async'},
    {color:'bg-gradient-to-br from-emerald-500 to-teal-600',dur:'18:55',title:'Next.js SSR'},
  ];
  return (
    <PreviewWrap bg="bg-white">
      <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
        {videos.map(v=>(
          <div key={v.title} className="rounded-xl overflow-hidden border border-zinc-100 hover:shadow-md transition cursor-pointer">
            <div className={`${v.color} h-16 relative`}>
              <span className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-[9px] font-bold rounded px-1 py-0.5">{v.dur}</span>
            </div>
            <div className="px-2 py-1.5 bg-white">
              <p className="text-[10px] font-semibold text-zinc-800 truncate">{v.title}</p>
            </div>
          </div>
        ))}
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Aside Navigation — Dashboard (3)
───────────────────────────────────────────── */
function DashSidebarMinimalPreview() {
  const [active, setActive] = useState('Dashboard');
  const items = [
    { icon: '⊞', label: 'Dashboard' },
    { icon: '📊', label: 'Analytics' },
    { icon: '👥', label: 'Users' },
    { icon: '📁', label: 'Projects' },
    { icon: '💬', label: 'Messages', badge: 4 },
    { icon: '⚙️', label: 'Settings' },
  ];
  return (
    <PreviewWrap bg="bg-zinc-100">
      <div className="flex h-[280px] w-[200px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3.5 border-b border-zinc-100">
          <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">D</div>
          <span className="text-sm font-bold text-zinc-800">Dashboard</span>
        </div>
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
          {items.map(({ icon, label, badge }) => (
            <button key={label} onClick={() => setActive(label)}
              className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-all ${active === label ? 'bg-indigo-50 text-indigo-700' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700'}`}>
              <span className="text-sm leading-none">{icon}</span>
              <span className="flex-1 text-left">{label}</span>
              {badge && <span className="rounded-full bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold text-indigo-600">{badge}</span>}
            </button>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

function DashSidebarGroupedPreview() {
  const [active, setActive] = useState('Overview');
  const groups = [
    { title: 'MAIN', items: [{ icon: '🏠', label: 'Overview' }, { icon: '📈', label: 'Revenue' }, { icon: '🎯', label: 'Goals' }] },
    { title: 'REPORTS', items: [{ icon: '📋', label: 'Weekly' }, { icon: '📅', label: 'Monthly' }] },
    { title: 'ACCOUNT', items: [{ icon: '👤', label: 'Profile' }, { icon: '⚙️', label: 'Settings' }] },
  ];
  return (
    <PreviewWrap bg="bg-zinc-100">
      <div className="flex h-[280px] w-[200px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3.5 border-b border-zinc-100">
          <div className="h-7 w-7 rounded-lg bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">A</div>
          <span className="text-sm font-bold text-zinc-800">Acme Co.</span>
        </div>
        <nav className="flex-1 px-2 py-2 overflow-auto space-y-3">
          {groups.map(({ title, items }) => (
            <div key={title}>
              <p className="px-2.5 mb-1 text-[9px] font-bold tracking-widest text-zinc-400">{title}</p>
              {items.map(({ icon, label }) => (
                <button key={label} onClick={() => setActive(label)}
                  className={`w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${active === label ? 'bg-emerald-50 text-emerald-700' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700'}`}>
                  <span className="text-sm">{icon}</span>{label}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

function DashSidebarFullPreview() {
  const [active, setActive] = useState('Dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const items = [
    { icon: '⊞', label: 'Dashboard' },
    { icon: '📊', label: 'Analytics', badge: 'New' },
    { icon: '🛒', label: 'Orders', badge: '12' },
    { icon: '👥', label: 'Customers' },
    { icon: '💰', label: 'Revenue' },
    { icon: '⚙️', label: 'Settings' },
  ];
  return (
    <PreviewWrap bg="bg-slate-100">
      <div className={`flex h-[280px] flex-col rounded-2xl bg-slate-900 shadow-xl overflow-hidden transition-all duration-200 ${collapsed ? 'w-[52px]' : 'w-[200px]'}`}>
        <div className="flex items-center justify-between px-3 py-3.5 border-b border-slate-700/50">
          {!collapsed && <div className="flex items-center gap-2"><div className="h-6 w-6 rounded-md bg-violet-500 flex items-center justify-center text-white text-[10px] font-bold">V</div><span className="text-xs font-bold text-white">Vertex</span></div>}
          <button onClick={() => setCollapsed(v => !v)} className="ml-auto text-slate-400 hover:text-white text-xs px-1">
            {collapsed ? '→' : '←'}
          </button>
        </div>
        <nav className="flex-1 px-1.5 py-2 space-y-0.5 overflow-auto">
          {items.map(({ icon, label, badge }) => (
            <button key={label} onClick={() => setActive(label)} title={collapsed ? label : undefined}
              className={`w-full flex items-center gap-2.5 rounded-lg px-2 py-2 text-xs font-medium transition-all ${active === label ? 'bg-violet-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              <span className="text-sm shrink-0">{icon}</span>
              {!collapsed && <><span className="flex-1 text-left">{label}</span>{badge && <span className={`rounded-md px-1.5 text-[9px] font-bold ${badge === 'New' ? 'bg-violet-500 text-white' : 'bg-slate-700 text-slate-300'}`}>{badge}</span>}</>}
            </button>
          ))}
        </nav>
        {!collapsed && (
          <div className="flex items-center gap-2 px-3 py-3 border-t border-slate-700/50">
            <div className="h-6 w-6 rounded-full bg-violet-400 flex items-center justify-center text-[10px] font-bold text-white">JD</div>
            <div className="min-w-0 flex-1"><p className="text-[10px] font-semibold text-white truncate">Jane Doe</p><p className="text-[9px] text-slate-400">Admin</p></div>
          </div>
        )}
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Aside Navigation — eCommerce (3)
───────────────────────────────────────────── */
function EcomSidebarAdminPreview() {
  const [active, setActive] = useState('Orders');
  const items = [
    { icon: '🛒', label: 'Orders', badge: '23' },
    { icon: '📦', label: 'Products' },
    { icon: '👥', label: 'Customers' },
    { icon: '💳', label: 'Payments' },
    { icon: '🏷️', label: 'Discounts' },
    { icon: '📊', label: 'Reports' },
    { icon: '⚙️', label: 'Settings' },
  ];
  return (
    <PreviewWrap bg="bg-orange-50">
      <div className="flex h-[280px] w-[200px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3.5 border-b border-zinc-100 bg-orange-500">
          <span className="text-white text-sm font-bold">🛍️ ShopAdmin</span>
        </div>
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
          {items.map(({ icon, label, badge }) => (
            <button key={label} onClick={() => setActive(label)}
              className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-all ${active === label ? 'bg-orange-50 text-orange-700' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700'}`}>
              <span>{icon}</span><span className="flex-1 text-left">{label}</span>
              {badge && <span className="rounded-full bg-orange-100 px-1.5 py-0.5 text-[10px] font-bold text-orange-600">{badge}</span>}
            </button>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

function EcomSidebarStorePreview() {
  const [active, setActive] = useState('All Products');
  const categories = ['All Products', 'Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Toys'];
  const counts = [248, 64, 91, 37, 28, 15, 13];
  return (
    <PreviewWrap bg="bg-rose-50">
      <div className="flex h-[280px] w-[200px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="px-3 py-3 border-b border-zinc-100">
          <p className="text-xs font-bold text-zinc-700 mb-2">Categories</p>
          <div className="flex items-center gap-1.5 rounded-lg bg-zinc-100 px-2.5 py-1.5">
            <span className="text-xs text-zinc-400">🔍</span>
            <span className="text-xs text-zinc-400">Search...</span>
          </div>
        </div>
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
          {categories.map((cat, i) => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${active === cat ? 'bg-rose-50 text-rose-700' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700'}`}>
              <span>{cat}</span>
              <span className={`text-[10px] ${active === cat ? 'text-rose-400' : 'text-zinc-400'}`}>{counts[i]}</span>
            </button>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

function EcomSidebarCatalogPreview() {
  const [expanded, setExpanded] = useState<string[]>(['Electronics']);
  const [active, setActive] = useState('Smartphones');
  const tree = [
    { label: 'Electronics', children: ['Smartphones', 'Laptops', 'Tablets'] },
    { label: 'Fashion', children: ['Men', 'Women', 'Kids'] },
    { label: 'Home', children: ['Kitchen', 'Furniture'] },
  ];
  const toggle = (l: string) => setExpanded(p => p.includes(l) ? p.filter(x => x !== l) : [...p, l]);
  return (
    <PreviewWrap bg="bg-amber-50">
      <div className="flex h-[280px] w-[200px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-100"><p className="text-xs font-bold text-zinc-800">📂 Catalog</p></div>
        <nav className="flex-1 px-2 py-2 overflow-auto">
          {tree.map(({ label, children }) => (
            <div key={label}>
              <button onClick={() => toggle(label)}
                className="w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition">
                <span>{label}</span>
                <span className="text-zinc-400 text-[10px]">{expanded.includes(label) ? '▾' : '▸'}</span>
              </button>
              {expanded.includes(label) && (
                <div className="ml-3 border-l border-zinc-200 pl-2 space-y-0.5 mb-1">
                  {children.map(c => (
                    <button key={c} onClick={() => setActive(c)}
                      className={`w-full text-left rounded-md px-2 py-1.5 text-xs transition ${active === c ? 'text-amber-700 font-semibold' : 'text-zinc-500 hover:text-zinc-700'}`}>{c}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Aside Navigation — Analytics (3)
───────────────────────────────────────────── */
function AnalyticsSidebarMainPreview() {
  const [active, setActive] = useState('Overview');
  const items = [
    { icon: '📊', label: 'Overview' },
    { icon: '👁️', label: 'Traffic' },
    { icon: '🎯', label: 'Conversions' },
    { icon: '🔄', label: 'Funnels' },
    { icon: '👥', label: 'Cohorts' },
    { icon: '📍', label: 'Heatmaps' },
    { icon: '📋', label: 'Reports' },
  ];
  return (
    <PreviewWrap bg="bg-violet-50">
      <div className="flex h-[280px] w-[200px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3.5 border-b border-zinc-100">
          <div className="h-6 w-6 rounded-md bg-violet-600 flex items-center justify-center text-white text-[10px] font-bold">A</div>
          <span className="text-xs font-bold text-zinc-800">Analytics Pro</span>
        </div>
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
          {items.map(({ icon, label }) => (
            <button key={label} onClick={() => setActive(label)}
              className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-all ${active === label ? 'bg-violet-600 text-white' : 'text-zinc-500 hover:bg-violet-50 hover:text-violet-700'}`}>
              <span>{icon}</span>{label}
            </button>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

function AnalyticsSidebarMetricsPreview() {
  const [active, setActive] = useState('Sessions');
  const metrics = [
    { label: 'Sessions', val: '24.3K', trend: '+12%', up: true },
    { label: 'Bounce Rate', val: '38.2%', trend: '-4%', up: true },
    { label: 'Avg Duration', val: '2m 41s', trend: '+0.3%', up: true },
    { label: 'Revenue', val: '$8.4K', trend: '+22%', up: true },
    { label: 'Goal Completions', val: '1,204', trend: '-2%', up: false },
  ];
  return (
    <PreviewWrap bg="bg-blue-50">
      <div className="flex h-[280px] w-[220px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-100"><p className="text-xs font-bold text-zinc-800">📈 Key Metrics</p></div>
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
          {metrics.map(({ label, val, trend, up }) => (
            <button key={label} onClick={() => setActive(label)}
              className={`w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-xs transition-all ${active === label ? 'bg-blue-50 text-blue-700' : 'text-zinc-600 hover:bg-zinc-50'}`}>
              <span className="font-medium">{label}</span>
              <div className="flex items-center gap-1.5 text-right">
                <span className="font-bold text-zinc-800">{val}</span>
                <span className={`text-[10px] font-semibold ${up ? 'text-emerald-600' : 'text-red-500'}`}>{trend}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

function AnalyticsSidebarReportsPreview() {
  const [active, setActive] = useState('Q1 Summary');
  const [open, setOpen] = useState('Quarterly');
  const folders = [
    { name: 'Quarterly', reports: ['Q1 Summary', 'Q2 Summary', 'Q3 Summary'] },
    { name: 'Marketing', reports: ['SEO Report', 'Paid Ads'] },
    { name: 'Custom', reports: ['Board Deck'] },
  ];
  return (
    <PreviewWrap bg="bg-indigo-50">
      <div className="flex h-[280px] w-[200px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-100"><p className="text-xs font-bold text-zinc-800">📁 Reports</p></div>
        <nav className="flex-1 px-2 py-2 overflow-auto">
          {folders.map(({ name, reports }) => (
            <div key={name}>
              <button onClick={() => setOpen(o => o === name ? '' : name)}
                className="w-full flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition">
                <span>{open === name ? '📂' : '📁'}</span><span className="flex-1 text-left">{name}</span>
                <span className="text-zinc-400 text-[10px]">{open === name ? '▾' : '▸'}</span>
              </button>
              {open === name && (
                <div className="ml-3 border-l-2 border-indigo-100 pl-2 space-y-0.5 mb-1">
                  {reports.map(r => (
                    <button key={r} onClick={() => setActive(r)}
                      className={`w-full text-left rounded-md px-2 py-1.5 text-xs transition ${active === r ? 'text-indigo-700 font-bold' : 'text-zinc-500 hover:text-zinc-700'}`}>{r}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Aside Navigation — Marketing (3)
───────────────────────────────────────────── */
function MarketingSidebarMainPreview() {
  const [active, setActive] = useState('Campaigns');
  const items = [
    { icon: '🚀', label: 'Campaigns', badge: '3 live' },
    { icon: '📧', label: 'Email', badge: '12' },
    { icon: '📣', label: 'Social' },
    { icon: '🔍', label: 'SEO' },
    { icon: '💰', label: 'Paid Ads' },
    { icon: '📊', label: 'Analytics' },
    { icon: '🧪', label: 'A/B Tests' },
  ];
  return (
    <PreviewWrap bg="bg-pink-50">
      <div className="flex h-[280px] w-[200px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3.5 border-b border-zinc-100 bg-gradient-to-r from-pink-500 to-rose-500">
          <span className="text-xs font-bold text-white">🎯 Marketing Hub</span>
        </div>
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
          {items.map(({ icon, label, badge }) => (
            <button key={label} onClick={() => setActive(label)}
              className={`w-full flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium transition-all ${active === label ? 'bg-pink-50 text-pink-700' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700'}`}>
              <span>{icon}</span><span className="flex-1 text-left">{label}</span>
              {badge && <span className="rounded-full bg-pink-100 px-1.5 py-0.5 text-[10px] font-bold text-pink-600">{badge}</span>}
            </button>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

function MarketingSidebarCampaignsPreview() {
  const [active, setActive] = useState('Summer Sale');
  const campaigns = [
    { name: 'Summer Sale', status: 'Live', color: 'bg-green-400' },
    { name: 'Back to School', status: 'Live', color: 'bg-green-400' },
    { name: 'Newsletter #24', status: 'Draft', color: 'bg-zinc-300' },
    { name: 'Product Launch', status: 'Scheduled', color: 'bg-amber-400' },
    { name: 'Retargeting', status: 'Paused', color: 'bg-red-400' },
  ];
  return (
    <PreviewWrap bg="bg-fuchsia-50">
      <div className="flex h-[280px] w-[210px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-3 border-b border-zinc-100">
          <p className="text-xs font-bold text-zinc-800">🚀 Campaigns</p>
          <span className="rounded-md bg-fuchsia-100 px-2 py-0.5 text-[10px] font-bold text-fuchsia-700">2 Live</span>
        </div>
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
          {campaigns.map(({ name, status, color }) => (
            <button key={name} onClick={() => setActive(name)}
              className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs transition-all ${active === name ? 'bg-fuchsia-50 text-fuchsia-700' : 'text-zinc-600 hover:bg-zinc-50'}`}>
              <span className={`h-2 w-2 rounded-full shrink-0 ${color}`} />
              <span className="flex-1 text-left font-medium truncate">{name}</span>
              <span className="text-[10px] text-zinc-400 shrink-0">{status}</span>
            </button>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

function MarketingSidebarChannelsPreview() {
  const [active, setActive] = useState('Email');
  const channels = [
    { icon: '📧', label: 'Email', reach: '14.2K', pct: 74 },
    { icon: '📱', label: 'SMS', reach: '3.8K', pct: 20 },
    { icon: '🐦', label: 'Twitter/X', reach: '6.1K', pct: 32 },
    { icon: '📘', label: 'Facebook', reach: '9.4K', pct: 49 },
    { icon: '📸', label: 'Instagram', reach: '11K', pct: 58 },
  ];
  return (
    <PreviewWrap bg="bg-cyan-50">
      <div className="flex h-[280px] w-[220px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-100"><p className="text-xs font-bold text-zinc-800">📡 Channels</p></div>
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
          {channels.map(({ icon, label, reach, pct }) => (
            <button key={label} onClick={() => setActive(label)}
              className={`w-full rounded-lg px-2.5 py-2 text-left transition-all ${active === label ? 'bg-cyan-50' : 'hover:bg-zinc-50'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">{icon}</span>
                <span className={`text-xs font-semibold flex-1 ${active === label ? 'text-cyan-700' : 'text-zinc-700'}`}>{label}</span>
                <span className="text-[10px] font-bold text-zinc-500">{reach}</span>
              </div>
              <div className="h-1 w-full rounded-full bg-zinc-100">
                <div className="h-1 rounded-full bg-cyan-400 transition-all" style={{ width: `${pct}%` }} />
              </div>
            </button>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Aside Navigation — CRM (3)
───────────────────────────────────────────── */
function CrmSidebarMainPreview() {
  const [active, setActive] = useState('Contacts');
  const items = [
    { icon: '👤', label: 'Contacts', badge: '1.2K' },
    { icon: '🏢', label: 'Companies', badge: '248' },
    { icon: '💼', label: 'Deals', badge: '36' },
    { icon: '📅', label: 'Activities' },
    { icon: '📧', label: 'Emails' },
    { icon: '📊', label: 'Reports' },
    { icon: '⚙️', label: 'Settings' },
  ];
  return (
    <PreviewWrap bg="bg-blue-50">
      <div className="flex h-[280px] w-[200px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3.5 border-b border-zinc-100 bg-blue-600">
          <span className="text-xs font-bold text-white">🤝 CRM Suite</span>
        </div>
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
          {items.map(({ icon, label, badge }) => (
            <button key={label} onClick={() => setActive(label)}
              className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-all ${active === label ? 'bg-blue-50 text-blue-700' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700'}`}>
              <span>{icon}</span><span className="flex-1 text-left">{label}</span>
              {badge && <span className="rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold text-blue-500">{badge}</span>}
            </button>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

function CrmSidebarPipelinePreview() {
  const [active, setActive] = useState('Proposal');
  const stages = [
    { label: 'Lead', count: 42, value: '$0', color: 'bg-zinc-200' },
    { label: 'Qualified', count: 18, value: '$24K', color: 'bg-blue-200' },
    { label: 'Proposal', count: 9, value: '$88K', color: 'bg-indigo-300' },
    { label: 'Negotiation', count: 5, value: '$140K', color: 'bg-violet-400' },
    { label: 'Closed Won', count: 3, value: '$210K', color: 'bg-emerald-400' },
  ];
  return (
    <PreviewWrap bg="bg-indigo-50">
      <div className="flex h-[280px] w-[220px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-100"><p className="text-xs font-bold text-zinc-800">💼 Pipeline</p></div>
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
          {stages.map(({ label, count, value, color }) => (
            <button key={label} onClick={() => setActive(label)}
              className={`w-full flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs transition-all ${active === label ? 'bg-indigo-50 text-indigo-700' : 'text-zinc-600 hover:bg-zinc-50'}`}>
              <span className={`h-2.5 w-2.5 rounded-sm shrink-0 ${color}`} />
              <span className="flex-1 text-left font-medium">{label}</span>
              <span className="text-[10px] text-zinc-400">{count}</span>
              <span className="text-[10px] font-bold text-zinc-600">{value}</span>
            </button>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

function CrmSidebarContactsPreview() {
  const [active, setActive] = useState('All');
  const filters = [
    { label: 'All', count: 1248 },
    { label: 'Leads', count: 312 },
    { label: 'Customers', count: 684 },
    { label: 'Partners', count: 89 },
    { label: 'Churned', count: 163 },
  ];
  const recent = ['Alice Wang', 'Bob Torres', 'Carol Kim'];
  return (
    <PreviewWrap bg="bg-sky-50">
      <div className="flex h-[280px] w-[200px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="px-3 py-3 border-b border-zinc-100">
          <p className="text-xs font-bold text-zinc-800 mb-2">👤 Contacts</p>
          <div className="flex items-center gap-1.5 rounded-lg bg-zinc-100 px-2.5 py-1.5"><span className="text-xs text-zinc-400">🔍</span><span className="text-xs text-zinc-400">Search contacts...</span></div>
        </div>
        <div className="px-2 py-1.5 space-y-0.5">
          {filters.map(({ label, count }) => (
            <button key={label} onClick={() => setActive(label)}
              className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${active === label ? 'bg-sky-50 text-sky-700' : 'text-zinc-500 hover:bg-zinc-50'}`}>
              <span>{label}</span><span className="text-[10px] text-zinc-400">{count}</span>
            </button>
          ))}
        </div>
        <div className="px-3 pt-1 pb-2 border-t border-zinc-100 mt-auto">
          <p className="text-[9px] font-bold text-zinc-400 mb-1 tracking-widest">RECENT</p>
          {recent.map(n => <p key={n} className="text-[11px] text-zinc-600 py-0.5 truncate">{n}</p>)}
        </div>
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Aside Navigation — Stocks (3)
───────────────────────────────────────────── */
function StocksSidebarMainPreview() {
  const [active, setActive] = useState('Portfolio');
  const items = [
    { icon: '💼', label: 'Portfolio' },
    { icon: '👁️', label: 'Watchlist', badge: '8' },
    { icon: '📊', label: 'Markets' },
    { icon: '📰', label: 'News' },
    { icon: '🔔', label: 'Alerts', badge: '2' },
    { icon: '📋', label: 'Orders' },
    { icon: '📈', label: 'P&L Report' },
  ];
  return (
    <PreviewWrap bg="bg-zinc-900">
      <div className="flex h-[280px] w-[200px] flex-col rounded-2xl bg-[#0f1117] shadow-xl border border-zinc-800 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3.5 border-b border-zinc-800">
          <div className="h-6 w-6 rounded-md bg-emerald-500 flex items-center justify-center text-white text-[10px] font-bold">T</div>
          <span className="text-xs font-bold text-white">TradeView</span>
        </div>
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
          {items.map(({ icon, label, badge }) => (
            <button key={label} onClick={() => setActive(label)}
              className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-all ${active === label ? 'bg-emerald-500/20 text-emerald-400' : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'}`}>
              <span>{icon}</span><span className="flex-1 text-left">{label}</span>
              {badge && <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400">{badge}</span>}
            </button>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

function StocksSidebarPortfolioPreview() {
  const [active, setActive] = useState('AAPL');
  const holdings = [
    { ticker: 'AAPL', name: 'Apple', price: '$182', change: '+1.4%', up: true },
    { ticker: 'MSFT', name: 'Microsoft', price: '$374', change: '+0.8%', up: true },
    { ticker: 'GOOGL', name: 'Alphabet', price: '$140', change: '-0.3%', up: false },
    { ticker: 'NVDA', name: 'NVIDIA', price: '$498', change: '+3.2%', up: true },
    { ticker: 'TSLA', name: 'Tesla', price: '$248', change: '-1.8%', up: false },
  ];
  return (
    <PreviewWrap bg="bg-zinc-900">
      <div className="flex h-[280px] w-[230px] flex-col rounded-2xl bg-[#0f1117] shadow-xl border border-zinc-800 overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-800"><p className="text-xs font-bold text-white">💼 Holdings</p></div>
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
          {holdings.map(({ ticker, name, price, change, up }) => (
            <button key={ticker} onClick={() => setActive(ticker)}
              className={`w-full flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs transition-all ${active === ticker ? 'bg-zinc-800' : 'hover:bg-zinc-800/60'}`}>
              <div className="h-6 w-6 rounded-md bg-zinc-700 flex items-center justify-center text-[9px] font-bold text-zinc-200 shrink-0">{ticker.slice(0, 2)}</div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-semibold text-zinc-200 text-[11px]">{ticker}</p>
                <p className="text-[9px] text-zinc-500 truncate">{name}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-zinc-200 text-[11px]">{price}</p>
                <p className={`text-[9px] font-semibold ${up ? 'text-emerald-400' : 'text-red-400'}`}>{change}</p>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

function StocksSidebarWatchlistPreview() {
  const [active, setActive] = useState('Tech');
  const lists = ['Tech', 'ETFs', 'Crypto', 'Dividends'];
  const items: Record<string, { t: string; c: string; up: boolean }[]> = {
    Tech: [{ t: 'AAPL', c: '+1.4%', up: true }, { t: 'META', c: '+2.1%', up: true }, { t: 'AMD', c: '-0.9%', up: false }],
    ETFs: [{ t: 'SPY', c: '+0.4%', up: true }, { t: 'QQQ', c: '+0.7%', up: true }],
    Crypto: [{ t: 'BTC', c: '+3.8%', up: true }, { t: 'ETH', c: '-1.2%', up: false }],
    Dividends: [{ t: 'JNJ', c: '+0.2%', up: true }, { t: 'KO', c: '+0.1%', up: true }],
  };
  return (
    <PreviewWrap bg="bg-zinc-900">
      <div className="flex h-[280px] w-[210px] flex-col rounded-2xl bg-[#0f1117] shadow-xl border border-zinc-800 overflow-hidden">
        <div className="px-3 py-2.5 border-b border-zinc-800">
          <p className="text-xs font-bold text-white mb-2">👁️ Watchlist</p>
          <div className="flex gap-1">
            {lists.map(l => (
              <button key={l} onClick={() => setActive(l)}
                className={`rounded-md px-2 py-1 text-[10px] font-semibold transition ${active === l ? 'bg-emerald-500 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}>{l}</button>
            ))}
          </div>
        </div>
        <div className="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
          {(items[active] || []).map(({ t, c, up }) => (
            <div key={t} className="flex items-center justify-between rounded-lg px-2.5 py-2 hover:bg-zinc-800 transition">
              <div className="h-6 w-6 rounded-md bg-zinc-700 flex items-center justify-center text-[9px] font-bold text-zinc-200">{t.slice(0, 2)}</div>
              <span className="flex-1 ml-2 text-xs font-semibold text-zinc-300">{t}</span>
              <span className={`text-xs font-bold ${up ? 'text-emerald-400' : 'text-red-400'}`}>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Aside Navigation — SaaS (3)
───────────────────────────────────────────── */
function SaasSidebarMainPreview() {
  const [active, setActive] = useState('Workspace');
  const [workspace, setWorkspace] = useState('Acme Inc.');
  const items = [
    { icon: '🏠', label: 'Workspace' },
    { icon: '📋', label: 'Projects', badge: '4' },
    { icon: '👥', label: 'Team' },
    { icon: '💬', label: 'Inbox', badge: '7' },
    { icon: '📊', label: 'Usage' },
    { icon: '🔌', label: 'Integrations' },
  ];
  const workspaces = ['Acme Inc.', 'Side Project', 'Personal'];
  return (
    <PreviewWrap bg="bg-slate-100">
      <div className="flex h-[280px] w-[200px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="px-3 py-3 border-b border-zinc-100">
          <select value={workspace} onChange={e => setWorkspace(e.target.value)}
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-1.5 text-xs font-semibold text-zinc-700 focus:outline-none">
            {workspaces.map(w => <option key={w}>{w}</option>)}
          </select>
        </div>
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
          {items.map(({ icon, label, badge }) => (
            <button key={label} onClick={() => setActive(label)}
              className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-all ${active === label ? 'bg-slate-900 text-white' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700'}`}>
              <span>{icon}</span><span className="flex-1 text-left">{label}</span>
              {badge && <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${active === label ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-500'}`}>{badge}</span>}
            </button>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

function SaasSidebarSettingsPreview() {
  const [active, setActive] = useState('General');
  const sections = [
    { title: 'ACCOUNT', items: ['General', 'Profile', 'Password', 'Notifications'] },
    { title: 'WORKSPACE', items: ['Members', 'Billing', 'Plans'] },
    { title: 'DEVELOPER', items: ['API Keys', 'Webhooks'] },
  ];
  return (
    <PreviewWrap bg="bg-zinc-100">
      <div className="flex h-[280px] w-[200px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-100">
          <span className="text-sm">⚙️</span>
          <p className="text-xs font-bold text-zinc-800">Settings</p>
        </div>
        <nav className="flex-1 px-2 py-2 overflow-auto space-y-2">
          {sections.map(({ title, items }) => (
            <div key={title}>
              <p className="px-2.5 mb-0.5 text-[9px] font-bold tracking-widest text-zinc-400">{title}</p>
              {items.map(item => (
                <button key={item} onClick={() => setActive(item)}
                  className={`w-full text-left rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${active === item ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700'}`}>{item}</button>
              ))}
            </div>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

function SaasSidebarAdminPreview() {
  const [active, setActive] = useState('Users');
  const items = [
    { icon: '👥', label: 'Users', badge: '2.4K' },
    { icon: '💳', label: 'Subscriptions', badge: '1.1K' },
    { icon: '🏢', label: 'Organizations' },
    { icon: '🚦', label: 'Feature Flags' },
    { icon: '📊', label: 'MRR & Revenue' },
    { icon: '🔔', label: 'System Alerts', badge: '3' },
    { icon: '📋', label: 'Audit Logs' },
  ];
  return (
    <PreviewWrap bg="bg-rose-50">
      <div className="flex h-[280px] w-[200px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-100 bg-rose-600 flex items-center gap-2">
          <span className="text-white text-xs font-bold">🔑 Admin Panel</span>
        </div>
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
          {items.map(({ icon, label, badge }) => (
            <button key={label} onClick={() => setActive(label)}
              className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-all ${active === label ? 'bg-rose-50 text-rose-700' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700'}`}>
              <span>{icon}</span><span className="flex-1 text-left">{label}</span>
              {badge && <span className="rounded-full bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold text-rose-500">{badge}</span>}
            </button>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

/* ─────────────────────────────────────────────
   Aside Navigation — Logistics (3)
───────────────────────────────────────────── */
function LogisticsSidebarMainPreview() {
  const [active, setActive] = useState('Shipments');
  const items = [
    { icon: '📦', label: 'Shipments', badge: '18' },
    { icon: '🗺️', label: 'Routes' },
    { icon: '🚚', label: 'Fleet', badge: '6' },
    { icon: '🏭', label: 'Warehouses' },
    { icon: '🔍', label: 'Tracking' },
    { icon: '📊', label: 'Reports' },
    { icon: '⚙️', label: 'Settings' },
  ];
  return (
    <PreviewWrap bg="bg-teal-50">
      <div className="flex h-[280px] w-[200px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3.5 border-b border-zinc-100 bg-teal-700">
          <span className="text-xs font-bold text-white">🚛 LogiTrack</span>
        </div>
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
          {items.map(({ icon, label, badge }) => (
            <button key={label} onClick={() => setActive(label)}
              className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-all ${active === label ? 'bg-teal-50 text-teal-700' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700'}`}>
              <span>{icon}</span><span className="flex-1 text-left">{label}</span>
              {badge && <span className="rounded-full bg-teal-100 px-1.5 py-0.5 text-[10px] font-bold text-teal-600">{badge}</span>}
            </button>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

function LogisticsSidebarShipmentsPreview() {
  const [active, setActive] = useState('In Transit');
  const statuses = [
    { label: 'All Shipments', count: 142, dot: 'bg-zinc-400' },
    { label: 'In Transit', count: 58, dot: 'bg-blue-500' },
    { label: 'Out for Delivery', count: 12, dot: 'bg-amber-500' },
    { label: 'Delivered', count: 64, dot: 'bg-emerald-500' },
    { label: 'Delayed', count: 6, dot: 'bg-red-500' },
    { label: 'Returned', count: 2, dot: 'bg-zinc-400' },
  ];
  return (
    <PreviewWrap bg="bg-blue-50">
      <div className="flex h-[280px] w-[210px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-100">
          <p className="text-xs font-bold text-zinc-800">📦 Shipments</p>
          <p className="text-[10px] text-zinc-400 mt-0.5">142 total this month</p>
        </div>
        <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
          {statuses.map(({ label, count, dot }) => (
            <button key={label} onClick={() => setActive(label)}
              className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs transition-all ${active === label ? 'bg-blue-50 text-blue-700' : 'text-zinc-600 hover:bg-zinc-50'}`}>
              <span className={`h-2 w-2 rounded-full shrink-0 ${dot}`} />
              <span className="flex-1 text-left font-medium">{label}</span>
              <span className="font-bold text-zinc-500 text-[10px]">{count}</span>
            </button>
          ))}
        </nav>
      </div>
    </PreviewWrap>
  );
}

function LogisticsSidebarFleetPreview() {
  const [active, setActive] = useState('TRK-001');
  const fleet = [
    { id: 'TRK-001', driver: 'Mike R.', status: 'On Route', pct: 68, color: 'bg-emerald-400' },
    { id: 'TRK-002', driver: 'Sara L.', status: 'Loading', pct: 0, color: 'bg-amber-400' },
    { id: 'TRK-003', driver: 'James P.', status: 'On Route', pct: 35, color: 'bg-emerald-400' },
    { id: 'TRK-004', driver: 'Ana V.', status: 'Idle', pct: 0, color: 'bg-zinc-300' },
  ];
  return (
    <PreviewWrap bg="bg-green-50">
      <div className="flex h-[280px] w-[230px] flex-col rounded-2xl bg-white shadow-lg border border-zinc-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-100"><p className="text-xs font-bold text-zinc-800">🚚 Fleet Status</p></div>
        <nav className="flex-1 px-2 py-2 space-y-1 overflow-auto">
          {fleet.map(({ id, driver, status, pct, color }) => (
            <button key={id} onClick={() => setActive(id)}
              className={`w-full rounded-lg px-2.5 py-2 text-left transition-all ${active === id ? 'bg-teal-50 border border-teal-200' : 'hover:bg-zinc-50 border border-transparent'}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-zinc-800">{id}</span>
                <span className={`text-[9px] font-semibold rounded-full px-2 py-0.5 ${status === 'On Route' ? 'bg-emerald-100 text-emerald-700' : status === 'Loading' ? 'bg-amber-100 text-amber-700' : 'bg-zinc-100 text-zinc-500'}`}>{status}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 rounded-full bg-zinc-100"><div className={`h-1 rounded-full ${color}`} style={{ width: `${pct}%` }} /></div>
                <span className="text-[10px] text-zinc-400 shrink-0">{driver}</span>
              </div>
            </button>
          ))}
        </nav>
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
    Preview: ListGroupV2Preview,
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
    Preview: ImageGalleryV2Preview,
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
    Preview: VideoCardV2Preview,
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
    Preview: DonutChartV2Preview,
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
    Preview: BarChartV2Preview,
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
    Preview: HeatmapV2Preview,
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
    Preview: AvatarGroupV2Preview,
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

  /* ── Aside Navigation — Dashboard ── */
  {
    id: 'dash-sidebar-minimal', name: 'Dashboard Sidebar — Minimal', category: 'Aside Nav',
    description: 'Clean icon-and-label sidebar with active highlight and notification badge.',
    Preview: DashSidebarMinimalPreview,
    tailwind: `<aside class="flex h-72 w-48 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="flex items-center gap-2 border-b border-zinc-100 px-4 py-3.5">
    <div class="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">D</div>
    <span class="text-sm font-bold text-zinc-800">Dashboard</span>
  </div>
  <nav class="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
    <a href="#" class="flex items-center gap-2.5 rounded-lg bg-indigo-50 px-2.5 py-2 text-xs font-medium text-indigo-700">
      <span>⊞</span> Dashboard
    </a>
    <a href="#" class="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700">
      <span>📊</span> Analytics
    </a>
    <a href="#" class="flex items-center justify-between gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700">
      <span class="flex items-center gap-2.5"><span>💬</span> Messages</span>
      <span class="rounded-full bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold text-indigo-600">4</span>
    </a>
  </nav>
</aside>`,
    css: `.dash-aside { display:flex; flex-direction:column; height:18rem; width:12rem; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; box-shadow:0 4px 24px rgba(0,0,0,.06); overflow:hidden; }
.dash-aside-header { display:flex; align-items:center; gap:.5rem; border-bottom:1px solid #f4f4f5; padding:.875rem 1rem; }
.dash-aside-logo { height:1.75rem; width:1.75rem; border-radius:.5rem; background:#4f46e5; display:flex; align-items:center; justify-content:center; color:#fff; font-size:.75rem; font-weight:700; }
.dash-aside-nav { flex:1; padding:.5rem; display:flex; flex-direction:column; gap:.125rem; overflow:auto; }
.dash-aside-item { display:flex; align-items:center; gap:.625rem; border-radius:.5rem; padding:.5rem .625rem; font-size:.75rem; font-weight:500; text-decoration:none; color:#71717a; transition:background .15s, color .15s; }
.dash-aside-item:hover { background:#fafafa; color:#27272a; }
.dash-aside-item.active { background:#eef2ff; color:#4338ca; }
.dash-aside-badge { border-radius:9999px; background:#e0e7ff; padding:.125rem .375rem; font-size:.625rem; font-weight:700; color:#4338ca; }`,
  },
  {
    id: 'dash-sidebar-grouped', name: 'Dashboard Sidebar — Grouped', category: 'Aside Nav',
    description: 'Sidebar with section headings grouping related nav items.',
    Preview: DashSidebarGroupedPreview,
    tailwind: `<aside class="flex h-72 w-48 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="flex items-center gap-2 border-b border-zinc-100 px-4 py-3.5">
    <div class="h-7 w-7 rounded-lg bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">A</div>
    <span class="text-sm font-bold text-zinc-800">Acme Co.</span>
  </div>
  <nav class="flex-1 px-2 py-2 overflow-auto space-y-3">
    <div>
      <p class="px-2.5 mb-1 text-[9px] font-bold tracking-widest text-zinc-400">MAIN</p>
      <a href="#" class="flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-medium text-emerald-700"><span>🏠</span> Overview</a>
      <a href="#" class="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-500 hover:bg-zinc-50"><span>📈</span> Revenue</a>
    </div>
    <div>
      <p class="px-2.5 mb-1 text-[9px] font-bold tracking-widest text-zinc-400">REPORTS</p>
      <a href="#" class="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-500 hover:bg-zinc-50"><span>📋</span> Weekly</a>
    </div>
  </nav>
</aside>`,
    css: `.grouped-aside { display:flex; flex-direction:column; height:18rem; width:12rem; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; box-shadow:0 4px 24px rgba(0,0,0,.06); overflow:hidden; }
.grouped-aside-section-title { padding:.125rem .625rem .25rem; font-size:.5625rem; font-weight:700; letter-spacing:.1em; color:#a1a1aa; }
.grouped-aside-item { display:flex; align-items:center; gap:.5rem; border-radius:.5rem; padding:.375rem .625rem; font-size:.75rem; font-weight:500; color:#71717a; text-decoration:none; transition:background .15s; }
.grouped-aside-item:hover { background:#fafafa; }
.grouped-aside-item.active { background:#ecfdf5; color:#059669; }`,
  },
  {
    id: 'dash-sidebar-dark', name: 'Dashboard Sidebar — Dark Collapsible', category: 'Aside Nav',
    description: 'Dark sidebar with collapse toggle, badges, and user profile footer.',
    Preview: DashSidebarFullPreview,
    tailwind: `<aside class="flex h-72 w-48 flex-col rounded-2xl bg-slate-900 shadow-xl overflow-hidden">
  <div class="flex items-center justify-between border-b border-slate-700/50 px-3 py-3.5">
    <div class="flex items-center gap-2">
      <div class="h-6 w-6 rounded-md bg-violet-500 flex items-center justify-center text-white text-[10px] font-bold">V</div>
      <span class="text-xs font-bold text-white">Vertex</span>
    </div>
    <button class="text-slate-400 hover:text-white text-xs">←</button>
  </div>
  <nav class="flex-1 px-1.5 py-2 space-y-0.5">
    <a href="#" class="flex items-center gap-2.5 rounded-lg bg-violet-600 px-2 py-2 text-xs font-medium text-white"><span>⊞</span> Dashboard</a>
    <a href="#" class="flex items-center justify-between rounded-lg px-2 py-2 text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white">
      <span class="flex items-center gap-2.5"><span>📊</span> Analytics</span>
      <span class="rounded-md bg-violet-500 px-1.5 text-[9px] font-bold text-white">New</span>
    </a>
  </nav>
  <div class="flex items-center gap-2 border-t border-slate-700/50 px-3 py-3">
    <div class="h-6 w-6 rounded-full bg-violet-400 flex items-center justify-center text-[10px] font-bold text-white">JD</div>
    <div><p class="text-[10px] font-semibold text-white">Jane Doe</p><p class="text-[9px] text-slate-400">Admin</p></div>
  </div>
</aside>`,
    css: `.dark-aside { display:flex; flex-direction:column; height:18rem; background:#0f172a; border-radius:1rem; box-shadow:0 8px 32px rgba(0,0,0,.3); overflow:hidden; }
.dark-aside-item { display:flex; align-items:center; gap:.625rem; border-radius:.5rem; padding:.5rem; font-size:.75rem; font-weight:500; color:#94a3b8; text-decoration:none; transition:background .15s, color .15s; }
.dark-aside-item:hover { background:#1e293b; color:#fff; }
.dark-aside-item.active { background:#7c3aed; color:#fff; }
.dark-aside-footer { display:flex; align-items:center; gap:.5rem; border-top:1px solid rgba(255,255,255,.08); padding:.75rem; }`,
  },

  /* ── Aside Navigation — eCommerce ── */
  {
    id: 'ecom-sidebar-admin', name: 'eCommerce Admin Sidebar', category: 'Aside Nav',
    description: 'Shop admin sidebar — orders with pending badge, products, customers, payments.',
    Preview: EcomSidebarAdminPreview,
    tailwind: `<aside class="flex h-72 w-48 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="bg-orange-500 px-4 py-3.5"><span class="text-sm font-bold text-white">🛍️ ShopAdmin</span></div>
  <nav class="flex-1 px-2 py-2 space-y-0.5">
    <a href="#" class="flex items-center justify-between rounded-lg bg-orange-50 px-2.5 py-2 text-xs font-medium text-orange-700">
      <span class="flex items-center gap-2"><span>🛒</span> Orders</span>
      <span class="rounded-full bg-orange-100 px-1.5 py-0.5 text-[10px] font-bold text-orange-600">23</span>
    </a>
    <a href="#" class="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-zinc-500 hover:bg-zinc-50"><span>📦</span> Products</a>
    <a href="#" class="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-zinc-500 hover:bg-zinc-50"><span>👥</span> Customers</a>
    <a href="#" class="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-zinc-500 hover:bg-zinc-50"><span>💳</span> Payments</a>
  </nav>
</aside>`,
    css: `.ecom-aside { display:flex; flex-direction:column; height:18rem; width:12rem; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,.06); }
.ecom-aside-header { background:#f97316; padding:.875rem 1rem; }
.ecom-aside-item { display:flex; align-items:center; justify-content:space-between; border-radius:.5rem; padding:.5rem .625rem; font-size:.75rem; font-weight:500; color:#71717a; text-decoration:none; transition:background .15s; }
.ecom-aside-item:hover { background:#fafafa; }
.ecom-aside-item.active { background:#fff7ed; color:#c2410c; }
.ecom-aside-badge { border-radius:9999px; background:#ffedd5; padding:.125rem .375rem; font-size:.625rem; font-weight:700; color:#ea580c; }`,
  },
  {
    id: 'ecom-sidebar-store', name: 'eCommerce Store Category Sidebar', category: 'Aside Nav',
    description: 'Storefront category filter sidebar with product counts and search.',
    Preview: EcomSidebarStorePreview,
    tailwind: `<aside class="flex h-72 w-48 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="border-b border-zinc-100 px-3 py-3">
    <p class="mb-2 text-xs font-bold text-zinc-700">Categories</p>
    <div class="flex items-center gap-1.5 rounded-lg bg-zinc-100 px-2.5 py-1.5 text-xs text-zinc-400">🔍 Search...</div>
  </div>
  <nav class="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
    <a href="#" class="flex items-center justify-between rounded-lg bg-rose-50 px-2.5 py-1.5 text-xs font-medium text-rose-700">
      <span>All Products</span><span class="text-[10px] text-rose-400">248</span>
    </a>
    <a href="#" class="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-500 hover:bg-zinc-50">
      <span>Electronics</span><span class="text-[10px] text-zinc-400">64</span>
    </a>
    <a href="#" class="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-500 hover:bg-zinc-50">
      <span>Clothing</span><span class="text-[10px] text-zinc-400">91</span>
    </a>
  </nav>
</aside>`,
    css: `.store-aside { display:flex; flex-direction:column; height:18rem; width:12rem; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.store-aside-item { display:flex; align-items:center; justify-content:space-between; border-radius:.5rem; padding:.375rem .625rem; font-size:.75rem; font-weight:500; color:#71717a; text-decoration:none; transition:background .15s; }
.store-aside-item:hover { background:#fafafa; }
.store-aside-item.active { background:#fff1f2; color:#be123c; }`,
  },
  {
    id: 'ecom-sidebar-catalog', name: 'eCommerce Catalog Tree Sidebar', category: 'Aside Nav',
    description: 'Expandable product category tree with nested sub-categories.',
    Preview: EcomSidebarCatalogPreview,
    tailwind: `<aside class="flex h-72 w-48 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="border-b border-zinc-100 px-4 py-3"><p class="text-xs font-bold text-zinc-800">📂 Catalog</p></div>
  <nav class="flex-1 px-2 py-2 overflow-auto">
    <button class="w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50">
      <span>Electronics</span><span class="text-zinc-400 text-[10px]">▾</span>
    </button>
    <div class="ml-3 border-l border-zinc-200 pl-2 space-y-0.5">
      <a href="#" class="block rounded-md px-2 py-1.5 text-xs font-semibold text-amber-700">Smartphones</a>
      <a href="#" class="block rounded-md px-2 py-1.5 text-xs text-zinc-500 hover:text-zinc-700">Laptops</a>
    </div>
  </nav>
</aside>`,
    css: `.catalog-aside { display:flex; flex-direction:column; height:18rem; width:12rem; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.catalog-aside-parent { display:flex; align-items:center; justify-content:space-between; border-radius:.5rem; padding:.375rem .625rem; font-size:.75rem; font-weight:600; color:#27272a; cursor:pointer; }
.catalog-aside-parent:hover { background:#fafafa; }
.catalog-aside-children { margin-left:.75rem; border-left:1px solid #e4e4e7; padding-left:.5rem; }
.catalog-aside-child { display:block; border-radius:.375rem; padding:.375rem .5rem; font-size:.75rem; color:#71717a; text-decoration:none; transition:color .15s; }
.catalog-aside-child:hover { color:#27272a; }
.catalog-aside-child.active { color:#b45309; font-weight:700; }`,
  },

  /* ── Aside Navigation — Analytics ── */
  {
    id: 'analytics-sidebar-main', name: 'Analytics Sidebar', category: 'Aside Nav',
    description: 'Analytics platform sidebar — traffic, funnels, cohorts, heatmaps.',
    Preview: AnalyticsSidebarMainPreview,
    tailwind: `<aside class="flex h-72 w-48 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="flex items-center gap-2 border-b border-zinc-100 px-4 py-3.5">
    <div class="h-6 w-6 rounded-md bg-violet-600 flex items-center justify-center text-white text-[10px] font-bold">A</div>
    <span class="text-xs font-bold text-zinc-800">Analytics Pro</span>
  </div>
  <nav class="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
    <a href="#" class="flex items-center gap-2.5 rounded-lg bg-violet-600 px-2.5 py-2 text-xs font-medium text-white"><span>📊</span> Overview</a>
    <a href="#" class="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-zinc-500 hover:bg-violet-50 hover:text-violet-700"><span>👁️</span> Traffic</a>
    <a href="#" class="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium text-zinc-500 hover:bg-violet-50 hover:text-violet-700"><span>🔄</span> Funnels</a>
  </nav>
</aside>`,
    css: `.analytics-aside { display:flex; flex-direction:column; height:18rem; width:12rem; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.analytics-aside-item { display:flex; align-items:center; gap:.625rem; border-radius:.5rem; padding:.5rem .625rem; font-size:.75rem; font-weight:500; color:#71717a; text-decoration:none; transition:background .15s, color .15s; }
.analytics-aside-item:hover { background:#f5f3ff; color:#6d28d9; }
.analytics-aside-item.active { background:#7c3aed; color:#fff; }`,
  },
  {
    id: 'analytics-sidebar-metrics', name: 'Analytics Metrics Nav', category: 'Aside Nav',
    description: 'Sidebar showing key metrics with live values and trend indicators.',
    Preview: AnalyticsSidebarMetricsPreview,
    tailwind: `<aside class="flex h-72 w-56 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="border-b border-zinc-100 px-4 py-3"><p class="text-xs font-bold text-zinc-800">📈 Key Metrics</p></div>
  <nav class="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
    <a href="#" class="flex items-center justify-between rounded-lg bg-blue-50 px-2.5 py-2 text-xs text-blue-700">
      <span class="font-medium">Sessions</span>
      <span class="flex items-center gap-1.5"><span class="font-bold text-zinc-800">24.3K</span><span class="text-[10px] font-semibold text-emerald-600">+12%</span></span>
    </a>
    <a href="#" class="flex items-center justify-between rounded-lg px-2.5 py-2 text-xs text-zinc-600 hover:bg-zinc-50">
      <span class="font-medium">Revenue</span>
      <span class="flex items-center gap-1.5"><span class="font-bold text-zinc-800">$8.4K</span><span class="text-[10px] font-semibold text-emerald-600">+22%</span></span>
    </a>
  </nav>
</aside>`,
    css: `.metrics-aside { display:flex; flex-direction:column; height:18rem; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.metrics-aside-item { display:flex; align-items:center; justify-content:space-between; border-radius:.5rem; padding:.5rem .625rem; font-size:.75rem; color:#52525b; text-decoration:none; transition:background .15s; }
.metrics-aside-item:hover { background:#fafafa; }
.metrics-aside-item.active { background:#eff6ff; color:#1d4ed8; }
.metrics-aside-trend.up { color:#16a34a; font-size:.625rem; font-weight:700; }
.metrics-aside-trend.down { color:#dc2626; font-size:.625rem; font-weight:700; }`,
  },
  {
    id: 'analytics-sidebar-reports', name: 'Analytics Reports Sidebar', category: 'Aside Nav',
    description: 'Folder-based report library sidebar with expand/collapse tree.',
    Preview: AnalyticsSidebarReportsPreview,
    tailwind: `<aside class="flex h-72 w-48 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="border-b border-zinc-100 px-4 py-3"><p class="text-xs font-bold text-zinc-800">📁 Reports</p></div>
  <nav class="flex-1 px-2 py-2 overflow-auto">
    <button class="w-full flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50">
      <span>📂</span><span class="flex-1 text-left">Quarterly</span><span class="text-zinc-400 text-[10px]">▾</span>
    </button>
    <div class="ml-3 border-l-2 border-indigo-100 pl-2 space-y-0.5">
      <a href="#" class="block rounded-md px-2 py-1.5 text-xs font-bold text-indigo-700">Q1 Summary</a>
      <a href="#" class="block rounded-md px-2 py-1.5 text-xs text-zinc-500 hover:text-zinc-700">Q2 Summary</a>
    </div>
  </nav>
</aside>`,
    css: `.reports-aside { display:flex; flex-direction:column; height:18rem; width:12rem; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.reports-aside-folder { display:flex; align-items:center; gap:.375rem; border-radius:.5rem; padding:.375rem .625rem; font-size:.75rem; font-weight:600; color:#27272a; cursor:pointer; }
.reports-aside-folder:hover { background:#fafafa; }
.reports-aside-tree { margin-left:.75rem; border-left:2px solid #e0e7ff; padding-left:.5rem; }
.reports-aside-file { display:block; border-radius:.375rem; padding:.375rem .5rem; font-size:.75rem; color:#71717a; text-decoration:none; }
.reports-aside-file.active { color:#4338ca; font-weight:700; }`,
  },

  /* ── Aside Navigation — Marketing ── */
  {
    id: 'marketing-sidebar-main', name: 'Marketing Hub Sidebar', category: 'Aside Nav',
    description: 'Marketing platform sidebar with campaigns, email, social, SEO, and A/B tests.',
    Preview: MarketingSidebarMainPreview,
    tailwind: `<aside class="flex h-72 w-48 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="bg-gradient-to-r from-pink-500 to-rose-500 px-4 py-3.5"><span class="text-xs font-bold text-white">🎯 Marketing Hub</span></div>
  <nav class="flex-1 px-2 py-2 space-y-0.5">
    <a href="#" class="flex items-center justify-between rounded-lg bg-pink-50 px-2.5 py-2 text-xs font-medium text-pink-700">
      <span class="flex items-center gap-2"><span>🚀</span> Campaigns</span>
      <span class="rounded-full bg-pink-100 px-1.5 py-0.5 text-[10px] font-bold text-pink-600">3 live</span>
    </a>
    <a href="#" class="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-zinc-500 hover:bg-zinc-50"><span>📧</span> Email</a>
    <a href="#" class="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-zinc-500 hover:bg-zinc-50"><span>🔍</span> SEO</a>
  </nav>
</aside>`,
    css: `.mktg-aside { display:flex; flex-direction:column; height:18rem; width:12rem; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.mktg-aside-header { background:linear-gradient(90deg,#ec4899,#f43f5e); padding:.875rem 1rem; }
.mktg-aside-item { display:flex; align-items:center; gap:.5rem; border-radius:.5rem; padding:.5rem .625rem; font-size:.75rem; font-weight:500; color:#71717a; text-decoration:none; transition:background .15s; }
.mktg-aside-item:hover { background:#fafafa; }
.mktg-aside-item.active { background:#fdf2f8; color:#be185d; }`,
  },
  {
    id: 'marketing-sidebar-campaigns', name: 'Campaign Manager Sidebar', category: 'Aside Nav',
    description: 'List of campaigns with live/draft/scheduled status indicators.',
    Preview: MarketingSidebarCampaignsPreview,
    tailwind: `<aside class="flex h-72 w-52 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="flex items-center justify-between border-b border-zinc-100 px-3 py-3">
    <p class="text-xs font-bold text-zinc-800">🚀 Campaigns</p>
    <span class="rounded-md bg-fuchsia-100 px-2 py-0.5 text-[10px] font-bold text-fuchsia-700">2 Live</span>
  </div>
  <nav class="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
    <a href="#" class="flex items-center gap-2.5 rounded-lg bg-fuchsia-50 px-2.5 py-2 text-xs text-fuchsia-700">
      <span class="h-2 w-2 rounded-full bg-green-400 shrink-0"></span>
      <span class="flex-1 font-medium">Summer Sale</span><span class="text-[10px] text-zinc-400">Live</span>
    </a>
    <a href="#" class="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs text-zinc-600 hover:bg-zinc-50">
      <span class="h-2 w-2 rounded-full bg-zinc-300 shrink-0"></span>
      <span class="flex-1 font-medium">Newsletter #24</span><span class="text-[10px] text-zinc-400">Draft</span>
    </a>
  </nav>
</aside>`,
    css: `.campaigns-aside { display:flex; flex-direction:column; height:18rem; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.campaigns-aside-item { display:flex; align-items:center; gap:.625rem; border-radius:.5rem; padding:.5rem .625rem; font-size:.75rem; color:#52525b; text-decoration:none; transition:background .15s; }
.campaigns-aside-item:hover { background:#fafafa; }
.campaigns-aside-item.active { background:#fdf4ff; color:#a21caf; }
.campaign-dot { height:.5rem; width:.5rem; border-radius:9999px; flex-shrink:0; }
.campaign-dot.live { background:#4ade80; }
.campaign-dot.draft { background:#d4d4d8; }
.campaign-dot.scheduled { background:#fbbf24; }`,
  },
  {
    id: 'marketing-sidebar-channels', name: 'Marketing Channels Sidebar', category: 'Aside Nav',
    description: 'Channel performance sidebar with reach stats and progress bars.',
    Preview: MarketingSidebarChannelsPreview,
    tailwind: `<aside class="flex h-72 w-56 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="border-b border-zinc-100 px-4 py-3"><p class="text-xs font-bold text-zinc-800">📡 Channels</p></div>
  <nav class="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
    <a href="#" class="block rounded-lg bg-cyan-50 px-2.5 py-2">
      <div class="flex items-center gap-2 mb-1">
        <span>📧</span><span class="text-xs font-semibold flex-1 text-cyan-700">Email</span><span class="text-[10px] font-bold text-zinc-500">14.2K</span>
      </div>
      <div class="h-1 w-full rounded-full bg-zinc-100"><div class="h-1 rounded-full bg-cyan-400" style="width:74%"></div></div>
    </a>
    <a href="#" class="block rounded-lg px-2.5 py-2 hover:bg-zinc-50">
      <div class="flex items-center gap-2 mb-1">
        <span>📸</span><span class="text-xs font-semibold flex-1 text-zinc-700">Instagram</span><span class="text-[10px] font-bold text-zinc-500">11K</span>
      </div>
      <div class="h-1 w-full rounded-full bg-zinc-100"><div class="h-1 rounded-full bg-cyan-300" style="width:58%"></div></div>
    </a>
  </nav>
</aside>`,
    css: `.channels-aside { display:flex; flex-direction:column; height:18rem; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.channel-item { display:block; border-radius:.5rem; padding:.5rem .625rem; text-decoration:none; transition:background .15s; }
.channel-item:hover { background:#fafafa; }
.channel-item.active { background:#ecfeff; }
.channel-bar-bg { height:.25rem; width:100%; border-radius:9999px; background:#f4f4f5; margin-top:.25rem; }
.channel-bar-fill { height:.25rem; border-radius:9999px; background:#22d3ee; }`,
  },

  /* ── Aside Navigation — CRM ── */
  {
    id: 'crm-sidebar-main', name: 'CRM Sidebar', category: 'Aside Nav',
    description: 'CRM sidebar with contacts, companies, deals, and activity counts.',
    Preview: CrmSidebarMainPreview,
    tailwind: `<aside class="flex h-72 w-48 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="bg-blue-600 px-4 py-3.5"><span class="text-xs font-bold text-white">🤝 CRM Suite</span></div>
  <nav class="flex-1 px-2 py-2 space-y-0.5">
    <a href="#" class="flex items-center justify-between rounded-lg bg-blue-50 px-2.5 py-2 text-xs font-medium text-blue-700">
      <span class="flex items-center gap-2"><span>👤</span> Contacts</span>
      <span class="rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold text-blue-500">1.2K</span>
    </a>
    <a href="#" class="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-zinc-500 hover:bg-zinc-50"><span>🏢</span> Companies</a>
    <a href="#" class="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-zinc-500 hover:bg-zinc-50"><span>💼</span> Deals</a>
  </nav>
</aside>`,
    css: `.crm-aside { display:flex; flex-direction:column; height:18rem; width:12rem; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.crm-aside-header { background:#2563eb; padding:.875rem 1rem; }
.crm-aside-item { display:flex; align-items:center; gap:.5rem; border-radius:.5rem; padding:.5rem .625rem; font-size:.75rem; font-weight:500; color:#71717a; text-decoration:none; transition:background .15s; }
.crm-aside-item:hover { background:#fafafa; }
.crm-aside-item.active { background:#eff6ff; color:#1d4ed8; }`,
  },
  {
    id: 'crm-sidebar-pipeline', name: 'CRM Pipeline Sidebar', category: 'Aside Nav',
    description: 'Pipeline stage sidebar showing deal counts and total value per stage.',
    Preview: CrmSidebarPipelinePreview,
    tailwind: `<aside class="flex h-72 w-56 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="border-b border-zinc-100 px-4 py-3"><p class="text-xs font-bold text-zinc-800">💼 Pipeline</p></div>
  <nav class="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
    <a href="#" class="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-zinc-600 hover:bg-zinc-50">
      <span class="h-2.5 w-2.5 rounded-sm bg-zinc-200"></span><span class="flex-1 font-medium">Lead</span><span class="text-[10px] text-zinc-400">42</span><span class="text-[10px] font-bold text-zinc-600">$0</span>
    </a>
    <a href="#" class="flex items-center gap-2 rounded-lg bg-indigo-50 px-2.5 py-2 text-xs text-indigo-700">
      <span class="h-2.5 w-2.5 rounded-sm bg-indigo-300"></span><span class="flex-1 font-medium">Proposal</span><span class="text-[10px] text-zinc-400">9</span><span class="text-[10px] font-bold text-zinc-600">$88K</span>
    </a>
  </nav>
</aside>`,
    css: `.pipeline-aside { display:flex; flex-direction:column; height:18rem; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.pipeline-stage { display:flex; align-items:center; gap:.5rem; border-radius:.5rem; padding:.5rem .625rem; font-size:.75rem; color:#52525b; text-decoration:none; transition:background .15s; }
.pipeline-stage:hover { background:#fafafa; }
.pipeline-stage.active { background:#eef2ff; color:#4338ca; }
.stage-dot { height:.625rem; width:.625rem; border-radius:.125rem; flex-shrink:0; }`,
  },
  {
    id: 'crm-sidebar-contacts', name: 'CRM Contacts Filter Sidebar', category: 'Aside Nav',
    description: 'Contact type filter sidebar with search and recently viewed contacts.',
    Preview: CrmSidebarContactsPreview,
    tailwind: `<aside class="flex h-72 w-48 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="border-b border-zinc-100 px-3 py-3">
    <p class="text-xs font-bold text-zinc-800 mb-2">👤 Contacts</p>
    <div class="flex items-center gap-1.5 rounded-lg bg-zinc-100 px-2.5 py-1.5 text-xs text-zinc-400">🔍 Search contacts...</div>
  </div>
  <div class="px-2 py-1.5 space-y-0.5">
    <a href="#" class="flex items-center justify-between rounded-lg bg-sky-50 px-2.5 py-1.5 text-xs font-medium text-sky-700"><span>All</span><span class="text-[10px] text-zinc-400">1248</span></a>
    <a href="#" class="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-500 hover:bg-zinc-50"><span>Leads</span><span class="text-[10px] text-zinc-400">312</span></a>
  </div>
</aside>`,
    css: `.contacts-aside { display:flex; flex-direction:column; height:18rem; width:12rem; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.contacts-aside-filter { display:flex; align-items:center; justify-content:space-between; border-radius:.5rem; padding:.375rem .625rem; font-size:.75rem; font-weight:500; color:#71717a; text-decoration:none; transition:background .15s; }
.contacts-aside-filter:hover { background:#fafafa; }
.contacts-aside-filter.active { background:#f0f9ff; color:#0369a1; }`,
  },

  /* ── Aside Navigation — Stocks ── */
  {
    id: 'stocks-sidebar-main', name: 'Trading App Sidebar', category: 'Aside Nav',
    description: 'Dark-mode trading sidebar — portfolio, watchlist, markets, alerts.',
    Preview: StocksSidebarMainPreview,
    tailwind: `<aside class="flex h-72 w-48 flex-col rounded-2xl bg-[#0f1117] shadow-xl border border-zinc-800 overflow-hidden">
  <div class="flex items-center gap-2 border-b border-zinc-800 px-4 py-3.5">
    <div class="h-6 w-6 rounded-md bg-emerald-500 flex items-center justify-center text-white text-[10px] font-bold">T</div>
    <span class="text-xs font-bold text-white">TradeView</span>
  </div>
  <nav class="flex-1 px-1.5 py-2 space-y-0.5">
    <a href="#" class="flex items-center gap-2.5 rounded-lg bg-emerald-500/20 px-2.5 py-2 text-xs font-medium text-emerald-400"><span>💼</span> Portfolio</a>
    <a href="#" class="flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white">
      <span class="flex items-center gap-2.5"><span>👁️</span> Watchlist</span>
      <span class="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400">8</span>
    </a>
  </nav>
</aside>`,
    css: `.trading-aside { display:flex; flex-direction:column; height:18rem; width:12rem; border-radius:1rem; background:#0f1117; border:1px solid #27272a; overflow:hidden; }
.trading-aside-item { display:flex; align-items:center; gap:.625rem; border-radius:.5rem; padding:.5rem .625rem; font-size:.75rem; font-weight:500; color:#71717a; text-decoration:none; transition:background .15s, color .15s; }
.trading-aside-item:hover { background:#1c1c27; color:#fff; }
.trading-aside-item.active { background:rgba(16,185,129,.15); color:#34d399; }`,
  },
  {
    id: 'stocks-sidebar-portfolio', name: 'Stock Portfolio Sidebar', category: 'Aside Nav',
    description: 'Portfolio holdings sidebar with ticker, price, and daily % change.',
    Preview: StocksSidebarPortfolioPreview,
    tailwind: `<aside class="flex h-72 w-56 flex-col rounded-2xl bg-[#0f1117] shadow-xl border border-zinc-800 overflow-hidden">
  <div class="border-b border-zinc-800 px-4 py-3"><p class="text-xs font-bold text-white">💼 Holdings</p></div>
  <nav class="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
    <a href="#" class="flex items-center gap-2 rounded-lg bg-zinc-800 px-2.5 py-2 text-xs">
      <div class="h-6 w-6 rounded-md bg-zinc-700 flex items-center justify-center text-[9px] font-bold text-zinc-200">AA</div>
      <div class="flex-1 min-w-0"><p class="font-semibold text-zinc-200 text-[11px]">AAPL</p><p class="text-[9px] text-zinc-500">Apple</p></div>
      <div class="text-right"><p class="font-bold text-zinc-200 text-[11px]">$182</p><p class="text-[9px] font-semibold text-emerald-400">+1.4%</p></div>
    </a>
  </nav>
</aside>`,
    css: `.portfolio-aside { display:flex; flex-direction:column; height:18rem; border-radius:1rem; background:#0f1117; border:1px solid #27272a; overflow:hidden; }
.holding-item { display:flex; align-items:center; gap:.5rem; border-radius:.5rem; padding:.5rem .625rem; text-decoration:none; transition:background .15s; }
.holding-item:hover { background:#1c1c27; }
.holding-item.active { background:#27272a; }
.holding-ticker-badge { height:1.5rem; width:1.5rem; border-radius:.375rem; background:#3f3f46; display:flex; align-items:center; justify-content:center; font-size:.5625rem; font-weight:700; color:#d4d4d8; }
.holding-change.up { color:#34d399; }
.holding-change.down { color:#f87171; }`,
  },
  {
    id: 'stocks-sidebar-watchlist', name: 'Watchlist Sidebar', category: 'Aside Nav',
    description: 'Tabbed watchlist sidebar — tech, ETFs, crypto with price change.',
    Preview: StocksSidebarWatchlistPreview,
    tailwind: `<aside class="flex h-72 w-52 flex-col rounded-2xl bg-[#0f1117] shadow-xl border border-zinc-800 overflow-hidden">
  <div class="border-b border-zinc-800 px-3 py-2.5">
    <p class="text-xs font-bold text-white mb-2">👁️ Watchlist</p>
    <div class="flex gap-1">
      <button class="rounded-md bg-emerald-500 px-2 py-1 text-[10px] font-semibold text-white">Tech</button>
      <button class="rounded-md bg-zinc-800 px-2 py-1 text-[10px] font-semibold text-zinc-400 hover:bg-zinc-700">ETFs</button>
      <button class="rounded-md bg-zinc-800 px-2 py-1 text-[10px] font-semibold text-zinc-400 hover:bg-zinc-700">Crypto</button>
    </div>
  </div>
  <div class="flex-1 px-2 py-2 space-y-0.5">
    <div class="flex items-center justify-between rounded-lg px-2.5 py-2 hover:bg-zinc-800 transition">
      <div class="h-6 w-6 rounded-md bg-zinc-700 flex items-center justify-center text-[9px] font-bold text-zinc-200">AA</div>
      <span class="flex-1 ml-2 text-xs font-semibold text-zinc-300">AAPL</span>
      <span class="text-xs font-bold text-emerald-400">+1.4%</span>
    </div>
  </div>
</aside>`,
    css: `.watchlist-aside { display:flex; flex-direction:column; height:18rem; border-radius:1rem; background:#0f1117; border:1px solid #27272a; overflow:hidden; }
.watchlist-tab { border-radius:.375rem; padding:.25rem .5rem; font-size:.625rem; font-weight:600; border:none; cursor:pointer; transition:background .15s; }
.watchlist-tab.active { background:#10b981; color:#fff; }
.watchlist-tab:not(.active) { background:#27272a; color:#71717a; }
.watchlist-row { display:flex; align-items:center; border-radius:.5rem; padding:.5rem .625rem; transition:background .15s; }
.watchlist-row:hover { background:#1c1c27; }`,
  },

  /* ── Aside Navigation — SaaS ── */
  {
    id: 'saas-sidebar-main', name: 'SaaS App Sidebar', category: 'Aside Nav',
    description: 'Workspace-switcher sidebar with projects, team, inbox, and integrations.',
    Preview: SaasSidebarMainPreview,
    tailwind: `<aside class="flex h-72 w-48 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="border-b border-zinc-100 px-3 py-3">
    <select class="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-1.5 text-xs font-semibold text-zinc-700 focus:outline-none">
      <option>Acme Inc.</option><option>Side Project</option>
    </select>
  </div>
  <nav class="flex-1 px-2 py-2 space-y-0.5">
    <a href="#" class="flex items-center gap-2.5 rounded-lg bg-slate-900 px-2.5 py-2 text-xs font-medium text-white"><span>🏠</span> Workspace</a>
    <a href="#" class="flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700">
      <span class="flex items-center gap-2"><span>📋</span> Projects</span>
      <span class="rounded-full bg-zinc-100 px-1.5 py-0.5 text-[10px] font-bold text-zinc-500">4</span>
    </a>
  </nav>
</aside>`,
    css: `.saas-aside { display:flex; flex-direction:column; height:18rem; width:12rem; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.saas-aside-item { display:flex; align-items:center; gap:.625rem; border-radius:.5rem; padding:.5rem .625rem; font-size:.75rem; font-weight:500; color:#71717a; text-decoration:none; transition:background .15s, color .15s; }
.saas-aside-item:hover { background:#fafafa; color:#27272a; }
.saas-aside-item.active { background:#18181b; color:#fff; }`,
  },
  {
    id: 'saas-sidebar-settings', name: 'SaaS Settings Sidebar', category: 'Aside Nav',
    description: 'Settings sidebar grouped into Account, Workspace, and Developer sections.',
    Preview: SaasSidebarSettingsPreview,
    tailwind: `<aside class="flex h-72 w-48 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="flex items-center gap-2 border-b border-zinc-100 px-4 py-3"><span>⚙️</span><p class="text-xs font-bold text-zinc-800">Settings</p></div>
  <nav class="flex-1 px-2 py-2 overflow-auto space-y-2">
    <div>
      <p class="px-2.5 mb-0.5 text-[9px] font-bold tracking-widest text-zinc-400">ACCOUNT</p>
      <a href="#" class="block rounded-lg bg-zinc-900 px-2.5 py-1.5 text-xs font-medium text-white">General</a>
      <a href="#" class="block rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700">Profile</a>
      <a href="#" class="block rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700">Billing</a>
    </div>
    <div>
      <p class="px-2.5 mb-0.5 text-[9px] font-bold tracking-widest text-zinc-400">DEVELOPER</p>
      <a href="#" class="block rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700">API Keys</a>
    </div>
  </nav>
</aside>`,
    css: `.settings-aside { display:flex; flex-direction:column; height:18rem; width:12rem; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.settings-aside-section { font-size:.5625rem; font-weight:700; letter-spacing:.1em; color:#a1a1aa; padding:.25rem .625rem .125rem; }
.settings-aside-item { display:block; border-radius:.5rem; padding:.375rem .625rem; font-size:.75rem; font-weight:500; color:#71717a; text-decoration:none; transition:background .15s; }
.settings-aside-item:hover { background:#fafafa; color:#27272a; }
.settings-aside-item.active { background:#18181b; color:#fff; }`,
  },
  {
    id: 'saas-sidebar-admin', name: 'SaaS Admin Panel Sidebar', category: 'Aside Nav',
    description: 'Admin sidebar for SaaS ops — users, subscriptions, feature flags, alerts.',
    Preview: SaasSidebarAdminPreview,
    tailwind: `<aside class="flex h-72 w-48 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="bg-rose-600 px-4 py-3 flex items-center gap-2"><span class="text-white text-xs font-bold">🔑 Admin Panel</span></div>
  <nav class="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
    <a href="#" class="flex items-center justify-between rounded-lg bg-rose-50 px-2.5 py-2 text-xs font-medium text-rose-700">
      <span class="flex items-center gap-2"><span>👥</span> Users</span>
      <span class="rounded-full bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold text-rose-500">2.4K</span>
    </a>
    <a href="#" class="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-zinc-500 hover:bg-zinc-50"><span>💳</span> Subscriptions</a>
    <a href="#" class="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-zinc-500 hover:bg-zinc-50"><span>🚦</span> Feature Flags</a>
  </nav>
</aside>`,
    css: `.admin-aside { display:flex; flex-direction:column; height:18rem; width:12rem; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.admin-aside-header { background:#e11d48; padding:.75rem 1rem; }
.admin-aside-item { display:flex; align-items:center; gap:.5rem; border-radius:.5rem; padding:.5rem .625rem; font-size:.75rem; font-weight:500; color:#71717a; text-decoration:none; transition:background .15s; }
.admin-aside-item:hover { background:#fafafa; }
.admin-aside-item.active { background:#fff1f2; color:#be123c; }`,
  },

  /* ── Aside Navigation — Logistics ── */
  {
    id: 'logistics-sidebar-main', name: 'Logistics Sidebar', category: 'Aside Nav',
    description: 'Logistics platform sidebar — shipments, routes, fleet, warehouses.',
    Preview: LogisticsSidebarMainPreview,
    tailwind: `<aside class="flex h-72 w-48 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="bg-teal-700 px-4 py-3.5"><span class="text-xs font-bold text-white">🚛 LogiTrack</span></div>
  <nav class="flex-1 px-2 py-2 space-y-0.5">
    <a href="#" class="flex items-center justify-between rounded-lg bg-teal-50 px-2.5 py-2 text-xs font-medium text-teal-700">
      <span class="flex items-center gap-2"><span>📦</span> Shipments</span>
      <span class="rounded-full bg-teal-100 px-1.5 py-0.5 text-[10px] font-bold text-teal-600">18</span>
    </a>
    <a href="#" class="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-zinc-500 hover:bg-zinc-50"><span>🗺️</span> Routes</a>
    <a href="#" class="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-zinc-500 hover:bg-zinc-50"><span>🚚</span> Fleet</a>
  </nav>
</aside>`,
    css: `.logi-aside { display:flex; flex-direction:column; height:18rem; width:12rem; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.logi-aside-header { background:#0f766e; padding:.875rem 1rem; }
.logi-aside-item { display:flex; align-items:center; gap:.5rem; border-radius:.5rem; padding:.5rem .625rem; font-size:.75rem; font-weight:500; color:#71717a; text-decoration:none; transition:background .15s; }
.logi-aside-item:hover { background:#fafafa; }
.logi-aside-item.active { background:#f0fdfa; color:#0f766e; }`,
  },
  {
    id: 'logistics-sidebar-shipments', name: 'Shipments Status Sidebar', category: 'Aside Nav',
    description: 'Shipment filter sidebar with color-coded status counts.',
    Preview: LogisticsSidebarShipmentsPreview,
    tailwind: `<aside class="flex h-72 w-52 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="border-b border-zinc-100 px-4 py-3">
    <p class="text-xs font-bold text-zinc-800">📦 Shipments</p>
    <p class="text-[10px] text-zinc-400 mt-0.5">142 total this month</p>
  </div>
  <nav class="flex-1 px-2 py-2 space-y-0.5">
    <a href="#" class="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs text-zinc-600 hover:bg-zinc-50">
      <span class="h-2 w-2 rounded-full bg-zinc-400"></span><span class="flex-1 font-medium">All Shipments</span><span class="font-bold text-zinc-500 text-[10px]">142</span>
    </a>
    <a href="#" class="flex items-center gap-2.5 rounded-lg bg-blue-50 px-2.5 py-2 text-xs text-blue-700">
      <span class="h-2 w-2 rounded-full bg-blue-500"></span><span class="flex-1 font-medium">In Transit</span><span class="font-bold text-zinc-500 text-[10px]">58</span>
    </a>
    <a href="#" class="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs text-zinc-600 hover:bg-zinc-50">
      <span class="h-2 w-2 rounded-full bg-emerald-500"></span><span class="flex-1 font-medium">Delivered</span><span class="font-bold text-zinc-500 text-[10px]">64</span>
    </a>
  </nav>
</aside>`,
    css: `.shipments-aside { display:flex; flex-direction:column; height:18rem; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.shipment-filter { display:flex; align-items:center; gap:.625rem; border-radius:.5rem; padding:.5rem .625rem; font-size:.75rem; color:#52525b; text-decoration:none; transition:background .15s; }
.shipment-filter:hover { background:#fafafa; }
.shipment-filter.active { background:#eff6ff; color:#1d4ed8; }
.shipment-dot { height:.5rem; width:.5rem; border-radius:9999px; flex-shrink:0; }`,
  },
  {
    id: 'logistics-sidebar-fleet', name: 'Fleet Management Sidebar', category: 'Aside Nav',
    description: 'Fleet status sidebar with vehicle ID, driver, status badge, and route progress bar.',
    Preview: LogisticsSidebarFleetPreview,
    tailwind: `<aside class="flex h-72 w-56 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="border-b border-zinc-100 px-4 py-3"><p class="text-xs font-bold text-zinc-800">🚚 Fleet Status</p></div>
  <nav class="flex-1 px-2 py-2 space-y-1 overflow-auto">
    <a href="#" class="block rounded-lg border border-teal-200 bg-teal-50 px-2.5 py-2">
      <div class="flex items-center justify-between mb-1">
        <span class="text-xs font-bold text-zinc-800">TRK-001</span>
        <span class="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">On Route</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="flex-1 h-1 rounded-full bg-zinc-100"><div class="h-1 rounded-full bg-emerald-400" style="width:68%"></div></div>
        <span class="text-[10px] text-zinc-400">Mike R.</span>
      </div>
    </a>
  </nav>
</aside>`,
    css: `.fleet-aside { display:flex; flex-direction:column; height:18rem; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.fleet-vehicle { display:block; border-radius:.5rem; border:1px solid transparent; padding:.5rem .625rem; text-decoration:none; transition:background .15s, border-color .15s; }
.fleet-vehicle:hover { background:#fafafa; }
.fleet-vehicle.active { background:#f0fdfa; border-color:#5eead4; }
.fleet-progress-bg { height:.25rem; border-radius:9999px; background:#f4f4f5; flex:1; }
.fleet-progress-fill { height:.25rem; border-radius:9999px; background:#4ade80; }`,
  },

  /* ── AI Assistant Sidebars ── */
  {
    id: 'ai-sidebar-main', name: 'AI Studio Sidebar', category: 'AI Tools',
    description: 'Dark AI studio sidebar with Text, Image, Code, Video generators and credit counter.',
    Preview: AiSidebarMainPreview,
    tailwind: `<aside class="flex h-72 w-52 flex-col rounded-2xl border border-slate-700 bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl overflow-hidden">
  <div class="flex items-center gap-2 border-b border-slate-700 px-4 py-3.5">
    <div class="h-7 w-7 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-sm">✦</div>
    <span class="text-sm font-bold text-white">AI Studio</span>
  </div>
  <nav class="flex-1 px-2 py-2 space-y-0.5">
    <a href="#" class="flex items-center gap-2 rounded-xl bg-violet-600/80 px-2.5 py-2 text-xs font-medium text-white shadow-lg"><span>✍️</span> Text Generator <span class="ml-auto rounded-md bg-slate-700 px-1.5 text-[9px] font-bold text-slate-300">GPT-4</span></a>
    <a href="#" class="flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-400 hover:bg-slate-700 hover:text-white"><span>🎨</span> Image Generator</a>
    <a href="#" class="flex items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-400 hover:bg-slate-700 hover:text-white"><span>💻</span> Code Generator</a>
    <a href="#" class="flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-medium text-slate-400 hover:bg-slate-700 hover:text-white"><span class="flex items-center gap-2"><span>🎬</span> Video Generator</span><span class="rounded-md bg-emerald-500 px-1.5 text-[9px] font-bold text-white">New</span></a>
  </nav>
  <div class="flex items-center gap-2 border-t border-slate-700 px-3 py-3">
    <div class="h-6 w-6 rounded-full bg-violet-500 flex items-center justify-center text-[10px] font-bold text-white">U</div>
    <div><p class="text-[10px] font-semibold text-white">Pro Plan</p><p class="text-[9px] text-slate-400">850 credits left</p></div>
  </div>
</aside>`,
    css: `.ai-aside { display:flex; flex-direction:column; background:linear-gradient(180deg,#0f172a,#1e293b); border:1px solid #334155; border-radius:1rem; overflow:hidden; }
.ai-aside-item { display:flex; align-items:center; gap:.5rem; border-radius:.75rem; padding:.5rem .625rem; font-size:.75rem; font-weight:500; color:#94a3b8; text-decoration:none; transition:background .15s, color .15s; }
.ai-aside-item:hover { background:#1e293b; color:#fff; }
.ai-aside-item.active { background:rgba(139,92,246,.5); color:#fff; box-shadow:0 4px 12px rgba(139,92,246,.2); }`,
  },
  {
    id: 'ai-sidebar-text', name: 'AI Text Generator Sidebar', category: 'AI Tools',
    description: 'Text generator sidebar with model selector, templates, and prompt history.',
    Preview: AiSidebarTextPreview,
    tailwind: `<aside class="flex h-72 w-52 flex-col rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden">
  <div class="border-b border-slate-700 px-3 py-3">
    <p class="text-xs font-bold text-white mb-2">✍️ Text Generator</p>
    <select class="w-full rounded-lg bg-slate-800 border border-slate-600 text-[11px] text-slate-300 px-2 py-1.5 focus:outline-none">
      <option>GPT-4o</option><option>Claude 3.5</option><option>Gemini Pro</option>
    </select>
  </div>
  <div class="px-2 py-2 border-b border-slate-700">
    <p class="px-2.5 text-[9px] font-bold text-slate-500 mb-1">TEMPLATES</p>
    <a href="#" class="flex items-center rounded-lg bg-violet-600 px-2.5 py-1.5 text-xs text-white">Blog Post</a>
    <a href="#" class="flex items-center rounded-lg px-2.5 py-1.5 text-xs text-slate-400 hover:bg-slate-800">Email Draft</a>
  </div>
</aside>`,
    css: `.text-ai-aside { display:flex; flex-direction:column; background:#0f172a; border:1px solid #334155; border-radius:1rem; overflow:hidden; }
.text-ai-template { border-radius:.5rem; padding:.375rem .625rem; font-size:.75rem; color:#94a3b8; text-decoration:none; display:block; transition:background .15s; }
.text-ai-template:hover { background:#1e293b; }
.text-ai-template.active { background:#7c3aed; color:#fff; }`,
  },
  {
    id: 'ai-sidebar-image', name: 'AI Image Generator Sidebar', category: 'AI Tools',
    description: 'Image generator sidebar — art style selector, aspect ratio, and quality picker.',
    Preview: AiSidebarImagePreview,
    tailwind: `<aside class="flex h-72 w-52 flex-col rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden">
  <div class="border-b border-slate-700 px-3 py-3"><p class="text-xs font-bold text-white">🎨 Image Generator</p></div>
  <div class="flex-1 px-3 py-2 overflow-auto space-y-3">
    <div>
      <p class="text-[9px] font-bold text-slate-400 mb-1.5 tracking-widest">STYLE</p>
      <a href="#" class="block rounded-lg bg-pink-600 px-2.5 py-1.5 text-xs text-white mb-0.5">Photorealistic</a>
      <a href="#" class="block rounded-lg px-2.5 py-1.5 text-xs text-slate-400 hover:bg-slate-800">Illustration</a>
    </div>
    <div>
      <p class="text-[9px] font-bold text-slate-400 mb-1.5 tracking-widest">ASPECT RATIO</p>
      <div class="flex gap-1">
        <button class="rounded-lg bg-pink-600 px-3 py-1 text-[10px] font-bold text-white">1:1</button>
        <button class="rounded-lg bg-slate-800 px-3 py-1 text-[10px] font-bold text-slate-400">16:9</button>
        <button class="rounded-lg bg-slate-800 px-3 py-1 text-[10px] font-bold text-slate-400">9:16</button>
      </div>
    </div>
  </div>
</aside>`,
    css: `.image-ai-aside { display:flex; flex-direction:column; background:#0f172a; border:1px solid #334155; border-radius:1rem; overflow:hidden; }
.style-option { border-radius:.5rem; padding:.375rem .625rem; font-size:.75rem; color:#94a3b8; display:block; transition:background .15s; }
.style-option.active { background:#db2777; color:#fff; }
.ratio-btn { border-radius:.5rem; padding:.25rem .75rem; font-size:.625rem; font-weight:700; transition:background .15s; }
.ratio-btn.active { background:#db2777; color:#fff; }`,
  },
  {
    id: 'ai-sidebar-code', name: 'AI Code Generator Sidebar', category: 'AI Tools',
    description: 'Code generator sidebar — language tags and action modes (generate, refactor, debug).',
    Preview: AiSidebarCodePreview,
    tailwind: `<aside class="flex h-72 w-52 flex-col rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden">
  <div class="border-b border-slate-700 px-3 py-3"><p class="text-xs font-bold text-white">💻 Code Generator</p></div>
  <div class="flex-1 px-3 py-2 overflow-auto space-y-3">
    <div>
      <p class="text-[9px] font-bold text-slate-400 mb-1.5 tracking-widest">LANGUAGE</p>
      <div class="flex flex-wrap gap-1">
        <button class="rounded-md bg-blue-600 px-2 py-1 text-[10px] font-semibold text-white">TypeScript</button>
        <button class="rounded-md bg-slate-800 px-2 py-1 text-[10px] font-semibold text-slate-400 hover:bg-slate-700">Python</button>
        <button class="rounded-md bg-slate-800 px-2 py-1 text-[10px] font-semibold text-slate-400 hover:bg-slate-700">Go</button>
      </div>
    </div>
    <div>
      <p class="text-[9px] font-bold text-slate-400 mb-1.5 tracking-widest">ACTION</p>
      <a href="#" class="block rounded-lg bg-blue-600 px-2.5 py-1.5 text-xs text-white mb-0.5">Generate</a>
      <a href="#" class="block rounded-lg px-2.5 py-1.5 text-xs text-slate-400 hover:bg-slate-800">Refactor</a>
    </div>
  </div>
</aside>`,
    css: `.code-ai-aside { display:flex; flex-direction:column; background:#0f172a; border:1px solid #334155; border-radius:1rem; overflow:hidden; }
.lang-chip { border-radius:.375rem; padding:.25rem .5rem; font-size:.625rem; font-weight:600; transition:background .15s; }
.lang-chip.active { background:#2563eb; color:#fff; }
.lang-chip:not(.active) { background:#1e293b; color:#64748b; }`,
  },
  {
    id: 'ai-sidebar-video', name: 'AI Video Generator Sidebar', category: 'AI Tools',
    description: 'Video generator sidebar — mode selector, duration, and quality options.',
    Preview: AiSidebarVideoPreview,
    tailwind: `<aside class="flex h-72 w-52 flex-col rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden">
  <div class="flex items-center justify-between border-b border-slate-700 px-3 py-3">
    <p class="text-xs font-bold text-white">🎬 Video Generator</p>
    <span class="rounded-md bg-emerald-500 px-2 py-0.5 text-[9px] font-bold text-white">New</span>
  </div>
  <div class="flex-1 px-3 py-2 overflow-auto space-y-3">
    <div>
      <p class="text-[9px] font-bold text-slate-400 mb-1.5 tracking-widest">MODE</p>
      <a href="#" class="block rounded-lg bg-rose-600 px-2.5 py-1.5 text-xs text-white mb-0.5">Text to Video</a>
      <a href="#" class="block rounded-lg px-2.5 py-1.5 text-xs text-slate-400 hover:bg-slate-800">Image to Video</a>
    </div>
    <div>
      <p class="text-[9px] font-bold text-slate-400 mb-1.5 tracking-widest">DURATION</p>
      <div class="flex flex-wrap gap-1">
        <button class="rounded-md bg-slate-800 px-2.5 py-1 text-[10px] font-bold text-slate-400">5s</button>
        <button class="rounded-md bg-rose-600 px-2.5 py-1 text-[10px] font-bold text-white">15s</button>
        <button class="rounded-md bg-slate-800 px-2.5 py-1 text-[10px] font-bold text-slate-400">30s</button>
      </div>
    </div>
  </div>
</aside>`,
    css: `.video-ai-aside { display:flex; flex-direction:column; background:#0f172a; border:1px solid #334155; border-radius:1rem; overflow:hidden; }
.video-mode { border-radius:.5rem; padding:.375rem .625rem; font-size:.75rem; display:block; transition:background .15s; }
.video-mode.active { background:#e11d48; color:#fff; }
.video-mode:not(.active) { color:#64748b; }
.duration-btn { border-radius:.375rem; padding:.25rem .625rem; font-size:.625rem; font-weight:700; transition:background .15s; }
.duration-btn.active { background:#e11d48; color:#fff; }`,
  },
  {
    id: 'ai-sidebar-history', name: 'AI Generation History Sidebar', category: 'AI Tools',
    description: 'AI generation history sidebar with type icon, truncated prompt, tag, and timestamp.',
    Preview: AiSidebarHistoryPreview,
    tailwind: `<aside class="flex h-72 w-60 flex-col rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden">
  <div class="flex items-center justify-between border-b border-slate-700 px-3 py-3">
    <p class="text-xs font-bold text-white">🕐 History</p>
    <button class="text-[10px] text-slate-400 hover:text-slate-200">Clear all</button>
  </div>
  <div class="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
    <button class="w-full rounded-xl bg-slate-700 px-2.5 py-2 text-left">
      <div class="flex items-center gap-2 mb-0.5"><span>✍️</span><span class="flex-1 text-[11px] font-semibold text-slate-200 truncate">Write a product launch email for...</span></div>
      <div class="flex items-center gap-2 pl-6"><span class="rounded-md bg-slate-700 px-1.5 py-0.5 text-[9px] font-bold text-slate-400">Text</span><span class="text-[9px] text-slate-500">2m ago</span></div>
    </button>
    <button class="w-full rounded-xl px-2.5 py-2 text-left hover:bg-slate-800">
      <div class="flex items-center gap-2 mb-0.5"><span>🎨</span><span class="flex-1 text-[11px] font-semibold text-slate-200 truncate">Futuristic city at night, neon lights...</span></div>
      <div class="flex items-center gap-2 pl-6"><span class="rounded-md bg-slate-700 px-1.5 py-0.5 text-[9px] font-bold text-slate-400">Image</span><span class="text-[9px] text-slate-500">14m ago</span></div>
    </button>
  </div>
</aside>`,
    css: `.history-ai-aside { display:flex; flex-direction:column; background:#0f172a; border:1px solid #334155; border-radius:1rem; overflow:hidden; }
.history-item { border-radius:.75rem; padding:.5rem .625rem; text-align:left; transition:background .15s; cursor:pointer; }
.history-item:hover { background:#1e293b; }
.history-item.active { background:#334155; }`,
  },
  {
    id: 'ai-sidebar-models', name: 'AI Model Selection Sidebar', category: 'AI Tools',
    description: 'AI model picker showing provider, speed, quality rating, and free/best badges.',
    Preview: AiSidebarModelsPreview,
    tailwind: `<aside class="flex h-72 w-60 flex-col rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden">
  <div class="border-b border-slate-700 px-3 py-3"><p class="text-xs font-bold text-white">🤖 Select Model</p></div>
  <div class="flex-1 px-2 py-2 space-y-1 overflow-auto">
    <button class="w-full rounded-xl border border-violet-500 bg-violet-600/20 px-3 py-2 text-left">
      <div class="flex items-center justify-between"><span class="text-xs font-bold text-violet-300">GPT-4o</span><span class="rounded-md bg-violet-500/30 px-1.5 py-0.5 text-[9px] font-bold text-violet-300">Best</span></div>
      <div class="flex items-center gap-3 mt-0.5"><span class="text-[9px] text-slate-500">OpenAI</span><span class="text-[9px] text-slate-500">Speed: ⚡⚡⚡</span></div>
    </button>
    <button class="w-full rounded-xl border border-transparent px-3 py-2 text-left hover:bg-slate-800">
      <div class="flex items-center justify-between"><span class="text-xs font-bold text-slate-200">Claude 3.5</span></div>
      <div class="flex items-center gap-3 mt-0.5"><span class="text-[9px] text-slate-500">Anthropic</span><span class="text-[9px] text-slate-500">Speed: ⚡⚡⚡</span></div>
    </button>
  </div>
</aside>`,
    css: `.models-ai-aside { display:flex; flex-direction:column; background:#0f172a; border:1px solid #334155; border-radius:1rem; overflow:hidden; }
.model-card { border-radius:.75rem; border:1px solid transparent; padding:.5rem .75rem; text-align:left; transition:background .15s, border-color .15s; cursor:pointer; }
.model-card:hover { background:#1e293b; }
.model-card.selected { border-color:#7c3aed; background:rgba(139,92,246,.15); }`,
  },
  {
    id: 'ai-sidebar-prompts', name: 'AI Saved Prompts Sidebar', category: 'AI Tools',
    description: 'Saved prompts library with category tabs, usage counts, and favourite star.',
    Preview: AiSidebarPromptsPreview,
    tailwind: `<aside class="flex h-72 w-60 flex-col rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden">
  <div class="border-b border-slate-700 px-3 py-3"><p class="text-xs font-bold text-white">📝 Saved Prompts</p></div>
  <div class="flex gap-1 border-b border-slate-700 px-2 py-2">
    <button class="rounded-md bg-violet-600 px-2 py-1 text-[10px] font-semibold text-white">All</button>
    <button class="rounded-md bg-slate-800 px-2 py-1 text-[10px] font-semibold text-slate-400">Marketing</button>
    <button class="rounded-md bg-slate-800 px-2 py-1 text-[10px] font-semibold text-slate-400">Dev</button>
    <button class="rounded-md bg-slate-800 px-2 py-1 text-[10px] font-semibold text-slate-400">SEO</button>
  </div>
  <div class="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
    <div class="flex items-center gap-2 rounded-xl px-2.5 py-2 hover:bg-slate-800 transition">
      <div class="flex-1 min-w-0"><p class="text-xs font-medium text-slate-200 truncate">Product launch email</p><p class="text-[9px] text-slate-500">142 uses</p></div>
      <span class="text-yellow-400 text-sm">★</span>
    </div>
  </div>
</aside>`,
    css: `.prompts-ai-aside { display:flex; flex-direction:column; background:#0f172a; border:1px solid #334155; border-radius:1rem; overflow:hidden; }
.prompt-item { display:flex; align-items:center; gap:.5rem; border-radius:.75rem; padding:.5rem .625rem; transition:background .15s; cursor:pointer; }
.prompt-item:hover { background:#1e293b; }
.prompt-fav { color:#facc15; font-size:1rem; cursor:pointer; }`,
  },
  {
    id: 'ai-sidebar-settings', name: 'AI Settings Sidebar', category: 'AI Tools',
    description: 'AI settings sidebar — streaming toggle, memory toggle, temperature slider, API keys.',
    Preview: AiSidebarSettingsPreview,
    tailwind: `<aside class="flex h-72 w-60 flex-col rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden">
  <div class="border-b border-slate-700 px-3 py-3"><p class="text-xs font-bold text-white">⚙️ AI Settings</p></div>
  <div class="flex-1 px-3 py-2 overflow-auto space-y-3">
    <div class="flex items-center justify-between">
      <div><p class="text-xs font-semibold text-slate-200">Streaming</p><p class="text-[9px] text-slate-500">Real-time token output</p></div>
      <div class="relative h-5 w-9 rounded-full bg-violet-600 cursor-pointer"><span class="absolute top-0.5 left-4 h-4 w-4 rounded-full bg-white transition-all" /></div>
    </div>
    <div>
      <div class="flex items-center justify-between mb-1"><p class="text-xs font-semibold text-slate-200">Temperature</p><span class="text-xs font-bold text-violet-400">0.7</span></div>
      <input type="range" class="w-full accent-violet-500" value="70" max="100" />
    </div>
    <div><p class="text-[9px] font-bold text-slate-500 mb-1 tracking-widest">API & KEYS</p>
      <p class="py-1 text-xs text-slate-400 cursor-pointer hover:text-slate-200">API Keys</p>
      <p class="py-1 text-xs text-slate-400 cursor-pointer hover:text-slate-200">Usage & Billing</p>
    </div>
  </div>
</aside>`,
    css: `.settings-ai-aside { display:flex; flex-direction:column; background:#0f172a; border:1px solid #334155; border-radius:1rem; overflow:hidden; }
.ai-toggle { position:relative; height:1.25rem; width:2.25rem; border-radius:9999px; cursor:pointer; transition:background .2s; }
.ai-toggle.on { background:#7c3aed; }
.ai-toggle.off { background:#334155; }
.ai-toggle-thumb { position:absolute; top:.125rem; height:1rem; width:1rem; border-radius:9999px; background:#fff; transition:left .2s; }`,
  },

  /* ── E-Commerce Sidebars ── */
  {
    id: 'ecom2-sidebar-main', name: 'eCommerce Full Sidebar', category: 'eCommerce',
    description: 'Full eCommerce app sidebar — grouped Store, Finances, Customers, and Settings.',
    Preview: Ecom2SidebarMainPreview,
    tailwind: `<aside class="flex h-80 w-48 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="flex items-center gap-2 border-b border-zinc-100 px-4 py-3.5">
    <div class="h-7 w-7 rounded-xl bg-orange-500 flex items-center justify-center text-white text-xs font-bold">🛍</div>
    <span class="text-sm font-bold text-zinc-800">ShopFlow</span>
  </div>
  <nav class="flex-1 px-2 py-1.5 overflow-auto space-y-2">
    <div><p class="px-2.5 mb-0.5 text-[9px] font-bold tracking-widest text-zinc-400">STORE</p>
      <a href="#" class="flex items-center gap-2 rounded-lg bg-orange-50 px-2.5 py-1.5 text-xs font-medium text-orange-700"><span>⊞</span> Dashboard</a>
      <a href="#" class="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-500 hover:bg-zinc-50"><span class="flex items-center gap-2"><span>📦</span> Products</span><span class="rounded-full bg-orange-100 px-1.5 text-[9px] font-bold text-orange-600">248</span></a>
    </div>
    <div><p class="px-2.5 mb-0.5 text-[9px] font-bold tracking-widest text-zinc-400">FINANCES</p>
      <a href="#" class="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-500 hover:bg-zinc-50"><span>💳</span> Billing</a>
      <a href="#" class="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-500 hover:bg-zinc-50"><span>🧾</span> Invoices</a>
    </div>
  </nav>
</aside>`,
    css: `.ecom2-aside { display:flex; flex-direction:column; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.ecom2-section-title { font-size:.5625rem; font-weight:700; letter-spacing:.1em; color:#a1a1aa; padding:.25rem .625rem .125rem; }
.ecom2-item { display:flex; align-items:center; gap:.5rem; border-radius:.5rem; padding:.375rem .625rem; font-size:.75rem; font-weight:500; color:#71717a; text-decoration:none; transition:background .15s; }
.ecom2-item:hover { background:#fafafa; }
.ecom2-item.active { background:#fff7ed; color:#c2410c; }`,
  },
  {
    id: 'ecom2-sidebar-products', name: 'Products Filter Sidebar', category: 'eCommerce',
    description: 'Products sidebar with search, sort dropdown, and status filter tabs.',
    Preview: Ecom2SidebarProductsPreview,
    tailwind: `<aside class="flex h-72 w-52 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="flex items-center gap-2 border-b border-zinc-100 px-3 py-3">
    <div class="flex flex-1 items-center gap-1.5 rounded-lg bg-zinc-100 px-2.5 py-1.5 text-xs text-zinc-400">🔍 Search products...</div>
    <button class="rounded-lg bg-orange-500 px-2.5 py-1.5 text-[10px] font-bold text-white">+ Add</button>
  </div>
  <nav class="flex-1 px-2 py-1.5 space-y-0.5 overflow-auto">
    <a href="#" class="flex items-center justify-between rounded-lg bg-orange-50 px-2.5 py-2 text-xs font-medium text-orange-700"><span>All Products</span><span class="text-[10px] text-orange-400">248</span></a>
    <a href="#" class="flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium text-zinc-500 hover:bg-zinc-50"><span>Active</span><span class="text-[10px] text-zinc-400">189</span></a>
    <a href="#" class="flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium text-zinc-500 hover:bg-zinc-50"><span>Draft</span><span class="text-[10px] text-zinc-400">42</span></a>
    <a href="#" class="flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium text-zinc-500 hover:bg-zinc-50"><span>Out of Stock</span><span class="text-[10px] text-zinc-400">6</span></a>
  </nav>
</aside>`,
    css: `.products-aside { display:flex; flex-direction:column; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.product-filter { display:flex; align-items:center; justify-content:space-between; border-radius:.5rem; padding:.5rem .625rem; font-size:.75rem; font-weight:500; color:#71717a; text-decoration:none; transition:background .15s; }
.product-filter:hover { background:#fafafa; }
.product-filter.active { background:#fff7ed; color:#c2410c; }`,
  },
  {
    id: 'ecom2-sidebar-add-product', name: 'Add Product Stepper Sidebar', category: 'eCommerce',
    description: 'Multi-step product creation stepper with progress bar — 6 steps.',
    Preview: Ecom2SidebarAddProductPreview,
    tailwind: `<aside class="flex h-72 w-52 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="border-b border-zinc-100 px-4 py-3"><p class="text-xs font-bold text-zinc-800">📦 Add Product</p><p class="text-[9px] text-zinc-400 mt-0.5">Step 2 of 6</p></div>
  <div class="h-1 bg-zinc-100"><div class="h-1 bg-orange-500" style="width:33%"></div></div>
  <nav class="flex-1 px-3 py-2 overflow-auto">
    <div class="flex items-center gap-3 rounded-lg px-2 py-2">
      <div class="h-6 w-6 rounded-full bg-orange-500 border-2 border-orange-500 text-white text-xs font-bold flex items-center justify-center">✓</div>
      <div><p class="text-xs font-semibold text-zinc-600">Basic Info</p><p class="text-[9px] text-zinc-400">Name, SKU, category</p></div>
    </div>
    <div class="flex items-center gap-3 rounded-lg bg-orange-50 px-2 py-2">
      <div class="h-6 w-6 rounded-full border-2 border-orange-500 text-orange-600 text-xs font-bold flex items-center justify-center">2</div>
      <div><p class="text-xs font-semibold text-orange-700">Pricing</p><p class="text-[9px] text-zinc-400">Price, compare, tax</p></div>
    </div>
  </nav>
</aside>`,
    css: `.add-product-aside { display:flex; flex-direction:column; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.add-product-step { display:flex; align-items:center; gap:.75rem; border-radius:.5rem; padding:.5rem; transition:background .15s; cursor:pointer; }
.add-product-step.active { background:#fff7ed; }
.step-circle { height:1.5rem; width:1.5rem; border-radius:9999px; border:2px solid #e4e4e7; display:flex; align-items:center; justify-content:center; font-size:.75rem; font-weight:700; color:#a1a1aa; flex-shrink:0; }
.step-circle.done { background:#f97316; border-color:#f97316; color:#fff; }
.step-circle.current { border-color:#f97316; color:#ea580c; }`,
  },
  {
    id: 'ecom2-sidebar-billing', name: 'Billing Sidebar', category: 'eCommerce',
    description: 'Billing sidebar with live plan card, quota bar, and billing navigation.',
    Preview: Ecom2SidebarBillingPreview,
    tailwind: `<aside class="flex h-72 w-52 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="border-b border-zinc-100 px-4 py-3"><p class="text-xs font-bold text-zinc-800">💳 Billing</p></div>
  <div class="bg-gradient-to-br from-emerald-500 to-teal-600 mx-2 mt-2 rounded-xl px-3 py-2.5">
    <div class="flex items-center justify-between"><p class="text-[10px] font-bold text-emerald-100">CURRENT PLAN</p><span class="rounded-md bg-white/20 px-1.5 py-0.5 text-[9px] font-bold text-white">Pro</span></div>
    <p class="text-lg font-bold text-white mt-0.5">$49/mo</p>
    <div class="mt-1.5 h-1 rounded-full bg-white/20"><div class="h-1 rounded-full bg-white" style="width:68%"></div></div>
    <p class="text-[9px] text-emerald-100 mt-0.5">68% of quota used</p>
  </div>
  <nav class="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
    <a href="#" class="block rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-medium text-emerald-700">Overview</a>
    <a href="#" class="block rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-500 hover:bg-zinc-50">Payment Methods</a>
    <a href="#" class="block rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-500 hover:bg-zinc-50">Billing History</a>
  </nav>
</aside>`,
    css: `.billing-aside { display:flex; flex-direction:column; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.billing-plan-card { background:linear-gradient(135deg,#10b981,#0d9488); border-radius:.75rem; margin:.5rem; padding:.75rem; }
.billing-item { display:block; border-radius:.5rem; padding:.375rem .625rem; font-size:.75rem; font-weight:500; color:#71717a; text-decoration:none; transition:background .15s; }
.billing-item:hover { background:#fafafa; }
.billing-item.active { background:#ecfdf5; color:#059669; }`,
  },
  {
    id: 'ecom2-sidebar-invoices', name: 'Invoices List Sidebar', category: 'eCommerce',
    description: 'Invoice sidebar with status tabs (Paid/Pending/Overdue) and recent invoice list.',
    Preview: Ecom2SidebarInvoicesPreview,
    tailwind: `<aside class="flex h-72 w-56 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
    <p class="text-xs font-bold text-zinc-800">🧾 Invoices</p>
    <button class="rounded-lg bg-blue-600 px-2 py-1 text-[10px] font-bold text-white">+ New</button>
  </div>
  <div class="flex gap-1 border-b border-zinc-100 px-2 py-2">
    <button class="flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700"><span class="h-1.5 w-1.5 rounded-full bg-zinc-400"></span>All (47)</button>
    <button class="rounded-lg px-2 py-1 text-[10px] font-semibold text-zinc-500 hover:bg-zinc-50">Paid</button>
    <button class="rounded-lg px-2 py-1 text-[10px] font-semibold text-zinc-500 hover:bg-zinc-50">Pending</button>
  </div>
  <div class="flex-1 px-2 py-1.5 overflow-auto">
    <div class="flex items-center gap-2 rounded-lg px-2.5 py-2 hover:bg-zinc-50">
      <div class="flex-1"><p class="text-xs font-semibold text-zinc-800">INV-2024</p><p class="text-[9px] text-zinc-500">Acme Corp</p></div>
      <div class="text-right"><p class="text-xs font-bold text-zinc-800">$1,200</p><p class="text-[9px] font-semibold text-emerald-600">Paid</p></div>
    </div>
  </div>
</aside>`,
    css: `.invoices-aside { display:flex; flex-direction:column; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.invoice-row { display:flex; align-items:center; gap:.5rem; border-radius:.5rem; padding:.5rem .625rem; transition:background .15s; cursor:pointer; }
.invoice-row:hover { background:#fafafa; }
.invoice-status.paid { color:#16a34a; }
.invoice-status.pending { color:#d97706; }
.invoice-status.overdue { color:#dc2626; }`,
  },
  {
    id: 'ecom2-sidebar-single-invoice', name: 'Single Invoice Detail Sidebar', category: 'eCommerce',
    description: 'Invoice detail sidebar — client, dates, line items breakdown, and total.',
    Preview: Ecom2SidebarSingleInvoicePreview,
    tailwind: `<aside class="flex h-72 w-56 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
    <div><p class="text-xs font-bold text-zinc-800">INV-2024-001</p><p class="text-[9px] text-zinc-400">Apr 1–30, 2026</p></div>
    <span class="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Paid</span>
  </div>
  <div class="flex-1 px-4 py-3 overflow-auto space-y-2">
    <div class="flex items-center justify-between py-1 border-b border-zinc-100"><p class="text-[10px] text-zinc-500">Client</p><p class="text-[10px] font-semibold text-zinc-800">Acme Corp</p></div>
    <div class="rounded-xl bg-zinc-50 px-3 py-2 space-y-1">
      <div class="flex justify-between"><p class="text-[11px] text-zinc-600">Consulting</p><p class="text-[11px] font-semibold">$800</p></div>
      <div class="flex justify-between"><p class="text-[11px] text-zinc-600">Design</p><p class="text-[11px] font-semibold">$400</p></div>
    </div>
    <div class="flex items-center justify-between rounded-xl bg-blue-600 px-3 py-2.5">
      <p class="text-xs font-bold text-white">Total</p><p class="text-sm font-bold text-white">$1,320</p>
    </div>
  </div>
</aside>`,
    css: `.invoice-detail-aside { display:flex; flex-direction:column; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.invoice-line { display:flex; align-items:center; justify-content:space-between; padding:.25rem 0; border-bottom:1px solid #fafafa; font-size:.75rem; }
.invoice-total { display:flex; align-items:center; justify-content:space-between; border-radius:.75rem; background:#2563eb; padding:.625rem .75rem; color:#fff; font-weight:700; }`,
  },
  {
    id: 'ecom2-sidebar-create-invoice', name: 'Create Invoice Stepper Sidebar', category: 'eCommerce',
    description: '5-step invoice creation wizard sidebar with progress bar and Back/Next controls.',
    Preview: Ecom2SidebarCreateInvoicePreview,
    tailwind: `<aside class="flex h-72 w-52 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="border-b border-zinc-100 px-4 py-3">
    <p class="text-xs font-bold text-zinc-800">🧾 Create Invoice</p>
    <div class="mt-2 h-1.5 rounded-full bg-zinc-100"><div class="h-1.5 rounded-full bg-blue-600" style="width:20%"></div></div>
    <p class="text-[9px] text-zinc-400 mt-1">Step 1 of 5</p>
  </div>
  <nav class="flex-1 px-3 py-2 overflow-auto space-y-1">
    <div class="flex items-center gap-3 rounded-xl bg-blue-50 px-2.5 py-2">
      <div class="h-7 w-7 rounded-full border-2 border-blue-600 text-blue-600 text-xs font-bold flex items-center justify-center">1</div>
      <span class="text-xs font-semibold text-blue-700">Client Details</span>
    </div>
    <div class="flex items-center gap-3 rounded-xl px-2.5 py-2 hover:bg-zinc-50">
      <div class="h-7 w-7 rounded-full border-2 border-zinc-200 text-zinc-400 text-xs font-bold flex items-center justify-center">2</div>
      <span class="text-xs font-semibold text-zinc-400">Line Items</span>
    </div>
  </nav>
  <div class="border-t border-zinc-100 px-3 py-3 flex gap-2">
    <button class="flex-1 rounded-lg border border-zinc-200 py-1.5 text-xs font-semibold text-zinc-600 opacity-40">Back</button>
    <button class="flex-1 rounded-lg bg-blue-600 py-1.5 text-xs font-semibold text-white">Next</button>
  </div>
</aside>`,
    css: `.create-invoice-aside { display:flex; flex-direction:column; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.invoice-step { display:flex; align-items:center; gap:.75rem; border-radius:.75rem; padding:.5rem .625rem; transition:background .15s; cursor:pointer; }
.invoice-step.active { background:#eff6ff; }
.invoice-step-num { height:1.75rem; width:1.75rem; border-radius:9999px; border:2px solid #e4e4e7; display:flex; align-items:center; justify-content:center; font-size:.75rem; font-weight:700; flex-shrink:0; }
.invoice-step-num.current { border-color:#2563eb; color:#2563eb; }
.invoice-step-num.done { background:#2563eb; border-color:#2563eb; color:#fff; }`,
  },
  {
    id: 'ecom2-sidebar-transactions', name: 'Transactions Sidebar', category: 'eCommerce',
    description: 'Transaction sidebar with Income/Expense/Refund tabs and live feed of entries.',
    Preview: Ecom2SidebarTransactionsPreview,
    tailwind: `<aside class="flex h-72 w-56 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
    <p class="text-xs font-bold text-zinc-800">💸 Transactions</p>
    <span class="text-[10px] text-zinc-400">This month</span>
  </div>
  <div class="flex gap-1 border-b border-zinc-100 px-2 py-2">
    <button class="flex-1 rounded-lg bg-teal-600 py-1 text-[10px] font-semibold text-white">All</button>
    <button class="flex-1 rounded-lg bg-zinc-100 py-1 text-[10px] font-semibold text-zinc-500">Income</button>
    <button class="flex-1 rounded-lg bg-zinc-100 py-1 text-[10px] font-semibold text-zinc-500">Expense</button>
    <button class="flex-1 rounded-lg bg-zinc-100 py-1 text-[10px] font-semibold text-zinc-500">Refund</button>
  </div>
  <div class="flex-1 px-2 py-1.5 overflow-auto">
    <div class="flex items-center gap-2 rounded-lg px-2.5 py-2 hover:bg-zinc-50">
      <div class="h-6 w-6 rounded-lg bg-emerald-100 flex items-center justify-center text-xs">↑</div>
      <div class="flex-1"><p class="text-xs font-medium text-zinc-800 truncate">Order #4821</p><p class="text-[9px] text-zinc-400">2h ago</p></div>
      <span class="text-xs font-bold text-emerald-600">+$248</span>
    </div>
  </div>
</aside>`,
    css: `.transactions-aside { display:flex; flex-direction:column; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.txn-row { display:flex; align-items:center; gap:.5rem; border-radius:.5rem; padding:.5rem .625rem; transition:background .15s; }
.txn-row:hover { background:#fafafa; }
.txn-icon.income { background:#dcfce7; }
.txn-icon.expense { background:#fee2e2; }
.txn-icon.refund { background:#fef9c3; }
.txn-amount.income { color:#16a34a; }
.txn-amount.expense { color:#dc2626; }
.txn-amount.refund { color:#d97706; }`,
  },
  {
    id: 'ecom2-sidebar-single-txn', name: 'Single Transaction Sidebar', category: 'eCommerce',
    description: 'Transaction detail sidebar — amount hero, metadata rows, and refund CTA.',
    Preview: Ecom2SidebarSingleTxnPreview,
    tailwind: `<aside class="flex h-72 w-56 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
    <p class="text-xs font-bold text-zinc-800">Transaction Detail</p>
    <span class="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Success</span>
  </div>
  <div class="flex-1 px-4 py-3 overflow-auto">
    <div class="text-center py-3"><p class="text-2xl font-bold text-zinc-900">+$248.00</p><p class="text-[10px] text-zinc-400 mt-0.5">Apr 11, 2026 · 2:34 PM</p></div>
    <div class="space-y-1">
      <div class="flex justify-between border-b border-zinc-50 py-1"><p class="text-[10px] text-zinc-500">Order ID</p><p class="text-[10px] font-semibold text-zinc-800">#ORD-4821</p></div>
      <div class="flex justify-between border-b border-zinc-50 py-1"><p class="text-[10px] text-zinc-500">Net Amount</p><p class="text-[10px] font-semibold text-zinc-800">$240.80</p></div>
      <div class="flex justify-between border-b border-zinc-50 py-1"><p class="text-[10px] text-zinc-500">Fee</p><p class="text-[10px] font-semibold text-zinc-800">$7.20</p></div>
    </div>
    <button class="mt-3 w-full rounded-xl border border-zinc-200 py-2 text-xs font-semibold text-zinc-600">Issue Refund</button>
  </div>
</aside>`,
    css: `.txn-detail-aside { display:flex; flex-direction:column; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.txn-amount-hero { font-size:1.5rem; font-weight:700; color:#18181b; text-align:center; padding:.75rem 0; }
.txn-meta-row { display:flex; align-items:center; justify-content:space-between; padding:.25rem 0; border-bottom:1px solid #fafafa; font-size:.625rem; }
.txn-refund-btn { width:100%; border-radius:.75rem; border:1px solid #e4e4e7; padding:.5rem; font-size:.75rem; font-weight:600; color:#52525b; cursor:pointer; transition:background .15s; }
.txn-refund-btn:hover { background:#fafafa; }`,
  },
  {
    id: 'ecom2-sidebar-orders', name: 'Orders Status Sidebar', category: 'eCommerce',
    description: 'Orders sidebar with color-dot status filters and pending badge.',
    Preview: Ecom2SidebarOrdersPreview,
    tailwind: `<aside class="flex h-72 w-52 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
    <p class="text-xs font-bold text-zinc-800">🛒 Orders</p>
    <span class="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">12 pending</span>
  </div>
  <nav class="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
    <a href="#" class="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs text-zinc-600 hover:bg-zinc-50"><span class="h-2 w-2 rounded-full bg-zinc-300"></span><span class="flex-1 font-medium">All Orders</span><span class="text-[10px] text-zinc-400">142</span></a>
    <a href="#" class="flex items-center gap-2.5 rounded-lg bg-indigo-50 px-2.5 py-2 text-xs text-indigo-700"><span class="h-2 w-2 rounded-full bg-amber-400"></span><span class="flex-1 font-medium">Pending</span><span class="text-[10px] text-zinc-400">12</span></a>
    <a href="#" class="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs text-zinc-600 hover:bg-zinc-50"><span class="h-2 w-2 rounded-full bg-emerald-400"></span><span class="flex-1 font-medium">Delivered</span><span class="text-[10px] text-zinc-400">54</span></a>
  </nav>
</aside>`,
    css: `.orders-aside { display:flex; flex-direction:column; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.order-status { display:flex; align-items:center; gap:.625rem; border-radius:.5rem; padding:.5rem .625rem; font-size:.75rem; font-weight:500; text-decoration:none; transition:background .15s; }
.order-status:hover { background:#fafafa; }
.order-status.active { background:#eef2ff; color:#4338ca; }`,
  },
  {
    id: 'ecom2-sidebar-customers', name: 'Customers Sidebar', category: 'eCommerce',
    description: 'Customer segment filter sidebar with search bar and recent customer list.',
    Preview: Ecom2SidebarCustomersPreview,
    tailwind: `<aside class="flex h-72 w-52 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="border-b border-zinc-100 px-3 py-3">
    <div class="flex items-center gap-1.5 rounded-lg bg-zinc-100 px-2.5 py-1.5 mb-2 text-xs text-zinc-400">🔍 Search customers...</div>
    <div class="flex flex-wrap gap-1">
      <button class="rounded-md bg-rose-600 px-2 py-0.5 text-[10px] font-semibold text-white">All (1248)</button>
      <button class="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-500">VIP (84)</button>
      <button class="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-500">New (128)</button>
    </div>
  </div>
  <div class="flex-1 px-2 py-2 overflow-auto">
    <div class="flex items-center gap-2 rounded-lg px-2.5 py-2 hover:bg-zinc-50">
      <div class="h-7 w-7 rounded-full bg-rose-100 flex items-center justify-center text-[10px] font-bold text-rose-600">A</div>
      <div class="flex-1"><p class="text-xs font-semibold text-zinc-800">Alice Wang</p><p class="text-[9px] text-zinc-500">$4,820 lifetime</p></div>
      <span class="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[9px] font-bold text-zinc-500">VIP</span>
    </div>
  </div>
</aside>`,
    css: `.customers-aside { display:flex; flex-direction:column; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.customer-row { display:flex; align-items:center; gap:.5rem; border-radius:.5rem; padding:.5rem .625rem; transition:background .15s; cursor:pointer; }
.customer-row:hover { background:#fafafa; }
.customer-avatar { height:1.75rem; width:1.75rem; border-radius:9999px; display:flex; align-items:center; justify-content:center; font-size:.625rem; font-weight:700; flex-shrink:0; }`,
  },
  {
    id: 'ecom2-sidebar-analytics', name: 'Store Analytics Sidebar', category: 'eCommerce',
    description: 'eCommerce analytics sidebar with period toggle, 4 KPI mini-cards, and top product.',
    Preview: Ecom2SidebarAnalyticsPreview,
    tailwind: `<aside class="flex h-72 w-56 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="flex items-center justify-between border-b border-zinc-100 px-3 py-3">
    <p class="text-xs font-bold text-zinc-800">📊 Store Analytics</p>
    <div class="flex gap-1">
      <button class="rounded-md bg-violet-600 px-2 py-0.5 text-[10px] font-bold text-white">7D</button>
      <button class="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-500">30D</button>
    </div>
  </div>
  <div class="grid grid-cols-2 gap-2 p-3">
    <div class="rounded-xl bg-zinc-50 p-2.5"><p class="text-[9px] text-zinc-500">Revenue</p><p class="text-sm font-bold text-zinc-900">$12.4K</p><p class="text-[9px] font-bold text-emerald-600">+18%</p></div>
    <div class="rounded-xl bg-zinc-50 p-2.5"><p class="text-[9px] text-zinc-500">Orders</p><p class="text-sm font-bold text-zinc-900">284</p><p class="text-[9px] font-bold text-emerald-600">+9%</p></div>
  </div>
</aside>`,
    css: `.store-analytics-aside { display:flex; flex-direction:column; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.kpi-mini-card { border-radius:.75rem; background:#fafafa; padding:.625rem; }
.kpi-label { font-size:.5625rem; color:#71717a; font-weight:500; }
.kpi-value { font-size:.875rem; font-weight:700; color:#18181b; margin-top:.125rem; }
.kpi-change.up { font-size:.5625rem; font-weight:700; color:#16a34a; }
.kpi-change.down { font-size:.5625rem; font-weight:700; color:#dc2626; }`,
  },

  /* ── Calendar Sidebars ── */
  {
    id: 'cal-sidebar-main', name: 'Calendar Sidebar — Full', category: 'Calendar',
    description: 'Full calendar sidebar with mini-month picker and upcoming events list.',
    Preview: CalSidebarMainPreview,
    tailwind: `<aside class="flex h-80 w-52 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="flex items-center justify-between border-b border-zinc-100 px-3 py-2.5">
    <span class="text-xs font-bold text-zinc-800">April 2026</span>
    <div class="flex gap-1"><button class="px-1 text-zinc-400">‹</button><button class="px-1 text-zinc-400">›</button></div>
  </div>
  <div class="px-2 py-2">
    <div class="grid grid-cols-7 mb-1"><!-- day headers S M T W T F S --></div>
    <div class="grid grid-cols-7 gap-y-0.5"><!-- day buttons --></div>
  </div>
  <div class="flex-1 border-t border-zinc-100 px-2 py-2 overflow-auto">
    <p class="px-1 text-[9px] font-bold text-zinc-400 mb-1">TODAY</p>
    <div class="flex items-center gap-2 rounded-lg px-2 py-1.5"><span class="h-2 w-2 rounded-full bg-blue-500"></span><span class="text-[9px] font-bold text-zinc-400 w-7">9:00</span><span class="text-[10px] font-medium text-zinc-700">Team standup</span></div>
    <div class="flex items-center gap-2 rounded-lg px-2 py-1.5"><span class="h-2 w-2 rounded-full bg-violet-500"></span><span class="text-[9px] font-bold text-zinc-400 w-7">2:00</span><span class="text-[10px] font-medium text-zinc-700">1:1 with manager</span></div>
  </div>
</aside>`,
    css: `.cal-aside { display:flex; flex-direction:column; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.cal-day { height:1.5rem; width:1.5rem; border-radius:9999px; display:flex; align-items:center; justify-content:center; font-size:.625rem; font-weight:500; cursor:pointer; transition:background .15s; }
.cal-day:hover { background:#f4f4f5; }
.cal-day.today { outline:1px solid #60a5fa; color:#2563eb; }
.cal-day.selected { background:#2563eb; color:#fff; }
.cal-event-row { display:flex; align-items:center; gap:.5rem; border-radius:.5rem; padding:.375rem .5rem; transition:background .15s; }
.cal-event-row:hover { background:#fafafa; }`,
  },
  {
    id: 'cal-sidebar-mini-cal', name: 'Mini Calendar Picker Sidebar', category: 'Calendar',
    description: 'Interactive mini-month calendar with prev/next navigation, dot indicators for events.',
    Preview: CalSidebarMiniCalPreview,
    tailwind: `<aside class="flex h-72 w-52 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="flex items-center justify-between border-b border-zinc-100 px-3 py-2.5">
    <button class="px-1 text-zinc-400 text-sm">‹</button>
    <span class="text-xs font-bold text-zinc-800">April 2026</span>
    <button class="px-1 text-zinc-400 text-sm">›</button>
  </div>
  <div class="px-3 py-2">
    <div class="grid grid-cols-7 mb-1.5"><!-- S M T W T F S --></div>
    <div class="grid grid-cols-7 gap-y-1">
      <!-- day 11 selected: -->
      <button class="relative flex h-6 w-6 mx-auto items-center justify-center rounded-full bg-indigo-600 text-[10px] font-medium text-white">11</button>
    </div>
  </div>
</aside>`,
    css: `.mini-cal-aside { display:flex; flex-direction:column; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.mini-cal-day { position:relative; display:flex; flex-direction:column; align-items:center; height:1.5rem; width:1.5rem; margin:auto; border-radius:9999px; font-size:.625rem; font-weight:500; cursor:pointer; transition:background .15s; color:#3f3f46; }
.mini-cal-day:hover { background:#eef2ff; }
.mini-cal-day.selected { background:#4f46e5; color:#fff; }
.mini-cal-dot { position:absolute; bottom:1px; height:.25rem; width:.25rem; border-radius:9999px; background:#818cf8; }
.mini-cal-day.selected .mini-cal-dot { background:#fff; }`,
  },
  {
    id: 'cal-sidebar-events', name: 'Upcoming Events Sidebar', category: 'Calendar',
    description: 'Event list sidebar with color strip, time, location, and attendee count.',
    Preview: CalSidebarEventsPreview,
    tailwind: `<aside class="flex h-72 w-60 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
    <p class="text-xs font-bold text-zinc-800">📅 Upcoming Events</p>
    <button class="rounded-lg bg-blue-600 px-2 py-1 text-[10px] font-bold text-white">+ Add</button>
  </div>
  <div class="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
    <div class="flex items-center gap-2.5 rounded-xl bg-blue-50 px-2.5 py-2">
      <span class="h-8 w-1 rounded-full bg-blue-500"></span>
      <div class="flex-1 min-w-0"><p class="text-xs font-semibold text-zinc-800">Team standup</p><p class="text-[9px] text-zinc-500">Today · 9:00 AM · Zoom</p></div>
      <span class="text-[9px] text-zinc-400">8👥</span>
    </div>
    <div class="flex items-center gap-2.5 rounded-xl px-2.5 py-2 hover:bg-zinc-50">
      <span class="h-8 w-1 rounded-full bg-rose-500"></span>
      <div class="flex-1 min-w-0"><p class="text-xs font-semibold text-zinc-800">Board meeting</p><p class="text-[9px] text-zinc-500">Tomorrow · 10:30 AM</p></div>
    </div>
  </div>
</aside>`,
    css: `.events-aside { display:flex; flex-direction:column; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.event-card { display:flex; align-items:center; gap:.625rem; border-radius:.75rem; padding:.5rem .625rem; transition:background .15s; cursor:pointer; }
.event-card:hover { background:#fafafa; }
.event-card.active { background:#eff6ff; }
.event-strip { height:2rem; width:.25rem; border-radius:9999px; flex-shrink:0; }`,
  },
  {
    id: 'cal-sidebar-categories', name: 'Calendar Categories Sidebar', category: 'Calendar',
    description: 'Toggle calendar visibility by category — Work, Personal, Family, Sport with event counts.',
    Preview: CalSidebarCategoriesPreview,
    tailwind: `<aside class="flex h-72 w-52 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="border-b border-zinc-100 px-4 py-3"><p class="text-xs font-bold text-zinc-800">🗂️ Calendars</p></div>
  <div class="flex-1 px-3 py-2 space-y-0.5 overflow-auto">
    <p class="text-[9px] font-bold text-zinc-400 mb-1 tracking-widest">MY CALENDARS</p>
    <div class="flex items-center gap-2.5 rounded-lg px-1 py-1.5 hover:bg-zinc-50 cursor-pointer">
      <span class="h-3.5 w-3.5 rounded-sm bg-blue-500"></span>
      <span class="flex-1 text-xs font-medium text-zinc-700">Work</span>
      <span class="text-[9px] text-zinc-400">14</span>
    </div>
    <div class="flex items-center gap-2.5 rounded-lg px-1 py-1.5 hover:bg-zinc-50 cursor-pointer">
      <span class="h-3.5 w-3.5 rounded-sm bg-emerald-500"></span>
      <span class="flex-1 text-xs font-medium text-zinc-700">Personal</span>
      <span class="text-[9px] text-zinc-400">7</span>
    </div>
    <div class="flex items-center gap-2.5 rounded-lg px-1 py-1.5 cursor-pointer opacity-40">
      <span class="h-3.5 w-3.5 rounded-sm bg-zinc-200"></span>
      <span class="flex-1 text-xs font-medium text-zinc-400">Family</span>
      <span class="text-[9px] text-zinc-400">3</span>
    </div>
  </div>
</aside>`,
    css: `.categories-aside { display:flex; flex-direction:column; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.cal-category { display:flex; align-items:center; gap:.625rem; border-radius:.5rem; padding:.375rem .25rem; cursor:pointer; transition:opacity .15s; }
.cal-category.hidden { opacity:.4; }
.cal-category-dot { height:.875rem; width:.875rem; border-radius:.25rem; flex-shrink:0; transition:background .15s; }`,
  },
  {
    id: 'cal-sidebar-schedule', name: 'Day Schedule Sidebar', category: 'Calendar',
    description: 'Hour-by-hour day schedule sidebar with event blocks placed at correct times.',
    Preview: CalSidebarSchedulePreview,
    tailwind: `<aside class="flex h-72 w-52 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
    <p class="text-xs font-bold text-zinc-800">🗓️ Today — Apr 11</p>
    <span class="rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">3 events</span>
  </div>
  <div class="flex-1 overflow-auto px-2 py-2">
    <div class="flex items-start gap-2 mb-2">
      <span class="text-[9px] text-zinc-400 w-8 shrink-0 pt-0.5">9am</span>
      <div class="flex-1 border-t border-zinc-100">
        <div class="rounded-md bg-blue-500 px-2 py-1 text-[10px] font-semibold text-white" style="height:24px">Standup</div>
      </div>
    </div>
    <div class="flex items-start gap-2 mb-2">
      <span class="text-[9px] text-zinc-400 w-8 shrink-0 pt-0.5">11am</span>
      <div class="flex-1 border-t border-zinc-100">
        <div class="rounded-md bg-violet-500 px-2 py-1 text-[10px] font-semibold text-white" style="height:36px">Design Review</div>
      </div>
    </div>
  </div>
</aside>`,
    css: `.schedule-aside { display:flex; flex-direction:column; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.schedule-hour { display:flex; align-items:flex-start; gap:.5rem; margin-bottom:.5rem; }
.schedule-time { font-size:.5625rem; color:#a1a1aa; width:2rem; flex-shrink:0; padding-top:.125rem; }
.schedule-slot { flex:1; border-top:1px solid #f4f4f5; min-height:1.25rem; }
.schedule-event { border-radius:.375rem; padding:.25rem .5rem; font-size:.625rem; font-weight:600; color:#fff; }`,
  },
  {
    id: 'cal-sidebar-invites', name: 'Event Invites Sidebar', category: 'Calendar',
    description: 'Pending event invitations with Accept/Decline buttons and confirmation states.',
    Preview: CalSidebarInvitesPreview,
    tailwind: `<aside class="flex h-72 w-60 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
    <p class="text-xs font-bold text-zinc-800">📨 Invites</p>
    <span class="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-700">3 pending</span>
  </div>
  <div class="flex-1 px-2 py-2 space-y-1 overflow-auto">
    <div class="rounded-xl border border-zinc-100 p-2.5">
      <div class="flex items-start gap-2 mb-2">
        <span class="h-2 w-2 rounded-full mt-1 bg-violet-500"></span>
        <div><p class="text-xs font-semibold text-zinc-800">Q2 Planning</p><p class="text-[9px] text-zinc-500">Sarah M. · Apr 14, 10am</p></div>
      </div>
      <div class="flex gap-1.5">
        <button class="flex-1 rounded-md bg-emerald-500 py-1 text-[10px] font-bold text-white">Accept</button>
        <button class="flex-1 rounded-md border border-zinc-200 py-1 text-[10px] font-bold text-zinc-600">Decline</button>
      </div>
    </div>
  </div>
</aside>`,
    css: `.invites-aside { display:flex; flex-direction:column; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.invite-card { border-radius:.75rem; border:1px solid #f4f4f5; padding:.625rem; }
.invite-accept { flex:1; border-radius:.375rem; background:#22c55e; color:#fff; font-size:.625rem; font-weight:700; padding:.25rem; border:none; cursor:pointer; }
.invite-decline { flex:1; border-radius:.375rem; border:1px solid #e4e4e7; color:#52525b; font-size:.625rem; font-weight:700; padding:.25rem; cursor:pointer; background:transparent; }`,
  },
  {
    id: 'cal-sidebar-reminders', name: 'Reminders Sidebar', category: 'Calendar',
    description: 'Reminder checklist sidebar with priority levels, check-off, and strikethrough.',
    Preview: CalSidebarRemindersPreview,
    tailwind: `<aside class="flex h-72 w-60 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
    <p class="text-xs font-bold text-zinc-800">🔔 Reminders</p>
    <button class="rounded-lg bg-amber-500 px-2 py-1 text-[10px] font-bold text-white">+ Add</button>
  </div>
  <div class="flex-1 px-2 py-2 space-y-0.5 overflow-auto">
    <div class="flex items-center gap-2.5 rounded-xl px-2.5 py-2 hover:bg-zinc-50">
      <div class="h-4 w-4 shrink-0 rounded-full border-2 border-zinc-300 flex items-center justify-center"></div>
      <div class="flex-1 min-w-0">
        <p class="text-xs font-medium text-zinc-700 truncate">Team standup</p>
        <p class="text-[9px] font-semibold text-red-500">In 15 min · high</p>
      </div>
    </div>
    <div class="flex items-center gap-2.5 rounded-xl px-2.5 py-2 opacity-40">
      <div class="h-4 w-4 shrink-0 rounded-full border-2 bg-emerald-500 border-emerald-500 flex items-center justify-center"><span class="text-white text-[8px]">✓</span></div>
      <p class="text-xs font-medium text-zinc-400 line-through truncate">Weekly report</p>
    </div>
  </div>
</aside>`,
    css: `.reminders-aside { display:flex; flex-direction:column; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.reminder-row { display:flex; align-items:center; gap:.625rem; border-radius:.75rem; padding:.5rem .625rem; transition:opacity .15s; }
.reminder-row.done { opacity:.4; }
.reminder-check { height:1rem; width:1rem; border-radius:9999px; border:2px solid #d4d4d8; display:flex; align-items:center; justify-content:center; cursor:pointer; flex-shrink:0; transition:background .15s, border-color .15s; }
.reminder-check.checked { background:#22c55e; border-color:#22c55e; }`,
  },
  {
    id: 'cal-sidebar-search', name: 'Calendar Search Sidebar', category: 'Calendar',
    description: 'Calendar search sidebar with view toggle (Day/Week/Month/Year) and upcoming results.',
    Preview: CalSidebarSearchPreview,
    tailwind: `<aside class="flex h-72 w-56 flex-col rounded-2xl border border-zinc-100 bg-white shadow-lg overflow-hidden">
  <div class="border-b border-zinc-100 px-3 py-3 space-y-2">
    <div class="flex items-center gap-1.5 rounded-xl border border-zinc-200 px-2.5 py-2">
      <span class="text-zinc-400 text-xs">🔍</span>
      <input placeholder="Search events..." class="flex-1 text-xs bg-transparent focus:outline-none placeholder:text-zinc-400" />
    </div>
    <div class="flex gap-1">
      <button class="flex-1 rounded-lg bg-emerald-600 py-1 text-[10px] font-bold text-white">Month</button>
      <button class="flex-1 rounded-lg bg-zinc-100 py-1 text-[10px] font-bold text-zinc-500">Day</button>
      <button class="flex-1 rounded-lg bg-zinc-100 py-1 text-[10px] font-bold text-zinc-500">Week</button>
      <button class="flex-1 rounded-lg bg-zinc-100 py-1 text-[10px] font-bold text-zinc-500">Year</button>
    </div>
  </div>
  <div class="flex-1 px-2 py-2 overflow-auto">
    <p class="px-1 text-[9px] font-bold text-zinc-400 mb-1">UPCOMING</p>
    <div class="flex items-center gap-2.5 rounded-xl px-2.5 py-2 hover:bg-zinc-50">
      <span class="h-2 w-2 rounded-full bg-blue-500"></span>
      <div><p class="text-xs font-semibold text-zinc-800">Team standup</p><p class="text-[9px] text-zinc-500">Daily 9am</p></div>
    </div>
  </div>
</aside>`,
    css: `.cal-search-aside { display:flex; flex-direction:column; border-radius:1rem; border:1px solid #f4f4f5; background:#fff; overflow:hidden; }
.cal-view-btn { flex:1; border-radius:.5rem; padding:.25rem; font-size:.625rem; font-weight:700; cursor:pointer; transition:background .15s; border:none; }
.cal-view-btn.active { background:#16a34a; color:#fff; }
.cal-view-btn:not(.active) { background:#f4f4f5; color:#71717a; }`,
  },

  /* ── Charts ── */
  {
    id: 'line-chart', name: 'Line Chart', category: 'Charts',
    description: 'Revenue trend line chart with gradient fill and indigo polyline.',
    Preview: LineChartPreview,
    tailwind: `<div class="rounded-2xl border border-zinc-100 shadow-sm p-4 bg-white">
  <div class="flex justify-between mb-3"><div><p class="text-xs font-semibold text-zinc-500 uppercase">Revenue</p><p class="text-2xl font-bold">$12,430</p></div><span class="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">+8.2%</span></div>
  <svg viewBox="0 0 280 120" class="w-full"><polyline points="10,100 32,78 55,88 78,52 100,60 123,30 145,38 168,10 190,25 213,10" fill="none" stroke="#6366f1" stroke-width="2" stroke-linejoin="round"/></svg>
</div>`,
    css: `.line-chart { border-radius:1rem; border:1px solid #f4f4f5; padding:1rem; background:#fff; } .line-chart polyline { fill:none; stroke:#6366f1; stroke-width:2; }`,
  },
  {
    id: 'bar-chart', name: 'Bar Chart', category: 'Charts',
    description: 'Monthly sales vertical bar chart with rounded tops.',
    Preview: BarChartV2Preview,
    tailwind: `<div class="rounded-2xl border border-zinc-100 shadow-sm p-4 bg-white">
  <p class="text-xs font-semibold text-zinc-500 uppercase mb-4">Monthly Sales</p>
  <div class="flex items-end gap-2 h-28">
    <div class="flex-1 flex flex-col items-center gap-1"><div class="w-full rounded-t-lg bg-blue-500 h-3/4"/><span class="text-[9px] text-zinc-400">Mon</span></div>
  </div>
</div>`,
    css: `.bar-chart { border-radius:1rem; border:1px solid #f4f4f5; padding:1rem; } .bar { background:#3b82f6; border-radius:.25rem .25rem 0 0; }`,
  },
  {
    id: 'horizontal-bar', name: 'Horizontal Bar Chart', category: 'Charts',
    description: 'Category breakdown horizontal bar chart.',
    Preview: HorizontalBarPreview,
    tailwind: `<div class="rounded-2xl border border-zinc-100 shadow-sm p-4 bg-white space-y-3">
  <div><div class="flex justify-between text-xs mb-1"><span>Electronics</span><span>82%</span></div><div class="h-2.5 w-full rounded-full bg-zinc-100"><div class="h-full rounded-full bg-indigo-500 w-4/5"/></div></div>
</div>`,
    css: `.hbar-track { height:.625rem; background:#f4f4f5; border-radius:9999px; } .hbar-fill { height:100%; background:#6366f1; border-radius:9999px; }`,
  },
  {
    id: 'area-chart', name: 'Area Chart', category: 'Charts',
    description: 'Multi-series area chart with two overlapping gradient areas.',
    Preview: AreaChartPreview,
    tailwind: `<div class="rounded-2xl border border-zinc-100 shadow-sm p-4 bg-white">
  <p class="text-sm font-bold mb-3">Traffic Overview</p>
  <svg viewBox="0 0 280 110" class="w-full"><defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.3"/><stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"/></linearGradient></defs><polygon points="8,102 ..." fill="url(#ag)"/><polyline points="8,78 ..." fill="none" stroke="#8b5cf6" stroke-width="2"/></svg>
</div>`,
    css: `.area-chart { border-radius:1rem; border:1px solid #f4f4f5; padding:1rem; } .area-fill { fill:url(#gradient); }`,
  },
  {
    id: 'multi-line-chart', name: 'Multi-Line Chart', category: 'Charts',
    description: 'Two data series performance line chart.',
    Preview: MultiLineChartPreview,
    tailwind: `<div class="rounded-2xl border border-zinc-100 shadow-sm p-4 bg-white">
  <p class="text-sm font-bold mb-2">Performance</p>
  <svg viewBox="0 0 280 110" class="w-full"><polyline points="..." fill="none" stroke="#6366f1" stroke-width="2.5"/><polyline points="..." fill="none" stroke="#fb7185" stroke-width="2.5" stroke-dasharray="4 2"/></svg>
</div>`,
    css: `.multi-line { stroke-width:2.5; fill:none; stroke-linecap:round; }`,
  },
  {
    id: 'pie-chart', name: 'Pie Chart', category: 'Charts',
    description: 'Traffic sources pie chart with 4 SVG arc segments and legend.',
    Preview: PieChartPreview,
    tailwind: `<div class="rounded-2xl border border-zinc-100 shadow-sm p-4 bg-white"><p class="text-sm font-bold mb-3">Traffic Sources</p><div class="flex gap-6"><svg viewBox="0 0 120 120" class="w-28"><path d="M 60 60 L 60 10 A 50 50 0 0 1 103 85 Z" fill="#6366f1"/></svg></div></div>`,
    css: `.pie-segment { stroke:none; } .pie-legend { display:flex; align-items:center; gap:.5rem; font-size:.75rem; }`,
  },
  {
    id: 'donut-chart', name: 'Donut Chart', category: 'Charts',
    description: 'Storage usage donut chart with SVG stroke-dasharray and legend.',
    Preview: DonutChartV2Preview,
    tailwind: `<div class="rounded-2xl border border-zinc-100 shadow-sm p-4 bg-white"><p class="text-sm font-bold mb-3">Storage Usage</p><svg viewBox="0 0 100 100" class="w-28"><circle cx="50" cy="50" r="40" fill="none" stroke="#f4f4f5" stroke-width="14"/><circle cx="50" cy="50" r="40" fill="none" stroke="#6366f1" stroke-width="14" stroke-dasharray="171 251" transform="rotate(-90 50 50)"/></svg></div>`,
    css: `.donut-track { fill:none; stroke:#f4f4f5; stroke-width:14; } .donut-fill { fill:none; stroke:#6366f1; stroke-width:14; stroke-linecap:round; }`,
  },
  {
    id: 'stacked-bar', name: 'Stacked Bar Chart', category: 'Charts',
    description: 'Quarterly revenue stacked bar chart with 3 layers per bar.',
    Preview: StackedBarPreview,
    tailwind: `<div class="rounded-2xl border border-zinc-100 shadow-sm p-4 bg-white"><p class="text-sm font-bold mb-4">Quarterly Revenue</p><div class="flex items-end gap-2 h-28"><div class="flex-1 flex flex-col-reverse rounded-t overflow-hidden h-4/5"><div class="bg-indigo-500 h-1/2"/><div class="bg-blue-400 h-1/3"/><div class="bg-cyan-300 h-1/6"/></div></div></div>`,
    css: `.stacked-bar { display:flex; flex-direction:column-reverse; border-radius:.25rem .25rem 0 0; overflow:hidden; }`,
  },
  {
    id: 'sparklines', name: 'Sparklines Row', category: 'Charts',
    description: '3 mini inline sparklines with label and value.',
    Preview: SparklinesPreview,
    tailwind: `<div class="rounded-2xl border border-zinc-100 shadow-sm p-4 bg-white space-y-3"><div class="flex items-center gap-3"><div class="w-24"><p class="text-xs font-semibold">Revenue</p><p class="text-base font-bold">$24.5K</p></div><svg class="flex-1 h-8"><polyline points="..." fill="none" stroke="#6366f1" stroke-width="2"/></svg><span class="text-xs font-bold text-emerald-600">+12%</span></div></div>`,
    css: `.sparkline { fill:none; stroke:#6366f1; stroke-width:2; stroke-linejoin:round; }`,
  },
  {
    id: 'candlestick', name: 'Candlestick Chart', category: 'Charts',
    description: '8 OHLC candles with green/red coloring for BTC/USD.',
    Preview: CandlestickPreview,
    tailwind: `<div class="rounded-2xl border border-zinc-100 shadow-sm p-4 bg-white"><div class="flex justify-between mb-2"><p class="text-sm font-bold">BTC/USD</p><span class="text-xs font-bold text-emerald-600">$90,420 ↑</span></div><svg viewBox="0 0 280 120" class="w-full"><line x1="21" y1="20" x2="21" y2="110" stroke="#22c55e" stroke-width="1.5"/><rect x="10" y="35" width="22" height="40" fill="#22c55e" rx="2"/></svg></div>`,
    css: `.candle-bull { fill:#22c55e; } .candle-bear { fill:#ef4444; } .candle-wick { stroke-width:1.5; }`,
  },
  {
    id: 'stock-area', name: 'Stock Area Chart', category: 'Charts',
    description: 'AAPL price line with gradient fill and volume bars below.',
    Preview: StockAreaPreview,
    tailwind: `<div class="rounded-2xl border border-zinc-100 shadow-sm p-4 bg-white"><div class="flex justify-between mb-1"><div><p class="text-xs text-zinc-500">AAPL</p><p class="text-xl font-bold">$185.40</p></div><span class="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">+2.1%</span></div></div>`,
    css: `.stock-area { fill:url(#stockGrad); } .stock-line { fill:none; stroke:#6366f1; stroke-width:2; }`,
  },
  {
    id: 'currency-rates', name: 'Currency Rate Board', category: 'Charts',
    description: '5 currency pairs with live rate and change indicator.',
    Preview: CurrencyRatesPreview,
    tailwind: `<div class="rounded-2xl border border-zinc-100 shadow-sm p-4 bg-white"><p class="text-sm font-bold mb-3">FX Rates</p><div class="divide-y divide-zinc-100"><div class="flex items-center justify-between py-2"><div class="flex items-center gap-2"><span class="text-[10px] font-bold bg-zinc-100 rounded px-1.5">EUR</span><span class="text-zinc-300">→</span><span class="text-[10px] font-bold bg-zinc-100 rounded px-1.5">USD</span></div><span class="text-sm font-bold">1.0842</span><span class="text-xs font-semibold text-emerald-600">+0.12%</span></div></div></div>`,
    css: `.fx-pair { display:flex; align-items:center; justify-content:space-between; padding:.5rem 0; border-bottom:1px solid #f4f4f5; }`,
  },
  {
    id: 'gauge-chart', name: 'Gauge / Meter Chart', category: 'Charts',
    description: 'SVG semicircle arc gauge with needle pointer for CPU usage.',
    Preview: GaugeChartPreview,
    tailwind: `<div class="rounded-2xl border border-zinc-100 shadow-sm p-4 bg-white text-center"><p class="text-sm font-bold mb-2">CPU Usage</p><svg viewBox="0 0 140 100" class="w-48 mx-auto"><path d="M 20 80 A 50 50 0 1 1 120 80" fill="none" stroke="#f4f4f5" stroke-width="12" stroke-linecap="round"/><path d="M 20 80 A 50 50 0 0 1 106 38" fill="none" stroke="#6366f1" stroke-width="12" stroke-linecap="round"/></svg></div>`,
    css: `.gauge-track { fill:none; stroke:#f4f4f5; stroke-width:12; stroke-linecap:round; } .gauge-fill { fill:none; stroke:#6366f1; stroke-width:12; stroke-linecap:round; }`,
  },
  {
    id: 'heatmap', name: 'Activity Heatmap', category: 'Charts',
    description: 'GitHub-style 7×12 contribution heatmap with intensity coloring.',
    Preview: HeatmapV2Preview,
    tailwind: `<div class="rounded-2xl border border-zinc-100 shadow-sm p-4 bg-white"><p class="text-sm font-bold mb-3">Activity Heatmap</p><div class="flex gap-1"><div class="flex flex-col gap-1"><div class="w-3 h-3 rounded-sm bg-emerald-500"/><div class="w-3 h-3 rounded-sm bg-emerald-300"/><div class="w-3 h-3 rounded-sm bg-zinc-100"/></div></div></div>`,
    css: `.heatmap-cell { width:.75rem; height:.75rem; border-radius:2px; } .heatmap-0 { background:#f4f4f5; } .heatmap-4 { background:#15803d; }`,
  },
  {
    id: 'funnel-chart', name: 'Funnel Chart', category: 'Charts',
    description: '4-stage sales funnel with trapezoid shapes and percentage labels.',
    Preview: FunnelChartPreview,
    tailwind: `<div class="rounded-2xl border border-zinc-100 shadow-sm p-4 bg-white"><p class="text-sm font-bold mb-4">Sales Funnel</p><div class="space-y-1.5"><div class="flex items-center gap-3"><span class="text-xs text-zinc-500 w-20 text-right">Visitors</span><div class="flex-1 flex justify-center"><div class="bg-indigo-500 rounded h-7 w-full flex items-center justify-center"><span class="text-[10px] font-bold text-white">10,000</span></div></div></div></div></div>`,
    css: `.funnel-stage { display:flex; align-items:center; border-radius:.25rem; height:1.75rem; } .funnel-label { font-size:.625rem; font-weight:700; color:#fff; }`,
  },
  {
    id: 'radial-bar', name: 'Radial Bar Chart', category: 'Charts',
    description: '4 concentric SVG arcs at different radii showing system metrics.',
    Preview: RadialBarPreview,
    tailwind: `<div class="rounded-2xl border border-zinc-100 shadow-sm p-4 bg-white"><p class="text-sm font-bold mb-3">System Metrics</p><svg viewBox="0 0 110 110" class="w-32"><circle cx="55" cy="55" r="42" fill="none" stroke="#f4f4f5" stroke-width="7"/><circle cx="55" cy="55" r="42" fill="none" stroke="#6366f1" stroke-width="7" stroke-dasharray="190 267" stroke-linecap="round" transform="rotate(-90 55 55)"/></svg></div>`,
    css: `.radial-track { fill:none; stroke:#f4f4f5; } .radial-fill { fill:none; stroke-linecap:round; transform-origin:center; transform:rotate(-90deg); }`,
  },
  {
    id: 'bubble-chart', name: 'Bubble Chart', category: 'Charts',
    description: '6 bubbles varying in size and color positioned at x,y coordinates.',
    Preview: BubbleChartPreview,
    tailwind: `<div class="rounded-2xl border border-zinc-100 shadow-sm p-4 bg-white"><p class="text-sm font-bold mb-2">Market Share</p><svg viewBox="0 0 100 100" class="w-full h-40 border border-zinc-100 rounded-xl"><circle cx="30" cy="60" r="18" fill="#6366f1" fill-opacity="0.8"/><circle cx="55" cy="35" r="24" fill="#22d3ee" fill-opacity="0.8"/></svg></div>`,
    css: `.bubble { fill-opacity:.8; } .bubble-label { fill:#fff; font-size:.4rem; font-weight:700; text-anchor:middle; }`,
  },
  {
    id: 'histogram', name: 'Histogram', category: 'Charts',
    description: 'Distribution histogram with 12 bars and normal curve overlay.',
    Preview: HistogramPreview,
    tailwind: `<div class="rounded-2xl border border-zinc-100 shadow-sm p-4 bg-white"><p class="text-sm font-bold mb-3">Distribution</p><svg viewBox="0 0 280 100" class="w-full"><rect x="1" y="85" width="21" height="5" fill="#6366f1" fill-opacity="0.7" rx="2"/><polyline points="12,90 35,70 58,45 ..." fill="none" stroke="#f59e0b" stroke-width="2"/></svg></div>`,
    css: `.histogram-bar { fill:#6366f1; fill-opacity:.7; border-radius:2px 2px 0 0; } .histogram-curve { fill:none; stroke:#f59e0b; stroke-width:2; stroke-linejoin:round; }`,
  },

  /* ── Tables ── */
  {
    id: 'basic-table-v2', name: 'Basic Table', category: 'Tables',
    description: 'Clean 4-column table with Name, Email, Role, Status.',
    Preview: BasicTableV2Preview,
    tailwind: `<table class="w-full text-sm"><thead class="bg-zinc-50 border-b border-zinc-100"><tr><th class="px-4 py-3 text-left text-xs font-bold text-zinc-500 uppercase">Name</th><th class="px-4 py-3 text-left text-xs font-bold text-zinc-500 uppercase">Email</th></tr></thead><tbody class="divide-y divide-zinc-100"><tr class="hover:bg-zinc-50"><td class="px-4 py-3 font-medium text-zinc-800">Alice Johnson</td><td class="px-4 py-3 text-zinc-500">alice@acme.com</td></tr></tbody></table>`,
    css: `.table { width:100%; font-size:.875rem; border-collapse:collapse; } .table th { padding:.75rem 1rem; text-align:left; font-size:.75rem; font-weight:700; color:#71717a; background:#fafafa; } .table td { padding:.75rem 1rem; border-bottom:1px solid #f4f4f5; }`,
  },
  {
    id: 'striped-table', name: 'Striped Table', category: 'Tables',
    description: 'Alternating row colors with indigo header.',
    Preview: StripedTablePreview,
    tailwind: `<table class="w-full text-sm"><thead class="bg-indigo-600 text-white"><tr><th class="px-4 py-3 text-left text-xs font-bold uppercase">Name</th></tr></thead><tbody><tr class="bg-white"><td class="px-4 py-2.5">Alex Turner</td></tr><tr class="bg-indigo-50/40"><td class="px-4 py-2.5">Jamie Lee</td></tr></tbody></table>`,
    css: `.striped-table tr:nth-child(even) { background:#eef2ff55; } .striped-table thead { background:#4f46e5; color:#fff; }`,
  },
  {
    id: 'bordered-table', name: 'Bordered Table', category: 'Tables',
    description: 'All-cell bordered table for financial data.',
    Preview: BorderedTablePreview,
    tailwind: `<table class="w-full text-sm border-collapse"><thead><tr><th class="border border-zinc-200 px-4 py-2 text-left text-xs font-bold text-zinc-600 bg-zinc-50">Quarter</th></tr></thead><tbody><tr><td class="border border-zinc-200 px-4 py-2.5">Q1</td></tr></tbody></table>`,
    css: `.bordered-table { border-collapse:collapse; } .bordered-table td, .bordered-table th { border:1px solid #e4e4e7; padding:.625rem 1rem; }`,
  },
  {
    id: 'compact-table', name: 'Compact Dense Table', category: 'Tables',
    description: 'Tight padding table showing 6+ rows of order data.',
    Preview: CompactTablePreview,
    tailwind: `<table class="w-full text-xs"><thead class="bg-zinc-50 border-b border-zinc-100"><tr><th class="px-3 py-2 text-left font-bold text-zinc-500 uppercase">Order</th><th class="px-3 py-2 text-left font-bold text-zinc-500 uppercase">Item</th></tr></thead><tbody class="divide-y divide-zinc-50"><tr class="hover:bg-zinc-50"><td class="px-3 py-1.5 font-mono text-indigo-600">#1042</td></tr></tbody></table>`,
    css: `.compact-table td, .compact-table th { padding:.375rem .75rem; font-size:.75rem; } .compact-table tbody tr:hover { background:#fafafa; }`,
  },
  {
    id: 'data-table-paginated', name: 'Data Table with Pagination', category: 'Tables',
    description: 'Sortable columns with prev/next pagination controls.',
    Preview: DataTablePaginatedPreview,
    tailwind: `<div class="rounded-2xl border border-zinc-100 shadow-sm overflow-hidden"><table class="w-full text-sm"><thead class="bg-zinc-50"><tr><th class="px-4 py-3 text-left text-xs font-bold text-zinc-500 cursor-pointer">Name ↑</th></tr></thead></table><div class="flex justify-between px-4 py-3 border-t border-zinc-100 bg-zinc-50"><span class="text-xs text-zinc-500">Page 1 of 2</span><div class="flex gap-1"><button class="px-2.5 py-1 text-xs rounded border border-zinc-200">Prev</button><button class="px-2.5 py-1 text-xs rounded border border-zinc-200">Next</button></div></div></div>`,
    css: `.paginated-table th { cursor:pointer; } .paginated-table th:hover { color:#18181b; } .pagination-bar { display:flex; justify-content:space-between; padding:.75rem 1rem; border-top:1px solid #f4f4f5; }`,
  },
  {
    id: 'action-table', name: 'Table with Row Actions', category: 'Tables',
    description: 'Edit/Delete action buttons per row.',
    Preview: ActionTablePreview,
    tailwind: `<table class="w-full text-sm"><thead class="bg-zinc-50 border-b border-zinc-100"><tr><th class="px-4 py-3 text-left text-xs font-bold text-zinc-500 uppercase">Name</th><th class="px-4 py-3 text-left text-xs font-bold text-zinc-500 uppercase">Actions</th></tr></thead><tbody class="divide-y divide-zinc-100"><tr class="hover:bg-zinc-50"><td class="px-4 py-3 font-medium">Project Alpha</td><td class="px-4 py-3"><div class="flex gap-1.5"><button class="rounded px-2 py-1 text-xs font-semibold bg-blue-50 text-blue-600">Edit</button><button class="rounded px-2 py-1 text-xs font-semibold bg-red-50 text-red-600">Delete</button></div></td></tr></tbody></table>`,
    css: `.action-table .btn-edit { background:#eff6ff; color:#2563eb; border-radius:.25rem; padding:.25rem .5rem; font-size:.75rem; } .action-table .btn-delete { background:#fef2f2; color:#dc2626; }`,
  },
  {
    id: 'status-table', name: 'Status Column Table', category: 'Tables',
    description: 'Member table with avatar, status dot, and progress bar.',
    Preview: StatusTablePreview,
    tailwind: `<table class="w-full text-sm"><thead class="bg-zinc-50 border-b border-zinc-100"><tr><th class="px-4 py-3 text-left text-xs font-bold text-zinc-500 uppercase">Member</th><th class="px-4 py-3 text-left text-xs font-bold text-zinc-500 uppercase">Status</th></tr></thead><tbody class="divide-y divide-zinc-100"><tr><td class="px-4 py-3"><div class="flex items-center gap-2"><div class="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">SK</div><span>Sarah K</span></div></td><td class="px-4 py-3"><span class="flex items-center gap-1.5 text-xs"><span class="w-2 h-2 rounded-full bg-emerald-500"></span>Online</span></td></tr></tbody></table>`,
    css: `.status-avatar { width:1.75rem; height:1.75rem; border-radius:9999px; } .status-dot { width:.5rem; height:.5rem; border-radius:9999px; display:inline-block; }`,
  },
  {
    id: 'checkbox-table', name: 'Selectable Table', category: 'Tables',
    description: 'Row checkboxes with select-all header checkbox.',
    Preview: CheckboxTablePreview,
    tailwind: `<table class="w-full text-sm"><thead class="bg-zinc-50 border-b border-zinc-100"><tr><th class="px-4 py-3 w-10"><input type="checkbox" class="rounded"/></th><th class="px-4 py-3 text-left text-xs font-bold text-zinc-500 uppercase">Task</th></tr></thead><tbody class="divide-y divide-zinc-100"><tr class="hover:bg-zinc-50"><td class="px-4 py-3"><input type="checkbox" class="rounded"/></td><td class="px-4 py-3 font-medium">Homepage Redesign</td></tr></tbody></table>`,
    css: `.checkbox-table tr.selected { background:#eef2ff55; } .checkbox-table input[type=checkbox] { border-radius:.25rem; accent-color:#4f46e5; }`,
  },
  {
    id: 'expandable-table', name: 'Expandable Row Table', category: 'Tables',
    description: 'Click to expand row and reveal order item details.',
    Preview: ExpandableTablePreview,
    tailwind: `<table class="w-full text-sm"><thead class="bg-zinc-50 border-b border-zinc-100"><tr><th class="px-4 py-3 w-8"></th><th class="px-4 py-3 text-left text-xs font-bold text-zinc-500 uppercase">Order</th></tr></thead><tbody><tr class="hover:bg-zinc-50 border-b border-zinc-100 cursor-pointer"><td class="px-4 py-3 text-zinc-400">▶</td><td class="px-4 py-3 font-medium">Order #1042</td></tr></tbody></table>`,
    css: `.expandable-table .expand-icon { color:#a1a1aa; transition:transform .15s; } .expandable-table .expand-icon.open { transform:rotate(90deg); } .expandable-row { background:#fafafa; }`,
  },

  /* ── Alerts ── */
  {
    id: 'alert-success', name: 'Success Alert', category: 'Alerts',
    description: 'Green dismissable success alert with icon.',
    Preview: AlertSuccessPreview,
    tailwind: `<div class="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3"><svg class="text-emerald-600 mt-0.5 shrink-0" .../><div class="flex-1"><p class="text-sm font-semibold text-emerald-800">Successfully saved!</p><p class="text-xs text-emerald-700 mt-0.5">Your changes have been saved.</p></div><button class="text-emerald-400 hover:text-emerald-600">✕</button></div>`,
    css: `.alert-success { display:flex; align-items:flex-start; gap:.75rem; border-radius:.75rem; border:1px solid #a7f3d0; background:#ecfdf5; padding:.75rem 1rem; }`,
  },
  {
    id: 'alert-variants', name: 'Alert Variants', category: 'Alerts',
    description: 'All 4 alert variants: success, warning, error, info.',
    Preview: AlertVariantsPreview,
    tailwind: `<div class="space-y-2">
  <div class="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800"><span>✓</span><div><p class="text-sm font-semibold">Success</p><p class="text-xs">Operation completed.</p></div></div>
  <div class="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800"><span>⚠</span><div><p class="text-sm font-semibold">Warning</p><p class="text-xs">Review before proceeding.</p></div></div>
</div>`,
    css: `.alert { display:flex; gap:.75rem; border-radius:.75rem; border-width:1px; padding:.75rem 1rem; font-size:.875rem; } .alert-success { background:#ecfdf5; border-color:#a7f3d0; color:#065f46; } .alert-warning { background:#fffbeb; border-color:#fde68a; color:#92400e; } .alert-error { background:#fef2f2; border-color:#fecaca; color:#991b1b; } .alert-info { background:#eff6ff; border-color:#bfdbfe; color:#1e40af; }`,
  },
  {
    id: 'alert-banner', name: 'Alert Banner', category: 'Alerts',
    description: 'Full-width top banner with action button and dismiss.',
    Preview: AlertBannerPreview,
    tailwind: `<div class="flex items-center gap-3 rounded-xl bg-indigo-600 px-4 py-3 text-white"><svg .../><p class="flex-1 text-sm font-medium">New version available! Update now.</p><button class="rounded-lg bg-white/20 px-3 py-1 text-xs font-bold hover:bg-white/30">Update</button><button class="text-white/60 hover:text-white">✕</button></div>`,
    css: `.alert-banner { display:flex; align-items:center; gap:.75rem; border-radius:.75rem; background:#4f46e5; padding:.75rem 1rem; color:#fff; } .alert-banner-action { background:rgba(255,255,255,.2); border-radius:.5rem; padding:.25rem .75rem; font-size:.75rem; font-weight:700; }`,
  },

  /* ── Avatars ── */
  {
    id: 'avatar-basic', name: 'Avatar Sizes', category: 'Avatars',
    description: '4 avatar sizes with initials and gradient icon styles.',
    Preview: AvatarBasicPreview,
    tailwind: `<div class="flex items-end gap-5">
  <div class="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-[9px] font-bold text-indigo-600">AJ</div>
  <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">AJ</div>
  <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">AJ</div>
  <div class="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-base font-bold text-indigo-600">AJ</div>
</div>`,
    css: `.avatar { border-radius:9999px; display:flex; align-items:center; justify-content:center; font-weight:700; } .avatar-xs { width:1.5rem; height:1.5rem; font-size:.5625rem; } .avatar-sm { width:2rem; height:2rem; font-size:.625rem; } .avatar-md { width:2.5rem; height:2.5rem; font-size:.75rem; } .avatar-lg { width:3.5rem; height:3.5rem; font-size:1rem; }`,
  },
  {
    id: 'avatar-group', name: 'Avatar Group', category: 'Avatars',
    description: 'Overlapping stack of 5 avatars with overflow count badge.',
    Preview: AvatarGroupV2Preview,
    tailwind: `<div class="flex -space-x-3">
  <div class="w-10 h-10 rounded-full bg-indigo-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white">AJ</div>
  <div class="w-10 h-10 rounded-full bg-blue-400 border-2 border-white flex items-center justify-center text-xs font-bold text-white">BK</div>
  <div class="w-10 h-10 rounded-full bg-zinc-100 border-2 border-white flex items-center justify-center text-xs font-bold text-zinc-600">+8</div>
</div>`,
    css: `.avatar-group { display:flex; } .avatar-group .avatar { margin-left:-.75rem; border:2px solid #fff; } .avatar-group .avatar:first-child { margin-left:0; } .avatar-overflow { background:#f4f4f5; color:#52525b; }`,
  },
  {
    id: 'avatar-status', name: 'Avatar with Status', category: 'Avatars',
    description: 'Avatars with online/away/busy/offline status dots.',
    Preview: AvatarStatusPreview,
    tailwind: `<div class="relative inline-block">
  <div class="w-11 h-11 rounded-full bg-indigo-400 flex items-center justify-center text-sm font-bold text-white">AJ</div>
  <span class="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>
</div>`,
    css: `.avatar-status-wrapper { position:relative; display:inline-block; } .status-dot { position:absolute; bottom:0; right:0; width:.75rem; height:.75rem; border-radius:9999px; border:2px solid #fff; } .status-online { background:#22c55e; } .status-away { background:#f59e0b; } .status-busy { background:#ef4444; } .status-offline { background:#d4d4d8; }`,
  },

  /* ── Badge ── */
  {
    id: 'badge-basic', name: 'Basic Badges', category: 'Badge',
    description: '6 color pill badge variants.',
    Preview: BadgeBasicPreview,
    tailwind: `<div class="flex flex-wrap gap-2">
  <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700">New</span>
  <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700">Active</span>
  <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-amber-100 text-amber-700">Pending</span>
  <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-red-100 text-red-700">Danger</span>
</div>`,
    css: `.badge { display:inline-flex; align-items:center; border-radius:9999px; padding:.25rem .75rem; font-size:.75rem; font-weight:600; } .badge-blue { background:#dbeafe; color:#1d4ed8; } .badge-green { background:#d1fae5; color:#065f46; } .badge-amber { background:#fef3c7; color:#92400e; } .badge-red { background:#fee2e2; color:#991b1b; }`,
  },
  {
    id: 'badge-dot', name: 'Dot Badges', category: 'Badge',
    description: 'Notification count dots on icon buttons.',
    Preview: BadgeDotPreview,
    tailwind: `<div class="relative inline-block">
  <button class="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-600">🔔</button>
  <span class="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1">5</span>
</div>`,
    css: `.badge-dot { position:absolute; top:-.25rem; right:-.25rem; min-width:1.125rem; height:1.125rem; border-radius:9999px; background:#ef4444; color:#fff; font-size:.5625rem; font-weight:700; display:flex; align-items:center; justify-content:center; padding:0 .25rem; }`,
  },
  {
    id: 'badge-outlined', name: 'Outlined Badges', category: 'Badge',
    description: 'Bordered transparent outline badge variants.',
    Preview: BadgeOutlinedPreview,
    tailwind: `<div class="flex flex-wrap gap-2">
  <span class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-zinc-300 text-zinc-600">Draft</span>
  <span class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-emerald-400 text-emerald-700">Approved</span>
  <span class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold border-red-400 text-red-700">Rejected</span>
</div>`,
    css: `.badge-outlined { display:inline-flex; align-items:center; border-radius:9999px; border-width:1px; padding:.25rem .75rem; font-size:.75rem; font-weight:600; background:transparent; }`,
  },

  /* ── Breadcrumb ── */
  {
    id: 'breadcrumb-basic', name: 'Basic Breadcrumb', category: 'Breadcrumb',
    description: 'Home > Products > Details breadcrumb with chevrons.',
    Preview: BreadcrumbBasicPreview,
    tailwind: `<nav class="flex items-center gap-1 text-sm">
  <span class="text-zinc-400 hover:text-zinc-600 cursor-pointer">Home</span>
  <svg .../> 
  <span class="text-zinc-400 hover:text-zinc-600 cursor-pointer">Products</span>
  <svg .../> 
  <span class="font-semibold text-zinc-800">MacBook Pro</span>
</nav>`,
    css: `.breadcrumb { display:flex; align-items:center; gap:.25rem; font-size:.875rem; } .breadcrumb-link { color:#a1a1aa; cursor:pointer; } .breadcrumb-link:hover { color:#52525b; } .breadcrumb-current { font-weight:600; color:#18181b; }`,
  },
  {
    id: 'breadcrumb-icon', name: 'Breadcrumb with Icons', category: 'Breadcrumb',
    description: 'Folder icon breadcrumbs per navigation segment.',
    Preview: BreadcrumbIconPreview,
    tailwind: `<nav class="flex items-center gap-1 text-sm">
  <span class="flex items-center gap-1 text-zinc-400">🏠 Home</span>
  <svg .../> 
  <span class="flex items-center gap-1 text-zinc-400">📁 Documents</span>
  <svg .../> 
  <span class="flex items-center gap-1 font-semibold text-zinc-800">📄 Report.pdf</span>
</nav>`,
    css: `.breadcrumb-icon { display:flex; align-items:center; gap:.25rem; font-size:.875rem; } .breadcrumb-icon .segment { display:flex; align-items:center; gap:.25rem; }`,
  },
  {
    id: 'breadcrumb-pills', name: 'Pill Breadcrumb', category: 'Breadcrumb',
    description: 'Rounded pill style navigation breadcrumbs.',
    Preview: BreadcrumbPillsPreview,
    tailwind: `<nav class="flex items-center gap-1.5">
  <span class="rounded-full px-3 py-1 text-xs font-semibold cursor-pointer bg-zinc-100 text-zinc-600">Home</span>
  <svg .../> 
  <span class="rounded-full px-3 py-1 text-xs font-semibold bg-indigo-600 text-white">Security</span>
</nav>`,
    css: `.breadcrumb-pill { border-radius:9999px; padding:.25rem .75rem; font-size:.75rem; font-weight:600; } .breadcrumb-pill-active { background:#4f46e5; color:#fff; } .breadcrumb-pill-inactive { background:#f4f4f5; color:#52525b; }`,
  },

  /* ── Button Variants ── */
  {
    id: 'buttons-ghost', name: 'Ghost Buttons', category: 'Button Variants',
    description: 'Outlined ghost buttons in multiple colors.',
    Preview: ButtonsGhostPreview,
    tailwind: `<div class="flex flex-wrap gap-2">
  <button class="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 bg-transparent hover:bg-zinc-50">Default</button>
  <button class="rounded-lg border border-indigo-400 px-4 py-2 text-sm font-semibold text-indigo-700 bg-transparent hover:bg-indigo-50">Primary</button>
  <button class="rounded-lg border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-700 bg-transparent hover:bg-emerald-50">Success</button>
</div>`,
    css: `.ghost-btn { border-radius:.5rem; border-width:1px; padding:.5rem 1rem; font-size:.875rem; font-weight:600; background:transparent; cursor:pointer; transition:background .15s; } .ghost-btn-primary { border-color:#818cf8; color:#4338ca; } .ghost-btn-primary:hover { background:#eef2ff; }`,
  },
  {
    id: 'buttons-icon', name: 'Icon Buttons', category: 'Button Variants',
    description: 'Square icon-only buttons plus icon+label combos.',
    Preview: ButtonsIconPreview,
    tailwind: `<div class="space-y-2">
  <div class="flex gap-2">
    <button class="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-indigo-100 hover:text-indigo-600">🔔</button>
  </div>
  <div class="flex gap-2">
    <button class="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700">🔔 Notify</button>
  </div>
</div>`,
    css: `.icon-btn { width:2.5rem; height:2.5rem; border-radius:.75rem; border:none; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background .15s; } .icon-btn-square { background:#f4f4f5; color:#52525b; }`,
  },
  {
    id: 'buttons-gradient', name: 'Gradient Buttons', category: 'Button Variants',
    description: 'Gradient background buttons in violet, ocean, emerald, sunset.',
    Preview: ButtonsGradientPreview,
    tailwind: `<div class="flex flex-wrap gap-3">
  <button class="rounded-lg px-5 py-2.5 text-sm font-bold text-white shadow-md hover:opacity-90" style="background:linear-gradient(135deg,#6366f1,#8b5cf6)">Violet Gradient</button>
  <button class="rounded-lg px-5 py-2.5 text-sm font-bold text-white shadow-md hover:opacity-90" style="background:linear-gradient(135deg,#06b6d4,#3b82f6)">Ocean Gradient</button>
</div>`,
    css: `.gradient-btn { border-radius:.5rem; padding:.625rem 1.25rem; font-size:.875rem; font-weight:700; color:#fff; border:none; cursor:pointer; transition:opacity .15s; } .gradient-violet { background:linear-gradient(135deg,#6366f1,#8b5cf6); } .gradient-ocean { background:linear-gradient(135deg,#06b6d4,#3b82f6); }`,
  },

  /* ── Button Groups ── */
  {
    id: 'btn-group-basic', name: 'Button Group', category: 'Button Groups',
    description: 'Joined border buttons in a single group.',
    Preview: BtnGroupBasicPreview,
    tailwind: `<div class="inline-flex rounded-lg border border-zinc-200 overflow-hidden">
  <button class="px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100">Left</button>
  <button class="px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 border-l border-zinc-200">Center</button>
  <button class="px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 border-l border-zinc-200">Right</button>
</div>`,
    css: `.btn-group { display:inline-flex; border:1px solid #e4e4e7; border-radius:.5rem; overflow:hidden; } .btn-group button { padding:.5rem 1rem; font-size:.875rem; font-weight:600; background:none; border:none; border-left:1px solid #e4e4e7; cursor:pointer; } .btn-group button:first-child { border-left:none; }`,
  },
  {
    id: 'btn-group-radio', name: 'Radio Button Group', category: 'Button Groups',
    description: 'Single-select pill toggle group.',
    Preview: BtnGroupRadioPreview,
    tailwind: `<div class="inline-flex p-1 rounded-xl bg-zinc-100 gap-0.5">
  <button class="px-4 py-1.5 text-sm font-semibold rounded-lg bg-white shadow text-zinc-900">Grid</button>
  <button class="px-4 py-1.5 text-sm font-semibold rounded-lg text-zinc-500 hover:text-zinc-700">List</button>
  <button class="px-4 py-1.5 text-sm font-semibold rounded-lg text-zinc-500 hover:text-zinc-700">Cards</button>
</div>`,
    css: `.radio-group { display:inline-flex; padding:.25rem; border-radius:.75rem; background:#f4f4f5; gap:.125rem; } .radio-group button { padding:.375rem 1rem; border-radius:.5rem; font-size:.875rem; font-weight:600; border:none; cursor:pointer; } .radio-group button.active { background:#fff; box-shadow:0 1px 3px rgba(0,0,0,.1); color:#18181b; }`,
  },
  {
    id: 'btn-group-icon', name: 'Icon Button Group', category: 'Button Groups',
    description: 'Toolbar-style icon group with toggle state.',
    Preview: BtnGroupIconPreview,
    tailwind: `<div class="inline-flex rounded-lg border border-zinc-200 overflow-hidden">
  <button class="px-4 py-2 text-sm font-bold text-zinc-700 hover:bg-zinc-100">B</button>
  <button class="px-4 py-2 text-sm italic text-zinc-700 hover:bg-zinc-100 border-l border-zinc-200">I</button>
  <button class="px-4 py-2 text-sm underline text-zinc-700 hover:bg-zinc-100 border-l border-zinc-200">U</button>
</div>`,
    css: `.icon-btn-group { display:inline-flex; border:1px solid #e4e4e7; border-radius:.5rem; overflow:hidden; } .icon-btn-group button { padding:.5rem 1rem; border:none; border-left:1px solid #e4e4e7; cursor:pointer; background:none; } .icon-btn-group button.active { background:#18181b; color:#fff; }`,
  },

  /* ── Cards ── */
  {
    id: 'card-profile', name: 'Profile Card', category: 'Cards',
    description: 'User profile card with avatar, stats, and follow button.',
    Preview: CardProfilePreview,
    tailwind: `<div class="w-56 bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
  <div class="h-16 bg-gradient-to-r from-indigo-500 to-violet-500"></div>
  <div class="px-4 pb-4">
    <div class="w-14 h-14 rounded-full bg-indigo-400 border-4 border-white -mt-7 flex items-center justify-center text-white font-bold text-lg">AJ</div>
    <p class="mt-2 font-bold">Alice Johnson</p>
    <p class="text-xs text-zinc-500">Senior Designer</p>
    <button class="mt-3 w-full rounded-lg py-2 text-xs font-bold bg-indigo-600 text-white">Follow</button>
  </div>
</div>`,
    css: `.profile-card { border-radius:1rem; border:1px solid #f4f4f5; overflow:hidden; } .profile-card-header { height:4rem; background:linear-gradient(90deg,#6366f1,#8b5cf6); } .profile-avatar { width:3.5rem; height:3.5rem; border-radius:9999px; border:4px solid #fff; margin-top:-1.75rem; }`,
  },
  {
    id: 'card-stat', name: 'Stat Cards Row', category: 'Cards',
    description: '3 mini KPI stat cards with icon, value, and change.',
    Preview: CardStatPreview,
    tailwind: `<div class="flex gap-3">
  <div class="bg-white rounded-2xl border border-zinc-100 shadow-sm p-4 min-w-[140px]">
    <p class="text-lg mb-1">💰</p>
    <p class="text-xl font-bold">$84,200</p>
    <p class="text-xs text-zinc-500 mt-0.5">Total Revenue</p>
    <span class="text-xs font-semibold text-emerald-600">+12.5%</span>
  </div>
</div>`,
    css: `.stat-card { background:#fff; border-radius:1rem; border:1px solid #f4f4f5; padding:1rem; } .stat-card-value { font-size:1.25rem; font-weight:700; color:#18181b; } .stat-card-change-up { color:#16a34a; font-size:.75rem; font-weight:600; }`,
  },
  {
    id: 'card-pricing', name: 'Pricing Card', category: 'Cards',
    description: 'Pro plan pricing card with features list and CTA.',
    Preview: CardPricingPreview,
    tailwind: `<div class="w-56 bg-white rounded-2xl border-2 border-indigo-500 shadow-lg p-5">
  <p class="text-xs font-bold text-indigo-600 uppercase">Pro Plan</p>
  <p class="text-3xl font-bold mt-1">$49<span class="text-base font-normal text-zinc-400">/mo</span></p>
  <div class="mt-4 space-y-2">
    <div class="flex items-center gap-2"><span class="text-emerald-500">✓</span><span class="text-xs text-zinc-600">Unlimited projects</span></div>
  </div>
  <button class="mt-4 w-full rounded-xl py-2.5 text-sm font-bold bg-indigo-600 text-white">Get Started</button>
</div>`,
    css: `.pricing-card { border-radius:1rem; border:2px solid #6366f1; padding:1.25rem; } .pricing-card-price { font-size:1.875rem; font-weight:700; } .pricing-feature { display:flex; align-items:center; gap:.5rem; font-size:.75rem; }`,
  },

  /* ── Carousel ── */
  {
    id: 'carousel-basic', name: 'Basic Carousel', category: 'Carousel',
    description: 'Colored slide panels with prev/next buttons and dot indicators.',
    Preview: CarouselBasicPreview,
    tailwind: `<div class="relative overflow-hidden rounded-2xl">
  <div class="bg-indigo-500 h-36 flex flex-col items-center justify-center text-white">
    <p class="text-xl font-bold">Slide 1</p>
    <p class="text-sm opacity-80">Welcome to our platform</p>
  </div>
  <button class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow">◀</button>
  <button class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow">▶</button>
  <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5"><span class="w-2 h-2 rounded-full bg-white"></span></div>
</div>`,
    css: `.carousel { position:relative; overflow:hidden; border-radius:1rem; } .carousel-btn { position:absolute; top:50%; transform:translateY(-50%); width:2rem; height:2rem; border-radius:9999px; background:rgba(255,255,255,.8); border:none; cursor:pointer; } .carousel-dots { position:absolute; bottom:.75rem; left:50%; transform:translateX(-50%); display:flex; gap:.375rem; }`,
  },
  {
    id: 'carousel-card', name: 'Card Carousel', category: 'Carousel',
    description: '3 testimonial cards with center card highlighted.',
    Preview: CarouselCardPreview,
    tailwind: `<div class="flex gap-2 items-center">
  <button class="w-7 h-7 rounded-full bg-white border border-zinc-200 flex items-center justify-center shadow">◀</button>
  <div class="flex gap-2 overflow-hidden">
    <div class="flex-shrink-0 w-48 bg-white rounded-2xl border border-indigo-300 shadow-sm p-4 scale-105">
      <p class="text-xs italic">"Best tool in our workflow."</p>
      <p class="text-xs font-bold mt-2">Mark L · Developer</p>
    </div>
  </div>
  <button class="w-7 h-7 rounded-full bg-white border border-zinc-200 flex items-center justify-center shadow">▶</button>
</div>`,
    css: `.card-carousel { display:flex; align-items:center; gap:.75rem; } .carousel-card { border-radius:1rem; border:1px solid #f4f4f5; padding:1rem; flex-shrink:0; transition:transform .2s,border-color .2s; } .carousel-card.active { transform:scale(1.05); border-color:#a5b4fc; }`,
  },
  {
    id: 'carousel-image', name: 'Image Carousel', category: 'Carousel',
    description: 'Thumbnail strip with main display for image browsing.',
    Preview: CarouselImagePreview,
    tailwind: `<div class="max-w-sm">
  <div class="h-32 rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-500 mb-3 flex items-end p-3">
    <span class="text-white font-bold text-sm bg-black/30 rounded-lg px-2 py-1">Mountain View</span>
  </div>
  <div class="flex gap-2">
    <button class="flex-1 h-12 rounded-lg bg-gradient-to-br from-indigo-400 to-violet-500 ring-2 ring-offset-1 ring-indigo-500"/>
    <button class="flex-1 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 opacity-60"/>
  </div>
</div>`,
    css: `.image-carousel-main { border-radius:1rem; height:8rem; } .image-carousel-thumb { border-radius:.5rem; height:3rem; flex:1; opacity:.6; transition:opacity .15s; cursor:pointer; } .image-carousel-thumb.active { opacity:1; outline:2px solid #6366f1; outline-offset:2px; }`,
  },

  /* ── Dropdowns ── */
  {
    id: 'dropdown-basic', name: 'Basic Dropdown', category: 'Dropdowns',
    description: 'Simple menu list that toggles open/closed.',
    Preview: DropdownBasicPreview,
    tailwind: `<div class="relative w-48">
  <button class="w-full flex items-center justify-between rounded-xl border border-zinc-200 px-4 py-2.5 text-sm text-zinc-700 bg-white shadow-sm">
    <span>Select option</span><span>▾</span>
  </button>
  <div class="absolute top-full mt-1.5 w-full rounded-xl border border-zinc-100 bg-white shadow-lg z-10 overflow-hidden">
    <button class="w-full px-4 py-2.5 text-left text-sm text-zinc-700 hover:bg-zinc-50">Profile</button>
    <button class="w-full px-4 py-2.5 text-left text-sm text-zinc-700 hover:bg-zinc-50">Settings</button>
  </div>
</div>`,
    css: `.dropdown-trigger { display:flex; align-items:center; justify-content:space-between; border-radius:.75rem; border:1px solid #e4e4e7; padding:.625rem 1rem; font-size:.875rem; background:#fff; cursor:pointer; } .dropdown-menu { position:absolute; top:100%; margin-top:.375rem; border-radius:.75rem; border:1px solid #f4f4f5; background:#fff; box-shadow:0 4px 6px rgba(0,0,0,.07); overflow:hidden; z-index:10; }`,
  },
  {
    id: 'dropdown-search', name: 'Searchable Dropdown', category: 'Dropdowns',
    description: 'Dropdown with text filter input and results list.',
    Preview: DropdownSearchPreview,
    tailwind: `<div class="relative w-52">
  <button class="w-full flex items-center justify-between rounded-xl border border-zinc-200 px-4 py-2.5 text-sm bg-white shadow-sm">Choose framework ▾</button>
  <div class="absolute top-full mt-1.5 w-full rounded-xl border border-zinc-100 bg-white shadow-lg z-10">
    <div class="p-2 border-b border-zinc-100"><div class="flex items-center gap-2 rounded-lg bg-zinc-50 px-3 py-1.5"><span>🔍</span><input class="flex-1 text-sm bg-transparent focus:outline-none" placeholder="Search..."/></div></div>
    <button class="w-full px-4 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50">React</button>
  </div>
</div>`,
    css: `.searchable-dropdown .search-input { display:flex; align-items:center; gap:.5rem; background:#fafafa; border-radius:.5rem; padding:.375rem .75rem; } .searchable-dropdown .search-input input { border:none; background:transparent; font-size:.875rem; outline:none; flex:1; }`,
  },
  {
    id: 'dropdown-multi', name: 'Multi-Select Dropdown', category: 'Dropdowns',
    description: 'Dropdown with checkboxes for multi-selection.',
    Preview: DropdownMultiPreview,
    tailwind: `<div class="relative w-56">
  <button class="w-full flex items-center justify-between rounded-xl border border-zinc-200 px-4 py-2.5 text-sm bg-white shadow-sm">2 selected ▾</button>
  <div class="absolute top-full mt-1.5 w-full rounded-xl border border-zinc-100 bg-white shadow-lg z-10">
    <label class="flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-50 cursor-pointer"><input type="checkbox" checked class="rounded text-indigo-600"/><span class="text-sm">Design</span></label>
    <label class="flex items-center gap-3 px-4 py-2.5 hover:bg-zinc-50 cursor-pointer"><input type="checkbox" class="rounded text-indigo-600"/><span class="text-sm">Engineering</span></label>
  </div>
</div>`,
    css: `.multi-dropdown label { display:flex; align-items:center; gap:.75rem; padding:.625rem 1rem; font-size:.875rem; cursor:pointer; } .multi-dropdown label:hover { background:#fafafa; } .multi-dropdown input[type=checkbox] { accent-color:#4f46e5; border-radius:.25rem; }`,
  },

  /* ── Images ── */
  {
    id: 'image-grid', name: 'Image Grid', category: 'Images',
    description: 'Masonry-style 2×3 colored placeholder grid.',
    Preview: ImageGridPreview,
    tailwind: `<div class="columns-3 gap-2">
  <div class="bg-gradient-to-br from-indigo-400 to-violet-500 h-20 rounded-xl mb-2"/>
  <div class="bg-gradient-to-br from-cyan-400 to-blue-500 h-32 rounded-xl mb-2"/>
  <div class="bg-gradient-to-br from-amber-400 to-orange-500 h-20 rounded-xl mb-2"/>
</div>`,
    css: `.image-grid { columns:3; gap:.5rem; } .image-grid-item { border-radius:.75rem; margin-bottom:.5rem; break-inside:avoid; }`,
  },
  {
    id: 'image-caption', name: 'Image with Caption', category: 'Images',
    description: 'Single image with gradient overlay caption.',
    Preview: ImageCaptionPreview,
    tailwind: `<div class="rounded-2xl overflow-hidden border border-zinc-100 shadow-sm">
  <div class="relative">
    <div class="h-40 bg-gradient-to-br from-indigo-400 via-violet-500 to-purple-600"/>
    <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4">
      <p class="text-white font-bold text-sm">Northern Lights, Iceland</p>
      <p class="text-white/70 text-xs mt-0.5">Aurora Borealis · Feb 2024</p>
    </div>
  </div>
</div>`,
    css: `.image-caption { border-radius:1rem; overflow:hidden; } .image-caption-overlay { position:absolute; bottom:0; left:0; right:0; background:linear-gradient(to top,rgba(0,0,0,.7),transparent); padding:1rem; }`,
  },
  {
    id: 'image-gallery', name: 'Gallery with Lightbox', category: 'Images',
    description: 'Thumbnail grid with click-to-expand lightbox modal.',
    Preview: ImageGalleryV2Preview,
    tailwind: `<div class="grid grid-cols-2 gap-2">
  <div class="bg-gradient-to-br from-indigo-400 to-violet-500 h-20 rounded-xl cursor-pointer hover:opacity-90"/>
  <div class="bg-gradient-to-br from-cyan-400 to-blue-500 h-20 rounded-xl cursor-pointer hover:opacity-90"/>
</div>`,
    css: `.gallery-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:.5rem; } .gallery-item { border-radius:.75rem; cursor:pointer; transition:opacity .15s; } .gallery-item:hover { opacity:.9; } .lightbox { position:fixed; inset:0; background:rgba(0,0,0,.7); display:flex; align-items:center; justify-content:center; z-index:50; }`,
  },

  /* ── Links ── */
  {
    id: 'links-basic', name: 'Link Styles', category: 'Links',
    description: 'Underline, dashed, colored, and external link styles.',
    Preview: LinksBasicPreview,
    tailwind: `<div class="flex flex-col gap-2">
  <a href="#" class="text-sm text-blue-600 underline underline-offset-2 hover:text-blue-800">Underline link</a>
  <a href="#" class="text-sm text-indigo-600 decoration-dashed underline underline-offset-2 hover:text-indigo-800">Dashed underline</a>
  <a href="#" class="text-sm font-semibold text-emerald-600 hover:text-emerald-800">Colored link</a>
  <a href="#" class="text-sm text-zinc-700 hover:text-zinc-900 flex items-center gap-1">External link ↗</a>
</div>`,
    css: `.link-underline { color:#2563eb; text-decoration:underline; text-underline-offset:2px; } .link-dashed { color:#4f46e5; text-decoration:underline; text-decoration-style:dashed; } .link-colored { color:#059669; font-weight:600; text-decoration:none; } .link-external { color:#3f3f46; text-decoration:none; }`,
  },
  {
    id: 'links-nav', name: 'Navigation Links', category: 'Links',
    description: 'Horizontal nav link bar with active state.',
    Preview: LinksNavPreview,
    tailwind: `<nav class="flex gap-1 p-1 rounded-xl bg-zinc-50 border border-zinc-200">
  <button class="px-3 py-1.5 text-sm font-medium rounded-lg bg-white text-zinc-900 shadow-sm">Home</button>
  <button class="px-3 py-1.5 text-sm font-medium rounded-lg text-zinc-500 hover:text-zinc-700">About</button>
  <button class="px-3 py-1.5 text-sm font-medium rounded-lg text-zinc-500 hover:text-zinc-700">Services</button>
</nav>`,
    css: `.nav-links { display:flex; gap:.25rem; padding:.25rem; background:#fafafa; border:1px solid #e4e4e7; border-radius:.75rem; } .nav-link { padding:.375rem .75rem; border-radius:.5rem; font-size:.875rem; font-weight:500; border:none; cursor:pointer; } .nav-link.active { background:#fff; color:#18181b; box-shadow:0 1px 2px rgba(0,0,0,.05); }`,
  },
  {
    id: 'links-cta', name: 'CTA Links', category: 'Links',
    description: 'Arrow links, icon links, and card link styles.',
    Preview: LinksCTAPreview,
    tailwind: `<div class="space-y-3">
  <a href="#" class="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 group">Learn more <span class="group-hover:translate-x-0.5 transition-transform">→</span></a>
  <a href="#" class="flex items-center gap-2 text-sm font-semibold text-zinc-700 hover:text-zinc-900">✉ Send email</a>
  <div class="rounded-xl border border-zinc-100 p-3 hover:border-indigo-200 hover:bg-indigo-50/30 cursor-pointer group">
    <div class="flex items-center justify-between"><div><p class="text-sm font-semibold group-hover:text-indigo-700">Read the docs →</p><p class="text-xs text-zinc-500">Full API reference</p></div></div>
  </div>
</div>`,
    css: `.cta-link { display:flex; align-items:center; gap:.5rem; font-size:.875rem; font-weight:600; text-decoration:none; transition:color .15s; } .cta-link-arrow svg { transition:transform .15s; } .cta-link:hover .cta-link-arrow { transform:translateX(2px); }`,
  },

  /* ── List ── */
  {
    id: 'list-basic', name: 'Basic List', category: 'List',
    description: 'Unordered and ordered list styles side by side.',
    Preview: ListBasicPreview,
    tailwind: `<div class="flex gap-8">
  <ul class="space-y-1.5 text-sm text-zinc-700">
    <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-zinc-400"/>Design system</li>
    <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-zinc-400"/>Component library</li>
  </ul>
  <ol class="space-y-1.5 text-sm text-zinc-700">
    <li class="flex items-center gap-2"><span class="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold flex items-center justify-center">1</span>Research</li>
    <li class="flex items-center gap-2"><span class="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold flex items-center justify-center">2</span>Design</li>
  </ol>
</div>`,
    css: `.basic-list { list-style:none; padding:0; } .basic-list li { display:flex; align-items:center; gap:.5rem; font-size:.875rem; padding:.25rem 0; } .basic-list-dot { width:.375rem; height:.375rem; border-radius:9999px; background:#a1a1aa; flex-shrink:0; }`,
  },
  {
    id: 'list-icon', name: 'Icon List', category: 'List',
    description: 'Feature list with check/x icons per item and description.',
    Preview: ListIconPreview,
    tailwind: `<ul class="space-y-3">
  <li class="flex items-start gap-3"><div class="w-5 h-5 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center shrink-0"><span class="text-emerald-600 text-xs">✓</span></div><div><p class="text-sm font-medium">Unlimited projects</p><p class="text-xs text-zinc-400">No cap on project count</p></div></li>
</ul>`,
    css: `.icon-list { list-style:none; padding:0; } .icon-list li { display:flex; align-items:flex-start; gap:.75rem; } .icon-list-icon { width:1.25rem; height:1.25rem; border-radius:9999px; border:1px solid #e4e4e7; background:#fafafa; display:flex; align-items:center; justify-content:center; flex-shrink:0; }`,
  },
  {
    id: 'list-group', name: 'List Group', category: 'List',
    description: 'Bordered list group with badges and secondary text.',
    Preview: ListGroupV2Preview,
    tailwind: `<div class="border border-zinc-200 rounded-xl overflow-hidden divide-y divide-zinc-100">
  <div class="flex items-center justify-between px-4 py-3 hover:bg-zinc-50">
    <div><p class="text-sm font-semibold">Design Team</p><p class="text-xs text-zinc-400">8 members</p></div>
    <span class="rounded-full px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-700">Active</span>
  </div>
</div>`,
    css: `.list-group { border:1px solid #e4e4e7; border-radius:.75rem; overflow:hidden; } .list-group-item { display:flex; align-items:center; justify-content:space-between; padding:.75rem 1rem; transition:background .15s; } .list-group-item:hover { background:#fafafa; } .list-group-item + .list-group-item { border-top:1px solid #f4f4f5; }`,
  },

  /* ── Modals ── */
  {
    id: 'modal-confirm', name: 'Confirm Dialog', category: 'Modals',
    description: 'Delete confirmation dialog with cancel/confirm buttons.',
    Preview: ModalConfirmPreview,
    tailwind: `<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div class="bg-white rounded-2xl shadow-xl p-5 w-64">
    <div class="flex items-center gap-3 mb-3"><div class="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center">✕</div><div><p class="text-sm font-bold">Delete item?</p><p class="text-xs text-zinc-500">This cannot be undone.</p></div></div>
    <div class="flex gap-2 mt-4"><button class="flex-1 rounded-lg border border-zinc-200 py-2 text-sm font-semibold text-zinc-700">Cancel</button><button class="flex-1 rounded-lg bg-red-600 py-2 text-sm font-bold text-white">Delete</button></div>
  </div>
</div>`,
    css: `.modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,.5); display:flex; align-items:center; justify-content:center; z-index:50; } .modal-dialog { background:#fff; border-radius:1rem; padding:1.25rem; max-width:18rem; width:100%; box-shadow:0 20px 25px rgba(0,0,0,.15); }`,
  },
  {
    id: 'modal-drawer', name: 'Side Drawer', category: 'Modals',
    description: 'Slide-in right panel drawer modal.',
    Preview: ModalDrawerPreview,
    tailwind: `<div class="fixed inset-y-0 right-0 w-72 bg-white shadow-2xl border-l border-zinc-100">
  <div class="flex items-center justify-between px-4 py-3 border-b border-zinc-100"><p class="font-bold text-sm">Settings</p><button>✕</button></div>
  <div class="p-4 space-y-3"><a class="flex items-center gap-2 text-sm text-zinc-700 hover:text-indigo-600">▶ Profile</a></div>
</div>`,
    css: `.drawer { position:fixed; top:0; right:0; height:100%; width:18rem; background:#fff; border-left:1px solid #f4f4f5; box-shadow:-4px 0 24px rgba(0,0,0,.1); transform:translateX(100%); transition:transform .3s ease; } .drawer.open { transform:translateX(0); }`,
  },
  {
    id: 'modal-form', name: 'Form Modal', category: 'Modals',
    description: 'Modal dialog with form fields for creating a project.',
    Preview: ModalFormPreview,
    tailwind: `<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div class="bg-white rounded-2xl shadow-xl p-5 w-72">
    <div class="flex items-center justify-between mb-4"><p class="font-bold text-sm">Create project</p><button>✕</button></div>
    <div class="space-y-3"><input class="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm" placeholder="Project name"/><textarea class="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm h-16 resize-none" placeholder="Description"/><button class="w-full rounded-lg bg-indigo-600 py-2 text-sm font-bold text-white">Create</button></div>
  </div>
</div>`,
    css: `.modal-form { background:#fff; border-radius:1rem; padding:1.25rem; width:18rem; } .modal-form input, .modal-form textarea { width:100%; border:1px solid #e4e4e7; border-radius:.5rem; padding:.5rem .75rem; font-size:.875rem; } .modal-form input:focus { outline:none; border-color:#818cf8; }`,
  },

  /* ── Notifications ── */
  {
    id: 'notification-toast', name: 'Toast Notifications', category: 'Notifications',
    description: 'Stacked dismissable toast notifications.',
    Preview: NotificationToastPreview,
    tailwind: `<div class="space-y-2">
  <div class="flex items-center gap-3 rounded-xl bg-white shadow-lg border border-zinc-100 px-4 py-3"><span class="text-emerald-500">✓</span><p class="flex-1 text-sm text-zinc-700">Changes saved successfully!</p><button class="text-zinc-300">✕</button></div>
  <div class="flex items-center gap-3 rounded-xl bg-white shadow-lg border border-zinc-100 px-4 py-3"><span class="text-red-500">✕</span><p class="flex-1 text-sm text-zinc-700">Failed to upload file.</p><button class="text-zinc-300">✕</button></div>
</div>`,
    css: `.toast { display:flex; align-items:center; gap:.75rem; background:#fff; border-radius:.75rem; border:1px solid #f4f4f5; padding:.75rem 1rem; box-shadow:0 4px 12px rgba(0,0,0,.08); } .toast-success .toast-icon { color:#22c55e; } .toast-error .toast-icon { color:#ef4444; }`,
  },
  {
    id: 'notification-banner', name: 'Notification Banner', category: 'Notifications',
    description: 'Top-of-page announcement strip notifications.',
    Preview: NotificationBannerPreview,
    tailwind: `<div class="space-y-2">
  <div class="bg-indigo-600 rounded-xl px-4 py-2.5 flex items-center justify-between"><p class="text-xs text-white font-medium">🎉 New features released!</p><button class="ml-3 text-white/60">✕</button></div>
  <div class="bg-amber-500 rounded-xl px-4 py-2.5 flex items-center justify-between"><p class="text-xs text-white font-medium">⚠️ Scheduled maintenance Sunday.</p><button class="ml-3 text-white/60">✕</button></div>
</div>`,
    css: `.notification-banner { display:flex; align-items:center; justify-content:space-between; border-radius:.75rem; padding:.625rem 1rem; } .notification-banner-info { background:#4f46e5; } .notification-banner-warning { background:#f59e0b; } .notification-banner p { color:#fff; font-size:.75rem; font-weight:500; }`,
  },
  {
    id: 'notification-feed', name: 'Notification Feed', category: 'Notifications',
    description: 'List of notification items with avatars and unread state.',
    Preview: NotificationFeedPreview,
    tailwind: `<div class="border border-zinc-100 rounded-2xl overflow-hidden shadow-sm">
  <div class="px-4 py-3 border-b border-zinc-100 flex items-center justify-between"><p class="text-sm font-bold">Notifications</p><span class="text-xs font-bold bg-indigo-100 text-indigo-700 rounded-full px-2 py-0.5">2 new</span></div>
  <div class="divide-y divide-zinc-50">
    <div class="flex items-start gap-3 px-4 py-3 bg-indigo-50/40"><div class="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-bold">AJ</div><div><p class="text-xs text-zinc-700">Alice commented on your post</p><p class="text-[10px] text-zinc-400">2m ago</p></div><span class="w-2 h-2 rounded-full bg-indigo-500 mt-1 ml-auto"/></div>
  </div>
</div>`,
    css: `.notification-feed { border:1px solid #f4f4f5; border-radius:1rem; overflow:hidden; } .notification-item { display:flex; align-items:flex-start; gap:.75rem; padding:.75rem 1rem; } .notification-item.unread { background:#eef2ff55; } .notification-badge { width:.5rem; height:.5rem; border-radius:9999px; background:#4f46e5; flex-shrink:0; }`,
  },

  /* ── Pagination ── */
  {
    id: 'pagination-basic', name: 'Basic Pagination', category: 'Pagination',
    description: 'Prev/next with page number buttons.',
    Preview: PaginationBasicPreview,
    tailwind: `<div class="flex items-center gap-1">
  <button class="px-3 py-1.5 text-sm rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50">Prev</button>
  <button class="w-9 h-9 rounded-lg text-sm font-semibold bg-indigo-600 text-white">3</button>
  <button class="w-9 h-9 rounded-lg text-sm font-semibold border border-zinc-200 text-zinc-600 hover:bg-zinc-50">4</button>
  <button class="px-3 py-1.5 text-sm rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50">Next</button>
</div>`,
    css: `.pagination { display:flex; align-items:center; gap:.25rem; } .pagination-btn { border:1px solid #e4e4e7; border-radius:.5rem; padding:.375rem .75rem; font-size:.875rem; background:none; cursor:pointer; color:#52525b; } .pagination-btn.active { background:#4f46e5; border-color:#4f46e5; color:#fff; }`,
  },
  {
    id: 'pagination-simple', name: 'Simple Pagination', category: 'Pagination',
    description: 'Just Prev / Page X of N / Next.',
    Preview: PaginationSimplePreview,
    tailwind: `<div class="flex items-center gap-4">
  <button class="flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-xl border border-zinc-200 text-zinc-700 hover:bg-zinc-50">◀ Prev</button>
  <span class="text-sm text-zinc-500">Page <strong class="text-zinc-800">3</strong> of 12</span>
  <button class="flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-xl border border-zinc-200 text-zinc-700 hover:bg-zinc-50">Next ▶</button>
</div>`,
    css: `.simple-pagination { display:flex; align-items:center; gap:1rem; } .simple-pagination-btn { display:flex; align-items:center; gap:.25rem; border:1px solid #e4e4e7; border-radius:.75rem; padding:.5rem 1rem; font-size:.875rem; font-weight:600; cursor:pointer; }`,
  },
  {
    id: 'pagination-dots', name: 'Dot Pagination', category: 'Pagination',
    description: 'Dot/pill indicators for carousel and slide navigation.',
    Preview: PaginationDotsPreview,
    tailwind: `<div class="flex items-center gap-2">
  <button class="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center">◀</button>
  <button class="rounded-full w-6 h-2.5 bg-indigo-600"/>
  <button class="rounded-full w-2.5 h-2.5 bg-zinc-200"/>
  <button class="rounded-full w-2.5 h-2.5 bg-zinc-200"/>
  <button class="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center">▶</button>
</div>`,
    css: `.dot-pagination { display:flex; align-items:center; gap:.5rem; } .dot { border-radius:9999px; height:.625rem; background:#e4e4e7; border:none; cursor:pointer; transition:width .2s,background .2s; width:.625rem; } .dot.active { background:#4f46e5; width:1.5rem; }`,
  },

  /* ── Popovers ── */
  {
    id: 'popover-basic', name: 'Basic Popover', category: 'Popovers',
    description: 'Click to show small info card popover.',
    Preview: PopoverBasicPreview,
    tailwind: `<div class="relative inline-block">
  <button class="rounded-xl bg-zinc-800 px-4 py-2 text-sm font-semibold text-white">Info</button>
  <div class="absolute left-full ml-2 top-0 w-52 bg-white rounded-xl border border-zinc-100 shadow-lg p-3 z-10">
    <div class="flex items-start gap-2"><span class="text-blue-500">ℹ</span><div><p class="text-xs font-bold mb-1">What is this?</p><p class="text-xs text-zinc-500">A basic popover with info content.</p></div></div>
  </div>
</div>`,
    css: `.popover { position:absolute; background:#fff; border:1px solid #f4f4f5; border-radius:.75rem; padding:.75rem; box-shadow:0 4px 12px rgba(0,0,0,.08); z-index:10; } .popover-right { left:100%; margin-left:.5rem; top:0; }`,
  },
  {
    id: 'popover-rich', name: 'Rich Popover', category: 'Popovers',
    description: 'User card popover with avatar, status, and action buttons.',
    Preview: PopoverRichPreview,
    tailwind: `<div class="w-64 bg-white rounded-2xl border border-zinc-100 shadow-xl p-4">
  <div class="flex items-center gap-3 mb-3">
    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold">AJ</div>
    <div><p class="font-bold">Alice Johnson</p><p class="text-xs text-zinc-500">alice@acme.com</p><p class="text-xs text-emerald-600 font-semibold">● Online</p></div>
  </div>
  <div class="flex gap-2"><button class="flex-1 rounded-lg bg-indigo-600 py-1.5 text-xs font-bold text-white">Message</button><button class="flex-1 rounded-lg border border-zinc-200 py-1.5 text-xs font-semibold">Close</button></div>
</div>`,
    css: `.rich-popover { border-radius:1rem; border:1px solid #f4f4f5; padding:1rem; box-shadow:0 8px 24px rgba(0,0,0,.1); background:#fff; width:16rem; }`,
  },
  {
    id: 'popover-menu', name: 'Popover Menu', category: 'Popovers',
    description: 'Right-click context menu style popover.',
    Preview: PopoverMenuPreview,
    tailwind: `<div class="w-44 bg-white rounded-xl border border-zinc-100 shadow-lg overflow-hidden">
  <button class="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50">📋 Copy</button>
  <button class="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50">🔍 Search</button>
  <button class="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-zinc-50">✕ Delete</button>
</div>`,
    css: `.context-menu { background:#fff; border:1px solid #f4f4f5; border-radius:.75rem; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,.08); width:11rem; } .context-menu-item { display:flex; align-items:center; gap:.75rem; padding:.625rem .75rem; font-size:.875rem; cursor:pointer; width:100%; text-align:left; } .context-menu-item:hover { background:#fafafa; } .context-menu-item.danger { color:#dc2626; }`,
  },

  /* ── Progress Bars ── */
  {
    id: 'progress-basic', name: 'Progress Bars', category: 'Progress Bars',
    description: '4 progress bars: default, success, warning, danger.',
    Preview: ProgressBasicPreview,
    tailwind: `<div class="space-y-3">
  <div><div class="flex justify-between text-xs mb-1"><span>Default</span><span>72%</span></div><div class="h-2.5 w-full rounded-full bg-zinc-100"><div class="h-full rounded-full bg-indigo-500 w-[72%]"/></div></div>
  <div><div class="flex justify-between text-xs mb-1"><span>Success</span><span>88%</span></div><div class="h-2.5 w-full rounded-full bg-zinc-100"><div class="h-full rounded-full bg-emerald-500 w-[88%]"/></div></div>
</div>`,
    css: `.progress-track { height:.625rem; background:#f4f4f5; border-radius:9999px; } .progress-fill { height:100%; border-radius:9999px; transition:width .3s ease; } .progress-default { background:#6366f1; } .progress-success { background:#22c55e; } .progress-warning { background:#f59e0b; } .progress-danger { background:#ef4444; }`,
  },
  {
    id: 'progress-multi', name: 'Multi-Step Progress', category: 'Progress Bars',
    description: 'Step-by-step progress with clickable stages.',
    Preview: ProgressMultiPreview,
    tailwind: `<div class="flex items-center">
  <div class="flex flex-col items-center">
    <div class="w-7 h-7 rounded-full border-2 bg-indigo-600 border-indigo-600 text-white flex items-center justify-center text-xs font-bold">✓</div>
    <span class="text-[9px] text-zinc-500 mt-1">Research</span>
  </div>
  <div class="flex-1 h-0.5 mx-1 bg-indigo-600"/>
  <div class="flex flex-col items-center">
    <div class="w-7 h-7 rounded-full border-2 border-indigo-600 text-indigo-600 bg-white flex items-center justify-center text-xs font-bold">2</div>
    <span class="text-[9px] text-zinc-500 mt-1">Design</span>
  </div>
</div>`,
    css: `.stepper { display:flex; align-items:center; } .step-circle { width:1.75rem; height:1.75rem; border-radius:9999px; border:2px solid #e4e4e7; display:flex; align-items:center; justify-content:center; font-size:.75rem; font-weight:700; } .step-circle.complete { background:#4f46e5; border-color:#4f46e5; color:#fff; } .step-circle.active { border-color:#4f46e5; color:#4f46e5; } .step-line { flex:1; height:2px; background:#e4e4e7; margin:0 .25rem; }`,
  },
  {
    id: 'progress-circular', name: 'Circular Progress', category: 'Progress Bars',
    description: '3 SVG circle progress rings for CPU, RAM, Disk.',
    Preview: ProgressCircularPreview,
    tailwind: `<div class="flex gap-6">
  <div class="flex flex-col items-center gap-1">
    <svg width="72" height="72" viewBox="0 0 72 72">
      <circle cx="36" cy="36" r="28" fill="none" stroke="#f4f4f5" stroke-width="8"/>
      <circle cx="36" cy="36" r="28" fill="none" stroke="#6366f1" stroke-width="8" stroke-dasharray="127 176" stroke-linecap="round" transform="rotate(-90 36 36)"/>
      <text x="36" y="40" text-anchor="middle" font-size="11" font-weight="bold" fill="#18181b">72%</text>
    </svg>
    <span class="text-xs text-zinc-500">CPU</span>
  </div>
</div>`,
    css: `.circle-progress { transform-origin:center; transform:rotate(-90deg); } .circle-track { fill:none; stroke:#f4f4f5; } .circle-fill { fill:none; stroke-linecap:round; transition:stroke-dasharray .4s ease; }`,
  },

  /* ── Ribbons ── */
  {
    id: 'ribbon-corner', name: 'Corner Ribbon', category: 'Ribbons',
    description: 'Top-right corner NEW/SALE ribbon on cards.',
    Preview: RibbonCornerPreview,
    tailwind: `<div class="relative w-32 h-28 bg-white rounded-xl border border-zinc-100 shadow-sm overflow-hidden flex items-center justify-center">
  <div class="absolute top-0 right-0 overflow-hidden w-20 h-20">
    <div class="bg-indigo-600 text-white text-[9px] font-bold text-center py-0.5 transform rotate-45 translate-x-4 translate-y-3 w-20">NEW</div>
  </div>
  <span class="text-xs font-semibold text-zinc-700">Pro Card</span>
</div>`,
    css: `.corner-ribbon-wrapper { overflow:hidden; position:relative; } .corner-ribbon { position:absolute; top:0; right:0; width:5rem; height:5rem; overflow:hidden; } .corner-ribbon-label { position:absolute; top:.75rem; right:-1.5rem; width:5rem; text-align:center; font-size:.5625rem; font-weight:700; color:#fff; padding:.125rem 0; transform:rotate(45deg); }`,
  },
  {
    id: 'ribbon-banner', name: 'Banner Ribbon', category: 'Ribbons',
    description: 'Horizontal ribbon across card top.',
    Preview: RibbonBannerPreview,
    tailwind: `<div class="bg-white rounded-xl border border-zinc-100 shadow-sm overflow-hidden">
  <div class="bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white text-center">🎉 Limited Time Offer</div>
  <div class="px-4 py-3 text-xs text-zinc-500">Card content goes here</div>
</div>`,
    css: `.ribbon-banner { display:block; padding:.375rem 1rem; font-size:.75rem; font-weight:700; text-align:center; } .ribbon-banner-indigo { background:#4f46e5; color:#fff; } .ribbon-banner-red { background:#ef4444; color:#fff; } .ribbon-banner-green { background:#16a34a; color:#fff; }`,
  },
  {
    id: 'ribbon-badge', name: 'Folded Ribbon Badge', category: 'Ribbons',
    description: 'CSS folded ribbon label on card.',
    Preview: RibbonBadgePreview,
    tailwind: `<div class="relative">
  <div class="w-28 h-20 bg-white rounded-xl border border-zinc-100 shadow-sm flex items-center justify-center text-xs text-zinc-500">Card</div>
  <div class="absolute -left-1 top-3 bg-indigo-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-r-full shadow-indigo-200 shadow">Featured</div>
</div>`,
    css: `.folded-ribbon { position:absolute; left:-.25rem; top:.75rem; padding:.125rem .75rem; border-radius:0 9999px 9999px 0; font-size:.625rem; font-weight:700; color:#fff; } .folded-ribbon-indigo { background:#4f46e5; } .folded-ribbon-rose { background:#f43f5e; }`,
  },

  /* ── Spinners ── */
  {
    id: 'spinner-basic', name: 'Spinner Variants', category: 'Spinners',
    description: '4 spinner styles: border, dots, pulse, wave.',
    Preview: SpinnerBasicPreview,
    tailwind: `<div class="flex gap-8 items-center flex-wrap">
  <div class="flex flex-col items-center gap-2"><div class="w-8 h-8 rounded-full border-4 border-zinc-200 border-t-indigo-600 animate-spin"/><span class="text-[10px] text-zinc-400">Border</span></div>
  <div class="flex flex-col items-center gap-2"><div class="flex gap-1"><div class="w-2 h-2 rounded-full bg-indigo-600 animate-bounce"/><div class="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style="animation-delay:.15s"/></div><span class="text-[10px] text-zinc-400">Dots</span></div>
</div>`,
    css: `.spinner-border { width:2rem; height:2rem; border-radius:9999px; border:4px solid #f4f4f5; border-top-color:#4f46e5; animation:spin .8s linear infinite; } @keyframes spin { to { transform:rotate(360deg); } } .spinner-dot { width:.5rem; height:.5rem; border-radius:9999px; background:#4f46e5; animation:bounce .6s alternate infinite; }`,
  },
  {
    id: 'spinner-labeled', name: 'Labeled Spinners', category: 'Spinners',
    description: 'Spinners with loading text in different sizes.',
    Preview: SpinnerLabeledPreview,
    tailwind: `<div class="space-y-4">
  <div class="flex items-center gap-3"><div class="w-4 h-4 rounded-full border-4 border-zinc-200 border-t-indigo-600 animate-spin"/><span class="text-sm font-medium text-zinc-600">Loading...</span></div>
  <div class="flex items-center gap-3"><div class="w-6 h-6 rounded-full border-4 border-zinc-200 border-t-indigo-600 animate-spin"/><span class="text-base font-medium text-zinc-600">Processing</span></div>
</div>`,
    css: `.labeled-spinner { display:flex; align-items:center; gap:.75rem; } .labeled-spinner .spinner { border-radius:9999px; border:4px solid #f4f4f5; border-top-color:#4f46e5; animation:spin .8s linear infinite; }`,
  },
  {
    id: 'spinner-overlay', name: 'Loading Overlay', category: 'Spinners',
    description: 'Full-card dimmed overlay with centered spinner.',
    Preview: SpinnerOverlayPreview,
    tailwind: `<div class="relative w-64 h-36 bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
  <div class="p-4"><p class="text-sm font-bold">Dashboard</p></div>
  <div class="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-2xl">
    <div class="flex flex-col items-center gap-2"><div class="w-8 h-8 rounded-full border-4 border-zinc-200 border-t-indigo-600 animate-spin"/><span class="text-xs text-zinc-500">Loading...</span></div>
  </div>
</div>`,
    css: `.spinner-overlay { position:absolute; inset:0; background:rgba(255,255,255,.8); backdrop-filter:blur(4px); display:flex; align-items:center; justify-content:center; border-radius:inherit; }`,
  },

  /* ── Tabs ── */
  {
    id: 'tabs-pill', name: 'Pill Tabs', category: 'Tabs',
    description: 'Rounded pill active tab style.',
    Preview: TabsPillPreview,
    tailwind: `<div class="flex gap-1 p-1 bg-zinc-100 rounded-xl mb-4">
  <button class="flex-1 py-1.5 text-xs font-semibold rounded-lg bg-white text-zinc-900 shadow">Overview</button>
  <button class="flex-1 py-1.5 text-xs font-semibold rounded-lg text-zinc-500 hover:text-zinc-700">Analytics</button>
  <button class="flex-1 py-1.5 text-xs font-semibold rounded-lg text-zinc-500 hover:text-zinc-700">Reports</button>
</div>`,
    css: `.pill-tabs { display:flex; gap:.25rem; padding:.25rem; background:#f4f4f5; border-radius:.75rem; } .pill-tab { flex:1; padding:.375rem 0; border-radius:.5rem; font-size:.75rem; font-weight:600; border:none; cursor:pointer; background:none; } .pill-tab.active { background:#fff; box-shadow:0 1px 3px rgba(0,0,0,.1); color:#18181b; } .pill-tab:not(.active) { color:#71717a; }`,
  },
  {
    id: 'tabs-vertical', name: 'Vertical Tabs', category: 'Tabs',
    description: 'Left-side tab list with content panel.',
    Preview: TabsVerticalPreview,
    tailwind: `<div class="flex gap-3 h-40">
  <div class="flex flex-col gap-0.5 w-32">
    <button class="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-left bg-indigo-50 text-indigo-700">👤 Profile</button>
    <button class="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-left text-zinc-500 hover:bg-zinc-50">🔒 Security</button>
  </div>
  <div class="flex-1 rounded-xl bg-zinc-50 border border-zinc-100 p-3 text-xs text-zinc-600">Manage your profile info</div>
</div>`,
    css: `.vertical-tabs { display:flex; gap:.75rem; } .vertical-tab-list { display:flex; flex-direction:column; gap:.125rem; width:8rem; } .vertical-tab { display:flex; align-items:center; gap:.5rem; border-radius:.5rem; padding:.5rem .75rem; font-size:.75rem; font-weight:500; border:none; cursor:pointer; background:none; text-align:left; } .vertical-tab.active { background:#eef2ff; color:#4338ca; font-weight:600; }`,
  },
  {
    id: 'tabs-icon', name: 'Icon Tabs', category: 'Tabs',
    description: 'Tabs with icons above labels and border-bottom active indicator.',
    Preview: TabsIconPreview,
    tailwind: `<div class="flex border-b border-zinc-200 mb-4">
  <button class="flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-semibold border-b-2 border-indigo-600 text-indigo-600">✉ Mail</button>
  <button class="flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-semibold border-b-2 border-transparent text-zinc-400 hover:text-zinc-600">🔔 Alerts</button>
  <button class="flex-1 flex flex-col items-center gap-1 py-3 text-[10px] font-semibold border-b-2 border-transparent text-zinc-400 hover:text-zinc-600">👤 Profile</button>
</div>`,
    css: `.icon-tabs { display:flex; border-bottom:2px solid #f4f4f5; } .icon-tab { flex:1; display:flex; flex-direction:column; align-items:center; gap:.25rem; padding:.75rem 0; font-size:.625rem; font-weight:600; border:none; border-bottom:2px solid transparent; cursor:pointer; background:none; margin-bottom:-2px; } .icon-tab.active { border-bottom-color:#4f46e5; color:#4f46e5; }`,
  },

  /* ── Tooltips ── */
  {
    id: 'tooltip-basic', name: 'Tooltip Variants', category: 'Tooltips',
    description: '4 directional tooltips that appear on hover.',
    Preview: TooltipBasicPreview,
    tailwind: `<div class="relative group inline-block">
  <button class="rounded-lg border border-zinc-200 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50">Hover me</button>
  <div class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-xs font-semibold rounded-lg px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">Tooltip Top</div>
</div>`,
    css: `.tooltip-wrapper { position:relative; display:inline-block; } .tooltip { position:absolute; border-radius:.5rem; padding:.375rem .625rem; font-size:.75rem; font-weight:600; white-space:nowrap; pointer-events:none; opacity:0; transition:opacity .15s; z-index:10; } .tooltip-wrapper:hover .tooltip { opacity:1; } .tooltip-dark { background:#18181b; color:#fff; }`,
  },
  {
    id: 'tooltip-rich', name: 'Rich Tooltip', category: 'Tooltips',
    description: 'Tooltip with title, description, and link on hover.',
    Preview: TooltipRichPreview,
    tailwind: `<div class="relative inline-block group">
  <button class="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white">ℹ Learn more</button>
  <div class="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-56 bg-white rounded-xl border border-zinc-100 shadow-xl p-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
    <p class="text-xs font-bold text-zinc-900 mb-1">Rich Tooltip</p>
    <p class="text-xs text-zinc-500 mb-2">Tooltips can include titles and descriptions.</p>
    <a href="#" class="text-xs font-semibold text-indigo-600">Read docs →</a>
  </div>
</div>`,
    css: `.rich-tooltip { position:absolute; background:#fff; border:1px solid #f4f4f5; border-radius:.75rem; padding:.75rem; box-shadow:0 8px 24px rgba(0,0,0,.1); width:14rem; z-index:20; } .rich-tooltip-title { font-size:.75rem; font-weight:700; margin-bottom:.25rem; }`,
  },
  {
    id: 'tooltip-dark', name: 'Dark Tooltips', category: 'Tooltips',
    description: 'Dark rounded tooltips with arrow pointer.',
    Preview: TooltipDarkPreview,
    tailwind: `<div class="relative group flex flex-col items-center">
  <button class="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-zinc-200">📋</button>
  <div class="absolute -top-9 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] font-semibold rounded-lg px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
    Copy to clipboard
    <div class="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-zinc-900 rotate-45"/>
  </div>
</div>`,
    css: `.dark-tooltip { position:absolute; background:#18181b; color:#fff; border-radius:.5rem; padding:.375rem .625rem; font-size:.625rem; font-weight:600; white-space:nowrap; pointer-events:none; } .dark-tooltip-arrow { position:absolute; bottom:-.25rem; left:50%; transform:translateX(-50%) rotate(45deg); width:.5rem; height:.5rem; background:#18181b; }`,
  },

  /* ── Videos ── */
  {
    id: 'video-player', name: 'Video Player UI', category: 'Videos',
    description: 'Custom video player with play/pause, seek, and volume controls.',
    Preview: VideoPlayerPreview,
    tailwind: `<div class="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-700">
  <div class="h-32 bg-zinc-800 flex items-center justify-center">
    <button class="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">▶</button>
  </div>
  <div class="px-3 py-2.5 bg-zinc-800">
    <div class="flex items-center gap-2"><button class="text-white">▶</button><div class="flex-1 h-1 bg-zinc-600 rounded-full"><div class="h-full bg-indigo-500 rounded-full w-[35%]"/></div><span class="text-[10px] text-zinc-400">1:24/4:02</span></div>
  </div>
</div>`,
    css: `.video-player { background:#18181b; border-radius:1rem; overflow:hidden; } .video-controls { display:flex; align-items:center; gap:.5rem; padding:.625rem .75rem; background:#27272a; } .video-progress { flex:1; height:.25rem; background:#52525b; border-radius:9999px; cursor:pointer; } .video-progress-fill { height:100%; background:#6366f1; border-radius:9999px; }`,
  },
  {
    id: 'video-card', name: 'Video Card', category: 'Videos',
    description: 'Thumbnail with title, duration, and view count.',
    Preview: VideoCardV2Preview,
    tailwind: `<div class="flex gap-3">
  <div class="flex-1 bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden hover:shadow-md transition">
    <div class="bg-gradient-to-br from-indigo-500 to-violet-600 h-20 relative flex items-end p-2">
      <span class="bg-black/70 text-white text-[10px] font-bold rounded px-1.5 py-0.5 ml-auto">12:34</span>
    </div>
    <div class="p-3"><p class="text-xs font-bold text-zinc-800">Getting Started with React Hooks</p><p class="text-[10px] text-zinc-500 mt-1">DevTube · 24K views</p></div>
  </div>
</div>`,
    css: `.video-card { border-radius:1rem; border:1px solid #f4f4f5; overflow:hidden; transition:box-shadow .2s; } .video-card:hover { box-shadow:0 4px 12px rgba(0,0,0,.08); } .video-thumbnail { position:relative; } .video-duration { position:absolute; bottom:.375rem; right:.375rem; background:rgba(0,0,0,.7); color:#fff; font-size:.5625rem; font-weight:700; border-radius:.25rem; padding:.125rem .375rem; }`,
  },
  {
    id: 'video-grid', name: 'Video Grid', category: 'Videos',
    description: '4 video thumbnails in a 2×2 responsive grid.',
    Preview: VideoGridPreview,
    tailwind: `<div class="grid grid-cols-2 gap-2">
  <div class="rounded-xl overflow-hidden border border-zinc-100 hover:shadow-md transition cursor-pointer">
    <div class="bg-gradient-to-br from-indigo-500 to-violet-600 h-16 relative"><span class="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-[9px] font-bold rounded px-1 py-0.5">5:24</span></div>
    <div class="px-2 py-1.5 bg-white"><p class="text-[10px] font-semibold text-zinc-800 truncate">React Tips</p></div>
  </div>
</div>`,
    css: `.video-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:.5rem; } .video-grid-item { border-radius:.75rem; overflow:hidden; border:1px solid #f4f4f5; cursor:pointer; } .video-grid-thumb { position:relative; height:4rem; }`,
  },
];

/* ─────────────────────────────────────────────
   Code Block
───────────────────────────────────────────── */
function CodeBlock({ code, id, tab, componentName }: { code: string; id: string; tab: CodeTab; componentName: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
    // GA4: fire when user copies code
    trackEvent('component_code_copied', {
      tool_name:      'css_ui_components',
      component_id:   id,
      component_name: componentName,
      code_format:    tab,           // 'tailwind' | 'css'
    });
  }, [code, id, tab, componentName]);
  return (
    <div className="relative group/code">
      <pre className="overflow-x-auto rounded-xl bg-[#0d0d14] p-4 text-[11.5px] leading-[1.75] text-zinc-300 max-h-[260px] scrollbar-thin">
        <code className="font-mono">{code}</code>
      </pre>
      <button
        onClick={copy}
        className="absolute right-3 top-3 flex items-center gap-1.5 rounded-lg border border-zinc-700/60 bg-zinc-800/95 px-2.5 py-1.5 text-[11px] font-semibold text-zinc-300 opacity-0 group-hover/code:opacity-100 transition-all duration-150 hover:bg-zinc-700 hover:text-white backdrop-blur-sm shadow-lg"
      >
        {copied
          ? <><Check size={11} className="text-emerald-400" /><span className="text-emerald-400">Copied!</span></>
          : <><Copy size={11} /> Copy</>}
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Category meta
───────────────────────────────────────────── */
const CATEGORY_META: Record<string, { icon: string; pill: string; pillActive: string; accent: string }> = {
  'All':            { icon: '⊞',  pill: 'bg-zinc-100 text-zinc-600',          pillActive: 'bg-zinc-900 text-white',          accent: 'bg-white' },
  'Feedback':       { icon: '⚡',  pill: 'bg-amber-50 text-amber-700',         pillActive: 'bg-amber-500 text-white',         accent: 'bg-amber-50/60' },
  'Navigation':     { icon: '🧭', pill: 'bg-blue-50 text-blue-700',            pillActive: 'bg-blue-600 text-white',          accent: 'bg-blue-50/60' },
  'Forms & Inputs': { icon: '✏️', pill: 'bg-emerald-50 text-emerald-700',      pillActive: 'bg-emerald-600 text-white',       accent: 'bg-emerald-50/60' },
  'Display':        { icon: '📊', pill: 'bg-violet-50 text-violet-700',        pillActive: 'bg-violet-600 text-white',        accent: 'bg-violet-50/60' },
  'Overlay':        { icon: '🪟', pill: 'bg-rose-50 text-rose-700',            pillActive: 'bg-rose-500 text-white',          accent: 'bg-rose-50/60' },
  'Layout':         { icon: '▦',  pill: 'bg-slate-100 text-slate-600',         pillActive: 'bg-slate-700 text-white',         accent: 'bg-slate-50/60' },
  'Aside Nav':      { icon: '◧',  pill: 'bg-teal-50 text-teal-700',            pillActive: 'bg-teal-600 text-white',          accent: 'bg-teal-50/40' },
  'AI Tools':       { icon: '✦',  pill: 'bg-violet-50 text-violet-700',         pillActive: 'bg-violet-700 text-white',        accent: 'bg-slate-950' },
  'eCommerce':      { icon: '🛍️', pill: 'bg-orange-50 text-orange-700',         pillActive: 'bg-orange-500 text-white',        accent: 'bg-orange-50/40' },
  'Calendar':         { icon: '📅', pill: 'bg-blue-50 text-blue-700',             pillActive: 'bg-blue-600 text-white',          accent: 'bg-blue-50/40' },
  'Charts':           { icon: '📈', pill: 'bg-indigo-50 text-indigo-700',         pillActive: 'bg-indigo-600 text-white',         accent: 'bg-indigo-50/40' },
  'Tables':           { icon: '⊟',  pill: 'bg-slate-100 text-slate-700',          pillActive: 'bg-slate-700 text-white',          accent: 'bg-slate-50/60' },
  'Alerts':           { icon: '🔔', pill: 'bg-amber-50 text-amber-700',           pillActive: 'bg-amber-500 text-white',          accent: 'bg-amber-50/60' },
  'Avatars':          { icon: '👤', pill: 'bg-violet-50 text-violet-700',         pillActive: 'bg-violet-600 text-white',         accent: 'bg-violet-50/60' },
  'Badge':            { icon: '🏷️', pill: 'bg-blue-50 text-blue-700',             pillActive: 'bg-blue-600 text-white',           accent: 'bg-blue-50/40' },
  'Breadcrumb':       { icon: '›',  pill: 'bg-zinc-100 text-zinc-600',            pillActive: 'bg-zinc-800 text-white',           accent: 'bg-zinc-50/60' },
  'Button Variants':  { icon: '⬡',  pill: 'bg-emerald-50 text-emerald-700',       pillActive: 'bg-emerald-600 text-white',        accent: 'bg-emerald-50/60' },
  'Button Groups':    { icon: '⊞',  pill: 'bg-teal-50 text-teal-700',             pillActive: 'bg-teal-600 text-white',           accent: 'bg-teal-50/40' },
  'Cards':            { icon: '▭',  pill: 'bg-rose-50 text-rose-700',             pillActive: 'bg-rose-500 text-white',           accent: 'bg-rose-50/60' },
  'Carousel':         { icon: '⟳',  pill: 'bg-cyan-50 text-cyan-700',             pillActive: 'bg-cyan-600 text-white',           accent: 'bg-cyan-50/40' },
  'Dropdowns':        { icon: '▾',  pill: 'bg-slate-100 text-slate-600',          pillActive: 'bg-slate-700 text-white',          accent: 'bg-slate-50/60' },
  'Images':           { icon: '🖼️', pill: 'bg-orange-50 text-orange-700',         pillActive: 'bg-orange-500 text-white',         accent: 'bg-orange-50/40' },
  'Links':            { icon: '🔗', pill: 'bg-blue-50 text-blue-700',             pillActive: 'bg-blue-600 text-white',           accent: 'bg-blue-50/40' },
  'List':             { icon: '≡',  pill: 'bg-zinc-100 text-zinc-600',            pillActive: 'bg-zinc-800 text-white',           accent: 'bg-zinc-50/60' },
  'Modals':           { icon: '🪟', pill: 'bg-violet-50 text-violet-700',         pillActive: 'bg-violet-600 text-white',         accent: 'bg-violet-50/60' },
  'Notifications':    { icon: '🔔', pill: 'bg-amber-50 text-amber-700',           pillActive: 'bg-amber-500 text-white',          accent: 'bg-amber-50/60' },
  'Pagination':       { icon: '⟨⟩', pill: 'bg-indigo-50 text-indigo-700',        pillActive: 'bg-indigo-600 text-white',         accent: 'bg-indigo-50/40' },
  'Popovers':         { icon: '💬', pill: 'bg-teal-50 text-teal-700',             pillActive: 'bg-teal-600 text-white',           accent: 'bg-teal-50/40' },
  'Progress Bars':    { icon: '▬',  pill: 'bg-emerald-50 text-emerald-700',       pillActive: 'bg-emerald-600 text-white',        accent: 'bg-emerald-50/60' },
  'Ribbons':          { icon: '🎀', pill: 'bg-rose-50 text-rose-700',             pillActive: 'bg-rose-500 text-white',           accent: 'bg-rose-50/60' },
  'Spinners':         { icon: '⟳',  pill: 'bg-cyan-50 text-cyan-700',             pillActive: 'bg-cyan-600 text-white',           accent: 'bg-cyan-50/40' },
  'Tabs':             { icon: '⊟',  pill: 'bg-slate-100 text-slate-600',          pillActive: 'bg-slate-700 text-white',          accent: 'bg-slate-50/60' },
  'Tooltips':         { icon: '💡', pill: 'bg-yellow-50 text-yellow-700',         pillActive: 'bg-yellow-500 text-white',         accent: 'bg-yellow-50/40' },
  'Videos':           { icon: '▶',  pill: 'bg-zinc-100 text-zinc-700',            pillActive: 'bg-zinc-800 text-white',           accent: 'bg-zinc-50/60' },
};

const CATEGORIES = ['All', 'Feedback', 'Navigation', 'Forms & Inputs', 'Display', 'Overlay', 'Layout', 'Aside Nav', 'AI Tools', 'eCommerce', 'Calendar', 'Charts', 'Tables', 'Alerts', 'Avatars', 'Badge', 'Breadcrumb', 'Button Variants', 'Button Groups', 'Cards', 'Carousel', 'Dropdowns', 'Images', 'Links', 'List', 'Modals', 'Notifications', 'Pagination', 'Popovers', 'Progress Bars', 'Ribbons', 'Spinners', 'Tabs', 'Tooltips', 'Videos'];

/** Categories that render better as a single-column list */
const SINGLE_COL_CATS = new Set(['Aside Nav', 'AI Tools', 'eCommerce', 'Calendar', 'Alerts', 'Avatars', 'Badge', 'Breadcrumb', 'Button Variants', 'Button Groups', 'Cards', 'Carousel', 'Dropdowns', 'Images', 'Links', 'List', 'Modals', 'Notifications', 'Pagination', 'Popovers', 'Progress Bars', 'Ribbons', 'Spinners', 'Tabs', 'Tooltips', 'Videos']);

/* ─────────────────────────────────────────────
   Share Toast
───────────────────────────────────────────── */
function ShareToast({ visible }: { visible: boolean }) {
  return (
    <div className={`pointer-events-none absolute bottom-[72px] left-1/2 -translate-x-1/2 z-50 transition-all duration-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
      <div className="flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-xl whitespace-nowrap">
        <Check size={12} className="text-emerald-400" /> Link copied to clipboard!
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Component Card
───────────────────────────────────────────── */
function ComponentCard({ comp }: { comp: ComponentDef }) {
  const [tab, setTab] = useState<CodeTab>('tailwind');
  const [showCode, setShowCode] = useState(false);
  const [shared, setShared] = useState(false);
  const Preview = comp.Preview;
  const meta = CATEGORY_META[comp.category] ?? CATEGORY_META['Layout'];

  const handleShare = useCallback(() => {
    const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/css-ui-components#${comp.id}`;
    navigator.clipboard.writeText(url);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
    trackEvent('component_shared', {
      tool_name:      'css_ui_components',
      component_id:   comp.id,
      component_name: comp.name,
      category:       comp.category,
    });
  }, [comp.id, comp.name, comp.category]);

  return (
    <div id={comp.id} className="relative flex flex-col rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/50 hover:-translate-y-0.5">

      {/* ── Header ── */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-100/80">
        {/* Category pill */}
        <span className={`shrink-0 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-bold ${meta.pill}`}>
          <span className="text-sm leading-none">{meta.icon}</span>
          <span>{comp.category}</span>
        </span>

        {/* Name + description */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-[14px] text-zinc-900 leading-tight tracking-[-0.02em] truncate">{comp.name}</h3>
          <p className="text-[11.5px] text-zinc-400 mt-0.5 leading-relaxed line-clamp-1">{comp.description}</p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Share button */}
          <button
            onClick={handleShare}
            title="Share component"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-400 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
          >
            {shared
              ? <Check size={13} className="text-emerald-500" />
              : <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            }
          </button>
        </div>
      </div>

      {/* ── Live Preview ── */}
      <div className={`relative flex w-full items-center justify-center overflow-hidden ${meta.accent}`} style={{ minHeight: 320 }}>
        {/* Dot-grid texture */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(circle, #00000008 1px, transparent 1px)', backgroundSize: '18px 18px' }}
        />
        <div className="relative w-full">
          <Preview />
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="flex items-center border-t border-zinc-100 bg-zinc-50/80 px-4 py-0">
        {/* Code format tabs */}
        {(['tailwind', 'css'] as CodeTab[]).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setShowCode(true); }}
            className={`flex items-center gap-1.5 px-3 py-3 text-[11px] font-bold border-b-2 -mb-px transition-all ${
              tab === t && showCode
                ? 'border-zinc-800 text-zinc-900'
                : 'border-transparent text-zinc-400 hover:text-zinc-700'
            }`}
          >
            <span className="opacity-80">{t === 'tailwind' ? '⚡' : '🎨'}</span>
            {t === 'tailwind' ? 'Tailwind' : 'CSS'}
          </button>
        ))}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Code toggle */}
        <button
          onClick={() => {
            const opening = !showCode;
            setShowCode(opening);
            if (opening) {
              trackEvent('component_code_viewed', {
                tool_name:      'css_ui_components',
                component_id:   comp.id,
                component_name: comp.name,
                code_format:    tab,
              });
            }
          }}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 my-1.5 text-[11px] font-bold transition-all ${
            showCode
              ? 'bg-zinc-900 text-white'
              : 'border border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300 hover:text-zinc-800'
          }`}
        >
          {showCode
            ? <><X size={11} /> Hide</>
            : <><span className="font-mono text-xs">{'<>'}</span> View Code</>
          }
        </button>
      </div>

      {/* ── Code panel ── */}
      <div className={`overflow-hidden transition-all duration-300 ease-out ${showCode ? 'max-h-[300px]' : 'max-h-0'}`}>
        <div className="p-4">
          <CodeBlock code={tab === 'tailwind' ? comp.tailwind : comp.css} id={comp.id} tab={tab} componentName={comp.name} />
        </div>
      </div>

      {/* Share toast */}
      <ShareToast visible={shared} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Sidebar item
───────────────────────────────────────────── */
function SidebarItem({ cat, count, active, onClick }: { cat: string; count: number; active: boolean; onClick: () => void }) {
  const meta = CATEGORY_META[cat] ?? CATEGORY_META['Layout'];
  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 text-left ${
        active ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
      }`}
    >
      <span className="w-6 text-center text-[15px] leading-none shrink-0">{meta.icon}</span>
      <span className="flex-1 truncate">{cat}</span>
      <span className={`shrink-0 min-w-[28px] rounded-full px-2 py-0.5 text-center text-[10px] font-bold tabular-nums transition-colors ${
        active ? 'bg-white/15 text-white' : 'bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200'
      }`}>
        {count}
      </span>
    </button>
  );
}

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

  const catCounts = useMemo(() =>
    Object.fromEntries(CATEGORIES.map(cat => [
      cat,
      cat === 'All' ? COMPONENTS.length : COMPONENTS.filter(c => c.category === cat).length
    ])), []);

  return (
    <div className="min-h-screen bg-[#F2F3F5]">

      {/* ══════════ HERO ══════════ */}
      <div className="relative overflow-hidden border-b border-zinc-200 bg-white">
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="pointer-events-none absolute -top-32 left-1/4 h-80 w-80 rounded-full bg-blue-400/25 blur-3xl" />
        <div className="pointer-events-none absolute -top-32 right-1/4 h-80 w-80 rounded-full bg-violet-400/25 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 py-16 text-center sm:py-20">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-gradient-to-r from-blue-50 to-violet-50 px-5 py-2 text-xs font-semibold text-blue-700 shadow-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
            {COMPONENTS.length}+ Production-Ready Components · Free Forever
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500" />
          </div>

          <h1 className="text-[clamp(2.2rem,4.5vw,3.5rem)] font-black tracking-[-0.04em] text-zinc-900 leading-[1.08]">
            CSS UI{' '}
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              Component Library
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] text-zinc-500 leading-relaxed">
            Live interactive previews with Tailwind & plain CSS code. Copy-paste into any project — no signup, no dependencies.
          </p>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap items-stretch justify-center gap-3">
            {[
              { n: `${COMPONENTS.length}+`, l: 'Components', icon: '⊞', c: 'from-blue-500 to-blue-600' },
              { n: '6',     l: 'Categories',   icon: '🗂️', c: 'from-violet-500 to-violet-600' },
              { n: '2',     l: 'Code formats', icon: '💻', c: 'from-emerald-500 to-emerald-600' },
              { n: '100%',  l: 'Free forever', icon: '🎁', c: 'from-amber-500 to-orange-500' },
            ].map((s) => (
              <div key={s.l} className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-5 py-3 shadow-sm">
                <span className="text-xl">{s.icon}</span>
                <div className="text-left">
                  <p className={`text-lg font-black tabular-nums bg-gradient-to-br ${s.c} bg-clip-text text-transparent leading-none`}>{s.n}</p>
                  <p className="text-[11px] text-zinc-400 font-medium mt-0.5">{s.l}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="relative mx-auto mt-7 max-w-lg">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${COMPONENTS.length} components… button, modal, chart…`}
              className="w-full rounded-2xl border border-zinc-200 bg-white py-3.5 pl-11 pr-12 text-sm text-zinc-800 placeholder-zinc-400 shadow-md outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100/60"
            />
            {search ? (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition">
                <X size={14} />
              </button>
            ) : (
              <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center rounded-lg border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-400">
                ⌘K
              </kbd>
            )}
          </div>
        </div>
      </div>

      {/* ══════════ BODY ══════════ */}
      <div className="mx-auto flex max-w-[1600px]">

        {/* Mobile tab bar */}
        <div className="sticky top-0 z-30 lg:hidden fixed inset-x-0 border-b border-zinc-200 bg-white/95 backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-1 overflow-x-auto px-3 py-2">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCat(cat)}
                className={`shrink-0 flex items-center gap-1 rounded-xl px-3 py-1.5 text-[11px] font-bold transition whitespace-nowrap ${
                  activeCat === cat ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}>
                {CATEGORY_META[cat]?.icon} {cat}
                <span className={`ml-0.5 text-[9px] ${activeCat === cat ? 'text-white/60' : 'text-zinc-400'}`}>{catCounts[cat]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── LEFT SIDEBAR ── */}
        <aside className="hidden lg:block w-64 xl:w-72 shrink-0 border-r border-zinc-200 bg-white">
          <div className="sticky top-0 h-screen overflow-y-auto flex flex-col p-5 pt-7 gap-1">

            {/* Header */}
            <div className="mb-3 px-1">
              <p className="text-[10px] font-black uppercase tracking-[0.12em] text-zinc-400">Browse</p>
              <p className="text-[12px] text-zinc-400 mt-0.5">
                <span className="font-semibold text-zinc-700">{filtered.length}</span> of <span className="font-semibold text-zinc-700">{COMPONENTS.length}</span> components
              </p>
            </div>

            {/* Nav */}
            <nav className="flex flex-col gap-0.5">
              {CATEGORIES.map(cat => (
                <SidebarItem key={cat} cat={cat} count={catCounts[cat]} active={activeCat === cat} onClick={() => setActiveCat(cat)} />
              ))}
            </nav>

            <div className="my-5 border-t border-zinc-100" />

            {/* Tips */}
            <div className="rounded-2xl bg-zinc-50 border border-zinc-100 p-4 space-y-2.5">
              <p className="text-[11px] font-bold text-zinc-700">💡 Quick tips</p>
              {[
                ['<> View Code', 'toggle per card'],
                ['⚡ / 🎨', 'switch code format'],
                ['Share icon', 'copy component link'],
                ['All previews', 'are interactive'],
              ].map(([a, b]) => (
                <div key={a} className="flex items-start gap-2">
                  <span className="text-[10px] font-bold text-zinc-800 shrink-0 mt-px">{a}</span>
                  <span className="text-[10px] text-zinc-400">{b}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-3 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 p-4 text-white">
              <p className="text-xs font-bold leading-snug">🚀 {COMPONENTS.length}+ components</p>
              <p className="text-[10px] text-white/70 mt-1 leading-relaxed">All free · Tailwind + CSS · No account needed</p>
            </div>

          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 min-w-0 px-4 pt-6 pb-16 sm:px-6 lg:px-8">

          {/* Toolbar row */}
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-base font-bold text-zinc-900 tracking-tight leading-none">
                  {activeCat === 'All' ? 'All Components' : activeCat}
                </h2>
                <p className="text-[12px] text-zinc-400 mt-1">
                  {filtered.length} component{filtered.length !== 1 ? 's' : ''}
                  {search && <span className="ml-1 text-blue-500">· "{search}"</span>}
                </p>
              </div>
            </div>
            {(search || activeCat !== 'All') && (
              <button
                onClick={() => { setSearch(''); setActiveCat('All'); }}
                className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50 transition shadow-sm"
              >
                <X size={11} /> Clear
              </button>
            )}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-40">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-100 text-4xl mb-5 shadow-inner">🔍</div>
              <h3 className="text-base font-bold text-zinc-700">Nothing found</h3>
              <p className="mt-1.5 text-sm text-zinc-400 text-center max-w-xs">Try different keywords or select a category from the sidebar.</p>
              <button onClick={() => { setSearch(''); setActiveCat('All'); }}
                className="mt-5 rounded-2xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 transition">
                Browse all components
              </button>
            </div>
          ) : (
            <div className={`grid gap-5 ${SINGLE_COL_CATS.has(activeCat) ? 'grid-cols-1 max-w-2xl' : 'grid-cols-1 xl:grid-cols-2'}`}>
              {filtered.map((comp) => (
                <ComponentCard key={comp.id} comp={comp} />
              ))}
            </div>
          )}

          {/* Footer strip */}
          <div className="mt-14 rounded-2xl border border-zinc-200 bg-white px-8 py-8 text-center shadow-sm">
            <p className="text-base font-bold text-zinc-900">All {COMPONENTS.length}+ components — completely free</p>
            <p className="mt-1.5 text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
              Copy-paste into any project. Tailwind + plain CSS. No attribution required.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {['✓ No account', '✓ No watermark', '✓ Commercial OK', '✓ MIT license'].map(t => (
                <span key={t} className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-500">{t}</span>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
