import type { InferenceResult, Decision } from '../types'

// Convert fuzzy inference results to crisp decision
export function defuzzify(result: InferenceResult): {
  decision: Decision
  score: number
  confidence: number
} {
  const { approve, review, reject } = result

  // Find highest activation degree
  let maxDegree = Math.max(approve, review, reject)
  let decision: Decision = 'REVIEW'

  // Select decision with highest degree
  if (reject === maxDegree && reject > 0) {
    decision = 'REJECT'
  } else if (approve === maxDegree && approve > 0) {
    decision = 'APPROVE'
  } else if (review === maxDegree && review > 0) {
    decision = 'REVIEW'
  }

  // Calculate weighted score (centroid method simplified)
  // APPROVE = 85 points, REVIEW = 50 points, REJECT = 20 points
  const totalWeight = approve + review + reject
  const score =
    totalWeight > 0
      ? Math.round((approve * 85 + review * 50 + reject * 20) / totalWeight)
      : 50 // Neutral score if no rules activated

  return {
    decision,
    score,
    confidence: maxDegree,
  }
}
