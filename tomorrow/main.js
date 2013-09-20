(function(){
	if(document.bindReady) return;

	var funcs = [];

	var executeReady = function(){
		if(funcs === null) return;
		for(var i = 0; i < funcs.length; i++)
			funcs[i].call(window);
		funcs = null;
	};

	// Mozilla, Opera and webkit nightlies currently support this event
	if ( document.addEventListener ) {
		// Use the handy event callback
		document.addEventListener( "DOMContentLoaded", function f(){
			document.removeEventListener( "DOMContentLoaded", f, false );
			executeReady();
		}, false );
	// If IE event model is used
	} else if ( document.attachEvent ) {
		// ensure firing before onload,
		// maybe late but safe also for iframes
		document.attachEvent("onreadystatechange", function f(){
			if ( document.readyState === "complete" ) {
				document.detachEvent( "onreadystatechange", f );
				executeReady();
			}
		});
		// If IE and not an iframe
		// continually check to see if the document is ready
		if ( document.documentElement.doScroll && window == window.top ) (function f(){
			if ( funcs === null ) return;
			try {
				// If IE is used, use the trick by Diego Perini
				// http://javascript.nwbox.com/IEContentLoaded/
				document.documentElement.doScroll("left");
			} catch( error ) {
				setTimeout( f, 0 );
				return;
			}
			// and execute any waiting functions
			executeReady();
		})();
	} else {
		// A fallback to window.onload, that will always work
		window.onload = executeReady;
	}

	document.bindReady = function(func){
		if(funcs !== null)
			funcs.push(func);
		else
			func.call(window);
	};
})();

document.bindReady(function(){
	var wrapper = document.getElementById('wrapper');
	var gameWrapper = document.getElementById('game_wrapper');
	wrapper.style.height = document.documentElement.clientHeight + 'px';
	window.onresize = function(){
		wrapper.style.height = document.documentElement.clientHeight + 'px';
	};
});