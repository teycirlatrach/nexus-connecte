export class SecurityGuard {
  private static lastSubmissionTime = 0;
  private static readonly SUBMISSION_COOLDOWN = 3000;
  
  static canSubmit(): { can: boolean; reason?: string } {
    const now = Date.now();
    const timeSinceLast = now - this.lastSubmissionTime;
    
    if (timeSinceLast < this.SUBMISSION_COOLDOWN) {
      return { 
        can: false, 
        reason: `Veuillez attendre ${Math.ceil((this.SUBMISSION_COOLDOWN - timeSinceLast) / 1000)} secondes` 
      };
    }
    
    this.lastSubmissionTime = now;
    return { can: true };
  }
  
  static generateCaptchaToken(): string {
    return `captcha_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  static sanitizeInput(input: string): string {
    return input
      .replace(/<[^>]*>/g, '')
      .replace(/[<>"'`]/g, '')
      .substring(0, 5000);
  }
}