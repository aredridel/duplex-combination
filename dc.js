"use strict";
module.exports = DuplexCombination;

var util = require('util');

var assert = require('assert');
var stream = require('stream');
var Duplex = stream.Duplex;

util.inherits(DuplexCombination, Duplex);

    function DuplexCombination(reader, writer, options) {
  if (!(this instanceof DuplexCombination))
return new DuplexCombination(reader, writer, options);


this.reader = reader;
this.writer = writer;
Duplex.call(this, options);

this.wrapStreams(reader, writer);

var duplex = this;
this.reader.on('error', function (error) {
    duplex.emit('error', error, duplex.reader);
});
this.writer.on('error', function (error) {
    duplex.emit('error', error, duplex.writer);
});

this._readableState = this._reader._readableState;
this._writableState = this._writer._writableState;
    }


  DuplexCombination.prototype.wrapStreams = function(reader, writer) {
assert(reader instanceof stream.Readable || reader instanceof stream.Duplex, 'reader must be a Readable stream');
assert(writer instanceof stream.Writable || writer instanceof stream.Duplex, 'writer must be a Writable stream');
this.reader.read(0);
this.writer.read(0);
  };


      DuplexCombination.prototype.on = function(ev, fn) {
    switch (ev) {
  case 'data':
  case 'end':
  case 'readable':
this._reader.on(ev, fn);
return this
  case 'drain':
  case 'finish':
this._writer.on(ev, fn);
return this
  default:
return Duplex.prototype.on.call(this, ev, fn);
    }
      };

DuplexCombination.prototype.addListener = DuplexCombination.prototype.on;

  DuplexCombination.prototype.pipe = function(dest, opts) {
return this._reader.pipe(dest, opts);
  };

  DuplexCombination.prototype.setEncoding = function(enc) {
return this._reader.setEncoding(enc);
  };

  DuplexCombination.prototype.read = function(size) {
return this._reader.read(size);
  };

  DuplexCombination.prototype.end = function(chunk, enc, cb) {
return this._writer.end(chunk, enc, cb);
  };

  DuplexCombination.prototype.write = function(chunk, enc, cb) {
return this._writer.write(chunk, enc, cb);
  };
