/**
 * Created by Tyler on 6/10/2017.
 */
// Based this off of
//https://www.packtpub.com/mapt/book/web_development/9781785888656/2/ch02lvl1sec15/the-app-folder
var Observable = require("data/observable").Observable;
var itemViewModel = new Observable();
//var frameModule = require('ui/frame');
var getIt = require("~/plugins/api.js");

//Set the defaults
itemViewModel.title = "";
itemViewModel.author = "";
itemViewModel.year = "";
itemViewModel.isbn = "";
itemViewModel.asin = "";
itemViewModel.smImg = "";
itemViewModel.mdImg = "";
itemViewModel.lgImg = "";
itemViewModel.reviewsIFrame = "";
itemViewModel.actors = "";
itemViewModel.rating = "";
itemViewModel.releaseDate = "";
itemViewModel.upc = "";
itemViewModel.newPrice = "";
itemViewModel.usedPrice = ""
itemViewModel.detailPageUrl = "";

console.log("imported the Item View Model");
console.log(itemViewModel);

//This code is modified from https://www.npmjs.com/package/nativescript-barcodescanner
//TODO - this scan function is highly coupled to the model  - break it out like we did with api.js

itemViewModel.scanIt = function() {

    var BarcodeScanner = require("nativescript-barcodescanner").BarcodeScanner;
    var barcodescanner = new BarcodeScanner();
    console.log("now inside of scan!");
    barcodescanner.scan({
        formats: "UPC_E, EAN_13",   // Pass in of you want to restrict scanning to certain types
        cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
        cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)
        message: "Use the volume buttons for extra light", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
        //showFlipCameraButton: true,   // default false
        preferFrontCamera: false,     // default false
        showTorchButton: true,        // default false
        beepOnScan: true,             // Play or Suppress beep on scan (default true)
        torchOn: false,               // launch with the flashlight on (default false)
        resultDisplayDuration: 500,   // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
        //orientation: "landscape",     // Android only, optionally lock the orientation to either "portrait" or "landscape"
        openSettingsIfPermissionWasPreviouslyDenied: true // On iOS you can send the user to the settings app if access was previously denied
    }).then(
        function (result) {
            // console.log("Scan format: " + result.format);
            // console.log("Scan text:   " + result.text);
            // return getIt.response();

            //TODO - this should all be in scan.js but I can't get it to work
            clearModel();

            //fetchModule.fetch("http://tylerlemke.me/bookbueno/public/api/v1/book/title/" + result.text, {
            //method: 'GET' })
            getIt.getItemByBarcode(result.text)
                .then(function (response) {
                        //console.log("got to second then statement in itemviewmodel" + JSON.stringify(response));      //console.log("got to second then statement in itemviewmodel" + response);

                        console.log(response.status + "here is the status");

                        if (response.status !== 200){
                            itemViewModel.set("title", "Error with Fetching Data, Please Try Title Search");
                        } else {

                            response = JSON.parse(response._bodyInit);
                            console.log("got to second then statement in itemviewmodel" + JSON.stringify(response));
                            setModelValues(response);
                        }
                    }
                    , function (error) {
                        console.log('error in book api request');
                        console.log('http://tylerlemke.me/bookbueno/public/api/v1/book/title/' + id);
                        console.log(error);
                    });
        });
};

itemViewModel.getIt = function(id) {
    clearModel();
    getIt.getItemByBarcode(id).then(function (response) {
            //console.log("got to second then statement in itemviewmodel" + JSON.stringify(response));      //console.log("got to second then statement in itemviewmodel" + response);

            console.log(response.status + "here is the status");

            if (response.status !== 200){
                itemViewModel.set("title", "Error with Fetching Data, Please Try Title Search");
            } else {

                response = JSON.parse(response._bodyInit);
                console.log("got to second then statement in itemviewmodel" + JSON.stringify(response));
                setModelValues(response);
            }
        }
        , function (error) {
            console.log('error in book api request');
            console.log('http://tylerlemke.me/bookbueno/public/api/v1/book/title/' + id);
            console.log(error);
        });
};

function clearModel(){
    itemViewModel.set("title", "");
    itemViewModel.set("year", "");
    itemViewModel.set("author", "");
    itemViewModel.set("isbn", "");
    itemViewModel.set("asin", "");
    itemViewModel.set("smImg", "");
    itemViewModel.set("mdImg", "");
    itemViewModel.set("lgImg", "");
    itemViewModel.set("actors", "");
    itemViewModel.set("reviewsIFrame", "");
    itemViewModel.set("rating", "");
    itemViewModel.set("upc", "");
    itemViewModel.set("releaseDate", "");
    itemViewModel.set("addButtonVisibility", 'collapsed');
    itemViewModel.set("addButtonVisibility", 'visible');
    itemViewModel.set("newPrice",  "");
    itemViewModel.set("usedPrice", "");
    itemViewModel.set("detailPageUrl", "");
}

function setModelValues(response){
    itemViewModel.set("title", response.title);
    itemViewModel.set("year", response.year);
    itemViewModel.set("author", response.author);
    itemViewModel.set("isbn", response.isbn);
    itemViewModel.set("asin", response.asin);
    itemViewModel.set("smImg", response.smImg);
    itemViewModel.set("mdImg", response.mdImg);
    itemViewModel.set("lgImg", response.lgImg);
    itemViewModel.set("actors", response.actors);
    itemViewModel.set("reviewsIFrame", response.reviewsIFrame);
    itemViewModel.set("rating", response.rating);
    itemViewModel.set("upc", response.upc);
    itemViewModel.set("releaseDate", response.releaseDate);
    itemViewModel.set("addButtonVisibility", 'visible');
    itemViewModel.set("disableLoad", 'collapsed');
    itemViewModel.set("newPrice",  response.newPrice);
    itemViewModel.set("usedPrice", response.usedPrice);
    itemViewModel.set("detailPageUrl", response.detailPageUrl);
}

exports.itemViewModel = itemViewModel;


