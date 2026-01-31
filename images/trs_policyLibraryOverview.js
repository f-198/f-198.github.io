;(function ($, window) {
	
	window.PolicyLibraryOverview=function () {
		this.init();
	};
	
	PolicyLibraryOverview.prototype={
		init: function () {
			
		},
		//关闭当前窗口代码
		//FF中需要修改配置window.close方法才能有作用，为了不需要用户去手动修改，所以用一个空白页面显示并且让后退按钮失效
		//Opera浏览器旧版本(小于等于12.16版本)内核是Presto，window.close方法有作用，但页面不是关闭只是跳转到空白页面，后退按钮有效，也需要特殊处理
		closeNowWindow: function () {
			var userAgent = navigator.userAgent;
			if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Presto") != -1) {
			    window.location.replace("about:blank");
			} else {
			    window.opener = null;
			    window.open("", "_self");
			    window.close();
			}
		},
		//点赞输入框输入字数限制条件
		weiboTextArea: function (obj) {
			obj.limitTextarea({
		        maxNumber: 100, //最大字数
		        position: 'bottom', //提示文字的位置，top：文本框上方，bottom：文本框下方
		        onOk: function() {
		            $(this).css('background-color', '#f4f4f4');
		        }, //输入后，字数未超出时调用的函数
		        onOver: function() {
		            $(this).css('background-color', 'lightpink');
		        } //输入后，字数超出时调用的函数，这里把文本区域的背景变为粉红色   
		    });
		    /*获取焦点默认内容消失*/
		    obj.on('focus',function () {
		    	if($(this).val()=='请输入留言内容'){
		            $(this).val('');
		            $('#info b').text('100');
		        }
		    	
		        if($(this).val()=='内容字数请不超过100个字。'){
		            $(this).val('');
		            $('#info b').text('100');
		        }
		    });
		    /*失去焦点的时候*/
		    obj.on('blur',function () {
		        if($(this).val()==''){
		            $(this).val('内容字数请不超过100个字。');  
		        }
		    });
		},
		resetContent: function (obj) {
			
			obj.on('click', function () {
				console.log(8)
				$('#weiboTextArea').val('');
			});
		}
	}
	
})(jQuery, window);




