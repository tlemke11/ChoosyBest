//Created By Tyler Lemke
//5/29/2016
var itemVm = require("../../ViewModels/item-view-model.js");
var social = require("../../plugins/social.js");
var frameModule = require('ui/frame');
function onPageLoad (data) {
    var page = data.object;
    console.log("main page loaded");
    page.bindingContext = itemVm.itemViewModel;
}

//TODO - Extremely hard time refactoring this seciton - need to move out but have not found a great way to do it.
//var actionBarVm = require("../../ViewModels/actionBar-view-model.js");

exports.loadSearchView  = function(){
    frameModule.topmost().navigate('Views/Search/search');
}
exports.loadItemView = function () {
    frameModule.topmost().navigate('Views/Item/item');
    itemVm.itemViewModel.scanIt();
}

exports.share = social.share;

exports.onPageLoad = onPageLoad;

