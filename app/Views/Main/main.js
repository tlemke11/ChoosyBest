//Created By Tyler Lemke
//5/29/2016
var itemVm = require("../../ViewModels/item-view-model.js");
var favsVm = require("../../ViewModels/favorites-view-model.js");
var view = require('ui/core/view');
var social = require("../../plugins/social.js");
var storage = require("../../plugins/storage.js");
var frameModule = require('ui/frame');
function onPageLoad (data) {
    var page = data.object;
    console.log("main page loaded");
    page.bindingContext = favsVm.favoritesViewModel;

    var favoritesList = view.getViewById(page, "favorites-list");
    favsVm.favoritesViewModel.loadBookmarks();
    favoritesList.items = favsVm.favoritesViewModel.favList;
    console.log(favoritesList.items);

}

//TODO - Extremely hard time refactoring this seciton - need to move out but have not found a great way to do it.
//var actionBarVm = require("../../ViewModels/actionBar-view-model.js");

exports.loadSearchView  = function(){
    frameModule.topmost().navigate('Views/Search/search');
};
exports.loadItemView = function () {
    frameModule.topmost().navigate('Views/Item/item');
    itemVm.itemViewModel.scanIt();
};
exports.loadItem = function (args) {

    var nav = {
        moduleName:'Views/Item/item',
        context:{id:args.object.asin}
    };
    frameModule.topmost().navigate(nav);
};

/*https://github.com/NativeScript/NativeScript/issues/594
exports.buttonLoaded = function(args) {
    args.object.android.setFocusable(false);
};*/

exports.loadMainView = function () {
    frameModule.topmost().navigate('Views/Main/main');
};
//ENd Todo
exports.share = social.share;

exports.onPageLoad = onPageLoad;