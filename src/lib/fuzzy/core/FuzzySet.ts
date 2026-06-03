/**
 * FuzzySet - Defines a fuzzy set with triangular or trapezoidal membership function
 * 
 * A fuzzy set is a shape that determines how much a value belongs to a category
 * Example: "Revenu Moyen" (Average Income) = trapèze (1500, 2500, 3500, 4500)
 */

export type MembershipShape = 'triangle' | 'trapezoid'

export interface FuzzySetConfig {
  name: string
  shape: MembershipShape
  points: [number, number, number] | [number, number, number, number]
}

export class FuzzySet {
  readonly name: string
  readonly shape: MembershipShape
  readonly a: number // First point
  readonly b: number // Peak left (or left plateau)
  readonly c: number // Peak right (or right plateau)
  readonly d?: number // Fourth point (trapezoid only)

  constructor(config: FuzzySetConfig) {
    this.name = config.name
    this.shape = config.shape

    if (config.shape === 'triangle') {
      if (config.points.length !== 3) {
        throw new Error(`Triangle requires 3 points, got ${config.points.length}`)
      }
      [this.a, this.b, this.c] = config.points
    } else if (config.shape === 'trapezoid') {
      if (config.points.length !== 4) {
        throw new Error(`Trapezoid requires 4 points, got ${config.points.length}`)
      }
      [this.a, this.b, this.c, this.d] = config.points
    } else {
      throw new Error(`Unknown shape: ${config.shape}`)
    }

    // Validate that points are in ascending order
    const pts = config.points.sort((x, y) => x - y)
    if (JSON.stringify(pts) !== JSON.stringify(config.points)) {
      throw new Error(`Points must be in ascending order: ${config.points}`)
    }
  }

  /**
   * Calculate the membership degree of a value in this fuzzy set
   * Returns a value between 0 and 1
   * 
   * @param x - The value to evaluate
   * @returns Membership degree (0 = not member, 1 = full member, 0-1 = partial)
   */
  membership(x: number): number {
    if (this.shape === 'triangle') {
      return this.membershipTriangle(x)
    } else {
      return this.membershipTrapezoid(x)
    }
  }

  /**
   * Triangle membership function
   * Points: (a, b, c)
   * - a: left slope starts
   * - b: peak (degree = 1)
   * - c: right slope ends
   */
  private membershipTriangle(x: number): number {
    if (x <= this.a || x >= this.c) {
      return 0
    }

    if (x <= this.b) {
      // Left slope: rise from 0 to 1
      return (x - this.a) / (this.b - this.a)
    } else {
      // Right slope: fall from 1 to 0
      return (this.c - x) / (this.c - this.b)
    }
  }

  /**
   * Trapezoid membership function
   * Points: (a, b, c, d)
   * - a: left slope starts
   * - b: left plateau (degree = 1)
   * - c: right plateau (degree = 1)
   * - d: right slope ends
   */
  private membershipTrapezoid(x: number): number {
    if (!this.d) {
      throw new Error('Trapezoid requires d point')
    }

    if (x <= this.a || x >= this.d) {
      return 0
    }

    if (x <= this.b) {
      // Left slope: rise from 0 to 1
      return (x - this.a) / (this.b - this.a)
    }

    if (x <= this.c) {
      // Plateau: stay at 1
      return 1
    }

    // Right slope: fall from 1 to 0
    return (this.d - x) / (this.d - this.c)
  }

  /**
   * Get the alpha-cut (set of values with membership >= alpha)
   * Useful for visualization and analysis
   */
  alphaCut(alpha: number): [number, number] | null {
    if (alpha < 0 || alpha > 1) {
      return null
    }

    if (alpha === 0) {
      return this.shape === 'triangle' 
        ? [this.a, this.c]
        : [this.a, this.d!]
    }

    if (this.shape === 'triangle') {
      const leftBound = this.a + alpha * (this.b - this.a)
      const rightBound = this.c - alpha * (this.c - this.b)
      return [leftBound, rightBound]
    } else {
      if (!this.d) throw new Error('Trapezoid requires d point')
      
      const leftBound = this.a + alpha * (this.b - this.a)
      const rightBound = this.d - alpha * (this.d - this.c)
      return [leftBound, rightBound]
    }
  }

  /**
   * Get key points for visualization
   */
  getPoints(): Array<[number, number]> {
    if (this.shape === 'triangle') {
      return [
        [this.a, 0],
        [this.b, 1],
        [this.c, 0],
      ]
    } else {
      if (!this.d) throw new Error('Trapezoid requires d point')
      return [
        [this.a, 0],
        [this.b, 1],
        [this.c, 1],
        [this.d, 0],
      ]
    }
  }
}
