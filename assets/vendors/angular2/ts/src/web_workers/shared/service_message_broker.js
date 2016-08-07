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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VydmljZV9tZXNzYWdlX2Jyb2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBT0E7Z0JBQUE7Z0JBS0EsQ0FBQztnQkFBRCxrQ0FBQztZQUFELENBTEEsQUFLQyxJQUFBO1lBTEQscUVBS0MsQ0FBQTtZQUdEO2dCQUFrRCxnREFBMkI7Z0JBSTNFLHNDQUFvQixXQUF1QixFQUFFLFdBQXVCO29CQUNsRSxpQkFBTyxDQUFDO29CQURVLGdCQUFXLEdBQVgsV0FBVyxDQUFZO29CQUV6QyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztnQkFDakMsQ0FBQztnQkFFRCwwREFBbUIsR0FBbkIsVUFBb0IsT0FBZSxFQUFFLFNBQXlCO29CQUF6Qix5QkFBeUIsR0FBekIsZ0JBQXlCO29CQUM1RCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQ2pELE1BQU0sQ0FBQyxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDaEYsQ0FBQztnQkFiSDtvQkFBQyxlQUFVLEVBQUU7O2dEQUFBO2dCQWNiLG1DQUFDO1lBQUQsQ0FiQSxBQWFDLENBYmlELDJCQUEyQixHQWE1RTtZQWJELHVFQWFDLENBQUE7WUFFRDtnQkFBQTtnQkFHQSxDQUFDO2dCQUFELDJCQUFDO1lBQUQsQ0FIQSxBQUdDLElBQUE7WUFIRCx1REFHQyxDQUFBO1lBRUQ7Ozs7O2VBS0c7WUFDSDtnQkFBMkMseUNBQW9CO2dCQUk3RCwrQkFBWSxVQUFzQixFQUFVLFdBQXVCLEVBQVMsT0FBTztvQkFKckYsaUJBMkNDO29CQXRDRyxpQkFBTyxDQUFDO29CQURrQyxnQkFBVyxHQUFYLFdBQVcs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TUUseUJBQVksSUFBMEI7b0JBQ3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDekIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMzQixDQUFDO2dCQUNILHNCQUFDO1lBQUQsQ0FaQSxBQVlDLElBQUE7WUFaRCw2Q0FZQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VydmljZV9tZXNzYWdlX2Jyb2tlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtMaXN0V3JhcHBlciwgTWFwLCBNYXBXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHtTZXJpYWxpemVyfSBmcm9tIFwiYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJpYWxpemVyXCI7XG5pbXBvcnQge2lzUHJlc2VudCwgVHlwZSwgRnVuY3Rpb25XcmFwcGVyfSBmcm9tIFwiYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nXCI7XG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gXCJhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL21lc3NhZ2VfYnVzXCI7XG5pbXBvcnQge0V2ZW50RW1pdHRlciwgUHJvbWlzZVdyYXBwZXIsIE9ic2VydmFibGVXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSB7XG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgZ2l2ZW4gY2hhbm5lbCBhbmQgYXR0YWNoZXMgYSBuZXcge0BsaW5rIFNlcnZpY2VNZXNzYWdlQnJva2VyfSB0byBpdC5cbiAgICovXG4gIGFic3RyYWN0IGNyZWF0ZU1lc3NhZ2VCcm9rZXIoY2hhbm5lbDogc3RyaW5nLCBydW5JblpvbmU/OiBib29sZWFuKTogU2VydmljZU1lc3NhZ2VCcm9rZXI7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnlfIGV4dGVuZHMgU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwdWJsaWMgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWVzc2FnZUJ1czogTWVzc2FnZUJ1cywgX3NlcmlhbGl6ZXI6IFNlcmlhbGl6ZXIpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX3NlcmlhbGl6ZXIgPSBfc2VyaWFsaXplcjtcbiAgfVxuXG4gIGNyZWF0ZU1lc3NhZ2VCcm9rZXIoY2hhbm5lbDogc3RyaW5nLCBydW5JblpvbmU6IGJvb2xlYW4gPSB0cnVlKTogU2VydmljZU1lc3NhZ2VCcm9rZXIge1xuICAgIHRoaXMuX21lc3NhZ2VCdXMuaW5pdENoYW5uZWwoY2hhbm5lbCwgcnVuSW5ab25lKTtcbiAgICByZXR1cm4gbmV3IFNlcnZpY2VNZXNzYWdlQnJva2VyXyh0aGlzLl9tZXNzYWdlQnVzLCB0aGlzLl9zZXJpYWxpemVyLCBjaGFubmVsKTtcbiAgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU2VydmljZU1lc3NhZ2VCcm9rZXIge1xuICBhYnN0cmFjdCByZWdpc3Rlck1ldGhvZChtZXRob2ROYW1lOiBzdHJpbmcsIHNpZ25hdHVyZTogVHlwZVtdLCBtZXRob2Q6IEZ1bmN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5UeXBlPzogVHlwZSk6IHZvaWQ7XG59XG5cbi8qKlxuICogSGVscGVyIGNsYXNzIGZvciBVSUNvbXBvbmVudHMgdGhhdCBhbGxvd3MgY29tcG9uZW50cyB0byByZWdpc3RlciBtZXRob2RzLlxuICogSWYgYSByZWdpc3RlcmVkIG1ldGhvZCBtZXNzYWdlIGlzIHJlY2VpdmVkIGZyb20gdGhlIGJyb2tlciBvbiB0aGUgd29ya2VyLFxuICogdGhlIFVJTWVzc2FnZUJyb2tlciBkZXNlcmlhbGl6ZXMgaXRzIGFyZ3VtZW50cyBhbmQgY2FsbHMgdGhlIHJlZ2lzdGVyZWQgbWV0aG9kLlxuICogSWYgdGhhdCBtZXRob2QgcmV0dXJucyBhIHByb21pc2UsIHRoZSBVSU1lc3NhZ2VCcm9rZXIgcmV0dXJucyB0aGUgcmVzdWx0IHRvIHRoZSB3b3JrZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBTZXJ2aWNlTWVzc2FnZUJyb2tlcl8gZXh0ZW5kcyBTZXJ2aWNlTWVzc2FnZUJyb2tlciB7XG4gIHByaXZhdGUgX3Npbms6IEV2ZW50RW1pdHRlcjxhbnk+O1xuICBwcml2YXRlIF9tZXRob2RzOiBNYXA8c3RyaW5nLCBGdW5jdGlvbj4gPSBuZXcgTWFwPHN0cmluZywgRnVuY3Rpb24+KCk7XG5cbiAgY29uc3RydWN0b3IobWVzc2FnZUJ1czogTWVzc2FnZUJ1cywgcHJpdmF0ZSBfc2VyaWFsaXplcjogU2VyaWFsaXplciwgcHVibGljIGNoYW5uZWwpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX3NpbmsgPSBtZXNzYWdlQnVzLnRvKGNoYW5uZWwpO1xuICAgIHZhciBzb3VyY2UgPSBtZXNzYWdlQnVzLmZyb20oY2hhbm5lbCk7XG4gICAgT2JzZXJ2YWJsZVdyYXBwZXIuc3Vic2NyaWJlKHNvdXJjZSwgKG1lc3NhZ2UpID0+IHRoaXMuX2hhbmRsZU1lc3NhZ2UobWVzc2FnZSkpO1xuICB9XG5cbiAgcmVnaXN0ZXJNZXRob2QobWV0aG9kTmFtZTogc3RyaW5nLCBzaWduYXR1cmU6IFR5cGVbXSwgbWV0aG9kOiAoLi4uXzogYW55W10pID0+IFByb21pc2U8YW55Pnwgdm9pZCxcbiAgICAgICAgICAgICAgICAgcmV0dXJuVHlwZT86IFR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLl9tZXRob2RzLnNldChtZXRob2ROYW1lLCAobWVzc2FnZTogUmVjZWl2ZWRNZXNzYWdlKSA9PiB7XG4gICAgICB2YXIgc2VyaWFsaXplZEFyZ3MgPSBtZXNzYWdlLmFyZ3M7XG4gICAgICBsZXQgbnVtQXJncyA9IHNpZ25hdHVyZSA9PT0gbnVsbCA/IDAgOiBzaWduYXR1cmUubGVuZ3RoO1xuICAgICAgdmFyIGRlc2VyaWFsaXplZEFyZ3M6IGFueVtdID0gTGlzdFdyYXBwZXIuY3JlYXRlRml4ZWRTaXplKG51bUFyZ3MpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1BcmdzOyBpKyspIHtcbiAgICAgICAgdmFyIHNlcmlhbGl6ZWRBcmcgPSBzZXJpYWxpemVkQXJnc1tpXTtcbiAgICAgICAgZGVzZXJpYWxpemVkQXJnc1tpXSA9IHRoaXMuX3NlcmlhbGl6ZXIuZGVzZXJpYWxpemUoc2VyaWFsaXplZEFyZywgc2lnbmF0dXJlW2ldKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHByb21pc2UgPSBGdW5jdGlvbldyYXBwZXIuYXBwbHkobWV0aG9kLCBkZXNlcmlhbGl6ZWRBcmdzKTtcbiAgICAgIGlmIChpc1ByZXNlbnQocmV0dXJuVHlwZSkgJiYgaXNQcmVzZW50KHByb21pc2UpKSB7XG4gICAgICAgIHRoaXMuX3dyYXBXZWJXb3JrZXJQcm9taXNlKG1lc3NhZ2UuaWQsIHByb21pc2UsIHJldHVyblR5cGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlTWVzc2FnZShtYXA6IHtba2V5OiBzdHJpbmddOiBhbnl9KTogdm9pZCB7XG4gICAgdmFyIG1lc3NhZ2UgPSBuZXcgUmVjZWl2ZWRNZXNzYWdlKG1hcCk7XG4gICAgaWYgKHRoaXMuX21ldGhvZHMuaGFzKG1lc3NhZ2UubWV0aG9kKSkge1xuICAgICAgdGhpcy5fbWV0aG9kcy5nZXQobWVzc2FnZS5tZXRob2QpKG1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3dyYXBXZWJXb3JrZXJQcm9taXNlKGlkOiBzdHJpbmcsIHByb21pc2U6IFByb21pc2U8YW55PiwgdHlwZTogVHlwZSk6IHZvaWQge1xuICAgIFByb21pc2VXcmFwcGVyLnRoZW4ocHJvbWlzZSwgKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICBPYnNlcnZhYmxlV3JhcHBlci5jYWxsRW1pdChcbiAgICAgICAgICB0aGlzLl9zaW5rLFxuICAgICAgICAgIHsndHlwZSc6ICdyZXN1bHQnLCAndmFsdWUnOiB0aGlzLl9zZXJpYWxpemVyLnNlcmlhbGl6ZShyZXN1bHQsIHR5cGUpLCAnaWQnOiBpZH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZWNlaXZlZE1lc3NhZ2Uge1xuICBtZXRob2Q6IHN0cmluZztcbiAgYXJnczogYW55W107XG4gIGlkOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSkge1xuICAgIHRoaXMubWV0aG9kID0gZGF0YVsnbWV0aG9kJ107XG4gICAgdGhpcy5hcmdzID0gZGF0YVsnYXJncyddO1xuICAgIHRoaXMuaWQgPSBkYXRhWydpZCddO1xuICAgIHRoaXMudHlwZSA9IGRhdGFbJ3R5cGUnXTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
