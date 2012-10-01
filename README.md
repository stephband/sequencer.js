# Sequencer.js

Plays timed data. In sequence. With a timer that compensates for latency, and with live control of speed and offset.

* Tries to gaurantee timing by compensating for delays in firing of timed data
* Tries to avoid garbage collection. The last thing you want while trying to get JS to time accurately is having it wander off to take out the rubbish
* Allows for updates to speed and offset while playing


## The <code>sequence</code> object

Set up a sequence object:

<pre>
var sequence = new Sequence(data, fn);
</pre>

Where <code>data</code> is in the form:

<pre>
var data = {
      0:   [obj, obj],
      50:  [obj, obj, obj],
      120: [obj],
      300: [obj],
      &hellip;
    };
</pre>

&hellip;and <code>fn</code> is called for every object in a <code>data</code> array at the time given by the data key. <code>fn</code> is called with that object as it's first argument:

<pre>
function fn(obj) {
	// Do something with obj.
}
</pre>

### Methods

<dl>
	<dt>.start()</dt>
	<dd>Start playback of data.</dd>
	<dt>.stop()</dt>
	<dd>Stop playback.</dd>
</dl>

### Properties

<dl>
	<dt>.rate</dt>
	<dd>
		<p>Defaults to <code>1</code></p>
		<p>Rate of playback. 1 means 1 per millisecond. A tempo of 120bpm would be a rate of 1 every 500ms, or 0.002. Can be changed while sequence is playing.</p>
	</dd>
	
	<dt>.offset</dt>
	<dd>
		<p>Defaults to <code>0</code></p>
		<p>Playback offset. Offset the timed data to play earlier:</p>
<pre>
sequence.offset = -100;
</pre>
		<p>&hellip;or later:</p>
<pre>
sequence.offset = 250;
</pre>
		<p>
		Can be changed while playback is running, without skipping playback of data.
		When offset is changed such that playback would skip over data, all the data is played at once to 'catch up'.
		If offset is changed such that data might be replayed, that data is not played again, and the sequence waits until the next unplayed data.
		In other words, while the sequence is playing all data is fired only once irrespective of how much you mess with the offset.
		</p>
	</dd>
</dl>