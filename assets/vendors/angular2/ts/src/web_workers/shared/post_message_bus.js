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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvcG9zdF9tZXNzYWdlX2J1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQWNBO2dCQUtFLDRCQUFvQixrQkFBcUM7b0JBQXJDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7b0JBSGpELGNBQVMsR0FBOEIsNkJBQWdCLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ2pFLG1CQUFjLEdBQWtCLEVBQUUsQ0FBQztnQkFFaUIsQ0FBQztnQkFFN0QseUNBQVksR0FBWixVQUFhLElBQVk7b0JBQXpCLGlCQUtDO29CQUpDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO29CQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDO3dCQUMzQix5QkFBaUIsQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsVUFBQyxDQUFDLElBQU8sS0FBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUYsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQztnQkFFRCx3Q0FBVyxHQUFYLFVBQVksT0FBZSxFQUFFLFNBQXlCO29CQUF0RCxpQkFnQkM7b0JBaEI0Qix5QkFBeUIsR0FBekIsZ0JBQXlCO29CQUNwRCxFQUFFLENBQUMsQ0FBQyw2QkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3ZELE1BQU0sSUFBSSwwQkFBYSxDQUFJLE9BQU8sa0NBQStCLENBQUMsQ0FBQztvQkFDckUsQ0FBQztvQkFFRCxJQUFJLE9BQU8sR0FBRyxJQUFJLG9CQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3RDLElBQUksV0FBVyxHQUFHLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRSxTQUFTLENB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QyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFoQjFFO29CQUFDLGVBQVUsRUFBRTs7a0NBQUE7Z0JBaUJiLHFCQUFDO1lBQUQsQ0FoQkEsQUFnQkMsSUFBQTtZQWhCRCwyQ0FnQkMsQ0FBQTtZQUVEOzs7ZUFHRztZQUNIO2dCQUNFLGtCQUFtQixPQUEwQixFQUFTLFNBQWtCO29CQUFyRCxZQUFPLEdBQVAsT0FBTyxDQUFtQjtvQkFBUyxjQUFTLEdBQVQsU0FBUyxDQUFTO2dCQUFHLENBQUM7Z0JBQzlFLGVBQUM7WUFBRCxDQUZBLEFBRUMsSUFBQSIsImZpbGUiOiJhc3NldHMvdmVuZG9ycy9hbmd1bGFyMi90cy9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3Bvc3RfbWVzc2FnZV9idXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBNZXNzYWdlQnVzLFxuICBNZXNzYWdlQnVzU291cmNlLFxuICBNZXNzYWdlQnVzU2lua1xufSBmcm9tIFwiYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1c1wiO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCBXcmFwcGVkRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIE9ic2VydmFibGVXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcbmltcG9ydCB7U3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcImFuZ3VsYXIyL3NyYy9jb3JlL2RpXCI7XG5pbXBvcnQge05nWm9uZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvem9uZS9uZ196b25lJztcblxuLy8gVE9ETyhqdGVwbGl0ejYwMikgUmVwbGFjZSB0aGlzIHdpdGggdGhlIGRlZmluaXRpb24gaW4gbGliLndlYndvcmtlci5kLnRzKCMzNDkyKVxuZXhwb3J0IGludGVyZmFjZSBQb3N0TWVzc2FnZVRhcmdldCB7IHBvc3RNZXNzYWdlOiAobWVzc2FnZTogYW55LCB0cmFuc2Zlcj86W0FycmF5QnVmZmVyXSkgPT4gdm9pZDsgfVxuXG5leHBvcnQgY2xhc3MgUG9zdE1lc3NhZ2VCdXNTaW5rIGltcGxlbWVudHMgTWVzc2FnZUJ1c1Npbmsge1xuICBwcml2YXRlIF96b25lOiBOZ1pvbmU7XG4gIHByaXZhdGUgX2NoYW5uZWxzOiB7W2tleTogc3RyaW5nXTogX0NoYW5uZWx9ID0gU3RyaW5nTWFwV3JhcHBlci5jcmVhdGUoKTtcbiAgcHJpdmF0ZSBfbWVzc2FnZUJ1ZmZlcjogQXJyYXk8T2JqZWN0PiA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3Bvc3RNZXNzYWdlVGFyZ2V0OiBQb3N0TWVzc2FnZVRhcmdldCkge31cblxuICBhdHRhY2hUb1pvbmUoem9uZTogTmdab25lKTogdm9pZCB7XG4gICAgdGhpcy5fem9uZSA9IHpvbmU7XG4gICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBPYnNlcnZhYmxlV3JhcHBlci5zdWJzY3JpYmUodGhpcy5fem9uZS5vblN0YWJsZSwgKF8pID0+IHsgdGhpcy5faGFuZGxlT25FdmVudERvbmUoKTsgfSk7XG4gICAgfSk7XG4gIH1cblxuICBpbml0Q2hhbm5lbChjaGFubmVsOiBzdHJpbmcsIHJ1bkluWm9uZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICBpZiAoU3RyaW5nTWFwV3JhcHBlci5jb250YWlucyh0aGlzLl9jaGFubmVscywgY2hhbm5lbCkpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGAke2NoYW5uZWx9IGhhcyBhbHJlYWR5IGJlZW4gaW5pdGlhbGl6ZWRgKTtcbiAgICB9XG5cbiAgICB2YXIgZW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoZmFsc2UpO1xuICAgIHZhciBjaGFubmVsSW5mbyA9IG5ldyBfQ2hhbm5lbChlbWl0dGVyLCBydW5JblpvbmUpO1xuICAgIHRoaXMuX2NoYW5uZWxzW2NoYW5uZWxdID0gY2hhbm5lbEluZm87XG4gICAgZW1pdHRlci5zdWJzY3JpYmUoKGRhdGE6IE9iamVjdCkgPT4ge1xuICAgICAgdmFyIG1lc3NhZ2UgPSB7Y2hhbm5lbDogY2hhbm5lbCwgbWVzc2FnZTogZGF0YX07XG4gICAgICBpZiAocnVuSW5ab25lKSB7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VCdWZmZXIucHVzaChtZXNzYWdlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3NlbmRNZXNzYWdlcyhbbWVzc2FnZV0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgdG8oY2hhbm5lbDogc3RyaW5nKTogRXZlbnRFbWl0dGVyPGFueT4ge1xuICAgIGlmIChTdHJpbmdNYXBXcmFwcGVyLmNvbnRhaW5zKHRoaXMuX2NoYW5uZWxzLCBjaGFubmVsKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NoYW5uZWxzW2NoYW5uZWxdLmVtaXR0ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGAke2NoYW5uZWx9IGlzIG5vdCBzZXQgdXAuIERpZCB5b3UgZm9yZ2V0IHRvIGNhbGwgaW5pdENoYW5uZWw/YCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlT25FdmVudERvbmUoKSB7XG4gICAgaWYgKHRoaXMuX21lc3NhZ2VCdWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5fc2VuZE1lc3NhZ2VzKHRoaXMuX21lc3NhZ2VCdWZmZXIpO1xuICAgICAgdGhpcy5fbWVzc2FnZUJ1ZmZlciA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NlbmRNZXNzYWdlcyhtZXNzYWdlczogQXJyYXk8T2JqZWN0PikgeyB0aGlzLl9wb3N0TWVzc2FnZVRhcmdldC5wb3N0TWVzc2FnZShtZXNzYWdlcyk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFBvc3RNZXNzYWdlQnVzU291cmNlIGltcGxlbWVudHMgTWVzc2FnZUJ1c1NvdXJjZSB7XG4gIHByaXZhdGUgX3pvbmU6IE5nWm9uZTtcbiAgcHJpdmF0ZSBfY2hhbm5lbHM6IHtba2V5OiBzdHJpbmddOiBfQ2hhbm5lbH0gPSBTdHJpbmdNYXBXcmFwcGVyLmNyZWF0ZSgpO1xuXG4gIGNvbnN0cnVjdG9yKGV2ZW50VGFyZ2V0PzogRXZlbnRUYXJnZXQpIHtcbiAgICBpZiAoZXZlbnRUYXJnZXQpIHtcbiAgICAgIGV2ZW50VGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIChldjogTWVzc2FnZUV2ZW50KSA9PiB0aGlzLl9oYW5kbGVNZXNzYWdlcyhldikpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBubyBldmVudFRhcmdldCBpcyBnaXZlbiB3ZSBhc3N1bWUgd2UncmUgaW4gYSBXZWJXb3JrZXIgYW5kIGxpc3RlbiBvbiB0aGUgZ2xvYmFsIHNjb3BlXG4gICAgICBhZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCAoZXY6IE1lc3NhZ2VFdmVudCkgPT4gdGhpcy5faGFuZGxlTWVzc2FnZXMoZXYpKTtcbiAgICB9XG4gIH1cblxuICBhdHRhY2hUb1pvbmUoem9uZTogTmdab25lKSB7IHRoaXMuX3pvbmUgPSB6b25lOyB9XG5cbiAgaW5pdENoYW5uZWwoY2hhbm5lbDogc3RyaW5nLCBydW5JblpvbmU6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgaWYgKFN0cmluZ01hcFdyYXBwZXIuY29udGFpbnModGhpcy5fY2hhbm5lbHMsIGNoYW5uZWwpKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihgJHtjaGFubmVsfSBoYXMgYWxyZWFkeSBiZWVuIGluaXRpYWxpemVkYCk7XG4gICAgfVxuXG4gICAgdmFyIGVtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKGZhbHNlKTtcbiAgICB2YXIgY2hhbm5lbEluZm8gPSBuZXcgX0NoYW5uZWwoZW1pdHRlciwgcnVuSW5ab25lKTtcbiAgICB0aGlzLl9jaGFubmVsc1tjaGFubmVsXSA9IGNoYW5uZWxJbmZvO1xuICB9XG5cbiAgZnJvbShjaGFubmVsOiBzdHJpbmcpOiBFdmVudEVtaXR0ZXI8YW55PiB7XG4gICAgaWYgKFN0cmluZ01hcFdyYXBwZXIuY29udGFpbnModGhpcy5fY2hhbm5lbHMsIGNoYW5uZWwpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY2hhbm5lbHNbY2hhbm5lbF0uZW1pdHRlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYCR7Y2hhbm5lbH0gaXMgbm90IHNldCB1cC4gRGlkIHlvdSBmb3JnZXQgdG8gY2FsbCBpbml0Q2hhbm5lbD9gKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVNZXNzYWdlcyhldjogTWVzc2FnZUV2ZW50KTogdm9pZCB7XG4gICAgdmFyIG1lc3NhZ2VzID0gZXYuZGF0YTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1lc3NhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLl9oYW5kbGVNZXNzYWdlKG1lc3NhZ2VzW2ldKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9oYW5kbGVNZXNzYWdlKGRhdGE6IGFueSk6IHZvaWQge1xuICAgIHZhciBjaGFubmVsID0gZGF0YS5jaGFubmVsO1xuICAgIGlmIChTdHJpbmdNYXBXcmFwcGVyLmNvbnRhaW5zKHRoaXMuX2NoYW5uZWxzLCBjaGFubmVsKSkge1xuICAgICAgdmFyIGNoYW5uZWxJbmZvID0gdGhpcy5fY2hhbm5lbHNbY2hhbm5lbF07XG4gICAgICBpZiAoY2hhbm5lbEluZm8ucnVuSW5ab25lKSB7XG4gICAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IHsgY2hhbm5lbEluZm8uZW1pdHRlci5lbWl0KGRhdGEubWVzc2FnZSk7IH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2hhbm5lbEluZm8uZW1pdHRlci5lbWl0KGRhdGEubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQSBUeXBlU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHtAbGluayBNZXNzYWdlQnVzfSBmb3IgY29tbXVuaWNhdGluZyB2aWEgSmF2YVNjcmlwdCdzXG4gKiBwb3N0TWVzc2FnZSBBUEkuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQb3N0TWVzc2FnZUJ1cyBpbXBsZW1lbnRzIE1lc3NhZ2VCdXMge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgc2luazogUG9zdE1lc3NhZ2VCdXNTaW5rLCBwdWJsaWMgc291cmNlOiBQb3N0TWVzc2FnZUJ1c1NvdXJjZSkge31cblxuICBhdHRhY2hUb1pvbmUoem9uZTogTmdab25lKTogdm9pZCB7XG4gICAgdGhpcy5zb3VyY2UuYXR0YWNoVG9ab25lKHpvbmUpO1xuICAgIHRoaXMuc2luay5hdHRhY2hUb1pvbmUoem9uZSk7XG4gIH1cblxuICBpbml0Q2hhbm5lbChjaGFubmVsOiBzdHJpbmcsIHJ1bkluWm9uZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICB0aGlzLnNvdXJjZS5pbml0Q2hhbm5lbChjaGFubmVsLCBydW5JblpvbmUpO1xuICAgIHRoaXMuc2luay5pbml0Q2hhbm5lbChjaGFubmVsLCBydW5JblpvbmUpO1xuICB9XG5cbiAgZnJvbShjaGFubmVsOiBzdHJpbmcpOiBFdmVudEVtaXR0ZXI8YW55PiB7IHJldHVybiB0aGlzLnNvdXJjZS5mcm9tKGNoYW5uZWwpOyB9XG5cbiAgdG8oY2hhbm5lbDogc3RyaW5nKTogRXZlbnRFbWl0dGVyPGFueT4geyByZXR1cm4gdGhpcy5zaW5rLnRvKGNoYW5uZWwpOyB9XG59XG5cbi8qKlxuICogSGVscGVyIGNsYXNzIHRoYXQgd3JhcHMgYSBjaGFubmVsJ3Mge0BsaW5rIEV2ZW50RW1pdHRlcn0gYW5kXG4gKiBrZWVwcyB0cmFjayBvZiBpZiBpdCBzaG91bGQgcnVuIGluIHRoZSB6b25lLlxuICovXG5jbGFzcyBfQ2hhbm5lbCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbWl0dGVyOiBFdmVudEVtaXR0ZXI8YW55PiwgcHVibGljIHJ1bkluWm9uZTogYm9vbGVhbikge31cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
