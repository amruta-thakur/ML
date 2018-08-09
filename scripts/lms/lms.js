/************************************* audio features ***********************************/
//check scorm
var isScorm = false;
function checkScorm(){

	if(typeof LMSGetValue == 'function' && typeof LMSSetValue == 'function'){
		
		isScorm = true;
	}
	
}
var audioController = {};

var audioElement;
var videoElement;
var nextButtonDisable;
var mediaSetInterval=null;
var splashPageBeginDisableGrp ='';
var offlinePopUpGroupName ="";
var isofflinePopUpGroupShow = false;
var onLineStatusSetInterval = null;
var isLastPageFlag = false;
var completedStatusGrpName ='';
var indivisualPageNextBtnName ='';
var isAudioVideoPlayNotEnded =  false;
var exitBeforeUnload = true;

var globalvisibleVar=false;
var globalcontainerDiv1=null;
var globalautoplay =  false;
var runOnceOnloadFlag = false;
var isMultipleAudioVideoCtr = 0;
var showAllItemGroupRunName="";
var clickNextToContinueStr = null;

(function(){
	var toggleTranscript = 1;
	var ref = this;
	var isAudioTagFound = false;
	var isVideoTagFound = false;
	this.getInstance = function(){
		return this;
	}
	this.get_toggleTranscript = function(){
		return toggleTranscript;
	}
	this.set_toggleTranscript = function(n){
		toggleTranscript = n;
	}
	var loaded = function (){
		//utils.debug('main.js :- audioController:: loaded');
	}
	var audioEnded = function (){
		//utils.debug('main.js :- audioController:: audioEnded');
		//toggleAudioBtn(0);
		$('#shell_audioPlayer').trigger("pause");
		//$('#audioBtn').addClass('audioBtn_off').removeClass('audioBtn_on').removeClass('audioBtn_disable');
	}
	
	var toggleAudioBtn = function(toggleID){
		//utils.debug('main.js :- audioController:: toggleAudioBtn');
		 
		
	}
	var showHideTranscript = function(){
		//utils.debug('main.js :- audioController:: showHideTranscript');
		 
		 
	}
	
	this.toggle = function(isShow){
		//utils.debug('main.js :- audioController:: toggle');
		if ($('#audioBtn').attr('data-state') != 'disable'){
			utils.showHideLoader(true);
			if (window.HTMLAudioElement) {
				try {
					var oAudio = document.getElementById('shell_audioPlayer');
					// Tests the paused attribute and set state. 
					if (oAudio.paused) {
						oAudio.play();
						toggleAudioBtn(1);
					} else {
						oAudio.pause();
						
						toggleAudioBtn(0);
					}
					utils.showHideLoader(false);
				}
				catch (e) {
					// Fail silently but show in F12 developer tools console
					try {
					 if(window.console && console.error("Error:" + e))
					 {}
					 }catch(err){
					 
					 }
					 
				}
			}
		}
	}
	//this.play = function(containerDiv1,audioFile, autoplay, visibleVar,leftVar,topVar,widthVar,heightVar){
	this.play = function(containerDiv1,audioFile, autoplay, visibleVar){
		//utils.debug('main.js :- audioController:: play()');

		isMultipleAudioVideoCtr = isMultipleAudioVideoCtr + 1;
		if(mediaSetInterval!=null){
				clearInterval(mediaSetInterval);
				mediaSetInterval = null;
				if(isMultipleAudioVideoCtr>1) {
					mediaSetInterval = setInterval("mediaInterval()",250);
				}
		} else {
				mediaSetInterval = setInterval("mediaInterval()",250);
		}
		
		
		
		globalvisibleVar = visibleVar;
		globalautoplay = autoplay;
		
		////utils.debug('main.js :- audioController:: play() containerDiv1 ='+containerDiv1+", audioFile ="+audioFile+", autoplay ="+autoplay+", audioFile ="+audioFile+", visibleVar ="+visibleVar+", leftVar ="+leftVar+", topVar ="+topVar+", widthVar ="+widthVar+", heightVar ="+heightVar);
		var fileStr = String(audioFile).split(".")[1];
		var rnd1 = Math.random(999);
		 
		
		audioFile =audioFile +"?rnd="+rnd1;
		
		if(fileStr =="mp3"){
		
		if(!isAudioTagFound){
			isAudioTagFound = true;
			 
			//$("<div />").attr("id","shell_audioPlayer").appendTo(containerDivTemp).css({ position:'absolute', left:'0px',top:'0px', height:"auto"});
			var audioTag1 = document.getElementById(containerDiv1);
			
			var str = '<audio width="100" height="42" id="audioElement" ><source src="'+audioFile+'" type="audio/mpeg"></audio>';
			audioTag1.innerHTML = str;
			 
			
			
		}
	 
		$('#audioElement').attr('src', audioFile);
		$("#audioElement").attr('controls','controls');

		$('#audioElement').attr('autoplay', false);
		document.getElementById("audioElement").volume = Varglobalvolume.getValue();
		console.log("audioElement ="+document.getElementById("audioElement").muted);
		if(Varglobalvolume.getValue()==0){
				//document.getElementById("audioElement").muted = true;
				//console.log("audioElement IF="+document.getElementById("audioElement").muted);
				
		}
		
		globalcontainerDiv1 = "audioElement";
		document.getElementById("audioElement").style.visibility ="hidden";
		if(visibleVar){
			if(  document.getElementById(containerDiv1)) {
				document.getElementById(containerDiv1).style.visibility ="visible";
				//document.getElementById("audioElement").style.visibility ="visible";
			}
		} else {
				if(  document.getElementById(containerDiv1)) {
				 
					document.getElementById(containerDiv1).style.visibility ="hidden";
					//document.getElementById("audioElement").style.visibility ="hidden";
				}
		}
		
		} else if(fileStr =="mp4"){
			var videoTag1
		if(!isVideoTagFound){
			isVideoTagFound = true;
			
			//$("<div />").attr("id","shell_videoPlayer").appendTo("#pageDIV").css("z-index",999).css({ position:'absolute', left:'0px', top:'504px', width:"980px", height:"auto", color:"white"});
		
			var str = '<video  id="videoElement" ><source src="'+audioFile+'" type="audio/mpeg"></video>';
			videoTag1 = document.getElementById(containerDiv1);
			videoTag1.innerHTML = str;
	
		}
		
		 /*
		videoTag1 = document.getElementById(containerDiv1);
		videoTag1.style.left=leftVar+"px !important";
		videoTag1.style.top=topVar+"px !important";
		videoTag1.style.width=widthVar+"px !important";
		videoTag1.style.height=heightVar+"px !important";
		 */
		// //utils.debug('main.js :- audioController:: play() videocontainer ='+videocontainer);
		 //videocontainer.objLyr.hasMoved = true; videocontainer.objLyr.newX = 240; videocontainer.objLyr.newY = 150;
		
		//$("#"+containerDiv1+" a").css({"left":leftVar+"px !important;","top":topVar+"px !important;","width":widthVar+"px !important","height":heightVar+"px !important"});
		
		
		$('#videoElement').attr('src', audioFile);
		$("#videoElement").attr('controls','controls'); 

		$('#videoElement').attr('autoplay', false);
		document.getElementById("videoElement").volume = Varglobalvolume.getValue();
		if(Varglobalvolume.getValue()==0){
				//document.getElementById("audioElement").muted = true;
				//console.log("audioElement IF="+document.getElementById("audioElement").muted);
				
		}
		globalcontainerDiv1 = "videoElement";
		document.getElementById("videoElement").style.visibility ="hidden";
		if(visibleVar){
			if(  document.getElementById(containerDiv1)) {
				//document.getElementById(containerDiv1).style.visibility ="visible";
			}
		} else {
				if(  document.getElementById(containerDiv1)) {
					//document.getElementById(containerDiv1).style.visibility ="hidden";
				}
		}
		
		}
		
		/////
		if(runOnceOnloadFlag) {
			audioVideoShowHide();
		} else {
			if(fileStr =="mp4"){
			setTimeout("audioVideoShowHide();",2500);
			} else {
			  setTimeout("audioVideoShowHide();",1000);
			}

		}
		runOnceOnloadFlag = true;
		
		
		if(document.getElementById("audioElement")){
				audioElement = document.getElementById("audioElement");
				audioElement.addEventListener("ended",function(e){
						//nextButtonDisable.actionHide();
						hideNextDisableButton();
						
						
				},false);
				
				 audioElement.addEventListener('canplaythrough', function(e) { 
					manageMediaOniPhoneDevice();
				}, false); 

				
		}
		
		if(document.getElementById("videoElement")){
				videoElement = document.getElementById("videoElement");
				videoElement.addEventListener("ended",function(e){
						//nextButtonDisable.actionHide();
						hideNextDisableButton();
						
						
				},false);
				
				 
				
				
		}
		
		//utils.debug('main.js :- audioController:: play() END'); 
	}
	this.playIE8 = function(containerDiv1,audioFile, autoplay, visibleVar){
		
		//utils.debug('main.js :- audioController:: playIE8()');
		////utils.debug('main.js :- audioController:: playIE8() containerDiv1 ='+containerDiv1+", audioFile ="+audioFile+", autoplay ="+autoplay+", audioFile ="+audioFile+", visibleVar ="+visibleVar+", leftVar ="+leftVar+", topVar ="+topVar+", widthVar ="+widthVar+", heightVar ="+heightVar);
		var generateObject;
		var fileStr = String(audioFile).split(".")[1];
		var rnd1 = Math.random(999);
		if(containerDiv1 =="videocontainer"){
			containerDiv1 =containerDiv1+"ie8";  // videocontainer ie8
		} else if(containerDiv1 =="audiocontainer"){
		 containerDiv1 =containerDiv1+"ie8";  // audiocontainer ie8
		}  
		
		 
		
		
		var objectTag = document.body.getElementsByTagName("object")[0];
						//o.setAttribute("data", "http://www.yahoo.com");
						
		if(objectTag){
			//utils.debug('main.js :- audioController:: playIE8() now remove if exist');
			if(document.getElementById("object_tag")){
				var obj = document.getElementById("object_tag");
				obj.Pause();
			}
			
			if(document.getElementById("object_tag_video")){
				var obj1 = document.getElementById("object_tag_video");
				obj1.Pause();
			}
			
			
 		    //utils.debug('main.js :- audioController:: playIE8() remove if exist DONE');
			//return 
		}
		
		
		
		
		if(fileStr =="mp3"){
						generateObject =	'<object id="object_tag" style="height:42px !important;width:auto !important;" classid="clsid:22d6f312-b0f6-11d0-94ab-0080c74c7e95" codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#version=5,1,52,701" standby="loading microsoft windows media player components..." type="application/x-oleobject" width="100%" height="100%">' + 
						'<param name="filename" value="' + audioFile +'?rnd1='+rnd1 +'">' + 
						'	<param name="animationatstart" value="true">' + 
						'	<param name="transparentatstart" value="true">' + 
						'	<param name="autostart" value="'+autoplay+'">' + 
						'	<param name="showcontrols" value="true">' + 
						'	<param name="ShowStatusBar" value="false">' + 
						'	<param name="windowlessvideo" value="false">' + 
						' <param name="ShowTracker" value="true" />'    +
						' <param name="EnablePositionControls" value="false" />' +
						' <PARAM name="ShowDisplay" VALUE="false">' +
						'<PARAM NAME="EnableContextMenu" VALUE="false">'+
						'<PARAM NAME="uiMode" VALUE="none">' +
						'<PARAM NAME="stretchToFit" VALUE="false">' +
						'<PARAM NAME="ShowCaptioning" VALUE="false">' +
						'<PARAM NAME="DisplaySize" VALUE="false">' +
						'<PARAM NAME="fullScreen" VALUE="false">' +
						'<PARAM NAME="stretechToFit" VALUE="true">'+
						
						'<PARAM NAME="SendMouseClickEvents" VALUE="false">' +
						'</object>';
						
		}else if(fileStr =="mp4"){
		
						generateObject =	'<object id="object_tag_video" classid="clsid:22d6f312-b0f6-11d0-94ab-0080c74c7e95" codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#version=5,1,52,701" standby="loading microsoft windows media player components..." type="application/x-oleobject" width="100%" height="100%">' + 
						'<param name="filename" value="' + audioFile +'?rnd1='+rnd1 +'">' + 
						'	<param name="animationatstart" value="true">' + 
						'	<param name="transparentatstart" value="false">' + 
						'	<param name="autostart" value="'+autoplay+'">' + 
						'	<param name="showcontrols" value="true">' + 
						'	<param name="ShowStatusBar" value="false">' + 
						'	<param name="windowlessvideo" value="false">' + 
						' <param name="ShowTracker" value="true" />'    +
						' <param name="EnablePositionControls" value="false" />' +
						' <PARAM name="ShowDisplay" VALUE="false">' +
						'<PARAM NAME="EnableContextMenu" VALUE="false">'+
						'<PARAM NAME="uiMode" VALUE="none">' +
						'<PARAM NAME="stretchToFit" VALUE="false">' +
						'<PARAM NAME="ShowCaptioning" VALUE="false">' +
						'<PARAM NAME="DisplaySize" VALUE="false">' +
						'<PARAM NAME="fullScreen" VALUE="false">' +
						'<PARAM NAME="stretechToFit" VALUE="true">'+
						
						'<PARAM NAME="SendMouseClickEvents" VALUE="false">' +
						'</object>';
						
		}
		//utils.debug('main.js :- audioController:: playIE8() generateObject ='+generateObject); 
		
		if(fileStr =="mp3"){
			//if(!isAudioTagFound){
				isAudioTagFound = true;
				//$("<div />").attr("id","shell_audioPlayer").appendTo(containerDivTemp).css({ position:'absolute', left:'0px',top:'0px', height:"auto"});
				audioTag1 = document.getElementById(containerDiv1);

				//utils.debug('main.js :- audioController:: playIE8() audioTag1.innerHTML ='+audioTag1.innerHTML); 
				audioTag1.innerHTML = generateObject;
				//utils.debug('main.js :- audioController:: playIE8() audioTag1.innerHTML NOW ='+audioTag1.innerHTML); 
		   // }
		
		} else if(fileStr =="mp4"){
		
				var videoTag1
			//if(!isVideoTagFound){
				isVideoTagFound = true;
				videoTag1 = document.getElementById(containerDiv1);
			videoTag1.innerHTML = generateObject;
		
			//}
		}
		
		try {
			if(visibleVar){
				if(  document.getElementById(containerDiv1)) {
					document.getElementById(containerDiv1).style.visibility ="visible";
					if(document.getElementById("object_tag")){
						document.getElementById("object_tag").style.visibility ="visible";
					}
					if(document.getElementById("object_tag_video")){
						document.getElementById("object_tag_video").style.visibility ="visible";
					}
				}
			} else {
					if(  document.getElementById(containerDiv1)) {
						document.getElementById(containerDiv1).style.visibility ="hidden";
						if(document.getElementById("object_tag")){
							document.getElementById("object_tag").style.visibility ="hidden";
						}
						if(document.getElementById("object_tag_video")){
							document.getElementById("object_tag_video").style.visibility ="hidden";
						}
					
					}
			}
		} catch(err){
			//utils.debug('main.js :- audioController:: playIE8() visible in catch ');
		}
		
	
		//utils.debug('main.js :- audioController:: playIE8() END ');
	}
	this.pause = function(){
		//utils.debug('main.js :- audioController:: pause');
		
		if (document.all && !document.addEventListener)
		{
			//utils.debug('main.js :- audioController:: pause test 1111');
		    if(document.getElementById("object_tag")){
				//utils.debug('main.js :- audioController:: pause test 2222');
				var obj = document.getElementById("object_tag");
				//utils.debug('main.js :- audioController:: pause test 3333');
				if(visibleFlag) {
					//utils.debug('main.js :- audioController:: pause test 4444');

					if(document.getElementById('videocontainerie8')){
					obj.style.visibility="visible";
					}
					//utils.debug('main.js :- audioController:: pause test 5555');

				} else {
					//utils.debug('main.js :- audioController:: pause test 6666');
					if(document.getElementById('videocontainerie8')){
					  obj.style.visibility="hidden";
					}
					//utils.debug('main.js :- audioController:: pause test 7777');
				}
				
				obj.Pause();
				

				//utils.debug('main.js :- audioController:: pause test 88888');
			}

			 
			if(document.getElementById("object_tag_video")){
				//utils.debug('main.js :- audioController:: pause test 2222');
				var obj = document.getElementById("object_tag_video");
				//utils.debug('main.js :- audioController:: pause test 3333');
				if(visibleFlag) {
					//utils.debug('main.js :- audioController:: pause test 4444');

					if(document.getElementById('videocontainerie8')){
					obj.style.visibility="visible";
					}
					//utils.debug('main.js :- audioController:: pause test 5555');

				} else {
					//utils.debug('main.js :- audioController:: pause test 6666');
					if(document.getElementById('videocontainerie8')){
					  obj.style.visibility="hidden";
					}
					//utils.debug('main.js :- audioController:: pause test 7777');
				}
				
				obj.Pause();
				

				//utils.debug('main.js :- audioController:: pause test 88888');
			}
 
			
		}else{
				//utils.debug('main.js :- audioController:: pause test 9999');
			if(document.getElementById('audioElement')){
				var oAudio = document.getElementById('audioElement');
				oAudio.pause();
			}
			if(document.getElementById('videoElement')){
				var oVideo = document.getElementById('videoElement');
				oVideo.pause();
			}
			//utils.debug('main.js :- audioController:: pause test AAAA');
		}
	
		
		 
		
	
	}
	this.pauseIE8 = function(){
		//utils.debug('main.js :- audioController:: pauseIE8');
		var obj = document.getElementById("mediaplayer");
		obj.Pause();
		//$("#mediaplayer").remove();
		
	}
	this.clear = function(){
		//utils.debug('main.js :- audioController:: clear');
		if ($('#shell_audioPlayer').attr('src') != undefined && $('#shell_audioPlayer').attr('src') != ''){
			$('#shell_audioPlayer').removeAttr('src');
			$("#videoplay").removeAttr('controls');
			$("#shell_audioPlayer").removeAttr('controls');
			toggleAudioBtn(0);
		}
	}
	this.clearIE8 = function(){
		//utils.debug('main.js :- audioController:: clearIE8');
		try {
			//utils.debug('main.js :- audioController:: clearIE8 try');
			$("#mediaplayer").remove();
		} catch(err){

			//utils.debug('main.js :- audioController:: clearIE8 catch');
		}
		
	}
	
this.replay = function(){
		//utils.debug('main.js :- audioController:: replay');
		
		if (document.all && !document.addEventListener)
		{
			//utils.debug('main.js :- audioController:: replay test 1111');
		    if(document.getElementById("object_tag")){
				//utils.debug('main.js :- audioController:: replay test 2222');
				var obj = document.getElementById("object_tag");
				//utils.debug('main.js :- audioController:: replay test 3333');
				if(visibleFlag) {
					//utils.debug('main.js :- audioController:: replay test 4444');

					if(document.getElementById('videocontainerie8')){
					obj.style.visibility="visible";
					}
					//utils.debug('main.js :- audioController:: replay test 5555');

				} else {
					//utils.debug('main.js :- audioController:: replay test 6666');
					if(document.getElementById('videocontainerie8')){
					  obj.style.visibility="hidden";
					}
					//utils.debug('main.js :- audioController:: replay test 7777');
				}
				
				obj.Play();
				

				//utils.debug('main.js :- audioController:: replay test 88888');
			}

			 
			if(document.getElementById("object_tag_video")){
				//utils.debug('main.js :- audioController:: replay test 2222');
				var obj = document.getElementById("object_tag_video");
				//utils.debug('main.js :- audioController:: replay test 3333');
				if(visibleFlag) {
					//utils.debug('main.js :- audioController:: replay test 4444');

					if(document.getElementById('videocontainerie8')){
					obj.style.visibility="visible";
					}
					//utils.debug('main.js :- audioController:: replay test 5555');

				} else {
					//utils.debug('main.js :- audioController:: replay test 6666');
					if(document.getElementById('videocontainerie8')){
					  obj.style.visibility="hidden";
					}
					//utils.debug('main.js :- audioController:: replay test 7777');
				}
				
				obj.Play();
				

				//utils.debug('main.js :- audioController:: replay test 88888');
			}

		}else{
				//utils.debug('main.js :- audioController:: replay test 9999');
			if(document.getElementById('audioElement')){
				var oAudio = document.getElementById('audioElement');
				oAudio.play();
			}
			if(document.getElementById('videoElement')){
				var oVideo = document.getElementById('videoElement');
				oVideo.play();
			}
			//utils.debug('main.js :- audioController:: replay test AAAA');
		}
	
	}
	
	
	

	
	 
	 
}).apply(audioController);

