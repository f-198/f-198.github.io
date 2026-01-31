			//高级搜索
			var gov_path = "http://sousuo.gov.cn/zhengce/";
		
			var ipbox = '.dys_policySearchResultsPage_left input[type="checkbox"]';
			exterched(ipbox);
			function exterched(ncv){
				$(ncv).siblings('span').on('click',function(){
					var eb = $(this).siblings(ipbox);
					if(eb.prop('checked')){
						eb.prop('checked','');
					}else{
						eb.prop('checked','checked');
					};
				})
			}
			$('.blurinput').keydown(function(){
				var lenth = $(this).val().length;
				if(lenth >= 0){
					$(this).siblings('.close').show();
				}
			}).blur(function(){
				var _this = $(this);
				setTimeout(function () {
				_this.siblings('.close').hide()
				}, 500)
			})
			$('.close').click(function(){
				//console.log('1')
				$(this).siblings('.blurinput').val('');
				$(this).hide();
			})
			
			// 文件类别input 填入select值
			$('#fwzhvalue4').change(function(){
				$('#fwzhvalue3').val($(this).val());
				//console.log($(this).val())
			});
			
			//头部点击右侧按钮弹出框
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
			
			//目录导航效果
			//是否点击查看更多的状态码
			var b=true;				
			/*点击加号隐藏消失*/
			function showHide () {
				$('.dys_classified_by_subject_nav').on('click','.dys_classified_by_subject_nav_item', function () {
					var index=$(this).index();
					var node=$(this).find('.dys_classified_by_subject_content');
					//如果node是隐藏的则显示node元素，否则隐藏
					if(!node.is(':visible')){
						
						node.show();
						$(this).siblings().find('.dys_classified_by_subject_content').hide();
						//加号变减号
						$(this).find('var').addClass('minus');
						$(this).siblings().find('var').removeClass('minus');
					}else{
						//减号变加号
						$(this).find('var').removeClass('minus');
						node.hide();
					}
				});
			};
			
			showHide ();
			
			$('.dys_classified_by_subject').eq(0).show();
			
			$('.dys_official_type').on('click', function () {
				
				var index=$('.dys_official_type').index($(this));			
				
				var node=$(this).next();
				
				if (node.is(':hidden')) {
					
					node.slideDown().siblings('.dys_classified_by_subject ').slideUp();
					
					
				} else{
					
					node.slideUp();
					
				}
				
			});
			
	
		//公共头部搜索头部二维码
		$('.mobile_saoma').click(function (event) {
			event.stopPropagation();
			$('.movingQRcode').toggle();
			
		});
		
		$(document).click(function () {
			$('.movingQRcode').hide();
		})