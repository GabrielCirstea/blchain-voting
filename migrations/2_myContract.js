const myContract = artifacts.require("./ContractulMeu");

module.exports = function (deployer) {
    deployer.deploy(myContract);
};