'use strict';
var validateip = require('validate-ip');
var repeating = require('repeating');
var chalk = require('chalk');

function toBinary(n) {
  if(n <= 1) {
    return String(n);
  } else {
    return toBinary(Math.floor(n/2)) + String(n%2);
  }
}

function calcBitmask(netmask) {
  return netmask.trim()
  .split('.')
  .map(function (num) {
    return (toBinary(num).match(/1/g) || []).length;
  })
  .reduce(function(a, b) {
    return a + b;
  });
}

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

  var bitmask = calcBitmask(netmask);
  var totalhost = Math.pow(2, 32 - bitmask) - 2;

  var and_octets = ip_octets.map(function (element, index, array) {
    return netmask_octets[index] & element;
  });

  var res = {};

  res.network = and_octets.join('.');
  
  res.bitmask = bitmask;

  and_octets[and_octets.length - 1] += 1;
  res.firsthost = and_octets.join('.');

  and_octets[and_octets.length - 1] += totalhost;
  res.broadcast = and_octets.join('.');

  and_octets[and_octets.length - 1] -= 1;
  res.lasthost = and_octets.join('.');

  res.totalhost = totalhost;

  return res;
};

function getHeader(ip, netmask) {
  var ret = [];

  ret.push({
    label: 'IP Address',
    value: ip
  });

  ret.push({
    label: 'Netmask',
    value: netmask
  });

  ret.push({
    label: 'Bitmask',
    value: '/' + calcBitmask(netmask)
  });

  return ret;
}

function getMain(result) {
  var ret = [];

  ret.push({
    label: 'Network',
    value: result.network
  });

  ret.push({
    label: 'First Host',
    value: result.firsthost
  });

  ret.push({
    label: 'Last Host',
    value: result.lasthost
  });

  ret.push({
    label: 'Broadcast Address',
    value: result.broadcast
  });

  ret.push({
    label: 'Total Host Count',
    value: result.totalhost
  });

  return ret;
}

function buffer(msg, length) {
  var ret = '';

  if (length === undefined) {
    length = 44;
  }

  length = length - msg.length - 1;

  if (length > 0) {
    ret = repeating(' ', length);
  }

  return ret;
}

function renderer(header, main) {
  return [
    '\n' + chalk.grey(repeating('-', 36)) + '\n',
    header.map(function(item) {
      return item.label+buffer(item.label, 13)+': '+chalk.yellow(item.value);
    }).join('\n'),
    '',
    main.map(function(item) {
      return item.label+buffer(item.label, 20)+'| '+chalk.cyan(item.value);
    }).join('\n'),
    '\n' + chalk.grey(repeating('-', 36)) + '\n'
  ].join('\n');
}

module.exports.output = function (ip, netmask) {
  var result = nc(ip, netmask);
  var header = getHeader(ip, netmask);
  var main = getMain(result);

  console.log(renderer(header,main));
};
