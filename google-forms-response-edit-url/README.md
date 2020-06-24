# Add the Edit Response URL of Google Forms in Google Sheets

Original from:
https://www.labnol.org/code/20540-edit-form-response-spreadsheet-url

There is a bug in the originial in certain cases where the form response timestimp is a second behinde the spreadsheet timestimp.

## How to use?

Enable resonse editing in the form.

In the responses spreadsheet click `Tools` -> `Script editor`.

Paste the content of the `google-forms-response-edit-url.js` file.

Modify `responseColumn` at the begining of `addFormResponseUrl`.

Click `Select function`. Choose `createFormTrigger`. Click the run icon.