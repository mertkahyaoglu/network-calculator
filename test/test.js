'use strict';

var test = require('ava');
var nc = require('../');

test('network calculator must return correct values', function(t) {
  t.is(nc('192.168.1.4', '255.255.255.128').network, '192.168.1.0');
  t.is(nc('192.168.1.4', '255.255.255.128').broadcast, '192.168.1.127');
  t.is(nc('192.168.1.4', '255.255.255.128').firsthost, '192.168.1.1');
  t.is(nc('192.168.1.4', '255.255.255.128').lasthost, '192.168.1.126');
  t.is(nc('192.168.1.4', '255.255.255.128').totalhost, 126);

  t.is(nc('10.1.1.1', '255.0.0.0').network, '10.0.0.0');
  t.is(nc('10.1.1.1', '255.0.0.0').broadcast, '10.255.255.255');
  t.is(nc('10.1.1.1', '255.0.0.0').firsthost, '10.0.0.1');
  t.is(nc('10.1.1.1', '255.0.0.0').lasthost, '10.255.255.254');
  t.is(nc('10.1.1.1', '255.0.0.0').totalhost, 16777214);
  t.is(nc('10.1.1.1', '255.0.0.0').bitmask, 8);
});
