System.register(['angular2/src/core/di', 'angular2/src/facade/collection', "angular2/src/web_workers/shared/serializer", "angular2/src/facade/lang", "angular2/src/web_workers/shared/message_bus", 'angular2/src/facade/async'], function(exports_1, context_1) {
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
    var di_1, collection_1, serializer_1, lang_1, message_bus_1, async_1;
    var ServiceMessageBrokerFactory, ServiceMessageBrokerFactory_, ServiceMessageBroker, ServiceMessageBroker_, ReceivedMessage;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (serializer_1_1) {
                serializer_1 = serializer_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            },
            function (message_bus_1_1) {
                message_bus_1 = message_bus_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            }],
        execute: function() {
            ServiceMessageBrokerFactory = (function () {
                function ServiceMessageBrokerFactory() {
                }
                return ServiceMessageBrokerFactory;
            }());
            exports_1("ServiceMessageBrokerFactory", ServiceMessageBrokerFactory);
            ServiceMessageBrokerFactory_ = (function (_super) {
                __extends(ServiceMessageBrokerFactory_, _super);
                function ServiceMessageBrokerFactory_(_messageBus, _serializer) {
                    _super.call(this);
                    this._messageBus = _messageBus;
                    this._serializer = _serializer;
                }
                ServiceMessageBrokerFactory_.prototype.createMessageBroker = function (channel, runInZone) {
                    if (runInZone === void 0) { runInZone = true; }
                    this._messageBus.initChannel(channel, runInZone);
                    return new ServiceMessageBroker_(this._messageBus, this._serializer, channel);
                };
                ServiceMessageBrokerFactory_ = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [message_bus_1.MessageBus, serializer_1.Serializer])
                ], ServiceMessageBrokerFactory_);
                return ServiceMessageBrokerFactory_;
            }(ServiceMessageBrokerFactory));
            exports_1("ServiceMessageBrokerFactory_", ServiceMessageBrokerFactory_);
            ServiceMessageBroker = (function () {
                function ServiceMessageBroker() {
                }
                return ServiceMessageBroker;
            }());
            exports_1("ServiceMessageBroker", ServiceMessageBroker);
            /**
             * Helper class for UIComponents that allows components to register methods.
             * If a registered method message is received from the broker on the worker,
             * the UIMessageBroker deserializes its arguments and calls the registered method.
             * If that method returns a promise, the UIMessageBroker returns the result to the worker.
             */
            ServiceMessageBroker_ = (function (_super) {
                __extends(ServiceMessageBroker_, _super);
                function ServiceMessageBroker_(messageBus, _serializer, channel) {
                    var _this = this;
                    _super.call(this);
                    this._serializer = _serializer;
                    this.channel = channel;
                    this._methods = new collection_1.Map();
                    this._sink = messageBus.to(channel);
                    var source = messageBus.from(channel);
                    async_1.ObservableWrapper.subscribe(source, function (message) { return _this._handleMessage(message); });
                }
                ServiceMessageBroker_.prototype.registerMethod = function (methodName, signature, method, returnType) {
                    var _this = this;
                    this._methods.set(methodName, function (message) {
                        var serializedArgs = message.args;
                        var numArgs = signature === null ? 0 : signature.length;
                        var deserializedArgs = collection_1.ListWrapper.createFixedSize(numArgs);
                        for (var i = 0; i < numArgs; i++) {
                            var serializedArg = serializedArgs[i];
                            deserializedArgs[i] = _this._serializer.deserialize(serializedArg, signature[i]);
                        }
                        var promise = lang_1.FunctionWrapper.apply(method, deserializedArgs);
                        if (lang_1.isPresent(returnType) && lang_1.isPresent(promise)) {
                            _this._wrapWebWorkerPromise(message.id, promise, returnType);
                        }
                    });
                };
                ServiceMessageBroker_.prototype._handleMessage = function (map) {
                    var message = new ReceivedMessage(map);
                    if (this._methods.has(message.method)) {
                        this._methods.get(message.method)(message);
                    }
                };
                ServiceMessageBroker_.prototype._wrapWebWorkerPromise = function (id, promise, type) {
                    var _this = this;
                    async_1.PromiseWrapper.then(promise, function (result) {
                        async_1.ObservableWrapper.callEmit(_this._sink, { 'type': 'result', 'value': _this._serializer.serialize(result, type), 'id': id });
                    });
                };
                return ServiceMessageBroker_;
            }(ServiceMessageBroker));
            exports_1("ServiceMessageBroker_", ServiceMessageBroker_);
            ReceivedMessage = (function () {
                function ReceivedMessage(data) {
                    this.method = data['method'];
                    this.args = data['args'];
                    this.id = data['id'];
                    this.type = data['type'];
                }
                return ReceivedMessage;
            }());
            exports_1("ReceivedMessage", ReceivedMessage);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJ2aWNlX21lc3NhZ2VfYnJva2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFPQTtnQkFBQTtnQkFLQSxDQUFDO2dCQUFELGtDQUFDO1lBQUQsQ0FMQSxBQUtDLElBQUE7WUFMRCxxRUFLQyxDQUFBO1lBR0Q7Z0JBQWtELGdEQUEyQjtnQkFJM0Usc0NBQW9CLFdBQXVCLEVBQUUsV0FBdUI7b0JBQ2xFLGlCQUFPLENBQUM7b0JBRFUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7b0JBRXpDLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO2dCQUNqQyxDQUFDO2dCQUVELDBEQUFtQixHQUFuQixVQUFvQixPQUFlLEVBQUUsU0FBeUI7b0JBQXpCLHlCQUF5QixHQUF6QixnQkFBeUI7b0JBQzVELElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztvQkFDakQsTUFBTSxDQUFDLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUNoRixDQUFDO2dCQWJIO29CQUFDLGVBQVUsRUFBRTs7Z0RBQUE7Z0JBY2IsbUNBQUM7WUFBRCxDQWJBLEFBYUMsQ0FiaUQsMkJBQTJCLEdBYTVFO1lBYkQsdUVBYUMsQ0FBQTtZQUVEO2dCQUFBO2dCQUdBLENBQUM7Z0JBQUQsMkJBQUM7WUFBRCxDQUhBLEFBR0MsSUFBQTtZQUhELHVEQUdDLENBQUE7WUFFRDs7Ozs7ZUFLRztZQUNIO2dCQUEyQyx5Q0FBb0I7Z0JBSTdELCtCQUFZLFVBQXNCLEVBQVUsV0FBdUIsRUFBUyxPQUFPO29CQUpyRixpQkEyQ0M7b0JBdENHLGlCQUFPLENBQUM7b0JBRGtDLGdCQUFXLEdBQVgs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RDtnQkFNRSx5QkFBWSxJQUEwQjtvQkFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN6QixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzNCLENBQUM7Z0JBQ0gsc0JBQUM7WUFBRCxDQVpBLEFBWUMsSUFBQTtZQVpELDZDQVlDLENBQUEiLCJmaWxlIjoicHVibGljL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90cy9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7TGlzdFdyYXBwZXIsIE1hcCwgTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7U2VyaWFsaXplcn0gZnJvbSBcImFuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VyaWFsaXplclwiO1xuaW1wb3J0IHtpc1ByZXNlbnQsIFR5cGUsIEZ1bmN0aW9uV3JhcHBlcn0gZnJvbSBcImFuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZ1wiO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tIFwiYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1c1wiO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIFByb21pc2VXcmFwcGVyLCBPYnNlcnZhYmxlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3Rvcnkge1xuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGdpdmVuIGNoYW5uZWwgYW5kIGF0dGFjaGVzIGEgbmV3IHtAbGluayBTZXJ2aWNlTWVzc2FnZUJyb2tlcn0gdG8gaXQuXG4gICAqL1xuICBhYnN0cmFjdCBjcmVhdGVNZXNzYWdlQnJva2VyKGNoYW5uZWw6IHN0cmluZywgcnVuSW5ab25lPzogYm9vbGVhbik6IFNlcnZpY2VNZXNzYWdlQnJva2VyO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5XyBleHRlbmRzIFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21lc3NhZ2VCdXM6IE1lc3NhZ2VCdXMsIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9zZXJpYWxpemVyID0gX3NlcmlhbGl6ZXI7XG4gIH1cblxuICBjcmVhdGVNZXNzYWdlQnJva2VyKGNoYW5uZWw6IHN0cmluZywgcnVuSW5ab25lOiBib29sZWFuID0gdHJ1ZSk6IFNlcnZpY2VNZXNzYWdlQnJva2VyIHtcbiAgICB0aGlzLl9tZXNzYWdlQnVzLmluaXRDaGFubmVsKGNoYW5uZWwsIHJ1bkluWm9uZSk7XG4gICAgcmV0dXJuIG5ldyBTZXJ2aWNlTWVzc2FnZUJyb2tlcl8odGhpcy5fbWVzc2FnZUJ1cywgdGhpcy5fc2VyaWFsaXplciwgY2hhbm5lbCk7XG4gIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNlcnZpY2VNZXNzYWdlQnJva2VyIHtcbiAgYWJzdHJhY3QgcmVnaXN0ZXJNZXRob2QobWV0aG9kTmFtZTogc3RyaW5nLCBzaWduYXR1cmU6IFR5cGVbXSwgbWV0aG9kOiBGdW5jdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVHlwZT86IFR5cGUpOiB2b2lkO1xufVxuXG4vKipcbiAqIEhlbHBlciBjbGFzcyBmb3IgVUlDb21wb25lbnRzIHRoYXQgYWxsb3dzIGNvbXBvbmVudHMgdG8gcmVnaXN0ZXIgbWV0aG9kcy5cbiAqIElmIGEgcmVnaXN0ZXJlZCBtZXRob2QgbWVzc2FnZSBpcyByZWNlaXZlZCBmcm9tIHRoZSBicm9rZXIgb24gdGhlIHdvcmtlcixcbiAqIHRoZSBVSU1lc3NhZ2VCcm9rZXIgZGVzZXJpYWxpemVzIGl0cyBhcmd1bWVudHMgYW5kIGNhbGxzIHRoZSByZWdpc3RlcmVkIG1ldGhvZC5cbiAqIElmIHRoYXQgbWV0aG9kIHJldHVybnMgYSBwcm9taXNlLCB0aGUgVUlNZXNzYWdlQnJva2VyIHJldHVybnMgdGhlIHJlc3VsdCB0byB0aGUgd29ya2VyLlxuICovXG5leHBvcnQgY2xhc3MgU2VydmljZU1lc3NhZ2VCcm9rZXJfIGV4dGVuZHMgU2VydmljZU1lc3NhZ2VCcm9rZXIge1xuICBwcml2YXRlIF9zaW5rOiBFdmVudEVtaXR0ZXI8YW55PjtcbiAgcHJpdmF0ZSBfbWV0aG9kczogTWFwPHN0cmluZywgRnVuY3Rpb24+ID0gbmV3IE1hcDxzdHJpbmcsIEZ1bmN0aW9uPigpO1xuXG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2VCdXM6IE1lc3NhZ2VCdXMsIHByaXZhdGUgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIsIHB1YmxpYyBjaGFubmVsKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9zaW5rID0gbWVzc2FnZUJ1cy50byhjaGFubmVsKTtcbiAgICB2YXIgc291cmNlID0gbWVzc2FnZUJ1cy5mcm9tKGNoYW5uZWwpO1xuICAgIE9ic2VydmFibGVXcmFwcGVyLnN1YnNjcmliZShzb3VyY2UsIChtZXNzYWdlKSA9PiB0aGlzLl9oYW5kbGVNZXNzYWdlKG1lc3NhZ2UpKTtcbiAgfVxuXG4gIHJlZ2lzdGVyTWV0aG9kKG1ldGhvZE5hbWU6IHN0cmluZywgc2lnbmF0dXJlOiBUeXBlW10sIG1ldGhvZDogKC4uLl86IGFueVtdKSA9PiBQcm9taXNlPGFueT58IHZvaWQsXG4gICAgICAgICAgICAgICAgIHJldHVyblR5cGU/OiBUeXBlKTogdm9pZCB7XG4gICAgdGhpcy5fbWV0aG9kcy5zZXQobWV0aG9kTmFtZSwgKG1lc3NhZ2U6IFJlY2VpdmVkTWVzc2FnZSkgPT4ge1xuICAgICAgdmFyIHNlcmlhbGl6ZWRBcmdzID0gbWVzc2FnZS5hcmdzO1xuICAgICAgbGV0IG51bUFyZ3MgPSBzaWduYXR1cmUgPT09IG51bGwgPyAwIDogc2lnbmF0dXJlLmxlbmd0aDtcbiAgICAgIHZhciBkZXNlcmlhbGl6ZWRBcmdzOiBhbnlbXSA9IExpc3RXcmFwcGVyLmNyZWF0ZUZpeGVkU2l6ZShudW1BcmdzKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtQXJnczsgaSsrKSB7XG4gICAgICAgIHZhciBzZXJpYWxpemVkQXJnID0gc2VyaWFsaXplZEFyZ3NbaV07XG4gICAgICAgIGRlc2VyaWFsaXplZEFyZ3NbaV0gPSB0aGlzLl9zZXJpYWxpemVyLmRlc2VyaWFsaXplKHNlcmlhbGl6ZWRBcmcsIHNpZ25hdHVyZVtpXSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBwcm9taXNlID0gRnVuY3Rpb25XcmFwcGVyLmFwcGx5KG1ldGhvZCwgZGVzZXJpYWxpemVkQXJncyk7XG4gICAgICBpZiAoaXNQcmVzZW50KHJldHVyblR5cGUpICYmIGlzUHJlc2VudChwcm9taXNlKSkge1xuICAgICAgICB0aGlzLl93cmFwV2ViV29ya2VyUHJvbWlzZShtZXNzYWdlLmlkLCBwcm9taXNlLCByZXR1cm5UeXBlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZU1lc3NhZ2UobWFwOiB7W2tleTogc3RyaW5nXTogYW55fSk6IHZvaWQge1xuICAgIHZhciBtZXNzYWdlID0gbmV3IFJlY2VpdmVkTWVzc2FnZShtYXApO1xuICAgIGlmICh0aGlzLl9tZXRob2RzLmhhcyhtZXNzYWdlLm1ldGhvZCkpIHtcbiAgICAgIHRoaXMuX21ldGhvZHMuZ2V0KG1lc3NhZ2UubWV0aG9kKShtZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF93cmFwV2ViV29ya2VyUHJvbWlzZShpZDogc3RyaW5nLCBwcm9taXNlOiBQcm9taXNlPGFueT4sIHR5cGU6IFR5cGUpOiB2b2lkIHtcbiAgICBQcm9taXNlV3JhcHBlci50aGVuKHByb21pc2UsIChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgT2JzZXJ2YWJsZVdyYXBwZXIuY2FsbEVtaXQoXG4gICAgICAgICAgdGhpcy5fc2luayxcbiAgICAgICAgICB7J3R5cGUnOiAncmVzdWx0JywgJ3ZhbHVlJzogdGhpcy5fc2VyaWFsaXplci5zZXJpYWxpemUocmVzdWx0LCB0eXBlKSwgJ2lkJzogaWR9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVjZWl2ZWRNZXNzYWdlIHtcbiAgbWV0aG9kOiBzdHJpbmc7XG4gIGFyZ3M6IGFueVtdO1xuICBpZDogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoZGF0YToge1trZXk6IHN0cmluZ106IGFueX0pIHtcbiAgICB0aGlzLm1ldGhvZCA9IGRhdGFbJ21ldGhvZCddO1xuICAgIHRoaXMuYXJncyA9IGRhdGFbJ2FyZ3MnXTtcbiAgICB0aGlzLmlkID0gZGF0YVsnaWQnXTtcbiAgICB0aGlzLnR5cGUgPSBkYXRhWyd0eXBlJ107XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
