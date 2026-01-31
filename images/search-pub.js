//获取url传输参数键值对， 指定key的value,针对中文乱码
function getSearchMap(key) {
  // 获取URL中?之后的字符
  var str = location.search;
  str = str.substring(1, str.length);
  // 以&分隔字符串，获得类似name=xiaoli这样的元素数组
  var arr = str.split("&");
  var obj = new Object();
  // 将每一个数组元素以=分隔并赋给obj对象
  for(var i = 0; i < arr.length; i++) {
    var tmp_arr = arr[i].split("=");
    obj[decodeURIComponent(tmp_arr[0])] = tmp_arr[1] ? decodeURIComponent(tmp_arr[1].replace(/\+/g,' ')) : tmp_arr[1];
  }
  if(!obj.hasOwnProperty(key)) return null;
  return {"key": key, 'value': obj[key]};
}

// 加密
function toEncrypt(publicKey, data){
  var encrypt = new JSEncrypt();
  encrypt.setPublicKey(
    "-----BEGIN PUBLIC KEY-----" + publicKey + "-----END PUBLIC KEY-----"
  );
  var encrypted = encrypt.encrypt(data);
  return encrypted;
}

// 国务院公报/国务院文件搜索的下拉切换
var forGWYTimer = null;
$('.fashow,.bote,.fashowM,.boteM').on({
  click: function(){
    $(this).next('ul').toggle();
  },
  'mouseleave':function(){
    var $this = $(this);
    clearTimeout(forGWYTimer);
    forGWYTimer = setTimeout(function(){
      $this.next('ul').hide();
    },100);
  }
});
$('.fashow,.bote,.fashowM,.boteM').next('ul').on({
  'mouseenter':function(){
    clearTimeout(forGWYTimer);
  },
  'mouseleave': function(){
    var $this=$(this);
    $this.hide();
  }
});



$('.top,.bots,.topM,.botsM').on("click",'li',function(){
  var type=$(this).attr('data-type'),q = $('[name=q]').val();
  if(type==107 || type==16 || type==17){
    window.location.href = 'http://111.13.175.34/sousuo/search.shtml?code=17da70961a7&dataTypeId=' + type + '&searchWord='+q;
  }else if(type=='gwygb'){
    window.location.href='/search/gwygbss/?q='+ q +'&advance=false&searchfield=title&sort=DESC&p=4&n=10&codeYear=&codeCode=&timetype=timeqb&mintime=&maxtime=&minfcode=&maxfcode=&mincodeYear=&maxcodeYear=&mincodeCode=&maxcodeCode=&pubcpnSel=&pubcpnCon=&pubtypeSel=&pubtypeCon=&minpcode=&maxpcode=&title=&content=';
  }else if(type=='gwywj'){
    window.location.href='/search/gqwjss/?q=' + q + '&title=&content=&puborg=&pcodeJiguan=&pcodeYear=&pcodeNum=&filetype=&mintime=&maxtime=&timetype=timeqb&sort=DESC&p=1&n=10';
  }
});

// 删除
$('.del-key').click(function() {
  $('.round [name=q]').val('');
});
