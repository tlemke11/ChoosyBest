/*
console.log("imported scan");

var getIt = require("~/plugins/api.js");
//This code is modified from https://www.npmjs.com/package/nativescript-barcodescanner
exports.scan = function() {
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
            console.log("Scan format: " + result.format);
            console.log("Scan text:   " + result.text);
            getIt.getBook(result.text);
        },
        function (error) {
            console.log("No scan: " + error);
        }
    );
};*/
