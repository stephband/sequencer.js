var Sequence = require('./sequence');
 
// var sequence = new Sequence({
// 	0:   [function() { console.log('event1: 0'); }, function() { console.log('event2: 0'); }],
// 	1:   [function() { console.log('event: 1'); }],
// 	2:   [function() { console.log('event: 2'); }],
// 	100: [function() { console.log('event: 100'); }],
// 	101: [function() { console.log('event: 101'); }],
// 	102: [function() { console.log('event: 102'); }],
// 	103: [function() { console.log('event: 103'); }],
// 	104: [function() { console.log('event: 104'); }],
// 	105: [function() { console.log('event: 105'); }],
// 	106: [function() { console.log('event: 106'); }],
// 	200: [function() { console.log('event: 200'); }],
// 	1000: [function() { console.log('event: 1000'); }]
// });
// 
// setTimeout(function() {
// 	sequence.start();
// }, 0);
// 
// setTimeout(function() {
// 	console.log('Add rate --------');
// 	sequence.rate = 2;
// }, 333);
// 
// //setTimeout(function() {
// //	console.log('Add offset --------');
// //	sequence.offset = 40;
// //}, 102);
// 
// setTimeout(function() {
// 	console.log('Stop       --------');
// 	sequence.stop();
// }, 2000);



var sequence = new Sequence({
	0.1:   [function() { console.log('one'); }, function() { console.log('one event2'); }],
	1:   [function() { console.log('two'); }],
	1.5: [function() { console.log('&'); }],
	2:   [function() { console.log('three'); }],
	3:   [function() { console.log('four'); }],
	3.5: [function() { console.log('&'); }]
}, function(e) {
	// e is the object - in this case a function from the
	// arrays above.
	e();
	
	if (e.id) {
		jQuery('#' + e.id).trigger(e);
	}
});

sequence.rate = 0.002;
sequence.offset = -1;

sequence.start();
