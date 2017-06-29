//Created By Tyler Lemke
//5/29/2016

var itemVm = require("../../ViewModels/item-view-model.js");
// var utils = require("~/plugins/utils");
function onPageLoad (data) {
    var page = data.object;
    console.log("main page loaded");
    page.bindingContext = itemVm.itemViewModel;
}

// function utilContext (data) {
//     var page = data.object;
//     page.bindingContext = utils;
// }


exports.onPageLoad = onPageLoad;
// exports.utilContext = utilContext;

