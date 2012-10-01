# Sequencer.js

Plays timed data. In sequence. With a timer that compensates for latency, and with live control of speed and offset.

* Tries to avoid garbage collection. The last thing you want while trying to get JS to time accurately is having it wander off to take out the rubbish.
* Allows for updates to speed and offset while playing, without skipping playback.


## The <code>sequence</code> object

Set up a sequence object:

<pre>
var sequence = new Sequence(data, fn);
</pre>

Where <code>data</code> is in the form:

<pre>
var data = {<br/>
      0:  [obj, obj],<br/>
      3:  [obj, obj, obj],<br/>
      5:  [obj],<br/>
      12: [obj]<br/>
    };
</pre>

&hellip;and <code>fn</code> is called for every object in <code>data</code> at the time given by the data key. <code>fn</code> is called with that object as it's first argument:

<pre>
var sequence = new Sequence(data, function(obj) {
	// Do something with obj.
});
</pre>

### Methods

<dl>
	<dt><code>.start()</code></dt>
	<dd>Start playback of data.</dd>
	<dt><code>.stop()</code></dt>
	<dd>Stop playback.</dd>
</dl>

### Properties

<dl>
	<dt><code>.rate // defaults to 1</code></dt>
	<dd>
		Rate of playback. 1 means 1 unit of timed data per millisecond. Can be changed while sequence is playing.
	</dd>
	
	<dt><code>.offset // defaults to 0</code></dt>
	<dd>
		Playback offset. Offset the timed data to play earlier:
<pre>
sequence.offset = -100;
</pre>
		&hellip;or later:
<pre>
sequence.offset = 250;
</pre>
		Can be changed while playback is running, without skipping playback of data.
		When offset is changed such that playback would skip over data, all the data is played at once to 'catch up'.
		If offest is changed such that data might be replayed, that data is not played again, and the sequence waits until the next unplayed data.
		In other words, while the sequence is playing all data is fired only once irrespective of how much you mess with the offset.
	</dd>
</dl>