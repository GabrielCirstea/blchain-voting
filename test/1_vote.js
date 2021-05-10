const Voting = artifacts.require("Voting");

contract("Voting", accounts => {
	it("Should make and vote someting", async () =>{
		const app = await Voting.deployed();
		await app.addProposal("salut");
		const count = await app.getProposalCount(0);
		assert.equal(count.valueOf(), 0);
	});
});
