function init() {

  isEmpty = createOptions();
  var key = getSelectedOption();
  getFirst(key);
  $("#randomButton").click(handleRandomButtonClick);

}

function handleRandomButtonClick(){

	if (!isEmpty){
		deleteCardEntry();
		var key = getSelectedOption();
		createRandomElement(key);
	}
	
}

function createRandomElement(key){
	var cards = getStoreArray(key);
	rand = Math.floor(Math.random() * (cards.length));
	if (cards.length > 0){
		var frontside = "<a href=\"javascript:void(0)\" onclick=\"showBackside()\"><div class=\"card span4\">" + cards[rand][0]+ "</div><a>";
	  //	var backside = "<div class=\"card span4\">" + cards[rand][1] + "</div>";
	  	document.getElementById("cardContainer").innerHTML = frontside ;
	  }
}

function showBackside(){
	var key = getSelectedOption();
	var cards = getStoreArray(key);
	deleteCardEntry();
	var backside = "<a href=\"javascript:void(0)\" onclick=\"showFrontside()\"><div class=\"card span4\">" + cards[rand][1]+ "<\/div><\/a>";
	document.getElementById("cardContainer").innerHTML = backside ;
}

function showFrontside(){
	var key = getSelectedOption();
	var cards = getStoreArray(key);
	deleteCardEntry();
	var frontside = "<a href=\"javascript:void(0)\" onclick=\"showBackside()\"><div class=\"card span4\">" + cards[rand][0]+ "<\/div><\/a>";
	document.getElementById("cardContainer").innerHTML = frontside ;
}

function getFirst(key){

  var cards = getStoreArray(key);
  if (cards.length > 0){
  	var frontside = "<a href=\"javascript:void(0)\" onclick=\"showBackside()\"><div class=\"card span4\">" + cards[0][0 ]+ "<\/div><\/a>";
  	document.getElementById("cardContainer").innerHTML = frontside;
  	rand = 0;
  } else {
	  	var info = "<p>No learning cards in this set! Select annother one or <a href=\"addset.html\">create some cards for this one<\/a> first!"
	  	document.getElementById("cardContainer").innerHTML = info;
	  }

}

function createOptions() {
    var localStorageKeys = Object.keys(localStorage);
    var options = "";
    if (localStorage.length > 0){
    	for (var i = 0; i < localStorage.length; i++){
   	 		options += "<option value=\""+i+"\">" + localStorageKeys[i] + "<\/option>";
		}
		document.getElementById("dropdown").innerHTML = options;
		return false
	} 
	return true;
}

function getSelectedOption(){
	var e = document.getElementById("dropdown");
	var strUser = e.options[e.selectedIndex].text;
	return strUser;
}

function getStoreArray(key) {
  // retrieve playlist from localstorage
  var cardlist = localStorage.getItem(key);

  // if no object has been saved with the given key, initialize an empty array
  if (!cardlist)
    cardlist = new Array();
  else
    cardlist = JSON.parse(cardlist);

  return cardlist;
}


function dropdownChange(){
	deleteCardEntry();
	var key = getSelectedOption();
	getFirst(key);
}

function deleteCardEntry(){
	$(".card").remove();
}

window.onload = init;