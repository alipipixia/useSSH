$(function(){
    function nav(){
        $('.nav ul li').each(function(){
            if($(this).hasClass('current-menu-item') || $(this).hasClass('current-category-ancestor') || $(this).hasClass('current-menu-parent') || $(this).hasClass('current-post-ancestor')){
                $(this).addClass('nav-active');
            }
        })
        $('.nav ul li').hover(function(){
            $(this).children('span').stop().animate({
                'left' : 0,
                'width' : '100%'
            },200)
        },function(){
            $(this).children('span').stop().animate({
                'left' : '50%',
                'width' : 0
            },200)
        })
    }
    nav();
    // 滚动显示头部阴影
    function navscroll(){
        
        $(window).scroll(function(){
            if($(window).scrollTop() != 0){
                $('#header').addClass('header-box-shadow');
            } else {
                $('#header').removeClass('header-box-shadow');
            }
        })
    }
    navscroll();
    //首页图片鼠标放上背景效果
    function publicBg(){
        var bg = $('<span></span>');
        $('.public-pro ul li').mouseenter(function(){
            $(this).append(bg);
        }).mouseleave(function(){
            bg.remove();
        })
    }
    publicBg();
    // 前端文章左侧导航鼠标移入显示子导航
    function navRight(){
        $('.nav-left ul li').hover(function(){
            $(this).children('ul').css('display','block');
        },function(){
            $(this).children('ul').css('display','none');
        })
    }
    navRight();
    // 筛选功能把URL地址替换
    function RegExpS(){
        $('.list a').each(function(){
            var url = ($(this).attr('href'));
            var re = /((\?+)(paged=)(\d+)(\&))|(\&)(paged=)(\d+)/;
            url = url.replace(re,'');
            $(this).attr('href',url);
        })
    }
    RegExpS();
    //文章侧边栏
    function SileNav(){
        //移除文章侧边子导航I 小图标
        $('.nav-left ul li ul li a').children('i').remove();
        var index = 0;
        $('.nav-left li').each(function(){
            if($(this).hasClass('current-menu-item') || $(this).hasClass('current-menu-parent')){
                $(this).addClass('active');
                $(this).children('a').css('color','#ff6600').children('i').css('color','#ff6600');
            }
        })
        if(!$('.nav-left li').hasClass('current-menu-item')){
            $('.nav-left>ul>li').eq(0).children('a').css('color','#ff6600').children('i').css('color','#ff6600');
        }
        $('.nav-left>ul>li').hover(function(){
            $(this).children('a').css('color','#ffffff').children('i').css('color','#ffffff');
        },function(){
            if($(this).hasClass('current-menu-item') || $(this).hasClass('current-menu-parent')){
                $(this).children('a').css('color','#ff6600').children('i').css('color','#ff6600');
            } else {
                $(this).children('a').css('color','#777').children('i').css('color','#777');
            }
        })
    }
    SileNav();
    // 特效，素材筛选分类导航效果
    function effectNavMenu(){
        $('.select-area .select-category ul li').each(function(){
            if($(this).hasClass('current-menu-item')){

                $(this).children('a').css('color','#ff6600');
            }
        })
    }
    effectNavMenu();
    // 搜索框显示隐藏
    function searchShowHide(){
        $('.header-c .search button').click(function(){
            if($('.header-c .search-text').css('display') == 'none'){
                $('.header-c .search-text').css('display','block');
                $('form.search').animate({
                    'right' : 0
                })
                return false;
            }
        })

        
        $(document).on("click", function(e){
            if(!$('.header-c .search-text').css('display') == 'block'){
                return false;
            }
            $(document).one("click", function(){
                $('form.search').animate({
                    'right' : -200
                },function(){
                    $('.header-c .search-text').css('display','none');
                })

            });

            e.stopPropagation();
        });

        $('form.search').on("click", function(e){
            e.stopPropagation();
        });
    }
    searchShowHide()
    // 轮播图
    function banner(){

        var timer = null;
        var i = 0;
        var iBtn = true;
        var LiWidth = $('.banner-c ul li').width();
        var LiLength = $('.banner-c ul li').length;
        $('.banner-c ul').css('width',LiWidth*LiLength);
        timer = setInterval(startM,3000);

        function startM(){
            if(i < LiLength-1){
                i++;
            } else {    
                i = 0;
            }
            $('.banner-c ul').animate({
                'left' : -LiWidth * i
            })
        }

        $('.banner-c ul').hover(function(){
            clearInterval(timer);
        },function(){
            timer = setInterval(startM,3000);
        })

        $('.prev').click(function(){
            if(iBtn){
                iBtn = false;
                clearInterval(timer);
                if(i == 0){
                    i = parseInt(LiLength-1);
                } else {
                    i--
                }
                $('.banner-c ul').animate({
                    'left' : -LiWidth * i
                },function(){
                    iBtn = true;
                })
            }
            
        })

        $('.next').click(function(){
            if(iBtn){
                iBtn = false;
                clearInterval(timer);
                if(i == LiLength-1){
                    i = 0;
                } else {
                    i++
                }
                $('.banner-c ul').animate({
                    'left' : -LiWidth * i
                },function(){
                    iBtn = true;
                })
            }
            
        })
    }
    banner()
    // 弹出下载框
    function alertDown(){
        // 获取百度盘密码
        var downA = $('.down-a').html();
        $('.alert-down .vilidate span').html(downA);

        // 弹出下载框
        $('.down a').click(function(){
            setLeftTop();
            return false;
        })
        $(window).resize(function(){
            if($('.alert-down').css('display')=='block'){
                $('.alert-down').css('display','none')
            }
        });
        $('.alert-down .close').click(function(){
            $('.alert-down').animate({
                'top' : -300
            },function(){
                $(this).css('display','none')
            })
        })
        function setLeftTop(){
            var clientW = $(window).width();
            var clientH = $(window).height();
            var downWidth = $('.alert-down').outerWidth(true);
            var downHeight = $('.alert-down').outerHeight(true);
            $('.alert-down').css({
                'left':(clientW - downWidth)/2,
                'top' : -300 ,
                'display' : 'block'
            }).animate({
                'top' : (clientH - downHeight)/2,
            })
        }
    }
    alertDown();

    // function replaceTagsLink(){
    //     var url = window.location.search;
    //     var re = /cat\=\d+/;  //cat=1
    //     var r = re.exec(url); //获取cat=1;
    //     var afterLink = '&'+r; //&cat=1
    //     $('.tags a').each(function(){
    //         var links = $(this).attr('href');
    //         var linksAfter = links+afterLink;
    //         $(this).attr('href',linksAfter);
    //     })
    // }
    // replaceTagsLink()
    
    // 分页标签
    function pageUrl(){
        $('a.page-numbers').each(function(){
            var url = $(this).attr('href');
            var rewen = /\?/;
            if(rewen.test(url)){
                var re = /\/page\/(\d+)/;
                var r = re.exec(url);

                var r1 = r[0]+'?';
                var url1 = url.replace(r[0],'');
                var a =url1.replace(/\?/,r1);
                $(this).attr('href',a);
            }         
        });
    }
    pageUrl();

    function replaceTagsLink(){
        $('.public-pro-c .info .tags b').each(function(){
            var type = $(this).attr('class');
            var tagA = $(this).nextAll('a');
            tagA.each(function(){
                var tagText = $(this).text();
                // var host = 'http://'+window.location.host + '/wordpress461/';
                var host = 'http://'+window.location.host+'/'
                var url = 'category/'+type+'?tag='+tagText;
                $(this).attr('href',host+url);
            })
        })
    }
    replaceTagsLink();

    // function lazyImg() {
    //     if($('.content-x-m img')){
    //         $('.content-x-m img').lazyload({effect: "fadeIn"});
    //     }
    // }
    // lazyImg();

    function imgHeight(){
        $('.public-pro ul li .autoheight a.img-a img').each(function(index){
            // if($(this).height()<'420'){
            //     // $(this).css('height','420');
            //     var imgTop = (420 - $(this).height())/2;
            //     $(this).css('marginTop',imgTop);
            //     $(this).css('marginBottom',imgTop);
            // }
        })

    }
    imgHeight();

    //教程左侧栏ID与文章ID判断相等，则加背景色
    function findId(){
        var articleId = ($('.content-tutorial-center h1').attr('id'));

        $('.content-tutorial-left ul li').each(function(){
            if($(this).children('a').attr('id')==articleId){
                $(this).css({
                    'background' : '#000'
                }).children('a').css({
                    'color' : '#fff'
                })
            }
        })
    }
    findId();
})


