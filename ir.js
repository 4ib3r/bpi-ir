function IR() {
    var fs = require('fs');
    this.stream = null;
    
    this.events = {
        down: function(key) {},
        up: function(key) {},
        key: function(event) {}
    };
    
    var that = this;
    
    /** start receiving events */
    this.start = function(device) {
      var dev = '/dev/input/event0';
      if (device !== undefined) {
          dev = device;
      }
      this.stream = fs.createReadStream(dev);
      this.stream.on('data', parseEvents);
    }
    
    this.on = function(event, callback) {
        this.events[event] = callback;
    }
    
    this.stop = function() {
        if (this.stream.close)
            this.stream.close();
    }
        
    var parseEvents = function(buf) {
        var event = {
            tssec:   buf.readUInt32LE(0),
            tsusec:  buf.readUInt32LE(4),
            type:    buf.readUInt16LE(8),
            key:     buf.readUInt16LE(10),
            isDown:  buf.readUInt32LE(12)==1
        };
        that.events.key(event);
        if (event.isDown) {
            that.events.down(event.key);
        } else {
            that.events.up(event.key);
        }
    }
}
module.exports = IR;
