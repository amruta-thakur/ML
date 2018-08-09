
function Util() { }

Util.prototype.loadXML = function (xmlName, _callBack) {
	var request = $.ajax({
		url: xmlName,
		type: "GET",
		dataType: "xml"
	});

	request.done(function (msg) {
		_callBack(msg);
	});

	request.fail(function (jqXHR, textStatus) {
		alert("Request failed: " + textStatus);
	});
}

Util.prototype.searchNum = function (num, arr) {
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            if (num == arr[i]) {
                return 1;
            }
        }
        return -1;
    }

Util.prototype.loadCrossDomainXML = function (url, _callBack, format) {

	var ref = this;
	if (format === undefined)
		format = "xml";

	if ($.browser.name == "msie" && parseInt($.browser.version) < 10) {
		/* var rssDoc = new ActiveXObject("Microsoft.XMLDOM")
		 rssDoc.async = false
		 rssDoc.load(url);
		 console.log(rssDoc);
		 return;*/

		simpleAJAXLib = {

			fetchJSON: function () {
				var root = 'https://query.yahooapis.com/v1/public/yql?q=';
				var yql = 'select * from xml where url="' + url + '"';
				var proxy_url = root + encodeURIComponent(yql) + '&format=json&diagnostics=false&callback=simpleAJAXLib.display';
				document.getElementsByTagName('body')[0].appendChild(this.jsTag(proxy_url));
			},

			jsTag: function (url) {
				var script = document.createElement('script');
				script.setAttribute('type', 'text/javascript');
				script.setAttribute('src', url);
				return script;
			},

			display: function (results) {

				if (format == "xml") {
					_callBack(ref.json2xml(results.query.results));
				} else {
					_callBack(results.query.results);
				}
			}
		}

		simpleAJAXLib.fetchJSON();
	} else {
		var root = 'https://query.yahooapis.com/v1/public/yql?q=';
		var yql = 'select * from xml where url="' + url + '"';
		var proxy_url = root + encodeURIComponent(yql) + '&format=json&diagnostics=false';

		$.getJSON(proxy_url, function (results) {

			if (format == "xml") {
				_callBack(ref.json2xml(results.query.results));
			} else {
				_callBack(results.query.results);
			}

		}).error(function (jqXHR, textStatus, errorThrown) {
			alert(errorThrown);
		});
	}
}
Util.prototype.getXMLHTTP = function () {//fuction to return the xml http object
	var xmlhttp = false;
	try {
		xmlhttp = new XMLHttpRequest();
	} catch (e) {
		try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) {
			try {
				xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e1) {
				xmlhttp = false;
			}
		}
	}

	return xmlhttp;
};






Util.prototype.setTopic = function (topicid) {
	if (window.shell !== undefined)
		return window.shell.setTopic(topicid);
	else
		return parent.window.shell.setTopic(topicid);
};
Util.prototype.setPage = function (topicid, pageid) {
	if (window.shell !== undefined)
		return window.shell.setPage(topicid, pageid);
	else
		return parent.window.shell.setPage(topicid, pageid);
};
Util.prototype.getTopicsStatus = function () {
	if (window.shell !== undefined)
		return window.shell.getTopicsStatus();
	else
		return parent.window.shell.getTopicsStatus();
}
Util.prototype.isTopicCompleted = function (topicid) {
	if (window.shell !== undefined)
		return window.shell.isTopicCompleted(topicid);
	else
		return parent.window.shell.isTopicCompleted(topicid);


}
Util.prototype.getPageContainer = function () {
	if (window.shell !== undefined)
		return window.shell.getPageContainer();
	else
		return parent.window.shell.getPageContainer();
};
Util.prototype.setLoading = function (bool) {
	if (window.shell !== undefined)
		return window.shell.setLoading(bool);
	else
		return parent.window.shell.setLoading(bool);
};
Util.prototype.getRelativePath = function (src) {
	if (src.indexOf(this.getURL()) == -1) {
		return this.getURL() + src;
	} else {
		return src;
	}
};

//deprecated as of shell 0.4
Util.prototype.getWidth = function () {
	return "100%";
};
//deprecated as of shell 0.4
Util.prototype.getHeight = function () {
	return "100%";
};

//deprecated as of shell 0.4
Util.prototype.getShellWidth = function (msg) {
	return "100%";
};

//deprecated as of shell 0.4
Util.prototype.getShellHeight = function (msg) {
	return "100%";
};

Util.prototype.getTemplateInstance = function () {
	if (window.shell !== undefined)
		return window.shell.getTemplateInstance();
	else
		return parent.window.shell.getTemplateInstance();
}

Util.prototype.disableNext = function () {
	if (window.shell !== undefined)
		return window.shell.enableDisableNext(false);
	else
		return parent.window.shell.enableDisableNext(false);

}

