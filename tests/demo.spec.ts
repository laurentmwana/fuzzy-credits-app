import { describe, expect, it } from 'vitest'

import { FuzzyCreditEngine } from '#/fuzzy-credits'
import { fuzzifyDebt, fuzzifyIncome } from '#/fuzzy-credits'

describe('FuzzyCreditEngine', () => {
  const engine = new FuzzyCreditEngine()

  it('should approve a good credit profile', () => {
    const result = engine.evaluate({
      income: 3200,
      debtRatio: 28,
      seniority: 5,
      historyScore: 72,
      amount: 25000,
    })

    expect(result.decision).toBe('APPROVE')
    expect(result.score).toBeGreaterThan(60)
    expect(result.confidence).toBeGreaterThan(0)
  })

  it('should reject a bad credit profile', () => {
    const result = engine.evaluate({
      income: 1500,
      debtRatio: 55,
      seniority: 0.5,
      historyScore: 30,
      amount: 20000,
    })

    expect(result.decision).toBe('REJECT')
    expect(result.score).toBeLessThan(40)
  })

  it('should request review for ambiguous profile', () => {
    const result = engine.evaluate({
      income: 2800,
      debtRatio: 42,
      seniority: 2,
      historyScore: 60,
      amount: 120000,
    })

    expect(result.decision).toBe('REVIEW')
    expect(result.activeRules.length).toBeGreaterThan(0)
  })

  it('should fuzzify debt ratio correctly', () => {
    const fuzzy = fuzzifyDebt(42)

    expect(fuzzy.low).toBe(0)
    expect(fuzzy.moderate).toBeGreaterThan(0.5)
    expect(fuzzy.moderate).toBeLessThan(0.6)
    expect(fuzzy.high).toBe(0)
    expect(fuzzy.critical).toBe(0)
  })

  it('should fuzzify income correctly', () => {
    const fuzzy = fuzzifyIncome(3500)

    expect(fuzzy.low).toBe(0)
    expect(fuzzy.medium).toBe(0)
    expect(fuzzy.high).toBeGreaterThan(0.2)
    expect(fuzzy.veryHigh).toBe(0)
  })
})
