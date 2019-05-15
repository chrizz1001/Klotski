//=============================================================================
// Klotski (華容道) resource program
//
// 08/12/2013 - create by Simon Hung
//=============================================================================

//==================
// global variable 
//==================
var gTxtMsg;
var images = {};
var noAudio = 0; //no audio support
var preload; //preload resource object

//============
// resource 
//============
var twTextMsg = {
	//play mode:
	GameMode: "遊戲模式",
	DemoMode: "示範模式",
	EditMode: "編輯模式",
	EditModeMsg: "自建關卡, 供遊戲模式使用.",

	//board info
	BestScore: "最佳成績: ", 
	Step: "步",
	Steps: "步",
	Hints: "提示",
	OptimalSolution: "最少步數: ",
	Source: "來源: ",
	Level: "第%l關",
	LevelOfUrl: "%u 的 %l",
	AliasName: "別名: ", //8/21/2013
	Creator: "提供者: ",
	userCreator: "使用者自定",

	//edit mode :
	Good: "檢測OK",
	Exist: "此關已存在",
	Flip: "左右相反",
	SameAs: "與 '%s' 相同.",
	Error: "錯誤",
	NoSolution: "無解 !",
	ZeroStep: "不需要移動 !",
	TooManyItem: "自定關太多",
	RemoveSome: "請移除一些自定關，才能加入新關！",
	SaveSuccess: "儲存完成",
	NewLevel: "新自定關: ",
	PlayItNow: "現在要玩此關嗎 ?",
	
	//tabs name:
	Classic: "  經典",
	User: "  自定",
	UserLevel: "自定-"
}

var enTextMsg = {
	//play mode:
	GameMode: "GAME Mode",
	DemoMode: "DEMO Mode",
	EditMode: "EDIT Mode",	
	EditModeMsg: "Create your own level for GAME Mode to play it.",

	//board info
	BestScore: "Best Score: ", 
	Step: "move",
	Steps: "moves",
	Hints: "hints",
	OptimalSolution: "Optimal Solution: ",
	Source: "Source: ",
	Level: "level %l",
	LevelOfUrl: "%l of %u",
	AliasName: "Alias: ", //8/21/2013
	Creator: "Creator: ",
	userCreator: "user",

	//edit mode :
	Good: "Good",
	Exist: "Already Exist",
	Flip: "flip",
	SameAs: "Same as '%s' .",
	Error: "Error",
	NoSolution: "No Solution !",
	ZeroStep: "Don't need to move !",
	TooManyItem: "Too Many Items",
	RemoveSome: "Please remove some items for add new one !",
	SaveSuccess: "Save Succesful",
	NewLevel: "New Level: ", 
	PlayItNow: "Do you want to play it now ?",
	
	//tabs name:
	Classic: "Classic",
	User: "  User",
	UserLevel: "User-"
}

var audioSource = {
	title:      'audio/title', 
	woodHit:    'audio/woodhit',
	happyPass: 	'audio/pass',
	stamp:      'audio/stamp',
	good:       'audio/good',
	exist:	    'audio/exist',
	error:      'audio/error',
	success:    'audio/success'
}

var imageSource = {
// for title
	title: '/js/plugins/Klotski/image/klotski.png',
	
// for board & block
	board:  '/js/plugins/Klotski/image/board1.jpg',
	block1: '/js/plugins/Klotski/image/block1.jpg',
	block2: '/js/plugins/Klotski/image/block2.jpg',
	block3: '/js/plugins/Klotski/image/block3.jpg',
	block4: '/js/plugins/Klotski/image/block4.jpg',
	
//for function button
	select0: '/js/plugins/Klotski/image/select0.png',
	select1: '/js/plugins/Klotski/image/select1.png',
	info0: '/js/plugins/Klotski/image/info0.png',
	info1: '/js/plugins/Klotski/image/info1.png',
	volume0: '/js/plugins/Klotski/image/volume00.png',
	volume1: '/js/plugins/Klotski/image/volume01.png',
	//game <--> edit mode, switch	
	edit:    '/js/plugins/Klotski/image/edit.png',
	game:    '/js/plugins/Klotski/image/game.png',
	
//for pass level dialog
	replayLevel: '/js/plugins/Klotski/image/return.png',
	nextLevel:   '/js/plugins/Klotski/image/nextLevel.png',
	highScore:   '/js/plugins/Klotski/image/bestScore00.png',
	
//for play mode button
	reset0: '/js/plugins/Klotski/image/reset00.png',
	reset1: '/js/plugins/Klotski/image/reset11.png',
	undo0:  '/js/plugins/Klotski/image/undo00.png',
	undo1:  '/js/plugins/Klotski/image/undo11.png',
	redo0:  '/js/plugins/Klotski/image/redo00.png',
	redo1:  '/js/plugins/Klotski/image/redo11.png',
	hints0: '/js/plugins/Klotski/image/hints00.png',
	hints1: '/js/plugins/Klotski/image/hints11.png',
	
//for demo mode button
	first0: '/js/plugins/Klotski/image/first00.png',
	first1: '/js/plugins/Klotski/image/first01.png',
	back0:  '/js/plugins/Klotski/image/backward00.png',
	back1:  '/js/plugins/Klotski/image/backward01.png',
	play0: 	'/js/plugins/Klotski/image/play00.png', //play mode
	play1: 	'/js/plugins/Klotski/image/play01.png', //stop mode
	play2: 	'/js/plugins/Klotski/image/play02.png', //gray mode
	next0:  '/js/plugins/Klotski/image/forward00.png',
	next1:  '/js/plugins/Klotski/image/forward01.png',
	last0:  '/js/plugins/Klotski/image/last00.png',
	last1:  '/js/plugins/Klotski/image/last01.png',

//for edit mode button	
	test0:  '/js/plugins/Klotski/image/test00.png',
	test1:  '/js/plugins/Klotski/image/test01.png',
	save0:  '/js/plugins/Klotski/image/save00.png',
	save1:  '/js/plugins/Klotski/image/save01.png',
	
//for game mode
	demoMode0:   '/js/plugins/Klotski/image/demoMode00.png',
	demoMode1:   '/js/plugins/Klotski/image/demoMode01.png',
	gameMode0:   '/js/plugins/Klotski/image/gameMode00.png',
	gameMode1:   '/js/plugins/Klotski/image/gameMode01.png',
	
//for msg dialog
	yes: '/js/plugins/Klotski/image/yes.png',
	no:  '/js/plugins/Klotski/image/no.png',
	ok:	 '/js/plugins/Klotski/image/yes.png'
}

