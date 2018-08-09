var api;
var volumeDrag = false;
var globalisPlaying = false;
var userHasPaused = false;
var fullscreenboolean = false;
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
        this.fullscreenvideo = false;
        this.videoSeekbarElement = null;
        this.videoSeekbarCircleElement = null;
        this.currentTimeElement = null;
        this.totalTimeElement = null;
    }
    VideoTemplate.prototype = new Util();
    VideoTemplate.prototype.constructor = VideoTemplate;

    VideoTemplate.prototype.init = function(xmlName) {
        var ref = this;
        ref.xml = xmlName;
		ref.LoadXml(xmlName);
		//alert(xmlName);
		renderVideo(xmlName);  //function to render the video “v111” is the video id as well as div id 
                
		
        /*$('#' + ref.xml).mediaelementplayer({
            autoRewind: false,
            autoplay: false,
            features: ['playpause', 'progress', 'volume', 'fullscreen'],
            success: function(mediaElement, domObject) {
                if (isMobile.any()) {} else {
                    setTimeout(function() {
                       // mediaElement.play();
                    }, 500);
                }
                videRef = mediaElement;
                mediaElement.addEventListener('timeupdate', function(e) {
                    if (mediaElement.currentTime - lastVideoTime > 1 || mediaElement.currentTime == mediaElement.duration) {
                        lastVideoTime = mediaElement.currentTime;
                        //saveVideoProgress("player2", mediaElement.currentTime.toFixed(2));
                        //window.shell.updatevideoProgress("player2", mediaElement.duration);
                    }
                }, false);
                mediaElement.addEventListener('ended', function(e) {
                    console.log("video ended")
                    window.shell.updateVisitedPages(globalCurTopic, globalCurPage);
                }, false);
                mediaElement.addEventListener('play', function(e) {
                    console.log("plsy evednt")
                    globalisPlaying = true;
                }, false);
                mediaElement.addEventListener('seeking', function(e) {
                    lastVideoTime = mediaElement.currentTime;
                }, false);
            }
        });*/
        VideoTemplate.prototype.stopMedia = function() {
            if (globalisPlaying) {
                this.stoppedManually = true;
                globalisPlaying = false;
                videRef.pause();
            }
        }
        VideoTemplate.prototype.playMedia = function() {
            if (this.stoppedManually) {
                this.stoppedManually = false;
                videRef.play();
            }
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