/************************************* utils features ***********************************/
var utils = {};
(function(){

this.debug = function(text){
		try {
			//console.log(text);
		} catch(err){
		}
	}

}).apply(utils);

///////////////////////////////

//function loadAudioVideo(containerDiv1,audioFile, autoplay, visibleVar,leftVar,topVar,widthVar,heightVar){
function loadAudioVideo(containerDiv1,audioFile, autoplay, visibleVar){
//utils.debug('custom.js :- loadAudioVideo');
 
	if (document.all && !document.addEventListener)
	{
	 
		audioController.playIE8(containerDiv1,audioFile, autoplay, visibleVar);
	}else{
		audioController.play(containerDiv1,audioFile, autoplay, visibleVar); 
	}

 }
 var g_containerDiv1;
 var g_audioFile='';
 var g_autoplay;
 var g_visibleVar;
 var sameMediaFlag = false;
 
 function loadAudioVideoFromAccordion(containerDiv1,audioFile, autoplay, visibleVar){

	g_containerDiv1 = containerDiv1;
	 
	if(g_audioFile==''){
		g_audioFile = audioFile;
		sameMediaFlag = false;
	} else if(g_audioFile == audioFile){
		 sameMediaFlag = true;
	} else {
		sameMediaFlag = false;
		g_audioFile = audioFile;
	}
	g_autoplay = autoplay;
	g_visibleVar = visibleVar;
	
	setTimeout("loadAudioVideoNow();",100);
	
 }
 
 function loadAudioVideoNow(){
  
	
	if(jQuery(activatedAccordion).hasClass('active')){
	     if(sameMediaFlag){
			audioController.replay();
		 } else {
			loadAudioVideo(g_containerDiv1, g_audioFile, g_autoplay, g_visibleVar);
		 }
	} else {
		pauseAudioVideo(false);
	}

 }

 ///////////////////////  ie8 section /////////////////////////
 
