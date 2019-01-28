$(function(){
  init();
});

function init(){
  $("#artlist").show();
  $("#artframe").hide();
  createArtList();
};

function createArtList(){
  var getJsonUrl = 'http://news.maxjia.com/bbs/app/link/list?&add_follow=true&lang=zh-cn&os_type=iOS&os_version=12.1.2&_time=1547735046&version=4.3.3&game_type=dota2&max__id=0&limit=10&offset=0&sort_type=1';
  $.getJSON(
    getJsonUrl,
    function(data) {
      var items = [];
      //parse json data
      $.each(data.result, function(key, val) {
        var title = val.title;
        var share_url = val.share_url;
        var is_top = val.is_top;
        if(!!title && !!share_url && is_top != 1) {
          items.push('<span class="artical" src="' + share_url + '">' + title + '</span></br>');
        }
      });

      //add item list to body
      $('<table/>', {
        'class': 'my-new-list',
        html: items.join('')
      }).appendTo($('#artlist'));
      addListenerToArtical();
    }
  );
};

function addListenerToArtical(){
  $(".artical").on("click", function(){
    url = $(this).attr("src");
    $('#artframe').attr('src', url);
    $("#artlist").hide();
    $("#artframe").show();
  });
}
