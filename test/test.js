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
    console.log(nc('192.168.1.4', '255.255.255.128'));
  });
});
