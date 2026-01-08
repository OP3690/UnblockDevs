'use client';

import { useEffect } from 'react';

export default function BuyMeACoffeeWidget() {
  useEffect(() => {
    // Widget is loaded in layout.tsx after LCP
    // This component just ensures the widget container exists
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    // Check if widget is already loaded from layout
    const checkWidget = () => {
      const existingScript = document.querySelector('script[data-name="BMC-Widget"]');
      const bmcWidget = document.querySelector('#bmc-wbtn');
      
      // If script exists but widget container doesn't, wait a bit more
      if (existingScript && !bmcWidget) {
        setTimeout(checkWidget, 1000);
      }
    };
    
    // Start checking after a delay (layout loads it after LCP + 3s)
    const timeout = setTimeout(checkWidget, 5000);
    
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return null;
}


