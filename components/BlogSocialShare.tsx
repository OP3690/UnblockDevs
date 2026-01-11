'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

// Clean, Symmetric SVG Icons
const ShareIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className}>
    <defs>
      <linearGradient id="wa-gradient" x1="1337.28" y1="518.24" x2="1337.28" y2="-2164.82" gradientTransform="matrix(0.19, 0, 0, -0.19, 0.81, 98.89)" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#61fd7d"/>
        <stop offset="1" stopColor="#2bb826"/>
      </linearGradient>
    </defs>
    <path fill="url(#wa-gradient)" fillRule="evenodd" d="M512,382.07c0,2.8-.09,8.88-.26,13.58-.41,11.49-1.32,26.32-2.7,33.07a109.76,109.76,0,0,1-9.27,27.71,98.45,98.45,0,0,1-43.43,43.39,110.21,110.21,0,0,1-27.87,9.28c-6.69,1.35-21.41,2.24-32.82,2.65-4.71.17-10.79.25-13.58.25l-252.1,0c-2.8,0-8.88-.09-13.58-.26-11.49-.41-26.32-1.32-33.07-2.69a110.37,110.37,0,0,1-27.72-9.28A98.5,98.5,0,0,1,12.18,456.3,110.21,110.21,0,0,1,2.9,428.43C1.55,421.74.66,407,.25,395.61.08,390.91,0,384.82,0,382l0-252.1c0-2.8.09-8.88.25-13.58C.71,104.86,1.62,90,3,83.28a110.37,110.37,0,0,1,9.27-27.72A98.59,98.59,0,0,1,55.7,12.18,110.21,110.21,0,0,1,83.57,2.9C90.26,1.55,105,.66,116.39.25,121.09.08,127.18,0,130,0l252.1,0c2.8,0,8.88.09,13.58.25C407.14.71,422,1.62,428.72,3a110.37,110.37,0,0,1,27.72,9.27A98.59,98.59,0,0,1,499.82,55.7a110.21,110.21,0,0,1,9.28,27.87c1.35,6.69,2.24,21.41,2.65,32.82.17,4.7.25,10.79.25,13.58Z"/>
    <path fill="#fff" fillRule="evenodd" d="M379.56,131.67A172.4,172.4,0,0,0,256.67,80.73C161,80.73,83.05,158.64,83.05,254.42a173.47,173.47,0,0,0,23.2,86.82l-24.65,90,92.08-24.17a173.55,173.55,0,0,0,83,21.17h.07c95.73,0,173.69-77.91,173.69-173.69A172.73,172.73,0,0,0,379.53,131.7l0,0ZM256.72,399a144.17,144.17,0,0,1-73.52-20.14l-5.29-3.15L123.27,390l14.59-53.27-3.42-5.47a143.29,143.29,0,0,1-22.11-76.81C112.33,174.81,177.1,110,256.8,110A144.34,144.34,0,0,1,401.12,254.48c-.07,79.67-64.83,144.46-144.41,144.46v0ZM335.87,290.8c-4.32-2.2-25.68-12.67-29.65-14.12s-6.85-2.19-9.8,2.2-11.22,14.11-13.76,17-5.06,3.29-9.37,1.09-18.35-6.77-34.92-21.56c-12.88-11.5-21.61-25.74-24.15-30s-.29-6.71,1.92-8.83c2-1.93,4.32-5.06,6.51-7.6s2.88-4.32,4.32-7.26.74-5.42-.35-7.6-9.8-23.55-13.34-32.25c-3.49-8.51-7.12-7.32-9.79-7.47s-5.42-.13-8.29-.13a16,16,0,0,0-11.57,5.41c-4,4.32-15.2,14.86-15.2,36.22s15.54,42,17.72,44.91,30.61,46.76,74.14,65.54c10.34,4.44,18.42,7.11,24.72,9.18a60,60,0,0,0,27.32,1.71c8.35-1.23,25.68-10.49,29.31-20.62s3.63-18.83,2.55-20.62-3.91-3-8.29-5.22l0,0Z"/>
  </svg>
);

