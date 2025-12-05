import { useState, useCallback, useEffect } from 'react';
import { OllamaService } from '../services/ai/OllamaService';
import { SmartTemplates } from '../services/ai/SmartTemplates';

export const useLocalAiAssistant = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [ollamaAvailable, setOllamaAvailable] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);

  useEffect(() => {
    const checkOllama = async () => {
      try {
        const available = await OllamaService.isAvailable();
        setOllamaAvailable(available);
      } catch {
        setOllamaAvailable(false);
      }
    };
    checkOllama();
  }, []);

  const generateSuggestions = useCallback(async (missionId: string, formData: any, fieldName?: string) => {
    setLoading(true);
    setInteractionCount(prev => prev + 1);
    
    try {
      let generated: string[];
      
      if (ollamaAvailable && formData.message && formData.message.length > 15) {
        try {
          const prompt = `Donne 3 suggestions pour améliorer ce formulaire de ${missionId}:
            Données: ${JSON.stringify(formData)}
            Suggestions en français, courtes, avec emoji.`;
          
          const response = await OllamaService.generateSummary(missionId, { message: prompt });
          generated = parseSuggestions(response);
        } catch {
          generated = SmartTemplates.generateFieldSuggestions(missionId, formData, fieldName);
        }
      } else {
        generated = SmartTemplates.generateFieldSuggestions(missionId, formData, fieldName);
      }
      
      if (interactionCount > 2) {
        generated.push(getPersonalizedSuggestion(interactionCount));
      }
      
      setSuggestions(generated.slice(0, 3));
    } catch (error) {
      setSuggestions([
        '💡 Pensez à être précis et concis',
        '🌟 Ajoutez des détails concrets si possible',
        '🎯 Notre équipe vous répondra rapidement'
      ]);
    } finally {
      setLoading(false);
    }
  }, [ollamaAvailable, interactionCount]);

  const parseSuggestions = (text: string): string[] => {
    return text
      .split(/\d\.|\n-|\n\*/)
      .map(item => item.trim())
      .filter(item => item.length > 10 && item.length < 150)
      .slice(0, 3);
  };

  const getPersonalizedSuggestion = (count: number): string => {
    const tips = [
      `✨ Astuce n°${count}: Relisez-vous avant d'envoyer`,
      `📈 Vous avez modifié ${count} champs, c'est excellent !`,
      `🎯 Plus vous êtes précis, mieux nous pouvons vous aider`
    ];
    return tips[(count - 1) % tips.length];
  };

  return {
    suggestions,
    loading,
    ollamaAvailable,
    generateSuggestions,
    interactionCount,
  };
};