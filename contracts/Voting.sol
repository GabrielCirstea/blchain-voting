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
    mapping(address => uint) whatVote;
    
    Proposal[] public proposals;
    
    address public chairperson;
    
    event LogVote(address indexed voterAddress, string name, uint8 votes);
    
    modifier NotVoted(){
        address voter = msg.sender;
	    require(voted[voter] == false);
	    _;
    }
    
    
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
	function getNumProposals() public view returns (uint){
	    return proposals.length;
	}
    
    function vote(uint proposal) public payable NotVoted{
        address voter = msg.sender;
		// ar trebui facut ceva care sa dea o eroare cand o persoana a votat deja
		// vrem ca o persoana sa voteze o singura data
		// sau sa poata vota mai multe propuneri?
	
		voted[voter] = true;
		proposals[proposal].voteCount++;
		whatVote[voter] = proposal;
        
        emit LogVote(voter, proposals[proposal].name, proposals[proposal].voteCount);
    }
    
    function didIVoted() public view returns (bool){
        address voter = msg.sender;
        if(voted[voter])
            return true;
        return false;
    }
    
    function whatIVoted() public view returns (uint){
        address voter = msg.sender;
        if(didIVoted()){
            return whatVote[voter];
        }
    }
}
