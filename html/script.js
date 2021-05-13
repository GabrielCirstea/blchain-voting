
if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    }
web3.eth.defaultAccount = web3.eth.accounts[0];
let ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "voterAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "votes",
				"type": "uint8"
			}
		],
		"name": "LogVote",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "proposalName",
				"type": "string"
			}
		],
		"name": "addProposal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "chairperson",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "didIVoted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNumProposals",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposal",
				"type": "uint256"
			}
		],
		"name": "getProposal",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposal",
				"type": "uint256"
			}
		],
		"name": "getProposalCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "proposals",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "voteCount",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "proposal",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "voted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "whatIVoted",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];



  let myAccount;
  var VotingContract;
  web3.eth.getAccounts(async function(err,accounts){
      myAccount = accounts[1];
      console.log("Cont:",myAccount);
      VotingContract = new web3.eth.Contract(ABI, '0xEAB6Ea5F38608C5624123B25d766a31C570E7aA8',
        {from: myAccount}
      );
      // test();
      await listProposals();
    });

function test(){
    VotingContract.methods.addProposal("primul").send(function(err, res) {
    if (err) {
        console.log("An error occured", err);
        return
    }
    console.log("Am adaugat \"primul\"",res)
    })

    VotingContract.methods.getProposal(0).call(function(err, res) {
    if (err) {
        console.log("An error occured", err);
        return
    }
    console.log("Proponere 0",res)
    })
    VotingContract.methods.vote(0).send({from: myAccount}, function(err, res) {
     if (err) {
         console.log("An error occured", err);
         return
     }
     console.log("Am votat ",0, res)
     })
}
async function listProposals(){
    let N = 0;
    await VotingContract.methods.getNumProposals().call(function(err, res) {
      if (err) {
          console.log("An error occured nr", err);
          return
      }
      console.log("Nr Propuneri",res);
      N = res;
    });
    let proposals = new Array(N);
    for(let i=0; i<N; i++){
      proposals[i] = await VotingContract.methods.getProposal(i).call();
    }
    console.log(proposals);
    fillPropList(proposals);
}

function fillPropList(proposals){ // also the selecte

  let list = document.getElementById("props_list");
  let select_list = document.getElementById("select_list");
  while (list.firstChild) {
       list.removeChild(list.firstChild);
   }
  let i = 0;
  for(prop of proposals){
    let li = document.createElement("li");
    let txt = document.createTextNode(prop);
    let opt = document.createElement("option");
    opt.innerHTML=prop;
    opt.value=i;
    select_list.appendChild(opt);
    li.appendChild(txt);
    list.appendChild(li);
    i++;
  }
}

async function voteaza(){
    let select_list = document.getElementById("select_list");
    let selection = select_list[select_list.selectedIndex].value;
    if(selection == -1){
      alert("nu poti vota \"nimic\"....");
      return;
    }
    let already_voted = false;
    await VotingContract.methods.didIVoted().call({from: myAccount}, function(err, res) {
      if (err) {
          console.log("An error occured", err);
          return
      }
      console.log("Am votat ", res)
        already_voted = res;
    });
    if(already_voted == true){
      alert("Nu mai poti vota");
      return;
    }
    await VotingContract.methods.vote(selection).send({from: myAccount}, function(err, res) {
      if (err) {
          console.log("An error occured", err);
          return
      }
      console.log("Am votat ",selection, res)
    });
  }

function newProp(){
    let field = document.getElementById("propunere");
    let prop = field.value;
    console.log(prop);
    VotingContract.methods.addProposal(prop).send(function(err, res) {
    if (err) {
        console.log("An error occured", err);
        return
    }
    console.log("Am adaugat ",prop,res)
    listProposals();
    })
}
window.onload = () => {
  let button = document.getElementById("stampila");
  button.onclick = voteaza;
  let buton2 = document.getElementById("new_prop");
  buton2.onclick = newProp;
}
