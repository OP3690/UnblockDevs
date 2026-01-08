'use client';

import { useEffect, useRef } from 'react';

// Global flag to prevent multiple script loads across component instances
let widgetScriptLoaded = false;
let widgetLoadPromise: Promise<void> | null = null;

export default function BuyMeACoffeeWidget() {
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    if (hasLoadedRef.current) return; // Prevent multiple loads from same component instance
    
    // Check if widget already exists
    const existingWidget = document.querySelector('#bmc-wbtn') || 
                          document.querySelector('iframe[src*="buymeacoffee.com"]') ||
                          document.querySelector('[id*="bmc"]') ||
                          document.querySelector('[class*="bmc-wbtn"]');
    if (existingWidget) {
      console.log('✅ Buy Me a Coffee widget already exists');
      hasLoadedRef.current = true;
      return;
    }
    
    // If script is already being loaded, wait for it
    if (widgetLoadPromise) {
      widgetLoadPromise.then(() => {
        hasLoadedRef.current = true;
      });
      return;
    }
    
    // Check if script already exists in DOM
    const existingScript = document.querySelector('script[data-name="BMC-Widget"]');
    if (existingScript) {
      console.log('Buy Me a Coffee script already in DOM, waiting for widget...');
      widgetScriptLoaded = true;
      
      // Wait for widget to appear
      let attempts = 0;
      const checkInterval = setInterval(() => {
        attempts++;
        const widget = document.querySelector('#bmc-wbtn') || 
                      document.querySelector('iframe[src*="buymeacoffee.com"]') ||
                      document.querySelector('[id*="bmc"]') ||
                      document.querySelector('[class*="bmc-wbtn"]');
        if (widget) {
          console.log('✅ Buy Me a Coffee widget found!');
          clearInterval(checkInterval);
          hasLoadedRef.current = true;
        } else if (attempts >= 10) {
          console.warn('⚠️ Widget not appearing after script load. This might be normal if the widget is disabled or blocked.');
          clearInterval(checkInterval);
          hasLoadedRef.current = true;
        }
      }, 2000);
      return;
    }
    
    // Create load promise
    widgetLoadPromise = new Promise<void>((resolve) => {
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
        widgetScriptLoaded = true;
        
        // Wait for widget to initialize (Buy Me a Coffee widget initializes automatically)
        let checkCount = 0;
        const maxChecks = 15; // Check for up to 15 seconds
        
        const checkForWidget = setInterval(() => {
          checkCount++;
          const widget = document.querySelector('#bmc-wbtn');
          const iframe = document.querySelector('iframe[src*="buymeacoffee.com"]');
          const widgetContainer = document.querySelector('[id*="bmc"]');
          const bmcButton = document.querySelector('[class*="bmc-wbtn"]');
          
          if (widget || iframe || widgetContainer || bmcButton) {
            console.log('✅ Buy Me a Coffee widget found and initialized!', {
              widget: !!widget,
              iframe: !!iframe,
              container: !!widgetContainer,
              button: !!bmcButton
            });
            clearInterval(checkForWidget);
            resolve();
            hasLoadedRef.current = true;
          } else if (checkCount >= maxChecks) {
            console.warn('⚠️ Buy Me a Coffee widget did not appear after', maxChecks, 'seconds');
            console.log('This might be normal if:', {
              'Ad blocker active': 'Check if ad blockers are blocking buymeacoffee.com',
              'Widget disabled': 'Check Buy Me a Coffee account settings',
              'Network issue': 'Check browser network tab for blocked requests'
            });
            clearInterval(checkForWidget);
            resolve(); // Resolve anyway to prevent infinite waiting
            hasLoadedRef.current = true;
          }
        }, 1000);
      };
      
      script.onerror = (error) => {
        console.error('❌ Failed to load Buy Me a Coffee widget script:', error);
        widgetScriptLoaded = false;
        widgetLoadPromise = null;
        resolve(); // Resolve to prevent blocking
        hasLoadedRef.current = true;
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
    });
    
    // Wait for DOM to be ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      // DOM is ready, load immediately
    } else {
      // Wait for DOMContentLoaded
      document.addEventListener('DOMContentLoaded', () => {
        // Script loading will happen in the promise above
      }, { once: true });
    }
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return null;
}


