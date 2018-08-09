require.config({
	baseUrl: './',
	map: {
	  '*': {
	    'css': ['plugins/require/require.css.min']
	  }
	},
	
    paths: {
		'text':['plugins/require/require.text'],
		'jquery':['https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min'],
		'lightslider':['plugins/lightSlider/lightslider'],
		'niceScroll':['plugins/jquery.nicescroll'],
		'mediaelement':['plugins/build/mediaelement-and-player'],
		'cookies':['scripts/lms/cookies'],
		'modulevars':['scripts/lms/modulevars'],
		'scodata':['scripts/lms/scodata'],
		'apiwrapper':['scripts/lms/apiwrapper'],
		'scoapiwrapper':['scripts/lms/scoapiwrapper'],
		'owlc':['plugins/owlc/js/owl.carousel'],
		'jquery.easing':['plugins/jquery/jquery.easing.1.3'],       
        'bootstrap':['plugins/bootstrap/js/bootstrap.min'],
		'hammer':['plugins/hammer/hammer.min'],
		'popper':['plugins/bootstrap/js/popper.min'],
		'util':['scripts/util'],
		'Shell':['scripts/shell'],
		'progressbar' : ['scripts/jQuery-plugin-progressbar']
        
		
    },
	
    waitSeconds: 0,
    shim:{
		'popper':{
			deps:['jquery'],
    		exports:"Popper"
		},
		'hammer':{
    		deps:['jquery'],
    		exports:"Hammer"
    	},
    	'bootstrap':{
    		deps:['jquery','popper']
    	},
		'owlc':{
    		deps:['jquery']
    	},
		'lightslider':{
    		deps:['jquery']
    	},
		'niceScroll':{
    		deps:['jquery']
    	},
    	'util':{
    		deps:['jquery']
    	},
    	
		'Shell':{
    		deps:['jquery','popper','bootstrap','util']
    	},
		'progressbar' : {
			deps:['jquery']
		}
    }
});

		

window.shell = null;
(function (){
	require(["Shell","util", "owlc", "cookies", "modulevars", "scodata", "apiwrapper", "scoapiwrapper", "lightslider", "niceScroll", "progressbar"],function(Shell){
		//flowplayerLoaded();
		//loadFile('plugins/flow-player/flowplayer.min.js', flowplayerLoaded, document.body);
	
		window.shell = new Shell();
    	window.shell.init();	
	})
})();