// LinkedIn Icons - Different for top and bottom
const LinkedInIconTop = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 160.35" preserveAspectRatio="xMidYMid meet" className={className}>
    <path fill="#0A66C2" d="M494.55 0H17.45C7.86 0 0 7.86 0 17.46v125.43c0 9.6 7.86 17.46 17.45 17.46h477.1c9.59 0 17.45-7.86 17.45-17.46V17.45C512 7.86 504.14 0 494.55 0z"/>
    <path fill="#fff" fillRule="nonzero" d="M216.63 88.91l13.05-.95c.28 2.45.86 4.33 1.73 5.6 1.41 2.08 3.43 3.12 6.06 3.12 1.96 0 3.47-.52 4.53-1.59s1.59-2.31 1.59-3.72c0-1.33-.5-2.53-1.5-3.59-1.01-1.06-3.34-2.04-7.02-2.99-6.02-1.56-10.31-3.66-12.88-6.26-2.59-2.6-3.88-5.92-3.88-9.95 0-2.65.66-5.15 1.99-7.5 1.32-2.37 3.31-4.22 5.97-5.56 2.66-1.35 6.31-2.02 10.93-2.02 5.69 0 10.01 1.22 12.99 3.69 2.99 2.45 4.76 6.35 5.33 11.71l-12.92.89c-.34-2.34-1.07-4.05-2.17-5.11-1.1-1.07-2.63-1.59-4.56-1.59-1.6 0-2.81.39-3.62 1.17-.8.78-1.21 1.75-1.21 2.88 0 .81.34 1.54.99 2.21.63.68 2.16 1.31 4.58 1.9 6.01 1.5 10.3 3.02 12.89 4.56 2.6 1.54 4.49 3.44 5.67 5.72 1.18 2.27 1.77 4.82 1.77 7.64 0 3.31-.78 6.36-2.36 9.16-1.58 2.79-3.77 4.92-6.61 6.36-2.83 1.44-6.39 2.16-10.69 2.16-7.56 0-12.8-1.69-15.71-5.07-2.91-3.38-4.55-7.67-4.94-12.87zm46.42-34.55h13.73v18.03h15.03V54.36h13.79v51.63h-13.79V85.08h-15.03v20.91h-13.73V54.36zm79.05 43.12h-15.57l-2.23 8.51h-14.03l16.74-51.63h15.04l16.67 51.63h-14.39l-2.23-8.51zm-2.91-11.18l-4.85-18.55-4.88 18.55h9.73zm24.07 19.69V54.36h22.9c4.24 0 7.49.43 9.73 1.28 2.24.84 4.06 2.41 5.43 4.69 1.38 2.3 2.06 5.1 2.06 8.39 0 2.86-.54 5.34-1.58 7.42-1.05 2.08-2.5 3.77-4.35 5.07-1.17.81-2.78 1.5-4.82 2.04 1.63.64 2.82 1.27 3.57 1.9.49.42 1.24 1.33 2.19 2.71.96 1.38 1.58 2.47 1.92 3.21l6.67 14.92h-15.52l-7.34-15.75c-.95-2.03-1.76-3.37-2.49-3.97-.98-.81-2.12-1.19-3.37-1.19h-1.21v20.91h-13.79zm13.79-30.65h5.8c.62 0 1.84-.26 3.65-.71.9-.22 1.65-.74 2.22-1.62.58-.88.87-1.87.87-3 0-1.67-.46-2.96-1.36-3.85-.92-.89-2.63-1.34-5.14-1.34h-6.04v10.52zm34.35-20.98h36.77v11.03h-22.98v8.22h21.3v10.53h-21.3v10.17h23.66v11.68H411.4V54.36z"/>
    <path fill="#095CAF" fillRule="nonzero" d="M169.41 0v160.35h-9.93V0z"/>
    <path fill="#fff" d="M45.55 65.49h17.62v52.87H45.55V65.49zm29.37 0h16.25v8.33h.24c2.26-4.06 7.79-8.33 16.05-8.33 17.16 0 20.33 10.68 20.33 24.57v28.3h-16.95V93.27c0-5.98-.12-13.68-8.81-13.68-8.82 0-10.17 6.51-10.17 13.24v25.53H74.92V65.49zM63.17 50.8c0 4.87-3.94 8.82-8.81 8.82-4.86 0-8.81-3.95-8.81-8.82 0-4.86 3.95-8.81 8.81-8.81 4.87 0 8.81 3.95 8.81 8.81z"/>
  </svg>
);

