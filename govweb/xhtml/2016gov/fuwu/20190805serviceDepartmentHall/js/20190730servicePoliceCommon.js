var isMobile = isMobile ? isMobile : (/iPad|iPhone|Android|Windows Phone|Nokia/).test(navigator.userAgent);
if (isMobile) {
  	//移动端头部点击右侧按钮弹出框
	$('.tp1').on('click', function () {
		$(this).hide();
		$('.xlk').show();
		$('.tp2').show();
	});
	$('.tp2').on('click', function () {
		$(this).hide();
		$('.xlk').hide();
		$('.tp1').show();
	});
	//点击底部云适配版用的
	$('.am-footer-ysp').click(function(){
		$('#am-footer-modal').show();
	});
	$(".am-close").click(function() {
		$("#am-footer-modal").hide();
	});
	//点击底部电脑版用的
	var sc_tj;
	function clearcok() {
		$.removeCookie("allmobilize");
	}

	var s = $.cookie("allmobilize");
	var sc = $.cookie("sc");

	if(!s) {
		$.cookie("allmobilize", 'mobile', {
			expires: 30,
			path: '/'
		});

	} else {
		if(s == "desktop") {
			$("[name='viewport']").attr("content", "");
      $("html").css({ 'width': '1100px'});
			$("#am-mobilize-btn").show();
		} else {
			$("#am-mobilize-btn").hide();
			$("[name='viewport']").attr("content", "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no");
			
		}
  }
  $(window).resize(function () { 
    if (!isMobile) {
      $("html").css({ 'width': '100%'});
    }
  })
	function towap() {
		if($.cookie("allmobilize") == "desktop") {
			clearcok();
			$.cookie("allmobilize", 'mobile', {
				expires: 30,
				path: '/'
			});
			$.cookie("sc", 'wap', {
				expires: 30,
				path: '/'
			});
			window.location.href = window.location.href;

		} else {
			$(".am-dimmer").show();
			$(".am-modal-dialog").show();
			$("#am-footer-modal").show();
			$(".am-close").click(function() {
				$(".am-dimmer").hide();
				$(".am-modal-dialog").hide();
				$("#am-footer-modal").hide();
			});
		}
	};

	function topc() {
		clearcok();
		$.cookie("allmobilize", 'desktop', {
			expires: 30,
			path: '/'
		});
		//      	window.location.href=window.location.href;
		$.cookie("sc", 'pc', {
			expires: 30,
			path: '/'
		});
		window.location.href = window.location.href;
	};

}