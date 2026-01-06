'use client';

import { useState, useEffect } from 'react';
import { Clock, Globe, Copy, Check, Share2, Plus, X, MapPin, Calendar, Zap, Hash } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface City {
  id: string;
  name: string;
  timezone: string;
  country: string;
}

interface TimeResult {
  city: City;
  time: string;
  date: string;
  offset: string;
  isDaylightSaving: boolean;
}

// Expanded list of famous cities
const popularCities: City[] = [
  // North America
  { id: 'ny', name: 'New York', timezone: 'America/New_York', country: 'USA' },
  { id: 'la', name: 'Los Angeles', timezone: 'America/Los_Angeles', country: 'USA' },
  { id: 'chi', name: 'Chicago', timezone: 'America/Chicago', country: 'USA' },
  { id: 'den', name: 'Denver', timezone: 'America/Denver', country: 'USA' },
  { id: 'sf', name: 'San Francisco', timezone: 'America/Los_Angeles', country: 'USA' },
  { id: 'sea', name: 'Seattle', timezone: 'America/Los_Angeles', country: 'USA' },
  { id: 'mia', name: 'Miami', timezone: 'America/New_York', country: 'USA' },
  { id: 'bos', name: 'Boston', timezone: 'America/New_York', country: 'USA' },
  { id: 'tor', name: 'Toronto', timezone: 'America/Toronto', country: 'Canada' },
  { id: 'van', name: 'Vancouver', timezone: 'America/Vancouver', country: 'Canada' },
  { id: 'mex', name: 'Mexico City', timezone: 'America/Mexico_City', country: 'Mexico' },
  
  // Europe
  { id: 'lon', name: 'London', timezone: 'Europe/London', country: 'UK' },
  { id: 'par', name: 'Paris', timezone: 'Europe/Paris', country: 'France' },
  { id: 'ber', name: 'Berlin', timezone: 'Europe/Berlin', country: 'Germany' },
  { id: 'rom', name: 'Rome', timezone: 'Europe/Rome', country: 'Italy' },
  { id: 'mad', name: 'Madrid', timezone: 'Europe/Madrid', country: 'Spain' },
  { id: 'ams', name: 'Amsterdam', timezone: 'Europe/Amsterdam', country: 'Netherlands' },
  { id: 'zur', name: 'Zurich', timezone: 'Europe/Zurich', country: 'Switzerland' },
  { id: 'vie', name: 'Vienna', timezone: 'Europe/Vienna', country: 'Austria' },
  { id: 'sto', name: 'Stockholm', timezone: 'Europe/Stockholm', country: 'Sweden' },
  { id: 'cop', name: 'Copenhagen', timezone: 'Europe/Copenhagen', country: 'Denmark' },
  { id: 'mos', name: 'Moscow', timezone: 'Europe/Moscow', country: 'Russia' },
  { id: 'ath', name: 'Athens', timezone: 'Europe/Athens', country: 'Greece' },
  { id: 'dub', name: 'Dublin', timezone: 'Europe/Dublin', country: 'Ireland' },
  { id: 'lis', name: 'Lisbon', timezone: 'Europe/Lisbon', country: 'Portugal' },
  
  // Asia
  { id: 'tok', name: 'Tokyo', timezone: 'Asia/Tokyo', country: 'Japan' },
  { id: 'bei', name: 'Beijing', timezone: 'Asia/Shanghai', country: 'China' },
  { id: 'shang', name: 'Shanghai', timezone: 'Asia/Shanghai', country: 'China' },
  { id: 'hk', name: 'Hong Kong', timezone: 'Asia/Hong_Kong', country: 'Hong Kong' },
  { id: 'sin', name: 'Singapore', timezone: 'Asia/Singapore', country: 'Singapore' },
  { id: 'seo', name: 'Seoul', timezone: 'Asia/Seoul', country: 'South Korea' },
  { id: 'mum', name: 'Mumbai', timezone: 'Asia/Kolkata', country: 'India' },
  { id: 'del', name: 'Delhi', timezone: 'Asia/Kolkata', country: 'India' },
  { id: 'ban', name: 'Bangalore', timezone: 'Asia/Kolkata', country: 'India' },
  { id: 'bkk', name: 'Bangkok', timezone: 'Asia/Bangkok', country: 'Thailand' },
  { id: 'jak', name: 'Jakarta', timezone: 'Asia/Jakarta', country: 'Indonesia' },
  { id: 'man', name: 'Manila', timezone: 'Asia/Manila', country: 'Philippines' },
  { id: 'tai', name: 'Taipei', timezone: 'Asia/Taipei', country: 'Taiwan' },
  { id: 'dubai', name: 'Dubai', timezone: 'Asia/Dubai', country: 'UAE' },
  { id: 'riy', name: 'Riyadh', timezone: 'Asia/Riyadh', country: 'Saudi Arabia' },
  { id: 'tel', name: 'Tel Aviv', timezone: 'Asia/Jerusalem', country: 'Israel' },
  
  // Oceania
  { id: 'syd', name: 'Sydney', timezone: 'Australia/Sydney', country: 'Australia' },
  { id: 'mel', name: 'Melbourne', timezone: 'Australia/Melbourne', country: 'Australia' },
  { id: 'per', name: 'Perth', timezone: 'Australia/Perth', country: 'Australia' },
  { id: 'auk', name: 'Auckland', timezone: 'Pacific/Auckland', country: 'New Zealand' },
  
  // South America
  { id: 'sao', name: 'São Paulo', timezone: 'America/Sao_Paulo', country: 'Brazil' },
  { id: 'rio', name: 'Rio de Janeiro', timezone: 'America/Sao_Paulo', country: 'Brazil' },
  { id: 'bue', name: 'Buenos Aires', timezone: 'America/Argentina/Buenos_Aires', country: 'Argentina' },
  { id: 'lim', name: 'Lima', timezone: 'America/Lima', country: 'Peru' },
  { id: 'bog', name: 'Bogotá', timezone: 'America/Bogota', country: 'Colombia' },
  
  // Africa
  { id: 'joh', name: 'Johannesburg', timezone: 'Africa/Johannesburg', country: 'South Africa' },
  { id: 'cai', name: 'Cairo', timezone: 'Africa/Cairo', country: 'Egypt' },
  { id: 'lag', name: 'Lagos', timezone: 'Africa/Lagos', country: 'Nigeria' },
  { id: 'nai', name: 'Nairobi', timezone: 'Africa/Nairobi', country: 'Kenya' },
];

