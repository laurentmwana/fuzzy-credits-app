export { FuzzyCreditEngine } from './engine'
export type {
  ClientData,
  DecisionOutput,
  Decision,
  DebtFuzzySet,
  IncomeFuzzySet,
  SeniorityFuzzySet,
  HistoryFuzzySet,
} from './types'

// Algorithm exports (for advanced usage)
export {
  fuzzifyDebt,
  fuzzifyIncome,
  fuzzifySeniority,
  fuzzifyHistory,
} from './algorithms/fuzzification'

export { infer } from './algorithms/inference'
export { defuzzify } from './algorithms/defuzzification'
