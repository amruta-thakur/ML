'use strict';
define(['plugins/scorm/cookie','plugins/scorm/SCORM_API_wrapper'], function (Cookies) {

    function ScormModel()
    {
        var self = this;
        this.scorm = null;
        this.timer = null;
        this.totalTimeSpent = 0;
        this.timerDelay = 500;
        this.lmsMode = "";
        
        this.init = function(){
            this.scorm = pipwerks.SCORM;
            var bool = this.scorm.init();
            this.timer = setInterval(updateUserSpentTime,this.timerDelay);
            if(bool){
                this.lmsMode = "scorm";
                window.onbeforeunload = this.quit;
                window.onunload = this.quit;
                
                if(this.lesson_status().toLowerCase() == "not attempted"){
                    this.lesson_status("incomplete");
                    this.save();
                }
                
            }
            else{
                this.lmsMode = "cookie";
            }
        }
        this.getMode = function(){
            return this.lmsMode;
        }
        this.lesson_location = function(loc){
            if(loc)
            {
			//alert(this.lmsMode)
                if(this.lmsMode == "scorm"){
					alert("loc is " + loc)
					this.scorm.set("cmi.core.lesson_location", loc); 
                }else{
                    Cookies.set("lesson_location",loc);
                }
            }
            else
            {
                if(this.lmsMode == "scorm"){
                    return this.scorm.get("cmi.core.lesson_location");   
                }else{
                    return Cookies.get("lesson_location")?Cookies.get("lesson_location"):""; 
                }
            }
        }
        this.lesson_status = function(stat){
            if(stat)
            {
                if(this.lmsMode == "scorm"){
                    this.scorm.set("cmi.core.lesson_status", stat);  
                }else{
                    Cookies.set("lesson_status",stat);
                }
            }
            else
            {
                if(this.lmsMode == "scorm"){
                    return this.scorm.get("cmi.core.lesson_status"); 
                }else{
                    return Cookies.get("lesson_status")?Cookies.get("lesson_status"):"not attempted";  
                }
            }
        }
        this.suspend_data = function(data){
            if(data)
            {
                if(this.lmsMode == "scorm"){
                    this.scorm.set("cmi.suspend_data", data);   
                }else{
                    Cookies.set("suspend_data",data);
                }
            }
            else
            {
                if(this.lmsMode == "scorm"){
                    return this.scorm.get("cmi.suspend_data");
                }else{
                     return Cookies.get("suspend_data")?Cookies.get("suspend_data"):""; 
                }
            }
        }
        this.score = function(score){
            if(score)
            {
               if(this.lmsMode == "scorm"){
                    this.scorm.set("cmi.core.score.raw", score);   
                }else{
                    Cookies.set("score",score);
                } 
            }
            else
            {
                if(this.lmsMode == "scorm"){
                    return this.scorm.get("cmi.core.score.raw");
                }else{
                     return Cookies.get("score")?Cookies.get("score"):""; 
                }
            }
        }
        this.save = function(){
            if(this.lmsMode == "scorm"){
                this.scorm.set("cmi.core.session_time",convertSecondsToCMITimespan(this.totalTimeSpent));
                this.scorm.save();   
            }
            
        }
        this.quit = function(){
            if(this.lmsMode == "scorm" && this.scorm.connection.isActive){
                clearInterval(this.timer);
                this.save();
                this.scorm.quit();
            }
        }
        
        function updateUserSpentTime()
        {
            self.totalTimeSpent += self.timerDelay;
        }
        function convertSecondsToCMITimespan(inputMiliSeconds)
        {
            var totalSeconds = parseInt(inputMiliSeconds / 1000);
            var hrs = (Math.floor (totalSeconds / 3600)).toString ();
            var min = (Math.floor ((totalSeconds % 3600) / 60)).toString ();
            var sec = (totalSeconds % 60).toString ();
        
            if (hrs.length == 1) hrs = "0" + hrs;
            if (min.length == 1) min = "0" + min;
            if (sec.length == 1) sec = "0" + sec;
        
            return  (hrs + ":" + min + ":" + sec);
        }
        
    }
    return ScormModel;
});