const middleware = {}

middleware['routing'] = require('../middleware/routing.js')
middleware['routing'] = middleware['routing'].default || middleware['routing']

export default middleware
