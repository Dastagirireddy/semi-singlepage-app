System.register(['angular2/src/core/di', 'angular2/src/web_workers/shared/client_message_broker', 'angular2/platform/common', 'angular2/src/web_workers/shared/messaging_api', 'angular2/src/web_workers/shared/serialized_types', 'angular2/src/facade/async', 'angular2/src/facade/exceptions', 'angular2/src/web_workers/shared/serializer', 'angular2/src/web_workers/shared/message_bus', 'angular2/src/facade/collection', 'angular2/src/facade/lang', './event_deserializer'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var di_1, client_message_broker_1, common_1, messaging_api_1, serialized_types_1, async_1, exceptions_1, serializer_1, message_bus_1, collection_1, lang_1, event_deserializer_1;
    var WebWorkerPlatformLocation;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (client_message_broker_1_1) {
                client_message_broker_1 = client_message_broker_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (messaging_api_1_1) {
                messaging_api_1 = messaging_api_1_1;
            },
            function (serialized_types_1_1) {
                serialized_types_1 = serialized_types_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (exceptions_1_1) {
                exceptions_1 = exceptions_1_1;
            },
            function (serializer_1_1) {
                serializer_1 = serializer_1_1;
            },
            function (message_bus_1_1) {
                message_bus_1 = message_bus_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (event_deserializer_1_1) {
                event_deserializer_1 = event_deserializer_1_1;
            }],
        execute: function() {
            WebWorkerPlatformLocation = (function (_super) {
                __extends(WebWorkerPlatformLocation, _super);
                function WebWorkerPlatformLocation(brokerFactory, bus, _serializer) {
                    var _this = this;
                    _super.call(this);
                    this._serializer = _serializer;
                    this._popStateListeners = [];
                    this._hashChangeListeners = [];
                    this._location = null;
                    this._broker = brokerFactory.createMessageBroker(messaging_api_1.ROUTER_CHANNEL);
                    this._channelSource = bus.from(messaging_api_1.ROUTER_CHANNEL);
                    async_1.ObservableWrapper.subscribe(this._channelSource, function (msg) {
                        var listeners = null;
                        if (collection_1.StringMapWrapper.contains(msg, 'event')) {
                            var type = msg['event']['type'];
                            if (lang_1.StringWrapper.equals(type, "popstate")) {
                                listeners = _this._popStateListeners;
                            }
                            else if (lang_1.StringWrapper.equals(type, "hashchange")) {
                                listeners = _this._hashChangeListeners;
                            }
                            if (listeners !== null) {
                                var e_1 = event_deserializer_1.deserializeGenericEvent(msg['event']);
                                // There was a popState or hashChange event, so the location object thas been updated
                                _this._location = _this._serializer.deserialize(msg['location'], serialized_types_1.LocationType);
                                listeners.forEach(function (fn) { return fn(e_1); });
                            }
                        }
                    });
                }
                /** @internal **/
                WebWorkerPlatformLocation.prototype.init = function () {
                    var _this = this;
                    var args = new client_message_broker_1.UiArguments("getLocation");
                    var locationPromise = this._broker.runOnService(args, serialized_types_1.LocationType);
                    return async_1.PromiseWrapper.then(locationPromise, function (val) {
                        _this._location = val;
                        return true;
                    }, function (err) { throw new exceptions_1.BaseException(err); });
                };
                WebWorkerPlatformLocation.prototype.getBaseHrefFromDOM = function () {
                    throw new exceptions_1.BaseException("Attempt to get base href from DOM from WebWorker. You must either provide a value for the APP_BASE_HREF token through DI or use the hash location strategy.");
                };
                WebWorkerPlatformLocation.prototype.onPopState = function (fn) { this._popStateListeners.push(fn); };
                WebWorkerPlatformLocation.prototype.onHashChange = function (fn) { this._hashChangeListeners.push(fn); };
                Object.defineProperty(WebWorkerPlatformLocation.prototype, "pathname", {
                    get: function () {
                        if (this._location === null) {
                            return null;
                        }
                        return this._location.pathname;
                    },
                    set: function (newPath) {
                        if (this._location === null) {
                            throw new exceptions_1.BaseException("Attempt to set pathname before value is obtained from UI");
                        }
                        this._location.pathname = newPath;
                        var fnArgs = [new client_message_broker_1.FnArg(newPath, serializer_1.PRIMITIVE)];
                        var args = new client_message_broker_1.UiArguments("setPathname", fnArgs);
                        this._broker.runOnService(args, null);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WebWorkerPlatformLocation.prototype, "search", {
                    get: function () {
                        if (this._location === null) {
                            return null;
                        }
                        return this._location.search;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(WebWorkerPlatformLocation.prototype, "hash", {
                    get: function () {
                        if (this._location === null) {
                            return null;
                        }
                        return this._location.hash;
                    },
                    enumerable: true,
                    configurable: true
                });
                WebWorkerPlatformLocation.prototype.pushState = function (state, title, url) {
                    var fnArgs = [new client_message_broker_1.FnArg(state, serializer_1.PRIMITIVE), new client_message_broker_1.FnArg(title, serializer_1.PRIMITIVE), new client_message_broker_1.FnArg(url, serializer_1.PRIMITIVE)];
                    var args = new client_message_broker_1.UiArguments("pushState", fnArgs);
                    this._broker.runOnService(args, null);
                };
                WebWorkerPlatformLocation.prototype.replaceState = function (state, title, url) {
                    var fnArgs = [new client_message_broker_1.FnArg(state, serializer_1.PRIMITIVE), new client_message_broker_1.FnArg(title, serializer_1.PRIMITIVE), new client_message_broker_1.FnArg(url, serializer_1.PRIMITIVE)];
                    var args = new client_message_broker_1.UiArguments("replaceState", fnArgs);
                    this._broker.runOnService(args, null);
                };
                WebWorkerPlatformLocation.prototype.forward = function () {
                    var args = new client_message_broker_1.UiArguments("forward");
                    this._broker.runOnService(args, null);
                };
                WebWorkerPlatformLocation.prototype.back = function () {
                    var args = new client_message_broker_1.UiArguments("back");
                    this._broker.runOnService(args, null);
                };
                WebWorkerPlatformLocation = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [client_message_broker_1.ClientMessageBrokerFactory, message_bus_1.MessageBus, serializer_1.Serializer])
                ], WebWorkerPlatformLocation);
                return WebWorkerPlatformLocation;
            }(common_1.PlatformLocation));
            exports_1("WebWorkerPlatformLocation", WebWorkerPlatformLocation);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy93ZWJfd29ya2Vycy93b3JrZXIvcGxhdGZvcm1fbG9jYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQW1CQTtnQkFBK0MsNkNBQWdCO2dCQU83RCxtQ0FBWSxhQUF5QyxFQUFFLEdBQWUsRUFDbEQsV0FBdUI7b0JBUjdDLGlCQWdIQztvQkF2R0csaUJBQU8sQ0FBQztvQkFEVSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtvQkFObkMsdUJBQWtCLEdBQW9CLEVBQUUsQ0FBQztvQkFDekMseUJBQW9CLEdBQW9CLEVBQUUsQ0FBQztvQkFDM0MsY0FBUyxHQUFpQixJQUFJLENBQUM7b0JBTXJDLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDLG1CQUFtQixDQUFDLDhCQUFjLENBQUMsQ0FBQztvQkFFakUsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLDhCQUFjLENBQUMsQ0FBQztvQkFDL0MseUJBQWlCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsVUFBQyxHQUF5Qjt3QkFDekUsSUFBSSxTQUFTLEdBQW9CLElBQUksQ0FBQzt3QkFDdEMsRUFBRSxDQUFDLENBQUMsNkJBQWdCLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQzVDLElBQUksSUFBSSxHQUFXLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDeEMsRUFBRSxDQUFDLENBQUMsb0JBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FDM0MsU0FBUyxHQUFHLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQzs0QkFDdEMsQ0FBQzs0QkFBQyxJQUFJLENBQUMsRUFBRSxD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TSxDQUFDLENBQUM7b0JBQ25ELElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDeEMsQ0FBQztnQkFFRCwyQ0FBTyxHQUFQO29CQUNFLElBQUksSUFBSSxHQUFHLElBQUksbUNBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN4QyxDQUFDO2dCQUVELHdDQUFJLEdBQUo7b0JBQ0UsSUFBSSxJQUFJLEdBQUcsSUFBSSxtQ0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3hDLENBQUM7Z0JBaEhIO29CQUFDLGVBQVUsRUFBRTs7NkNBQUE7Z0JBaUhiLGdDQUFDO1lBQUQsQ0FoSEEsQUFnSEMsQ0FoSDhDLHlCQUFnQixHQWdIOUQ7WUFoSEQsaUVBZ0hDLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL3dlYl93b3JrZXJzL3dvcmtlci9wbGF0Zm9ybV9sb2NhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtcbiAgRm5BcmcsXG4gIFVpQXJndW1lbnRzLFxuICBDbGllbnRNZXNzYWdlQnJva2VyLFxuICBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeVxufSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL2NsaWVudF9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge1BsYXRmb3JtTG9jYXRpb24sIFVybENoYW5nZUV2ZW50LCBVcmxDaGFuZ2VMaXN0ZW5lcn0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vY29tbW9uJztcbmltcG9ydCB7Uk9VVEVSX0NIQU5ORUx9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvbWVzc2FnaW5nX2FwaSc7XG5pbXBvcnQge0xvY2F0aW9uVHlwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJpYWxpemVkX3R5cGVzJztcbmltcG9ydCB7UHJvbWlzZVdyYXBwZXIsIEV2ZW50RW1pdHRlciwgT2JzZXJ2YWJsZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtQUklNSVRJVkUsIFNlcmlhbGl6ZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VyaWFsaXplcic7XG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtTdHJpbmdNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtTdHJpbmdXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtkZXNlcmlhbGl6ZUdlbmVyaWNFdmVudH0gZnJvbSAnLi9ldmVudF9kZXNlcmlhbGl6ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV2ViV29ya2VyUGxhdGZvcm1Mb2NhdGlvbiBleHRlbmRzIFBsYXRmb3JtTG9jYXRpb24ge1xuICBwcml2YXRlIF9icm9rZXI6IENsaWVudE1lc3NhZ2VCcm9rZXI7XG4gIHByaXZhdGUgX3BvcFN0YXRlTGlzdGVuZXJzOiBBcnJheTxGdW5jdGlvbj4gPSBbXTtcbiAgcHJpdmF0ZSBfaGFzaENoYW5nZUxpc3RlbmVyczogQXJyYXk8RnVuY3Rpb24+ID0gW107XG4gIHByaXZhdGUgX2xvY2F0aW9uOiBMb2NhdGlvblR5cGUgPSBudWxsO1xuICBwcml2YXRlIF9jaGFubmVsU291cmNlOiBFdmVudEVtaXR0ZXI8T2JqZWN0PjtcblxuICBjb25zdHJ1Y3Rvcihicm9rZXJGYWN0b3J5OiBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSwgYnVzOiBNZXNzYWdlQnVzLFxuICAgICAgICAgICAgICBwcml2YXRlIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9icm9rZXIgPSBicm9rZXJGYWN0b3J5LmNyZWF0ZU1lc3NhZ2VCcm9rZXIoUk9VVEVSX0NIQU5ORUwpO1xuXG4gICAgdGhpcy5fY2hhbm5lbFNvdXJjZSA9IGJ1cy5mcm9tKFJPVVRFUl9DSEFOTkVMKTtcbiAgICBPYnNlcnZhYmxlV3JhcHBlci5zdWJzY3JpYmUodGhpcy5fY2hhbm5lbFNvdXJjZSwgKG1zZzoge1trZXk6IHN0cmluZ106IGFueX0pID0+IHtcbiAgICAgIHZhciBsaXN0ZW5lcnM6IEFycmF5PEZ1bmN0aW9uPiA9IG51bGw7XG4gICAgICBpZiAoU3RyaW5nTWFwV3JhcHBlci5jb250YWlucyhtc2csICdldmVudCcpKSB7XG4gICAgICAgIGxldCB0eXBlOiBzdHJpbmcgPSBtc2dbJ2V2ZW50J11bJ3R5cGUnXTtcbiAgICAgICAgaWYgKFN0cmluZ1dyYXBwZXIuZXF1YWxzKHR5cGUsIFwicG9wc3RhdGVcIikpIHtcbiAgICAgICAgICBsaXN0ZW5lcnMgPSB0aGlzLl9wb3BTdGF0ZUxpc3RlbmVycztcbiAgICAgICAgfSBlbHNlIGlmIChTdHJpbmdXcmFwcGVyLmVxdWFscyh0eXBlLCBcImhhc2hjaGFuZ2VcIikpIHtcbiAgICAgICAgICBsaXN0ZW5lcnMgPSB0aGlzLl9oYXNoQ2hhbmdlTGlzdGVuZXJzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3RlbmVycyAhPT0gbnVsbCkge1xuICAgICAgICAgIGxldCBlID0gZGVzZXJpYWxpemVHZW5lcmljRXZlbnQobXNnWydldmVudCddKTtcbiAgICAgICAgICAvLyBUaGVyZSB3YXMgYSBwb3BTdGF0ZSBvciBoYXNoQ2hhbmdlIGV2ZW50LCBzbyB0aGUgbG9jYXRpb24gb2JqZWN0IHRoYXMgYmVlbiB1cGRhdGVkXG4gICAgICAgICAgdGhpcy5fbG9jYXRpb24gPSB0aGlzLl9zZXJpYWxpemVyLmRlc2VyaWFsaXplKG1zZ1snbG9jYXRpb24nXSwgTG9jYXRpb25UeXBlKTtcbiAgICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaCgoZm46IEZ1bmN0aW9uKSA9PiBmbihlKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKiovXG4gIGluaXQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgdmFyIGFyZ3M6IFVpQXJndW1lbnRzID0gbmV3IFVpQXJndW1lbnRzKFwiZ2V0TG9jYXRpb25cIik7XG5cbiAgICB2YXIgbG9jYXRpb25Qcm9taXNlOiBQcm9taXNlPExvY2F0aW9uVHlwZT4gPSB0aGlzLl9icm9rZXIucnVuT25TZXJ2aWNlKGFyZ3MsIExvY2F0aW9uVHlwZSk7XG4gICAgcmV0dXJuIFByb21pc2VXcmFwcGVyLnRoZW4obG9jYXRpb25Qcm9taXNlLCAodmFsOiBMb2NhdGlvblR5cGUpOiBib29sZWFuID0+IHtcbiAgICAgIHRoaXMuX2xvY2F0aW9uID0gdmFsO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSwgKGVycik6IGJvb2xlYW4gPT4geyB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihlcnIpOyB9KTtcbiAgfVxuXG4gIGdldEJhc2VIcmVmRnJvbURPTSgpOiBzdHJpbmcge1xuICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFxuICAgICAgICBcIkF0dGVtcHQgdG8gZ2V0IGJhc2UgaHJlZiBmcm9tIERPTSBmcm9tIFdlYldvcmtlci4gWW91IG11c3QgZWl0aGVyIHByb3ZpZGUgYSB2YWx1ZSBmb3IgdGhlIEFQUF9CQVNFX0hSRUYgdG9rZW4gdGhyb3VnaCBESSBvciB1c2UgdGhlIGhhc2ggbG9jYXRpb24gc3RyYXRlZ3kuXCIpO1xuICB9XG5cbiAgb25Qb3BTdGF0ZShmbjogVXJsQ2hhbmdlTGlzdGVuZXIpOiB2b2lkIHsgdGhpcy5fcG9wU3RhdGVMaXN0ZW5lcnMucHVzaChmbik7IH1cblxuICBvbkhhc2hDaGFuZ2UoZm46IFVybENoYW5nZUxpc3RlbmVyKTogdm9pZCB7IHRoaXMuX2hhc2hDaGFuZ2VMaXN0ZW5lcnMucHVzaChmbik7IH1cblxuICBnZXQgcGF0aG5hbWUoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5fbG9jYXRpb24gPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9sb2NhdGlvbi5wYXRobmFtZTtcbiAgfVxuXG4gIGdldCBzZWFyY2goKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5fbG9jYXRpb24gPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9sb2NhdGlvbi5zZWFyY2g7XG4gIH1cblxuICBnZXQgaGFzaCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLl9sb2NhdGlvbiA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2xvY2F0aW9uLmhhc2g7XG4gIH1cblxuICBzZXQgcGF0aG5hbWUobmV3UGF0aDogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX2xvY2F0aW9uID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcIkF0dGVtcHQgdG8gc2V0IHBhdGhuYW1lIGJlZm9yZSB2YWx1ZSBpcyBvYnRhaW5lZCBmcm9tIFVJXCIpO1xuICAgIH1cblxuICAgIHRoaXMuX2xvY2F0aW9uLnBhdGhuYW1lID0gbmV3UGF0aDtcblxuICAgIHZhciBmbkFyZ3MgPSBbbmV3IEZuQXJnKG5ld1BhdGgsIFBSSU1JVElWRSldO1xuICAgIHZhciBhcmdzID0gbmV3IFVpQXJndW1lbnRzKFwic2V0UGF0aG5hbWVcIiwgZm5BcmdzKTtcbiAgICB0aGlzLl9icm9rZXIucnVuT25TZXJ2aWNlKGFyZ3MsIG51bGwpO1xuICB9XG5cbiAgcHVzaFN0YXRlKHN0YXRlOiBhbnksIHRpdGxlOiBzdHJpbmcsIHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgdmFyIGZuQXJncyA9XG4gICAgICAgIFtuZXcgRm5Bcmcoc3RhdGUsIFBSSU1JVElWRSksIG5ldyBGbkFyZyh0aXRsZSwgUFJJTUlUSVZFKSwgbmV3IEZuQXJnKHVybCwgUFJJTUlUSVZFKV07XG4gICAgdmFyIGFyZ3MgPSBuZXcgVWlBcmd1bWVudHMoXCJwdXNoU3RhdGVcIiwgZm5BcmdzKTtcbiAgICB0aGlzLl9icm9rZXIucnVuT25TZXJ2aWNlKGFyZ3MsIG51bGwpO1xuICB9XG5cbiAgcmVwbGFjZVN0YXRlKHN0YXRlOiBhbnksIHRpdGxlOiBzdHJpbmcsIHVybDogc3RyaW5nKTogdm9pZCB7XG4gICAgdmFyIGZuQXJncyA9XG4gICAgICAgIFtuZXcgRm5Bcmcoc3RhdGUsIFBSSU1JVElWRSksIG5ldyBGbkFyZyh0aXRsZSwgUFJJTUlUSVZFKSwgbmV3IEZuQXJnKHVybCwgUFJJTUlUSVZFKV07XG4gICAgdmFyIGFyZ3MgPSBuZXcgVWlBcmd1bWVudHMoXCJyZXBsYWNlU3RhdGVcIiwgZm5BcmdzKTtcbiAgICB0aGlzLl9icm9rZXIucnVuT25TZXJ2aWNlKGFyZ3MsIG51bGwpO1xuICB9XG5cbiAgZm9yd2FyZCgpOiB2b2lkIHtcbiAgICB2YXIgYXJncyA9IG5ldyBVaUFyZ3VtZW50cyhcImZvcndhcmRcIik7XG4gICAgdGhpcy5fYnJva2VyLnJ1bk9uU2VydmljZShhcmdzLCBudWxsKTtcbiAgfVxuXG4gIGJhY2soKTogdm9pZCB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgVWlBcmd1bWVudHMoXCJiYWNrXCIpO1xuICAgIHRoaXMuX2Jyb2tlci5ydW5PblNlcnZpY2UoYXJncywgbnVsbCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