const LinkedInIconBottom = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 122.31" className={className}>
    <defs>
      <style>{'.linkedin-cls-1{fill:#0a66c2;}.linkedin-cls-1,.linkedin-cls-2{fill-rule:evenodd;}.linkedin-cls-2{fill:#fff;}'}</style>
    </defs>
    <path className="linkedin-cls-1" d="M27.75,0H95.13a27.83,27.83,0,0,1,27.75,27.75V94.57a27.83,27.83,0,0,1-27.75,27.74H27.75A27.83,27.83,0,0,1,0,94.57V27.75A27.83,27.83,0,0,1,27.75,0Z"/>
    <path className="linkedin-cls-2" d="M49.19,47.41H64.72v8h.22c2.17-3.88,7.45-8,15.34-8,16.39,0,19.42,10.2,19.42,23.47V98.94H83.51V74c0-5.71-.12-13.06-8.42-13.06s-9.72,6.21-9.72,12.65v25.4H49.19V47.41ZM40,31.79a8.42,8.42,0,1,1-8.42-8.42A8.43,8.43,0,0,1,40,31.79ZM23.18,47.41H40V98.94H23.18V47.41Z"/>
  </svg>
);

// X Icons - Different for top and bottom
const XIconTop = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 160.35" preserveAspectRatio="xMidYMid meet" className={className}>
    <path fill="#000" d="M494.55 0H17.45C7.86 0 0 7.86 0 17.46V142.9c0 9.59 7.86 17.45 17.45 17.45h477.1c9.59 0 17.45-7.86 17.45-17.45V17.46C512 7.86 504.14 0 494.55 0z"/>
    <path fill="#fff" fillRule="nonzero" d="M216.63 88.91l13.05-.95c.28 2.45.86 4.33 1.73 5.6 1.41 2.08 3.43 3.13 6.06 3.13 1.96 0 3.47-.53 4.53-1.6s1.59-2.31 1.59-3.71c0-1.34-.5-2.54-1.5-3.6-1.01-1.05-3.34-2.04-7.02-2.99-6.02-1.56-10.31-3.65-12.88-6.26-2.59-2.6-3.88-5.91-3.88-9.95 0-2.64.66-5.14 1.99-7.5 1.32-2.37 3.31-4.22 5.97-5.56 2.66-1.35 6.31-2.02 10.93-2.02 5.69 0 10.01 1.22 12.99 3.69 2.99 2.45 4.76 6.35 5.33 11.71l-12.92.89c-.34-2.34-1.07-4.05-2.17-5.1-1.1-1.07-2.63-1.6-4.56-1.6-1.6 0-2.81.39-3.62 1.18-.8.78-1.21 1.74-1.21 2.87 0 .81.34 1.55.99 2.21.63.68 2.16 1.31 4.58 1.9 6.01 1.5 10.3 3.03 12.89 4.56 2.6 1.54 4.49 3.44 5.67 5.72 1.18 2.27 1.77 4.82 1.77 7.65 0 3.3-.78 6.35-2.36 9.15-1.58 2.79-3.77 4.92-6.61 6.36-2.83 1.44-6.39 2.16-10.69 2.16-7.56 0-12.8-1.69-15.71-5.07-2.91-3.37-4.55-7.66-4.94-12.87zm46.42-34.55h13.73v18.03h15.03V54.36h13.79v51.63h-13.79V85.08h-15.03v20.91h-13.73V54.36zm79.05 43.12h-15.57l-2.23 8.51h-14.03l16.74-51.63h15.04l16.67 51.63h-14.39l-2.23-8.51zm-2.91-11.18l-4.85-18.55-4.88 18.55h9.73zm24.07 19.69V54.36h22.9c4.24 0 7.49.43 9.73 1.28 2.24.84 4.06 2.41 5.43 4.7 1.38 2.29 2.06 5.09 2.06 8.38 0 2.86-.54 5.34-1.58 7.42-1.05 2.08-2.5 3.77-4.35 5.07-1.17.82-2.78 1.5-4.82 2.04 1.63.64 2.82 1.27 3.57 1.9.49.42 1.24 1.33 2.19 2.72.96 1.37 1.58 2.46 1.92 3.21l6.67 14.91h-15.52l-7.34-15.74c-.95-2.04-1.76-3.38-2.49-3.98-.98-.8-2.12-1.19-3.37-1.19h-1.21v20.91h-13.79zm13.79-30.64h5.8c.62 0 1.84-.27 3.65-.71.9-.23 1.65-.75 2.22-1.63.58-.87.87-1.87.87-3 0-1.67-.46-2.96-1.36-3.85-.92-.89-2.63-1.34-5.14-1.34h-6.04v10.53zm34.35-20.99h36.77V65.4h-22.98v8.21h21.3v10.53h-21.3v10.17h23.66v11.68H411.4V54.36z"/>
    <path fill="#1A1A1A" fillRule="nonzero" d="M169.41 0v160.35h-9.93V0z"/>
    <path fill="#fff" fillRule="nonzero" d="M101.2 44.63h11.61L87.44 73.62l29.84 39.45H93.92l-18.3-23.93-20.94 23.93H43.06l27.13-31.01-28.62-37.43h23.95L82.06 66.5l19.14-21.87zm-4.08 61.49h6.43l-41.52-54.9h-6.9l41.99 54.9z"/>
  </svg>
);

