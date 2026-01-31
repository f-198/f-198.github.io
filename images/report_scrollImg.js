/*
* @Author: yousi
* @Date:   2017-10-10 22:53:36
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-11 00:13:51
*/
//此处分号避免前面别人的函数结尾没有分号这样就会报错
        ;(function ($, window, document, undefined) {
                
                //构造函数
                function BigImgScroll (ele, options) {
                        
                        //在这里面,ele指的是用jQuery选中的元素$('.bigImgScroll')
                        this.$ele=ele;
                        
                        //默认属性值
                        this._default={
                            
                                //按钮事件
                                btnEvent:'click',
                                //滚动的容器
                                bigImgScroll_list:'.bigImgScroll_list',
                                
                                bigImgScroll_demo:'.dys_nav_content',
                                //幻灯片小按钮
                                bigImgScroll_btn:'.bigImgScroll_btn',
                              
                                //滚动间隔时间
                                scrollTime:500,
                               //左边按钮
                                btnPrev:'.btnPrev',
                                //右边按钮
                                btnNext:'.btnNext',
                                
                                isAuto:false
                                
                        };
                        
                        //合并属性保护好默认参数:
                        this.opt=$.extend({}, this._default, options);
                        
                        this.$bigImgScroll_demo=$(this.opt.bigImgScroll_demo);
                        
                        this.$bigImgScroll_list=$(this.opt.bigImgScroll_list);
                        
                        this.$bigImgScroll_btn=$(this.opt.bigImgScroll_btn);
                        
                        this.$bigImgScroll_btn_item=this.$bigImgScroll_btn.children();
                        
                        /*上一个*/
                        this.$btnPrev=$(this.opt.btnPrev);
                        /*下一个*/
                        this.$btnNext=$(this.opt.btnNext);
                        
                        this.num=0;
                                
                        this.bool=true;
                        
                        this.timer=null;
                        
                        this.init();
                        
                };
                
                BigImgScroll.prototype={
                    
                     init:function () {
                        
                            //this.gundong();
                            
                     },
                     
                     bigImgScroll:function () {
                        
                                var _this=this;
                                
                                this.$bigImgScroll_list.html(this.$bigImgScroll_list.html()+this.$bigImgScroll_list.html());
                                
                                this.$bigImgScroll_demo.html(this.$bigImgScroll_demo.html()+this.$bigImgScroll_demo.html());
                                
                                /*注意此处一定要等元素添加到页面了才获取*/
                                this.$bigImgScroll_list_item=this.$bigImgScroll_list.children();
                                
                                this.$liHeight=this.$bigImgScroll_list_item.eq(0).outerHeight(true);

                                this.$bigImgScroll_list.height(this.$liWidth*this.$bigImgScroll_list_item.length);
                                
                                this.$length=this.$bigImgScroll_list_item.length;
                                
                               /* this.$btnPrev.hide();
                                
                                this.$btnNext.hide();*/
                                
                                /*刚加载完毕，让第一个li添加类名dys_active*/
                               _this.$bigImgScroll_list.find('li').eq(0).addClass('dys_active');
                               
                               _this.$bigImgScroll_demo.find('li').eq(0).show();
                               
                               /*鼠标点击导航li*/
                               _this.$bigImgScroll_list.find('li').on(this.opt.btnEvent, function () {
                               		
                               		var $index=_this.$bigImgScroll_list.find('li').index(this);
                               		
                               		$(this).addClass('dys_active').siblings().removeClass('dys_active');
                               	
                               		_this.$bigImgScroll_demo.find('li').eq($index).show().siblings().hide();
                               		
                               });
                               	//获取dys_nav的li的长度
                               	var $dys_nav_liLength=_this.$bigImgScroll_list.find('li').length;
                               	
                                /*给每一个导航dys_nav里面li添加i标签*/
                              	/*_this.$bigImgScroll_list.find('li').each(function (i, elem) {
                              		
                              		 var $this=$(this);
                              		 
                              		 var $i=$('<i>'+(i%($dys_nav_liLength/2)+1)+'</i>');
                              		 
                              		 $this.prepend($i);
                              		 
                              	});*/
                                /*点击上一个*/
                                this.$btnPrev.on(this.opt.btnEvent, function () {
                                        clearInterval(_this.timer);
                                        
                                        if (_this.bool) {
                                            
                                                //this.num==0
                                                if (_this.num==0) {
                                                    
                                                    //瞬间将top是宽度的一半（肉眼看不到）
                                                    _this.$bigImgScroll_list.css('top',-_this.$liHeight*_this.$length/2);
                                                    
                                                    _this.num=_this.$length/2;
                                                    
                                                }
                                                
                                                _this.num--;
                                                //让对应的显示
                                                _this.$bigImgScroll_list.find('li').eq(_this.num).addClass('dys_active').siblings().removeClass('dys_active');
                                                
                                                _this.$bigImgScroll_demo.find('li').eq(_this.num).show().siblings().hide();
                                                
                                                _this.$bigImgScroll_list.animate({
                                                    
                                                    top:-(_this.num%_this.$length)*_this.$liHeight
                                                    
                                                }, _this.opt.scrollTime, 'linear', function () {
                                                    
                                                    //等走完就变成true这样下次点击又会起作用了
                                                    _this.bool=true;
                                                    
                                                });
                                                
                                                //这样上一张没有走完你点击多少次n都不会增加了
                                                _this.bool=false;
                                        }
                                        
                                });
                                
                                /*点击下一个*/
                                this.$btnNext.on(this.opt.btnEvent, function () {
                                    
                                        _this.scrollFn();
                                
                                });
                                
                               
                              /* function autoPlay () {
                                        //自动滚动
                                        _this.timer=setInterval(function () {
                                            _this.scrollFn();
                                        }, 2000);
                                };
                                
                                if (_this.opt.isAuto) {
                                	
                                	autoPlay();
                                	
                                }
                                
                                
                              this.$ele.hover(
                                
                                function () {
                                    clearInterval(_this.timer);
                                    _this.$btnPrev.fadeIn();
                                
                                    _this.$btnNext.fadeIn();
                                },
                                
                                function () {
                                    autoPlay();
                                     _this.$btnPrev.fadeOut();
                                
                                    _this.$btnNext.fadeOut();
                                }
                                
                              );*/
                                
                     },
                     scrollFn: function () {
                        
                                var _this=this;
                                
                                if (_this.bool) {
                                        
                                            _this.num++;
                                        
                                            _this.$bigImgScroll_list.animate({
                                            
                                                    top:-(_this.num%_this.$length)*_this.$liHeight
                                                    
                                                }, _this.opt.scrollTime, 'linear', function () {
                                                    
                                                    // 如果滚到中间的一张
                                                    if (_this.num==0) {
                                                        
                                                        //让left==0（瞬间）瞬间让中间一张变成第一张（这两张其实是一样的图片所以你看不到变化）
                                                        _this.$bigImgScroll_list.css('top',0);
                                                            
                                                    }
                                                    
                                                    //等走完就变成true这样下次点击又会起作用了
                                                    _this.bool=true;
                                                
                                            });
                                            
                                            
                                            if (_this.num==_this.$length/2) {
                                                
                                                    _this.num=0;
                                                            
                                            }
                                            
                                            //让对应的显示
                                            _this.$bigImgScroll_list.find('li').eq(_this.num).addClass('dys_active').siblings().removeClass('dys_active');
                                                
                                            _this.$bigImgScroll_demo.find('li').eq(_this.num).show().siblings().hide();
                                            
                                            //这样上一张没有走完你点击多少次n都不会增加了
                                            _this.bool=false;
                                            
                                    }   
                                    
                     }
                     
                     
                };
                
                $.fn.report_scrollImg=function (options) {
                        //在这里面,this指的是用jQuery选中的元素
                        var bis=new BigImgScroll(this, options); 
                        
                        return bis.bigImgScroll();
                        
                };
                
        })(jQuery);