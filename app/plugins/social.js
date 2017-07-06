var social = require("nativescript-social-share");

exports.share = function(){
    social.shareText("Try out ChoosyBest! It is great for finding books" +
        "and movies at the library, bookstore, or red movie box thingy!");
};
