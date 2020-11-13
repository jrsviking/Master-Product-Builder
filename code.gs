/*
*****************************************************************************************
*****************************************************************************************
|| OVERVIEW ||

	This code builds up a set of product codes (group Code - material - size) by letting a user
	create a range of material & size blends and combine them with a group code.
	The tool then builds up a complete list of product codes that can then be used in the Master product Uploader and the Sign Creator Uploader
*****************************************************************************************
*****************************************************************************************
*/


// || BUILD CUSTOM MENU OPTIONS ||
	// Creates a Custom Menu called Sheet Builder
	// Adds in a menu item that calls a prompt funcito. 
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('🔮 Magic Doofer')

  .addItem('Compile Range', 'compileRange')
  .addSeparator()
  .addItem('Compile filter', 'compileFilter')
  .addSeparator()
   .addItem('Add New Sheet', 'addNewSheet')
   .addSeparator()
   .addItem('Add To Batch1', 'addtoBatch1') 
    .addSeparator()
   .addItem('Check to see if sheet exists', 'checkforsheet(output)') 

   .addToUi();



}

//function adds new sheet with the batch name

function addNewSheet(batchName) {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.insertSheet(3);
  spreadsheet.getActiveSheet().setName(batchName);
};



// || Test funtion to test adding data to a different sheet|| Can be DELETED
function addtoBatch1(){
 var spreadsheet = SpreadsheetApp.getActive();
  var sheetBatch = spreadsheet.setActiveSheet(spreadsheet.getSheetByName('Batch1'),true);
 var sheetContent = 'bob'
 sheetBatch.appendRow([sheetContent]);

};


function checkForSheet(sheetName)
{
	var spreadsheet = SpreadsheetApp.getActive();
	var checkSheet = spreadsheet.getSheetByName(sheetName);

 if (!checkSheet){
  console.log("Sheet doesn't exist - return false")
 return false;

  // ss.insertSheet('_EmailList');
} else {

 console.log("Sheet does exist -  return true") 
 return true;
}
};



// || CREATE DIALOGUE BOX AND CALL RANGE BUILDER FUNCTION ||
	// Pops up a dialogue box where the user can cancel or enter the Batch Code they want to run. 
	// If they enter the batch code, it calls the RangeBuilder function and passes the  Batch Code to it. 
function compileRange() {
  var ui = SpreadsheetApp.getUi(); // Same variations.
  var result = ui.prompt(
      'Please enter the batch code you want to run',
      ui.ButtonSet.OK_CANCEL);

  // Process the user's response.
  var button = result.getSelectedButton();
  var text = result.getResponseText();
  if (button == ui.Button.OK) {
    
  	//@@ Build check in here to see if out put already exists and if so call through an alert. 
  	// Need to modify this check line so that it goes and checks to see if it can fetch / if a sheet with this name eixsits
  	// if the sheet exists then throw an error 

      if (checkForSheet(text)){ // this is the line I need to change to replace with a check to see if the spreadsheet exists. 
            ui.alert('This output sheet already exists');
        } else {

        rangeBuilder(text)
        };
  } else if (button == ui.Button.CANCEL) {
    // User clicked "Cancel".
    ui.alert('I didn\'t get your name.');
  } else if (button == ui.Button.CLOSE) {
    // User clicked X in the title bar.
    ui.alert('You closed the dialog.');
  }
};


// || BUILD RANGE DATA AND APPEND IT TO THE LOAD SHEET ||
	// Gets the active Spreadsheet
	// Gets a 2D array currently defined as a named Range the 2D array is built of [[codeGroup],[codeRange]] 
	// codeGroup = the current group code
	// codeRange = the name of a Named Range that contains all of the size/material blends e.g. all of the Decoratives or all of the standard blends
	// The function then loops through the rows in the arrayRangeBuilder with each row being an unqie group code then goes and builds a second array by
	//     looking for the named range in codeRange to build the arrayRange it then cycles through every value in this array building groupCode + arrayRange value
	// It then appends that value to a new row in the spreadsheet with the value codeProduct which should be a unque SKU code. 
