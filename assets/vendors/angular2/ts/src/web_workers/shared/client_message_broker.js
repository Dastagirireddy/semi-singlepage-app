System.register(["angular2/src/web_workers/shared/message_bus", "angular2/src/facade/lang", "angular2/src/facade/async", "angular2/src/facade/collection", "angular2/src/web_workers/shared/serializer", "angular2/src/core/di"], function(exports_1, context_1) {
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
    var message_bus_1, lang_1, async_1, collection_1, serializer_1, di_1;
    var ClientMessageBrokerFactory, ClientMessageBrokerFactory_, ClientMessageBroker, ClientMessageBroker_, MessageData, FnArg, UiArguments;
    return {
        setters:[
            function (message_bus_1_1) {
                message_bus_1 = message_bus_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
                exports_1({
                    "Type": lang_1_1["Type"]
                });
            },
            function (async_1_1) {
                async_1 = async_1_1;
            },
            function (collection_1_1) {
                collection_1 = collection_1_1;
            },
            function (serializer_1_1) {
                serializer_1 = serializer_1_1;
            },
            function (di_1_1) {
                di_1 = di_1_1;
            }],
        execute: function() {
            ClientMessageBrokerFactory = (function () {
                function ClientMessageBrokerFactory() {
                }
                return ClientMessageBrokerFactory;
            }());
            exports_1("ClientMessageBrokerFactory", ClientMessageBrokerFactory);
            ClientMessageBrokerFactory_ = (function (_super) {
                __extends(ClientMessageBrokerFactory_, _super);
                function ClientMessageBrokerFactory_(_messageBus, _serializer) {
                    _super.call(this);
                    this._messageBus = _messageBus;
                    this._serializer = _serializer;
                }
                /**
                 * Initializes the given channel and attaches a new {@link ClientMessageBroker} to it.
                 */
                ClientMessageBrokerFactory_.prototype.createMessageBroker = function (channel, runInZone) {
                    if (runInZone === void 0) { runInZone = true; }
                    this._messageBus.initChannel(channel, runInZone);
                    return new ClientMessageBroker_(this._messageBus, this._serializer, channel);
                };
                ClientMessageBrokerFactory_ = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [message_bus_1.MessageBus, serializer_1.Serializer])
                ], ClientMessageBrokerFactory_);
                return ClientMessageBrokerFactory_;
            }(ClientMessageBrokerFactory));
            exports_1("ClientMessageBrokerFactory_", ClientMessageBrokerFactory_);
            ClientMessageBroker = (function () {
                function ClientMessageBroker() {
                }
                return ClientMessageBroker;
            }());
            exports_1("ClientMessageBroker", ClientMessageBroker);
            ClientMessageBroker_ = (function (_super) {
                __extends(ClientMessageBroker_, _super);
                function ClientMessageBroker_(messageBus, _serializer, channel) {
                    var _this = this;
                    _super.call(this);
                    this.channel = channel;
                    this._pending = new Map();
                    this._sink = messageBus.to(channel);
                    this._serializer = _serializer;
                    var source = messageBus.from(channel);
                    async_1.ObservableWrapper.subscribe(source, function (message) { return _this._handleMessage(message); });
                }
                ClientMessageBroker_.prototype._generateMessageId = function (name) {
                    var time = lang_1.stringify(lang_1.DateWrapper.toMillis(lang_1.DateWrapper.now()));
                    var iteration = 0;
                    var id = name + time + lang_1.stringify(iteration);
                    while (lang_1.isPresent(this._pending[id])) {
                        id = "" + name + time + iteration;
                        iteration++;
                    }
                    return id;
                };
                ClientMessageBroker_.prototype.runOnService = function (args, returnType) {
                    var _this = this;
                    var fnArgs = [];
                    if (lang_1.isPresent(args.args)) {
                        args.args.forEach(function (argument) {
                            if (argument.type != null) {
                                fnArgs.push(_this._serializer.serialize(argument.value, argument.type));
                            }
                            else {
                                fnArgs.push(argument.value);
                            }
                        });
                    }
                    var promise;
                    var id = null;
                    if (returnType != null) {
                        var completer = async_1.PromiseWrapper.completer();
                        id = this._generateMessageId(args.method);
                        this._pending.set(id, completer);
                        async_1.PromiseWrapper.catchError(completer.promise, function (err, stack) {
                            lang_1.print(err);
                            completer.reject(err, stack);
                        });
                        promise = async_1.PromiseWrapper.then(completer.promise, function (value) {
                            if (_this._serializer == null) {
                                return value;
                            }
                            else {
                                return _this._serializer.deserialize(value, returnType);
                            }
                        });
                    }
                    else {
                        promise = null;
                    }
                    // TODO(jteplitz602): Create a class for these messages so we don't keep using StringMap #3685
                    var message = { 'method': args.method, 'args': fnArgs };
                    if (id != null) {
                        message['id'] = id;
                    }
                    async_1.ObservableWrapper.callEmit(this._sink, message);
                    return promise;
                };
                ClientMessageBroker_.prototype._handleMessage = function (message) {
                    var data = new MessageData(message);
                    // TODO(jteplitz602): replace these strings with messaging constants #3685
                    if (lang_1.StringWrapper.equals(data.type, "result") || lang_1.StringWrapper.equals(data.type, "error")) {
                        var id = data.id;
                        if (this._pending.has(id)) {
                            if (lang_1.StringWrapper.equals(data.type, "result")) {
                                this._pending.get(id).resolve(data.value);
                            }
                            else {
                                this._pending.get(id).reject(data.value, null);
                            }
                            this._pending.delete(id);
                        }
                    }
                };
                return ClientMessageBroker_;
            }(ClientMessageBroker));
            exports_1("ClientMessageBroker_", ClientMessageBroker_);
            MessageData = (function () {
                function MessageData(data) {
                    this.type = collection_1.StringMapWrapper.get(data, "type");
                    this.id = this._getValueIfPresent(data, "id");
                    this.value = this._getValueIfPresent(data, "value");
                }
                /**
                 * Returns the value from the StringMap if present. Otherwise returns null
                 * @internal
                 */
                MessageData.prototype._getValueIfPresent = function (data, key) {
                    if (collection_1.StringMapWrapper.contains(data, key)) {
                        return collection_1.StringMapWrapper.get(data, key);
                    }
                    else {
                        return null;
                    }
                };
                return MessageData;
            }());
            FnArg = (function () {
                function FnArg(value, type) {
                    this.value = value;
                    this.type = type;
                }
                return FnArg;
            }());
            exports_1("FnArg", FnArg);
            UiArguments = (function () {
                function UiArguments(method, args) {
                    this.method = method;
                    this.args = args;
                }
                return UiArguments;
            }());
            exports_1("UiArguments", UiArguments);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvY2xpZW50X21lc3NhZ2VfYnJva2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFvQkE7Z0JBQUE7Z0JBS0EsQ0FBQztnQkFBRCxpQ0FBQztZQUFELENBTEEsQUFLQyxJQUFBO1lBTEQsbUVBS0MsQ0FBQTtZQUdEO2dCQUFpRCwrQ0FBMEI7Z0JBR3pFLHFDQUFvQixXQUF1QixFQUFFLFdBQXVCO29CQUNsRSxpQkFBTyxDQUFDO29CQURVLGdCQUFXLEdBQVgsV0FBVyxDQUFZO29CQUV6QyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztnQkFDakMsQ0FBQztnQkFFRDs7bUJBRUc7Z0JBQ0gseURBQW1CLEdBQW5CLFVBQW9CLE9BQWUsRUFBRSxTQUF5QjtvQkFBekIseUJBQXlCLEdBQXpCLGdCQUF5QjtvQkFDNUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUNqRCxNQUFNLENBQUMsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQy9FLENBQUM7Z0JBZkg7b0JBQUMsZUFBVSxFQUFFOzsrQ0FBQTtnQkFnQmIsa0NBQUM7WUFBRCxDQWZBLEFBZUMsQ0FmZ0QsMEJBQTBCLEdBZTFFO1lBZkQscUVBZUMsQ0FBQTtZQUVEO2dCQUFBO2dCQUVBLENBQUM7Z0JBQUQsMEJBQUM7WUFBRCxDQUZBLEFBRUMsSUFBQTtZQUZELHFEQUVDLENBQUE7WUFFRDtnQkFBMEMsd0NBQW1CO2dCQU0zRCw4QkFBWSxVQUFzQixFQUFFLFdBQXVCLEVBQVMsT0FBTztvQkFON0UsaUJBcUZDO29CQTlFRyxpQkFBTyxDQUFDO29CQUQwRCxZQUFPLEdBQVAsT0FB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QUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN6QyxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ2QsQ0FBQztnQkFDSCxDQUFDO2dCQUNILGtCQUFDO1lBQUQsQ0F0QkEsQUFzQkMsSUFBQTtZQUVEO2dCQUNFLGVBQW1CLEtBQUssRUFBUyxJQUFVO29CQUF4QixVQUFLLEdBQUwsS0FBSyxDQUFBO29CQUFTLFNBQUksR0FBSixJQUFJLENBQU07Z0JBQUcsQ0FBQztnQkFDakQsWUFBQztZQUFELENBRkEsQUFFQyxJQUFBO1lBRkQseUJBRUMsQ0FBQTtZQUVEO2dCQUNFLHFCQUFtQixNQUFjLEVBQVMsSUFBYztvQkFBckMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtvQkFBUyxTQUFJLEdBQUosSUFBSSxDQUFVO2dCQUFHLENBQUM7Z0JBQzlELGtCQUFDO1lBQUQsQ0FGQSxBQUVDLElBQUE7WUFGRCxxQ0FFQyxDQUFBIiwiZmlsZSI6ImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvY2xpZW50X21lc3NhZ2VfYnJva2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tIFwiYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1c1wiO1xuaW1wb3J0IHtcbiAgcHJpbnQsXG4gIGlzUHJlc2VudCxcbiAgRGF0ZVdyYXBwZXIsXG4gIHN0cmluZ2lmeSxcbiAgVHlwZSxcbiAgU3RyaW5nV3JhcHBlclxufSBmcm9tIFwiYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nXCI7XG5pbXBvcnQge1xuICBQcm9taXNlQ29tcGxldGVyLFxuICBQcm9taXNlV3JhcHBlcixcbiAgT2JzZXJ2YWJsZVdyYXBwZXIsXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tIFwiYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luY1wiO1xuaW1wb3J0IHtTdHJpbmdNYXBXcmFwcGVyLCBNYXBXcmFwcGVyfSBmcm9tIFwiYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uXCI7XG5pbXBvcnQge1NlcmlhbGl6ZXJ9IGZyb20gXCJhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXJcIjtcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcImFuZ3VsYXIyL3NyYy9jb3JlL2RpXCI7XG5leHBvcnQge1R5cGV9IGZyb20gXCJhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmdcIjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENsaWVudE1lc3NhZ2VCcm9rZXJGYWN0b3J5IHtcbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBnaXZlbiBjaGFubmVsIGFuZCBhdHRhY2hlcyBhIG5ldyB7QGxpbmsgQ2xpZW50TWVzc2FnZUJyb2tlcn0gdG8gaXQuXG4gICAqL1xuICBhYnN0cmFjdCBjcmVhdGVNZXNzYWdlQnJva2VyKGNoYW5uZWw6IHN0cmluZywgcnVuSW5ab25lPzogYm9vbGVhbik6IENsaWVudE1lc3NhZ2VCcm9rZXI7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeV8gZXh0ZW5kcyBDbGllbnRNZXNzYWdlQnJva2VyRmFjdG9yeSB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tZXNzYWdlQnVzOiBNZXNzYWdlQnVzLCBfc2VyaWFsaXplcjogU2VyaWFsaXplcikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fc2VyaWFsaXplciA9IF9zZXJpYWxpemVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBnaXZlbiBjaGFubmVsIGFuZCBhdHRhY2hlcyBhIG5ldyB7QGxpbmsgQ2xpZW50TWVzc2FnZUJyb2tlcn0gdG8gaXQuXG4gICAqL1xuICBjcmVhdGVNZXNzYWdlQnJva2VyKGNoYW5uZWw6IHN0cmluZywgcnVuSW5ab25lOiBib29sZWFuID0gdHJ1ZSk6IENsaWVudE1lc3NhZ2VCcm9rZXIge1xuICAgIHRoaXMuX21lc3NhZ2VCdXMuaW5pdENoYW5uZWwoY2hhbm5lbCwgcnVuSW5ab25lKTtcbiAgICByZXR1cm4gbmV3IENsaWVudE1lc3NhZ2VCcm9rZXJfKHRoaXMuX21lc3NhZ2VCdXMsIHRoaXMuX3NlcmlhbGl6ZXIsIGNoYW5uZWwpO1xuICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDbGllbnRNZXNzYWdlQnJva2VyIHtcbiAgYWJzdHJhY3QgcnVuT25TZXJ2aWNlKGFyZ3M6IFVpQXJndW1lbnRzLCByZXR1cm5UeXBlOiBUeXBlKTogUHJvbWlzZTxhbnk+O1xufVxuXG5leHBvcnQgY2xhc3MgQ2xpZW50TWVzc2FnZUJyb2tlcl8gZXh0ZW5kcyBDbGllbnRNZXNzYWdlQnJva2VyIHtcbiAgcHJpdmF0ZSBfcGVuZGluZzogTWFwPHN0cmluZywgUHJvbWlzZUNvbXBsZXRlcjxhbnk+PiA9IG5ldyBNYXA8c3RyaW5nLCBQcm9taXNlQ29tcGxldGVyPGFueT4+KCk7XG4gIHByaXZhdGUgX3Npbms6IEV2ZW50RW1pdHRlcjxhbnk+O1xuICAvKiogQGludGVybmFsICovXG4gIHB1YmxpYyBfc2VyaWFsaXplcjogU2VyaWFsaXplcjtcblxuICBjb25zdHJ1Y3RvcihtZXNzYWdlQnVzOiBNZXNzYWdlQnVzLCBfc2VyaWFsaXplcjogU2VyaWFsaXplciwgcHVibGljIGNoYW5uZWwpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX3NpbmsgPSBtZXNzYWdlQnVzLnRvKGNoYW5uZWwpO1xuICAgIHRoaXMuX3NlcmlhbGl6ZXIgPSBfc2VyaWFsaXplcjtcbiAgICB2YXIgc291cmNlID0gbWVzc2FnZUJ1cy5mcm9tKGNoYW5uZWwpO1xuICAgIE9ic2VydmFibGVXcmFwcGVyLnN1YnNjcmliZShzb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtZXNzYWdlOiB7W2tleTogc3RyaW5nXTogYW55fSkgPT4gdGhpcy5faGFuZGxlTWVzc2FnZShtZXNzYWdlKSk7XG4gIH1cblxuICBwcml2YXRlIF9nZW5lcmF0ZU1lc3NhZ2VJZChuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHZhciB0aW1lOiBzdHJpbmcgPSBzdHJpbmdpZnkoRGF0ZVdyYXBwZXIudG9NaWxsaXMoRGF0ZVdyYXBwZXIubm93KCkpKTtcbiAgICB2YXIgaXRlcmF0aW9uOiBudW1iZXIgPSAwO1xuICAgIHZhciBpZDogc3RyaW5nID0gbmFtZSArIHRpbWUgKyBzdHJpbmdpZnkoaXRlcmF0aW9uKTtcbiAgICB3aGlsZSAoaXNQcmVzZW50KHRoaXMuX3BlbmRpbmdbaWRdKSkge1xuICAgICAgaWQgPSBgJHtuYW1lfSR7dGltZX0ke2l0ZXJhdGlvbn1gO1xuICAgICAgaXRlcmF0aW9uKys7XG4gICAgfVxuICAgIHJldHVybiBpZDtcbiAgfVxuXG4gIHJ1bk9uU2VydmljZShhcmdzOiBVaUFyZ3VtZW50cywgcmV0dXJuVHlwZTogVHlwZSk6IFByb21pc2U8YW55PiB7XG4gICAgdmFyIGZuQXJncyA9IFtdO1xuICAgIGlmIChpc1ByZXNlbnQoYXJncy5hcmdzKSkge1xuICAgICAgYXJncy5hcmdzLmZvckVhY2goYXJndW1lbnQgPT4ge1xuICAgICAgICBpZiAoYXJndW1lbnQudHlwZSAhPSBudWxsKSB7XG4gICAgICAgICAgZm5BcmdzLnB1c2godGhpcy5fc2VyaWFsaXplci5zZXJpYWxpemUoYXJndW1lbnQudmFsdWUsIGFyZ3VtZW50LnR5cGUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmbkFyZ3MucHVzaChhcmd1bWVudC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBwcm9taXNlOiBQcm9taXNlPGFueT47XG4gICAgdmFyIGlkOiBzdHJpbmcgPSBudWxsO1xuICAgIGlmIChyZXR1cm5UeXBlICE9IG51bGwpIHtcbiAgICAgIHZhciBjb21wbGV0ZXI6IFByb21pc2VDb21wbGV0ZXI8YW55PiA9IFByb21pc2VXcmFwcGVyLmNvbXBsZXRlcigpO1xuICAgICAgaWQgPSB0aGlzLl9nZW5lcmF0ZU1lc3NhZ2VJZChhcmdzLm1ldGhvZCk7XG4gICAgICB0aGlzLl9wZW5kaW5nLnNldChpZCwgY29tcGxldGVyKTtcbiAgICAgIFByb21pc2VXcmFwcGVyLmNhdGNoRXJyb3IoY29tcGxldGVyLnByb21pc2UsIChlcnIsIHN0YWNrPykgPT4ge1xuICAgICAgICBwcmludChlcnIpO1xuICAgICAgICBjb21wbGV0ZXIucmVqZWN0KGVyciwgc3RhY2spO1xuICAgICAgfSk7XG5cbiAgICAgIHByb21pc2UgPSBQcm9taXNlV3JhcHBlci50aGVuKGNvbXBsZXRlci5wcm9taXNlLCAodmFsdWU6IGFueSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fc2VyaWFsaXplciA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9zZXJpYWxpemVyLmRlc2VyaWFsaXplKHZhbHVlLCByZXR1cm5UeXBlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb21pc2UgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIFRPRE8oanRlcGxpdHo2MDIpOiBDcmVhdGUgYSBjbGFzcyBmb3IgdGhlc2UgbWVzc2FnZXMgc28gd2UgZG9uJ3Qga2VlcCB1c2luZyBTdHJpbmdNYXAgIzM2ODVcbiAgICB2YXIgbWVzc2FnZSA9IHsnbWV0aG9kJzogYXJncy5tZXRob2QsICdhcmdzJzogZm5BcmdzfTtcbiAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgbWVzc2FnZVsnaWQnXSA9IGlkO1xuICAgIH1cbiAgICBPYnNlcnZhYmxlV3JhcHBlci5jYWxsRW1pdCh0aGlzLl9zaW5rLCBtZXNzYWdlKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlTWVzc2FnZShtZXNzYWdlOiB7W2tleTogc3RyaW5nXTogYW55fSk6IHZvaWQge1xuICAgIHZhciBkYXRhID0gbmV3IE1lc3NhZ2VEYXRhKG1lc3NhZ2UpO1xuICAgIC8vIFRPRE8oanRlcGxpdHo2MDIpOiByZXBsYWNlIHRoZXNlIHN0cmluZ3Mgd2l0aCBtZXNzYWdpbmcgY29uc3RhbnRzICMzNjg1XG4gICAgaWYgKFN0cmluZ1dyYXBwZXIuZXF1YWxzKGRhdGEudHlwZSwgXCJyZXN1bHRcIikgfHwgU3RyaW5nV3JhcHBlci5lcXVhbHMoZGF0YS50eXBlLCBcImVycm9yXCIpKSB7XG4gICAgICB2YXIgaWQgPSBkYXRhLmlkO1xuICAgICAgaWYgKHRoaXMuX3BlbmRpbmcuaGFzKGlkKSkge1xuICAgICAgICBpZiAoU3RyaW5nV3JhcHBlci5lcXVhbHMoZGF0YS50eXBlLCBcInJlc3VsdFwiKSkge1xuICAgICAgICAgIHRoaXMuX3BlbmRpbmcuZ2V0KGlkKS5yZXNvbHZlKGRhdGEudmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3BlbmRpbmcuZ2V0KGlkKS5yZWplY3QoZGF0YS52YWx1ZSwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcGVuZGluZy5kZWxldGUoaWQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBNZXNzYWdlRGF0YSB7XG4gIHR5cGU6IHN0cmluZztcbiAgdmFsdWU6IGFueTtcbiAgaWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSkge1xuICAgIHRoaXMudHlwZSA9IFN0cmluZ01hcFdyYXBwZXIuZ2V0KGRhdGEsIFwidHlwZVwiKTtcbiAgICB0aGlzLmlkID0gdGhpcy5fZ2V0VmFsdWVJZlByZXNlbnQoZGF0YSwgXCJpZFwiKTtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5fZ2V0VmFsdWVJZlByZXNlbnQoZGF0YSwgXCJ2YWx1ZVwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBmcm9tIHRoZSBTdHJpbmdNYXAgaWYgcHJlc2VudC4gT3RoZXJ3aXNlIHJldHVybnMgbnVsbFxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIF9nZXRWYWx1ZUlmUHJlc2VudChkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSwga2V5OiBzdHJpbmcpIHtcbiAgICBpZiAoU3RyaW5nTWFwV3JhcHBlci5jb250YWlucyhkYXRhLCBrZXkpKSB7XG4gICAgICByZXR1cm4gU3RyaW5nTWFwV3JhcHBlci5nZXQoZGF0YSwga2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBGbkFyZyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZSwgcHVibGljIHR5cGU6IFR5cGUpIHt9XG59XG5cbmV4cG9ydCBjbGFzcyBVaUFyZ3VtZW50cyB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtZXRob2Q6IHN0cmluZywgcHVibGljIGFyZ3M/OiBGbkFyZ1tdKSB7fVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
