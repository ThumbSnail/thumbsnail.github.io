/* Used for site navigation:
   1.  For the nav bar.
   Clicking on a div leads to a section within the page
   https://css-tricks.com/snippets/jquery/make-entire-div-clickable/

   2.  For switching between modals.
   Once the user clicks on a portfolio project, a modal appears.
   The modal contains 'previous' and 'next' buttons.
   This code is used to move from one modal to the next.
   Taken and adapted from:
   http://stackoverflow.com/questions/13488706/how-to-switch-modal-windows-using-twitter-bootstrap

   Used this site to figure out how to traverse through parents:
   https://api.jquery.com/closest/

   And this taught me that you have to wait for the DOM to actually exist:
   http://stackoverflow.com/questions/19884450/when-is-document-ready-needed-and-when-not-in-jquery
*/

var APPS_MAX = 4;  //number of portfolio projects

function getModalIdNum(button) {
	var currentModalId = $(button).closest('article').attr('id');  //grab this modal's id
	var modalIdNum = parseInt(currentModalId[currentModalId.length - 1]);  //grab the actual number of the id

	return modalIdNum;
}

function swapModals(currentModalId, nextModalId) {
	var currentModal = '#app' + currentModalId;
	var nextModal = '#app' + nextModalId;

	$(currentModal).modal('hide');
	$(nextModal).modal('show');
}

$(document).ready(function() {

	$('.btn-previous').click(function() {
		var currentIdNum = getModalIdNum(this);
		var previousIdNum = currentIdNum - 1; 

		if (previousIdNum < 0) {
			previousIdNum = APPS_MAX - 1;
		}

		swapModals(currentIdNum, previousIdNum);
	});

	$('.btn-next').click(function() {
	    var currentIdNum = getModalIdNum(this);
		var nextIdNum = currentIdNum + 1; 

		if (nextIdNum >= APPS_MAX) {
			nextIdNum = 0;
		}

		swapModals(currentIdNum, nextIdNum);
	});

	$('.nav-div').click(function() {
		window.location = $(this).find('a').attr('href');
		return false;
	});

});