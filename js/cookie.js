var cookieUtil ={
	setCookie:function(name,value,days){
		var day = new Date();
		day.setDate(day.getDate() + days);
		document.cookie = name + "=" + encodeURIComponent(value) + ";expires="+day;
	},
	getCookie:function(name){
		var cookieValue;
		var strCookie = document.cookie;
		var arrCookie = strCookie.split("; ");
		for (var i = 0;i < arrCookie.length;i++) {
			var item = arrCookie[i].split("=");
			if (item[0] == name) {
				cookieValue = item[1];
			}
		}
		if (decodeURIComponent(cookieValue) == "undefined") {
			return;
		}else{
			return decodeURIComponent(cookieValue);
		}
	},
	removeCoolie:function(name){
		this.setCookie(name,"",-1)
	}
}


