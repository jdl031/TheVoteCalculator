public class voteCalc {

	private var candidates; // Array of candidates (names).

	public function voteCalc() {
	}

	/**
	* Calculates the voting results.
	*
	* @params  pairs  Array of candidate pair objects.
	*          nodes  Array of candidate node objects.
	*
	* O(m*n*(nCh2))
	*/

	public function calcResults(pairs, nodes) {

		var candidatePairs = [],
			candNodeList = nodes;

		/*

		Make candidatePairs an array of arrays, to allow possibility of a ties (majorities and minorities are equal.)

		*/

/*		var candNodeList = [],
			nodeCand,
			cand;

		for (var i = 0; i < candidates; i++) {
			cand = candidates[i];
			nodeCand = new candNode(cand);
			candNodeList.push(nodeCand);
		}

		var candidatePairs = getCandidatePairs();

		for (var i = 0; i < voters.length; i++) {
			for (var j = 0; j < candidatePairs.length; j++) {
				pair = candidatePairs[j];
				for (var k = 0; k < candidates.length; k++) {
					if(voters[i][k] === pair.getCand1()) {
						pair.adjustMargin();
						break;
					}
					else if(voters[i][k] === pair.getCand2()) {
						pair.adjustMargin();
						break;
					}
			}
		}*/

		var marginIndex;

		for(var i = 0; i < pairs.length; i++) {
			if((marginIndex = isContained(pairs[i].getMargin()), candidatePairs)) >= 0) {
				candidatePairs[marginIndex].PairArray.push(pairs[i]);
			}
			else {
				candidatePairs.push({
					"margin": pairs[i].getMargin(),
					"PairArray": new Array(pairs[i])
			 	});
			}
		}

		candidatesPairs.sort(function (a, b) {
			if(Math.abs(a.margin) > Math.abs(b.margin) {
				return -1;
			}
			else if(Math.abs(a.margin) < Math.abs(b.margin) {
				return 1;
			}
			return 0;
		}

/*		candidatePairs.sort(function (a, b) {
			if(a.getMargin() > b.getMargin()) {
				return -1;
			}
			else if (a.getMargin() < b.getMargin()) {
				return 1;
			}
			return 0;
		});*/

		var	pair,
			pairArray,
			nodeCand1,
			nodeCand2,
			cand1,
			cand2;

		/* While iterating through candidatePairs, check if candidatePairs[i].length > 1, if so, pair does not yield an edge! */

		for (var i = 0; i < candidatePairs.length; i++) {
			pair = candidatePairs[i];
			pairArray = pair.PairArray;
			for (var j = 0; j < pairArray.length; j++) {
				nodeCand1 = pairArray[j].getCand1Node();
				nodeCand2 = pairArray[j].getCand2Node();
				if(pairArray[j].getWinner() === 1) {
					nodeCand1.setNext(nodeCand2);
				}
				else if(pairArray[j].getWinner() === -1) {
					nodeCand2.setNext(nodeCand1);
				}
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

	private function isContained(value, array) {
		if(array.length === 0) {
			return -1;
		}
		if(typeof array[0].margin == "undefined") {
			return -1;
		}
		for(var i = 0; i < array.length; i++) {
			if(array[i].margin === value) {
				return i;
			}
		}

		return -1;
	}

/*	private function mergePairs(left, right) {
		var result = [[]],
			i = 0,
			j;

		while(i < left.length && j < right.length) {
			if(left[i][0] < right[j][0]) {
				result.push(left[i++][0]);
			}
			else if(left[i][0] > right[j][0]) {
				result.push(right[j++][[0]]);
			}
			else {

			}
		}

		return result.concat(left.slice(i).concat(right.slice(j)));
	}

	private function sortPairs(pairs) {
		var candPairs = pairs;

		if(pairs.length < 2) {
			return pairs;
		}

		var middle = Math.floor(pairs.length / 2),
			left = pairs.slice(0, middle),
			right = items.slice(middle),
			params = mergePairs(sortPairs(left), sortPairs(right));


	}*/

	/**
	* TODO
	*
	* O(n*log n)
	*/

/*	private function getCandidatePairs() {
		var candidatePairs = [],
			candidates = this.candidates;

		for (var i = 0; i < candidates.length; i++) {
			for (var j = i + 1; j < candidates.length; j++) {
				candidatePairs.push(new pair(candidates[i], candidates[j]));
			}
		}

		return candidatePairs;
	}*/

}

public class pair {
	private var cand1Node;
	private var cand2Node;
	private var margin;
	public function pair(cand1Node, cand2Node) {
		this.cand1Node = cand1Node;
		this.cand2Node = cand2Node;
	}

	public function getCand1Node() {
		return this.cand1Node;
	}

	public function getCand2Node() {
		return this.cand2Node;
	}

	public function adjustMargin(cand) {
		(cand === this.cand1Node.getCand()) ? margin++ : margin--;
	}

	public function getWinner() {
		if(this.margin > 0) {
			return 1;
		}
		else if(this.margin < 0) {
			return -1;
		}
		return 0;
	}

	public function getMargin() {
		return this.margin;
	}

}

public class candNode {

	private var nextNodes;
	private var cand;
	private var inDegree;
	private var indexID;

	public function candNode(cand, indexID) {
		this.nextNodes = [];
		this.cand = cand;
		this.inDegree = 0;
		this.indexID = indexID;
	}

	public function setNext(nextNode) {
		this.nextNodes.push(nextNode);
	}

	public function incrInDegree() {
		this.inDegree++;
	}

	public function getNextNodes() {
		return this.nextNodes;
	}

	public function getIndexID() {
		return this.indexID;
	}

	public function getInDegree() {
		return this.inDegree;
	}

	public function getCand() {
		return this.cand;
	}
	
}