$( document ).ready(function() {

var getChromeVersionNum = getChromeVersion();

	if(getChromeVersionNum>=55){
		loadjscssfile("custom_chrome55.css", "css");
	}
	

//onLineStatusSetInterval  = setInterval("updateOnlineStatus();",1000);


if (document.all && !document.addEventListener) {
	// do nothing
	} else {
	
		$("html").css("overflow","hidden");
	}
	
	
	disableRightClick();
	disableBackspaceNavigation();
	
	setTimeout("loadCSSRunTime();",500);
	deselectTextOnIe8();
	setTimeout("loadUnloadJSfile();",1000);
	/*
		$("#pageDIV").css("margin-left","auto");
		$("#pageDIV").css("margin-right","auto");
		$("#pageDIV").css("left","0");
		$("#pageDIV").css("right","0");

		$( window ).resize(function() {
			$("#pageDIV").css("left","0");
			$("#pageDIV").css("right","0");
		});
*/
	//setTimeout(function(){ $("#pageDIV").css("visibility","visible");},1000);
/*
	 getAndSetContentFrameObj(true);
	 try {
		parent.attachPreloaderInIndexFile();
	 }catch(err){}
	 
    global_contentframe.onload=function(){
		 
		try {
		$('#preloader').fadeOut(500);
		}catch(err){}
		
	}
*/
    setTimeout("hidePreloadNow();",500);
	
	
	window.onorientationchange = function() {
		 onorientationchangeFn();
	}
		
	setTimeout("onorientationchangeFn();",3000);
	
	
	
	
	//$('#preloader').fadeOut(500);
});
 
 function hidePreloadNow(){
	$('#preloader').hide();
	 
 }
 
 function getChromeVersion () {     
    var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);

    return raw ? parseInt(raw[2], 10) : false;
}