function rangeBuilder(codeBatch){

  // Get 3D Array [Group],[Range],[Batch]
  // Set variablees

  	var fullRange = "fullRange" //grabs the full range pre-filtering
 	var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); //Creates Spreadsheet as spreadhsheet object
 	var sheet = spreadsheet.getSheets()[0]; // ?? Not sure what this does
   
  	var preRangeBuilder = sheet.getRange(fullRange).getValues();  //Grabs the full range of options
  	var userProperties = PropertiesService.getUserProperties(); // Creates an object to grab user propertyies - global user level variables
	userProperties.setProperty('batchID',codeBatch); // Grabs the batch ID from the functinon handler and assigns it to a user level key  
	var batchName = userProperties.getProperty('batchID'); // writes the values of the batch name to a variable to be used to write new output sheet
   
//creates a new sheet called batchName

	addNewSheet(batchName)

	 var outputSheet = spreadsheet.setActiveSheet(spreadsheet.getSheetByName(batchName),true); //Creates output sheet object to write results to by looking for sheet named 'output'
  //Define function for checking to see if col 3 in the array matches the batch variable
 	var matchBatch = function(refBatch) {
		var userProperties = PropertiesService.getUserProperties();
		var testRange = userProperties.getProperty('batchID');
 		console.log(testRange)
		 if(refBatch[2] == testRange)
				  {
				    return true;
				  }
		 else
		  	{	
		  return false;
		 	}   
	 }
	
	var arrayRangeBuilder = preRangeBuilder.filter(matchBatch)
	console.log ("arrayRangeBuilder:"+arrayRangeBuilder)
	
	for (var keyGroup in arrayRangeBuilder){
		    var codeGroup = arrayRangeBuilder[keyGroup][0];
		    var codeRange = arrayRangeBuilder[keyGroup][1];
		    var arrayRange = sheet.getRange(codeRange).getValues(); 
		    
		    for (var keyRange in arrayRange){
		    var codeProduct = codeGroup+"-"+arrayRange[keyRange]
		    outputSheet.appendRow([codeProduct]); 
		}
	}
};
  
  // END | Test of creating filter on the array with this function. 
  




