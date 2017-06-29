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
searchViewModel.mdImg = "";
searchViewModel.lgImg = "";
searchViewModel.goodReadsRating = "";

var getIt = require("~/plugins/api.js");
console.log("imported the Search View Model");


//Todo - move this as well - need to refactor - these are duplicates
searchViewModel.loadSearchView = function() {
    frameModule.topmost().navigate('Views/Search/search');
}
searchViewModel.goBack = function(){
    frameModule.topmost().goBack();
}//End todo


//This code is modified from https://www.npmjs.com/package/nativescript-barcodescanner
//TODO - this scan function is highly coupled to the model  - break it out like we did with api.js

searchViewModel.searchForTitle = function(submission) {
            getIt.getItemByTitle(submission)
                .then(function (response) {
                        console.log("got to second then statement in searchViewModel" + response);
                        response = JSON.parse(response._bodyInit);
                        searchViewModel.set("title", response.title);
                        searchViewModel.set("year", response.year);
                        searchViewModel.set("author", response.author);
                        searchViewModel.set("isbn", response.isbn);
                        searchViewModel.set("ean", response.ean);
                        searchViewModel.set("smImg", response.smImg);
                        searchViewModel.set("mdImg", response.mdImg);
                        searchViewModel.set("lgImg", response.lgImg);
                        searchViewModel.set("goodReadsRating", "Goodreads:"+response.goodReadsAverageRating+"/5 \("+response.goodReadsRatingsCount+" Ratings\)");
                    }
                    , function (error) {
                        console.log('error in book api request');
                        console.log('http://tylerlemke.me/bookbueno/public/api/v1/book/title/' + id);
                        console.log(error);
                    });}
exports.searchViewModel = searchViewModel;