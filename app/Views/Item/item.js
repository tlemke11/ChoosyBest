//Created By Tyler Lemke
//5/29/2016
//var mdImg = 'https://images-na.ssl-images-amazon.com/images/I/61fUdXWsIcL._SL75_.jpg';
var itemVm = require("../../ViewModels/item-view-model.js");
var frameModule = require('ui/frame');
var storage = require("../../plugins/storage.js");
function onPageLoad (data) {
    var page = data.object;
 console.log("item page loaded");
 page.bindingContext = itemVm.itemViewModel;
if (page.navigationContext.id != null){
    //get load the api and stuff!
    itemVm.itemViewModel.getIt(page.navigationContext.id);
}
}

//scan it function - bind to this

exports.onPageLoad = onPageLoad;

//TODO - Extremely hard time refactoring this seciton - need to move out but have not found a great way to do it.
//var actionBarVm = require("../../ViewModels/actionBar-view-model.js");
exports.loadSearchView  = function(){
    frameModule.topmost().navigate('Views/Search/search');
};
    exports.loadItemView = function () {
        frameModule.topmost().navigate('Views/Item/item');
        itemVm.itemViewModel.scanIt();
};
exports.loadMainView = function () {
    frameModule.topmost().navigate('Views/Main/main');
};
//End todo


//BLOG
// if you don't wrap the code below in a function, this automatically gets loaded when item.js gets called. This is a
//common error that I am sure many coders will run into.
exports.addToBookmarks = function(){
storage.addToBookmarks(itemVm.itemViewModel.asin, itemVm.itemViewModel.title, itemVm.itemViewModel.smImg)};
