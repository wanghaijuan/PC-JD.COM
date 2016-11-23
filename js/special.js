$(function(){
	
	//	经过图片时滑动效果
	$(".special1Product li").hover(function(){
		$(this).find('img').animate({'marginLeft':'-10px'},200);
	},function(){
		$(this).find('img').animate({'marginLeft':'0px'},200);	
	});
	
	
	var picIndex = 0;
	var imgHeight = 124;
	var num = 1;   // 每一轮轮播移动图片的数目
	
	$(".judge li").eq(0).clone().appendTo($(".judge"));
	
	var picNum = $(".judge li").length;     	// 图片的总数
	var picCount = picNum / num;                  // 可以轮播的次数
	
	// 设置一个定时器，让图片轮播
	var myTimer = setInterval(nextPic, 2000);
	
	function nextPic(){
		picIndex++;
		// 设置judge容器的left值
		$(".judge").animate({top: -picIndex * imgHeight}, 400);
	}
	// 动画执行玩的回调函数
//	function myCallback(){
//		if(picIndex == picCount - 1){
//			$(".judge").css("top", 0);
//			picIndex = 0;
//		}
//	}
})

