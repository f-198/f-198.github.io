// JavaScript Document

//title去空格
document.title=document.title.replace(/\s+/g,"");
$(function(){
		//设置左侧最小高度
		function minHeight(){
			var leftHeight=$('.leftPart').height();
			var rightHeight=$('.rightPart').height();
			if(leftHeight<rightHeight){
				$('.leftPart').height(rightHeight);
			}
			if(leftHeight>rightHeight){
				$('.rightHeight').height(leftPart);
			}
		};
		minHeight();
		
		//面包屑第一个加粗
		function breadcrumbNav(){
			$('.BreadcrumbNav a:first').css('font-weight','bold');
		};
		breadcrumbNav()
		
		//常务院列表下划线最后一个去掉
		function cwhybox2(){
			$('.cwhybox2 ul li:last').css('border-bottom','none');
		};
		cwhybox2()
		
})