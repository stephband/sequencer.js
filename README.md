## Sequencer.js

Plays timed data. In sequence. With a timer that compensates for latency, and with live control of speed and offset.

* Avoids garbage collection. The last thing you want while trying to get JavaScript to time accurately is having it wander off to take out the rubbish.
* Allows for updates to speed and offset while playing, without skipping playback.

## Data

Reads data in the form:

var data = {
  0:  [fn, fn],
  3:  [fn, fn, fn],
  5:  [fn],
  12: [fn]
};

...where the keys are the times and the arrays of functions are the functions to be called at those times.