function loadUnloadJSfile(){
	
	var  rnd = Math.random()*999;
	
	loadjscssfile("js/unload.js?rnd="+rnd, "js");
	
}


function loadCSSRunTime(){

		if (document.all && !document.addEventListener)
        {
			//loadjscssfile("custom_ie8.css", "css") ////dynamically load and add this .css file
			if(navigator.appVersion.indexOf("MSIE 8.0")!=-1){
				loadjscssfile("custom_ie8.css", "css") 
		
			} else if(navigator.appVersion.indexOf("MSIE 7.0")!=-1){
				loadjscssfile("custom_ie7.css", "css") 
		
			}
			
        } 
		
	
}


function loadjscssfile(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref);
		
		 
		
}




function deselectTextOnIe8 (){
document.onselectstart = function() {return false; }                        
}          


function sendmail(emailaddress){
var email = emailaddress;
var mailto_link = 'mailto:' + email;
var  win = window.open(mailto_link, 'emailWindow');
     if (win && !win.closed){       
       win.close();
       win = null;
     }
}
var visibleFlag = true;

function pauseAudioVideo(flg){
	//utils.debug('main.js :- pauseAudioVideo() flg ='+flg);
	visibleFlag = flg;
	try {
		audioController.pause();
	} catch(err){
	
	}
	
}
				

function playAudioVideoIfNotEnded(){
		try {
		   if(!splashPageBeginDisableGrp==""){
				if(!isAudioVideoPlayNotEnded) {
				  audioController.replay();
				}
			}
		} catch(err){
	
		}
}





/////////////////////////////////////////////////////////////////

var months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];       
	var currentDate = new Date()
	var day =   currentDate.getDate();
	var month = currentDate.getMonth();
	var year = currentDate.getFullYear();
	var hours = currentDate.getHours();
	var minutes = currentDate.getMinutes();
	var seconds = currentDate.getSeconds();
	var certificateDate;
	if(day<10){
	  certificateDate = "0"+day + " " + months[month] + " " + year;
	} else {
	  certificateDate = day + " " + months[month] + " " + year;
	}
	
	
