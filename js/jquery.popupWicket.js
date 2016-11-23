// 弹出窗口 的 自动执行
(function($){
	
	// 扩展jQuery对象
	$.fn.extend({
		// 调用的方法名称
		popup: function(opation){
			var _default = {
				width: 410,
				height: 454,
				title:'您尚未登录',
				overlay:0.15
			}
			
			//合并对象(覆盖之前的对象值)
			var pop = $.extend(_default,opation);
			// 弹出窗口的内容
			var content = $(".dialog-content").html();
			
			var winWidth =  $(window).width();
			// 点击事件
			$(this).click(function(){
				// 遮罩层
				$("<div/>").addClass("shade").css({
					position:"fixed",
					width:"100%",
					height:"100%",
					background:"rgba(0, 0, 0," + pop.overlay + ")"
				}).appendTo("body");
				
				//弹出登录 会话 窗口
				var box = $("<div/>").addClass("loginDialog").css({
					width:pop.width,
					height:pop.height,
					left:(winWidth-pop.width)/2
				})
				
				// 登录会话窗口的 头部
				$("<div/>").addClass("dialog-title").html("<span>"+pop.title+"</span><a href='#' class='dialog-close'></a>").appendTo(box);
				
				// 登录会话窗口的内容
				$("<div/>").addClass("dialog-content").html(content).appendTo(box);
				
				//将盒子添加到body
				$("body").append(box);
			})
		}
	})

})(jQuery)
