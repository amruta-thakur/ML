define([], function() {

    function SequenceMcqTemplate() {
        this.originalXml = null;
        this.xml = null;
        this.currentTemplate = 0;
        this.totalOptions = 0;
        this.correctOption;
        this.selectedOption = 0;
        this.container = null;
        this.attempts = [];
        this.totalAttempts;
        this.xmlName;

    }

    SequenceMcqTemplate.prototype = new Util();
    SequenceMcqTemplate.prototype.constructor = SequenceMcqTemplate;
    SequenceMcqTemplate.prototype.init = function(xmlName) {
        var ref = this;
        this.container = this.getPageContainer();

        $(ref.container).find(".sequenceMcqBackBtn").click(function() {
            $(ref.container).hide();
            $('.fixed_block').show();
            $('#shellContainer_content_box').removeClass('changingPadding');
        });
        ref.originalXml = xmlName;
        ref.LoadXml(xmlName);
        this.pageLoaded();
    }

    SequenceMcqTemplate.prototype.LoadXml = function(xmlNameRef) {
        var ref = this;
        $.ajax({
            type: "GET",
            url: "data/" + xmlNameRef + ".xml",
            dataType: "xml",
            success: function(xml) {
                ref.xml = xml.getElementsByTagName('sequenceSection')[ref.currentTemplate];
                // custom attribute multipleAnswer
                ref.isMultipleAnswer = $(ref.xml).find('options').attr('multipleAnswer');
                if(!ref.isMultipleAnswer) {
                	ref.correctOption = parseInt($(ref.xml).find('options').attr('answer'));
                } else {
                	ref.correctOption = $(ref.xml).find('options').attr('multipleAnswer');

                }
                if(!ref.totalOptions)
                    ref.totalOptions = xml.getElementsByTagName('sequenceSection').length;
                ref.attempts[ref.currentTemplate] = 0;
                ref.totalAttempts = parseInt($(ref.xml).find('options').attr('attempts'));
                ref.createOptions();
                ref.createFeedbacks();
            }

        });

    }

    SequenceMcqTemplate.prototype.createFeedbacks = function() {
        var ref = this;
        var feedbackLength = $(ref.xml).find('feedbacks').find('feedback').length;
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
            str += '<button type="button" class="btn btn-primary btn-lg mx-auto loadNext"  aria-label="Close" data-dismiss="modal">' + $(ref.xml).find('feedbacks').find('feedback').eq(i).attr('btnText') + '</button>'
            str += '</div></div></div></div>';
        }

        $(ref.container).find('.feedbackBox').html(str);
    }

    SequenceMcqTemplate.prototype.createOptions = function() {
        var ref = this;
        var optionLength = $(ref.xml).find('options').find('option').length;
        var questionText = $(ref.xml).find('questionText').text();
        var instructionText = $(ref.xml).find('instructionText').text();
        $('.sequenceMcq-bg').find('#qText').html(questionText);
        $('.sequenceMcq-bg').find('#instruction_text').html(instructionText);
        var str = '';
        str += '<ul class="cyu-options list-unstyled  cyu-options">';
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
        $(ref.container).find('#cyu_block').html(str);
        ref.addFunctionality();


    }


    SequenceMcqTemplate.prototype.addFunctionality = function() {
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
        });



        $(ref.container).find(".sequenceMcqBackBtn").click(function() {
            $(ref.container).html('');
            $(ref.container).hide();

            $('.fixed_block').show();
            $('#shellContainer_content_box').removeClass('changingPadding');



        });


        $(ref.container).find(".cyu-submit-btn").on('click', function() {

            if ($(this).hasClass('disabled')) {
                return;
            }
            if (ref.selectedOption == ref.correctOption) {

                $('.cyu-option').each(function() {
                    $(this).addClass('cyuDisabled');
                });

                $(this).addClass('disabled');
                $(ref.container).find(".feedbackBox").find('.correct').modal("show");

            } else {
                 ref.attempts[ref.currentTemplate]++;
                if (ref.attempts[ref.currentTemplate] == ref.totalAttempts) {
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
                        ansers.forEach(function(i) {
                            $(ref.container).find(".cyu-options .cyu-option[data-index='" + i + "']").addClass("selected");
                        })
                    }
                } else {
                    if(ref.attempts <= ref.totalAttempts) {
                      $(ref.container).find(".feedbackBox").find('.inCorrect').modal("show");
                    }
                }

            }
            $(ref.container).find(".loadNext").on('click', function(){
                ref.currentTemplate++;
                if(ref.currentTemplate < ref.totalOptions)
                    ref.LoadXml(ref.originalXml);
                else {
                    window.shell.updateVisitedPages(globalCurTopic, globalCurPage);
                    $(this).off('click');
                }
            });
        });

    }
    return SequenceMcqTemplate;
});
