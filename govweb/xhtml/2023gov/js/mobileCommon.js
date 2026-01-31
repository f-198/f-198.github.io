$(function () {
  /** 头部搜索功能 */
  $('.newtp1').click(function () {
    $('.newSearch').toggle();
    $('.newtp1').toggleClass('up');
    if ($('.up').length > 0) {
      $('.search_mi').eq(0).focus();
    } else {
      $('.search_mi').eq(0).blur();
    }
  });

});

function getRootPath() {
  //获取当前网址，
  var curPath = window.document.location.href;
  //获取主机地址之后的目录，
  var pathName = window.document.location.pathname;
  var pos = curPath.indexOf(pathName);
  //获取主机地址
  var localhostPaht = curPath.substring(0, pos);
  //获取带"/"的项目名，
  var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
  return (localhostPaht + projectName);
}
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = decodeURI(window.location.search).substr(1).match(reg);
  if (r != null) return r[2]; return null;
}
var gourl = GetQueryString("gourl");

var showname = GetQueryString("showname");
var ip = getRootPath();

var time = "20171010121212";
var servicecode = "zfwfw";
var servicepwd = "7xl42ZEN";
//var time = gettime();
var sign = hex_md5(servicecode + servicepwd + time);
var linkU = window.location.href;

if (servicecode == null || servicecode == "" || time == null || time == "" || sign == null || sign == "") {
  servicecode = "zfw";
  time = "20171010121212";
  sign = "18403a6fefb59a54620a22e3609fe213";
}
idm.config({
  debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert
  url: 'https://user.www.gov.cn',		// 必填，idm地址
  servicecode: servicecode, 				// 必填，接入代码
  time: time,
  sign: sign,	// 必填，签名
  success: function () {	// 回调函数（成功）
    isMoblieLogin();
  },
  fail: function (r) {	// 回调函数(失败)
    $(".nologin").removeClass("hide");
  }
});



$(function () {

  //注册页面
  $('#userreg1').click(function () {
    //alert('zc');
    idm.user.openreg({
      redirect: true,
      gourl: linkU,// 业务地址：非必填。回调总入口将以sp参数返回
      extargs: ''		// 扩展参数：非必填。回调将回传
    });
  })
  //登录页面
  $('#userlogin1').click(function () {
    //alert('login');
    idm.user.openlogin({
      redirect: true,
      gourl: linkU,// 业务地址：非必填。回调总入口将以sp参数返回
      extargs: ''		// 扩展参数：非必填。回调将回传
    });
  })

  //个人中心
  $('#showname1').click(function () {
    idm.user.open({
      ticket: ''	// 票据：非必填。
    });
  })
  //退出登录
  $("#logOutBtn1").click(function () {

    idm.user.logout({
      success: function () {	// 回调函数（成功）
        if (gourl != null && gourl != "") {
          window.location.href = linkU;
        } else {
          window.location.href = 'https://user.www.gov.cn';
        }

      },
      fail: function (r) {	// 回调函数(失败)

      }
    })
  })


  $('#godesktop').click(() => {
    function setSessionCookie(name, value, cookiePath) {
      if (value) {
        var expire = "; expires=Session";
        var path = "";
        if (cookiePath != null) {
          path = "; path=" + cookiePath;
        }
        document.cookie = name + "=" + escape(value) + expire + path;
      }
    }
    setSessionCookie('allmobilize', 'desktop', '/');
    window.location.reload();
  });
})



function isMoblieLogin() {
  idm.user.islogin({
    success: function (r) {	// 回调函数（成功）
      var showname = r.showname;
      if (showname == undefined) {
        showname = "****";
      }
      //注意 这个脱敏手机号进行了修改 页面上显示只能达到八个字符
      if (showname.length == 11) {
        showname = showname.replace('****', '*');
      } else {
        showname = "  " + showname;
      }
      $("#showname1").html(showname);
      $(".yeslogin").removeClass("hide");
      $(".nologin").addClass("hide");
    },
    fail: function (r) {	// 回调函数(失败)
      $(".nologin").removeClass("hide");
      $(".yeslogin").addClass("hide");
    }
  });
}
