const { Certificate } = require("crypto");

const Hello = artifacts.require("Certificate");

module.exports = function (deployer) {
  deployer.deploy(Certificate);
};
