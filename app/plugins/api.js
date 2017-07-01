/**
 * Created by Tyler on 6/8/2017.
 */
console.log("imported api file");
var fetchModule = require('fetch');
//This code is modified from https://www.npmjs.com/package/nativescript-barcodescanner
exports.getItemByBarcode = function(id) {

    console.log("initializing TylerLemke.me API");
    //returning the promise here -
    // https://stackoverflow.com/questions/44480042/update-a-view-model-from-a-json-response-in-an-externally-required-module-plugin
    return fetchModule.fetch("http://tylerlemke.me/choosybest/public/api/v1/item/barcode/"+id, {
            method: 'GET'
        })
            .then(function(response){
                    console.log('returning response' + JSON.stringify(response))
                return response;
                    }
                , function(error){
                    console.log('error in book api request');
                    console.log('http://tylerlemke.me/choosybest/public/api/v1/item/barcode/'+id);
                    console.log(error);
                })
};

exports.getItemByTitle = function(title) {

    console.log("initialize Get By Title");
    //returning the promise here -
    // https://stackoverflow.com/questions/44480042/update-a-view-model-from-a-json-response-in-an-externally-required-module-plugin
/*    return fetchModule.fetch("http://tylerlemke.me/bookbueno/public/api/v1/book/title/"+title, {
        method: 'GET'
    })
        .then(function(response){
                console.log('returning response' + JSON.stringify(response))
                return response;
            }
            , function(error){
                console.log('error in book api request');
                console.log('http://tylerlemke.me/bookbueno/public/api/v1/book/title/'+id);
                console.log(error);
            })*/
};
