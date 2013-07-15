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

## Acknowledgements

Stolen shamelessly from Isaac Schuleter's `duplex-passthrough` module.
