//文档就绪函数
$(function(){
	//获取json文件
	$.ajax({
		type:"get",
		url:"json/footer.json",
		dateType:"json",
		success:function(res){
			console.log(res)
			//动态创建一级菜单
			for(var i=0; i<res.siteService.length-1;i++){
				var oLi = $("<li><h3>"+res.siteService[i].txtH3+"</h3></li>");
				$(".severFoot").append(oLi);
				
				for (var j=0;j<res.siteService[i].txtH4.length;j++) {
					var oH4 = $("<h4>"+res.siteService[i].txtH4[j]+"</h4>");
					$(oLi).append(oH4);
				}
			}
			
			console.log(res.siteService[res.siteService.length-1]);
			var txt = res.siteService[res.siteService.length-1];
			var lastli = $("<li class='lastLi'></li>");
			var lasth3 = $("<h3>"+txt.txtH3+"</h3>")
			var lastspan = $("<span>"+txt.txtSpan+"</span>");
			var lastp = $("<p><a href='#'>"+txt.txtP+"</a></p>");
			
			$(lastli).append(lasth3);
			$(lastli).append(lastspan);
			$(lastli).append(lastp);
			$(".severFoot").append(lastli);
			
			for(var a=0; a<res.siteInfo.length-1;a++){
				var oUl = $("<ul class='siteInfo'></ul>");
				for (var b=0;b<res.siteInfo[a].txt.length;b++) {
					var oLi = $("<li>"+res.siteInfo[a].txt[b]+"</li><li>|</li>")
					$(oUl).append(oLi);
				}
				$(".footer").append(oUl);
			}
			
			var lastUl = res.siteInfo[res.siteInfo.length-1].url;
			var oUlLast = $("<ul class='siteInfo'></ul>");
			for (var k=0;k<lastUl.length;k++) {
				
				var oLiLast = $('<li><img src="img/footer/'+lastUl[k]+'"/></li>');
				oUlLast.append(oLiLast);
			}
			$(".footer").append(oUlLast);
		}

	});
	
	
})