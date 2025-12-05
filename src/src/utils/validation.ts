export const validateEmail = (email: string): string => {
  if (!email) return 'Email requis';
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) ? '' : 'Email invalide';
};

export const validateAmount = (amount: any): string => {
  if (amount === undefined || amount === null || amount === '') return 'Montant requis';
  const num = Number(amount);
  if (isNaN(num)) return 'Montant invalide';
  if (num < 1) return 'Minimum 1€';
  if (num > 10000) return 'Maximum 10 000€';
  return '';
};

export const validateRequired = (value: any, message = 'Ce champ est requis'): string => {
  if (value === undefined || value === null || value === '') return message;
  if (Array.isArray(value) && value.length === 0) return message;
  return '';
};

export const validateSkills = (skills: string[]): string => {
  if (!skills || skills.length === 0) return 'Au moins une compétence requise';
  if (skills.length > 10) return 'Maximum 10 compétences';
  return '';
};