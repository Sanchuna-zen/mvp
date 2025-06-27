'use client';

import React from 'react';
import { 
  MapPin, 
  Clock, 
  Shield, 
  Car, 
  Zap, 
  Eye, 
  Wheelchair,
  Check,
  X
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ParkingSlot } from '@/types/booking';

interface SlotCardProps {
  slot: ParkingSlot;
  isSelected?: boolean;
  onSelect?: (slot: ParkingSlot) => void;
  language?: 'en' | 'ta';
  className?: string;
}

export function SlotCard({
  slot,
  isSelected = false,
  onSelect,
  language = 'en',
  className = ''
}: SlotCardProps) {
  
  // Text translations
  const texts = {
    en: {
      available: 'Available',
      booked: 'Full',
      slotsLeft: 'slots left',
      walkingTime: 'min walk',
      features: {
        covered: 'Covered',
        security: 'Security',
        cctv: 'CCTV',
        ev_charging: 'EV Charging',
        valet: 'Valet',
        open_air: 'Open Air',
        '24x7': '24/7',
        near_metro: 'Near Metro',
        wheelchair_access: 'Accessible'
      },
      slotTypes: {
        street: 'Street Parking',
        paid: 'Paid Parking',
        mall: 'Mall Parking',
        private: 'Private',
        office: 'Office'
      },
      perHour: '/hr',
      perDay: '/day',
      selectSlot: 'Select this parking slot'
    },
    ta: {
      available: 'கிடைக்கிறது',
      booked: 'நிரம்பியது',
      slotsLeft: 'இடங்கள் உள்ளன',
      walkingTime: 'நிமிட நடை',
      features: {
        covered: 'மூடப்பட்ட',
        security: 'பாதுகாப்பு',
        cctv: 'சிசிடிவி',
        ev_charging: 'இவி சார்ஜிங்',
        valet: 'வாலட்',
        open_air: 'திறந்த வெளி',
        '24x7': '24/7',
        near_metro: 'மெட்ரோ அருகே',
        wheelchair_access: 'அணுகக்கூடிய'
      },
      slotTypes: {
        street: 'சாலை பார்க்கிங்',
        paid: 'கட்டண பார்க்கிங்',
        mall: 'மால் பார்க்கிங்',
        private: 'தனியார்',
        office: 'அலுவலகம்'
      },
      perHour: '/மணி',
      perDay: '/நாள்',
      selectSlot: 'இந்த பார்க்கிங் இடத்தைத் தேர்ந்தெடுக்கவும்'
    }
  };

  const currentTexts = texts[language];

  // Get feature icon and label
  const getFeatureDisplay = (feature: string) => {
    const icons: Record<string, React.ReactNode> = {
      covered: <Shield className="h-3 w-3" />,
      security: <Shield className="h-3 w-3" />,
      cctv: <Eye className="h-3 w-3" />,
      ev_charging: <Zap className="h-3 w-3" />,
      valet: <Car className="h-3 w-3" />,
      wheelchair_access: <Wheelchair className="h-3 w-3" />,
      '24x7': <Clock className="h-3 w-3" />
    };

    return {
      icon: icons[feature] || <Shield className="h-3 w-3" />,
      label: currentTexts.features[feature as keyof typeof currentTexts.features] || feature
    };
  };

  // Format distance
  const formatDistance = (distance?: number) => {
    if (!distance) return '';
    if (distance < 1000) {
      return `${distance}m`;
    }
    return `${(distance / 1000).toFixed(1)}km`;
  };

  // Handle card selection
  const handleSelect = () => {
    if (slot.isAvailable && onSelect) {
      onSelect(slot);
    }
  };

  // Handle keyboard interaction
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelect();
    }
  };

  return (
    <Card
      className={`
        relative w-full p-4 cursor-pointer transition-all duration-200 touch-manipulation
        ${slot.isAvailable 
          ? 'hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]' 
          : 'opacity-60 cursor-not-allowed'
        }
        ${isSelected 
          ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20 border-blue-300' 
          : 'border-gray-200 dark:border-gray-700'
        }
        ${className}
      `}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      tabIndex={slot.isAvailable ? 0 : -1}
      role="button"
      aria-label={`${currentTexts.selectSlot}: ${slot.name}`}
      aria-pressed={isSelected}
      aria-disabled={!slot.isAvailable}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
          <Check className="h-3 w-3" aria-hidden="true" />
        </div>
      )}

      {/* Header Section */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100 truncate mb-1">
            {slot.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {slot.address}
          </p>
        </div>
        
        {/* Availability Status */}
        <div className="ml-3 flex flex-col items-end">
          <Badge 
            variant={slot.isAvailable ? "default" : "destructive"}
            className={`text-xs font-medium mb-1 ${
              slot.isAvailable 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
            }`}
          >
            {slot.isAvailable ? (
              <Check className="h-3 w-3 mr-1" aria-hidden="true" />
            ) : (
              <X className="h-3 w-3 mr-1" aria-hidden="true" />
            )}
            {slot.isAvailable ? currentTexts.available : currentTexts.booked}
          </Badge>
          
          {/* Available Slots Count */}
          {slot.isAvailable && slot.capacity.available > 0 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {slot.capacity.available} {currentTexts.slotsLeft}
            </span>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="flex items-center justify-between mb-3">
        {/* Price */}
        <div className="flex items-center">
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
            ₹{slot.price.amount}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
            {slot.price.per === 'hour' ? currentTexts.perHour : currentTexts.perDay}
          </span>
        </div>

        {/* Distance & Walking Time */}
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <MapPin className="h-4 w-4 mr-1" aria-hidden="true" />
          <span className="mr-2">{formatDistance(slot.distance)}</span>
          {slot.walkingTime && (
            <>
              <Clock className="h-4 w-4 mr-1" aria-hidden="true" />
              <span>{slot.walkingTime} {currentTexts.walkingTime}</span>
            </>
          )}
        </div>
      </div>

      {/* Features Section */}
      {slot.features && slot.features.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {slot.features.slice(0, 4).map((feature, index) => {
            const featureDisplay = getFeatureDisplay(feature);
            return (
              <div
                key={`${feature}-${index}`}
                className="flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs text-gray-700 dark:text-gray-300"
              >
                {featureDisplay.icon}
                <span className="ml-1">{featureDisplay.label}</span>
              </div>
            );
          })}
          {slot.features.length > 4 && (
            <div className="flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs text-gray-700 dark:text-gray-300">
              +{slot.features.length - 4}
            </div>
          )}
        </div>
      )}

      {/* Slot Type */}
      <div className="flex justify-between items-center">
        <Badge variant="outline" className="text-xs">
          {currentTexts.slotTypes[slot.type] || slot.type}
        </Badge>
        
        {/* Operating Hours */}
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {slot.operatingHours.isOpen24x7 
            ? currentTexts.features['24x7']
            : `${slot.operatingHours.open} - ${slot.operatingHours.close}`
          }
        </span>
      </div>

      {/* Focus Ring for Accessibility */}
      <div className="absolute inset-0 rounded-lg ring-2 ring-transparent focus-within:ring-blue-500 focus-within:ring-offset-2 pointer-events-none" />
    </Card>
  );
}