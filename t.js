var assert = require('assert');

var DC = require('./dc.js');
var stream = require('stream');
var PassThrough = stream.PassThrough;

var reader = new PassThrough();
var writer = new PassThrough();
var d = new DC(reader, writer);

reader.write('hello, ');
reader.write('world.');
reader.end('\n');

d.setEncoding('utf8');
var out = '';
d.on('data', function(c) {
  out += c;
});

d.write("hello, ");
d.write("world.");
d.end("\n");

var out2 = '';
writer.on('readable', function (c) {
    var t;
    while (t = writer.read()) {
        out2 += t;
    }
});

process.on('exit', function() {
  assert.equal(out, 'hello, world.\n');
  assert.equal(out2, 'hello, world.\n');
  console.log('ok');
});
