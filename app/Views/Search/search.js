//Created By Tyler Lemke
//5/29/2016
var view = require('ui/core/view');
var searchVm = require("../../ViewModels/search-view-model.js");
var frameModule = require('ui/frame');


function onPageLoad (data) {
    var page = data.object;
    console.log("search page loaded");
    page.bindingContext = searchVm.searchViewModel;
    var searchList = view.getViewById(page, "search-list");
    searchList.items = searchVm.searchViewModel;
    //console.log(searchList.items);
}

exports.loadItem = function (args) {
    var nav = {
        moduleName:'Views/Item/item',
        context:{id:args.object.asin}
    };
    frameModule.topmost().navigate(nav);
};

exports.loadPrevious = function () {
    frameModule.topmost().goBack();
};

exports.onPageLoad = onPageLoad;

