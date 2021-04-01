const myContract = artifacts.require("./Counter");

module.exports = function (deployer) {
    deployer.deploy(myContract);
};
