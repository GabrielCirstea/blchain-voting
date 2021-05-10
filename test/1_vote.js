const Voting = artifacts.require("Voting");

contract("Voting", accounts => {
	it("Should make and vote someting", async () =>{
		const app = await Voting.deployed();
		await app.addProposal("salut");
		const count = await app.getProposalCount(0);
		assert.equal(count.valueOf(), 0);
	});

	it("sa si votam", async() =>{
		const app = await Voting.deployed();
		await app.addProposal("vot");
		let count = await app.getProposalCount(0);
		assert.equal(count.valueOf(), 0);
		await app.vote(0);
		await app.vote(0, {from: accounts[1]});
		count = await app.getProposalCount(0);
		assert.equal(count.valueOf(), 2);
	});
});
