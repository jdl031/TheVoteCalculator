/**
* Main class where vote calculation takes place.
*/

public class voteCalc {

	private var candidates; // Array of candidates (names).

	/**
	* Constructor (empty).
	*/

	public function voteCalc() {
	}

	/**
	* Calculates the voting results, taking in an array of candidate pairs
	* and an array of candidate nodes.
	*/

	public function calcResults(pairs, nodes) {

		var candidatePairs = [],
			candNodeList = nodes;

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

	/**
	* Function checks to see if a given value is in a given array.
	*/

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

}

/**
* Pair of candidates class.
*/

public class pair {
	private var cand1Node; // First candidate node.
	private var cand2Node; // Second candidate node.
	private var margin; // Margin of victory between the two candidates.

	/**
	* Constructor, takes in the two candidate nodes..
	*/

	public function pair(cand1Node, cand2Node) {
		this.cand1Node = cand1Node;
		this.cand2Node = cand2Node;
		this.margin = 0;
	}

	/**
	* Gets the node pertaining to the first candidate.
	*/

	public function getCand1Node() {
		return this.cand1Node;
	}

	/**
	* Gets the node pertaining to the second candidate.
	*/

	public function getCand2Node() {
		return this.cand2Node;
	}

	/**
	* Increments the margin if the first candidate is given, decrements
	* otherwise (second candidate).
	*/

	public function adjustMargin(cand) {
		(cand === this.cand1Node.getCand()) ? margin++ : margin--;
	}

	/**
	* Gets the winner of the two candidates: if the margin is greater
	* than 0, the first candidate won, so return 1; if the
	* margin is less than 0, the second candidate won, so return -1;
	* if the margin is equal to 0, they tied, so return 0.
	*/

	public function getWinner() {
		if(this.margin > 0) {
			return 1;
		}
		else if(this.margin < 0) {
			return -1;
		}
		return 0;
	}

	/**
	* Returns the current margin.
	*/

	public function getMargin() {
		return this.margin;
	}

}

/**
* Node pertaining to a specific candidate class.
*/

public class candNode {

	private var nextNodes; /* An array of candidate nodes that the
	                          the current node points to. */
	private var cand; // The name of the candidate.
	private var inDegree; /* The number of candidate nodes that
	                         point to this node. */
	private var indexID; // View-specific index ID of this node.

	/**
	* Constructor, takes in the name of the candidate and the
	* view-specific index ID of the node.
	*/

	public function candNode(cand, indexID) {
		this.nextNodes = []; // Starts with no next nodes.
		this.cand = cand;
		this.inDegree = 0; // Starts with no nodes pointing to this node.
		this.indexID = indexID;
	}

	/**
	* Adds the specified argument node to the array of next nodes.
	*
	* TODO:
	* 	- Change to 'addNext' with approval of James.
	*/

	public function setNext(nextNode) {
		this.nextNodes.push(nextNode);
	}

	/**
	* Increments the number of candidate nodes that point to this node.
	*/

	public function incrInDegree() {
		this.inDegree++;
	}

	/**
	* Returns the array of next nodes.
	*/

	public function getNextNodes() {
		return this.nextNodes;
	}

	/**
	* Returns the index ID.
	*/

	public function getIndexID() {
		return this.indexID;
	}

	/**
	* Returns the number of candidate nodes that point to this node.
	*/

	public function getInDegree() {
		return this.inDegree;
	}

	/**
	* Returns the candidate's name.
	*/

	public function getCand() {
		return this.cand;
	}
	
}