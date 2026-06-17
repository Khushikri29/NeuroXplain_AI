export type Page = 'HOME' | 'UPLOAD' | 'SYMPTOMS' | 'COGNITIVE_TEST' | 'PROCESSING' | 'RESULTS' | 'HISTORY' | 'TEAM';

export interface Symptom {
  id: string;
  label: string;
  checked: boolean;
}

export interface Report {
  id: string;
  date: string;
  diagnosis: string;
  confidence: number;
  symptoms: string[];
}

export interface Disorder {
  id: string;
  title: string;
  description: string;
  symptoms: string[];
  risk: 'Low' | 'Medium' | 'High';
  image: string;
  treatment?: string[];
  prevalence?: string;
  prognosis?: string;
  guidelines?: string[];
}

export interface MRIExample {
  id: string;
  label: string;
  confidence: string;
  image: string;
}
