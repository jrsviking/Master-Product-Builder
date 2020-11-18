function rangeBuilder(){

  // Get 3D Array [Group],[Range],[Batch]
  // Set variablees

  	var fullRange = "fullRange" //grabs the full range pre-filtering
 	var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); //Creates Spreadsheet as spreadhsheet object
 	var sheet = spreadsheet.getSheets()[0]; // ?? Not sure what this does
  	var arrayRangeBuilder = sheet.getRange(fullRange).getValues();  //Grabs the full range of options
    console.log(arrayRangeBuilder)
 //creates a new sheet called batchName
   var outputSheet = spreadsheet.setActiveSheet(spreadsheet.getSheetByName('NewLoad'),true); //Creates output sheet object to write results to by looking for sheet named 'output'
  //Define function for checking to see if col 3 in the array matches the batch variable
/*
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
*/

	//var arrayRangeBuilder = preRangeBuilder
	
	for (var keyGroup in arrayRangeBuilder){
		    var codeGroup = arrayRangeBuilder[keyGroup][0];
		    var codeRange = arrayRangeBuilder[keyGroup][1];
		    var arrayRange = sheet.getRange(codeRange).getValues(); 
		    for (var keyRange in arrayRange){
		    var codeProduct = codeGroup+"-"+arrayRange[keyRange]
		    outputSheet.appendRow([codeProduct]); 
		}
	} 
}
