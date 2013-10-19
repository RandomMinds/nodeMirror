define([
  "dojo/_base/declare"
  , "term/TerminalWgt"
  , "dijit/layout/BorderContainer"
  , "client/connection"
  , "sol/wgt/Text"
], function(
  declare
  , Terminal
  , BorderContainer
  , connection
  , Text
){
  return declare([BorderContainer], {
    title: "Terminal"
    , closable: true
    , "class": "terminalTab"
    , buildRendering: function(){
      this.inherited(arguments);
      this.terminal = new Terminal({
        region: "center"
        
      });
      this.addChild(this.terminal);
      var self = this;
      var term = this.terminal;
      
        connection.on("terminal_meta", function(meta){
          if (meta.event == "install"){
            self.installWgt = new Text({
              text: "please wait while pty.js is being installed ..."
              , region: "top"
              , "class": "message"
            });
            self.addChild(self.installWgt);
            self.own(self.installWgt);
          };
          if (meta.event == "installerror"){
            if (self.installWgt){
              self.installWgt.destroy();
            };
            errorWgt = new Text({
              text: "installation of pty.js was not successful ..."
              , region: "top"
              , "class": "message"
            });
            self.addChild(errorWgt);
            self.own(errorWgt);
          };
        });
      
      
      connection.emit("openterminal", {
        mode: this.mode
      }, function(par){
        var termid = par.termid;
        
        connection.on(termid + "_meta", function(meta){
          if (meta.event == "ready"){
            if (self.installWgt){
              self.installWgt.destroy();
            };
            self.resize();
            term.emitResize();
          };
        });
        
        term.on("resize", function(size){
          connection.emit(termid + "_resize", size);
        });
        connection.on(termid, function(data){
          term.write(data);
        });
        term.on("data", function(data){
          connection.emit(termid, data);
        });
      });
    }
  });
});