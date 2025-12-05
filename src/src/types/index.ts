export type MissionId = 'don' | 'contact' | 'info' | 'volunteer';

export interface BaseFormData {
  name: string;
  email: string;
  message: string;
  captchaToken: string;
}

export interface DonationData {
  amount: number;
  isRecurring: boolean;
  urgency: 'low' | 'medium' | 'high';
  anonymous: boolean;
}

export interface ContactData {
  subject: string;
  category: 'support' | 'partnership' | 'feedback' | 'other';
  priority: 'low' | 'medium' | 'high';
  department: string;
}

export interface InformationData {
  topic: string;
  source: string;
  reliability: 'low' | 'medium' | 'high';
  allowSharing: boolean;
}

export interface VolunteerData {
  skills: string[];
  availability: string[];
  motivation: string;
  experience: 'none' | 'some' | 'experienced';
}

export type MissionSpecificData = 
  | { missionId: 'don'; data: DonationData }
  | { missionId: 'contact'; data: ContactData }
  | { missionId: 'info'; data: InformationData }
  | { missionId: 'volunteer'; data: VolunteerData };

export interface SubmissionState {
  missionId: MissionId | null;
  baseFormData: BaseFormData;
  missionSpecificData: MissionSpecificData | null;
  aiSummary: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  submissionId?: string;
  submittedAt?: Date;
  formStatus: 'idle' | 'submitting' | 'success' | 'error';
}