Util.prototype.enableNext = function () {
	if (window.shell !== undefined)
		return window.shell.enableDisableNext(true);
	else
		return parent.window.shell.enableDisableNext(true);

}

Util.prototype.enterFullScreen = function () {
	$("#navBtnHolder").hide();
}

Util.prototype.isAbsolutePath = function (url) {
	var filter = /^(?:\/|[a-z]+:\/\/)/;
	//	/^(https?:\/\/)?([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})([\/\w \.-]*)*\/?$/;

	if (filter.test(url)) {
		return true;
	} else {
		return false;
	}
}

Util.prototype.pageLoaded = function () {
	if (window.shell !== undefined)
		return window.shell.pageLoaded();
	else
		return parent.window.shell.pageLoaded();
}

Util.prototype.getURL = function () {

	if (window.shell !== undefined)
		return window.shell.getURL() + "/";
	else
		return parent.window.shell.getURL() + "/";
};

Util.prototype.verticalAlign = function (elem) {

	if ($(elem).parent().length > 0) {

		$(elem).css({
			top: ($(elem).parent().height() - $(elem).height()) / 2
		})
	}
}

Util.prototype.updateRelativePaths = function (elem) {

}
/**Used to get Navigation button controlls to internal pages/templates*/

Util.prototype.getNavControls = function (type) {/*prev/next/both*/

	if (window.shell !== undefined)
		return window.shell.acquireNavControl(type);
	else
		return parent.window.shell.acquireNavControl(type);
}

Util.prototype.releaseNavControls = function (type) {/*prev/next/both*/
	if (window.shell !== undefined)
		return window.shell.releaseNavControl(type);
	else
		return parent.window.shell.releaseNavControl(type);
}
/**End Navigation button controlls to internal pages/templates**/

Util.prototype.getVideoSources = function (node) {

	var ref = this;
	var obj = {};

	$(node).find("source").each(function () {
		obj[$(this).attr("type").split("/")[1]] = ref.getVideoPath($(this).text());
	});

	return obj;
}
Util.prototype.getVideoPath = function (path) {

	var ref = this;

	if (ref.isAbsolutePath(path)) {
		return path;
	} else {
		return ref.getURL() + "videos/" + path;
	}
}
Util.prototype.getSupportedVideo = function (sources) {
	var testEl = document.createElement("video"),
		mpeg4, h264, ogg, webm;

	if (testEl.canPlayType) {
		// Check for MPEG-4 support
		mpeg4 = "" !== testEl.canPlayType('video/mp4; codecs="mp4v.20.8"');

		// Check for h264 support
		h264 = "" !== (testEl.canPlayType('video/mp4; codecs="avc1.42E01E"')
			|| testEl.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'));

		// Check for Ogg support
		ogg = "" !== testEl.canPlayType('video/ogg; codecs="theora"');

		// Check for Webm support
		webm = "" !== testEl.canPlayType('video/webm; codecs="vp8, vorbis"');


		if (webm && sources.webm !== undefined) {
			return sources.webm;
		}
		else if (ogg && source.ogg !== undefined) {
			return sources.ogg
		}
		else //if((mpeg4 || h264) && source.mp4 !== undefined)
		{
			return sources.mp4;
		}
	}
	else {
		return sources.mp4;
	}
}

/**Force redraw for chrome*/

Util.prototype.forceRedraw = function (elem) {

	/**Force redraw, this basically used for chrome*/
	if ($(elem).length > 0) {
		$(elem)[0].style.display = 'none';
		$(elem)[0].offsetHeight// no need to store this anywhere, the reference is enough
		$(elem)[0].style.display = 'block';
	}
};

Util.prototype.trace = function (msg) {

	/*if(typeof(console.log) === "function")
	 console.log(msg);
	 */

};
Util.prototype.isIOSMobileDevice = function () {
	if (navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/iPhone/i) != null || navigator.userAgent.match(/iPod/i) != null)
		return true;
	else
		return false;
};

/**override jqyery html function*/
(function () {
	var e = jQuery.fn.html;
	jQuery.fn.html = function () {
		if (arguments.length > 0 && $.trim(arguments[0]) != "") {
			var t = arguments[0];
			var n = $("<div>").attr("id", "relPathUpdater");
			$(n)[0].innerHTML = t;
			t = updateHTMLRelativePath(n);
			return e.apply(this, [t])
		} else
			return e.apply(this, arguments)
	}
})()

/*Update html relative paths*/

