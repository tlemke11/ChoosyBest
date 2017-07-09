/**
 * Created by Tyler on 6/10/2017.
 */
// Based this off of
//https://www.packtpub.com/mapt/book/web_development/9781785888656/2/ch02lvl1sec15/the-app-folder
var ObservableArray = require("data/observable-array").ObservableArray;
var searchViewModel = new ObservableArray();
var frameModule = require('ui/frame');
var dialog = require('ui/dialogs');
//Set the defaults

var getIt = require("~/plugins/api.js");
console.log("imported the Search View Model");

searchViewModel.goBack = function () {
    frameModule.topmost().goBack();
}


//This code is modified from https://www.npmjs.com/package/nativescript-barcodescanner
//TODO - this scan function is highly coupled to the model  - break it out like we did with api.js

searchViewModel.searchForTitle = function (submission) {
    clearModel();
    //TODO - abstract this function out
    console.log(submission.object.text);
    submission = submission.object.text;
    submission = submission.replace(/[^a-zA-Z0-9\s]+/g, '');
    submission = submission.replace(/[\s]+/g, "_");
    console.log(submission + "parsed text");
    getIt.getItemByTitle(submission)
        .then(function (response) {
                console.log(response.status + "here is the status");

                if (response.status !== 200) {
                    var options = {
                        title: "Server Error",
                        message: "Please use different keywords. There was an error with your search. ",
                        okButtonText: "Ok"};
                    dialog.confirm(options);
                } else {

                    response = JSON.parse(response._bodyInit);
                    console.log("got to second then statement in searchviewmodel" + JSON.stringify(response));
                    setModelValues(response);
                }
            }
            , function (error) {
                console.log('error in search  api request');
            });
};
exports.searchViewModel = searchViewModel;


function setModelValues(response) {
    var count = 0;
    for (var i in response) {
        searchViewModel.push(response[i]);
    }
    /*    for (var i in response){
     if(response.hasOwnProperty(i)){

     response[i].title = i.title;
     response[i].author = i.author;
     response[i].asin = i.asin;
     response[i].smImg = i.smImg;
     response[i].mdImg = i.mdImg;
     response[i].lgImg = i.lgImg;
     response[i].rating = i.rating;
     response[i].releaseDate = i.releaseDate;
     response[i].productGroup = i.productGroup;

     searchViewModel.push(response[i]);
     }
     }



     searchViewModel.set("title", response.title);
     searchViewModel.set("author", response.author);
     searchViewModel.set("asin", response.asin);
     searchViewModel.set("smImg", response.smImg);
     searchViewModel.set("mdImg", response.mdImg);
     searchViewModel.set("lgImg", response.lgImg);
     searchViewModel.set("rating", response.rating);
     searchViewModel.set("releaseDate", response.releaseDate);
     searchViewModel.set("productGroup", response.productGroup);*/
}

function clearModel() {
    while (searchViewModel.length) {
        //infinite loop - yep im that silly BLOG material . called .pop instead of .pop()
        searchViewModel.pop();
    }
}