function openCertificate(usernm1,bankId1,date1,score1 ){

  
 var imgResult ="images/certificate_print.png";
 var top_scb_logo ="images/logo.jpg";
 var top_bar ="images/scb_branding-bar.jpg";
 var userName="admin";
 var bankId ="12345678";
 
 
 //var temptopics;
 var headerText="Certificate of Completion";
 var text_below_headerText="";
 text_below_headerText = "For successfully completing the </br> <b>Occupational Health and Safety Training</b></br>  (Traditional Chinese) (Standalone Version)</b>";
 //var for_text= "For having sucessfully completed";
 var on_text ="on";
 var Comm_Banking_text="Congratulations! You scored   <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This certificate is presented to:";
  //var text_test_score="Test score:";
			
		
			checkScorm();
if(isScorm == true){
 userName = AICC_Student_Name.getValue();
  bankId = AICC_Student_ID.getValue();
  text_below_headerText = "<span style='color:#000000;' >For successfully completing the </span></br> <span style='top: 6px;z-index: 2;text-align: center; font-size: 16px;position: relative;font-family:Arial;color:green;'><b>Occupational Health and Safety Training</b><br>(Traditional Chinese) (e-Learning)<br></span>";
 }
else{

  try {
  userName = VarEntry_0003.getValue();
  bankId = VarEntry_0004.getValue();
  text_below_headerText = "For successfully completing the </br> <b>Occupational Health and Safety Training</b></br> <b>(Traditional Chinese) (Standalone Version)</b>";
  } catch(err){
  }
 }
 
 
 var ms_ie = false;
    var ua = window.navigator.userAgent;
    var old_ie = ua.indexOf('MSIE ');
    var new_ie = ua.indexOf('Trident/');

    if ((old_ie > -1) || (new_ie > -1)) {
        ms_ie = true;
    }
	
	var str;
	
	if(ms_ie){
			
 str = "<html><head><title>Occupational Health and Safety Training (Traditional Chinese) (Standalone Version)</title></head><style>"
  +"body {overflow: hidden !important;margin:0px !important; position:absolute;width:auto;height:100%;margin: auto;left: 0;right: 0;} "
  +"div { position: absolute; font-family:Arial; font-size:11px; color:#58595b;  }"
 str = str + ".title { top: 95px; left:35px; font: normal  14px Arial; color: #d42e12; z-index:4;}"
 str = str + ".container { margin:0px;padding:0px;position:absolute;height:660px;width:1010px;left:0px;}"
 
  str = str + "a{ text-decoration:none;z-index:4;color:white;line-height: 32px;margin: 14px;}"
   str = str + ".print:hover{background:#6abe28}"
 str = str + ".background { top:106px; left:155px; z-index:1; }"
  str = str + ".top_scb_logo { top:13px; right:15px; z-index:1;position:absolute; }"
  str = str + ".top_bar { top:63px;  z-index:1;position:absolute; }"
  
 str = str + ".score  { top:255px; z-index: 2; width: 60px; text-align: center; font-size:16px;font-family:Arial; color:#000000;position:relative;width:100%; font-weight:bold; }"
   str = str + ".date_1 { top:120px;  z-index: 2; left:448px; font-size:20px;font-weight:bold;  font-family:Arial; color:#000000;position:relative;}"
 str = str + ".name { top:244px;  z-index: 4; text-align: center; font-size:20px; font-weight:bold;  font-family:Arial; color:#000000;position:relative;width:100%;}"
 str = str + ".print { top: 500px; left:468px;width:80px;height:30px; font-size:16px;z-index: 4;background:#15610d}"
 str = str + ".headerText{ color:#666666;top: 55px;z-index: 2;text-align: center; font-size: 28px;position: relative;font-family:Arial;}"
 str = str + ".text_below_headerText{}"
  str = str + "a img{ position: absolute;}"
 //str = str + ".for_text{ color:#666666;top: 155px;z-index: 2;text-align: center; font-size: 16px;position: relative;font-family:Arial;}"
  str = str + ".on_text_1{ color:#000000;top: 197px;left: 473px;z-index: 2;width: 60px;text-align: center; font-size: 16px;position: relative;display:none;}"
 str = str + ".Comm_Banking_text{ top: -24px;left:-32px;z-index: 2;text-align: center; font-size: 22px;position:relative;color:#666666;font-family:Arial;}"
 
/*  str = str + ".myscore1 { top:118px;  z-index: 2; text-align: center; font-size:20px;  font-family:Arial; color:#000000;position:relative;font-weight:bold; }"; */

if(score1>=100){
str = str + ".myscore1 { top:-119px;  z-index: 2;  font-size:20px;  font-family:Arial; color:#000000;position:relative;font-weight:bold;float:right; left:-346px;  }";
 } else{
str = str + ".myscore1 { top:-119px;  z-index: 2;  font-size:20px;  font-family:Arial; color:#000000;position:relative;font-weight:bold;float:right; left:-354px;  }";
 }
 //str = str + "@media print { div.print { display: none; } .container {left:40px;}}"
str = str + ".print { display: none; } .container {left:40px;}"
 str = str + ".topics { top: 350px; left:50px; z-index: 4;}"
 
 str = str + "</style><body><div class='container'> <div class='title' ></div>" 
 str = str + "<div class='print'><a href='javascript:window.print()'>PRINT</a></div>"
 str = str + "<div class='background'><img src='"+imgResult+"' border=0 width=704 height=471 /></div>"
  str = str + "<div class='top_scb_logo'><img src='"+top_scb_logo+"' border=0 width=100 height=39 /></div>"
  str = str + "<div class='top_bar'><img src='"+top_bar+"' border=0 width=1010 height=17 /></div>"
 str = str + "<div class='name'>"+userName+"</div>"
 str = str + "<div class='score'>"+bankId+"</div>"
 str = str + "<p class='headerText' id='headerText'>"+headerText+"</p>"
 str = str + "<p class='text_below_headerText' id='text_below_headerText'>"+text_below_headerText+"</p>"
  //str = str + "<p class='for_text' id='for_text'>"+for_text+"</p>"
   str = str + "<p class='on_text_1' id='on_text_1'>"+on_text+"</p>"
    str = str + "<p class='Comm_Banking_text' id='Comm_Banking_text'>"+Comm_Banking_text+"</p>"
 
 
  str = str + "<div class='date_1'>"+date1+"</div>"
  //add new line//
  //str = str + ".text_test_score{ color:#666666;top: 77px;z-index: 2;text-align: center; font-size: 16px;position: relative;font-family:Arial; }"
  str = str + "<div class='myscore1'> "+score1+"% </div>";
 str = str + "</div></body></html>";
 
	} else {
     str = "<html><head><title>Occupational Health and Safety Training (Traditional Chinese)</title></head><style>"
  +"body {overflow: hidden !important;margin:0px !important; position:absolute;width:auto;height:100%;margin: auto;left: 0;right: 0;} "
  +"div { position: absolute; font-family:Arial; font-size:11px; color:#58595b;  }"
 str = str + ".title { top: 95px; left:35px; font: normal  14px Arial; color: #d42e12; z-index:4;}"
 str = str + ".container { margin:0px;padding:0px;position:absolute;height:660px;width:1010px;left:0px;}"
 
  str = str + "a{ text-decoration:none;z-index:4;color:white;line-height: 32px;margin: 14px;}"
   str = str + ".print:hover{background:#6abe28}"
 str = str + ".background { top:106px; left:155px; z-index:1; }"
  str = str + ".top_scb_logo { top:13px; right:15px; z-index:1;position:absolute; }"
  str = str + ".top_bar { top:63px;  z-index:1;position:absolute; }"
  
 str = str + ".score  { top:275px; z-index: 2; width: 60px; text-align: center; font-size:16px;font-family:Arial; color:#000000;position:relative;width:100%; font-weight:bold; }"
   str = str + ".date_1 { top:112px;  z-index: 2; left:448px; font-size:20px;font-weight:bold;  font-family:Arial; color:#000000;position:relative;}"
 str = str + ".name { top:260px;  z-index: 4; text-align: center; font-size:20px; font-weight:bold;  font-family:Arial; color:#000000;position:relative;width:100%;}"
 str = str + ".print {display:none; top: 474px; left:468px;width:80px;height:30px; font-size:16px;z-index: 4;background:#15610d}"
 str = str + ".headerText{ color:#666666;top: 55px;z-index: 2;text-align: center; font-size: 28px;position: relative;font-family:Arial;}"
 str = str + ".text_below_headerText{ color:#000000;top: 200px;z-index: 2;text-align: center; font-size: 14px;position: relative;font-family:Arial;color:green; }"
  str = str + "a img{ position: absolute;}"
 //str = str + ".for_text{ color:#666666;top: 155px;z-index: 2;text-align: center; font-size: 16px;position: relative;font-family:Arial;}"
  str = str + ".on_text_1{ color:#000000;top: 197px;left: 473px;z-index: 2;width: 60px;text-align: center; font-size: 16px;position: relative;display:none;}"
 //str = str + ".Comm_Banking_text{ top: -34px;z-index: 2;text-align: center; font-size: 22px;position:relative;color:#666666;font-family:Arial;}"
 
 str = str + ".Comm_Banking_text{ top: -24px;left:-32px;z-index: 2;text-align: center; font-size: 22px;position:relative;color:#666666;font-family:Arial;}"
 
/*  str = str + ".myscore1 { top:118px;  z-index: 2; text-align: center; font-size:20px;  font-family:Arial; color:#000000;position:relative;font-weight:bold; }"; */

if(score1>=100){
str = str + ".myscore1 { top:-119px;  z-index: 2;  font-size:20px;  font-family:Arial; color:#000000;position:relative;font-weight:bold;float:right; left:-346px;  }";
 } else{
str = str + ".myscore1 { top:-119px;  z-index: 2;  font-size:20px;  font-family:Arial; color:#000000;position:relative;font-weight:bold;float:right; left:-354px;  }";
 }
 
 
// str = str + ".myscore1 { top: -128px;  z-index: 2;  font-size:20px;  font-family:Arial; color:#000000;position:relative;font-weight:bold;float:right; left:-316px;  }";
 
 str = str + "@media print { div.print { display: none; } .container {left:40px;}}"

 str = str + ".topics { top: 350px; left:50px; z-index: 4;}"
 
 str = str + "</style><script>function delayPrintDialogue(){  window.print(); window.close(); try { window.document.close();} catch(err){}   }</script><body><div class='container'> <div class='title' ></div>" 
 str = str + "<div class='print'><a href='javascript:window.print()'>PRINT</a></div>"
 str = str + "<div class='background'><img src='"+imgResult+"' border=0 width=704 height=471 /></div>"
  str = str + "<div class='top_scb_logo'><img src='"+top_scb_logo+"' border=0 width=100 height=39 /></div>"
  str = str + "<div class='top_bar'><img src='"+top_bar+"' border=0 width=1010 height=17 /></div>"
 str = str + "<div class='name'>"+userName+"</div>"
 str = str + "<div class='score'>"+bankId+"</div>"
 str = str + "<p class='headerText' id='headerText'>"+headerText+"</p>"
 str = str + "<p class='text_below_headerText' id='text_below_headerText'>"+text_below_headerText+"</p>"
  //str = str + "<p class='for_text' id='for_text'>"+for_text+"</p>"
   str = str + "<p class='on_text_1' id='on_text_1'>"+on_text+"</p>"
    str = str + "<p class='Comm_Banking_text' id='Comm_Banking_text'>"+Comm_Banking_text+"</p>"
 
 
  str = str + "<div class='date_1'>"+date1+"</div>"
  //add new line//
  //str = str + ".text_test_score{ color:#666666;top: 77px;z-index: 2;text-align: center; font-size: 16px;position: relative;font-family:Arial; }"
  str = str + "<div class='myscore1'> "+score1+"% </div>";
 str = str + "</div></body></html>";
 }
 
 var newwin1;
 var ms_ie = false;
    var ua = window.navigator.userAgent;
    var old_ie = ua.indexOf('MSIE ');
    var new_ie = ua.indexOf('Trident/');

    if ((old_ie > -1) || (new_ie > -1)) {
        ms_ie = true;
    }

    if (ms_ie) {
        //IE specific code goes here
		
		newwin1=window.open('',"mywindow","location=0, left=0, top=0,status=0,width=1010,height=660,resizable=yes");
		newwin1.document.write(str);
		newwin1.print();

		newwin1.document.close();
		newwin1.close();	
    }
	else if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
		newwin1=window.open('',"mywindow","location=0, left=0, top=0,status=0,width=1010,height=660,resizable=yes");
		newwin1.document.write(str);
		
		newwin1.document.close();
		newwin1.scrollTo(0,0); 
		newwin1.focus();
		newwin1.print();
		}else{
		
		   // Other versions IE or not IE
		newwin1=window.open('',"mywindow","location=0, left=0, top=0,status=0,width=1010,height=660,resizable=yes");
				newwin1.document.write(str);
				window.newwin1 = newwin1;
				
			window.newwin1.setTimeout("delayPrintDialogue();",500);
		
	}
	}

