/**
 * Planning Validation Hook
 * Custom hook for form validation and business rules validation
 */

import { useState, useCallback, useMemo } from 'react';
import { VALIDATION_RULES } from '../utils/constants';
import { formatDateForAPI } from '../utils/dateUtils';

/**
 * Hook for handling form validation with real-time feedback
 * @returns {Object} Validation functions and state
 */
export const usePlanningValidation = () => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  /**
   * Clear all errors
   */
  const clearErrors = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  /**
   * Clear specific field error
   */
  const clearFieldError = useCallback((fieldName) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  /**
   * Mark field as touched
   */
  const touchField = useCallback((fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  }, []);

  /**
   * Validate required field
   */
  const validateRequired = useCallback((value, fieldName) => {
    if (!value || (typeof value === 'string' && value.trim().length === 0)) {
      return `${fieldName} is required`;
    }
    return null;
  }, []);

  /**
   * Validate text length
   */
  const validateTextLength = useCallback((value, fieldName, minLength = 0, maxLength = 1000) => {
    if (!value) return null;
    
    const length = value.trim().length;
    
    if (length < minLength) {
      return `${fieldName} must be at least ${minLength} characters`;
    }
    
    if (length > maxLength) {
      return `${fieldName} must not exceed ${maxLength} characters`;
    }
    
    return null;
  }, []);

  /**
   * Validate date
   */
  const validateDate = useCallback((dateValue, fieldName) => {
    if (!dateValue) return null;
    
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) {
      return `${fieldName} must be a valid date`;
    }
    
    return null;
  }, []);

  /**
   * Validate date range
   */
  const validateDateRange = useCallback((startDate, endDate) => {
    if (!startDate || !endDate) return null;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start >= end) {
      return 'End date must be after start date';
    }
    
    return null;
  }, []);

  /**
   * Validate weekly planning basic info
   */
  const validateWeeklyPlanningForm = useCallback((formData) => {
    const newErrors = {};
    
    // Branch validation
    if (!formData.branch_uid) {
      newErrors.branch_uid = 'Branch is required';
    }
    
    // Weekly plan master validation
    if (!formData.weekly_plan_master_uid) {
      newErrors.weekly_plan_master_uid = 'Weekly plan master is required';
    }
    
    // Week start date validation
    const dateError = validateDate(formData.week_start_date, 'Week start date');
    if (dateError) {
      newErrors.week_start_date = dateError;
    }
    
    // Week name validation
    const weekNameError = validateTextLength(
      formData.week_name, 
      'Week name', 
      1, 
      VALIDATION_RULES.WEEK_NAME.MAX_LENGTH
    );
    if (weekNameError) {
      newErrors.week_name = weekNameError;
    }
    
    // Plan report validation (optional but has length limit)
    if (formData.plan_report) {
      const reportError = validateTextLength(
        formData.plan_report,
        'Plan report',
        0,
        VALIDATION_RULES.NOTES.MAX_LENGTH
      );
      if (reportError) {
        newErrors.plan_report = reportError;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [validateDate, validateTextLength]);

  /**
   * Validate week form
   */
  const validateWeekForm = useCallback((formData) => {
    const newErrors = {};
    
    // Week number validation
    if (!formData.week_number || formData.week_number < 1) {
      newErrors.week_number = 'Week number must be a positive number';
    }
    
    // Start date validation
    const startDateError = validateDate(formData.start_date, 'Start date');
    if (startDateError) {
      newErrors.start_date = startDateError;
    }
    
    // End date validation
    const endDateError = validateDate(formData.end_date, 'End date');
    if (endDateError) {
      newErrors.end_date = endDateError;
    }
    
    // Date range validation
    if (!startDateError && !endDateError) {
      const rangeError = validateDateRange(formData.start_date, formData.end_date);
      if (rangeError) {
        newErrors.date_range = rangeError;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [validateDate, validateDateRange]);

  /**
   * Validate day form
   */
  const validateDayForm = useCallback((formData) => {
    const newErrors = {};
    
    // Day date validation
    const dateError = validateDate(formData.day_date, 'Day date');
    if (dateError) {
      newErrors.day_date = dateError;
    }
    
    // Day name validation
    const nameError = validateRequired(formData.day_name, 'Day name');
    if (nameError) {
      newErrors.day_name = nameError;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [validateDate, validateRequired]);

  /**
   * Validate planning detail form
   */
  const validatePlanningDetailForm = useCallback((formData) => {
    const newErrors = {};
    
    // Weekly plan text validation (required)
    const planTextError = validateRequired(formData.weekly_plan_text, 'Planning text');
    if (planTextError) {
      newErrors.weekly_plan_text = planTextError;
    } else {
      const lengthError = validateTextLength(
        formData.weekly_plan_text,
        'Planning text',
        VALIDATION_RULES.PLAN_TEXT.MIN_LENGTH,
        VALIDATION_RULES.PLAN_TEXT.MAX_LENGTH
      );
      if (lengthError) {
        newErrors.weekly_plan_text = lengthError;
      }
    }
    
    // Plan notes validation (optional)
    if (formData.plan_notes) {
      const notesError = validateTextLength(
        formData.plan_notes,
        'Plan notes',
        0,
        VALIDATION_RULES.NOTES.MAX_LENGTH
      );
      if (notesError) {
        newErrors.plan_notes = notesError;
      }
    }
    
    // Weekly report text validation (optional)
    if (formData.weekly_report_text) {
      const reportError = validateTextLength(
        formData.weekly_report_text,
        'Weekly report',
        0,
        VALIDATION_RULES.PLAN_TEXT.MAX_LENGTH
      );
      if (reportError) {
        newErrors.weekly_report_text = reportError;
      }
    }
    
    // Report notes validation (optional)
    if (formData.report_notes) {
      const reportNotesError = validateTextLength(
        formData.report_notes,
        'Report notes',
        0,
        VALIDATION_RULES.NOTES.MAX_LENGTH
      );
      if (reportNotesError) {
        newErrors.report_notes = reportNotesError;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [validateRequired, validateTextLength]);

  /**
   * Validate outside planning detail form
   */
  const validateOutsidePlanningForm = useCallback((formData) => {
    const newErrors = {};
    
    // Activity text validation (required)
    const activityError = validateRequired(formData.activity_text, 'Activity text');
    if (activityError) {
      newErrors.activity_text = activityError;
    } else {
      const lengthError = validateTextLength(
        formData.activity_text,
        'Activity text',
        VALIDATION_RULES.PLAN_TEXT.MIN_LENGTH,
        VALIDATION_RULES.PLAN_TEXT.MAX_LENGTH
      );
      if (lengthError) {
        newErrors.activity_text = lengthError;
      }
    }
    
    // Notes validation (optional)
    if (formData.notes) {
      const notesError = validateTextLength(
        formData.notes,
        'Notes',
        0,
        VALIDATION_RULES.NOTES.MAX_LENGTH
      );
      if (notesError) {
        newErrors.notes = notesError;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [validateRequired, validateTextLength]);

  /**
   * Get validation status for a specific field
   */
  const getFieldValidation = useCallback((fieldName) => {
    const hasError = !!errors[fieldName];
    const isTouched = !!touched[fieldName];
    
    return {
      isValid: !hasError,
      isInvalid: hasError && isTouched,
      error: errors[fieldName],
      isTouched
    };
  }, [errors, touched]);

  /**
   * Check if form has any errors
   */
  const hasErrors = useMemo(() => {
    return Object.keys(errors).length > 0;
  }, [errors]);

  /**
   * Get all current errors
   */
  const getAllErrors = useMemo(() => {
    return { ...errors };
  }, [errors]);

  /**
   * Validate CreatableSelect new option
   */
  const validateNewOption = useCallback((inputValue, fieldName = 'Option') => {
    if (!inputValue || inputValue.trim().length === 0) {
      return `${fieldName} cannot be empty`;
    }
    
    if (inputValue.trim().length < 3) {
      return `${fieldName} must be at least 3 characters`;
    }
    
    if (inputValue.trim().length > 500) {
      return `${fieldName} must not exceed 500 characters`;
    }
    
    return null;
  }, []);

  return {
    // Validation state
    errors,
    touched,
    hasErrors,
    getAllErrors,
    
    // State management
    clearErrors,
    clearFieldError,
    touchField,
    
    // Form validators
    validateWeeklyPlanningForm,
    validateWeekForm,
    validateDayForm,
    validatePlanningDetailForm,
    validateOutsidePlanningForm,
    
    // Field validators
    validateRequired,
    validateTextLength,
    validateDate,
    validateDateRange,
    validateNewOption,
    
    // Helpers
    getFieldValidation
  };
};
