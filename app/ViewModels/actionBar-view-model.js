var frameModule = require('ui/frame');

var actionBar =
{
    loadSearchView: function(){
        frameModule.topmost().navigate('Views/Search/search');
    },
    loadItemView: function () {
        frameModule.topmost().navigate('Views/Item/item');
    },
    goBack: function ()  {
        frameModule.topmost().goBack();
    }
};

exports.actionBar = actionBar;