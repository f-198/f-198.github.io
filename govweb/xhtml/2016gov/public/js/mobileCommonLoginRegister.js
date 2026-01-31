(function ($) {
	$('.hreflist').find('a').on('click',function(){
			 var id = '#'+$(this).attr('id') + 'box';
			 if(id!=='#gwybmbox'){
				 $(id).show();
			 }
		 })
		 $('.listbox').on('click',function(e){
			 if($(this).hasClass("listbox")){
				 $(this).hide();
			 }
		 })
				function getRootPath(){
				//获取当前网址，
				var curPath=window.document.location.href;
				//获取主机地址之后的目录，
				var pathName=window.document.location.pathname;
				var pos=curPath.indexOf(pathName);
				//获取主机地址
				var localhostPaht=curPath.substring(0,pos);
				//获取带"/"的项目名，
				var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
				return(localhostPaht+projectName);
			}
			 function GetQueryString(name)
			{
				 var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
				 var r = decodeURI(window.location.search).substr(1).match(reg);
				 if(r!=null)return  r[2]; return null;
			}
		//	var servicecode = GetQueryString("servicecode");
			var gourl = GetQueryString("gourl");
			
			// var time = GetQueryString("time");
			// var sign = GetQueryString("sign");
			var showname = GetQueryString("showname");
			var ip = getRootPath();
			/* if(servicecode==null||servicecode==""||time==null||time==""||sign==null||sign==""){
				servicecode = "idm";
				time = "20171010121212";
				sign = "7c4b1d93fa33e1fe51ba119bea0a56aa";
			} */
			   var time = "20171010121212";
				var servicecode = "zfwfw";
				var servicepwd = "7xl42ZEN";
				//var time = gettime();
				var sign = hex_md5(servicecode+servicepwd+time);
				var linkU=window.location.href;
				
			if(servicecode==null||servicecode==""||time==null||time==""||sign==null||sign==""){
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
				success:function(){	// 回调函数（成功）
					islogin();
				},
				fail:function(r)	{	// 回调函数(失败)
					$(".nologin").removeClass("hide");
				}
			});  
			
			
			 
			 $(function(){
				 console.log(linkU,'***********************');
				/*  if(showname!=null&&showname!=""&&showname.length>0){
					//注意 这个脱敏手机号进行了修改 页面上显示只能达到八个字符
					if(showname.length==11){
						showname = showname.replace('****','*');
					}else{
						showname = "  "+showname;
					}
					$("#showname").html(showname);
					$(".yeslogin").removeClass("hide");
					$(".nologin").addClass("hide");
				 } */
				 
				 
				//注册页面
				$('#userreg').click(function(){
					//alert('zc');
					idm.user.openreg ({
						redirect:true,
						gourl: linkU,// 业务地址：非必填。回调总入口将以sp参数返回
						extargs: ''		// 扩展参数：非必填。回调将回传
					});
				})
				//登录页面
				$('#userlogin').click(function(){
					//alert('login');
					idm.user.openlogin ({
						redirect:true,
						gourl: linkU,// 业务地址：非必填。回调总入口将以sp参数返回
						extargs: ''		// 扩展参数：非必填。回调将回传
					});
				})
				
				//个人中心
				$('#showname').click(function(){
					 idm.user.open ({
						ticket:''	// 票据：非必填。
					}); 
				})
					//退出登录
				$("#logOutBtn").click(function(){
					console.log(1111);
					/* $.post(logoutUrl,function(){
						location.reload();
					}); */
					 idm.user.logout({
						success:function(){	// 回调函数（成功）
							if(gourl!=null&&gourl!=""){
								window.location.href = linkU;
							}else{
								window.location.href = 'https://user.www.gov.cn';
							}
							
						},
						fail:function(r)	{	// 回调函数(失败)
							
						}
					}) 
				})
				
			})
			function islogin(){
				idm.user.islogin ({
				success:function(r){	// 回调函数（成功）
					var showname = r.showname;
					if(showname==undefined){
						showname = "****";
					}
					//注意 这个脱敏手机号进行了修改 页面上显示只能达到八个字符
					if(showname.length==11){
						showname = showname.replace('****','*');
					}else{
						showname = "  "+showname;
					}
					$("#showname").html(showname);
					$(".yeslogin").removeClass("hide");
					$(".nologin").addClass("hide");
				},
				fail:function(r)	{	// 回调函数(失败)
					$(".nologin").removeClass("hide");
					$(".yeslogin").addClass("hide");
				}
				});
			} 
			$(".tp1").click(function(){
				$(".Search").toggle();
				$(".tp1").toggleClass('up');
				if($(".up").length>0){
					$('.search_mi').eq(0).focus()
				}else{
					$('.search_mi').eq(0).blur()
				}
			})
})(jQuery);