function updateHTMLRelativePath(e) {
	var t = "";
	if (window.shell !== undefined)
		t = window.shell.getURL() + "/";
	else
		t = parent.window.shell.getURL() + "/";
	$(e).find('img[src^="images/"],img[src^="skin/"]').each(function () {
		$(this).attr("src", t + $(this).attr("src"))
	});
	$(e).find('video[poster^="images/"],video[poster^="skin/"]').each(function () {
		$(this).attr("poster", t + $(this).attr("poster"))
	});
	$(e).find('*[style*="background-image"]').each(function () {
		var e = $(this).attr("style").split(";");
		for (var n = 0; n < e.length; n++) {
			var r = e[n].split(":");
			if (r[0] == "background-image") {
				var i = r[1].split("url(")[1];
				i = i.substring(0, i.length - 1);
				if (i.indexOf("images/") == 0 || i.indexOf("skin/") == 0) {
					i = t + i;
					$(this).css("background-image", "url(" + i + ")")
				}
			}
		}
	});
	return $(e)[0].innerHTML
}


/**Detect browser plugin*/
/*!
 * jQuery Browser Plugin 0.0.7
 */!function (a) { "function" == typeof define && define.amd ? define(["jquery"], function (b) { a(b) }) : "object" == typeof module && "object" == typeof module.exports ? module.exports = a(require("jquery")) : a(jQuery) }(function (a) { "use strict"; var b, c; if (a.uaMatch = function (a) { a = a.toLowerCase(); var b = /(edge)\/([\w.]+)/.exec(a) || /(opr)[\/]([\w.]+)/.exec(a) || /(chrome)[ \/]([\w.]+)/.exec(a) || /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [], c = /(ipad)/.exec(a) || /(ipod)/.exec(a) || /(iphone)/.exec(a) || /(kindle)/.exec(a) || /(silk)/.exec(a) || /(android)/.exec(a) || /(windows phone)/.exec(a) || /(win)/.exec(a) || /(mac)/.exec(a) || /(linux)/.exec(a) || /(cros)/.exec(a) || /(playbook)/.exec(a) || /(bb)/.exec(a) || /(blackberry)/.exec(a) || []; return { browser: b[5] || b[3] || b[1] || "", version: b[2] || b[4] || "0", versionNumber: b[4] || b[2] || "0", platform: c[0] || "" } }, b = a.uaMatch(window.navigator.userAgent), c = {}, b.browser && (c[b.browser] = !0, c.version = b.version, c.versionNumber = parseInt(b.versionNumber, 10)), b.platform && (c[b.platform] = !0), (c.android || c.bb || c.blackberry || c.ipad || c.iphone || c.ipod || c.kindle || c.playbook || c.silk || c["windows phone"]) && (c.mobile = !0), (c.cros || c.mac || c.linux || c.win) && (c.desktop = !0), (c.chrome || c.opr || c.safari) && (c.webkit = !0), c.rv || c.edge) { var d = "msie"; b.browser = d, c[d] = !0 } if (c.safari && c.blackberry) { var e = "blackberry"; b.browser = e, c[e] = !0 } if (c.safari && c.playbook) { var f = "playbook"; b.browser = f, c[f] = !0 } if (c.bb) { var g = "blackberry"; b.browser = g, c[g] = !0 } if (c.opr) { var h = "opera"; b.browser = h, c[h] = !0 } if (c.safari && c.android) { var i = "android"; b.browser = i, c[i] = !0 } if (c.safari && c.kindle) { var j = "kindle"; b.browser = j, c[j] = !0 } if (c.safari && c.silk) { var k = "silk"; b.browser = k, c[k] = !0 } return c.name = b.browser, c.platform = b.platform, a.browser = c, c });


/**http://www.mattcromwell.com/detecting-mobile-devices-javascript/
 *Mobile detection simple... isMobile.any() or like isMobile.Android() 
 */
var isMobile = {
	Android: function () { return navigator.userAgent.match(/Android/i); },
	BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
	iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
	Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
	Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
	any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};

var Clock = {
            totalSeconds: 0,
            start: function(audioDurationRef, situationIDRef) {
                var self = this;
               // console.log("called ")
                this.interval = setInterval(function() {
                    window.shell.audioDurationArray[situationIDRef] = audioDurationRef;
                    var totalDuration = 0;
                    //console.log("duration array " + ref.audioDurationArray)
                    for (var i = 0; i < window.shell.audioDurationArray.length; i++) {
                        totalDuration = totalDuration + ref.audioDurationArray[i];
                    }
                    //console.log(totalDuration)
                    self.totalSeconds += 1;
                    var customseconds = parseInt(self.totalSeconds % 60);
                    var customMinutes = Math.floor(self.totalSeconds / 60 % 60);
                    //console.log(customseconds)
                    if (customseconds < 10) {
                        $(".second").text("0" + customseconds);
                    } else {
                        
						$(".second").text(customseconds);
                    }
                    if (customMinutes < 10) {
                        $(".minute").text("0" + customMinutes);
                    } else {
                        $(".minute").text(customMinutes);
                    }
                    //console.log(self.totalSeconds + " ::: " + totalDuration)
                    if (self.totalSeconds >= totalDuration) {
                        Clock.pause();
                        $('#continue_nextscreen_btn').removeClass('disable');
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
			

        };
