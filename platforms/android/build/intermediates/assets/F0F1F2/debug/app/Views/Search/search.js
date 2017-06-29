//Created By Tyler Lemke
//5/29/2016

var itemVm = require("../../ViewModels/search-view-model.js");

function onPageLoad (data) {
    var page = data.object;
    console.log("scan page loaded");
    page.bindingContext = itemVm.searchViewModel;
}

exports.onPageLoad = onPageLoad;

