public class voteCalc {

	private var candidates; // Array of candidates (names).
	private var voters; // 2d array of voters and their rankings of candidates.

	public function voteCalc(candidates, voters) {
		this.candidates = candidates;
		this.voters = voters;
	}

	/**
	* TODO
	*
	* O(n*log n)
	*/

	private function getCandidatePairs() {
		var candidatePairs = [],
			candidates = this.candidates;

		for (var i = 0; i < candidates.length; i++) {
			for (var j = i + 1; j < candidates.length; j++) {
				candidatePairs.push(new pair(candidates[i], candidates[j]));
			}
		}

		return candidatePairs;
	}

	/**
	* TODO
	*
	* O(m*n*(nCh2))
	*/

	public function processVotes() {
		var pair,
			voters = this.voters,
			candidates = this.candidates;

		var candidatePairs = getCandidatePairs();

		for (var i = 0; i < voters.length; i++) {
			for (var j = 0; j < candidatePairs.length; j++) {
				pair = candidatePairs[j];
				for (var k = 0; k < candidates.length; k++) {
					if(voters[i][j] === pair.getCand1()) {
						pair.incrCand1();
						break;
					}
					else if(voters[i][j] === pair.getCand2()) {
						pair.incrCand2();
						break;
					}
			}
		}

		candidatePairs.sort(function (a, b) {
			if(a.getMajority() > b.getMajority()) {
				return -1;
			}
			if(a.getMajority() < b.getMajority()) {
				return 1;
			}
			if(a.getMinority() < b.getMinority()) {
				return -1;
			}
			if(a.getMinority() > b.getMinority()) {
				return 1;
			}
			return 0;
		});

		var candNodeList = [],
			nodeCand1,
			nodeCand2,
			cand1,
			cand2;

		for (var i = 0; i < candidatePairs.length; i++) {
			cand1 = candidatePairs[i].getCand1();
			cand2 = candidatePairs[i].getCand2();
			if((nodeCand1 = isContained(cand1, candNodeList)) === null) {
				nodeCand1 = new candNode(cand1);
				candNodeList.push(nodeCand1);
			}
			if((nodeCand2 = isContained(cand2, candNodeList)) === null) {
				nodeCand2 = new candNode(cand2);
				candNodeList.push(nodeCand2);
			}
			if(candidatePairs[i].getWinner() === 1) {
				nodeCand1.setNext(nodeCand2);
			}
			else if(candidatePairs[i].getWinner() === -1) {
				nodeCand2.setNext(nodeCand1);
			}
		}

		var nextList;

		for (var i = 0; i < candNodeList.length; i++) {
			nextList = candNodeList[i].getNext();
			for (var j = 0; j < nextList.length; j++) {
				nextList[j].incrInDegree();
			}
		}

		var sourceList = [],
			currNode;

		for (var i = 0; i < candNodeList.length; i++) {
			currNode = candNodeList[i];
			if(currNode.getInDegree() === 0) {
				sourceList.push(currNode);
			}
		}

		return sourceList;

	}

	private function isContained(cand, nodeList) {
		
		if(!(nodeList instanceof Array)) {
			return null;
		}

		if(nodeList.length === 0) {
			return null;
		}

		if(typeof(nodeList[0]) !== "object") {
			return null;
		}

		if(typeof(nodeList[0].getCand()) === "undefined") {
			return null;
		}

		for (int i = 0; i < nodeList.length; i++) {
			if(cand === nodeList[i].getCand()) {
				return nodeList[i];
			}
		}

		return null;

	}

	if((typeof(haystack) !== "object") || (typeof(haystack.getCand1()) !== "function") || (typeof(haystack.getCand2()) !== "function")) {
			return false;
		}

}

public class pair {
	private var cand1;
	private var cand2;
	private var cand1Votes;
	private var cand2Votes;
	public function pair(cand1, cand2) {
		this.cand1 = cand1;
		this.cand2 = cand2;
		cand1Votes = 0;
		cand2Votes = 0;
	}

	public function getCand1() {
		return this.cand1;
	}

	public function getCand2() {
		return this.cand2;
	}

	public function getCand1Votes() {
		return this.cand1Votes;
	}

	public function getCand2Votes() {
		return this.cand1Votes;
	}

	public function incrCand1() {
		this.cand1Votes++;
	}

	public function incrCand2() {
		this.cand2Votes++;
	}

	public function getWinner() {
		if(this.cand1Votes > this.cand2Votes) {
			return cand1;
		}
		else if(this.cand2Votes > this.cand1Votes) {
			return cand2;
		}
		else {
			return "tie";
		}
	}

	public function getMajority() {
		if(this.cand1Votes > this.cand2Votes) {
			return this.cand1Votes;
		}
		if(this.cand1Votes < this.cand2Votes) {
			return this.cand2Votes;
		}
		return this.cand1Votes;
	}

	public function getMinority() {
		if(this.cand1Votes > this.cand2Votes) {
			return this.cand2Votes;
		}
		if(this.cand1Votes < this.cand2Votes) {
			return this.cand1Votes;
		}
		return this.cand1Votes;
	}

	/*

	public function getDiff() {
		return Math.abs(this.cand1 - this.cand2);
	}

	*/

}

public class candNode {

	private var nextNodes;
	private var cand;

	public function candNode(cand) {
		this.nextNodes = [];
		this.cand = cand;
	}

	public function setNext(nextNode) {
		this.nextNodes.push(nextNode);
	}

	public function getNext() {
		return this.nextNodes;
	}

	public function getCand() {
		return this.cand;
	}
	
}