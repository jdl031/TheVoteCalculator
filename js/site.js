
	var numOfChoices;
	var voteNumber;
	var choiceArray = [];
	var voteNumber = 0;
	var pairArray = [];
	var candidateNodeArray = [];
	var voteCalc = new voteCalc();
	$(document).ready(function(){
		$("#addChoicesRows").bind("click", addChoicesFn);
		$("#addVotesRows").bind("click", addVotesFn);
		$("#addVoteBtn").bind("click", addSingleVoteFn);
		$("#seeResultsBtn").bind("click", loadResults);
	});

	function addChoicesFn() {
		var choiceEntryTableHTML = "";
		numOfChoices = $("#numberOfChoices").val(); // TODO validate number
		choiceEntryTableHTML += "<table id=\"choiceEntry-table\">";
		for (i = 1; i <= numOfChoices; i++) { 

		   choiceEntryTableHTML += ('<tr><td class="choiceEntry-label">'+i+'</td><td><input type="text" id="choice'+i+'" placeholder="Enter choice #'+i+'" class="choiceEntry-input"></tr>')
		}
		choiceEntryTableHTML += "</table>";
		$('#choiceEntry-container').prepend(choiceEntryTableHTML);
		$('#choiceEntry-container').css("display", "inline");
		$('html, body').animate({
	        scrollTop: $("#choiceEntry-container").offset().top
	    }, 1000);

	};

	function addVotesFn() {
		var entryValue;
		var choiceTag;
		voteNumber = 0;
		for (i = 1; i <= numOfChoices; i++) {
			choiceTag = "#choice" + i;
			entryValue = $(choiceTag).val();
			choiceArray.push(entryValue);   // REMOIVE?
			candidateNodeArray.push(new candNode(entryValue,i));
		}
		$('#voteEntry-container').css("display", "inline");
		// TODO - Create Candidate Nodes
			
		// TODO - Create Pairs
			// Create Individual pair
			// Add pair to pairArray[]
		addSingleVoteFn();

	};
	function addSingleVoteFn(){
		voteNumber++;
		var rowHTML;
		var rowCellsHTML;
		var rowInputTableHTML;
		var rowID = "voteEntry-row" + voteNumber 
		
		rowHTML = '<div id="' + rowID + '" class="row voteEntry-row">'
		$('#voteEntry-contents').append(rowHTML);

		rowCellsHTML = '<div class="voteEntry-voterLabel"></div><div class="voteEntry-entryCell"></div>'
		$('#'+rowID).append(rowCellsHTML);

		$('#'+rowID+' .voteEntry-voterLabel').append('<h3>Vote '+ voteNumber +'</h3>');

		for (var i = 1; i <= numOfChoices; i++) {
			rowInputTableHTML = '<div class="voteEntry-choiceRow"><input type="number" vc-voteID="'+voteNumber+'" vc-choiceID="'+i+'" class="voteEntry-inputValue"><span>'+ choiceArray[i-1] +'</span></div>'
			$('#'+rowID+' .voteEntry-entryCell').append(rowInputTableHTML);
		}

		/* Template HTML
		<div class="row voteEntry-row">
			<div class="voteEntry-voterLabel">
				<h3>Vote 1</h3>
			</div>
			<div class="voteEntry-entryCell">
				<div class="voteEntry-choiceRow">
					<input type="number" id="voteValue_1_1" class="voteEntry-inputValue">
					<span>Choice 1</span>
				</div>
				<div class="voteEntry-choiceRow">
					<input type="number" id="voteValue_1_2" class="voteEntry-inputValue">
					<span>Choice 2</span>
				</div>
				<div class="voteEntry-choiceRow">
					<input type="number" id="voteValue_1_2" class="voteEntry-inputValue">
					<span>Choice 3</span>
				</div>
				<div class="voteEntry-choiceRow">
					<input type="number" id="voteValue_1_2" class="voteEntry-inputValue">
					<span>Choice 3</span>
				</div>
			</div>
		</div>
		*/
		$('#voteEntry-row'+voteNumber+' input[vc-choiceid="1"]').focus();
		$('html, body').animate({ scrollTop: $('body').prop("scrollHeight")}, 1000);

	}

	function loadResults(){
		var ValOne;
		var ValTwo;
		// TODO - Update Margins
			// For each pair in pairArray
				// for each vote for that pair
					// Update margin 
		// resultsArray = VoteCalc.CalcResults();
		// Display resultsArray (an array of Candidate Nodes)


		//=======//		
		for (var i = 1; i <= voteNumber; i++) {
		// for each vote
			// for each first vote
			for (var j = 1; j <= numOfChoices; j++) {
				// for each other vote
				for (var k = j + 1; k <= numOfChoices; k++){
					// tally
					ValOne = $('input[vc-voteID="'+i+'"][vc-choiceid="'+j+'"]').val();
					ValTwo = $('input[vc-voteID="'+i+'"][vc-choiceid="'+k+'"]').val();
					if (ValOne < ValTwo){
						// TODO - Replace with update to Pair object margin
						// pair.adjustMargin("candidate_name")
					} else if (ValTwo < ValOne) {

					} else {
						// Equal, so do nothing
					}

				}
			}
		}
	}


// === From voteCalc.js ==== //


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
		});

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

function candNode(candName, indID) {

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

	this.nextNodes = []; // Starts with no next nodes.
	this.cand = candName;
	this.inDegree = 0; // Starts with no nodes pointing to this node.
	this.indexID = indID;


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



