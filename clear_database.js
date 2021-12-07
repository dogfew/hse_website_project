const fs = require('fs')
fs.rmSync('database.json')
fs.writeFileSync('database.json', `{"cards":[], "data":[]}`)