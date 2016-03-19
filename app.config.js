'use strict';

function resolveBase (p) {
  return p === './' ? '.' : p;
}

const config = {};

config.dest = {};
config.dest.base = './lib';
config.dest.styles = resolveBase(config.dest.base) + '/css';
config.dest.scripts = resolveBase(config.dest.base);
config.dest.views = resolveBase(config.dest.base);
config.dest.output = '/index.js';

config.src = {};
config.src.base = './src';
config.src.styles = resolveBase(config.src.base) + '/css';
config.src.scripts = resolveBase(config.src.base);
config.src.partials = resolveBase(config.src.views) + '/partials';
config.src.entry = ['./index'];


module.exports = config;