const XIconBottom = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 509.64" className={className}>
    <rect width="512" height="509.64" rx="115.61" ry="115.61" fill="#000"/>
    <path fill="#fff" fillRule="nonzero" d="M323.74 148.35h36.12l-78.91 90.2 92.83 122.73h-72.69l-56.93-74.43-65.15 74.43h-36.14l84.4-96.47-89.05-116.46h74.53l51.46 68.04 59.53-68.04zm-12.68 191.31h20.02l-129.2-170.82H180.4l130.66 170.82z"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 509 509" className={className}>
    <path fill="#0866FF" fillRule="nonzero" d="M509 254.5C509 113.94 395.06 0 254.5 0S0 113.94 0 254.5C0 373.86 82.17 474 193.02 501.51V332.27h-52.48V254.5h52.48v-33.51c0-86.63 39.2-126.78 124.24-126.78 16.13 0 43.95 3.17 55.33 6.33v70.5c-6.01-.63-16.44-.95-29.4-.95-41.73 0-57.86 15.81-57.86 56.91v27.5h83.13l-14.28 77.77h-68.85v174.87C411.35 491.92 509 384.62 509 254.5z"/>
    <path fill="#fff" fillRule="nonzero" d="M354.18 332.27l14.28-77.77h-83.13V227c0-41.1 16.13-56.91 57.86-56.91 12.96 0 23.39.32 29.4.95v-70.5c-11.38-3.16-39.2-6.33-55.33-6.33-85.04 0-124.24 40.16-124.24 126.78v33.51h-52.48v77.77h52.48v169.24c19.69 4.88 40.28 7.49 61.48 7.49 10.44 0 20.72-.64 30.83-1.86V332.27h68.85z"/>
  </svg>
);

const RedditIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" className={className}>
    <circle cx="-892" cy="179" r="262" fill="#ff4500" transform="matrix(.9771 0 0 .9771 1127.57 81.1)"/>
    <g transform="translate(1.249 1.608) scale(1.99024)">
      <circle cx="200.6" cy="123.7" r="29.9" fill="url(#reddit-radial1)"/>
      <circle cx="55.4" cy="123.7" r="29.9" fill="url(#reddit-radial2)"/>
      <ellipse cx="128.1" cy="149.3" rx="85.3" ry="64" fill="url(#reddit-radial3)"/>
      <path d="M102.8 143.1c-.5 10.8-7.7 14.8-16.1 14.8-8.4 0-14.8-5.6-14.3-16.4.5-10.8 7.7-18 16.1-18 8.4 0 14.8 8.8 14.3 19.6zM183.6 141.5c.5 10.8-5.9 16.4-14.3 16.4s-15.6-3.9-16.1-14.8c-.5-10.8 5.9-19.6 14.3-19.6s15.6 7.1 16.1 18z" fill="#842123" fillRule="nonzero"/>
      <path d="M153.3 144.1c.5 10.1 7.2 13.8 15 13.8s13.8-5.5 13.4-15.7c-.5-10.1-7.2-16.8-15-16.8s-13.9 8.5-13.4 18.7z" fill="url(#reddit-radial4)" fillRule="nonzero"/>
      <path d="M102.8 144.1c-.5 10.1-7.2 13.8-15 13.8s-13.8-5.5-13.3-15.7c.5-10.1 7.2-16.8 15-16.8s13.8 8.5 13.3 18.7z" fill="url(#reddit-radial5)" fillRule="nonzero"/>
      <path d="M128.1 165.1c-10.6 0-20.7.5-30.1 1.4-1.6.2-2.6 1.8-2 3.2 5.2 12.3 17.6 21 32.1 21s26.8-8.6 32.1-21c.6-1.5-.4-3.1-2-3.2-9.4-.9-19.5-1.4-30.1-1.4z" fill="#bbcfda" fillRule="nonzero"/>
      <path d="M128.1 167.5c-10.6 0-20.7.5-30 1.5-1.6.2-2.6 1.8-2 3.3 5.2 12.5 17.6 21.3 32 21.3 14.4 0 26.8-8.8 32-21.3.6-1.5-.4-3.1-2-3.3-9.4-1-19.5-1.5-30-1.5z" fill="#fff" fillRule="nonzero"/>
      <path d="M128.1 166.2c-10.4 0-20.3.5-29.5 1.4-1.6.2-2.6 1.8-2 3.2 5.2 12.3 17.3 21 31.5 21s26.3-8.6 31.5-21c.6-1.5-.4-3.1-2-3.2-9.2-.8-19.1-1.4-29.5-1.4z" fill="url(#reddit-radial6)" fillRule="nonzero"/>
      <circle cx="174.8" cy="55.5" r="21.2" fill="url(#reddit-radial7)"/>
      <path d="M127.8 88c-2.5 0-4.6-1.1-4.6-2.7 0-19 15.4-34.4 34.4-34.4 2.5 0 4.6 2.1 4.6 4.6 0 2.5-2.1 4.6-4.6 4.6-13.9 0-25.2 11.3-25.2 25.2 0 1.7-2.1 2.7-4.6 2.7z" fill="url(#reddit-radial8)" fillRule="nonzero"/>
      <path d="M97.3 149.1c0 3.9-4.2 5.7-9.3 5.7-5.1 0-9.3-1.8-9.3-5.7 0-3.9 4.2-7.1 9.3-7.1 5.1 0 9.3 3.1 9.3 7.1zM177.5 149.1c0 3.9-4.2 5.7-9.3 5.7-5.1 0-9.3-1.8-9.3-5.7 0-3.9 4.2-7.1 9.3-7.1 5.1 0 9.3 3.1 9.3 7.1z" fill="#ff6101" fillRule="nonzero"/>
      <ellipse cx="94.4" cy="134.8" rx="3.3" ry="3.6" fill="#ffc49c"/>
      <ellipse cx="173.3" cy="134.8" rx="3.3" ry="3.6" fill="#ffc49c"/>
    </g>
    <defs>
      <radialGradient id="reddit-radial1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(59.9015 0 0 -52.2545 201.012 107.557)">
        <stop offset="0" stopColor="#feffff"/><stop offset=".4" stopColor="#feffff"/><stop offset=".51" stopColor="#f9fcfc"/><stop offset=".62" stopColor="#edf3f5"/><stop offset=".7" stopColor="#dee9ec"/><stop offset=".72" stopColor="#d8e4e8"/><stop offset=".76" stopColor="#ccd8df"/><stop offset=".8" stopColor="#c8d5dd"/><stop offset=".83" stopColor="#ccd6de"/><stop offset=".85" stopColor="#d8dbe2"/><stop offset=".88" stopColor="#ede3e9"/><stop offset=".9" stopColor="#ffebef"/><stop offset="1" stopColor="#ffebef"/>
      </radialGradient>
      <radialGradient id="reddit-radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(59.9015 0 0 -52.2545 55.892 107.557)">
        <stop offset="0" stopColor="#feffff"/><stop offset=".4" stopColor="#feffff"/><stop offset=".51" stopColor="#f9fcfc"/><stop offset=".62" stopColor="#edf3f5"/><stop offset=".7" stopColor="#dee9ec"/><stop offset=".72" stopColor="#d8e4e8"/><stop offset=".76" stopColor="#ccd8df"/><stop offset=".8" stopColor="#c8d5dd"/><stop offset=".83" stopColor="#ccd6de"/><stop offset=".85" stopColor="#d8dbe2"/><stop offset=".88" stopColor="#ede3e9"/><stop offset=".9" stopColor="#ffebef"/><stop offset="1" stopColor="#ffebef"/>
      </radialGradient>
      <radialGradient id="reddit-radial3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(180.687 0 0 -126.865 130.347 99.176)">
        <stop offset="0" stopColor="#feffff"/><stop offset=".4" stopColor="#feffff"/><stop offset=".51" stopColor="#f9fcfc"/><stop offset=".62" stopColor="#edf3f5"/><stop offset=".7" stopColor="#dee9ec"/><stop offset=".72" stopColor="#d8e4e8"/><stop offset=".76" stopColor="#ccd8df"/><stop offset=".8" stopColor="#c8d5dd"/><stop offset=".83" stopColor="#ccd6de"/><stop offset=".85" stopColor="#d8dbe2"/><stop offset=".88" stopColor="#ede3e9"/><stop offset=".9" stopColor="#ffebef"/><stop offset="1" stopColor="#ffebef"/>
      </radialGradient>
      <radialGradient id="reddit-radial4" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-15.0964 0 0 22.1628 165.28 150.971)">
        <stop offset="0" stopColor="#f60"/><stop offset=".5" stopColor="#ff4500"/><stop offset=".7" stopColor="#fc4301"/><stop offset=".82" stopColor="#f43f07"/><stop offset=".92" stopColor="#e53812"/><stop offset="1" stopColor="#d4301f"/>
      </radialGradient>
      <radialGradient id="reddit-radial5" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(15.0964 0 0 22.1628 90.19 150.971)">
        <stop offset="0" stopColor="#f60"/><stop offset=".5" stopColor="#ff4500"/><stop offset=".7" stopColor="#fc4301"/><stop offset=".82" stopColor="#f43f07"/><stop offset=".92" stopColor="#e53812"/><stop offset="1" stopColor="#d4301f"/>
      </radialGradient>
      <radialGradient id="reddit-radial6" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(53.2322 0 0 -35.1106 128.369 194.908)">
        <stop offset="0" stopColor="#172e35"/><stop offset=".29" stopColor="#0e1c21"/><stop offset=".73" stopColor="#030708"/><stop offset="1"/>
      </radialGradient>
      <radialGradient id="reddit-radial7" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(46.7274 0 0 -46.7274 175.312 34.106)">
        <stop offset="0" stopColor="#feffff"/><stop offset=".4" stopColor="#feffff"/><stop offset=".51" stopColor="#f9fcfc"/><stop offset=".62" stopColor="#edf3f5"/><stop offset=".7" stopColor="#dee9ec"/><stop offset=".72" stopColor="#d8e4e8"/><stop offset=".76" stopColor="#ccd8df"/><stop offset=".8" stopColor="#c8d5dd"/><stop offset=".83" stopColor="#ccd6de"/><stop offset=".85" stopColor="#d8dbe2"/><stop offset=".88" stopColor="#ede3e9"/><stop offset=".9" stopColor="#ffebef"/><stop offset="1" stopColor="#ffebef"/>
      </radialGradient>
      <radialGradient id="reddit-radial8" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(38.3003 0 0 -38.3003 155.84 85.046)">
        <stop offset="0" stopColor="#7a9299"/><stop offset=".48" stopColor="#7a9299"/><stop offset=".67" stopColor="#172e35"/><stop offset=".75"/><stop offset=".82" stopColor="#172e35"/><stop offset="1" stopColor="#172e35"/>
      </radialGradient>
    </defs>
  </svg>
);

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className}>
    <defs>
      <linearGradient id="tg-gradient" gradientUnits="userSpaceOnUse" x1="256" y1="3.84" x2="256" y2="512">
        <stop offset="0" stopColor="#2AABEE"/>
        <stop offset="1" stopColor="#229ED9"/>
      </linearGradient>
    </defs>
    <circle fill="url(#tg-gradient)" cx="256" cy="256" r="256"/>
    <path fill="#fff" d="M115.88 253.3c74.63-32.52 124.39-53.95 149.29-64.31 71.1-29.57 85.87-34.71 95.5-34.88 2.12-.03 6.85.49 9.92 2.98 2.59 2.1 3.3 4.94 3.64 6.93.34 2 .77 6.53.43 10.08-3.85 40.48-20.52 138.71-29 184.05-3.59 19.19-10.66 25.62-17.5 26.25-14.86 1.37-26.15-9.83-40.55-19.27-22.53-14.76-35.26-23.96-57.13-38.37-25.28-16.66-8.89-25.81 5.51-40.77 3.77-3.92 69.27-63.5 70.54-68.9.16-.68.31-3.2-1.19-4.53s-3.71-.87-5.3-.51c-2.26.51-38.25 24.3-107.98 71.37-10.22 7.02-19.48 10.43-27.77 10.26-9.14-.2-26.72-5.17-39.79-9.42-16.03-5.21-28.77-7.97-27.66-16.82.57-4.61 6.92-9.32 19.04-14.14z"/>
  </svg>
);

const CopyLinkIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 469 511.53" className={className}>
    <path fillRule="nonzero" fill="currentColor" d="M143.57 91.42h273.27c28.7 0 52.16 23.46 52.16 52.16v315.79c0 28.57-23.58 52.16-52.16 52.16H143.57c-28.69 0-52.15-23.47-52.15-52.16V143.58c0-28.72 23.44-52.16 52.15-52.16zm122.42 169.95c-9.85 13.65-30.59-1.26-20.8-14.94l18.33-25.47a59.675 59.675 0 0 1 17.1-15.96 60.646 60.646 0 0 1 22.02-8.22c16.4-2.67 32.32 1.53 44.79 10.49 12.47 8.98 21.51 22.72 24.19 39.12a60.594 60.594 0 0 1-.79 23.49 59.474 59.474 0 0 1-9.68 21.29l-18.32 25.47c-9.83 13.67-30.61-1.28-20.77-14.95l18.3-25.46c2.71-3.76 4.55-7.92 5.55-12.2 1.04-4.45 1.17-9.06.45-13.51-1.55-9.47-6.73-17.37-13.86-22.5-7.14-5.14-16.28-7.53-25.73-5.98-4.45.73-8.77 2.32-12.67 4.72a34.15 34.15 0 0 0-9.8 9.14l-18.31 25.47zm21.12 6.53c9.9-13.61 30.51 1.27 20.71 14.95l-34.04 51.43c-9.84 13.58-30.49-1.29-20.72-14.94l34.05-51.44zm6.99 74.15c9.85-13.67 30.61 1.28 20.78 14.95l-17.97 24.98c-4.74 6.58-10.59 11.94-17.11 15.96a60.398 60.398 0 0 1-22.02 8.22c-16.4 2.67-32.31-1.53-44.78-10.49-12.47-8.97-21.51-22.72-24.19-39.12a60.45 60.45 0 0 1 .78-23.46 59.833 59.833 0 0 1 9.69-21.27l18.01-25.09c9.87-13.59 30.54 1.35 20.75 14.99l-17.98 24.99a33.93 33.93 0 0 0-5.56 12.19 34.893 34.893 0 0 0-.43 13.5l.01.07c1.54 9.43 6.71 17.32 13.84 22.44 7.13 5.13 16.24 7.53 25.69 6l.07-.02c4.44-.73 8.76-2.32 12.63-4.71 3.74-2.3 7.1-5.37 9.81-9.14l17.98-24.99zm-257.52 8.77c0 10.1-8.19 18.29-18.29 18.29S0 360.92 0 350.82V52.16C0 23.44 23.44 0 52.16 0h273.26c10.1 0 18.29 8.19 18.29 18.29s-8.19 18.29-18.29 18.29H52.16c-8.54 0-15.58 7.04-15.58 15.58v298.66zM416.84 128H143.57c-8.53 0-15.57 7.04-15.57 15.58v315.79c0 8.52 7.06 15.58 15.57 15.58h273.27c8.59 0 15.58-6.99 15.58-15.58V143.58c0-8.52-7.06-15.58-15.58-15.58z"/>
  </svg>
);

