//prima versiune
// truffle console
// <contract_name>.deployed().then((instance) => {app = instance})

pragma solidity ^0.5.0;

contract ContractulMeu{
    string private name;
    uint private age;
    
    function setName (string memory newName) public{
    name = newName;
    }
    
    function getName() public view returns (string memory)  {
    return name;
    }
    
    function setAge (uint newAge) public{
        age = newAge;
    }
    
    function getAge() public view returns (uint) {
        return age;
    }
}

