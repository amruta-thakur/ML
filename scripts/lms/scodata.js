//**********************************************
//	Class Name: SCOData
// 	Created By: Sandhya Dev
// 	Date: 9 June, 2014
//	Desc: This class helps the navigation Shell to maintaing persistant SCO data. It contains function to send and retreive data back across multiple sessions. 
// 	Modified By: Sandhya Dev
// 	Modification Date:
// 	Modification Desc:
//**********************************************

function SCOData (){
	var initDate=new Date();
	this.sessionTime=null;
	this.lessonLocation = null;
	this.lessonStatus = null;
	this.suspendData = null;
	this.score = null;
	this.studentName = null;
	this.studentID = null;
	this.errorCode = 0;
	this.trackingMode = null;
	
	this.sessionTraceData = new Array();
	this.sessionTraceLineBreak = "\n-------------------------------------------------------------";
	var cookieText = "The course is currently storing user state in a cookie.";
	var SCORMText = "The course is currently storing user state using SCORM."


	this.setValue = function (item, value){
		//alert("setvalue running " + item + " ::: " + value);
		switch (item){
			case "sessionTime": 
				this.sessionTime = value;
				break;
			case "lessonLocation":
				this.lessonLocation = value;
				break;
			case "lessonStatus":
				this.lessonStatus = value;
				break;
			case "suspendData":
				this.suspendData = value;
				break;
			case "score":
				this.score = value
				break;
		}
	}

	this.getValue = function (item){
		var value = null;
		switch (item){
			case "sessionTime": 
				value = this.sessionTime;
				break;
			case "lessonLocation":
				value = this.lessonLocation;
				break;
			case "lessonStatus":
				value = this.lessonStatus;
				break;
			case "suspendData":
				value = this.suspendData;
				break;
			case "score":
				value = this.score;
				break;
			case "studentName":
				value = this.studentName;
				break;
			case "studentID":
				value = this.studentID;
				break;
		}
		this.sessionTraceData.push("\nSending getValue");
		this.sessionTraceData.push("\n"+item +": "+ value);
		this.sessionTraceData.push(this.sessionTraceLineBreak);
		return value;
	}
	this.initialize = function (){
		this.sessionTraceData.push("Starting session");
		if (getAPI()){
			this.trackingMode = isSCORM2004 ? "SCORM2004" : "SCORM1.2";
		}else{
			this.trackingMode="cookies";
		}

		////alert("Tracking Mode: " + this.trackingMode);
				
		this.updateDebugger();
		this.sessionTraceData.push("\nTracking Mode: "+ this.trackingMode);
		this.sessionTraceData.push("\n"+ initDate.toLocaleString());
		this.sessionTraceData.push(this.sessionTraceLineBreak);
	
		this.sessionTraceData.push("\nSending initialize");
		
		switch (this.trackingMode)
		{
			case "SCORM1.2":
				doLMSInitialize();
				this.errorCode = ErrorHandler();
				//alert("lms intialized")
			//	this.sessionTime = doLMSGetValue("cmi.core.sessionTime");	// commented by PN on 11/7/2005 for removing warning messages in ADL Test Suite
				this.lessonLocation = doLMSGetValue("cmi.core.lesson_location");
				this.lessonStatus = doLMSGetValue("cmi.core.lesson_status"); 
				this.suspendData = doLMSGetValue("cmi.suspend_data");
				this.score = doLMSGetValue("cmi.core.score.raw");
				this.studentName = doLMSGetValue("cmi.core.student_name");
				this.studentID = doLMSGetValue("cmi.core.student_id");
				break;
			case "SCORM2004":
				initializeCommunication();
				//alert("After initialize communication");
				this.errorCode = retrieveLastErrorCode();
				//alert("After Error Handler");
				this.lessonLocation = retrieveDataValue("cmi.location");
				//alert("After first retrieveDataValue");
				
				this.lessonStatus = retrieveDataValue("cmi.completion_status"); 
				this.suspendData = retrieveDataValue("cmi.suspend_data");
				this.score = retrieveDataValue("cmi.score.raw");
				//alert("Completion Status Retrieved: " + retrieveDataValue("cmi.completion_status"));
				break;
			case "cookies":
				//if(moduleId == "undefined")
					break;

				allData = readCookie(moduleId);
				if (allData != "")
				{
					allData = allData.split(firstLevelDelim);
					for(i=0;i<allData.length;i++){

						tempArr = allData[i].split(secondLevelDelim);
						switch (tempArr[0])
						{
							case "sessionTime":
								this.sessionTime=tempArr[1]; 
								break;
							case "lessonStatus":
								this.lessonStatus=tempArr[1]; 
								break;
							case "lessonLocation":
								this.lessonLocation=tempArr[1]; 
								break;
							case "suspendData":
								this.suspendData=tempArr[1]; 
								break;
							case "score":
								this.score=tempArr[1]; 
								break;
						}
					}
				}
				break;
		
		}
		this.sessionTraceData.push("\nError code after initialize is: "+this.errorCode);
		this.sessionTraceData.push(this.sessionTraceLineBreak);

	}

	this.finish = function (){
		switch (this.trackingMode)
		{
			case "SCORM1.2":
				doLMSFinish();
				break;
			case "SCORM2004":
				this.commit();
				//alert("after commit in SCORM 2004 finish");				
				terminateCommunication();
				//alert("after terminateCommunication");				
				break;
			case "cookies":
				break;
		
		}
	}
	// // anil this function is added to resolve null time issue
	this.secondsToHours =function (ts) {
//Convert duration from milliseconds to 0000:00:00.00 format
	  var Sec  = 0;
	  var Min  = 0;
	  var Hour = 0;
	  while( ts >= 3600000 ) {
		Hour += 1;
		ts -= 3600000;
	  }
	  while( ts >= 60000 ){
		Min += 1;
		ts -= 60000;
	  }
	  while ( ts >= 1000 ){
		Sec += 1;
		ts -= 1000;
	  }
	  if (Hour < 10) Hour = "0"+Hour;
	  if (Min < 10) Min = "0"+Min;
	  if (Sec < 10) Sec = "0"+Sec;
	  var rtnVal = Hour+":"+Min+":"+Sec;
	  return rtnVal;



}
	this.commit = function (){
	
	//	aa = this.sessionTime + ":" + this.lessonLocation + ":" + this.lessonStatus +":"+ this.suspendData + ":" +this.score;
		//alert("commit start TM: " + this.trackingMode);
		curDate = new Date();
		timeDiff = (curDate.getTime()-initDate.getTime()) ;
		timeDiff = Math.round(timeDiff);
		
		 
		 // anil uncommented this line to resolve null time issue
		this.sessionTime = this.secondsToHours(timeDiff);
		
		this.sessionTraceData.push("\nSending commit to save data");
		this.sessionTraceData.push("\nStart Time: "+initDate.toLocaleTimeString()+"; Lesson_Status:"+this.lessonStatus + "; Lesson_Location: "+this.lessonLocation+"; score: "+this.score+"; Suspend_Data: "+ this.suspendData + "; Session_Time:"+this.sessionTime);
		
		//alert("Lesson status in Commit: " + this.lessonStatus);
	
		switch (this.trackingMode)
		{
			case "SCORM1.2":
				doLMSSetValue("cmi.core.lesson_location", this.lessonLocation);
			//alert("a"+this.lessonStatus)
				doLMSSetValue("cmi.core.lesson_status", this.lessonStatus); 
				if (this.score != '') { doLMSSetValue("cmi.core.score.raw",this.score); }
				if (this.suspendData) { doLMSSetValue("cmi.suspend_data",this.suspendData.toString()); }				
				doLMSSetValue("cmi.core.session_time",this.sessionTime);

				doLMSCommit("");
				break;
			case "SCORM2004":
				 //alert("commit TM 2004: " + this.suspendData + " : " + this.lessonLocation);
				 //alert("b"+this.lessonStatus)
				 if(this.lessonLocation != undefined && this.lessonLocation != "undefined"){
					storeDataValue("cmi.location", this.lessonLocation);
			 	 }
				 if(this.suspendData != undefined && this.suspendData != "undefined"){
					storeDataValue("cmi.suspend_data", this.suspendData);
				 }
				 storeDataValue("cmi.completion_status", this.lessonStatus); 
				 
				 //alert("Score in commit::::::: " + this.score);
				 
				 if(parseInt(this.score) >= 0){
				 	storeDataValue("cmi.score.raw", this.score);
					storeDataValue("cmi.score.scaled",this.score / 100);
				}
				
				arrTmp = this.sessionTime.split(":");
				this.sessionTime = "PT" + arrTmp[0] + "H" + arrTmp[1] + "M" + arrTmp[2] + "S";
				//alert(this.sessionTime);
				
				 storeDataValue("cmi.session_time",this.sessionTime);
				 
				 //storeDataValue("cmi.objectives.0.score.raw", 76);
				 storeDataValue("cmi.exit", "suspend");
				 persistData();
				 //alert("cmi.success_status from LMS:::::: " + retrieveDataValue("cmi.success_status"));
				 
				break;
				
			/*case "cookies":
				strData = "";
				strData += "sessionTime" + secondLevelDelim +this.sessionTime + firstLevelDelim;
				strData += "lessonLocation" + secondLevelDelim +this.lessonLocation + firstLevelDelim;
				strData += "lessonStatus" + secondLevelDelim +this.lessonStatus + firstLevelDelim;
				strData += "suspendData" + secondLevelDelim +this.suspendData + firstLevelDelim;
				strData += "score" + secondLevelDelim +this.score + firstLevelDelim;
				if(moduleId != "undefined")
					writeCookie(moduleId, strData, cookieExpireTime);
				break;*/
		}
		this.sessionTraceData.push("\nError code after commit is: "+this.errorCode);
		this.sessionTraceData.push(this.sessionTraceLineBreak);
	}

	this.showSessionTrace = function () {
		var width="430", height="375";
		var title = "LMS Session Trace";
		var msg = '<p style="font: bold 10pt Arial;">LMS Session Trace</p>';
		msg+=	'<textarea id="trace" style="font: 8pt Arial; width: 420px; height: 290px;">';
		for (i=0;i<this.sessionTraceData.length ;i++){
			msg+=this.sessionTraceData[i];
		}
		msg+='</textarea>';
		var left = (screen.width/2) - width/2;
		var top = (screen.height/2) - height/2;
		var styleStr = 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=yes,width='+width+',height='+height+',left='+left+',top='+top+',screenX='+left+',screenY='+top;
		var msgWindow = window.open("","msgWindow", styleStr);
		var head = '<head><title>'+title+'</title></head>';
		var body = '<body><form>'+msg+'<br><input type="button" value="   Close   " onClick="self.close()"></form></body>';
		msgWindow.document.write(head + body);
		msgWindow.focus();
	}
	this.showCurrentState = function(){
		curDate = new Date();
		timeDiff = (curDate.getTime()-initDate.getTime()) /1000;
		timeDiff = Math.round(timeDiff);
		this.sessionTime = secondsToHours(timeDiff);

		var msg = "";
		msg += "Start Time: "+initDate.toLocaleString() +"\n";
		msg += "Lesson_Location: "+this.lessonLocation +"\n";
		msg += "Lesson_Status: "+this.lessonStatus +"\n";
		msg += "Score: "+this.score +"\n";
		msg += "Session_Time: "+this.sessionTime +"\n";
		msg += "Suspend_Data: "+this.suspendData +"\n";
//		alert(msg);
	}

	this.updateDebugger = function (){
		//If debugger frame is not available (e.g. Assessment)... return
		//alert("FD: " + frames["debug"]);
		return;
		if(document.getElementById("trackingMode") == undefined || document.getElementById("trackingMode") == "undefined"){
			return;
		}
		//alert(document.getElementById("trackingMode"));
		document.getElementById("trackingMode").innerHTML = this.trackingMode;
		if (this.trackingMode =="SCORM1.2" || this.trackingMode =="SCORM2004"){
			document.getElementById("trackingModeText").innerHTML = SCORMText;
		}else if(this.trackingMode =="cookies"){
			document.getElementById("trackingModeText").innerHTML = cookieText;
		}
	}
}
