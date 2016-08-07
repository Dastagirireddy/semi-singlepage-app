#!/usr/bin/env node
"use strict";
var app = require("../src/server/app");
var http = require("http");
var Www = (function () {
    function Www() {
        this.port = process.env.PORT || 7000;
        this.app = app;
        this.init();
    }
    Www.bootstrap = function () {
        return new Www();
    };
    Www.prototype.init = function () {
        this.app.set("port", this.port);
        this.server = http.createServer(this.app);
        this.listener();
        this.errorHandler();
    };
    Www.prototype.listener = function () {
        this.server.listen(this.port);
    };
    Www.prototype.errorHandler = function () {
        this.server.on("error", onError.bind(this));
        this.server.on("listening", onListening.bind(this));
        function onError(error) {
            if (error.syscall !== "listen") {
                throw error;
            }
            // handle specific listen errors with friendly messages
            switch (error.code) {
                case "EACCES":
                    console.error(this.port + " requires elevated privileges");
                    process.exit(1);
                    break;
                case "EADDRINUSE":
                    console.error(this.port + " is already in use");
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        }
        function onListening() {
            console.log("Listening on " + this.port);
        }
    };
    return Www;
}());
Www.bootstrap();
