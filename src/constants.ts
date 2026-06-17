import { Disorder, MRIExample } from './types';
import { 
  Plus, 
  Brain, 
  Activity, 
  Stethoscope, 
  Zap, 
  ShieldCheck, 
  Microscope,
  Info,
  Clock,
  User,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const DISORDERS: Disorder[] = [
  {
    id: 'glioma',
    title: 'Glioma',
    description: 'A type of tumor that starts in the glial cells of the brain or spine.',
    symptoms: ['Headache', 'Seizures', 'Nausea', 'Vision changes'],
    risk: 'High',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=400',
    treatment: ['Surgery', 'Radiation therapy', 'Chemotherapy', 'Targeted drug therapy'],
    prevalence: '5-10 per 100,000 people annually.',
    prognosis: 'Varies by grade. High-grade gliomas require intensive management.',
    guidelines: ['Immediate MRI with contrast required.', 'Neurosurgical consultation within 24h.', 'Steroid therapy for edema management.', 'Baseline cognitive assessment.']
  },
  {
    id: 'meningioma',
    title: 'Meningioma',
    description: 'A tumor that arises from the meninges — the membranes that surround your brain and spinal cord.',
    symptoms: ['Blurred vision', 'Hearing loss', 'Memory loss'],
    risk: 'Medium',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&q=80&w=400',
    treatment: ['Observation', 'Surgery', 'Radiation therapy'],
    prevalence: 'The most common benign brain tumor, often affecting older adults.',
    prognosis: 'Excellent with surgical removal in benign cases.',
    guidelines: ['Annual monitoring for asymptomatic cases.', 'Surgical resection if symptomatic.', 'Post-op imaging at 6 and 12 months.', 'Endocrine evaluation for skull-base cases.']
  },
  {
    id: 'alzheimers',
    title: 'Alzheimer\'s Disease',
    description: 'A progressive disease that destroys memory and other important mental functions.',
    symptoms: ['Memory loss', 'Confusion', 'Disorientation'],
    risk: 'High',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=400',
    treatment: ['Cholinesterase inhibitors', 'Memantine', 'Cognitive therapy'],
    prevalence: 'Affects over 50 million people worldwide.',
    prognosis: 'Chronic and progressive; early management extends quality of life.',
    guidelines: ['MoCA or MMSE screening recommended.', 'Caregiver support integration.', 'Lifestyle and dietary adjustments.', 'Safety assessment for home environment.']
  },
  {
    id: 'stroke',
    title: 'Stroke',
    description: 'Damage to the brain from interruption of its blood supply.',
    symptoms: ['Difficulty speaking', 'Numbness', 'Trouble walking'],
    risk: 'High',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=400',
    treatment: ['tPA (clot-buster)', 'Endovascular procedures', 'Rehabilitation'],
    prevalence: 'Second leading cause of death globally.',
    prognosis: 'Dependent on speed of intervention and rehabilitation.',
    guidelines: ['Emergency neuro-imaging (CT/MRI).', 'Blood pressure management protocols.', 'Dysphagia screening before oral intake.', 'Early mobilization and physiotherapy.']
  },
  {
    id: 'epilepsy',
    title: 'Epilepsy',
    description: 'A disorder in which nerve cell activity in the brain is disturbed, causing seizures.',
    symptoms: ['Temporary confusion', 'Staring spell', 'Uncontrollable movements'],
    risk: 'Medium',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=400',
    treatment: ['Antiepileptic drugs', 'Ketogenic diet', 'Vagus nerve stimulation'],
    prevalence: 'Affects approx. 50 million people globally.',
    prognosis: 'Most cases can be controlled with medication.',
    guidelines: ['EEG and MRI monitoring.', 'Medication compliance tracking.', 'Seizure first aid training for family.', 'Driving and safety restrictions review.']
  },
  {
    id: 'parkinsons',
    title: 'Parkinson\'s Disease',
    description: 'A disorder of the central nervous system that affects movement, often including tremors.',
    symptoms: ['Tremor', 'Slowed movement', 'Rigid muscles'],
    risk: 'High',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=400',
    treatment: ['Levodopa', 'Dopamine agonists', 'Deep brain stimulation'],
    prevalence: 'Affects 1% of the population over age 60.',
    prognosis: 'Progressive, but symptoms can be effectively managed for years.',
    guidelines: ['Dopaminergic medication scheduling.', 'Fall risk assessment.', 'Physical and occupational therapy.', 'Speech and swallow evaluation.']
  }
];

export const MRI_EXAMPLES: MRIExample[] = [
  { id: '1', label: 'Glioma Detection', confidence: '94.2%', image: '/assets/mri_glioma.png' },
  { id: '2', label: 'Healthy Baseline', confidence: '99.8%', image: '/assets/mri_healthy.png' },
  { id: '3', label: 'Meningioma Scan', confidence: '88.5%', image: '/assets/mri_meningioma.png' },
  { id: '4', label: 'Stroke Analysis', confidence: '91.2%', image: '/assets/mri_stroke.png' },
  { id: '5', label: 'Alzheimer\'s Pattern', confidence: '85.4%', image: '/assets/mri_alzheimers.png' },
];

export const FEATURES = [
  { 
    icon: Microscope, 
    title: 'MRI Analysis', 
    desc: 'Automated segmentation and anomaly detection in neuroimaging.',
    color: 'bg-blue-50 text-blue-600'
  },
  { 
    icon: Zap, 
    title: 'Symptom Intelligence', 
    desc: 'Context-aware symptom correlation using neuro-symbolic logic.',
    color: 'bg-amber-50 text-amber-600'
  },
  { 
    icon: Info, 
    title: 'Explainable AI', 
    desc: 'Transparent reasoning paths for every clinical recommendation.',
    color: 'bg-indigo-50 text-indigo-600'
  },
  { 
    icon: Stethoscope, 
    title: 'Clinical Recommendations', 
    desc: 'Evidence-based treatment pathways and risk assessment.',
    color: 'bg-emerald-50 text-emerald-600'
  }
];

export const STEPS = [
  { id: 1, title: 'Upload MRI', desc: 'Securely upload scan in high resolution.' },
  { id: 2, title: 'Enter Symptoms', desc: 'Describe clinical observations.' },
  { id: 3, title: 'AI Analysis', desc: 'Neural patterns are matched and analyzed.' },
  { id: 4, title: 'Results', desc: 'Get explained diagnosis and pathways.' }
];
