var IR = require('./ir.js')
var ir = new IR();
ir.start();
ir.on('up', function(key) {
  console.log(key);	
});
ir.stop();