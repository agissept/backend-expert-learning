import MathBasic from './MathBasic'

describe('A MathBasic', () => {
  it('should contain add, substract, multiply, and divide function', () => {
    expect(MathBasic).toHaveProperty('add')
    expect(MathBasic).toHaveProperty('substract')
    expect(MathBasic).toHaveProperty('multiply')
    expect(MathBasic).toHaveProperty('divide')
    expect(MathBasic.add).toBeInstanceOf(Function)
    expect(MathBasic.substract).toBeInstanceOf(Function)
    expect(MathBasic.multiply).toBeInstanceOf(Function)
    expect(MathBasic.divide).toBeInstanceOf(Function)
  })

  describe('A add function', () => {
    it('should throw error when not given 2 parameters', () => {
      expect(() => MathBasic.add()).toThrowError()
      expect(() => MathBasic.add(1)).toThrowError()
      expect(() => MathBasic.add(1, 2, 3)).toThrowError()
      expect(() => MathBasic.add(1, 2, 3)).toThrowError()
    })

    it('should throw error when given non-number parameters', () => {
      expect(() => MathBasic.add('1', '2')).toThrowError()
      expect(() => MathBasic.add(true, {})).toThrowError()
      expect(() => MathBasic.add(null, false)).toThrowError()
    })

    it('should return a + b when given 2 paramters number', () => {
      expect(MathBasic.add(1, 2)).toEqual(3)
      expect(MathBasic.add(1, 3)).toEqual(4)
      expect(MathBasic.add(1, 4)).toEqual(5)
    })
  })

  describe('A substract function', () => {
    it('should throw error when not given 2 parameters', () => {
      expect(() => MathBasic.substract()).toThrowError()
      expect(() => MathBasic.substract(1)).toThrowError()
      expect(() => MathBasic.substract(1, 2, 3)).toThrowError()
      expect(() => MathBasic.substract(1, 2, 3)).toThrowError()
    })

    it('should throw error when given non-number parameters', () => {
      expect(() => MathBasic.substract('1', '2')).toThrowError()
      expect(() => MathBasic.substract(true, {})).toThrowError()
      expect(() => MathBasic.substract(null, false)).toThrowError()
    })

    it('should return a - b when given 2 paramters number', () => {
      expect(MathBasic.substract(3, 2)).toEqual(1)
      expect(MathBasic.substract(10, 3)).toEqual(7)
      expect(MathBasic.substract(7, 4)).toEqual(3)
    })
  })

  describe('A multiply function', () => {
    it('should throw error when not given 2 parameters', () => {
      expect(() => MathBasic.multiply()).toThrowError()
      expect(() => MathBasic.multiply(1)).toThrowError()
      expect(() => MathBasic.multiply(1, 2, 3)).toThrowError()
      expect(() => MathBasic.multiply(1, 2, 3)).toThrowError()
    })

    it('should throw error when given non-number parameters', () => {
      expect(() => MathBasic.multiply('1', '2')).toThrowError()
      expect(() => MathBasic.multiply(true, {})).toThrowError()
      expect(() => MathBasic.multiply(null, false)).toThrowError()
    })

    it('should return a * b when given 2 paramters number', () => {
      expect(MathBasic.multiply(3, 2)).toEqual(6)
      expect(MathBasic.multiply(10, 3)).toEqual(30)
      expect(MathBasic.multiply(7, 4)).toEqual(28)
    })
  })

  describe('A divide function', () => {
    it('should throw error when not given 2 parameters', () => {
      expect(() => MathBasic.divide()).toThrowError()
      expect(() => MathBasic.divide(1)).toThrowError()
      expect(() => MathBasic.divide(1, 2, 3)).toThrowError()
      expect(() => MathBasic.divide(1, 2, 3)).toThrowError()
    })

    it('should throw error when given non-number parameters', () => {
      expect(() => MathBasic.divide('1', '2')).toThrowError()
      expect(() => MathBasic.divide(true, {})).toThrowError()
      expect(() => MathBasic.divide(null, false)).toThrowError()
    })

    it('should return a / b when given 2 paramters number', () => {
      expect(MathBasic.divide(4, 2)).toEqual(2)
      expect(MathBasic.divide(15, 3)).toEqual(5)
      expect(MathBasic.divide(28, 4)).toEqual(7)
    })
  })
})
