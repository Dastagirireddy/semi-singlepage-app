System.register(['angular2/src/core/di', 'angular2/src/web_workers/shared/serializer', 'angular2/src/web_workers/shared/messaging_api', 'angular2/src/compiler/xhr', 'angular2/src/web_workers/shared/service_message_broker', './bind'], function(exports_1, context_1) {
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
    var di_1, serializer_1, messaging_api_1, xhr_1, service_message_broker_1, bind_1;
    var MessageBasedXHRImpl;
    return {
        setters:[
            function (di_1_1) {
                di_1 = di_1_1;
            },
            function (serializer_1_1) {
                serializer_1 = serializer_1_1;
            },
            function (messaging_api_1_1) {
                messaging_api_1 = messaging_api_1_1;
            },
            function (xhr_1_1) {
                xhr_1 = xhr_1_1;
            },
            function (service_message_broker_1_1) {
                service_message_broker_1 = service_message_broker_1_1;
            },
            function (bind_1_1) {
                bind_1 = bind_1_1;
            }],
        execute: function() {
            MessageBasedXHRImpl = (function () {
                function MessageBasedXHRImpl(_brokerFactory, _xhr) {
                    this._brokerFactory = _brokerFactory;
                    this._xhr = _xhr;
                }
                MessageBasedXHRImpl.prototype.start = function () {
                    var broker = this._brokerFactory.createMessageBroker(messaging_api_1.XHR_CHANNEL);
                    broker.registerMethod("get", [serializer_1.PRIMITIVE], bind_1.bind(this._xhr.get, this._xhr), serializer_1.PRIMITIVE);
                };
                MessageBasedXHRImpl = __decorate([
                    di_1.Injectable(), 
                    __metadata('design:paramtypes', [service_message_broker_1.ServiceMessageBrokerFactory, xhr_1.XHR])
                ], MessageBasedXHRImpl);
                return MessageBasedXHRImpl;
            }());
            exports_1("MessageBasedXHRImpl", MessageBasedXHRImpl);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy9ub2RlX21vZHVsZXMvYW5ndWxhcjIvdHMvc3JjL3dlYl93b3JrZXJzL3VpL3hocl9pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBUUE7Z0JBQ0UsNkJBQW9CLGNBQTJDLEVBQVUsSUFBUztvQkFBOUQsbUJBQWMsR0FBZCxjQUFjLENBQTZCO29CQUFVLFNBQUksR0FBSixJQUFJLENBQUs7Z0JBQUcsQ0FBQztnQkFFdEYsbUNBQUssR0FBTDtvQkFDRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLDJCQUFXLENBQUMsQ0FBQztvQkFDbEUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxzQkFBUyxDQUFDLEVBQUUsV0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxzQkFBUyxDQUFDLENBQUM7Z0JBQ3ZGLENBQUM7Z0JBUEg7b0JBQUMsZUFBVSxFQUFFOzt1Q0FBQTtnQkFRYiwwQkFBQztZQUFELENBUEEsQUFPQyxJQUFBO1lBUEQscURBT0MsQ0FBQSIsImZpbGUiOiJwdWJsaWMvbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3RzL3NyYy93ZWJfd29ya2Vycy91aS94aHJfaW1wbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtQUklNSVRJVkV9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VyaWFsaXplcic7XG5pbXBvcnQge1hIUl9DSEFOTkVMfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL21lc3NhZ2luZ19hcGknO1xuaW1wb3J0IHtYSFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci94aHInO1xuaW1wb3J0IHtTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3Rvcnl9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VydmljZV9tZXNzYWdlX2Jyb2tlcic7XG5pbXBvcnQge2JpbmR9IGZyb20gJy4vYmluZCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNZXNzYWdlQmFzZWRYSFJJbXBsIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfYnJva2VyRmFjdG9yeTogU2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5LCBwcml2YXRlIF94aHI6IFhIUikge31cblxuICBzdGFydCgpOiB2b2lkIHtcbiAgICB2YXIgYnJva2VyID0gdGhpcy5fYnJva2VyRmFjdG9yeS5jcmVhdGVNZXNzYWdlQnJva2VyKFhIUl9DSEFOTkVMKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJnZXRcIiwgW1BSSU1JVElWRV0sIGJpbmQodGhpcy5feGhyLmdldCwgdGhpcy5feGhyKSwgUFJJTUlUSVZFKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
