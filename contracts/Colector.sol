pragma solidity 0.5.16;

contract Colector {
   
    mapping (address => string) names;
    mapping (address => uint) ids;  
	mapping (address => uint) balances;
	address payable public owner;
	

    constructor(string memory _name, uint _id) public payable {
        names[msg.sender] = _name;
        ids[msg.sender] = _id;
        owner = msg.sender;
        balances[owner] = msg.sender.balance;
    }
    
        
    function sendEth() payable public{
        balances[msg.sender] -= msg.value; 
    }
    

    function() external payable {
         balances[address(this)] += msg.value;
    }
    
    
    function Withdraw(uint256 amount)  public{
        owner.transfer(amount * 10 **18);
        balances[owner] += amount * 10 **18;
        balances[address(this)] -= amount * 10 **18;
    }
    
    function setSender(string memory _name, uint _id) public {
        names[msg.sender] = _name;
        ids[msg.sender] = _id;
        balances[msg.sender] = msg.sender.balance;
    }
    
    function getSender() public view returns (string memory, uint, uint) {
        return (names[msg.sender], ids[msg.sender], balances[msg.sender]);
    }
    
    function getBalance(address _address) public view returns(uint) {
		return balances[_address]/10**18;
	}
    
    function getContractBalance() public view returns (uint256){
        return (address(this).balance);
    }
}
