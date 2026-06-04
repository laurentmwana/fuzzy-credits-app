// Input data from client
export interface ClientData {
  income: number // Monthly income in EUR
  debtRatio: number // Debt ratio in % (0-100)
  seniority: number // Professional seniority in years
  historyScore: number // Credit history score (0-100)
  amount: number // Requested loan amount in EUR
  activeDebts?: number // Number of active debts (optional)
  totalDebtOutstanding?: number // Total outstanding debt in EUR (optional)
}

// Final decision types
export type Decision = 'APPROVE' | 'REVIEW' | 'REJECT'

// Output structure
export interface DecisionOutput {
  score: number // Final score (0-100)
  decision: Decision // Final decision
  confidence: number // Confidence level (0-1)
  justification: string // Textual justification
  activeRules: string[] // Activated fuzzy rules
  fuzzySets: {
    debt: DebtFuzzySet
    income: IncomeFuzzySet
    seniority: SeniorityFuzzySet
    history: HistoryFuzzySet
  }
}

// Fuzzy sets for debt ratio
export interface DebtFuzzySet {
  low: number // 0-35%
  moderate: number // 35-50%
  high: number // 50-65%
  critical: number // 65%+
}

// Fuzzy sets for income
export interface IncomeFuzzySet {
  low: number // <1500€
  medium: number // 1500-3000€
  high: number // 3000-5000€
  veryHigh: number // >5000€
}

// Fuzzy sets for seniority
export interface SeniorityFuzzySet {
  junior: number // <1 year
  medium: number // 1-3 years
  confirmed: number // 3-7 years
  senior: number // 7+ years
}

// Fuzzy sets for history score
export interface HistoryFuzzySet {
  bad: number // 0-40
  medium: number // 40-60
  good: number // 60-80
  excellent: number // 80-100
}

// Inference result
export interface InferenceResult {
  approve: number // Approval degree (0-1)
  review: number // Review degree (0-1)
  reject: number // Rejection degree (0-1)
  activeRules: string[] // Activated rules list
}
