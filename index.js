'use strict';
var validateip = require('validate-ip');
var utils = require('./lib/utils');
var renderer = require('./lib/output').renderer;

var nc = module.exports = function (ip, netmask) {
  if (typeof ip !== 'string') {
    throw new TypeError('Expected a string as first argument');
  }

  if (typeof netmask !== 'string') {
    throw new TypeError('Expected a string as the second argument');
  }

  if (!validateip(ip)) {
    throw new Error('Enter a valid IP address');
  }

  if (!validateip(netmask)) {
    throw new Error('Enter a valid netmask');
  }

  var ip_octets = ip.trim().split('.').map(function (num) {
    return parseInt(num, 10);
  });

  var netmask_octets = netmask.trim().split('.').map(function (num) {
    return parseInt(num, 10);
  });

  var bitmask = utils.calculateBitmask(netmask);
  var hostBits = 32 - bitmask;
  var total = Math.pow(2, hostBits);

  var and_octets = ip_octets.map(function (element, index, array) {
    return netmask_octets[index] & element;
  });

  var res = {};

  res.network = and_octets.join('.');
  res.bitmask = bitmask;

  and_octets[and_octets.length - 1] += 1;
  res.firsthost = and_octets.join('.');

  var tmp = hostBits;
  for (var i = and_octets.length - 1; i > 0 && tmp > 0; i--) {
    var power = tmp-8 > 0 ? 8 : tmp;
    if(power === 8) {
      and_octets[i] = Math.pow(2, power) - 1;
      tmp -= 8;
    }else {
      and_octets[i] = Math.pow(2, tmp) - 1;
      tmp = 0;
    }
  }
  res.broadcast = and_octets.join('.');

  and_octets[and_octets.length - 1] -= 1;
  res.lasthost = and_octets.join('.');

  res.totalhost = total - 2;

  return res;
};

module.exports.output = function (ip, netmask) {
  console.log(renderer(ip, netmask, nc(ip, netmask)));
};
