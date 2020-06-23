/*
 * Modified by Balazs Hamorszky
 * Original from:
 * https://www.labnol.org/code/20540-edit-form-response-spreadsheet-url
 * Original version copyright:
 * Written by Amit Agarwal
 * Web: digitalinspiration.com
 * Email: amit@labnol.org
 * MIT License
 */

function createFormTrigger() {
    var triggerName = 'addFormResponseUrl';
    ScriptApp.newTrigger(triggerName)
	.forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
	.onFormSubmit()
	.create();
}

function addFormResponseUrl(e) {
    // Get the Google Form linked to the response
    var responseSheet = e.range.getSheet();
    var googleFormUrl = responseSheet.getFormUrl();
    var googleForm = FormApp.openByUrl(googleFormUrl);

    // Get the form response based on the timestamp
    var timestamp = new Date(e.namedValues["Timestamp"]);
    
    Logger.log(timestamp);
    var formResponse = retryGetResponses(googleForm, timestamp);

    // Get the Form response URL and add it to the Google Spreadsheet
    var responseUrl = formResponse.getEditResponseUrl();
    var row = e.range.getRow();
    var responseColumn = 10; // Column where the response URL is recorded.
    responseSheet.getRange(row, responseColumn).setValue(responseUrl);
}

function retryGetResponses(googleForm, timestamp) {
    for (var n=0; n<=10; n++) {
	var formResponses = googleForm.getResponses(timestamp);
	if(0 === formResponses.length) {
	    timestamp.setSeconds(timestamp.getSeconds() - 1);
	} else {
	    var formResponse = formResponses.pop();
	    return formResponse;
	} 
    }
}
