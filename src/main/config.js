define([
  "dojo/_base/declare"
  , "dojo/_base/config"
], function(
  declare
  , dojoConfig
){
  var ConfigCls = declare([
  ], {
    __dirname: dojoConfig.__dirname
    
    , constructor: function(par){
      declare.safeMixin(this, par);
	}
  });
  //console.log("config:");
  //console.log(dojoConfig.nodeMirrorConfig);
  var config = new ConfigCls(dojoConfig.nodeMirrorConfig);
  return config;
});