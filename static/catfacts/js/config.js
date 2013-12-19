'use strict';

require.config({
  baseUrl: 'assets',
  paths: {
    // catfacts modules
    ui: 'catfacts/js/ui',
    app: 'catfacts/js/app',
    util: 'catfacts/js/util',
    consts: 'catfacts/js/consts',

    // vendor modules
    bacon: 'vendor/Bacon.min',
    jquery: 'vendor/jquery-2.0.3.min',
    underscore: 'vendor/underscore-min',
    bootstrap: 'vendor/bost/js/bootstrap.min.js'
  },
  shim: {
    underscore: { exports: '_'},
    bootstrap: { deps: ['jquery'] },
    bacon: { deps: ['jquery'] }
  }
});


require(['jquery', 'app'], function ($, app) { 
  app.beforeDOM()
  $(document).ready(app.init)
});
