var name = "酷毙";
var username = "";
var current_page = "";
var bubbleId=0;
//初始化宠物，他是cookie的管理者，和cookie有关的操作要用到这只宠物
function initPet() {
	username = $.cookie("nova_username");
	current_page = $.cookie("nova_current_page");
	if (username) {

	} else {
		createDialogLife("你好，来自遥远地球的探险家。我叫『酷毙』，是这奇幻世界的吉祥物与向导。");
	}
}

//创建一段对话的这个生命周期
function createDialogLife(str){
	var id="#"+createBubble();
	setBubbleText(str);
	setTimeout(function(){hideAndDelBubble(id)},str.length*250);
}

//获取宠物X坐标
function getPetX() {
	return $("#pet").css("left");
}
//获取宠物Y坐标
function getPetY() {
	return $("#pet").css("top");
}
//宠物说话时要创建一个气泡框
function createBubble() {
	$("#bubbleFrame"+(bubbleId)).empty();
	$("#bubbleFrame"+(bubbleId)).css("display","none");
	var textBubble = document.createElement("div");
	bubbleId++;
	$(textBubble).addClass("textBubble");
	$(textBubble).css("opacity","0");
	$("#pet").append(textBubble);
	$(textBubble).attr("id","bubbleFrame"+bubbleId);
	
	var txtLine=document.createElement("div");
	$(textBubble).append(txtLine);
	$(txtLine).attr("id","firstLine");
	$(txtLine).addClass("textLine")
	$(txtLine).css("top","10px");
	
	txtLine=document.createElement("div");
	$(textBubble).append(txtLine);
	$(txtLine).attr("id","secondLine");
	$(txtLine).addClass("textLine")
	$(txtLine).css("margin-top","10px");
	
	txtLine=document.createElement("div");
	$(textBubble).append(txtLine);
	$(txtLine).attr("id","thirdLine");
	$(txtLine).addClass("textLine")
	
	txtLine=document.createElement("div");
	$(textBubble).append(txtLine);
	$(txtLine).attr("id","forthLine");
	$(txtLine).addClass("textLine")
	
	txtLine=document.createElement("div");
	$(textBubble).append(txtLine);
	$(txtLine).attr("id","fifthLine");
	$(txtLine).addClass("textLine")
	$(textBubble).fadeTo(2000, 1);
	return "bubbleFrame"+bubbleId;
}
//在气泡框里添加文本
function setBubbleText(str){
	//5-10-12-10-5
	var len=str.length;
	//长度小的字符串，放第二行
	if(len<=11){
		$("#thirdLine").text(str);
		return;
	}
	//长度如果占2长行，并小于第二行*2
	if(len<=20){
		$("#secondLine").text(str.substr(0,(len+1)/2));
		$("#thirdLine").text(str.substr((len+1)/2));
		return;
	}
	if(len<=22){
		$("#secondLine").text(str.substr(0,10));
		$("#thirdLine").text(str.substr(10));
		return;
	}
	//长度如果占3长行，并小于第二行*3
	if(len<=30){
		$("#secondLine").text(str.substr(0,(len+1)/3));
		$("#thirdLine").text(str.substr((len+1)/3,(len+1)/3));
		//alert(str.substr((len+1)/3),(len+1)/3));
		$("#forthLine").text(str.substr((len+1)/3*2));
		return;
	}
	if(len<=32){
		$("#secondLine").text(str.substr(0,10));
		$("#thirdLine").text(str.substr(10,12));
		$("#forthLine").text(str.substr(22));
		return;
	}
	//后面都要占5行
	if(len<=37){
		var a=(len-28)/2;
		$("#firstLine").text(str.substr(0,a));
		$("#secondLine").text(str.substr(a,9));
		$("#thirdLine").text(str.substr(a+9,11));
		$("#forthLine").text(str.substr(a+20,9));
		$("#fifthLine").text(str.substr(a+29));
		return;
	}
	//后面都要占5行
	if(len<=42){
		var a=(len-31)/2;
		$("#firstLine").text(str.substr(0,a));
		$("#secondLine").text(str.substr(a,10));
		$("#thirdLine").text(str.substr(a+10,12));
		$("#forthLine").text(str.substr(a+22,10));
		$("#fifthLine").text(str.substr(a+32));
		return;
	}
}
//删除气泡框
function deleteBubble(id){
	
	$(id).remove();
}

//先变半透明，再删除气泡框
function hideAndDelBubble(id){
	$(id).fadeTo(2000, 0,function(){(id)});
}
