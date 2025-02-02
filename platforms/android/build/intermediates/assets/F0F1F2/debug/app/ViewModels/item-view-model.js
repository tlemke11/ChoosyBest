/**
 * Created by Tyler on 6/10/2017.
 */
// Based this off of
//https://www.packtpub.com/mapt/book/web_development/9781785888656/2/ch02lvl1sec15/the-app-folder
var Observable = require("data/observable").Observable;
var itemViewModel = new Observable();
var frameModule = require('ui/frame');
//Set the defaults
itemViewModel.title = "";
itemViewModel.author = "";
itemViewModel.year = "";
itemViewModel.isbn = "";
itemViewModel.ean = "";
itemViewModel.smImg = "";
itemViewModel.mdImg = "";
itemViewModel.lgImg = "";
itemViewModel.goodReadsRating = "";

var getIt = require("~/plugins/api.js");
console.log("imported the Item View Model");
console.log(itemViewModel);


//Todo - move this as well - need to refactor
itemViewModel.loadSearchView = function() {
    frameModule.topmost().navigate('Views/Search/search');
}
itemViewModel.goBack = function(){
    frameModule.topmost().goBack();
}//End todo


//This code is modified from https://www.npmjs.com/package/nativescript-barcodescanner
//TODO - this scan function is highly coupled to the model  - break it out like we did with api.js

itemViewModel.scanIt = function() {


    frameModule.topmost().navigate('Views/Item/item');

    var BarcodeScanner = require("nativescript-barcodescanner").BarcodeScanner;
    var barcodescanner = new BarcodeScanner();
    console.log("now inside of scan!");
    barcodescanner.scan({
        //TODO - Should we limit the input format types? Im mostly worried about qrcode inputs and validation with
        // the APIs
        //formats: "UPC_E",   // Pass in of you want to restrict scanning to certain types
        cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
        cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)
        message: "Use the volume buttons for extra light", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
        showFlipCameraButton: true,   // default false
        preferFrontCamera: false,     // default false
        showTorchButton: true,        // default false
        beepOnScan: true,             // Play or Suppress beep on scan (default true)
        torchOn: false,               // launch with the flashlight on (default false)
        resultDisplayDuration: 500,   // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
        orientation: "landscape",     // Android only, optionally lock the orientation to either "portrait" or "landscape"
        openSettingsIfPermissionWasPreviouslyDenied: true // On iOS you can send the user to the settings app if access was previously denied
    }).then(
        function (result) {
            // console.log("Scan format: " + result.format);
            // console.log("Scan text:   " + result.text);
            // return getIt.response();

            //TODO - this should all be in scan.js but I can't get it to work
            itemViewModel.set("title", "Loading... Please wait");
            itemViewModel.set("year", "");
            itemViewModel.set("author", "");
            itemViewModel.set("isbn", "");
            itemViewModel.set("ean", "");
            itemViewModel.set("smImg", "");
            itemViewModel.set("mdImg", "");
            itemViewModel.set("lgImg", "");
            itemViewModel.set("goodReadsRating", "");
            //fetchModule.fetch("http://tylerlemke.me/bookbueno/public/api/v1/book/title/" + result.text, {
               //method: 'GET' })
            getIt.getItemByBarcode(result.text)
            .then(function (response) {
                        console.log("got to second then statement in itemviewmodel" + response);
                        response = JSON.parse(response._bodyInit);
                        itemViewModel.set("title", response.title);
                        itemViewModel.set("year", response.year);
                        itemViewModel.set("author", response.author);
                        itemViewModel.set("isbn", response.isbn);
                        itemViewModel.set("ean", response.ean);
                        itemViewModel.set("smImg", response.smImg);
                        itemViewModel.set("mdImg", response.mdImg);
                        itemViewModel.set("lgImg", response.lgImg);
                        itemViewModel.set("goodReadsRating", "Goodreads:"+response.goodReadsAverageRating+"/5 \("+response.goodReadsRatingsCount+" Ratings\)");
                    }
                    , function (error) {
                        console.log('error in book api request');
                        console.log('http://tylerlemke.me/bookbueno/public/api/v1/book/title/' + id);
                        console.log(error);
                    });
        });
};
exports.itemViewModel = itemViewModel;







































































































































































