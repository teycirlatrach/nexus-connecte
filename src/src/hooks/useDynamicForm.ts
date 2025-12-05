import { useState, useEffect, useCallback } from 'react';
import type { MissionId } from '../types';
import { validateEmail, validateAmount, validateRequired } from '../utils/validation';

export const useDynamicForm = (missionId: MissionId | null) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState<Set<string>>(new Set());

  // Définir les champs par mission avec type sûr
  const missionFields: Record<MissionId, string[]> = {
    don: ['amount', 'isRecurring', 'urgency', 'anonymous'],
    contact: ['subject', 'category', 'priority', 'department'],
    info: ['topic', 'source', 'reliability', 'allowSharing'],
    volunteer: ['skills', 'availability', 'motivation', 'experience'],
  };

  const validateField = useCallback((name: string, value: any): string => {
    switch (name) {
      case 'email':
        return validateEmail(value);
      case 'amount':
        return validateAmount(value);
      case 'name':
        return validateRequired(value, 'Le nom est requis');
      case 'message':
        return value?.length >= 10 ? '' : 'Minimum 10 caractères';
      default:
        return validateRequired(value, 'Ce champ est requis');
    }
  }, []);

  const handleChange = useCallback((name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouched(prev => new Set([...prev, name]));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [validateField]);

  const handleBlur = useCallback((name: string) => {
    if (!touched.has(name)) {
      setTouched(prev => new Set([...prev, name]));
    }
    
    const error = validateField(name, formData[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [formData, touched, validateField]);

  useEffect(() => {
    if (!missionId) {
      setIsValid(false);
      return;
    }
    
    // Récupérer les champs spécifiques à la mission ou un tableau vide
    const specificFields = missionId && missionFields[missionId] ? missionFields[missionId] : [];
    const requiredFields = ['name', 'email', 'message', ...specificFields];
    
    const hasErrors = requiredFields.some(field => errors[field]);
    const allRequiredFilled = requiredFields.every(field => {
      const value = formData[field];
      return value !== undefined && value !== null && value !== '' && !(Array.isArray(value) && value.length === 0);
    });
    
    setIsValid(!hasErrors && allRequiredFilled);
  }, [errors, formData, missionId]);

  const getFieldSuggestions = useCallback((fieldName: string): any[] => {
    const suggestions: Record<string, any[]> = {
      amount: [10, 25, 50, 100, 250, 500],
      category: ['support', 'partnership', 'feedback', 'other'],
      priority: ['low', 'medium', 'high'],
      skills: ['Design', 'Development', 'Marketing', 'Finance', 'HR', 'Logistics'],
      // Ajouter des suggestions pour d'autres champs si nécessaire
      topic: ['Technologie', 'Éducation', 'Santé', 'Environnement'],
      availability: ['Week-end', 'Soirée', 'Journée', 'Ponctuel'],
      department: ['Support', 'Commercial', 'Technique', 'Administratif'],
      reliability: ['low', 'medium', 'high'],
      urgency: ['low', 'medium', 'high'],
      experience: ['none', 'some', 'experienced'],
    };
    
    return suggestions[fieldName] || [];
  }, []);

  // Fonction utilitaire pour réinitialiser le formulaire
  const resetForm = useCallback(() => {
    setFormData({});
    setErrors({});
    setIsValid(false);
    setTouched(new Set());
  }, []);

  // Fonction pour mettre à jour plusieurs champs à la fois
  const updateMultipleFields = useCallback((updates: Record<string, any>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    
    // Valider chaque champ mis à jour
    Object.entries(updates).forEach(([name, value]) => {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    });
  }, [validateField]);

  return {
    formData,
    errors,
    isValid,
    touched,
    handleChange,
    handleBlur,
    getFieldSuggestions,
    setFormData,
    resetForm,
    updateMultipleFields,
  };
};

// Version alternative avec des types plus stricts si nécessaire
export interface DynamicFormReturn {
  formData: Record<string, any>;
  errors: Record<string, string>;
  isValid: boolean;
  touched: Set<string>;
  handleChange: (name: string, value: any) => void;
  handleBlur: (name: string) => void;
  getFieldSuggestions: (fieldName: string) => any[];
  setFormData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  resetForm: () => void;
  updateMultipleFields: (updates: Record<string, any>) => void;
}