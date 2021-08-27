import Hapi from '@hapi/hapi'

const createServer = ({ mathBasic, figureCalculator }: any) => {
  const server = Hapi.server({
    host: 'localhost',
    port: 5000
  })

  server.route([{
    method: 'GET',
    path: '/add/{a}/{b}',
    handler: request => {
      const { a, b } = request.params
      const value = mathBasic.add(Number(a), Number(b))
      return { value }
    }
  }])

  server.route([{
    method: 'GET',
    path: '/subtract/{a}/{b}',
    handler: request => {
      const { a, b } = request.params
      const value = mathBasic.substract(Number(a), Number(b))
      return { value }
    }
  }])

  server.route([{
    method: 'GET',
    path: '/multiply/{a}/{b}',
    handler: request => {
      const { a, b } = request.params
      const value = mathBasic.multiply(Number(a), Number(b))
      return { value }
    }
  }])

  server.route([{
    method: 'GET',
    path: '/divide/{a}/{b}',
    handler: request => {
      const { a, b } = request.params
      const value = mathBasic.divide(Number(a), Number(b))
      return { value }
    }
  }])

  server.route([{
    method: 'GET',
    path: '/rectangle/perimeter/{height}/{width}',
    handler: request => {
      const { height, width } = request.params
      const value = figureCalculator.calculateRectanglePerimeter(Number(height), Number(width))
      return { value }
    }
  }])

  server.route([{
    method: 'GET',
    path: '/rectangle/area/{height}/{width}',
    handler: request => {
      const { height, width } = request.params
      const value = figureCalculator.calculateRectangleArea(Number(height), Number(width))
      return { value }
    }
  }])

  server.route([{
    method: 'GET',
    path: '/triangle/perimeter/{sideA}/{sideB}/{base}',
    handler: request => {
      const { sideA, sideB, base } = request.params
      const value = figureCalculator.calculateTrianglePerimeter(Number(sideA), Number(sideB), Number(base))
      return { value }
    }
  }])

  server.route([{
    method: 'GET',
    path: '/triangle/area/{base}/{height}',
    handler: request => {
      const { base, height } = request.params
      const value = figureCalculator.calculateTriangleArea(Number(base), Number(height))
      return { value }
    }
  }])

  return server
}

export default createServer
