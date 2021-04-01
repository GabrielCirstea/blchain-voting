// truffle console
// Counter.deployed().then((instance) => {app = instance})

pragma solidity ^0.5;

contract Counter {
    
	event ValueChanged(uint value);
    // Public variable of type unsigned int to keep the number of counts
    uint256 private count;
	address private owner;

	modifier onlyOwner() {
		require(msg.sender == owner);
		_;
	}

	constructor() public {
		owner = msg.sender;
	}

    // Not necessary getter to get the count value
    function getCount() public view returns (uint256) {
        return count;
    }

	function increment() public onlyOwner {
		count++;
	}

	function decrement() public onlyOwner {
		count--;
	}

}
