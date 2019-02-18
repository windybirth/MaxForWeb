$(function(){
  init();

  // back botton
  $('#back').on('click', function(){
    $('#artframe').attr('src', '');
    switchToList();
  });

  // refresh botton
  $('#refresh').on('click', init);

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
});

function init(){
  createArtList();
  switchToList();
};

// Create artical list
function createArtList(){
  var url = 'https://news.maxjia.com/bbs/app/link/list'
  var urlParamData = { game_type: "dota2", sort_type: "1", offset: "0" , limit: "50" };
  $.getJSON(url, urlParamData, callbackbbsList);
}

function callbackbbsList(data) {
  var items = [];
  //parse json data
  $.each(data.result, function(key, val) {
    var title = val.title;
    var share_url = val.share_url;
    var is_top = val.is_top;
    if(!!title && !!share_url && is_top != 1) {
      addArticalItem(key, val);
    }
  });
  addListenerToArtical();
}

function addArticalItem(key, item) {

  // clone item
  var articalItem = $('#artModel').clone();
  // set item value
  articalItem.show();
  articalItem.prop('href', item.share_url);
  articalItem.find('.title').text(item.title);
  articalItem.find('.description').text(item.description);
  articalItem.find('.comment_num').text(item.comment_num);
  articalItem.find('.user_avartar').prop('src', item.user.avartar);
  articalItem.find('.username').text(item.user.username);
  $.each(item.imgs, function(key, val) {
    var rootDiv = articalItem.find('.list_imgs');
    addListImg(key, val, rootDiv)
    if (key > 0) {
      return false;
    }
  });
  //articalItem.find('.modify_at').text(getTimestampBeforeStr(item.modify_at));

  // append item to aritcal list
  $('#artlist').append(articalItem);
}

function addListImg(key, val, rootDiv) {
  // clone img
  var imgItem = $('#imgModel').clone();
  imgItem.show();
  imgItem.prop('src', val);
  rootDiv.append(imgItem);
}

function getTimestampBeforeStr(timestamp) {
  var modify_date = new Date(timestamp);
  return 'XXX'
}

function addListenerToArtical(){
  $('.artical').on('click', function(){
    url = $(this).prop('href');
    $('#artframe').prop('src', url);
    switchToFrame();
  });
}


// switch method
function switchToFrame() {
  $('#artlist').hide();
  $('#artframe').show();
  $('#refresh').prop('disabled', true);
  $('#back').prop('disabled', false);
}

function switchToList() {
  $('#artlist').show();
  $('#artframe').hide();
  $('#refresh').prop('disabled', false);
  $('#back').prop('disabled', true);
}
