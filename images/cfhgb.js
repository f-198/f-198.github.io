;(function ($) {
    // 文字实录滚动条： 前面是几个元素就创建几个滚动条
    $('.addScroll').niceScroll({
        cursorcolor: "#cfaa60", //十六进制改变光标颜色，默认值是“＃000000”
        cursoropacitymin: 0, //改变不透明度非常光标处于非活动状态（scrollabar“隐藏”状态），范围从1到0， 默认为0（隐藏） 
        cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0，默 认值是1（完全不透明）
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备（默认：false） 
        cursorwidth: "5px", //像素光标的宽度，默认值为5（你可以写“加入5px”太） 
        cursorborder: "1", //游标边框css定义，默认为“1px的固体＃FFF” 
        cursorborderradius: "6px", //以像素为光标边界半径，默认为​​“递四方” 
        autohidemode: false, //如何隐藏滚动条的作品，真=默认/“光标”=只进游标隐藏/ false =不隐藏背景，CSS改变轨道的背景下，默认为“” 
        background: "#f8f4eb",
        boxzoom: false
    });
    $('#ascrail2000').show();


    // 日历：初始渲染最新日期的内容
    var firstUrl = $.trim($('#jsonBox :last-child').text())
                                
    var xhr = new XMLHttpRequest();
    xhr.open('GET', firstUrl, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var D = JSON.parse(xhr.responseText);
            $(".cfhContent").empty();
            $(".cfhContent").append('<div class="tm"><a target="_blank" href="' + D[0].URL + '" class="cfhTitle">' + D[0].TITLE + '</a><div class="cfhMemo">' + D[0].description + '</div></div><div class="cfhOther"><a target="_blank" href="' + D[0].wzsl + '" class="cfhwzsl">文字实录</a><a target="_blank" href="' + D[0].jmwd + '" class="cfhwzsl">简明问答</a><a target="_blank" href="' + D[0].dsp + '" class="cfhwzsl">短视频</a><a target="_blank" href="' + D[0].mtbd + '" class="cfhwzsl">媒体报道</a></div>');

            // 清除没有链接的底部元素
            $('.cfhwzsl').each(function() {
                if ($(this).attr('href') === '' || $(this).attr('href') === 'undefined') {
                    $(this).remove();
                };
            });

            var updateTime = D[0].SUB_TITLE.match(/\d+/g) // "2024年6月26" --> ['2024', '6', '26']
            var curDate=new Date(), // 设置页面加载后日历显示日期
            curyear=updateTime[0],
            curmonth=updateTime[1],
            curday=updateTime[2];
            // curyear=curDate.getFullYear(),
            // curmonth=curDate.getMonth()+1,
            // curday=curDate.getDate();
            $('.calendarbox').myCalendar({
            hasMyDate: true,
            mydate: $('.top_date').length > 0 ? $.trim($('.top_date').text()).split(/\D/g, 3) : [curyear, curmonth, curday],
            yearSuffix: '年', // 日历头部显示的年月尾缀
            monthSuffix: ''
            });
        }
    };
    xhr.send();
    
})(jQuery);