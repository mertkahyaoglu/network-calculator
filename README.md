#  Network Calculator

> Network Calculator

## Install

```sh
$ npm install --save network-calculator
```

## Usage

```js
var nc = require('network-calculator');
console.log(nc('192.168.1.4', '255.255.255.0'));
// >

```

## CLI

```
$ npm install -g network-calculator
```

```
$ network-calculator --help

Usage
network-calculator <ip> <netmask>

Example
network-calculator 192.168.1.4 255.255.255.128
```

## License

MIT © [Mert Kahyaoğlu](mertkahyaoglu.github.io)


[npm-url]: https://npmjs.org/package/network-calculator
