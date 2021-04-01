const myContract = artifacts.require("Voting");

module.exports = function (deployer) {
    deployer.deploy(myContract);
};
