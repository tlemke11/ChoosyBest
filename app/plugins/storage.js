/**
 * Created by Tyler on 7/6/2017.
 */

var settingStorage = require("application-settings");

getBookmarks = function() {
    var bookmarks = settingStorage.getString("bookmarks");
    if(bookmarks == null) {
        return {};
    }
    return JSON.parse(bookmarks);
};

setBookmarks = function(bookmarksJSON) {
    var bookmarksString =  JSON.stringify(bookmarksJSON);
    settingStorage.setString("bookmarks", bookmarksString);
};

addToBookmarks = function(asin, name, imgLink){
    if(asin == '' || name == ''){
        removeFromBookmarks(asin);
        return;
    }
    var bookmarks = getBookmarks();
    if(bookmarks[asin] == null) {
        bookmarks[asin] = {
            name: name,
            image: imgLink
        };
        setBookmarks(bookmarks);
    }
};

isInBookmarks = function(asin){
    var bookmarks = getBookmarks();
    if (bookmarks.hasOwnProperty(asin)) {
        return true;
    }
    return false;
};


removeFromBookmarks = function(asin){
    if(isInBookmarks(asin)){
        var bookmarks = getBookmarks();
        delete bookmarks[asin];
        setBookmarks(bookmarks);
    }
}

exports.getBookmarks = getBookmarks;
exports.addToBookmarks = addToBookmarks;
exports.isInBookmarks = isInBookmarks;
exports.removeFromBookmarks = removeFromBookmarks;

