//Created By Tyler Lemke
//5/29/2016
//var mdImg = 'https://images-na.ssl-images-amazon.com/images/I/61fUdXWsIcL._SL75_.jpg';
var itemVm = require("../../ViewModels/item-view-model.js");
function onPageLoad (data) {
    var page = data.object;
 console.log("item page loaded");
 page.bindingContext = itemVm.itemViewModel;
}

exports.onPageLoad = onPageLoad;


//exports.scanIt = require("~/plugins/scan.js").scan;