/*
*****************************************************************************************
*****************************************************************************************
|| NEXT STEPS ||

	1) Move blends and named ranges on to seperate sheet
	2) Put in error checking so that if a named sheet already exists it doesn't re-create
	3) Build in proper range sheets 
	4) Get this set up with data so that it replacs the range builder sheet for now - even if you have to manually paste in whenyou build it. 
	5) See if I can re-factor / rationalise sheet to make it easier going forward
	6) migrate to the new sheet. 

*****************************************************************************************
*****************************************************************************************
/* 


 /*
|| DEPRECATED CODE - CAN BE DELETED BY THE BEGINNING OF DECEMBER


	// This is taking the text from The filter range. 
	/*
	function compileFilter() {
	  var ui = SpreadsheetApp.getUi(); // Same variations.
	  var result = ui.prompt(
	      'Please enter the batch code you want to run',
	      ui.ButtonSet.OK_CANCEL);

	  // Process the user's response.
	  var button = result.getSelectedButton();
	  var textFilter = result.getResponseText();
	  if (button == ui.Button.OK) {
	    
	    filterArray(textFilter)
	    
	  } else if (button == ui.Button.CANCEL) {
	    // User clicked "Cancel".
	    ui.alert('I didn\'t get your name.');
	  } else if (button == ui.Button.CLOSE) {
	    // User clicked X in the title bar.
	    ui.alert('You closed the dialog.');
	  }
	}


	function  testArray(){

	 var ss = SpreadsheetApp.getActiveSpreadsheet();
	 var sheet = ss.getSheets()[0];
	 var rangeArray = sheet.getRange("rangeBlend").getValues();
	  

	console.log(rangeArray);

	console.log(rangeArray[1][1]);

	var results = rangeArray[1].join("-");

	console.log(results);




	var rangeArray = [
	["MA229","rangePV"],
	["MH620","rangeDecorative"],
	["SB241","rangeSelected"]
	];

	}




	function saveData() {

	/*
	|| NEXT STEPS ||
	Now I want to change the loops so that it goes through each group code in the range 
	Then finds it's matching blend code and then loops. 

	*/



	// Create data objectes from active spreadhsheet and sheet so that we can access data
	// calling "sheet" variable lets us access data in this sheet
	/*

	  var ss = SpreadsheetApp.getActiveSpreadsheet();
	  var sheet = ss.getSheets()[0];
	 
	 
	// This pulls in a variable from the sheet for what is the selected blend list - currently pulling it from a named range 
	var blendRange = sheet.getRange("rangeSelected").getValues();

	// grouCodeArray will hold the values of groupCodes in a list - currently pulls them back from  a named range
	 var groupCodeArray = sheet.getRange("GroupCode").getValues();

	// blendCodeArray will hold the values of blendCodes in a list - currently pulls them back from a sheet range A2 A4
	var blendCodeArray = sheet.getRange(blendRange).getValues();
	 
	 
	// Detsp through all of the values in the groupCode array in order, then inner loop grabs the blendCode values
	// Then takes this array and appends a row to the sheet and adds the values
	 for (var groupKey in groupCodeArray)  {
	    var groupValue= groupCodeArray[groupKey];
	    for (var blendKey in blendCodeArray){
	     var blendValue= blendCodeArray[blendKey];
	    sheet.appendRow([groupValue+"-"+blendValue]);    
	  } 
	}
	}
	*/
	/*
	function saveData() {

	// || ARCHIVED WORKING VERSION |||

	// Create data objectes from active spreadhsheet and sheet so that we can access data
	// calling "sheet" variable lets us access data in this sheet


	  var ss = SpreadsheetApp.getActiveSpreadsheet();
	  var sheet = ss.getSheets()[0];
	 
	 
	// This pulls in a variable from the sheet for what is the selected blend list - currently pulling it from a named range 
	var blendRange = sheet.getRange("rangeSelected").getValues();

	// grouCodeArray will hold the values of groupCodes in a list - currently pulls them back from  a named range
	 var groupCodeArray = sheet.getRange("GroupCode").getValues();

	// blendCodeArray will hold the values of blendCodes in a list - currently pulls them back from a sheet range A2 A4
	var blendCodeArray = sheet.getRange(blendRange).getValues();
	 
	 
	// Detsp through all of the values in the groupCode array in order, then inner loop grabs the blendCode values
	// Then takes this array and appends a row to the sheet and adds the values
	 for (var groupKey in groupCodeArray)  {
	    var groupValue= groupCodeArray[groupKey];
	    for (var blendKey in blendCodeArray){
	     var blendValue= blendCodeArray[blendKey];
	    sheet.appendRow([groupValue+"-"+blendValue]);   
	    
	//    
	   

	  } 
	}
	}

	function rangeTest(){
	  
	var dataTest = rangeBuilder("batchOne");

	console.log(dataTest)

	}
*/

/*

var filtered = data.filter(function (row) {
    return row[1].getFullYear() === 2016;
  });

*/

//  CHALLENGE  - Need to pass the BatchID dowb to 

/*

function filterArray(textMatch){
var  arrayStart = [['a','1','bob'],['b','2','tracy'],['c','3','broohaha']] // is the array
console.log(arrayStart)
var arrayFiltered = arrayStart.filter(matchBatch);// arrayFiltered is the new array
console.log(arrayFiltered)
};
*/
/*

var matchBatch = function(refBatch) {
var userProperties = PropertiesService.getUserProperties();
var testRange = userProperties.getProperty('batchID');
console.log(testRange)


  if(refBatch[2] == testRange)
  {
    return true;
    
  }else{
  
  return false;
  }
  */




