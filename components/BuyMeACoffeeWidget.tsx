'use client';

import { useEffect } from 'react';

export default function BuyMeACoffeeWidget() {
  useEffect(() => {
    // Wait for DOM to be ready
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    const loadWidget = () => {
      // Check if widget script already exists
      const existingScript = document.querySelector('script[data-name="BMC-Widget"]');
      
      if (!existingScript) {
        // Create and append the script
        const script = document.createElement('script');
        script.setAttribute('data-name', 'BMC-Widget');
        script.setAttribute('data-cfasync', 'false');
        script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js';
        script.setAttribute('data-id', 'WKbStURip');
        script.setAttribute('data-description', 'Support me on Buy me a coffee!');
        script.setAttribute('data-message', 'You have a wonderful day!!!');
        script.setAttribute('data-color', '#5F7FFF');
        script.setAttribute('data-position', 'Right');
        script.setAttribute('data-x_margin', '18');
        script.setAttribute('data-y_margin', '18');
        script.async = true;
        script.defer = true;
        
        // Append to body instead of head for better compatibility
        document.body.appendChild(script);
      }
    };

    // Try loading immediately
    loadWidget();
    
    // Also try after a short delay to ensure DOM is ready
    const timeout = setTimeout(loadWidget, 100);
    
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return null;
}