function hideNextDisableButton(){
	isAudioVideoPlayNotEnded =  true;
	
	if(isForceFromJavaScript) {
		var next_button_disable =eval(Varnext_button_disable.getValue());
		next_button_disable.actionHide();
		setVisitedPageDone();
		
		setProgressBarValueDone();
		setModuleDone();
		 
	}
	
	clickNextToContinueFunc();
	
	if(splashPageBeginDisableGrp != ""){
		splashPageBeginDisableGrp = eval(splashPageBeginDisableGrp);
		splashPageBeginDisableGrp.actionHide();
	}
	
	try {
	   runGroupsFromLectora();
	} catch(err){

    }
	
	try {
	   showMultipleGroups();
	} catch(err){

    }
	
	if(isLastPageFlag){
		if(completedStatusGrpName!=''){
			completedStatusGrpName = eval(completedStatusGrpName);
			completedStatusGrpName.actionShow();
		}
	}
	
	if(isLastPageFlag){
		if(indivisualPageNextBtnName!=''){
			indivisualPageNextBtnName = eval(indivisualPageNextBtnName);
			indivisualPageNextBtnName.actionShow();
		}
	}
	
	
	
}

function clickNextToContinueFunc(){
		if(clickNextToContinueStr !=null){
			clickNextToContinueStrDummy = eval(clickNextToContinueStr);
			clickNextToContinueStrDummy.actionShow();
		}
		
}

var globalGroupName='';

function runGroupsFromLectora(){
	try {
		if(globalGroupName!='') {
		var strName = "runGroup_"+globalGroupName;
		eval(strName+"();");
	   //runGroup_og811233();
	   }
	} catch(err){
    }
}


function hideNextDisableButtonIE8(){
	if(isForceFromJavaScript) {
		var next_button_disable =eval(Varnext_button_disable.getValue());
		next_button_disable.actionHide();
		 
		setVisitedPageDone();
		setProgressBarValueDone();
		setModuleDone();
		 
	}
	
	
	try {
	   showMultipleGroups();
	} catch(err){

    }
	
	
}

function setVisitedPageDone(){
	utils.debug("setVisitedPageDone()");
	utils.debug("setVisitedPageDone() currentPageNo ="+currentPageNo);
    var pNum = VarpageCounter.getValue();
	utils.debug("setVisitedPageDone() pNum ="+pNum);
	if(pNum< currentPageNo){
		VarpageCounter.set(currentPageNo);
		
	}
}

///////
var currentPageNo=0;
var progressBarTopicName='';
var progressBarTopicValue=0;

function setProgressBarValue(progressBarTopicNameDummy, progressBarTopicValueDummy)  {
	progressBarTopicName = progressBarTopicNameDummy;
	progressBarTopicValue = parseInt(progressBarTopicValueDummy);
}
function setProgressBarValueDone()  {
	if(progressBarTopicName!=''){
		progressBarTopicName = eval("Var"+progressBarTopicName);
		 
		var temp = parseInt(progressBarTopicName.getValue());
		if(temp == 0) {
			progressBarTopicName.set(progressBarTopicValue);
		} else {
			if(temp < progressBarTopicValue) {    
			   progressBarTopicName.set(progressBarTopicValue);
		    }
		}
		
	}
	}
function setVisitedDone(){

//currentPageNo = parseInt(pageName);

}
var isForceFromJavaScript=false;
function setForceFromJavaScript(flg){
	isForceFromJavaScript = flg;
	
}

function resetAllLectoraVariablesZero(items,num){

		for(var i=1;i<=num;i++){
			var str1= String("Var"+(items+i));
			 
		  var clickitems = eval(str1);
		  clickitems.set(0);
		  }
 		 }
var currentModuleName='';
var currentVisitedModulePage=0;
var currentVisitedModuleTotalPage=0;

 
function setModuleVariable(vPage,tPages,mName){
    
	 currentVisitedModulePage = eval("Var"+vPage);
	 currentVisitedModuleTotalPage = eval("Var"+tPages);
	  currentModuleName = eval("Var"+mName);
}

function setModuleDone(){
		if(currentModuleName!=''){
			if(parseInt(currentVisitedModulePage.getValue()) == parseInt(currentVisitedModuleTotalPage.getValue())){
					currentModuleName.set('2');
					
			}
		}
}


////////////////// disable backspace ////////////
	function disableBackspaceNavigation(){
// Prevent the backspace key from navigating back.
	$(document).unbind('keydown').bind('keydown', function (event) {
		var doPrevent = false;
		//utils.debug('main.js :- disableBackspaceNavigation() keydown  event.keyCode='+event.keyCode);
		
		if (event.keyCode === 8 || event.keyCode === 9 || event.keyCode === 13 || event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40  ) {
			var d = event.srcElement || event.target;
			if ((d.tagName.toUpperCase() === 'INPUT' && 
				 (
					 d.type.toUpperCase() === 'TEXT' ||
					 d.type.toUpperCase() === 'PASSWORD' || 
					 d.type.toUpperCase() === 'FILE' || 
					 d.type.toUpperCase() === 'SEARCH' || 
					 d.type.toUpperCase() === 'EMAIL' || 
					 d.type.toUpperCase() === 'NUMBER' || 
					 d.type.toUpperCase() === 'DATE' )
				 ) || 
				 d.tagName.toUpperCase() === 'TEXTAREA') {
				doPrevent = d.readOnly || d.disabled;
			}
			else {
				doPrevent = true;
			}
		}

		if (doPrevent) {
			event.preventDefault();
		}
		 
		
	});
}
	function disableRightClick(){
		$(document).on({
					"contextmenu": function(e) {
					 
						e.preventDefault();
					},
					"mousedown": function(e) { 
						if(  e.which ==3){
						 
							 e.preventDefault();
						}
					},
					"mouseup": function(e) { 
					}
		});
			
	}
	
//////
var currentMediaVolume = 1;
var mediaVolumeMutedFlag =false;
function mediaInterval(){

	if(document.getElementById("audioElement")){
		audioElement = document.getElementById("audioElement");
			if(audioElement){
			 
					 if(currentMediaVolume != audioElement.volume){
						if(Varglobalvolume.getValue() != audioElement.volume){
						   Varglobalvolume.set(audioElement.volume);
						   currentMediaVolume = audioElement.volume;
						}
					 }
					
					if(audioElement.muted){
						 if(!mediaVolumeMutedFlag){
							Varglobalvolume.set(0);
							currentMediaVolume = 0;
							audioElement.volume = 0;
							
							mediaVolumeMutedFlag = true;
						 }
					}
					
					if(!audioElement.muted){
						mediaVolumeMutedFlag = false;
						currentMediaVolume = audioElement.volume;
					
					}
					
					if(audioElement.volume == 0){
							//audioElement.muted = true;
					} else {
						//audioElement.muted = false;
					}
	
			}
			console.log("audioElement.volume ="+audioElement.volume);
			console.log("audioElement.muted ="+audioElement.muted);
	}
	
	//
	
	
	if(document.getElementById("videoElement")){
		videoElement = document.getElementById("videoElement");
			if(videoElement){
			 
					 if(currentMediaVolume != videoElement.volume){
						if(Varglobalvolume.getValue() != videoElement.volume){
						   Varglobalvolume.set(videoElement.volume);
						   currentMediaVolume = videoElement.volume;
						}
					 }
					
					if(videoElement.muted){
						 if(!mediaVolumeMutedFlag){
							Varglobalvolume.set(0);
							currentMediaVolume = 0;
							videoElement.volume = 0;
							mediaVolumeMutedFlag = true;
						 }
					}
					
					if(!videoElement.muted){
						mediaVolumeMutedFlag = false;
						currentMediaVolume = videoElement.volume;
					}
					
					if(videoElement.volume == 0){
							//videoElement.muted = true;
					} else {
						//videoElement.muted = false;
					}
			}
	}

					
}

