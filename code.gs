function flushNew() {

  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); //Creates Spreadsheet as spreadhsheet object
 	var sheet = spreadsheet.getSheets()[0]; // ?? Not sure what this does
   var outputSheet = spreadsheet.setActiveSheet(spreadsheet.getSheetByName('NewLoad'),true);
  var lr = outputSheet.getLastRow();
 var fr = 3
  var nr = lr-2
  outputSheet.deleteRows(fr,nr);  
  var rangeClear = outputSheet.getRange("A2:A2");
  rangeClear.clear();
  
};



function PasteNew() {
  var spreadsheet = SpreadsheetApp.getActive();

    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); //Creates Spreadsheet as spreadhsheet object
 	var sheet = spreadsheet.getSheets()[0]; // ?? Not sure what this does
   var outputSheet = spreadsheet.setActiveSheet(spreadsheet.getSheetByName('NewLoad'),true);
  var lc = outputSheet.getLastColumn();
  console.log("lc="+lc)
  var fc = 2
   console.log("fc="+fc)
  var nc = lc-fc 
   console.log("nc="+nc)
  var fr = 2
  console.log("fr="+fr)
  var lr = outputSheet.getLastRow();
  console.log("lr="+lr)
  var nr = lr-fr
  console.log("nr="+nr)

 var rangePaste = outputSheet.getRange(3,fc,nr,nc);

 outputSheet.getRange(2,fc,1,nc).copyTo(rangePaste);
};


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

    flushNew()

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
      //outputSheet.appendRow([sku]); 
     var skuArray = [];
     skuArray.push(sku)
     return skuArray;
    
     }
     
     
     
     var output = [codeGroup,arrayRange];
     
     console.log (arraySku);
     
     var arraySkuLength = arraySku.length;
     console.log(arraySkuLength);
    
     
     
     //OK hsut going through and figuring out how to append into a selected range. 
     // Then going to add in the ability to do that with longer ranges and append a longer list to the range. 
     
     var lr = outputSheet.getLastRow();
     console.log("last Row:"+lr);
     
     
     var outputRange = outputSheet.getRange(lr,1,arraySkuLength,1);
     outputRange.setValues(arraySku);
     return output;
  
     
 
       
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