interface BlogSocialShareProps {
  title: string;
  url?: string;
  description?: string;
  variant?: 'floating' | 'full';
}

export default function BlogSocialShare({ title, url, description, variant = 'full' }: BlogSocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? (url || window.location.href) : url || '';
  const shareText = description || title;

  // Show floating bar after scrolling
  useEffect(() => {
    if (variant === 'floating') {
      const handleScroll = () => {
        setIsVisible(window.scrollY > 200);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setIsVisible(true);
    }
  }, [variant]);

  const shareToWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title} ${shareUrl}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, '_blank', 'width=550,height=420');
  };

  const shareToX = () => {
    const xUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
    window.open(xUrl, '_blank', 'width=550,height=420');
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
  };

  const shareToReddit = () => {
    const redditUrl = `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`;
    window.open(redditUrl, '_blank', 'width=550,height=420');
  };

  const shareToTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;
    window.open(telegramUrl, '_blank');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  // Floating bar variant (top) - LinkedIn, WhatsApp, X
  if (variant === 'floating') {
    return (
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg transition-all duration-300 ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <ShareIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Share:</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile-first: WhatsApp + Copy Link first */}
              <button
                onClick={shareToWhatsApp}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#20BA5A] transition-all hover:scale-105 text-sm font-medium shadow-sm"
                aria-label="Share on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </button>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all hover:scale-105 text-sm font-medium shadow-sm"
                aria-label="Copy link"
              >
                {copied ? <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" /> : <CopyLinkIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              {/* Desktop: LinkedIn, X */}
              <button
                onClick={shareToLinkedIn}
                className="hidden md:flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-[#0077B5] text-white rounded-lg hover:bg-[#006399] transition-all hover:scale-105 text-sm font-medium shadow-sm"
                aria-label="Share on LinkedIn"
              >
                <LinkedInIconTop className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">LinkedIn</span>
              </button>
              <button
                onClick={shareToX}
                className="hidden md:flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all hover:scale-105 text-sm font-medium shadow-sm"
                aria-label="Share on X (Twitter)"
              >
                <XIconTop className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">X</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full variant (end of article) - All 7 options
  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 sm:p-8 border border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <ShareIcon className="w-5 h-5 text-gray-700" />
        <h3 className="text-lg font-bold text-gray-900">Share this article</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {/* Mobile-first: WhatsApp + Copy Link first */}
        <button
          onClick={shareToWhatsApp}
          className="flex flex-col items-center gap-2 p-4 bg-[#25D366] text-white rounded-lg hover:bg-[#20BA5A] transition-all hover:scale-110 shadow-md"
          aria-label="Share on WhatsApp"
        >
          <WhatsAppIcon className="w-6 h-6" />
          <span className="text-xs font-medium">WhatsApp</span>
        </button>
        <button
          onClick={copyToClipboard}
          className="flex flex-col items-center gap-2 p-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all hover:scale-110 shadow-md"
          aria-label="Copy link"
        >
          {copied ? <CheckIcon className="w-6 h-6 text-green-600" /> : <CopyLinkIcon className="w-6 h-6" />}
          <span className="text-xs font-medium">{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>
        <button
          onClick={shareToLinkedIn}
          className="flex flex-col items-center gap-2 p-4 bg-[#0077B5] text-white rounded-lg hover:bg-[#006399] transition-all hover:scale-110 shadow-md"
          aria-label="Share on LinkedIn"
        >
          <LinkedInIconBottom className="w-6 h-6" />
          <span className="text-xs font-medium">LinkedIn</span>
        </button>
        <button
          onClick={shareToX}
          className="flex flex-col items-center gap-2 p-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-all hover:scale-110 shadow-md"
          aria-label="Share on X (Twitter)"
        >
          <XIconBottom className="w-6 h-6" />
          <span className="text-xs font-medium">X</span>
        </button>
        <button
          onClick={shareToFacebook}
          className="flex flex-col items-center gap-2 p-4 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-all hover:scale-110 shadow-md"
          aria-label="Share on Facebook"
        >
          <FacebookIcon className="w-6 h-6" />
          <span className="text-xs font-medium">Facebook</span>
        </button>
        <button
          onClick={shareToReddit}
          className="flex flex-col items-center gap-2 p-4 bg-[#FF4500] text-white rounded-lg hover:bg-[#E03D00] transition-all hover:scale-110 shadow-md"
          aria-label="Share on Reddit"
        >
          <RedditIcon className="w-6 h-6" />
          <span className="text-xs font-medium">Reddit</span>
        </button>
        <button
          onClick={shareToTelegram}
          className="flex flex-col items-center gap-2 p-4 bg-[#0088CC] text-white rounded-lg hover:bg-[#0077B5] transition-all hover:scale-110 shadow-md"
          aria-label="Share on Telegram"
        >
          <TelegramIcon className="w-6 h-6" />
          <span className="text-xs font-medium">Telegram</span>
        </button>
      </div>
    </div>
  );
}
