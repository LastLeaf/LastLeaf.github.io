// compatibility checker

(function(){
	// checkers
	var checkers = {
		'JavaScript/JSON':
			function() {
				if(typeof(JSON) !== 'undefined')
					return true;
			},
		'DOM/Canvas':
			function() {
				try {
					if(typeof(document.createElement('canvas').getContext) !== 'undefined')
						return true;
				} catch(e) {}
			},
		'DOM/Audio':
			function() {
				try {
					if(typeof(document.createElement('audio').src) !== 'undefined')
						return true;
				} catch(e) {}
			},
		'DOM/LocalStorage':
			function() {
				if(typeof(localStorage) !== 'undefined')
					return true;
			},
		'DOM/AddEventListener':
			function() {
				if(typeof(window.addEventListener) !== 'undefined')
					return true;
			},
		'': function(){ return true; }
	};
	// check function
	window.HTML5Compatibility = (function(){
		// select unsupported features from a list (given as array or argument list)
		var unsupported = function() {
			var list;
			if(typeof(arguments[0]) === 'array')
				list = arguments[0];
			else
				list = arguments;
			var r = [];
			for(var i=0; i<list.length; i++) {
				var supported = false;
				var item = list[i];
				if(!checkers[item])
					throw new Error('Unrecognized compatibility test item: '+list[i]);
				else if(checkers[item]())
					supported = true;
				if(!supported) r.push(list[item]);
			}
			return r;
		};
		// test all in the list
		var supportAll = function() {
			for(var k in checkers)
				if(!checkers[k]()) return false;
			return true;
		};
		return {
			unsupported: unsupported,
			supportAll: supportAll
		};
	})();
})();

document.bindReady(function(){
	if(HTML5Compatibility.supportAll()) {
		document.getElementById('game_web').innerHTML = '<a href="javascript:;" id="game_web_start">开始网页游戏</a>';
		document.getElementById('game_web_start').onclick = function(){
			document.body.removeChild(document.getElementById('wrapper'));
			document.body.style.overflow = 'hidden';
			var gameWrapper = document.getElementById('game_wrapper');
			gameWrapper.style.height = document.documentElement.clientHeight + 'px';
			window.onresize = function(){
				gameWrapper.style.height = document.documentElement.clientHeight + 'px';
			};
			gameWrapper.innerHTML = '<iframe src="game/" mozallowfullscreen webkitallowfullscreen allowfullscreen></iframe>';
		};
	} else
		document.getElementById('game_web').innerHTML = '（您的浏览器不支持网页版本，你可以使用 <a href="http://www.google.com/chrome">Chrome</a> 或 <a href="http://firefox.com">Firefox</a> 访问网页版游戏）';
});