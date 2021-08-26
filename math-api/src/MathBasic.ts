const MathBasic = {
  add: (...args: Array < any >): number => {
    if (args.length !== 2) {
      throw new Error('fungsi add hanya menerima 2 parameter')
    }

    const [a, b] = args

    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('fungsi hanya bisa menerima parameter number')
    }

    return a + b
  },
  substract: (...args: Array<any>) => {
    if (args.length !== 2) {
      throw new Error('fungsi add hanya menerima 2 parameter')
    }

    const [a, b] = args

    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('fungsi hanya bisa menerima parameter number')
    }

    return a - b
  },
  multiply: (...args: Array<any>) => {
    if (args.length !== 2) {
      throw new Error('fungsi add hanya menerima 2 parameter')
    }

    const [a, b] = args

    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('fungsi hanya bisa menerima parameter number')
    }

    return a * b
  },
  divide: (...args: Array<any>) => {
    if (args.length !== 2) {
      throw new Error('fungsi add hanya menerima 2 parameter')
    }

    const [a, b] = args

    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('fungsi hanya bisa menerima parameter number')
    }

    return a / b
  }

}

export default MathBasic
