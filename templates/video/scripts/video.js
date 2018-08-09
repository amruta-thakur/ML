var api;
var fullScreenFlag = true;
var volumeDrag = false;
var globalisPlaying;
var fullscreenboolean = false;
var videoEnded = false;
var userdefinedpaused = false;
var videRef;
define(['Shell', "util"], function(Shell, util) {
    var lastVideoTime = 0;

    function VideoTemplate() {
        this.xml = null;
        this.container = null;
        this.videoElement = null;
        this.playPauseBtn = null;
        this.fullScreenBtn = null;
        this.stoppedManually = false;
        this.isPlaying = false;
        this.fullscreenvideo = true;
        this.videoSeekbarElement = null;
        this.videoSeekbarCircleElement = null;
        this.currentTimeElement = null;
        this.totalTimeElement = null;
    }
    VideoTemplate.prototype = new Util();
    VideoTemplate.prototype.constructor = VideoTemplate;
    VideoTemplate.prototype.init = function(xmlName) {
        var ref = this;
		globalisPlaying = false;
        ref.xml = xmlName;
		ref.LoadXml(xmlName);
		fullScreenFlag = false;
        $('#' + ref.xml).mediaelementplayer({
            autoRewind: false,
            autoplay: false,
            features: ['playpause', 'progress', 'volume', 'fullscreen'],
			
            success: function(mediaElement, domObject) {
			globalisPlaying = true;
                if (isMobile.any()) {} else {
                    setTimeout(function() {
                       // mediaElement.play();
                    }, 500);
                }
                videRef = mediaElement;
				
				
				var screen_change_events = "webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange";
				$(document).on(screen_change_events, function () {
					if(fullScreenFlag == false){
					$('#shellContainer_content_box').hide();
					$('#navBtnHolder').hide();
					$('#info_icon').hide();
					//$('.video_block').css('z-index', '999999 !important');
					//$('#slider.carousel').css('z-index', '999999 !important');
					fullScreenFlag = true;
					console.log("1111111");
					
					
					}else{
					$('#shellContainer_content_box').show();
					$('#navBtnHolder').show();
					$('#info_icon').show();
					//$('.video_block').css('z-index', '9 !important');
					//$('#slider.carousel').css('z-index', '9 !important')
					
					fullScreenFlag = false;
					console.log("22222");
					}
					
					
				});
				
				
                mediaElement.addEventListener('timeupdate', function(e) {
                    if (mediaElement.currentTime - lastVideoTime > 1 || mediaElement.currentTime == mediaElement.duration) {
                        lastVideoTime = mediaElement.currentTime;
                        //saveVideoProgress("player2", mediaElement.currentTime.toFixed(2));
                        //window.shell.updatevideoProgress("player2", mediaElement.duration);
                    }
                }, false);
                mediaElement.addEventListener('ended', function(e) {
                    console.log("video ended");
					globalisPlaying = true;
					//videoEnded = true;
                    window.shell.updateVisitedPages(globalCurTopic, globalCurPage);
                }, false);
                mediaElement.addEventListener('play', function(e) {
                    console.log("plsy evednt")
                    globalisPlaying = true;
					// globalisPlaying = true;
                }, false);
				
				mediaElement.addEventListener('pause', function(e) {
                    console.log("pause evednt");
					
					//userdefinedpaused = true;
                    //globalisPlaying = false;
					globalisPlaying = false;
                }, false);
				
                mediaElement.addEventListener('seeking', function(e) {
                    lastVideoTime = mediaElement.currentTime;
                }, false);
            }
        });
        VideoTemplate.prototype.stopMedia = function() {
            //if (globalisPlaying) {
                
                videRef.pause();
            //}
        }
        VideoTemplate.prototype.playMedia = function() {
				//if(!globalisPlaying){
                videRef.play();
			//}
        }
    }
	
	VideoTemplate.prototype.LoadXml = function (xmlNameRef) {
			//alert("xmlNameRef " + xmlNameRef)
			var ref= this;
			$.ajax({
			type: "GET",
			url: "data/" + xmlNameRef + ".xml",
			dataType: "xml",
			success: function(xml) {
			//alert(xml)
				ref.xml = xml;
			if($(ref.xml).find('transcript').length > 0){
			var transcriptText = $(ref.xml).find('transcript').text();
			$('#contentTab_2').html(transcriptText)
			}
			if($(ref.xml).find('resources').length > 0){
			var resourcesText = $(ref.xml).find('resources').text();
            $('#contentTab_1').html(resourcesText)
            }
			
			if(isMobile.any()){
				
				}else{
                var obj = $('#contentTab_2');
                setTimeout(function() {
                    window.shell.attachScrollBar(obj, 8, 100, '#cccccc', '#0090DA')
					  
                }, 1000);
				}
			
			}
			
			});
	
	}
	
	
	
    return VideoTemplate;
});
