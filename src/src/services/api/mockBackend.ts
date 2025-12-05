export class MockBackend {
  private static submissions: any[] = [];
  private static readonly SIMULATED_DELAY = 800;
  
  static async submitForm(data: any): Promise<{ success: boolean; data?: any; error?: string }> {
    await new Promise(resolve => setTimeout(resolve, this.SIMULATED_DELAY));
    
    if (!data.email || !data.name) {
      return { success: false, error: 'Champs requis manquants' };
    }
    
    if (data.message && data.message.length > 5000) {
      return { success: false, error: 'Message trop long' };
    }
    
    const success = Math.random() > 0.1;
    
    if (success) {
      const submission = {
        id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        data: { ...data, message: data.message?.substring(0, 500) },
        status: 'received'
      };
      
      this.submissions.push(submission);
      
      const aiResponse = this.generateAiResponse(data);
      
      return { 
        success: true, 
        data: { 
          submissionId: submission.id,
          aiResponse,
          nextSteps: this.getNextSteps(data.missionId)
        } 
      };
    } else {
      return { success: false, error: 'Erreur de serveur simulée. Veuillez réessayer.' };
    }
  }
  
  private static generateAiResponse(data: any): string {
    const responses: Record<string, string> = {
      don: `Merci pour votre générosité ! Votre don de ${data.amount}€ sera utilisé pour ${this.getDonationUseCase()}.`,
      contact: `Votre message a été transféré à notre équipe ${data.department || 'support'}. Vous recevrez une réponse sous 48h.`,
      volunteer: `Nous sommes ravis de votre intérêt ! Notre responsable bénévoles vous contactera pour discuter de vos compétences.`,
      info: `Nous préparons les informations demandées. Vous recevrez un dossier complet dans les 24h.`
    };
    
    return responses[data.missionId] || responses.contact;
  }
  
  private static getDonationUseCase(): string {
    const uses = [
      'financer nos programmes éducatifs',
      'soutenir nos actions sur le terrain',
      'développer de nouveaux outils numériques',
      'former nos équipes bénévoles'
    ];
    return uses[Math.floor(Math.random() * uses.length)];
  }
  
  private static getNextSteps(missionId: string): string[] {
    const steps: Record<string, string[]> = {
      don: ['Email de confirmation avec reçu fiscal', 'Newsletter mensuelle', 'Invitation événements donateurs'],
      contact: ['Accusé de réception', 'Assignation à un agent', 'Suivi par email'],
      volunteer: ['Appel découverte', 'Session d\'intégration', 'Affectation à une mission'],
      info: ['Compilation des ressources', 'Vérification des sources', 'Envoi personnalisé']
    };
    
    return steps[missionId] || ['Traitement en cours', 'Confirmation par email'];
  }
  
  static getSubmissionCount(): number {
    return this.submissions.length;
  }
}