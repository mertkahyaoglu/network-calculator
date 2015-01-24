/*global describe, it */
'use strict';
var assert = require('assert');
var nc = require('../');

describe('network calculator', function () {
  it('must return correct values', function () {
    assert.equal(nc('192.168.1.4', '255.255.255.128').network, '192.168.1.0');
    assert.equal(nc('192.168.1.4', '255.255.255.128').broadcast, '192.168.1.127');
    assert.equal(nc('192.168.1.4', '255.255.255.128').firsthost, '192.168.1.1');
    assert.equal(nc('192.168.1.4', '255.255.255.128').lasthost, '192.168.1.126');
    assert.equal(nc('192.168.1.4', '255.255.255.128').totalhost, 126);

    assert.equal(nc('10.1.1.1', '255.0.0.0').network, '10.0.0.0');
    assert.equal(nc('10.1.1.1', '255.0.0.0').broadcast, '10.255.255.255');
    assert.equal(nc('10.1.1.1', '255.0.0.0').firsthost, '10.0.0.1');
    assert.equal(nc('10.1.1.1', '255.0.0.0').lasthost, '10.255.255.254');
    assert.equal(nc('10.1.1.1', '255.0.0.0').totalhost, 16777214);
    assert.equal(nc('10.1.1.1', '255.0.0.0').bitmask, 8);
  });
});
