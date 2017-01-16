'use strict';
var repeating = require('repeating');
var chalk = require('chalk');
var utils = require('./utils');

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
    value: '/' + utils.calculateBitmask(netmask)
  });

  return ret;
}

function getBody(result) {
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
    ret = repeating(length, ' ');
  }

  return ret;
}

module.exports.renderer = function(ip, netmask, result) {
  return [
    '\n' + chalk.grey(repeating(36, '-')) + '\n',
    getHeader(ip, netmask).map(function(item) {
      return item.label+buffer(item.label, 13)+': '+chalk.yellow(item.value);
    }).join('\n'),
    '',
    getBody(result).map(function(item) {
      return item.label+buffer(item.label, 20)+'| '+chalk.cyan(item.value);
    }).join('\n'),
    '\n' + chalk.grey(repeating(36, '-')) + '\n'
  ].join('\n');
}