function setAudioVideoVolume(){

	if(document.getElementById("audioElement")){
		audioElement = document.getElementById("audioElement");
			if(audioElement){
					 Varglobalvolume.set(audioElement.volume);
					if(audioElement.muted){
							Varglobalvolume.set(0);
							audioElement.volume = 0;
					}
			}
	}
	
	//
	
	if(document.getElementById("videoElement")){
		videoElement = document.getElementById("videoElement");
			if(videoElement){
					 Varglobalvolume.set(videoElement.volume);
					if(videoElement.muted){
							Varglobalvolume.set(0);
							videoElement.volume = 0;
					}
			}
	}
	//console.log("unload Varglobalvolume 111="+Varglobalvolume.getValue());
	
}
var mutipleGroups='';

function showMultipleGroups(){
		if(mutipleGroups!=''){
			var splitArr = mutipleGroups.split("_");
			for(var i=1;i<=splitArr.length;i++){
				var temp = splitArr[i-1];
				var grp = eval(temp);
				grp.actionShow();
				
			}
			
		}
		
		
}





//////////////////////////////////////////////////
function click_to_open_url(pdfFile){
				//pdfFile ="https://thebridge.zone1.scb.net/groups/onecdd-programme";
            pauseAudioVideo(true);
				$("#pageDIV").append(" <div id='urlBlock' class='pdfBlock'><div id='urlBlockClose' class='pdfBlockClose'></div><div id='url_container' class='pdf_container'><iframe id='url_helpID' class='pdf_help' src="+pdfFile+"' width='1000' height='545' frameborder='0' scrolling='yes'></iframe></div></div>");
				$(".pdfBlock").css({"position":"absolute","z-index":"999999","top":"66px","height":"585px","width":"1000px","background-position":"no-repeat","background-image":"url(images/pdf_background.png)"});
				$(".pdfBlockClose").css({"position":"absolute","z-index":"999999","top":"20px","height":"10px","width":"10px","background-position":"no-repeat","background-image":"url(images/cross_button.png)","left":"984px","cursor": "pointer"});
				$(".pdf_container").css({"position":"absolute","left":"0px","top":"0px","height":"536px","width":"913px"});
				$(".pdfBlockClose").click(function(){
				$('.pdfBlock').css('display','none');
               });
		//alert(pdfFile);
}
//////////////////////////////////


function transcript_p_tag_ul_tag_rightMargin(strName){
                try {
                $('#'+strName+" p").css('margin-right', "5px");
                } catch(err){
                }
                
                try {
                $('#'+strName+" ul").css('margin-right', "5px");
                } catch(err){
                }
                
}

var onLineFlag = "online";
var isScormLectoraNum = 1;
var protocolName='';
function updateOnlineStatus(){
		////utils.debug('custom.js :- updateOnlineStatus navigator.onLine ='+navigator.onLine +" ,  VarisOnLineFlag ="+VarisOnLineFlag.getValue());

	var isScormLectoraNum = VarisScormLectora.getValue();
		if(isScormLectoraNum == 1){
			//onLineFlag = navigator.onLine ? "online" : "offline";
			checkhostReachable();
	     } else {
		    protocolName = window.location.protocol;
			if (protocolName == "https:" || protocolName == "http:") {
				//onLineFlag = navigator.onLine ? "online" : "offline";
				checkhostReachable();
			} else {
				onLineFlag = "online";
				VarisOnLineFlag.set(onLineFlag);
			}
			
		 }
		
	if(onLineFlag =="offline"){	 
		VarisOnLineFlag.set(onLineFlag);
	}
	////////////// this will execute once //////////////////  
	if(onLineFlag =="offline" && !isofflinePopUpGroupShow){
		isofflinePopUpGroupShow = true;
		offlinePopUpGroupName = eval(offlinePopUpGroupName);
		offlinePopUpGroupName.actionShow();
		//clearInterval(onLineStatusSetInterval);
	}
	////////////////////////////////////////////////////////
}

function updateOnlineStatusOnClickNextBack(){
		////utils.debug('custom.js :- updateOnlineStatusOnClickNextBack navigator.onLine ='+navigator.onLine +" ,  VarisOnLineFlag ="+VarisOnLineFlag.getValue());
		var isScormLectoraNum = VarisScormLectora.getValue();
		if(isScormLectoraNum == 1){
			//onLineFlag = navigator.onLine ? "online" : "offline";
			checkhostReachable();
	     } else {
		    protocolName = window.location.protocol;
			if (protocolName == "https:" || protocolName == "http:") {
				//onLineFlag = navigator.onLine ? "online" : "offline";
				checkhostReachable();
			} else {
				onLineFlag = "online";
				VarisOnLineFlag.set(onLineFlag);
			}
			
		 }
	
	
	//VarisOnLineFlag.set(onLineFlag);
	if(onLineFlag =="offline" ){
		
		offlinePopUpGroupName = eval(offlinePopUpGroupName);
		offlinePopUpGroupName.actionShow();
		 
	}
	////////////////////////////////////////////////////////
}

function setLectora_isOnlineFlag(){
		//utils.debug('custom.js :- setLectora_isOnlineFlag navigator.onLine ='+navigator.onLine);
		var isScormLectoraNum = VarisScormLectora.getValue();
		 if(isScormLectoraNum == 1){
			//onLineFlag = navigator.onLine ? "online" : "offline";
			checkhostReachable();
	     } else {
		    protocolName = window.location.protocol;
			if (protocolName == "https:" || protocolName == "http:") {
				//onLineFlag = navigator.onLine ? "online" : "offline";
				checkhostReachable();
			} else {
				onLineFlag = "online";
				VarisOnLineFlag.set(onLineFlag);
			}
			
		 }
		 
		//VarisOnLineFlag.set(onLineFlag);

	////////////////////////////////////////////////////////
}

////////////////////////////////////

function audioVideoShowHide(){
 

    if(globalvisibleVar){
		if(  document.getElementById(globalcontainerDiv1)) {
			
			var objMedia = document.getElementById(globalcontainerDiv1);
			objMedia.style.visibility ="visible";
			if(globalautoplay){
				objMedia.play();
			}
		}
	} else {
		if(  document.getElementById(globalcontainerDiv1)) {
			//document.getElementById(globalcontainerDiv1).style.visibility ="hidden";
			var objMedia = document.getElementById(globalcontainerDiv1);
			objMedia.style.visibility ="hidden";
			if(globalautoplay){
				objMedia.play();
			}
			
		}
	}

}
//////////////////////////////////////////////////////////
//function myOnLoad(){
//alert("myOnLoad() Executed");
//}
//window.onload = myOnLoad;
/////////////////////////////////////////////////////////
/*
 $(window).bind("click", function(e){
  
	
 });
*/

////////////////////////////

function autoNextButtonActiveOnAnimPage(){
	utils.debug("autoNextButtonActiveOnAnimPage()");
	var next_button_disable =eval(Varnext_button_disable.getValue());
		next_button_disable.actionHide();
		setVisitedPageDone();
}


