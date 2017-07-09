/**
 * Created by Tyler on 6/8/2017.
 */
console.log("imported api file");
var fetchModule = require('fetch');
var dialog = require('ui/dialogs');
//This code is modified from https://www.npmjs.com/package/nativescript-barcodescanner
exports.getItemByBarcode = function(id) {

    console.log("initializing TylerLemke.me API");
    console.log("initialize Get By Barcode API");

    //returning the promise here -
    // https://stackoverflow.com/questions/44480042/update-a-view-model-from-a-json-response-in-an-externally-required-module-plugin
    return fetchModule.fetch("http://tylerlemke.me/choosybest/public/api/v1/item/barcode/"+id, {
            method: 'GET', timeout: 8000
        })

        //TODO -
        //https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
        //implement proper catching and create generic error handling function (see avove
            .then(function(response){
                    console.log('returning responsessss' + JSON.stringify(response));
                console.log(response.status);
                return response;
                    })
        .catch(function(error){
                    console.log('error in book api request');
                    var options = {
                        title: "Error",
                        message: "Please check your internet connection",
                        okButtonText: "Ok"};
                    dialog.confirm(options);
                    console.log(error);
                })
};

exports.getItemByTitle = function(title) {

    console.log("initializing TylerLemke.me API");
    console.log("initialize Get By Title API");
    return fetchModule.fetch("http://tylerlemke.me/choosybest/public/api/v1/item/barcode?title="+title, {
        method: 'GET'
    })

    //TODO -
    //https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
    //implement proper catching and create generic error handling function (see avove
        .then(function(response){
            console.log("http://tylerlemke.me/choosybest/public/api/v1/item/barcode?title="+title);
            //console.log('returning responsessss' + JSON.stringify(response));
            console.log(response.status);
            return response;
        })
        .catch(function(error){
            console.log('error in book api request');
            var options = {
                title: "Error",
                message: "Please check your internet connection",
                okButtonText: "Ok"};
            dialog.confirm(options);
            console.log(error);
        })

};
