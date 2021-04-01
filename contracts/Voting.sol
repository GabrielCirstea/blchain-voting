// truffle console
// let app = await Voting.deployed()
// petnru a avea conturile din ganache
// let accounts = await web3.eth.getAcounts()
pragma solidity >=0.4.22 <0.7.0;

contract Voting{
    
    
    struct Proposal {
        string name;   // short name (up to 32 bytes)
        uint8 voteCount; // number of accumulated votes
    }
    
    mapping(address => bool) public voted;
    
    Proposal[] public proposals;
    
    address public chairperson;
    
    event LogVote(address indexed voterAddress, string name, uint8 votes);
    
    
    constructor() public {
        chairperson = msg.sender;
    }
    
      
    function addProposal (string memory proposalName) public {
       
        proposals.push(Proposal({
                name: proposalName,
                voteCount: 0
            })
            );
    }

	function getProposal(uint proposal) public view returns (string memory) {
		return proposals[proposal].name;
	}

	function getProposalCount(uint proposal) public view returns (uint) {
		return proposals[proposal].voteCount;
	}
    
    function vote(uint proposal) public {
        address voter = msg.sender;
		// ar trebui facut ceva care sa dea o eroare cand o persoana a votat deja
		// vrem ca o persoana sa voteze o singura data
		// sau sa poata vota mai multe propuneri?
		if(!voted[voter]){	// nu lasa o persoana sa voteze de mai multe ori
			voted[voter] = true;
			proposals[proposal].voteCount++;
		}
        
        emit LogVote(voter, proposals[proposal].name, proposals[proposal].voteCount);
    }

}
