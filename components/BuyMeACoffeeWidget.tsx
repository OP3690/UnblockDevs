'use client';

import { useEffect } from 'react';

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
    script.setAttribute('data-message', 'You have a Wonderful Day!!!');
    script.setAttribute('data-color', '#5F7FFF');
    script.setAttribute('data-position', 'Right');
    script.setAttribute('data-x_margin', '18');
    script.setAttribute('data-y_margin', '18');
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return null;
}


