// recommend
$(function(){
	
	// 实现图片轮播
	var imgIndex = 0;
	var imgWidth = 1000;
	var per = 4;   // 每一轮轮播移动图片的数目
	
	// 将前四张图片克隆，放到最后面
	for(var i = 0; i < per; i++){
		$("#recommendImgList li").eq(i).clone().appendTo($("#recommendImgList"));
	}
	
	var imgSum = $("#recommendImgList li").length;     // 图片的总数
	var count = imgSum / per;                  // 可以轮播的次数
	
	// 设置一个定时器，让图片轮播
	var timer = setInterval(nextImg, 2000);
	
	// 显示下一张图片的函数
	function nextImg(){
		imgIndex++;
		
		// 设置recommendImgList容器的left值
		$("#recommendImgList").animate({left: -imgIndex * imgWidth}, 400, callback);
	}
	
	// 动画执行玩的回调函数
	function callback(){
		if(imgIndex == count - 1){
			$("#recommendImgList").css("left", 0);
			imgIndex = 0;
		}
	}
	
	// “recommendRight”的hover事件
	$(".recommendRight").hover(function(){
		$(this).find("span").show();
		clearInterval(timer);
	}, function(){
		$(this).find("span").hide();
		clearInterval(timer);
		timer = setInterval(nextImg, 2000);
	})
	
	// “上一张”的点击事件
	$(".re_prev").click(function(){
		clearInterval(timer);

		// 判断是否已经到第一张
		if(imgIndex == 0){
			imgIndex = count - 1;
			$("#recommendImgList").css("left", (-imgIndex * imgWidth) + "px");
		}
		imgIndex -= 2;
		nextImg();
		timer = setInterval(nextImg, 2000);
	})
	
	// “下一张”的点击事件
	$(".re_next").click(function(){
		clearInterval(timer);
		callback();
		nextImg();
		timer = setInterval(nextImg, 2000);
	})
	
	// 页面失去焦点事件
	$(window).blur(function(){
		clearInterval(timer);
	})
	
	// 页面获得焦点事件
	$(window).blur(function(){
		clearInterval(timer);
		timer = setInterval(nextImg, 2000);
	})
	
})