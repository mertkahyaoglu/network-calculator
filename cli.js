#!/usr/bin/env node
'use strict';
var meow = require('meow');
var nc = require('./');

var cli = meow({
  help: [
    'Usage',
    '  nc <input> <input>',
    '',
    'Example',
    '  nc 192.168.1.14 255.255.255.0'
  ].join('\n')
});

if (!cli.input[0]) {
  console.error('Please supply an IP address');
  process.exit(1);
}

if (!cli.input[1]) {
  console.error('Please supply an Netmask address');
  process.exit(1);
}

nc.output(cli.input[0], cli.input[1]);
