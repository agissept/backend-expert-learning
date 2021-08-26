import MathBasic from './MathBasic'

class FigureCalculator {
    private mathBasic: typeof MathBasic;

    constructor (mathBasic: any) {
      this.mathBasic = mathBasic
    }

    calculateRectanglePerimeter (...args: Array<any>) {
      if (args.length !== 2) {
        throw new Error('fungsi hanya menerima dua parameter')
      }

      const [length, width] = args

      if (typeof length !== 'number' || typeof width !== 'number') {
        throw new Error('fungsi hanya menerima parameter number')
      }

      return this.mathBasic.multiply(2, this.mathBasic.add(length, width))
    }

    calculateRectangleArea (...args: Array<any>) {
      if (args.length !== 2) {
        throw new Error('fungsi hanya menerima dua parameter')
      }

      const [length, width] = args

      if (typeof length !== 'number' || typeof width !== 'number') {
        throw new Error('fungsi hanya menerima parameter number')
      }

      return this.mathBasic.multiply(length, width)
    }

    calculateTrianglePerimeter (...args: Array<any>) {
      if (args.length !== 3) {
        throw new Error('fungsi hanya menerima tiga parameter')
      }

      const [sideA, sideB, base] = args

      if (typeof sideA !== 'number' || typeof sideB !== 'number' || typeof base !== 'number') {
        throw new Error('fungsi hanya menerima parameter number')
      }

      return this.mathBasic.add(this.mathBasic.add(sideA, sideB), base)
    }

    calculateTriangleArea (...args: Array<any>) {
      if (args.length !== 2) {
        throw new Error('fungsi hanya menerima dua parameter')
      }

      const [base, height] = args

      if (typeof base !== 'number' || typeof height !== 'number') {
        throw new Error('fungsi hanya menerima parameter number')
      }

      return this.mathBasic.divide(this.mathBasic.multiply(base, height), 2)
    }
}

export default FigureCalculator
