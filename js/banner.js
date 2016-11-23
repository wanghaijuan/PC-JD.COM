//文档就绪函数
$(function(){
	// 动态生成商品列表(获取json文件)
	$.ajax({
		type:"get",
		url:"http://dc.3.cn/category/get?callback=JSON_CALLBACK",
		dataType:"jsonp",		// jsonp 解决跨域问题
		jsonpCallback:"JSON_CALLBACK",	// 传入callback的值,url中的 callback=getCategoryCallback
		scriptCharset:"gb2312",  // 解决字体冲突,京东的编码是gbk,而html的编码是utf-8
		success:function(data){
			
			//console.log(data);
			
			var d = data.data;
			
			// 动态创建一级菜单
			for (var i=0;i<d.length;i++) {
				
				var str = "";
				
				// 动态创建一级列表
				for (var j=0;j<d[i].s.length;j++) {
					
					var sFirst =  d[i].s;
					
					// 以"|"分割对象 获取相应的 链接 和 文本呢
					var firstContent =sFirst[j].n.split("|");
					
					// console.log(firstArr);
					
					if (j==sFirst.length-1) {
						str += '<a href="//' + firstContent[0] + '">' + firstContent[1] + '</a>';
						//console.log(str);
					} else{
						str += '<a href="//' + firstContent[0] + '">' + firstContent[1] + '、</a>';
						//console.log(str);
					}
				}
				
				// 创建一个新的保存一级列表的li标签
				var firstLi = $("<li>" + str + "<span>&gt;</span></li>");
				
				// 动态的给li创建鼠标移入事件
				firstLi.hover(function(){
					$("#sidebar").find(".details").eq($(this).index()).show();
				},function(){
					$("#sidebar").find(".details").eq($(this).index()).hide();
				})
				
				// 将一级列表的li标签 追加到 html
				$("#sidebar").append(firstLi);	
			}
			
			// 动态创建隐藏(二级)的菜单
			for (var i=0;i<d.length;i++) {
				
				// 动态创建隐藏(二级)的列表
				var details = $("<div class='details'></div>");
				details.attr("flag",i);
				// 将二级级列表的div标签 追加到 "#sidebar"
				$("#sidebar").append(details);
				
				// 为每一块details添加鼠标移入事件
				details.hover(function(){
					$(this).show();
					$("#sidebar").children("li").eq($(this).attr("flag")).addClass("hover").children("span").hide();
				}, function(){
					$(this).hide();
					$("#sidebar").children("li").eq($(this).attr("flag")).removeClass("hover").children("span").show();
				})
				
				// 动态创建隐藏盒子下的左边盒子 
				var detailsLeft = $("<div class='details-left'></div>");
				// 动态创建隐藏盒子下的右边盒子
				var detailsRight = $("<div class='details-right'></div>");
				// 追加 到 details
				details.append(detailsLeft);
				details.append(detailsRight);
			
				// 动态创建左边盒子的 内容
				var detailsLeftTop = $("<ul class='details-left-top'></ul>");
				var detailsLeftContent = $("<dl class='details-left-content'></dl>");
				// 追加 到 SdetailsLeft
				detailsLeft.append(detailsLeftTop);
				detailsLeft.append(detailsLeftContent);
				
				// 动态创建右边和盒子的  内容
				var detailsRightTop = $("<div class='details-right-top'></div>")
				var detailsRightBottom = $("<div class='details-right-bottom'></div>")
				// 追加 到  detailsRight
				detailsRight.append(detailsRightTop);
				detailsRight.append(detailsRightBottom);
				
				// 创建左边盒子顶部的内容
				for (var j=0;j<d[i].t.length;j++) {
					
					// 分割
					var liArr = d[i].t[j].split("|");
					
					// 渠道 顶部
					var channels = $("<li><a href='//"+liArr[0]+"'>"+liArr[1]+"<span>></span></a></li>");
					detailsLeftTop.append(channels);
				}
							
				// 动态创建 左边盒子的主要内容
				var sSecond = d[i].s[0].s;
				
				// 创建dt dd的内容
				for (var j=0;j<sSecond.length;j++) {
					
					// 动态创建左边盒子 底部 的 内容
					var dt = $("<dt></dt>");
					var dd = $("<dd></dd>")
					// 追加到 detailsLeftContent
					detailsLeftContent.append(dt);
					detailsLeftContent.append(dd);
					
					// 创建 dt内容
					var dtArr = sSecond[j].n.split("|");
					var dtContent = $("<a href='//"+dtArr[0]+"'>"+dtArr[1]+"</a><span>></span>");
					dt.append(dtContent);
					
					// 创建dd的内容
					var ddUl = $("<ul></ul>");
					dd.append(ddUl);
					
					for(var k=0;k<sSecond[j].s.length;k++){
						// 分割
						var ddUlLiArr = sSecond[j].s[k].n.split("|");
						var ddUlLi = $("<li><a href='//"+ddUlLiArr[0]+"'>"+ddUlLiArr[1]+"</a></li>");
						ddUl.append(ddUlLi);
					}
					
				}
				
				// 动态创建 右边 盒子的 顶部 内容
				for (var a=0;a<d[i].b.length;a++) {
					
					// 分割
					var aTopArr = d[i].b[a].split("|");
					
					// 商标 顶部
					var topBrand = $("<a href='//"+aTopArr[0]+"'><img src='//img10.360buyimg.com/"+aTopArr[2]+"' alt='"+aTopArr[1]+"'/></a>");
					detailsRightTop.append(topBrand);
				}
				
				// 动态创建 右边 盒子的 底部 内容
				for (var a=0;a<d[i].p.length;a++) {
					
					// 分割
					var aBottomArr = d[i].p[a].split("|");
					
					// 商标 顶部
					var bottomBrand = $("<a href='//"+aBottomArr[0]+"'><img src='//img10.360buyimg.com/"+aBottomArr[2]+"' alt='"+aBottomArr[1]+"'/></a>");
					detailsRightBottom.append(bottomBrand);
				}	
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
