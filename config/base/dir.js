const path = require('path')

const dir = {
  root: path.join(__dirname,'../../'),
  dist: path.join(__dirname,'../../dist'),
  src: path.join(__dirname,'../../src'),
  mock: path.join(__dirname,'../../mock'),
  libs: path.join(__dirname,'../../libs'),
  pages: path.join(__dirname,'../../src/pages'),
  common: path.join(__dirname,'../../src/common'),
  dll: path.join(__dirname, '../../src/dll')
}
module.exports = dir