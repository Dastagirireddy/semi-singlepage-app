System.register(['angular2/src/facade/exceptions', 'angular2/src/facade/async', 'angular2/src/facade/collection', "angular2/src/core/di"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var exceptions_1, async_1, collection_1, di_1;
    var PostMessageBusSink, PostMessageBusSource, PostMessageBus, _Channel;
    return {
        setters:[
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            }],
        execute: function() {
            PostMessageBusSink = (function () {
                function PostMessageBusSink(_postMessageTarget) {
                    this._postMessageTarget = _postMessageTarget;
                    this._channels = collection_1.StringMapWrapper.create();
                    this._messageBuffer = [];
                }
                PostMessageBusSink.prototype.attachToZone = function (zone) {
                    var _this = this;
                    this._zone = zone;
                    this._zone.runOutsideAngular(function () {
                        async_1.ObservableWrapper.subscribe(_this._zone.onStable, function (_) { _this._handleOnEventDone(); });
                    });
                };
                PostMessageBusSink.prototype.initChannel = function (channel, runInZone) {
                    var _this = this;
                    if (runInZone === void 0) { runInZone = true; }
                    if (collection_1.StringMapWrapper.contains(this._channels, channel)) {
                        throw new exceptions_1.BaseException(channel + " has already been initialized");
                    }
                    var emitter = new async_1.EventEmitter(false);
                    var channelInfo = new _Channel(emitter, runInZone);
                    this._channels[channel] = channelInfo;
                    emitter.subscribe(function (data) {
                        var message = { channel: channel, message: data };
                        if (runInZone) {
                            _this._messageBuffer.push(message);
                        }
                        else {
                            _this._sendMessages([message]);
                        }
                    });
                };
                PostMessageBusSink.prototype.to = function (channel) {
                    if (collection_1.StringMapWrapper.contains(this._channels, channel)) {
                        return this._channels[channel].emitter;
                    }
                    else {
                        throw new exceptions_1.BaseException(channel + " is not set up. Did you forget to call initChannel?");
                    }
                };
                PostMessageBusSink.prototype._handleOnEventDone = function () {
                    if (this._messageBuffer.length > 0) {
                        this._sendMessages(this._messageBuffer);
                        this._messageBuffer = [];
                    }
                };
                PostMessageBusSink.prototype._sendMessages = function (messages) { this._postMessageTarget.postMessage(messages); };
                return PostMessageBusSink;
            }());
            exports_1("PostMessageBusSink", PostMessageBusSink);
            PostMessageBusSource = (function () {
                function PostMessageBusSource(eventTarget) {
                    var _this = this;
                    this._channels = collection_1.StringMapWrapper.create();
                    if (eventTarget) {
                        eventTarget.addEventListener("message", function (ev) { return _this._handleMessages(ev); });
                    }
                    else {
                        // if no eventTarget is given we assume we're in a WebWorker and listen on the global scope
                        addEventListener("message", function (ev) { return _this._handleMessages(ev); });
                    }
                }
                PostMessageBusSource.prototype.attachToZone = function (zone) { this._zone = zone; };
                PostMessageBusSource.prototype.initChannel = function (channel, runInZone) {
                    if (runInZone === void 0) { runInZone = true; }
                    if (collection_1.StringMapWrapper.contains(this._channels, channel)) {
                        throw new exceptions_1.BaseException(channel + " has already been initialized");
                    }
                    var emitter = new async_1.EventEmitter(false);
                    var channelInfo = new _Channel(emitter, runInZone);
                    this._channels[channel] = channelInfo;
                };
                PostMessageBusSource.prototype.from = function (channel) {
                    if (collection_1.StringMapWrapper.contains(this._channels, channel)) {
                        return this._channels[channel].emitter;
                    }
                    else {
                        throw new exceptions_1.BaseException(channel + " is not set up. Did you forget to call initChannel?");
                    }
                };
                PostMessageBusSource.prototype._handleMessages = function (ev) {
                    var messages = ev.data;
                    for (var i = 0; i < messages.length; i++) {
                        this._handleMessage(messages[i]);
                    }
                };
                PostMessageBusSource.prototype._handleMessage = function (data) {
                    var channel = data.channel;
                    if (collection_1.StringMapWrapper.contains(this._channels, channel)) {
                        var channelInfo = this._channels[channel];
                        if (channelInfo.runInZone) {
                            this._zone.run(function () { channelInfo.emitter.emit(data.message); });
                        }
                        else {
                            channelInfo.emitter.emit(data.message);
                        }
                    }
                };
                return PostMessageBusSource;
            }());
            exports_1("PostMessageBusSource", PostMessageBusSource);
            /**
             * A TypeScript implementation of {@link MessageBus} for communicating via JavaScript's
             * postMessage API.
             */
            PostMessageBus = (function () {
                function PostMessageBus(sink, source) {
                    this.sink = sink;
                    this.source = source;
                }
                PostMessageBus.prototype.attachToZone = function (zone) {
                    this.source.attachToZone(zone);
                    this.sink.attachToZone(zone);
                };
                PostMessageBus.prototype.initChannel = function (channel, runInZone) {
                    if (runInZone === void 0) { runInZone = true; }
                    this.source.initChannel(channel, runInZone);
                    this.sink.initChannel(channel, runInZone);
                };
                PostMessageBus.prototype.from = function (channel) { return this.source.from(channel); };
                PostMessageBus.prototype.to = function (channel) { return this.sink.to(channel); };
                PostMessageBus = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [PostMessageBusSink, PostMessageBusSource])
                ], PostMessageBus);
                return PostMessageBus;
            }());
            exports_1("PostMessageBus", PostMessageBus);
            /**
             * Helper class that wraps a channel's {@link EventEmitter} and
             * keeps track of if it should run in the zone.
             */
            _Channel = (function () {
                function _Channel(emitter, runInZone) {
                    this.emitter = emitter;
                    this.runInZone = runInZone;
                }
                return _Channel;
            }());
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9wb3N0X21lc3NhZ2VfYnVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBY0E7Z0JBS0UsNEJBQW9CLGtCQUFxQztvQkFBckMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtvQkFIakQsY0FBUyxHQUE4Qiw2QkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDakUsbUJBQWMsR0FBa0IsRUFBRSxDQUFDO2dCQUVpQixDQUFDO2dCQUU3RCx5Q0FBWSxHQUFaLFVBQWEsSUFBWTtvQkFBekIsaUJBS0M7b0JBSkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUM7d0JBQzNCLHlCQUFpQixDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxVQUFDLENBQUMsSUFBTyxLQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxRixDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQUVELHdDQUFXLEdBQVgsVUFBWSxPQUFlLEVBQUUsU0FBeUI7b0JBQXRELGlCQWdCQztvQkFoQjRCLHlCQUF5QixHQUF6QixnQkFBeUI7b0JBQ3BELEVBQUUsQ0FBQyxDQUFDLDZCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdkQsTUFBTSxJQUFJLDBCQUFhLENBQUksT0FBTyxrQ0FBK0IsQ0FBQyxDQUFDO29CQUNyRSxDQUFDO29CQUVELElBQUksT0FBTyxHQUFHLElBQUksb0JBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDdEMsSUFBSSxXQUFXLEdBQUcsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFLFNB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SSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQWhCMUU7b0JBQUMsZUFBVSxFQUFFOztrQ0FBQTtnQkFpQmIscUJBQUM7WUFBRCxDQWhCQSxBQWdCQyxJQUFBO1lBaEJELDJDQWdCQyxDQUFBO1lBRUQ7OztlQUdHO1lBQ0g7Z0JBQ0Usa0JBQW1CLE9BQTBCLEVBQVMsU0FBa0I7b0JBQXJELFlBQU8sR0FBUCxPQUFPLENBQW1CO29CQUFTLGNBQVMsR0FBVCxTQUFTLENBQVM7Z0JBQUcsQ0FBQztnQkFDOUUsZUFBQztZQUFELENBRkEsQUFFQyxJQUFBIiwiZmlsZSI6InB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9wb3N0X21lc3NhZ2VfYnVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgTWVzc2FnZUJ1cyxcbiAgTWVzc2FnZUJ1c1NvdXJjZSxcbiAgTWVzc2FnZUJ1c1Npbmtcbn0gZnJvbSBcImFuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvbWVzc2FnZV9idXNcIjtcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbiwgV3JhcHBlZEV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBPYnNlcnZhYmxlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5pbXBvcnQge1N0cmluZ01hcFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gXCJhbmd1bGFyMi9zcmMvY29yZS9kaVwiO1xuaW1wb3J0IHtOZ1pvbmV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3pvbmUvbmdfem9uZSc7XG5cbi8vIFRPRE8oanRlcGxpdHo2MDIpIFJlcGxhY2UgdGhpcyB3aXRoIHRoZSBkZWZpbml0aW9uIGluIGxpYi53ZWJ3b3JrZXIuZC50cygjMzQ5MilcbmV4cG9ydCBpbnRlcmZhY2UgUG9zdE1lc3NhZ2VUYXJnZXQgeyBwb3N0TWVzc2FnZTogKG1lc3NhZ2U6IGFueSwgdHJhbnNmZXI/OltBcnJheUJ1ZmZlcl0pID0+IHZvaWQ7IH1cblxuZXhwb3J0IGNsYXNzIFBvc3RNZXNzYWdlQnVzU2luayBpbXBsZW1lbnRzIE1lc3NhZ2VCdXNTaW5rIHtcbiAgcHJpdmF0ZSBfem9uZTogTmdab25lO1xuICBwcml2YXRlIF9jaGFubmVsczoge1trZXk6IHN0cmluZ106IF9DaGFubmVsfSA9IFN0cmluZ01hcFdyYXBwZXIuY3JlYXRlKCk7XG4gIHByaXZhdGUgX21lc3NhZ2VCdWZmZXI6IEFycmF5PE9iamVjdD4gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wb3N0TWVzc2FnZVRhcmdldDogUG9zdE1lc3NhZ2VUYXJnZXQpIHt9XG5cbiAgYXR0YWNoVG9ab25lKHpvbmU6IE5nWm9uZSk6IHZvaWQge1xuICAgIHRoaXMuX3pvbmUgPSB6b25lO1xuICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgT2JzZXJ2YWJsZVdyYXBwZXIuc3Vic2NyaWJlKHRoaXMuX3pvbmUub25TdGFibGUsIChfKSA9PiB7IHRoaXMuX2hhbmRsZU9uRXZlbnREb25lKCk7IH0pO1xuICAgIH0pO1xuICB9XG5cbiAgaW5pdENoYW5uZWwoY2hhbm5lbDogc3RyaW5nLCBydW5JblpvbmU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgaWYgKFN0cmluZ01hcFdyYXBwZXIuY29udGFpbnModGhpcy5fY2hhbm5lbHMsIGNoYW5uZWwpKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgJHtjaGFubmVsfSBoYXMgYWxyZWFkeSBiZWVuIGluaXRpYWxpemVkYCk7XG4gICAgfVxuXG4gICAgdmFyIGVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcbiAgICB2YXIgY2hhbm5lbEluZm8gPSBuZXcgX0NoYW5uZWwoZW1pdHRlciwgcnVuSW5ab25lKTtcbiAgICB0aGlzLl9jaGFubmVsc1tjaGFubmVsXSA9IGNoYW5uZWxJbmZvO1xuICAgIGVtaXR0ZXIuc3Vic2NyaWJlKChkYXRhOiBPYmplY3QpID0+IHtcbiAgICAgIHZhciBtZXNzYWdlID0ge2NoYW5uZWw6IGNoYW5uZWwsIG1lc3NhZ2U6IGRhdGF9O1xuICAgICAgaWYgKHJ1bkluWm9uZSkge1xuICAgICAgICB0aGlzLl9tZXNzYWdlQnVmZmVyLnB1c2gobWVzc2FnZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zZW5kTWVzc2FnZXMoW21lc3NhZ2VdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHRvKGNoYW5uZWw6IHN0cmluZyk6IEV2ZW50RW1pdHRlcjxhbnk+IHtcbiAgICBpZiAoU3RyaW5nTWFwV3JhcHBlci5jb250YWlucyh0aGlzLl9jaGFubmVscywgY2hhbm5lbCkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jaGFubmVsc1tjaGFubmVsXS5lbWl0dGVyO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgJHtjaGFubmVsfSBpcyBub3Qgc2V0IHVwLiBEaWQgeW91IGZvcmdldCB0byBjYWxsIGluaXRDaGFubmVsP2ApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZU9uRXZlbnREb25lKCkge1xuICAgIGlmICh0aGlzLl9tZXNzYWdlQnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX3NlbmRNZXNzYWdlcyh0aGlzLl9tZXNzYWdlQnVmZmVyKTtcbiAgICAgIHRoaXMuX21lc3NhZ2VCdWZmZXIgPSBbXTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zZW5kTWVzc2FnZXMobWVzc2FnZXM6IEFycmF5PE9iamVjdD4pIHsgdGhpcy5fcG9zdE1lc3NhZ2VUYXJnZXQucG9zdE1lc3NhZ2UobWVzc2FnZXMpOyB9XG59XG5cbmV4cG9ydCBjbGFzcyBQb3N0TWVzc2FnZUJ1c1NvdXJjZSBpbXBsZW1lbnRzIE1lc3NhZ2VCdXNTb3VyY2Uge1xuICBwcml2YXRlIF96b25lOiBOZ1pvbmU7XG4gIHByaXZhdGUgX2NoYW5uZWxzOiB7W2tleTogc3RyaW5nXTogX0NoYW5uZWx9ID0gU3RyaW5nTWFwV3JhcHBlci5jcmVhdGUoKTtcblxuICBjb25zdHJ1Y3RvcihldmVudFRhcmdldD86IEV2ZW50VGFyZ2V0KSB7XG4gICAgaWYgKGV2ZW50VGFyZ2V0KSB7XG4gICAgICBldmVudFRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoZXY6IE1lc3NhZ2VFdmVudCkgPT4gdGhpcy5faGFuZGxlTWVzc2FnZXMoZXYpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgbm8gZXZlbnRUYXJnZXQgaXMgZ2l2ZW4gd2UgYXNzdW1lIHdlJ3JlIGluIGEgV2ViV29ya2VyIGFuZCBsaXN0ZW4gb24gdGhlIGdsb2JhbCBzY29wZVxuICAgICAgYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgKGV2OiBNZXNzYWdlRXZlbnQpID0+IHRoaXMuX2hhbmRsZU1lc3NhZ2VzKGV2KSk7XG4gICAgfVxuICB9XG5cbiAgYXR0YWNoVG9ab25lKHpvbmU6IE5nWm9uZSkgeyB0aGlzLl96b25lID0gem9uZTsgfVxuXG4gIGluaXRDaGFubmVsKGNoYW5uZWw6IHN0cmluZywgcnVuSW5ab25lOiBib29sZWFuID0gdHJ1ZSkge1xuICAgIGlmIChTdHJpbmdNYXBXcmFwcGVyLmNvbnRhaW5zKHRoaXMuX2NoYW5uZWxzLCBjaGFubmVsKSkge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYCR7Y2hhbm5lbH0gaGFzIGFscmVhZHkgYmVlbiBpbml0aWFsaXplZGApO1xuICAgIH1cblxuICAgIHZhciBlbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcihmYWxzZSk7XG4gICAgdmFyIGNoYW5uZWxJbmZvID0gbmV3IF9DaGFubmVsKGVtaXR0ZXIsIHJ1bkluWm9uZSk7XG4gICAgdGhpcy5fY2hhbm5lbHNbY2hhbm5lbF0gPSBjaGFubmVsSW5mbztcbiAgfVxuXG4gIGZyb20oY2hhbm5lbDogc3RyaW5nKTogRXZlbnRFbWl0dGVyPGFueT4ge1xuICAgIGlmIChTdHJpbmdNYXBXcmFwcGVyLmNvbnRhaW5zKHRoaXMuX2NoYW5uZWxzLCBjaGFubmVsKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NoYW5uZWxzW2NoYW5uZWxdLmVtaXR0ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGAke2NoYW5uZWx9IGlzIG5vdCBzZXQgdXAuIERpZCB5b3UgZm9yZ2V0IHRvIGNhbGwgaW5pdENoYW5uZWw/YCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlTWVzc2FnZXMoZXY6IE1lc3NhZ2VFdmVudCk6IHZvaWQge1xuICAgIHZhciBtZXNzYWdlcyA9IGV2LmRhdGE7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXNzYWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5faGFuZGxlTWVzc2FnZShtZXNzYWdlc1tpXSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlTWVzc2FnZShkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICB2YXIgY2hhbm5lbCA9IGRhdGEuY2hhbm5lbDtcbiAgICBpZiAoU3RyaW5nTWFwV3JhcHBlci5jb250YWlucyh0aGlzLl9jaGFubmVscywgY2hhbm5lbCkpIHtcbiAgICAgIHZhciBjaGFubmVsSW5mbyA9IHRoaXMuX2NoYW5uZWxzW2NoYW5uZWxdO1xuICAgICAgaWYgKGNoYW5uZWxJbmZvLnJ1bkluWm9uZSkge1xuICAgICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiB7IGNoYW5uZWxJbmZvLmVtaXR0ZXIuZW1pdChkYXRhLm1lc3NhZ2UpOyB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoYW5uZWxJbmZvLmVtaXR0ZXIuZW1pdChkYXRhLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEEgVHlwZVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiB7QGxpbmsgTWVzc2FnZUJ1c30gZm9yIGNvbW11bmljYXRpbmcgdmlhIEphdmFTY3JpcHQnc1xuICogcG9zdE1lc3NhZ2UgQVBJLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUG9zdE1lc3NhZ2VCdXMgaW1wbGVtZW50cyBNZXNzYWdlQnVzIHtcbiAgY29uc3RydWN0b3IocHVibGljIHNpbms6IFBvc3RNZXNzYWdlQnVzU2luaywgcHVibGljIHNvdXJjZTogUG9zdE1lc3NhZ2VCdXNTb3VyY2UpIHt9XG5cbiAgYXR0YWNoVG9ab25lKHpvbmU6IE5nWm9uZSk6IHZvaWQge1xuICAgIHRoaXMuc291cmNlLmF0dGFjaFRvWm9uZSh6b25lKTtcbiAgICB0aGlzLnNpbmsuYXR0YWNoVG9ab25lKHpvbmUpO1xuICB9XG5cbiAgaW5pdENoYW5uZWwoY2hhbm5lbDogc3RyaW5nLCBydW5JblpvbmU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgdGhpcy5zb3VyY2UuaW5pdENoYW5uZWwoY2hhbm5lbCwgcnVuSW5ab25lKTtcbiAgICB0aGlzLnNpbmsuaW5pdENoYW5uZWwoY2hhbm5lbCwgcnVuSW5ab25lKTtcbiAgfVxuXG4gIGZyb20oY2hhbm5lbDogc3RyaW5nKTogRXZlbnRFbWl0dGVyPGFueT4geyByZXR1cm4gdGhpcy5zb3VyY2UuZnJvbShjaGFubmVsKTsgfVxuXG4gIHRvKGNoYW5uZWw6IHN0cmluZyk6IEV2ZW50RW1pdHRlcjxhbnk+IHsgcmV0dXJuIHRoaXMuc2luay50byhjaGFubmVsKTsgfVxufVxuXG4vKipcbiAqIEhlbHBlciBjbGFzcyB0aGF0IHdyYXBzIGEgY2hhbm5lbCdzIHtAbGluayBFdmVudEVtaXR0ZXJ9IGFuZFxuICoga2VlcHMgdHJhY2sgb2YgaWYgaXQgc2hvdWxkIHJ1biBpbiB0aGUgem9uZS5cbiAqL1xuY2xhc3MgX0NoYW5uZWwge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZW1pdHRlcjogRXZlbnRFbWl0dGVyPGFueT4sIHB1YmxpYyBydW5JblpvbmU6IGJvb2xlYW4pIHt9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
