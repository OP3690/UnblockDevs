'use client';

import { useEffect } from 'react';

export default function BuyMeACoffeeWidget() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    // Use a more aggressive approach - load immediately and retry if needed
    const loadWidget = () => {
      // Check if widget already exists
      const existingWidget = document.querySelector('#bmc-wbtn') || 
                            document.querySelector('iframe[src*="buymeacoffee.com"]') ||
                            document.querySelector('[id*="bmc"]');
      if (existingWidget) {
        console.log('✅ Buy Me a Coffee widget already exists');
        return;
      }
      
      // Check if script already exists
      const existingScript = document.querySelector('script[data-name="BMC-Widget"]');
      if (existingScript) {
        console.log('Buy Me a Coffee script exists, waiting for widget to initialize...');
        // Wait and check if widget appears
        let attempts = 0;
        const checkInterval = setInterval(() => {
          attempts++;
          const widget = document.querySelector('#bmc-wbtn') || 
                        document.querySelector('iframe[src*="buymeacoffee.com"]') ||
                        document.querySelector('[id*="bmc"]');
          if (widget) {
            console.log('✅ Buy Me a Coffee widget initialized!');
            clearInterval(checkInterval);
          } else if (attempts >= 5) {
            // After 5 seconds, remove and reload
            console.warn('Buy Me a Coffee widget not initializing, reloading script...');
            existingScript.remove();
            clearInterval(checkInterval);
            setTimeout(loadWidget, 500);
          }
        }, 1000);
        return;
      }
      
      // Create and load the script using official Buy Me a Coffee embed format
      const script = document.createElement('script');
      script.setAttribute('data-name', 'BMC-Widget');
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js';
      script.setAttribute('data-id', 'WKbStURip');
      script.setAttribute('data-description', 'Support me on Buy me a coffee!');
      script.setAttribute('data-message', 'You have a Wonderful Day!!! :)');
      script.setAttribute('data-color', '#5F7FFF');
      script.setAttribute('data-position', 'Right');
      script.setAttribute('data-x_margin', '18');
      script.setAttribute('data-y_margin', '18');
      script.async = true;
      
      // Handle script load
      script.onload = () => {
        console.log('✅ Buy Me a Coffee widget script loaded successfully');
        
        // Check for widget initialization multiple times
        let checkCount = 0;
        const maxChecks = 20; // Check for up to 20 seconds
        
        const checkForWidget = setInterval(() => {
          checkCount++;
          const widget = document.querySelector('#bmc-wbtn');
          const iframe = document.querySelector('iframe[src*="buymeacoffee.com"]');
          const widgetContainer = document.querySelector('[id*="bmc"]');
          const bmcButton = document.querySelector('[class*="bmc"]');
          
          if (widget || iframe || widgetContainer || bmcButton) {
            console.log('✅ Buy Me a Coffee widget found and initialized!', {
              widget: !!widget,
              iframe: !!iframe,
              container: !!widgetContainer,
              button: !!bmcButton
            });
            clearInterval(checkForWidget);
          } else if (checkCount >= maxChecks) {
            console.warn('⚠️ Buy Me a Coffee widget did not initialize after', maxChecks, 'seconds');
            console.log('Debug info:', {
              scriptInDOM: !!document.querySelector('script[data-name="BMC-Widget"]'),
              bodyExists: !!document.body,
              windowBMC: typeof (window as any).BMCWidget,
            });
            clearInterval(checkForWidget);
          }
        }, 1000);
      };
      
      script.onerror = (error) => {
        console.error('❌ Failed to load Buy Me a Coffee widget script:', error);
        // Retry after a delay
        setTimeout(() => {
          if (!document.querySelector('script[data-name="BMC-Widget"]')) {
            console.log('Retrying Buy Me a Coffee widget load...');
            loadWidget();
          }
        }, 3000);
      };
      
      // Append to document body (required by Buy Me a Coffee)
      if (document.body) {
        document.body.appendChild(script);
        console.log('📝 Buy Me a Coffee script appended to body');
      } else {
        // Wait for body to be available
        const observer = new MutationObserver(() => {
          if (document.body) {
            document.body.appendChild(script);
            console.log('📝 Buy Me a Coffee script appended to body (after wait)');
            observer.disconnect();
          }
        });
        observer.observe(document.documentElement, { childList: true });
      }
    };
    
    // Try loading immediately, then also on various events to ensure it loads
    if (document.readyState === 'complete') {
      // Page fully loaded
      loadWidget();
    } else if (document.readyState === 'interactive') {
      // DOM ready
      loadWidget();
      window.addEventListener('load', loadWidget, { once: true });
    } else {
      // Still loading
      document.addEventListener('DOMContentLoaded', loadWidget, { once: true });
      window.addEventListener('load', loadWidget, { once: true });
    }
    
    // Also try after a short delay as fallback
    const fallbackTimer = setTimeout(loadWidget, 2000);
    
    return () => {
      clearTimeout(fallbackTimer);
    };
  }, []);

  return null;
}


