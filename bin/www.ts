#!/usr/bin/env node

"use strict";
import * as app from "../src/app";
import * as http from "http";

class Www {
    public port;
    public server;
    public app;

    constructor() {
        this.port = process.env.PORT || 7000;
        this.app = app;
        this.init();
    }

    public static bootstrap() {
        return new Www();
    }

    public init() {
        this.app.set("port", this.port);
        this.server = http.createServer(this.app);
        this.listener();
        this.errorHandler();
    }

    public listener() {
        this.server.listen(this.port);
    }

    public errorHandler() {
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
    }
}

Www.bootstrap();
