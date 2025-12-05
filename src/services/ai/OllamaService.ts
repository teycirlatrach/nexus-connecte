export class OllamaService {
  private static readonly OLLAMA_URL = 'http://localhost:11434/api/generate';
  private static isAvailableCache: boolean | null = null;
  
  static async isAvailable(): Promise<boolean> {
    if (this.isAvailableCache !== null) return this.isAvailableCache;
    
    try {
      const response = await fetch('http://localhost:11434/api/tags', {
        method: 'GET',
        signal: AbortSignal.timeout(2000),
      });
      this.isAvailableCache = response.ok;
      return this.isAvailableCache;
    } catch {
      this.isAvailableCache = false;
      return false;
    }
  }
  
  static async generateSummary(missionId: string, formData: any): Promise<string> {
    const prompt = this.createPrompt(missionId, formData);
    
    try {
      const response = await fetch(this.OLLAMA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3.2:1b',
          prompt,
          stream: false,
          options: {
            temperature: 0.7,
            max_tokens: 200,
          }
        })
      });
      
      if (!response.ok) throw new Error('Ollama error');
      
      const data = await response.json();
      return this.formatResponse(data.response);
    } catch (error) {
      console.warn('Ollama unavailable, using fallback');
      throw error;
    }
  }
  
  private static createPrompt(missionId: string, formData: any): string {
    const missionPrompts: Record<string, string> = {
      don: `Résume cette demande de don en 2-3 phrases engageantes:
        Nom: ${formData.name}
        Montant: ${formData.amount}€
        Récurrent: ${formData.isRecurring ? 'Oui' : 'Non'}
        Message: "${formData.message}"
        
        Crée un résumé qui montre l'impact potentiel du don.`,
        
      contact: `Résume cette demande de contact professionnellement:
        Catégorie: ${formData.category}
        Priorité: ${formData.priority}
        Message: "${formData.message}"
        
        Met en avant les points clés pour une réponse rapide.`,
        
      volunteer: `Résume cette candidature bénévole de manière motivante:
        Compétences: ${formData.skills?.join(', ')}
        Motivation: "${formData.message}"
        
        Souligne les atouts du candidat.`,
        
      info: `Résume cette demande d'information clairement:
        Sujet: ${formData.topic}
        Message: "${formData.message}"
        
        Structure les informations demandées.`
    };
    
    return missionPrompts[missionId] || missionPrompts.contact;
  }
  
  private static formatResponse(text: string): string {
    return text
      .replace(/^\s+|\s+$/g, '')
      .replace(/\n+/g, ' ')
      .trim();
  }
}