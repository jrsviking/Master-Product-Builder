//|| Checks for all of the named ranges in a sheet // Figuire out how to make this cycel bother ranges
//|| grab all of the named ranges:from all of the shee

function clv(varValue,varName){ //Console Log Variable name - prints the name and the value of a variable to console
console.log("The value of --" + varName + "-- is:")
console.log(varValue);

};


function testVariables(){
var outputName = "JRS"
var rangeSheetName = "Lookup | "+outputName
var outputSheetName = "Output | "+outputName

clv(outputName,"outputName");
clv(rangeSheetName,"rangeSheetName");
clv(outputSheetName,"outputSheetName");
};


function allMyNamedRanges2() {

    var ss=SpreadsheetApp.getActive();
    var sh=ss.getActiveSheet();
    var rgA=ss.getNamedRanges();
    
   var rangeSheet = ss.setActiveSheet(ss.getSheetByName('Lookup | Mel'),true);
   var maxRows = rangeSheet.getMaxRows(); 
   var lastRow = rangeSheet.getLastRow();
   if (maxRows!=lastRow){
   rangeSheet.deleteRows(lastRow+1, maxRows-lastRow)
  }
    
    var messageMissingRange = []
  
    var names=[]; // Creates the Arra that will hold oall of the named ranges in a sheet
    rgA.forEach(function(rg,i){names.push(rg.getName());});
    console.log("Names: ")
    console.log(names);
   
    
//|| grab the values of 'full range' back: 

 var arrayRangeBuilder = sh.getRange('fullRange').getValues();
// console.log("array Range: ")
// console.log(arrayRangeBuilder);

 var arrayChecker = arrayRangeBuilder.map(checkOneRow);
 
     console.log("array chcecker vaulues: ")
     console.log(arrayChecker);

     function checkOneRow(blendName) {
     
     // set a test variable - current row - which pulls text in from the blendname
     // Cycle through each of the rows in the range builder array and check against them - working. 
     // look for the row in there to see if it is a match 
          
       var testVariable =  blendName[1];
       
       console.log("Value of Test variable is below")
       console.log(testVariable)
       
       var nameIndex = names.indexOf(testVariable);
       console.log("Values of test index")
       console.log(nameIndex)
       
      if (nameIndex==-1){
      console.log("The following Range is missing: "+testVariable);
      var messageMissing=testVariable
      messageMissingRange.push(messageMissing)
      }else{
      console.log("The following range was successfully found: "+testVariable)
      }
     }  
     
   if(messageMissingRange==""){
  rangeBuilderMap2()
   }else{
    var outputSheetName = "NewLoad" //holds the name of out the outputSheet to write to
    var outputSheet = ss.setActiveSheet(ss.getSheetByName(outputSheetName),true)
    SpreadsheetApp.getUi().alert("These are the missing ranges:"+messageMissingRange);
   };
};
    


function flushNew2() {  //|| Deletes all of the old rows on the sheet and clears out cell A2 - run to clear out sheet at start

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


function PasteNew2() { //|| Pastes down the formulas - to run after ranges have been built
  var spreadsheet = SpreadsheetApp.getActive();
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); //Creates Spreadsheet as spreadhsheet object
  var sheet = spreadsheet.getSheets()[0]; // ?? Not sure what this does
  var outputSheet = spreadsheet.setActiveSheet(spreadsheet.getSheetByName('NewLoad'),true); //Grabs new load sehett
  
  //Builds an map of the paste region by finding the last column and last row starting at R2:C2 (fr:fc) to last row / last column (lr:Lc) calculates number of rows(nr) (lr-fr) and no of cols (nc) (lc-fc)
  var lc = outputSheet.getLastColumn();
  var fc = 2
  var nc = lc-fc 
  
  var fr = 2
  var lr = outputSheet.getLastRow();
  var nr = lr-fr

 var rangePaste = outputSheet.getRange(3,fc,nr,nc); //sets range to paste to

 outputSheet.getRange(2,fc,1,nc).copyTo(rangePaste); //sets copy range and pastes in rangePaste
};



function rangeBuilderMap2(){

    flushNew2() //clears out old cells

  // Get Array [Group],[Range]

  	var fullRange = "fullRange" //sets the name of the Named Range in the sheet we are going to grab $$ Enhance by selecting range using get last so it doesn't select empty rows
 	var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); //Creates Spreadsheet as spreadhsheet object
 	var sheet = spreadsheet.getSheets()[0]; // ?? Not sure what this does
  	var arrayRangeBuilder = sheet.getRange(fullRange).getValues();  //Grabs the full range of values here into  arrayRangeBuilder[]
    var outputSheetName = "NewLoad" //holds the name of out the outputSheet to write to
    var outputSheet = spreadsheet.setActiveSheet(spreadsheet.getSheetByName(outputSheetName),true); //Creates output sheet object to write results to by looking for sheet in the outputSheetName


    var arrayTempDemo = arrayRangeBuilder.map(testFunction);  //Uses map array funciton on the full array function 

    
    function testFunction(row){ //|| initalises output sheet & then goes and grabs a row, pulls back the blend array for that row then iterates through it building up all the SKU codes for that group then pastes them into the sheet.
  
      var  spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); //Creates Spreadsheet as spreadhsheet object
      var  sheet = spreadsheet.getSheets()[0]; // Creates a sheet object
      var outputSheet = spreadsheet.setActiveSheet(spreadsheet.getSheetByName('NewLoad'),true); // Set output sheet
      
        var  codeGroup = row[0];  // sets codeGroup (e.g. MA229) as a variable from the first col in the array
        var  codeRange = row[1];  // Stes codeRange (e.e. ToughPoshAllSizes) as a var from the second col of the array
    
      
      var  arrayRange = sheet.getRange(codeRange).getValues(); //Looks for the named range in the sheet that matches codeRange (e.g. ToughPoshAllSizes) and puts it into a new array called arrayRange
    
    //$$ add something here to check to see if a range exists and if not flag that it is missing. 
    
             console.log("Array Range: "+arrayRange)
     
           var arraySku = arrayRange.map(buildSku);
            
           function buildSku(blend){
           console.log('Array Range:'+codeRange);
           var sku  = codeGroup+"-"+blend;
            //outputSheet.appendRow([sku]); 
           var skuArray = [];
           skuArray.push(sku)
           return skuArray;
           }
 
     
    
     
     var output = [codeGroup,arrayRange];
     

     
     var arraySkuLength = arraySku.length;
 
     
     
     //OK hsut going through and figuring out how to append into a selected range. 
     // Then going to add in the ability to do that with longer ranges and append a longer list to the range. 
     
     var lr = outputSheet.getLastRow();
     console.log("last Row:"+lr);
     
     
     var outputRange = outputSheet.getRange(lr,1,arraySkuLength,1);
     outputRange.setValues(arraySku);
     return output;
  
     
 
       
       };
     
}


/*
|| Next steps

1) double check that it is really building tne ranges properly right down to the end 
2) Create a copy of the code and allow the output & range sheets to be pulled from a variable passed into the funcftion so that we can all have our own load / batch sheets - will work much better. 
3) Start rationalising the code abit so it is all broken out into seperate functios properly. 
// Things learnt - log arrays on a secondary line so that it shows the full structure of the array, if you do it with a text value it strips the brackets.
 Make sure you are adding unecessary structure to an array 

*/
