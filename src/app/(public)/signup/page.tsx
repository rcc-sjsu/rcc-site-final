'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import BackgroundGradient from '@/components/BackgroundGradient';
import { signupWithProfile } from '@/app/utils/authUtils/authActions';
import {
  yearOptions,
  majorOptions,
  mastersMajorOptions,
  minorOptions,
  graduationYearOptions,
  howHeardOptions,
  interestAreaOptions,
  membershipTypeOptions
} from './formOptions';

interface FormData {
  // Account Setup
  fullName: string;
  sjsuEmail: string;
  password: string;
  confirmPassword: string;
  
  // Academic Info
  year: string;
  major: string;
  minor: string;
  graduationYear: string;
  
  // Club Info
  howHeard: string;
  interestAreas: string[];
  membershipType: string;
  captcha: string;
}

const initialFormData: FormData = {
  fullName: '',
  sjsuEmail: '',
  password: '',
  confirmPassword: '',
  year: '',
  major: '',
  minor: '',
  graduationYear: '',
  howHeard: '',
  interestAreas: [],
  membershipType: '',
  captcha: ''
};

export default function SignupPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [requiresEmailConfirmation, setRequiresEmailConfirmation] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleInterestAreaChange = (area: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interestAreas: checked 
        ? [...prev.interestAreas, area]
        : prev.interestAreas.filter(a => a !== area)
    }));
  };

  const validateStep1 = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.sjsuEmail.trim()) {
      newErrors.sjsuEmail = 'SJSU email is required';
    } else if (!formData.sjsuEmail.includes('@sjsu.edu')) {
      newErrors.sjsuEmail = 'Please use your SJSU email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.year) newErrors.year = 'Year is required';
    if (!formData.major) newErrors.major = 'Major is required';
    if (!formData.graduationYear) newErrors.graduationYear = 'Graduation year is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.howHeard) newErrors.howHeard = 'Please tell us how you heard about the club';
    if (formData.interestAreas.length === 0) {
      newErrors.interestAreas = ['Please select at least one interest area'];
    }
    if (!formData.membershipType) newErrors.membershipType = 'Please select a membership type';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    let isValid = false;
    
    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
    }
    
    if (isValid) {
      if (currentStep < 3) {
        setCurrentStep(prev => prev + 1);
        setSubmitError(null);
      } else {
        // Handle form submission
        setIsSubmitting(true);
        setSubmitError(null);

        try {
          const result = await signupWithProfile({
            fullName: formData.fullName,
            sjsuEmail: formData.sjsuEmail,
            password: formData.password,
            year: formData.year,
            major: formData.major,
            minor: formData.minor,
            graduationYear: formData.graduationYear,
            howHeard: formData.howHeard,
            interestAreas: formData.interestAreas,
            membershipType: formData.membershipType,
          });

          if (result.success) {
            // Show success confirmation
            setShowSuccess(true);
            setRequiresEmailConfirmation(result.requiresEmailConfirmation || false);
            setIsSubmitting(false);
            
            // Auto-redirect after 3 seconds, or user can click button
            setTimeout(() => {
              if (result.requiresEmailConfirmation) {
                router.push('/check-email');
              } else {
                router.push('/');
              }
            }, 4000);
          } else {
            setSubmitError(result.error || 'An error occurred during signup');
            setIsSubmitting(false);
          }
        } catch (error) {
          console.error('Signup error:', error);
          setSubmitError('An unexpected error occurred. Please try again.');
          setIsSubmitting(false);
        }
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderProgressIndicator = () => (
    <div className={styles.progressContainer}>
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className={`${styles.progressDot} ${
            step <= currentStep ? styles.progressDotActive : styles.progressDotInactive
          }`}
        />
      ))}
    </div>
  );

  const renderAccountSetup = () => (
    <div className={styles.formStep}>
      <h2 className={styles.stepTitle}>Account Setup</h2>
      
      <div className={styles.inputGroup}>
        <label htmlFor="fullName" className={styles.label}>Full Name</label>
        <input
          id="fullName"
          type="text"
          placeholder="Enter Full Name..."
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
        />
        {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="sjsuEmail" className={styles.label}>SJSU Email</label>
        <input
          id="sjsuEmail"
          type="email"
          placeholder="Enter SJSU Email..."
          value={formData.sjsuEmail}
          onChange={(e) => handleInputChange('sjsuEmail', e.target.value)}
          className={`${styles.input} ${errors.sjsuEmail ? styles.inputError : ''}`}
        />
        {errors.sjsuEmail && <span className={styles.errorText}>{errors.sjsuEmail}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="password" className={styles.label}>Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter Password..."
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
        />
        {errors.password && <span className={styles.errorText}>{errors.password}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Re-Enter Password..."
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
        />
        {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
      </div>
    </div>
  );

  const renderAcademicInfo = () => {
    // Determine which major options to show based on year selection
    const isGraduate = formData.year === 'Graduate';
    const currentMajorOptions = isGraduate ? mastersMajorOptions : majorOptions;
    
    return (
    <div className={styles.formStep}>
      <h2 className={styles.stepTitle}>Academic Info</h2>
      
      <div className={styles.inputGroup}>
        <label htmlFor="year" className={styles.label}>Year</label>
        <select
          id="year"
          value={formData.year}
            onChange={(e) => {
              handleInputChange('year', e.target.value);
              // Clear major when year changes to avoid mismatch
              if (formData.major) {
                handleInputChange('major', '');
              }
            }}
          className={`${styles.select} ${errors.year ? styles.inputError : ''}`}
        >
          <option value="">Select Year...</option>
          {yearOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.year && <span className={styles.errorText}>{errors.year}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="major" className={styles.label}>Major</label>
          <select
          id="major"
          value={formData.major}
          onChange={(e) => handleInputChange('major', e.target.value)}
            className={`${styles.select} ${errors.major ? styles.inputError : ''}`}
          >
            <option value="">Select Major...</option>
            {currentMajorOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        {errors.major && <span className={styles.errorText}>{errors.major}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="minor" className={styles.label}>Minor (Optional)</label>
          <select
          id="minor"
          value={formData.minor}
          onChange={(e) => handleInputChange('minor', e.target.value)}
            className={styles.select}
          >
            <option value="">Select Minor...</option>
            {minorOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="graduationYear" className={styles.label}>Graduation Year</label>
          <select
          id="graduationYear"
          value={formData.graduationYear}
          onChange={(e) => handleInputChange('graduationYear', e.target.value)}
            className={`${styles.select} ${errors.graduationYear ? styles.inputError : ''}`}
          >
            <option value="">Select Graduation Year...</option>
            {graduationYearOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        {errors.graduationYear && <span className={styles.errorText}>{errors.graduationYear}</span>}
      </div>
    </div>
  );
  };

  const renderClubInfo = () => (
    <div className={styles.formStep}>
      <h2 className={styles.stepTitle}>Club Info</h2>
      
      <div className={styles.inputGroup}>
        <label htmlFor="howHeard" className={styles.label}>How did you hear about the club?</label>
        <select
          id="howHeard"
          value={formData.howHeard}
          onChange={(e) => handleInputChange('howHeard', e.target.value)}
          className={`${styles.select} ${errors.howHeard ? styles.inputError : ''}`}
        >
          <option value="">Select option...</option>
          {howHeardOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.howHeard && <span className={styles.errorText}>{errors.howHeard}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Interest Areas</label>
        <div className={styles.checkboxGrid}>
          {interestAreaOptions.map(area => (
            <label key={area} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.interestAreas.includes(area)}
                onChange={(e) => handleInterestAreaChange(area, e.target.checked)}
                className={styles.checkbox}
              />
              {area}
            </label>
          ))}
        </div>
        {errors.interestAreas && <span className={styles.errorText}>{errors.interestAreas[0]}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="membershipType" className={styles.label}>Membership Type</label>
        <select
          id="membershipType"
          value={formData.membershipType}
          onChange={(e) => handleInputChange('membershipType', e.target.value)}
          className={`${styles.select} ${errors.membershipType ? styles.inputError : ''}`}
        >
          <option value="">Select membership type...</option>
          {membershipTypeOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.membershipType && <span className={styles.errorText}>{errors.membershipType}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="captcha" className={styles.label}>Captcha</label>
        <div className={styles.captchaContainer}>
          <span className={styles.captchaText}>Please verify you are human</span>
          <input
            id="captcha"
            type="text"
            placeholder="Enter captcha..."
            value={formData.captcha}
            onChange={(e) => handleInputChange('captcha', e.target.value)}
            className={styles.input}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <BackgroundGradient className={styles.backgroundGradient} color="blue" />
      
      <div className={styles.content}>
        <div className={styles.leftSection}>
          <div className={styles.header}>
            <h1 className={styles.title}>WELCOME TO RCC!</h1>
            <p className={styles.subtitle}>
              Create your profile to complete your membership registration.
            </p>
          </div>

          {renderProgressIndicator()}

          <div className={styles.formContainer}>
            {currentStep === 1 && renderAccountSetup()}
            {currentStep === 2 && renderAcademicInfo()}
            {currentStep === 3 && renderClubInfo()}
          </div>

          {submitError && (
            <div className={styles.errorMessage}>
              {submitError}
            </div>
          )}

          <div className={styles.buttonContainer}>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className={styles.backButton}
                disabled={isSubmitting}
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className={styles.nextButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : currentStep === 3 ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>

        <div className={styles.rightSection}>
          {/* If you need to change the images in the polaroids or the description, make the changes in the figma and export and replace the new image here */}
          <img src="/images/signuppagepolaroids.png" alt="Signup Page Polaroids" style={{ marginLeft: '9rem'}}/>
        </div>
      </div>

      {/* Success Confirmation Modal */}
      {showSuccess && (
        <div className={styles.successOverlay}>
          <div className={styles.successModal}>
            <div className={styles.successIcon}>✓</div>
            <h2 className={styles.successTitle}>Welcome to RCC!</h2>
            <p className={styles.successMessage}>
              {requiresEmailConfirmation
                ? `Your account has been created successfully! Please check ${formData.sjsuEmail} to verify your email address.`
                : 'Your account has been created successfully! You can now access all RCC features.'}
            </p>
            <p className={styles.successSubtext}>
              Redirecting you {requiresEmailConfirmation ? 'to email confirmation...' : 'to the home page...'}
            </p>
            <button
              onClick={() => {
                if (requiresEmailConfirmation) {
                  router.push('/check-email');
                } else {
                  router.push('/');
                }
              }}
              className={styles.successButton}
            >
              {requiresEmailConfirmation ? 'Go to Email Confirmation' : 'Go to Home'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
