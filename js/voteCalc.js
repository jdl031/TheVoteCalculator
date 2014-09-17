/**
* Main class where vote calculation takes place.
*/

function voteCalc() {

	/**
	* Calculates the voting results, taking in an array of candidate pairs
	* and an array of candidate nodes.
	* @param {Array of pair objects} pairs
	* @param {Array of node objects} nodes
	* @return {Array of }
	*/

	this.calcResults = function(pairs, nodes) {

		var candidatePairs = [],
			candNodeList = nodes;

		var marginIndex;

		for(var i = 0; i < pairs.length; i++) {
			if((marginIndex = isContained(pairs[i].margin, candidatePairs)) >= 0) {
				candidatePairs[marginIndex].PairArray.push(pairs[i]);
			}
			else {
				candidatePairs.push({
					"margin": pairs[i].margin,
					"PairArray": new Array(pairs[i])
			 	});
			}
		}

		candidatesPairs.sort(function (a, b) {
			if(Math.abs(a.margin) > Math.abs(b.margin)) {
				return -1;
			}
			else if(Math.abs(a.margin) < Math.abs(b.margin)) {
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
				nodeCand1 = pairArray[j].cand1Node;
				nodeCand2 = pairArray[j].cand2Node;
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
			nextList = candNodeList[i].nextNodes;
			for (var j = 0; j < nextList.length; j++) {
				nextList[j].incrInDegree();
			}
		}

		var sourceList = [],
			currNode;

		for (var i = 0; i < candNodeList.length; i++) {
			currNode = candNodeList[i];
			if(currNode.inDegree === 0) {
				sourceList.push(currNode);
			}
		}

		return sourceList;

	}

	/**
	* Function checks to see if a given value is in a given array.
	*/

	this.isContained = function(value, array) {
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

function pair() {
	var cand1Node; // First candidate node.
	var cand2Node; // Second candidate node.
	var margin; // Margin of victory between the two candidates.

	/**
	* Constructor, takes in the two candidate nodes..
	*/

	this.pairConstruct = function(canNod1, canNod2) {
		cand1Node = canNod1;
		cand2Node = canNod2;
		margin = 0;
	}

	/**
	* Increments the margin if the first candidate is given, decrements
	* otherwise (second candidate).
	*/

	this.adjustMargin = function(cand) {
		(cand === cand1Node) ? margin++ : margin--;
	}

	/**
	* Gets the winner of the two candidates: if the margin is greater
	* than 0, the first candidate won, so return 1; if the
	* margin is less than 0, the second candidate won, so return -1;
	* if the margin is equal to 0, they tied, so return 0.
	*/

	this.getWinner = function() {
		if(margin > 0) {
			return 1;
		}
		else if(margin < 0) {
			return -1;
		}
		return 0;
	}

}

/**
* Node pertaining to a specific candidate class.
*/

function candNode() {

	var nextNodes; /* An array of candidate nodes that the
	                          the current node points to. */
	var cand; // The name of the candidate.
	var inDegree; /* The number of candidate nodes that
	                         point to this node. */
	var indexID; // View-specific index ID of this node.

	/**
	* Constructor, takes in the name of the candidate and the
	* view-specific index ID of the node.
	*/

	this.candNode = function(candName, indID) {
		nextNodes = []; // Starts with no next nodes.
		cand = candName;
		inDegree = 0; // Starts with no nodes pointing to this node.
		indexID = indID;
	}

	/**
	* Adds the specified argument node to the array of next nodes.
	*
	* TODO:
	* 	- Change to 'addNext' with approval of James.
	*/

	this.setNext = function(nextNode) {
		nextNodes.push(nextNode);
	}

	/**
	* Increments the number of candidate nodes that point to this node.
	*/

	this.incrInDegree = function() {
		inDegree++;
	}
	
}
