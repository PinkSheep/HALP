function init() {
  $("#createButton").click(handleCreateButtonClick);
  $("#saveButton").click(handleSaveButtonClick);
  createOptions();
  dropdownChange();

}

function handleCreateButtonClick(){
  var input = $("#appendedInputButton").val();
	if (!(input==null || input=="")) {
		createKey(input);
		createOptions();
	}
}
function handleSaveButtonClick(){
	var input1 = $("#frontside").val();
	var input2 = $("#backside").val();
	if (!(input1==null || input1=="") && !(input2==null || input2=="")) {
		var key = getSelectedOption();
		saveCards(key,input1,input2);
	}
}

function createKey(key){
	var emptyString = new Array();
	localStorage.setItem(key, JSON.stringify(emptyString));
}


function createOptions() {
    var localStorageKeys = Object.keys(localStorage);
    var options = "";
    for (var i = 0; i < localStorage.length; i++){
   	 	options += "<option value=\""+i+"\">" + localStorageKeys[i] + "<\/option>";
	}
	document.getElementById("dropdown").innerHTML = options;
}

function getSelectedOption(){
	var e = document.getElementById("dropdown");
	var strUser = e.options[e.selectedIndex].text;
	return strUser;
}

function saveCards(key, frontside, backside){
	var card = new Array();
	card.push(frontside,backside);
	var cardlist = getStoreArray(key);
	cardlist.push(card);
	localStorage.setItem(key, JSON.stringify(cardlist));
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
	deleteCardList();
	var key = getSelectedOption();
	addCardList(key);
}

function deleteCardList(){
	$('frontside-list').remove('.card');
	$('backside-list').remove('.card');
}

function addCardList(key){
	var list1 = document.getElementById("frontside-list");
	var list2 = document.getElementById("backside-list");
	var htmlStringFront = "";
	var htmlStringBack = "";
	var a = getStoreArray(key);
	for (var i = 0; i < a.length; i++){
		var cardArray = a[i];
   	 	htmlStringFront += "<div class=\"card\">" + cardArray[0] + "<\/div>";
   	 	htmlStringBack += "<div class=\"card\">" + cardArray[1] + "<\/div>";
	}
	list1.innerHTML = htmlStringFront;
	list2.innerHTML = htmlStringBack;
}

//$('#dropdown').change(dropdownChange);

window.onload = init;
