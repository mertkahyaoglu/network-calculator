'use strict';

var tb = module.exports.toBinary = function toBinary(n) {
  if(n <= 1) {
    return String(n);
  } else {
    return toBinary(Math.floor(n/2)) + String(n%2);
  }
}

module.exports.calculateBitmask = function (netmask) {
  return netmask
    .trim()
    .split('.')
    .map(function (num) {
      return (tb(num).match(/1/g) || []).length;
    })
    .reduce(function(a, b) {
      return a + b;
    });
}
