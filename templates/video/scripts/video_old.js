var api;
var volumeDrag = false;
var globalisPlaying;
var fullscreenboolean = false;
var videoEnded = false;
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
		globalisPlaying = false;
        ref.xml = xmlName;
		ref.LoadXml(xmlName);
        $('#' + ref.xml).mediaelementplayer({
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
				
				
				MediaElementPlayer.prototype.enterFullScreen_org = MediaElementPlayer.prototype.enterFullScreen;
				MediaElementPlayer.prototype.enterFullScreen = function() {
					$('#shellContainer_content_box').hide();
					// Your code here
					this.enterFullScreen_org();
				}
				MediaElementPlayer.prototype.exitFullScreen_org = MediaElementPlayer.prototype.exitFullScreen;
				MediaElementPlayer.prototype.exitFullScreen = function() {
					$('#shellContainer_content_box').show();
					// Your code here
					this.exitFullScreen_org();
				}		
				
                mediaElement.addEventListener('timeupdate', function(e) {
                    if (mediaElement.currentTime - lastVideoTime > 1 || mediaElement.currentTime == mediaElement.duration) {
                        lastVideoTime = mediaElement.currentTime;
                        //saveVideoProgress("player2", mediaElement.currentTime.toFixed(2));
                        //window.shell.updatevideoProgress("player2", mediaElement.duration);
                    }
                }, false);
                mediaElement.addEventListener('ended', function(e) {
                    console.log("video ended");
					globalisPlaying = false;
					//videoEnded = true;
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
        });
        VideoTemplate.prototype.stopMedia = function() {
            if (globalisPlaying) {
                
                videRef.pause();
            }
        }
        VideoTemplate.prototype.playMedia = function() {
			//alert(globalisPlaying)
			if(videRef.paused){
				if (globalisPlaying) {
                videRef.play();
				}
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