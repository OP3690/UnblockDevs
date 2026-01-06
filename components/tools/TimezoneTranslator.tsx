'use client';

import { useState, useEffect } from 'react';
import { Clock, Globe, Copy, Check, Share2, Plus, X, MapPin, Calendar } from 'lucide-react';
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

const popularCities: City[] = [
  { id: 'ny', name: 'New York', timezone: 'America/New_York', country: 'USA' },
  { id: 'la', name: 'Los Angeles', timezone: 'America/Los_Angeles', country: 'USA' },
  { id: 'chi', name: 'Chicago', timezone: 'America/Chicago', country: 'USA' },
  { id: 'den', name: 'Denver', timezone: 'America/Denver', country: 'USA' },
  { id: 'lon', name: 'London', timezone: 'Europe/London', country: 'UK' },
  { id: 'par', name: 'Paris', timezone: 'Europe/Paris', country: 'France' },
  { id: 'tok', name: 'Tokyo', timezone: 'Asia/Tokyo', country: 'Japan' },
  { id: 'bei', name: 'Beijing', timezone: 'Asia/Shanghai', country: 'China' },
  { id: 'mum', name: 'Mumbai', timezone: 'Asia/Kolkata', country: 'India' },
  { id: 'dub', name: 'Dubai', timezone: 'Asia/Dubai', country: 'UAE' },
  { id: 'syd', name: 'Sydney', timezone: 'Australia/Sydney', country: 'Australia' },
  { id: 'tor', name: 'Toronto', timezone: 'America/Toronto', country: 'Canada' },
  { id: 'ber', name: 'Berlin', timezone: 'Europe/Berlin', country: 'Germany' },
  { id: 'rom', name: 'Rome', timezone: 'Europe/Rome', country: 'Italy' },
  { id: 'mad', name: 'Madrid', timezone: 'Europe/Madrid', country: 'Spain' },
  { id: 'ams', name: 'Amsterdam', timezone: 'Europe/Amsterdam', country: 'Netherlands' },
  { id: 'sin', name: 'Singapore', timezone: 'Asia/Singapore', country: 'Singapore' },
  { id: 'hk', name: 'Hong Kong', timezone: 'Asia/Hong_Kong', country: 'Hong Kong' },
  { id: 'seo', name: 'Seoul', timezone: 'Asia/Seoul', country: 'South Korea' },
  { id: 'mex', name: 'Mexico City', timezone: 'America/Mexico_City', country: 'Mexico' },
  { id: 'sao', name: 'São Paulo', timezone: 'America/Sao_Paulo', country: 'Brazil' },
  { id: 'joh', name: 'Johannesburg', timezone: 'Africa/Johannesburg', country: 'South Africa' },
  { id: 'cai', name: 'Cairo', timezone: 'Africa/Cairo', country: 'Egypt' },
];

export default function TimezoneTranslator() {
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

  const parseTimeInput = (timeStr: string, city: City): Date | null => {
    if (!timeStr.trim() || !city) return null;

    try {
      const now = new Date();
      const timeMatch = timeStr.match(/(\d{1,2}):(\d{2})\s*(am|pm)?/i);
      
      if (!timeMatch) {
        // Try 24-hour format
        const time24Match = timeStr.match(/(\d{1,2}):(\d{2})/);
        if (time24Match) {
          let hours = parseInt(time24Match[1]);
          const minutes = parseInt(time24Match[2]);
          
          // Create date in the input city's timezone
          const dateStr = now.toLocaleDateString('en-CA'); // YYYY-MM-DD
          const localDate = new Date(`${dateStr}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`);
          
          // Convert to UTC, then to target timezone
          return localDate;
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

    // Convert to each selected city's timezone
    const results: TimeResult[] = selectedCities.map(city => {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: city.timezone,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

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

      // Calculate offset
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
        isDaylightSaving: false, // Could be enhanced to detect DST
      };
    });

    setTimeResults(results);
    toast.success('Time converted successfully!');
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
    if (useCurrentTime) {
      convertTime();
      const interval = setInterval(() => {
        convertTime();
      }, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [useCurrentTime, selectedCities, inputCity]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Clock className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Timezone Translator for Humans</h2>
        </div>
        <p className="text-green-100 text-sm">
          Convert times across timezones instantly. Enter "3pm New York" and see the time in all your selected cities. 
          Perfect for scheduling meetings across the globe.
        </p>
      </div>

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
                  <span>Use current time</span>
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

      {/* Quick Examples */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Examples</h3>
        <div className="space-y-2">
          <button
            onClick={() => {
              setInputTime('3pm');
              setInputCity(popularCities.find(c => c.id === 'ny') || null);
            }}
            className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors"
          >
            "3pm" in New York
          </button>
          <button
            onClick={() => {
              setInputTime('9:00');
              setInputCity(popularCities.find(c => c.id === 'lon') || null);
            }}
            className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors"
          >
            "9:00" in London
          </button>
          <button
            onClick={() => {
              setInputTime('15:30');
              setInputCity(popularCities.find(c => c.id === 'tok') || null);
            }}
            className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors"
          >
            "15:30" in Tokyo
          </button>
        </div>
      </div>
    </div>
  );
}

