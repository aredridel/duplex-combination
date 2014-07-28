# duplex-combination

Merge a readable and writable stream together into a duplex stream

## USE

```javascript
var dp = new DuplexCombination(reader, writer, options);

dp.write("data");
dp.on('readable', function() {
    dp.read(n);
})
```

## Additional public properties

The read and write streams are exposed with the properties `dp.reader` and `dp.writer`

## ERRORS

Error events include the stream that triggered the error, so you can:

```javascript
dp.on('error',function(err,stream) {
    if (stream === dp.reader) {
        // error while reading
    }
    else {
        // error while writing
    }
});
```

## Acknowledgements

Stolen shamelessly from Isaac Schuleter's `duplex-passthrough` module.
