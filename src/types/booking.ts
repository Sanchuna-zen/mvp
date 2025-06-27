// Core interfaces for Chennai parking app quick booking flow

// User location interface
export interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: number;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
}

// Parking slot interface
export interface ParkingSlot {
  id: string;
  name: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  type: 'street' | 'paid' | 'private' | 'mall' | 'office';
  isAvailable: boolean;
  price: {
    amount: number;
    currency: 'INR';
    per: 'hour' | 'day';
  };
  capacity: {
    total: number;
    available: number;
  };
  features: string[]; // ['covered', 'security', 'ev_charging', etc.]
  operatingHours: {
    open: string; // '08:00'
    close: string; // '23:00'
    isOpen24x7: boolean;
  };
  distance?: number; // in meters from user location
  walkingTime?: number; // in minutes
  // Extensibility fields
  navigation?: {
    instructions?: string;
    landmarks?: string[];
  };
  alternatives?: string[]; // IDs of alternative slots
  refundPolicy?: 'full' | 'partial' | 'none';
  metadata?: Record<string, any>; // For future features
}

// Booking request interface
export interface BookingRequest {
  slotId: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  vehicleType: 'car' | 'bike' | 'auto' | 'truck';
  vehicleNumber?: string;
  duration: {
    hours: number;
    minutes: number;
  };
  totalAmount: number;
  // Extensibility fields
  preferences?: {
    needsCover?: boolean;
    needsSecurity?: boolean;
    needsEvCharging?: boolean;
  };
  contactNumber?: string;
  emergencyContact?: string;
  specialRequests?: string;
  metadata?: Record<string, any>;
}

// Booking confirmation interface
export interface BookingConfirmation {
  bookingId: string;
  slotId: string;
  userId: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'expired';
  slot: ParkingSlot;
  bookingDetails: {
    startTime: Date;
    endTime: Date;
    duration: {
      hours: number;
      minutes: number;
    };
    vehicleType: string;
    vehicleNumber?: string;
  };
  totalAmount: number;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
  // Extensibility fields
  qrCode?: string; // For slot access
  accessCode?: string; // Alternative access method
  navigationUrl?: string; // Deep link to maps
  alternativeSlots?: ParkingSlot[]; // If original slot becomes unavailable
  refundDetails?: {
    eligibleAmount: number;
    processingFee: number;
    refundPolicy: string;
  };
  customerSupport?: {
    phone: string;
    email: string;
    chatUrl?: string;
  };
  metadata?: Record<string, any>;
}

// Payment details interface
export interface PaymentDetails {
  paymentId: string;
  bookingId: string;
  amount: number;
  currency: 'INR';
  method: 'upi' | 'card' | 'netbanking' | 'wallet' | 'cash';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  transactionId?: string;
  gatewayReference?: string;
  paymentGateway: 'razorpay' | 'payu' | 'phonepe' | 'gpay' | 'cash';
  createdAt: Date;
  completedAt?: Date;
  failureReason?: string;
  // Extensibility fields
  refundInfo?: {
    refundId?: string;
    refundAmount?: number;
    refundStatus?: 'pending' | 'processing' | 'completed' | 'failed';
    refundDate?: Date;
    refundMethod?: string;
    processingFee?: number;
  };
  receiptUrl?: string;
  invoiceNumber?: string;
  taxDetails?: {
    gst?: number;
    serviceTax?: number;
    otherCharges?: number;
  };
  metadata?: Record<string, any>;
}

// Additional utility types for the booking flow
export interface BookingError {
  code: string;
  message: string;
  details?: string;
  timestamp: Date;
  userMessage: {
    en: string;
    ta: string; // Tamil translation
  };
}

export interface BookingState {
  currentStep: 'search' | 'selection' | 'confirmation' | 'payment' | 'success';
  selectedSlot?: ParkingSlot;
  bookingRequest?: BookingRequest;
  paymentDetails?: PaymentDetails;
  confirmation?: BookingConfirmation;
  error?: BookingError;
  isLoading: boolean;
}

// Search filters for extensibility
export interface SearchFilters {
  radius: number; // in meters
  maxPrice?: number;
  slotType?: ParkingSlot['type'][];
  features?: string[];
  availableNow?: boolean;
  duration?: {
    hours: number;
    minutes: number;
  };
}