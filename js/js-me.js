/**
 * Created by Tccpc on 2014/5/21.
 *
 *https://github.com/tccpc/planeWars
 */

var btg = $("battleground");
var btn1 = $("btn1");
var userNameLogin = $("userName");
var pWordLogin = $("pWord");
var noNameTit = $("noNameTit");
var loginTit = $("loginTit");
var start = $("start");
var Pause = $("Pause");
var startBg = $("startBg");
var cGame = $("consoleGame");
var scoresBox = $("scores");
var gameOver = $("gameOver");
var overImg = $("overImg");
var fPath = $("data_middle");
var overTit = $("overTit");
var maxScores = $("maxScores");
var restart = $("restart");
var nowHp = $("nowHp");
var bgRed = $("bgRed");
var bossView = $("boss");
var bossHp = $("bossNowHp");
var isPause = false; //暂停判断
var flightPath = 0; //飞行路程
var scores = 0; //分数
var bulletSpeed = 10; //子弹速度
var probability = 40; //掉落物概率   总掉落率 = 掉落物种类/probability
var bulletLevel = 0; //子弹等级
var planeLevel = 0; //飞机等级
var bulletRows = 1; //子弹排数
var isDie = false; //飞机是否死亡
var userHP = 100;  //用户血量
var times;
var myPlane;
var userName;
var plane = [{
	width: 116,
	height: 92,
	positionX: -393,
	positionY: -102,
	background: "url(img/img_plane_main.png)"
}, {
	width: 116,
	height: 94,
	positionX: -127,
	positionY: -107,
	background: "url(img/img_plane_main.png)"
}, {
	width: 118,
	height: 100,
	positionX: -393,
	positionY: 0,
	background: "url(img/img_plane_main.png)"
}, {
	width: 130,
	height: 106,
	positionX: -137,
	positionY: 0,
	background: "url(img/img_plane_main.png)"
}];
var bullet = [{
	width: 14,
	height: 32,
	speed: 10,
	positionX: -335,
	positionY: -171,
	background: "url(img/img_bullet.png)"
}, {
	width: 14,
	height: 32,
	speed: 4,
	positionX: -335,
	positionY: -171,
	background: "url(img/img_bullet.png)"
}];
var hPlanes = [{
	width: 98,
	height: 76,
	speed: 5,
	score: 100,
	positionX: -267,
	positionY: -474,
	background: "url(img/img_plane_enemy.png)",
	HP: 1
}, {
	width: 104,
	height: 76,
	speed: 5,
	score: 100,
	positionX: -162,
	positionY: -474,
	background: "url(img/img_plane_enemy.png)",
	HP: 1
}, {
	width: 114,
	height: 82,
	speed: 20,
	score: 1000,
	positionX: -367,
	positionY: -440,
	background: "url(img/img_plane_enemy.png)",
	HP: 2
}, {
	width: 104,
	height: 76,
	speed: 5,
	score: 200,
	positionX: -162,
	positionY: -474,
	background: "url(img/img_plane_enemy.png)",
	HP: 2
}, {
	width: 175,
	height: 133,
	speed: 4,
	score: 500,
	positionX: -190,
	positionY: -340,
	background: "url(img/img_plane_enemy.png)",
	HP: 5
}, {
	width: 260,
	height: 196,
	speed: 3,
	score: 2000,
	positionX: 0,
	positionY: -2,
	background: "url(img/img_plane_enemy.png)",
	HP: 20
}];
var bosses = [
{
	width: 306,
	height: 236,
	score: 20000,
	speedX:1,
	speedY:1,
	src: "img/img_plane_boss_0.png",
	HP: 50
},{
	width: 350,
	height: 234,
	score: 20000,
	speedX:1,
	speedY:1,
	src: "img/img_plane_boss_1.png",
	HP: 100
},{
	width: 442,
	height: 258,
	score: 20000,
	speedX:1,
	speedY:1,
	src: "img/img_plane_boss_2.png",
	HP: 200
}];
var bombImg = ["wsparticle_06.png", "wsparticle_07.png", "wsparticle_04.png"];
var bulletDrops = [{
		index: 1,
		width: 50,
		height: 30,
		src: "img/drop_0.png"
	}, {
		index: 2,
		width: 48,
		height: 30,
		src: "img/drop_1.png"
	},{
		index: 3,
		width: 28,
		height: 24,
		src: "img/add_hp.png"
	}
	//				,{
	//					id:3,
	//					width:46,
	//					height:40,
	//					src:"img/drop_2.png"
	//				},
	//				{
	//					id:4,
	//					width:48,
	//					height:46,
	//					src:"img/drop_3.png"
	//				}
];
var hostileBullets = [
	[	{
			ATK: 20,
			width: 30,
			height: 30
		},
		["img/h_bullet_10.png", "img/h_bullet_11.png", "img/h_bullet_12.png", "img/h_bullet_13.png"]
	],
	[	{
			ATK: 10,
			width: 30,
			height: 30
		},
		["img/h_bullet_20.png", "img/h_bullet_21.png", "img/h_bullet_22.png", "img/h_bullet_23.png"]
	]
];
function $(id) {
	return document.getElementById(id);
}
start.onclick = function() {
	ajax("get", "../iData/GetIDataByid?Id="+userNameLogin.value,login);
	function login(str) {
		if(str == "null") {
			loginTit.innerHTML = "";
			loginTit.innerHTML = "用户名不存在！";
			setTimeout(function() {
				loginTit.innerHTML = "";
			}, 2000);
			return;
		}else{
			var arrObj = eval("("  + str + ")");
			var passwore = getVal(arrObj.Data,"password")
			if(passwore == pWordLogin.value) {
				userName = userNameLogin.value;
				startGame();
				return;
			} else {
				loginTit.innerHTML = "";
				loginTit.innerHTML = "密码错误！";
				setTimeout(function() {
					loginTit.innerHTML = "";
				}, 2000);
				return;
			}
		}
	}
};
cGame.onclick = function(){
	startGame();
	cGame.blur();
};
restart.onclick = startGame;
Pause.onclick = function() {
	isPause = false;
	Pause.style.display="none";
}
//初始化
function reset(){
	btg.innerHTML = "";
	flightPath = 0;
	scores = 0;
	userHP = 100;
	isPause = false;
	isDie = false;
	bulletRows = 1;
	bulletLevel = 0;
	bulletSpeed = bullet[bulletLevel].speed;
	startBg.style.display = "none";
	gameOver.style.display = "none";
	bossView.style.display = "none";
	overTit.getElementsByTagName("img")[0].style.display = "none";
	overTit.getElementsByTagName("img")[1].style.display = "none";
	nowHp.style.width = "100px";
}
function resetMyPlane(){
	var startTop = 600;
	var startLeft = 256 - plane[planeLevel].width / 2;
	createPlane(planeLevel, plane, startTop, startLeft);
	document.onmousemove = function(e) {
		e = e || window.event;
		if(!isPause) {
			movePlane(e);
		}
	}
}
var cPlane = btg.getElementsByClassName("hostilePlane");
var cBoss = btg.getElementsByClassName("boss");
billBoard();
function startGame() {
	reset();//初始化
	//billBoard() //刷新排行榜
	var max = cookieUtil.getCookie("scores") || 0;
	createScores(max, maxScores);
	resetMyPlane();
	clearInterval(times);
	times = setInterval(function() {
		if(!isPause) {
			btg.style.backgroundPosition = "0px " + flightPath + "px";
			flightPath++; //飞行路程
			scores += 1;
			createScores(scores, scoresBox);
			if(flightPath % bulletSpeed == 0) {
				createBulletRows(bulletRows, bulletLevel) //创建子弹
			}
			moveBullet(); //移动子弹
			chooseHostilePlane(); //随机生成敌机
			moveHostilePlane(); //移动敌机
			collideBullte(cPlane); //打中敌机检测
			collideBullte(cBoss);//打中boss
			//collideBoss(); //打中boss检测
			chooseBoss();//生成boss
			moveBoss(); //boss移动
			myPlaneCollide(cPlane, struckMyPlane); //己方飞机碰撞敌机检测
			myPlaneCollide(cBoss, struckMyPlane); //己方飞机碰撞敌机检测
			var bDrop = btg.getElementsByClassName("bulletDrop");
			myPlaneCollide(bDrop, collideBulletDrop); //掉落 弹药加强 检测
			var hBullet = btg.getElementsByClassName("hBullet");
			myPlaneCollide(hBullet,collideMyPlane) //己方飞机中弹检测
			createFlightPath(flightPath); //生成公里数
		}
	}, 20);
	document.onkeydown = function(e) {
		e = e || window.event;
		if(e.keyCode == 32) {
			isPause = true;
			Pause.style.display = "block";
			Pause.style.left = parseInt(myPlane.style.left)+32 + "px";
			Pause.style.top =parseInt(myPlane.style.top) + 26 + "px";
		}
	}
}
/**********************************************************************************/
//获取玩家最高分
function getScoresMax(name){
	return ajax("get","../iData/GetIDataByid?Id="+name,getScores);
}
function getScores(str){
	var arrObj = eval("(" + str + ")");
	var max = getVal(arrObj.Data,"scores");
	var pw = getVal(arrObj.Data,"password");
	var sbcl = scores * scores +3126153;
	if (scores>max) {
		console.log(sbcl);
		ajax("post", "../iData/GetDataByiddata?Id=" + userName + "&Data=scores:"+scores+"|password:" + pw+"|clsb:"+ sbcl);
	}
}
//刷新排行榜
function billBoard(){
	//ajax("get","../ ",reBoard);
}
function reBoard(str) {
	var bName = document.getElementsByClassName("bName");
	var sScores = document.getElementsByClassName("sScores");
	var arr = eval("(" + str + ")");
	var arrObj = [];
	for(var i = 0; i < arr.length; i++) {
		arrObj[i] = {};
		arrObj[i] = {};
	};
	for(var i = 0; i < arr.length; i++) {
		arrObj[i].name = "";
		arrObj[i].scores = 0;
	};
	for(var i = 0; i < arr.length; i++) {
		arrObj[i].name = arr[i].Id;
		if (Math.sqrt(getVal(arr[i].Data, "clsb")-3126153) == getVal(arr[i].Data, "scores")) {
			arrObj[i].scores = getVal(arr[i].Data, "scores");
		}else{
			arrObj[i].scores =0;
		}
	};
	arrObj.sort(function(a, b) {
		if(Number(a.scores) > Number(b.scores)) {
			return -1;
		}
		if(Number(a.scores) < Number(b.scores)) {
			return 1;
		}
		return 0;
	});
	for(var i = 0; i < 10; i++) {
		bName[i].innerHTML = arrObj[i].name;
		sScores[i].innerHTML = arrObj[i].scores;
	}
}
//在字符串str中找到valName对应的value
function getVal(str,valName){
	//console.log(typeof str)
	var arr = [];
	try{
		var arr = str.split("|");
	}catch(e){
		//TODO handle the exception
	}
	for (var i=0;i<arr.length;i++) {
		var k = arr[i].indexOf(":");
		if (arr[i].slice(0,k) == valName) {
			return arr[i].substring(k+1);
		}
	}
}
//myPlane受伤
function beInjured(){
	bgRed.style.display = "block";
	setTimeout(function(){
		bgRed.style.display = "none";
	},150);
}
//己方飞机碰撞敌机处理
function struckMyPlane(hElement){
	if (userHP > 50) {
		userHP -= 50;
		beInjured();
		nowHp.style.width = userHP + "px";
		if (hElement.className == "hostilePlane") {
			bomb(hElement);
		}
	}else{
		beInjured();
		bomb(hElement);
		myPlaneBomb();
	}
}
//生成公里数
function createFlightPath(flightPath) {
	flightPath = flightPath.toString();
	fPath.innerHTML = "";
	if(flightPath.length < 4) {
		var fPathImg = document.createElement("img");
		fPathImg.src = "img/path_f_1.png";
		fPathImg.style.width = "20px";
		fPath.appendChild(fPathImg);
		for(var i = flightPath.length - 1; i >= 0; i--) {
			fPathImg = document.createElement("img");
			fPathImg.src = "img/path_" + flightPath[i] + ".png";
			fPath.appendChild(fPathImg);
		}
	} else {
		var fPathImg = document.createElement("img");
		fPathImg.src = "img/path_f_1.png";
		fPathImg.style.width = "20px";
		fPath.appendChild(fPathImg);
		fPathImg = document.createElement("img");
		fPathImg.src = "img/path_f_2.png";
		fPathImg.style.width = "20px";
		fPath.appendChild(fPathImg);
		for(var i = flightPath.length - 2; i >= 0; i--) {
			if(i == flightPath.length - 4) {
				fPathImg = document.createElement("img");
				fPathImg.src = "img/dian.png";
				fPathImg.style.width = "12px";
				fPathImg.style.marginTop = "5px";
				fPath.appendChild(fPathImg);
			}
			fPathImg = document.createElement("img");
			fPathImg.src = "img/path_" + flightPath[i] + ".png";
			fPath.appendChild(fPathImg);
		}
	}
}
//打中敌机检测

