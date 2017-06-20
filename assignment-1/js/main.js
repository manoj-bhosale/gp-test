;(function(){
var dataService = function () {
    var endPoint = 'https://jsonplaceholder.typicode.com/posts';

    getPosts = function () {
        return $.getJSON(endPoint);
    }

    return {
        getPosts:getPosts
    }
}();

var dataCache;

var init = function(){
    var optionIdList = '';
    dataService.getPosts().done(function(data){
        dataCache = data;
        for(var i = 0; i <data.length; i++){
            optionIdList += '<option value="'+data[i].id+'">'+data[i].id+'</option>';
        }
        $('#idSelect').append(optionIdList);
    })
    .fail(function(){

    });
}();

var populateTitle = function(id){
    var titleSelectControl = $('#titleControl'),
        body = $('#bodyControl');

        var optionTitleList = '';
        for(var i = 0; i < dataCache.length; i++){
            optionTitleList += '<option value="'+dataCache[i].id+'">'+dataCache[i].title+'</option>';
        }

        titleSelectControl.find('select').append(optionTitleList).val(id);
        
    if(id % 2 === 0){
        titleSelectControl.removeClass('hidden');
        body.removeClass('hidden');
        body.find('textarea').val(dataCache[id].body);
    }else{
        titleSelectControl.removeClass('hidden');
        body.addClass('hidden');
    }

    if(id === ''){
        titleSelectControl.addClass('hidden');
        body.addClass('hidden');
    }
};

$('#idSelect').on('change', function(){
     populateTitle($(this).val());
});
}());