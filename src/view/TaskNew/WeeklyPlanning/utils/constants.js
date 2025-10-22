/**
 * Weekly Planning Constants
 * Centralized configuration and constants for the Weekly Planning feature
 */

// API Endpoints
export const API_ENDPOINTS = {
  WEEKLY_PLANNING: {
    BASE: '/weekly-planning',
    BRANCHES: '/weekly-planning/branches',
    PLAN_MASTERS: '/weekly-planning/weekly-plan-masters',
    PLANNINGS: '/weekly-planning/plannings',
    WEEKS: (planningUid) => `/weekly-planning/plannings/${planningUid}/weeks`,
    DAYS: (planningUid, weekUid) => `/weekly-planning/plannings/${planningUid}/weeks/${weekUid}/days`,
    DETAILS: (planningUid, weekUid, dayUid) => `/weekly-planning/plannings/${planningUid}/weeks/${weekUid}/days/${dayUid}/details`,
    OUTSIDE_DETAILS: (planningUid, weekUid, dayUid) => `/weekly-planning/plannings/${planningUid}/weeks/${weekUid}/days/${dayUid}/outside-details`,
    REPORT_SUGGESTIONS: '/weekly-planning/report-suggestions'
  }
};

// Planning Status (Keep simple - always editable)
export const PLANNING_STATUS = {
  DRAFT: 'draft'  // Default status, fully editable CRUD
};

// Day Names (Indonesian)
export const DAY_NAMES = [
  'Senin',
  'Selasa', 
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
  'Minggu'
];

// Form Validation Rules
export const VALIDATION_RULES = {
  PLAN_TEXT: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 1000
  },
  NOTES: {
    MAX_LENGTH: 1000
  },
  WEEK_NAME: {
    MAX_LENGTH: 100
  }
};

// UI Constants
export const UI_CONSTANTS = {
  ITEMS_PER_PAGE: 15,
  MODAL_SIZES: {
    SMALL: 'sm',
    MEDIUM: 'md', 
    LARGE: 'lg',
    EXTRA_LARGE: 'xl'
  },
  TOAST_DURATION: 3000
};

// Calculation Thresholds (for performance indicators)
export const CALCULATION_THRESHOLDS = {
  HIGH_PERFORMANCE: 80,
  MEDIUM_PERFORMANCE: 60,
  LOW_PERFORMANCE: 40
};

// Default Values
export const DEFAULT_VALUES = {
  WEEK_START_HOUR: 8,
  WEEK_END_HOUR: 17,
  DEFAULT_BRANCH: null,
  DEFAULT_PLANNING_STATUS: PLANNING_STATUS.DRAFT
};
