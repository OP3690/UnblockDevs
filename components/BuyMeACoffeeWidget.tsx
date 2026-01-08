'use client';

import { useEffect } from 'react';

export default function BuyMeACoffeeWidget() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    const loadWidget = () => {
      // Check if widget script already exists
      const existingScript = document.querySelector('script[data-name="BMC-Widget"]');
      const existingWidget = document.querySelector('#bmc-wbtn');
      
      // If widget already exists, don't load again
      if (existingWidget) {
        return;
      }
      
      // If script exists but widget doesn't, wait a bit
      if (existingScript && !existingWidget) {
        setTimeout(loadWidget, 1000);
        return;
      }
      
      // Create and load the script
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
      
      // Handle script load
      script.onload = () => {
        console.log('Buy Me a Coffee widget script loaded');
        // Widget should initialize automatically after a short delay
        setTimeout(() => {
          const widget = document.querySelector('#bmc-wbtn');
          if (!widget) {
            console.debug('Buy Me a Coffee widget not initialized yet, retrying...');
            // Retry once more after another delay
            setTimeout(() => {
              if (!document.querySelector('#bmc-wbtn')) {
                console.debug('Buy Me a Coffee widget may not be available');
              }
            }, 2000);
          }
        }, 500);
      };
      
      script.onerror = (error) => {
        console.debug('Failed to load Buy Me a Coffee widget:', error);
      };
      
      // Append to body
      if (document.body) {
        document.body.appendChild(script);
      } else {
        // Wait for body to be available
        const observer = new MutationObserver(() => {
          if (document.body) {
            document.body.appendChild(script);
            observer.disconnect();
          }
        });
        observer.observe(document.documentElement, { childList: true });
      }
    };
    
    // Load widget after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadWidget);
    } else {
      // DOM is already ready, but wait a bit for other scripts
      setTimeout(loadWidget, 500);
    }
    
    return () => {
      document.removeEventListener('DOMContentLoaded', loadWidget);
    };
  }, []);

  return null;
}


