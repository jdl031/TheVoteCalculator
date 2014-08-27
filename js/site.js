var numOfChoices;
var voteNumber;
var choiceArray = [];
var voteNumber = 0;
var pairArray = [];
var candidateNodeArray = [];
var voteCale = new VoteCalc();
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
		choiceArray.push(entryValue);
	}
	$('#voteEntry-container').css("display", "inline");
	// TODO - Create Candidate Nodes
		//
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

