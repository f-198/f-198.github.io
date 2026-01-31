(function ($) {
  var url = 'https://user.www.gov.cn';               //测试环境
  var gourl = window.location.href;

//动态加载js
  function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if(typeof(callback) != "undefined") {
      if(script.readyState) {
        script.onreadystatechange = function() {
          if(script.readyState == "loaded" || script.readyState == "complete") {
            script.onreadystatechange = null;
            callback();
          }
        };
      } else {
        script.onload = function() {
          callback();
        };
      }
    }
    script.src = url;
    document.body.appendChild(script);
  }

//动态加载link
  function loadCss(url, callback) {
    var link = document.createElement('link');
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    link.media = 'screen';
    document.getElementsByTagName('head')[0].appendChild(link);
    if(callback) {
      callback.call(link);
    }
  }

  if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
    loadCss(url+"/static/styles/yh-favorite_ext_app.css");
    loadScript(url+"/static/js/yh-favorite_ext_app.js");
    loadScript(url+"/static/js/dialog/easydialog.min.js");
    visitcount();
  } else {
    loadCss(url+"/static/styles/yh-favorite_ext.css");
    loadScript(url+"/static/js/yh-favorite_ext.js");
    loadScript(url+"/static/js/dialog/easydialog.min.js");
    visitcount();
  }

  function gettime(){
    var time = new Date();
    return time.getFullYear()+""+add(time.getMonth()+1)+add(time.getDate())+add(time.getHours())+add(time.getMinutes())+add(time.getSeconds());
  }

  function add(m){return m<10?"0"+m:""+m;}

  function visitcount(){
    // urlC使用你们自己系统内部的middle.html
    var urlC = location.protocol + '//' + location.hostname + "/gongbao/middle.htm";
    $('#yh_login').attr("data-src",url+"/sso/iframelogin?urlC="+urlC);
    $('#yh_favorite').attr("data-src",url+"/client/favorite/add");
    $('#yh_comment').attr("data-src",url+"/comment/list");

    //以下5个参数一次为,请详细核对,填入自己页面正确的参数.当前网页标题.当前时间戳,当前网页地址,相对应id,本系统内中间页地址
    var title = document.title;
    //页面生成时间
    var publishtime = gettime();
    var id = hex_md5(gourl);

    $('#yh_btn_favoriteadd, .pchide #yh_btn_favoriteadd').attr("data-title",title);
    $('#yh_btn_favoriteadd, .pchide #yh_btn_favoriteadd').attr("data-publishtime",publishtime);
    $('#yh_btn_favoriteadd, .pchide #yh_btn_favoriteadd').attr("data-url",gourl);
    $('#yh_btn_favoriteadd, .pchide #yh_btn_favoriteadd').attr("data-id",id);
    $('#yh_btn_favoriteadd, .pchide #yh_btn_favoriteadd').attr("data-urlc",urlC); //中介页面值.
    $('#yh_btn_favoriteadd, .pchide #yh_btn_favoriteadd').attr("data-channel","2"); //页面相关频道--1.服务or2.政策

    $('#yh_btn_comment, .pchide #yh_btn_comment').attr("data-title",title);
    $('#yh_btn_comment, .pchide #yh_btn_comment').attr("data-publishtime",publishtime);
    $('#yh_btn_comment, .pchide #yh_btn_comment').attr("data-url",gourl);
    $('#yh_btn_comment, .pchide #yh_btn_comment').attr("data-id",id);
    $('#yh_btn_comment, .pchide #yh_btn_comment').attr("data-urlc",urlC); //中介页面值.
    $('#yh_btn_comment, .pchide #yh_btn_comment').attr("data-servicecode","zfwfw"); // 接入代码
    $('#yh_btn_comment, .pchide #yh_btn_comment').attr("data-channel","2");
  }

//回调调用，配置回调地址，解决跨域问题
  function loginCallback(){
    location.reload(true);
    $('.yh_close').click();
  }
})(jQuery);
