import type { ClientData, DecisionOutput } from './types'
import {
  fuzzifyDebt,
  fuzzifyIncome,
  fuzzifySeniority,
  fuzzifyHistory,
} from './algorithms/fuzzification'
import { infer } from './algorithms/inference'
import { defuzzify } from './algorithms/defuzzification'

// Main fuzzy credit evaluation engine
export class FuzzyCreditEngine {
  // Evaluate client credit request
  evaluate(client: ClientData): DecisionOutput {
    // Step 1: Fuzzification - convert crisp values to fuzzy sets
    const fuzzyDebt = fuzzifyDebt(client.debtRatio)
    const fuzzyIncome = fuzzifyIncome(client.income)
    const fuzzySeniority = fuzzifySeniority(client.seniority)
    const fuzzyHistory = fuzzifyHistory(client.historyScore)

    // Step 2: Inference - apply fuzzy rules
    const inferenceResult = infer(
      fuzzyDebt,
      fuzzyIncome,
      fuzzySeniority,
      fuzzyHistory,
    )

    // Step 3: Defuzzification - get crisp decision
    const { decision, score, confidence } = defuzzify(inferenceResult)

    // Step 4: Generate human-readable justification
    const justification = this.generateJustification(
      decision,
      client,
      inferenceResult,
    )

    return {
      score,
      decision,
      confidence,
      justification,
      activeRules: inferenceResult.activeRules,
      fuzzySets: {
        debt: fuzzyDebt,
        income: fuzzyIncome,
        seniority: fuzzySeniority,
        history: fuzzyHistory,
      },
    }
  }

  // Generate justification text based on decision
  private generateJustification(
    decision: string,
    client: ClientData,
    inference: { approve: number; review: number; reject: number },
  ): string {
    if (decision === 'REJECT') {
      if (client.debtRatio > 65) {
        return `REJECTED: Critical debt ratio (${client.debtRatio}%)`
      }
      if (client.historyScore < 40) {
        return `REJECTED: Poor credit history (${client.historyScore}/100) with high debt`
      }
      return `REJECTED: Risk profile too high (debt ${client.debtRatio}%, history ${client.historyScore}/100)`
    }

    if (decision === 'APPROVE') {
      return `APPROVED: Income ${client.income}€, debt ${client.debtRatio}%, history ${client.historyScore}/100`
    }

    const approvePercent = Math.round(inference.approve * 100)
    const rejectPercent = Math.round(inference.reject * 100)
    return `MANUAL REVIEW NEEDED: Ambiguous case (approve:${approvePercent}%, reject:${rejectPercent}%)`
  }
}