/////////////////////////////////////////////////
function click_to_open_url(pdfFile){
				//pdfFile ="https://thebridge.zone1.scb.net/groups/onecdd-programme";
            pauseAudioVideo(true);
				$("#pageDIV").append(" <div id='urlBlock' class='pdfBlock'><div id='urlBlockClose' class='pdfBlockClose'></div><div id='url_container' class='pdf_container'><iframe id='url_helpID' class='pdf_help' src="+pdfFile+"' width='1000' height='545' frameborder='0' scrolling='yes'></iframe></div></div>");
				$(".pdfBlock").css({"position":"absolute","z-index":"999999","top":"66px","height":"585px","width":"1000px","background-position":"no-repeat","background-image":"url(images/pdf_background.png)"});
				$(".pdfBlockClose").css({"position":"absolute","z-index":"999999","top":"5px","height":"10px","width":"10px","background-position":"no-repeat","background-image":"url(images/cross_button.png)","left":"966px","cursor": "pointer"});
				$(".pdf_container").css({"position":"absolute","left":"0px","top":"0px","height":"536px","width":"913px"});
				$(".pdfBlockClose").click(function(){
				$('.pdfBlock').css('display','none');
               });
		//alert(pdfFile);
}
//////////////////////////////////

function checkhostReachable(){
   var rnd1 = Math.random(999);
			 try {
			 	//getLessonStatusFrmLMS =  new String( LMSGetValue( "cmi.core.lesson_status" ) ); 
				//utils.debug("custom.js :- checkhostReachable getLessonStatusFrmLMS =="+getLessonStatusFrmLMS);
			 } catch(err){
			 	//getLessonStatusFrmLMS="off";
				//utils.debug("custom.js :- checkhostReachable getLessonStatusFrmLMS catch");
			 }
			 //utils.debug("custom.js :- checkhostReachable finally getLessonStatusFrmLMS  ="+getLessonStatusFrmLMS);
	   try {
			  if(!parent.hostReachable()){  // hostReachale

					 //console.log("checkhostReachable NET Disconnected rnd1 ="+rnd1);
					 onLineFlag = "offline";
					 //if(getLessonStatusFrmLMS =="off") {
						VarisOnLineFlag.set(onLineFlag);
					// }
			  } else {
					  //console.log("checkhostReachable  Net is available  rnd1 ="+rnd1);
					  onLineFlag = "online";
					 // if(getLessonStatusFrmLMS !="off") {
					     VarisOnLineFlag.set(onLineFlag);
					  //}
					  
			  }
		} catch(err){
		}
		
		 
}

//////////////////////////////////////
var global_contentframe = window;
/*
$(window).on("beforeunload", function(e) {
   //console.log("$( window ).beforeunload(function() BEGIN");
  //getAndSetContentFrameObj(false);
 // console.log("$( window ).beforeunload(function() END");
 
});
*/

function getAndSetContentFrameObj(flg){
	//console.log("getAndSetContentFrameObj() BEGIN");
	//console.log("getAndSetContentFrameObj() flg ="+flg);
	if( window.frameElement.parentNode )
	{
		for( i=0; i<window.frameElement.parentNode.childNodes.length; i++ )
		{
			if( window.frameElement.parentNode.childNodes[i].name == 'contentframe' )
			{
				//global_contentframe = window.frameElement.parentNode.childNodes[i].contentWindow;
				global_contentframe = window.frameElement.parentNode.childNodes[i];
				break;
			}
		}
	}

	if(flg){
		global_contentframe.style.visibility ="visible";
	} else {
		global_contentframe.style.visibility ="hidden";
	}
	//console.log("getAndSetContentFrameObj() global_contentframe ="+global_contentframe);  
	//console.log("getAndSetContentFrameObj() global_contentframe.style.visibility ="+global_contentframe.style.visibility ); 
	//console.log("getAndSetContentFrameObj() END");
}
 /*
$( window ).unload(function() {
 
});

 */
 

function onorientationchangeFn(){

var myPlatformStr = Varmyplatform.getValue();
		 myPlatformStr = String(myPlatformStr).toLowerCase();
			if(myPlatformStr =="ipad" || myPlatformStr =="iphone"){			 
				var myorientation = window.orientation;
				//alert("myorientation ="+myorientation);
					switch(myorientation) 
					{  
						case -90:
						case 90:
						//alert('landscape');
						var grpOrientation = VargrpOrientation.getValue();
						grpOrientation = eval(grpOrientation);
						grpOrientation.actionHide();
						break; 
						default:
						//alert('portrait 1');
						var grpOrientation = VargrpOrientation.getValue();
						grpOrientation = eval(grpOrientation);
						grpOrientation.actionShow();
						try{
						pauseAudioVideo(false);
						}catch(err){
						}
						
						//alert('portrait !!!');
						break; 
					}
				  
			}
			
			if(myPlatformStr =="iphone"){
               			
			//$("audio").css("height", "64px");
			manageMediaOniPhoneDevice();
			}
			
			
}

function manageMediaOniPhoneDevice(){

	var myPlatformStr = Varmyplatform.getValue();
		 myPlatformStr = String(myPlatformStr).toLowerCase();
			if(myPlatformStr =="iphone"){	
			   if(globalcontainerDiv1 =="audioElement"){
					//videoTag1 = document.getElementById("audiocontainer");
					//videoTag1.style.top=540+"px !important";
					$("#audiocontainer").css("left", "175px");
					$("#audiocontainer").css("top", "540px");
					$("#audiocontainer").css("width", "600px");
					$("audio").css("min-height", "64px");
					$("audio").css("height", "64px");
					 

			   }
	}	
	 
	 
}


//
function backgroungMusicPlayFromtitleMgr(){
	if( window.frameElement.parentNode )
	{
		for( i=0; i<window.frameElement.parentNode.childNodes.length; i++ )
		{
			if( window.frameElement.parentNode.childNodes[i].name == 'titlemgrframe' )
			{
				global_contentframe = window.frameElement.parentNode.childNodes[i].contentWindow;
				//global_contentframe = window.frameElement.parentNode.childNodes[i];
				global_contentframe.backgroungMusicPlay();
				break;
			}
		}
	}
}
	
function backgroungMusicPauseFromtitleMgr(){
	if( window.frameElement.parentNode )
	{
		for( i=0; i<window.frameElement.parentNode.childNodes.length; i++ )
		{
			if( window.frameElement.parentNode.childNodes[i].name == 'titlemgrframe' )
			{
				global_contentframe = window.frameElement.parentNode.childNodes[i].contentWindow;
				//global_contentframe = window.frameElement.parentNode.childNodes[i];
				global_contentframe.backgroungMusicPause();
				break;
			}
		}
	}
}
	

	//////

function validateNumCustom(evt) {
//console.log("custome.js:- validateChar");

  var theEvent = evt || window.event;
   
  if( is.ns && !is.chrome && theEvent.keyCode != 0 ) {
  
   // return;
}

  var key = theEvent.keyCode || theEvent.which;
 
  
  key = String.fromCharCode( key );
 // var regex = /^[A-Za-z]+$|\ /;
  var regex = /[0-9]/;
   
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) {
	theEvent.preventDefault();
	 
	}
	
  }
}

function validateCharCustom(evt) {
//console.log("custome.js:- validateChar");

  var theEvent = evt || window.event;
   
  if( is.ns && !is.chrome && theEvent.keyCode != 0 ) {
  
   // return;
}

  var key = theEvent.keyCode || theEvent.which;
 
  
  key = String.fromCharCode( key );
  var regex = /^[A-Za-z]+$|\ /;
  //var regex = /[0-9]|\.|\,|\-/;
  
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) {
	theEvent.preventDefault();
	 
	}
	
  }
}
