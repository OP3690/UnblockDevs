'use client';

import { useState, useEffect, createContext, useContext } from 'react';

const STORAGE_KEY = 'unblockdevs-dev-mode';

type DevModeContextType = {
  devMode: boolean;
  setDevMode: (v: boolean) => void;
};

const DevModeContext = createContext<DevModeContextType>({
  devMode: false,
  setDevMode: () => {},
});

export function useDevMode() {
  return useContext(DevModeContext);
}

export default function DevModeWrapper({ children }: { children: React.ReactNode }) {
  const [devMode, setDevModeState] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const stored = localStorage.getItem(STORAGE_KEY);
    const initial = stored === 'true';
    setDevModeState(initial);
    if (initial) document.documentElement.classList.add('dev-mode');
  }, [mounted]);

  const setDevMode = (value: boolean) => {
    setDevModeState(value);
    localStorage.setItem(STORAGE_KEY, String(value));
    if (value) {
      document.documentElement.classList.add('dev-mode');
    } else {
      document.documentElement.classList.remove('dev-mode');
    }
  };

  return <DevModeContext.Provider value={{ devMode, setDevMode }}>{children}</DevModeContext.Provider>;
}
