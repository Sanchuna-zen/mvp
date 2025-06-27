'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Search, Mic, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserLocation } from '@/types/booking';

interface QuickSearchBarProps {
  onLocationDetected?: (location: UserLocation) => void;
  onSearch?: (query: string, location?: UserLocation) => void;
  placeholder?: {
    en: string;
    ta: string;
  };
  language?: 'en' | 'ta';
}

export function QuickSearchBar({
  onLocationDetected,
  onSearch,
  placeholder = {
    en: "Search parking near you...",
    ta: "உங்கள் அருகிலுள்ள பார்க்கிங் தேடுங்கள்..."
  },
  language = 'en'
}: QuickSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [showManualEntry, setShowManualEntry] = useState(false);

  // Text translations
  const texts = {
    en: {
      searchPlaceholder: placeholder.en,
      detectLocation: "Detect My Location",
      manualEntry: "Enter Address Manually",
      searching: "Detecting location...",
      locationDenied: "Location access denied. Please enter address manually.",
      locationError: "Unable to detect location. Try manual entry.",
      searchButton: "Search Parking",
      voiceSearch: "Voice Search"
    },
    ta: {
      searchPlaceholder: placeholder.ta,
      detectLocation: "என் இருப்பிடத்தைக் கண்டறியவும்",
      manualEntry: "முகவரியை கைமுறையாக உள்ளிடவும்",
      searching: "இருப்பிடத்தைக் கண்டறிகிறது...",
      locationDenied: "இருப்பிட அணுகல் மறுக்கப்பட்டது. முகவரியை கைமுறையாக உள்ளிடவும்.",
      locationError: "இருப்பிடத்தைக் கண்டறிய முடியவில்லை. கைமுறை உள்ளீட்டை முயற்சிக்கவும்.",
      searchButton: "பார்க்கிங் தேடுங்கள்",
      voiceSearch: "குரல் தேடல்"
    }
  };

  const currentTexts = texts[language];

  // Detect user location
  const detectLocation = async () => {
    setIsDetectingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError(currentTexts.locationError);
      setShowManualEntry(true);
      setIsDetectingLocation(false);
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5 minutes
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const location: UserLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: Date.now()
        };

        // Try to get address from coordinates (reverse geocoding)
        try {
          // In a real app, you'd use a geocoding service
          // For now, we'll just set Chennai as default
          location.address = "Current Location";
          location.city = "Chennai";
          location.state = "Tamil Nadu";
        } catch (error) {
          console.log('Reverse geocoding failed:', error);
        }

        setUserLocation(location);
        onLocationDetected?.(location);
        setIsDetectingLocation(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMessage = currentTexts.locationError;
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = currentTexts.locationDenied;
            break;
          case error.POSITION_UNAVAILABLE:
          case error.TIMEOUT:
            errorMessage = currentTexts.locationError;
            break;
        }
        
        setLocationError(errorMessage);
        setShowManualEntry(true);
        setIsDetectingLocation(false);
      },
      options
    );
  };

  // Handle search
  const handleSearch = () => {
    if (searchQuery.trim() || userLocation) {
      onSearch?.(searchQuery.trim(), userLocation || undefined);
    }
  };

  // Handle voice search (placeholder for now)
  const handleVoiceSearch = () => {
    // In a real implementation, you'd integrate with Web Speech API
    console.log('Voice search triggered');
  };

  // Auto-detect location on component mount
  useEffect(() => {
    detectLocation();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4">
      {/* Main Search Container */}
      <div 
        className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-gray-200 dark:border-gray-600 focus-within:border-blue-500 dark:focus-within:border-blue-400"
        role="search"
        aria-label={currentTexts.searchPlaceholder}
      >
        {/* Location Status Bar */}
        {userLocation && !showManualEntry && (
          <div className="flex items-center px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-t-xl border-b border-green-200 dark:border-green-800">
            <Navigation 
              className="h-4 w-4 text-green-600 dark:text-green-400 mr-2" 
              aria-hidden="true" 
            />
            <span className="text-sm text-green-700 dark:text-green-300 truncate">
              {userLocation.address || "Current Location"}
            </span>
          </div>
        )}

        {/* Search Input */}
        <div className="flex items-center p-2">
          <div className="flex-1 relative">
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" 
              aria-hidden="true"
            />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={currentTexts.searchPlaceholder}
              className="pl-10 pr-12 py-3 text-base border-0 focus:ring-0 bg-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              aria-label={currentTexts.searchPlaceholder}
            />
            {/* Voice Search Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleVoiceSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label={currentTexts.voiceSearch}
            >
              <Mic className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Location Controls */}
      <div className="flex flex-col space-y-2">
        {/* Detect Location Button */}
        {!userLocation && (
          <Button
            onClick={detectLocation}
            disabled={isDetectingLocation}
            className="w-full py-3 text-base font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-xl touch-manipulation"
            aria-label={currentTexts.detectLocation}
          >
            <MapPin className="h-5 w-5 mr-2" aria-hidden="true" />
            {isDetectingLocation ? currentTexts.searching : currentTexts.detectLocation}
          </Button>
        )}

        {/* Manual Entry Toggle */}
        {(locationError || showManualEntry) && (
          <Button
            variant="outline"
            onClick={() => setShowManualEntry(!showManualEntry)}
            className="w-full py-3 text-base border-2 rounded-xl touch-manipulation"
            aria-label={currentTexts.manualEntry}
          >
            {currentTexts.manualEntry}
          </Button>
        )}

        {/* Search Button */}
        {(searchQuery.trim() || userLocation) && (
          <Button
            onClick={handleSearch}
            className="w-full py-4 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white rounded-xl touch-manipulation shadow-lg"
            aria-label={currentTexts.searchButton}
          >
            {currentTexts.searchButton}
          </Button>
        )}
      </div>

      {/* Error Message */}
      {locationError && (
        <div 
          className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          role="alert"
          aria-live="polite"
        >
          <p className="text-sm text-red-700 dark:text-red-300">
            {locationError}
          </p>
        </div>
      )}
    </div>
  );
}