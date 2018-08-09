define([], function() {
    $.fn.center = function() {
        this.css("position", "absolute");
        this.css("top", ($(window).height() - this.height()) / 2 + "px");
        return this;
    }

    function bestPracticesTemplate() {
        this.xml = null;
        this.totalOptions = 3;
        this.correctOption = 1;
        this.selectedOption = 0;
        this.container = null;
        this.attempts = 0;
    }
    bestPracticesTemplate.prototype = new Util();
    bestPracticesTemplate.prototype.constructor = bestPracticesTemplate;
    bestPracticesTemplate.prototype.init = function(xmlName) {
        var ref = this;
        this.container = this.getPageContainer();
        $(ref.container).find(".bestPracticeTabBackBtn").click(function() {
            $('body').removeClass('activityOpened');
			$(ref.container).hide();
            $('.fixed_block').show();
			
            $('#shellContainer_content_box').removeClass('changingPadding');
        });
        $.ajax({
            type: "GET",
            url: "data/" + xmlName + ".xml",
            dataType: "xml",
            success: function(xml) {
				ref.xml = xml;
				
				if($(ref.xml).find('transcript').length > 0){
					var transcriptText = $(ref.xml).find('transcript').text();
						$('#contentTab_2').html(transcriptText)
					}
					if($(ref.xml).find('resources').length > 0){
						var resourcesText = $(ref.xml).find('resources').text();
						$('#contentTab_1').html(resourcesText)
					}
			
                var boolValue = true;
                // default screen				
                var defaultStr = '';
                if (boolValue == true) {
                    defaultStr += '<img class="img-responsive desktop-bg-img" src="' + $(xml).find("best_practices_main").find("defaultContainer").find("image_desktop").text() + '" alt="Background"/>';
                    defaultStr += '<img class="img-responsive mobile-bg-img hide" src="' + $(xml).find("best_practices_main").find("defaultContainer").find("image_mobile").text() + '" alt="Background"/>';
                    defaultStr += '<div class="text-container"><div class="text-container-inside">' + $(xml).find("best_practices_main").find("defaultContainer").find("content").text() + '</div></div>';
                }
                $(ref.container).find('.best_practices_bg').find('.default-screen').html(defaultStr);
				setTimeout(function() {
				if(isMobile.any()){
				
				}else{
                var obj = $(ref.container).find('.best_practices_bg').find('.default-screen').find('.text-container-inside');
					
                    window.shell.attachScrollBar(obj, 8, 100, '#cccccc', '#0090DA');
					$(ref.container).find('.best_practices_bg').find('.default-screen').find('.text-container-inside').getNiceScroll().resize();
					$(ref.container).find('.best_practices_bg').find('.default-screen').find('.text-container-inside').getNiceScroll().show();
            $(ref.container).find('.best_practices_bg').find('.default-screen').find('.text-container-inside').scrollTop(0);
            
			

                }
				}, 600);
				
				
				// end
                // best practices and possible statements screen
                var bestStr = '';
                if (boolValue == true) {
                    bestStr += '<div class="img-tag"><img class="img-responsive desktop-bg-img" src="' + $(xml).find('best_practices_main').find('popupContent').find('item').find('image_desktop').text() + '"><img class="img-responsive mobile-bg-img hide" src="' + $(xml).find('best_practices_main').find('popupContent').find('item').find('image_mobile').text() + '"></div>';
                    bestStr += '<div class="text-tag"><div class="textContent">' + $(xml).find('best_practices_main').find('popupContent').find('item').find('content').text() + '</div></div>';
                }
                $(ref.container).find('.best_practices_bg').find('.best').find('.row').html(bestStr);
                // end
                // code for nicescroll bar
				if(isMobile.any()){
				
				}else{
                var obj1 = $(ref.container).find('.best_practices_bg').find('.best').find('.textContent');
                setTimeout(function() {
                    window.shell.attachScrollBar(obj1, 8, 100, '#cccccc', '#0090DA')
                }, 600);
				}
                // code for nicescroll bar ends
                // possible statements screen
                var possibleStr = '';
                if (boolValue == true) {
                    possibleStr += '<div class="img-tag"><img class="img-responsive desktop-bg-img" src="' + $(xml).find('best_practices_main').find('popupContent').find('itemP').find('image_desktop').text() + '"><img class="img-responsive mobile-bg-img hide" src="' + $(xml).find('best_practices_main').find('popupContent').find('itemP').find('image_mobile').text() + '"></div>';
                    possibleStr += '<div class="text-tag"><div class="textContent">' + $(xml).find('best_practices_main').find('popupContent').find('itemP').find('content').text() + '</div></div>';
                }
                $(ref.container).find('.best_practices_bg').find('.possible').find('.row').html(possibleStr);
                // end
                // code for nicescroll bar
				
                if(isMobile.any()){
				
				}else{
				var obj = $(ref.container).find('.best_practices_bg').find('.possible').find('.textContent');
				setTimeout(function() {
                    window.shell.attachScrollBar(obj, 8, 100, '#cccccc', '#0090DA')
                }, 600);
                
                }
				// code for nicescroll bar ends
            }
        });
        // function to select tabs when clicked accordingly
        $(ref.container).find('.best-possible-tabs').find('.tabs').click(function() {
            $(this).addClass('active');
            $(this).addClass('selected');
            $(this).siblings('div').removeClass("active");
            //alert($(ref.container).find('.tabs').length)
            if ($(ref.container).find('.selected').length == $(ref.container).find('.tabs').length) {
                //alert("done");
                window.shell.updateVisitedPages(globalCurTopic, globalCurPage);
            }
        });
        $(ref.container).find('.close-icon').on('click', function() {
			$(ref.container).find('.best_practices_bg').find('.best').find('.textContent').getNiceScroll().hide();
			$(ref.container).find('.best_practices_bg').find('.possible').find('.textContent').getNiceScroll().hide();
			
            $(ref.container).find('.best_practices_bg').find('.default-screen').find('.text-container-inside').getNiceScroll().show();
		
			$('.possible').hide();
            $('.best').hide();
			$('.default-screen').fadeIn("slow");;
            $('.best-possible-tabs').find('.tabs').siblings('div').removeClass("active");
            $('.vertical-separator').fadeIn("slow");;
        });
        $(ref.container).find('#tab-1').on('click', function() {
            $('.default-screen').hide();
            $('.possible').hide();
            $('.best').fadeIn("slow");;
            //$('.vertical-separator').hide();
            // code for nicescroll bar 
			
			$(ref.container).find('.best_practices_bg').find('.default-screen').find('.text-container-inside').getNiceScroll().hide();
            $(ref.container).find('.best_practices_bg').find('.possible').find('.textContent').getNiceScroll().hide();
            $(ref.container).find('.best_practices_bg').find('.best').find('.textContent').getNiceScroll().show();
            $(ref.container).find('.best_practices_bg').find('.best').find('.textContent').scrollTop(0);
            $(ref.container).find('.best_practices_bg').find('.best').find('.textContent').getNiceScroll().resize();
            // code for nicescroll bar ends
        });
        $(ref.container).find('#tab-2').on('click', function() {
            $('.default-screen').hide();
            $('.best').hide();
            $('.possible').fadeIn("slow");;
           // $('.vertical-separator').hide();
            // code for nicescroll bar
			$(ref.container).find('.best_practices_bg').find('.default-screen').find('.text-container-inside').getNiceScroll().hide();
            $(ref.container).find('.best_practices_bg').find('.best').find('.textContent').getNiceScroll().hide();
            $(ref.container).find('.best_practices_bg').find('.possible').find('.textContent').getNiceScroll().show();
            $(ref.container).find('.best_practices_bg').find('.possible').find('.textContent').scrollTop(0);
            $(ref.container).find('.best_practices_bg').find('.possible').find('.textContent').getNiceScroll().resize();
            // code for nicescroll bar ends
        });
        // end 
        this.pageLoaded();
    }
    return bestPracticesTemplate;
});