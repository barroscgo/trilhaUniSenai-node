const { Duplex } = require('stream');

const transformStream = new Duplex({
  read(size) {},
  write(chunk, encoding, callback) {
    const upper = chunk.toString().toUpperCase();
    this.push(upper);
    callback();
  }
});

process.stdin.pipe(transformStream).pipe(process.stdout);
