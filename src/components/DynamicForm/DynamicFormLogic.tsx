import React, { useContext, useEffect, useState } from 'react';
import { useSubmission } from '../../contexts/SubmissionContext';
import { useDynamicForm } from '../../hooks/useDynamicForm';
import { useLocalAiAssistant } from '../../hooks/useLocalAiAssistant';
import { SecurityGuard } from '../../utils/security';
import { MockBackend } from '../../services/api/mockBackend';

interface DynamicFormLogicProps {
  children: (props: any) => React.ReactNode;
}

const DynamicFormLogic: React.FC<DynamicFormLogicProps> = ({ children }) => {
  const { state, dispatch, generateAiSummary, analyzeSentiment } = useSubmission();
  const { missionId } = state;
  
  const {
    formData,
    errors,
    isValid,
    touched,
    handleChange,
    handleBlur,
    getFieldSuggestions,
    setFormData,
  } = useDynamicForm(missionId);
  
  const {
    suggestions,
    loading: aiLoading,
    generateSuggestions,
  } = useLocalAiAssistant();
  
  const [localSentiment, setLocalSentiment] = useState<'positive' | 'neutral' | 'negative'>('neutral');

  useEffect(() => {
    dispatch({ type: 'UPDATE_BASE_FORM', payload: formData });
  }, [formData, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.message && formData.message.length > 20) {
        generateSuggestions(missionId!, formData);
        const sentiment = analyzeSentiment(formData.message);
        setLocalSentiment(sentiment);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [formData.message, missionId, generateSuggestions, analyzeSentiment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const securityCheck = SecurityGuard.canSubmit();
    if (!securityCheck.can) {
      alert(securityCheck.reason);
      return;
    }
    
    dispatch({ type: 'SUBMIT_START' });
    
    const captchaToken = SecurityGuard.generateCaptchaToken();
    handleChange('captchaToken', captchaToken);
    
    try {
      const aiSummary = await generateAiSummary(missionId!, formData);
      
      const result = await MockBackend.submitForm({
        missionId,
        ...formData,
        aiSummary,
        sentiment: localSentiment,
      });
      
      if (result.success) {
        dispatch({ type: 'SUBMIT_SUCCESS', payload: { submissionId: result.data.submissionId } });
        // Redirection gérée par le parent
      } else {
        alert(`Erreur: ${result.error}`);
        dispatch({ type: 'SUBMIT_ERROR' });
      }
    } catch (error) {
      alert('Erreur de connexion. Veuillez réessayer.');
      dispatch({ type: 'SUBMIT_ERROR' });
    }
  };
  
  const handleQuickFill = (field: string, value: any) => {
    handleChange(field, value);
  };

  if (!missionId) {
    return <div className="p-8 text-center">Veuillez sélectionner une mission</div>;
  }

  return children({
    missionId,
    formData,
    errors,
    isValid,
    touched,
    suggestions,
    aiLoading,
    fieldSuggestions: getFieldSuggestions,
    onSubmit: handleSubmit,
    onChange: handleChange,
    onBlur: handleBlur,
    onQuickFill: handleQuickFill,
    sentiment: localSentiment,
    formStatus: state.formStatus,
  });
};

export default DynamicFormLogic;