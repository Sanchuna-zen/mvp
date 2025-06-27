import { ParkingSlot } from '@/types/booking';

// Mock parking slots data for Chennai
export const mockChennaiSlots: ParkingSlot[] = [
  {
    id: 'slot-001',
    name: 'T. Nagar Shopping Complex',
    address: 'Ranganathan Street, T. Nagar, Chennai',
    location: {
      latitude: 13.0418,
      longitude: 80.2341
    },
    type: 'paid',
    isAvailable: true,
    price: {
      amount: 20,
      currency: 'INR',
      per: 'hour'
    },
    capacity: {
      total: 50,
      available: 12
    },
    features: ['covered', 'security', 'cctv'],
    operatingHours: {
      open: '06:00',
      close: '23:00',
      isOpen24x7: false
    },
    distance: 250,
    walkingTime: 3
  },
  {
    id: 'slot-002',
    name: 'Express Avenue Mall',
    address: 'Express Avenue, Royapettah, Chennai',
    location: {
      latitude: 13.0569,
      longitude: 80.2623
    },
    type: 'mall',
    isAvailable: true,
    price: {
      amount: 30,
      currency: 'INR',
      per: 'hour'
    },
    capacity: {
      total: 200,
      available: 45
    },
    features: ['covered', 'security', 'ev_charging', 'valet'],
    operatingHours: {
      open: '10:00',
      close: '22:00',
      isOpen24x7: false
    },
    distance: 1200,
    walkingTime: 15
  },
  {
    id: 'slot-003',
    name: 'Marina Beach Street Parking',
    address: 'Marina Beach Road, Chennai',
    location: {
      latitude: 13.0499,
      longitude: 80.2824
    },
    type: 'street',
    isAvailable: false,
    price: {
      amount: 10,
      currency: 'INR',
      per: 'hour'
    },
    capacity: {
      total: 20,
      available: 0
    },
    features: ['open_air'],
    operatingHours: {
      open: '06:00',
      close: '21:00',
      isOpen24x7: false
    },
    distance: 800,
    walkingTime: 10
  },
  {
    id: 'slot-004',
    name: 'Chennai Central Railway Station',
    address: 'Wall Tax Road, Park Town, Chennai',
    location: {
      latitude: 13.0827,
      longitude: 80.2707
    },
    type: 'paid',
    isAvailable: true,
    price: {
      amount: 15,
      currency: 'INR',
      per: 'hour'
    },
    capacity: {
      total: 100,
      available: 25
    },
    features: ['covered', 'security', '24x7'],
    operatingHours: {
      open: '00:00',
      close: '23:59',
      isOpen24x7: true
    },
    distance: 450,
    walkingTime: 6
  },
  {
    id: 'slot-005',
    name: 'Phoenix MarketCity',
    address: 'Velachery Main Road, Chennai',
    location: {
      latitude: 12.9716,
      longitude: 80.2209
    },
    type: 'mall',
    isAvailable: true,
    price: {
      amount: 25,
      currency: 'INR',
      per: 'hour'
    },
    capacity: {
      total: 300,
      available: 78
    },
    features: ['covered', 'security', 'ev_charging', 'wheelchair_access'],
    operatingHours: {
      open: '10:00',
      close: '22:00',
      isOpen24x7: false
    },
    distance: 2100,
    walkingTime: 25
  },
  {
    id: 'slot-006',
    name: 'Adyar Signal Parking',
    address: 'Lattice Bridge Road, Adyar, Chennai',
    location: {
      latitude: 13.0067,
      longitude: 80.2568
    },
    type: 'street',
    isAvailable: true,
    price: {
      amount: 8,
      currency: 'INR',
      per: 'hour'
    },
    capacity: {
      total: 15,
      available: 3
    },
    features: ['open_air', 'near_metro'],
    operatingHours: {
      open: '06:00',
      close: '22:00',
      isOpen24x7: false
    },
    distance: 650,
    walkingTime: 8
  }
];

// Function to simulate real-time updates
export function getSlotsByLocation(
  userLatitude: number, 
  userLongitude: number, 
  radiusKm: number = 5
): ParkingSlot[] {
  // Calculate distance for each slot
  const slotsWithDistance = mockChennaiSlots.map(slot => {
    const distance = calculateDistance(
      userLatitude, 
      userLongitude, 
      slot.location.latitude, 
      slot.location.longitude
    );
    
    return {
      ...slot,
      distance: Math.round(distance * 1000), // Convert to meters
      walkingTime: Math.round(distance * 1000 / 80) // Assuming 80m/min walking speed
    };
  });

  // Filter by radius and sort by distance
  return slotsWithDistance
    .filter(slot => (slot.distance || 0) <= radiusKm * 1000)
    .sort((a, b) => (a.distance || 0) - (b.distance || 0));
}

// Simple distance calculation (Haversine formula)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Function to simulate slot availability changes
export function updateSlotAvailability(): void {
  mockChennaiSlots.forEach(slot => {
    // Randomly update availability (simulate real-time changes)
    if (Math.random() < 0.1) { // 10% chance of change
      if (slot.isAvailable && slot.capacity.available > 0) {
        slot.capacity.available = Math.max(0, slot.capacity.available - 1);
        if (slot.capacity.available === 0) {
          slot.isAvailable = false;
        }
      } else if (!slot.isAvailable && Math.random() < 0.3) {
        slot.capacity.available = Math.min(slot.capacity.total, slot.capacity.available + 1);
        slot.isAvailable = true;
      }
    }
  });
}