// Sequence plays back lists of functions as a timed sequence. Features
// a self regulating timer that accounts for jitter of previous frames
// and attempts to make up any time difference. Nor does it drop any
// frames.

(function(module, undefined){
	var debug = true;
	
	
	// Pure
	
	function noop() {
		
	}
	
	function greater(a, b) {
		return a > b ? 1 : -1 ;
	}
	
	function now() {
		return (+new Date());
	}
	
	function playEvent(e) {
		if (typeof e === 'function') { e(); }
	}
	
	function cue(t1, t2, fn) {
		return setTimeout(fn, t2 > t1 ? t2 - t1 : 0);
	}
	
	function nextIndex(times, time) {
		var l = times.length;
	
		while (l--) {
			if (times[l] <= time) { return l; }
		}
	}
	
	
	// Constructor
	
	function Sequence(data, options) {
		this.data = data;
		this.speed = options && options.speed || 1;
		this.offset = options && options.offset || 0;
		this.keys = Object.keys(data).map(parseFloat).sort(greater);
		this.index = nextIndex(this.keys, this.offset * this.speed);
		this.fire = (function() {
			fire(this, this.data, this.fire);
		}).bind(this);
		
		if (debug) { console.log('sequence'); }
	}
	
	
	// Private
	
	function fire(seq, data, fn) {
		var t = seq.keys[seq.index];
		var events = data[t];
		
		if (debug) {
			var n = now();
			console.log(
				'index:', seq.index,
				't:', t,
				'time:', n - seq.startTime,
				'latency:', n - seq.startTime - (seq.keys[seq.index] + seq.offset) / seq.speed
			);
		}
		
		events.forEach(playEvent);
		
		if (++seq.index >= seq.keys.length) { return seq.stop(); }
		
		t = seq.keys[seq.index];
		seq._timer = cue(now() - seq.startTime, (t + seq.offset) / seq.speed, fn);
	}
	
	
	// Public
	
	function start(time) {
		this.startTime = time || now();
		this.play = noop;
		this.stop = stop;
		
		var t = this.keys[this.index];
		
		if (debug) console.log('start:', this.startTime, 'offset:', this.offset, 'speed:', this.speed, 'index:', this.index, 't:', t);
		
		this._timer = cue(
			now() - this.startTime,
			t / this.speed + this.offset,
			this.fire
		);
		
		return this;
	}

	function stop() {
		this.start = start;
		this.stop = noop;
		
		if (debug) console.log('time:', now() - this.startTime, '.stop()');
		
		clearTimeout(this._timer);
		delete this.startTime;
		return this;
	}
	
	Sequence.prototype = {
		start: start,
		stop: noop,
		
		set speed(n) {
			var t, s, o;
			
			if (this._timer) {
				clearTimeout(this._timer);
				
				t = now() - this.startTime;
				s = this._speed;
				o = this._offset;
				
				this._offset = t * (n - s) + o;
				
				this._timer = cue(
					t,
					(this.keys[this.index] + this.offset) / n,
					this.fire
				);
			}
			
			this._speed = n;
		},
		
		get speed() {
			return this._speed;
		},
		
		set offset(n) {
			this._offset = n;
			
			if (this._timer) {
				clearTimeout(this._timer);
				
				this._timer = cue(
					now() - this.startTime,
					(this.keys[this.index] + n) / this.speed,
					this.fire
				);
			}
		},
		
		get offset() {
			return this._offset;
		}
	};
	
	if (module) { module.exports = Sequence; }
	else        { window.Sequence = Sequence; }
})(module);