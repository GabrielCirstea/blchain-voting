const myContract = artifacts.require("Colector");

module.exports = function (deployer) {
    deployer.deploy(myContract,"Gabriel", 223);
};
