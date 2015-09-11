# bpi-ir
Banana pi ir receiver node

# Functions

##start(device)
If device param not provided /dev/input/event0 is used

##stop()
Close event stream

##on(event, callback)
Receive key events
Possible events: up, down, key

###Callbacks
up/down events return simple numeric with key value,
key event return event object:
```json
{
  tssec: 12324, //event time in seconds
  tsusec: 567, //event time ms part
  type: 1, //event type
  key: 123, //event key
  isDown: true //key is pressed
}
```

# Usage
```js
var ir = new IR();
ir.start();
ir.on('up', function(key) {
  console.log(key);	
});
//at end of program
ir.stop();
```