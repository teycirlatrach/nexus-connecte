// Version simplifiée - sans MissionSpecificData problématique
import React, { createContext, useReducer, useContext, useCallback } from 'react';

// Types simplifiés
export type MissionId = 'don' | 'contact' | 'info' | 'volunteer';

export interface BaseFormData {
  name: string;
  email: string;
  message: string;
  captchaToken: string;
}

export interface SubmissionState {
  missionId: MissionId | null;
  baseFormData: BaseFormData;
  missionSpecificData: any; // Accepte n'importe quelle donnée
  aiSummary: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  submissionId?: string;
  submittedAt?: Date;
  formStatus: 'idle' | 'submitting' | 'success' | 'error';
}

type Action =
  | { type: 'SET_MISSION'; payload: MissionId }
  | { type: 'UPDATE_BASE_FORM'; payload: Partial<BaseFormData> }
  | { type: 'UPDATE_MISSION_DATA'; payload: any }
  | { type: 'SET_AI_SUMMARY'; payload: string }
  | { type: 'SET_SENTIMENT'; payload: SubmissionState['sentiment'] }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS'; payload: { submissionId: string } }
  | { type: 'SUBMIT_ERROR' }
  | { type: 'RESET' };

const initialState: SubmissionState = {
  missionId: null,
  baseFormData: { name: '', email: '', message: '', captchaToken: '' },
  missionSpecificData: {},
  aiSummary: '',
  sentiment: 'neutral',
  formStatus: 'idle',
};

// Mock des services pour éviter les erreurs d'import
const MockOllamaService = {
  isAvailable: async () => false,
  generateSummary: async (missionId: string, formData: any) => `Résumé IA pour ${missionId}`
};

const MockSmartTemplates = {
  generateSummary: (missionId: string, formData: any) => `Résumé template pour ${missionId}`
};

const submissionReducer = (state: SubmissionState, action: Action): SubmissionState => {
  switch (action.type) {
    case 'SET_MISSION':
      return { ...state, missionId: action.payload };
    case 'UPDATE_BASE_FORM':
      return { ...state, baseFormData: { ...state.baseFormData, ...action.payload } };
    case 'UPDATE_MISSION_DATA':
      return { 
        ...state, 
        missionSpecificData: { ...state.missionSpecificData, ...action.payload } 
      };
    case 'SET_AI_SUMMARY':
      return { ...state, aiSummary: action.payload };
    case 'SET_SENTIMENT':
      return { ...state, sentiment: action.payload };
    case 'SUBMIT_START':
      return { ...state, formStatus: 'submitting' };
    case 'SUBMIT_SUCCESS':
      return { 
        ...state, 
        submissionId: action.payload.submissionId, 
        submittedAt: new Date(),
        formStatus: 'success'
      };
    case 'SUBMIT_ERROR':
      return { ...state, formStatus: 'error' };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

interface SubmissionContextType {
  state: SubmissionState;
  dispatch: React.Dispatch<Action>;
  generateAiSummary: (missionId: MissionId, formData: any) => Promise<string>;
  analyzeSentiment: (text: string) => 'positive' | 'neutral' | 'negative';
}

export const SubmissionContext = createContext<SubmissionContextType | null>(null);

export const SubmissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(submissionReducer, initialState);

  const generateAiSummary = useCallback(async (missionId: MissionId, formData: any) => {
    try {
      // Remplacez par vos services réels
      let summary: string;
      
      // Essayer Ollama
      const ollamaAvailable = await MockOllamaService.isAvailable();
      if (ollamaAvailable) {
        summary = await MockOllamaService.generateSummary(missionId, formData);
      } else {
        summary = MockSmartTemplates.generateSummary(missionId, formData);
      }
      
      dispatch({ type: 'SET_AI_SUMMARY', payload: summary });
      return summary;
    } catch (error) {
      const fallback = `Résumé généré pour ${missionId}`;
      dispatch({ type: 'SET_AI_SUMMARY', payload: fallback });
      return fallback;
    }
  }, []);

  const analyzeSentiment = useCallback((text: string): 'positive' | 'neutral' | 'negative' => {
    if (!text) return 'neutral';
    
    const positive = ['merci', 'super', 'excellent', 'bravo', 'génial', 'parfait'];
    const negative = ['problème', 'urgent', 'insatisfait', 'déçu', 'mauvais', 'compliqué'];
    
    const words = text.toLowerCase().split(/\W+/);
    let score = 0;
    
    words.forEach(word => {
      if (positive.includes(word)) score++;
      if (negative.includes(word)) score--;
    });
    
    const sentiment = score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral';
    dispatch({ type: 'SET_SENTIMENT', payload: sentiment });
    return sentiment;
  }, []);

  return (
    <SubmissionContext.Provider value={{ state, dispatch, generateAiSummary, analyzeSentiment }}>
      {children}
    </SubmissionContext.Provider>
  );
};

export const useSubmission = () => {
  const context = useContext(SubmissionContext);
  if (!context) {
    throw new Error('useSubmission must be used within SubmissionProvider');
  }
  return context;
};