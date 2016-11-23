//文档就绪函数
$(function(){
	// 动态生成商品列表(获取json文件)
	$.ajax({
		type: "get",
		url:"json/allProduct.json",
		dataType: "json",
		success: function(result){
			// 动态地创建一级列表
			for(var i = 0; i < result.length; i++){
				var str = "";
				for(var j = 0; j < result[i].firstTitle.length; j++){
					if(j == result[i].firstTitle.length - 1){
						str += result[i].firstTitle[j];
					}else{
						str += result[i].firstTitle[j] + "、";
					}
				}
				
				// 创建一个新的保存一级列表的li标签
				var firstLi = $("<li>" + str + "<span>&gt;</span></li>");
				
				// 为每一个li添加鼠标移入事件
				firstLi.hover(function(){
					$("#sidebar").find(".details").eq($(this).index()).show();
				}, function(){
					$("#sidebar").find(".details").eq($(this).index()).hide();
				})
				
				// 将该firstLi追加到一级列表中
				$("#sidebar").append(firstLi);
			}
			
			// 动态创建二级列表
			for(var i = 0; i < result.length; i++){
				// 动态地创建二级列表
				var details = $("<div class='details'></div>");
				details.attr("flag", i);
				
				// 为每一块details添加鼠标移入事件
				details.hover(function(){
					$(this).show();
					$("#sidebar").children("li").eq($(this).attr("flag")).addClass("hover").children("span").hide();
				}, function(){
					$(this).hide();
					$("#sidebar").children("li").eq($(this).attr("flag")).removeClass("hover").children("span").show();
				})
				
				var detailsLeft = $("<div class='details-left'></div>");
				
				// 动态地创建二级列表
				var headerUl = $("<ul class='details-left-top'></ul>");
				var contentDl = $("<dl class='details-left-content'></dl>");
				
				// 创建头部列表 
				for(var j = 0; j < result[i].header.length; j++){
					var headerLi = $("<li><a href='#'>" + result[i].header[j] +"<span>&gt;</span></a></li>");
					
					// 将它追加到二级列表中
					headerUl.append(headerLi);
				}
				
				// 创建内容列表
				for(var j = 0; j < result[i].firstContent.length; j++){
					// 创建标题
					var contentDt = $("<dt><a>" + result[i].firstContent[j].secondTitle  + "</a><span>&gt;</span></dt>");
					
					// 标题追加
					contentDl.append(contentDt);
					
					// 创建内容
					var contentDd = $("<dd></dd>");
					var contentUl = $("<ul></ul>");
					
					for(var z = 0; z < result[i].firstContent[j].secondContent.length; z++){
						var contentLi = $("<li><a href='#'>" + result[i].firstContent[j].secondContent[z] + "</a></li>");
						
						contentUl.append(contentLi);
					}
					
					// 内容追加
					contentDd.append(contentUl);
					contentDl.append(contentDd);
				}
				
				// 创建右边的内容并追加
				var detailsRight = $("<div class='details-right'></div>"); 
				
				var detailsRightTop = $("<div class='details-right-top'></div>");
				
				var detailsRightBottom = $("<div class='details-right-bottom'></div>");
				
				// 遍历并将图片追加到页面中
				for(var j = 0; j < result[i].src1.length; j++){
					// 创建一个a标签，里面装有一张图片
					var oImg1 = $("<a href='#'><img src=img/banner/" + result[i].src1[j] + " /></a>");
					
					// 追加
					detailsRightTop.append(oImg1);
				}
				for(var j = 0; j < result[i].src2.length; j++){
					// 创建一个a标签，里面装有一张图片
					var oImg2 = $("<a href='#'><img src=img/banner/" + result[i].src2[j] + " /></a>");
					
					// 追加
					detailsRightBottom.append(oImg2);
				}
				
				detailsRight.append(detailsRightTop);
				detailsRight.append(detailsRightBottom);
				
				// 将headerUl追加
				detailsLeft.append(headerUl);
				detailsLeft.append(contentDl);
				details.append(detailsLeft);
				details.append(detailsRight);
				$("#sidebar").append(details);
				
			}
		}
	});
	
	
	// 图片播放
	var imgIndex = 0;
	$(".bannerImg li").eq(imgIndex).show();  //图片显示
	$(".bannerNum li").eq(imgIndex).addClass("imgSelected");  //数字索引显示样式
	
	// 设置一个定时器，实现图片轮播
	var timer = setInterval(imgNext, 2000);
	
	// 图片改变的函数
	function imgNext(){
		imgIndex++
		imgIndex = imgIndex % $(".bannerImg li").length;
		
		// 图片淡入
		$(".bannerImg li").eq(imgIndex).stop(true).fadeIn(300).siblings().stop(true).fadeOut(300);
		
		// 改变下标的背景颜色
		$(".bannerNum li").eq(imgIndex).addClass("imgSelected").siblings().removeClass("imgSelected");
	}
	
	// 数字下标中每个li的鼠标移入事件
	$(".bannerNum li").mouseenter(function(){
		clearInterval(timer);
		imgIndex = $(this).index() - 1;
		imgNext();
		timer = setInterval(imgNext, 2000);
	})
	
	// 上一张的按钮点击事件
	$(".prevBtn").click(function(){
		clearInterval(timer);
		if(imgIndex == 0){
			imgIndex = $(".bannerImg li").length;
		}
		imgIndex -= 2;
		imgNext();
		timer = setInterval(imgNext, 2000);
	})
	
	// 下一张的按钮点击事件
	$(".nextBtn").click(function(){
		clearInterval(timer);
		imgNext();
		timer = setInterval(imgNext, 2000);
	})
	
	// "#banner"盒子 的鼠标移入事件
	$("#banner").hover(function(){
		clearInterval(timer);
		$(this).find("a").show();
	}, function(){
		clearInterval(timer);
		timer = setInterval(imgNext, 2000);
		$(this).find("a").hide();
	});
	
	// 当前网页失去焦点事件
	$(window).blur(function(){
		clearInterval(timer);
	});
	
	// 当前网页获得焦点事件
	$(window).focus(function(){
		clearInterval(timer);
		timer = setInterval(imgNext, 2000);
	});
	
	// 生成 快捷 通道的背景图片  advantage 彩票...
	$(".advantage li").each(function (index, domEle) { 
	// domEle == this 
	$(domEle).find('a').prepend("<span style='background:url(img/banner/advantage.png) no-repeat 0px "+(-index*25) +"px;'></span>");
	});
	
	// 顶部 快捷 通道 的 鼠标  移入  事件
	$(".topAdv").bind("mouseenter", function(){
		$(".advantage").slideUp(400);
		$(".advContent").slideDown(400);

		// 显示相应的内容
		$(".advHeader li").eq($(this).index()).addClass("headStyle").siblings().removeClass("headStyle");
		$(".advMessage").eq($(this).index()).show().siblings(".advMessage").hide();
	})
	
	// 上部最右边的li的鼠标移出事件
	$(".rightAdv").mouseleave(function(){
		$(".topAdv").bind("mouseenter", function(){
			$(".advantage").slideUp(400);
			$(".advContent").slideDown(400);
			
			// 显示相应的内容
			$(".advHeader li").eq($(this).index()).addClass("headStyle").siblings().removeClass("headStyle");
			$(".advMessage").eq($(this).index()).show().siblings(".advMessage").hide();
		})	
	})
	
	// 关闭按钮的的点击事件
	$(".close").click(function(){
		$(".advContent").slideUp(400);
		$(".advantage").slideDown(400);
		
		// 取消鼠标移入事件，直到鼠标离开游戏的li的时候，再重新赋予鼠标移动事件
		$(".topAdv").unbind("mouseenter");
	})
	
	// 头部服务的切换
	var headerIndex = 0;
	$(".advHeader li").eq(headerIndex).addClass("headStyle");
	$(".advMessage").eq(headerIndex).show();
	// 为每个li添加鼠标移入事件
	$(".advHeader li").mouseenter(function(){
		// 改变标题的背景颜色
		headerIndex = $(this).index();
		$(this).addClass("headStyle").siblings().removeClass("headStyle");
		
		// 显示相应的内容
		$(".advMessage").eq(headerIndex).show().siblings(".advMessage").hide();
	})
	
	// 控制充值话费内容的切换
	var fareIndex = 0
	$(".rechargeList li").eq(fareIndex).addClass("fareStyle");
	$(".msg").eq(fareIndex).show();
	// 为每个li添加鼠标移入事件
	$(".rechargeList li").mouseenter(function(){
		// 改变标题的背景颜色
		fareIndex = $(this).index();
		$(this).addClass("fareStyle").siblings().removeClass("fareStyle");
		
		// 显示相应的内容
		$(".msg").eq(fareIndex).show().siblings(".msg").hide();
	})
	
	// 机票里面内容的切换
	var ticketIndex = 0;
	var ticketWidth = $(".buyTicket").outerWidth();
	
	// 设置是单程还是往返
	if($("[name=wayOne]:checked").val() == "one"){
		$("[name=wayOne]").closest(".pt").siblings().find(".back").parent("p").hide();
	}else{
		$("[name=wayOne]").closest(".pt").siblings().find(".back").parent("p").show();
	}
	if($("[name=wayTwo]:checked").val() == "one"){
		$("[name=wayTwo]").closest(".pt").siblings().find(".back").parent("p").hide();
	}else{
		$("[name=wayTwo]").closest(".pt").siblings().find(".back").parent("p").show();
	}
	
	// 单选框的点击事件
	$("[name=wayOne]").click(function(){
		if($("[name=way1]:checked").val() == "one"){
			$(this).closest(".pt").siblings().find(".back").parent("p").hide();
		}else{
			$(this).closest(".pt").siblings().find(".back").parent("p").show();
		}
	})
	$("[name=wayTwo]").click(function(){
		if($("[name=way2]:checked").val() == "one"){
			$(this).closest(".pt").siblings().find(".back").parent("p").hide();
		}else{
			$(this).closest(".pt").siblings().find(".back").parent("p").show();
		}
	})
	
	$(".ticketList li").eq(ticketIndex).addClass("ticketStyle");
	// 为每个li添加鼠标移入事件
	$(".ticketList li").mouseenter(function(){
		// 改变标题的背景颜色
		ticketIndex = $(this).index();
		$(this).addClass("ticketStyle").siblings().removeClass("ticketStyle");
		
		// 显示相应的内容
		$(".ticketBox").animate({left: -ticketWidth * ticketIndex + 10}, 300);
	})
	
	// 控制电影票内容的切换
	var movieIndex = 0
	$(".movieList li").eq(movieIndex).addClass("movieStyle");
	$(".mv").eq(movieIndex).show();
	// 为每个li添加鼠标移入事件
	$(".movieList li").mouseenter(function(){
		// 改变标题的背景颜色
		movieIndex = $(this).index();
		$(this).addClass("movieStyle").siblings().removeClass("movieStyle");
		
		// 显示相应的内容
		$(".mv").eq(movieIndex).show().siblings(".mv").hide();
	}) 
	
	// 游戏里面内容的切换
	var gametIndex = 0;
	var gameWidth = $(".gm").outerWidth();
	
	$(".gameList li").eq(gametIndex).addClass("gameStyle");
	// 为每个li添加鼠标移入事件
	$(".gameList li").mouseenter(function(){
		// 改变标题的背景颜色
		gametIndex = $(this).index();
		$(this).addClass("gameStyle").siblings().removeClass("gameStyle");
		
		// 显示相应的内容
		$(".gameBox").animate({left: -gameWidth * gametIndex + 10}, 300);
	})
})
