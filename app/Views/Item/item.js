//Created By Tyler Lemke
//5/29/2016
//var mdImg = 'https://images-na.ssl-images-amazon.com/images/I/61fUdXWsIcL._SL75_.jpg';
var itemVm = require("../../ViewModels/item-view-model.js");
var frameModule = require('ui/frame');
function onPageLoad (data) {
    var page = data.object;
 console.log("item page loaded");
 page.bindingContext = itemVm.itemViewModel;

}

//scan it function - bind to this

exports.onPageLoad = onPageLoad;

//TODO - Extremely hard time refactoring this seciton - need to move out but have not found a great way to do it.
//var actionBarVm = require("../../ViewModels/actionBar-view-model.js");
exports.loadSearchView  = function(){
    frameModule.topmost().navigate('Views/Search/search');
}
    exports.loadItemView = function () {
        frameModule.topmost().navigate('Views/Item/item');
        itemVm.itemViewModel.scanIt();
}
