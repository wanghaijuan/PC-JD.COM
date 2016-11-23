/*网页右部的菜单*/
$(function(){
	// 菜单的鼠标移入事件
	$(".toolbar-tabs li").hover(function(){
		$(this).children("a").css("background-color", "#C81623").delay(200).stop(true).animate({width: "64px"}, 200);
	}, function(){
		$(this).children("a").css("background-color", "#7a6e6e").delay(200).stop(true).animate({width: 0}, 200);
	});
	
	// 顶部菜单的鼠标移入事件
	$(".toolbarBottom li").hover(function(){
		$(this).children("a").css("background-color", "#C81623").delay(200).stop(true).animate({width: "64px"}, 200);
	}, function(){
		$(this).children("a").css("background-color", "#7a6e6e").delay(200).stop(true).animate({width: 0}, 200);
	});
	
	// “回到顶部”按钮的点击事件
	$(".backToTop").click(function(){
		$("html, body").animate({"scrollTop": 0}, 400);
	});
	
	//右侧工具栏的购物车面板拉开
	$(".tab2").click(function(){
		$(".toolbar-line").addClass("change");
	});
	
	//右侧工具栏的购物车面板关闭
	$(".close-panel").click(function(){
		$(".toolbar-line").removeClass("change");
	});
	
	//弹出的登录窗口
	$(".tab1").popup({height:500,width:410});
	
	$(".dialog-close").click(function(){
		$("shade").hide();
	})
})