function collideBullte(cPlane) {
	var bullets = btg.getElementsByClassName("myBullet");
	//子弹碰撞检测
	for(var i = 0; i < bullets.length; i++) {
		for(var j = 0; j < cPlane.length; j++) {
			if(!bullets[i]) {
				continue;
			}
			var bLeft = parseInt(bullets[i].style.left);
			var bTop = parseInt(bullets[i].style.top);
			var hLeft = parseInt(cPlane[j].style.left);
			var hTop = parseInt(cPlane[j].style.top);
			var bHeight = parseInt(bullets[i].offsetHeight);
			var bWidth = parseInt(bullets[i].offsetWidth);
			var hHeight = parseInt(cPlane[j].offsetHeight);
			var hWidth = parseInt(cPlane[j].offsetWidth);
			if(cPlane[j].HP > 0 && bLeft > hLeft - bWidth && bLeft < hLeft + hWidth && bTop < hTop + hHeight - bHeight && bTop > hTop - bHeight) {
				btg.removeChild(bullets[i]);
				cPlane[j].HP--;
				if (cPlane[j].className == "boss") {
					bossHp.style.width = Math.ceil(cPlane[j].HP/cPlane[j].maxHP*120) + "px";
				}
				if(cPlane[j].HP <= 0) {
					scores = scores + cPlane[j].score;
					createScores(scores, scoresBox); //生成分数
					if (cPlane[j].className == "boss") {
						bossView.style.display = "none";
					}
					bomb(cPlane[j]);
				}
			}
		}
	}
}
//己方飞机爆炸处理
function myPlaneBomb() {
	bomb(myPlane);
	getScoresMax(userName);
	var max = cookieUtil.getCookie("scores") || 0;
	if(scores > max) {
		cookieUtil.setCookie("scores", scores, 7);
		max = scores;
		overTit.getElementsByTagName("img")[0].style.display = "block";
	} else {
		overTit.getElementsByTagName("img")[1].style.display = "block";
	}
	createScores(scores, overImg);
	gameOver.style.display = "block";
	//isPause = true;
	isDie = true;
	clearInterval(times);
}
//生成分数
function createScores(scores, sElement) {
	scores = scores.toString();
	sElement.innerHTML = "";
	for(var i = 0; i < scores.length; i++) {
		var scoresImg = document.createElement("img");
		scoresImg.src = "img/number_" + scores[i] + ".png";
		sElement.appendChild(scoresImg);
	}
}
//吃到弹药处理
function collideBulletDrop(dElement) {
	switch(dElement.index) {
		case 1:
			{
				bulletSpeed -= 2;
				if(bulletSpeed < 2) {
					bulletSpeed = 2;
				}
				break;
			}
		case 2:
			{
				if(bulletRows < 4) {
					bulletRows++;
					var oLeft = myPlane.offsetLeft;
					var oTop = myPlane.offsetTop;
					btg.removeChild(myPlane);
					createPlane(bulletRows - 1, plane, oTop, oLeft);
				}
				break;
			}
		case 3:
			{
				if(userHP < 100) {
					userHP+=20;
					userHP = Math.min(userHP,100);
					nowHp.style.width = userHP + "px";
				}
				break;
			}
	}
	btg.removeChild(dElement);
}
//my飞机碰撞检测
function myPlaneCollide(sth, fn) {
	//飞机碰撞检测
	for(var j = 0; j < sth.length; j++) {
		var hLeft = parseInt(sth[j].style.left);
		var hTop = parseInt(sth[j].style.top);
		var hHeight = parseInt(sth[j].offsetHeight);
		var hWidth = parseInt(sth[j].offsetWidth);
		var mLeft = parseInt(myPlane.style.left);
		var mTop = parseInt(myPlane.style.top);
		var mHeight = parseInt(myPlane.offsetHeight);
		var mWidth = parseInt(myPlane.offsetWidth);
		if(mLeft + Math.floor(mWidth / 3 * 2) > hLeft && ((mLeft + mWidth / 3 * 1) < hLeft + hWidth) && mTop < hTop + hHeight / 2 && (mTop > hTop - mHeight / 2)) {
			fn(sth[j]);
		}
	}
}
//myPlane中弹处理
function collideMyPlane(hBelement){
	nowHp.style.width = parseInt(nowHp.style.width) - hBelement.ATK + "px";
	userHP -= hBelement.ATK;
	beInjured();
	if (userHP <= 0) {
		myPlaneBomb();
	}
	if (bulletSpeed < 10 ) {
		bulletSpeed += 2;
	}
	if(bulletRows > 1) {
		bulletRows--;
		var oLeft = myPlane.offsetLeft;
		var oTop = myPlane.offsetTop;
		btg.removeChild(myPlane);
		createPlane(bulletRows - 1, plane, oTop, oLeft);
	}
	bomb(hBelement);
	//btg.removeChild(hBelement);
}
//飞机爆炸
function bomb(bombPlane) {
	bombPlane.className = "bombPlane";
	bombPlane.style.backgroundImage = "url(img/" + bombImg[0] + ")";
	bombPlane.style.backgroundPosition = "center";
	bombPlane.style.backgroundRepeat = "no-repeat";
	var index = 1;
	clearInterval(bombPlane.times);
	bombPlane.times = setInterval(function() {
		bombPlane.style.backgroundImage = "url(img/" + bombImg[index] + ")";
		index++;
		if(index == 3) {
			chooseCreateDrop(bombPlane, probability) //生成掉落物 probability可能性
			clearInterval(bombPlane.times);
			try{
				btg.removeChild(bombPlane);
			}catch(e){
				// handle the exception
			}
		}
	}, 50);
}
//移动敌机
function moveHostilePlane() {
	var hPlanes = btg.getElementsByClassName("hostilePlane");
	for(var i = 0; i < hPlanes.length; i++) {
		hPlanes[i].style.top = parseInt(hPlanes[i].style.top) + hPlanes[i].speed + "px";
		if(parseInt(hPlanes[i].style.top) > 768) {
			btg.removeChild(hPlanes[i]);
		}
	}
}
//随机生产掉落物
function chooseCreateDrop(bombPlane, probability) {
	var hTop = parseInt(bombPlane.style.top) + parseInt(bombPlane.offsetHeight) / 2;
	var hLeft = parseInt(bombPlane.style.left) + parseInt(bombPlane.offsetWidth) / 2;
	var level = Math.floor(Math.random() * (probability + 1));
	createDrop(hTop, hLeft, bulletDrops, level);
}
//创建掉落物
function createDrop(dTop, dLeft, arrDrop, level) {
	if(level > arrDrop.length - 1) {
		return;
	}
	var drop = document.createElement("img");
	drop.style.width = arrDrop[level].width + "px";
	drop.style.height = arrDrop[level].height + "px";
	drop.src = arrDrop[level].src;
	drop.index = arrDrop[level].index;
	drop.className = "bulletDrop";
	drop.style.position = "absolute";
	drop.style.top = dTop - arrDrop[level].height / 2 + "px";
	drop.style.left = dLeft - arrDrop[level].width / 2 + "px";
	btg.appendChild(drop);
	moveDrop(drop);
}
//移动掉落物
function moveDrop(dElement) {
	var xSpeed = Math.floor(Math.random() * 9) - 4;
	var ySpeed = -Math.floor(Math.random() * 10);
	var aSpeedY = 1;
	clearInterval(dElement.times);
	dElement.times = setInterval(function() {
		if(!isPause) {
			dElement.style.top = parseInt(dElement.style.top) + ySpeed + "px";
			dElement.style.left = parseInt(dElement.style.left) + xSpeed + "px";
			//aSpeedY++;
			if(ySpeed < 5) {
				ySpeed += aSpeedY;
			}
			if(parseInt(dElement.style.left) <= 0 || parseInt(dElement.style.left) >= 512 - dElement.offsetWidth) {
				xSpeed = xSpeed * -1;
			}
			if(parseInt(dElement.style.top) > 768) {
				clearInterval(dElement.times);
			}
		}
	}, 20)
}
//选择生成敌机
function chooseHostilePlane() {
	var pLeft = 0;
	var hp;
	if(flightPath % 700 == 0) {
		pLeft = Math.floor(Math.random() * (513 - hPlanes[5].width));
		hp = createHostilePlane(pLeft, hPlanes, 5);
		var rows = 0;
		clearInterval(hp.times);
		hp.times = setInterval(function(){
			if (!isPause) {
				rows++;
				createSectorBullet(hp,1);
				if (rows > 1 || isDie || (hp.HP == 0) ){
					clearInterval(hp.times);
				}
			}
		},500);
	} else if(flightPath % 300 == 0) {
		pLeft = Math.floor(Math.random() * (513 - hPlanes[4].width));
		createHostilePlane(pLeft, hPlanes, 4)
	} else if(flightPath % 150 == 0) {
		pLeft = Math.floor(Math.random() * (513 - hPlanes[2].width));
		createHostilePlane(pLeft, hPlanes, 2)
	} else if(flightPath % 75 == 0) {
		pLeft = Math.floor(Math.random() * (513 - hPlanes[1].width));
		createHostilePlane(pLeft, hPlanes, 1)
	} else if(flightPath % 30 == 0) {
		pLeft = Math.floor(Math.random() * (513 - hPlanes[0].width));
		createHostilePlane(pLeft, hPlanes, 0);
	}
}
//移动boss
function moveBoss() {
	var boss = btg.getElementsByClassName("boss");
	for(var i = 0; i < boss.length; i++) {
		boss[i].style.top = parseInt(boss[i].style.top) + boss[i].speedY + "px";
		boss[i].style.left = parseInt(boss[i].style.left) + boss[i].speedX + "px";
		if(parseInt(boss[i].style.top) >= 100 || parseInt(boss[i].style.top) <= -100) {
			boss[i].speedY = boss[i].speedY*-1;
		}
		if(parseInt(boss[i].style.left) >= (512-boss[i].offsetWidth) || parseInt(boss[i].style.left) <= 0) {
			boss[i].speedX = boss[i].speedX*-1;
		}
	}
}
//生成boss的位置
function chooseBoss(){
	var pLeft = 0;
	var hp;
	if(flightPath % 10000 == 0) {
		pLeft = Math.floor((512 - bosses[2].width)/2);
		hp = createBoss(pLeft, bosses, 2);
		clearInterval(hp.times);
		hp.times = setInterval(function(){
			if (!isPause) {
				createSectorBullet(hp,1);
				if (isDie || (hp.HP == 0) ){
					clearInterval(hp.times);
				}
			}
		},1000);
	} else if(flightPath == 6000) {
		pLeft = Math.floor((512 - bosses[1].width)/2);
		hp = createBoss(pLeft, bosses, 1);
		clearInterval(hp.times);
		hp.times = setInterval(function(){
			if (!isPause) {
				createSectorBullet(hp,1);
				if (isDie || (hp.HP == 0) ){
					clearInterval(hp.times);
				}
			}
		},1000);
	} else if(flightPath == 3000) {
		pLeft = Math.floor((512 - bosses[0].width)/2);
		hp = createBoss(pLeft, bosses, 0);
		clearInterval(hp.times);
		hp.times = setInterval(function(){
			if (!isPause) {
				createSectorBullet(hp,1);
				if (isDie || (hp.HP == 0) ){
					clearInterval(hp.times);
				}
			}
		},1000);
	}
}
//创建boss
function createBoss(pLeft, bosses, level) {
	var boss = document.createElement("img");
	bossView.style.display = "block";
	boss.style.width = bosses[level].width + "px";
	boss.style.height = bosses[level].height + "px";
	boss.src = bosses[level].src;
	boss.HP = bosses[level].HP * Math.ceil(flightPath / 1000);
	boss.maxHP = boss.HP;
	boss.score = bosses[level].score;
	boss.className = "boss";
	boss.speedX = bosses[level].speedX;
	boss.speedY = bosses[level].speedY;
	boss.style.position = "absolute";
	boss.style.top = "10px";
	boss.style.left = pLeft + "px";
	btg.appendChild(boss);
	return boss;
}
//创建一颗敌方子弹
function createHostileBullet(bLeft, bTop, hostileBullet) { //坐标 和 子弹对象
	var hBullet = document.createElement("img");
	hBullet.className = "hBullet";
	hBullet.style.width = hostileBullet[0].width + "px";
	hBullet.style.height = hostileBullet[0].height + "px";
	hBullet.ATK = hostileBullet[0].ATK;
	hBullet.style.position = "absolute";
	hBullet.style.top = bTop + "px";
	hBullet.style.left = bLeft + "px";
	hBullet.index = 0;
	hBullet.src = hostileBullet[1][0];
	clearInterval(hBullet.times);
	hBullet.times = setInterval(function(){
		if (!isPause) {
			hBullet.index++;
			if (hBullet.index > 3) {
				hBullet.index = 0;
			}
			hBullet.src = hostileBullet[1][hBullet.index];
			if (parseInt(hBullet.style.top)>=768 || parseInt(hBullet.style.left)<=-parseInt(hBullet.style.width) || parseInt(hBullet.style.left)>=512) {
				clearInterval(hBullet.times);
			}
		}
	},200);
	btg.appendChild(hBullet);
	return hBullet;
}
//移动敌方子弹
function moveHostileBullet(xV, yV,hElement) { //x轴速度 y轴速度  定时器+自清除
	clearInterval(hElement.times2);
	hElement.times2 = setInterval(function(){
		if (!isPause) {
			hElement.style.top = parseInt(hElement.style.top) + yV + "px";
			hElement.style.left = parseInt(hElement.style.left) + xV + "px";
			if (isDie ||parseInt(hElement.style.top)>=768 || parseInt(hElement.style.left)<=-parseInt(hElement.style.width) || parseInt(hElement.style.left)>=512) {
				clearInterval(hElement.times2);
				try{
					btg.removeChild(hElement);
				}catch(e){
					// handle the exception
				}
			}
		}
	},30);
}
//生产扇形子弹
function createSectorBullet(HostilePlane,bLevel) { //敌方飞机对象  根据敌方飞机生成扇形子弹
	var hLeft = HostilePlane.offsetLeft;
	var hTop = HostilePlane.offsetTop;
	var hWidth = HostilePlane.offsetWidth;
	var hHeight = HostilePlane.offsetHeight;
	var bSpace = Math.floor(hWidth/5);
	var hb = createHostileBullet(hLeft, hTop+hHeight/2, hostileBullets[bLevel]);
	moveHostileBullet(-2,8,hb);
	hb = createHostileBullet(hLeft+bSpace, hTop+hHeight/2+30, hostileBullets[bLevel]);
	moveHostileBullet(-1,8,hb);
	hb = createHostileBullet(hLeft+bSpace*2, hTop+hHeight/2+45, hostileBullets[bLevel]);
	moveHostileBullet(0,8,hb);
	hb = createHostileBullet(hLeft+bSpace*3, hTop+hHeight/2+30, hostileBullets[bLevel]);
	moveHostileBullet(1,8,hb);
	hb = createHostileBullet(hLeft+bSpace*4, hTop+hHeight/2, hostileBullets[bLevel]);
	moveHostileBullet(2,8,hb);
}
//生产三排队列子弹
function createTriplexBullet(HostilePlane) { //敌方飞机对象  根据敌方飞机生成三排队列子弹

}
//创建敌机
function createHostilePlane(pLeft, hPlanes, level) {
	var hPlane = document.createElement("div");
	hPlane.style.width = hPlanes[level].width + "px";
	hPlane.style.height = hPlanes[level].height + "px";
	hPlane.style.background = hPlanes[level].background;
	hPlane.style.backgroundPosition = hPlanes[level].positionX + "px " + hPlanes[level].positionY + "px";
	hPlane.HP = hPlanes[level].HP * Math.ceil(flightPath / 1000);
	hPlane.score = hPlanes[level].score;
	hPlane.speed = hPlanes[level].speed;
	hPlane.className = "hostilePlane";
	hPlane.style.position = "absolute";
	hPlane.style.top = -hPlanes[level].height + "px";
	hPlane.style.left = pLeft + "px";
	btg.appendChild(hPlane);
	return hPlane;
}

