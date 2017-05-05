import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'

var jsdom = require('jsdom').jsdom

global.document = jsdom('')
global.window = document.defaultView

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property]
  }
})

chai.use(chaiEnzyme())

global.navigator = {
  userAgent: 'node.js'
}
