/**
 * Authentication validation utilities
 */

export type ValidationResult = {
  isValid: boolean;
  error?: string;
};

/**
 * Validates email format
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || !email.trim()) {
    return { isValid: false, error: 'auth.validation.emailRequired' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { isValid: false, error: 'auth.validation.emailInvalid' };
  }

  return { isValid: true };
}

/**
 * Validates password
 */
export function validatePassword(password: string, minLength: number = 6): ValidationResult {
  if (!password || !password.trim()) {
    return { isValid: false, error: 'auth.validation.passwordRequired' };
  }

  if (password.length < minLength) {
    return { isValid: false, error: 'auth.validation.passwordMinLength' };
  }

  return { isValid: true };
}

/**
 * Validates sign up form (email + password)
 */
export function validateSignUp(email: string, password: string): ValidationResult {
  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    return emailValidation;
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    return passwordValidation;
  }

  return { isValid: true };
}

/**
 * Validates sign in form (email + password)
 */
export function validateSignIn(email: string, password: string): ValidationResult {
  if (!email || !email.trim()) {
    return { isValid: false, error: 'auth.validation.allFieldsRequired' };
  }

  if (!password || !password.trim()) {
    return { isValid: false, error: 'auth.validation.allFieldsRequired' };
  }

  return { isValid: true };
}