// Get all IANA timezones
const getAllTimezones = (): string[] => {
  // Using Intl.supportedValuesOf for modern browsers, fallback to common list
  try {
    return Intl.supportedValuesOf('timeZone').sort();
  } catch {
    // Fallback: comprehensive list of major timezones
    return [
      'UTC',
      'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
      'America/Toronto', 'America/Mexico_City', 'America/Sao_Paulo', 'America/Buenos_Aires',
      'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Rome', 'Europe/Madrid',
      'Europe/Amsterdam', 'Europe/Stockholm', 'Europe/Moscow', 'Europe/Athens',
      'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Hong_Kong', 'Asia/Singapore', 'Asia/Seoul',
      'Asia/Kolkata', 'Asia/Dubai', 'Asia/Riyadh', 'Asia/Jerusalem',
      'Australia/Sydney', 'Australia/Melbourne', 'Pacific/Auckland',
      'Africa/Johannesburg', 'Africa/Cairo', 'Africa/Lagos',
    ].sort();
  }
};

type ConversionMode = 'time' | 'epoch' | 'utc';

export default function TimezoneTranslator() {
  const [mode, setMode] = useState<ConversionMode>('time');
  const [inputTime, setInputTime] = useState('');
  const [inputCity, setInputCity] = useState<City | null>(null);
  const [selectedCities, setSelectedCities] = useState<City[]>([
    popularCities.find(c => c.id === 'ny')!,
    popularCities.find(c => c.id === 'lon')!,
    popularCities.find(c => c.id === 'tok')!,
  ]);
  const [timeResults, setTimeResults] = useState<TimeResult[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [useCurrentTime, setUseCurrentTime] = useState(false);
  
  // Epoch time conversion
  const [epochInput, setEpochInput] = useState('');
  const [epochResult, setEpochResult] = useState<{ utc: string; local: string } | null>(null);
  
  // UTC to timezone conversion
  const [utcInput, setUtcInput] = useState('');
  const [selectedTimezone, setSelectedTimezone] = useState('America/New_York');
  const [utcResult, setUtcResult] = useState<{ time: string; date: string; timezone: string } | null>(null);
  const [allTimezones] = useState<string[]>(getAllTimezones());

  // Auto-capture current system time on load
  useEffect(() => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    setInputTime(timeStr);
    
    // Try to detect user's timezone
    try {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const matchingCity = popularCities.find(c => c.timezone === userTimezone);
      if (matchingCity) {
        setInputCity(matchingCity);
      } else {
        // Set to a default city
        setInputCity(popularCities.find(c => c.id === 'ny') || null);
      }
    } catch {
      setInputCity(popularCities.find(c => c.id === 'ny') || null);
    }
    
    // Auto-convert on load
    setTimeout(() => {
      if (inputCity) {
        convertTime();
      }
    }, 500);
  }, []);

  const parseTimeInput = (timeStr: string, city: City): Date | null => {
    if (!timeStr.trim() || !city) return null;

    try {
      const now = new Date();
      const timeMatch = timeStr.match(/(\d{1,2}):(\d{2})\s*(am|pm)?/i);
      
      if (!timeMatch) {
        const time24Match = timeStr.match(/(\d{1,2}):(\d{2})/);
        if (time24Match) {
          let hours = parseInt(time24Match[1]);
          const minutes = parseInt(time24Match[2]);
          const dateStr = now.toLocaleDateString('en-CA');
          return new Date(`${dateStr}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`);
        }
        return null;
      }

      let hours = parseInt(timeMatch[1]);
      const minutes = parseInt(timeMatch[2]);
      const ampm = timeMatch[3]?.toLowerCase();

      if (ampm === 'pm' && hours !== 12) hours += 12;
      if (ampm === 'am' && hours === 12) hours = 0;

      const dateStr = now.toLocaleDateString('en-CA');
      return new Date(`${dateStr}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`);
    } catch {
      return null;
    }
  };

  const convertTime = () => {
    if (!inputTime.trim() && !useCurrentTime) {
      toast.error('Please enter a time or use current time');
      return;
    }

    if (!inputCity) {
      toast.error('Please select a source city');
      return;
    }

    let sourceDate: Date;
    
    if (useCurrentTime) {
      sourceDate = new Date();
    } else {
      const parsed = parseTimeInput(inputTime, inputCity);
      if (!parsed) {
        toast.error('Invalid time format. Use format like "3pm" or "15:00"');
        return;
      }
      sourceDate = parsed;
    }

    const results: TimeResult[] = selectedCities.map(city => {
      const timeFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: city.timezone,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });

      const dateFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: city.timezone,
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      const timeStr = timeFormatter.format(sourceDate);
      const dateStr = dateFormatter.format(sourceDate);

      const utcDate = new Date(sourceDate.toLocaleString('en-US', { timeZone: 'UTC' }));
      const cityDate = new Date(sourceDate.toLocaleString('en-US', { timeZone: city.timezone }));
      const offsetMs = cityDate.getTime() - utcDate.getTime();
      const offsetHours = offsetMs / (1000 * 60 * 60);
      const offsetStr = offsetHours >= 0 
        ? `UTC+${offsetHours}` 
        : `UTC${offsetHours}`;

      return {
        city,
        time: timeStr,
        date: dateStr,
        offset: offsetStr,
        isDaylightSaving: false,
      };
    });

    setTimeResults(results);
    toast.success('Time converted successfully!');
  };

  const convertEpoch = () => {
    if (!epochInput.trim()) {
      toast.error('Please enter an epoch timestamp');
      return;
    }

    const epoch = parseInt(epochInput);
    if (isNaN(epoch)) {
      toast.error('Invalid epoch timestamp. Enter a number.');
      return;
    }

    // Handle both seconds and milliseconds
    const epochMs = epoch < 10000000000 ? epoch * 1000 : epoch;
    const date = new Date(epochMs);

    if (isNaN(date.getTime())) {
      toast.error('Invalid epoch timestamp');
      return;
    }

    const utcStr = date.toUTCString();
    const localStr = date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    setEpochResult({ utc: utcStr, local: localStr });
    toast.success('Epoch converted successfully!');
  };

  const convertUTC = () => {
    if (!utcInput.trim()) {
      toast.error('Please enter a UTC time');
      return;
    }

    try {
      // Try to parse various UTC formats
      let date: Date;
      
      // Try ISO format first
      if (utcInput.includes('T') || utcInput.includes('Z')) {
        date = new Date(utcInput);
      } else {
        // Try common formats
        const formats = [
          utcInput + ' UTC',
          utcInput + ' GMT',
        ];
        date = new Date(formats[0]);
      }

      if (isNaN(date.getTime())) {
        toast.error('Invalid UTC time format. Try: "2024-01-15T10:30:00Z" or "Jan 15, 2024 10:30 AM UTC"');
        return;
      }

      const timeFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: selectedTimezone,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });

      const dateFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: selectedTimezone,
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      const timeStr = timeFormatter.format(date);
      const dateStr = dateFormatter.format(date);

      setUtcResult({ time: timeStr, date: dateStr, timezone: selectedTimezone });
      toast.success('UTC converted successfully!');
    } catch (error) {
      toast.error('Failed to convert UTC time. Please check the format.');
    }
  };

  const addCity = (city: City) => {
    if (!selectedCities.find(c => c.id === city.id)) {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const removeCity = (cityId: string) => {
    setSelectedCities(selectedCities.filter(c => c.id !== cityId));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    toast.success('Copied!');
    setTimeout(() => setCopied(null), 2000);
  };

  const generateShareableLink = () => {
    const params = new URLSearchParams();
    if (inputTime) params.set('time', inputTime);
    if (inputCity) params.set('city', inputCity.id);
    params.set('cities', selectedCities.map(c => c.id).join(','));
    
    const url = `${window.location.origin}/?tab=timezone${params.toString() ? '&' + params.toString() : ''}`;
    copyToClipboard(url, 'share-link');
    toast.success('Shareable link copied!');
  };

  useEffect(() => {
    if (useCurrentTime && mode === 'time') {
      convertTime();
      const interval = setInterval(() => {
        convertTime();
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [useCurrentTime, selectedCities, inputCity, mode]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Clock className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Advanced Timezone Translator</h2>
        </div>
        <p className="text-green-100 text-sm">
          Convert times across timezones, epoch timestamps to human-readable format, and UTC to any timezone. 
          Perfect for scheduling meetings, debugging timestamps, and timezone conversions.
        </p>
      </div>

      {/* Mode Selector */}
      <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
        <div className="flex gap-2">
          <button
            onClick={() => setMode('time')}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
              mode === 'time'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Clock className="w-4 h-4 inline mr-2" />
            Time Converter
          </button>
          <button
            onClick={() => setMode('epoch')}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
              mode === 'epoch'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Hash className="w-4 h-4 inline mr-2" />
            Epoch Converter
          </button>
          <button
            onClick={() => setMode('utc')}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
              mode === 'utc'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Globe className="w-4 h-4 inline mr-2" />
            UTC Converter
          </button>
        </div>
      </div>

      {/* Time Converter Mode */}
      {mode === 'time' && (
        <>
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Enter Time</label>
                  <input
                    type="text"
                    value={inputTime}
                    onChange={(e) => {
                      setInputTime(e.target.value);
                      setUseCurrentTime(false);
                    }}
                    placeholder="3pm, 15:00, or 3:00 PM"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && convertTime()}
                  />
                  <div className="mt-2">
                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={useCurrentTime}
                        onChange={(e) => {
                          setUseCurrentTime(e.target.checked);
                          if (e.target.checked) {
                            setInputTime('');
                            convertTime();
                          }
                        }}
                        className="rounded"
                      />
                      <span>Use current system time (auto-updates)</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Source City</label>
                  <select
                    value={inputCity?.id || ''}
                    onChange={(e) => {
                      const city = popularCities.find(c => c.id === e.target.value);
                      setInputCity(city || null);
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select a city...</option>
                    {popularCities.map(city => (
                      <option key={city.id} value={city.id}>
                        {city.name}, {city.country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={convertTime}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
              >
                Convert Time
              </button>
            </div>
          </div>

          {/* Selected Cities */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Selected Cities</h3>
              <button
                onClick={generateShareableLink}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-semibold hover:bg-green-200 transition-colors flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share Link
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCities.map(city => (
                <div
                  key={city.id}
                  className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg"
                >
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-900">{city.name}</span>
                  <button
                    onClick={() => removeCity(city.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Add More Cities</label>
              <select
                onChange={(e) => {
                  const city = popularCities.find(c => c.id === e.target.value);
                  if (city) addCity(city);
                  e.target.value = '';
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select a city to add...</option>
                {popularCities
                  .filter(city => !selectedCities.find(sc => sc.id === city.id))
                  .map(city => (
                    <option key={city.id} value={city.id}>
                      {city.name}, {city.country}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Results */}
          {timeResults.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Converted Times</h3>
                <button
                  onClick={() => copyToClipboard(
                    timeResults.map(r => `${r.city.name}: ${r.time} on ${r.date}`).join('\n'),
                    'all-times'
                  )}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  {copied === 'all-times' ? (
                    <>
                      <Check className="w-4 h-4" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copy All
                    </>
                  )}
                </button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {timeResults.map((result, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          <Globe className="w-4 h-4 text-green-600" />
                          {result.city.name}
                        </h4>
                        <p className="text-xs text-gray-600">{result.city.country}</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(`${result.city.name}: ${result.time} on ${result.date}`, `time-${idx}`)}
                        className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                      >
                        {copied === `time-${idx}` ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <div className="mt-3">
                      <div className="text-2xl font-bold text-gray-900 mb-1">{result.time}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {result.date}
                      </div>
                      <div className="text-xs text-gray-500 mt-2">{result.offset}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Epoch Converter Mode */}
      {mode === 'epoch' && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Epoch Timestamp</label>
              <input
                type="text"
                value={epochInput}
                onChange={(e) => setEpochInput(e.target.value)}
                placeholder="1705324800 (seconds) or 1705324800000 (milliseconds)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono"
                onKeyPress={(e) => e.key === 'Enter' && convertEpoch()}
              />
              <p className="text-xs text-gray-500 mt-1">
                Supports both Unix timestamp (seconds) and JavaScript timestamp (milliseconds)
              </p>
            </div>
            <button
              onClick={convertEpoch}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
            >
              Convert Epoch
            </button>
            {epochResult && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-3">Converted Time</h3>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">UTC</label>
                    <div className="p-2 bg-white rounded border border-gray-200 font-mono text-sm">
                      {epochResult.utc}
                    </div>
                    <button
                      onClick={() => copyToClipboard(epochResult.utc, 'epoch-utc')}
                      className="mt-1 text-xs text-green-600 hover:underline"
                    >
                      {copied === 'epoch-utc' ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Local Time</label>
                    <div className="p-2 bg-white rounded border border-gray-200 font-mono text-sm">
                      {epochResult.local}
                    </div>
                    <button
                      onClick={() => copyToClipboard(epochResult.local, 'epoch-local')}
                      className="mt-1 text-xs text-green-600 hover:underline"
                    >
                      {copied === 'epoch-local' ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* UTC Converter Mode */}
      {mode === 'utc' && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">UTC Time</label>
              <input
                type="text"
                value={utcInput}
                onChange={(e) => setUtcInput(e.target.value)}
                placeholder="2024-01-15T10:30:00Z or Jan 15, 2024 10:30 AM UTC"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && convertUTC()}
              />
              <p className="text-xs text-gray-500 mt-1">
                Supports ISO 8601 format (2024-01-15T10:30:00Z) or readable format with UTC/GMT
              </p>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Target Timezone</label>
              <select
                value={selectedTimezone}
                onChange={(e) => setSelectedTimezone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {allTimezones.map(tz => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>
            <button
              onClick={convertUTC}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
            >
              Convert UTC to Timezone
            </button>
            {utcResult && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-3">Converted Time</h3>
                <div className="space-y-2">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Timezone</label>
                    <div className="p-2 bg-white rounded border border-gray-200 font-mono text-sm">
                      {utcResult.timezone}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Time</label>
                    <div className="p-2 bg-white rounded border border-gray-200 text-2xl font-bold">
                      {utcResult.time}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Date</label>
                    <div className="p-2 bg-white rounded border border-gray-200 text-sm">
                      {utcResult.date}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(`${utcResult.time} on ${utcResult.date} (${utcResult.timezone})`, 'utc-result')}
                    className="mt-2 w-full px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                  >
                    {copied === 'utc-result' ? '✓ Copied' : 'Copy Result'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
