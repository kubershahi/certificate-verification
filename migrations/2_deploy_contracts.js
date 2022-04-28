// const { Certificate } = require("crypto");

const Certificate = artifacts.require("Certificate");
const MyAddress = '0x6066e48947790B52ceaBF98744f32a5a2FFE3Dd2'

module.exports = function (deployer) {
  deployer.deploy(Certificate);
};
