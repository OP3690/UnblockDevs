'use client';

import { useEffect } from 'react';

export default function BuyMeACoffeeWidget() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    // The script is loaded in body via layout.tsx
    // The widget script waits for DOMContentLoaded, but if DOM is already loaded,
    // we need to manually trigger initialization
    const initWidget = () => {
      const script = document.querySelector('script[data-name="BMC-Widget"]') as HTMLScriptElement;
      if (!script) {
        console.log('Buy Me a Coffee script not found yet');
        return;
      }
      
      // If DOMContentLoaded already fired, manually trigger widget initialization
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        // Check if widget already exists
        if (document.querySelector('#bmc-wbtn')) {
          console.log('✅ Buy Me a Coffee widget already initialized');
          return;
        }
        
        // The widget script should handle initialization, but let's check
        // Wait a bit for the script to execute
        setTimeout(() => {
          const widget = document.querySelector('#bmc-wbtn');
          if (!widget) {
            console.log('Buy Me a Coffee widget not initialized. Script may need DOMContentLoaded event.');
            // Try to manually dispatch DOMContentLoaded if needed
            // (though this usually doesn't work, the script should handle it)
          } else {
            console.log('✅ Buy Me a Coffee widget initialized!');
          }
        }, 1000);
      }
    };
    
    // Check after script loads
    const checkScript = setInterval(() => {
      if (document.querySelector('script[data-name="BMC-Widget"]')) {
        clearInterval(checkScript);
        initWidget();
      }
    }, 100);
    
    // Cleanup
    setTimeout(() => clearInterval(checkScript), 5000);
  }, []);

  return null;
}


