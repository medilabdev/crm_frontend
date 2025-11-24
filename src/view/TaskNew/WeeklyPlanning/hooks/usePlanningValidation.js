import { useState, useCallback, useMemo } from 'react';
import { VALIDATION_RULES } from '../utils/constants';

/**
 * Hook for handling validation logic for all Weekly Planning forms.
 * Supports Plan Detail, Outside Detail, Week, and Day validations.
 */
export const usePlanningValidation = () => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // ------------------------------------------------------------
  // 🔧 State Reset / Utility Helpers
  // ------------------------------------------------------------
  const clearErrors = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  const clearFieldError = useCallback((fieldName) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  const touchField = useCallback((fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  }, []);

  // ------------------------------------------------------------
  // 🧩 Basic Validators
  // ------------------------------------------------------------
  const validateRequired = useCallback((value, fieldName) => {
    if (value === null || value === undefined || (typeof value === 'string' && value.trim().length === 0)) {
      return `${fieldName.replace(/_/g, ' ')} is required`;
    }
    return null;
  }, []);

  const validateTextLength = useCallback((value, fieldName, minLength = 0, maxLength = 1000) => {
    if (!value) return null;
    const length = String(value).trim().length;
    const fieldLabel = fieldName.replace(/_/g, ' ');
    if (length < minLength) return `${fieldLabel} must be at least ${minLength} characters`;
    if (length > maxLength) return `${fieldLabel} must not exceed ${maxLength} characters`;
    return null;
  }, []);

  const validateDate = useCallback((dateValue, fieldName) => {
    if (!dateValue) return null;
    const date = new Date(dateValue);
    if (isNaN(date.getTime()) || String(date) === 'Invalid Date') {
      return `${fieldName.replace(/_/g, ' ')} must be a valid date`;
    }
    return null;
  }, []);

  const validateDateRange = useCallback((startDate, endDate) => {
    if (!startDate || !endDate) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return 'Start date and end date must be valid dates';
    }
    if (start >= end) {
      return 'End date must be after start date';
    }
    return null;
  }, []);

  // ------------------------------------------------------------
  // 📅 Week Form Validation
  // ------------------------------------------------------------
  const validateWeekForm = useCallback((formData) => {
    const newErrors = {};

    if (!formData.week_number || formData.week_number < 1)
      newErrors.week_number = 'Week number must be a positive number';

    const startDateError = validateDate(formData.start_date, 'Start date');
    if (startDateError) newErrors.start_date = startDateError;

    const endDateError = validateDate(formData.end_date, 'End date');
    if (endDateError) newErrors.end_date = endDateError;

    if (!startDateError && !endDateError) {
      const rangeError = validateDateRange(formData.start_date, formData.end_date);
      if (rangeError) newErrors.end_date = rangeError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [validateDate, validateDateRange]);

  // ------------------------------------------------------------
  // 🗓️ Day Form Validation
  // ------------------------------------------------------------
  const validateDayForm = useCallback((formData) => {
    const newErrors = {};

    const dateError = validateDate(formData.day_date, 'Day date');
    if (dateError) newErrors.day_date = dateError;

    const nameError = validateRequired(formData.day_name, 'Day name');
    if (nameError) newErrors.day_name = nameError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [validateDate, validateRequired]);

  // ------------------------------------------------------------
  // 🧾 Planning Detail Form Validation (Inside Planning)
  // ------------------------------------------------------------
  const validatePlanningDetailForm = useCallback((formData) => {
    const newErrors = {};
    let fieldError;

    // --- Weekly plan text (REQUIRED)
    fieldError = validateRequired(formData.weekly_plan_text, 'Weekly plan text');
    if (fieldError) {
      newErrors.weekly_plan_text = fieldError;
    } else {
      fieldError = validateTextLength(
        formData.weekly_plan_text,
        'Weekly plan text',
        VALIDATION_RULES?.PLAN_TEXT?.MIN_LENGTH || 1,
        VALIDATION_RULES?.PLAN_TEXT?.MAX_LENGTH || 1000
      );
      if (fieldError) newErrors.weekly_plan_text = fieldError;
    }

    // --- Plan notes (OPTIONAL)
    fieldError = validateTextLength(
      formData.plan_notes,
      'Plan notes',
      0,
      VALIDATION_RULES?.NOTES?.MAX_LENGTH || 1000
    );
    if (fieldError) newErrors.plan_notes = fieldError;

    // --- Weekly report text (OPTIONAL)
    fieldError = validateTextLength(
      formData.weekly_report_text,
      'Weekly report text',
      0,
      VALIDATION_RULES?.PLAN_TEXT?.MAX_LENGTH || 1000
    );
    if (fieldError) newErrors.weekly_report_text = fieldError;

    // --- Report notes (OPTIONAL)
    fieldError = validateTextLength(
      formData.report_notes,
      'Report notes',
      0,
      VALIDATION_RULES?.NOTES?.MAX_LENGTH || 1000
    );
    if (fieldError) newErrors.report_notes = fieldError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [validateRequired, validateTextLength]);

  // ------------------------------------------------------------
  // 🌍 Outside Planning Form Validation
  // ------------------------------------------------------------
  const validateOutsidePlanningForm = useCallback((formData) => {
    const newErrors = {};
    let fieldError;

    // --- Activity text (REQUIRED)
    fieldError = validateRequired(formData.activity_text, 'Activity text');
    if (fieldError) {
      newErrors.activity_text = fieldError;
    } else {
      fieldError = validateTextLength(
        formData.activity_text,
        'Activity text',
        VALIDATION_RULES?.PLAN_TEXT?.MIN_LENGTH || 1,
        VALIDATION_RULES?.PLAN_TEXT?.MAX_LENGTH || 1000
      );
      if (fieldError) newErrors.activity_text = fieldError;
    }

    // --- Notes (OPTIONAL)
    fieldError = validateTextLength(
      formData.notes,
      'Notes',
      0,
      VALIDATION_RULES?.NOTES?.MAX_LENGTH || 1000
    );
    if (fieldError) newErrors.notes = fieldError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [validateRequired, validateTextLength]);

  // ------------------------------------------------------------
  // 🧠 Field-level Utilities
  // ------------------------------------------------------------
  const getFieldValidation = useCallback((fieldName) => {
    const hasError = !!errors[fieldName];
    const isTouched = !!touched[fieldName];
    return {
      isValid: !hasError,
      isInvalid: hasError && isTouched,
      error: errors[fieldName],
      isTouched,
    };
  }, [errors, touched]);

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);
  const getAllErrors = useMemo(() => ({ ...errors }), [errors]);

  const validateNewOption = useCallback((inputValue, fieldName = 'Option') => {
    if (!inputValue || inputValue.trim().length === 0)
      return `${fieldName} cannot be empty`;
    if (inputValue.trim().length < (VALIDATION_RULES?.NEW_OPTION?.MIN_LENGTH || 3))
      return `${fieldName} must be at least ${VALIDATION_RULES?.NEW_OPTION?.MIN_LENGTH || 3} characters`;
    if (inputValue.trim().length > (VALIDATION_RULES?.NEW_OPTION?.MAX_LENGTH || 500))
      return `${fieldName} must not exceed ${VALIDATION_RULES?.NEW_OPTION?.MAX_LENGTH || 500} characters`;
    return null;
  }, []);

  // ------------------------------------------------------------
  // 🧾 Final Return
  // ------------------------------------------------------------
  return {
    errors,
    touched,
    hasErrors,
    getAllErrors,
    clearErrors,
    clearFieldError,
    touchField,

    // Validators
    validateWeekForm,
    validateDayForm,
    validatePlanningDetailForm,
    validateOutsidePlanningForm,
    validateRequired,
    validateTextLength,
    validateDate,
    validateDateRange,
    validateNewOption,

    // Field-level accessor
    getFieldValidation,
  };
};
