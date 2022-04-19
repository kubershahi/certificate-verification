const csv = require('csvtojson')

const filePath = 'certificate.csv'

csv().fromFile(filePath).then((jsonObj) => console.log(jsonObj));
