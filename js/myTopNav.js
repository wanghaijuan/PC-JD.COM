//文档就绪函数
$(function(){
//	获取json文件
	$.get("json/topNav.json",function(result){
		//测试json是否正常输出
		//console.log(result.address);
		
		//遍历  result.address[i]
		for (var i=0;i<result.address.length;i++) {
			
			//建立sendTo的各个省份 并追加到 #addressList
			var liAdd = $("<li><a href='#'>"+result.address[i]+"</a></li>");
			$("#addressList").append(liAdd);
			
			//测试所获得 result.address[i] 是字符串类型 string
			//console.log(typeof result.address[i]);  
			
			// 判断显示的是哪个地址  并  给该地址添加样式
			if(result.address[i] == $("#address").text()){
				$(liAdd).find("a").addClass("active");
			}
			
			//设置省份的点击事件,使文本显示该文字 并添加样式
			$(liAdd).click(function(){
				$("#address").text($(this).text());
				$(this).find("a").addClass("active");
				$(this).siblings().find("a").removeClass("active");
			})
		}
	});
	
	// "地址列表"显示和隐藏
	$("#sendTo").hover(function(){
		$("#addressList").show();
		$("#address").css("background-image", "url(img/topNav/arrowUp.png");
	}, function(){
		$("#addressList").hide();
		$("#address").css("background-image", "url(img/topNav/arrowDown.png)");
	});
	
	// "我的京东"的显示隐藏
	$(".myJD").hover(function(){
		$("#myJD").show();
		$(this).children("a").css("background-image", "url(img/topNav/arrowUp.png)");
	}, function(){
		$("#myJD").hide();
		$(this).children("a").css("background-image", "url(img/topNav/arrowDown.png)");
	});
	
	// "手机京东"的显示隐藏
	$(".phoneJD").hover(function(){
		$("#phoneJD").show();
		$(this).children("a").css("background-image", "url(img/topNav/arrowUp.png)");
	}, function(){
		$("#phoneJD").hide();
		$(this).children("a").css("background-image", "url(img/topNav/arrowDown.png)");
	});
	
	// "关注京东"的显示隐藏
	$(".followJD").hover(function(){
		$("#followJD").show();
		$(this).children("a").css("background-image", "url(img/topNav/arrowUp.png)");
	}, function(){
		$("#followJD").hide();
		$(this).children("a").css("background-image", "url(img/topNav/arrowDown.png)");
	});
	
	// "客服服务"的显示隐藏
	$(".service").hover(function(){
		$("#service").show();
		$(this).children("a").css("background-image","url(img/topNav/arrowUp.png)");
	}, function(){
		$("#service").hide();
		$(this).children("a").css("background-image","url(img/topNav/arrowDown.png)");
	})
	
	$.get("json/topNav.json",function(result){
		console.log(result.siteNav)
		
		// 遍历数组result.siteNav[i]数组
		for(var i=0; i<result.siteNav.length;i++){
			
			// 创建一个新的ul
			if(i == 0){
				var oUl = $("<ul class='firstul'></ul>");
			}else{
				var oUl = $("<ul class='otherul'></ul>");
			}
			
			// 创建h4并追加
			var webTitle = $("<h4>"+result.siteNav[i].title +"</h4>");
			oUl.append(webTitle);
			
			// 循环创建li
			for(var j = 0; j < result.siteNav[i].content.length; j++){
				// 创建li并追加
				var oLi = $("<li><a href='#'>" + result.siteNav[i].content[j] + "</a></li>");
				oUl.append(oLi);
			}
			
			// 将ul追加到页面中
			$(".subSiteNav").append(oUl);
		}
	});
	
	// "页面导航"的显示隐藏
	$(".siteNav").hover(function(){
		$(".subSiteNav").show();
		$(this).children("a").css("background-image","url(img/topNav/arrowUp.png)");
	}, function(){
		$(".subSiteNav").hide();
		$(this).children("a").css("background-image","url(img/topNav/arrowDown.png)");
	})
})
