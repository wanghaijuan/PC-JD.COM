//文档就绪函数
$(function(){
	// 根据json生成品质生活中的样式
	$.ajax({
		type: "get",
		url: "json/qualityLife.json",
		dataType: "json",
		success: function(res){
			var index = 0;
			for(var i = 0; i < res.length; i++){
				// 创建一个标题标签
				var oH4 = $("<h4>" + res[i].title + "</h4>");
				
				// 追加标题
				if(res[i].id == 1){
					$(".qualityLifeLeft").append(oH4);
				}else if(res[i].id == 2){
					$(".qualityLifeCenter").append(oH4);
				}else if(res[i].id == 3){
					$(".qualityLifeRight").append(oH4);
				}
				
				for(var j = 0; j < res[i].content.length; j++){
					index++;
					// 创建一个div标签
					var oDiv = $("<div id='qualityLife0" + index + "'></div>");
					
					// 创建一个图片标签
					var oImg = $("<img src='img/qualityLife/" + res[i].content[j].src + "' />");
					
					// 创建一个div便签，用于保存描述
					var oDescrition = $("<div class='sub-tit'></div>");
					
					// 分别创建3个p标签
					var tit = $("<p class='tit'>" + res[i].content[j].tit + "</p>");
					var desc = $("<p class='desc'>" + res[i].content[j].desc + "</p>");
					var promotion = $("<p class='promotion'>" + res[i].content[j].promotion + "</p>");
					
					// 追加
					oDescrition.append(tit);
					oDescrition.append(desc);
					oDescrition.append(promotion);
					
					oDiv.append(oDescrition);
					oDiv.append(oImg);
					
					// 追加内容
					if(res[i].id == 1){
						$(".qualityLifeLeft").append(oDiv);
					}else if(res[i].id == 2){
						$(".qualityLifeCenter").append(oDiv);
					}else if(res[i].id == 3){
						$(".qualityLifeRight").append(oDiv);
					}
				}
			}
		}
	});

	// 为“品质生活”的右边部分添加边框
	$(".qualityLifeProductList a:even").css({
		"border-right": "1px dashed #ccc",
		"border-bottom": "1px dashed #ccc"
	});
	$(".qualityLifeProductList a:odd").css({
		"border-bottom": "1px dashed #ccc"
	});
	$(".qualityLifeProductList a:gt(-3)").css({
		"border-bottom": "none"
	});
	
	//"品质生活" 的  Logo显示
	$('.qualityLifeProductList a').each(function(index,domEle){
		$(domEle).prepend("<img src='img/qualityLife/brand"+(index+1)+".jpg'/>");
	});
	
	//底部banner
	$('.footBanner a').each(function(index,domEle){
		$(domEle).prepend('<img />').find('img').attr("src","img/footer/footBanner"+(index+1)+".jpg");
	})
	
})