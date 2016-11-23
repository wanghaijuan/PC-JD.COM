//文档就绪函数
$(function(){
	// 省份 获取json文件
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
	
	//	网站导航 获取json文件
	$.ajax({
		type:"get",
		url:"https://dc.3.cn/navigation/get?callback=getNavigationCallback",
		dataType:"jsonp",
		jsonpCallback:"getNavigationCallback",
		scriptCharset:"gb2312",
		success:function(data){
			var d = data.data;
			console.log(d);
			for(var i=0;i<d.length;i++){
				// 创建一个新的 ul
				if (i==0) {
					var ul = $("<ul class='firstul'></ul>");
				} else{
					var ul = $("<ul class='otherul'></ul>");
				}
				
				// 给每个ul创建h4
				var webTitle = $("<h4>"+d[i].n+"</h4>");
				// 追加到 ul
				ul.append(webTitle);
				
				// 创建li
				for(var j=0;j<d[i].s.length;j++){
					var val = d[i].s[j];
					var oLi = $("<li><a href='//"+val.u+"'>"+val.n+"</a></li>");
					
					// 追加到 ul
					ul.append(oLi);
				}
				
				// 将 ul 追加到 subSiteNav
				$(".subSiteNav").append(ul);
			}
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