//创建n排子弹
function createBulletRows(rows, level) {
	switch(rows) {
		case 1:
			{
				var createTop = parseInt(myPlane.style.top);
				var createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2);
				createBullet(createTop, createLeft, level);
				break;
			}
		case 2:
			{
				var createTop = parseInt(myPlane.style.top);
				var createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2) - 32;
				createBullet(createTop, createLeft, level);
				createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2) + 32;
				createBullet(createTop, createLeft, level);
				break;
			}
		case 3:
			{
				var createTop = parseInt(myPlane.style.top);
				var createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2);
				createBullet(createTop, createLeft, level);
				createTop = parseInt(myPlane.style.top) + 20;
				createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2) - 32;
				createBullet(createTop, createLeft, level);
				createTop = parseInt(myPlane.style.top) + 20;
				createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2) + 32;
				createBullet(createTop, createLeft, level);
				break;
			}
		case 4:
			{
				var createTop = parseInt(myPlane.style.top);
				var createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2) - 8;
				createBullet(createTop, createLeft, level);
				createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2) + 22;
				createBullet(createTop, createLeft, level);
				var createTop = parseInt(myPlane.style.top) + 20;
				var createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2) - 38;
				createBullet(createTop, createLeft, level);
				createLeft = parseInt(myPlane.style.left) + plane[0].width / 2 - (bullet[level].width / 2) + 52;
				createBullet(createTop, createLeft, level);
				break;
			}
	}

}
//创建1个子弹
function createBullet(bTop, bLeft, level) {
	var myBullet = document.createElement("div");
	myBullet.className = "myBullet";
	myBullet.style.width = bullet[level].width + "px";
	myBullet.style.height = bullet[level].height + "px";
	myBullet.style.background = bullet[level].background;
	myBullet.style.backgroundPosition = bullet[level].positionX + "px " + bullet[level].positionY + "px";
	myBullet.style.position = "absolute";
	myBullet.style.top = bTop + "px";
	myBullet.style.left = bLeft + "px";
	btg.appendChild(myBullet);
}
//移动子弹
function moveBullet() {
	var bullets = btg.getElementsByClassName("myBullet");
	for(var i = 0; i < bullets.length; i++) {
		bullets[i].style.top = parseInt(bullets[i].style.top) - parseInt(bullets[0].style.height) + "px";
		//删除多余子弹
		if(parseInt(bullets[i].style.top) < -parseInt(bullets[0].style.height)) {
			btg.removeChild(bullets[i]);
		}
	}
}
//飞机移动
function movePlane(e) {
	var planeX = e.clientX - btg.offsetLeft - myPlane.offsetWidth / 2;
	var planeY = e.clientY - btg.offsetTop - myPlane.offsetHeight / 2;
	var btgWidth = btg.offsetWidth;
	var btgHeight = btg.offsetHeight;
	planeX = Math.min(Math.max(planeX, -myPlane.offsetWidth / 2), btgWidth - myPlane.offsetWidth / 2);
	planeY = Math.min(Math.max(planeY, -myPlane.offsetHeight / 2), btgHeight - myPlane.offsetHeight / 2);
	myPlane.style.top = planeY + "px";
	myPlane.style.left = planeX + "px";
}
//创建飞机
function createPlane(level, plane, oTop, oLeft) {
	myPlane = document.createElement("div");
	myPlane.style.width = plane[level].width + "px";
	myPlane.style.height = plane[level].height + "px";
	myPlane.style.background = plane[level].background;
	myPlane.style.backgroundPosition = plane[level].positionX + "px " + plane[level].positionY + "px";
	myPlane.style.position = "absolute";
	myPlane.style.zIndex = 99;
	myPlane.style.top = oTop + "px";
	myPlane.style.left = oLeft + "px";
	btg.appendChild(myPlane);
}
//ajax
function ajax(method, url, callBack, breakDown) {
	if(!method) {
		method = "GET";
	}
	var xhr;
	if(window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			if(xhr.status == 200) {
				if(callBack) {
					callBack(xhr.responseText);
				}
			} else {
				if(breakDown) {
					breakDown();
				}
			}
		}
	}
	xhr.open(method, url, true);
	xhr.send();
}
btn1.onclick = function() {
	var uName = $("newName").value;
	var pWord = $("newPassword").value;
	if (isOk1 && isOk2 ) {
		ajax("post", "../iData/GetDataByiddata?Id=" + uName + "&Data=scores:0|password:" + pWord, domain);
		$("nameReg").innerHTML = "";
		$("PassReg").innerHTML = "";
	}
}
var uName = $("newName");
var pWord = $("newPassword");
var isOk1 = false;var isOk2 = false;
uName.onblur = function(){
	var reg = new RegExp("^[\u4e00-\u9fff]{2,8}$");
	if (reg.test(uName.value)) {
		isOk1 = true;
		ajax("get","../iData/GetIDataByid?Id="+uName.value,czlogin);
	}else{
		isOk1 = false;
		$("nameReg").innerHTML = "用户名错误！";
		$("nameReg").style.color="red";
	}
}
function czlogin(str){
	if (str == "null") {
		isOk1 = true;
		$("nameReg").innerHTML = "ok！";
		$("nameReg").style.color="greenyellow";
	}else{
		isOk1 = false;
		$("nameReg").innerHTML = "用户名已存在！";
		$("nameReg").style.color="red";
	}
}
pWord.onblur = function(){
	var reg = new RegExp("^[a-zA-Z0-9]{6,16}$");
	if (reg.test(pWord.value)) {
		isOk2 = true;
		$("PassReg").innerHTML = "ok！";
		$("PassReg").style.color="greenyellow";
	}else{
		isOk2 = false;
		$("PassReg").innerHTML = "密码错误！";
		$("PassReg").style.color="red";
	}
}
function domain(str) {
	noNameTit.innerHTML = "";
	if(str == 1) {
		noNameTit.innerHTML = "注册成功！";
		setTimeout(function() {
			noNameTit.innerHTML = "";
		}, 2000);
	} else {
		noNameTit.innerHTML = "注册失败！";
		setTimeout(function() {
			noNameTit.innerHTML = "";
		}, 2000);
	}
}
