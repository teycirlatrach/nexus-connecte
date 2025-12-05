export class SmartTemplates {
  static generateSummary(missionId: string, formData: any): string {
    const templates: Record<string, string> = {
      don: `🎯 ${formData.name} souhaite faire un don ${formData.isRecurring ? 'mensuel' : 'ponctuel'} de ${formData.amount}€. 
      ${formData.message ? `Motivation: "${formData.message.substring(0, 100)}..."` : ''}
      Ce don aura un impact ${this.getImpactLevel(formData.amount)} sur nos actions.`,
      
      contact: `📧 ${formData.name} nous contacte pour ${formData.category} (priorité ${formData.priority}).
      ${formData.message ? `Demande: "${formData.message.substring(0, 120)}..."` : ''}
      À traiter ${this.getPriorityEmoji(formData.priority)}.`,
      
      volunteer: `🤝 ${formData.name} souhaite nous rejoindre comme bénévole.
      Compétences: ${formData.skills?.slice(0, 3).join(', ') || 'à préciser'}
      Motivation: "${formData.message?.substring(0, 80) || 'Engagement citoyen'}..."
      Expérience: ${formData.experience || 'à discuter'}.`,
      
      info: `📚 Demande d'information de ${formData.name} sur le thème "${formData.topic}".
      ${formData.message ? `Besoin précis: "${formData.message.substring(0, 100)}..."` : ''}
      Fiabilité demandée: ${formData.reliability || 'standard'}.`
    };
    
    return templates[missionId] || templates.contact;
  }
  
  private static getImpactLevel(amount: number): string {
    if (amount >= 500) return '**très important**';
    if (amount >= 100) return '**significatif**';
    if (amount >= 50) return '**utile**';
    return '**apprécié**';
  }
  
  private static getPriorityEmoji(priority: string): string {
    const priorityMap: Record<string, string> = {
      high: '🔴 URGENT',
      medium: '🟡 Sous 48h',
      low: '🟢 Cette semaine'
    };
    return priorityMap[priority] || '🟢 Cette semaine';
  }

  static generateFieldSuggestions(missionId: string, formData: any, fieldName?: string): string[] {
    const suggestions: Record<string, string[]> = {
      don: [
        '💡 Pensez à préciser si vous souhaitez un reçu fiscal',
        '🌟 Un don mensuel permet un soutien durable',
        '🎯 Précisez l\'utilisation souhaitée si applicable'
      ],
      contact: [
        '📧 Pour une réponse rapide, soyez précis',
        '⏰ Notre équipe répond sous 48h ouvrées',
        '🔗 Avez-vous consulté notre FAQ ?'
      ],
      volunteer: [
        '🤝 Mentionnez votre disponibilité précise',
        '🛠️ Décrivez une expérience concrète',
        '🎯 Qu\'est-ce qui vous motive chez nous ?'
      ],
      info: [
        '📚 Précisez le format souhaité',
        '🔍 Avez-vous besoin de sources particulières ?',
        '📅 Quand avez-vous besoin de ces informations ?'
      ]
    };
    
    return suggestions[missionId] || suggestions.contact;
  }
}