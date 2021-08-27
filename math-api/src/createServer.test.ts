import createServer from './createServer'
import MathBasic from './MathBasic'
import FigureCalculator from './FigureCalculator'

describe('A HTTP Server', () => {
  describe('when GET /add', () => {
    it('should respond with a status code of 200 and the payload value is addition result of a and b correctly', async () => {
      // Arrange
      const a = 20
      const b = 10
      const spyAdd = jest.spyOn(MathBasic, 'add')
      const server = createServer({ mathBasic: MathBasic })

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/add/${a}/${b}`
      })

      // Assert
      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(200)
      expect(responseJson.value).toEqual(30)
      expect(spyAdd).toBeCalledWith(a, b)
    })
  })

  describe('when GET /subtract', () => {
    it('should respond with a status code of 200 and the payload value is subtraction result of a and b correctly', async () => {
      // Arrange
      const a = 12
      const b = 8
      const spySubtract = jest.spyOn(MathBasic, 'substract')
      const server = createServer({ mathBasic: MathBasic })

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/subtract/${a}/${b}`
      })

      // Assert
      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(200)
      expect(responseJson.value).toEqual(4)
      expect(spySubtract).toBeCalledWith(a, b)
    })
  })

  describe('when GET /multiply', () => {
    it('should respond with a status code of 200 and the payload value is multiplying result of a and b correctly', async () => {
      // Arrange
      const a = 2
      const b = 4
      const spyMultiply = jest.spyOn(MathBasic, 'multiply')
      const server = createServer({ mathBasic: MathBasic })

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/multiply/${a}/${b}`
      })

      // Assert
      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(200)
      expect(responseJson.value).toEqual(8)
      expect(spyMultiply).toBeCalledWith(a, b)
    })
  })

  describe('when GET /divide', () => {
    it('should respond with a status code of 200 and the payload value is dividend result of a and b correctly', async () => {
      // Arrange
      const a = 10
      const b = 5
      const spyDivide = jest.spyOn(MathBasic, 'divide')
      const server = createServer({ mathBasic: MathBasic })

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/divide/${a}/${b}`
      })

      // Assert
      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(200)
      expect(responseJson.value).toEqual(2)
      expect(spyDivide).toBeCalledWith(a, b)
    })
  })

  describe('when GET /rectangle/perimeter', () => {
    it('should respond with a status code of 200 and the payload value is the result of calculating the rectangle of the perimeter correctly ', async () => {
      // Arrange
      const width = 2
      const height = 3
      const spyMultiply = jest.spyOn(MathBasic, 'multiply')
      const spyAdd = jest.spyOn(MathBasic, 'add')
      const figureCalculator = new FigureCalculator(MathBasic)
      const server = createServer({ figureCalculator })

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/rectangle/perimeter/${width}/${height}`
      })

      // Assert
      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(200)
      expect(responseJson.value).toEqual(10)
      expect(spyAdd).toBeCalledWith(width, height)
      expect(spyMultiply).toBeCalledWith(2, width + height)
    })
  })

  describe('when GET /rectangle/area', () => {
    it('should respond with a status code of 200 and the payload value is the result of calculating the rectangle of the area correctly ', async () => {
      // Arrange
      const width = 5
      const height = 6
      const spyMultiply = jest.spyOn(MathBasic, 'multiply')
      const figureCalculator = new FigureCalculator(MathBasic)
      const server = createServer({ figureCalculator })

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/rectangle/area/${width}/${height}`
      })

      // Assert
      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(200)
      expect(responseJson.value).toEqual(30)
      expect(spyMultiply).toBeCalledWith(width, height)
    })
  })

  describe('when GET /triangle/perimeter', () => {
    it('should respond with a status code of 200 and the payload value is the result of calculating the triangle of the perimeter correctly ', async () => {
      // Arrange
      const sideA = 7
      const sideB = 5
      const base = 10
      const spyAdd = jest.spyOn(MathBasic, 'add')
      const figureCalculator = new FigureCalculator(MathBasic)
      const server = createServer({ figureCalculator })

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/triangle/perimeter/${sideA}/${sideB}/${base}`
      })

      // Assert
      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(200)
      expect(responseJson.value).toEqual(22)
      expect(spyAdd).toBeCalledWith(sideA, sideB)
      expect(spyAdd).toBeCalledWith(sideA + sideB, base)
    })
  })

  describe('when GET /triangle/area', () => {
    it('should respond with a status code of 200 and the payload value is the result of calculating the triangle of the area correctly ', async () => {
      // Arrange
      const base = 10
      const height = 7
      const spyMultiply = jest.spyOn(MathBasic, 'multiply')
      const spyDivide = jest.spyOn(MathBasic, 'divide')
      const figureCalculator = new FigureCalculator(MathBasic)
      const server = createServer({ figureCalculator })

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/triangle/area/${base}/${height}`
      })

      // Assert
      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(200)
      expect(responseJson.value).toEqual(35)
      expect(spyMultiply).toBeCalledWith(base, height)
      expect(spyDivide).toBeCalledWith(base * height, 2)
    })
  })
})
