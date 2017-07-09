var Observable = require("data/observable").Observable;
var favoritesViewModel = new Observable();
var storage = require("../plugins/storage.js");

//Set the defaults
favoritesViewModel.favList= "";



favoritesViewModel.loadBookmarks = function(){

    //BLOG Rookie Javascript mistakes -
    //This use to read
    // var bookmarks = storage.getBookmarks which assigned bookmarks a property and not the returnvalue of the function
    var bookmarks = storage.getBookmarks();
    if (bookmarks == null) {
        return;
    }

    bookmarksArray = [];


    //don't need to do has own properties check
    for (var i in bookmarks){
        if(bookmarks.hasOwnProperty(i)){
            bookmarks[i].asin = i;
            bookmarksArray.push(bookmarks[i]);
        }
    }

    favoritesViewModel.set("favList", bookmarksArray);
};

exports.favoritesViewModel = favoritesViewModel;