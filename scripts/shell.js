var progressI = 0;
var onStar = 4;
var globalCurTopic = 0;
var globalCurPage = 1;
var GlobalVisitedPages = '';
var GlobarProgressPages = '';
var orientationFlag = false;
var globalsavetimeforvideos = [-1, -1, -1];
define("Shell", ["mediaelement", "hammer"], function(mediaelem, Hammer) {
    function Shell() {
        this.curTopic = 0;
        this.curPage = 1;
        this.globalProgressArray = [];
        this.prevPage = 0;
        this.totalLessons = null;
        this.screenType = null
        this.eachTopicPagesArray = [];
        this.courseProgressArray = [];
        this.visitedPages = [];
        this.totalTopics = 1;
        this.currentSlideNo;
        this.totalPages = 1;
        this.tocXml = null;
        this.suspendString = '';
        this.topics = [];
        this.totalTopicLength;
        this.isLoading = false;
        this.isPageTrans = false;
        this.isPrevEnabled = true;
        this.isNextEnabled = true;
        this.prevNavControlsHandler = "shell";
        this.nextNavControlsHandler = "shell";
        this.templateInstance = null;
        this.currentPageUrl = "";
        this.lms = null;
    }
    var lms = {};
    (function() {
        var scoData;
        var commitValues = function() {
            try {
                scoData.commit();
            } catch (e) {}
        }
        this.setBookmark = function(valueRef) {
            try {
                scoData.setValue("lessonLocation", valueRef);
                commitValues();
            } catch (e) {}
        }
        var setStatus = function(status) {
            try {
                scoData.setValue("lessonStatus", status);
                commitValues();
            } catch (e) {}
        }
        this.setSuspendData = function(suspendstring) {
            try {
				
                scoData.setValue("suspendData", suspendstring);
               // alert("setting suspenddata " + suspendstring)
				commitValues();
            } catch (e) {}
        }
        this.init = function() {

            try {

                scoData = new SCOData();
                scoData.initialize();
				
				//alert("scodata is " + scoData)
                if (scoData.getValue("lessonStatus") != "completed") {
                    setStatus("incomplete");
                }
                var suspendstring = scoData.getValue("suspendData");
                //alert("suspend string is " + suspendstring)
				if (suspendstring != '') {
                    GlobalVisitedPages = suspendstring.split('+')[0];
                    GlobarProgressPages = suspendstring.split('+')[1];
                }
				//console.log(GlobalVisitedPages)
                var tempArray = GlobalVisitedPages.split(',');
                var tempArray2 = GlobarProgressPages.split(',');
                globalProgressArray = tempArray2;
                //alert("temp array is " + tempArray)
                for (var i = 0; i < tempArray.length; i++) {
                    //alert("temp array i is " + tempArray[i])
					//console.log('#thumb_' + tempArray[i])
                    $('#thumb_' + tempArray[i]).find('.video_completion_overlay').show();
                    $('#thumb_' + tempArray[i]).find('.progress-bar').css('width', '100%').attr('aria-valuenow', 100);
                }
                var pageVistedforprogresslengthTemp = occurrence(tempArray2)[1].length;
                var valeur = 0;

                if ($(this).attr('value') > valeur) {
                    valeur = $(this).attr('value');
                }
                valeur = Math.round((parseInt(pageVistedforprogresslengthTemp) / parseInt(tempArray2.length)) * 100);
                $('.course_progress').find('.progress-bar').css('width', valeur + '%').attr('aria-valuenow', valeur);
                $('.courseProgressperc').html(valeur + '%');
            } catch (e) {}
        }
        this.checkLessonCompletion = function(startPageNo, endPageNo) {
            var totalVisitedPages = TVisitedPages.length;
            var lessonVisited = 0;
            if (totalVisitedPages > 0) {
                for (var i = startPageNo; i <= (startPageNo + endPageNo); i++) {
                    var isPageFound = isPageVisited(i);
                    if (isPageFound == false) {
                        break;
                    } else {
                        lessonVisited++;
                    }
                }
            }
            return lessonVisited;
        }
        this.getBookmark = function() {
            try {
                var bookmark = scoData.getValue("lessonLocation");
                if (bookmark != null && bookmark.length > 0) {
                    return bookmark;
                } else {
                    return -1;
                }
            } catch (e) {}
        }
        this.markComplete = function(status) {
            setStatus(status);
        }
        this.unloadCourse = function() {
			//alert("setting bookmark");
            lms.setBookmark(ref.curTopic + "_" + ref.curPage);
        }
    }).apply(lms);
	
	function exitCourse(){
	//lms.unloadCourse();
    //lms.setSuspendData(ref.suspendString);
    //return 'Are you sure you want to leave this course?';
	}
	
	/*$(window).bind('beforeunload', function() {
            lms.unloadCourse();
            lms.setSuspendData(ref.suspendString);
            return 'Are you sure you want to leave this course?';
       });*/
	   
	if($(window).width() == 667 && isMobile.any() == 'iPhone'){
		
	//orientationFlag = true;
	$('body').addClass("landscapeView");
	//$('#shellContainer,#shellContainer_content_box').css('max-width', '667px');
	}
	
	if($(window).width() == 1024 && isMobile.any() == 'iPad'){
	$('body').addClass("landscapeViewiPad");
	//orientationFlag = true;
	//$('#shellContainer,#shellContainer_content_box').css('max-width', '992px');
	
	}
	
	
	   
$(window).on( "orientationchange", function( event ) {
	//alert("flag value " + isMobile.any())
	//alert("orinetation is " + window.orientation);
	//window.orientation
	
  if(isMobile.any() == 'iPhone'){
	if(window.orientation == 0 || window.orientation == 180){
	orientationFlag = false;
	//alert("adding portrait class");
	//setTimeout(function(){ 
		$('body').removeClass("landscapeView");
	$('body').addClass("portraitView");

	//}, 500);
	
  
  }else if(window.orientation == 90 || window.orientation == -90){
		//alert("adding landscape class");
	orientationFlag = true;
	//setTimeout(function(){
	$('body').removeClass("portraitView");
	$('body').addClass("landscapeView");
	//}, 500);
  }
  }
  
  if(isMobile.any() == 'iPad'){
	if(window.orientation == 0 || window.orientation == 180){
	orientationFlag = false;
	//alert("adding portrait class");
	//setTimeout(function(){ 
		$('body').removeClass("landscapeViewiPad");
	$('body').addClass("portraitViewiPad");

	//}, 500);
	
  
  }else if(window.orientation == 90 || window.orientation == -90){
		//alert("adding landscape class");
	orientationFlag = true;
	//setTimeout(function(){
	$('body').removeClass("portraitViewiPad");
	$('body').addClass("landscapeViewiPad");
	//}, 500);
  }
  }
  
  
  
});  
  
  Shell.prototype = new Util();
    Shell.prototype.constructor = Shell;
    Shell.prototype.init = function() {
        var ref = this;
        ref.loadXML("toc.xml", function(xml) {
            ref.courseXmlLoaded(xml);
        });
        
        var ua = navigator.userAgent.toLowerCase();
        var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
        if (isAndroid) {
            $(window).on("load resize", function() {
                var h = $(window).height();
                var w = $(window).width();
                if (w < 768) {
                    // small mobile screens
                    if (w > h) {
                        // small mobile screens landscape rules
                        $('.video_block').css({
                            /*"width": "79%",
                            "margin": "7% 11%"*/
                        });
                    } else {
                        // small mobile screens portrait rules

                    }
                    // all small screen rules
                } else {
                    // large mobile screens
                    if (w > h) {
                        // large mobile screen landscape rules

                    } else {
                        // large mobile screen portrait rules

                    }
                    // all large mobile screen rules
                }
            });
        }

    }

    function moveProgress(idRef) {
        var elem = idRef;
        var width = 1;
        var id = setInterval(frame, 10);

        function frame() {
            if (width >= 50) {
                clearInterval(id);
            } else {
                width++;
                elem.style.width = width + '%';
            }
        }
    }
    Shell.prototype.addThumbnailCorousel = function() {
        var ref = this;
        $('#owl-0').owlCarousel({
            loop: false,
            margin: 10,
            nav: true,
            navText: ["<i class='fa fa-chevron-left left_icon' style='color:#ffffff; font-size:2em;'></i>", "<i class='fa fa-chevron-right right_icon' style='color:#ffffff; font-size:2em;'></i>"],
            rewindNav: true,
            responsive: {
                375: {
                    items: 2
                },
                767: {
                    items: 3
                },
                1000: {
                    items: 3
                }
            }
        })
        if (isMobile.any() && $(window).width() < 768) {
                                
            $('#owl-1,#owl-2, #owl-3,#owl-4,#owl-5,#owl-6,#owl-7').owlCarousel({
            loop: false,
            margin: 5,
            items: 2,
            stagePadding: 15,
            touchDrag: true,
            dragBeforeAnimFinish : false,
			touchDrag  : true,
			mouseDrag  : false,
            nav: true,
            navText: ["<i class='fa fa-chevron-left left_icon' style='color:#ffffff; font-size:2em;'></i>", "<i class='fa fa-chevron-right right_icon' style='color:#ffffff; font-size:2em;'></i>"],
            rewindNav: true,
            /*stagePadding: 50,*/
            
        })
                                
                                }else{
                      //alert("coming here")          
       $('#owl-1, #owl-2, #owl-3,#owl-4,#owl-5,#owl-6,#owl-7').owlCarousel({
            loop: false,
            margin: 10,
            nav: true,
			touchDrag: false,
            mouseDrag  : false,
			dragBeforeAnimFinish : false,
            navText: ["<i class='fa fa-chevron-left left_icon' style='color:#ffffff; font-size:2em;'></i>", "<i class='fa fa-chevron-right right_icon' style='color:#ffffff; font-size:2em;'></i>"],
            rewindNav: true,
            responsive: {
                375: {
                    items: 2
                },
                767: {
                    items: 3
                },
                1000: {
                    items: 3
                }
            }
        })
                                }
        $(".topic_container .item").bind('click', $.proxy(ref.thumbnailClickEvents, null, ref));
    }

    Shell.prototype.thumbnailClickEvents = function(ref, e) {
		//alert($(this).find('.display_block').length)
        if ($(this).find('.display_block').length > 0) {
            return;
        }
        ref.prevPage = ref.curTopic + "_" + ref.curPage;
        ref.curTopic = $(this).attr('id').split('_')[1];
        ref.curPage = $(this).attr('id').split('_')[2];
        if (ref.curTopic == 0 && ref.curPage == 1) {
           // $('.topic_title').html(ref.tocXml.find("global").find('title').text())
        } else {
            //$('.topic_title').html(ref.tocXml.find("topics topic").eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).find('title').text());
        }
		
		function findTopWindow(){
			var win = window;
			var topWindow = null;
			while (win = win.opener) 
			{ 
				topWindow = win; 
			} 
			if(topWindow != 'undefined' && topWindow != null )
			{ 
				return topWindow;
			}
		}
		
		
		//console.log(isMobile.any())
		if(isMobile.any() == 'iPhone' || isMobile.any() == 'iPad'){
		var windowRef = findTopWindow();
		
		
		try{		 
		$(window.parent).scrollTop(0);
		//alert("66666666");
        }catch(e){
		}
		
		
		try{		 
		$(windowRef).scrollTop(0);
		//alert("7777777");
        }catch(e){
		}
		
			if ($("#activity_container").css('display') == 'block') {
                $("#activity_container").hide();
                $(".fixed_block").show();
                $('#shellContainer_content_box').removeClass('changingPadding');
                //$(window).scrollTop(0);
                //do something
            }
		
		
        ref.loadPage();
			
			
			//$('body, html', parent.document).animate({ scrollTop: 0 },1500);
		}else if(isMobile.any() == 'Android'){
		//alert("coming here 2")
		$('html, body').animate({
            scrollTop: 0
        }, function() {
            if ($("#activity_container").css('display') == 'block') {
                $("#activity_container").hide();
                $(".fixed_block").show();
                $('#shellContainer_content_box').removeClass('changingPadding');
                //$(window).scrollTop(0);
                //do something
            }
            ref.loadPage();
        });
		
		
		}else{
		
        $('html').animate({
            scrollTop: 0
        }, function() {
            if ($("#activity_container").css('display') == 'block') {
                $("#activity_container").hide();
                $(".fixed_block").show();
                $('#shellContainer_content_box').removeClass('changingPadding');
                //$(window).scrollTop(0);
                //do something
            }
            ref.loadPage();
        });
		}
		//$('body, html', parent.document).animate({ scrollTop: 0 },1500);
		
		
    }
    Shell.prototype.getVisitedPages = function() {
        var ref = this;
        return ref[visitedPages];
    };
    Shell.prototype.addGlobalContent = function() {
        var ref = this;
        var courseTitle = $(ref.tocXml).find('courseTitle').text();
        var courseDesc = $(ref.tocXml).find('courseDesc').text();
        var courseProgressTtile = $(ref.tocXml).find('courseProgressTitle').text();
        var splashTitle = $(ref.tocXml).find('global').find('title').text();
        var splashHeading = $(ref.tocXml).find('global').attr('heading');
        var aboutCourseTitle = $(ref.tocXml).find('aboutCourseTitle').text();
        var aboutCourseContent = $(ref.tocXml).find('aboutCourseContent').text();
        var firstPageTitle = $(ref.tocXml).find('topics').find('topic').eq(0).find('page').eq(0).find('title').text();
        $('#mainBody').find('#course_title').html(courseTitle);
        $('#mainBody').find('#course_desc').html(courseDesc);
        $('#mainBody').find('#course_desc').html(courseDesc);
        $('#mainBody').find('#aboutCourseTitle').html(aboutCourseTitle);
        $('#mainBody').find('#aboutCourseContent').html(aboutCourseContent);
        $('#mainBody').find('#courseProgressTitle').html(courseProgressTtile);
        $('#mainBody').find('.topic_title').html(firstPageTitle);
        //alert($(ref.tocXml).find('global').attr('require'))
        if ($(ref.tocXml).find('global').attr('require') == '1') {
            $('#mainBody').find('.video_heading').find('.topic_title').html(splashTitle);
            $('#mainBody').find('.video_heading').find('.last_viewed').html(splashHeading);
        }
        ref.loadnavigationCorousel();
    }
    Shell.prototype.loadnavigationCorousel = function() {
        var ref = this;
        var topics = ref.tocXml.find("topics topic");
        ref.totalTopics = topics.length;
        var str = '';
        if ($(ref.tocXml).find('global').attr('require') == '1') {
            str += '<section class="topic_container" id="topic_' + 0 + '">';
            str += '<h2 class="topic_title_container">' + $(ref.tocXml).find('global').children('title').text() + '</h2>';
            str += '<div class="owl-carousel" id="owl-' + 0 + '">';
            str += '<div class="item" id="thumb_' + 0 + '_' + 1 + '">';
            str += '<div class="lo_type">' + $(ref.tocXml).find('global').attr('type') + '</div>'
            str += '<div class="lo_current_video">' + $(ref.tocXml).find('global').attr('heading') + '</div>';
            str += '<div class="lo_title">' + $(ref.tocXml).find('global').find('title').text() + '</div>'
            str += '<div class="lo_progress">'
            str += '<div class="progress-bar w-0" id="myBar_' + 0 + '_' + 1 + '"  role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>';
            str += '</div>'
            str += '<img class="img-responsive" src="./skin/thumbnails/' + 0 + '_' + 1 + '.jpg">';
            str += '<div class="video_completion_overlay">';
            str += '<i class="fa fa-check-circle checkCircle"></i>'
            str += '</div>';
            str += '<div class="video_security_overlay">';
            str += '<img class="desktop_tick security_tick" src="skin/security-icon.png" alt="Locked Video"/>';
            str += '<img class="mobile_tick security_tick" src="skin/security-icon-m.png" alt="Locked Video"/>';
            str += '</div>';
            str += '</div>';
            str += '</div>';
            str += '</section>';
            for (var i = 0; i < ref.totalTopics; i++) {
                str += '<section class="topic_container" id="topic_' + (i + 1) + '">';
                str += '<h2 class="topic_title_container">' + $(ref.tocXml).find('topics').find('topic').eq(i).children('title').text() + '</h2>';
                str += '<div class="owl-carousel" id="owl-' + (i + 1) + '">';
                var p = [];
                var pages = this.tocXml.find("topics topic:eq(" + i + ")").find("pages page");
                ref.eachTopicPagesArray.push(pages.length);
                for (var j = 1; j <= pages.length; j++) {
                    p.push(0);
                    str += '<div class="item" id="thumb_' + (i + 1) + '_' + j + '">';
                    str += '<div class="lo_type">' + $(ref.tocXml).find('topics').find('topic').eq(i).find('pages').find('page').eq(j - 1).attr('type') + '</div>'
                    str += '<div class="lo_current_video">' + $(ref.tocXml).find('topics').find('topic').eq(i).find('pages').find('page').eq(j - 1).attr('heading') + '</div>';
                    str += '<div class="lo_title">' + $(ref.tocXml).find('topics').find('topic').eq(i).find('pages').find('page').eq(j - 1).find('title').text() + '</div>'
                    str += '<div class="lo_progress">'
                    str += '<div class="progress-bar w-0" id="myBar_' + (i + 1) + '_' + j + '"  role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>';
                    str += '</div>'
                    str += '<img class="img-responsive" src="./skin/thumbnails/' + (i + 1) + '_' + j + '.jpg">';
                    str += '<div class="video_completion_overlay">';
                    str += '<i class="fa fa-check-circle checkCircle"></i>'
                    str += '</div>';
                    str += '<div class="video_security_overlay">';
                    str += '<img class="desktop_tick security_tick" src="skin/security-icon.png" alt="Locked Video"/>';
                    str += '<img class="mobile_tick security_tick" src="skin/security-icon-m.png" alt="Locked Video"/>';
                    str += '</div>';
                    str += '</div>';
                }
                str += '</div>';
                str += '</section>';
            }
        } else {
            for (var i = 0; i < ref.totalTopics; i++) {
                str += '<section class="topic_container" id="topic_' + (i + 1) + '">';
                str += '<h2 class="topic_title_container">' + $(ref.tocXml).find('topics').find('topic').eq(i).children('title').text() + '</h2>';
                str += '<div class="owl-carousel" id="owl-' + (i + 1) + '">';
                var p = [];
                var pages = this.tocXml.find("topics topic:eq(" + i + ")").find("pages page");
                ref.eachTopicPagesArray.push(pages.length);
                for (var j = 1; j <= pages.length; j++) {
                    p.push(0);
                    str += '<div class="item" id="thumb_' + (i + 1) + '_' + j + '">';
                    str += '<div class="lo_type">' + $(ref.tocXml).find('topics').find('topic').eq(i).find('pages').find('page').eq(j - 1).attr('type') + '</div>'
                    str += '<div class="lo_current_video">' + $(ref.tocXml).find('topics').find('topic').eq(i).find('pages').find('page').eq(j - 1).attr('heading') + '</div>';
                    str += '<div class="lo_title">' + $(ref.tocXml).find('topics').find('topic').eq(i).find('pages').find('page').eq(j - 1).find('title').text() + '</div>'
                    str += '<div class="lo_progress">'
                    str += '<div class="progress-bar w-0" id="myBar_' + (i + 1) + '_' + j + '"  role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>';
                    str += '</div>'
                    str += '<img class="img-responsive" src="./skin/thumbnails/' + (i + 1) + '_' + j + '.jpg">';
                    str += '<div class="video_completion_overlay">';
                    str += '<i class="icon ion-ios-checkmark-outline checkCircle"></i>'
                    str += '</div>';
                    str += '<div class="video_security_overlay">';
                    str += '<img class="desktop_tick security_tick" src="skin/security-icon.png" alt="Locked Video"/>';
                    str += '<img class="mobile_tick security_tick" src="skin/security-icon-m.png" alt="Locked Video"/>';
                    str += '</div>';
                    str += '</div>';
                }
                str += '</div>';
                str += '</section>';
            }
        }
        $('#topic_corousel').html(str);
    }
    Shell.prototype.courseXmlLoaded = function(xml) {
        var ref = this;
        ref.tocXml = $(xml);
        ref.showHideHeader(false);
        ref.setTopicPages();
        $("#slider").carousel({
            interval: false,
            keyboard: false
        });
        ref.attachEvents();
        ref.addGlobalContent();
        ref.addThumbnailCorousel();
        lms.init();
        var totalPagesLength = $(ref.tocXml).find('page').length;
        this.totalTopicLength = $(ref.tocXml).find('topic').length;
        for (var i = 0; i < totalPagesLength; i++) {
            ref.courseProgressArray.push(-1);
        }
        var obj = this.getLessonLocation();
        if (obj.lesson == "" || obj.lesson == "home" || obj.lesson == "help") {
            if ($(ref.tocXml).find('global').attr('require') == '1') {
                this.curTopic = 0;
                this.curPage = 1;
            } else {
                this.curTopic = 1;
                this.curPage = 1;
            }
        } else {
            this.curTopic = parseInt(obj.lesson);
            this.curPage = parseInt(obj.page);
        }
        ref.NowPlayingFunctionlity(this.curTopic, this.curPage);

        ref.loadPage();
    }
    Shell.prototype.NowPlayingFunctionlity = function(curTopicRef, curPageRef) {
        //alert(curTopicRef + " ::: " + curPageRef)
        $('.topic_container').find('.lo_current_video').hide();
        $('#thumb_' + curTopicRef + '_' + curPageRef).find('.lo_current_video').show();
    }
    Shell.prototype.getLessonLocation = function() {
        var lms_loc = lms.getBookmark();
        var obj = {
            lesson: "",
            page: ""
        };
        if (lms_loc != "" && lms_loc != "-1") {
            var arr = lms_loc.split("_");
            if (arr.length == 2) {
                obj.lesson = parseInt(arr[0]);
                obj.page = parseInt(arr[1]);
            } else {
                obj.lesson = arr[0];
                obj.page = 1;
            }
        }
        return obj;
    }
    Shell.prototype.getLessonPagesCount = function(lessonid) {
        var lesson = this.getLessonNode(lessonid);
        if (!lesson) return;
        return $(lesson).find("pages page").length;
    }
    Shell.prototype.getLessonNode = function(lessonid) {
        var node = null;
        switch (lessonid) {
            case "splash":
            case "help":
            case "home":
                node = null;
                break;
            default:
                node = this.tocXml.find("course topic:eq(" + (lessonid) + ")");
        }
        return node;
    }
    var occurrence = function(array) {
        "use strict";
        var result = {};
        if (array instanceof Array) { // Check if input is array.
            array.forEach(function(v, i) {
                if (!result[v]) { // Initial object property creation.
                    result[v] = [i]; // Create an array for that property.
                } else { // Same occurrences found.
                    result[v].push(i); // Fill the array.
                }
            });
        }
        return result;
    };
    Shell.prototype.updateVisitedPages = function(currTopicRef, currPageRef) {
        ref = this;
        // for course progress
        //alert("updateVisitedPages called");
		if (GlobarProgressPages.length > 0) {
            ref.courseProgressArray = globalProgressArray;

        }
        if (ref.courseProgressArray[ref.currentSlideNo] < 0) {
            ref.courseProgressArray[ref.currentSlideNo] = 1;
        } else {

        }
        pageVistedforprogresslength = occurrence(ref.courseProgressArray)[1].length;
        if (ref.courseProgressArray.length == pageVistedforprogresslength) {
            lms.markComplete("completed");
        }
        var valeur = 0;
        if ($(this).attr('value') > valeur) {
            valeur = $(this).attr('value');
        }
        valeur = Math.round((parseInt(pageVistedforprogresslength) / parseInt(ref.courseProgressArray.length)) * 100);
        $('.course_progress').find('.progress-bar').css('width', valeur + '%').attr('aria-valuenow', valeur);
        $('.courseProgressperc').html(valeur + '%');
        $('#thumb_' + currTopicRef + '_' + currPageRef).find('.video_completion_overlay').show();
        $('#thumb_' + currTopicRef + '_' + currPageRef).find('.progress-bar').css('width', '100%').attr('aria-valuenow', 100);
        //console.log("global visited pages are " + GlobalVisitedPages)
		if (GlobalVisitedPages != '') {
            ref.visitedPages = GlobalVisitedPages.split(',')
        }
        var topicPage = currTopicRef + "_" + currPageRef;
        if (ref.searchNum(topicPage, ref.visitedPages) == -1) {
			
            ref.visitedPages[ref.currentSlideNo] = topicPage;
			GlobalVisitedPages = ref.visitedPages.toString();
		}
		//alert("visited pages after search no " + ref.visitedPages)
		
        
		var len = ref.visitedPages.length;
        var suspendString = '';
		
        if (len > 0) {
            ref.suspendString = ref.visitedPages.toString() + '+' + ref.courseProgressArray.toString();
			//alert("suspend string is " + ref.suspendString)
		}
		//alert("update visited pages lms object " + typeof lms)
		lms.setSuspendData(ref.suspendString);
    }
    Shell.prototype.updatevideoProgress = function(vid, videoduration) {
        /*getVideoProgress(vid,function(result){
		//result represent the timing
		var timeinseconds = 0;
		if (result != undefined && result[0].tm != undefined) {
			timeinseconds = Math.round(parseInt(result[0].tm));
		}
		var videodurationinSeconds= Math.floor(videoduration);
		//console.log("video time" + timeinseconds);		
		//console.log("total video time" + videodurationinSeconds);
		//console.log(Math.round( timeinseconds/ parseInt(videodurationinSeconds) * 100));
		shell.valeur = Math.round( timeinseconds/ parseInt(videodurationinSeconds) * 100);
		//console.log(timeinseconds + " --- " + parseInt(videodurationinSeconds))
		$('#thumb_' + ref.curTopic + '_' + ref.curPage).find('.progress-bar').css('width', shell.valeur+'%').attr('aria-valuenow', shell.valeur);
		
		if(timeinseconds/ parseInt(videodurationinSeconds) >= 1)
			$('#thumb_' + ref.curTopic + '_' + ref.curPage).find('.video_completion_overlay').show();
		else
			$('#thumb_' + ref.curTopic + '_' + ref.curPage).find('.video_completion_overlay').hide();
	});*/
    }
    Shell.prototype.searchNum = function(num, arr) {
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            if (num == arr[i]) {
                return 1;
            }
        }
        return -1;
    }
    Shell.prototype.loadPage = function() {
        ref = this;
		//alert("2222222222")
        ref.prevNavControlsHandler = "shell";
        ref.nextNavControlsHandler = "shell";
        var index = $("#slider .carousel-inner .carousel-item[data-topic='" + ref.curTopic + "'][data-page='" + ref.curPage + "']").index();
		//alert(ref.curPage + " --- " + ref.curTopic);
        ref.screenType = $(ref.tocXml).find('topic').eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).attr('type').toLowerCase();
        var thumbnail = $(ref.tocXml).find('topic').eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).find('thumbnail').text();
        ref.currentSlideNo = index;
        globalCurTopic = ref.curTopic;
        globalCurPage = ref.curPage;
        this.NowPlayingFunctionlity(ref.curTopic, ref.curPage);
        var layout = this.whichLayoutNeedToLoad(ref.curPage);
        var templateurl = this.currenttemplateUrl = ref.getTemplateURL(ref.curTopic, ref.curPage, layout);
        var pageUrl = this.currentPageUrl = ref.getPageURL(ref.curTopic, ref.curPage, layout);
        $('#infoBox, .videoBlocker').hide();
		//$('#info_icon').removeClass('fa-close').addClass('fa-info-circle');
		$("#info_icon").removeClass('ion-ios-close-outline').addClass('ion-ios-information-outline')
		//alert("2.5")
		//alert("screen type is " + ref.screenType)
		//alert("its a mobile " + isMobile.any() + " --- " + $(window).width())
		ref.supportFilesLoaded();
		//alert(ref.screenType)
		if (ref.screenType == "activity" || ref.screenType == "actividad") {
            $('.last_viewed').html($(ref.tocXml).find('topic').eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).attr('heading'));
            //$('#info_icon').hide();
			//alert($(window).width())
			
            if (isMobile.any() && $(window).width() < 768) {
				//alert(thumbnail)
                if (thumbnail != "") {
                    $("#page_" + ref.curTopic + "_" + ref.curPage).html("<div class='btn btn-info custom-btn activity'>Start the activity</div><img src='" + templateurl + "/images/" + thumbnail + "' class='img-responsive' />");
					
					//$('.activity').find('img').load(function(){
					//$("#page_" + ref.curTopic + "_" + ref.curPage).find('.placeHolderImage').hide();
					//})
					
					var resourceLength = $(ref.tocXml).find('topic').eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).find('resources').length;
					if(resourceLength > 0){
						var resourcesText = $(ref.tocXml).find('topic').eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).find('resources').text();
						$('#contentTab_1').html(resourcesText)
					}else{
					$('#contentTab_1').html('<p>No hay recursos en este curso.</p>');
					}
					
					var transcriptLength = $(ref.tocXml).find('topic').eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).find('transcript').length;
					if(transcriptLength > 0){
						var transcriptText = $(ref.tocXml).find('topic').eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).find('transcript').text();
						$('#contentTab_2').html(transcriptText)
					}else{
					$('#contentTab_2').html('<p>No hay transcripción en esta actividad.</p>');
					}
					
					
					
					$('#activity_container').html('');
					
					//ref.unloadAllPages();
					
                    $("#page_" + ref.curTopic + "_" + ref.curPage).find('img,.activity').on('click', $.proxy(ref.activityLoading, null, ref));
                    
					setTimeout(function(){ 
						$("#slider").carousel(index);
						$("#page_" + ref.curTopic + "_" + ref.curPage).find('.placeHolderImage').hide();
						$('.topic_title').html(ref.tocXml.find("topics topic").eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).find('title').text())
					}, 200);
					return;
                }
            }
        } else {
            $('.last_viewed').html($(ref.tocXml).find('topic').eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).attr('heading'));
			$('#info_icon').show();
        }
		//alert("33333")
        var template = ref.getTemplateName(ref.curTopic, ref.curPage, layout);
        $("#page_" + ref.curTopic + "_" + ref.curPage).addClass(template + " " + layout);
        var dependencyFiles = [
            "text!" + pageUrl + "/index.html",
            templateurl + "/scripts/" + template,
            "css!" + templateurl + "/styles/" + template
        ];
        require(dependencyFiles, function(templateHtml, templateObj) {
            if (ref.templateInstance != null) {
                if (ref.templateInstance.destroy) {
                    ref.templateInstance.destroy();
                }
                delete ref.templateInstance;
            }
            ref.templateInstance = new templateObj();
			//$("#page_" + ref.curTopic + "_" + ref.curPage).html('');
            $("#page_" + ref.curTopic + "_" + ref.curPage).html(templateHtml);
			//alert("working")
            
			setTimeout(function(){ 
			$("#slider").carousel(index); 
			$('.topic_title').html(ref.tocXml.find("topics topic").eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).find('title').text())
			}, 200);
            
			
			$("#slider").on("slid.bs.carousel", function() {
            ref.unloadAllPages();    
                ref.enableDisableNext(true);
                ref.enableDisablePrev(true);
				//alert("lms object is " + typeof lms)
				lms.unloadCourse();
                if (ref.currentSlideNo == ref.courseProgressArray.length - 1) {
                    ref.enableDisableNext(false);
                    return;
                }

                if (ref.currentSlideNo == 0) {
                    ref.enableDisablePrev(false);
                    return;
                }
				$("#page_" + ref.curTopic + "_" + ref.curPage).find('.placeHolderImage').hide();
            });
            var pageXmlName = pageUrl.split('/')[1];
            //alert(pageXmlName)
            ref.templateInstance.init(pageXmlName);
            if (ref.currentSlideNo == 0) {
                ref.enableDisablePrev(false);
                return;
            }
        });
    }
    Shell.prototype.supportFilesLoaded = function() {
        var ref = this;
        $('.shellHeader, .main_container, .video_heading, #shellContainer_content_box').show();
        $('#coursePreloader').hide();
        $('.nicescroll-rails').each(function(){
              $(this).hide();
        })
    }
    Shell.prototype.activityLoading = function() {
        //alert("working")
        var layout = ref.whichLayoutNeedToLoad();
		$('body').addClass('activityOpened');
        var templateurl = this.currenttemplateUrl = ref.getTemplateURL(ref.curTopic, ref.curPage, layout);
        var pageUrl = this.currentPageUrl = ref.getPageURL(ref.curTopic, ref.curPage, layout);
        var template = ref.getTemplateName(ref.curTopic, ref.curPage, layout);

        $(".activity_container").addClass(template + " " + layout);
        var dependencyFiles = [
            "text!" + pageUrl + "/index.html",
            templateurl + "/scripts/" + template,
            "css!" + templateurl + "/styles/" + template
        ];
        require(dependencyFiles, function(templateHtml, templateObj) {
            if (ref.templateInstance != null) {
                if (ref.templateInstance.destroy) {
                    ref.templateInstance.destroy();
                }
                delete ref.templateInstance;
            }
            ref.templateInstance = new templateObj();
            //ref.unloadAllPages();
            $(".activity_container").html(templateHtml);
            $(".activity_container").show();
            $('.fixed_block').hide();
            $('#shellContainer_content_box').addClass("changingPadding");
            ref.supportFilesLoaded();
            var pageXmlName = pageUrl.split('/')[1];
            //alert(pageXmlName)
            ref.templateInstance.init(pageXmlName);
        });
    }
    Shell.prototype.showHidePreloader = function() {
        var ref = this;
        if (!ref.isLoading && !ref.isPageTrans) {
            $("#preloader").hide();
        } else {
            $("#preloader").show();
        }
    }
    Shell.prototype.setLoading = function(bool) {
        var ref = this;
        ref.isLoading = bool;
        ref.showHidePreloader();
    }
    Shell.prototype.slideinfo = function(ref, e) {
	//alert(videoEnded)
        if ($("#info_icon").hasClass('ion-ios-close-outline')) {
            $('.videoBlocker').hide();
			//$('#infoBox').css('z-index', '999')
            $('#contentTab_2').getNiceScroll().hide();
			$('#infoBox').hide();
            $("#info_icon").addClass("ion-ios-information-outline");
            $("#info_icon").removeClass('ion-ios-close-outline');
			//alert(ref.templateInstance.playMedia)
			//alert(globalisPlaying)
			if(globalisPlaying == false){
				//_fp_play();
				
				if(videoEnded == true || userdefinedpaused == true){
				
				return;
				}
				globalisPlaying = true;
					
				// globalisPlaying = true;
				ref.templateInstance.playMedia();
				
				
			}
            // if (ref.templateInstance.playMedia) {
                
                
				
                    
					// ref.templateInstance.playMedia();
                
            // }
        } else {
            $('.videoBlocker').show();
			//$('#infoBox').css('z-index', '99999999')
            $('#infoBox').show();
			
            $("#info_icon").removeClass("ion-ios-information-outline");
            $("#info_icon").addClass('ion-ios-close-outline');
			
			if(globalisPlaying == true){
			
			globalisPlaying = false;
			ref.templateInstance.stopMedia();
			
			// globalisPlaying = false;
			//_fp_pause();
			
			
			} 
            // if (ref.templateInstance.stopMedia) {
                // ref.templateInstance.stopMedia();
                
            // }
        }
        $('#infoBox').find('li').removeClass('selected');
        $('#infoBox').find('li').eq(0).addClass('selected');
        $('#infoBox').find('#contentTab_1').show();
        $('#infoBox').find('#contentTab_2').hide();
    }
    Shell.prototype.selectTabinsideInfo = function() {
        var infoTabId = $(this).attr('id').split('_')[1];
        $(this).addClass('selected');
        $(this).siblings('li').removeClass('selected');
        $('#infoBox').find('#contentTab_' + infoTabId).show();
        $('#infoBox').find('#contentTab_' + infoTabId).siblings('div').hide();
		$('#contentTab_2').getNiceScroll().show();
          $('#contentTab_2').scrollTop(0);
            $('#contentTab_2').getNiceScroll().resize();
    }
    Shell.prototype.attachEvents = function() {
        var ref = this;
        $("#navBtnHolder .btnBack").bind('click', $.proxy(ref.setPrevPage, null, ref));
        $("#navBtnHolder .btnNext").bind('click', $.proxy(ref.setNextPage, null, ref));
        $('#infoBox').find('li').on('click', $.proxy(ref.selectTabinsideInfo, null, ref));
        $('#info_icon').bind('click', $.proxy(ref.slideinfo, null, ref))
        $(".home-btn").bind('click', function() {
            ref.openCloseToc(ref, null, "close");
            ref.openCloseTranscript(ref, null, "close");
            ref.setPage(0, 2);
        });
        $(".course-title-btn").bind('click', function() {
            ref.openCloseToc(ref, null, "close");
            ref.openCloseTranscript(ref, null, "close");
            ref.setPage(0, 1);

        });
		
		$('.AboutCourseBtn, .about_icon').on('click', function(){
		$('span.about_icon').toggleClass('ion-ios-arrow-up');
		
		});
        $(".exit-btn").bind('click', function() {
            open(location, '_self').close();
        });
        $(".help-btn").bind('click', function() {});
        $(".toc-menu").bind('click', $.proxy(ref.openCloseToc, null, ref));
        $(".transcript-menu").bind('click', $.proxy(ref.openCloseTranscript, null, ref));
        $(".toc-topic").bind("click", function() {
            ref.setTopic(parseInt($(this).attr("data-topic"), 10));
        });
        //alert(isMobile.any())
        if (isMobile.any()) {
            $('body').addClass("showingControls");
        } else {
            $("#shellContainer").hover(function() {
                $('body').addClass("showingControls");
                $('body').addClass("seekbaron");
            }, function() {
                $('body').removeClass("showingControls");
                $('body').removeClass("seekbaron");
            });
        }
        $(document).click(function(event) {
            if ($(".toc-menu").hasClass("opened")) {
                ref.openCloseToc(ref, event, "close");
            }
            if ($(".transcript-menu").hasClass("transcript-opened")) {
                ref.openCloseTranscript(ref, event, "close");
            }
        });
        $('#blocker').click(function(event) {
            if ($(".toc-menu").hasClass("opened")) {
                ref.openCloseToc(ref, event, "close");
            }
            if ($(".transcript-menu").hasClass("transcript-opened")) {
                ref.openCloseTranscript(ref, event, "close");
            }
        });
        $('.videoBlocker').click(function(event) {
            if ($(".info_box").is(':visible')) {
				$('#contentTab_2').getNiceScroll().hide();
                $(".info_box,.videoBlocker").css('display', 'none');
                $("#info_icon").addClass("ion-ios-information-outline");
                $("#info_icon").removeClass('ion-ios-close-outline');
				if(globalisPlaying == false){
				//_fp_play();
				
				if(videoEnded == true || userdefinedpaused == true){
				
				return;
				}
				globalisPlaying = true;
					
				// globalisPlaying = true;
				ref.templateInstance.playMedia();
				
				
			}
				
				//_fp_play();
                // if (ref.templateInstance.playMedia) {
						// if (globalisPlaying) {
                        // ref.templateInstance.playMedia();
                    // }
                // }
            }
        });
        var options = {
            dragLockToAxis: false,
            dragBlockHorizontal: false
        };
        var element = document.getElementById('slider');
        if (isMobile.any()) {
            var hammertime = new Hammer(element, options);
            var hammertime = Hammer(element).on("dragleft  swipeleft", function(event) {
			if(event.target.className == 'thumbImage' || event.target.className == 'owl-stage' ){
				return;
				}
                ref.setNextPage(ref);
            });
            var hammertime2 = Hammer(element).on("dragright  swiperight", function(event) {
			if(event.target.className == 'thumbImage' || event.target.className == 'owl-stage' ){
				return;
				}
                ref.setPrevPage(ref);
            });
        }
    }
    Shell.prototype.markCompleted = function() {
        var ref = this;
        if (ref.visitedPages.indexOf(ref.curPage) == -1) {
            ref.visitedPages.push(ref.curPage);
        }
        ref.enableDisableNext(true);
    }
    Shell.prototype.setPrevPage = function(ref, e) {
        if (!ref.isPrevEnabled || this.isLoading || this.isPageTrans) {
            return;
        }
        ref.enableDisablePrev(false);
        if (ref.curTopic == 1 && ref.curPage == 1) {
            ref.prevPage = ref.curTopic + "_" + ref.curPage;
            ref.curPage = 1;
            ref.curTopic = 0;
            //$('.topic_title').html(ref.tocXml.find("global").find('title').text())
            ref.loadPage();
            return;
        }
		//alert(ref.curTopic + " ::: " + ref.curPage)
        if (ref.curPage > 1) {
            ref.prevPage = ref.curTopic + "_" + ref.curPage;
            ref.curPage--;
            //$('.topic_title').html(ref.tocXml.find("topics topic").eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).find('title').text())
            ref.loadPage();
        } else {
		
            ref.prevPage = ref.curTopic + "_" + ref.curPage;
            ref.curPage = ref.eachTopicPagesArray[ref.curTopic - 2];
            ref.curTopic--;
            //$('.topic_title').html(ref.tocXml.find("topics topic").eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).find('title').text())
            ref.loadPage();
        }
    }
    Shell.prototype.setNextPage = function(ref, e) {
        //console.log(typeof ref.isNextEnabled)
        if (typeof ref.isNextEnabled != "undefined") {
            if (!ref.isNextEnabled || ref.isLoading || ref.isPageTrans) {
                return;
            }
        }
        ref.enableDisableNext(false);
        if (ref.curTopic == 0 && ref.curPage == 1) {
            ref.prevPage = ref.curTopic + "_" + ref.curPage;
            ref.curTopic++;
            ref.curPage = 1;
            ref.loadPage();
            //$('.topic_title').html(ref.tocXml.find("topics topic").eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).find('title').text());
            return;
        }
		//alert(ref.curTopic)
		//alert(ref.curPage + " :::: " + ref.eachTopicPagesArray[ref.curTopic - 1])
			if (ref.curPage < ref.eachTopicPagesArray[ref.curTopic - 1]) {
				//alert("coming here 1");
				if ($(ref.tocXml).find('topic').eq(ref.curTopic - 1).find('page').eq(ref.curPage).length > 0) {
					ref.prevPage = ref.curTopic + "_" + ref.curPage;
					ref.curPage++;
				//	$('.topic_title').html(ref.tocXml.find("topics topic").eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).find('title').text())
					ref.loadPage();
				}
			}else{
			//alert("coming here 2");
				ref.prevPage = ref.curTopic + "_" + ref.curPage;
				ref.curPage = 1;
				ref.curTopic++;
                //$('.topic_title').html(ref.tocXml.find("topics topic").eq(ref.curTopic - 1).find('page').eq(ref.curPage - 1).find('title').text())
                ref.loadPage();
			}
        }

    
    Shell.prototype.openCloseTranscript = function(ref, e, type) {
        type = type || undefined;
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (type == undefined) {
            if ($(".transcript-menu").hasClass("transcript-opened")) {
                $('.transcript').hide();
                $(".transcript-menu").addClass("transcript-close");
                $(".transcript-menu").removeClass("transcript-opened");
                if (ref.templateInstance.playMedia) {
                    ref.templateInstance.playMedia();
                }
                ref.transcript_flag = true;
            } else {
                $('.transcript').show();
                $(".transcript-menu").addClass("transcript-opened");
                $(".transcript-menu").removeClass("transcript-close");
                if (ref.templateInstance.stopMedia) {
                    ref.templateInstance.stopMedia();
                }
                ref.transcript_flag = false;
            }
        } else if (type == "open") {
            $('.transcript').show();
            $(".transcript-menu").addClass("transcript-opened");
            $(".transcript-menu").removeClass("transcript-close");
            if (ref.templateInstance.stopMedia) {
                ref.templateInstance.stopMedia();
            }
            ref.transcript_flag = true;
        } else if (type == "close") {
            $('.transcript').hide();
            $(".transcript-menu").addClass("transcript-close");
            $(".transcript-menu").removeClass("transcript-opened");
            if (ref.templateInstance.playMedia) {
                ref.templateInstance.playMedia();
            }
            ref.transcript_flag = false;
        }
    }
    Shell.prototype.openCloseToc = function(ref, e, type) {
        type = type || undefined;
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (type == undefined) {
            if ($(".toc-menu").hasClass("closed")) {
                $(".toc-menu").removeClass("closed").addClass("opened");
                $('body').addClass('sidemenu-opened');
                if (ref.templateInstance.stopMedia) {
                    ref.templateInstance.stopMedia();
                }
                $("#blocker").show();
            } else {
                $(".toc-menu").addClass("closed").removeClass("opened");
                $('body').removeClass('sidemenu-opened');
                $("#blocker").hide();
                if (ref.templateInstance.playMedia) {
                    //ref.templateInstance.isPlaying = true;
                    ref.templateInstance.playMedia();
                }
            }
        } else if (type == "open") {
            $(".toc-menu").removeClass("closed").addClass("opened");
            $('body').addClass('sidemenu-opened');
            $("#blocker").show();
            if (ref.templateInstance.stopMedia) {
                ref.templateInstance.stopMedia();
            }

        } else if (type == "close") {
            $(".toc-menu").addClass("closed").removeClass("opened");
            $('body').removeClass('sidemenu-opened');
            $("#blocker").hide();
            if (ref.templateInstance.playMedia) {

                ref.templateInstance.playMedia();
            }
        }
    }
    Shell.prototype.setTopic = function(topicid) {
        var ref = this;
        ref.prevPage = ref.curPage;
        ref.curPage = 1;
        ref.curTopic = topicid;
        ref.totalPages = ref.tocXml.find("topics topic:eq(" + (topicid - 1) + ") pages page").length;
        ref.loadPage();
    }
    Shell.prototype.setPage = function(topicid, pageid) {
        var ref = this;
        ref.prevPage = ref.curPage;
        ref.curPage = pageid;
        ref.curTopic = topicid;
        ref.totalPages = ref.tocXml.find("topics topic:eq(" + (topicid - 1) + ") pages page").length;
        ref.loadPage();
    }
    Shell.prototype.setBackNext = function() {
        var ref = this;

        if (ref.currentSlideNo == ref.totalPages) {

            ref.enableDisableNext(false);
        } else {

            ref.enableDisableNext(true);
        }
    }
    Shell.prototype.enableDisablePrev = function(bool) {
        var ref = this;
        if (bool == false) {
            $("#navBtnHolder .btnBack").addClass("disabled");
            ref.isPrevEnabled = false;
        } else {
            $("#navBtnHolder .btnBack").removeClass("disabled");
            ref.isPrevEnabled = true;
        }
    }
    Shell.prototype.enableDisableNext = function(bool) {
        var ref = this;
        if (bool == false) {
            $("#navBtnHolder .btnNext").addClass("disabled");
            ref.isNextEnabled = false;
        } else {
            $("#navBtnHolder .btnNext").removeClass("disabled");

            ref.isNextEnabled = true;
        }
    }
    Shell.prototype.showHideHeader = function(bool) {
        if (bool) {
            $("body").addClass("showingHeader");
        } else {
            $("body").removeClass("showingHeader");
        }
    }
    Shell.prototype.setTopicPages = function() {
        var ref = this;
        var topics = this.tocXml.find("topics topic");
        ref.totalTopics = topics.length;
        ref.totalPages = this.tocXml.find('topics topic').find('pages page').length;
        //launch page
        if ($(ref.tocXml).find('global').attr('require') == '1') {
            $("<div/>").attr("id", "page_" + 0 + "_" + 1)
                .attr("data-topic", 0)
                .attr("data-page", 1)
                .addClass("carousel-item")
                .appendTo("#slider .carousel-inner");
            for (var i = 0; i < ref.totalTopics; i++) {
                var p = [];
                var pages = this.tocXml.find("topics topic:eq(" + i + ")").find("pages page");
                ref.eachTopicPagesArray.push(pages.length);
                for (var j = 0; j < pages.length; j++) {
                    p.push(0);
                    $("<div/>").attr("id", "page_" + (i + 1) + "_" + (j + 1))
                        .attr("data-topic", i + 1)
                        .attr("data-page", j + 1)
                        .addClass("carousel-item")
                        .appendTo("#slider .carousel-inner");
                }
            }
            ref.curTopic = 0;
            ref.curPage = 1;
            $("#page_0_1").addClass("active");
        } else {
            for (var i = 0; i < ref.totalTopics; i++) {
                var p = [];
                var pages = this.tocXml.find("topics topic:eq(" + i + ")").find("pages page");
                ref.eachTopicPagesArray.push(pages.length);
                for (var j = 0; j < pages.length; j++) {
                    p.push(0);
                    $("<div/>").attr("id", "page_" + (i + 1) + "_" + (j + 1))
                        .attr("data-topic", i + 1)
                        .attr("data-page", j + 1)
                        .addClass("carousel-item")
						.appendTo("#slider .carousel-inner");
						
                }
            }
			//$("#page_1_1").html("<h2>default image</h2>");
			//alert(ref.totalTopics + " :::: " + pages.length)
			for (var i = 0; i < ref.totalTopics; i++) {
				for (var j = 0; j < pages.length; j++) {
				console.log('#page_' + (i+1) + '_' + (j+1))
				$('#page_' + (i+1) + '_' + (j+1)).html("<img src='./images/placeholder.jpg' class='placeHolderImage' />")
				
			}
			
			}
			
			
            ref.curTopic = 1;
            ref.curPage = 1;
			$("#page_1_1").find('.placeHolderImage').hide();
            $("#page_1_1").addClass("active");
        }
    }
    Shell.prototype.setTitle = function(txt) {
        var ref = this;
        $("#shellHeader .title .txt").html(txt);
        document.title = $("#shellHeader .title .txt").text();
    };
    Shell.prototype.getTemplateName = function(topicid, pageid, type) {
        if (topicid == 0) {
            if (pageid == 1) {
                return "splash";
            }
        }
        var page = this.tocXml.find("topics topic:eq(" + (topicid - 1) + ") pages page:eq(" + (pageid - 1) + ")");
        if (type === undefined || type === null || type == "primary") {
            if (page.find("primary").length > 0) {
                return page.find("primary template").text();
            } else {
                return page.find("template:eq(0)").text();
            }
        } else {
            if (page.find("alternate").length > 0) {
                return page.find("alternate template").text();
            } else if (page.find("template").length > 1) {
                return page.find("template:eq(1)").text();
            } else {
                return page.find("template:eq(0)").text();
            }
        }
    };
    Shell.prototype.getTemplateInstance = function(pageid) {
        return this.templateInstance;
    };
    Shell.prototype.getPageURL = function(topicid, pageid, type) {
        if (topicid == 0) {
            if (pageid == 1) {
                return "pages/splash";
            }
        }
        var page = this.tocXml.find("topics topic:eq(" + (topicid - 1) + ") pages page:eq(" + (pageid - 1) + ")");
        if (type === undefined || type === null || type == "primary") {

            if (page.find("primary").length > 0) {
                return "pages/" + page.find("url").text();
            } else {
                return "pages/" + page.find("url:eq(0)").text();
            }
        } else {

            if (page.find("alternate").length > 0) {
                return "pages/" + page.find("alternate url").text();
            } else if (page.find("url").length > 1) {
                return "pages/" + page.find("url:eq(1)").text();
            } else {
                return "pages/" + page.find("url:eq(0)").text();
            }
        }
    };
    Shell.prototype.getTemplateURL = function(topicid, pageid, type) {
        if (topicid == 0) {
            if (pageid == 1) {
                return "pages/splash";
            }
        }
        var page = this.tocXml.find("topics topic:eq(" + (topicid - 1) + ") pages page:eq(" + (pageid - 1) + ")");
        if (type === undefined || type === null || type == "primary") {

            if (page.find("primary").length > 0) {
                return "templates/" + page.find("template").text();
            } else {
                return "templates/" + page.find("template").text();
            }
        } else {
            //alert("coming here 2")
            if (page.find("alternate").length > 0) {
                return "templates/" + page.find("template").text();
            } else if (page.find("url").length > 1) {
                return "templates/" + page.find("template").text();
            } else {
                return "templates/" + page.find("template").text();
            }
        }
    };
    Shell.prototype.isForceNavigation = function(pageid) {
        return this.tocXml.find("pages page:eq(" + (pageid - 1) + ") forceNavigation").text();
    };
    Shell.prototype.whichLayoutNeedToLoad = function(pageid) {
        if (this.tocXml.find("pages page:eq(" + (pageid - 1) + ")").attr('layout') == "primary") {
            return "primary";
        } else {

            return "alternate";
        }
    };
    Shell.prototype.pageLoaded = function() {
        this.isLoading = false;
        $("#preloader").hide();
        if (isMobile.any()) {

        } else {

        }
    }
    Shell.prototype.setTopicsCompletionStatus = function() {
        for (var i = 1; i <= ref.totalTopics; i++) {
            if (this.isTopicCompleted(i)) {
                $(".toc-topics .toc-topic[data-topic='" + i + "']").addClass("visited");
            } else {
                $(".toc-topics .toc-topic[data-topic='" + i + "']").removeClass("visited");
            }
        }
    }
    Shell.prototype.isTopicCompleted = function(topicid) {
        var bool = true;
        for (var i = 0; i < ref.topics[topicid].length; i++) {
            if (ref.topics[topicid][i] == 0) {
                bool = false;
                break;
            }
        }
        return bool;
    }
    Shell.prototype.getTopicsStatus = function() {
        return this.topics;
    }
    Shell.prototype.unloadAllPages = function() {
		//alert("111111111111");
		$('#activity_container').html('');
		
		if($("#page_" + this.prevPage).find('video').length > 0){
		$("#page_" + this.prevPage).find('video').each(function(){
		$(this).attr('src', '');
		})
		
		//alert($('#activity_container').find('audio').length)
		
		}
		
		if($("#page_" + this.prevPage).find('audio').length > 0){
		$("#page_" + this.prevPage).find('audio').each(function(){
		$(this).attr('src', '');
		})
		
		//alert($('#activity_container').find('audio').length)
		
		}
        $("#page_" + this.prevPage).empty(); //.attr("src","pages/blank.html");
        //ref.unloadSupportFiles(ref.prevPage);
    }
    Shell.prototype.getPageContainer = function() {
        var ref = this;
        if ((isMobile.any() == 'iPhone' || isMobile.any() == 'Android') && ref.screenType == "activity" || ref.screenType == "actividad" && $(window).width() < 768) {
            return ".activity_container";
        } else {
            return "#shellContainer #slider #page_" + this.curTopic + "_" + this.curPage;
        }
    }
    Shell.prototype.getURL = function() {
        return this.currentPageUrl;
    };

    Shell.prototype.attachScrollBar = function(obj, cw, ch, trackcolor, thumbcolor) {
		
        $(obj).niceScroll({
			horizrailenabled:false,
            cursorborder: "0px",
            cursorwidth: cw + "px",
            cursorborder: "0px",
            cursorborderradius: "0px",
            background: trackcolor,
            autohidemode: "false"
        }).cursor.css({
            "background": thumbcolor,
            "width": cw,
            "height": ch,
            "left": "0px"
        });
        $(obj).niceScroll().hide();
    }
	
	Shell.prototype.loadPdf =  function(pdfPathRef){
                //alert("loading pdf");
                window.open(pdfPathRef, '_blank');
                }
    return Shell;
});
