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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy92ZW5kb3JzL2FuZ3VsYXIyL3RzL3NyYy93ZWJfd29ya2Vycy91aS94aHJfaW1wbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQVFBO2dCQUNFLDZCQUFvQixjQUEyQyxFQUFVLElBQVM7b0JBQTlELG1CQUFjLEdBQWQsY0FBYyxDQUE2QjtvQkFBVSxTQUFJLEdBQUosSUFBSSxDQUFLO2dCQUFHLENBQUM7Z0JBRXRGLG1DQUFLLEdBQUw7b0JBQ0UsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQywyQkFBVyxDQUFDLENBQUM7b0JBQ2xFLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUMsc0JBQVMsQ0FBQyxFQUFFLFdBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsc0JBQVMsQ0FBQyxDQUFDO2dCQUN2RixDQUFDO2dCQVBIO29CQUFDLGVBQVUsRUFBRTs7dUNBQUE7Z0JBUWIsMEJBQUM7WUFBRCxDQVBBLEFBT0MsSUFBQTtZQVBELHFEQU9DLENBQUEiLCJmaWxlIjoiYXNzZXRzL3ZlbmRvcnMvYW5ndWxhcjIvdHMvc3JjL3dlYl93b3JrZXJzL3VpL3hocl9pbXBsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge1BSSU1JVElWRX0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJpYWxpemVyJztcbmltcG9ydCB7WEhSX0NIQU5ORUx9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvbWVzc2FnaW5nX2FwaSc7XG5pbXBvcnQge1hIUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3hocic7XG5pbXBvcnQge1NlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeX0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJ2aWNlX21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7YmluZH0gZnJvbSAnLi9iaW5kJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VCYXNlZFhIUkltcGwge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9icm9rZXJGYWN0b3J5OiBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksIHByaXZhdGUgX3hocjogWEhSKSB7fVxuXG4gIHN0YXJ0KCk6IHZvaWQge1xuICAgIHZhciBicm9rZXIgPSB0aGlzLl9icm9rZXJGYWN0b3J5LmNyZWF0ZU1lc3NhZ2VCcm9rZXIoWEhSX0NIQU5ORUwpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcImdldFwiLCBbUFJJTUlUSVZFXSwgYmluZCh0aGlzLl94aHIuZ2V0LCB0aGlzLl94aHIpLCBQUklNSVRJVkUpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
