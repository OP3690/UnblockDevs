'use client';

import { useEffect } from 'react';

export default function BuyMeACoffeeWidget() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    const loadWidget = () => {
      // Check if widget already exists
      const existingWidget = document.querySelector('#bmc-wbtn') || document.querySelector('iframe[src*="buymeacoffee.com"]');
      if (existingWidget) {
        console.log('Buy Me a Coffee widget already exists');
        return;
      }
      
      // Check if script already exists
      const existingScript = document.querySelector('script[data-name="BMC-Widget"]');
      if (existingScript) {
        // Script exists - wait a bit and check if widget appears
        console.log('Buy Me a Coffee script exists, checking for widget...');
        setTimeout(() => {
          const widget = document.querySelector('#bmc-wbtn') || 
                        document.querySelector('iframe[src*="buymeacoffee.com"]');
          if (!widget) {
            console.warn('Buy Me a Coffee script loaded but widget not found. Removing and reloading...');
            existingScript.remove();
            setTimeout(loadWidget, 500);
          }
        }, 3000);
        return;
      }
      
      // Create and load the script using official Buy Me a Coffee embed format
      const script = document.createElement('script');
      script.setAttribute('data-name', 'BMC-Widget');
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js';
      script.setAttribute('data-id', 'WKbStURip');
      script.setAttribute('data-description', 'Support me on Buy me a coffee!');
      script.setAttribute('data-message', ''); // Empty message as per official format
      script.setAttribute('data-color', '#5F7FFF');
      script.setAttribute('data-position', 'Right');
      script.setAttribute('data-x_margin', '18');
      script.setAttribute('data-y_margin', '18');
      script.async = true;
      
      // Handle script load
      script.onload = () => {
        console.log('Buy Me a Coffee widget script loaded successfully');
        
        // The widget should auto-initialize, but let's verify and wait
        let checkCount = 0;
        const maxChecks = 15; // Check for up to 15 seconds
        
        const checkForWidget = setInterval(() => {
          checkCount++;
          const widget = document.querySelector('#bmc-wbtn');
          const iframe = document.querySelector('iframe[src*="buymeacoffee.com"]');
          const widgetContainer = document.querySelector('[id*="bmc"]');
          
          if (widget || iframe || widgetContainer) {
            console.log('✅ Buy Me a Coffee widget found and initialized!', {
              widget: !!widget,
              iframe: !!iframe,
              container: !!widgetContainer
            });
            clearInterval(checkForWidget);
          } else if (checkCount >= maxChecks) {
            console.warn('⚠️ Buy Me a Coffee widget did not initialize after', maxChecks, 'seconds');
            console.log('Available window objects:', {
              BMCWidget: typeof (window as any).BMCWidget,
              bmcWidget: typeof (window as any).bmcWidget,
            });
            clearInterval(checkForWidget);
          }
        }, 1000);
      };
      
      script.onerror = (error) => {
        console.error('❌ Failed to load Buy Me a Coffee widget script:', error);
      };
      
      // Append to document body (required by Buy Me a Coffee)
      if (document.body) {
        document.body.appendChild(script);
        console.log('Buy Me a Coffee script appended to body');
      } else {
        // Wait for body to be available
        const observer = new MutationObserver(() => {
          if (document.body) {
            document.body.appendChild(script);
            console.log('Buy Me a Coffee script appended to body (after wait)');
            observer.disconnect();
          }
        });
        observer.observe(document.documentElement, { childList: true });
      }
    };
    
    // Load widget as soon as DOM is ready
    // Buy Me a Coffee widget can load early without conflicts
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      // DOM is ready, load immediately
      loadWidget();
    } else {
      // Wait for DOMContentLoaded
      document.addEventListener('DOMContentLoaded', loadWidget);
    }
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return null;
}


