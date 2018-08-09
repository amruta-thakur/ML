define([], function() {

    function McqTemplate() {
        this.xml = null;
        this.totalOptions = 3;
        this.correctOption;
        this.selectedOption = 0;
        this.container = null;
        this.attempts = 0;
        this.totalAttempts;
        this.xmlName;

    }

    McqTemplate.prototype = new Util();
    McqTemplate.prototype.constructor = McqTemplate;
    McqTemplate.prototype.init = function(xmlName) {
        //alert("init working")
        var ref = this;
        //this.xmlName = xmlName; 
        this.container = this.getPageContainer();

        $(ref.container).find(".mcqBackBtn").click(function() {
            $(ref.container).hide();
            $('.fixed_block').show();
            $('#shellContainer_content_box').removeClass('changingPadding');
        });

        ref.LoadXml(xmlName);

        //alert(this.container)
        this.pageLoaded();
    }

    McqTemplate.prototype.LoadXml = function(xmlNameRef) {
        //alert("pfa")
        var ref = this;
        $.ajax({
            type: "GET",
            url: "data/" + xmlNameRef + ".xml",
            dataType: "xml",
            success: function(xml) {
                //alert(xml)
                ref.xml = xml;
                // custom attribute multipleAnswer
                ref.isMultipleAnswer = $(ref.xml).find('options').attr('multipleAnswer');
                console.log("isMultipleAnswer",ref.isMultipleAnswer);
                if(!ref.isMultipleAnswer) {
                	ref.correctOption = parseInt($(ref.xml).find('options').attr('answer'));
                } else {
                	ref.correctOption = $(ref.xml).find('options').attr('multipleAnswer');

                }
                ref.totalAttempts = parseInt($(ref.xml).find('options').attr('attempts'));
                //alert(ref.attempts)
                //alert("type of " + typeof ref.correctOption + " ---- " + ref.correctOption)
                //alert(ref.xml)
                ref.createOptions();
                ref.createFeedbacks();
            }

        });

    }

    McqTemplate.prototype.createFeedbacks = function() {
        var ref = this;
        var feedbackLength = $(ref.xml).find('feedbacks').find('feedback').length;
        //alert("feedback length is " + feedbackLength)
        var str = '';

        for (var i = 0; i < feedbackLength; i++) {
            str += '<div class="modal  fade modal-cyu ' + $(ref.xml).find('feedbacks').find('feedback').eq(i).attr('type') + '" id="modal-cyu-option-' + (i + 1) + '" tabindex="-1" role="dialog" aria-hidden="true">';
            str += '<div class="modal-dialog" role="document">';
            str += '<div class="modal-content">';
            str += '<div class="modal-header" >';
            str += '<h5 class="modal-title text-uppercase">' + $(ref.xml).find('feedbacks').find('feedback').eq(i).attr('headerText') + '</h5>';
            str += '</div>';
            str += '<div class="modal-body pt-4">' + $(ref.xml).find('feedbacks').find('feedback').eq(i).text() + '</div>';
            str += '<div class="modal-footer mb-3">';
            str += '<button type="button" class="btn btn-primary btn-lg mx-auto"  aria-label="Close" data-dismiss="modal">' + $(ref.xml).find('feedbacks').find('feedback').eq(i).attr('btnText') + '</button>'
            str += '</div></div></div></div>';
        }

        $(ref.container).find('.feedbackBox').html(str);

        /*<div class="modal  fade modal-cyu" id="modal-cyu-option-1" tabindex="-1" role="dialog" aria-hidden="true">
        	<div class="modal-dialog" role="document">
        		<div class="modal-content">
        			<div class="modal-header" >
        				<h5 class="modal-title text-uppercase">Incorrect</h5>
        			</div>
        			<div class="modal-body pt-4">
        				This isn’t the best response. You should ideally start the conversation with a warm greeting. It is important to create a strong, positive first impression to establish a relationship with the customer.
        			</div>

        			<div class="modal-footer mb-3">
        				<button type="button" class="btn btn-primary btn-lg mx-auto"  aria-label="Close" data-dismiss="modal">
        					TRY AGAIN
        				</button>
        			</div>

        		</div>
        	</div>
        </div>*/





    }

    McqTemplate.prototype.createOptions = function() {
        var ref = this;
        var optionLength = $(ref.xml).find('options').find('option').length;
        var questionText = $(ref.xml).find('questionText').text();
        var instructionText = $(ref.xml).find('instructionText').text();
        //alert("option length are " + optionLength)
        $('.mcq-bg').find('#qText').html(questionText);
        $('.mcq-bg').find('#instruction_text').html(instructionText);
        var str = '';
        str += '<ul class="cyu-options list-unstyled  cyu-options">';
        //alert(optionLength)
        for (var i = 0; i < optionLength; i++) {
            str += '<li id="opt_' + (i + 1) + '" class="_item p-3 cyu-option" data-index="' + (i + 1) + '">'
            str += '<div class="row">';
            str += '<div class="circle_contianer">';
            if (!ref.isMultipleAnswer)
                str += '<label class="circle"></label>';
            else
                str += '<label class="box"></label>';
            str += '</div>'
            str += '<div class="option_contianer">' + $(ref.xml).find('options').find('option').eq(i).text(); + '</div>';
            str += '</div>';
            str += '</li>';

        }
        str += '<div class="clearfix"></div>';
        str += '<li class="mt-3 text-center">';
        str += '<div class="btn btn-primary btn-lg cyu-submit-btn disabled">SUBMIT</div>';
        str += '</li>';
        str += '</ul>';
        console.log($(ref.container))
        console.log($(ref.container).find('#cyu_block'))
        $(ref.container).find('#cyu_block').html(str);
        ref.addFunctionality();


    }


    McqTemplate.prototype.addFunctionality = function() {
        var ref = this;

        $(ref.container).find(".modal-cyu").modal({
            backdrop: false,
            show: false
        });


        $(ref.container).find(".cyu-options .cyu-option").click(function() {
            if ($(this).hasClass('cyuDisabled')) {
                return;
            }

            if (!ref.isMultipleAnswer) {
	            $(this).addClass('selected');
	            $(this).siblings('li').removeClass('selected');
        	} else {
        		if ($(this).hasClass('selected'))
        			$(this).removeClass('selected');
        		else
        		   $(this).addClass('selected');
        	}
            $(ref.container).find(".cyu-submit-btn").removeClass("disabled");
            if(!ref.isMultipleAnswer){
            	ref.selectedOption = parseInt($(this).attr("data-index"), 10);
            } else {
            	var options ="";
				for(i=0; i<$('.selected').length; i++){
					options +=$('.selected').eq(i).attr('data-index')+0;
				}
				ref.selectedOption = options;
            }
            //alert("selected option are " + ref.selectedOption)
        });



        $(ref.container).find(".mcqBackBtn").click(function() {
            $(ref.container).html('');
            $(ref.container).hide();

            $('.fixed_block').show();
            $('#shellContainer_content_box').removeClass('changingPadding');



        });


        $(ref.container).find(".cyu-submit-btn").on('click', function() {

            if ($(this).hasClass('disabled')) {
                return;
            }
            //alert(ref.selectedOption + " ---- " + ref.correctOption)
            if (ref.selectedOption == ref.correctOption) {

                $('.cyu-option').each(function() {
                    $(this).addClass('cyuDisabled');
                });

                $(this).addClass('disabled');
                $(ref.container).find(".feedbackBox").find('.correct').modal("show");
                window.shell.updateVisitedPages(globalCurTopic, globalCurPage);
                $(this).off('click');

            } else {
                 ref.attempts++;
                if (ref.attempts == ref.totalAttempts) {
                    $('.cyu-option').each(function() {
                        $(this).addClass('cyuDisabled');
                    });

                    $(this).addClass('disabled');
                    $(ref.container).find(".feedbackBox").find('.attemptOver').modal("show");
                    $(ref.container).find(".cyu-options .cyu-option").removeClass("selected");
                    if(!ref.isMultipleAnswer){
                     $(ref.container).find(".cyu-options .cyu-option[data-index='" + ref.correctOption + "']").addClass("selected");
                    } else {
                        var ansers = ref.correctOption.split('0');
                        ansers.splice(-1,1);
                        ansers.forEach(function(i) {
                            $(ref.container).find(".cyu-options .cyu-option[data-index='" + i + "']").addClass("selected");
                        })
                    }
                    window.shell.updateVisitedPages(globalCurTopic, globalCurPage);
                    $(this).off('click');
                } else {
                    if(ref.attempts <= ref.totalAttempts) {
                      $(ref.container).find(".feedbackBox").find('.inCorrect').modal("show");
                    }
                }

            }
        });

    }


    return McqTemplate;
});
