//文档就绪函数
$(function(){
	//获取json文件
	$.ajax({
		type: "get",
		url: "json/favorite.json",
		dataType: "json",
		success: function(result){
			console.log(result);
			for(var i=0;i<result.length;i++){
				var oLi = $("<li></li>");
				$(".recommend").append(oLi);
				
				var divImg = $("<div class='reImg'><a href='#'><img src='img/favorite/"+result[i].url+" '/></a></div>");
				$(oLi).append(divImg);
				
				var inform = $("<div class='reInfo'></div>");
				$(oLi).append(inform);
				
				var subName = $("<div class='reName'>"+result[i].subInfom+"</div>");
				$(inform).append(subName);
//				
				var price = $("<div class='rePrice'><i>¥</i>"+result[i].subPrice+"</div>");
				$(inform).append(price);
			}
		}
	});
	
	//换一批
	$('.enjoy .transPic').find('i').addClass('myclass1');
	$(".enjoy .transPic").hover(function(){
		$(this).css('color','#c91724');
		$(this).find('i').removeClass('myclass1').addClass('myclass2');
	},function(){
		$(this).css('color','#666');
		$(this).find('i').removeClass('myclass2').addClass('myclass1');
	});
	
	//红线效果
	$(".recommend").hover(function(){
		$('.line').css({'left':'0'});
		$('.line').stop().animate({'left':'+=845px'},600)
	},function(){
		$('.line').stop().animate({'left':'845px'},100)
	});
})