function setTxtMsg()
{
	var sysLang = getSystemLanguage();

	//if(sysLang == "zh-tw" || sysLang == "zh-hk") { //tranditional chinese
	if(sysLang.indexOf("zh-") >= 0) { //all chinese
		gTxtMsg = twTextMsg;
		imageSource.demoMode0 = '/js/plugins/Klotski/image/demoMode10.png';
		imageSource.demoMode1 = '/js/plugins/Klotski/image/demoMode11.png';
		imageSource.gameMode0 = '/js/plugins/Klotski/image/gameMode10.png';
		imageSource.gameMode1 = '/js/plugins/Klotski/image/gameMode11.png';
		imageSource.save0 = '/js/plugins/Klotski/image/save10.png';
		imageSource.save1 = '/js/plugins/Klotski/image/save11.png';
		imageSource.highScore = '/js/plugins/Klotski/image/bestScore01.png';
	} else {
		gTxtMsg = enTextMsg;
	}
}

//======================
// get system language
//======================
function getSystemLanguage()
{
	var lang = window.navigator.userLanguage || window.navigator.language;
	return lang.toLowerCase();
}

//----------------------------------------------------------------------------------------
// reference: http://www.html5canvastutorials.com/tutorials/html5-canvas-image-loader/
//            Change load audio by PreloadJS & SoundJS, 09/07/2017
//----------------------------------------------------------------------------------------
//=======================
// (1) set text message
// (2) load audio
// (3) load images
// (4) callback
//=======================
function loadResource(callback)
{
	setTxtMsg();
	audioPreload(callback);
}

var audioSource = [
//audio
	{ id: "startup",   src: "/js/plugins/Klotski/audio/title.ogg"},
	{ id: "woodHit",   src: "/js/plugins/Klotski/audio/woodhit.ogg"},
	{ id: "happyPass", src: "/js/plugins/Klotski/audio/pass.ogg"},
	{ id: "stamp",     src: "/js/plugins/Klotski/audio/stamp.ogg"},
	{ id: "good",      src: "/js/plugins/Klotski/audio/good.ogg"},
	{ id: "exist",     src: "/js/plugins/Klotski/audio/exist.ogg"},
	{ id: "error",     src: "/js/plugins/Klotski/audio/error.ogg"},
	{ id: "success",   src: "/js/plugins/Klotski/audio/success.ogg"}
];

function audioPreload(callback)
{
	preload = new createjs.LoadQueue(true);
	createjs.Sound.alternateExtensions = ["mp3"];
	preload.installPlugin(createjs.Sound);
	preload.on("error", handleFileError);
	//preload.on("progress", handleProgress);
	preload.on("complete", handleComplete);

	preload.loadManifest(audioSource);

	function handleFileError(event) 
	{
		console.log("error", event);
	}

	function handleComplete(event) 
	{
		imagePreload(callback); 
	}
}

function imagePreload(callback) 
{
	var loadedFiles = 0;
	var totalFiles = 0;
	
	// get num of image sources
	for(var src in imageSource) {
		totalFiles++;
	}

	debug("image totalFiles = " + (totalFiles));
	
	//preload image source
	for(var src in imageSource) {
		images[src] = new Image();
		images[src].onload = function() {
			debug("image loadedFiles = " + (loadedFiles+1));
			if(++loadedFiles >= totalFiles) {
				if(callback != null) callback();
			}
		};
		images[src].src = imageSource[src];
	}
}

function soundPlay(name)
{
	if(!volumeState) return;
	return createjs.Sound.play(name);
}

function audioPlayStartup()
{
	soundPlay("startup");
}

function audioPlayWoodHit()
{
	soundPlay("woodHit");
}

function audioPlayHappyPass()
{
	soundPlay("happyPass");
}

function audioPlayGood()
{
	soundPlay("good");
}

function audioPlayExist()
{
	soundPlay("exist");
}

function audioPlayError()
{
	soundPlay("error");
}

function audioPlaySuccess()
{
	soundPlay("success");
}

function audioPlayStamp()
{
	soundPlay("stamp");
}