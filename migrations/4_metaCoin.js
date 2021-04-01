const myContract = artifacts.require("MetaCoin");

module.exports = function (deployer) {
    deployer.deploy(myContract);
};
