import type {
  DebtFuzzySet,
  IncomeFuzzySet,
  SeniorityFuzzySet,
  HistoryFuzzySet,
} from '../types'

// Convert precise debt ratio to fuzzy membership degrees
export function fuzzifyDebt(rate: number): DebtFuzzySet {
  return {
    // Low: decreasing linear from 0 to 35
    low: Math.max(0, Math.min(1, (35 - rate) / 35)),

    // Moderate: triangular between 35 and 50
    moderate: Math.max(
      0,
      Math.min(1, rate <= 35 ? rate / 35 : rate >= 50 ? 0 : (50 - rate) / 15),
    ),

    // High: increasing from 50 to 65
    high: Math.max(
      0,
      Math.min(1, rate <= 50 ? 0 : rate >= 65 ? 1 : (rate - 50) / 15),
    ),

    // Critical: increasing linear from 65
    critical: Math.max(0, Math.min(1, (rate - 65) / 35)),
  }
}

// Convert precise income to fuzzy membership degrees
export function fuzzifyIncome(income: number): IncomeFuzzySet {
  return {
    // Low: decreasing from 0 to 1500
    low: Math.max(0, Math.min(1, (1500 - income) / 1500)),

    // Medium: triangular between 1500 and 3000
    medium: Math.max(
      0,
      Math.min(
        1,
        income <= 1500
          ? income / 1500
          : income >= 3000
            ? 0
            : (3000 - income) / 1500,
      ),
    ),

    // High: increasing from 3000 to 5000
    high: Math.max(
      0,
      Math.min(
        1,
        income <= 3000 ? 0 : income >= 5000 ? 1 : (income - 3000) / 2000,
      ),
    ),

    // Very high: increasing from 5000
    veryHigh: Math.max(0, Math.min(1, (income - 5000) / 3000)),
  }
}

/**
 * Convert precise seniority to fuzzy membership degrees
 * @param years
 * @returns
 */
export function fuzzifySeniority(years: number): SeniorityFuzzySet {
  return {
    // Junior: decreasing from 0 to 1
    junior: Math.max(0, Math.min(1, (1 - years) / 1)),

    // Medium: triangular between 1 and 3
    medium: Math.max(
      0,
      Math.min(1, years <= 1 ? years / 1 : years >= 3 ? 0 : (3 - years) / 2),
    ),

    // Confirmed: triangular between 3 and 7
    confirmed: Math.max(
      0,
      Math.min(
        1,
        years <= 3 ? (years - 3) / 4 : years >= 7 ? 0 : (7 - years) / 4,
      ),
    ),

    // Senior: increasing from 7
    senior: Math.max(0, Math.min(1, (years - 7) / 3)),
  }
}

/**
 * Convert precise history score to fuzzy membership degrees
 * @param score
 * @returns
 */
export function fuzzifyHistory(score: number): HistoryFuzzySet {
  return {
    // Bad: decreasing from 0 to 40
    bad: Math.max(0, Math.min(1, (40 - score) / 40)),

    // Medium: triangular between 40 and 60
    medium: Math.max(
      0,
      Math.min(
        1,
        score <= 40 ? score / 40 : score >= 60 ? 0 : (60 - score) / 20,
      ),
    ),

    // Good: triangular between 60 and 80
    good: Math.max(
      0,
      Math.min(
        1,
        score <= 60 ? (score - 60) / 20 : score >= 80 ? 0 : (80 - score) / 20,
      ),
    ),

    // Excellent: increasing from 80
    excellent: Math.max(0, Math.min(1, (score - 80) / 20)),
  }
}
