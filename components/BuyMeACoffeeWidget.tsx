'use client';

import { useEffect } from 'react';

// BMC widget listens for DOMContentLoaded; when we inject after mount, that event already fired.
// We must dispatch it again after the script loads (see stackoverflow.com/q/62039217).
const BMC_SCRIPT_URL = 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js';

export default function BuyMeACoffeeWidget() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    if (document.querySelector('script[data-name="BMC-Widget"]')) return;

    const script = document.createElement('script');
    script.setAttribute('data-name', 'BMC-Widget');
    script.setAttribute('data-cfasync', 'false');
    script.src = BMC_SCRIPT_URL;
    script.setAttribute('data-id', 'WKbStURip');
    script.setAttribute('data-description', 'Support me on Buy me a coffee!');
    script.setAttribute('data-message', '');
    script.setAttribute('data-color', '#5F7FFF');
    script.setAttribute('data-position', 'Right');
    script.setAttribute('data-x_margin', '18');
    script.setAttribute('data-y_margin', '18');
    script.async = true;
    script.onload = () => {
      window.dispatchEvent(new Event('DOMContentLoaded'));
    };
    document.head.appendChild(script);
  }, []);

  return null;
}


