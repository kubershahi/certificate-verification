
const jssha = require('jssha')
const fs = require('fs');

const data = fs.readFileSync('./certificates/user4@alumni.ashoka.edu.in.pdf', {encoding:'binary', flag:'r'});

var sha3  = new jssha("SHA3-256", "BYTES")

sha3.update(data.toString());
var hash = sha3.getHash("HEX")
console.log(hash);