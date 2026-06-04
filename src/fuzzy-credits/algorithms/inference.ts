import type {
  DebtFuzzySet,
  IncomeFuzzySet,
  SeniorityFuzzySet,
  HistoryFuzzySet,
  InferenceResult,
} from '../types'

// Apply fuzzy inference rules (Mamdani method)
export function infer(
  debt: DebtFuzzySet,
  income: IncomeFuzzySet,
  seniority: SeniorityFuzzySet,
  history: HistoryFuzzySet,
): InferenceResult {
  let approve = 0
  let review = 0
  let reject = 0
  const activeRules: string[] = []

  // ========== APPROVAL RULES ==========

  // R1: IF income HIGH AND debt LOW THEN APPROVE
  const r1 = Math.min(income.high, debt.low)
  if (r1 > 0) {
    approve = Math.max(approve, r1)
    activeRules.push('R1')
  }

  // R2: IF history EXCELLENT AND debt MODERATE THEN APPROVE
  const r2 = Math.min(history.excellent, debt.moderate)
  if (r2 > 0.3) {
    approve = Math.max(approve, r2)
    activeRules.push('R2')
  }

  // R3: IF income VERY HIGH THEN APPROVE
  if (income.veryHigh > 0.6) {
    approve = Math.max(approve, income.veryHigh)
    activeRules.push('R3')
  }

  // R10: IF history GOOD AND debt MODERATE THEN APPROVE
  const r10 = Math.min(history.good, debt.moderate)
  if (r10 > 0.4) {
    approve = Math.max(approve, r10)
    activeRules.push('R10')
  }

  // R11: IF seniority SENIOR AND income MEDIUM THEN APPROVE
  const r11 = Math.min(seniority.senior, income.medium)
  if (r11 > 0.3) {
    approve = Math.max(approve, r11)
    activeRules.push('R11')
  }

  // ========== REJECTION RULES ==========

  // R4: IF debt CRITICAL THEN REJECT
  if (debt.critical > 0) {
    reject = Math.max(reject, debt.critical)
    activeRules.push('R4')
  }

  // R5: IF debt HIGH AND history BAD THEN REJECT
  const r5 = Math.min(debt.high, history.bad)
  if (r5 > 0) {
    reject = Math.max(reject, r5)
    activeRules.push('R5')
  }

  // R6: IF seniority JUNIOR AND income LOW THEN REJECT
  const r6 = Math.min(seniority.junior, income.low)
  if (r6 > 0.5) {
    reject = Math.max(reject, r6)
    activeRules.push('R6')
  }

  // ========== REVIEW RULES ==========

  // R7: IF history BAD AND debt MODERATE THEN REVIEW
  const r7 = Math.min(history.bad, debt.moderate)
  if (r7 > 0) {
    review = Math.max(review, r7)
    activeRules.push('R7')
  }

  // R8: IF debt MODERATE AND seniority MEDIUM THEN REVIEW
  const r8 = Math.min(debt.moderate, seniority.medium)
  if (r8 > 0) {
    review = Math.max(review, r8)
    activeRules.push('R8')
  }

  // R9: IF debt HIGH AND income HIGH THEN REVIEW
  const r9 = Math.min(debt.high, income.high)
  if (r9 > 0) {
    review = Math.max(review, r9)
    activeRules.push('R9')
  }

  return { approve, review, reject, activeRules }
}
