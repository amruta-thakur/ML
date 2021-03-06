define([], function() {
    function ScenerioTemplate() {
        this.xml = null;
        this.situationNo = null;
        this.situationArray = [];
        this.situationID = 0;
        this.correctOptionId = '';
        this.points = 0;
        //this.ShellRef;
        this.calculatepercentage;
        this.correctsituationAnswer = [];
        this.showdetailsNo = null;
        //this.audioDurationArray = [0, 0, 0, 0, 0];
        this.personaudioCompletedArray = [false, false, false, false, false];
        this.endconversioncompleted = false;
    }
    ScenerioTemplate.prototype = new Util();
    ScenerioTemplate.prototype.constructor = ScenerioTemplate;
    ScenerioTemplate.prototype.init = function(xmlName) {
        var ref = this;
        this.container = this.getPageContainer();
		$('#min').html('00');
            $('#sec').html('00');
        $(ref.container).find(".mcqBackBtn").click(function() {
            
			$(ref.container).find('#audioIntro').attr('src', '');
            $(ref.container).find('#audioPerson').attr('src', '');
            $(ref.container).find('#audioEnding').attr('src', '');
            Clock.totalSeconds = 0;
			$(ref.container).hide();
            $('.fixed_block').show();
            $('#shellContainer_content_box').removeClass('changingPadding');
		});
        $(ref.container).find(".scenerioBackBtn").click(function() {
            $(ref.container).hide();
			//alert("1111")
            $('.fixed_block').show();
            $('#shellContainer_content_box').removeClass('changingPadding');
            $(ref.container).find('#audioIntro').attr('src', '');
            $(ref.container).find('#audioPerson').attr('src', '');
            $(ref.container).find('#audioEnding').attr('src', '');
            Clock.totalSeconds = 0;
        });
        setTimeout(function() {
            ref.loadXML(xmlName);
        }, 300);
        //load xml
        ScenerioTemplate.prototype.loadXML = function(xmlNameRef) {
            var ref = this;
            $.ajax({
                type: "GET",
                url: "data/" + xmlNameRef + ".xml",
                dataType: "xml",
                success: function(xml) {
                    ref.xml = xml
                    
					if($(ref.xml).find('transcript').length > 0){
					var transcriptText = $(ref.xml).find('transcript').text();
						$('#contentTab_2').html(transcriptText)
					}
					if($(ref.xml).find('resources').length > 0){
						var resourcesText = $(ref.xml).find('resources').text();
						$('#contentTab_1').html(resourcesText)
					}
					
					
					
					ref.situationNo = $(xml).find('situation').length;
                    for (var i = 0; i < ref.situationNo; i++) {
                        ref.situationArray.push(-1);
                    }
					//alert(Clock.stopInterVal)
					Clock.stopInterVal();
                    ref.loadstartscreen();					
					
					// code for nicescroll bar
					if(isMobile.any()){
					
					}else{
					var obj1 = $(ref.container).find('.scenerio-bg').find('.hint_popup').find('.hint-scroll');
					
					setTimeout(function() {
					try{
						window.shell.attachScrollBar(obj1, 8, 100, '#cccccc', '#0090DA');
						//$(ref.container).find('.scenerio-bg').find('.hint_popup').find('.hint-scroll').getNiceScroll().show();
						}catch(e){
						
						}
					}, 600);
					}
					// code for nicescroll bar ends
					
                }
            });
        }
        ScenerioTemplate.prototype.loadstartscreen = function() {
            var ref = this;
            ref.personaudioCompletedArray = [false, false, false, false, false];
            ref.endconversioncompleted = false;
            Clock.totalSeconds = 0;
            Clock.pause();
			ref.situationID = 0;
            window.shell.audioDurationArray = [0, 0, 0, 0, 0];
            $('#min').html('00');
            $('#sec').html('00');
			//alert("ccccc")
            $(ref.container).find('.stopBtn').on('click', ref.stopAudio);
            $(ref.container).find('.playBtn').on('click', ref.playAudio);
            $(ref.container).find('.feedback_continue').off('click')
            instructionContent = $(ref.xml).find('instructionText').text();
            $(ref.container).find('.popup').find('.container').find('div').html(instructionContent);
            $(ref.container).find('#startCall_btn').on('click', function() {
                $(this).off('click');
                //alert("22222222")
                
                
				if($(ref.xml).find('introAudio').attr('required') == "true"){
				$(ref.container).find('.startscreen').css('display', 'none');
                $(ref.container).find('.scenerio-model-dial').css('display', 'block');
				ref.loadAudio();
				}else{
				ref.loadpersonaudio();
				}
            });
			
			
        }
        // play intro auto (default)
        ScenerioTemplate.prototype.loadAudio = function() {
            var ref = this;
            ref.audioIntroElement = document.getElementById('audioIntro');
            var introAudio = $(ref.xml).find('introAudio').text();
            $(ref.container).find('#audioIntro').attr('src', introAudio);
            ref.audioIntroElement.play();
			ref.audioElementPerson = document.getElementById('audioPerson');
            $(ref.container).find('#audioPerson').attr('src', '');
            
            $(ref.container).find('#continue_personaudio_btn').on('click', function() {
                $(this).off('click');
                ref.loadpersonaudio();
            });
        }
        // remove intro audio and play person audio when click on continue button
        // remove intro audio and play person audio when click on continue button
        ScenerioTemplate.prototype.loadpersonaudio = function() {
            var ref = this;
            $(ref.container).find('.scenerio-model-dial').css('display', 'none');
			$(ref.container).find('.startscreen').css('display', 'none');
            $(ref.container).find('.continue_screen').css('display', 'block');
            $('#stopBtn').show();
            $('#playBtn').hide();
            $(ref.container).find('.timeSlot').show();
            $(ref.container).find('#audioIntro').attr('src', '');
            $(ref.container).find('#continue_nextscreen_btn').addClass('disable');
            ref.audioElementPerson = document.getElementById('audioPerson');
            var personAudio = $(ref.xml).find('situation').eq(ref.situationID).find('audio').text();
            $(ref.container).find('#audioPerson').attr('src', personAudio);
			setTimeout(function() {
                    ref.audioElementPerson.play();
                }, 500);
            ref.audioElementPerson.onloadedmetadata = function() {
                var audioDuration = ref.audioElementPerson.duration;
                if (ref.personaudioCompletedArray[ref.situationID] == true) {} else {
                    Clock.start(audioDuration, ref.situationID);
                }
                
            };
            ref.audioElementPerson.onended = function() {
                ref.personaudioCompletedArray[ref.situationID] = true;
                $('#playBtn').show();
                $('#stopBtn').hide();
				$(ref.container).find('.cyu-screen').find('#stopBtnCyu').hide();
            $(ref.container).find('.cyu-screen').find('#playBtnCyu').show();
            };
            $(ref.container).find('#continue_nextscreen_btn').on('click', function() {
                if ($(this).hasClass('disable')) {
                    return;
                }
				$(this).off('click');
                $(ref.container).find('.continue_screen').css('display', 'none');
                ref.audioElementPerson.pause();
                ref.audioElementPerson.currentTime = 0;
                $(ref.container).find('.cyu-screen').css('display', 'block');
                ref.cyuoptionscreen();
            });


        }
        /*var Clock = {
            totalSeconds: 0,
            start: function(audioDurationRef) {
                var self = this;
                console.log("called ")
                this.interval = setInterval(function() {
                    ref.audioDurationArray[ref.situationID] = audioDurationRef;
                    var totalDuration = 0;
                    console.log("duration array " + ref.audioDurationArray)
                    for (var i = 0; i < ref.audioDurationArray.length; i++) {
                        totalDuration = totalDuration + ref.audioDurationArray[i];
                    }
                    //console.log(totalDuration)
                    self.totalSeconds += 1;
                    var customseconds = parseInt(self.totalSeconds % 60);
                    var customMinutes = Math.floor(self.totalSeconds / 60 % 60);
                    //console.log(customseconds)
                    if (customseconds < 10) {
                        $(ref.container).find(".second").text("0" + customseconds);
                    } else {
                        $(ref.container).find(".second").text(customseconds);
                    }
                    if (customMinutes < 10) {
                        $(ref.container).find(".minute").text("0" + customMinutes);
                    } else {
                        $(ref.container).find(".minute").text(customMinutes);
                    }
                    //console.log(self.totalSeconds + " ::: " + totalDuration)
                    if (self.totalSeconds >= totalDuration) {
                        Clock.pause();
                        $(ref.container).find('#continue_nextscreen_btn').removeClass('disable');
                    }
                }, 1000);
            },
            pause: function() {
                clearInterval(this.interval);
                delete this.interval;
            },
            resume: function() {
                if (!this.interval) this.start();
            },
			stopInterVal:function(){
				clearInterval(this.interval); 
				return false;
			}
			

        };*/
        ScenerioTemplate.prototype.playAudio = function() {
            $(this).hide();
            $(this).siblings('div').show();
            playBtnid = $(this).attr('id');
            if (playBtnid == "endplayBtn") {
                var audioDuration = ref.audioEndingElement.duration;
                ref.audioEndingElement.play();
				//alert("111 " + ref.endconversioncompleted)
				if (ref.endconversioncompleted == true) {} else {
                Clock.start(audioDuration, ref.situationID);
				}
            } else {
                var audioDuration = ref.audioElementPerson.duration;
                ref.audioElementPerson.play();
				//alert("222 " + ref.personaudioCompletedArray[ref.situationID])
				if (ref.personaudioCompletedArray[ref.situationID] == true) {} else {
                Clock.start(audioDuration, ref.situationID);
				}
			
			}
            //console.log(audioDuration)
            
        }
        ScenerioTemplate.prototype.stopAudio = function() {
            var stopBtnid = $(this).attr('id');
            //alert(stopBtnid)
            if (stopBtnid == "endstopBtn") {
                ref.audioEndingElement.pause();
            } else {
                ref.audioElementPerson.pause();
            }
            $(this).hide();
            $(this).siblings('div').show();
            Clock.pause();
        }
        // enable click event on continue button
        function continueClick() {
            var btn_obj = document.getElementById('continue_nextscreen_btn');
            btn_obj.style.pointerEvents = 'auto';
        }
        ScenerioTemplate.prototype.cyuoptionscreen = function() {
            var cyuOptionnno = $(ref.xml).find('situation').eq(ref.situationID).find('cyu').find('option').length;
            $(ref.container).find('.cyu-screen').find('#stopBtnCyu').hide();
            $(ref.container).find('.cyu-screen').find('#playBtnCyu').show();
            var str = '';
            var img = '';
            var hint = '';
            var iconspace = '';
            var positivefeedback = '';
            var negativefeedback = '';
            hint += '<h4 id="hint_heading">Hint</h4>'
            hint += '<span class="ion-ios-close-outline" id="close_hint" data-dismiss="modal" aria-label="Close"></span>'
            hint += '<hr id="hint_separation">'
            hint += '<div id="hint_content"><div id="hintscroll" class="hintScrollClass">' + $(ref.xml).find('situation').eq(ref.situationID).find('hint').text() + '</div></div>'
            positivefeedback += '<h2 id="positivefeedback_heading">Correct</h2>';
            positivefeedback += '<div id="positivefeedbackcontent">' + $(ref.xml).find('situation').eq(ref.situationID).find('positivefeedback_content').text() + '</div>'
            positivefeedback += '<div class="btn btn-info custom-btn" id="continue_withpositiveresponse_btn">Continue</div>'
            negativefeedback += '<h2 id="negativefeedback_heading">Incorrect</h2>';
			
            negativefeedback += '<div id="negativefeedbackcontent">' + $(ref.xml).find('situation').eq(ref.situationID).find('negativefeedback_content').text() + '</div>'
            negativefeedback += '<div class="btn btn-info custom-btn" id="continue_withnegativeresponse_btn">Continue</div>'

            img += '<img src="' + $(ref.xml).find('situation').eq(ref.situationID).find('image').text() + '"class="img-rounded" id ="cyuContentImage" alt="cyu_calling_person"/>'
            iconspace += '<hr id="image_break">'
            iconspace += '<span id="messageicons"><img src="templates/scenerio/images/score.png"/></span>';
            iconspace += '<span class="points badge badge-pill badge-light">' + ref.points + '</span>'
            iconspace += '<span id="hinticons"><img src="templates/scenerio/images/hint.png"/></span>'
            for (var i = 0; i < cyuOptionnno; i++) {
                str += '<div class="card" id="opt_' + i + '">';
                str += '<div class="card-body">';
                str += '<p class="card-text">' + $(ref.xml).find('situation').eq(ref.situationID).find('cyu').find('option').eq(i).text() + '</p>';
                str += '</div>';
                str += '</div>';
            }
            $(ref.container).find(".cyu_image").html(img);
            $(ref.container).find('#screenoption').html(str);
            $(ref.container).find('#iconspace').html(iconspace);
            $(ref.container).find('.hint_popup').html(hint);
            $(ref.container).find('.positivefeedback').html(positivefeedback);
            $(ref.container).find('.negativefeedback').html(negativefeedback);
				if(isMobile.any()){
				
				}else{
                var obj = $(ref.container).find('#hint_content').find('#hintscroll');				
                setTimeout(function() {
                    try{
					window.shell.attachScrollBar(obj, 8, 100, '#cccccc', '#0090DA')
					//$(ref.container).find('#hint_content').find('#hintscroll').getNiceScroll().hide();
					}
					catch(e){
					}
					
                }, 1000);
				}
				
            $(ref.container).find("#hinticons").on('click', function() {
                $(ref.container).find('.hint_popup').css('display', 'block');
				// code for nicescroll bar			
				$(ref.container).find('#hint_content').find('#hintscroll').getNiceScroll().show();
				$(ref.container).find('#hint_content').find('#hintscroll').getNiceScroll().resize();
				$(ref.container).find('#hint_content').find('#hintscroll').scrollTop(0);
				// code for nicescroll bar ends
            });

            $(ref.container).find("#close_hint").on('click', function() {
			$(ref.container).find('#hint_content').find('#hintscroll').getNiceScroll().hide();
                $(ref.container).find('.hint_popup').css('display', 'none');
				
            });
            $(ref.container).find('.card').on('click', function() {
                correctOption = $(this).attr('id');
                ref.correctOptionId = $(this).attr('id').split('_')[1];
                $(ref.container).find('.card-text').css('color', '#000');
                $(ref.container).find('.card-text').css('font-weight', 'normal');
                $(ref.container).find('#' + correctOption).find('.card-text').css('font-weight', 'bold')
                $(ref.container).find('#' + correctOption).find('.card-text').css('color', '#3b91ca');
                $(ref.container).find("#continue_nextsituation_btn").css('pointer-events', 'auto');
                $(ref.container).find("#continue_nextsituation_btn").css('background-color', '#0090DA');
                $(ref.container).find("#continue_nextsituation_btn").css('border-color', '#0090DA');
            });
            $(ref.container).find('#continue_nextsituation_btn').on('click', function() {
                $(this).off('click');
                var correctAnswer = $(ref.xml).find('situation').eq(ref.situationID).find('cyu').attr('correct');
                if (ref.correctOptionId == correctAnswer) {
                    $(ref.container).find(".positivefeedback").css('display', 'block');
                    $(ref.container).find("#hinticons").css('pointer-events', 'none');
                    ref.points++;
                    $(ref.container).find('.points').removeClass('badge badge-pill badge-light');
                    $(ref.container).find('.points').addClass('badge badge-pill badge-warning');
                    $(ref.container).find('.points').html(ref.points);
                    ref.correctsituationAnswer.splice(ref.situationID, 0, 1);
                } else {
                    $(ref.container).find(".negativefeedback").css('display', 'block');
                    $(ref.container).find("#hinticons").css('pointer-events', 'none');
                    ref.correctsituationAnswer.splice(ref.situationID, 0, 0);
                   // console.log(ref.correctsituationAnswer);
                }

                $(ref.container).find('#continue_withnegativeresponse_btn,#continue_withpositiveresponse_btn').on('click', function() {
                    $(this).off('click')
                    ref.loadNextsituation();

                });

            });
			
			// code for nicescroll bar
					if(isMobile.any()){
					
					}else{
					var obj1 = $(ref.container).find('.scenerio-bg').find('.hint_popup').find('.hint-scroll');
					
					setTimeout(function() {
						try{
						window.shell.attachScrollBar(obj1, 8, 100, '#cccccc', '#0090DA');
						//$(ref.container).find('.scenerio-bg').find('.hint_popup').find('.hint-scroll').getNiceScroll().show();
					}catch(e){
					
					}
					}, 600);
					}
					// code for nicescroll bar ends

        }
        var startTimeInt = 10;
        var currentTimeInt = startTimeInt;
        var interval = undefined;
        // start the timer
        function startCounter() {
            if (!interval) {
                document.getElementById('mins').innerHTML = currentTimeInt;
                interval = setInterval(newNumber, 1000) // set an interval
            }
        }
        // stop
        function stopCounter() {
            // clear the interval
            clearInterval(interval)
            interval = undefined;
        }
        // reset the timer
        function resetCounter() {
            currentTimeInt = startTimeInt;
            document.getElementById('mins').innerHTML = currentTimeInt;

        }
        // change the time and handle end of time event
        function newNumber() {
            currentTimeInt--; // decrement the current time
            document.getElementById('mins').innerHTML = currentTimeInt;
            if (currentTimeInt == 0) {
               // console.log("Done");
                stopCounter();
            }
        }
        ScenerioTemplate.prototype.loadNextsituation = function() {
            ref.situationID++;
            if (ref.situationID < ref.situationNo) {
                $(ref.container).find('.continue_screen').show();
                $(ref.container).find('.cyu-screen').hide();
                ref.resetCyuScreen();
                ref.loadpersonaudio();
            } else {
                ref.feedbackpercentage();
				if($(ref.xml).find('showendingscreen').text() == "true"){
                    ref.endingConversationScreen();
                }else{
                    ref.feedbackscreen();
                }
            }
        }
        ScenerioTemplate.prototype.resetCyuScreen = function() {
            $(ref.container).find('.hint_popup').hide();
            $(ref.container).find('.positivefeedback').hide();
            $(ref.container).find('.negativefeedback').hide();
            $(ref.container).find("#continue_nextsituation_btn").css('pointer-events', 'none');
            $(ref.container).find("#continue_nextsituation_btn").css('background-color', '#A7A8AA');
            $(ref.container).find("#continue_nextsituation_btn").css('border-color', '#A7A8AA');
        }
        ScenerioTemplate.prototype.endingConversationScreen = function() {
            var ref = this;
            $('#stopBtn').show();
            $('#playBtn').hide();
			$('#continue_feedbackscreen_btn').addClass('disable');
            ref.audioEndingElement = document.getElementById('audioEnding');
            $(ref.container).find('.cyu-screen').hide();
            $(ref.container).find('.endingConversation').show();
            $(ref.container).find('#audioPerson').attr('src', '');
			//alert(ref.calculatepercentage)
			if(Math.round(ref.calculatepercentage) >= 100){
				var endingAudio = $(ref.xml).find('endingConversationAudio').text();
			}else{
				var endingAudio = $(ref.xml).find('endingConversationAudioNegative').text();
			}
			
            $(ref.container).find('#audioEnding').attr('src', endingAudio);
			
            ref.audioElementPerson = document.getElementById('audioPerson');
            setTimeout(function() {
                    ref.audioEndingElement.play();
                }, 500);
			//var personAudio = $(ref.xml).find('situation').eq(ref.situationID).find('audio').text();
            ref.audioEndingElement.onloadedmetadata = function() {
                var audioDuration = ref.audioEndingElement.duration;
				//alert(ref.endconversioncompleted)
                if (ref.endconversioncompleted == true) {
				
				} else {
                    Clock.start(audioDuration, ref.situationID);
                }
                
            }
            ref.audioEndingElement.onended = function() {
                $('#endplayBtn').show();
                $('#endstopBtn').hide();
				$('#continue_feedbackscreen_btn').removeClass('disable');
                ref.endconversioncompleted = true;
            }
            $(ref.container).find('#continue_feedbackscreen_btn').on('click', function() {
			if($(this).hasClass('disable')){
				return;
			}
			$(this).off('click');
			
			//alert("working")

			Clock.pause();
                Clock.totalSeconds = 0;
                ref.feedbackscreen();
            })
        }
        ScenerioTemplate.prototype.feedbackpercentage = function() {
            var ref = this;
            ref.calculatepercentage = Math.round((ref.points * 100) / ref.situationNo);
        }
        ScenerioTemplate.prototype.feedbackscreen = function() {
            var ref = this;
            var feedback = '';
            $(ref.container).find('#audioEnding').attr('src', '');
            $(ref.container).find('.endingConversation').hide();
			$(ref.container).find('.cyu-screen').hide();
            $(ref.container).find('.feedbackscreen').show();
            var dataRequired = 0;
            var colorRequired = 0;
            if (ref.points == ref.situationNo) {
                dataRequired = ref.calculatepercentage;
                colorRequired = '#ccc,#A4CE4E';
                $(ref.container).find("#scenerioProgressbar").attr('data-percent', ref.calculatepercentage);
                $(ref.container).find("#scenerioProgressbar").attr('data-color', colorRequired);
                $(ref.container).find("#scenerioProgressbar").loading(dataRequired, colorRequired);
                feedback += '<h4>Congratulations!</h4>';
                feedback += $(ref.xml).find('finalpositivefeedback').text();
                $(ref.container).find("#feedback_continue").css('display', 'block');
				$(ref.container).find("#feedback_Tryagain").css('display', 'none');
				
                $(ref.container).find("#feedback_continue").on('click', function() {
                    $(this).off('click');
					if(isMobile.any()){
					$(ref.container).hide();
					$('.fixed_block').show();
					$('#shellContainer_content_box').removeClass('changingPadding');
					
					}else{
                    window.shell.setNextPage(shell);
					}
				})
            } else {
                dataRequired = ref.calculatepercentage;
                colorRequired = '#ccc,#DB0A5B';
                $(ref.container).find("#scenerioProgressbar").attr('data-percent', ref.calculatepercentage);
                $(ref.container).find("#scenerioProgressbar").attr('data-color', '#ccc,#DB0A5B');
                $(ref.container).find("#scenerioProgressbar").loading(dataRequired, colorRequired);
                feedback = $(ref.xml).find('finalnegativefeedback').text();
                $(ref.container).find("#feedback_Tryagain").css('display', 'block');
				$(ref.container).find("#feedback_continue").css('display', 'none');
            }
            window.shell.updateVisitedPages(globalCurTopic, globalCurPage);
            $(ref.container).find('.popup_feedbackscreen').find('#feedbackContent').html(feedback);
            $(ref.container).find('#feedback_showdetails').on('click', function() {
                ref.showdetailscreen();
            });
            $(ref.container).find('#feedback_Tryagain').on('click', function() {
                $(this).off('click');
                $(ref.container).find('.stopBtn').off('click');
                $(ref.container).find('.playBtn').off('click');
                $(ref.container).find('.feedbackscreen').hide();
                $(ref.container).find('.cyu-screen').hide();
                $(ref.container).find("#scenerioProgressbar").attr('data-percent', 0)
                dataRequired = 0;
                colorRequired = '#ccc,#ccc';
                $(ref.container).find("#scenerioProgressbar").loading(dataRequired, colorRequired);
                ref.situationID = 0;
                ref.correctsituationAnswer = [];
                ref.situationArray = [];
                ref.points = 0;
                $(ref.container).find('.startscreen').show();
                ref.resetCyuScreen();
                ref.loadstartscreen();
            });
        }
        ScenerioTemplate.prototype.showdetailscreen = function() {
            var ref = this;
            var str = '';
            $(ref.container).find('.showdetailfeedbackscreen').show();
            ref.showdetailsNo = $(ref.xml).find('showdetails').length;
            for (var k = 0; k <= ref.showdetailsNo - 1; k++) {
                str += '<div class="row">'
                if (this.correctsituationAnswer[k] == 1) {
                    str += '<div class="col">' + $(ref.xml).find('showdetailssituations').find('showdetails').eq(k).text() + '</div>'
                    str += '<div class="col"><img src="templates/scenerio/images/thumbsUp.png"/></div>'
                } else {
                    str += '<div class="col" style="color:#DB0A5B;">' + $(ref.xml).find('showdetailssituations').find('showdetails').eq(k).text() + '</div>'
                    str += '<div class="col"><img src="templates/scenerio/images/thumbsDown.png"/></div>'
                }
                str += "</div>"
            }

            $(ref.container).find('.showdetails_content').html(str);
            $(ref.container).find("#close_showdetails").on('click', function() {
                $(ref.container).find('.showdetailfeedbackscreen').hide();
            });
        }

    }
    return ScenerioTemplate;
});