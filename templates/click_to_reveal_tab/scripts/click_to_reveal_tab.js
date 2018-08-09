define(['flexSlider'], function () {

	$.fn.center = function () {
   this.css("position","absolute");
   this.css("top", ( $(window).height() - this.height() ) / 2  + "px");
   //this.css("left", ( $(window).width() - this.width() ) / 2 + "px");
   return this;
}
	
	function ClickRevealTemplate() {
		this.xml = null;
		/*this.totalOptions = 3;
		this.correctOption = 1;
		this.selectedOption = 0;
		this.container = null;
		this.attempts = 0;*/
		this.noOfTabs = null;
		this.tabsArray = [];
		this.tabsID = 0;
		
	}

	ClickRevealTemplate.prototype = new Util();
	ClickRevealTemplate.prototype.constructor = ClickRevealTemplate;
	ClickRevealTemplate.prototype.init = function (xmlName) {		
		var boolValue = false;	
		var ref = this;
		this.container = this.getPageContainer();
		
		$(ref.container).find(".clickToRevealTabBackBtn").click(function(){
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
				
				this.noOfTabs = $(xml).find('tabs').length;
				for(var i=0; i<this.noOfTabs; i++){
					ref.tabsArray.push(-1);
				}		
				
				var thumbLength = $(xml).find("thumb_content").length;
				
				
				var str = '';
								
				str+= '<div id="carousel" class="flexslider">';
				str+= '<ul id="content-slider" class="slides">';
				
				for(var i=0; i<thumbLength; i++){
					
					
					str+='<li class="content-item" id="carousal_' + i +'">';
					
					if($(ref.xml).find('thumb_content').eq(i).find('image').length > 0){
					str += '<img src="' + $(ref.xml).find('thumb_content').eq(i).find('image').text() + '" class="thumbImage">';
					}
					str += '<img src="./templates/click_to_reveal_tab/images/visited.png" class="visitedIcon hide">';
					
					
					str+='<h3>' + $(ref.xml).find('thumb_content').eq(i).find('thumbText').text() + '</h3>';
					
					str += '</li>';
					
				}
				str+='</ul>';
				str += '<div class="prevSlideBtn flex-prev" id="prev"><i class="fa fa-arrow-circle-left" aria-hidden="true"></i></div>';
				str +=	'<div class="nextSlideBtn flex-next" id="next"><i class="fa fa-arrow-circle-right" aria-hidden="true"></i></div>';
				
				str +='</div>'
				//alert(str)
				//console.log($(ref.container).find('.clickToReveal-bg').length)
				$(ref.container).find('.clickToReveal-bg').find('.crouselContainer').html(str);
				ref.loadSlider();
				
				// code for nicescroll bar
				if(isMobile.any()){
				
				}else{
                var obj = $(ref.container).find('.tabs-container').find('#scrolltabcontent').find('#tabParagraph');				
                setTimeout(function() {
                    window.shell.attachScrollBar(obj, 8, 100, '#cccccc', '#0090DA')
					//$(ref.container).find('.tabs-container').find('#scrolltabcontent').find('#tabParagraph').getNiceScroll().hide();
                }, 1000);
				}
                // code for nicescroll bar ends
			}
		});
		
	ClickRevealTemplate.prototype.loadSlider = function(){
		var ref = this;
		//$('#tab_content').find('.demo').find('.selected').removeClass('selected');
		var myslider; 
		if(isMobile.any()){
			setTimeout(function(){
			$('#carousel').flexslider({
				animation: "slide",
				animationLoop: false,
				itemWidth: 150,
				itemMargin: 10,
				pausePlay: false,
				mousewheel: false,
				minItems: 2.5,
				maxItems: 4.5,
				animationLoop: false, 
				slideshow: false,
				reverse: false,
				move:1,
				controlNav: false
			});
			$('#prev').on('click', function(){
					$('#carousel').flexslider('prev');
					
				});

				$('#next').on('click', function(){
					$('#carousel').flexslider('next');
				});
		//$('.crouselContainer').show();
		}, 100);
			

		}else{
		setTimeout(function(){			
			$('#carousel').flexslider({
				animation: "slide",
				animationLoop: false,
				itemWidth: 150,
				itemMargin: 10,
				pausePlay: false,
				mousewheel: false,
				slideshow: false,
				minItems: 2.5,
				maxItems: 4.5,
				animationLoop: false,  
				reverse: false,
				move:1,
				controlNav: false,
				start: function(slider){
					console.log("coming here")
					myslider=slider; / Add this */
					//$('#container').removeClass('loading');
				}
			});
			$('#prev').on('click', function(){
					$('#carousel').flexslider('prev');
					
				});

				$('#next').on('click', function(){
					$('#carousel').flexslider('next');
					//$('.flex-prev').removeClass('hidden');
					
				});
			//$('.crouselContainer').show();
		}, 100);
		}
		setTimeout(function(){
		$('.crouselContainer').show();
		
		}, 200);
		/*$(window).bind('orientationchange', function() { 
		$('#carousel').resize();
		$('#carousel').data("flexslider").flexAnimate(1, true, true);
		});*/
		$(ref.container).find('#content-slider').find('li').on('click',ref.loadContent);
		
		// onload selected with background color
		/*$(ref.container).find('#content-slider').find('li').first('li').click();		
		$(ref.container).find('#content-slider').find('li').first('li').addClass("selected");
		$(ref.container).find('#content-slider').find('li').first('li').addClass("tabSelected");*/
		//$(this).addClass('tabSelected');
		
		// code for instruction
		var instructionHead = $(ref.xml).find('instruction').find('head_content').text();
		var instructionParagraph = $(ref.xml).find('instruction').find('para_content').text();
		$(ref.container).find('#tab_content').find('.container').find('#tabcontentHeading').html(instructionHead);
		//alert(instructionParagraph)
		$(ref.container).find('#tab_content').find('.container').find('#tabParagraph').html(instructionParagraph);
		// end 
		
		// code for nicescroll bar
				if(isMobile.any()){
				
				}else{
                var obj = $(ref.container).find('.tabs-container').find('#scrolltabcontent').find('#tabParagraph');				
                setTimeout(function() {
                    window.shell.attachScrollBar(obj, 8, 100, '#cccccc', '#0090DA')
					$(ref.container).find('.tabs-container').find('#scrolltabcontent').find('#tabParagraph').getNiceScroll().show();	//$(ref.container).find('.tabs-container').find('#scrolltabcontent').find('#tabParagraph').getNiceScroll().hide();
                }, 1000);
				}
                // code for nicescroll bar ends
		
		
		$(ref.container).find("#content-slider").find('li').on('click',function(){
			
			
			$(this).addClass('selected');
			
			$(this).siblings('li').removeClass('selected');
		});	
		
	}
	
	ClickRevealTemplate.prototype.loadContent = function(){
		//alert("jklj");
		var contentID = $(this).attr('id').split('_')[1];
		
		//alert(contentID);
		$(this).addClass('tabSelected');
		//alert($(ref.xml).find('thumbsnail').find('thumb_content').eq(contentID).find('imageVisited').text())
		for(var i=0; i<$(ref.xml).find('thumbsnail').find('thumb_content').length; i++){
		
		$(ref.container).find('#content-slider').find('#carousal_' + i).find('img.thumbImage').attr('src', $(ref.xml).find('thumbsnail').find('thumb_content').eq(i).find('image').text())
		
		}
		
		
		/*$(ref.xml).find('thumbsnail').find('thumb_content').each(function(index, val){
			$(ref.container).find('#content-slider').find('img.thumbImage').attr('src', $(ref.xml).find('thumbsnail').find('thumb_content').eq(index).find('image').text())
		})*/
		
		
		$(this).find('img.thumbImage').attr('src', $(ref.xml).find('thumbsnail').find('thumb_content').eq(contentID).find('imageVisited').text())
		
		
		
		var tabHeading = $(ref.xml).find('tabs').eq(contentID).find('headerContent').text();
		var tabParagraph = $(ref.xml).find('tabs').eq(contentID).find('paragraphContent').text();
		$(ref.container).find('#tab_content').find('.container').find('#tabcontentHeading').html(tabHeading);
		$(ref.container).find('#tab_content').find('.container').find('#tabParagraph').html(tabParagraph);
		$(this).find('.visitedIcon').show();
		$(ref.container).find('.tabs-container').find('#scrolltabcontent').find('#tabParagraph').getNiceScroll().show();
		$(ref.container).find('.tabs-container').find('#scrolltabcontent').find('#tabParagraph').getNiceScroll().resize();
		$(ref.container).find('.tabs-container').find('#scrolltabcontent').find('#tabParagraph').scrollTop(0);
		if($(ref.container).find('.content-item').length == $(ref.container).find('.tabSelected').length){
			window.shell.updateVisitedPages(globalCurTopic, globalCurPage);
		}
		
	}
		this.pageLoaded();
	}
	
	return ClickRevealTemplate;

	});