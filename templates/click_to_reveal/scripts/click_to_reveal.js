define([], function () {

	$.fn.center = function () {
   this.css("position","absolute");
   this.css("top", ( $(window).height() - this.height() ) / 2  + "px");
   //this.css("left", ( $(window).width() - this.width() ) / 2 + "px");
   return this;
}
	
	function ClickRevealTemplate() {
		this.xml = null;
		this.totalOptions = 3;
		this.correctOption = 1;
		this.selectedOption = 0;
		this.container = null;
		this.attempts = 0;
		this.globalThumb;
		
	}

	ClickRevealTemplate.prototype = new Util();
	ClickRevealTemplate.prototype.constructor = ClickRevealTemplate;
	ClickRevealTemplate.prototype.init = function (xmlName) {
		
		var ref = this;
		this.container = this.getPageContainer();
		
		$(ref.container).find(".clickToRevealBackBtn").click(function(){
			$(ref.container).hide();
			$('.fixed_block').show();
			$('#shellContainer_content_box').removeClass('changingPadding');
		});
		//$('.ctr-options').center();
		
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
				
				var thumbLength = $(xml).find("personal_info").find("node").length;				
				var popupLength = $(xml).find("personal_info").find("popup_container").length;
				
		
				var str = '';
				for(var i=0; i<thumbLength; i++){
					
					str+= '<div class="col-6 col-xs-3 col-sm-6 col-md-6 custom-col">';
					str+='<figure class="figure" id="personal_' + i + '" data-toggle="modal" data-target="#myModal" data-index="' + i + '">';
					str+='<img src="' + $(xml).find("personal_info").find("node").eq(i).find('image').text()  +'" class="figure-img img-fluid rounded" id="personal_y" alt="lights" >';
					str += '<img class="svgIcon hide" src="' + $(xml).find("personal_info").find("node").eq(i).find('imageVisited').text()+ '"><figcaption class="figure-caption">' + $(xml).find("personal_info").find("node").eq(i).find('caption').text()  + '</figcaption>'
					str += '</figure>';
					str +='</div>'
				}		
				$(ref.container).find('.container').find('.row').html(str);
				
				var strPop = '';
				for(var i=0; i<popupLength; i++){
					strPop += '<div class="modal fade modal-click_to_reveal" id="myModal_' + i +'" tabindex="-'+ i +'" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
					strPop += '<div class="modal_bg"></div>';
						strPop+= '<div class="modal-dialog modal-lg in-middle" role="document">';
							strPop+= '<div class="modal-content">';
								strPop+= '<span class="ion-ios-close-outline btnclose" data-dismiss="modal" aria-label="Close"></span>';
								strPop+= '<div class="modal-header">';
									strPop+= '<h2 class="modal-title" id="exampleModalLabel">' + $(xml).find("personal_info").find("popup_container").eq(i).find('head_content').text() + '</h2>';									
								strPop+= '</div>';
								strPop+= '<div class="modal-body">';
									strPop+= '<div><p>' +$(xml).find("personal_info").find('popup_container').eq(i).find("para_content").text() + '</p></div>';
								strPop+= '</div>';
							strPop+= '</div>';
						strPop+= '</div>';
					strPop+= '</div>';					
				}
				
				$(ref.container).find('.click_to_reveal').find('#modalwrapper').html(strPop);
								
				// model popup on mobile
				//$(ref.container).find('.click_to_reveal').find('.inst-popup-bg').find('#close-btn').on('click', closeModel);
				// end 
				
				// code for instruction with continue button
				var instructionStr = '';
				if(boolValue == true){
					instructionStr += '<div class="container padding-left-right-zero-custom">';
					instructionStr += '<h2>' + $(xml).find("personal_info").find("instruction").find("head_content").text() + '</h2>';
					instructionStr += '<div class="padding-left-right-zero-custom">' +$(xml).find("personal_info").find("instruction").find("para_content").text() + '</div>';
					
					instructionStr += '</div>';
				}
				$(ref.container).find('.click_to_reveal').find('#instructionScreen').html(instructionStr);
				$(ref.container).find('.click_to_reveal').find('#instraction-continue-btn').on('click', instructionContinue)
				// end
				
				$(ref.container).find('.container').find('.row').find('.figure').on('click', openModalPopup);
				
				
				// code for nicescroll bar				
				if(isMobile.any()){
				
				}else{
					
				var obj = $(ref.container).find('.modal-dialog').find('.modal-content').find('.modal-body').find('div');
				setTimeout(function() {
					
					//$('.nicescroll-rails').each(function(){
                      //          $(this).remove();
                        //        });
					try{
					window.shell.attachScrollBar(obj, 4, 100, '#fff', '#ff0000');
					}
					catch(e){
					
					}
				}, 1000);
				
				}
				// code for nicescroll bar ends
				
			}
		});
		
		
		function closePopup(){
			$(".btnclose").off('click');
			//alert(ref.globalThumb)
			$(ref.globalThumb).find('.svgIcon').show();
			//$(ref.globalThumb).addClass('selected');
			$(ref.container).find('.modal-dialog').find('.modal-content').find('.modal-body').find('div').getNiceScroll().hide();			
		}				
		
		function openModalPopup(){			
			$(this).addClass('selected');
			ref.globalThumb = $(this);
			$(".btnclose").on('click', closePopup);
			//$(this).find('.svgIcon').show();
			var modalID = $(this).attr('id').split('_')[1];
			$(ref.container).find('#modalwrapper').find("#myModal_" + modalID).modal("show");
			$(ref.container).find('#modalwrapper').find(".modal_bg").show();
			
			//alert($(ref.container).find('.figure').length + " :::: " + $(ref.container).find('.selected').length)
			if($(ref.container).find('.figure').length == $(ref.container).find('.selected').length){
			
			window.shell.updateVisitedPages(globalCurTopic, globalCurPage);
			}
			setTimeout(function(){
				$(ref.container).find('.modal-dialog').find('.modal-content').find('.modal-body').find('div').getNiceScroll().show();			
				//$(ref.container).find('.modal-dialog').find('.modal-content').find('.modal-body').find('div').getNiceScroll().scrollTop(0);
				$(ref.container).find('.modal-dialog').find('.modal-content').find('.modal-body').find('div').getNiceScroll().resize();
			}, 500);
			
			//prevent native touch activity like scrolling
			$('.modal_bg').on('touchstart touchmove', function(e){ 				 
				 e.preventDefault(); 
			});
		}
				
		$(ref.container).find(".ctrBackBtn").click(function(){
			$(ref.container).hide();
			$(ref.container).find('.fixed_block').show();
			$(ref.container).find('#shellContainer_content_box').removeClass('changingPadding');
		});
		
		// model popup on mobile
		/*function closeModel(){
			$(ref.container).find('.click_to_reveal').find('.inst-popup-bg').hide();
		}*/
		// end 
		
		// code for instruction screen block
		function instructionContinue(){
			$(ref.container).find('.click_to_reveal').find('.instruction-continue').hide();
			$(ref.container).find('.click_to_reveal').find('.thumbnail-boxes').show();
		}
		// end 
		
		this.pageLoaded();
	 }
	
	return ClickRevealTemplate;	

	});
	
	
	