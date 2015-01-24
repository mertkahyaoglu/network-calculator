#  Network Calculator

> Network Calculator helps you get information about an IP address

![](screenshot.png)

## Install

```sh
$ npm install --save network-calculator
```

## Usage

```js
var nc = require('network-calculator');
console.log(nc('192.168.1.4', '255.255.255.128'));
// >
// {
//   network: '192.168.1.0',
//   bitmask: 25,
//   firsthost: '192.168.1.1',
//   broadcast: '192.168.1.127',
//   lasthost: '192.168.1.126',
//   totalhost: 126
// }

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
