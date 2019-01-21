const path = require('path')
const envPath = path.join(__dirname, '..', '..', '.env')
require('dotenv').config({ path: envPath });

module.exports = process.env