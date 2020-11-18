function rangeBuilder(){
  // Get 3D Array [Group],[Range],[Batch]
  // Set variablees
  	var fullRange = "fullRange" //grabs the full range pre-filtering
    //  $$ Enhance by selecting range using get last.  
 	var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); //Creates Spreadsheet as spreadhsheet object
 	var sheet = spreadsheet.getSheets()[0]; // ?? Not sure what this does
  	var arrayRangeBuilder = sheet.getRange(fullRange).getValues();  //Grabs the full range of options
 //creates a new sheet called batchName
   var outputSheet = spreadsheet.setActiveSheet(spreadsheet.getSheetByName('NewLoad'),true); //Creates output sheet object to write results to by looking for sheet named 'output'
   
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


function rangeBuilderMap(){
  // Get 3D Array [Group],[Range],[Batch]
  // Set variablees
  	var fullRange = "fullRange" //grabs the full range pre-filtering
    //  $$ Enhance by selecting range using get last.  
 	var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); //Creates Spreadsheet as spreadhsheet object
 	var sheet = spreadsheet.getSheets()[0]; // ?? Not sure what this does
  	var arrayRangeBuilder = sheet.getRange(fullRange).getValues();  //Grabs the full range of options
    console.log(arrayRangeBuilder)
 //creates a new sheet called batchName
   var outputSheet = spreadsheet.setActiveSheet(spreadsheet.getSheetByName('NewLoad'),true); //Creates output sheet object to write results to by looking for sheet named 'output'
// ok to split this out Map calls a function.  


    var arrayTempDemo = arrayRangeBuilder.map(testFunction) 
    console.log(arrayTempDemo);
    
    function testFunction(row){
  
      var  spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); //Creates Spreadsheet as spreadhsheet object
      var  sheet = spreadsheet.getSheets()[0];
      var outputSheet = spreadsheet.setActiveSheet(spreadsheet.getSheetByName('NewLoad'),true);
      
      var  codeGroup = row[0];
      var  codeRange = row[1];
      var  arrayRange = sheet.getRange(codeRange).getValues(); 
      
      
      var arraySku = arrayRange.map(buildSku);
      
     function buildSku(blend){
     
     var sku  = codeGroup+"-"+blend;
      outputSheet.appendRow([sku]); 
     return sku;
    
     }
     
     var output = [codeGroup,arrayRange];
     
  
     console.log (arraySku);
     
     // return output;
   
     
 
       
       };
     
 
  
  
  
   /*

	for (var keyGroup in arrayRangeBuilder){
		    var codeGroup = arrayRangeBuilder[keyGroup][0];
		    var codeRange = arrayRangeBuilder[keyGroup][1];
		    var arrayRange = sheet.getRange(codeRange).getValues(); 
		    for (var keyRange in arrayRange){
		    var codeProduct = codeGroup+"-"+arrayRange[keyRange]
		    outputSheet.appendRow([codeProduct]); 
		}
	} */
}


/*
|| Next steps
1) Update this to use Map function
2) Update this to use find last when selecting range
*/

