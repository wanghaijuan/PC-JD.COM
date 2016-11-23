//文档就绪函数
$(function(){
	// "购物车"的显示隐藏
	$(".trolley").hover(function(){
		$("#shoppingBorder").show();
		$("#shoppingList").show();
	}, function(){
		$("#shoppingBorder").hide();
		$("#shoppingList").hide();
	});
	
	
})