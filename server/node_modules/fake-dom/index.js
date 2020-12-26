require('jsdom').jsdom.env({
	html: '<body></body>',
	url: 'http://www.foo.com',
	done: function () {},
	onload: function () {},
	created: globals
});

function globals(err, window) {
	global.window = window;
	global.document = window.document;

	Object.keys(window.document.defaultView).forEach((property) => {
		if (typeof global[property] === 'undefined' && property !== 'XMLHttpRequest') {
			global[property] = document.defaultView[property];
		}
	});

	global.navigator = {
		userAgent: 'node.js'
	};
}
