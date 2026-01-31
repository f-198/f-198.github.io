var govshare = govshare || { version: "1.0" };
(function() {
  var share = $('#share');
  // var shareBox = $('#share-box', share);
  var share_more = $('.gwds_more', share);
  var sharePopup = $('#share-popup');
  var close = $('b', sharePopup);
  var title = encodeURIComponent(document.title);
  var url = encodeURIComponent(window.location.href); //姝ｅ紡鍒嗕韩鍦板潃浠ｇ爜
  // var url = encodeURIComponent('http://www.gov.cn/xinwen/2020-03/08/content_5488550.htm');  //娴嬭瘯鍒嗕韩鍦板潃
  var shareA = $('.share-btn');
  var list = {
    'gwds_weixin': 'http://www.gov.cn/zgzfw/sharepage/index.html?url=' + url, //鏀规垚浜岀淮鐮侀〉闈㈡渶缁堝湴鍧€
    'gwds_tsina': 'http://service.weibo.com/share/share.php?url=' + url + "&title=" + title,
    'gwds_qzone': 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + url + "&title=" + title,
    'gwds_douban': 'https://www.douban.com/share/service?appkey=3&sharesource=weibo&title=' + title + '&url=' + url
  }
  var UnityFunction = {
    init: function(){
      this.more();
      this.bindShare();
    },
    more: function(){
      var _this = this;
      share_more.on('mouseenter', function(){
        sharePopup.show();
        _this.setPosition();
      }).on('mouseleave', function(){
        outTimer = setTimeout(function () {
          sharePopup.hide();
        }, 200);
      });
      sharePopup.on('mouseenter', function(){
        clearTimeout(outTimer)
        sharePopup.show();
      }).on('mouseleave', function(){
        sharePopup.hide();
      });
      close.on('click', function(){
        sharePopup.hide();
      })
    },
    setPosition: function(){
      var position = share.offset();
      var winWidth = $(window).width();
      var winHeight = $(window).height();

      var left = winWidth - position.left < 350 ? 'left' : 'right';
      var top = winHeight - position.top < 150 ? 'top' : 'bottom';
      sharePopup.css({left:(position.left+120)+'px',top:(position.top+28)+'px'})
      sharePopup.removeClass().addClass(left + ' share-popup ' + top);
      
    },
    bindShare:function(){
      shareA.on('click', function(){
        var key = $(this).data('w');
          window.open(list[key]);
        return false
      })
    }

  }
  UnityFunction.init()
})();