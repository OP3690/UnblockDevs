'use client';

import { useEffect, useState } from 'react';

export default function BuyMeACoffeeWidget() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mark as mounted to avoid hydration issues
    setMounted(true);
    
    // Ensure the widget script loads even if it wasn't loaded in head
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      // Check if widget is already loaded
      const existingScript = document.querySelector('script[data-name="BMC-Widget"]');
      
      if (!existingScript) {
        // Create and append the script if it doesn't exist
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
        
        document.head.appendChild(script);
      }
      
      // Also check if the widget button exists, if not, try to trigger it
      const checkWidget = setInterval(() => {
        const bmcButton = document.querySelector('#bmc-wbtn');
        if (bmcButton) {
          clearInterval(checkWidget);
        }
      }, 1000);
      
      // Clear interval after 10 seconds
      setTimeout(() => {
        clearInterval(checkWidget);
      }, 10000);
    }
  }, []);

  // Return null during SSR to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return null; // This component doesn't render anything
}


