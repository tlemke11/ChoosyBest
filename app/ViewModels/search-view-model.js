/**
 * Created by Tyler on 6/10/2017.
 */
// Based this off of
//https://www.packtpub.com/mapt/book/web_development/9781785888656/2/ch02lvl1sec15/the-app-folder
var Observable = require("data/observable").Observable;
var searchViewModel = new Observable();
var frameModule = require('ui/frame');
//Set the defaults
searchViewModel.title = "";
searchViewModel.author = "";
searchViewModel.year = "";
searchViewModel.isbn = "";
searchViewModel.ean = "";
searchViewModel.smImg = "";

searchViewModel.goodReadsRating = "";

var getIt = require("~/plugins/api.js");
console.log("imported the Search View Model");

searchViewModel.goBack= function()  {
    frameModule.topmost().goBack();
}

//This code is modified from https://www.npmjs.com/package/nativescript-barcodescanner
//TODO - this scan function is highly coupled to the model  - break it out like we did with api.js

searchViewModel.searchForTitle = function (submission) {

    //TODO - abstract this function out
    console.log(submission.object.text);
    submission = submission.object.text;
    submission = submission.replace(/[^a-zA-Z0-9\s]+/g, '');
    submission = submission.replace(/[\s]+/g, "_");
    console.log(submission + "parsed text");
    getIt.getItemByTitle(submission)
        .then(function (response) {
                console.log("got to second then statement in searchViewModel" + response);
                // response = JSON.parse(response._bodyInit);
                //return response;
            }
            , function (error) {
                console.log('error in search  api request');
            });
};
exports.searchViewModel = searchViewModel;