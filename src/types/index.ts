
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  isLoggedIn: boolean;
  medicalHistory?: MedicalHistory;
  emergencyContacts?: EmergencyContact[];
}

export interface MedicalHistory {
  allergies: string[];
  chronicConditions: string[];
  currentMedications: string[];
  bloodType?: string;
  height?: number;
  weight?: number;
  birthDate?: string;
  lastPhysicalExam?: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  isWhatsApp: boolean;
}

export interface SymptomCheckerResult {
  symptoms: string[];
  possibleConditions: {
    name: string;
    probability: number;
    description: string;
    recommendations: string[];
  }[];
  urgencyLevel: 'low' | 'medium' | 'high' | 'emergency';
  generatedAt: string;
}

export interface HealthcareFacility {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'pharmacy' | 'urgent-care' | 'specialist';
  address: string;
  phone?: string;
  distance?: number;
  rating?: number;
  openNow?: boolean;
  location: {
    lat: number;
    lng: number;
  };
}

export interface HealthTip {
  id: string;
  title: string;
  description: string;
  category: string;
  relevantConditions: string[];
  source?: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserRegistrationData extends UserCredentials {
  name: string;
  medicalHistory?: Partial<MedicalHistory>;
}
